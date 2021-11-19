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
                            대장_일평균_일기준 퇴직금 계산식 입력
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content-body">
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="관리번호" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_CONTROL_NO">
                    <ui-input :value="formData.SEV_CONTROL_NO"
                        @change="formData.SEV_CONTROL_NO=$event;"
                    />
                </labeled-input>
                <labeled-input input-label="제목" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_CONTROL_TITLE">
                    <ui-input :value="formData.SEV_CONTROL_TITLE"
                        @change="formData.SEV_CONTROL_TITLE=$event;"
                    />
                </labeled-input>
                <labeled-input input-label="1년 미만" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_ONE_YR">
                    <ui-dropdown :items="formData.SEV_ONE_YR.items"
                                :value="formData.SEV_ONE_YR.value"
                                @change="formData.SEV_ONE_YR.value=$event.value; formData.SEV_ONE_YR.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="평균급여 포함항목" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_IN_PAYCODE">
                    <ui-dropdown :items="formData.SEV_IN_PAYCODE.items"
                                :value="formData.SEV_IN_PAYCODE.value"
                                @change="formData.SEV_IN_PAYCODE.value=$event.value; formData.SEV_IN_PAYCODE.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="평균급여 종류" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_AVE_SAL_TYPE">
                    <ui-dropdown :items="formData.SEV_AVE_SAL_TYPE.items"
                                :value="formData.SEV_AVE_SAL_TYPE.value"
                                @change="formData.SEV_AVE_SAL_TYPE.value=$event.value; formData.SEV_AVE_SAL_TYPE.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="평균급여 산정기간 일수" labelClass="col-3" inputClass="col-3">
                    <ui-dropdown :items="formData.SEV_TYPE_PERIOD_DAYS.items"
                                :value="formData.SEV_TYPE_PERIOD_DAYS.value"
                                @change="formData.SEV_TYPE_PERIOD_DAYS.value=$event.value; formData.SEV_TYPE_PERIOD_DAYS.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="근속시간 적용기준" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SVC_PER_METHOD">
                    <ui-dropdown :items="formData.SVC_PER_METHOD.items"
                                :value="formData.SVC_PER_METHOD.value"
                                @change="formData.SVC_PER_METHOD.value=$event.value; formData.SVC_PER_METHOD.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="고정값 입력" labelClass="col-3" inputClass="col-3">
                    <ui-input :value="formData.SEV_PERIOD_DAYS"
                        @change="formData.SEV_PERIOD_DAYS=$event;"
                        :options="{disabled: (formData.SEV_TYPE_PERIOD_DAYS.value == 'C')}"
                    />
                </labeled-input>
                <labeled-input input-label="근속월수 계산법" labelClass="col-3" inputClass="col-3">
                    <ui-dropdown :items="formData.SVC_MON_CALC.items"
                                :value="formData.SVC_MON_CALC.value"
                                @change="formData.SVC_MON_CALC.value=$event.value; formData.SVC_MON_CALC.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message',
                                                disabled: (formData.SVC_PER_METHOD.value == 'D' || formData.SVC_PER_METHOD.value == 'Y')
                                            }" />    
                </labeled-input>
                <labeled-input input-label="근속일수 계산법" labelClass="col-3" inputClass="col-3">
                    <ui-dropdown :items="formData.SVC_YR_CALC.items"
                                :value="formData.SVC_YR_CALC.value"
                                @change="formData.SVC_YR_CALC.value=$event.value; formData.SVC_YR_CALC.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message',
                                                disabled: (formData.SVC_PER_METHOD.value == 'D' || formData.SVC_PER_METHOD.value == 'M')
                                            }" />    
                </labeled-input>
                <labeled-input input-label="누진방식" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.SEV_PROG_TYPE">
                    <mastcode-dropdown :options="{superCode: 'AQ'}"
                    v-model="formData.SEV_PROG_TYPE.value"
                    @change="formData.SEV_PROG_TYPE.value=$event.value; formData.SEV_PROG_TYPE.return=$event;"
                     />
                </labeled-input>
                <labeled-input input-label="누진구간 기준 경계" labelClass="col-3" inputClass="col-3">
                    <ui-dropdown :items="formData.SEV_PROG_BORDER.items"
                                :value="formData.SEV_PROG_BORDER.value"
                                @change="formData.SEV_PROG_BORDER.value=$event.value; formData.SEV_PROG_BORDER.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <save-section-grid ref="saveSectionGrid" v-if="formData.SEV_PROG_TYPE.value != 'X' && formData.SEV_PROG_TYPE.value != ''"
                :sev-prog-type="formData.SEV_PROG_TYPE.value"
                :sev-control-no="formData.SEV_CONTROL_NO"
                :svc-per-method="formData.SVC_PER_METHOD.value"
                :sev-prog-border="formData.SEV_PROG_BORDER.value"
                 />
            </div>

            <div class="form-bottom">
                <button type="button" class="btn btn-lg flat" @click="cancel()"><i class="icon-lineIcon-close mr-5"></i>취소</button>
                <button type="button" class="btn btn-lg black ml-5" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import MastcodeDropdown from '@/components/common/MastcodeDropdown';
