<template>
    <base-modal title="연금저축 입력" id="pension-saving-modal" :scroll="false" width="1000">
        <template v-slot:body>
            <table-form :colgroup="['20%', 'auto', '15%', 'auto']" :footerHide="true">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="자료분류" /> 
                        <table-form-item>
                            <ui-dropdown 
                                :items="pensionSaving.DATA_SOURCE.items"
                                :value="pensionSaving.DATA_SOURCE.value"
                                @change="pensionSaving.DATA_SOURCE.value=$event.value; pensionSaving.DATA_SOURCE.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                        <table-form-label label="소득공제 구분" /> 
                        <table-form-item>
                            <ui-dropdown 
                                :items="pensionSaving.SAVINGS_TYPE.items"
                                :value="pensionSaving.SAVINGS_TYPE.value"
                                @change="pensionSaving.SAVINGS_TYPE.value=$event.value; pensionSaving.SAVINGS_TYPE.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="금융기관코드" /> 
                        <table-form-item>
                            <ui-dropdown 
                                :items="pensionSaving.INST_CODE.items"
                                :value="pensionSaving.INST_CODE.value"
                                @change="instCodeChange($event)"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                        <table-form-label label="금융기관상호"
                        :has-error="errors.INST_NAME && errors.INST_NAME != ''" /> 
                        <table-form-item :error-msg="errors.INST_NAME">
                            <ui-input :value="pensionSaving.INST_NAME"
                                      @change="pensionSaving.INST_NAME=$event;"
                                      :options="{readonly:true}" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="금융기관 사업자등록번호"
                        :has-error="errors.INST_BIZID && errors.INST_BIZID != ''" /> 
                        <table-form-item :error-msg="errors.INST_BIZID">
                            <ui-input :value="pensionSaving.INST_BIZID" @change="pensionSaving.INST_BIZID=$event;"/>
                        </table-form-item>
                        <table-form-label label="계좌번호"
                        :has-error="errors.ACC_NO && errors.ACC_NO != ''" /> 
                        <table-form-item :error-msg="errors.ACC_NO">
                            <ui-input :value="pensionSaving.ACC_NO" @change="pensionSaving.ACC_NO=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="가입일자"
                        :has-error="errors.CONTRACT_DATE && errors.CONTRACT_DATE != ''" />
                        <table-form-item :error-msg="errors.CONTRACT_DATE">
                            <ui-input-date :date="pensionSaving.CONTRACT_DATE" @change="pensionSaving.CONTRACT_DATE=$event;"/>
                        </table-form-item>
                        <table-form-label label="납입금액"
                        :has-error="errors.PAID_AMOUNT && errors.PAID_AMOUNT != ''" />
                        <table-form-item :error-msg="errors.PAID_AMOUNT">
                            <ui-input-number :value="pensionSaving.PAID_AMOUNT"
                            @change="pensionSaving.PAID_AMOUNT=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                        </table-form-item>
                    </tr>
                </template>
            </table-form>
            <comment-box 
                class="mt-20"
                :list="[{'text': '* 연금저축 가입일이 2000.12.31 이전인 경우는 소득공제 구분값으로 개인연금저축을 선택해 주세요.'},
                {'text': '* 개인연금저축 가입일이 2001.01.01 이후인 경우는 소득공제 구분값으로 연금저축을 선택해 주세요.'}]"
            />
        </template>
        <template v-slot:footer>
            <div class="btn-wrap">
                <button class="btn btn-md mr-3" data-dismiss="modal" aria-label="Close">
                    <i class="icon-lineIcon-close mr-5"></i>창닫기
                </button>
                <button class="btn btn-md black" @click="onSave">
                    <i class="icon-lineIcon-check mr-5"></i>저장
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
import CommentBox from '@/components/common/CommentBox';
import { mapGetters } from 'vuex';

const pensionSavingParam = {
    EID: 0,
    YES_ID: 0,
    PAYDAY: '',
    PAID_AMOUNT_NTS: 0,
    INP_REMARK: '',
    DED_SELECT: '', 
    INP_FLAG: 'M',
    DED_AMOUNT: 0,
    DATA_SOURCE: 2,
    SAVINGS_TYPE: 22,
    INST_CODE: null,
    INST_NAME: '',
    INST_BIZID: '',
    ACC_NO: '',
    CONTRACT_DATE: '',
    PAID_AMOUNT: 0,
    ATT_YEAR: '',
    CURRENT_STEP: 'SAVINGS'
};

