<template>
  <base-modal title="급여이력 조회" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <div class="btn-wrap">
          <button class="btn btn-md flat" @click="downloadRealGridExcel('급여이력 조회');">
            <i class="icon-lineIcon-download mr-5"></i>다운로드
          </button>
        </div>
      </div>
      <div class="row" style="height: 500px;">
        <div id="salary-history-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>창닫기
        </button>

      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';

export default {
  mixins: [modal, grid],
  components: {
    BaseModal
  },
  data() {
    return {
      fields: [],
      columns: [],
    }
  },
  methods: {
    async loadGridData(__param) {
      try {
        this.fields = [];
        this.columns = [];
        let { data } = await this.$httpPost({
          url: '/payroll/salaryqry/payhistory/list',
          param: {
            formData: JSON.stringify({
              "PAY_MONTH":__param.formData.paymonth,
              "SEQ":__param.formData.seq,
              "PREV":"1",
              "PAY_GAAP":"1",
              "GROUPBY":"PIN",
              "SELECT_PAYCODE":"ALL",
              "SPECIALPAY_FLAG":null,
              "HIDE_TAXABLE_NONTAXABLE":"N",
              "HIDE_TOTAL_NET_AMT":"N",
              "HIDE_ZERO_MONTHSEQ":"N",
              "PERSONAL_INFO_MASK":__param.formData.personalInfoMask,
              "RPT_LANG":"KOREAN",
              "EMP_SEL":"ALL",
              "RTYPE": __param.formData.rtype,}),
            paycdList:'[]',
            paymonthseqList:'[]',
            eidList: '[]'
          }
        });

        this.columns = [
          { fieldName: 'EMPNAM_MASK', header: '성명', width: 100 ,styleName: "left-column",},
          { fieldName: 'HRDEPT_NAM', header: '부서', width: 100,styleName: "left-column"},
          { fieldName: 'E_JOIN_DATE', header: '입사일', width: 100 },
          { fieldName: 'RETIRE_DATE', header: '퇴사일', width: 100 },
          { fieldName: 'PAY_CODE', header: '급여코드', width: 100,styleName: "left-column" },
          { fieldName: 'PAY_NAM', header: '급여코드명', width: 100,styleName: "left-column" },

        ];
        this.fields = [
          { fieldName: 'EMPNAM_MASK', dataType: 'text' },
          { fieldName: 'HRDEPT_NAM', dataType: 'text' },
          { fieldName: 'E_JOIN_DATE',  dataType: 'text' },
          { fieldName: 'RETIRE_DATE',     dataType: 'text' },
          { fieldName: 'PAY_CODE', dataType: 'text' },
          { fieldName: 'PAY_NAM', dataType: 'text' },
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

          if (key === "EMPLOYEE_SUMMARY" || key === "EID" || key === "EMP_NAM" || key === "FCTYPE" || key === "PERSONAL_INFO_MASK" || key === "FROM_PAYMONTH" || key === "TO_PAYMONTH" || key === "CLI_NAM"){
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
          // footer: {
          //   text: "0",
          //   expression: "sum",
          //   numberFormat: "#,##0",
          // }
        });

        this.setFieldsNColumns();
        this.setRealgridData(data || []);

        this.gridView.setColumnProperty("EMPNAM_MASK", "groupFooter", {
          text: "소계",
              numberFormat: "decimalFormat",
              styleName: "text-right"
        });
        this.gridView.setColumnProperty("EMPNAM_MASK", "footer", {
          text: "소계",
          numberFormat: "decimalFormat",
          styleName: "text-right"
        });
        this.gridView.groupBy(["EMPNAM_MASK"]);
      }
      catch(e) {
        console.log("salaryhistoryModal loadGridData error", e);
      }
    },
    //modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'salary-history-modal-grid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}
</script>