import LabeledInput from "@/components/common/LabeledInput";
import SaveSectionGrid from '@/components/cfg/cfg_calc/grids/SaveSectionGrid';
import { mapGetters } from 'vuex';

const reqParam = {
    "SEV_CONTROL_NO":"",
    "SEV_CONTROL_TITLE":"",
    "SEV_ONE_YR":"",
    "SEV_APPL_SCOPE":"1",
    "SEV_LOA_CHK_DAYS":"0",
    "INACTIVE":"N",
    "SEV_CONTROL_TYPE":"S",
    "SEV_CONTROL_TARGET":"A",
    "HRDEPT_CODE":null,
    "RANK_CD":null,
    "JOBGROUP_CD":null,
    "EMPTYPE_CD":null,
    "SEV_IN_PAYCODE":"",
    "SEV_AVE_SAL_TYPE":"",
    "SEV_TYPE_PERIOD_DAYS":"",
    "SEV_PERIOD_DAYS":"",
    "THR_MON_AVE_SAL_T":null,
    "THR_MON_AVE_SAL_M":null,
    "TWL_MON_AVE_SAL_T":null,
    "TWL_MON_AVE_SAL_M":null,
    "ONE_MON_AVE_SAL_T":null,
    "ONE_MON_AVE_SAL_M":null,
    "SVC_PER_METHOD":"",
    "SVC_MON_CALC":null,
    "SVC_YR_CALC":null,
    "SEV_PROG_TYPE":"",
    "SEV_PROG_BORDER":"",
    "SEV_PROG_FORMUAL_SAMPLE":"N*(1.15+(N-5)/100)*1.1"
};

