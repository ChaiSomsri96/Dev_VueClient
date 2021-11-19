<template>
  <base-modal title="퇴직연금 대상장 조회" id="sev-pension-matter-emp-modal" :scroll="false" width="1380">
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
          <div id="sev-pension-matter-emp-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
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
        {fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_PENSION_SEQ', dataType: "number"},
        {fieldName: 'SEV_PENSION_MATTER_NAME', dataType: "text"},
        {fieldName: 'EMP_NAME', dataType: "text"},
        {fieldName: 'HRDEPT_NAMK', dataType: "text"},
        {fieldName: 'RANK_NAME', dataType: "text"},
        {fieldName: 'E_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'RETIRE_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_CONTROL_NO', dataType: "text"},
        {fieldName: 'SEV_CONTROL_TITLE', dataType: "text"},
        {fieldName: 'SEV_RPEN_RATE_TYPE', dataType: "text"},
      ],
      columns: [
        {fieldName: 'SEV_DATE', header: '기준일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_PENSION_SEQ', header: '차수', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'SEV_PENSION_MATTER_NAME', header: '매터이름', styleName: 'left-column'},
        {fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
        {fieldName: 'HRDEPT_NAMK', header: '부서', styleName: 'left-column'},
        {fieldName: 'RANK_NAME', header: '직급', styleName: 'left-column'},
        {fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'RETIRE_DATE', header: '퇴사일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_CONTROL_NO', header: '계산식', styleName: 'left-column'},
        {fieldName: 'SEV_CONTROL_TITLE', header: '계산식 이름', styleName: 'left-column'},
        {fieldName: 'SEV_RPEN_RATE_TYPE', header: '계산식의 적립율', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            switch (value) {
              case 'R':
                return '근속기간에 따른 연적립율';
              case 'P':
                return '인사카드에 있는 개인별 연적립율';
              case 'F':
                return '고정된 연적립율';
              default:
                return '';
            }
          }
        }
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
        'domId': 'sev-pension-matter-emp-grid',
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