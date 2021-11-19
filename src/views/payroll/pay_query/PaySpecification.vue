<template>
  <div>
    <ui-header :msg="'급여조회'" />
    <div class="content-body">
      <pay-query-tab></pay-query-tab>
      <div>
        <div class="box border-box type2">
          <div class="box-body row">
            <div class="pull-left search-wrap">
              <div class="input-group col-5 pr-0">
                <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" />
              </div>
              <div class="input-group col-1 pr-0">
                <button type="button" class="btn btn-md line-1" @click="selectMonth()">
                  <span>찾기</span>
                </button>
              </div>
              <div class="input-group type-divide col-3">
                <div class="divide-left">
                  <span class="input-group-addon title">부서</span>
                </div>
                <div class="divide-right">
                  <div class="input-group dropdown resizable">
                    <input type="text" class="form-control" data-srch-dept="true" id="dept" baap-autocomplete-component="input[name='condition.deptNo']"
                           name="condition.deptNm" value="" autocomplete="off" data-range="DEPT" data-org-search-type="AC_TYPE_SC1" data-toggle="dropdown" aria-expanded="false"/>
                    <button id="search-highlight-btn" type="button" class="btn btn-s white"><i class="icon-lineIcon-treemenu"></i></button>
                    <div class="dropdown-menu" style="display: none;">
                      <div class=" ndk-scrollbar" style="max-height: 380px" baap-autocomplete-result></div>
                    </div>
                    <div class="menu-container">
                      <div class="menu-kit">
                        <div class="menu-resizable horizontal">
                          <div class="menu-scroll  ndk-scrollbar">
                            <div class="menu-kit-area" baap-autocomplete-tree></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-group type-divide col-3 ">
                <div class="divide-left">
                  <span class="input-group-addon title">사원명</span>
                </div>
                <div class="divide-right">
                  <div class="input-group dropdown ellipsis">
                    <input type="text" class="form-control type-two-button" id="searchEmpNm" value="" name="searchEmpNm" data-type="EMP" data-organization-type="COMPANY" data-include-rest="true" data-org-search-type="AC_TYPE_SC96" data-range="EMP"
                           placeholder='사원명' autocomplete="off" data-toggle="dropdown" aria-expanded="false">
                    <button type="button" class="btn btn-s solid"><i class="icon-solidIcon-cancel-default"></i></button>
                    <button id="search-highlight-btn2" type="button" class="btn btn-s white"><i class="icon-lineIcon-search"></i></button>
                    <div class="dropdown-menu" style="max-width:460px;">
                      <div class="autocompleteScrollbar" style="max-height: 350px; position: relative; overflow: visible;"></div>
                    </div>
                  </div>
                </div>
                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
                  <span>검색</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-row">
            <button type="button" class="btn btn-md line-1" @click="paySpecificationModal()">
              <span>급여 명세서 일괄 다운로드</span>
            </button>
          </div>
        </div>
        <div>
          <div id="payroll-ledger-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
        <pay-secification-modal ref="paysecificationmodal" />
        <pay-month-select-modal id="pay-month-select-modal" ref="payMonthSelectModal" @change="payMonthChange($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import PayQueryTab from './PayQueryTab';
import PaySecificationModal from './PaySecificationModal';
import PayMonthSelectModal from '@/components/payroll/common/modals/PayMonthSelectModal';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
export default {
  mixins: [grid],
  components: {
    SalaryMonthsAndDates,
    PayQueryTab,
    PaySecificationModal,
    PayMonthSelectModal,
    BorderBox,
    BorderBoxItem,
  },
  data() {
    return {
      payMonth: '',
      payMonthSeq: '',
      payDate: '',


      //grid
      fields: [
        { fieldName: 'EID',  dataType: 'text' },
        { fieldName: 'EMP_NUMBER',  dataType: 'text' },
        { fieldName: 'EMP_NAM',  dataType: 'text' },
        { fieldName: 'E_JOIN_DATE',  dataType: "data" },
        { fieldName: 'RETIRE_DATE',  dataType: "data" },
        { fieldName: 'HRDEPT_NAM', dataType: 'text' },
        { fieldName: 'DATAIL', dataType: 'text' },
      ],
      columns: [
        { fieldName: 'EID', header: '사번', visible: false },
        { fieldName: 'EMP_NUMBER', header: '사번', visible: false },
        { fieldName: 'EMP_NAM', header: '이름', width: 100 },
        { fieldName: 'E_JOIN_DATE', header: '입사일', width: 100 ,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }},
        { fieldName: 'RETIRE_DATE', header: '퇴사일', width: 100,
          renderer: {
            type: "html",
            callback: function (grid, cell, w, h) {
              let year = cell.value.toString().slice(0,4)
              let month = cell.value.toString().slice(4,6)
              let day = cell.value.toString().slice(6,8)
              return year+'.'+month+'.'+day;
            }
          }},
        { fieldName: 'HRDEPT_NAM', header: '부서', width: 100},
        this.getIconColumn({headerText: 'PDF 조회', fieldName: 'DATAIL', columnWidth: 70, type: 'detail'}),
      ]
    }
  },
  methods: {
    async asyncData() {
      try {
        const {data} = await this.$store.dispatch('paymonth/getPayMonth');
        this.payMonth = data.PAY_MONTH;
        this.payMonthSeq = data.SEQ;
        this.payDate = data.PAY_DATE;
      } catch(e) {
        console.error("PayrollLedger asyncData err: ", e);
      }
    },
    selectMonth(){
      this.$refs.payMonthSelectModal.show();
    },
    paySpecificationModal(){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustOneMemberSelect'], type:"error"});
        return;
      }
      let __checkedData = [];
      let __Date = [];
      __Date.push({ 'PAY_MONTH': this.payMonth ,'SEQ': this.payMonthSeq,
        'PAY_DATE': this.payDate });
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
        __checkedData.push({
          EID: _rowData['EID']
        } );
      }
      this.$refs.paysecificationmodal.show({ eidList: __checkedData,dateData:__Date});

    },
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param: {},
          url: '/payroll/salarymanual/emp_qry/list'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("PayrollLedger loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.checkBar.visible=true;
    },
    onSearch() {
      this.loadGridData();
    },
    realgridCreatedCallback: function() {
      let me = this;

      this.gridView.onCellItemClicked= function(grid,index,clickData){

        let _rowData = me.dataProvider.getJsonRow(index.dataRow);

        let form = JSON.stringify({
          "EMP_NUMBER": _rowData['EMP_NUMBER'],
          "EMP_NAM": '\uae30\uc0ac\ubaa8',
              //_rowData['EMP_NAM'],
          "EID": _rowData['EID'],
          "PAY_MONTH": me.payMonth,
          "SEQ": me.payMonthSeq,
          "PAY_DATE": me.payDate,
          "PERSONAL_INFO_MASK": 'N',
          "GROUP_BY": "PAY_CODE",
          "RPT_LANG": "KOREAN"
        });

        //me.toast({message:form})

        let {data} = me.$httpPost({
          url: '/payroll/payslip/admin/download-one-pdf',
          param:{
            'formData': form
          },
          blob: true
        })
        me.openPdf(data, "급여명세서 조회");

      }
    },
    payMonthChange($event) {
      this.payMonth = $event.payMonth;
      this.payMonthSeq = $event.payMonthSeq;
      this.payDate = $event.payDate;
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'payroll-ledger-grid'});
    this.asyncData();
    this.loadGridData();
  }
}
</script>