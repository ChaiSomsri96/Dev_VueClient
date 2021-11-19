<template>
  <base-modal title="세액 계산결과" id="sev-create-pay-slip-modal" :scroll="false" width="1380">
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
          <div id="sev-pay-slip-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
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
        // 차대, 계정코드, 금액, 코스트센터, 코스트셑너명, 사번, 적요
        {fieldName: 'EMP_NUMBER', dataType: "text"},
        {fieldName: 'ETC', dataType: "text"},
        {fieldName: 'EMP_NAME', dataType: "number"},
        {fieldName: 'BANK_CD', dataType: "text"},
        {fieldName: 'BANK_NAME', dataType: "text"},
        {fieldName: 'BANK_ENAME', dataType: "text"},
        {fieldName: 'BANK_AC', dataType: "text"},
      ],
      columns: [
        {fieldName: 'EMP_NUMBER', header: '차/대', styleName: 'left-column'},
        {fieldName: 'ETC', header: '계정코드', styleName: 'left-column'},
        {fieldName: 'EMP_NAME', header: '금액', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'BANK_CD', header: '코스트센터', styleName: 'left-column'},
        {fieldName: 'BANK_NAME', header: '코스트센터명', styleName: 'left-column'},
        {fieldName: 'BANK_ENAME', header: '사번', styleName: 'left-column'},
        {fieldName: 'BANK_AC', header: '적요', styleName: 'left-column'},
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
        'domId': 'sev-pay-slip-grid',
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