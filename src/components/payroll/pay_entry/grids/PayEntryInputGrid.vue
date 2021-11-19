<template>
<section class="pay-entry-input-grid">
    <div :id="id" style="width: 100%; height: 300px" class="realgrid-type-style"></div>
</section>
</template>

<script>
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    props: {
        payrollInputType: {
            type: String,
            default: 'PAY'
        },
        id: {
            type: String
        }
    },
    data() {
        return {
            fields: [
                { fieldName: "PAY_CODE",  dataType: 'text' }, 
                { fieldName: "PAY_NAM",   dataType: 'text' }, 
                { fieldName: "PAY_AMOUNT", dataType: 'number' }, 
                { fieldName: "M_OVERRID", dataType: 'text' }
            ],
            columns: [
                { header: "급여 코드", fieldName: "PAY_CODE", width: 70, editable: false }, 
                { header: "급여코드명", fieldName: "PAY_NAM", width: 130, editable: false,
                    footer: {
                        text: this.payrollInputType == "PAY" ? "지급총액 =>" : "공제총액 =>"
                    }
                },
                { header: "금액", fieldName: "PAY_AMOUNT", numberFormat: "#,##0", width: 100,
                "editor": {
                        "type": "number"
                    },
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "right-column"
                },
                { header: "입력방법", fieldName: "M_OVERRID", width: 70, editable: false }
            ],
            rowAttrs: ['EID', 'PAY_FXT', 'VIRTUAL_FLAG', 'EMP_NAM', 'PAY_FXR', 'PAY_CODE', 'PAYTAX_FLAG',
                'PAY_GAAP', 'PAY_MONTH', 'SALARY_HEAD_MEMO', 'PAY_NAM', 'PAY_FAMT', 'PAY_NOTE', 
                'ENTITY_CODE', 'EMP_NUMBER', 'FCTYPE', 'SEQ']
        }
    },
    methods: {
        async loadGridData(param = {payMonth: '202105', payMonthSeq: 1, empNumber: '110123', empCd: 3291, empNam: '기사모'}) {
            this.gridView.cancel();
            try {
                let {data} = await this.$httpGet('/payroll/salarymanual/pay-entryemp/list', {
                    PAY_MONTH: param.payMonth,
                    SEQ: param.payMonthSeq,
                    PAY_GAAP: 1,
                    EMP_NUMBER: param.empNumber,
                    EMP_CD: param.empCd,
                    EMP_NAM: param.empNam
                }) || [];
                this.setRealgridData(data.filter(item => item.PAYTAX_FLAG == this.payrollInputType) || []);
            } catch(e) {
                console.error("PayEntryInputGrid loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.setRowIndicator({ visible: false });
            this.gridView.setOptions({ summaryMode: "aggregate" });
        },
        realgridCreatedCallback() {
            let me = this;
            this.dataProvider.onRowUpdated = function (provider, row) {
                let _rowData = me.dataProvider.getFieldValues('PAY_AMOUNT', row, row);
                let payAmount = isNaN(parseInt(_rowData[0])) ? 0 : parseInt(_rowData[0]);
                _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', row, row)[0];
                _rowData = me.$mergeProp(_rowData, {'PAY_AMOUNT': payAmount});
                me.$emit('change', _rowData);
            };  
        },
        searchPayrollItemByKeyword(_keyword) {
            let fields = this.dataProvider.getOrgFieldNames();
            let startFieldIndex = fields.indexOf(this.gridView.getCurrent().fieldName) + 1;
            let options = {
                fields : fields,
                value : _keyword,
                startIndex : this.gridView.getCurrent().itemIndex,
                startFieldIndex : startFieldIndex,
                wrap : true,
                caseSensitive : false,
                partialMatch : true
            };
            let index = this.gridView.searchCell(options);
            this.gridView.setCurrent(index);
        }
    }
}
</script>