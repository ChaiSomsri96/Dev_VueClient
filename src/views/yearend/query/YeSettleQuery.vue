<template>
    <div>
        <ui-header :msg="'정산내역 조회'"/>
        <div class="content-body">
            <ye-employee-list ref="yeEmployeeList">
                <border-box width="410" v-slot="slotProps">
                    <border-box-item title="보고서종류" :width="slotProps.width">
                        <ui-dropdown :items="reportType.items"
                                    :value="reportType.value"
                                    @change="reportType.value=$event.value; reportType.return=$event;"
                                    :options="{
                                                    valueField  : 'code',
                                                    labelField  : 'message',
                                                    tooltipField: 'message'
                                                }" />    
                    </border-box-item>
                    <border-box-item button>
                        <button type="button" class="btn btn-md line-1" @click="queryReport()">
                            <span>보고서 조회</span>
                        </button>
                    </border-box-item>
                </border-box>
            </ye-employee-list>
            <ye-settle-report-modal ref="yeSettleReportModal" />
        </div>
    </div>
</template>

<script>
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import YeEmployeeList from '@/components/yearend/common/YeEmployeeList';
import YeSettleReportModal from '@/components/yearend/query/YeSettleReportModal';
export default {    
    components: {
        BorderBox,
        BorderBoxItem,
        YeEmployeeList,
        YeSettleReportModal
    },
    data() {
        return {
            reportType: {
                value: 'REC2',
                return: {
                    label: '원천징수영수증-정산명세',
                    tooltip: '원천징수영수증-정산명세',
                    value: 'REC2'
                },
                items: [
                    {message: '차감징수세액 및 보험료(근로소득원천징수영수증)', code: 'SRPT'},
                    {message: '차감징수세액(급여대장)', code: 'RESULT2'},
                    {message: '원천징수영수증-소득명세', code: 'REC1P'},
                    {message: '원천징수영수증-소득명세(가로형)', code: 'REC1L'},
                    {message: '원천징수영수증-정산명세', code: 'REC2'},
                    {message: '소득공제신고서-기본사항', code: 'FILE1'},
                    {message: '소득공제신고서-인적사항', code: 'FILE2'},
                    {message: '소득공제신고서-소득공제', code: 'FILE3'},
                    {message: '소득공제신고서-전직장정보', code: 'WORK_INFO'},
                    {message: '소득공제신고서-전직장소득', code: 'WORK_ANNSAL'},
                    {message: '소득공제신고서-보험료', code: 'INS'},
                    {message: '소득공제신고서-교육비', code: 'EDU'},
                    {message: '소득공제신고서-신용카드', code: 'CARD'},
                    {message: '소득공제신고서-기타', code: 'OTH'},
                    {message: '별지명세-연금저축', code: 'SAVING'},
                    {message: '별지명세-의료비', code: 'MED'},
                    {message: '별지명세-월세액', code: 'RENT'},
                    {message: '별지명세-임대차계약내용', code: 'CONTRACT'},
                    {message: '기부금명세서-해당연도 기부명세', code: 'DONA1'},
                    {message: '기부금명세서-구분코드별 합계', code: 'DONA2'},
                    {message: '기부금명세서-기부금조정명세', code: 'DONA3'},
                    {message: '부녀자공제', code: 'WOMAN'},
                    {message: '감면소득', code: 'EXEMPT'},
                    {message: '주택자금공제신청현황', code: 'HOUSE'}
                ] 
            }
        }
    },
    methods: {
        queryReport() {
            let checkedRows = this.$refs.yeEmployeeList.gridView.getCheckedRows();
            if(checkedRows.length < 1) { 
                this.toastAlertSelect();
                return;   
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.$refs.yeEmployeeList.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
                __checkedData.push({'EID': _rowData[0]['EID']});
            }
            this.$refs.yeSettleReportModal.show({
                reportType: this.reportType.value,
                eidList: __checkedData,
                yeYear: this.$refs.yeEmployeeList.searchedYear,
                title: this.reportType.return.label
            });
        }
    },
    mounted() {
    },
}
</script>