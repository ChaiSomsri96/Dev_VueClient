<template>
<div>
    <ui-header :msg="'급여조회'" />
  <div class="content-body">
    <pay-query-tab></pay-query-tab>
    <div>
      <div class="box border-box type2">
        <div class="box-body row">
          <div class="pull-left search-wrap">
            <label class="form-label type2 col-1 pr-0">
              <span>급여일</span>
            </label>
            <div class="input-group col-2 pr-0">
              <ui-month-picker v-model="payrollMonthStart" />
            </div>
            <div class="input-group col-2 pr-0">
              <ui-month-picker v-model="payrollMonthEnd" />
            </div>
            <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
              <span>검색</span>
            </button>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="form-row">
          <button type="button" class="btn btn-md flat" @click="salaryHistory()">
            <span>급여 이력 조회</span>
          </button>
        </div>
      </div>
      <div>
        <div id="payroll-history-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
      <salary-modal ref="salarymodal"  @close="openSalaryHistorySelect($event)"/>
      <salary-history-modal ref="salaryhistorymodal"/>
    </div>
  </div>
</div>
</template>

<script>
import PayQueryTab from './PayQueryTab';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import SalaryModal from "./SalaryModal";
import SalaryHistoryModal from "./SalaryHistoryModal";
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        PayQueryTab,
        UiMonthPicker,
        SalaryModal,
        SalaryHistoryModal

    },
  data(){
      return {
        payrollMonthStart: this.getFirstMonthOfTheYear(),
        payrollMonthEnd: this.getCurrentMonth(),

        //grid
        fields: [
          { fieldName: 'PAY_MONTH',  dataType: "data"},
          { fieldName: 'SEQ',     dataType: 'text' },
          { fieldName: 'PAY_DATE', dataType: "data"},
          { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' },
        ],
        columns: [
          { fieldName: 'PAY_MONTH', header: '급여월', width: 100,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                  return year+'.'+month;
              }
            } },
          { fieldName: 'SEQ', header: '차수', width: 30 },
          { fieldName: 'PAY_DATE', header: '급여일', width: 120,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                let day = cell.value.toString().slice(6,8)
                return year+'.'+month+'.'+day;
              }
            } },
          { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 200, styleName: 'left-column' },
        ]

      }
  },
  methods: {
    async asyncData() {

    },
    addRealGridOption() {
      this.gridView.checkBar.visible=true;
    },
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param: {
            'PAY_MONTH_FROM': this.payrollMonthStart.replace('-', ''),
            'PAY_MONTH_TO': this.payrollMonthEnd.replace('-', '')
          },
          url: '/payroll/code/pay-date/list'
        });
        this.setRealgridData(data.list || []);
      }
      catch(e) {
        console.error("PayrollLedger loadGridData err: ", e);
      }
    },
    salaryHistory(){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePayMonthSelect'], type:"error"});
        return;
      }

      let _rowData = this.dataProvider.getJsonRow(checkedRows[0]);
      this.$refs.salarymodal.show({ PAY_MONTH: _rowData['PAY_MONTH'], SEQ: _rowData['SEQ']});
    },
    onSearch() {
      this.loadGridData();
    },
    openSalaryHistorySelect(param){
      this.$refs.salaryhistorymodal.show({formData:param.formData});
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'payroll-history-grid'});
    this.asyncData();
    this.loadGridData();
  }
}
</script>