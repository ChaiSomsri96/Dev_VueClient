<template>
  <div>
    <div class="content-header">
      <div class="header-bottom">
        <div class="header-bottom-left">
          <div class="menu-box">
            <div class="menu-item title">
              <div class="menu-item-icon">
                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                  <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                </button>
              </div>
              <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                {{ name }} 인사자료 수정
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="row">
        <table-form :colgroup="['20%', '30%','auto']"
                    title="사원정보">
          <template v-slot:body>
            <tr>
              <table-form-label label="이름" :has-error="errors.EMP_NAME != ''" :required="basicData.EMP_NAME.isRequired"/>
              <table-form-item :error-msg="errors.EMP_NAME">
                <ui-input :value="basicData.EMP_NAME.value"
                          @change="basicData.EMP_NAME.value=$event;"
                          :options="{disabled: basicData.EMP_NAME.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="입사일" :has-error="errors.JOIN_DATE != ''" :required="basicData.JOIN_DATE.isRequired"/>
              <table-form-item :error-msg="errors.JOIN_DATE">
                <ui-input :value="basicData.JOIN_DATE.value"
                          @change="basicData.JOIN_DATE.value=$event;"
                          :options="{disabled: basicData.JOIN_DATE.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="사업장" :has-error="errors.WORK_SITE != ''" :required="basicData.WORK_SITE.isRequired"/>
              <table-form-item :error-msg="errors.WORK_SITE">
                <ui-dropdown :items="basicData.WORK_SITE.items"
                             :value="basicData.WORK_SITE.value"
                             @change="basicData.WORK_SITE.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="국세 신고처" :has-error="errors.DV_VATID != ''" :required="basicData.DV_VATID.isRequired"/>
              <table-form-item :error-msg="errors.DV_VATID">
                <ui-dropdown :items="basicData.DV_VATID.items"
                             :value="basicData.DV_VATID.value"
                             @change="basicData.DV_VATID.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="지방세 신고처" :has-error="errors.LTAX_OFFICE != ''" :required="basicData.LTAX_OFFICE.isRequired"/>
              <table-form-item :error-msg="errors.LTAX_OFFICE">
                <ui-dropdown :items="basicData.LTAX_OFFICE.items"
                             :value="basicData.LTAX_OFFICE.value"
                             @change="basicData.LTAX_OFFICE.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="주민세종업원분 신고처" :has-error="errors.ATTRIBUTE2 != ''" :required="basicData.ATTRIBUTE2.isRequired"/>
              <table-form-item :error-msg="errors.ATTRIBUTE2">
                <ui-dropdown :items="basicData.ATTRIBUTE2.items"
                             :value="basicData.ATTRIBUTE2.value"
                             @change="basicData.ATTRIBUTE2.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="급여이체용 은행/계좌번호/예금주" :has-error="errors.BANK_CD != '' || errors.BANK_AC != '' ||errors.ACHOLDER != ''"
                                :required="basicData.BANK_CD.isRequired" multi/>
              <td>
                <table-form-item :error-msg="errors.BANK_CD">
<!--                  <mastcode-dropdown :options="{superCode: '22'}"-->
<!--                                     v-model="basicData.BANK_CD.value"-->
<!--                                     @change="basicData.BANK_CD.value=$event;"/>-->
                </table-form-item>
                <table-form-item :error-msg="errors.BANK_AC">
                  <ui-input :value="basicData.BANK_AC.value"
                            @change="basicData.BANK_AC.value=$event;"/>
                </table-form-item>
                <table-form-item :error-msg="errors.ACHOLDER">
                  <ui-input :value="basicData.ACHOLDER.value"
                            @change="basicData.ACHOLDER.value=$event;"/>
                </table-form-item>
              </td>
            </tr>
            <tr>
              <table-form-label label="퇴직금용 은행/계좌번호/예금주" :has-error="errors.BANK_CD != '' || errors.BANK_AC != '' ||errors.ACHOLDER != ''"
                                :required="basicData.BANK_CD.isRequired" multi/>
              <td>
                <table-form-item :error-msg="errors.BANK_CD">
