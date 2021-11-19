<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'기초 자료 마감'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <ClosingTab></ClosingTab>
      <div>
        <div class="box border-box type2">
          <div class="box-body row">
            <div class="pull-left search-wrap">
              <div class="input-group col-5 pr-0">
                <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" />
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
              </div>
              <border-box-item button>
                <button type="button" id="btnSearch" class="btn btn-md line-1" >
                  <span>검색</span>
                </button>
              </border-box-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-row">
          <button class="btn btn-md flat" @click="openModal('LoadModal')"><i class="icon-lineIcon-plus mr-5"></i>불러오기</button>
          <button class="btn btn-md flat" @click="openModal('AddModal')"><i class="icon-lineIcon-plus mr-5"></i>업로드</button>
          <button v-if="isStatusOn" @click="isStatus()" ref="close_count" class="btn btn-md flat" ><i class="icon-lineIcon-plus mr-5"></i>집계마감</button>
          <button v-if="isStatusOnCancel" @click="isStatus()" ref="close_count_cancel" class="btn btn-md flat" ><i class="icon-lineIcon-plus mr-5"></i>집계마감 취소</button>
          <button class="btn btn-md flat" @click="download()"><i class="icon-lineIcon-download mr-5"></i>다운로드</button>
        </div>
      </div>
      <div class="row">
        <div id="work-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>

      <load-work-result-modal ref="LoadWorkResultModal" />
      <update-work-result-modal ref="UpdateWorkResultModal" />

    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import ClosingTab from './ClosingTab';
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import LoadWorkResultModal from './LoadWorkResultModal';
import UpdateWorkResultModal from './UpdateWorkResultModal';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
export default {
  mixins: [grid],
  components: {
    SalaryMonthsAndDates,
    ClosingTab,
    BaseTabs,
    BaseTabsItem,
    UpdateWorkResultModal,
    LoadWorkResultModal,
    BorderBox,
    BorderBoxItem,
  },
  data() {
    return {
      isStatusOn : true,
      isStatusOnCancel:false,
      payMonth: '',
      payMonthSeq: 0,
      payDate: '',
      columns: [
        { header: '이름', fieldName: 'EMP_NAME' },
        { header: '부서', fieldName: 'DEPT_NAME'},
        { header: {
            text: "반영 시작일",
            template: `<p>반영 시작일 </br><SMALL>GMT +08:00</SMALL></p>`
          }, fieldName: 'START_DATE' },
        { header: {
            text: "반영 종료일",
            template: `<p>반영 종료일 </br><SMALL>GMT +08:00</SMALL></p>`
          }, fieldName: 'END_DATE' },
        { header: '일반', fieldName: 'SEVP_FLAG' },
        { header: '연장', fieldName: 'AUTO_CALC' },
        { header: '야간', fieldName: 'A' },
        { header: '휴직 일반', fieldName: 'B' },
        { header: '휴일 연장', fieldName: 'C' },
        { header: '휴일 야간', fieldName: 'D' },
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 100}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 100})
      ],
      fields: [
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'DEPT_NAME', dataType: 'text' },
        { fieldName: 'START_DATE', dataType: 'text' },
        { fieldName: 'END_DATE', dataType: 'text' },
        { fieldName: 'SEVP_FLAG', dataType: 'text' },
        { fieldName: 'AUTO_CALC', dataType: 'text' },
        { fieldName: 'A', dataType: 'text' },
        { fieldName: 'B', dataType: 'text' },
        { fieldName: 'C', dataType: 'text' },
        { fieldName: 'D', dataType: 'text' },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs: ['EMP_NAM']
    }
  },
  methods: {
    download: function() {
      this.downloadRealGridExcel( '근무 결과 연계');
    },
    openModal: function(urlstr) {
      if(urlstr == 'LoadModal'){
        this.$refs.LoadWorkResultModal.show();
      }
    },
    isStatus: function (){
      this.isStatusOn = !this.isStatusOn;
      this.isStatusOnCancel= !this.isStatusOnCancel;
    },
    async getloadData() {

      try {
        let { data } = await this.$httpPost({
          param: {},
          url: '/payroll/code/pay-date/list'
        });
        this.setRealgridData(data.list || []);
      }
      catch(e) {
        console.error("WorkResult loadGridData err: ", e);
      }
    },
    async asyncData() {
      try {
        const {data} = await this.$store.dispatch('paymonth/getPayMonth');
        this.payMonth = data.PAY_MONTH;
        this.payMonthSeq = data.SEQ;
        this.payDate = data.PAY_DATE;
      } catch (e) {
        console.error("WorkResult asyncData err: ", e);
      }
    },
    realgridCreatedCallback: function() {
      let me = this;
      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getJsonRow(index.dataRow);
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
          me.$refs.UpdateWorkResultModal.show({
            EMP_NAM:_rowData[0].EMP_NAM,
            url:'update'
          });
          return true;
        }
      }
    },
  },

  mounted() {
    try {
      this.createRealGrid({'domId': 'work-grid'});
      this.asyncData();
      this.getloadData();

    }
    catch (e) {
      console.error("WorkResult mounted err: ", e);
    }
  }
}
</script>
