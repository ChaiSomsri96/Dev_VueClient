<template>
  <base-modal title="전당월 비교 조회" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <div class="btn-wrap">
          <button class="btn btn-md flat" @click="downloadRealGridExcel('급여이력 조회');">
            <i class="icon-lineIcon-download mr-5"></i>다운로드
          </button>
        </div>
      </div>
      <div class="row" style="height: 500px;">
        <div id="pay-review-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
          url: '/payroll/salaryqry/paycurrprev/list',
          param: {
            formData: JSON.stringify({
              "PAY_MONTH1":__param.formData.PAY_MONTH1,
              "SEQ1":__param.formData.SEQ1,
              "PAY_MONTH2":__param.formData.PAY_MONTH2,
              "SEQ2":__param.formData.SEQ2,
              "PAY_GAAP":"1",
              "PAY_GAAP2":"1",
              "GAP_RATIO":__param.formData.GAP_RATIO,
              "GROUPBY":"PIN",
              "BP_CODE":null,
              "MODIFY_TYPE":null,
              "PERSONAL_INFO_MASK":__param.formData.PERSONAL_INFO_MASK,
              "RPT_LANG":"KOREAN"
             }),
            paycdList:JSON.stringify(__param.paycdList),
          }
        });

        this.columns = [
          { fieldName: 'EMP_NUMBER', header: '사번', width: 100 },
          { fieldName: 'EMP_NAM', header: '성명', width: 100 },
          { fieldName: 'HRDEPT_NAM', header: '부서', width: 100},
          { fieldName: 'E_JOIN_DATE', header: '입사일', width: 100 },
          { fieldName: 'RETIRE_DATE', header: '퇴사일', width: 100 },
          { fieldName: 'PAY_CODE', header: '급여코드', width: 100 },
          { fieldName: 'PAYNAM', header: '급여코드명', width: 100 },
          { fieldName: 'PAYAMT_PREV', header: '전월금액', width: 100,
            numberFormat: "#,##0", styleName: "right-column",
            footer: {
              text: "0",
              expression: "sum",
              numberFormat: "#,##0",
            }},
          { fieldName: 'PAYAMT_CURR', header: '당월금액', width: 100,
            numberFormat: "#,##0", styleName: "right-column",
            footer: {
              text: "0",
              expression: "sum",
              numberFormat: "#,##0",
            }},
          { fieldName: 'PAYAMT_GAP', header: 'Gap', width: 100,
            numberFormat: "#,##0", styleName: "right-column",
            footer: {
              text: "0",
              expression: "sum",
              numberFormat: "#,##0",
            }},
          { fieldName: 'GAP_RATIO', header: '%', width: 100 },
        ];
        this.fields = [
          { fieldName: 'EMP_NUMBER',     dataType: 'text' },
          { fieldName: 'EMP_NAM', dataType: 'text' },
          { fieldName: 'HRDEPT_NAM', dataType: 'text' },
          { fieldName: 'E_JOIN_DATE',  dataType: 'text' },
          { fieldName: 'RETIRE_DATE',     dataType: 'text' },
          { fieldName: 'PAY_CODE', dataType: 'text' },
          { fieldName: 'PAYNAM', dataType: 'text' },
          { fieldName: 'PAYAMT_PREV',  dataType: 'number' },
          { fieldName: 'PAYAMT_CURR',     dataType: 'number' },
          { fieldName: 'PAYAMT_GAP', dataType: 'number' },
          { fieldName: 'GAP_RATIO', dataType: 'number' },
        ]

        data.sort(function(a, b) { // 오름차순
          return a.EMP_NUMBER < b.EMP_NUMBER ? -1 : a.EMP_NUMBER > b.EMP_NUMBER ? 1 : 0;
        });

        this.setFieldsNColumns();
        this.setRealgridData(data || []);
        // this.gridView.setColumnProperty("202107-3", "footer", {expression: "sum"});
        this.gridView.groupBy(["EMP_NUMBER"]);
      }
      catch(e) {
        console.log("payreviewModal loadGridData error", e);
      }
    },
    sortPayDate: function (payDateArr) {
      let i, j, temp = 0;

      for (i = 0; i < payDateArr.length; i++) {
        for (j = 0; j < payDateArr.length - 1; j++) {
          if (payDateArr[j] < payDateArr[j + 1]) {
            temp = payDateArr[j];
            payDateArr[j] = payDateArr[j + 1];
            payDateArr[j + 1] = temp;
          }
        }
      }
    },
    //modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'pay-review-modal-grid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}
</script>