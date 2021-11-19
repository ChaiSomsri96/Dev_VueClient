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
          <div id="ess-salaryhistory-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          param: {
            formData: JSON.stringify({
              "PAY_MONTH":this.payrollMonthEnd.replace('-', ''),
              "SEQ":"1",
              "PREV":"11",
              "PERSONAL_INFO_MASK":"N",
              "RPT_LANG":"KOREAN"})

          },
          url: '/payroll/salaryqry/mypayhistory/list'
        });

        this.fields= [
          { fieldName: 'EMPNAM_MASK', dataType: 'text' },
          { fieldName: 'HRDEPT_NAM', dataType: 'text' },
          { fieldName: 'E_JOIN_DATE', dataType: "data" },
          { fieldName: 'RETIRE_DATE', dataType: "data" },
          { fieldName: 'PAY_CODE', dataType: 'text' },
          { fieldName: 'PAY_NAM', dataType: 'text' },
        ];
        this.columns= [
          { fieldName: 'EMPNAM_MASK', header: '성명', width: 100 ,styleName: "left-column",},
          { fieldName: 'HRDEPT_NAM', header: '부서', width: 100,styleName: "left-column"},
          { fieldName: 'E_JOIN_DATE', header: '입사일', width: 100,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                return year+'.'+month;
              }
            }},
          { fieldName: 'RETIRE_DATE', header: '퇴사일', width: 100,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                return year+'.'+month;
              }
            }},
          { fieldName: 'PAY_CODE', header: '급여코드', width: 100,styleName: "left-column" },
          { fieldName: 'PAY_NAM', header: '급여코드명', width: 100,styleName: "left-column" },
        ]



        data.sort(function(a, b) { // 오름차순
          return a.EMPNAM_MASK < b.EMPNAM_MASK ? -1 : a.EMPNAM_MASK > b.EMPNAM_MASK ? 1 : 0;
        });

        let tempColumns = Object.assign({}, data[0]);
        for (let i = 0; i < this.columns.length; i++) {
          delete tempColumns[this.columns[i].fieldName];
        }

        let includeDataIndex = [];

        $.each(tempColumns, function(key, value){
          includeDataIndex.push(key);
        });

        let keyPayAmtTot = "";
        let keyPayTaxTot = "";
        let appendColumn = includeDataIndex.sort();

        // 최신 날짜가 왼쪽으로 표시되는 역순으로 표시하기 위해 for를 꺼꾸로 돌림
        for (let j = appendColumn.length - 1; j >= 0; j--) {

          let key = appendColumn[j];

          if (key === "EMPLOYEE_SUMMARY"|| key === "EMP_NUMBER" || key === "RANK_NAM"|| key === "EID" || key === "EMP_NAM" || key === "FCTYPE" || key === "PERSONAL_INFO_MASK" || key === "FROM_PAYMONTH" || key === "TO_PAYMONTH" || key === "CLI_NAM"){
            continue;
          } else {
            if (key === "PAYTAX_IDX") {
              keyPayTaxTot = key;
            } else if (key === "PAYAMT_TOT") {
              keyPayAmtTot = key;
            } else {

              if (!isNaN(key.replace('-', '')) && key.length > 5) {
                this.fields.push({
                  fieldName: key,
                  dataType: 'number'
                });
                this.columns.push({
                  header: key,
                  fieldName: key,
                  numberFormat: "#,##0", styleName: "right-column",
                  groupFooter: {
                    text: "",
                    numberFormat: "#,##0",
                    expression: "sum"
                  },
                  footer: {
                    text: "",
                    numberFormat: "#,##0",
                    expression: "sum"
                  }
                });
              } else {
                this.fields.push({
                  fieldName: key,
                  dataType: key
                });
                this.columns.push({
                  header: key,
                  fieldName: key,
                });
              }
            }
          }
        }

        // PAYTAX_IDX 필드를 가장 나중으로 보내기 위해 별도로 처리
        this.columns.push({header: keyPayTaxTot, fieldName: keyPayTaxTot, hidden: true});
        this.columns.push({
          header: keyPayAmtTot, fieldName: keyPayAmtTot, width: 110,
          numberFormat: "#,##0", styleName: "right-column",
          groupFooter: {
            text: "",
            numberFormat: "#,##0",
            expression: "sum"
          },
          footer: {
            text: "",
            numberFormat: "#,##0",
            expression: "sum"
          }
        });

        this.setFieldsNColumns();
        this.setRealgridData(data || []);

        // this.gridView.setColumnProperty("EMPNAM_MASK", "groupFooter", {
        //   text: "소계",
        //   numberFormat: "decimalFormat",
        //   styleName: "text-right"
        // });
        // this.gridView.setColumnProperty("EMPNAM_MASK", "footer", {
        //   text: "소계",
        //   numberFormat: "decimalFormat",
        //   styleName: "text-right"
        // });
        // this.gridView.groupBy(["EMPNAM_MASK"]);
      } catch (e) {
        console.error("EssPayroll loadGridData err: ", e);
      }
    },
    onSearch() {
      this.loadGridData();
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'ess-salaryhistory-grid'});
    this.loadGridData();
  },
}
</script>

<style scoped>

</style>