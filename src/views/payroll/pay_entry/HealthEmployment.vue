<template>
<div>
    <div class="content-header">
      <div class="header-bottom">
        <div class="header-bottom-left">
          <div class="menu-box">
            <div class="menu-item title">
              <div class="menu-item-icon">
                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                  <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                </button>
              </div>
                <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                   {{ menuText }}
                </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-body">
        <div class="form-area pb-0">
            <div class="form-wrap">
                <!--progress tracker-->
                <div class="progress-scrollbar">
                    <div class="progress-btn-box">
                        <button class="btn btn-sm black" @click="prev()" v-if="curPage > 1">이전</button>
                        <button class="btn btn-sm black ml-5" @click="next()" v-if="curPage < 3">다음</button>
                    </div>
                    <div class="progress-nav-scroll">
                        <ul class="progress-nav row v2">
                            <li class="step-item" :class="{'active': curPage == 1}">
                                <span class="step-num"><i class="icon-lineIcon-check"></i>1</span>
                                <span class="step-title">소득집계</span>
                            </li>
                            <li class="step-item" :class="{'active': curPage == 2}">
                                <span class="step-num"><i class="icon-lineIcon-check"></i>2</span>
                                <span class="step-title">건강/고용 정산</span>
                            </li>
                            <li class="step-item" :class="{'active': curPage == 3}">
                                <span class="step-num"><i class="icon-lineIcon-check"></i>3</span>
                                <span class="step-title">급여대장 기록 내용</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--//progress tracker-->
                <div class="tbl-top row mt-20">
                    <div class="pull-left">
                        <button class="btn btn-md flat">
                            <i class="icon-lineIcon-download mr-5"></i><span>다운로드</span>
                        </button>
                    </div>                    
                </div>

                <div class="row">
                    <div id="health-employment-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
                </div>

                <div class="tbl-bottom" v-if="curPage == 1 || curPage == 2">
                    <button type="button" class="btn btn-lg black mr-5 disabled">
                      <i class="icon-lineIcon-check mr-5"></i>저장
                    </button>
                </div>
                <div class="tbl-bottom" v-if="curPage == 3">
                    <button type="button" class="btn btn-lg black" @click="saveHealthInsuranceFee()"><i class="icon-lineIcon-check mr-5"></i>건강보험료 저장</button>
                    <button type="button" class="btn btn-lg black ml-10" @click="saveEmploymentInsuranceFee()"><i class="icon-lineIcon-check mr-5"></i>고용 보험료 저장</button>
                    <button type="button" class="btn btn-lg black ml-10" @click="saveHealthEmpInsuranceFee()"><i class="icon-lineIcon-check mr-5"></i>건강/고용 보험료 저장</button>
                    <button type="button" class="btn btn-lg ml-10" @click="removeAll()"><i class="icon-lineIcon-check mr-5"></i>모두 삭제</button>
                </div>

                <additional-payroll-input-modal ref="additionalPayrollInput" @close="changeDataGrid($event)" />

            </div>            
        </div>
    </div>
</div>
</template>

<script>
import AdditionalPayrollInputModal from '@/components/payroll/pay_entry/modals/AdditionalPayrollInputModal';
import grid from '@/mixin/payroll-grid';
import { mapGetters } from 'vuex';

