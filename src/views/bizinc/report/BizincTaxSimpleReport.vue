<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'세무신고'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-tax-report-tab></bizinc-tax-report-tab>
            <labeled-input input-label="신고관리사업장" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.BP_CODE">
                <ui-dropdown :items="formData.BP_CODE.items"
                             :value="formData.BP_CODE.value"
                             @change="formData.BP_CODE.value=$event.value"
                             :options="{
                                         valueField  : 'BP_CODE',
                                         labelField  : 'DV_NAME',
                                         tooltipField: 'DV_NAME'}"/>
            </labeled-input>
            <labeled-input input-label="귀속연도" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.ATT_YEAR">
                <ui-dropdown :items="formData.ATT_YEAR.items"
                             :value="formData.ATT_YEAR.value"
                             @change="formData.ATT_YEAR.value=$event.value;"
                             :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="귀속월" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.MONTH">
                <ui-dropdown :items="formData.MONTH.items"
                             :value="formData.MONTH.value"
                             @change="formData.MONTH.value=$event.value;"
                             :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="출력일" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.OUTPUT_DATE">
                <ui-input-date :value="formData.OUTPUT_DATE.value"
                               @change="formData.OUTPUT_DATE.value=$event"/>
            </labeled-input>
            <labeled-input input-label="종류" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.TYPE">
                <ui-dropdown :items="formData.TYPE.items"
                             :value="formData.TYPE.value"
                             @change="formData.TYPE.value=$event.value;"
                             :options="{
                                             valueField  : 'code',
                                             labelField  : 'message',
                                             tooltipField: 'message'}"/>
            </labeled-input>
        </div>
        <div class="col-12">
            <button-panel btnType="bottom">
                <template v-slot:start>
                    <button class="btn btn-md mr-5" @click="downloadPdf">
                        <i class="icon-lineIcon-check mr-5"></i>
                        PDF보기
                    </button>
                    <button class="btn btn-md mr-5" @click="downloadPreviewFile">
                        <i class="icon-lineIcon-check mr-5"></i>
                        전산매체 엑셀 파일 다운로드
                    </button>
                    <button class="btn btn-md mr-5" @click="downloadPlainFile">
                        <i class="icon-lineIcon-check mr-5"></i>
                        전산매체 평문 다운로드
                    </button>
                </template>
            </button-panel>
        </div>
    </div>
</template>
<script>
    import BizincTaxReportTab from "./BizincTaxReportTab";
    import ButtonPanel from "@/components/common/ButtonPanel";
    import LabeledInput from "@/components/common/LabeledInput";

    export default {
        components: {
            BizincTaxReportTab,
            ButtonPanel,
            LabeledInput
        },
        data() {
            return {
                errors: {},
                formData: {
                    ATT_YEAR: {
                        value: String(new Date().getFullYear()),
                        items: this.getRecentYearList()
                    },
                    BP_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '사업장을 선택해주세요.',
                        items: []
                    },
                    FILE_TYPE: {
                        value: 'BIZ',
                        items: [
                            {code: 'BIZ', message: '거주자 사업소득'},
                            {code: 'NON', message: '비거주자 사업소득'},
                        ]
                    },
                    MONTH: {
                        value: '',
                        items: [
                            {code: '01', message: '1월'},
                            {code: '02', message: '2월'},
                            {code: '03', message: '3월'},
                            {code: '04', message: '4월'},
                            {code: '05', message: '5월'},
                            {code: '06', message: '6월'},
                            {code: '07', message: '7월'},
                            {code: '08', message: '8월'},
                            {code: '09', message: '9월'},
                            {code: '10', message: '10월'},
                            {code: '11', message: '11월'},
                            {code: '12', message: '12월'},
                        ]
                    },
                    OUTPUT_DATE: {
                        value: ''
                    },
                    TYPE: {
                        value: '',
                        items: [
                            {code: '1', message: '보관용'},
                            {code: '2', message: '제출용'},
                        ]
                    }
                },
                fields: [
                    {fieldName: 'EARNER_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_NAME', dataType: 'text'},
                    {fieldName: 'EARNER_REG_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_NATIONALITY', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_CN', dataType: 'text'},
                    {fieldName: 'EARNER_WORK_SITE', dataType: 'text'},
                ],
                columns: [
                    {fieldName: 'EARNER_CODE', header: '관리번호'},
                    {fieldName: 'EARNER_NAME', header: '이름'},
                    {fieldName: 'EARNER_REG_TYPE', header: '소득자구분'},
                    {fieldName: 'EARNER_RESID_TYPE', header: '거주구분'},
                    {fieldName: 'EARNER_NATIONALITY', header: '내외국인'},
                    {fieldName: 'EARNER_RESID_CN', header: '거주국'},
                    {fieldName: 'EARNER_WORK_SITE', header: '관리사업장'},
                ]
            }
        },
        methods: {
            getFormData: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = me.formData[key].value;
                });

                return params;
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            async loadDropdownData() {
                // 신고관리 사업장
                this.formData.BP_CODE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });
            },

            getParams: function() {
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = this.formData[key].value;
                });

                return params;
            },

            async downloadPdf() {
                if(! this.checkValidData()) {
                    return;
                }

                try {
                    const me = this;
                    let param = me.getParams();
                    param.EXTENSION = 'pdf';
                    let {data} = await this.$httpPost({
                        url: '/biz-income/simple-report/file-down',
                        param: {
                            FORM_DATA: JSON.stringify(),
                            EID_LIST: JSON.stringify([])
                        }
                    });
                    this.openPdf(data, '간이지급명세서');
                } catch(e) {
                    console.log('eerors', e);
                }
            },

            async downloadPreviewFile() {
                if(! this.checkValidData()) {
                    return;
                }

                try {
                    const me = this;
                    let param = me.getParams();
                    let {data} = await this.$httpPost({
                        url: '/biz-income/simple-report/elect-report/preview',
                        param: {
                            FORM_DATA: JSON.stringify(),
                            EID_LIST: JSON.stringify([])
                        }
                    });
                    this.openPdf(data, '미리보기.xlsx');
                } catch(e) {
                    console.log('eerors', e);
                }
            },
            async downloadPlainFile() {
                if(! this.checkValidData()) {
                    return;
                }

                try {
                    const me = this;
                    let param = me.getParams();
                    let {data} = await this.$httpPost({
                        url: '/biz-income/simple-report/elect-report/preview',
                        param: {
                            FORM_DATA: JSON.stringify(),
                            EID_LIST: JSON.stringify([])
                        }
                    });
                    this.openPdf(data, '평문파일.txt');
                } catch(e) {
                    console.log('eerors', e);
                }
            }
        },
        async mounted() {
            await this.loadDropdownData();
        }
    }

</script>