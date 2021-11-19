<template>   
<div>
    <ui-header :msg="'지방세신고'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="원천징수이행상황신고서" :to="{name: 'WithholdingTaxReport'}"/>
            <base-tabs-item label="근로소득간이지급명세서" :to="{name: 'EarnedIncomeReport'}"/>
            <base-tabs-item label="지방소득세" :to="{name: 'LocalTaxReport'}"/>
            <base-tabs-item label="주민세 종업원분" :to="{name: 'ResidentTaxReport'}"/>
        </base-tabs>
        <div class="form-wrap">
            <labeled-input input-label="신고구분" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.FILING_TYPE">
                <ui-dropdown :items="formData.FILING_TYPE.items"
                             :value="formData.FILING_TYPE.value"
                             @change="formData.FILING_TYPE.value=$event.value"
                             :options="{
                                       valueField  : 'code',
                                       labelField  : 'message',
                                       tooltipField: 'message'}"/>
            </labeled-input>
            <labeled-input input-label="급여일(시작)" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.PAYDAY_START">
                <ui-input-date :value="formData.PAYDAY_START.value"
                               @change="formData.PAYDAY_START.value=$event"
                               :max-date="formData.PAYDAY_END.value"/>
            </labeled-input>
            <labeled-input input-label="급여일(종료)" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.PAYDAY_END">
                <ui-input-date :value="formData.PAYDAY_END.value"
                               @change="formData.PAYDAY_END.value=$event"
                               :min-date="formData.PAYDAY_START.value" />
            </labeled-input>
            <labeled-input input-label="급여지급연월(신고서상)" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.PAY_MON">
                <ui-month-picker v-model="formData.PAY_MON.value" />
            </labeled-input>
            <labeled-input input-label="귀속연월(신고서상)" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.IMPUTE_MON">
                <ui-month-picker v-model="formData.IMPUTE_MON.value" />
            </labeled-input>
            <labeled-input input-label="자진납부기한(신고서상)" class="row" labelClass="col-2" inputClass="col-2" :error-msg="errors.VOLUNTARY_PAYMENT_DUE_DATE">
                <ui-input-date :value="formData.VOLUNTARY_PAYMENT_DUE_DATE.value" @change="formData.VOLUNTARY_PAYMENT_DUE_DATE.value=$event;"/>
            </labeled-input>
        </div>
        <div class="col-12">
            <button-panel btnType="botton">
                <template v-slot:start>
                    <button class="btn btn-md mr-5" @click="openLocalTaxReportQry">
                        미리보기
                    </button>
                    <button class="btn btn-md mr-5" @click="downloadFile">
                        위택스 신고용 파일 생성
                    </button>
                </template>
            </button-panel>
        </div>
    </div>
    <local-tax-report-modal ref="localTaxReportModal"/>
</div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import ButtonPanel from "@/components/common/ButtonPanel";
import LabeledInput from "@/components/common/LabeledInput";
import LocalTaxReportModal from '@/components/payroll/pay_tax_report/modals/LocalTaxReportModal';

export default {
    components: {
        BaseTabs,
        BaseTabsItem,
        LabeledInput,
        ButtonPanel,
        UiMonthPicker,
        LocalTaxReportModal
    },
    data() {
        return {
            errors: {},
            formData: {
                FILING_TYPE: {
                    value: '',
                    items: [
                        {code: '1', message: '월'},
                        {code: '2', message: '반기'},
                    ],
                    isRequired: true,
                    validMsg: '신고구분을 선택해주세요.'
                },
                PAYDAY_START: {
                    value: '',
                    isRequired: true,
                    validMsg: '급여일(시작)을 입력해주세요.'
                },
                PAYDAY_END: {
                    value: '',
                    isRequired: true,
                    validMsg: '급여일(종료)을 입력해주세요.'
                },
                PAY_MON: {
                    value: '',
                    isRequired: true,
                    validMsg: '급여지급연월(신고서상)을 입력해주세요.'
                },
                IMPUTE_MON: {
                    value: '',
                    isRequired: true,
                    validMsg: '귀속연월(신고서상)을 입력해주세요.'
                },
                VOLUNTARY_PAYMENT_DUE_DATE: {
                    value: '',
                }
            },
        }
    },
    methods: {
        getParams: function() {
            let params = {};
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                params[key] = this.formData[key].value;
            });

            return params;
        },

        checkOpenModalValiData: function() {
            this.errors = {};
            let valid = true;
            if(this.payrollUtil.isEmpty(this.formData.PAYDAY_START.value)) {
                this.errors.PAYDAY_START = '급여일(시작)을 입력해주세요.';
                valid = false;
            }

            if(this.payrollUtil.isEmpty(this.formData.PAYDAY_END.value)) {
                this.errors.PAYDAY_END = '급여일(종료)을 입력해주세요.';
                valid = false;
            }

            return valid;
        },

        checkDownloadFileValidData: function() {
            this.errors = {};
            const me = this;
            let valid = true;
            let keys = Object.keys(this.formData);

            keys.forEach((key) => {
                let data = me.formData[key];
                if(! data.isRequired) {
                    return true;
                }

                if(this.payrollUtil.isEmpty(data.value)) {
                    me.errors[key] = data.validMsg;
                    valid = false;
                    return true;
                }
            });

            return valid;
        },

        openLocalTaxReportQry: function() {
            if(! this.checkOpenModalValiData()) {
                return;
            }
            this.$refs.localTaxReportModal.show(this.getParams());
        },

        downloadFile: function() {
            if(! this.checkDownloadFileValidData()) {
                return;
            }

            let {data} = this.$httpPost({
                url: '/payroll/withhold/pay-localtax/excle-download',
                param: this.getParams(),
                blob: true
            });

            this.downloadPdf(data, '지방소득세특별징수분_신고용_엑셀파일.xls');
        }
    },
}
</script>