const gridData = [
    {
        columns: [
                { fieldName: 'EMP_NUMBER', header: '사번' },
                { fieldName: 'EMP_NAME', header: '성명' },
                { fieldName: 'E_JOIN_DATE', header: '입사일' },
                { fieldName: 'RETIRE_DATE', header: '퇴사일' },
                { fieldName: 'SETTLE_DAY', header: '정산일' },
                { fieldName: 'ANNUAL_SALARY', header: { text: '과세급여 합계\n조정전' , styleName: 'multi-line-css-header' },
                  numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
                },
                { fieldName: 'ADD_SALARY', header: '추가급여',
                  numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' 
                },
                { fieldName: 'TOT_ANNUAL_SAL', header: '과세급여 합계',
                  numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
                },
                { fieldName: 'TOT_NONTAX_SAL', header: '비과세 합계',
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' 
                },
                { fieldName: 'TOT_TAXABLE_NONTAX_SAL', header: '급여 총계',
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' 
                },
                { fieldName: 'ANNUAL_SALARY_EI_BEFORE', header: { text: '과세급여 계\n(고용보험 기간1)', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0', width: 120
                },
                { fieldName: 'ANNUAL_SALARY_EI_AFTER', header: { text: '과세급여 계\n(고용보험 기간2)', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0', width: 120
                },
                { fieldName: 'MED_INS_PAID', header: { text: '기납부\n건강보험료', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
                { fieldName: 'GERI_INS_PAID', header: { text: '기납부\n노인보험료', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
                { fieldName: 'EMP_INS_PAID', header: { text: '기납부\n고용보험료', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
                { fieldName: 'SALARY_MON_NO', header: { text: '급여\n개월수', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", nanText: '0'
                },
                { fieldName: 'MED_INS_MON_NO', header: { text: '건강보험료\n개월수', styleName: 'multi-line-css-header' },
                    numberFormat: "#,##0", styleName: "right-column", nanText: '0'
                },
        ],
        fields: [
                { fieldName: 'EMP_NUMBER', dataType: 'text' },
                { fieldName: 'EMP_NAME', dataType: 'text' },
                { fieldName: 'E_JOIN_DATE', dataType: 'text' },
                { fieldName: 'RETIRE_DATE', dataType: 'text' },
                { fieldName: 'SETTLE_DAY', dataType: 'text' },
                { fieldName: 'ANNUAL_SALARY', dataType: 'number' },
                { fieldName: 'ADD_SALARY', dataType: 'number' },
                { fieldName: 'TOT_ANNUAL_SAL', dataType: 'number' },
                { fieldName: 'TOT_NONTAX_SAL', dataType: 'number' },
                { fieldName: 'TOT_TAXABLE_NONTAX_SAL', dataType: 'number' },
                { fieldName: 'ANNUAL_SALARY_EI_BEFORE', dataType: 'number' },
                { fieldName: 'ANNUAL_SALARY_EI_AFTER', dataType: 'number' },
                { fieldName: 'MED_INS_PAID', dataType: 'number' },
                { fieldName: 'GERI_INS_PAID', dataType: 'number' },
                { fieldName: 'EMP_INS_PAID', dataType: 'number' },
                { fieldName: 'SALARY_MON_NO', dataType: 'number' },
                { fieldName: 'MED_INS_MON_NO', dataType: 'number' },
        ],
        rowAttrs: ['EID', 'ANNUAL_SALARY_MD_BEFORE', 'DATE_FROM', 'ANNUAL_SALARY_MD_AFTER', 'ENTITY_CODE', 'DATE_TO']
    }, 
    {
        columns: [
            { fieldName: 'EMP_NAME', header: '성명' },
            { fieldName: 'E_JOIN_DATE', header: '입사일' },
            { fieldName: 'RETIRE_DATE', header: '퇴사일' },
            { fieldName: 'SETTLE_DAY', header: '정산일' },
            { fieldName: 'TOT_ANNUAL_SAL', header: '과세급여 총계',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'TOT_TAXABLE_NONTAX_SAL', header: '급여 총계',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'SALARY_MON_NO', header: { text: '급여\n개월수', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", nanText: '0' },            
            { fieldName: 'MONTHLY_BASE', header: '보수월액',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'MDINS_EXEM_RATIO', header: { text: '건강보험\n경감율', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", nanText: '0' },
            { fieldName: 'MONTHLY_MED_INS', header: '월 건강보험료',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'LTINS_EXEM_RATIO', header: { text: '장기요양\n경감율', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", nanText: '0' },
            { fieldName: 'MONHLY_GERI_INS', header: '월 노인장기보험료',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'MED_INS_MON_NO', header: { text: '보험료납부\n개월수', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", nanText: '0' },
            { fieldName: 'ANNUAL_MED_INS', header: { text: '건강보험료\n산출액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'ANNUAL_GERI_INS', header: { text: '요양보험료\n산출액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'MED_INS_PAID', header: { text: '건강보험료\n기납부액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'GERI_INS_PAID', header: { text: '요양보험료\n기납부액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'SETTLE_MED_INS', header: { text: '건강보험료\n정산액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'SETTLE_GERI_INS', header: { text: '요양보험료\n정산액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'ANNUAL_EMP_INS', header: { text: '고용보험료\n산출액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'EMP_INS_PAID', header: { text: '고용보험료\n기납부', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
            { fieldName: 'SETTLE_EMP_INS', header: { text: '고용보험료\n정산액', styleName: 'multi-line-css-header' },
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
        ],
        fields: [
            { fieldName: 'EMP_NAME', dataType: 'text' },
            { fieldName: 'E_JOIN_DATE', dataType: 'text' },
            { fieldName: 'RETIRE_DATE', dataType: 'text' },
            { fieldName: 'SETTLE_DAY', dataType: 'text' },
            { fieldName: 'TOT_ANNUAL_SAL', dataType: 'number' },
            { fieldName: 'TOT_TAXABLE_NONTAX_SAL', dataType: 'number' },
            { fieldName: 'SALARY_MON_NO', dataType: 'number' },
            { fieldName: 'MONTHLY_BASE', dataType: 'number' },
            { fieldName: 'MDINS_EXEM_RATIO', dataType: 'number' },
            { fieldName: 'MONTHLY_MED_INS', dataType: 'number' },
            { fieldName: 'LTINS_EXEM_RATIO', dataType: 'number' },
            { fieldName: 'MONHLY_GERI_INS', dataType: 'number' },
            { fieldName: 'MED_INS_MON_NO', dataType: 'number' },
            { fieldName: 'ANNUAL_MED_INS', dataType: 'number' },
            { fieldName: 'ANNUAL_GERI_INS', dataType: 'number' },
            { fieldName: 'MED_INS_PAID', dataType: 'number' },
            { fieldName: 'GERI_INS_PAID', dataType: 'number' },
            { fieldName: 'SETTLE_MED_INS', dataType: 'number' },
            { fieldName: 'SETTLE_GERI_INS', dataType: 'number' },
            { fieldName: 'ANNUAL_EMP_INS', dataType: 'number' },
            { fieldName: 'EMP_INS_PAID', dataType: 'number' },
            { fieldName: 'SETTLE_EMP_INS', dataType: 'number' },
        ],
        rowAttrs: []
    }, 
    {
        columns: [
            { fieldName: 'EMP_NAME', header: '성명' },
            { fieldName: 'PAY_MONTH', header: '급여월' },
            { fieldName: 'SEQ', header: '차수', width: 60 },
            { fieldName: 'PAY_DATE', header: '급여일' },
            { fieldName: 'PAY_CODE', header: '급여코드' },
            { fieldName: 'AMOUNT', header: '금액',
            numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0' },
        ],
        fields: [
            { fieldName: 'EMP_NAME', dataType: 'text' },
            { fieldName: 'PAY_MONTH', dataType: 'text' },
            { fieldName: 'SEQ', dataType: 'text' },
            { fieldName: 'PAY_DATE', dataType: 'text' },
            { fieldName: 'PAY_CODE', dataType: 'text' },
            { fieldName: 'AMOUNT', dataType: 'number' },
        ],
        rowAttrs: []
    }
];

let step3RowData = {
    data: [
        { EMP_NAME: '강가딘',  PAY_MONTH: '202107', SEQ: '1', PAY_DATE: '20210723', PAY_CODE: 'A32', AMOUNT: 228000},
        { EMP_NAME: '홍길동',  PAY_MONTH: '202107', SEQ: '2', PAY_DATE: '20210723', PAY_CODE: 'B20', AMOUNT: 321600},
        { EMP_NAME: '강사모',  PAY_MONTH: '202107', SEQ: '1', PAY_DATE: '20210723', PAY_CODE: 'B98', AMOUNT: 425000},
    ]
}

let step2RowData = {
    data: [
        {   EMP_NAME: '강가딘', E_JOIN_DATE: '20210222', RETIRE_DATE: '20210723', SETTLE_DAY: '20210801', TOT_ANNUAL_SAL: 234000,
            TOT_TAXABLE_NONTAX_SAL: 329000, SALARY_MON_NO: 5, MONTHLY_BASE: 354000, MDINS_EXEM_RATIO: 32, MONTHLY_MED_INS: 364000,
            LTINS_EXEM_RATIO: 22.33, MONHLY_GERI_INS: 232000, MED_INS_MON_NO: 3, ANNUAL_MED_INS: 2198000, ANNUAL_GERI_INS: 221000,
            MED_INS_PAID: 321009, GERI_INS_PAID: 126000, SETTLE_MED_INS: 4543000, SETTLE_GERI_INS: 9124300,
            ANNUAL_EMP_INS: 5431000, EMP_INS_PAID: 1029900, SETTLE_EMP_INS: 3221800
        },
        {   EMP_NAME: '호사모', E_JOIN_DATE: '20210222', RETIRE_DATE: '20210723', SETTLE_DAY: '20210801', TOT_ANNUAL_SAL: 234000,
            TOT_TAXABLE_NONTAX_SAL: 329000, SALARY_MON_NO: 5, MONTHLY_BASE: 354000, MDINS_EXEM_RATIO: 32, MONTHLY_MED_INS: 364000,
            LTINS_EXEM_RATIO: 22.33, MONHLY_GERI_INS: 232000, MED_INS_MON_NO: 3, ANNUAL_MED_INS: 2198000, ANNUAL_GERI_INS: 221000,
            MED_INS_PAID: 321009, GERI_INS_PAID: 126000, SETTLE_MED_INS: 4543000, SETTLE_GERI_INS: 9124300,
            ANNUAL_EMP_INS: 5431000, EMP_INS_PAID: 1029900, SETTLE_EMP_INS: 3221800
        },
    ]
}

export default {
    mixins: [grid],
    components: {
        AdditionalPayrollInputModal
    },
    computed: {
        ...mapGetters({
            payMonth: 'paymonth/getPayMonth' ,
            payMonthSeq: 'paymonth/getPayMonthSeq',
            payDate: 'paymonth/getPayDate',

            payMonthFrom: 'health_employment/getPayMonthFrom',
            payMonthTo: 'health_employment/getPayMonthTo',
            settleDay: 'health_employment/getSettleDay',
            yearType: 'health_employment/getYearType',
            selectedEids: 'health_employment/getSelectedEids' 
        }),
        menuText() {
            return this.payMonth + '월 ' + this.payMonthSeq + '차 건강/고용 보험료 정산 – ' + (this.curPage == 1 ? '1.소득 집계' : (this.curPage == 2 ? '2.건강/고용 정산' : '3.급여대장 기록 내용'));
        }
    },
    data() {
        return {
            curPage: 1,
            //grid
            columns: [],
            fields: [],
            rowAttrs: [] 
        }
    },
    methods: {
        //
        changeGridProperty()    {
            let gridReqParam = {};
            if(this.curPage == 1) {
                gridReqParam = {
                    PAY_MONTH_FROM: this.payMonthFrom,
                    PAY_MONTH_TO: this.payMonthTo,
                    SETTLE_DAY: this.settleDay,
                    PAY_DATE: this.payDate,
                    PAY_MONTH: this.payMonth,
                    SEQ: this.payMonthSeq,
                    YEAR_TYPE: this.yearType,
                    selectedEids: this.selectedEids
                };
            }
            else if(this.curPage == 2) {
                const rowCount = this.dataProvider.getRowCount();
                let sumData = [];
                for(let i = 0; i < rowCount; i ++) {   
                    let _rowData = this.dataProvider.getJsonRow(i);
                    _rowData = {
                        ..._rowData,
                        ..._rowData['ROW_ATTRS']
                    };
                    delete _rowData['ROW_ATTRS'];
                    delete _rowData['ADDITIONAL_INPUT'];
                    sumData.push(_rowData);
                }
                gridReqParam = {
                    SUM_DATA: JSON.stringify(sumData),
                    FORM_DATA: JSON.stringify({
                        "PAY_MONTH_FROM": this.payMonthFrom,
                        "PAY_MONTH_TO": this.payMonthTo,
                        "SETTLE_DAY": this.settleDay,
                        "PAY_DATE": this.payDate,
                        "PAY_MONTH": this.payMonth,
                        "SEQ": this.payMonthSeq,
                        "YEAR_TYPE": this.yearType,
                        "EMP_SEL":"SELECT",
                        "selectedEids": this.selectedEids
                    })
                };
            }     

            if(this.curPage == 3)
                this.gridView.header.height = 36;
            else
                this.gridView.header.height = 72;
            
            this.fields = [], this.columns = [], this.rowAttrs = [];

            for(let i = 0; i < gridData[this.curPage - 1]['columns'].length; i ++)
                this.columns.push(gridData[this.curPage - 1]['columns'][i]);
            for(let i = 0; i < gridData[this.curPage - 1]['fields'].length; i ++)
                this.fields.push(gridData[this.curPage - 1]['fields'][i]);
            for(let i = 0; i < gridData[this.curPage - 1]['rowAttrs'].length; i ++)
                this.rowAttrs.push(gridData[this.curPage - 1]['rowAttrs'][i]);
            
            if(this.curPage == 1) {
                this.columns.push(this.getUpdateColumn({ headerText: '추가입력', fieldName: 'ADDITIONAL_INPUT', columnWidth: 80 }))
                this.fields.push( { fieldName: 'ADDITIONAL_INPUT', dataType: 'text' } );
            }
            this.setFieldsNColumns();
            this.loadGridData(gridReqParam);   
        },
        gotoList() {
            this.$router.push({ name: 'HealthEmploymentSetting' });
        },
        prev() {
            this.curPage = this.curPage - 1;
            this.changeGridProperty();
        },
        next() {
            this.curPage = this.curPage + 1;
            this.changeGridProperty();
        },
        //
        async loadGridData(gridReqParam) {
            try {
                /* 
                let { data } = this.curPage == 1 ? (await this.$httpPost({
                    url: '/payroll/deduct-recalc/sum/list',
                    param: gridReqParam
                }) ) : (this.curPage == 2 ? step2RowData : step3RowData); */
                let { data } = this.curPage == 1 ? (await this.$httpPost({
                    url: '/payroll/deduct-recalc/sum/list',
                    param: gridReqParam
                }) ) : (this.curPage == 2 ? (
                    await this.$httpPost({
                        url: '/payroll/deduct-recalc/sum/save',
                        param: gridReqParam
                    })
                ) : step3RowData);
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.log("HealthEmployment loadGridData error: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.header.height = 72;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function(grid, clickData) {
                if(clickData.column == 'ADDITIONAL_INPUT') { // 추가 입력
                    let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
                    me.$refs.additionalPayrollInput.show({
                        formData: {
                            'EMP_NAME': _rowData['EMP_NAME'],
                            'ANNUAL_SALARY': _rowData['ANNUAL_SALARY'],
                            'ADD_SALARY': _rowData['ADD_SALARY'],
                            'SALARY_MON_NO': _rowData['SALARY_MON_NO'],
                            'MED_INS_MON_NO': _rowData['MED_INS_MON_NO']
                        },
                        dataRow: clickData.dataRow
                    });
                }
            }
        },
        changeDataGrid($event)   {
            if(!$event)
                return;
            this.dataProvider.setValue($event.dataRow, this.dataProvider.getFieldIndex("ADD_SALARY"), $event['formData']['ADD_SALARY']);
            this.dataProvider.setValue($event.dataRow, this.dataProvider.getFieldIndex("SALARY_MON_NO"), $event['formData']['SALARY_MON_NO']);
            this.dataProvider.setValue($event.dataRow, this.dataProvider.getFieldIndex("MED_INS_MON_NO"), $event['formData']['MED_INS_MON_NO']);
        },

        saveHealthInsuranceFee() { //건강보험료 저장 
            this.requestProcess('/payroll/deduct-recalc/list23/save-health', 'save');
        },
        saveEmploymentInsuranceFee() { //고용 보험료 저장
            this.requestProcess('/payroll/deduct-recalc/list23/save-emp', 'save');
        },
        saveHealthEmpInsuranceFee() { //건강/고용 보험료 저장
            this.requestProcess('/payroll/deduct-recalc/list23/save', 'save');
        },
        removeAll() { //모두 삭제
            this.requestProcess('/payroll/deduct-recalc/all123/delete', 'delete');
        },

        requestProcess(apiUrl, method) {
            let me = this;
            this.$httpPost({
                url: apiUrl,
                param: {
                    "PAY_MONTH_FROM": this.payMonthFrom,
                    "PAY_MONTH_TO": this.payMonthTo,
                    "SETTLE_DAY": this.settleDay,
                    "PAY_DATE": this.payDate,
                    "PAY_MONTH": this.payMonth,
                    "SEQ": this.payMonthSeq,
                    "YEAR_TYPE": this.yearType,
                    "EMP_SEL": 'SELECT',
                    "selectedEids": this.selectedEids
                },
                callback: function() {
                    if(method == 'save')
                        me.toastSuccessSave();
                    else if(method == 'delete')
                        me.toastSuccessDelete();
                }
            });
        }
    },
    mounted() {
        this.createGridFrame({'domId': 'health-employment-grid'});  
        this.changeGridProperty();
    }   
}
</script>