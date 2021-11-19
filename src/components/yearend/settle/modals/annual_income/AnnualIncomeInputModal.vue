<template>
  <base-modal title="소득추가팝업" id="annual-income-input-modal" :scroll="false" width="800">
    <template v-slot:body>
      <div class="form-wrap">
        <div class="row">
          <labeled-input input-label="종류" class="col-12" labelClass="col-1" inputClass="col-3">
            <ui-dropdown
                :items="annualIncomeForm.TYPE.items"
                :value="annualIncomeForm.TYPE.value"
                @change="annualIncomeTypeChange($event)"
                :options="{
                  valueField: 'code',
                  labelField: 'message',
                  tooltipField: 'message',
                  disabled: annualIncomeForm.ACTION_UPDATE
                }"
            />
          </labeled-input>
          <labeled-input input-label="항목" class="col-12" labelClass="col-1" inputClass="col-11">
            <ui-dropdown
                :items="annualIncomeForm.CODE.items"
                :value="annualIncomeForm.CODE.value"
                @change="annualIncomeForm.CODE.value=$event.value; annualIncomeForm.CODE.return=$event;"
                :options="{
                  valueField: 'code',
                  labelField: 'message',
                  tooltipField: 'message',
                  disabled: annualIncomeForm.ACTION_UPDATE
                }"
            />
          </labeled-input>
          <labeled-input :error-msg="errors.AMOUNT" input-label="금액" class="col-12" labelClass="col-1" inputClass="col-3">
            <ui-input-number :value="annualIncomeForm.AMOUNT"
                             @change="annualIncomeForm.AMOUNT=$event;"
                             :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
          </labeled-input>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="save()">
          <i class="icon-lineIcon-del mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import LabeledInput from '@/components/common/LabeledInput';
import modal from '@/mixin/modal';
import {mapGetters} from "vuex";
import codeData from '@/utils/yeAnnualIncome';

export default {
  mixins: [modal],
  components: {
    BaseModal,
    LabeledInput
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    return {
      errors: {},
      annualIncomeForm: {
        TYPE: {
          value: 'T1',
          return: null,
          items: [{code: 'T1', message: '과세급여'},
            {code: 'T2', message: '공제액'},
            {code: 'T3', message: '비과세급여'},
            {code: 'T4', message: '감면소득'},]
        },
        CODE: {},
        AMOUNT: '',
        WORK_SEQ_NO: null,
        ACTION_UPDATE: true
      }
    }
  },
  methods: {
    annualIncomeTypeChange($event) {
      this.annualIncomeForm.TYPE.value = $event.value;
      this.annualIncomeForm.TYPE.return = $event;
      this.annualIncomeForm.CODE = codeData[$event.value];
    },
    asyncDynamicComponentData(param) {
      this.errors = {};
      this.annualIncomeForm.WORK_SEQ_NO = param.WORK_SEQ_NO;
      this.annualIncomeForm.CODE.value = param.TAX_CODE;
      this.annualIncomeForm.AMOUNT = param.AMOUNT;
      for (let v of this.annualIncomeForm.TYPE.items) {
        if (v.message == param.TYPE) {
          this.annualIncomeForm.TYPE.value = v.code;
          this.annualIncomeForm.CODE = codeData[this.annualIncomeForm.TYPE.value];
          break;
        }
      }
      this.annualIncomeForm.ACTION_UPDATE = param.TAX_CODE ? true : false;
    },
    isValid() {
      let hasError = false;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.annualIncomeForm.AMOUNT)) {
        hasError = true;
        this.errors.AMOUNT = '금액을 입력해 주세요.';
      }
      if (hasError) {
        return false;
      }
      return true;
    },

    save() {
      let me = this;
      if (!this.isValid()) {
        return;
      }
      this.$httpPost({
        url: '/year-end/employee/deduction/request/save/ex-salary',
        param: {
          'EID': me.eid,
          'ATT_YEAR': me.attYear,
          'CURRENT_STEP': me.step,
          'PAYDAY': me.payday,
          'WORK_SEQ_NO': me.annualIncomeForm.WORK_SEQ_NO,
          'TAX_CODE': me.annualIncomeForm.CODE.value,
          'AMOUNT': me.annualIncomeForm.AMOUNT
        },
        callback: function(){
          me.toastSuccessSave();
          me.close();
        }
      });
    },

    async loadExemptCodes() {
      try {
        // 비과세소득 항목 세팅
        let {data} = await this.$httpGet('/year-end/employee/tax-code/exempt', {ATT_YEAR: this.attYear}) || [];
        for (let i = 0; i < data.length; i++) {
          codeData['T3']['items'].push({code: data[i]['TAXITM_CD'], message: data[i]['TAX_NAME']});
        }
        if (Array.isArray(data) && data.length > 0) {
          codeData['T3']['value'] = data[0]['TAXITM_CD'];
        }
        this.annualIncomeForm.CODE = codeData[this.annualIncomeForm.TYPE.value];
      } catch (e) {
        console.error("AnnualIncomeInputModal mounted err: ", e);
      }
    }
  },
  mounted() {
    this.loadExemptCodes();
  },
}
</script>