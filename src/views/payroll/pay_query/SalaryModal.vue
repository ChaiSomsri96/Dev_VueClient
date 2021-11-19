<template>
  <base-modal title="조회" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>개인정보</span>
            </label>
            <div class="row col-7">
              <ui-radio-button-inline :options="formData.profileVisible"
                                      @change="formData.profileVisible.value=$event.value" />
            </div>
            <label class="form-label type2 col-4">
              <span>값이 없는 회차</span>
            </label>
            <div class="row col-7">
              <ui-radio-button-inline :options="formData.zeroSupp"
                                      @change="formData.zeroSupp.value=$event.value" />
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
      paymonth:'',
      seq:'',
      formData: {
        REPORT_SEQ: {
          value: '',
          items: []
        },
        zeroSupp: { //값이 없는 회차
          name: 'zero-supp',
          value: 'NO',
          domOptList: [
            { value: 'YES', label: '표시', id: 'zero-supp-visible' },
            { value: 'NO', label: '숨김', id: 'zero-supp-hide' }
          ]
        },
        profileVisible: { //개인정보
          name: 'profile-visible',
          value: 'N',
          domOptList: [
            { value: 'N', label: '표시', id: 'profile-visible' },
            { value: 'Y', label: '숨김', id: 'profile-hide' }
          ]
        },
      },
    }
  },
  methods: {

    async asyncDynamicComponentData(_param) {
      this.paymonthseq = _param.paymonthseqList;
      this.paymonth = _param.PAY_MONTH;
      this.seq = _param.SEQ;
    },
    onSelect() {
      this.close({formData: {
          zeroSupp: this.formData.zeroSupp.value,
          personalInfoMask: this.formData.profileVisible.value,
          paymonth : this.paymonth,
          seq : this.seq
        }});
    },
    async loadEarnerRegTypeItems() {

    },
    async onCancel(){

    },
  }
}
</script>
