<template>
  <base-modal title="외납세액 입력" id="monthly-rent-input-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <comment-box
          class="mb-10"
          :list="[{'text': '* 국외원천소득 입력시 감면소득을 포함한 금액을 기입해 주세요.'},]"
      />
      <table-form :colgroup="['15%', 'auto', '15%', 'auto', '15%', 'auto']" :footerHide="true">
        <template v-slot:body>
          <tr>
            <table-form-label label="국외원천소득"
                              :has-error="errors.FOREIGN_SOURCE_INCOME && errors.FOREIGN_SOURCE_INCOME != ''"/>
            <table-form-item :error-msg="errors.FOREIGN_SOURCE_INCOME">
              <ui-input-number :value="foreignTax.FOREIGN_SOURCE_INCOME"
                               @change="foreignTax.FOREIGN_SOURCE_INCOME=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="납세액(원화)"
                              :has-error="errors.FOREIGN_TAX_AMT_LC && errors.FOREIGN_TAX_AMT_LC != ''"/>
            <table-form-item :error-msg="errors.FOREIGN_TAX_AMT_LC">
              <ui-input-number :value="foreignTax.FOREIGN_TAX_AMT_LC"
                               @change="foreignTax.FOREIGN_TAX_AMT_LC=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="납세국명"/>
            <table-form-item>
              <ui-dropdown
                  :items="foreignTax.WORK_COUNTRY.items"
                  :value="foreignTax.WORK_COUNTRY.value"
                  @change="foreignTax.WORK_COUNTRY.value=$event.value; foreignTax.WORK_COUNTRY.return=$event;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="납부일"
                              :has-error="errors.FORIGN_TAX_PAYMENT_DATE && errors.FORIGN_TAX_PAYMENT_DATE != ''"/>
            <table-form-item :error-msg="errors.FORIGN_TAX_PAYMENT_DATE">
              <ui-input-date
                  :date="foreignTax.FORIGN_TAX_PAYMENT_DATE"
                  @change="foreignTax.FORIGN_TAX_PAYMENT_DATE=$event;"
              />
            </table-form-item>

            <table-form-label label="납세액(외화)"
                              :has-error="errors.FOREIGN_TAX_AMT_FX && errors.FOREIGN_TAX_AMT_FX != ''"/>
            <table-form-item :error-msg="errors.FOREIGN_TAX_AMT_FX">
              <ui-input-number :value="foreignTax.FOREIGN_TAX_AMT_FX"
                               @change="foreignTax.FOREIGN_TAX_AMT_FX=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="통화"/>
            <table-form-item>
              <ui-dropdown
                  :items="foreignTax.FOREIGN_TAX_FXT.items"
                  :value="foreignTax.FOREIGN_TAX_FXT.value"
                  @change="foreignTax.FOREIGN_TAX_FXT.value=$event.value; foreignTax.FOREIGN_TAX_FXT.return=$event;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="근무시작일"
                              :has-error="errors.WORK_START_DATE && errors.WORK_START_DATE != ''"/>
            <table-form-item :error-msg="errors.WORK_START_DATE">
              <ui-input-date
                  :date="foreignTax.WORK_START_DATE"
                  @change="foreignTax.WORK_START_DATE=$event;"
              />
            </table-form-item>

            <table-form-label label="근무종료일"
                              :has-error="errors.WORK_END_DATE && errors.WORK_END_DATE != ''"/>
            <table-form-item :error-msg="errors.WORK_END_DATE">
              <ui-input-date
                  :date="foreignTax.WORK_END_DATE"
                  @change="foreignTax.WORK_END_DATE=$event;"
              />
            </table-form-item>

            <table-form-label label="신청서제출일"
                              :has-error="errors.APPL_SUBMIT_DATE && errors.APPL_SUBMIT_DATE != ''"/>
            <table-form-item :error-msg="errors.APPL_SUBMIT_DATE">
              <ui-input-date
                  :date="foreignTax.APPL_SUBMIT_DATE"
                  @change="foreignTax.APPL_SUBMIT_DATE=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="국외근무처"
                              :has-error="errors.WORK_LOCATION && errors.WORK_LOCATION != ''"/>
            <table-form-item :error-msg="errors.WORK_LOCATION">
              <ui-input :value="foreignTax.WORK_LOCATION" @change="foreignTax.WORK_LOCATION=$event;"/>
            </table-form-item>

            <table-form-label label="직책"
                              :has-error="errors.WORK_POST && errors.WORK_POST != ''"/>
            <table-form-item :error-msg="errors.WORK_POST">
              <ui-input :value="foreignTax.WORK_POST" @change="foreignTax.WORK_POST=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="감면대상국외원천소득1"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.FOREIGN_EXEMPT_INCOME1"
                               @change="foreignTax.FOREIGN_EXEMPT_INCOME1=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="감면율1(%)"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.EXEMPT_RATE1"
                               @change="foreignTax.EXEMPT_RATE1=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="감면대상국외원천소득2"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.FOREIGN_EXEMPT_INCOME2"
                               @change="foreignTax.FOREIGN_EXEMPT_INCOME2=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="감면율2(%)"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.EXEMPT_RATE2"
                               @change="foreignTax.EXEMPT_RATE2=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="감면대상국외원천소득3"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.FOREIGN_EXEMPT_INCOME3"
                               @change="foreignTax.FOREIGN_EXEMPT_INCOME3=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>

            <table-form-label label="감면율3(%)"/>
            <table-form-item>
              <ui-input-number :value="foreignTax.EXEMPT_RATE3"
                               @change="foreignTax.EXEMPT_RATE3=$event;"
                               :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
          </tr>
        </template>
        <template v-slot:footer>
          <button class="btn btn-md black">
            <i class="icon-lineIcon-check mr-5"></i>저장
          </button>
        </template>
      </table-form>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat mr-3" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave">
          <i class="icon-lineIcon-check mr-5"></i>저장
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

