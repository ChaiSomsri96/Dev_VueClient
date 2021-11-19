<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'기초자료 관리'"/>
    <!-- Body 영역  contents_section pt-0 -->
    <div class="content-body">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{name: 'SystemBase'}" active-class="active">수퍼코드 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'mastercode'}" active-class="active">마스터코드 관리</router-link>
        </li>
      </ul>
      <button-panel
          btnType='top'
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="download"
      />
      <div>
        <div id="realgrid-supecode"  class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
      </div>
      <button-panel
          btnType='bottom'
          v-bind:save=true
          v-on:save="saveSuperCode"
      />
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "../../components/common/ButtonPanel";
import systemManager from '@/mixin/system-manager';

export default {
  components: {ButtonPanel},
  mixins: [grid,systemManager],

  data() {
    return {
      emptyRealGridData: {
        SUPER_CODE: '', CODE_KDESC: '', CODE_DESC: '', OPENFLAG: 'Y', ACTION_SAVE: '저장', ACTION_DEL: '삭제'
      },
      columns: [
        {
          fieldName: 'SUPER_CODE', header: '수퍼코드', width: 80, editable: false,
          editor: {type: 'line', maxLength: 2}
        },
        {fieldName: 'CODE_KDESC', header: '코드명(국문)', width: 190, editable: true},
        {fieldName: 'CODE_DESC', header: '코드명(영문)', width: 190, editable: true},
        {
          fieldName: 'OPENFLAG', header: '오픈여부', width: 120, editable: true, autoFilter: true,
          editor: {
            type: "dropdown", dropDownCount: 2, domainOnly: true, textReadOnly: true,
            values: ["Y", "N"], labels: ['Y', 'N']
          },
        },
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100})
      ],

      fields: [
        {fieldName: 'SUPER_CODE'},
        {fieldName: 'CODE_KDESC'},
        {fieldName: 'CODE_DESC'},
        {fieldName: 'OPENFLAG'},
        {fieldName: "ACTION_DEL"}
      ]
    }
  },

  methods: {
    loadData() {
      return this.$httpGet('/system/setting/supercode/list'); // api 호출
    },

    async deleteSuperCode(code){
      let me = this;
      me.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: function () {
          me.$httpPost({
            param: code,
            url: '/system/setting/supercode/delete',
            callback: function () {
              me.toast({message: '삭제했습니다.', type: 'success'});
              me.reloadRealGrid();
            }
          });
        }
      });
    },

    download: function () {
      this.downloadRealGridExcel( '수퍼코드');
    },

    checkValidSuperCode: function (code) {
      if (!code.SUPER_CODE) {
        return false;
      }
      return true;
    },

    async saveSuperCode() {
      let me = this;
      let code = me.findCheckedSingleRow();
      if(!code){
        return;
      }
      if( ! me.checkValidSuperCode(code)){
        this.toast({message: '수퍼코드를 입력해주세요', type: 'error'});
        return;
      }
      me.$httpPost({
        param: code,
        url: '/system/setting/supercode/save',
        callback: function () {
          me.toastSuccessSave();
          me.reloadRealGrid();
        }
      });
    },

    realgridCreatedCallback: function () {
      let me = this;
      let isDuplicate= function (grid, dataRow, fieldName, value) {
        let ret = me.dataProvider.searchData({
          field: [fieldName],
          value: value,
          wrap: true
        });

        if (!ret) {
          return false;
        }

        me.toast('이미 등록된 코드입니다.');
        grid.cancel();
        return true;
      }

      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        let value = grid.getValue(dataRow, field);
        let fieldName = grid.getColumn(field).fieldName;
        if (fieldName !== 'SUPER_CODE') {
          grid.commit();
          return;
        }
        if (isDuplicate(grid, dataRow, fieldName, value)) {
          return;
        }
        grid.commit();
      };

      me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        if (me.dataProvider.getRowState(newIndex.dataRow) !== 'created') {
          grid.setColumnProperty('SUPER_CODE', 'editable', false);
        } else {
          grid.setColumnProperty('SUPER_CODE', 'editable', true);
        }
      };

      me.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == "ACTION_DEL") {
          grid.commit();
          me.deleteSuperCode(me.dataProvider.getJsonRow(clickData.dataRow));
        }
      };
    }

  },
  mounted() {
    this.createRealGrid({
      domId:'realgrid-supecode',
      dataLoadFunction: this.loadData,
      editable: true
    });
  },
}
</script>