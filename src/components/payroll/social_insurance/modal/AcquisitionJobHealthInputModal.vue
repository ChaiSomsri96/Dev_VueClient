<template>
    <base-modal title="직장가입자 건강 " id="acquisition-job-health-input-modal" width="850">
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
                        <table-form-label label="사업장 기호" :has-error="errors.MED_WPLACE_CODE != ''" :required="formData.MED_WPLACE_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.MED_WPLACE_CODE">
                            <ui-input :value="formData.MED_WPLACE_CODE.value"
                                      @change="formData.MED_WPLACE_CODE.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="사업장 명칭" :has-error="errors.MED_WPLACE_NAME != ''" :required="formData.MED_WPLACE_NAME.isRequired"/>
                        <table-form-item :error-msg="errors.MED_WPLACE_NAME">
                            <ui-input :value="formData.MED_WPLACE_NAME.value"
                                      @change="formData.MED_WPLACE_NAME.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="자격취득일" :has-error="errors.MED_REGIST_DATE != ''" :required="formData.MED_REGIST_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.MED_REGIST_DATE">
                            <ui-input-date :value="formData.MED_REGIST_DATE.value" @change="formData.MED_REGIST_DATE.value=$event"/>
                        </table-form-item>
                        <table-form-label label="취득부호" :has-error="errors.MED_REGIST_CODE != ''" :required="formData.MED_REGIST_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.MED_REGIST_CODE">
                            <ui-dropdown :items="formData.MED_REGIST_CODE.items"
                                         :value="formData.MED_REGIST_CODE.value"
                                         @change="formData.MED_REGIST_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'MED_REGIST_CODE',
                                             labelField  : 'MED_REGIST_CODE_NAME',
                                             tooltipField: 'MED_REGIST_CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="보수월액" :has-error="errors.MED_MONTHLY_INCOME != ''" :required="formData.MED_MONTHLY_INCOME.isRequired"/>
                        <table-form-item :error-msg="errors.MED_MONTHLY_INCOME">
                            <ui-input-number :value="formData.MED_MONTHLY_INCOME.value" @change="formData.MED_MONTHLY_INCOME.value=$event" />
                        </table-form-item>
                        <table-form-label label="감면" :has-error="errors.MED_REDUCTION != 'MED_REDUCTION'" :required="formData.MED_REDUCTION.isRequired"/>
                        <table-form-item :error-msg="errors.MED_REDUCTION">
                            <ui-dropdown :items="formData.MED_REDUCTION.items"
                                         :value="formData.MED_REDUCTION.value"
                                         @change="formData.PEN_REGIST_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'MED_REDUCTION',
                                             labelField  : 'MED_REDUCTION_NAME',
                                             tooltipField: 'MED_REDUCTION_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="건강보험증 사업장발송여부" :has-error="errors.MED_CARD_DELIVERY_FL != ''" :required="formData.MED_CARD_DELIVERY_FL.isRequired"/>
                        <table-form-item :error-msg="errors.MED_CARD_DELIVERY_FL">
                            <ui-dropdown :items="formData.MED_CARD_DELIVERY_FL.items"
                                         :value="formData.MED_CARD_DELIVERY_FL.value"
                                         @change="formData.MED_CARD_DELIVERY_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
                        </table-form-item>
                        <table-form-label label="회계" :has-error="errors.MED_ACCOUNTING_CODE != ''" :required="formData.MED_ACCOUNTING_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.MED_ACCOUNTING_CODE">
                            <ui-dropdown :items="formData.MED_ACCOUNTING_CODE.items"
                                         :value="formData.MED_ACCOUNTING_CODE.value"
                                         @change="formData.MED_ACCOUNTING_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'MED_ACCOUNTING_CODE',
                                             labelField  : 'MED_ACCOUNTING_CODE_NAME',
                                             tooltipField: 'MED_ACCOUNTING_CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="직종" :has-error="errors.MED_OCCU_CODE != ''" :required="formData.MED_OCCU_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.MED_OCCU_CODE">
                            <ui-dropdown :items="formData.MED_OCCU_CODE.items"
                                         :value="formData.MED_OCCU_CODE.value"
                                         @change="formData.MED_OCCU_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'MED_OCCU_CODE',
                                             labelField  : 'MED_OCCU_CODE_NAME',
                                             tooltipField: 'MED_OCCU_CODE_NAME'}"/>
                        </table-form-item>
                        <table-form-label label="신고 선택여부" :has-error="errors.MED_SELECT_FL != ''" :required="formData.MED_SELECT_FL.isRequired"/>
                        <table-form-item :error-msg="errors.MED_SELECT_FL">
                            <ui-dropdown :items="formData.MED_SELECT_FL.items"
                                         :value="formData.MED_SELECT_FL.value"
                                         @change="formData.MED_SELECT_FL.value=$event.value;"
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
export default {
    name: 'acquisition-job-health-input-modal',
    mixins: [modal],
    components: {
        BaseModal,
        TableForm,
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
                MED_WPLACE_CODE: {
                    value: ''
                },
                MED_WPLACE_NAME: {
                    value: ''
                },
                MED_REGIST_DATE: {
                    value: '',
                    isRequired: true,
                    validMsg: '자격취득일을 입력해주세요.'
                },
                MED_REGIST_CODE: {
                    value: '',
                    items: [],
                    isRequired: true,
                    validMsg: '취득부호를 선택해주세요.'
                },
                MED_MONTHLY_INCOME: {
                    value: 0,
                    isRequired: true,
                    validMsg: '보수월액을 입력해주세요.'
                },
                MED_REDUCTION: {
                    value: '',
                    items: []
                },
                MED_CARD_DELIVERY_FL: {
                    value: '',
                    items: [
                        {code: '1', message: '예'},
                        {code: '2', message: '아니오'},
                    ]
                },
                MED_ACCOUNTING_CODE: {
                    value: '',
                    items: []
                },
                MED_OCCU_CODE: {
                    value: '',
                    items: []
                },
                MED_SELECT_FL: {
                    value: '',
                    items: [
                        {code: 'Y', message: '신고'},
                        {code: 'N', message: '미신고'},
                    ],
                    isRequired: true,
                    validMsg: '신고 선택여부를 선택해주세요.'
                }
            }
        }
    },
    methods: {
        async createDynamicComponent() {
            // 취득부호
            this.formData.MED_REGIST_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'MED_REGIST_CODE'
                }
            });

            // 감면
            this.formData.MED_REDUCTION.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'MED_REDUCTION'
                }
            });

            // 회계
            this.formData.MED_ACCOUNTING_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'MED_ACCOUNTING_CODE'
                }
            });

            // 직종
           this.formData.MED_OCCU_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'MED_OCCU_CODE'
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
                url: '/payroll/insurance/regist/med/update',
                param: me.getFormData(),
                callback: function() {
                    me.toastSuccessSave();
                    me.$emit('loadGridData');
                }
            })

        }
    }
}
</script>
