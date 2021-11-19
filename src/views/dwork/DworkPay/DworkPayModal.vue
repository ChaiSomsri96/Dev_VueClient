<template>
  <base-modal title="불러오기" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>월별근무여부표시</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="formData.REPORT_SEQ.items"
                           :value="formData.REPORT_SEQ.value"
                           @change="formData.REPORT_SEQ.value=$event.value;"
                           :options="{
                                     valueField  : 'REAL_CODE',
                                     labelField  : 'CODE_NAME',
                                     tooltipField: 'CODE_NAME'}"/>
            </div>

          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>개인정보 표시</span>
            </label>
            <div class="row col-7">
              <ui-radio-button-inline :options="formData.profileVisible"
                                      @change="formData.profileVisible.value=$event.value" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md black" data-dismiss="modal" @click="onBtnPdfDown" >조회
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
export default {
  mixins: [modal],
  components: {
    BaseModal,
    UiRadioButtonInline
  },
  data() {
    return {
      WORK_MON:'',
      DEID_LIST:[],
      formData: {
        REPORT_SEQ: {
          value: 'D',
          items: [
            { CODE_NAME: '표시하지 않음', REAL_CODE: 'D' },
            { CODE_NAME: '표시함', REAL_CODE: 'N' }
          ]
        },
        profileVisible: { //개인정보
          name: 'profile-visible',
          value: 'Y',
          domOptList: [
            { value: 'Y', label: '표시', id: 'profile-visible' },
            { value: 'N', label: '숨김', id: 'profile-hide' }
          ]
        },
      },
    }
  },
  methods:{
    asyncDynamicComponentData(_param) {
      this.WORK_MON = _param.WORK_MON
      this.DEID_LIST = _param.DEID_LIST
      console.log(this.WORK_MON)

    },
    async onBtnPdfDown() {
      let { data } = await this.$httpPost({
        url: '/payroll/salaryqry/daily-worker/pay-slip-pdf-down-list',
        param: {
              PAY_DATE:null,
              DEID_LIST: JSON.stringify(this.DEID_LIST),
              WORK_MON: this.WORK_MON,
              EMP_SEL: 'SELECT',
              CONTENTS: null,
              EMAIL_SENDER:null
              },
        blob: true
      });
      this.openPdf(data, "아르바이트 급여명세서 조회");
    }
  }
}
</script>

<style scoped>

</style>