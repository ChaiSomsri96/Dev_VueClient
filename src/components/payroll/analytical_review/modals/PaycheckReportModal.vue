<template>
<base-modal :title="title" id="paycheck-report-modal" :scroll="false" :width="width">
    <template v-slot:body>
        <div class="row" style="height: 400px;">
            <div id="paycheck-report-modal-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>창닫기
            </button>
            <button class="btn btn-md black" @click="downloadRealGridExcel(title);">
                <i class="icon-lineIcon-del mr-5"></i>다운로드
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
let widthList = ['1000', '1000', '1000', '1300', '1000', '1380']
let fieldsList = [
    [           
        { fieldName: 'PAY_MONTH', dataType: 'text' },
        { fieldName: 'SEQ', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'NET_AMOUNT', dataType: 'number' },
        { fieldName: 'BANK_AC', dataType: 'text' } 
    ],
    [
        { fieldName: 'PAY_MONTH', dataType: 'text' },
        { fieldName: 'SEQ', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'NET_AMOUNT', dataType: 'number' },
        { fieldName: 'ENTITY_CODE', dataType: 'text' } 
    ],
    [
        { fieldName: 'PAY_MONTH', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'NET_AMOUNT', dataType: 'number' },
        { fieldName: 'SEQ_COUNT', dataType: 'text' },
    ],
    [
        { fieldName: 'PAY_MONTH', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'CURR_TAXABLE_AMOUNT', dataType: 'number' },
        { fieldName: 'CURR_TAX_AMOUNT', dataType: 'number' },
        { fieldName: 'CURR_TAX_RATIO', dataType: 'number' },
        { fieldName: 'PREV_TAXABLE_AMOUNT', dataType: 'number' },
        { fieldName: 'PREV_TAX_AMOUNT', dataType: 'number' },
        { fieldName: 'PREV_TAX_RATIO', dataType: 'number' }
    ],
    [
        { fieldName: 'PAY_MONTH', dataType: 'text' },
        { fieldName: 'SEQ', dataType: 'text' },
        { fieldName: 'EMP_NUMBER', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'TAXABLE_AMOUNT', dataType: 'number' },
        { fieldName: 'TOTAL_FAMILY', dataType: 'text' },
    ],
    [
        { fieldName: 'PAY_MONTH',  dataType: 'text' },
        { fieldName: 'SEQ',  dataType: 'text' },
        { fieldName: 'EMP_NUMBER',  dataType: 'text' },
        { fieldName: 'EMP_NAME',  dataType: 'text' },
        { fieldName: 'TAXABLE_AMOUNT',  dataType: 'number' },
        { fieldName: 'NONTAXABLE_AMT',  dataType: 'number' },
        { fieldName: 'MDINS_AMOUNT',  dataType: 'number' },
        { fieldName: 'EINS_AMOUNT',  dataType: 'number' },
        { fieldName: 'STD_ASSESSMENT',  dataType: 'number' },
        { fieldName: 'TAX_AMOUNT',  dataType: 'number' },
        { fieldName: 'TAX_RATIO',  dataType: 'number' },
    ]
];
let columnsList = [
    [
        { header: '급여월', fieldName: "PAY_MONTH", width: 100 },
        { header: '차수', fieldName: "SEQ", width: 50 }, 
        { header: '사번', fieldName: "EMP_NUMBER" , width: 100}, 
        { header: '성명', fieldName: "EMP_NAME", width: 100 }, 
        { header: '순급여', fieldName: "NET_AMOUNT", 
            numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } }, 
        { header: '급여게좌', fieldName: "BANK_AC", width: 100 }
    ],
    [
        { header: '급여월', fieldName: "PAY_MONTH", width: 100 },
        { header: '차수', fieldName: "SEQ", width: 50 }, 
        { header: '사번', fieldName: "EMP_NUMBER" , width: 100}, 
        { header: '성명', fieldName: "EMP_NAME", width: 100 }, 
        { header: '순급여', fieldName: "NET_AMOUNT", numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } }, 
        { header: '급여게좌', fieldName: "ENTITY_CODE", width: 100 }
    ],
    [
        { header: '급여월', fieldName: "PAY_MONTH", width: 100 },
        { header: '사번', fieldName: "EMP_NUMBER" , width: 100}, 
        { header: '성명', fieldName: "EMP_NAME", width: 100 }, 
        { header: '순급여', fieldName: "NET_AMOUNT", numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } }, 
        { header: '지급횟수', fieldName: "SEQ_COUNT", width: 100 }
    ],
    [
        { header: '급여월', fieldName: "PAY_MONTH", width: 100 },
        { header: '사번', fieldName: "EMP_NUMBER", width: 100 },
        { header: '성명', fieldName: "EMP_NAME", width: 100 },
        { header: '당월 과세급여', fieldName: "CURR_TAXABLE_AMOUNT", numberFormat: "#,##0", styleName: "right-column",
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            }, width: 100 },
        { header: '당월소득세', fieldName: "CURR_TAX_AMOUNT", numberFormat: "#,##0", styleName: "right-column",
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            }, width: 100 },
        { header: '당월소득세율', fieldName: "CURR_TAX_RATIO", numberFormat: "0.00", styleName: "right-column",
            footer: {
                text: "0.00",
                expression: "sum",
                numberFormat: "0.00",
            }, width: 100 },
        { header: '비교월 과세급여', fieldName: "PREV_TAXABLE_AMOUNT", numberFormat: "#,##0", styleName: "right-column",
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            }, width: 100 },
        { header: '비교월 소득세', fieldName: "PREV_TAX_AMOUNT", numberFormat: "#,##0", styleName: "right-column",
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            }, width: 100 },
        { header: '비교월 소득세율', fieldName: "PREV_TAX_RATIO", numberFormat: "0.00", styleName: "right-column",
            footer: {
                text: "0.00",
                expression: "sum",
                numberFormat: "0.00",
            }, width: 100 }
    ],
    [
        { header: '급여월', fieldName: 'PAY_MONTH', width: 100},
        { header: '차수', fieldName: 'SEQ', width: 50},
        { header: '사번', fieldName: 'EMP_NUMBER', width: 100},
        { header: '성명', fieldName: 'EMP_NAME', width: 100},
        { header: '과세급여', fieldName: 'TAXABLE_AMOUNT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '간이세액표상 총가족수', fieldName: 'TOTAL_FAMILY', width: 100},
    ],
    [
        { header: '급여월', fieldName: 'PAY_MONTH', width: 100 },
        { header: '차수', fieldName: 'SEQ', width: 50 },
        { header: '사번', fieldName: 'EMP_NUMBER', width: 100 },
        { header: '성명', fieldName: 'EMP_NAME', width: 100 },
        { header: '과세급여', fieldName: 'TAXABLE_AMOUNT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '비과세급여', fieldName: 'NONTAXABLE_AMT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '회사부담 건강보험료', fieldName: 'MDINS_AMOUNT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '회사부담 고용보험료', fieldName: 'EINS_AMOUNT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '소득세 과세표준', fieldName: 'STD_ASSESSMENT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '소득세', fieldName: 'TAX_AMOUNT', numberFormat: "#,##0", styleName: "right-column", width: 100,
            footer: {
                text: "0",
                expression: "sum",
                numberFormat: "#,##0",
            } },
        { header: '소득세율(%)', fieldName: 'TAX_RATIO', numberFormat: "0.00", styleName: "right-column", width: 100,
            footer: {
                text: "0.00",
                expression: "sum",
                numberFormat: "0.00",
            } },
    ]
]

