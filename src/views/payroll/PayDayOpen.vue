<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'급여일 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <div class="box border-box type2 pl-10">
        <div class="box-body row">
          <div class="pull-left search-wrap">
            <div class="input-group type-divide col-3 pr-0">
              <div class="input-group type-divide">
                <div class="divide-left">
                  <span class="input-group-addon title" >연도</span>
                </div>
                <div class="divide-right">
                  <div class="input-group">
                    <div class="divide-right">
<!--                      <ui-input-year :value="PAY_YEAR" @change="PAY_YEAR=$event;"/>-->
                      <input :value="PAY_YEAR"
                             @input="inputValue"
                             class="form-control text-left ellipsis"
                             @change="changeValue"
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
              <span>검색</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-row">
          <button-panel
              btnType='top'
              v-bind:add=true
              v-bind:download=true
              v-on:add="insertPayday"
              v-on:download="download"
          />
        </div>
      </div>

      <div class="row">
        <div id="realgrid-paydayopen" style="width: 100%;height:500px;" class="realgrid-type-style"></div>
      </div>

      <pay-day-modal ref="PayDayModal"  />
    </div>
  </div>
</template>

<script>
import ButtonPanel from "../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';
import PayDayModal from '@/components/payroll/common/modals/PayDayModal';
import UiInputYear from "../../components/common/UiInputYear";

