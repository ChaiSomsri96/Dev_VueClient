<template>
<section class="payroll-code-grid">
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
                { fieldName: "INACTIVE",  dataType: 'text' }, 
                { fieldName: "PAYTAX_FLAG",   dataType: 'text' },
                { fieldName: 'AUTO_CALC', dataType: 'text' },
            ],
            columns: [
                { header: "코드", fieldName: "PAY_CODE", editable: false , styleName: 'left-column'},
                { header: "코드명(한글)", fieldName: "PAY_NAME", width: 150, editable: false , styleName: 'left-column'},
                { header: "중지", fieldName: "INACTIVE", editable: false },
                { header: '구분', fieldName: 'PAYTAX_FLAG',
                  displayCallback: function(grid, index, value) {
                    return value == 'PAY' ? "지급" : '공제';
                  },width: 75, styleName: 'left-column'
                },
                { header: '계산방법', fieldName: 'AUTO_CALC',
                  displayCallback: function(grid, index, value) {
                    return value == 'A' ? "급여마스터" : value == 'F' ? '계산공식' : value == 'O' ? 'OT계산' : value == 'M' ? '수동작업' : '해당사항 없음';
                  },width: 110, styleName: 'left-column'
                },
            ]
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/code/pay-pay/list');

                 this.dataProvider.setRows(data || []);
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

