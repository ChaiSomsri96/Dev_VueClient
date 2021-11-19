<template>
  <base-modal title="주택임차차입금 원리금 상환액-대출기관" id="homerent-lending-modal" :scroll="false" width="900">
    <template v-slot:body>
      <comment-box
          class="mb-10"
          :list="[{'text': '* 설문지의 내용을 수정할 경우 신청버튼을 클릭하여 설문지를 다시 작성하여야 합니다.', 'color': 'red'},
                    {'text': '* 전년도 자료 비교를 위해 필수값이 아니더라도 가능한 한 모든 값을 입력해 주세요.', 'color': 'red'},]"
      />
      <table-form :colgroup="['15%', 'auto', '15%', 'auto']"
                  footer-hide>
        <template v-slot:body>
          <tr>
            <table-form-label label="자료분류"/>
            <table-form-item>
              <ui-dropdown
                  :items="codes.dataSource"
                  :value="homerentLending.DATA_SOURCE"
                  @change="homerentLending.DATA_SOURCE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message' }"
              />
            </table-form-item>
            <table-form-label label="대출기관명"
                              :has-error="errors.TRADE_NM && errors.TRADE_NM != ''"/>
            <table-form-item :error-msg="errors.TRADE_NM">
              <ui-input :value="homerentLending.TRADE_NM" @change="homerentLending.TRADE_NM=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="사업자번호"/>
            <table-form-item>
              <ui-input :value="homerentLending.BUSNID" @change="homerentLending.BUSNID=$event;"/>
            </table-form-item>
            <table-form-label label="계좌번호"/>
            <table-form-item>
              <ui-input :value="homerentLending.ACC_NO" @change="homerentLending.ACC_NO=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="상품명"/>
            <table-form-item>
              <ui-input :value="homerentLending.GOODS_NM" @change="homerentLending.GOODS_NM=$event;"/>
            </table-form-item>
            <table-form-label label="대출일"
                              :has-error="errors.LEND_DT && errors.LEND_DT != ''"/>
            <table-form-item :error-msg="errors.LEND_DT">
              <ui-input-date
                  :date="homerentLending.LEND_DT"
                  @change="homerentLending.LEND_DT=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="상환액"
                              :has-error="errors.APPL_AMOUNT && errors.APPL_AMOUNT != ''"/>
            <table-form-item :error-msg="errors.APPL_AMOUNT">
              <ui-input-number :value="homerentLending.APPL_AMOUNT"
                               @change="homerentLending.APPL_AMOUNT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
            </table-form-item>
            <table-form-label label="배제액"/>
            <table-form-item>
              <ui-input-number :value="homerentLending.REFUTE_AMOUNT"
                               @change="homerentLending.REFUTE_AMOUNT=$event;"
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
            <table-form-item>
              <ui-input :value="homerentLending.EMPLOYEE_COMMENT" @change="homerentLending.EMPLOYEE_COMMENT=$event;"/>
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
import {getYearendCodeList} from '@/utils/yearendCodes';

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
      mountParam: {
        LENDER_TYPE: '1',
        DATA_SOURCE: '2',
        HOUSE_ACTION: 'HOUSE_RENTAL_LOAN',
        CURRENT_STEP: 'HOUSE_LOAN',
        QUESTION_INFO: {},
      },
      homerentLending: {}
    }
  },
  methods: {
    resetComponent() {
      this.errors = {};
      this.homerentLending = {
        LENDER_TYPE: '1',
        DATA_SOURCE: '2',
        HOUSE_ACTION: 'HOUSE_RENTAL_LOAN',
        CURRENT_STEP: 'HOUSE_LOAN',
        QUESTION_INFO: {},
        TRADE_NM: '',
        BUSNID: '',
        ACC_NO: '',
        GOODS_NM: '',
        LEND_DT: '',
        APPL_AMOUNT: '',
        REFUTE_AMOUNT: '',
        EMPLOYEE_COMMENT: ''
      };
    },
    //modal
    asyncDynamicComponentData(data={}) {
      const me = this;
      me.errors = {};
      me.homerentLending = me.$mergeProp( me.mountParam, data);
    },
    validationProcess() {
      const me = this;
      let hasError = false;
      me.errors = {};
      if (me.payrollUtil.isEmpty(me.homerentLending.TRADE_NM)) {
        hasError = true;
        me.errors.TRADE_NM = '대출기관명을 입력해 주세요.';
      }
      if (me.payrollUtil.isEmpty(me.homerentLending.LEND_DT)) {
        hasError = true;
        me.errors.LEND_DT = '대출일을 입력해 주세요.';
      }
      if (me.payrollUtil.isEmpty(me.homerentLending.APPL_AMOUNT)) {
        hasError = true;
        me.errors.APPL_AMOUNT = '상환액을 입력해 주세요.';
      }
      if (hasError){
        return false;
      }
      return true;
    },
    getParameter() {
      let _params = {
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
        ...this.mountParam,
        ...this.homerentLending
      };
      return _params;
    },
    onApply() {
      if (!this.validationProcess())
        return;
      let _params = this.getParameter();
      this.close(_params);
    }
  },
  created() {
    const me = this;
    const codes = getYearendCodeList();
    me.codes.dataSource = codes.dataSource.items;
    me.resetComponent();
  }
}
</script>