export default {
  components: {
    ButtonPanel,
    PayDayModal,
    UiInputYear
  },

  mixins: [grid,systemManager],

  data: function () {
    return {
      excelFileName: '급여일 관리',
      selCode: {},
      PAY_YEAR:'2021',
      PAY_MONTH:'',
      SEQ:'',
      PAY_DATE:'',
      CLOSE_FLAG_DESC:'',START_DATE:'',END_DATE:'',PAYDAY_MEMO1:'',PAYDAY_MEMO2:'',
      columns: [
        { fieldName: 'PAY_MONTH', header: '급여월', width: 130 ,editable: false,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              return year+'.'+month;
            }
          } },
        { fieldName: 'SEQ', header: '차수', width: 80 ,editable: false},
        { fieldName: 'PAY_DATE',
          header: {
            text: "급여일",
            template: `<p>급여일 </br><SMALL>GMT -11:00</SMALL></p>`
          }
          , width: 140 ,editable: false,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }
        },
        { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 140 ,editable: false},
        { fieldName: 'CLOSE_FLAG', header: '상태',
          displayCallback: function(grid, index, value) {
              return value == 0 ? "미도래" : (value == 1 ? "오픈" : "마감");
          },
          width: 80 ,editable: false},
        { fieldName: 'START_DATE', header: '시작일', width: 100 ,editable: false,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }
        },
        { fieldName: 'END_DATE', header: '종료일', width: 100 ,editable: false,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }
        },
        { fieldName: 'PAYDAY_MEMO1', header: '급여명세서 메모1', width: 140 ,editable: false},
        { fieldName: 'PAYDAY_MEMO2', header: '급여명세서 메모2', width: 140 ,editable: false},
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 100}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 100}),
      ],
      fields: [
        { fieldName: 'PAY_MONTH', header: "급여월",dataType: "data"  },
        { fieldName: 'SEQ', header: "차수" },
        { fieldName: 'PAY_DATE', header: "급여일",dataType: "data"},
        { fieldName: 'PAYDAY_TYPE_MEMO', header: "제목"},
        { fieldName: 'CLOSE_FLAG', header: '상태' },
        { fieldName: 'START_DATE', header: "시작일",dataType: "data" },
        { fieldName: 'END_DATE', header: "종료일",dataType: "data"  },
        { fieldName: 'PAYDAY_MEMO1', header: "급여명세서 메모1" },
        { fieldName: 'PAYDAY_MEMO2', header: "급여명세서 메모2" },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs: ['PAY_MONTH', 'SEQ', 'PAY_DATE','START_DATE','END_DATE','PAYDAY_MEMO1'
                ,'PAYDAY_MEMO2','CLOSE_FLAG','PAYDAY_TYPE_MEMO']
    }
  },
  methods: {
    async getloadData() {
      this.gridView.setCheckBar({
        visible: false
      });
      try {
        let { data } = await this.$httpPost({
          param: {},
          url: '/payroll/code/pay-date/list'
        });
       this.setRealgridData(data.list || []);

      }
      catch(e) {
        console.error("Paydayopen loadGridData err: ", e);
      }
    },
    insertPayday: function() {
      this.$refs.PayDayModal.show();
    },
    realgridCreatedCallback: function() {
      let me = this;

      this.gridView.onCurrentRowChanged  = function (grid, oldRow, newRow) {

        if (newRow > -1) {

            if(grid.getValue(newRow, "SEQ") == "2") {
              let editable = true
              grid.setEditOptions({"editable": editable});
              grid.setColumnProperty("PAY_MONTH", "editable", editable);
              grid.setColumnProperty("PAY_DATE", "editable", editable);
              grid.setColumnProperty("PAYDAY_TYPE_MEMO", "editable", editable);
              grid.setColumnProperty("CLOSE_FLAG", "editable", !editable);
              grid.setColumnProperty("START_DATE", "editable", !editable);
              grid.setColumnProperty("END_DATE", "editable", !editable);
              grid.setColumnProperty("UPDATE", "editable", false);
              grid.setColumnProperty("DELETE", "editable", false);
            }
            else if(grid.getValue(newRow, "SEQ") == "1"){

              let editable = true
              grid.setEditOptions({"editable": editable});
              grid.setColumnProperty("PAY_MONTH", "editable", !editable);
              grid.setColumnProperty("PAY_DATE", "editable", !editable);
              grid.setColumnProperty("PAYDAY_TYPE_MEMO", "editable", !editable);
              grid.setColumnProperty("CLOSE_FLAG", "editable", editable);
              grid.setColumnProperty("START_DATE", "editable", editable);
              grid.setColumnProperty("END_DATE", "editable", editable);
              grid.setColumnProperty("UPDATE", "editable", false);
              grid.setColumnProperty("DELETE", "editable", false);

            }else{
              grid.setEditOptions({"editable": false});
            }
        }
      };


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
          me.$refs.PayDayModal.show({PAY_MONTH: _rowData[0].PAY_MONTH,
                                     SEQ: _rowData[0].SEQ,
                                     PAY_DATE: _rowData[0].PAY_DATE,
                                     CLOSE_FLAG: _rowData[0].CLOSE_FLAG,
                                     START_DATE: _rowData[0].START_DATE,
                                     END_DATE: _rowData[0].END_DATE,
                                     PAYDAY_MEMO1: _rowData[0].PAYDAY_MEMO1,
                                     PAYDAY_MEMO2: _rowData[0].PAYDAY_MEMO2,
                                     PAYDAY_TYPE_MEMO: _rowData[0].PAYDAY_TYPE_MEMO,
                                     url:'/payroll/code/pay-date/update'
          });
          return true;
        }
      }
    },
    async onSearch() {
      let me = this;
      if(me.payrollUtil.isNull(me.PAY_YEAR)){
        me.alert({message:'검색 대상 연도값을 입력해 주세요.'});
        return false;
      }
      if(!me.payrollUtil.isNumeric(me.PAY_YEAR)||me.PAY_YEAR.length!=4){
        me.alert({message:'검색 대상 연도값을 정확히 입력해 주세요.'});
        return false;
      }
      try {
        let { data } = await this.$httpPost({
          param: {PAY_YEAR: me.PAY_YEAR},
          url: '/payroll/code/pay-date/list'
        });
        this.setRealgridData(data.list || []);
      }
      catch(e) {
        console.error("Paydayopen loadGridData err: ", e);
      }

    },
    inputValue : function () {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      if(event.target.value.length>4){
        event.target.value = event.target.value.substring(0,event.target.value.length - 1);
      }
      if(event.target.value>2030){
        event.target.value = event.target.value.substring(0,event.target.value.length - 1);
        this.toast({message:'조회 연도는 2030년 까지 입니다.'});
      }
      if(event.target.value<=2016 && event.target.value.length==4){
        event.target.value = event.target.value.substring(0,event.target.value.length - 1);
        this.toast({message:'조회 연도는 2017년 부터 입니다.'});
      }
    },
    changeValue       : function () {
      this.PAY_YEAR = event.target.value;
    },
  },
  mounted() {
    let me = this;
    me.createRealGrid({'domId':'realgrid-paydayopen','editable':'true'});
    me.getloadData();

  },
}
</script>