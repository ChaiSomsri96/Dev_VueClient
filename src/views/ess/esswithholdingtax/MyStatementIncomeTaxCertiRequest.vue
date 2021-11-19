<template>
  <div>
    <ui-header :msg="'소득세 원천징수 확인서 출력'" />
    <div class="content-body">
      <div>
        <h3>개인 입력 정보</h3>
      </div>
      <div class="form-wrap">

        <labeled-input input-label="급여월 From / To" class="row" labelClass="col-2" inputClass="col-3" >
          <div class="input-group col-6 pr-0"  style="padding: 0">
            <ui-input-date :date="basicData.PAY_MONTH_FROM.value"
                           @change="basicData.PAY_MONTH_FROM.value=$event;"/>
          </div>
          <div class="input-group col-6 pr-0" >
            <ui-input-date :date="basicData.PAY_MONTH_TO.value"
                           @change="basicData.PAY_MONTH_TO.value=$event;"/>
          </div>

        </labeled-input>
        <labeled-input input-label="확인서의 사용목적" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.PURPOSE.value"
                    @change="basicData.PURPOSE.value=$event;"
                    :options="{disabled: basicData.PURPOSE.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="제출처" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.SUBMIT_TO.value"
                    @change="basicData.SUBMIT_TO.value=$event;"
                    :options="{disabled: basicData.SUBMIT_TO.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="신고 구분" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.MASKING_BANKAC.items"
                       :value="basicData.MASKING_BANKAC.value"
                       @change="basicData.MASKING_BANKAC.value=$event.value;"
                       :options="{ disabled: basicData.MASKING_BANKAC.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="개인정보 보호" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.PERSONAL_INFO_MASK.items"
                       :value="basicData.PERSONAL_INFO_MASK.value"
                       @change="basicData.PERSONAL_INFO_MASK.value=$event.value;"
                       :options="{ disabled: basicData.PERSONAL_INFO_MASK.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="조회결과 언어" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.RPT_LANG.items"
                       :value="basicData.RPT_LANG.value"
                       @change="onChangeLangType"
                       :options="{ disabled: basicData.RPT_LANG.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
      </div>
      <div>
        <h3>회사 공통 정보</h3>
      </div>
      <div class="form-wrap">

        <labeled-input input-label="사업장 사업자 등록번호" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.CONFIRM_REGNO.value"
                    @change="basicData.CONFIRM_REGNO.value=$event;"
                    :options="{disabled: basicData.CONFIRM_REGNO.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="발행인" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.CONFIRM_NAME.value"
                    @change="basicData.CONFIRM_NAME.value=$event;"
                    :options="{disabled: basicData.CONFIRM_NAME.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="사업장 소재지" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.COMFIRM_ADDRESS.value"
                    @change="basicData.COMFIRM_ADDRESS.value=$event;"
                    :options="{disabled: basicData.COMFIRM_ADDRESS.isReadOnly}"/>
        </labeled-input>
        <labeled-input input-label="서명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.COMFIRM_SIGNNAME.value"
                    @change="basicData.COMFIRM_SIGNNAME.value=$event;"
                    :options="{disabled: basicData.COMFIRM_SIGNNAME.isReadOnly}"/>
        </labeled-input>
        <labeled-input v-if="showView" input-label="발행인(영문)" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.CONFIRM_ENAME.value"
                    @change="basicData.CONFIRM_ENAME.value=$event;"
                    :options="{disabled: basicData.CONFIRM_ENAME.isReadOnly}"/>
        </labeled-input>
        <labeled-input v-if="showView" input-label="사업장 소재지(영문)" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.COMFIRM_EADDRESS.value"
                    @change="basicData.COMFIRM_EADDRESS.value=$event;"
                    :options="{disabled: basicData.COMFIRM_EADDRESS.isReadOnly}"/>
        </labeled-input>
        <labeled-input v-if="showView" input-label="서명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.COMFIRM_ESIGNNAME.value"
                    @change="basicData.COMFIRM_ESIGNNAME.value=$event;"
                    :options="{disabled: basicData.COMFIRM_ESIGNNAME.isReadOnly}"/>
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
export default {
  components:{
    LabeledInput,
    ButtonPanel
  },
  data() {
    return {
      locale: 'ko_KR',
      showView : false,
      errors: {},
      paycodeItems:[],
      url:'',
      basicData: {
        PAY_MONTH_FROM: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '시작일을 입력해주세요',
        },
        PAY_MONTH_TO: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '종료일을 입력해주세요',
        },
        PURPOSE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '사용목적을 입력해주세요',
        },
        SUBMIT_TO: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '제출처를 입력해주세요',
        },
        MASKING_BANKAC: {
          value: 'M',
          isRequired: true,
          isReadOnly: false,
          validMsg: '신고구분을 선택해주세요',
          items: [
            { message: '월별', code: 'M' },
            { message: '반기별', code: 'H' }
          ]
        },
        PERSONAL_INFO_MASK: {
          value: 'Y',
          isRequired: true,
          isReadOnly: false,
          validMsg: '개인정보 보호를 선택해주세요',
          items: [
            { message: '예', code: 'Y' },
            { message: '아니오', code: 'N' }
          ]
        },
        RPT_LANG: {
          value: 'KOREAN',
          isRequired: true,
          isReadOnly: false,
          validMsg: '조회결과 언어를 선택해주세요',
          items: [
            { message: '한국어', code: 'KOREAN' },
            { message: '영어', code: 'ENGLISH' }
          ]
        },

        CONFIRM_REGNO: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        CONFIRM_NAME: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        COMFIRM_ADDRESS: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        COMFIRM_SIGNNAME: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        CONFIRM_ENAME: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        COMFIRM_EADDRESS: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },
        COMFIRM_ESIGNNAME: {
          value: '',
          isRequired: false,
          isReadOnly: true,
          validMsg: '',
        },


      },
      message: {
        save: {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'}
      }
    }
  },
  methods:{
    async asyncData(){
      let { data } = await this.$httpGet('year-end/report/income/list-confperson');
      const me = this;
      let keys = Object.keys(this.basicData);
      console.log(data['CONFIRM_ENAME'])
      keys.forEach((key) => {
        me.basicData[key].value = data[0][key] || me.$options.data().basicData[key].value;
      });
    },
    async saveStatement() {


    },

    onChangeLangType: function(fd) {
      let value = fd.object.code;
      this.basicData.RPT_LANG.value = value;

      if(value === 'KOREAN') {
        this.showView = false;
      } else {
        this.showView = true;
      }
    },
  },
  mounted() {
    this.asyncData();
  },
  name: "MyStatementIncomeTaxCertiRequest"
}
</script>

<style scoped>

</style>