<template>
  <div>
    <ui-header :msg="'소득세 원천징수 확인서 출력'" />
    <div class="content-body">
      <div>
        <h3>매월 급여용 계좌</h3>
      </div>
      <div class="form-wrap">

        <labeled-input input-label="은행" class="row" labelClass="col-2" inputClass="col-3" >
          <mastcode-dropdown :options="{superCode: '22'}"
                             v-model="basicData.BANK_CD1.value"
                             @change="basicData.BANK_CD1.value=$event;"/>
        </labeled-input>
        <labeled-input input-label="계좌번호" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.PURPOSE1.value"
                    @change="basicData.PURPOSE1.value=$event;"
                    :options="{disabled: basicData.PURPOSE1.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="예금주명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.SUBMIT_TO1.value"
                    @change="basicData.SUBMIT_TO1.value=$event;"
                    :options="{disabled: basicData.SUBMIT_TO1.isReadOnly}"/>
        </labeled-input>

      </div>
      <div>
        <h3>상여금용 계좌</h3>
      </div>
      <div class="form-wrap">

        <labeled-input input-label="은행" class="row" labelClass="col-2" inputClass="col-3" >
          <mastcode-dropdown :options="{superCode: '22'}"
                             v-model="basicData.BANK_CD2.value"
                             @change="basicData.BANK_CD2.value=$event;"/>
        </labeled-input>
        <labeled-input input-label="계좌번호" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.PURPOSE2.value"
                    @change="basicData.PURPOSE2.value=$event;"
                    :options="{disabled: basicData.PURPOSE2.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="예금주명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.SUBMIT_TO2.value"
                    @change="basicData.SUBMIT_TO2.value=$event;"
                    :options="{disabled: basicData.SUBMIT_TO2.isReadOnly}"/>
        </labeled-input>

      </div><div>
      <h3>퇴직금용 계좌</h3>
    </div>
      <div class="form-wrap">

        <labeled-input input-label="은행" class="row" labelClass="col-2" inputClass="col-3" >
          <mastcode-dropdown :options="{superCode: '22'}"
                             v-model="basicData.SEV_PENSION_BANK_CD.value"
                             @change="basicData.SEV_PENSION_BANK_CD.value=$event;"/>
        </labeled-input>
        <labeled-input input-label="계좌번호" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.SEV_PENSION_BANK_AC.value"
                    @change="basicData.SEV_PENSION_BANK_AC.value=$event;"
                    :options="{disabled: basicData.SEV_PENSION_BANK_AC.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="예금주명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.SEV_PENSION_ACHOLDER.value"
                    @change="basicData.SEV_PENSION_ACHOLDER.value=$event;"
                    :options="{disabled: basicData.SEV_PENSION_ACHOLDER.isReadOnly}"/>
        </labeled-input>

      </div>
      <div>
        <div class="col-12">
          <button-panel btnType="bottom">
            <template v-slot:start>
              <button type="button"
                      class="btn btn-md black"
                      v-on:click="saveStatement">
                <i class="icon-lineIcon-check mr-5"></i><span v-text="message.save[locale]">저장</span>
              </button>
            </template>
          </button-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LabeledInput from '@/components/common/LabeledInput';
import ButtonPanel from "../../../components/common/ButtonPanel";

import MastcodeDropdown from '@/components/common/MastcodeDropdown';
export default {
  components:{
    LabeledInput,
    ButtonPanel,
    MastcodeDropdown
  },
  data() {
    return {
      locale: 'ko_KR',
      showView : false,
      errors: {},
      basicData: {
        BANK_CD1: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '은행계좌를 입력해주세요',
        },
        PURPOSE1: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '사용목적을 입력해주세요',
        },
        SUBMIT_TO1: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '제출처를 입력해주세요',
        },
        BANK_CD2: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '은행계좌를 입력해주세요',
        },
        PURPOSE2: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '사용목적을 입력해주세요',
        },
        SUBMIT_TO2: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '제출처를 입력해주세요',
        },
        SEV_PENSION_BANK_CD: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '은행계좌를 입력해주세요',
        },
        SEV_PENSION_BANK_AC: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '사용목적을 입력해주세요',
        },
        SEV_PENSION_ACHOLDER: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '제출처를 입력해주세요',
        },

      },
      message: {
        save: {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'}
      }
    }
  },
  methods:{
    async asyncData(){

    },
    async saveStatement() {


    },

    onChangeLangType: function(fd) {

    },
  },
  mounted() {
    this.asyncData();
  },
}
</script>

<style scoped>

</style>