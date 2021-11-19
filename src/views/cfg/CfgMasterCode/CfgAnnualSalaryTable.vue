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
            <border-box-item title="조회 기준일">
              <ui-input-date :date="sendDateScope.today"
                             :value="sendDateScope.today"
                             @change="sendDateScope.today=$event;" />
            </border-box-item>
            <border-box-item title="사원명">
              <ui-input :value="selCode.EMP_NAME" @change="selCode.EMP_NAME=$event; selCode.return=$event;"/>
            </border-box-item>
            <border-box-item button>
              <button type="button" class="btn btn-md line-1" @click="onSearch()">
                <span>검색</span>
              </button>
            </border-box-item>
          </border-box>
          <div class="row">
            <div class="form-row">
              <button-panel
                  btnType='top'
                  v-bind:add=true
                  v-on:add="insertPayday"
              />
            </div>
          </div>
          <div>
            <div id="cfg-annual-sarary-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          </div>
        </div>
      </div>
      <annual-salary-modal ref="AnnualSalaryModal"  />
    </div>
  </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import AnnualSalaryModal from '@/components/payroll/common/modals/AnnualSalaryModal';


export default {
  components:{
    CfgMaterCodeTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    AnnualSalaryModal
  },
  mixins: [grid],
  data(){
    return {
      sendDateScope: {
        'today': '20210728'
      },
      selCode: {
        EMP_NAME: ''
      },
      fields: [
        { fieldName: 'EMP_NAM', dataType: 'text'},
        { fieldName: 'HRDEPT_NAM', dataType: 'text'},
        { fieldName: 'APPLY_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'END_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'ANNUAL_PAY1', dataType: 'number'},
        { fieldName: 'BASIC_PAY', dataType: 'number'},
        { fieldName: 'MEAL_ALLOWANCE', dataType: 'number'},
        { fieldName: 'CAR_ALLOWANCE', dataType: 'number'},
        { fieldName: '상의후 넣기', dataType: 'number'},
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }
      ],
      columns:[
        { fieldName: 'EMP_NAM', header: '이름', editable: false},
        { fieldName: 'HRDEPT_NAM', header: '부서'},
        { fieldName: 'APPLY_DATE', header: '적용시작일'},
        { fieldName: 'END_DATE', header: '적용종료일'},
        { fieldName: 'ANNUAL_PAY1', header: '연봉'},
        { fieldName: 'BASIC_PAY', header: '매월기본급'},
        { fieldName: 'MEAL_ALLOWANCE', header: '매월 식대'},
        { fieldName: 'CAR_ALLOWANCE', header: '매월 차량유지비'},
        { fieldName: 'NOT_EXIST', header: '매월 기타 수당'},
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 100}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 100})
      ],
      rowAttrs: ['EMP_NAM', 'HRDEPT_NAM', 'APPLY_DATE', 'END_DATE', 'ANNUAL_PAY1', 'BASIC_PAY', 'MEAL_ALLOWANCE', 'CAR_ALLOWANCE', 'NOT_EXIST']
    }
  },
  methods:{
    async loadGridData() {
      let me = this;
      let serachDay = me.sendDateScope.today;

      me.gridView.setCheckBar({
        visible: false
      });

      try {
        let { data } = await me.$httpPost({
          param: { APPLY_DATE: serachDay},
          url: '/payroll/annualIncome/annual/select'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },
    insertPayday: function(){
      this.$refs.AnnualSalaryModal.show();
    },
    onSearch: async function(){
      let me = this;
      let date = me.sendDateScope.today;
      let empName = me.selCode.EMP_NAME;
      if( me.payrollUtil.isNull( date) || date.length != 8){
        me.alert({message:'조회 기준일을 입력해 주세요.'});
        return false;
      }
      try {
        let { data } = await me.$httpPost({
          param: { APPLY_DATE1: date, EMP_NAME: empName},
          url: '/payroll/annualIncome/annual/select'
        });
        this.setRealgridData(data || []);

      }
      catch(e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },
    realgridCreatedCallback: function() {
      let me = this;
      // this.gridView.onCurrentRowChanged  = function (grid, oldRow, newRow) {
      //
      //   if (newRow > -1) {
      //
      //     if(grid.getValue(newRow, "SEQ") == "2") {
      //       let editable = true
      //       grid.setEditOptions({"editable": editable});
      //       grid.setColumnProperty("PAY_MONTH", "editable", editable);
      //       grid.setColumnProperty("PAY_DATE", "editable", editable);
      //       grid.setColumnProperty("PAYDAY_TYPE_MEMO", "editable", editable);
      //       grid.setColumnProperty("CLOSE_FLAG", "editable", !editable);
      //       grid.setColumnProperty("START_DATE", "editable", !editable);
      //       grid.setColumnProperty("END_DATE", "editable", !editable);
      //       grid.setColumnProperty("UPDATE", "editable", false);
      //       grid.setColumnProperty("DELETE", "editable", false);
      //     }
      //     else if(grid.getValue(newRow, "SEQ") == "1"){
      //
      //       let editable = true
      //       grid.setEditOptions({"editable": editable});
      //       grid.setColumnProperty("PAY_MONTH", "editable", !editable);
      //       grid.setColumnProperty("PAY_DATE", "editable", !editable);
      //       grid.setColumnProperty("PAYDAY_TYPE_MEMO", "editable", !editable);
      //       grid.setColumnProperty("CLOSE_FLAG", "editable", editable);
      //       grid.setColumnProperty("START_DATE", "editable", editable);
      //       grid.setColumnProperty("END_DATE", "editable", editable);
      //       grid.setColumnProperty("UPDATE", "editable", false);
      //       grid.setColumnProperty("DELETE", "editable", false);
      //
      //     }else{
      //       grid.setEditOptions({"editable": false});
      //     }
      //   }
      // };

      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);
        if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
          return false;
        if(index.column == "삭제"){
          me.confirm({
            title: '확인',
            message: '정말 삭제하시겠습니까?',
            yesCallback: function() {
              me.$httpPost({
                param: {
                  'formData': JSON.stringify({
                    "PAY_MONTH": _rowData[0].PAY_MONTH,
                    "SEQ": _rowData[0].SEQ,
                    "PAY_DATE": _rowData[0].PAY_DATE
                  })
                },
                url: '/payroll/code/pay-date/delete',
                callback: function() {
                  me.toastSuccessDelete();
                  me.loadGridData();
                }
              });
            }
          });
          return true;
        }
        if(index.column == "수정"){
          me.$refs.AnnualSalaryModal.show({EMP_NAM: _rowData[0].EMP_NAM,
            HRDEPT_NAM: _rowData[0].HRDEPT_NAM,
            APPLY_DATE: _rowData[0].APPLY_DATE,
            END_DATE: _rowData[0].END_DATE,
            ANNUAL_PAY1: _rowData[0].ANNUAL_PAY1,
            BASIC_PAY: _rowData[0].BASIC_PAY,
            MEAL_ALLOWANCE: _rowData[0].MEAL_ALLOWANCE,
            CAR_ALLOWANCE: _rowData[0].CAR_ALLOWANCE,
            NOT_EXIST: _rowData[0].NOT_EXIST,
            READ_ONLY_STATUS: 'Y'
            // url:'/payroll/code/pay-date/update'
          });
          return true;
        }
      }
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'cfg-annual-sarary-grid',
      editable: false
    });
    me.loadGridData();
  }

}
</script>