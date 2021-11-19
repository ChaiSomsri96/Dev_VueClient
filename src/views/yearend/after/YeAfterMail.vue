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
                  <button class="btn btn-md line-1 ml-10">메일작성</button>
                  <button class="btn btn-md line-1 ml-10">메일삭제</button>
                  <button class="btn btn-md line-1 ml-10">테스트 메일 발송</button>
                  <button class="btn btn-md line-1 ml-10">메일 발송</button>
                </div>
              </div>

              <div class="pppppppp">
                <div id="yeafter-mail-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
              </div>

            </div>
        </div>
    </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

import grid from '@/mixin/payroll-grid';
export default {
  mixins: [grid],
  components: {
    BaseTabs,
    BaseTabsItem,
    BorderBox,
    BorderBoxItem,
  },
  data() {
    return {
      settleYear: {
        value: '2020',
        return: null,
        items: this.getRecentYearList()
      },
      isSend: {
        value: 'S',
        return: null,
        items: [
          {'message': '발송', 'code': 'S'},
          {'message': '미발송', 'code': 'C'},
        ]
      },
      sendDateScope: {
        'from': '20201118',
        'to': '20210210'
      },
      //visible
      fields: [
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'EMAIL', dataType: 'text' },
        { fieldName: 'RECV_EMAIL', dataType: 'text' },
        { fieldName: 'EMAIL_TITLE', dataType: 'text' },
        { fieldName: 'EMAIL_CONTENT', dataType: 'text' },
        { fieldName: 'SEND_STA', dataType: 'text' },
        { fieldName: 'CREATE_TIME', dataType: 'text' },
      ],
      columns: [
        { fieldName: 'EMP_NUMBER', header: '사번' },
        { fieldName: 'EMP_NAME', header: '이름' },
        { fieldName: 'EMAIL', header: '이메일' },
        { fieldName: 'RECV_EMAIL', header: '발송자 이메일' },
        { fieldName: 'EMAIL_TITLE', header: '이메일 제목' },
        { fieldName: 'EMAIL_CONTENT', header: '이메일 본문', type: "data",
        renderer: {
          type:"html",
          callback: function(grid, cell, w, h) {
            return cell.value;
          }
        } },
        { fieldName: 'SEND_STA', header: '발송여부' },
        { fieldName: 'CREATE_TIME', header: '작성일자' },
      ]
    }
  },
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/admin/email/undocumented/list',
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
        console.error("YeAfterMail loadGridData: ", e)
      }
    },
    addRealGridOption() {
      this.gridView.displayOptions.rowHeight = -1;
      this.gridView.displayOptions.minRowHeight = 37;
    }
  },
  async mounted() {
    try {
      let me = this;
      this.columns[7]['type'] = 'data';
      this.columns[7]['renderer'] = {
        type: "html",
        callback: function(grid, cell, w, h) {
          return me.getDateFromTimeStamp(cell.value);
        }
      };
      this.createRealGrid({'domId': 'yeafter-mail-grid'});
      await this.loadGridData();  
    }
    catch(e) {
      console.error("YeAfterMail mounted err: ", e);  
    }
  },
}
</script>