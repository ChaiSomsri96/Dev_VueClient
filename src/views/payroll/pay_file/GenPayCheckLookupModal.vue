<template>
  <base-modal title="급여전표" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <button class="btn btn-md" @click="downloadRealGridExcel('급여대장 조회');">
          <i class="icon-lineIcon-download mr-5"></i>다운로드
        </button>
      </div>
      <div class="row" style="height: 500px;">
        <div id="gen-pay-check-lookup-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
      fields: [
        { fieldName: 'DRCR',  dataType: 'text' },
        { fieldName: 'ACCT_CODE',     dataType: 'text' },
        { fieldName: 'ALLOC_AMOUNT', dataType: 'number' },
        { fieldName: 'CCENTER_CODE', dataType: 'text' },
        { fieldName: 'CCENTER_NAM', dataType: 'text' },
        { fieldName: 'LINE_REMARK', dataType: 'text' },
      ],
      columns: [
        { fieldName: 'DRCR', header: '차/대', width: 100 },
        { fieldName: 'ACCT_CODE', header: '계정코드', width: 30 },
        { fieldName: 'ALLOC_AMOUNT', header: '금액', width: 120 },
        { fieldName: 'CCENTER_CODE', header: '코스트센터', width: 200, styleName: "left-column" },
        { fieldName: 'CCENTER_NAM', header: '코스트센터명', width: 200, styleName: "left-column" },
        { fieldName: 'LINE_REMARK', header: '적요', width: 200, styleName: "left-column" },
      ]
    }
  },
  methods: {
    async loadGridData(__param) {
      try {
        this.fields = [];
        this.columns = [];
        let { data } = await this.$httpPost({
          url: '/payroll/salary-if/jlposting/list',
          param: {
            formData: JSON.stringify({
              "JL_RULE_NO": __param.formData.JL_RULE_NO.value,
              "JL_DATE": __param.formData.JL_DATE.value,
              "REMARK_PREFIX": __param.formData.REMARK_PREFIX.value,
              "REMARK_SUFFIX": __param.formData.REMARK_SUFFIX.value,
              "FIXED_STR1_FOR_FLEX": __param.formData.FIXED_STR1_FOR_FLEX.value,
              "FIXED_STR2_FOR_FLEX": this.__param.formData.FIXED_STR2_FOR_FLEX.value,
            }),
            paymonthseqList: JSON.stringify(__param.paymonthseqList)
          }
        });

        this.setRealgridData(data || []);
      }
      catch(e) {
        console.log("PaycheckReportModal loadGridData error", e);
      }
    },
    //modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'gen-pay-check-lookup-grid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}
</script>