<template>
  <base-modal title="정산년도 입력" id="payentry-input-modal" :scroll="false" size="large" width="1000">
    <template v-slot:body>
      <div class="content-body">
        <labeled-input input-label="재직자 연말정산 년도" class="row" labelClass="title-wrap col-3" inputClass="col-2">
          <ui-input-year :value="settleYear.INCUM_YEAR"
                         @change="settleYear.INCUM_YEAR=$event; settleYear.return=$event;"
                         />
        </labeled-input>
        <labeled-input input-label="퇴사자 연말정산 년도" class="row" labelClass="title-wrap col-3" inputClass="col-2">
          <ui-input-year :value="settleYear.TERMI_YEAR"
                         @change="settleYear.TERMI_YEAR=$event; settleYear.return=$event;" />
        </labeled-input>
        <labeled-input input-label="근로소득원천징수 의무자" class="row" labelClass="title-wrap col-3" inputClass="col-6">
          <ui-radio-button-inline :options="withholdingAgent"  @change="settleYear.WITHHOLDING_AGENT=$event.value"  />
        </labeled-input>
        <div><br>
          <h3 class="title-wrap">임직원 소득공제신고서에서 증빙체크할 사항</h3><br>
          <div class="form-group">
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_INCOME"
                       :checked="settleYear.CRT_EVID_INCOME=='Y'"
                       name='CRT_EVID_INCOME'>
                <i class="black"></i>
                소득(전직장 원천징수영수증 포함)
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_FAMILY"
                       :checked="settleYear.CRT_EVID_FAMILY=='Y'"
                       name='CRT_EVID_FAMILY'>
                <i class="black"></i>
                부양가족
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_INS"
                       :checked="settleYear.CRT_EVID_INS=='Y'"
                       name='CRT_EVID_INS'><i class="black"></i>보험료
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_MEDI"
                       :checked="settleYear.CRT_EVID_MEDI=='Y'"
                       name='CRT_EVID_MEDI'><i
                  class="black"></i>의료비</label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_EDU"
                       :checked="settleYear.CRT_EVID_EDU=='Y'"
                       name='CRT_EVID_EDU'><i class="black"></i>교육비
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_CARD"
                       :checked="settleYear.CRT_EVID_CARD=='Y'"
                       name='CRT_EVID_CARD'><i class="black"></i>신용카드
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_DONA"
                       :checked="settleYear.CRT_EVID_DONA=='Y'"
                       name='CRT_EVID_DONA'><i class="black"></i>기부금
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_SAVINGS"
                       :checked="settleYear.CRT_EVID_SAVINGS=='Y'"
                       name='CRT_EVID_SAVINGS'><i class="black"></i>연금저축
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_HOUSE"
                       :checked="settleYear.CRT_EVID_HOUSE=='Y'"
                       name='CRT_EVID_HOUSE'><i class="black"></i>주택자금
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_FORTAX"
                       :checked="settleYear.CRT_EVID_FORTAX=='Y'"
                       name='CRT_EVID_FORTAX'><i class="black"></i>외납세액
              </label>
            </div>
            <div class="row col-4">
              <label class="md-check">
                <input type="checkbox" @change="changeCheckboxValue"
                       :value="settleYear.CRT_EVID_OTHER"
                       :checked="settleYear.CRT_EVID_OTHER=='Y'"
                       name='CRT_EVID_OTHER'><i class="black"></i>기타(소상공인공제,투자조합출자 등)
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button type="button"
                class="btn btn-md black"
                v-on:click="doSave">
          <i class="icon-lineIcon-check mr-5"></i><span v-text="message.save[locale]">저장</span>
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import CustomFormInput from '@/components/common/CustomFormInput';
import LabeledInput from "../../../components/common/LabeledInput";
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import UiInputYear from "../../../components/common/UiInputYear";

export default {
  mixins: [modal],
  components: {
    BaseModal,
    CustomFormInput,
    LabeledInput,
    UiRadioButtonInline,
    UiInputYear
  },
  props: {
    locale: {
      type: String,
      default : 'ko_KR'// userInfoUtils.getI18nInfo().locale
    },
    settleYear:{
      type: Object,
      default: function() {
        return {
          "ENTITY_CODE": null,
          "INCUM_YEAR": null,
          "TERMI_YEAR": null,
          "BIZINC_YEAR": null,
          "WITHHOLDING_AGENT": null,
          "CRT_EVID_DONA": null,
          "CRT_EVID_SAVINGS": null,
          "CRT_EVID_HOUSE": null,
          "CRT_EVID_MEDI": null,
          "CRT_EVID_INS": null,
          "CRT_EVID_OTHER": null,
          "CRT_EVID_FAMILY": null,
          "CRT_EVID_EDU": null,
          "CRT_EVID_INCOME": null,
          "CRT_EVID_FORTAX": null,
          "CRT_EVID_CARD": null
        };
      }
    }
  },
  data() {
    return {
      selCode: {},
      errors: {},
      selectList: [],
      withholdingAgent: { //집계기준
        name: 'WITHHOLDING_AGENT',
        value: '1',
        domOptList: [
          { value: '1', label: '회사명', id: 'WITHHOLDING_AGENT-1' },
          { value: '2', label: '사업장명', id: 'WITHHOLDING_AGENT-2' }
        ]
      },
      message: {
        save : {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'}
      }
    }
  },
  methods: {
    doSave: function () {
      this.$emit('save');
    },
    changeCheckboxValue: function(event) {
      let me = this;
      let el = event.target;
      let val = el.checked ? 'Y': 'N'
      me.settleYear[el.name] = val;
      this.$emit('changeCheckboxValue', { name: el.name, value: val });
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
#payentry-input-modal {
  .form-wrap {
    display: flex;
  }
}
</style>
