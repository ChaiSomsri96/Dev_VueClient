<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'마스터 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <cfg-mater-code-tab></cfg-mater-code-tab>
          <button-panel
              btnType='top'
              v-bind:add=true
              v-on:add="addEmptyData"
          />
          <div id="cfg-hobong-ver-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          <button-panel
              btnType='bottom'
              v-bind:save=true
              v-on:save="saveCode"
          />
        </div>
    </div>
</template>
<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';

export default {
  components: {
    CfgMaterCodeTab,
    ButtonPanel
  },
  mixins: [grid],
  data() {
    return{
      url: {
        search: '/payroll/hobong/select',
        save: '/payroll/hobong/insert',
        delete: '/payroll/hobong/delete',
        update: '/payroll/hobong/update'
      },
      columns: [
        { header: '호봉테이블 버전', fieldName: 'HOBONG_VER' ,width: 50 },
        { header: '적용시작일', fieldName: 'APPLY_DATE',width: 100  },
        { header: '해당연도', fieldName: 'PAY_YEAR' ,width: 50 },
        { header: '비고', fieldName: 'REMARK',width: 100  },
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 70})
      ],
      fields: [
        { fieldName: 'HOBONG_VER', dataType: 'text' },
        { fieldName: 'APPLY_DATE', dataType: 'text' },
        { fieldName: 'PAY_YEAR', dataType: 'text' },
        { fieldName: 'REMARK', dataType: 'text' },
        { fieldName: 'ACTION_DEL', header: "삭제" }
      ],
    }
  },
  methods:{
    async loadGridData() {
      let me = this;
      try {
        let { data } = await this.$httpGet( me.url.search) || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgHobongVersionGrid loadGridData err: ", e);
      }
    },

    deleteCode: function (code) {
      let me = this;
      if (code) {
        me.confirmDelete(function () {
          me.$httpPost({
            param: code,
            url: me.url.delete,
            callback: function () {
              me.toastSuccessDelete();
              me.loadGridData();
            }
          });
        });
      }
    },

    findSaveRows: function () {
      let me = this;
      let createdRows = me.dataProvider.getStateRows('created');

      let retData = [];
      createdRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      return retData;
    },

    findUpdateRows: function(){
      let me = this;
      let updatedRows = me.dataProvider.getStateRows('updated');
      let retData = [];
      updatedRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      return retData;
    },

    saveCode: async function () {
      let me = this;
      let code = me.findSaveRows();
      if (code.length > 0) {
        for (const v of code) {
          await me.$httpPost({
            param: v,
            sendRequestBody: true,
            url: me.url.save
          });
        }
      }

      let updateCode = me.findUpdateRows();
      if( updateCode.length > 0) {
        for (const v of code) {
          await me.$httpPost({
            param: v,
            sendRequestBody: true,
            url: me.url.update
          });
        }
      }
      me.toastSuccessSave();
      me.loadGridData();
    },

    realgridCreatedCallback: function () {
      let me = this;
      me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        let columns = grid.getColumnNames();
        let _rowData = me.dataProvider.getJsonRow(newIndex.dataRow);
        let data = _rowData['ROW_ATTRS'];
        let editAble = true;
        if (me.dataProvider.getRowState(newIndex.dataRow) == 'created') {
          columns.forEach(function(obj) {
            grid.setColumnProperty(obj,"editable",editAble)
          });
        } else {
          columns.forEach(function(obj) {
            grid.setColumnProperty(obj,"editable",editAble)
          });
        }
      };

      me.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        grid.commit();
        if (clickData.column == "ACTION_DEL") {
            me.deleteCode(_rowData);
        }
      };
    }

  },
  mounted() {
    this.createRealGrid({
      domId: 'cfg-hobong-ver-grid',
      editable: true,
      autoLoad: true,
      editEventAdd: true
    });
    this.loadGridData();
  }
}
</script>