<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'표준코드 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <system-code-tab></system-code-tab>
          <button-panel
              btnType='top'
              v-bind:add=true
              v-bind:download=true
              v-on:add="addEmptyData"
              v-on:download="download"
          />
          <div>
            <div id="realgrid-country"  class="realgrid-type-style" style="height:500px;"></div>
          </div>
          <button-panel
              class="col-12"
              btnType='bottom'
              v-bind:remove=true
              v-bind:insert=true
              v-bind:update=true
              v-on:insert="insertCode"
              v-on:update="updateCode"
              v-on:remove="deleteCode"
          />
        </div>
    </div>
</template>

<script>
import {getCountryCode} from '@/api/system';
import SystemCodeTab from './SystemCodeTab';
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    SystemCodeTab
  },
  data() {
    return {
      selCode: {},
      emptyRealGridData: {
        CODE_2DIGIT: '', CODE_3DIGIT: '', COUNTRY_NAM: '', OPENFLAG: 'Y', COUNTRY_ENAME: '', SHOW_FLAG: 'Y', DISPLAY_ORDER: 1
      },
      columns: [
        { fieldName: 'CODE_2DIGIT', header: '2자리 국가코드', autoFilter: true, width: 110 },
        { fieldName: 'CODE_3DIGIT', header: '3자리 국가코드', autoFilter: true, width: 110 },
        { fieldName: 'COUNTRY_NAME', header: '국가명(국문)', autoFilter: true, width: 190 },
        { fieldName: 'COUNTRY_ENAME', header: '국가명(영문)', autoFilter: true, width: 190 },

        { fieldName: 'SHOW_FLAG', header: '보이기', width: 90,
          editor: {
            type: "dropdown", dropDownCount: 2, domainOnly: true, textReadOnly: true,
            values: ["Y", "N"], labels: ['Y', 'N']
          },
        }
      ],
      fields: [
        { fieldName: 'CODE_2DIGIT', dataType: 'text' },
        { fieldName: 'CODE_3DIGIT', dataType: 'text' },
        { fieldName: 'COUNTRY_NAME', dataType: 'text' },
        { fieldName: 'COUNTRY_ENAME', dataType: 'text' },
        { fieldName: 'DISPLAY_ORDER', dataType: 'text' },
        { fieldName: 'SHOW_FLAG', dataType: 'text' }
      ]
    }
  },
  methods: {
    insertCode:function(){
      let me = this;
      let code;
      me.selCode = me.gridView.getCheckedItems(false);
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: '데이터를 선택해 주세요.', type:"error"});
        return;
      }
      if(checkedRows.length > 1) {
        this.toast({message: '데이터를 하나만 선택해 주세요.', type:"error"});
        return;
      }
      code = me.dataProvider.getJsonRow(checkedRows[0]);
      me.$httpPost({
        param: code,
        url: '/system/setting/country/insert',
        callback: function () {
          me.toastSuccessInsert();
          me.reloadRealGrid();
        }
      });
    },

    updateCode:function(){
      let me = this;
      let code;
      me.selCode = me.gridView.getCheckedItems(false);
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: '데이터를 선택해 주세요.', type:"error"});
        return;
      }
      if(checkedRows.length > 1) {
        this.toast({message: '데이터를 하나만 선택해 주세요.', type:"error"});
        return;
      }
      code = me.dataProvider.getJsonRow(checkedRows[0]);
      me.$httpPost({
        param: code,
        url: '/system/setting/country/update',
        callback: function () {
          me.toastSuccessUpdate();
          me.reloadRealGrid();
        }
      });
    },

    deleteCode:function(){
      let me = this;
      let code;
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: '데이터를 선택해 주세요.', type:"error"});
        return;
      }
      if(checkedRows.length > 1) {
        this.toast({message: '데이터를 하나만 선택해 주세요.', type:"error"});
        return;
      }
      code = me.dataProvider.getJsonRow(checkedRows[0]);
      me.confirmDelete(function() {
        me.$httpPost({
          param: code,
          url: '/system/setting/country/delete',
          callback: function () {
            me.toastSuccessDelete();
            me.reloadRealGrid();
          }
        });
      });
    },

    download: function() {
      this.downloadRealGridExcel( '국가코드');
    },

    addRealGridOption: function () {
      var me = this;
      me.gridView.checkBar.visible=true;
      me.gridView.setCheckBar({exclusive: true});
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        let value = grid.getValue(dataRow, field);
        let fieldName = grid.getColumn(field).fieldName;
        if (fieldName !== 'CODE_2DIGIT') {
          grid.commit();
          return;
        }
        grid.commit();
      };

      me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        if (me.dataProvider.getRowState(newIndex.dataRow) !== 'created') {
          grid.setColumnProperty('CODE_2DIGIT', 'editable', false);
        } else {
          grid.setColumnProperty('CODE_2DIGIT', 'editable', true);
        }
      };
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-country',
      editable:true,
      dataLoadFunction: getCountryCode
    });
  }
}
</script>