<template>
<div>
    <div :id="id" style="width: 100%; height: 300px" class="realgrid-type-style"></div>
</div>
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
            columns: [
                { fieldName: 'DESCRIPTION', header: '인사항목', width: 100 },
                { fieldName: 'FIELD_NAME', visible: false },
                { fieldName: 'FIELD_DESC', visible: false },
                { fieldName: 'FIELD_SEQ', visible: false },
                {
                    name: "lupOrd",
                    fieldName: "lupOrd",
                    type: "data",
                    visible: false,
                    header: {
                        text: "순서 변경"
                    },
                    editor: {
                        type: "text",
                        textReadOnly: true
                    },
                    renderer: {
                        type: "html",
                        callback: function(grid, cell, w, h) {
                            let count = grid.getDataSource().getRowCount();
                            
                            return `<span class="td-icon">
                                          <button type="button"  name="btnDown" class="btn btn-s flat solid btn-down" ${cell.index.dataRow == (count-1) ? 'disabled' : ''}>
                                              <i name="down" class="icon icon-solidIcon-down${cell.index.dataRow == (count-1) ? '-disabled' : ''}"><span class="blind">down</span></i>
                                          </button>
                                          <button type="button"  name="btnUp" class="btn btn-s flat solid btn-up" ${cell.index.dataRow == 0 ? 'disabled' : ''}>
                                              <i name="up" class="icon icon-solidIcon-up${cell.index.dataRow == 0 ? '-disabled' : ''}"><span class="blind">up</span></i>
                                          </button>
                                      </span>`
                        }
                    }      
                }
            ],
            fields: [
                { fieldName: 'DESCRIPTION', dataType: 'text' },
                { fieldName: 'FIELD_NAME', },
                { fieldName: 'FIELD_DESC'},
                { fieldName: 'FIELD_SEQ' },
                { fieldName: 'lupOrd'}
            ]
        }
    },
    methods: {
        async loadGridData(param) {
            try {
                let {data} = await this.$httpPostBody({
                    url: param.url,
                    param: param.req
                });
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.error("CfgPersonItemGrid err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.setFooters({ visible: false });
            this.gridView.checkBar.visible=true;
            this.gridView.editOptions.insertable = true;
            this.gridView.editOptions.appendable = true;
            this.gridView.editOptions.deletable = true;
            this.gridView.editOptions.movable = true;
            this.gridView.displayOptions.rowMovable = 'move';
            this.gridView.dataDropOptions.dropMode = 'move';

            this.dataProvider.setOptions({
                softDeleting: false
            });
        },
        getData() {
            let returnData = []
            returnData =this.dataProvider.getJsonRows(0, -1)
            return returnData;
        },
        getCheckedRows() {
            let checkedRows = this.gridView.getCheckedRows();
            let _checkedDatas = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
                _checkedDatas.push({
                    "DESCRIPTION": _rowData['DESCRIPTION'],
                    "FIELD_NAME": _rowData['FIELD_NAME'],
                    "FIELD_DESC": _rowData['FIELD_DESC'],
                    "FIELD_SEQ": _rowData['FIELD_SEQ']
                }); 
            }
            for(let i = checkedRows.length - 1; i >= 0; i --) {
                this.dataProvider.removeRow(checkedRows[i]);
            }
            return _checkedDatas;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellItemClicked = function (grid, index, clickData) {
                if(clickData.target.innerText == "down") {
                    if(index.dataRow < me.dataProvider.getRowCount()-1){
                        me.dataProvider.moveRows(index.dataRow,1,index.dataRow+1);
                    }
                    return true;
                }
                if(clickData.target.innerText == "up") {
                    if(index.dataRow>0){
                        me.dataProvider.moveRows(index.dataRow,1,index.dataRow-1);
                    }
                    return true;
                }
            }   
        },
        visibleset() {
            this.gridView.columnByName("lupOrd").visible =  true;
        },
        addRowData(data){
            for(let i = 0; i < data.length; i ++) {
                this.dataProvider.addRow(data[i]);
            }
        }
    },
}
</script>
