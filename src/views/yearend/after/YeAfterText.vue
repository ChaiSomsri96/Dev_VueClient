<template>
    <div>
        <ui-header :msg="'사후 관리'"/>
        <div class="content-body">
            <base-tabs>
                <base-tabs-item label="서류미비자 안내메일 발송" :to="{name: 'YeAfterMail'}"/>
                <base-tabs-item label="서류미비자 안내문자 발송" :to="{name: 'YeAfterText'}"/>
                <base-tabs-item label="정산세액 급여대장반영" :to="{name: 'YeAfterTaxPay'}"/>
            </base-tabs> 
            <div>
              <border-box width="180" v-slot="slotProps" search>
                <border-box-item title="정산연도" :width="slotProps.width">
                  <ui-dropdown :items="settleYear.items"
                                :value="settleYear.value"
                                @change="settleYear.value=$event.value; settleYear.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
                <border-box-item title="발송여부" :width="slotProps.width">
                  <ui-dropdown :items="isSend.items"
                                :value="isSend.value"
                                @change="isSend.value=$event.value; isSend.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
                <border-box-item title="발송일자" multi :width="slotProps.width">
                  <ui-input-date :date="sendDateScope.from"
                                               :max-date="sendDateScope.to"
                                               :value="sendDateScope.from"
                                               @change="sendDateScope.from=$event;" />
                  <span>~</span>
                  <ui-input-date :date="sendDateScope.to"
                                               :min-date="sendDateScope.from"
                                               :value="sendDateScope.to"
                                               @change="sendDateScope.to=$event;" />
                </border-box-item>
                <border-box-item button>
                  <button type="button" id="btnSearch" class="btn btn-md line-1"
                  @click="loadGridData()">
                      <span>검색</span>
                  </button>
                </border-box-item>
              </border-box>
              <div class="box border-box type2">
                <div class="box-body row">
                  <button class="btn btn-md line-1 ml-10"
                  @click="sendText()">문자 작성 및 발송</button>
                </div>
              </div>

              <div>
                <div id="yeafter-text-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
              </div>

              <send-text-modal ref="yeAfterTextGrid" />
            </div>
        </div>
    </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import SendTextModal from '@/components/yearend/after/SendTextModal';

import grid from '@/mixin/payroll-grid';
export default {
  mixins: [grid],
  components: {
    BaseTabs,
    BaseTabsItem,
    BorderBox,
    BorderBoxItem,
    SendTextModal
  },
  data() {
    return {
      settleYear: {
        value: 2020,
        return: null,
        items: this.getRecentYearList()  
      },
      isSend: {
        value: 'F',
        return: null,
        items: [
          {'message': '발송', 'code': 'S'},
          {'message': '미발송', 'code': 'F'},
        ]
      },
      sendDateScope: {
        'from': '20201118',
        'to': '20210210'
      },
      //visible
      fields: [
        { fieldName: 'SEND_TIME', dataType: 'text' },
        { fieldName: 'SEND_RESLT', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'MOBILE_NO', dataType: 'text' },
        { fieldName: 'FAIL_MSG', dataType: 'text' },
        { fieldName: 'MEMO_1', dataType: 'text' },
        { fieldName: 'SMS_CONTENTS', dataType: 'text' },
      ],
      columns: [
        { fieldName: 'SEND_TIME', header: '발송일시', width: 70 },
        { fieldName: 'SEND_RESLT', header: '발송여부',
        type: 'data',
        renderer: {
                type: "html",
                callback: function(grid, cell, w, h) {
                    if (!cell.value)
                            return '';
                    if(cell.value == 'F')
                        return '미발송 ';
                    else if(cell.value == 'S')
                        return '발송';
                }
        }, width: 70 },
        { fieldName: 'EMP_NUMBER', header: '사번', width: 70 },
        { fieldName: 'EMP_NAME', header: '성명', width: 70 },
        { fieldName: 'MOBILE_NO', header: '핸드폰 번호', width: 70 },
        { fieldName: 'FAIL_MSG', header: '오류내용' },
        { fieldName: 'MEMO_1', header: '메모' },
        { fieldName: 'SMS_CONTENTS', header: '발송내용', width: 400, styleName: 'multi-line-css' },
      ] 
    }
  },
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/admin/sms-targets',
          param: {
            "ATT_YEAR": this.settleYear.value,
            "SEND_STATUS": this.isSend.value,
            "WRITE_FROM": this.sendDateScope.from,
            "WRITE_TO": this.sendDateScope.to,
            "TEST_EMAIL_RECEIVER": '',
            "YEAREND_TYPE": 'EMP'
          }
        });
        this.setRealgridData(data || []); 
      }
      catch(e) {
        console.error("YeAfterText loadGridData: ", e)
      }
    },
    addRealGridOption() {
      this.gridView.displayOptions.rowHeight = -1;
      this.gridView.displayOptions.minRowHeight = 36;
    },
    sendText() {
      this.$refs.yeAfterTextGrid.show({attYear: this.settleYear.value});
    }
  },
  async mounted() { 
    try {
      let me = this;
      this.columns[0]['type'] = 'data';
      this.columns[0]['renderer'] = {
        type: "html",
        callback: function(grid, cell, w, h) {
          return me.getDateFromTimeStamp(cell.value);
        }
      };
      this.createRealGrid({'domId': 'yeafter-text-grid'});
      await this.loadGridData();
    }
    catch(e) {
      console.error("YeAfterText mounted err: ", e);
    }
  },
}
</script>