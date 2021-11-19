<template>
<div>
    <div class="form-group row mb-0">
        <label class="form-label type2 col-3">
                <span>계산에 사용될 Base 급여</span>
        </label>
    </div>
    <div class="form-group row mb-13">
        <div class="col-6">
            <div class="row mb-10">
                <button class="btn btn-md flat" @click="addEmptyData"><i class="icon-lineIcon-plus mr-5"></i>
                    추가
                </button>
            </div>
            <div class="row">
                <div id="base-pay-grid" style="width: 100%; height: 250px;" class="realgrid-type-style">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],
    data() {
        return {
            //grid
            fields: [],
            columns: [],
            emptyRealGridData: {
                PAY_CODE: '', BASE_PAY: '', CALC_RATIO: 0, ACTION_DEL: ''
            }
        }
    },
    methods: {
        async loadGridData(targetPaycd = '') {
            if(targetPaycd == '')
                return;
            try {
                let {data} = await this.$httpGet('/payroll/code/cfg-paycalcformula/list', {
                    TARGET_PAYCD: targetPaycd
                }) || [];
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("BasePayGrid loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.dataProvider.setOptions({
                softDeleting: false
            });
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'ACTION_DEL') {
                    // 삭제처리
                    me.dataProvider.removeRow(clickData.dataRow);
                }
            }
        },
        getGridData() {
            const rowCount = this.dataProvider.getRowCount();
            let payCodeList = [];
            for(let i = 0; i < rowCount; i ++)       {
                let _rowData = this.dataProvider.getJsonRow(i);
                payCodeList.push({
                    PAY_CODE: _rowData['PAY_CODE'] == undefined ? '' : _rowData['PAY_CODE'],
                    BASE_PAY: _rowData['BASE_PAY'] == undefined ? '' : _rowData['BASE_PAY'],
                    CALC_RATIO: _rowData['CALC_RATIO'] == undefined ? '' : _rowData['CALC_RATIO']
                });
            }
            return payCodeList;
        },
    },
    async mounted() {
        let { data } = await this.$httpPost({
            param: {},
            url: '/payroll/code/pay-pay/list_active'
        });

        let _values = [], _labels = [];

        if(Array.isArray(data) && data.length > 0) {
            for(let i = 0; i < data.length; i ++) {
                _values.push(data[i]['PAY_CODE']);
                _labels.push(data[i]['PAY_NAM']);
            }
        }

        this.fields = [
                { fieldName: 'PAY_CODE', dataType: 'text' },
                { fieldName: 'BASE_PAY', dataType: 'text' },
                { fieldName: 'CALC_RATIO', dataType: 'number' },
                { fieldName: 'ACTION_DEL', dataType: 'text' },
        ];

        this.columns = [
                {   fieldName: 'PAY_CODE', header: 'Base 급여',
                    "sortable": false, "lookupDisplay": true,
                    "values": _values,
                    "labels": _labels, 
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 4
                    } 
                },
                { fieldName: 'BASE_PAY', header: 'Base급여 계산 기준',
                  "sortable": false, "lookupDisplay": true,
                  "values": ["MASTER","PAY"],
                  "labels": ["급여마스터","실지급액"],
                  "editor": {
                        "type": "dropdown",
                        "dropDownCount": 2
                  }  
                },
                { fieldName: 'CALC_RATIO', header: '계산 율(%)',
                numberFormat: "#,##0.00", styleName: "right-column" },
                this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 50}),
        ];

        this.createRealGrid({'domId': 'base-pay-grid', editable: true});
    }
}
</script>