export default {
    mixins: [modal],
    components: {
        BaseModal,
        TableForm,
        TableFormItem,
        TableFormLabel,
        CommentBox
    },
    computed: {
        ...mapGetters({
            eid: 'yearend/getEid',
            attYear: 'yearend/getAttYear',
            payday: 'yearend/getPayday'
        })
    },
    data() {
        return {
            errors: {},
            mountParam: {},
            pensionSaving: {
                INST_CODE: {
                    value: '',
                    return: null,
                    items: []
                },
            }
        }
    },
    methods: {
        resetComponent()   {
            this.pensionSaving = {
                ...this.pensionSaving,
                DATA_SOURCE: {
                    value: '1',
                    return: null,
                    items: [
                        { message: '국세청', code: '1' },
                        { message: '기타', code: '2' },
                    ]
                },
                SAVINGS_TYPE: {
                    value: '11',
                    return: null,
                    items: [
                        { message: '근로자퇴직급여 보장법', code: '11' },
                        { message: '과학기술인 공제', code: '12' },
                        { message: '개인연금저축', code: '21' },
                        { message: '연금저축', code: '22' },
                        { message: '장기집합투자증권저축', code: '51' },
                    ]
                },
                INST_NAME: '',
                INST_BIZID: '',
                ACC_NO: '',
                CONTRACT_DATE: '',
                PAID_AMOUNT: ''
            };
            if(Array.isArray(this.pensionSaving.INST_CODE.items) && this.pensionSaving.INST_CODE.items.length > 0) {
                this.pensionSaving.INST_CODE.value = this.pensionSaving.INST_CODE.items[0]['code'];
                this.pensionSaving.INST_NAME = this.pensionSaving.INST_CODE.items[0]['text'];
            }
        },
        //modal
        async asyncDynamicComponentData(param) {
            this.errors = {};
            if(!param) {
                this.resetComponent();
                // this.mountParam = pensionSavingParam;
                return;
            }
            this.mountParam = { ...pensionSavingParam, ...param };
            this.pensionSaving.DATA_SOURCE.value = param['DATA_SOURCE'];
            this.pensionSaving.SAVINGS_TYPE.value = param['SAVINGS_TYPE'];
            this.pensionSaving.INST_CODE.value = param['INST_CODE'];
            this.pensionSaving.INST_NAME = param['INST_NAME'];
            this.pensionSaving.INST_BIZID = param['INST_BIZID'];
            this.pensionSaving.ACC_NO = param['ACC_NO'];
            this.pensionSaving.CONTRACT_DATE = param['CONTRACT_DATE'];
            this.pensionSaving.PAID_AMOUNT = param['PAID_AMOUNT'];
        },
        //method
        validationProcess() {
            let hasError = false;
            this.errors = {};
            if(this.payrollUtil.isEmpty(this.pensionSaving.INST_NAME)) {
                hasError = true;
                this.errors.INST_NAME = '금융기관상호를 입력해 주세요.';
            }  
            if(this.payrollUtil.isEmpty(this.pensionSaving.INST_BIZID)) {
                hasError = true;
                this.errors.INST_BIZID = '사업자등록번호를 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.pensionSaving.ACC_NO)) {
                hasError = true;
                this.errors.ACC_NO = '계좌번호를 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.pensionSaving.CONTRACT_DATE)) {
                hasError = true;
                this.errors.CONTRACT_DATE = '가입일자를 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.pensionSaving.PAID_AMOUNT)) {
                hasError = true;
                this.errors.PAID_AMOUNT = '납입금액을 입력해 주세요.';
            }
            if(hasError)
                return false;
            return true;
        },
        getParameter() {
            let _param = {
                ...this.mountParam,
                'ATT_YEAR': this.attYear,
                'EID': this.eid,
                'PAYDAY': this.payday,
                'DATA_SOURCE': this.pensionSaving.DATA_SOURCE.value,
                'SAVINGS_TYPE': this.pensionSaving.SAVINGS_TYPE.value,
                'INST_CODE': this.pensionSaving.INST_CODE.value,
                'INST_NAME': this.pensionSaving.INST_NAME,
                'INST_BIZID': this.pensionSaving.INST_BIZID,
                'ACC_NO': this.pensionSaving.ACC_NO,
                'CONTRACT_DATE': this.pensionSaving.CONTRACT_DATE,
                'PAID_AMOUNT': this.pensionSaving.PAID_AMOUNT,
                'CURRENT_STEP': 'SAVINGS',
            };
            return _param;
        },
        async onSave() {
            let me =  this;
            if(!this.validationProcess()) {
                return;
            }
            try {
                await this.$httpPost({
                    url: "/year-end/employee/deduction/request/save-n-return",
                    param: this.getParameter(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.resetComponent();
                    }
                });
                this.close();
            }
            catch(e) {
                console.error("PensionSavingInputModal onSave err: ", e);
            }
        },

        instCodeChange($event) {
            this.pensionSaving.INST_CODE.value = $event.value;
            this.pensionSaving.INST_CODE.return = $event;
            this.pensionSaving.INST_NAME = $event.object.text;
        }
    },
    async created() {
        try {
            this.resetComponent();
            let {data} = await this.$httpGet('/system/setting/mastcode/list', {
                SUPER_CODE: 22,
                INACTIVE: 'N'
            }) || [];
            for(let i = 0; i < data.length; i ++) {
                this.pensionSaving.INST_CODE.items.push({
                    message: data[i]['REAL_CODE'] + ' - ' + data[i]['CODE_NAME'], code: data[i]['REAL_CODE'],
                    text: data[i]['CODE_NAME']
                });
            }
            if(Array.isArray(this.pensionSaving.INST_CODE.items) && this.pensionSaving.INST_CODE.items.length > 0) {
                this.pensionSaving.INST_CODE.value = this.pensionSaving.INST_CODE.items[0]['code'];
                this.pensionSaving.INST_NAME = this.pensionSaving.INST_CODE.items[0]['text'];
            }
        }
        catch(e) {
            console.log("async created err: ", e);
        }
    },
}
</script>