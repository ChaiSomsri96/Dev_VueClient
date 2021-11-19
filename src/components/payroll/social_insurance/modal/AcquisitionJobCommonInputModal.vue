<template>
    <base-modal title="직장가입자 공통 " id="acquisition-job-common-input-modal" width="500">
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
                        <table-form-label label="국적"/>
                        <table-form-item :error-msg="errors.SI_NATIONALITY">
                            <ui-dropdown :items="formData.SI_NATIONALITY.items"
                                         :value="formData.SI_NATIONALITY.value"
                                         @change="formData.SI_NATIONALITY.value=$event.value;"
                                         :options="{
                                             valueField  : 'REAL_CODE',
                                             labelField  : 'CODE_NAME',
                                             tooltipField: 'CODE_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="체류자격"/>
                        <table-form-item :error-msg="errors.SI_STAY_STATUS">
                            <ui-dropdown :items="formData.SI_STAY_STATUS.items"
                                         :value="formData.SI_STAY_STATUS.value"
                                         @change="formData.SI_STAY_STATUS.value=$event.value;"
                                         :options="{
                                             valueField  : 'SI_STAY_STATUS',
                                             labelField  : 'SI_STAY_STATUS_NAME',
                                             tooltipField: 'SI_STAY_STATUS_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="대표자여부"/>
                        <table-form-item :error-msg="errors.SI_REP_FLAG">
                            <ui-dropdown :items="formData.SI_REP_FLAG.items"
                                         :value="formData.SI_REP_FLAG.value"
                                         @change="formData.SI_REP_FLAG.value=$event.value;"
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
    name: 'acquisition-job-common-input-modal',
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
                SI_NATIONALITY: {
                    value: '',
                    items: []
                },
                SI_STAY_STATUS: {
                    value: '',
                    items: []
                },
                SI_REP_FLAG: {
                    value: '',
                    items: [
                        {code: '1', message: '예'},
                        {code: '2', message: '아니오'}
                    ]
                }
            }
        }
    },
    methods: {
        async createDynamicComponent() {
            // 국적
            this.formData.SI_NATIONALITY.items = await this.getDropdownData({
                url: '/system/setting/mastcode/list-all',
                params: {
                    SUPER_CODE: 'E4',
                    INACTIVE: 'N'
                }
            });

            // 체류자격
            this.formData.SI_STAY_STATUS.items = await this.getDropdownData({
                url: '/payroll/insurance/code-list',
                params: {
                    FIELD: 'SI_STAY_STATUS'
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

        async doSave() {
            const me = this;
            this.$httpPost({
                url: '/payroll/insurance/regist/common-inf/update',
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
