<template>
<base-modal title="명세 및 세액, 부표" id="particulars-buoys-modal" :scroll="false" width="600">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input :input-label="codeShow" labelClass="col-9" inputClass="col-3">
                </labeled-input>
                <labeled-input 
                v-if="CREATE"
                :error-msg="errors.INC_CODE"
                input-label="원천징수소득 코드" labelClass="col-5" inputClass="col-7">
                    <mastcode-dropdown 
                        :options="{superCode: '3J'}"
                        v-model="CODE_DATA.INC_CODE" 
                        @change="onChangeIncCode"
                    />
                </labeled-input>
                <labeled-input 
                    v-for="(item, index) in IncomeTaxItem"
                    :key="index"
                    :input-label="item.label"
                    labelClass="col-5"
                    inputClass="col-7" >
                    <ui-input-number 
                        :value="item.value"
                        @change="item.value=$event;"
                        :options="{
                            trim         : true,
                            decimalPlace : 0,
                            maxLength    : 15,
                            addDivClass  : 'input-group p-0',
                            readonly: !item.editable
                        }"  
                    />
                </labeled-input>
            </div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
            </button>
            <button class="btn btn-md black" @click="saveData()">
                <i class="icon-lineIcon-check mr-5"></i>저장
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import modal from '@/mixin/modal';
import BaseModal from '@/components/common/BaseModal';
import LabeledInput from '@/components/common/LabeledInput';
import { incomeTaxItemEditable } from '@/utils/incomeTaxItemEditable';
import MastcodeDropdown from '@/components/common/MastcodeDropdown';
export default {
    mixins: [modal],
    components: {
        BaseModal,
        LabeledInput,
        MastcodeDropdown
    },
    computed: {
        codeShow() {
            return this.CODE_DATA.INC_CODE + '  ' + this.CODE_DATA.INC_CODE_NAME;
        }
    },
    data() {
        return {
            errors: {},
            CREATE: true,
            DECLARE_ID: 0,
            CODE_DATA: {
                "INC_CODE": "",
                "INC_CODE_NAME": ""
            },
            IncomeTaxItem: {
                "INC_HEAD_C": { // 인원
                    value: "", label: "인원",
                    editable: true
                },
                "INC_TOT_PAY": { //총지급액
                    value: "", label: "총지급액",
                    editable: true
                },
                "INC_NTAX": { // 징수세액 - 소득세등
                    value: "", label: "징수세액-소득세등",
                    editable: true
                },
                "INC_ATAX": { // 징수세액 - 농어촌특별세
                    value: "", label: "징수세액-농어촌특별세",
                    editable: true
                },
                "INC_PENALTY": { // 징수세액 - 가산세
                    value: "", label: "가산세",
                    editable: true
                },
                "INC_REF_ADJ": { // 당월조정 환급세액
                    value: "", label: "당월조정 환급세액",
                    editable: true
                },
                "INC_PAY_NTAX": { // 납부세액 - 소득세
                    value: "", label: "납부세액-소득세",
                    editable: true
                },
                "INC_PAY_ATAX": { // 납부세액 - 농특세
                    value: "", label: "납부세액-농특세",
                    editable: true
                },
            }
        }
    },
    methods: {
        setEditable(inc_code) {
            for(const [key, value] of Object.entries(incomeTaxItemEditable[inc_code])) {
                    this.IncomeTaxItem[key]['editable'] = value;
            }
        },
        onChangeIncCode($event) {
            this.errors = {};
            this.CODE_DATA.INC_CODE_NAME = $event.label;
            this.setEditable($event.value);
        },
        asyncDynamicComponentData(param) {
            if(param.valueData) {
                this.CREATE = false;
                for(const [key, value] of Object.entries(param.valueData)) {
                    this.IncomeTaxItem[key]['value'] = this.payrollUtil.isEmpty(value) ? 0 : value;
                }

                this.CODE_DATA.INC_CODE = param.codeData['INC_CODE'];
                this.CODE_DATA.INC_CODE_NAME = param.codeData['INC_CODE_NAME'];

                this.setEditable(param.codeData['INC_CODE']);
            }
            else {
                this.CREATE = true;
                this.CODE_DATA.INC_CODE = '';
                this.CODE_DATA.INC_CODE_NAME = '';
                for(const [key, value] of Object.entries(this.IncomeTaxItem)) {
                    this.IncomeTaxItem[key]['value'] = 0;
                    this.IncomeTaxItem[key]['editable'] = true;
                }
            }
            this.DECLARE_ID = param.codeData['DECLARE_ID'];
        },
        isValidCode: function() {
            let hasError = false;
            this.errors = {};
            if(this.payrollUtil.isEmpty(this.CODE_DATA.INC_CODE)) {
                hasError = true;
                this.errors.INC_CODE = '원천징수소득 코드를 입력해 주세요.';
            }
            if(hasError)
                return false;
            return true;
        },
        async saveData() {
            try {
                if( !this.isValidCode() ) {
                    return;
                }
                let me = this;
                let _params = {
                    "DECLARE_ID": this.DECLARE_ID,
                    "INC_CODE": this.CODE_DATA.INC_CODE,
                };

                for(const [key, value] of Object.entries(this.IncomeTaxItem)) {
                    _params[key] = (this.payrollUtil.isEmpty(value['value']) || !value['editable'] ) ? null : value['value'];
                }

                await this.$httpPostBody({
                    url: (this.CREATE ? "/payroll/withhold/income-tax/item/insert" : "/payroll/withhold/income-tax/item/update"),
                    param: _params,
                    callback: function() {
                        me.toastSuccessSave();
                        me.close();
                    }
                });
            }
            catch(e) {
                console.log("ParticularsBuoysModal Save Method Error: ", e);
            }
        },
    },
}
</script>
