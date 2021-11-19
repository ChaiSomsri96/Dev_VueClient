<template>
    <base-modal title="원천징수영수증 출력" id="bizinc-report-modal" size="large" width="200">
        <template v-slot:body>
            <table-form :colgroup="['40%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="작성일" :has-error="errors.PUB_DATE != ''" :required="formData.PUB_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.PUB_DATE">
                            <ui-input-date :value="formData.PUB_DATE.value"
                                           @change="formData.PUB_DATE.value=$event"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="구분" :has-error="errors.TYPE != ''" :required="formData.TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.TYPE">
                            <ui-dropdown :items="formData.TYPE.items"
                                         :value="formData.TYPE.value"
                                         @change="formData.TYPE.value=$event.value;"
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
    import TableForm from '@/components/common/TableForm';
    import TableFormItem from '@/components/common/TableFormItem';
    import TableFormLabel from '@/components/common/TableFormLabel';
    import UiMonthPicker from '@/components/common/UiMonthPicker';

    export default {
        name: 'bizinc-report-modal',
        mixins: [modal],
        components: {
            BaseModal,
            TableForm,
            TableFormItem,
            TableFormLabel,
            UiMonthPicker
        },
        data() {
            return {
                errors: {},
                formData: {
                    PUB_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '작성일을 입력해주세요.'
                    },
                    TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '구분을 선택해주세요.',
                        items: [
                            {code: '1', message: '소득자보관용'},
                            {code: '2', message: '발행자보관용'},
                        ]
                    },
                    EARNER_CODE_LIST: {
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

                try {
                    const me = this;
                    let {data} = await this.$httpPost({
                        url: '/bizinc/biz-income/bizincome/pdf-down',
                        param: {
                            formData: JSON.stringify(params),
                            earnerList: JSON.stringify(me.formData.EARNER_CODE_LIST)
                        }
                    });
                    this.openPdf(data, "영수증");
                } catch(e) {
                    console.log("error", e);
                }

            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
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
                    if(this.payrollUtil.isEmpty(data.value)) {
                        me.errors[key] = data.validMsg;
                        valid = false;
                    }
                });

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

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.formData.EARNER_CODE_LIST.items = _param.EARNER_CODE_LIST;
            },
        }
    }
</script>