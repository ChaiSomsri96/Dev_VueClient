<template>
  <base-modal title="업로드" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>급여대장 번호</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="formData.REPORT_SEQ.items"
                           :value="formData.REPORT_SEQ.value"
                           @change="formData.REPORT_SEQ.value=$event.value;"
                           :options="{
                                     valueField  : 'REPORT_SEQ',
                                     labelField  : 'REPORT_SEQ_NAME',
                                     tooltipField: 'REPORT_SEQ_NAME'}"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>집계기준</span>
            </label>
            <div class="row col-7">
              <ui-radio-button-inline :options="formData.aggregationCriteria"
                                      @change="formData.aggregationCriteria.value=$event.value" />
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>개인정보</span>
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
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black"  @click="onSelect" >
          <i class="icon-lineIcon-check mr-5" ></i>조회
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
      paymonthseq : [],
      formData: {
        REPORT_SEQ: {
          value: '',
          items: []
        },
        aggregationCriteria: { //집계기준
          name: 'aggregation-criteria',
          value: 'MONTH_SEQ',
          domOptList: [
            { value: 'MONTHLY', label: '월별', id: 'aggregation-criteria-monthly' },
            { value: 'MONTH_SEQ', label: '월별+차수별', id: 'aggregation-criteria-monthly-seq' }
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
  methods: {

    async asyncDynamicComponentData(_param) {
      this.paymonthseq = _param.paymonthseqList;
      try {
        const {data} = await this.$httpPost({param: {},url: '/payroll/code/payrolldesignpivotstyle/list-by-month'});
        this.formData.REPORT_SEQ.items = data || [];
        this.formData.REPORT_SEQ.value = data[0].REPORT_SEQ
      }catch(e) {
        console.error( e);
      }
    },
    onSelect() {
      this.close({formData: {
              reportSeq: this.formData.REPORT_SEQ.value,
              rtype: this.formData.aggregationCriteria.value,
              personalInfoMask: this.formData.profileVisible.value,
          }, paymonthseqList: this.paymonthseq});
    },
    async loadEarnerRegTypeItems() {

    },
    async onCancel(){

    },
  }
}
</script>
