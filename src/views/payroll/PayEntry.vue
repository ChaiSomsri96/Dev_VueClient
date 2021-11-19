<template>
<div>
    <ui-header :msg="'급여입력'" />
    <div class="content-body">
        <div>
            <div class="box border-box type2 pl-10">
                <div class="box-body">
                    <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" />
                </div>
            </div>
            <div class="box border-box type2">
                <div class="box-body row">
                    <button class="btn btn-md line-1 ml-10" @click="payrollInput()">급여입력</button>
                    <button class="btn btn-md line-1 ml-10" @click="payrollCalc()">급여계산</button>
                    <button class="btn btn-md line-1 ml-10" @click="payrollCarryOver()">급여복사</button>
                    <button class="btn btn-md line-1 ml-10" @click="payrollDeductionCalc()">원천세계산</button>
                    <button class="btn btn-md line-1 ml-10" @click="calculateHealthEmployment()">건강/고용보험료 정산</button>
                    <button class="btn btn-md line-1 ml-10" @click="payrollQuery()">급여자료 조회</button>
                    <button class="btn btn-md line-1 ml-10">업로드</button>
                </div>
            </div>
            <div>
                <div id="month-seq-list-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
            <pay-entry-input-modal ref="payEntryInputModal" :options="{checkedMembers: checkedMembers}" @close="loadGridData()" />
            <pay-calculation-modal ref="payCalculationModal" :options="{checkedMembers: checkedMembers}" />
            <pay-query-modal ref="payQueryModal" />
            <form ref="form">
              <input type="hidden" name="eidList" id="eidList"  v-model="submiteidlist"/>
            </form>

        </div>
    </div>
</div>
</template>

<script>
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import PayEntryInputModal from '@/components/payroll/pay_entry/modals/PayEntryInputModal';
import PayCalculationModal from '@/components/payroll/pay_entry/modals/PayCalculationModal';
import PayQueryModal from '@/components/payroll/pay_entry/modals/PayQueryModal';

import grid from '@/mixin/payroll-grid';
import {mapGetters} from "vuex";

