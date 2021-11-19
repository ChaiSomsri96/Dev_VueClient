<template>
    <base-modal title="직장가입자 연금 " id="acquisition-job-annual-input-modal" width="500">
        <template v-slot:body>
            <table-form :colgroup="['40%', 'auto']">
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
                        <table-form-label label="취득부호" :has-error="errors.PEN_REGIST_CODE != ''" :required="formData.PEN_REGIST_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_REGIST_CODE">
                            <ui-dropdown :items="formData.PEN_REGIST_CODE.items"
                                         :value="formData.PEN_REGIST_CODE.value"
                                         @change="formData.PEN_REGIST_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'PEN_REGIST_CODE',
                                             labelField  : 'PEN_REGIST_CODE_NAME',
                                             tooltipField: 'PEN_REGIST_CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="자격취득일" :has-error="errors.PEN_REGIST_DATE != ''" :required="formData.PEN_REGIST_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_REGIST_DATE">
                            <ui-input-date :value="formData.PEN_REGIST_DATE.value" @change="formData.PEN_REGIST_DATE.value=$event"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="신고 선택여부" :has-error="errors.PEN_SELECT_FL != ''" :required="formData.PEN_SELECT_FL.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_SELECT_FL">
                            <ui-dropdown :items="formData.PEN_SELECT_FL.items"
                                         :value="formData.PEN_SELECT_FL.value"
                                         @change="formData.PEN_SELECT_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득월액" :has-error="errors.PEN_MONTHLY_INCOME != ''" :required="formData.PEN_MONTHLY_INCOME.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_MONTHLY_INCOME">
                            <ui-input-number :value="formData.PEN_MONTHLY_INCOME.value" @change="formData.PEN_MONTHLY_INCOME.value=$event" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="취득월 납부여부" :has-error="errors.PEN_BEG_MON_FL != ''" :required="formData.PEN_BEG_MON_FL.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_BEG_MON_FL">
                            <ui-dropdown :items="formData.PEN_BEG_MON_FL.items"
                                         :value="formData.PEN_BEG_MON_FL.value"
                                         @change="formData.PEN_BEG_MON_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="특수직종" :has-error="errors.PEN_SPECIAL_OCCU_CODE != ''" :required="formData.PEN_SPECIAL_OCCU_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_SPECIAL_OCCU_CODE">
                            <ui-dropdown :items="formData.PEN_SPECIAL_OCCU_CODE.items"
                                         :value="formData.PEN_SPECIAL_OCCU_CODE.value"
                                         @change="formData.PEN_SPECIAL_OCCU_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'REAL_CODE',
                                             labelField  : 'CODE_NAME',
                                             tooltipField: 'CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="직역연금부호" :has-error="errors.PEN_OTH_PEN_FL != ''" :required="formData.PEN_OTH_PEN_FL.isRequired"/>
                        <table-form-item :error-msg="errors.PEN_OTH_PEN_FL">
                            <ui-dropdown :items="formData.PEN_OTH_PEN_FL.items"
                                         :value="formData.PEN_OTH_PEN_FL.value"
                                         @change="formData.PEN_OTH_PEN_FL.value=$event.value;"
                                         :options="{
                                             valueField  : 'REAL_CODE',
                                             labelField  : 'CODE_NAME',
                                             tooltipField: 'CODE_NAME'}"/>
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
    name: 'acquisition-job-annual-input-modal',
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
                PEN_REGIST_CODE: {
                    value: '',
                    items: [],
                    isRequired: true,
                    validMsg: '취득부호를 선택해주세요'
                },
                PEN_REGIST_DATE: {
                    value: '',
                    isRequired: true,
                    validMsg: '자격취득일을 입력해주세요.'
                },
                PEN_SELECT_FL: {
                    value: '',
                    items: [
                        {code: 'Y', message: '신고'},
                        {code: 'N', message: '미신고'},
                    ],
                    isRequired: true,
                    validMsg: '신고 선택여부를 선택해주세요.'
                },
                PEN_MONTHLY_INCOME: {
                    value: 0,
                    isRequired: true,
                    validMsg: '소득월액을 입력해주세요.'
                },
                PEN_BEG_MON_FL: {
                    value: '',
                    items: [
                        {code: '1', message: '희망'},
                        {code: '2', message: '미희망'},
                    ],
                    isRequired: true,
                    validMsg: '취득월 납부여부를 선택해주세요.'
                },
                PEN_SPECIAL_OCCU_CODE: {
                    value: '',
                    items: [],
                    isRequired: true,
                    validMsg: '특수직종을 선택해주세요.'
                },
                PEN_OTH_PEN_FL: {
                    value: '',
                    items: [],
                    isRequired: true,
                    validMsg: '직역연금부호을 선택해주세요.'
                }
            }
        }
    },
    methods: {
        async createDynamicComponent() {
            // 특수직종
            this.formData.PEN_SPECIAL_OCCU_CODE.items = await this.getDropdownData({
                url: '/system/setting/mastcode/list-all',
                params: {
                    SUPER_CODE: '45',
                    INACTIVE: 'N'
                }
            });

            // 직역연금부호
            this.formData.PEN_OTH_PEN_FL.items = await this.getDropdownData({
                url: '/system/setting/mastcode/list-all',
                params: {
                    SUPER_CODE: '46',
                    INACTIVE: 'N'
                }
            });

            // 체류자격
            this.formData.PEN_REGIST_CODE.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'PEN_REGIST_CODE'
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
                url: '/payroll/insurance/regist/pension/update',
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