<!--                  <mastcode-dropdown :options="{superCode: '22'}"-->
<!--                                     v-model="basicData.BANK_CD.value"-->
<!--                                     @change="basicData.BANK_CD.value=$event;"/>-->
                </table-form-item>
                <table-form-item :error-msg="errors.BANK_AC">
                  <ui-input :value="basicData.BANK_AC.value"
                            @change="basicData.BANK_AC.value=$event;"/>
                </table-form-item>
                <table-form-item :error-msg="errors.ACHOLDER">
                  <ui-input :value="basicData.ACHOLDER.value"
                            @change="basicData.ACHOLDER.value=$event;"/>
                </table-form-item>
              </td>

            </tr>
          </template>
        </table-form>

        <table-form :colgroup="['20%', '30%','auto']"
                    title="세액(세율)">
          <template v-slot:body>
            <tr>
              <table-form-label label="전제 공제대상 가족수(본인제외)" :has-error="errors.DEDUCT_FAMILY != ''" :required="payTaxData.DEDUCT_FAMILY.isRequired"/>
              <table-form-item :error-msg="errors.DEDUCT_FAMILY">
                <ui-input :value="payTaxData.DEDUCT_FAMILY.value"
                          @change="payTaxData.DEDUCT_FAMILY.value=$event;"
                          :options="{disabled: payTaxData.DEDUCT_FAMILY.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="공제대상 가족 중 7세 이상 20세 이하 자녀수" :has-error="errors.DEDUCT_CHILD != ''" :required="payTaxData.DEDUCT_CHILD.isRequired"/>
              <table-form-item :error-msg="errors.DEDUCT_CHILD">
                <ui-input :value="payTaxData.DEDUCT_CHILD.value"
                          @change="payTaxData.DEDUCT_CHILD.value=$event;"
                          :options="{disabled: payTaxData.DEDUCT_CHILD.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="소득세 원천징수율" :has-error="errors.WITHHOLD_PERCENT != ''" :required="payTaxData.WITHHOLD_PERCENT.isRequired"/>
              <table-form-item :error-msg="errors.WITHHOLD_PERCENT">
                <mastcode-dropdown :options="{superCode: 'Q7'}"
                                   v-model="payTaxData.WITHHOLD_PERCENT.value"
                                   @change="payTaxData.WITHHOLD_PERCENT.value=$event.value;" />
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="단일 세율 적용 시작 / 만기일" :has-error="errors.SINGLE_TAX_STARTDATE != ''" :required="payTaxData.SINGLE_TAX_STARTDATE.isRequired"/>
              <table-form-item :error-msg="errors.SINGLE_TAX_STARTDATE">
                <ui-input-date :date="payTaxData.SINGLE_TAX_STARTDATE.value"
                               @change="payTaxData.SINGLE_TAX_STARTDATE.value=$event;"
                />
              </table-form-item>
            </tr>
          </template>
        </table-form>

        <table-form :colgroup="['20%', '30%','auto']"
                    title="사회보험">
          <template v-slot:body>
            <tr>
              <table-form-label label="건강보험 공제방법" :has-error="errors.MDINS_FORCED != ''" :required="payTaxData.MDINS_FORCED.isRequired"/>
              <table-form-item :error-msg="errors.MDINS_FORCED">
                <ui-dropdown :items="payTaxData.MDINS_FORCED.items"
                             :value="payTaxData.MDINS_FORCED.value"
                             @change="payTaxData.MDINS_FORCED.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="건강보험 월 보수액" :has-error="errors.MDMON_REGUL != ''" :required="payTaxData.MDMON_REGUL.isRequired"/>
              <table-form-item :error-msg="errors.MDMON_REGUL">
                <ui-input :value="payTaxData.MDMON_REGUL.value"
                          @change="payTaxData.MDMON_REGUL.value=$event;"
                          :options="{disabled: payTaxData.MDMON_REGUL.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="건강보험 경감율 / 장기요양보험 경감율" :has-error="errors.MDINS_EXEM_RATIO != ''" :required="payTaxData.MDINS_EXEM_RATIO.isRequired"/>
              <table-form-item :error-msg="errors.MDINS_EXEM_RATIO">
                <ui-dropdown :items="payTaxData.MDINS_EXEM_RATIO.items"
                             :value="payTaxData.MDINS_EXEM_RATIO.value"
                             @change="payTaxData.MDINS_EXEM_RATIO.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="국민연금 공제방법" :has-error="errors.NPEN_FORCED != ''" :required="payTaxData.NPEN_FORCED.isRequired"/>
              <table-form-item :error-msg="errors.END_DATE">
                <ui-dropdown :items="payTaxData.NPEN_FORCED.items"
                             :value="payTaxData.NPEN_FORCED.value"
                             @change="payTaxData.NPEN_FORCED.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="국민연금 월 보수액" :has-error="errors.NPMON_REGUL != ''" :required="payTaxData.NPMON_REGUL.isRequired"/>
              <table-form-item :error-msg="errors.NPMON_REGUL">
                <ui-input :value="payTaxData.NPMON_REGUL.value"
                          @change="payTaxData.NPMON_REGUL.value=$event;"
                          :options="{disabled: payTaxData.NPMON_REGUL.isReadOnly}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="고용보험 공제방법" :has-error="errors.EMPINS_FORCE != ''" :required="payTaxData.EMPINS_FORCE.isRequired"/>
              <table-form-item :error-msg="errors.EMPINS_FORCE">
                <ui-dropdown :items="payTaxData.EMPINS_FORCE.items"
                             :value="payTaxData.EMPINS_FORCE.value"
                             @change="payTaxData.EMPINS_FORCE.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="고용보험 월 보수액" :has-error="errors.EIMON_REGUL != ''" :required="payTaxData.EIMON_REGUL.isRequired"/>
              <table-form-item :error-msg="errors.EIMON_REGUL">
                <ui-input :value="payTaxData.EIMON_REGUL.value"
                          @change="payTaxData.EIMON_REGUL.value=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="산재보험 가입여부" :has-error="errors.ACINS_FORCED != ''" :required="payTaxData.ACINS_FORCED.isRequired"/>
              <table-form-item :error-msg="errors.ACINS_FORCED">
                <ui-dropdown :items="payTaxData.ACINS_FORCED.items"
                             :value="payTaxData.ACINS_FORCED.value"
                             @change="payTaxData.ACINS_FORCED.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="산재보험 요율(1/1000)" :has-error="errors.ACINS_RATIO != ''" :required="payTaxData.ACINS_RATIO.isRequired"/>
              <table-form-item :error-msg="errors.ACINS_RATIO">
                <ui-input :value="payTaxData.ACINS_RATIO.value"
                          @change="payTaxData.ACINS_RATIO.value=$event;"/>
              </table-form-item>
            </tr>
          </template>
        </table-form>

        <table-form :colgroup="['20%', '30%','auto']"
                    title="퇴직금">
          <template v-slot:body>
            <tr>
              <table-form-label label="퇴직연금 구분" :has-error="errors.SEV_PENSION_TYPE != ''" :required="payTaxData.SEV_PENSION_TYPE.isRequired"/>
              <table-form-item :error-msg="errors.SEV_PENSION_TYPE">
                <ui-dropdown :items="payTaxData.SEV_PENSION_TYPE.items"
                             :value="payTaxData.SEV_PENSION_TYPE.value"
                             @change="payTaxData.SEV_PENSION_TYPE.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="퇴직연금 운용사" :has-error="errors.SEV_PENSION_BANK_CD != ''" :required="payTaxData.SEV_PENSION_BANK_CD.isRequired"/>
              <table-form-item :error-msg="errors.SEV_PENSION_BANK_CD">
                <mastcode-dropdown :options="{superCode: '22'}"
                                    v-model="payTaxData.SEV_PENSION_BANK_CD.value"
                                    @change="payTaxData.SEV_PENSION_BANK_CD.value=$event.value;" />
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="퇴직연금 계좌번호 / 예금주" :has-error="errors.SEV_PENSION_BANK_AC != ''" :required="payTaxData.SEV_PENSION_BANK_AC.isRequired"/>
              <table-form-item :error-msg="errors.SEV_PENSION_BANK_AC">
                <ui-input :value="payTaxData.SEV_PENSION_BANK_AC.value"
                          @change="payTaxData.SEV_PENSION_BANK_AC.value=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="퇴직연금 적립율(100% 일때 1)" :has-error="errors.SEV_RPEN_FIX_RATE != ''" :required="payTaxData.SEV_RPEN_FIX_RATE.isRequired"/>
              <table-form-item :error-msg="errors.SEV_RPEN_FIX_RATE">
                <ui-input :value="payTaxData.SEV_RPEN_FIX_RATE.value"
                          @change="payTaxData.SEV_RPEN_FIX_RATE.value=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="임원여부 운용사" :has-error="errors.EXECUTIVE != ''" :required="payTaxData.EXECUTIVE.isRequired"/>
              <table-form-item :error-msg="errors.EXECUTIVE">
                <ui-dropdown :items="payTaxData.EXECUTIVE.items"
                             :value="payTaxData.EXECUTIVE.value"
                             @change="payTaxData.EXECUTIVE.value=$event.value;"
                             :options="{ valueField: 'REAL_CODE', labelField: 'CODE_NAME', tooltipField: 'CODE_NAME'}"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="근무시작 인정일/ 근속기간 배제일수" :has-error="errors.VALID_JOIN_DATE != ''" :required="payTaxData.VALID_JOIN_DATE.isRequired"/>
              <table-form-item :error-msg="errors.VALID_JOIN_DATE">
                <ui-input-date :date="payTaxData.VALID_JOIN_DATE.value"
                               @change="payTaxData.VALID_JOIN_DATE.value=$event;"
                />
