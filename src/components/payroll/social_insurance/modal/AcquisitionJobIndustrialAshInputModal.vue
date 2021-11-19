<template>
    <base-modal title="직장가입자 산재 " id="acquisition-job-industrial-ash-input-modal" width="850">
        <template v-slot:body>
            <table-form :colgroup="['30%', 'auto', '15%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="성명" />
                        <table-form-item>
                            <ui-input :value="formData.EMP_NAME.value"
                                      @change="formData.EMP_NAME.value=$event;"
                                      :options="{readonly: true}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="자격취득일" :has-error="errors.WC_REGIST_DATE != ''" :required="formData.WC_REGIST_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.WC_REGIST_DATE">
                            <ui-input-date :value="formData.WC_REGIST_DATE.value" @change="formData.WC_REGIST_DATE.value=$event"/>
                        </table-form-item>
                        <table-form-label label="직종" :has-error="errors.WC_OCCU_CODE != ''" :required="formData.WC_OCCU_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.WC_OCCU_CODE">
                            <ui-dropdown :items="formData.WC_OCCU_CODE.items"
                                         :value="formData.WC_OCCU_CODE.value"
                                         @change="formData.WC_OCCU_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'WC_OCCU_CODE',
                                             labelField  : 'WC_OCCU_CODE_NAME',
                                             tooltipField: 'WC_OCCU_CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="주 소정 근로시간" :has-error="errors.WC_WEEKLY_WORK_HOUR != ''" :required="formData.WC_WEEKLY_WORK_HOUR.isRequired"/>
                        <table-form-item :error-msg="errors.WC_WEEKLY_WORK_HOUR">
                            <ui-input-number :value="formData.WC_WEEKLY_WORK_HOUR.value" @change="formData.WC_WEEKLY_WORK_HOUR.value=$event"/>
                        </table-form-item>
                        <table-form-label label="계약직 여부" :has-error="errors.WC_TEMP_CONT_FL != ''" :required="formData.WC_TEMP_CONT_FL.isRequired"/>
                        <table-form-item :error-msg="errors.WC_TEMP_CONT_FL">
                            <ui-dropdown :items="formData.WC_TEMP_CONT_FL.items"
                                         :value="formData.WC_TEMP_CONT_FL.value"
                                         @change="formData.WC_TEMP_CONT_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="계약직 종료 년월" :has-error="errors.WC_TEMP_CONT_EXP_MON != ''" :required="formData.WC_TEMP_CONT_EXP_MON.isRequired"/>
                        <table-form-item :error-msg="errors.WC_TEMP_CONT_EXP_MON">
                            <ui-month-picker v-model="formData.WC_TEMP_CONT_EXP_MON.value" />
                        </table-form-item>
                        <table-form-label label="월평균보수" :has-error="errors.WC_MONTHLY_INCOME != ''" :required="formData.WC_MONTHLY_INCOME.isRequired"/>
                        <table-form-item :error-msg="errors.WC_MONTHLY_INCOME">
                            <ui-input-number :value="formData.WC_MONTHLY_INCOME.value" @change="formData.WC_MONTHLY_INCOME.value=$event"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="비고" :has-error="errors.WC_REMARK != ''" :required="formData.WC_REMARK.isRequired"/>
                        <table-form-item :error-msg="errors.WC_REMARK">
                            <ui-dropdown :items="formData.WC_REMARK.items"
                                         :value="formData.WC_REMARK.value"
                                         @change="formData.WC_REMARK.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
                        </table-form-item>
                        <table-form-label label="보험료구분과 구분부호" :has-error="errors.WC_ASSESS_CODE != ''" :required="formData.WC_ASSESS_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.WC_ASSESS_CODE">
                            <ui-dropdown :items="formData.WC_ASSESS_CODE.items"
                                         :value="formData.WC_ASSESS_CODE.value"
                                         @change="formData.WC_ASSESS_CODE.value=$event.value;"

                                         :options="{
                                             valueField  : 'WC_ASSESS_CODE',
                                             labelField  : 'WC_ASSESS_CODE_NAME',
                                             tooltipField: 'WC_ASSESS_CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="보험료구분과 구분사유" :has-error="errors.WC_ASSESS_REASON != ''" :required="formData.WC_ASSESS_REASON.isRequired"/>
                        <table-form-item :error-msg="errors.WC_ASSESS_REASON">
                            <ui-dropdown :items="formData.WC_ASSESS_REASON.items"
                                         :value="formData.WC_ASSESS_REASON.value"
                                         @change="formData.WC_ASSESS_REASON.value=$event.value;"
                                         :options="{
                                             valueField  : 'WC_ASSESS_REASON',
                                             labelField  : 'WC_ASSESS_REASON_NAME',
                                             tooltipField: 'WC_ASSESS_REASON_NAME'}"/>
                        </table-form-item>
                        <table-form-label label="신고 선택여부" :has-error="errors.WC_SELECT_FL != ''" :required="formData.WC_SELECT_FL.isRequired"/>
                        <table-form-item :error-msg="errors.WC_SELECT_FL">
                            <ui-dropdown :items="formData.WC_SELECT_FL.items"
                                         :value="formData.WC_SELECT_FL.value"
                                         @change="formData.WC_SELECT_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
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
                <button type="button"
                        class="btn btn-md black"
                        v-on:click="doSave">
                    <i class="icon-lineIcon-check mr-5"></i><span>저장</span>
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
import UiMonthPicker from '@/components/common/UiMonthPicker';
export default {
    name: 'acquisition-job-industrial-ash-input-modal',
    mixins: [modal],
    components: {
        BaseModal,
        TableForm,
        UiMonthPicker,
        TableFormItem,
        TableFormLabel
    },
    data() {
        return {
            errors: {},
            formData: {
                EID: {
                    value: ''
                },
                EMP_NAME: {
                    value: ''
                },
                SI_REGIST_MATTER_NO: {
                    value: ''
                },
                WC_REGIST_DATE: {
                    value: '',
                    isRequire: true,
                    validMsg: '자격취득일을 입력해주세요.'
                },
                WC_OCCU_CODE: {
                    value: '',
                    items: []
                },
                WC_WEEKLY_WORK_HOUR: {
                    value: 0
                },
                WC_TEMP_CONT_FL: {
                    value: '',
                    items: [
                        {code: '1', message: '여'},
                        {code: '2', message: '부'},
                    ]
                },
                WC_TEMP_CONT_EXP_MON: {
                    value: ''
                },
                WC_MONTHLY_INCOME: {
                    value: 0
                },
                WC_REMARK: {
                    value: '',
                    items: [
                        {code: '01', message: '대학시간강사'}
                    ]
                },
                WC_ASSESS_CODE: {
                    value: '',
                    items: []
                },
                WC_ASSESS_REASON: {
                    value: '',
                    items: []
                },
                WC_SELECT_FL: {
                    value: '',
                    items: [
                        {code: 'Y', message: '신고'},
                        {code: 'N', message: '미신고'},
                    ]
                }
            }
        }
    },
    methods: {
        async createDynamicComponent() {
            // 직종
            this.formData.WC_OCCU_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'WC_OCCU_CODE'
                }
            });

            // 보험료구분과 구분구호
            this.formData.WC_ASSESS_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'WC_ASSESS_CODE'
                }
            });

            // 보험료부과 구분사유
            this.formData.WC_ASSESS_REASON.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'WC_ASSESS_REASON'
                }
            });
        },

        asyncDynamicComponentData(param) {
            this.resetFormData();

            this.setFormData(param);
        },

        setFormData: function(data) {
            const me = this;
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                me.formData[key].value = data[key] || me.$options.data().formData[key].value;
            });
        },

        resetFormData: function() {
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                this.formData[key].value = this.$options.data().formData[key].value;
            });

            this.errors = {};
        },

        async getDropdownData(obj) {
            try {
                let {data} = await this.$httpGet( obj.url, obj.params || {});
                return data;
            } catch(e) {
                console.log(e)
            }
        },

        getFormData: function() {
            const me = this;
            let params = {};
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                params[key] = me.formData[key].value;
            });

            return params;
        },

        checkValidData: function() {
            this.errors = {};
            const me = this;
            let valid = true;
            let keys = Object.keys(this.formData);

            keys.forEach((key) => {
                if(! me.formData[key].isRequired) {
                    return true;
                }

                let data = me.formData[key]
                if(this.payrollUtil.isEmpty(data.value) || data.value === 0) {
                    me.errors[key] = data.validMsg;
                    valid = false;
                }
            });

            return valid;
        },

        async doSave() {
            if( ! this.checkValidData()) {
                return;
            }

            const me = this;
            this.$httpPost({
                url: '/payroll/insurance/regist/wc/update',
                param: me.getFormData(),
                callback: function() {
                    me.toastSuccessSave();
                    me.$emit('loadGridData');
                }
            });

        }
    }
}
</script>
