<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'계산식 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-calc-tab></cfg-calc-tab>
      <div class="row">
        <div class="form-row">
          <button-panel
              btnType='top'
              v-bind:add=true
              v-bind:download=true
              v-on:add="insertOverTimeCalc"
              v-on:download="download"
          />
        </div>
      </div>
      <div class="row">
        <div id="cfg-over-time-calc-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
      <cfg-over-time-calc-modal ref="cfgovertimecalcmodal"/>
    </div>
  </div>
</template>

<script>
import CfgCalcTab from "./CfgCalcTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import CfgOverTimeCalcModal from "./CfgOverTimeCalcModal";


export default {
  components:{
    CfgCalcTab,
    ButtonPanel,
    CfgOverTimeCalcModal
  },
  mixins: [grid],
  data() {
    return {
      columns : [
        { header: '초과근무코드', fieldName: 'ONH_CD' ,width: 50 },
        { header: '통상임금종류', fieldName: 'OT_PAYMARK' ,width: 50 },
        { header: '월 소정시간', fieldName: 'OTBASE' ,width: 50 },
        { header: '대상 급여코드', fieldName: 'OT_TARGET_PAYCD' ,width: 50 },
        { header: '대상 급여코드 명', fieldName: 'PAY_NAM' ,width: 50 },
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 50}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 50})
      ],
      fields: [
        { fieldName: 'ONH_CD', dataType: 'text' },
        { fieldName: 'OT_PAYMARK', dataType: 'text' },
        { fieldName: 'OTBASE', dataType: 'text' },
        { fieldName: 'OT_TARGET_PAYCD', dataType: 'text' },
        { fieldName: 'PAY_NAM', dataType: 'text' },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs: ['ONH_CD', 'OT_PAYMARK', 'OTBASE','OT_TARGET_PAYCD','PAY_NAM']
    }
  },
  methods:{
    async loadGridData() {
      try {
        let { data } = await this.$httpGet('payroll/code/cfg-otonh/list') || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgOverTimeCalc loadGridData err: ", e);
      }
    },
    download: function() {
      this.downloadRealGridExcel( '연장근무 수당 계산식');
    },
    insertOverTimeCalc: function (){
      this.$refs.cfgovertimecalcmodal.show({url:'/payroll/code/cfg-otonh/insert',setting:'insert'});
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
            ONH_CD: _rowData[0].ONH_CD,
            OT_PAYMARK: _rowData[0].OT_PAYMARK,
            OTBASE: _rowData[0].OTBASE,
            OTRATE: _rowData[0].OTRATE,
            OT_TARGET_PAYCD: _rowData[0].OT_TARGET_PAYCD,
            url:'/payroll/code/cfg-otonh/update',
            setting:'update'
          });
          return true;
        }
      }
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'cfg-over-time-calc-grid'});
    this.loadGridData();
  }
}
</script>

<style scoped>

</style>