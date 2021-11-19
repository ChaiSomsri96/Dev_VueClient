<template>
  <base-modal title="세액 계산결과" id="sev-tax-calc-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <div class="form-row">
          <button-panel
              btnType='top'
              v-bind:download=true
              v-on:download="downloadRealGridExcel"
          />
        </div>
      </div>
      <div class="row">
        <div class="row" style="height: 400px;">
          <div id="sev-bank-acc-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
        </div>
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
import ButtonPanel from "@/components/common/ButtonPanel";
export default {
  mixins: [modal, grid],
  components: {
    BaseModal,
    ButtonPanel
  },
  data() {
    return {
      fields: [
        //사원번호, 기타항목1, 사원명, 은행코드, 은행이름-한글, 은행이름-영어, 계좌번호, 금액, 직급코드
        {fieldName: 'EMP_NUMBER', dataType: "text"},
        {fieldName: 'ETC', dataType: "text"},
        {fieldName: 'EMP_NAME', dataType: "text"},
        {fieldName: 'BANK_CD', dataType: "text"},
        {fieldName: 'BANK_NAME', dataType: "text"},
        {fieldName: 'BANK_ENAME', dataType: "text"},
        {fieldName: 'BANK_AC', dataType: "text"},
        {fieldName: 'AMOUNT', dataType: "number"},
        {fieldName: 'EMPRANK_CD', dataType: "text"},
      ],
      columns: [
        {fieldName: 'EMP_NUMBER', header: '사원번호', styleName: 'left-column'},
        {fieldName: 'ETC', header: '기타항목1', styleName: 'left-column'},
        {fieldName: 'EMP_NAME', header: '사원명', styleName: 'left-column'},
        {fieldName: 'BANK_CD', header: '은행코드', styleName: 'left-column'},
        {fieldName: 'BANK_NAME', header: '은행이름-한글', styleName: 'left-column'},
        {fieldName: 'BANK_ENAME', header: '은행이름-영어', styleName: 'left-column'},
        {fieldName: 'BANK_AC', header: '계좌번호', styleName: 'left-column'},
        {fieldName: 'AMOUNT', header: '금액', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'EMPRANK_CD', header: '직급코드', styleName: 'left-column'},
      ]
    }
  },
  methods: {
    loadGridData( ) {
      this.setRealgridData();
    },
    //modal
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'sev-bank-acc-grid',
        'gridParent': 'modal'
      });
    },
    asyncDynamicComponentData() {
      this.loadGridData();
    }
  }
}

</script>

<style scoped>

</style>