export default {
    mixins: [grid],
    components: {
        SalaryMonthsAndDates,
        PayEntryInputModal,
        PayCalculationModal,
        PayQueryModal
    },
    computed: {
      ...mapGetters({
        declarationForm: 'withholding/getDeclarationForm'
      })
    },
    data() {
        let me = this;
        return {
            payMonth: '',
            payMonthSeq: 0,
            payDate: '',
            submiteidlist:[],
            checkedMembers: [],
            //visible
            fields: [
                { fieldName: 'EMP_NUMBER',  dataType: 'text' }, 
                { fieldName: 'EMP_NAM',     dataType: 'text' }, 
                { fieldName: 'E_JOIN_DATE', dataType:'text' }, 
                { fieldName: 'RETIRE_DATE', dataType: 'text' }, 
                { fieldName: 'HRDEPT_NAM',  dataType: 'text' }, 
                { fieldName: 'PAY_SUM',     dataType: 'text' }, 
                { fieldName: 'DEDUCT_SUM',  dataType: 'text' }, 
                { fieldName: 'MAX_PAY_STAMP', dataType: 'text' }, 
                { fieldName: 'REG_USER',    dataType: 'text' }, 
                {fieldName: 'ACTION_DEL'}
            ],
            columns: [
                { fieldName: 'EMP_NUMBER', header: '사번', width: 120, styleName: "grid-link-column" }, 
                { fieldName: 'EMP_NAM', header: '성명', width: 120 }, 
                { fieldName: 'E_JOIN_DATE', header: '입사일', width: 140 }, 
                { fieldName: 'RETIRE_DATE', header: '퇴사일', width: 140 }, 
                { fieldName: 'HRDEPT_NAM', header: '부서', width: 140 }, 
                { fieldName: 'PAY_SUM', header: '지급총액', width: 140 }, 
                { fieldName: 'DEDUCT_SUM', header: '공제총액', width: 140 }, 
                { fieldName: 'MAX_PAY_STAMP', header: '최종등록일시', width: 140 }, 
                { fieldName: 'REG_USER', header: '최종 등록자', width: 140 }, 
                me.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
            ],
            rowAttrs: ['EID', 'EMP_NUMBER', 'EMP_NAM']
        }
    },
    methods: {
        async loadGridData() {
            try {
                let { data } = await this.$httpGet('/payroll/salarymanual/emp_entry/month-seq-list', 
                                    {   PAY_MONTH: this.payMonth, 
                                        SEQ: this.payMonthSeq, 
                                        PAY_GAAP: 1,
                                        EMP_NUMBER: '',
                                        EMP_NAM: '',
                                        EMP_CD: '' });
            
                this.setRealgridData(data || []);
            } catch (e) {
                console.error("PayEntry loadGridData err: ", e);
            }
        },
        //define event callback
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function(grid, clickData) {
                if(clickData.column == 'EMP_NUMBER') {
                    let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', clickData.dataRow, clickData.dataRow);
                    //checkedMembers
                    me.checkedMembers=[], me.checkedMembers[0] = {'EMP_CD': _rowData[0]['EID'], 'EMP_NAM': _rowData[0]['EMP_NAM'], 'EMP_NUMBER': _rowData[0]['EMP_NUMBER']};
                    me.$refs.payEntryInputModal.show({payMonth: me.payMonth, payMonthSeq: me.payMonthSeq, checkedMembers: me.checkedMembers});
                }
            }
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'ACTION_DEL') {
                    let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', clickData.dataRow);
                    if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
                        return false;
                    me.confirm({
                        title: '확인',
                        message: '정말 삭제하시겠습니까?',
                        yesCallback: function() {
                            me.$httpPost({
                                param: {
                                    'formData': JSON.stringify({
                                        "PAY_MONTH": me.payMonth,
                                        "SEQ": me.payMonthSeq,
                                        "PAY_GAAP": "1",
                                        "ALL_PAYCODE": "YES",
                                        "EMPTYPE_CD": null,
                                        "PAYTYPE_CD": null,
                                        "JOBGROUP_CD": null,
                                        "MODIFY_TYPE": null,
                                        "EMP_SEL": "SELECT"
                                    }),
                                    'paycdList': '[]',
                                    'paymonthseqList': '[]',
                                    'eidList': JSON.stringify([{"EID": _rowData[0]['EID']}])
                                },
                                url: '/payroll/salarymanual/payroll/mass-delete',
                                callback: function() {
                                    me.toastSuccessDelete();
                                    me.loadGridData();
                                }
                            });
                        }
                    });
                }
            }
        },
        async asyncData() {
            try {
                const {data} = await this.$store.dispatch('paymonth/getPayMonth');
                this.payMonth = data.PAY_MONTH;
                this.payMonthSeq = data.SEQ;
                this.payDate = data.PAY_DATE;
            } catch (e) {
                console.error("PayEntry asyncData err: ", e);
            }
        },  
        //급여 입력
        payrollInput() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length > 1) {
                this.toast({message: this.messages['notMultiSelect'], type:"error"});
                return;    
            } else if(checkedRows.length < 1) {
                this.toast({message: this.messages['mustOneMemberSelect'], type:"error"});
                return;
            }
            let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[0], checkedRows[0]);
            //checkedMembers
            this.checkedMembers=[], this.checkedMembers[0] = {'EMP_CD': _rowData[0]['EID'], 'EMP_NAM': _rowData[0]['EMP_NAM'], 'EMP_NUMBER': _rowData[0]['EMP_NUMBER']};
            this.$refs.payEntryInputModal.show({payMonth: this.payMonth, payMonthSeq: this.payMonthSeq, checkedMembers: this.checkedMembers});
        },
        //급여계산, 급여자료조회 체크상태 확인
        validateCheckedStatus() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
                return false;
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
                __checkedData.push({'EMP_CD': _rowData[0]['EID']});
            }
            this.checkedMembers = Object.freeze(__checkedData);
            return true;
        },
        //급여 계산
        payrollCalc() {
            /* if(!this.validateCheckedStatus()) {
                return false;
            }
            this.$refs.payCalculationModal.show(); */
            let eidList = this.getEidList();
            if(!eidList || eidList.length < 1) {
                this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
                return;
            }
            this.$store.dispatch(
              'payentry/setEidList',
              {
                EID_LIST: eidList
              });
            window.open('/salary/paycalculationpopup', 'POPUP_PAYCALCULATIONPOPUP', 'width=1500, height=800, scrollbars=yes, location=no');
        },
        //급여자료 조회
        payrollQuery() {
            if(!this.validateCheckedStatus()) {
                return false;
            }
            this.$refs.payQueryModal.show({checkedMembers: this.checkedMembers});
        },
        getEidList() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
                return false;
            }
            let _eidList = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
                _eidList.push(_rowData[0]['EID']);
            }
            return _eidList;
        },
        //건강/고용보험료 정산
        calculateHealthEmployment() {
            let eidList = this.getEidList();
            if(!eidList || eidList.length < 1) return;
            
            this.$store.dispatch('health_employment/setSelectedEids', {
                selectedEids: eidList
            });

            this.$router.push({ name: 'HealthEmploymentSetting' });
        },
        //원천세 계산
        payrollDeductionCalc() {
            let eidList = this.getEidList();
            if(!eidList || eidList.length < 1) return;
             this.$store.dispatch(
              'withholding/setDeclarationForm',
              {
                DECLARATION_FORM: eidList
              });

             window.open('/salary/payrolldeductioncalcmodal', 'POPUP_PAYROLLCAL', 'width=1500, height=800, scrollbars=yes, location=no');
            
        },
        payrollCarryOver(){
          let eidList = this.getEidList();
          if(!eidList || eidList.length < 1) return;
          this.$store.dispatch(
              'withholding/setDeclarationForm',
              {
                DECLARATION_FORM: eidList
              });

          window.open('/salary/paycarryovermodal', 'POPUP_PAYROLLCARRY', 'width=1500, height=800, scrollbars=yes, location=no');

        }
    },
    async mounted() {
        try {
            this.createRealGrid({'domId': 'month-seq-list-grid'});
            await this.asyncData();
            await this.loadGridData();
        }
        catch (e) {
            console.error("PayEntry mounted err: ", e);
        }
    }
}
</script>
