<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'일정관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <ye-date-tab></ye-date-tab>
      <div class="box border-box type2">
        <h3 class="blind">검색</h3>
        <div class="box-body row">
          <div class="pull-left search-wrap">
            <div class="input-group type-divide col-3 pr-0">
              <div class="input-group type-divide">
                <div class="divide-left">
                  <span class="input-group-addon title">정산연도</span>
                </div>
                <div class="divide-right">
                  <ui-input-year :value="searchYear" @change="searchYear=$event;"/>
                </div>
              </div>
            </div>
            <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
              <span>검색</span>
            </button>
          </div>
        </div>
      </div>
      <button-panel
          btnType='top'
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="downloadRealGridExcel"
      />
      <div>
        <div id="realgrid-ye-tax-date" style="height:340px;" class="realgrid-type-style"></div>
      </div>
      <button-panel
          btnType='bottom'
          v-bind:save=true
          v-on:save="saveCode"
      />
    </div>
  </div>
</template>

<script>
import YeDateTab from './YeDateTab';
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import UiInputYear from "../../../components/common/UiInputYear";

export default {
  components: {
    UiInputYear,
    YeDateTab,
    ButtonPanel
  },
  mixins: [grid],
  data: function () {
    let me = this;
    return {
      searchYear: '',
      settleYear: '',
      excelFileName: '연말정산 분납일자',
      url: {
        search: '/year-end/employee/allocation/list',
        save: '/year-end/employee/allocation/save',
        delete: '/year-end/employee/allocation/delete',
      },
      emptyRealGridData: {
        PAYDAY: '',
        PMON_YE: '',
        PMON_SEQ: '',
        PMON_AL1: '',
        PMON_AQ1: '',
        PMON_AL2: '',
        PMON_AQ2: '',
        ACTION_DEL: '',
        ATT_YEAR: ''
      },
      columns: [
        {header: '귀속년도', fieldName: "ATT_YEAR", autoFilter: true},
        {header: { text:'연말정산 급여월(yyyymm)'}, fieldName: "PMON_YE", width: 150},
        {header: '급여 차수', fieldName: "PMON_SEQ"},
        {header: '1차 분납 급여월(yyyymm)', fieldName: 'PMON_AL1', width: 150},
        {header: '급여 차수', fieldName: 'PMON_AQ1'},
        {header: '2차 분납 급여월(yyyymm)', fieldName: 'PMON_AL2', width: 150},
        {header: '급여 차수', fieldName: 'PMON_AQ2'},
        this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100})
      ],
      fields: [
        {fieldName: 'PAYDAY', dataType: 'text'},
        {fieldName: 'PMON_YE', dataType: 'text'},
        {fieldName: 'PMON_SEQ', dataType: 'text'},
        {fieldName: 'PMON_AL1', dataType: 'text'},
        {fieldName: 'PMON_AQ1', dataType: 'text'},
        {fieldName: 'PMON_AL2', dataType: 'text'},
        {fieldName: 'PMON_AQ2', dataType: 'text'},
        {fieldName: "ATT_YEAR", dataType: "text"},
        {
          fieldName: 'ACTION_DEL', dataType: 'boolean',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            let data = values[fieldNames.indexOf("ROW_ATTRS")];
            if(data){
              if ( data.PAYDAY.substring(0,4) >= me.settleYear){
                return false;
              }
            }else{
              return false;
            }
            return true;
          }
        }
      ],
      rowAttrs: ['PAYDAY','ATT_YEAR']
    }
  },

  methods: {
    findOpenYear: async function() {
      const me = this;
      const {data} = await me.$httpPost({
        url: '/year-end/setting/settle/incumbent/open-year',
        param: {dummy: 'Y'}
      }); // api 호출
      me.settleYear = data.msg;
      return data;
    },

    findSaveRows: function () {
      let me = this;
      let createdRows = me.dataProvider.getStateRows('created');
      let updatedRows = me.dataProvider.getStateRows('updated');
      let retData = [];
      createdRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      updatedRows.forEach( v =>{
        retData.push( me.dataProvider.getJsonRow(v));
      });
      return retData;
    },

    saveCode: async function () {
      let me = this;
      let code = me.findSaveRows();
      if (code) {
        for (const v of code) {
          await me.$httpPost({
            param: v,
            sendRequestBody: true,
            url: me.url.save
          });
        }

        me.toastSuccessSave();
        await me.onSearch();
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
              me.onSearch();
            }
          });
        });
      }
    },

    onLoadInitData: async function () {
      let me = this;
      let {data} = await me.$httpGet(me.url.search);
      data.forEach(function (d) {
        if (d && d.PAYDAY) {
          d.ATT_YEAR = d.PAYDAY.substring(0, 4);
        }
      });
      return {data};
    },

    onSearch: async function () {
      let me = this;
      let {data} = await me.onLoadInitData();
      let payday = '';
      let filterData = data;
      if (me.searchYear) {
        payday = me.searchYear + '1301';
        filterData = data.filter(item => item.PAYDAY == payday);
      }
      me.setRealgridData(filterData || []);
    },

    realgridCreatedCallback: function () {
      let me = this;
      me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
        let columns = grid.getColumnNames();
        let _rowData = me.dataProvider.getJsonRow(newIndex.dataRow);
        let data = _rowData['ROW_ATTRS'];
        let editAble = false;
        if (me.dataProvider.getRowState(newIndex.dataRow) == 'created') {
          grid.setColumnProperty('ATT_YEAR', 'editable', true);
        } else {
          editAble = ( data && data.ATT_YEAR >= me.settleYear);
          columns.forEach(function(obj) {
            grid.setColumnProperty(obj,"editable",editAble)
          });
        }
      };

      me.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        let data = _rowData['ROW_ATTRS'];

        grid.commit();
        if (clickData.column == "ACTION_DEL") {
          if (data && data.ATT_YEAR >= me.settleYear) {
            me.deleteCode(_rowData);
          }
        }else{
          if ( data && data.ATT_YEAR && _rowData['ROW_ATTRS'].ATT_YEAR < me.settleYear) {
            me.toast({message: '현재 오픈된 정산년도 이전의 분납일자는 수정할 수 없습니다.', type:"error"});
          }
        }
      };
    },

    setInitData: function () {
      let me = this;
      me.findOpenYear().then(
          () => me.createRealGrid({
            domId: "realgrid-ye-tax-date",
            editable: true,
            autoLoad: true,
            dataLoadFunction: me.onLoadInitData,
            editEventAdd: true,
            uniqueKeys: ['PAYDAY']
          })
      );
    }
  },

  mounted() {
    let me = this;
    me.setInitData();
  }
}
</script>