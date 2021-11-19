<template>
  <section class="payroll-code-grid" id="grid">
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
      columns: [
        { fieldName: 'CODE_NAM', header: '출력항목', width: 100 ,styleName: "left-column",},
        { fieldName: 'SELECTED_ITEM', visible: false},
        { fieldName: 'CONTROL_NO', visible: false},
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
        },
      ],

      fields: [
        { fieldName: 'CODE_NAM', dataType: 'text' },
        { fieldName: 'SELECTED_ITEM', },
        { fieldName: 'CONTROL_NO'},
        { fieldName: 'lupOrd'}
      ],
      rowAttrs:['CODE_NAM','SELECTED_ITEM','CONTROL_NO']
    }
  },
  methods: {
    async loadGridData(val) {
      try {
        let {data} = await this.$httpGet(val.url,{"CONTROL_NO":val.CONTROL_NO});
        this.dataProvider.setRows(data || []);
      } catch(e) {
        console.error("CfgBankGrid loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.setFooters({ visible: false });
      this.gridView.checkBar.visible=true;
      this.gridView.editOptions.insertable = true;
      this.gridView.editOptions.appendable = true;
      this.gridView.editOptions.movable = true;
      this.gridView.displayOptions.rowMovable = 'move';
      this.gridView.dataDropOptions.dropMode = 'move';
    },
    getData() {
      let returnData = []
          returnData =this.dataProvider.getJsonRows(0, -1)
      return returnData;
    },
    getCheckedRows(){

      let checkedRows = this.gridView.getCheckedRows();
      let _checkedPaycodes = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData1 = this.dataProvider.getFieldValues('CODE_NAM', checkedRows[i], checkedRows[i]);
        let _rowData2 = this.dataProvider.getFieldValues('SELECTED_ITEM', checkedRows[i], checkedRows[i]);
        let _rowData3 = this.dataProvider.getFieldValues('CONTROL_NO', checkedRows[i], checkedRows[i]);
        _checkedPaycodes.push({"CODE_NAM":_rowData1[0],"SELECTED_ITEM":_rowData2[0],"CONTROL_NO":_rowData3[0]});

      }

      for(let i = checkedRows.length -1 ; i >= 0; i --) {
        console.log(checkedRows[i])
        this.dataProvider.removeRow(checkedRows[i]);
      }
      return _checkedPaycodes;

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

  }
}
</script>

