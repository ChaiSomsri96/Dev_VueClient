<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'마스터 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-mater-code-tab></cfg-mater-code-tab>
      <div>
        <div class="box border-box type2">
          <border-box>
            <border-box-item title="호봉테이블 버전">
              <ui-dropdown :items="hobongVersionList.items"
                           :value="hobongVersionList.value"
                           @change="hobongVersionList.value=$event.value; hobongVersionList.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
            </border-box-item>
            <border-box-item title="급여코드">
              <ui-dropdown :items="payCodeList.items"
                           :value="payCodeList.value"
                           @change="payCodeList.value=$event.value; payCodeList.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
            </border-box-item>
            <border-box-item button>
              <button type="button" class="btn btn-md line-1" @click="onSearch()">
                <span>검색</span>
              </button>
            </border-box-item>
          </border-box>
          <button-panel
              btnType='top'
              v-bind:add=true
              v-on:add="addEmptyData"
          />
          <div>
            <div id="cfg-hobong-base-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          </div>
          <button-panel
              btnType='bottom'
              v-bind:save=true
              v-on:save="saveCode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

const HobongBaseParams = {
  HOBONG_VER: '',
  PAY_CODE: '',
  RANK_CD: '',
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9 : 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0
}
const dropDownPayCodeList= {
  labels: [],
  values: []
}

const dropDownRankCodeList= {
  labels: [],
  values: []
}

