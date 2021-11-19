<template>
  <base-modal title="장기주택저당차입금" id="housing-mortage-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <comment-box class="mb-10"
                   :list="[
                    {'text': '* 설문지의 내용을 수정할 경우 신청버튼을 클릭하여 설문지를 다시 작성하여야 합니다.', 'color': 'red'},
                    {'text': '* 전년도 자료비교를 위해 필수값이 아니더라도 가능한 한 모든 값을 입력해 주세요.', 'color': 'red'}
                ]"
      />
      <table-form :colgroup="['12%', 'auto', '12%', 'auto', '12%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="성명"
                              :has-error="errors.NAME && errors.NAME != ''"/>
            <table-form-item :error-msg="errors.NAME">
              <ui-input :value="housingMortage.NAME" @change="housingMortage.NAME=$event;"/>
            </table-form-item>

            <table-form-label label="자료분류"/>
            <table-form-item>
              <ui-dropdown
                  :items="housingMortage.DATA_SOURCE.items"
                  :value="housingMortage.DATA_SOURCE.value"
                  @change="housingMortage.DATA_SOURCE.value=$event.value; housingMortage.DATA_SOURCE.return=$event;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>

            <table-form-label label="사업자번호"/>
            <table-form-item>
              <ui-input :value="housingMortage.BUSNID" @change="housingMortage.BUSNID=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="대출기관"
                              :has-error="errors.TRADE_NM && errors.TRADE_NM != ''"/>
            <table-form-item :error-msg="errors.TRADE_NM">
              <ui-input :value="housingMortage.TRADE_NM" @change="housingMortage.TRADE_NM=$event;"/>
            </table-form-item>

            <table-form-label label="계좌번호"/>
            <table-form-item>
              <ui-input :value="housingMortage.ACC_NO" @change="housingMortage.ACC_NO=$event;"/>
            </table-form-item>

            <table-form-label label="대출종류"/>
            <table-form-item>
              <ui-dropdown
                  :items="housingMortage.LEND_KD.items"
                  :value="housingMortage.LEND_KD.value"
                  @change="housingMortage.LEND_KD.value=$event.value; housingMortage.LEND_KD.return=$event;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="주택취득일"/>
            <table-form-item>
              <ui-input-date
                  :date="housingMortage.HOUSE_TAKE_DT"
                  @change="housingMortage.HOUSE_TAKE_DT=$event;"
              />
            </table-form-item>
            <table-form-label label="저당권설정일"/>
            <table-form-item>
              <ui-input-date
                  :date="housingMortage.MORT_SETUP_DT"
                  @change="housingMortage.MORT_SETUP_DT=$event;"
              />
            </table-form-item>
            <table-form-label label="최초차입일" :has-error="errors.START_DT && errors.START_DT != ''"/>
            <table-form-item :error-msg="errors.START_DT">
              <ui-input-date
                  :date="housingMortage.START_DT"
                  @change="housingMortage.START_DT=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="최종상환예정일" :has-error="errors.END_DT && errors.END_DT != ''"/>
            <table-form-item :error-msg="errors.END_DT">
              <ui-input-date
                  :date="housingMortage.END_DT"
                  @change="housingMortage.END_DT=$event;"
              />
            </table-form-item>

            <table-form-label label="상환기간연수" :has-error="errors.REPAY_YEARS && errors.REPAY_YEARS != ''"/>
            <table-form-item :error-msg="errors.REPAY_YEARS">
              <ui-input :value="housingMortage.REPAY_YEARS" @change="housingMortage.REPAY_YEARS=$event;"/>
            </table-form-item>

            <table-form-label label="상품명"/>
            <table-form-item>
              <ui-input :value="housingMortage.LEND_GOODS_NM" @change="housingMortage.LEND_GOODS_NM=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="차입금"/>
            <table-form-item>
              <ui-input-number :value="housingMortage.DEBT"
                               @change="housingMortage.DEBT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="고정금리차입금"/>
            <table-form-item>
              <ui-input-number :value="housingMortage.FIXED_RATE_DEBT"
                               @change="housingMortage.FIXED_RATE_DEBT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="비거치식상환차입금"/>
            <table-form-item>
              <ui-input-number :value="housingMortage.NOT_DEFER_DEBT"
                               @change="housingMortage.NOT_DEFER_DEBT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="당해년 원금상환액"/>
            <table-form-item>
              <ui-input-number :value="housingMortage.THIS_YEAR_REDE_AMT"
                               @change="housingMortage.THIS_YEAR_REDE_AMT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="이자납입액" :has-error="errors.APPL_AMOUNT && errors.APPL_AMOUNT != ''"/>
            <table-form-item :error-msg="errors.APPL_AMOUNT">
              <ui-input-number :value="housingMortage.APPL_AMOUNT"
                               @change="housingMortage.APPL_AMOUNT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="배제액"/>
            <table-form-item>
              <ui-input-number :value="housingMortage.REFUTE_AMOUNT"
                               @change="housingMortage.REFUTE_AMOUNT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="비고/메모"/>
            <table-form-item colspan="3">
              <ui-input :value="housingMortage.EMPLOYEE_COMMENT" @change="housingMortage.EMPLOYEE_COMMENT=$event;"/>
            </table-form-item>
          </tr>
        </template>
      </table-form>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black mr-3" @click="onApply">
          <i class="icon-lineIcon-check mr-5"></i>신청
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import CommentBox from '@/components/common/CommentBox';
import {mapGetters} from 'vuex';

