<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'대상자 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
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
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-row">
          <button class="btn btn-md flat" @click="openModal('LoadModal')"><i class="icon-lineIcon-plus mr-5"></i>불러오기</button>
          <button class="btn btn-md flat" @click="openModal('AddModal')"><i class="icon-lineIcon-plus mr-5"></i>추가</button>
          <button class="btn btn-md flat" @click="openModal('UploadModal')">업로드</button>
          <button ref="close_count" class="btn btn-md flat" ><i class="icon-lineIcon-plus mr-5"></i>집계마감</button>
          <button v-if="isStatusOn" ref="close_count_cancel" class="btn btn-md flat" ><i class="icon-lineIcon-plus mr-5"></i>집계마감 취소</button>
          <button class="btn btn-md flat" @click="download()"><i class="icon-lineIcon-download mr-5"></i>다운로드</button>
        </div>
      </div>
      <div class="row">
        <div id="subject-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>

      <load-modal ref="LoadModal" />
      <add-modal ref="AddModal" />
      <update-modal ref="UpdateModal" />
      <upload-modal ref="UploadModal" />
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import LoadModal from './LoadModal';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import UploadModal from "./UploadModal";
export default {
  mixins: [grid],
  components: {
    SalaryMonthsAndDates,
    LoadModal,
    AddModal,
    UpdateModal,
    UploadModal
  },
  data() {
    return {
      isStatusOn: false,
      payMonth: '',
      payMonthSeq: 0,
      payDate: '',
      columns: [
        { header: '이름', fieldName: 'EMP_NAM' },
        { header: {
            text: "인사정보 기준일",
            template: `<p>인사정보 기준일 </br><SMALL>GMT +08:00</SMALL></p>`
          }, fieldName: 'PAY_NAME' },
        { header: '부서', fieldName: 'HRDEPT_NAM'},
        { header: {
            text: "입사일",
            template: `<p>입사일 </br><SMALL>GMT +08:00</SMALL></p>`
          }, fieldName: 'E_JOIN_DATE' },
        { header: {
            text: "퇴사일",
            template: `<p>퇴사일 </br><SMALL>GMT +08:00</SMALL></p>`
          }, fieldName: 'RETIRE_DATE' },
        { header: '직급', fieldName: 'SEVP_FLAG' },
        { header: '직책', fieldName: 'AUTO_CALC' },
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 100}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 100})
      ],
      fields: [
        { fieldName: 'EMP_NAM', dataType: 'text' },
        { fieldName: 'PAY_NAME', dataType: 'text' },
        { fieldName: 'HRDEPT_NAM', dataType: 'text' },
        { fieldName: 'E_JOIN_DATE', dataType: 'text' },
        { fieldName: 'RETIRE_DATE', dataType: 'text' },
        { fieldName: 'SEVP_FLAG', dataType: 'text' },
        { fieldName: 'AUTO_CALC', dataType: 'text' },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs: ['EMP_NAM', 'E_JOIN_DATE','RETIRE_DATE']
    }
  },
  methods: {
    download: function() {
      this.downloadRealGridExcel( '급여코드 관리');
    },
    openModal: function(urlstr) {
      if(urlstr == 'LoadModal'){
        this.$refs.LoadModal.show();
      }else if(urlstr == 'AddModal'){
        this.$refs.AddModal.show();
      }else if(urlstr == 'UploadModal'){
        this.$refs.UploadModal.show();
      }
    },
    async getloadData() {
      this.gridView.columnByName("PAY_NAME").visible =  true;
      this.isStatusOn = !this.isStatusOn;
      try {
        let { data } = await this.$httpPost({
          param: {},
          url: '/payroll/salarymanual/emp_qry/list'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("SubjectManagement loadGridData err: ", e);
      }
    },
    async asyncData() {
      try {
        const {data} = await this.$store.dispatch('paymonth/getPayMonth');
        this.payMonth = data.PAY_MONTH;
        this.payMonthSeq = data.SEQ;
        this.payDate = data.PAY_DATE;
      } catch (e) {
        console.error("SubjectManagement asyncData err: ", e);
      }
    },
    realgridCreatedCallback: function() {
      let me = this;
      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);
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
          me.$refs.UpdateModal.show({
            EMP_NAM:_rowData[0].EMP_NAM,
            E_JOIN_DATE:_rowData[0].E_JOIN_DATE,
            RETIRE_DATE:_rowData[0].RETIRE_DATE,
            url:'update'
          });
          return true;
        }
      }
    },
  },
  async mounted() {
    try {
      await this.createRealGrid({'domId': 'subject-grid'});
      await this.asyncData();
      await this.getloadData();

    }
    catch (e) {
      console.error("SubjectManagement mounted err: ", e);
    }
  }
}
</script>