<!--                EXCLUDE_WORKDAY-->
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="퇴직일자 / 퇴직금 중간정산일" :has-error="errors.RETIRE_DATE != ''" :required="payTaxData.RETIRE_DATE.isRequired"/>
              <table-form-item :error-msg="errors.RETIRE_DATE">
                <ui-input-date :date="payTaxData.RETIRE_DATE.value"
                                @change="payTaxData.RETIRE_DATE.value=$event;"
                />
<!--                RETIREBASE_DT-->
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="세법상 퇴직사유" :has-error="errors.RETIRE_REASON != ''" :required="payTaxData.RETIRE_REASON.isRequired"/>
              <table-form-item :error-msg="errors.RETIRE_REASON">
                <mastcode-dropdown :options="{superCode: '2A'}"
                                   v-model="payTaxData.RETIRE_REASON.value"
                                   @change="payTaxData.RETIRE_REASON.value=$event.value;" />
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="퇴사자 추가급여 입사일 / 퇴사자 추가급여 퇴사일" :has-error="errors.ADD_PAY_JOIN_DATE != ''" :required="payTaxData.ADD_PAY_JOIN_DATE.isRequired"/>
              <table-form-item :error-msg="errors.ADD_PAY_JOIN_DATE">
                <ui-input-date :date="payTaxData.ADD_PAY_JOIN_DATE.value"
                               @change="payTaxData.ADD_PAY_JOIN_DATE.value=$event;"
                />
