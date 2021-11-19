<template>    
<base-modal title="연봉제 개인별 급여마스터 생성" id="annual-salary-pay-master-gen-modal"
:scroll="false" width="500">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="기본급 급여코드" labelClass="col-5" inputClass="col-7">
                    <ui-dropdown 
                        :items="formData.PAY_CODE1.items" 
                        :value="formData.PAY_CODE1.value" 
                        @change="formData.PAY_CODE1.value=$event.value; formData.PAY_CODE1.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                        }" />
                </labeled-input>
                <labeled-input input-label="식대 급여코드" labelClass="col-5" inputClass="col-7">
                    <ui-dropdown 
                        :items="formData.PAY_CODE2.items" 
                        :value="formData.PAY_CODE2.value" 
                        @change="formData.PAY_CODE2.value=$event.value; formData.PAY_CODE2.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                        }" />
                </labeled-input>
                <labeled-input input-label="차량유지비 급여코드" labelClass="col-5" inputClass="col-7">
                    <ui-dropdown 
                        :items="formData.PAY_CODE3.items" 
                        :value="formData.PAY_CODE3.value" 
                        @change="formData.PAY_CODE3.value=$event.value; formData.PAY_CODE3.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                        }" />
                </labeled-input>
                <labeled-input input-label="기타수당 급여코드" labelClass="col-5" inputClass="col-7">
                    <ui-dropdown 
                        :items="formData.PAY_CODE4.items" 
                        :value="formData.PAY_CODE4.value" 
                        @change="formData.PAY_CODE4.value=$event.value; formData.PAY_CODE4.return=$event" 
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
                <i class="icon-lineIcon-close mr-5"></i>취소
            </button>
            <button class="btn btn-md black" @click="onSave()">
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

export default {
    mixins: [modal],
    components: {
        BaseModal,
        LabeledInput
    },
    data() {
        return {
            formData: {
                PAY_CODE1: {
                    value: '1001A',
                    return: null,
                    items: [
                        { code: '1001A', message: '기본급 급여코드1' },
                        { code: '1002A', message: '기본급 급여코드2' },
                        { code: '1003A', message: '기본급 급여코드3' }
                    ]  
                },
                PAY_CODE2: {
                    value: '1001B',
                    return: null,
                    items: [
                        { code: '1001B', message: '식대 급여코드1' },
                        { code: '1002B', message: '식대 급여코드2' },
                        { code: '1003B', message: '식대 급여코드3' },
                    ]  
                },
                PAY_CODE3: {
                    value: '1001C',
                    return: null,
                    items: [
                        { code: '1001C', message: '차량유지비  급여코드1' },
                        { code: '1002C', message: '차량유지비  급여코드2' },
                        { code: '1003C', message: '차량유지비  급여코드3' },
                    ]  
                },
                PAY_CODE4: {
                    value: '1001D',
                    return: null,
                    items: [
                        { code: '1001D', message: '기타수당  급여코드1' },
                        { code: '1002D', message: '기타수당  급여코드2' },
                        { code: '1003D', message: '기타수당  급여코드3' },
                    ]
                }
            }
        }
    },
    methods: {
        onSave() {
            this.close({"PAY_CODE1": this.formData.PAY_CODE1.value, 
                        "PAY_CODE2": this.formData.PAY_CODE2.value, 
                        "PAY_CODE3": this.formData.PAY_CODE3.value,
                        "PAY_CODE4": this.formData.PAY_CODE4.value})
        }
    },
}
</script>