export default {
  components: {
    CfgMaterCodeTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem
  },
  mixins: [grid],
  data() {
    return {
      hobongVersionList: {
        value: '',
        return: null,
        items: []
      },

      payCodeList: {
        value: '',
        return: null,
        items: []
      },

      url: {
        search: '/payroll/hobong/select/hobong-base',
        save: '/payroll/hobong/save/hobong-base'
      },
      fields: [
        {fieldName: 'HOBONG_VER', dataType: 'text'},
        {fieldName: 'PAY_CODE', dataType: 'text'},
        {fieldName: 'RANK_CD', dataType: 'text'},
        {fieldName: '1', dataType: 'number'},
        {fieldName: '2', dataType: 'number'},
        {fieldName: '3', dataType: 'number'},
        {fieldName: '4', dataType: 'number'},
        {fieldName: '5', dataType: 'number'},
        {fieldName: '6', dataType: 'number'},
        {fieldName: '7', dataType: 'number'},
        {fieldName: '8', dataType: 'number'},
        {fieldName: '9', dataType: 'number'},
        {fieldName: '10', dataType: 'number'},
        {fieldName: '11', dataType: 'number'},
        {fieldName: '12', dataType: 'number'},
        {fieldName: '13', dataType: 'number'},
        {fieldName: '14', dataType: 'number'},
        {fieldName: '15', dataType: 'number'},
      ],
      columns: [
        { fieldName: 'HOBONG_VER', header: '버전', width: 80},
        { fieldName: 'PAY_CODE', header: '급여코드',
          "sortable": false,
          "lookupDisplay": true,
          "values": dropDownPayCodeList.values,
          "labels": dropDownPayCodeList.labels,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }, width: 170
        },
        {
          fieldName: 'RANK_CD', header: '직급',
          "sortable": false,
          "lookupDisplay": true,
          "values": dropDownRankCodeList.values,
          "labels": dropDownRankCodeList.labels,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }, width: 170
        },
        {fieldName: '1', header: '1'},
        {fieldName: '2', header: '2'},
        {fieldName: '3', header: '3'},
        {fieldName: '4', header: '4'},
        {fieldName: '5', header: '5'},
        {fieldName: '6', header: '6'},
        {fieldName: '7', header: '7'},
        {fieldName: '8', header: '8'},
        {fieldName: '9', header: '9'},
        {fieldName: '10', header: '10'},
        {fieldName: '11', header: '11'},
        {fieldName: '12', header: '12'},
        {fieldName: '13', header: '13'},
        {fieldName: '14', header: '14'},
        {fieldName: '15', header: '15'},
        this.getDeleteColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70})
      ],
      // fields: [],
      // columns: [],
      rowAttrs: [
        'HOBONG_VER', 'PAY_CODE', 'RANK_CD', '1', '2', '3', '4', '5', '6', '7' , '8', '9', '10', '11', '12', '13', '14', '15'
      ],
      emptyRealGridData: {}
    }
  },



  methods: {
    async payCodeLoad() {
      try {
        let me = this;
        const { data } = await me.$httpPost({
          param: {
            ACTIVE_ONLY: 'YES'
          },
          url: '/payroll/code/pay-pay/list'
        });
        if(Array.isArray(data) && data.length > 0) {
          for(let i = 0; i < data.length; i ++)
            me.payCodeList.items.push({
              message: data[i]['PAY_NAME'],
              code: data[i]['PAY_CODE']
            });
        }
      }
      catch(e) {
        console.error("payCodeList asyncData err: ", e);
      }
    },
    async hobongVersionLoad() {
      try {
        let me = this;
        const { data } = await  me.$httpPost( {
          param: {},
          url: '/payroll/hobong/select'
        });
        if( Array.isArray( data) && data.length > 0) {
          me.hobongVersionList.value = data[0]['HOBONG_VER'];
          for( let i=0; i< data.length; i++) {
            me.hobongVersionList.items.push( {
              message: data[i]['HOBONG_VER'],
              code: data[i]['HOBONG_VER']
            })
          }
        }
      }
      catch(e) {
        console.error("hobongVersionList asyncData err: ", e);
      }
    },

    async loadGridData() {
      let me = this;
      me.gridView.setCheckBar({
        visible: false
      });
      let hobongVerValue = '';
      try {
        const {data} = await me.$httpPost({
          param: {},
          url: '/payroll/hobong/select'
        });
        hobongVerValue = data[0]['HOBONG_VER'];
      }catch ( e){
        console.log( 'load Fail HobongVersion: ', e);
      }
      me.emptyRealGridData = {
        'HOBONG_VER': hobongVerValue
      }
      try {
        let payCocdeValue = me.payCodeList.value;
        let { data } = await me.$httpPost({
          param: { HOBONG_VER: hobongVerValue, PAY_CODE: payCocdeValue},
          url: me.url.search
        });
        this.setRealgridData(data || []);

      }
      catch(e) {
        console.error("CfgHobongBaseGrid loadGridData err: ", e);
      }
    },

    async onSearch() {
      let me = this;
      let hobongVerValue = me.hobongVersionList.value;
      let payCocdeValue = me.payCodeList.value;
      if( ! hobongVerValue){
        me.alert({message:'호봉테이블 버전을 선택해주세요.'});
        return false;
      }
      me.emptyRealGridData = {
        'HOBONG_VER': hobongVerValue
      }
      try {
        let { data } = await this.$httpPost({
          param: {HOBONG_VER: hobongVerValue, PAY_CODE: payCocdeValue},
          url: me.url.search
        });
        this.setRealgridData(data );
      }
      catch(e) {
        console.error("CfgHobongBaseGrid loadGridData err: ", e);
      }
    },

    // realgridCreatedCallback: function () {
    //   let me = this;
    //   // me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
    //   //   let columns = grid.getColumnNames();
    //   //   let _rowData = me.dataProvider.getJsonRow(newIndex.dataRow);
    //   //   let data = _rowData['ROW_ATTRS'];
    //   //   let editAble = false;
    //   //   if (me.dataProvider.getRowState(newIndex.dataRow) == 'created') {
    //   //     // columns.forEach(function(obj) {
    //   //     //   grid.setColumnProperty(obj,"editable",true);
    //   //     // });
    //   //     grid.setColumnProperty('HOBONG_VER', 'editable', editAble);
    //   //     // let findCoulumn = columns.find( 'HOBONG_VER');
    //   //     // grid.setColumnProperty('HOBONG_VER', 'editor', 'dropdown');
    //   //
    //   //   } else {
    //   //     // columns.forEach(function(obj) {
    //   //     //   grid.setColumnProperty(obj,"editable",true);
    //   //     // });
    //   //     grid.setColumnProperty('HOBONG_VER', 'editable', editAble);
    //   //     grid.setColumnProperty('RANK_CD', 'editable', editAble);
    //   //     grid.setColumnProperty('PAY_CODE', 'editable', editAble);
    //   //   }
    //   // };
    //   //
    //   me.gridView.onCellClicked = function (grid, clickData) {
    //     let _rowData = me.dataProvider.getJsonRow( clickData.dataRow);
    //     grid.commit();
    //     if (clickData.column == "ACTION_DEL") {
    //         me.deleteCode( _rowData);
    //     }
    //   };
    // },
    saveCode: async function(){
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

    deleteCode: function( code){
      console.log( code);
    }
  },

  async created() {
    try {
      await this.$httpPost({
        url: '/payroll/code/pay-pay/list',
        param: {}
      }).then( res =>{
        for (let i = 0; i < res.data.length; i++) {
          dropDownPayCodeList.labels.push(res.data[i]['PAY_NAME']);
          dropDownPayCodeList.values.push(res.data[i]['PAY_CODE']);
        }
      });
    } catch ( e) {
      console.log( 'async dropDownPayCodeList errL ', e);
    }

    try {
      await this.$httpPost({
        url: '/hrm/code/hr-rank/list',
        param: {}
      }).then( res => {
        for( let i=0; i< res.data.length; i++){
          dropDownRankCodeList.labels.push( res.data[i]['RANK_NAM']);
          dropDownRankCodeList.values.push( res.data[i]['RANK_CD']);
        }
      });

    }catch ( e) {
      console.log( 'async dropDownRankCodeList errL ', e);
    }
  },

  async mounted() {
    let me = this;
    await me.payCodeLoad();
    await me.hobongVersionLoad();
    me.createRealGrid({
      domId: 'cfg-hobong-base-grid',
      editable: true,
      editEventAdd: true,
      uniqueKeys: ['HOBONG_VER']
    });
    me.loadGridData();
  }
}
</script>