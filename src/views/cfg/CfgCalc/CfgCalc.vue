<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'계산식 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <cfg-calc-tab></cfg-calc-tab>
          <diV>
            <div class="row">
              <grid-tool-bar>
                  <button class="btn btn-md flat" @click="addPayrollCalc()"><i class="icon-lineIcon-plus mr-5"></i>
                    급여 계산식 추가
                  </button>
                  <button class="btn btn-md flat" @click="downloadRealGridExcel('계산식관리-급여계산식')">
                    <i class="icon-lineIcon-download mr-5"></i>다운로드
                  </button>
              </grid-tool-bar>
            </div>
            <div class="row">
                <div id="payroll-calc-grid" style="width: 100%; height: 500px" class="realgrid-type-style">
                </div>
            </div>
          </diV>
        </div>
    </div>
</template>

<script>
import CfgCalcTab from "./CfgCalcTab";
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';

const gridData = {
  data: [
    { PAY_NAM: '고정연장 수당', FILTER_BASE_PAY_NAM: 'P101 – 기본급', BASE_PAY_NAM: '급여마스터',  CALC_RATIO: '15.23', REFER_TABLE_NAM: '부양가족',
      REFER_CALCTYPE: '+', HR_CODETYPE_NAM: '고용형태', CODE_NAM: '정규직, 계약직, 임시직',
      
      TARGET_PAYCD: '1005', HR_CODETYPE: 'EMP_TYPE', BASE_PAY: 'MASTER', REFER_TABLE: 'RANK', REFER_NUMBER: 'PROPERTIES3',
      DAILY_CALC: 'Y' }
  ]
};

export default {
  mixins: [grid],
  components:{
    CfgCalcTab,
    GridToolBar
  },
  data() {
    return {
      //grid
      columns: [
        { fieldName: 'PAY_NAM', header: '대상급여코드' },
        { fieldName: 'FILTER_BASE_PAY_NAM', header: 'Base 급여' },
        { fieldName: 'BASE_PAY_NAM', header: 'Base급여\n계산 기준' },
        { fieldName: 'CALC_RATIO', header: '계산 율(%)',
        numberFormat: "#,##0.00", styleName: "right-column",  },
        { fieldName: 'REFER_TABLE_NAM', header: '인용테이블' },
        { fieldName: 'REFER_CALCTYPE', header: '인용테이블 연산' },
        { fieldName: 'HR_CODETYPE_NAM', header: '선택 타입' },
        { fieldName: 'CODE_NAM', header: '선택된 조건' },
        this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 70}),
        this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 70}),
      ],
      fields: [
        { fieldName: 'PAY_NAM', dataType: 'text' },
        { fieldName: 'FILTER_BASE_PAY_NAM', dataType: 'text' },
        { fieldName: 'BASE_PAY_NAM', dataType: 'text' },
        { fieldName: 'CALC_RATIO', dataType: 'number' },
        { fieldName: 'REFER_TABLE_NAM', dataType: 'text' },
        { fieldName: 'REFER_CALCTYPE', dataType: 'text' },
        { fieldName: 'HR_CODETYPE_NAM', dataType: 'text' },
        { fieldName: 'CODE_NAM', dataType: 'text' },
        { fieldName: 'ACTION_UPDATE', dataType: 'text' },
        { fieldName: 'ACTION_DEL', dataType: 'text' },
      ],
      layout: [
        'PAY_NAM', 'FILTER_BASE_PAY_NAM', 'BASE_PAY_NAM', 'CALC_RATIO', 'REFER_TABLE_NAM', 'REFER_CALCTYPE',
        {
          name: 'Filtering_Group', direction: 'horizontal',
          items: [ 'HR_CODETYPE_NAM', 'CODE_NAM' ],
          header: { text: "필터링 조건" },
        },
        'ACTION_UPDATE', 'ACTION_DEL'
      ],
      rowAttrs: [
        'TARGET_PAYCD', 'HR_CODETYPE', 'BASE_PAY', 'REFER_CALCTYPE', 'REFER_TABLE', 'REFER_NUMBER', 'DAILY_CALC'
      ]
    }
  },
  methods: {
    addPayrollCalc() {
      this.$store.dispatch( 'cfgcalc/setCfgCalcForm',
                        { CFG_CALC_FORM: null });
      this.$router.push({name: 'CfgCalcInput'});
    },
    loadGridData() {
      let {data} = gridData || [];
      this.setRealgridData(data);
    },
    addRealGridOption() {
      this.gridView.header.height = 72;
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'ACTION_DEL') {
          // 삭제처리
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.deleteCfgCalc(_rowData['ROW_ATTRS'], clickData.dataRow);
        }
        else if(clickData.column == 'ACTION_UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow)['ROW_ATTRS'];
          me.$store.dispatch(
                        'cfgcalc/setCfgCalcForm',
                        {
                            CFG_CALC_FORM: _rowData
                        });   
          me.$router.push({name: 'CfgCalcInput'});
        }
      }
    },
    deleteCfgCalc(row, rowIndex) {
      const me = this;
      this.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function() {
            try {
              await me.$httpPost({
                url: "/payroll/code/cfg-paycalc/delete",
                param: {
                  formData: row
                },
                callback: function()  {
                  me.toastSuccessDelete();
                  me.dataProvider.removeRow(rowIndex);
                }
              });
            }
            catch(e) {
              console.error("PensionSaving onDelete Error: ", e);
            }
        }
      });
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'payroll-calc-grid'});
    this.loadGridData();
  },
}
</script>