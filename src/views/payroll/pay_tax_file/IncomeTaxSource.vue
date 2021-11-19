<template>   
<div>
    <ui-header :msg="'세무서식 조회'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="근로소득원천징수부" :to="{name: 'EarnedIncomeSource'}"/>
            <base-tabs-item label="소득세원천징수확인서" :to="{name: 'IncomeTaxSource'}"/>
        </base-tabs>
        <div>
            <border-box width="200" v-slot="slotProps" search>
                <border-box-item title="재직구분" :width="slotProps.width">
                    <ui-dropdown :items="searchForm.workType.items"
                                :value="searchForm.workType.value"
                                @change="searchForm.workType.value=$event.value; searchForm.workType.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
                </border-box-item>
                <border-box-item title="퇴직일" :width="slotProps.width" multi>
                    <ui-input-date :date="searchForm.retireFrom"
                                            :max-date="searchForm.retireTo"
                                           @change="searchForm.retireFrom=$event;" />
                    <span>~</span>
                    <ui-input-date :date="searchForm.retireTo"
                                            :min-date="searchForm.retireFrom"
                                            @change="searchForm.retireTo=$event;" />
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1" @click="onSearch()">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <div class="row">
                <grid-title>
                    <button class="btn btn-md flat" @click="incomeTaxSourceQuery">
                        <i class="icon-lineIcon-check mr-5"></i><span>소득세원천징수확인서 조회</span>
                    </button>
                </grid-title>
            </div>
            <div>
                <div id="income-tax-source-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
            <income-tax-source-modal ref="incomeTaxSourceModal" />
        </div>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';

import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import GridTitle from '@/components/common/GridTitle';

import IncomeTaxSourceModal from '@/components/payroll/pay_tax_file/modals/IncomeTaxSourceModal';

import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        UiRadioButtonInline,
        BorderBox,
        BorderBoxItem,
        UiMonthPicker,
        GridTitle,
        IncomeTaxSourceModal
    },
    data() {
        return {
            searchForm: { // 검색
                workType: {
                    value: 'work_retire',
                    return: null,
                    items: [
                        { message: '전체', code: 'work_retire' },
                        { message: '재직', code: 'work' },
                        { message: '퇴직', code: 'retire' },
                    ]
                },
                retireFrom: this.getLastYearCurrentMonth(),
                retireTo: this.getThisYearNextMonth(),
            },
            payMonthFrom: '202101',
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
                    { value: 'Y', label: '표시', id: 'profile-visible' },
                    { value: 'N', label: '숨김', id: 'profile-hide' }
                ]
            },
            language: {
                value: 'KOREAN',
                return: null,
                items: [{
                    message: '한국어',
                    code: 'KOREAN'
                },{
                    message: '영어',
                    code: 'ENGLISH'
                },{
                    message: '일어',
                    code: 'JAPANESE'
                }]
            },    

            //grid
            fields: [
                { fieldName: 'EMP_NUMBER', dataType: 'text' },
                { fieldName: 'EMP_NAM', dataType: 'text' },
                { fieldName: 'E_JOIN_DATE', dataType: 'text' },
                { fieldName: 'RETIRE_DATE', dataType: 'text' },
                { fieldName: 'HRDEPT_NAM', dataType: 'text' },
                { fieldName: 'PAYTYPE_NAM', dataType: 'text' },
            ],
            columns: [
                { fieldName: 'EMP_NUMBER', header: '사번' },
                { fieldName: 'EMP_NAM', header: '성명' },
                { fieldName: 'E_JOIN_DATE', header: '입사일' },
                { fieldName: 'RETIRE_DATE', header: '퇴사일' },
                { fieldName: 'HRDEPT_NAM', header: '부서' },
                { fieldName: 'PAYTYPE_NAM', header: '구분' },
            ],
            rowAttrs: ['EID']
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/salarymanual/emp_qry/list') || [];   
                if(this.searchForm.workType.value == 'retire') {
                    data = data.filter(item => item.RETIRE_DATE != "") || [];
                }
                else if(this.searchForm.workType.value == 'work') {
                    data = data.filter(item => item.RETIRE_DATE == "") || [];
                }
                if(this.searchForm.workType.value == 'retire' || this.searchForm.workType.value == 'work_retire') {
                    data = data.filter(item => ( (item.RETIRE_DATE == "") || (!this.payrollUtil.isEmpty(item.RETIRE_DATE) && this.getDateDiff(this.getDateFormat(item.RETIRE_DATE), this.getDateFormat(this.searchForm.retireFrom))
                    && this.getDateDiff(this.getDateFormat(this.searchForm.retireTo), this.getDateFormat(item.RETIRE_DATE))) ) ) || [];
                }
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("IncomeTaxSource loadGridData err: ", e);
            }
        },
        //define event callback
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
        },
        onSearch() {
            this.loadGridData();
        },
        //소득세 원천징수 확인서 조회
        incomeTaxSourceQuery () {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toastAlertSelect()
                return;
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
                __checkedData.push({'EID': _rowData[0]['EID']});
            }
            this.$refs.incomeTaxSourceModal.show(__checkedData);
        },



        async filePrint() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toastAlertSelect()
                return;
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
                __checkedData.push({'EID': _rowData[0]['EID']});
            }
            try {
                let personInfo = (await this.$httpGet('/year-end/report/income/list-confperson'))['data'];
                if(!Array.isArray(personInfo) || personInfo.length == 0)
                    return;
                let { data } = await this.$httpPost({
                    url: '/year-end/report/income/file-print',
                    param: {
                        'PAY_MONTH_FROM': this.payMonthFrom,
                        'PAY_MONTH_TO': this.payMonthTo,
                        'PURPOSE': this.useGoal,
                        'SUBMIT_TO': this.submission,
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
                        'RPT_LANG': this.language.value,
                        'PERSONAL_INFO_MASK': this.profileVisible.value,
                        'ISSUE_PROXY': 'Y',
                        'REPORT_TYPE': 'pdf',
                        'EID_LIST': JSON.stringify(__checkedData),
                        'EID': __checkedData[0]['EID'],
                        'EXTENSION': 'pdf'
                    },
                    blob: true
                });
                this.openPdf(data, "소득세원천징수확인서 조회");
            }
            catch(e) {
                console.log("error", e);
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'income-tax-source-grid'});
        this.loadGridData();      
    },
}
</script>
