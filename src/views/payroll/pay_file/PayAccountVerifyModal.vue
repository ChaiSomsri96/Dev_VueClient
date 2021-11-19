<template>
  <base-modal title="급여계좌 검증" id="pay_account_verify_modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <div class="btn-wrap">
          <button class="btn btn-md flat" @click="downloadRealGridExcel('급여이력 조회');">
            <i class="icon-lineIcon-download mr-5"></i>다운로드
          </button>
        </div>
      </div>
      <div class="row" style="height: 500px;">
        <div id="payAccountVerifyGrid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
        { fieldName: 'EMP_NUMBER',  dataType: 'text' },
        { fieldName: 'EMP_NAME',  dataType: 'text' },
        { fieldName: 'NET_PAY_SUM',  dataType: 'number' },
        { fieldName: 'BANK_CD',  dataType: 'text' },
        { fieldName: 'BANK_NAME', dataType: 'text' },
        { fieldName: 'BANK_AC', dataType: 'text' },
        { fieldName: 'REAL_ACCOUNT', dataType: 'text' },
      ],
      columns: [

        { fieldName: 'EMP_NUMBER', header: '사번', width: 90 },
        { fieldName: 'EMP_NAME', header: '이름', width: 90 },
        { fieldName: 'NET_PAY_SUM', header: '순지급액', width: 100 ,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0"}},
        { fieldName: 'BANK_CD', header: '은행코드', width: 100 },
        { fieldName: 'BANK_NAME', header: '은행명', width: 100 },
        { fieldName: 'BANK_AC', header: '은행계좌', width: 100},
        { fieldName: 'REAL_ACCOUNT', header: '실명확인', width: 100},

      ]
    }
  },
  methods: {
    async loadGridData(__param) {
      try {
        let {data} = await this.$httpPost({
          url: '/payroll/salary-if/bankTest',
          param: {
            "paymonthseqList": JSON.stringify(__param['paymonthseqList'])
          }
        });
        this.setRealgridData(data || []);
      }
      catch(e)    {
        console.log("payAccountVerifyGrid loadGridData error", e);
      }
    },
    //modal
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'payAccountVerifyGrid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}
</script>