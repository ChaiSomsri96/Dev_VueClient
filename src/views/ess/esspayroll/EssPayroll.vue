<template>
  <div>
    <ui-header :msg="'급여 등 조회'" />
    <div class="content-body">
      <base-tabs>
        <base-tabs-item label="급여명세서 조회" :to="{name: 'EssPayroll'}"/>
        <base-tabs-item label="급여이력 조회" :to="{name: 'EssSalaryhistory'}"/>
      </base-tabs>
      <div>
        <div class="box border-box type2">
          <div class="box-body row">
            <div class="pull-left search-wrap">
              <label class="form-label type2 col-1 pr-0">
                <span>급여월</span>
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
            <button-panel
                btnType='top'
                v-bind:download=true
                v-on:download="downloadRealGridExcel"
            />
          </div>
        </div>
        <div>
          <div id="ess-payroll-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
export default {
  mixins: [grid],
  components: {
    BaseTabs,
    BaseTabsItem,
    BorderBox,
    BorderBoxItem,
    UiMonthPicker,
    ButtonPanel
  },
  data() {
    return {
      payrollMonthStart: this.getFirstMonthOfTheYear(),
      payrollMonthEnd: this.getCurrentMonth(),

      //grid
      fields: [
        { fieldName: 'SEQ',dataType: 'text' },
        { fieldName: 'PAY_MONTH',  dataType: "data"},
        { fieldName: 'PAY_DATE',  dataType: "data"},
        { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' },
        { fieldName: 'START_DATE',  dataType: "data"},
        { fieldName: 'END_DATE',     dataType: "data" },
        { fieldName: 'DATAIL', dataType: 'text' },
      ],
      columns: [
        { fieldName: 'SEQ',visible: false },
        { fieldName: 'PAY_MONTH', header: '급여월', width: 100,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              return year+'.'+month;
            }
          } },
        { fieldName: 'PAY_DATE', header: '급여일', width: 120,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }},
        { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 100, styleName: 'left-column' },
        { fieldName: 'START_DATE', header: '시작일', width: 80,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }},
        { fieldName: 'END_DATE', header: '종료일', width: 80, renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          } },
        this.getIconColumn({headerText: 'PDF 조회', fieldName: 'DATAIL', columnWidth: 70, type: 'detail'}),
      ]
    }
  },
  methods:{
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param: {
            'PAY_MONTH_FROM': this.payrollMonthStart.replace('-', ''),
            'PAY_MONTH_TO': this.payrollMonthEnd.replace('-', '')
          },
          url: '/payroll/code/pay-date/list-private'
        });
        this.setRealgridData(data.list || []);
      }
      catch(e) {
        console.error("EssPayroll loadGridData err: ", e);
      }
    },
    onSearch() {
      this.loadGridData();
    },
    realgridCreatedCallback: function() {
      let me = this;

      this.gridView.onCellItemClicked= function(grid,index,clickData){

        let _rowData = me.dataProvider.getJsonRow(index.dataRow);

        let form = JSON.stringify({
          "PAY_MONTH" : _rowData['PAY_MONTH'],
          "SEQ" : _rowData['SEQ'],
          "PERSONAL_INFO_MASK": 'N',
          "RPT_LANG": "KOREAN"
        });


        let {data} = me.$httpPost({
          url: '/payroll/payslip/download-my-pdff',
          param:{
            'FORM_DATA': form
          },
          blob: true
        })
        me.openPdf(data, "급여명세서 조회");

      }
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'ess-payroll-grid'});
    this.loadGridData();
  },
  name: "esspayroll"
}
</script>

<style scoped>

</style>