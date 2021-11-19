<template>
<div class="tab-pane fade" id="annual_pension" role="tabpanel" aria-labelledby="annual_pension-tab">
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
                <table-form-label label="취득부호" /> 
                <table-form-item>
                    <ui-dropdown :items="registCodeName.items"
                                        :value="registCodeName.value"
                                        @change="registCodeName.value=$event.value;
                                        registCodeName.return=$event;"
                                        :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message'}" /> 
                </table-form-item>
            </tr>
            <tr>
                <table-form-label label="자격취득일" /> 
                <table-form-item>
                    <input type="text" class="form-control" v-model="registDate" />
                </table-form-item>
                <table-form-label label="신고 선택여부" /> 
                <table-form-item>
                    <ui-dropdown :items="selectFl.items"
                                        :value="selectFl.value"
                                        @change="selectFl.value=$event.value;
                                        selectFl.return=$event;"
                                        :options="{valueField  : 'code',labelField  : 'message',tooltipField: 'message'
                    }" /> 
                </table-form-item>
                <table-form-label label="소득월액" /> 
                <table-form-item>
                    <input type="text" class="form-control" v-model="monthlyIncome" />
                </table-form-item>
            </tr>
            <tr>
                <table-form-label label="취득월 납부여부" /> 
                <table-form-item>
                    <ui-dropdown :items="begMonFl.items"
                                        :value="begMonFl.value"
                                        @change="begMonFl.value=$event.value;
                                        begMonFl.return=$event;"
                                        :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message'}" /> 
                </table-form-item>
                <table-form-label label="특수직종" /> 
                <table-form-item>
                    <ui-dropdown :items="specialOccuCode.items"
                                        :value="specialOccuCode.value"
                                        @change="specialOccuCode.value=$event.value;
                                        specialOccuCode.return=$event;"
                                        :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message'}" /> 
                </table-form-item>
                <table-form-label label="직역연금부호" /> 
                <table-form-item>
                    <ui-dropdown :items="othPenFl.items"
                                        :value="othPenFl.value"
                                        @change="othPenFl.value=$event.value;
                                        othPenFl.return=$event;"
                                        :options="{ valueField  : 'code', labelField  : 'message', tooltipField  : 'message'}" />     
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
            registCodeName: {
                value: '01-18세 이상',
                return: null,
                items: [
                    { message: '01-18세 이상', code: '01-18세 이상' }
                ]
            },         //취득부호
            registDate: '',             //자격취득일
            selectFl: {
                value: 'Y',
                return: null,
                items: [
                    { message: '신고', code: 'Y' },
                    { message: '미신고', code: 'N' }
                ]
            },               //신고 선택여부
            monthlyIncome: 0,           //소득월액
            begMonFl: {
                value: '희망',
                return: null,
                items: [
                    { message: '희망', code: '희망' },
                    { message: '미희망', code: '미희망' },
                ]
            },               //취득월납부여부
            specialOccuCode: {
                value: '0 - 일반',
                return: null,
                items: [
                    { message: '0 - 일반', code: '0 - 일반' },
                ]
            },//특수직종
            othPenFl: {
                value: '0 - 없음',
                return: null,
                items: [
                    { message: '0 - 없음', code: '0 - 없음' },
                ]
            }//직역연금부호 
        }
    }
}
</script>