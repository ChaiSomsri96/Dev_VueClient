<template>
<div class="tab-pane fade" id="employment" role="tabpanel" aria-labelledby="employment-tab">
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

                <table-form-label label="자격취득일" /> 
                <table-form-item>
                    <ui-input-date :date="registDate" @change="registDate=$event;" />
                </table-form-item>
            </tr>
            <tr>
                <table-form-label label="직종" /> 
                <table-form-item>
                    <ui-dropdown :items="occuCode.items"
                                            :value="occuCode.value"
                                            @change="occuCode.value=$event.value;
                                            occuCode.return=$event;"
                                            :options="{valueField  : 'code', labelField  : 'message', tooltipField: 'message'}" /> 
                </table-form-item>

                <table-form-label label="주소정근로시간" /> 
                <table-form-item>
                    <ui-input-number :value="weeklyWorkHour"
                                        @change="weeklyWorkHour=$event;"
                                        :options="{
                                                        trim         : true,
                                                        decimalPlace : 0,
                                                        maxLength    : 15,
                                                        addDivClass  : 'input-group p-0'
                                        }"/>      
                </table-form-item>

                <table-form-label label="계약직 여부" /> 
                <table-form-item>
                    <ui-dropdown :items="tempContFl.items"
                                            :value="tempContFl.value"
                                            @change="tempContFl.value=$event.value;
                                            tempContFl.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
                </table-form-item>
            </tr>
            <tr>
                <table-form-label label="계약직종료년월" /> 
                <table-form-item>
                    <ui-input-date :date="tempContExpMon" @change="tempContExpMon=$event;" />
                </table-form-item>

                <table-form-label label="월평균보수" /> 
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

                <table-form-label label="비고" /> 
                <table-form-item>
                    <ui-dropdown :items="note.items"
                                            :value="note.value"
                                            @change="note.value=$event.value;
                                            note.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />        
                </table-form-item>
            </tr>
            <tr>
                <table-form-label label="보험료부과 구분부호" /> 
                <table-form-item>
                    <ui-dropdown :items="assessCode.items"
                                            :value="assessCode.value"
                                            @change="assessCode.value=$event.value;
                                            assessCode.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />        
                </table-form-item>

                <table-form-label label="보험료부과 구분사유" /> 
                <table-form-item>
                    <ui-dropdown :items="assessReason.items"
                                            :value="assessReason.value"
                                            @change="assessReason.value=$event.value;
                                            assessReason.return=$event;"
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
            empNumber: '110605-2', // 
            empName: '홍길동',      // 
            registDate: '20210205', //
            occuCode: { // 직종
                value: '01-선거직,정무', 
                return: null,
                items: [ 
                    { message: '01-선거직,정무', code: '01-선거직,정무' }
                ]
            },
            weeklyWorkHour: 40,
            tempContFl: {
                value: '2 - 부', 
                return: null,
                items: [ 
                    { message: '2 - 부', code: '2 - 부' }
                ]
            },
            tempContExpMon: '20210205',
            monthlyIncome: 0,
            note: {
                value: '대학시간강사', 
                return: null,
                items: [ 
                    { message: '대학시간강사', code: '대학시간강사' }
                ]
            },
            assessCode: {
                value: '54-산재, 실업급',
                return: null,
                items: [
                    { message: '54-산재, 실업급', code: '54-산재, 실업급' },
                ]
            },
            assessReason: {
                value: '03-선원법 및 어',
                return: null,
                items: [
                    { message: '03-선원법 및 어', code: '03-선원법 및 어' },
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