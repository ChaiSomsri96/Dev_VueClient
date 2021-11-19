<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'코드 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <cfg-tab></cfg-tab>
          <div>
            <border-box search>
              <border-box-item title="통상임금종류">
                <ui-dropdown :items="classification.items"
                             :value="classification.value"
                             @change="classification.value=$event.value; classification.return=$event;"
                             :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
              </border-box-item>
              <border-box-item button>
                <button type="button" id="btnSearch" class="btn btn-md line-1"  @click="onSearch">
                  <span>검색</span>
                </button>
              </border-box-item>
            </border-box>
          </div>

          <div class="row">
            <div class="form-row">
              <button-panel
                  btnType='top'
                  v-bind:add=true
                  v-bind:download=true
                  v-on:add="insertCfgYear"
                  v-on:download="download"
              />
            </div>
          </div>
          <div  class="row">
              <div id="cfg-year-grid" v-on:load="loadGridData" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
          </div>

          <cfg-year-modal ref="CfgYearModal" />

        </div>
      </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import CfgTab from './CfgTab';
import CfgYearModal from './CfgYearModal';
import ButtonPanel from "../../../components/common/ButtonPanel";
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  components: {
    ButtonPanel,
    CfgTab,
    BorderBox,
    BorderBoxItem,
    CfgYearModal
  },
  mixins: [grid],
  data: function ()  {
    return {
      classification: {
        value: 'all',
        return: null,
        items: [
          { message: '전체', code: 'all' },
          { message: 'TYPE1', code: 'TYPE1' },
          { message: 'TYPE2', code: 'TYPE2' },
          { message: 'TYPE3', code: 'TYPE3' },
          { message: 'TYPE4', code: 'TYPE4' },
          { message: 'TYPE5', code: 'TYPE5' },
          { message: 'TYPE6', code: 'TYPE6' },
          { message: 'TYPE7', code: 'TYPE7' },
          { message: 'TYPE8', code: 'TYPE8' },
          { message: 'TYPE9', code: 'TYPE9' },
        ]
      },
      columns: [
          { header: '통상임금종류', fieldName: 'OT_PAYMARK' },
          { header: '급여코드', fieldName: 'PAY_CODE' },
          { header: '급여코드명', fieldName: 'PAY_NAM' },
          { header: '자료원천', fieldName: 'CALC_SOURCE',
            displayCallback: function(grid, index, value) {
              return value == 'TRANSACTION' ? "급여대장" : '급여마스터';
            }
          },
          { header: '기준월', fieldName: 'OT_PERIOD' },
          { header: '1년중 지급횟수', fieldName: 'DIVIDE_BOTTOM' },
          this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 70}),
          this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 70}),
      ],
      fields: [
          { fieldName: 'OT_PAYMARK', dataType: 'text' },
          { fieldName: 'PAY_CODE', dataType: 'text' },
          { fieldName: 'PAY_NAM', dataType: 'text' },
          { fieldName: 'CALC_SOURCE', dataType: 'text' },
          { fieldName: 'OT_PERIOD', dataType: 'text' },
          { fieldName: 'DIVIDE_BOTTOM', dataType: 'text' },
          { fieldName: 'UPDATE', header: "수정" },
          { fieldName: 'DELETE', header: "삭제" }
      ],
      rowAttrs: ['DELETE','UPDATE','OT_PAYMARK', 'PAY_CODE', 'PAY_NAM','CALC_SOURCE','OT_PERIOD','DIVIDE_BOTTOM']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let { data } = await this.$httpGet('/payroll/code/cfg-otpay/list') || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgYear loadGridData err: ", e);
      }
    },
    insertCfgYear: function() {
      this.$refs.CfgYearModal.show();
    },
    realgridCreatedCallback: function() {
      let me = this;

      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);
        if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
          return false;
        if(index.column == "삭제"){
          me.confirm({
            title: '확인',
            message: '정말 삭제하시겠습니까?',
            yesCallback: function() {
              me.$httpPost({
                param: {
                    "OT_PAYMARK": _rowData[0].OT_PAYMARK,
                    "PAY_CODE": _rowData[0].PAY_CODE
                },
                url: '/payroll/code/cfg-otpay/delete',
                callback: function() {
                  me.toastSuccessDelete();
                  me.loadGridData();
                }
              });
            }
          });
          return true;
        }
        if(index.column == "수정"){
          me.$refs.CfgYearModal.show({
            OT_PAYMARK: _rowData[0].OT_PAYMARK,
            PAY_CODE: _rowData[0].PAY_CODE,
            PAY_NAM: _rowData[0].PAY_NAM,
            OT_PERIOD: _rowData[0].OT_PERIOD,
            CALC_SOURCE: _rowData[0].CALC_SOURCE,
            DIVIDE_BOTTOM: _rowData[0].DIVIDE_BOTTOM,
            url:'update'
          });
          return true;
        }
      }
    },
    download: function() {
      this.downloadRealGridExcel( '통상임금 셋팅');
    },

    async onSearch() {
      let me = this;
      try {
        let { data } = await this.$httpPost({
          param: {OT_PAYMARK: me.classification.value},
          url: '/payroll/code/cfg-otpay/list'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("CfgYear loadGridData err: ", e);
      }

    },
  },
  mounted() {
    this.createRealGrid({'domId': 'cfg-year-grid'});
    this.loadGridData();
  }
}

</script>