export default {
    mixins: [modal, grid],
    components: {
        BaseModal
    },
    data() {
        return {
            fields: [],
            columns: [],
            title: '',
            width: '1000'
        }
    },
    methods: {
        async loadGridData(rptType, searchedParam) {
            try {
                let {
                    data
                } = await this.$httpPost({
                    url: '/payroll/salaryqry/validation/type' + rptType + '-list',
                    param: {
                        'payMonth1': searchedParam.payMonth1,
                        'seq1': searchedParam.seq1,
                        'payMonth2': searchedParam.payMonth2,
                        'seq2': searchedParam.seq2,
                        'stdPayCount': searchedParam.stdPayCount,
                        'stdNetAmount': searchedParam.stdNetAmount,
                        'stdGapRatio': searchedParam.stdGapRatio
                    }
                });
                this.setRealgridData(data || []);
            } catch(e) {
                console.log("PaycheckReportModal loadGridData error", e);
            }
        },
        //modal
        createDynamicComponent() {
            this.createGridFrame({
                'domId': 'paycheck-report-modal-grid',
                'gridParent': 'modal'
            });
        },
        asyncDynamicComponentData(param) {
            this.fields = fieldsList[param.rptType - 1];
            this.columns = columnsList[param.rptType - 1];
            this.title = param.title;
            this.width = widthList[param.rptType - 1];
            this.setFieldsNColumns();
            this.loadGridData(param.rptType, param.searchedParam);
        }
    }
}
</script>