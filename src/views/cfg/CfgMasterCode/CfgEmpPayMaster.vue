<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'마스터 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-mater-code-tab></cfg-mater-code-tab>
      <div>
          <border-box>
            <border-box-item title="조회 기준일">
              <ui-input-date :date="START_DATE"
                             @change="START_DATE=$event;"
              />
            </border-box-item>
            <border-box-item title="급여코드">
              <ui-dropdown :items="paycodeItems"
                           :value="basicData.PAY_CODE.value"
                           @change="basicData.PAY_CODE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </border-box-item>
            <border-box-item title="사원명">
              <ui-input :value="basicData.EMP_NAME" @change="basicData.EMP_NAME=$event; basicData.return=$event;"/>
            </border-box-item>
            <border-box-item button>
              <button type="button" class="btn btn-md line-1" @click="onSearch()">
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
              v-on:add="insertPayMaster"
          />
        </div>
      </div>
      <div class="row">
        <div id="cfg-emp-pay-master-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
      <cfg-emp-pay-master-modal ref="cfgEmpPayMasterModal"/>
    </div>
  </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import CfgEmpPayMasterModal from "./CfgEmpPayMasterModal";
export default {
  components: {
    CfgMaterCodeTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    CfgEmpPayMasterModal
  },
  mixins: [grid],
  data() {
    return {
      START_DATE: '20210101',
      paycodeItems:[],
      basicData: {
        PAY_CODE: {
          value: ''
        },
        EMP_NAME: ''
      },
      columns : [
        { header: 'EID', fieldName: 'EID' ,visible: false },
        { header: '이름', fieldName: 'EMP_NAME' ,width: 50 },
        { header: '부서', fieldName: 'DEPT_NAME' ,width: 50 },
        { header: '적용 시작일', fieldName: 'START_DATE' ,width: 50 },
        { header: '적용 종료일', fieldName: 'END_DATE' ,width: 50 },
        { header: '급여코드', fieldName: 'PAY_CODE' ,width: 50 },
        { header: '급여코드명', fieldName: 'PAY_NAME' ,width: 50 },
        { header: '금액', fieldName: 'PAY_AMOUNT' ,width: 50 },
        { header: '외화통화', fieldName: 'FXA' ,width: 50 },
        { header: '외화금액', fieldName: 'PAY_FXAMOUNT' ,width: 50 },
        { header: '비고', fieldName: 'NOTE' ,width: 50 },
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 50}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 50})
      ],
      fields: [
        { fieldName: 'EID', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'DEPT_NAME', dataType: 'text' },
        { fieldName: 'START_DATE', dataType: 'text' },
        { fieldName: 'END_DATE', dataType: 'text' },
        { fieldName: 'PAY_CODE', dataType: 'text' },
        { fieldName: 'PAY_NAME', dataType: 'text' },
        { fieldName: 'PAY_AMOUNT', dataType: 'text' },
        { fieldName: 'FXA', dataType: 'text' },
        { fieldName: 'PAY_FXAMOUNT', dataType: 'text' },
        { fieldName: 'NOTE', dataType: 'text' },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs:['EMP_NAME','PAY_CODE','DEPT_NAME','PAY_FXAMOUNT','PAY_DATE',
          'START_DATE','END_DATE','PAY_FAX','PAY_AMOUNT','PAYDAY_MEMO2']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param:{START_DATE:this.START_DATE},
          url: '/payroll/code/pay-master/list'}) || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgCode loadGridData err: ", e);
      }
    },
    setDropData: function () {
      this.setPaycode();
    },
    async setPaycode(){
      let { data } = await this.$httpPost({
        param: {},
        url: '/payroll/code/pay-pay/list_active'
      });
      if(Array.isArray(data) && data.length > 0) {
        for(let i = 0; i < data.length; i ++)
          this.paycodeItems.push({
            message: data[i]['PAY_NAM'],
            code: data[i]['PAY_CODE']
          });
      }
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
                  "PAY_MONTH": _rowData.PAY_MONTH,
                  "SEQ": _rowData.SEQ,
                  "PAY_DATE": _rowData.PAY_DATE

                },
                url: '/payroll/code/pay-date/delete',
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
          me.$refs.cfgovertimecalcmodal.show({
            EMP_NAME: _rowData[0].EMP_NAME,
            PAY_CODE: _rowData[0].PAY_CODE,
            DEPT_NAME: _rowData[0].DEPT_NAME,
            PAY_FXAMOUNT: _rowData[0].PAY_FXAMOUNT,
            PAY_DATE: _rowData[0].PAY_DATE,
            START_DATE: _rowData[0].START_DATE,
            END_DATE: _rowData[0].END_DATE,
            PAY_FAX: _rowData[0].PAY_FAX,
            PAY_AMOUNT: _rowData[0].PAY_AMOUNT,
            PAYDAY_MEMO2: _rowData[0].PAYDAY_MEMO2,
            url:'/payroll/salarymanual/pay-master/update',
            setting:'update'
          });
          return true;
        }
      }
    },
    onSearch: function () {

    },
    insertPayMaster: function () {
      this.$refs.cfgEmpPayMasterModal.show({url:'/payroll/salarymanual/pay-master/insert'});
    }
  },
  mounted() {
    this.setDropData();
    this.createRealGrid({'domId': 'cfg-emp-pay-master-grid'});
    this.loadGridData();
  }
}
</script>

<style scoped>

</style>