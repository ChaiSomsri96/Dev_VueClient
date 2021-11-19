<template>
    <base-modal title="근로소득원천징수부 출력" id="bizinc-report-modal" width="500">
        <template v-slot:body>
            <table-form :colgroup="['30%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="귀속월" :has-error="errors.MONTH != ''" :required="true"/>
                        <table-form-item :error-msg="errors.MONTH">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-month-picker v-model="formData.PAY_START_MONTH.value" />
                                <span>~</span>
                                <ui-month-picker v-model="formData.PAY_END_MONTH.value" />
                            </div>
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
                        v-on:click="printReceipt">
                    <i class="icon-lineIcon-check mr-5"></i><span>출력</span>
                </button>
            </div>
        </template>
    </base-modal>
</template>
<script>
    import BaseModal from '@/components/common/BaseModal';
    import modal from '@/mixin/modal';
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import TableForm from '@/components/common/TableForm';
    import TableFormItem from '@/components/common/TableFormItem';
    import TableFormLabel from '@/components/common/TableFormLabel';

    export default {
        name: 'pay-tax-file-report-modal',
        mixins: [modal],
        components: {
            BaseModal,
            UiMonthPicker,
            TableForm,
            TableFormItem,
            TableFormLabel
        },
        data() {
            return {
                errors: {},
                formData: {
                    PAY_START_MONTH: {
                        value: '',
                        isRequired: true
                    },
                    PAY_END_MONTH: {
                        value: '',
                        isRequired: true
                    },
                    EID_LIST: {
                        items: []
                    }
                },
            }
        },
        methods: {
            async printReceipt() {
                if( ! this.checkValidData()) {
                    return;
                }

                let params = this.getFormData();
                params.PAY_YEAR = params.PAY_START_MONTH.substring(0, 4);
                params.MONTH = params.PAY_END_MONTH.substring(4, 6);

                try {
                    const me = this;
                    let {data} = await this.$httpPost({
                        url: '/payroll/withhold/withholdIncome-inwithstmsalaryincomeqry/pdf-down',
                        param: {
                            FORM_DATA: JSON.stringify(params),
                            EID_LIST: JSON.stringify(me.formData.EID_LIST.items)
                        }
                    });
                    this.openPdf(data, "근로소득 원천징수부부조회");
                } catch(e) {
                    console.log("error", e);
                }

            },

            checkValidData: function() {
                this.errors = {};
                let valid = true;

                if(this.payrollUtil.isEmpty(this.formData.PAY_START_MONTH.value) || this.payrollUtil.isEmpty(this.formData.PAY_END_MONTH.value)) {
                   this.errors.MONTH = '귀속월을 선택해주세요';
                   valid = false;
                }

                return valid;
            },

            getFormData: function() {
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = this.formData[key].value;
                });

                return params;
            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
            },

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.formData.EID_LIST.items = _param.EID_LIST;
            },
        }
    }
</script>