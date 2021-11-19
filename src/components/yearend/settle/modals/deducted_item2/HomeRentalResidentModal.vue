<template>
  <base-modal title="입력-거주자간" id="homerent-resident-modal" :scroll="false" width="1300">
    <template v-slot:body>
      <comment-box
          class="mb-10"
          :list="[{'text': '* 설문지의 내용을 수정할 경우 신청버튼을 클릭하여 설문지를 다시 작성하여야 합니다.', 'color': 'red'},
                    {'text': '* 전년도 자료 비교를 위해 필수값이 아니더라도 가능한 한 모든값을 입력해 주세요.', 'color': 'red'},]"
      />
      <table-form :colgroup="['8%', 'auto', '15%', 'auto', '8%', 'auto', '8%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="대주성명"
                              :has-error="errors.TRADE_NM && errors.TRADE_NM != ''"/>
            <table-form-item :error-msg="errors.TRADE_NM">
              <ui-input :value="houseRental.TRADE_NM" @change="houseRental.TRADE_NM=$event;"/>
            </table-form-item>
            <table-form-label label="대주 주민(사업자)등록번호" :has-error="errors.BUSNID && errors.BUSNID != ''"/>
            <table-form-item :error-msg="errors.BUSNID">
              <ui-input :value="houseRental.BUSNID" @change="houseRental.BUSNID=$event;"/>
            </table-form-item>
            <table-form-label label="자료분류" :has-error="errors.DATA_SOURCE && errors.DATA_SOURCE != ''"/>
            <table-form-item :error-msg="errors.DATA_SOURCE">
              <ui-dropdown
                  :items="codes.dataSource"
                  :value="houseRental.DATA_SOURCE"
                  @change="houseRental.DATA_SOURCE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
            <table-form-label label="계약번호"/>
            <table-form-item>
              <ui-input :value="houseRental.ACC_NO" @change="houseRental.ACC_NO=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="대출일" :has-error="errors.LEND_DT && errors.LEND_DT != ''"/>
            <table-form-item :error-msg="errors.LEND_DT">
              <ui-input-date
                  :date="houseRental.LEND_DT"
                  @change="houseRental.LEND_DT=$event;"
              />
            </table-form-item>
            <table-form-label label="비고/메모"/>
            <table-form-item colspan="3">
              <ui-input :value="houseRental.EMPLOYEE_COMMENT" @change="houseRental.EMPLOYEE_COMMENT=$event;"/>
            </table-form-item>
          </tr>
        </template>
      </table-form>
      <div class="row mt-10">
        <div class="col-6">
          <table-form title="거주자간 주택임차차입금 임대차계약 내용" :colgroup="['45%', 'auto']">
            <template v-slot:body>
              <tr>
                <table-form-label label="임대인 성명"/>
                <table-form-item>
                  <ui-input :value="houseRental.LESSOR_NAME" @change="houseRental.LESSOR_NAME=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="임대인 주민등록(사업자)번호"/>
                <table-form-item>
                  <ui-input :value="houseRental.LESSOR_NUMBER" @change="houseRental.LESSOR_NUMBER=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="임대차계약기간 시작/종료일" />
                <table-form-item>
                  <div class="row no-gutters">
                    <div class="col-6">
                      <ui-input-date
                          :date="houseRental.LENDING_START"
                          @change="houseRental.LENDING_START=$event;"
                      />
                    </div>
                    <div class="col-6">
                      <ui-input-date
                          :date="houseRental.LENDING_END"
                          @change="houseRental.LENDING_END=$event;"
                      />
                    </div>
                  </div>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="주택유형"/>
                <table-form-item>
                  <ui-dropdown
                      :items="codes.houseType"
                      :value="houseRental.HOUSE_TYPE"
                      @change="houseRental.HOUSE_TYPE=$event.value;"
                      :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="전세보증금"/>
                <table-form-item>
                  <ui-input :value="houseRental.KEY_MONEY" @change="houseRental.KEY_MONEY=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="임대차계약서상 주소지"/>
                <table-form-item>
                  <ui-input :value="houseRental.HOUSE_ADDR" @change="houseRental.HOUSE_ADDR=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="계약면적(m2)"/>
                <table-form-item>
                  <ui-input :value="houseRental.SPACE_SIZE" @change="houseRental.SPACE_SIZE=$event;"/>
                </table-form-item>
              </tr>
            </template>
          </table-form>
        </div>
        <div class="col-6">
          <table-form title="거주자간 주택임차차입금 금전소비대차계약 내용" :colgroup="['45%', 'auto']">
            <template v-slot:body>
              <tr>
                <table-form-label label="대주성명"/>
                <table-form-item>
                  <ui-input :value="houseRental.LENDER_NAME" @change="houseRental.LENDER_NAME=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="대주 주민(사업자)등록번호"/>
                <table-form-item>
                  <ui-input :value="houseRental.LENDER_RRN" @change="houseRental.LENDER_RRN=$event;"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="금전 소비대차계약기간 시작/종료일" :has-error="errors.LEND_START && errors.LEND_START != ''" />
                <table-form-item :error-msg="errors.LEND_START">
                  <div class="row no-gutters">
                    <div class="col-6">
                      <ui-input-date
                          :date="houseRental.LEND_START"
                          @change="houseRental.LEND_START=$event;"
                      />
                    </div>
                    <div class="col-6">
                      <ui-input-date
                          :date="houseRental.LEND_END"
                          @change="houseRental.LEND_END=$event;"
                      />
                    </div>
                  </div>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="원금상환액"/>
                <table-form-item>
                  <ui-input-number :value="houseRental.PRINCIPAL_REDEMP"
                                   @change="houseRental.PRINCIPAL_REDEMP=$event;"
                                   :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="이자상환액"/>
                <table-form-item>
                  <ui-input-number :value="houseRental.INTEREST_PAID"
                                   @change="houseRental.INTEREST_PAID=$event;"
                                   :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="배제액-원금"/>
                <table-form-item>
                  <ui-input-number :value="houseRental.REFUTE_AMOUNT_PRINCIPAL"
                                   @change="houseRental.REFUTE_AMOUNT_PRINCIPAL=$event;"
                                   :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="배제액-이자"/>
                <table-form-item>
                  <ui-input-number :value="houseRental.REFUTE_AMOUNT_INTEREST"
                                   @change="houseRental.REFUTE_AMOUNT_INTEREST=$event;"
                                   :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="차입금 이자율(%)"/>
                <table-form-item>
                  <ui-input-number :value="houseRental.INTEREST_RATE"
                                   @change="houseRental.INTEREST_RATE=$event;"
                                   :options="{
                                            trim         : true,
                                            decimalPlace : 2,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </table-form-item>
              </tr>
            </template>
          </table-form>
        </div>
      </div>
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
import {mapGetters} from "vuex";
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
      mountParam: {},
      houseRental: {
        TRADE_NM: '',
        BUSNID: '',
        DATA_SOURCE: '',
        ACC_NO: '',
        LEND_DT: '',
        EMPLOYEE_COMMENT: '',

        // 임대차계약 내용
        LESSOR_NAME: '',
        LESSOR_NUMBER: '',
        LENDING_START: '',
        LENDING_END: '',
        HOUSE_TYPE: '',
        KEY_MONEY: '0',
        HOUSE_ADDR: '',
        SPACE_SIZE: '0',

        // 금전소비대차계약 내용
        LENDER_NAME: '',
        LENDER_RRN: '',
        LEND_START: '',
        LEND_END: '',
        PRINCIPAL_REDEMP: 0,
        INTEREST_PAID: 0,
        REFUTE_AMOUNT_PRINCIPAL: 0,
        REFUTE_AMOUNT_INTEREST: 0,
        INTEREST_RATE: 0
      }
    }
  },
  methods: {
    asyncDynamicComponentData(param) {
      const me = this;
      me.errors = {};
      me.resetComponent();
      me.mountParam = {...param};
      me.houseRental = me.$mergeProp(me.houseRental, param);
      console.log(me.houseRental);
    },

    validationProcess() {
      let hasError = false;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.houseRental.TRADE_NM)) {
        hasError = true;
        this.errors.TRADE_NM = '대주성명을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.BUSNID)) {
        hasError = true;
        this.errors.BUSNID = '대주 주민(사업자)등록번호을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.DATA_SOURCE)) {
        hasError = true;
        this.errors.DATA_SOURCE = '자료분류를 선택해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.LEND_DT)) {
        hasError = true;
        this.errors.LEND_DT = '대출일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.LEND_START)) {
        hasError = true;
        this.errors.LEND_START = '금전 소비대차계약기간 시작일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.PRINCIPAL_REDEMP)) {
        hasError = true;
        this.errors.PRINCIPAL_REDEMP = '원금상환액을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.houseRental.INTEREST_PAID)) {
        hasError = true;
        this.errors.INTEREST_PAID = '이자상환액을 입력해 주세요.';
      }
      if (hasError) {
        return false;
      }
      return true;
    },
    resetComponent() {
      const me = this;
      me.errors = {};
      me.houseRental = {
        TRADE_NM: '',
        BUSNID: '',
        DATA_SOURCE: '',
        ACC_NO: '',
        LEND_DT: '',
        EMPLOYEE_COMMENT: '',

        // 임대차계약 내용
        LESSOR_NAME: '',
        LESSOR_NUMBER: '',
        LENDING_START: '',
        LENDING_END: '',
        HOUSE_TYPE: '',
        KEY_MONEY: '0',
        HOUSE_ADDR: '',
        SPACE_SIZE: '0',

        // 금전소비대차계약 내용
        LENDER_NAME: '',
        LENDER_RRN: '',
        LEND_START: '',
        LEND_END: '',
        PRINCIPAL_REDEMP: 0,
        INTEREST_PAID: 0,
        REFUTE_AMOUNT_PRINCIPAL: 0,
        REFUTE_AMOUNT_INTEREST: 0,
        INTEREST_RATE: 0
      };
    },
    getParameter() {
      let params = {
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
      };
      return this.$mergeProp(params, this.houseRental);
    },
    //신청
    onApply() {
      if (!this.validationProcess()) {
        return;
      }
      this.close(this.getParameter());
    }
  },
  created() {
    const me = this;
    const codes = getYearendCodeList();
    me.codes.houseType = codes.houseType.items;
    me.codes.dataSource = codes.dataSource.items;
    me.resetComponent();
  }
}
</script>