<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'보고서 디자인'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-report-tab></cfg-report-tab>
      <div>
        <div class="row">
          <div class="form-row">
            <button-panel
                btnType='top'
                v-bind:add=true
                v-on:add="addEmptyData"
            />
          </div>
        </div>
        <div class="row">
          <div id="bank-transfer-grid" class="realgrid-type-style" style="width: 100%;height: 500px"></div>
        </div>
        <div class="row">
          <div class="form-row">
            <button-panel
                btnType='bottom'
                v-bind:save=true
                v-on:save="saveCode"
            />
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import CfgReportTab from "./CfgReportTab";
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "@/components/common/ButtonPanel";
export default {
  mixins: [grid],
  components:{
    CfgReportTab,
    ButtonPanel
  },
  data(){
    return{
      fields: [
        { fieldName: 'CONTROL_NO',  dataType: 'text' },
        { fieldName: 'CONTROL_TITLE', dataType: 'text' },
        { fieldName: 'DEPOSIT_DISPLAY', dataType: 'text' },
        { fieldName: 'WITHDRAW_DISPLAY',     dataType: 'text' },
        { fieldName: 'ACCOUNT_CODE',     dataType: 'text' },
        { fieldName: 'INCLUDE_PAYDAY_DASH',     dataType: 'text' },
        { fieldName: 'REMOVE_DASH',     dataType: 'text' },
        { fieldName: 'DATAIL', dataType: 'text' },
        { fieldName: 'DELETE', header: "삭제" }
      ],
      columns: [
        { fieldName: 'CONTROL_NO', header: '관리번호', width: 100 },
        { fieldName: 'CONTROL_TITLE', header: '명칭', width: 120 },
        { fieldName: 'DEPOSIT_DISPLAY', header: '수취인 계좌 적요', width: 100, styleName: 'left-column' },
        { fieldName: 'WITHDRAW_DISPLAY', header: '출금통장 표시', width: 80 },
        { fieldName: 'ACCOUNT_CODE', header: '출금 계좌번호', width: 80 },
        { fieldName: 'INCLUDE_PAYDAY_DASH', header: '지급일 대쉬(-) 포함', width: 80 },
        { fieldName: 'REMOVE_DASH', header: '계좌번호 대쉬(-) 제거', width: 80 },
        this.getIconColumn({headerText: '상세관리', fieldName: 'DATAIL', columnWidth: 70, type: 'detail'}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 100})
      ],
      rowAttrs : ['CONTROL_NO','CONTROL_TITLE']
    }
  },
  methods:{
    async loadGridData() {
      try {
        let {data} = await this.$httpGet('/payroll/code/bank-trfile-compitem/list');
        this.setRealgridData(data);
      } catch (e) {
        console.error("BankTransfer loadGridData err: ", e);
      }
    },
    insertBank : function () {

    },
    findSaveRows: function () {
      let me = this;
      let createdRows = me.dataProvider.getStateRows('created');

      let retData = [];
      createdRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      return retData;
    },

    findUpdateRows: function(){
      let me = this;
      let updatedRows = me.dataProvider.getStateRows('updated');
      let retData = [];
      updatedRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      return retData;
    },

    saveCode: async function () {
      let me = this;
      let code = me.findSaveRows();
      if (code.length > 0) {
        for (const v of code) {
          await me.$httpPost({
            param: v,
            sendRequestBody: true,
            url: '/payroll/code/bank-trfile/save'
          });
        }
      }

      let updateCode = me.findUpdateRows();
      if( updateCode.length > 0) {
        for (const v of code) {
          await me.$httpPost({
            param: v,
            sendRequestBody: true,
            url: '/payroll/code/bank-trfile/save'
          });
        }
      }
      me.toastSuccessSave();
      me.loadGridData();
    },
    realgridCreatedCallback() {
      let me = this;
      me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        let columns = grid.getColumnNames();
        let _rowData = me.dataProvider.getJsonRow(newIndex.dataRow);
        let data = _rowData['ROW_ATTRS'];
        let editAble = true;
        if (me.dataProvider.getRowState(newIndex.dataRow) == 'created') {
          columns.forEach(function(obj) {
            grid.setColumnProperty(obj,"editable",editAble)
          });
        } else {
          columns.forEach(function(obj) {
            grid.setColumnProperty(obj,"editable",editAble)
          });
        }
      };
      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);

        if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
          return false;
        if(index.column == "삭제"){
          return true;
        }
        if(index.column == "상세관리"){

          me.$store.dispatch(
              'withholding/setDeclarationForm',
              {
                DECLARATION_FORM: _rowData
              });
          me.$router.push({name: 'CfgBankTransferInput'});
          return true;
        }
      }

    },

  },
  async mounted() {
    this.createRealGrid({
      domId: 'bank-transfer-grid'
    });
    await this.loadGridData();
  }
}
</script>

<style scoped>

</style>