const housingMortageParam = {
  ATT_YEAR: '',
  PAYDAY: '',
  EID: 0,
  YES_ID: 0,
  PERSON_RRN_ID: 0,
  INP_REMARK: '',
  INP_FLAG: '',
  DED_SELECT: '',
  LENDER_TYPE: 1,
  QUESTION_PASS: 'Y',
  QUESTION_INFO: {},
  APPL_AMOUNT_NTS: '',
  BASE_AMOUNT_NTS: '',
  NAME: '',
  DATA_SOURCE: 1,
  BUSNID: '',
  TRADE_NM: '',
  ACC_NO: '',
  LEND_KD: 1,
  HOUSE_TAKE_DT: '',
  MORT_SETUP_DT: '',
  START_DT: '',
  END_DT: '',
  REPAY_YEARS: 0,
  LEND_GOODS_NM: '',
  DEBT: 0,
  FIXED_RATE_DEBT: 0,
  NOT_DEFER_DEBT: 0,
  THIS_YEAR_REDE_AMT: 0,
  APPL_AMOUNT: 0,
  REFUTE_AMOUNT: 0,
  EMPLOYEE_COMMENT: '',
  IS_SELF: 'NO',
  HOUSE_ACTION: 'HOUSE_LOAN_INTEREST',
  CURRENT_STEP: 'HOUSE_LOAN'
};

export default {
  mixins: [modal],
  components: {
    BaseModal,
    TableForm,
    TableFormItem,
    TableFormLabel,
    CommentBox
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
      mountParam: {},
      housingMortage: {}
    }
  },
  methods: {
    resetParameter() {
      this.mountParam = housingMortageParam;
    },
    resetComponent() {
      this.errors = {};
      this.housingMortage = {
        NAME: '',
        DATA_SOURCE: {
          value: '1',
          return: null,
          items: [
            {message: '국세청', code: '1'},
            {message: '기타', code: '2'}
          ]
        },
        BUSNID: '',
        TRADE_NM: '',
        ACC_NO: '',
        LEND_KD: {
          value: '1',
          return: null,
          items: [
            {message: '무주택자의 중도금 대출', code: '1'},
            {message: '기존주택구입', code: '2'},
            {message: '주택분양권 대출', code: '3'}
          ]
        },
        HOUSE_TAKE_DT: '',
        MORT_SETUP_DT: '',
        START_DT: '',
        END_DT: '',
        REPAY_YEARS: '',
        LEND_GOODS_NM: '',
        DEBT: 0,
        FIXED_RATE_DEBT: 0,
        NOT_DEFER_DEBT: 0,
        THIS_YEAR_REDE_AMT: 0,
        APPL_AMOUNT: 0,
        REFUTE_AMOUNT: 0,
        EMPLOYEE_COMMENT: ''
      };
      this.resetParameter();
    },
    //modal
    asyncDynamicComponentData(param) {
      let mortgage = {};

      this.errors = {};
      this.resetParameter();
      if (!param) {
        return;
      }

      this.mountParam = {
        ...this.mountParam,
        ...param
      };

      mortgage = this.$mergeProp(this.housingMortage, param);
      mortgage.DATA_SOURCE = this.housingMortage.DATA_SOURCE;
      mortgage.DATA_SOURCE.value = param.DATA_SOURCE;
      mortgage.LEND_KD = this.housingMortage.LEND_KD;
      mortgage.LEND_KD.value = param.LEND_KD;

      this.housingMortage = mortgage;
    },
    validationProcess() {
      let hasError = false;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.housingMortage.NAME)) {
        hasError = true;
        this.errors.NAME = '성명을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.housingMortage.TRADE_NM)) {
        hasError = true;
        this.errors.TRADE_NM = '대출기관을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.housingMortage.START_DT)) {
        hasError = true;
        this.errors.START_DT = '최초차입일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.housingMortage.END_DT)) {
        hasError = true;
        this.errors.END_DT = '최종상환예정일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.housingMortage.REPAY_YEARS)) {
        hasError = true;
        this.errors.REPAY_YEARS = '상환기간연수를 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.housingMortage.APPL_AMOUNT)) {
        hasError = true;
        this.errors.APPL_AMOUNT = '이자납입액을 입력해 주세요.';
      }
      if (hasError) {
        return false;
      }
      return true;
    },
    getParameter() {
      const me = this;
      let params = {
        ...me.mountParam,
        'ATT_YEAR': me.attYear,
        'PAYDAY': me.payday,
        'EID': me.eid,
      };
      let _params = this.$mergeProp(params, this.housingMortage);

      _params.DATA_SOURCE = this.housingMortage.DATA_SOURCE.value;
      _params.LEND_KD = this.housingMortage.LEND_KD.value;

      return _params;
    },
    //신청
    onApply() {
      if (!this.validationProcess()) {
        return;
      }
      this.close( this.getParameter());
    }
  },
  created() {
    this.resetComponent();
  },
}
</script>