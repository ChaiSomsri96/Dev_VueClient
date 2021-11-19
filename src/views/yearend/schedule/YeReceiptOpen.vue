<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'일정 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <ye-date-tab></ye-date-tab>
      <div class="box border-box type2">
        <div class="box-body row">
          <div class="pull-left search-wrap">
            <div class="input-group type-divide col-3 pr-0">
              <div class="input-group type-divide">
                <div class="divide-left">
                  <span class="input-group-addon title">연도</span>
                </div>
                <div class="divide-right">
                  <div class="input-group">
                    <ui-input-year :value="selCode.ATT_YEAR"
                                   @change="selCode.ATT_YEAR=$event; selCode.return=$event;"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="input-group type-divide col-3 pr-0">
              <div class="input-group type-divide">
                <div class="divide-left">
                  <span class="input-group-addon title">종류</span>
                </div>
                <div class="divide-right">
                  <ui-dropdown :items="settleType.items"
                               :value="selCode.QRY_SETTLE_TYPE"
                               @change="selCode.QRY_SETTLE_TYPE=$event.value;selCode.return=$event;"
                  />
                </div>
              </div>
            </div>
            <div class="input-group type-divide col-3 ">
              <div class="divide-left">
                <span class="input-group-addon title">사원명</span>
              </div>
              <div class="divide-right">
                <div class="input-group dropdown ellipsis">
                  <ui-input :value="selCode.EMP_NAME" @change="selCode.EMP_NAME=$event; selCode.return=$event;"/>
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
          v-bind:download=true
          v-on:download="downloadRealGridExcel">
        <template v-slot:start>
          <button type="button" class="btn btn-md flat" @click="openReceipt">
            <i class="icon-lineIcon-check mr-5"></i>
            조회가능으로 설정
          </button>
          <button type="button" class="btn btn-md flat" @click="closeReceipt">
            <i class="icon-lineIcon-close mr-5"></i>
            조회불가능으로 설정
          </button>
        </template>
      </button-panel>
      <div>
        <div id="realgrid-receipt-open" class="realgrid-type-style" style="height:400px;"/>
      </div>
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
    YeDateTab,
    UiInputYear,
    ButtonPanel
  },
  mixins: [grid],
  data: function () {
    return {

      selCode: {
        EMP_NAME: '',
        ATT_YEAR: new Date().getFullYear() - 1,
        QRY_SETTLE_TYPE: 'YEAREND', // ALL, SEV, YEAREND
        FILTER_YE_STATUS: 'NO'
      },
      excelFileName: '사원목록',
      url: {
        search: '/year-end/employee/list',
        open: '/year-end/admin2/ess-open',
        close: '/year-end/admin2/ess-close',
      },
      settleType: {
        value: 'YEAREND',
        return: null,
        items: [
          {cd: 'ALL', cdNm: {message: '전체'}},
          {cd: 'YEAREND', cdNm: {message: '재직자 연말정산'}},
          {cd: 'SEV', cdNm: {message: '퇴사자 정산'}}
        ]
      },
      columns: [
        {header: "정산년도", fieldName: "ATT_YEAR", width: 80},
        {header: "이름", fieldName: "EMP_NAME", width: 100, autoFilter: true},
        {header: "부서", fieldName: "HRDEPT_NAMK", width: 150, styleName: "left-column", autoFilter: true},
        {header: "퇴사일", fieldName: "RETIRE_DATE", width: 100},
        {header: "Draft", fieldName: "DRAFT_YES", width: 80,
          renderer: {
            type: "html",
            callback: function(grid, cell, w, h) {
              if(cell.value == 'Y'){
                return 'Y';
              }
              return '';
            }
          }
        },
        {header: "조회가능", fieldName: "RECEIPT_OPEN", width: 80,
          renderer: {
            type: "html",
            callback: function(grid, cell, w, h) {
              if(cell.value == 'Y'){
                return 'Y';
              }
              return '';
            }
          }
        },
      ],
      fields: [
        {fieldName: "EID", dataType: 'text'},
        {fieldName: "ATT_YEAR", dataType: 'text'},
        {fieldName: "PAYDAY", dataType: 'text'},
        {fieldName: "EMP_NAME", dataType: 'text'},
        {fieldName: "YE_PROGRESS_NAME", dataType: 'text'},
        {fieldName: "HRDEPT_NAMK", dataType: 'text'},
        {fieldName: "RETIRE_DATE", dataType: 'text'},
        {fieldName: "DRAFT_YES", dataType: 'text'},
        {fieldName: "RECEIPT_OPEN", dataType: 'text'},
      ]
    }
  },
  methods: {
    findSelectEmp: function () {
      let me = this;
      let arr = me.getCheckedValues();
      let paramArr = [];
      arr.forEach(function (val, idx) {
        paramArr.push({
          EID: val.EID,
          PAYDAY: val.PAYDAY
        })
      });
      return paramArr;
    },

    openReceipt: function () {
      let me = this;
      let arr = me.findSelectEmp();
      if(arr.length < 1){
        this.toastAlertSelect();
        return;
      }
      me.$httpPostBody({
        url: me.url.open,
        param: {list: arr},
        callback: function () {
          me.toastSuccessSave();
          me.onSearch();
        }
      }); // api 호출
    },

    closeReceipt: function () {
      let me = this;
      let arr = me.findSelectEmp();
      if(arr.length < 1){
        this.toastAlertSelect();
        return;
      }
      me.$httpPostBody({
        url: me.url.close,
        param: {list: arr},
        callback: function () {
          me.toastSuccessSave();
          me.onSearch();
        }
      }); // api 호출
    },

    async onSearch() {
      let me = this;
      let empName = me.selCode.EMP_NAME.trim();
      let {data} = await me.$httpPost({
        url: me.url.search,
        param: me.selCode
      }); // api 호출
      let empList = [];

      data.forEach(function (d) {
        if (d && d.PAYDAY) {
          d.ATT_YEAR = d.PAYDAY.substring(0, 4);
        }
        if(empName){
          if( d.EMP_NAME.trim() == empName){
            empList.push(d);
          }
        }
      });

      me.setRealgridData(empName ? empList: data);
    },
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId: "realgrid-receipt-open",
      editable: false,
      editEventAdd: false,
      checkbar: 'multi',
      uniqueKeys: ['EID']
    });
  }
}
</script>