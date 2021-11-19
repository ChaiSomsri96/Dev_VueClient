<template>
    <base-modal title="" id="bizinc-report-modal" size="large" width="200">
        <template v-slot:body>
            <table-form :colgroup="['40%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="제출일" :has-error="errors.SUBMIT_DATE != ''" :required="formData.SUBMIT_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.SUBMIT_DATE">
                            <ui-input-date :value="formData.SUBMIT_DATE.value"
                                           @change="formData.SUBMIT_DATE.value=$event"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="제출대상기간" :has-error="errors.SUBMIT_TARGET != ''" :required="formData.SUBMIT_TARGET.isRequired"/>
                        <table-form-item :error-msg="errors.SUBMIT_TARGET">
                            <ui-dropdown :items="formData.SUBMIT_TARGET.items"
                                         :value="formData.SUBMIT_TARGET.value"
                                         @change="formData.SUBMIT_TARGET.value=$event.value;"
                                         :options="{
                                           valueField  : 'code',
                                           labelField  : 'message',
                                           tooltipField: 'message'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="신고관리사업장" :has-error="errors.BIZUNIT_CODE != ''" :required="formData.BIZUNIT_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.TYPE">
                            <ui-dropdown :items="formData.BIZUNIT_CODE.items"
                                         :value="formData.BIZUNIT_CODE.value"
                                         @change="formData.BIZUNIT_CODE.value=$event.value;"
                                         :options="{
                                         valueField  : 'BP_CODE',
                                         labelField  : 'DV_NAME',
                                         tooltipField: 'DV_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="제출자구분" :has-error="errors.REPORTER_TYPE != ''" :required="formData.REPORTER_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.REPORTER_TYPE">
                            <ui-dropdown :items="formData.REPORTER_TYPE.items"
                                         :value="formData.REPORTER_TYPE.value"
                                         @change="formData.REPORTER_TYPE.value=$event.value"
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
                        v-on:click="downloadFile">
                    <i class="icon-lineIcon-check mr-5"></i><span>조회</span>
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
            UiMonthPicker,

        },
        data() {
            return {
                errors: {},
                formData: {
                    SUBMIT_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '제출일을 입력해주세요.'
                    },
                    SUBMIT_TARGET: {
                        value: '',
                        isRequired: true,
                        validMsg: '제출대상기간을 선택해주세요.',
                        items: [
                            {code: '1', message: '연간 합산제출'},
                            {code: '2', message: '휴.폐업에 의한 수시제출'},
                            {code: '2', message: '수시 분할제출'},
                        ]
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '신고관리사업장을 선택해주세요.',
                        items: []
                    },
                    REPORTER_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '제출자 구분을 선택해주세요.',
                        items: [
                            {
                                code: '2',
                                message: '법인'
                            },
                            {
                                code: '3',
                                message: '개인'
                            }
                        ]
                    },
                    ATT_YEAR: {
                        value: ''
                    },
                    FILE_TYPE: {
                        value: ''
                    },
                },
                EARNER_CODE_LIST: {
                    items: []
                },
                url: ''
            }
        },
        methods: {
            async downloadFile() {
                if( ! this.checkValidData()) {
                    return;
                }

                let params = this.getFormData();

                try {
                    const me = this;
                    let {data} = await this.$httpPost({
                        url: this.formData.url,
                        param: {
                            formData: JSON.stringify(params),
                            list: JSON.stringify(me.EARNER_CODE_LIST),
                            BP_LIST: JSON.stringify(['4448800380'])
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

                this.EARNER_CODE_LIST.items = _param.EARNER_CODE_LIST;
                this.formData.FILE_TYPE.value = _param.FILE_TYPE;
                this.formData.ATT_YEAR.value = _param.ATT_YEAR;
                this.formData.url = _param.url;
            },

            async createDynamicComponent() {
                // 신고관리 사업장
                this.formData.BIZUNIT_CODE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },
        }
    }
</script>