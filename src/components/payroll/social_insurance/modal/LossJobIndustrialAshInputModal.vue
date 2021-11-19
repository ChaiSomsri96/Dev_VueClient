<template>
    <base-modal title="직장가입자 건강 " id="acquisition-job-industrial-ash-input-modal" width="850">
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
                        <table-form-label label="상실일" :has-error="errors.WC_DEREGIST_DATE != ''" :required="formData.WC_DEREGIST_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.WC_DEREGIST_DATE">
                            <ui-input-date :value="formData.WC_DEREGIST_DATE.value" @change="formData.WC_DEREGIST_DATE.value=$event"/>
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
                    <tr>
                        <table-form-label label="상실사유" :has-error="errors.WC_DEREGIST_CODE != ''" :required="formData.WC_DEREGIST_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.WC_DEREGIST_CODE">
                            <ui-dropdown :items="formData.WC_DEREGIST_CODE.items"
                                         :value="formData.WC_DEREGIST_CODE.value"
                                         @change="formData.WC_DEREGIST_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'WC_DEREGIST_CODE',
                                             labelField  : 'WC_DEREGIST_CODE_NAME',
                                             tooltipField: 'WC_DEREGIST_CODE_NAME'}"/>
                        </table-form-item>
                        <table-form-label label="구체적 상실사유" />
                        <table-form-item>
                            <ui-input :value="formData.WC_DEREGIST_REASON.value"
                                      @change="formData.WC_DEREGIST_REASON.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="당해년도 보수총액" :has-error="errors.WC_CURR_YR_INCOME != ''" :required="formData.WC_CURR_YR_INCOME.isRequired"/>
                        <table-form-item :error-msg="errors.WC_CURR_YR_INCOME">
                            <ui-input-number :value="formData.WC_CURR_YR_INCOME.value" @change="formData.WC_CURR_YR_INCOME.value=$event"/>
                        </table-form-item>
                        <table-form-label label="전년도 보수총액" :has-error="errors.WC_PREV_YR_INCOME != ''" :required="formData.WC_PREV_YR_INCOME.isRequired"/>
                        <table-form-item :error-msg="errors.WC_PREV_YR_INCOME">
                            <ui-input-number :value="formData.WC_PREV_YR_INCOME.value" @change="formData.WC_PREV_YR_INCOME.value=$event"/>
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
                SI_DEREGIST_MATTER_NO: {
                    value: ''
                },
                WC_DEREGIST_DATE: {
                    value: '',
                    isRequire: true,
                    validMsg: '상실일을 입력해주세요.'
                },
                WC_SELECT_FL: {
                    value: '',
                    items: [
                        {code: 'Y', message: '신고'},
                        {code: 'N', message: '미신고'},
                    ]
                },
                WC_DEREGIST_REASON: {
                    value: ''
                },
                WC_CURR_YR_INCOME: {
                    value: 0,
                    isRequire: true,
                    validMsg: '당해년도 보수총액을 입력해주세요.'
                },
                WC_PREV_YR_INCOME: {
                    value: 0,
                    isRequire: true,
                    validMsg: '전년도 보수총액을 입력해주세요.'
                },
                WC_DEREGIST_CODE: {
                    value: '',
                    isRequire: true,
                    validMsg: '상실사유를 선택해주세요.',
                    items: []
                }
            }
        }
    },
    methods: {
        async createDynamicComponent() {
            // 상실사유
            this.formData.WC_DEREGIST_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'WC_DEREGIST_CODE'
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
                url: '/payroll/insurance/deregist/wc/update',
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