<!--                ADD_PAY_RETIRE_DATE-->
              </table-form-item>
            </tr>
          </template>
        </table-form>
      </div>
      <div class="btn-wrap" align="center">
        <button class="btn btn-md flat" @click="gotoList">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave" >
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import LabeledInput from '@/components/common/LabeledInput';
import MastcodeDropdown from '@/components/common/MastcodeDropdown';
export default {
  components: {
    BorderBox,
    BorderBoxItem,
    LabeledInput,
    MastcodeDropdown,
    TableForm,
    TableFormItem,
    TableFormLabel,
  },
  computed: {
    ...mapGetters({
      declarationForm: 'withholding/getDeclarationForm'
    })
  },
  data() {
    return {
      name: '',
      EID: '',
      errors: {},
      paycodeItems:[],
      basicData: {
        EID:{value: ''},
        EMP_NAME: {
          value: '',
          isRequired: true,
          isReadOnly: true,
          validMsg: '이름을 선택해주세요',
        },
        WORK_SITE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '사업장을 선택해주세요.',
          items: [
            { CODE_NAME: 'USD', REAL_CODE: 'USD' },
            { CODE_NAME: 'YEN', REAL_CODE: 'YEN' }
          ]
        },
        DV_VATID: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '국세 신고처를 선택해주세요.',
          items: [
            { CODE_NAME: 'USD', REAL_CODE: 'USD' },
            { CODE_NAME: 'YEN', REAL_CODE: 'YEN' }
          ]
        },
        LTAX_OFFICE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '지방세 신고처를 선택해주세요.',
          items: [
            { CODE_NAME: 'USD', REAL_CODE: 'USD' },
            { CODE_NAME: 'YEN', REAL_CODE: 'YEN' }
          ]
        },
        ATTRIBUTE2: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '주민세종업원분 신고처를 선택해주세요.',
          items: [
            { CODE_NAME: 'USD', REAL_CODE: 'USD' },
            { CODE_NAME: 'YEN', REAL_CODE: 'YEN' }
          ]
        },
        BANK_CD: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '급여이체용 은행을 선택해주세요.',
          items: [
            { CODE_NAME: 'USD', REAL_CODE: 'USD' },
            { CODE_NAME: 'YEN', REAL_CODE: 'YEN' }
          ]
        },
        BANK_AC: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '계좌번호를 입력해주세요',
        },
        ACHOLDER: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '예금주를 선택해주세요',
        },
        JOIN_DATE:{
          value: '',
          isRequired: true,
          isReadOnly: true,
        }

      },
      payTaxData:{
        DEDUCT_FAMILY: {
          value: '0',
          isRequired: true,
          isReadOnly: false,
          validMsg: '전체 공제대상 가족수를 입력해주세요',
        },
        DEDUCT_CHILD: {
          value: '0',
          isRequired: true,
          isReadOnly: false,
          validMsg: '공제 대상 가족중 7세 이상 20세 이하 자녀수를 입력해주세요',
        },
        WITHHOLD_PERCENT: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '소득세 원천징수율을 선택해주세요.',
        },
        SINGLE_TAX_STARTDATE:{
          value: '',
          isRequired: false,
          isReadOnly: false,
        },
        SEV_PENSION_TYPE: {
          value: 'DB',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
          items: [
            { CODE_NAME: 'DB', REAL_CODE: 'DB' },
            { CODE_NAME: 'DC', REAL_CODE: 'DC' },
            { CODE_NAME: 'IRP', REAL_CODE: 'IR' },
            { CODE_NAME: '없음', REAL_CODE: 'NN' }
          ]
        },
        SEV_PENSION_BANK_CD: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        SEV_PENSION_BANK_AC: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },

        SEV_RPEN_FIX_RATE: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },

        EXECUTIVE: {
          value: 'N',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
          items: [
            { CODE_NAME: 'NO', REAL_CODE: 'N' },
            { CODE_NAME: 'YES', REAL_CODE: 'Y' }
          ]
        },
        ADD_PAY_JOIN_DATE: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        RETIRE_REASON: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        VALID_JOIN_DATE: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        RETIRE_DATE: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        MDINS_FORCED: {
          value: 'D',
          isRequired: true,
          isReadOnly: false,
          validMsg: '건강보험 공제방법을 선택해주세요.',
          items: [
            { CODE_NAME: '표준', REAL_CODE: 'D' },
            { CODE_NAME: '공제안함', REAL_CODE: 'N' }
          ]
        },
        MDMON_REGUL: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        MDINS_EXEM_RATIO: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
          items: [
            { CODE_NAME: '0%', REAL_CODE: '0' },
            { CODE_NAME: '50%', REAL_CODE: '50' },
            { CODE_NAME: '60%', REAL_CODE: '60' }
          ]
        },
        NPEN_FORCED: {
          value: 'D',
          isRequired: true,
          isReadOnly: false,
          validMsg: '국민연금 공제 방법을 선택해주세요.',
          items: [
            { CODE_NAME: '표준', REAL_CODE: 'D' },
            { CODE_NAME: '공제안함', REAL_CODE: 'N' },
            { CODE_NAME: '강제공제', REAL_CODE: 'Y' },
          ]
        },
        NPMON_REGUL: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        EMPINS_FORCE: {
          value: 'D',
          isRequired: true,
          isReadOnly: false,
          validMsg: '고용보험 공제방법을 선택해주세요.',
          items: [
            { CODE_NAME: '표준', REAL_CODE: 'D' },
            { CODE_NAME: '공제안함', REAL_CODE: 'N' }
          ]
        },
        EIMON_REGUL: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
        ACINS_FORCED: {
          value: 'NO',
          isRequired: true,
          isReadOnly: false,
          validMsg: '산재보험 가입여부를 선택해주세요.',
          items: [
            { CODE_NAME: 'NO', REAL_CODE: 'NO' },
            { CODE_NAME: 'YES', REAL_CODE: 'YES' }
          ]
        },
        ACINS_RATIO: {
          value: '',
          isRequired: false,
          isReadOnly: false,
          validMsg: '',
        },
      },
    }
  },
  methods:{
    async asyncData(){
      this.EID = this.declarationForm[0].EID

    },
    async applyComponent(){
      const me = this;

      let { data } = await this.$httpGet('/employee/master',{'EID':this.EID});

      let keys = Object.keys(this.basicData);
      keys.forEach((key) => {
        me.basicData[key].value = data['masterForm'][key] || me.$options.data().basicData[key].value;

      });
      keys = Object.keys(this.payTaxData);
      keys.forEach((key) => {
        me.payTaxData[key].value = data['payInfoForm'][key] || me.$options.data().payTaxData[key].value;

      });
      this.payTaxData.WITHHOLD_PERCENT.value = data['payInfoForm']['WITHHOLD_PERCENT'] == '1' ? '1.00' : data['payInfoForm']['WITHHOLD_PERCENT'];
      this.basicData.EMP_NAME.value =this.declarationForm[0].EMP_NAM
      this.basicData.JOIN_DATE.value = this.declarationForm[0].JOIN_DATE

    },
    gotoList() {
      let me = this;
      Object.assign(this.basicData, this.$options.data().basicData);
      Object.assign(this.payTaxData, this.$options.data().payTaxData);
      me.$router.push({name: 'CfgEmployeeMasterEntry'});
    },
    getSaveParams: function() {
      let params = {};
      let formData = this.getFormData(this.basicData);
      let keys = Object.keys(formData);
      keys.forEach((key) => {
        params[key] = formData[key].value;
      });

      return params;
    },
    getSavePayParams: function() {
      let params = {};
      let formData = this.getFormData(this.payTaxData);
      let keys = Object.keys(formData);
      keys.forEach((key) => {
        params[key] = formData[key].value;
      });

      return params;
    },
    getFormData: function(data) {
      let params = {};
      Object.assign(params, data);
      return params;
    },
    isValiStaticRequiredData: function(formData) {
      this.errors = {};
      const me = this;
      let valid = true;
      let keys = Object.keys(formData);
      keys.forEach((key) => {
        let data = formData[key];
        if(! data.isRequired) {
          return true;
        }

        if(data.isDynamicRequired === true) {
          return true;
        }

        if(this.payrollUtil.isEmpty(data.value)) {

          me.errors[key] = data.validMsg;
          valid = false;
        }
      });
      return valid;
    },
    async onSave() {
      const me = this;
      let check=false;
      let formData = this.getFormData(this.basicData);
      if( ! this.isValiStaticRequiredData(formData)) {
        check=true;
      }
      let formData1 = this.getFormData(this.payTaxData);
      if( ! this.isValiStaticRequiredData(formData1)) {
        check=true;
      }
      if(check){
        return;
      }
      await this.$httpPost({
        url: '/employee/master/update',
        param: this.getSaveParams(),
        callback: function() {
          me.toastSuccessSave();
        }
      });
      await this.$httpPost({
        url: '/employee/payinfo/update',
        param: this.getSavePayParams(),
        callback: function() {
          me.toastSuccessSave();
          me.gotoList();
        }
      });
    },
  },
  async mounted() {
    try {
      await this.asyncData();

      if(!this.declarationForm)
        return;
      this.name = this.declarationForm[0].EMP_NAM
      this.GRID_REQ_PARAM = this.declarationForm;
      this.applyComponent();
    }
    catch(err) {
      console.log("CfgEmployeeMasterEntryInput mounted err: ", err);
    }
  },
}
</script>

<style scoped>

</style>