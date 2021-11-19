<template>
<base-modal title="소득세원천징수확인서 조회" id="income-tax-source-modal" :scroll="false" width="700">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="급여월" labelClass="col-3" inputClass="col-9">
                    <div class="flex align-items-center">
                        <ui-month-picker v-model="queryFormData.payMonthFrom" />
                        <span style="padding: 0px 10px 0px 10px;">~</span>
                        <ui-month-picker v-model="queryFormData.payMonthTo" />
                    </div>
                </labeled-input>                
                <labeled-input input-label="신고구분" labelClass="col-3" inputClass="col-4">
                    <ui-dropdown :items="queryFormData.filingType.items"
                                        :value="queryFormData.filingType.value"
                                        @change="queryFormData.filingType.value=$event.value; queryFormData.filingType.return=$event;"
                                        :options="{
                                                        valueField  : 'code',
                                                        labelField  : 'message',
                                                        tooltipField: 'message'
                                                    }" />
                </labeled-input>
                <labeled-input input-label="사용목적" labelClass="col-3" inputClass="col-6">
                    <ui-input :value="queryFormData.useGoal" @change="queryFormData.useGoal=$event;"
                    :options="{ trim : true, addDivClass : 'input-group p-0', }" />
                </labeled-input>

                <labeled-input input-label="제출처" labelClass="col-3" inputClass="col-6">
                    <ui-input :value="queryFormData.submission" @change="queryFormData.submission=$event;"
                    :options="{ trim : true, addDivClass : 'input-group p-0', }" />
                </labeled-input>

                <labeled-input input-label="작성일" labelClass="col-3" inputClass="col-6">
                    <ui-input-date :date="queryFormData.makeDate"
                                           @change="queryFormData.makeDate=$event;" />
                </labeled-input>

                <labeled-input input-label="개인정보" labelClass="col-3" inputClass="col-6">
                    <ui-radio-button-inline :options="queryFormData.profileVisible" 
                                @change="queryFormData.profileVisible.value=$event.value" />      
                </labeled-input>
                <labeled-input input-label="언어" labelClass="col-3" inputClass="col-4">
                    <ui-dropdown :items="queryFormData.language.items"
                                 :value="queryFormData.language.value"
                                 @change="queryFormData.language.value=$event.value; queryFormData.language.return=$event;"
                                 :options="{
                                    valueField  : 'code',
                                    labelField  : 'message',
                                    tooltipField: 'message'
                                }" />
                </labeled-input>
            </div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>창닫기
            </button>
            <button class="btn btn-md black" @click="query">
                <i class="icon-lineIcon-del mr-5"></i>조회
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import LabeledInput from '@/components/common/LabeledInput';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
export default {
    mixins: [modal],
    components: {
        BaseModal,
        LabeledInput,
        UiMonthPicker,
        UiRadioButtonInline
    },
    data() {
        return {    
            eidList: [],
            queryFormData: {
                payMonthFrom: '202101', //급여월
                payMonthTo: '202104', 
                filingType: {
                    value: 'monthly',
                    return: null,
                    items: [
                        { message: '매월', code: 'monthly' },
                        { message: '반기', code: 'half' }
                    ]
                },
                useGoal: '은행제출용',
                submission: '금융기관',
                makeDate: '20210425', //작성일
                profileVisible: { //개인정보
                    name: 'profile-visible',
                    value: 'Y',
                    domOptList: [
                        { value: 'Y', label: '표시' },
                        { value: 'N', label: '숨김' }
                    ]
                },
                language: {
                    value: 'KOREAN',
                    return: null,
                    items: [
                        { message: '한국어', code: 'KOREAN' },
                        { message: '영어', code: 'ENGLISH' },
                        { message: '일어', code: 'JAPANESE' } ]
                }
            }
        }
    },
    methods: {
        async query() {
            try {
                let personInfo = (await this.$httpGet('/year-end/report/income/list-confperson'))['data'];
                if(!Array.isArray(personInfo) || personInfo.length == 0)
                    return;
                let { data } = await this.$httpPost({
                    url: '/year-end/report/income/file-print',
                    param: {
                        'PAY_MONTH_FROM': this.queryFormData.payMonthFrom,
                        'PAY_MONTH_TO': this.queryFormData.payMonthTo,
                        'PURPOSE': this.queryFormData.useGoal,
                        'SUBMIT_TO': this.queryFormData.submission,
                        'PUB_DATE': null,
                        'DEC_TYPE': 'Y',
                        'CONFIRM_NAME': personInfo[0].CONFIRM_NAME,
                        'CONFIRM_ENAME': personInfo[0].CONFIRM_ENAME,
                        'CONFIRM_REGNO': personInfo[0].CONFIRM_REGNO,
                        'COMPIRM_PHONENO': personInfo[0].COMPIRM_PHONENO,
                        'COMFIRM_ADDRESS': personInfo[0].COMFIRM_ADDRESS,
                        'COMFIRM_EADDRESS': personInfo[0].COMFIRM_EADDRESS,
                        'COMFIRM_SIGNNAME': personInfo[0].COMFIRM_SIGNNAME,
                        'COMFIRM_ESIGNNAME': personInfo[0].COMFIRM_ESIGNNAME,
                        'RPT_LANG': this.queryFormData.language.value,
                        'PERSONAL_INFO_MASK': this.queryFormData.profileVisible.value,
                        'ISSUE_PROXY': 'Y',
                        'REPORT_TYPE': 'pdf',
                        'EID_LIST': JSON.stringify(this.eidList),
                        'EID': this.eidList[0]['EID'],
                        'EXTENSION': 'pdf'
                    },
                    blob: true
                });
                this.openPdf(data, "소득세원천징수확인서 조회");
                this.close();
            }
            catch(err) {
                console.log("IncomeTaxSourceModal err: ", err);
            }
        },
        asyncDynamicComponentData(param) {
            this.eidList = param;
        }
    },
}
</script>