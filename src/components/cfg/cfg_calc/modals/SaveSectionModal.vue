<template>
<base-modal title="적립구간 적립율 입력" id="save-section-modal" :scroll="false" width="500">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="관리번호" labelClass="col-5" inputClass="col-7"
                :error-msg="errors.ACCUMUL_SEV_CONTROL_NO">
                    <ui-input :value="formData.ACCUMUL_SEV_CONTROL_NO"
                     @change="formData.ACCUMUL_SEV_CONTROL_NO=$event;"
                     :options="{ disabled: (SEV_PROG_TYPE == 'R' || SEV_PROG_TYPE == 'V' || SEV_PROG_TYPE == 'X') }" />
                </labeled-input>
                <labeled-input input-label="기간구분" labelClass="col-5" inputClass="col-7"
                :error-msg="errors.PERIOD_TYPE">
                    <ui-dropdown
                        :items="formData.PERIOD_TYPE.items" 
                        :value="formData.PERIOD_TYPE.value" 
                        @change="formData.PERIOD_TYPE.value=$event.value; formData.PERIOD_TYPE.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message',
                                        disabled: (SEV_PROG_TYPE == 'R' || SEV_PROG_TYPE == 'V' || SEV_PROG_TYPE == 'X')
                        }"
                    />
                </labeled-input>
                <labeled-input input-label="적립구간 시작" labelClass="col-5" inputClass="col-7"
                :error-msg="errors.SEV_PROG_BRACKET_VAL">
                    <ui-input-number :value="formData.SEV_PROG_BRACKET_VAL"
                            @change="formData.SEV_PROG_BRACKET_VAL=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </labeled-input>
                <labeled-input input-label="연적립구간 기준경계" labelClass="col-5" inputClass="col-7"
                :error-msg="errors.BORDER_TYPE">
                    <ui-dropdown
                        :items="formData.BORDER_TYPE.items" 
                        :value="formData.BORDER_TYPE.value" 
                        @change="formData.BORDER_TYPE.value=$event.value; formData.BORDER_TYPE.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message',
                                        disabled: (SEV_PROG_TYPE == 'R' || SEV_PROG_TYPE == 'V' || SEV_PROG_TYPE == 'X')
                        }"
                    />
                </labeled-input>
                <labeled-input input-label="누진율" labelClass="col-5" inputClass="col-7"
                :error-msg="errors.SEV_PROG_RATE">
                    <ui-input-number :value="formData.SEV_PROG_RATE"
                            @change="formData.SEV_PROG_RATE=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 3,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0',
                                            disabled: (SEV_PROG_TYPE == 'V' || SEV_PROG_TYPE == 'X')
                                        }"/>
                </labeled-input>
                <labeled-input input-label="가산값" labelClass="col-5" inputClass="col-7">
                    <ui-input-number :value="formData.SEV_PROG_ADD_VALUE"
                            @change="formData.SEV_PROG_ADD_VALUE=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 3,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0',
                                            disabled: (SEV_PROG_TYPE == 'R' || SEV_PROG_TYPE == 'X')
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
            <button class="btn btn-md black" @click="onSave()">
                <i class="icon-lineIcon-check mr-5"></i>저장
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import modal from '@/mixin/modal';
import BaseModal from '@/components/common/BaseModal';
import LabeledInput from '@/components/common/LabeledInput';
export default {
    mixins: [modal],
    components: {
        BaseModal,
        LabeledInput
    },    
    data() {
        return {
            errors: {},
            SEV_PROG_TYPE: '',
            formData: {
                ACCUMUL_SEV_CONTROL_NO: null, //관리번호
                PERIOD_TYPE: { //기간구분
                    value: '',
                    return: null,
                    items: [
                        { code: 'M', message: 'Month' },
                        { code: 'D', message: 'Day' },
                    ]
                },
                SEV_PROG_BRACKET_VAL: null, //적립구간 시작
                BORDER_TYPE: {             //연적립구간 기준경계
                    value: '',
                    return: null,
                    items: [
                        { code: 'GT', message: 'GT-초과' },
                    ]
                },
                SEV_PROG_ADD_VALUE: null, // 가산값
                SEV_PROG_RATE: null // 누진율
            }
        }
    },
    methods: {
        validationProcess() {
            let hasError = false;
            this.errors = {};
            if(this.payrollUtil.isEmpty(this.formData.ACCUMUL_SEV_CONTROL_NO)
            && this.SEV_PROG_TYPE == 'F') {
                hasError = true;
                this.errors.ACCUMUL_SEV_CONTROL_NO = '관리번호를 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.PERIOD_TYPE.value)
            && this.SEV_PROG_TYPE == 'F') {
                hasError = true;
                this.errors.PERIOD_TYPE = '기간구분을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_PROG_BRACKET_VAL)
            ) {
                hasError = true;
                this.errors.SEV_PROG_BRACKET_VAL = '적립구간 시작을 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.BORDER_TYPE.value)
            && this.SEV_PROG_TYPE == 'F') {
                hasError = true;
                this.errors.BORDER_TYPE = '연적립구간 기준경계을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.SEV_PROG_RATE)
            && (this.SEV_PROG_TYPE == 'F' || this.SEV_PROG_TYPE == 'R')) {
                hasError = true;
                this.errors.SEV_PROG_RATE = '누진율을 입력해 주세요.';
            }
            if(hasError){
                return false;
            }
            return true;
        },  
        onSave() {
            if(!this.validationProcess())
                return;
            let me = this;
            this.$httpPost({
                url: '/payroll/multiretirecfg/prog-rate/insert',
                param: {
                    'ACCUMUL_SEV_CONTROL_NO': this.formData.ACCUMUL_SEV_CONTROL_NO,
                    'PERIOD_TYPE': this.formData.PERIOD_TYPE.value,
                    'SEV_PROG_BRACKET_VAL': this.formData.SEV_PROG_BRACKET_VAL,
                    'BORDER_TYPE': this.formData.BORDER_TYPE.value,
                    'SEV_PROG_RATE': this.formData.SEV_PROG_RATE,
                    'SEV_PROG_ADD_VALUE': this.formData.SEV_PROG_ADD_VALUE
                },
                callback: function() {
                    me.toastSuccessSave();
                    me.close();
                }
            });
        },
        asyncDynamicComponentData(param) {
            if(param.rowData) {
                this.formData.ACCUMUL_SEV_CONTROL_NO = param['rowData']['ACCUMUL_SEV_CONTROL_NO'];
                this.formData.PERIOD_TYPE.value = param['rowData']['PERIOD_TYPE'];
                this.formData.SEV_PROG_BRACKET_VAL = param['rowData']['SEV_PROG_BRACKET_VAL'];
                this.formData.BORDER_TYPE.value = param['rowData']['BORDER_TYPE'];
                this.formData.SEV_PROG_RATE = param['rowData']['SEV_PROG_RATE'];
                this.formData.SEV_PROG_ADD_VALUE = param['rowData']['SEV_PROG_ADD_VALUE'];
            }
            this.SEV_PROG_TYPE = param['SEV_PROG_TYPE'];
        }
    },
}
</script>
