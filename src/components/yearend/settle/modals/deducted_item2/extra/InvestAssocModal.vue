<template>
  <base-modal title="투자조합출자" id="invest-assoc-modal" :scroll="false" width="600">
    <template v-slot:body>
      <comment-box class="mb-10"
          :list="[
                    {'text': '* 투자 이후 2년내에 한번만 공제할수 있습니다.', 'color': 'red'},
                    {'text': '* 계좌번호/증명서발급번호는 필수입력사항입니다.', 'color': 'red'},
                    {'text': '* 만약 계좌번호나 증명서발급번호가 없다면 `ZZZZZZ`를 입력합니다.', 'color': 'red'}
                ]"
      />
      <table-form :colgroup="['35%', '50%']">
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
            <table-form-label label="투자조합출자 구분" :has-error="errors.INVEST_CODE && errors.INVEST_CODE != ''" />
            <table-form-item :error-msg="errors.INVEST_CODE">
              <ui-dropdown
                  :items="codes.investType"
                  :value="formData.INVEST_CODE"
                  @change="formData.INVEST_CODE=$event.value;"
                  :options="{ valueField: 'val', labelField: 'desc', tooltipField: 'desc'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="금융기관" :has-error="errors.INST_CODE && errors.INST_CODE != ''" />
            <table-form-item :colspan="'3'" :error-msg="errors.INST_CODE" >
              <ui-dropdown
                  :items="codes.bankList"
                  :value="formData.INST_CODE"
                  @change="formData.INST_CODE=$event.value;onChangeInstCode($event);"
                  :options="{ valueField: 'REAL_CODE', labelField: 'label', tooltipField: 'CODE_NAME'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="계좌번호/증명서발급번호" :has-error="errors.ACC_NO && errors.ACC_NO != ''"
            />
            <table-form-item :error-msg="errors.ACC_NO" >
              <input type="text" class="form-control" v-model="formData.ACC_NO">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="납입금액"
                              :has-error="errors.PAID_AMOUNT && errors.PAID_AMOUNT != ''"/>
            <table-form-item :error-msg="errors.PAID_AMOUNT">
              <ui-input-number :value="formData.PAID_AMOUNT"
                               @change="formData.PAID_AMOUNT=$event;"
                               :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
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
import grid from '@/mixin/payroll-grid';
import CommentBox from '@/components/common/CommentBox';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import {mapGetters} from "vuex";
import {getYearendCodeList} from '@/utils/yearendCodes';

export default {
  mixins: [grid, modal],
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
      codes: {
        investType: [
          { val: 'E40E4', desc: '투자조합출자-2019년-조합등' },
          { val: 'E40E5', desc: '투자조합출자-2020년-조합등' },
          { val: 'E40E6', desc: '투자조합출자-2021년-조합등' },
          { val: 'E40F4', desc: '투자조합출자-2019년-벤처등(직접투자)' },
          { val: 'E40F5', desc: '투자조합출자-2020년-벤처등(직접투자)' },
          { val: 'E40F6', desc: '투자조합출자-2021년-벤처등(직접투자)' }
        ]
      },
      errors: {},
      formData: {}
    }
  },
  methods: {
    resetErrors(){
      this.errors={
        ACC_NO:null,
        INST_CODE:null,
        PAID_AMOUNT: null
      };
    },
    asyncDynamicComponentData(param) {
      this.formData = param;
      this.formData.DATA_SOURCE = this.formData.DATA_SOURCE == '1' ? '1' : '2';
      this.resetErrors();
    },
    isValid(){
      const me = this;
      let invalid = false;

      me.resetErrors();

      if(me.payrollUtil.isEmpty(me.formData.INVEST_CODE)){
        me.errors.INVEST_CODE = '투자조합출자구분을 선택해 주세요.';
        invalid = true;
      }
      if(me.payrollUtil.isEmpty(me.formData.ACC_NO)){
        me.errors.ACC_NO = '계좌번호/증명서발급번호를 입력해 주세요.';
        invalid = true;
      }
      if(me.payrollUtil.isEmpty(me.formData.INST_CODE)){
        me.errors.INST_CODE = '금융기관을 선택해 주세요.';
        invalid = true;
      }
      if(me.payrollUtil.isEmpty(me.formData.PAID_AMOUNT)) {
        me.errors.PAID_AMOUNT = '납입금액을 입력해 주세요.';
        invalid = true;
      }else{
        if(me.payrollUtil.isNumeric(me.formData.PAID_AMOUNT) && me.formData.PAID_AMOUNT > 0){
          //
        }else{
          me.errors.PAID_AMOUNT = '납입금액을 입력해 주세요.';
          invalid = true;
        }
      }
      return !invalid;
    },
    onChangeInstCode(evt){
      this.formData.INST_NAME = evt.object.CODE_NAME;
    },
    getParameter() {
      const me = this;
      let _params = {
        ...me.formData,
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid
      }
      return _params;
    },
    async onSave() {
      const me = this;
      if (!me.isValid()){
        return;
      }

      try {
        await this.$httpPostBody({
          url: '/year-end/employee/deduction/request/others-invest/save',
          param: me.getParameter(),
          callback: function () {
            me.toastSuccessSave();
          }
        });
        me.close();
      } catch (e) {
        console.error("SmallBusDedModal onSave Error: ", e);
      }
    },
    async getBankList(){
      const me = this;
      const {data} = await me.$httpGet('/system/setting/mastcode/list', {
        SUPER_CODE: '22',
        INACTIVE: 'N'
      });
      if(data){
        data.forEach(function(val){
          val.label = val.REAL_CODE + '-' + val.CODE_NAME;
        })
      }
      return data;
    }
  },
  async mounted(){
    const me = this;
    const codes = getYearendCodeList();
    me.codes.dataSource = codes.dataSource.items;
    me.codes.bankList = await me.getBankList();
  }
}
</script>