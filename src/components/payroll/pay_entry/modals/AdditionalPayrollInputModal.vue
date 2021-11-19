<template>
<base-modal title="추가 급여 입력" id="additional-payroll-input" :scroll="false" width="500">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="이름" labelClass="col-4" inputClass="col-8">
                    <ui-input :value="formData.EMP_NAME"
                                      @change="formData.EMP_NAME=$event;"
                                      :options="{readonly: true}"/>
                </labeled-input>
                <labeled-input input-label="과세급여합계" labelClass="col-4" inputClass="col-8">
                    <ui-input-number 
                        :value="formData.ANNUAL_SALARY"
                        @change="formData.ANNUAL_SALARY=$event;"
                        :options="{
                            trim         : true, decimalPlace : 0,
                            maxLength    : 15, addDivClass  : 'input-group p-0',
                            readonly: true
                        }"
                    />
                </labeled-input>
                <labeled-input input-label="추가급여" labelClass="col-4" inputClass="col-8">
                    <ui-input-number 
                        :value="formData.ADD_SALARY"
                        @change="formData.ADD_SALARY=$event;"
                        :options="{
                            trim         : true, decimalPlace : 0,
                            maxLength    : 15, addDivClass  : 'input-group p-0'
                        }"
                    />
                </labeled-input>
                <labeled-input input-label="급여개월수" labelClass="col-4" inputClass="col-8">
                    <ui-input-number 
                        :value="formData.SALARY_MON_NO"
                        @change="formData.SALARY_MON_NO=$event;"
                        :options="{
                            trim         : true, decimalPlace : 0,
                            maxLength    : 15, addDivClass  : 'input-group p-0'
                        }"
                    />
                </labeled-input>
                <labeled-input input-label="건강보험 납부 개월수" labelClass="col-4" inputClass="col-8">
                    <ui-input-number 
                        :value="formData.MED_INS_MON_NO"
                        @change="formData.MED_INS_MON_NO=$event;"
                        :options="{
                            trim         : true, decimalPlace : 0,
                            maxLength    : 15, addDivClass  : 'input-group p-0'
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
            <button class="btn btn-md black" @click="onSave">
                <i class="icon-lineIcon-del mr-5"></i>저장
            </button>
        </div>
    </template>
</base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import LabeledInput from "@/components/common/LabeledInput";
import modal from '@/mixin/modal';

export default {
    mixins: [modal],
    components: {
        BaseModal,
        LabeledInput        
    },
    data() {
        return {
            formData: {
                EMP_NAME: '',
                ANNUAL_SALARY: '',
                ADD_SALARY: '',
                SALARY_MON_NO: '',
                MED_INS_MON_NO: ''
            },
            dataRow: 0
        }
    },
    methods: {
        asyncDynamicComponentData(param) {
            this.formData = param.formData;
            this.dataRow = param.dataRow;
        },
        onSave() {
            this.close({ formData: this.formData, dataRow: this.dataRow });
        }
    },
}
</script>
