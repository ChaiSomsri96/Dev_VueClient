<template>
  <section class="register-emp-grid">
    <div :id="id" style="width: 100%; height: 300px" class="realgrid-type-style"></div>
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
        { fieldName: "EMP_NAME",  dataType: 'text' },
        { fieldName: "E_JOIN_DATE",   dataType: 'text' },
        { fieldName: "RETIRE_DATE", dataType: 'text' },
        { fieldName: "EID", dataType: 'text' },
        { fieldName: 'lupOrd'}
      ],
      columns: [
        { header: "성명", fieldName: "EMP_NAME", width: 70, editable: false },
        { header: "입사일", fieldName: "E_JOIN_DATE", width: 130, editable: false},
        { header: "퇴직일", fieldName: "RETIRE_DATE", width: 130, editable: false},
        { header: "", fieldName: "EID", width: 130, visible: false},
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
      ]
    }
  },
  methods: {
    async loadGridData(param) {
      try {
        let {data} = await this.$httpPost({
          url: '/payroll/retirement/sev-pension/emp-list',
          param: { ENROLL: param.ENROLL, SEV_DATE: param.sevDate, SEV_PENSION_SEQ: param.sevPensionSeq, SEV_CONTROL_NO: param.sevControlNo}
        });
        this.setRealgridData(data|| []);
      } catch(e) {
        console.error("PayEntryInputGrid loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.setFooters({ visible: false });
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
      let returnData = [];
      returnData =this.dataProvider.getJsonRows(0, -1)
      return returnData;
    },
    getCheckedRows() {
      let checkedRows = this.gridView.getCheckedRows();
      let _checkedDatas = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
        _checkedDatas.push({
          "EMP_NAME": _rowData['EMP_NAME'],
          "E_JOIN_DATE": _rowData['E_JOIN_DATE'],
          "RETIRE_DATE": _rowData['RETIRE_DATE'],
          "EID": _rowData['EID']
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
    addRowData(data)  {
      for(let i = 0; i < data.length; i ++) {
        this.dataProvider.addRow(data[i]);
      }
    }
  }
}
</script>