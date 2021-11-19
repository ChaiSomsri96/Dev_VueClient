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
          <div id="sev-tax-calc-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
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
        //기준일, 차수, 매터이름, 성명, 부서, 직급, 입사일, 퇴사일, 계산식, 계산식 이름, 계산식의 적립율
        {fieldName: 'EMP_NAME', dataType: "text"},
        {fieldName: 'SEV_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'J24', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'INTER_PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'AE24', dataType: "text"},
        {fieldName: 'SEV_REAL_FINAL_AMT', dataType: "number"},
        {fieldName: 'AB55', dataType: "number"},
        {fieldName: 'J61', dataType: "number"},
        {fieldName: 'R61', dataType: "number"},
      ],
      columns: [
        {fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
        {fieldName: 'SEV_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'J24', header: '기산일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'INTER_PAY_DATE', header: '중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_DATE', header: '퇴직일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'AE24', header: '정산 근속연수', styleName: 'left-column'},
        {fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'AB55', header: '이연퇴직소득세', styleName: 'right-column'},
        {fieldName: 'J61', header: '소득세', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'R61', header: '지방소득세', styleName: 'right-column', numberFormat: '#,##0'}
      ]
    }
  },
  methods: {
    loadGridData( list) {
      this.setRealgridData(list.checkedMembers || []);
    },
    //modal
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'sev-tax-calc-grid',
        'gridParent': 'modal'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}

</script>

<style scoped>

</style>