export default {    
    components: {
        LabeledInput,
        SaveSectionGrid,
        MastcodeDropdown
    },
    computed: {
        ...mapGetters({
            cfgRetireCalcForm: 'cfgcalc/getCfgRetireCalcForm'
        })
    },
    data() {
        return {
            errors: {},
            reqParameter: {},
            formData: {
                SEV_CONTROL_NO: '', //관리번호
                SEV_CONTROL_TITLE: '', //제목
                SEV_ONE_YR: { //1년 미만*
                    value: '',
                    return: null,
                    items: [
                        { code: 'N', message: '미포함' },
                        { code: 'Y', message: '포함' },
                    ]   
                },
                SEV_IN_PAYCODE: { //평균급여 포함항목
                    value: '',
                    return: null,
                    items: [
                        { code: 'F', message: 'F-급여코드의 퇴직금표식에 따름' },
                    ]
                },
                SEV_AVE_SAL_TYPE: { //평균급여 종류
                    value: '',
                    return: null,
                    items: [
                        { code: 'D', message: '일평균' },
                    ]
                },
                SEV_TYPE_PERIOD_DAYS: { //평균급여 산정기간 일수
                    value: '',
                    return: null,
                    items: [
                        { code: 'C', message: '역월기준' },
                        { code: 'F', message: '고정값' },
                    ]
                },
                SVC_PER_METHOD: { //근속시간 적용기준
                    value: '',
                    return: null,
                    items: [
                        { code: 'Y', message: 'Year' },
                        { code: 'M', message: 'Month' },
                        { code: 'D', message: 'Day' },
                    ]
                },
                SEV_PERIOD_DAYS: '',  //고정값 입력

                SVC_MON_CALC: { //근속월수 계산법
                    value: '',
                    return: null,
                    items: [
                        { code: '1AB', message: '근속월수 계산법' },
                    ]
                },
                SVC_YR_CALC: { //근속연수 계산법
                    value: '',
                    return: null,
                    items: [
                        { code: 'PPP365', message: '1-근속일수 /365' },
                    ]
                },
                SEV_PROG_TYPE: { //누진방식
                    value: '',
                    return: null,
                    items: [
                        { code: 'X', message: 'F-고정된 연적립율' },
                        { code: 'G', message: 'G-고정된 연적립율' },
                    ]
                },
                SEV_PROG_BORDER: {  //누진구간 기준 경계
                    value: '',
                    return: null,
                    items: [
                        { code: 'GT', message: 'GT-초과' },
                    ]
                }
            }
        }
    },
    methods: {
        gotoList() {
            this.$router.push({name: 'CfgRetireCalc'});   
        },
        cancel() {
            this.$router.push({name: 'CfgRetireCalc'});   
        },
        validationProcess() {
            let hasError = false;
            this.errors = {};

            if(this.payrollUtil.isEmpty(this.formData.SEV_CONTROL_NO)) {
                hasError = true;
                this.errors.SEV_CONTROL_NO = '관리번호를 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_CONTROL_TITLE)) {
                hasError = true;
                this.errors.SEV_CONTROL_TITLE = '제목을 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_ONE_YR.value)) {
                hasError = true;
                this.errors.SEV_ONE_YR = '1년 미만을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_IN_PAYCODE.value)) {
                hasError = true;
                this.errors.SEV_IN_PAYCODE = '평균급여 포함항목을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_AVE_SAL_TYPE.value)) {
                hasError = true;
                this.errors.SEV_AVE_SAL_TYPE = '평균급여 종류를 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SVC_PER_METHOD.value)) {
                hasError = true;
                this.errors.SVC_PER_METHOD = '근속시간 적용기준을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_PROG_TYPE.value)) {
                hasError = true;
                this.errors.SEV_PROG_TYPE = '누진방식을 선택해 주세요.';
            }
            if(hasError){
                return false;
            }
            return true;
        },
        async onSave() { //저장
            if(!this.validationProcess())
                return;
            let _parameter = {
                ...this.reqParameter,
                'SEV_CONTROL_NO': this.formData.SEV_CONTROL_NO,
                'SEV_CONTROL_TITLE': this.formData.SEV_CONTROL_TITLE,
                'SEV_ONE_YR': this.formData.SEV_ONE_YR.value,
                'SEV_IN_PAYCODE': this.formData.SEV_IN_PAYCODE.value,
                'SEV_AVE_SAL_TYPE': this.formData.SEV_AVE_SAL_TYPE.value,
                'SEV_TYPE_PERIOD_DAYS': this.formData.SEV_TYPE_PERIOD_DAYS.value,
                'SVC_PER_METHOD': this.formData.SVC_PER_METHOD.value,
                'SEV_PERIOD_DAYS': this.formData.SEV_PERIOD_DAYS,
                'SVC_MON_CALC': this.formData.SVC_MON_CALC.value,
                'SVC_YR_CALC': this.formData.SVC_YR_CALC.value,
                'SEV_PROG_TYPE': this.formData.SEV_PROG_TYPE.value,
                'SEV_PROG_BORDER': this.formData.SEV_PROG_BORDER.value
            };
            let me = this;
            try {
                await this.$httpPostBody({
                    url: "/payroll/multiretirecfg/cs-header/insert",
                    param: _parameter,
                    callback: function () {
                        me.toastSuccessSave();
                        me.$router.push({name: 'CfgRetireCalc'});
                    }    
                });
            }
            catch(e) {
                console.error('CfgRetireCalcInput onSave Error: ', e);
            }
        }
    },
    mounted() {
        if(this.cfgRetireCalcForm) {
            this.formData.SEV_CONTROL_NO = this.cfgRetireCalcForm.SEV_CONTROL_NO;
            this.formData.SEV_CONTROL_TITLE = this.cfgRetireCalcForm.SEV_CONTROL_TITLE;
            this.formData.SEV_ONE_YR.value = this.cfgRetireCalcForm.SEV_ONE_YR;
            this.formData.SEV_IN_PAYCODE.value = this.cfgRetireCalcForm.SEV_IN_PAYCODE;
            this.formData.SEV_AVE_SAL_TYPE.value = this.cfgRetireCalcForm.SEV_AVE_SAL_TYPE;
            this.formData.SEV_TYPE_PERIOD_DAYS.value = this.cfgRetireCalcForm.SEV_TYPE_PERIOD_DAYS;
            this.formData.SVC_PER_METHOD.value = this.cfgRetireCalcForm.SVC_PER_METHOD;
            this.formData.SEV_PERIOD_DAYS = this.cfgRetireCalcForm.SEV_PERIOD_DAYS;
            this.formData.SVC_MON_CALC.value = this.cfgRetireCalcForm.SVC_MON_CALC;
            this.formData.SVC_YR_CALC.value = this.cfgRetireCalcForm.SVC_YR_CALC;
            this.formData.SEV_PROG_TYPE.value = this.cfgRetireCalcForm.SEV_PROG_TYPE;
            this.formData.SEV_PROG_BORDER.value = this.cfgRetireCalcForm.SEV_PROG_BORDER;

            this.reqParameter = {
                ...reqParam,
                ...this.cfgRetireCalcForm
            };


        }
        else {
            this.reqParameter = reqParam;
        }
    },
}
</script>
