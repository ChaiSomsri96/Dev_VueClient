<template>
<div class="tab-pane fade" id="health" role="tabpanel" aria-labelledby="health-tab">
<table-form :colgroup="['13%', 'auto', '13%', 'auto', '13%', 'auto']">
    <template v-slot:body>
        <tr>
            <table-form-label label="사번" /> 
            <table-form-item>
                <input type="text" class="form-control" autocomplete="off" v-model="empNumber" readonly="">
            </table-form-item>
            <table-form-label label="성명" /> 
            <table-form-item>
                <input type="text" class="form-control" autocomplete="off" v-model="empName" readonly="">
            </table-form-item>
            <table-form-label label="사업장 기호" /> 
            <table-form-item>
                <ui-input :value="wplaceCode" @change="wplaceCode=$event.value;"  />
            </table-form-item>
        </tr>
        <tr>
            <table-form-label label="사업장 명칭" /> 
            <table-form-item>
                <ui-input :value="wplaceName" @change="wplaceName=$event.value;"  />
            </table-form-item>
            <table-form-label label="자격취득일" /> 
            <table-form-item>
                <ui-input-date :date="registDate"
                                                    @change="registDate=$event;"
                                    />
            </table-form-item>
            <table-form-label label="취득부호" /> 
            <table-form-item>
                <ui-dropdown :items="registCodeName.items"
                                            :value="registCodeName.value"
                                            @change="registCodeName.value=$event.value;
                                            registCodeName.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
        </tr>
        <tr>
            <table-form-label label="보수월액" /> 
            <table-form-item>
                <ui-input-number :value="monthlyIncome"
                    @change="monthlyIncome=$event;"
                    :options="{
                                    trim         : true,
                                    decimalPlace : 0,
                                    maxLength    : 15,
                                    addDivClass  : 'input-group p-0'
                    }"/>      
            </table-form-item>
            <table-form-label label="감면" /> 
            <table-form-item>
                <ui-dropdown :items="reduction.items"
                                            :value="reduction.value"
                                            @change="reduction.value=$event.value;
                                            reduction.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
            <table-form-label label="건강보험증 사업장발송여부" /> 
            <table-form-item>
                <ui-dropdown :items="cardDeliveryFl.items"
                                            :value="cardDeliveryFl.value"
                                            @change="cardDeliveryFl.value=$event.value;
                                            cardDeliveryFl.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
        </tr>
        <tr>
            <table-form-label label="회계" /> 
            <table-form-item>
                <ui-dropdown :items="accountingCode.items"
                                            :value="accountingCode.value"
                                            @change="accountingCode.value=$event.value;
                                            accountingCode.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
            <table-form-label label="직종" /> 
            <table-form-item>
                <ui-dropdown :items="occuCode.items"
                                            :value="occuCode.value"
                                            @change="occuCode.value=$event.value;
                                            occuCode.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
            <table-form-label label="신고 선택여부" /> 
            <table-form-item>
                <ui-dropdown :items="selectFl.items"
                                            :value="selectFl.value"
                                            @change="selectFl.value=$event.value;
                                            selectFl.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
            </table-form-item>
        </tr>
    </template>
    <template v-slot:footer>
        <button class="btn btn-md black">
            <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
    </template>
</table-form>
</div>
</template>
<script>
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
export default {
    components: {
        TableForm,
        TableFormItem,
        TableFormLabel
    },
    data() {
        return {
            empNumber: '110605-2',
            empName: '홍길동',
            wplaceCode: '000',
            wplaceName: '매직소프트',
            registDate: '20210205',             //자격취득일
            registCodeName: {
                value: '01-18세 이상',
                return: null,
                items: [
                    { message: '01-18세 이상', code: '01-18세 이상' }
                ]
            },         //취득부호
            monthlyIncome: 0, //보수월액
            reduction: { //감면
                value: '11-국외근무',
                return: null,
                items: [
                    { message: '11-국외근무', code: '11-국외근무' }
                ]
            },
            cardDeliveryFl: { // 건강보험증 사업장 발송여부
                value: 'Y',
                return: null,
                items: [
                    { message: '예', code: 'Y' },
                    { message: '아니요', code: 'N' }
                ]
            },
            accountingCode: { //  회계
                value: '00-사립학교경',
                return: null,
                items: [
                    { message: '00-사립학교경', code: '00-사립학교경' }
                ]
            },
            occuCode: { // 직종
                value: '01-선거직,정무',
                return: null,
                items: [
                    { message: '01-선거직,정무', code: '01-선거직,정무' }
                ]
            },
            selectFl: {
                value: 'Y',
                return: null,
                items: [
                    { message: '신고', code: 'Y' },
                    { message: '미신고', code: 'N' }
                ]
            }
        }
    }
}
</script>