<template>
    <div class="tab-pane fade show active" id="common" role="tabpanel" aria-labelledby="common-tab">
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

                    <table-form-label label="국적" /> 
                    <table-form-item>
                        <ui-dropdown :items="nationalityNm.items"
                                            :value="nationalityNm.value"
                                            @change="nationalityNm.value=$event.value;
                                            nationalityNm.return=$event;"
                                            :options="{valueField  : 'code', labelField  : 'message', tooltipField: 'message' }" /> 
                    </table-form-item>
                </tr>
                <tr>
                    <table-form-label label="체류자격" /> 
                    <table-form-item>
                        <ui-dropdown :items="stayStatus.items"
                                            :value="stayStatus.value"
                                            @change="stayStatus.value=$event.value;
                                            stayStatus.return=$event;"
                                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" /> 
                    </table-form-item>

                    <table-form-label label="대표자 여부" /> 
                    <table-form-item>
                        <ui-dropdown :items="repFlag.items"
                                            :value="repFlag.value"
                                            @change="repFlag.value=$event.value;
                                            repFlag.return=$event;"
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
            nationalityNm: {
                value:  'KOREA',
                return: null,
                items: [
                    { message: '한국', code: 'KOREA' } , 
                    { message: '일본', code: 'JAPAN' } , 
                    { message: '중국', code: 'CHINA' }
                ]
            },
            stayStatus: {
                value: 'h1',
                return: null, 
                items: [
                    { message: 'H1-관광취업', code: 'h1' }
                ]
            },
            repFlag: {
                value: 1,
                return: null, 
                items: [
                    { message: '예', code: 1 },
                    { message: '아니요', code: 2 },
                ]
            }
        }
    }
}
</script>