const foreignTaxParam = {
  ATT_YEAR: '',
  APPL_YEAR: '',
  PAYDAY: '',
  EID: 0,
  INPUT_DATE: '',
  YES_ID: 0,
  FOREIGN_SOURCE_INCOME: 0,
  FOREIGN_TAX_AMT_LC: 0,
  WORK_COUNTRY: '',
  FORIGN_TAX_PAYMENT_DATE: '',
  FOREIGN_TAX_AMT_FX: 0,
  FOREIGN_TAX_FXT: 'USD',
  WORK_START_DATE: '',
  WORK_END_DATE: '',
  APPL_SUBMIT_DATE: '',
  WORK_LOCATION: '',
  WORK_POST: '',
  FOREIGN_EXEMPT_INCOME1: 0,
  EXEMPT_RATE1: 0,
  FOREIGN_EXEMPT_INCOME2: 0,
  EXEMPT_RATE2: 0,
  FOREIGN_EXEMPT_INCOME3: 0,
  EXEMPT_RATE3: 0,
  CURRENT_STEP: 'FOREIGN_TAX'
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
      countryList: [],
      mountParam: {},
      foreignTax: {
        WORK_COUNTRY: {
          value: '',
          return: null,
          items: []
        },
      }
    }
  },
  methods: {
    resetComponent() {
      this.foreignTax = {
        ...this.foreignTax,
        FOREIGN_SOURCE_INCOME: '', //국외원천 소득
        FOREIGN_TAX_AMT_LC: '',
        FORIGN_TAX_PAYMENT_DATE: '',
        FOREIGN_TAX_AMT_FX: '',
        FOREIGN_TAX_FXT: {
          value: 'USD',
          return: null,
          items: [
            {message: 'USD', code: 'USD'}
          ]
        },
        WORK_START_DATE: '',
        WORK_END_DATE: '',
        APPL_SUBMIT_DATE: '',
        WORK_LOCATION: '',
        WORK_POST: '',
        FOREIGN_EXEMPT_INCOME1: '',
        EXEMPT_RATE1: '',
        FOREIGN_EXEMPT_INCOME2: '',
        EXEMPT_RATE2: '',
        FOREIGN_EXEMPT_INCOME3: '',
        EXEMPT_RATE3: ''
      };
      if (Array.isArray(this.foreignTax.WORK_COUNTRY.items) && this.foreignTax.WORK_COUNTRY.items.length > 0) {
        this.foreignTax.WORK_COUNTRY.value = this.foreignTax.WORK_COUNTRY.items[0]['code'];
      }
    },
    //modal
    async asyncDynamicComponentData(param) {
      const me = this;
      me.errors = {};
      if (!param) {
        me.mountParam = foreignTaxParam;
        return;
      }
      me.mountParam = {...foreignTaxParam, ...param};
      me.foreignTax.WORK_COUNTRY.items = param.COUNTRY_LIST;

      if (Array.isArray(me.foreignTax.WORK_COUNTRY.items) && me.foreignTax.WORK_COUNTRY.items.length > 0) {
        me.foreignTax.WORK_COUNTRY.value = me.foreignTax.WORK_COUNTRY.items[0]['code'];
      }

      me.foreignTax.FOREIGN_SOURCE_INCOME = param['FOREIGN_SOURCE_INCOME'];
      me.foreignTax.FOREIGN_TAX_AMT_LC = param['FOREIGN_TAX_AMT_LC'];
      me.foreignTax.WORK_COUNTRY.value = param['WORK_COUNTRY'];
      me.foreignTax.FORIGN_TAX_PAYMENT_DATE = param['FORIGN_TAX_PAYMENT_DATE'];
      me.foreignTax.FOREIGN_TAX_AMT_FX = param['FOREIGN_TAX_AMT_FX'];
      me.foreignTax.FOREIGN_TAX_FXT.value = param['FOREIGN_TAX_FXT'];
      me.foreignTax.WORK_START_DATE = param['WORK_START_DATE'];
      me.foreignTax.WORK_END_DATE = param['WORK_END_DATE'];
      me.foreignTax.APPL_SUBMIT_DATE = param['APPL_SUBMIT_DATE'];
      me.foreignTax.WORK_LOCATION = param['WORK_LOCATION'];
      me.foreignTax.WORK_POST = param['WORK_POST'];
      me.foreignTax.FOREIGN_EXEMPT_INCOME1 = param['FOREIGN_EXEMPT_INCOME1'];
      me.foreignTax.EXEMPT_RATE1 = param['EXEMPT_RATE1'];
      me.foreignTax.FOREIGN_EXEMPT_INCOME2 = param['FOREIGN_EXEMPT_INCOME2'];
      me.foreignTax.EXEMPT_RATE2 = param['EXEMPT_RATE2'];
      me.foreignTax.FOREIGN_EXEMPT_INCOME3 = param['FOREIGN_EXEMPT_INCOME3'];
      me.foreignTax.EXEMPT_RATE3 = param['EXEMPT_RATE3'];
    },
    //method
    validationProcess() {
      let hasError = false;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.foreignTax.FOREIGN_SOURCE_INCOME)) {
        hasError = true;
        this.errors.FOREIGN_SOURCE_INCOME = '국외원천소득을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.FOREIGN_TAX_AMT_LC)) {
        hasError = true;
        this.errors.FOREIGN_TAX_AMT_LC = '납세액(원화)을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.FORIGN_TAX_PAYMENT_DATE)) {
        hasError = true;
        this.errors.FORIGN_TAX_PAYMENT_DATE = '납부일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.FOREIGN_TAX_AMT_FX)) {
        hasError = true;
        this.errors.FOREIGN_TAX_AMT_FX = '납세액(외화)을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.WORK_START_DATE)) {
        hasError = true;
        this.errors.WORK_START_DATE = '근무시작일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.WORK_END_DATE)) {
        hasError = true;
        this.errors.WORK_END_DATE = '근무종료일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.APPL_SUBMIT_DATE)) {
        hasError = true;
        this.errors.APPL_SUBMIT_DATE = '신청서제출일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.WORK_LOCATION)) {
        hasError = true;
        this.errors.WORK_LOCATION = '국외근무처를 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.foreignTax.WORK_POST)) {
        hasError = true;
        this.errors.WORK_POST = '직책을 입력해 주세요.';
      }
      if (hasError)
        return false;
      return true;
    },
    getParameter() {
      let _param = {
        ...this.mountParam,
        'ATT_YEAR': this.attYear,
        'INPUT_DATE': this.attYear,
        'EID': this.eid,
        'PAYDAY': this.payday,
        'FOREIGN_SOURCE_INCOME': this.foreignTax.FOREIGN_SOURCE_INCOME,
        'FOREIGN_TAX_AMT_LC': this.foreignTax.FOREIGN_TAX_AMT_LC,
        'WORK_COUNTRY': this.foreignTax.WORK_COUNTRY.value,
        'FORIGN_TAX_PAYMENT_DATE': this.foreignTax.FORIGN_TAX_PAYMENT_DATE,
        'FOREIGN_TAX_AMT_FX': this.foreignTax.FOREIGN_TAX_AMT_FX,
        'FOREIGN_TAX_FXT': this.foreignTax.FOREIGN_TAX_FXT.value,
        'WORK_START_DATE': this.foreignTax.WORK_START_DATE,
        'WORK_END_DATE': this.foreignTax.WORK_END_DATE,
        'APPL_SUBMIT_DATE': this.foreignTax.APPL_SUBMIT_DATE,
        'WORK_LOCATION': this.foreignTax.WORK_LOCATION,
        'WORK_POST': this.foreignTax.WORK_POST,
        'FOREIGN_EXEMPT_INCOME1': this.foreignTax.FOREIGN_EXEMPT_INCOME1,
        'EXEMPT_RATE1': this.foreignTax.EXEMPT_RATE1,
        'FOREIGN_EXEMPT_INCOME2': this.foreignTax.FOREIGN_EXEMPT_INCOME2,
        'EXEMPT_RATE2': this.foreignTax.EXEMPT_RATE2,
        'FOREIGN_EXEMPT_INCOME3': this.foreignTax.FOREIGN_EXEMPT_INCOME3,
        'EXEMPT_RATE3': this.foreignTax.EXEMPT_RATE3
      };
      return _param;
    },
    async onSave() {
      let me = this;
      if (!this.validationProcess()) {
        return;
      }
      try {
        await this.$httpPost({
          url: "/year-end/employee/deduction/request/save",
          param: this.getParameter(),
          callback: function () {
            me.toastSuccessSave();
            me.resetComponent();
          }
        });
        this.close();
      } catch (e) {
        console.error("ForeignTaxInputModal onSave err: ", e);
      }
    },
    onDelete() {
      let me = this;
      this.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: async function () {
          if (!me.validationProcess()) {
            return;
          }
          try {
            await me.$httpPost({
              url: "/year-end/employee/deduction/request/delete",
              param: me.getParameter(),
              callback: function () {
                me.toastSuccessDelete();
                me.resetComponent();
              }
            });
            me.close();
          } catch (e) {
            console.error("ForeignTaxInputModal onDelete Error: ", e);
          }
        }
      });
    },
    onReset() {
      this.resetComponent();
    },
  },
  async created() {
    try {
      this.resetComponent();
    } catch (e) {
      console.log("async created err: ", e);
    }
  },
}
</script>