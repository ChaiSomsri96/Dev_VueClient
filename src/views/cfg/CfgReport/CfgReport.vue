<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'보고서 디자인'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <cfg-report-tab></cfg-report-tab>
          <div>
            <div class="row">
                <grid-tool-bar> 
                    <button class="btn btn-md flat" @click="addReport()"><i class="icon-lineIcon-plus mr-5"></i>
                      추가
                    </button>   
                </grid-tool-bar>
            </div> 
            <div class="row">
                <div id="cfg-report-grid" style="width: 100%; height: 500px" class="realgrid-type-style">
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import CfgReportTab from "./CfgReportTab";
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';
export default {
  mixins: [grid],
  components:{
    CfgReportTab,
    GridToolBar
  },
  data() {
    return {
      //grid
      columns: [
        { fieldName: 'REPORT_SEQ', header: '급여대장 번호', width: 70 },
        { fieldName: 'REPORT_NAME', header: '급여대장 명칭', width: 180 },
        this.getIconColumn({headerText: '상세관리', fieldName: 'DETAIL', columnWidth: 70, type: 'detail'}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 70})
      ],
      fields: [
        { fieldName: 'REPORT_SEQ', dataType: 'text' },
        { fieldName: 'REPORT_NAME', dataType: 'text' },
        { fieldName: 'DETAIL', dataType: 'text' },
        { fieldName: 'DELETE', dataType: 'text' }
      ],
      emptyRealGridData: {
        REPORT_SEQ: '',
        REPORT_NAME: '',
        DETAIL: '',
        DELETE: ''
      }
    }
  },
  methods: {
    addReport() {
      this.$store.dispatch(
                        'cfgreport/setCfgReportForm',
                        {
                            CFG_REPORT_FORM: null
                        });   
      this.$router.push({name: 'CfgReportInput'});
    },
    async loadGridData() {
      try {
        let {data} = await this.$httpGet('/payroll/code/payrolldesignpivotstyle/list') || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgReport loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
          if (clickData.column == 'DELETE') {
              // 삭제처리
              me.dataProvider.removeRow(clickData.dataRow);
          }
          else if(clickData.column == 'DETAIL') {
            if(me.dataProvider.getRowState(clickData.dataRow) != 'created') {
              let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
              delete _rowData['DETAIL'];
              delete _rowData['DELETE'];
              me.$store.dispatch(
                        'cfgreport/setCfgReportForm',
                        {
                            CFG_REPORT_FORM: _rowData
                        });   
              me.$router.push({name: 'CfgReportInput'});
            }
          }
      } 
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'cfg-report-grid'});
    this.loadGridData();
  },
}
</script>

<style scoped>

</style>