<template>
  <base-modal title="퇴직금 입력" id="sev-pension-matter-emp-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <div class="row col-6" style="height: 500px;">
        <div id="sev-pension-enroll-emp" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave"  >
          <i class="icon-lineIcon-check mr-5"></i>저장
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
  mixins: [modal,grid],
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
    onCancel(){

    },

    onSave() {

    },

    async loadGridData(__param) {
      try {
        this.fields = [];
        this.columns = [];
        let { data } = await this.$httpPost({
          url: '/payroll/payrollqry/monthly-horizon/list',
          param: { }
        });
        this.setFieldsNColumns();
        this.setRealgridData(data.rows || []);
      }
      catch(e) {
        console.log("PaycheckReportModal loadGridData error", e);
      }
    },
    //modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'sev-pension-enroll-emp'
      });
      this.createGridFrame({
        'domId': 'sev-pension-not-enroll-emp'
      });
      this.createRealGrid({'domId': 'payroll-ledger-grid'});
      this.createRealGrid({'domId': 'payroll-ledger-grid'});
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  },
  mounted() {}
}
</script>
