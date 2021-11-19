<template>
<div>
    <div class="form-group row mb-0">
        <label class="form-label type2 col-3">
                <span>인용 테이블</span>
        </label>
    </div>
    <div class="form-group row">
        <div class="col-6">
            <div class="row mb-10">
                <button class="btn btn-md flat" @click="addEmptyData"><i class="icon-lineIcon-plus mr-5"></i>
                    추가
                </button>
            </div>
            <div class="row">
                <div id="refer-table-grid" style="width: 100%; height: 250px" class="realgrid-type-style">
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
        let me = this;
        return {
            //grid
            fields: [
                { fieldName: 'REFER_TABLE', dataType: 'text' },
                { fieldName: 'HR_CODE', dataType: 'text' },
                { fieldName: 'PROPERTIES2', dataType: 'number' },
                { fieldName: 'ACTION_DEL', dataType: 'text' },
            ],
            columns: [
                {   fieldName: 'REFER_TABLE', header: '인용테이블', 
                    "sortable": false, "lookupDisplay": true,
                    "values": ["EMPTYPE", "RANK", "ROLE"],
                    "labels": ["고용형태", "직급", "직책"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 3
                    }
                },
                {   fieldName: 'HR_CODE', header: '인사항목',
                    "sortable": false, "lookupDisplay": true,
                    "values": ["1000", "1001"],
                    "labels": ["본부장", "팀장"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    }
                },
                { fieldName: 'PROPERTIES2', header: '계산값',
                numberFormat: "#,##0", styleName: "right-column", 
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0' },
                me.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 50}),
            ],
            emptyRealGridData: {
                REFER_TABLE: '', HR_CODE: '', PROPERTIES2: 0, ACTION_DEL: ''
            }
        }
    },
    methods: {
        async loadGridData(targetPaycd = '') {
            if(targetPaycd == '')
                return;

            try {
                let {data} = await this.$httpGet('/payroll/code/cfg-paycalfilter/list', {
                    TARGET_PAYCD: targetPaycd
                }) || [];
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("ReferTableGrid loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.dataProvider.setOptions({
                softDeleting: false
            });
        },
        getGridData() {
            const rowCount = this.dataProvider.getRowCount();
            let filterConditionList = [];
            for(let i = 0; i < rowCount; i ++) {
                let _rowData = this.dataProvider.getJsonRow(i);
                filterConditionList.push({
                    REFER_TABLE: _rowData['REFER_TABLE'] == undefined ? '' : _rowData['REFER_TABLE'],
                    HR_CODE: _rowData['HR_CODE'] == undefined ? '' : _rowData['HR_CODE'],
                    PROPERTIES2: _rowData['PROPERTIES2'] == undefined ? '' : _rowData['PROPERTIES2']
                }); 
            }
            return filterConditionList;
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'refer-table-grid', editable: true});
    },
}
</script>
