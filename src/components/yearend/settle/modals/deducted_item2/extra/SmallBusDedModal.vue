<template>
  <base-modal :title="title" id="smallbus-deduction-modal" :scroll="false" width="500">
    <template v-slot:body>
      <comment-box
          v-if="mountParam.ITEM_TYPE == 1"
          class="mb-10"
          :list="[
                    {'text': '* 2016년 1월 1일 이후 가입한 경우, 총급여 7000만원 이하인 법인대표자만 공제신청할수 있습니다.'}
                ]"
      />
      <table-form :colgroup="['20%', 'auto']" footer-hide>
        <template v-slot:body>
          <tr>
            <table-form-label label="자료분류" :has-error="errors.DATA_SOURCE && errors.DATA_SOURCE != ''" />
            <table-form-item :error-msg="errors.DATA_SOURCE">
              <ui-dropdown
                  :items="codes.dataSource"
                  :value="formData.DATA_SOURCE"
                  @change="formData.DATA_SOURCE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message', disabled: true}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label :label="amountLabel"
                              :has-error="errors.APPL_AMOUNT && errors.APPL_AMOUNT != ''"/>
            <table-form-item :error-msg="errors.APPL_AMOUNT">
              <ui-input-number :value="formData.APPL_AMOUNT"
                               @change="formData.APPL_AMOUNT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
          </tr>
          <tr v-if="formData.ITEM_CODE=='E20B'">
            <table-form-label label="가입일"
                              :has-error="errors.CONTRACT_DATE && errors.CONTRACT_DATE != ''"/>
            <table-form-item :error-msg="errors.CONTRACT_DATE">
              <ui-input-date
                  :date="formData.CONTRACT_DATE"
                  @change="formData.CONTRACT_DATE=$event;"
              />
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
        <button class="btn btn-md black mr-3" @click="onSave">
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
import {getYearendCodeList} from '@/utils/yearendCodes';

let extraInputParam = {
  ATT_YEAR: '',
  PAYDAY: '',
  EID: 0,
  YES_ID: 0,
  INP_REMARK: '',
  INP_FLAG: 'M',
  APPL_AMOUNT_NTS: 0,
  EXPIRE_DATE: '',
  PERSON_RRN_ID: 0,
  ITEM_TYPE: 0,
  ITEM_CODE: '',
  DATA_SOURCE: 1,
  APPL_AMOUNT: 0,
  CONTRACT_DATE: '',
  CURRENT_STEP: 'OTHERS'
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
      codes: {},
      errors: {},
      title: '',
      amountLabel: '',
      mountParam: {},
      formData: {
        DATA_SOURCE: '2',
        CONTRACT_DATE: '',
        APPL_AMOUNT: ''
      }
    }
  },
  methods: {
    resetComponent() {
      this.formData = {
        DATA_SOURCE: '2',
        CONTRACT_DATE: '',
        APPL_AMOUNT: ''
      };
    },
    asyncDynamicComponentData(param) {
      this.errors = {};
      this.title = param.TITLE;
      this.formData = param;
      this.amountLabel = this.formData.ITEM_CODE === 'E60B' ? '임금삭감액' : '금액';
    },
    //modal method
    isValid() {
      let hasError = false;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.formData.APPL_AMOUNT)) {
        hasError = true;
        if (this.mountParam.ITEM_TYPE == 4) {
          this.errors.APPL_AMOUNT = '임금삭감액을 입력해 주세요.';
        } else {
          this.errors.APPL_AMOUNT = '금액을 입력해 주세요.';
        }
      }
      if (this.formData.ITEM_CODE === 'E20B' && this.payrollUtil.isEmpty(this.formData.CONTRACT_DATE)) {
        hasError = true;
        this.errors.CONTRACT_DATE = "가입일을 입력해 주세요."
      }
      return ! hasError;
    },
    getParameter() {
      let _params = {
        ...this.formData,
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
        'CURRENT_STEP': 'OTHERS',
      };
      _params['PAID_AMOUNT_'+ this.formData.ITEM_CODE] = this.formData.APPL_AMOUNT;
      if(this.formData.ITEM_CODE !== 'E20B'){
        this.formData.CONTRACT_DATE = '';
      }
      return _params;
    },
    async onSave() {
      let me = this;
      if (!this.isValid()) {
        return;
      }
      let _params = this.getParameter();
      try {
        await this.$httpPost({
          url: "/year-end/employee/deduction/request/save",
          param: _params,
          callback: function () {
            me.toastSuccessSave();
          }
        });
        this.resetComponent();
        this.close();
      } catch (e) {
        console.error("SmallBusDedModal onSave Error: ", e);
      }
    }
  },
  mounted() {
    let me = this;
    const codes = getYearendCodeList();
    me.codes.dataSource = codes.dataSource.items;
  }
}
</script>