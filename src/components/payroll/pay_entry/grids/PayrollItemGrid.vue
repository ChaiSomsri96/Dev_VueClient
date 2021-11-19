<template>
<section class="payroll-item-grid">
    <div :id="id" style="width: 100%; height: 400px"  class="realgrid-type-style"></div>
</section>
</template>

<script>
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            fields: [
                { fieldName: "PAY_CODE",  dataType: 'text' }, 
                { fieldName: "PAY_NAME",  dataType: 'text' }, 
                { fieldName: "PAY_ENAME", dataType: 'text' }, 
                { fieldName: "INACTIVE",  dataType: 'text' }, 
                { fieldName: "PAYTAX_FLAG",   dataType: 'text' },
            ],
            columns: [
                { header: "코드", fieldName: "PAY_CODE", editable: false }, 
                { header: "코드명(한글)", fieldName: "PAY_NAME", width: 150, editable: false }, 
                { header: "코드명(영어)", fieldName: "PAY_ENAME", width: 150, editable: false }, 
                { header: "중지", fieldName: "INACTIVE", editable: false }, 
                { header: "급여/공제", fieldName: "PAYTAX_FLAG", editable: false },
            ]
        }
    },
    methods: {
        async loadGridData(calcMethod) {
            try {
                let {data} = await this.$httpGet('/payroll/code/pay-pay/list_activive_with_virtual');
                this.dataProvider.setRows(data.filter(item => item.AUTO_CALC == calcMethod) || []);
            } catch(e) {
                console.error("PayrollItemGrid loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.setFooters({ visible: false });   
            this.gridView.checkBar.visible=true;
        },
        getCheckedPaycodes() {
            let checkedRows = this.gridView.getCheckedRows();
            let _checkedPaycodes = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('PAY_CODE', checkedRows[i], checkedRows[i]);    
                _checkedPaycodes.push({"PAY_CODE": _rowData[0]});
            }
            return _checkedPaycodes;
        }
    }
}
</script>

