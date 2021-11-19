<template>   
<div>
    <ui-header :msg="'세무신고'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="원천징수이행상황신고서" :to="{name: 'WithholdingTaxReport'}"/>
            <base-tabs-item label="근로소득간이지급명세서" :to="{name: 'EarnedIncomeReport'}"/>
            <base-tabs-item label="주민세 종업원분" :to="{name: 'ResidentTaxReport'}"/>
        </base-tabs>
        <div class="form-wrap">
            <labeled-input input-label="사업장" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.BP_CODE">
                <ui-dropdown :items="formData.BP_CODE.items"
                             :value="formData.BP_CODE.value"
                             @change="formData.BP_CODE.value=$event.value"
                             :options="{
                                         valueField  : 'BP_CODE',
                                         labelField  : 'DV_NAME',
                                         tooltipField: 'DV_NAME'}"/>
            </labeled-input>
            <labeled-input input-label="귀속연도" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.ATT_YEAR">
                <ui-input-year :value="formData.ATT_YEAR.value" @change="formData.ATT_YEAR.value=$event;"/>
            </labeled-input>
            <labeled-input input-label="반기" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.HALF_YEARLY">
                <ui-dropdown :items="formData.HALF_YEARLY.items"
                             :value="formData.HALF_YEARLY.value"
                             @change="formData.HALF_YEARLY.value=$event.value"
                             :options="{
                                       valueField  : 'code',
                                       labelField  : 'message',
                                       tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="출력일" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.PAY_DATE">
                <ui-input-date :value="formData.PAY_DATE.value" @change="formData.PAY_DATE.value=$event;"/>
            </labeled-input>
            <labeled-input input-label="종류" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.TYPE">
                <ui-dropdown :items="formData.TYPE.items"
                             :value="formData.TYPE.value"
                             @change="formData.TYPE.value=$event.value"
                             :options="{
                                       valueField  : 'code',
                                       labelField  : 'message',
                                       tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="비거주자인 외국인 표시" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.IS_RRN">
                <ui-dropdown :items="formData.IS_RRN.items"
                             :value="formData.IS_RRN.value"
                             @change="formData.IS_RRN.value=$event.value"
                             :options="{
                                       valueField  : 'code',
                                       labelField  : 'message',
                                       tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="제출자 구분" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.REPORTER_TYPE">
                <ui-dropdown :items="formData.REPORTER_TYPE.items"
                             :value="formData.REPORTER_TYPE.value"
                             @change="formData.REPORTER_TYPE.value=$event.value"
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
                        전산매체 미리보기 파일 다운로드
                    </button>
                    <button class="btn btn-md mr-5" @click="downloadPlainFile">
                        <i class="icon-lineIcon-check mr-5"></i>
                        전산매체 평문 다운로드
                    </button>
                </template>
            </button-panel>
        </div>
    </div>
</div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import LabeledInput from "@/components/common/LabeledInput";
import ButtonPanel from "@/components/common/ButtonPanel";
import UiInputYear from "@/components/common/UiInputYear";

export default {
    components: {
        BaseTabs,
        BaseTabsItem,
        UiInputYear,
        LabeledInput,
        ButtonPanel
    },
    data() {
        return {
            errors: {},
            formData: {
                BP_CODE: {
                    value: '',
                    isRequired: true,
                    validMsg: '사업장을 선택해주세요.',
                    items: []
                },
                ATT_YEAR: {
                    value: '',
                    isRequired: true,
                    validMsg: '귀속연도를 입력해주세요.'
                },
                HALF_YEARLY: {
                    value: '',
                    isRequired: true,
                    validMsg: '반기를 선택해주세요',
                    items: [
                        {
                            code: 'FIRST',
                            message: '상반기'
                        },
                        {
                            code: 'SECOND',
                            message: '하반기'
                        }
                    ]
                },
                TYPE: {
                    value: '',
                    isRequired: true,
                    validMsg: '종류를 선택해주세요.',
                    items: [
                        {
                            code: '1',
                            message: '보관용'
                        },
                        {
                            code: '2',
                            message: '제출용'
                        }
                    ]
                },
                PAY_DATE: {
                    value: '',
                    isRequired: true,
                    validMsg: '출력일자를 입력해주세요.'
                },
                IS_RRN: {
                    value: '',
                    isRequired: true,
                    validMsg: '비거주자인 외국인 표시를 선택해주세요.',
                    items: [
                        {
                            code: 'YES',
                            message: '주민등록번호'
                        },
                        {
                            code: 'NO',
                            message: '여권번호'
                        }
                    ]
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
                EMP_SEL: {
                    value: 'ALL'
                },
                INCLUDE_SINGLE_TAX: {
                    value: 'YES'
                },
                INCLUDE_CONSTRUCTIVE_BONUS: {
                    value: 'YES'
                },

            }
        }
    },
    methods: {
        async loadDropdownData() {
            this.formData.BP_CODE.items = await this.getDropdownData({
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
                let {data} = await this.$httpPost({
                    url: '/payroll/withhold/nts-simple-report/pdf',
                    param: {
                        FORM_DATA: JSON.stringify(me.getParams()),
                        EID_LIST: JSON.stringify([])
                    }
                });
                this.openPdf(data, '근로소득 간이지급명세서');
            } catch(e) {
                console.log('eerors', e);
            }
        },

        async downloadPreviewFile() {
            if(! this.checkValidData()) {
                return;
            }

            let params = this.getParams();
        },

        async downloadPlainFile() {
            if(! this.checkValidData()) {
                return;
            }

            let params = this.getParams();
        },
    },

    mounted() {
        this.loadDropdownData();
    }

}
</script>