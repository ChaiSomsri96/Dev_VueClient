<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'급여 조회'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <div class="box border-box type2">
            <div class="box-body row">
              <div class="pull-left search-wrap">
                <label class="form-label type2 col-1 pr-0">
                  <span>급여월</span>
                </label>
                <div class="input-group col-2 pr-0">
                  <ui-month-picker v-model="payrollMonthStart" />
                </div>
                <button type="button" id="btnSearch" class="btn btn-md flat" @click="onSearch">
                  <span>검색</span>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-row">
              <button type="button" class="btn btn-md flat" @click="payslip()">
                <span>급여명세서 조회</span>
              </button>
              <button type="button" class="btn btn-md flat" @click="bankfile()">
                <span>은행이체파일 생성</span>
              </button>
            </div>
          </div>
          <div>
            <div id="dwork-pay-query-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          </div>
          <dwork-pay-modal ref="dworkpaymodal"></dwork-pay-modal>
          <dwork-bank-modal ref="dworkbankmodal"></dwork-bank-modal>
        </div>
    </div>
</template>
<script>
import UiMonthPicker from '@/components/common/UiMonthPicker';
import grid from '@/mixin/payroll-grid';
import DworkPayModal from "./DworkPayModal";
import DworkBankModal from "./DworkBankModal";
export default {
  components: {
    UiMonthPicker,
    DworkPayModal,
    DworkBankModal
  },
  mixins: [grid],
  data() {
    return {
      payrollMonthStart: this.getFirstMonthOfTheYear(),
      fields: [
        { fieldName: 'DEID',dataType: 'text'},
        { fieldName: 'EMP_NUMBER',dataType: 'text'},
        { fieldName: 'PAY_DATE',  dataType: "datetime",datetimeFormat: "yyyyMMdd"  },
        { fieldName: 'EMP_NAM',     dataType: 'text' },
        { fieldName: 'TOT_PAY', dataType: 'number' },
        { fieldName: 'INC_TAX', dataType: 'number' },
        { fieldName: 'RESID_TAX',  dataType: 'number' },
        { fieldName: 'NPMON_REGUL',     dataType: 'number' },
        { fieldName: 'MDMON_REGUL', dataType: 'number' },
        { fieldName: 'LTC_INSURANCE', dataType: 'number' },
        { fieldName: 'MEDICAL_ADJ',  dataType: 'number' },
        { fieldName: 'GERI_ADJ',     dataType: 'number' },
        { fieldName: 'EIMON_REGUL', dataType: 'number' },
        { fieldName: 'COMP_INDUS_ACC', dataType: 'number' },
      ],
      columns: [
        { fieldName: 'DEID',visible: false },
        { fieldName: 'EMP_NUMBER',visible: false },
        { fieldName: 'PAY_DATE', header: '급여일자', width: 30,
          datetimeFormat: "yyyy.MM.dd"},
        { fieldName: 'EMP_NAM', header: '성명', width: 30, styleName: "left-column" },
        { fieldName: 'TOT_PAY', header: '총지급액', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }},
        { fieldName: 'INC_TAX', header: '소득세', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'RESID_TAX', header: '지방소득세', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'NPMON_REGUL', header: '국민연금', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'MDMON_REGUL', header: '건강보험', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'LTC_INSURANCE', header: '노인장기', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'MEDICAL_ADJ', header: '건강보험(정산)', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'GERI_ADJ', header: '노인장기(정산)', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'EIMON_REGUL', header: '고용보험', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'COMP_INDUS_ACC', header: '산재보험', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
      ]
    }
  },
  methods:{
    async loadGridData() {
      try {
        this.gridView.checkBar.visible=true;
        let { data } = await this.$httpGet('/payroll/deduction/pay-inwithtaxdailycalqry/search',
            {
              EMP_SEL: 'ALL',
              BTN_TYPE: 'S',
              WORK_MON_FROM: this.payrollMonthStart.replace('-', ''),
              WORK_MON_TO: this.payrollMonthStart.replace('-', ''),
              WORK_MON: this.payrollMonthStart.replace('-', '')
            })
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("PayrollLedger loadGridData err: ", e);
      }
    },
    onSearch: function (){
      this.loadGridData()
    },
    payslip: function (){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
        __checkedData.push({ 'DEID': _rowData['DEID'],
          'EMP_NUMBER': _rowData['EMP_NUMBER'] });
      }
      this.$refs.dworkpaymodal.show({
        WORK_MON : this.payrollMonthStart.replace('-', ''),
        DEID_LIST : __checkedData
      })
    },
    bankfile: function (){
      this.$refs.dworkbankmodal.show({
        WORK_MON : this.payrollMonthStart.replace('-', '')
      })
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'dwork-pay-query-grid'});
    this.loadGridData();
  }
}
</script>