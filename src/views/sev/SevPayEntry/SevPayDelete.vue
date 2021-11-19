<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'퇴직금 입력'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <sev-pay-entry-tab></sev-pay-entry-tab>
      <div>
        <div class="box border-box type2">
          <border-box width="260" v-slot="slotProps">
            <border-box-item title="종류" :width="slotProps.width">
              <ui-dropdown :items="retireType.items"
                           :value="retireType.value"
                           @change="retireType.value=$event.value; retireType.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
            </border-box-item>
            <border-box-item title="일자" multi :width="slotProps.width" id="dateFieldName">
              <ui-dropdown :items="DATE_TYPE_GRP.items"
                           :value="DATE_TYPE_GRP.value"
                           @change="DATE_TYPE_GRP.value=$event.value; DATE_TYPE_GRP.return=$event;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
              <ui-input-date :date="sendDateScope.from"
                             @change="sendDateScope.from=$event;" />
              <span>~</span>
              <ui-input-date :date="sendDateScope.to"
                             @change="sendDateScope.to=$event;" />
            </border-box-item>
            <border-box-item button>
              <button type="button" id="btnSearch" class="btn btn-md line-1"
                      @click="searchData()">
                <span>검색</span>
              </button>
            </border-box-item>
          </border-box>
          <div class="row">
            <div class="form-row">
              <button-panel
                  btnType='top'
              >
                <template v-slot:start>
                  <button class="btn btn-md mr-5" @click="retireTaxDelete">
                    <i class="icon-lineIcon-check mr-5"></i>
                    퇴직소득세 삭제
                  </button>
                  <button class="btn btn-md mr-5" @click="retireAmtTaxDelete">
                    <i class="icon-lineIcon-check mr-5"></i>
                    퇴직금 및 퇴직소득세 삭제
                  </button>
                </template>
              </button-panel>
            </div>
          </div>
          <div>
            <div id="sev-pay-entry-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import SevPayEntryTab from "./SevPayEntryTab";


export default {
  components: {
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    SevPayEntryTab
  },
  mixins: [grid],
  data() {
    return {
      checkedMembers: [],
      checkedData: {
        RETIRE_TYPE: '',
        SEV_CONTROL_NO: ''
      },
      DATE_TYPE_GRP: {
        isRequired: true,
        validMsg: '일자를 선택해주세요.',
        value: 'RETIRE',
        return: null,
        items: [
          { 'message': '퇴직(중간정산)일자', 'code': 'RETIRE'},
          { 'message': '지급일자', 'code': 'PAY'}
        ]
      },
      retireType: {
        value:'SEV',
        return: null,
        items: [
          { 'message': '최종퇴직금', 'code': 'SEV'},
          { 'message': '퇴직금 중간정산', 'code': 'INTER'},
          { 'message': '퇴직급여 추계액', 'code': 'DOPEN'}
        ]
      },
      selCode:{
        EMP_NAME: ''
      },
      sendDateScope:{
        'from': '20210101',
        'to': '20211231'
      },
      fields: [
        { fieldName: 'EID', dataType: 'text' },
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'SEV_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_PAYMENT_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_INTER_AMT', dataType: 'number'},
        { fieldName: 'SEV_INTER_TAX', dataType: 'number'},
        { fieldName: 'SEV_REAL_SVC_YR', dataType: 'number'},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: 'number'},
        { fieldName: 'SEV_IRP_SV_TYPE', dataType: 'text'},
        { fieldName: 'SEV_IRP_SV_AMT', dataType: 'number'},
        { fieldName: 'SEV_TAX', dataType: 'number'},
        { fieldName: 'SEV_RESIDENT_TAX', dataType: 'number'},
        { fieldName: 'SEV_TAX_OFF', dataType: 'number'},
        { fieldName: 'SEV_RESIDENT_TAX_OFF', dataType: 'number'}
      ],
      columns:[
        { fieldName: 'EID', header: '', visible: false },
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
        { fieldName: 'SEV_DATE', header: '퇴직일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_PAYMENT_DATE', header: '퇴직금 지급일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_INTER_AMT', header: '퇴직금 지급정산액', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_INTER_TAX', header: '퇴직금 중간정산 세액', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_REAL_SVC_YR', header: '정산근속연수', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_IRP_SV_TYPE', header: 'IRP입금시기', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            switch (value) {
              case 'A':
                return '사전입금';
              case 'B':
                return '사후입금';
              default:
                return '';
            }
          }
        },
        { fieldName: 'SEV_IRP_SV_AMT', header: 'IRP입금액', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_TAX', header: '소득세', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_RESIDENT_TAX', header: '지방소득세', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_TAX_OFF', header: '소득세(절사액)', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_RESIDENT_TAX_OFF', header: '지방소득세(절사액)', styleName: 'right-column', numberFormat: '#,##0'},
      ],
      rowAttrs: ['EID', 'SEV_DATE', 'SEV_TYPE']
    }
  },

  methods:{
    validateCheckedStatus() {
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];

      let sameDate = false;
      let dateCheck = '';
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({'EID': _rowData[0]['EID'], 'SEV_DATE': _rowData[0]['SEV_DATE'], 'SEV_TYPE': _rowData[0]['SEV_TYPE']});
      }
      this.checkedMembers = Object.freeze(__checkedData);
      return true;
    },

    retireTaxDelete(){
      let me = this;
      me.validateCheckedStatus();
      let data = me.checkedMembers;
      me.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: function() {
          me.$httpPostBody({
            param: {
              list: data
            },
            url: '/payroll/multiretirement/sev-tax/delete',
            callback: function() {
              me.toastSuccessDelete();
              me.loadGridData();
            }
          });
        }
      });
    },

    retireAmtTaxDelete(){
      let me = this;
      me.validateCheckedStatus();
      let data = me.checkedMembers;
      me.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: function() {
          me.$httpPostBody({
            param: {
              list: data
            },
            url: '/payroll/multiretirement/sev-amt-tax/delete',
            callback: function() {
              me.toastSuccessDelete();
              me.loadGridData();
            }
          });
        }
      });
    },

    onSearch: function(){

    },

    insertPayday: function(){

    },

    async loadGridData() {
      let me = this;
      let retireType = me.retireType.value;
      let retireOrgDateFrom = me.sendDateScope.from;
      let retireOrgDate = me.sendDateScope.to;
      let dayType = me.DATE_TYPE_GRP.value;
      me.gridView.setCheckBar({
        visible: true
      });
      try {
        let { data } = await me.$httpPost({
          param: {
            DEL_SEV_AMT_TYPE: retireType, REPORT_TYPE: 'BY_EMP', DATE_TYPE: dayType, DATE_FROM: retireOrgDateFrom, DATE_TO: retireOrgDate, SORTBY: 'EMP_NUMBER'
          },
          url: '/payroll/retirement/pay-report'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    addRealGridOption() {
      this.gridView.setStateBar({
        visible: false
      });
    },

    searchData: async function(){
      let me = this;
      let retireType = me.retireType.value;
      let retireOrgDateFrom = me.sendDateScope.from;
      let retireOrgDate = me.sendDateScope.to;
      let dayType = me.DATE_TYPE_GRP.value;
      me.gridView.setCheckBar({
        visible: true
      });
      try {
        let { data } = await me.$httpPost({
          param: { DEL_SEV_AMT_TYPE: retireType, REPORT_TYPE: 'BY_EMP', DATE_TYPE: dayType, DATE_FROM: retireOrgDateFrom, DATE_TO: retireOrgDate, SORTBY: 'EMP_NUMBER'},
          url: '/payroll/retirement/pay-report'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    realgridCreatedCallback: function() {
      let me = this;
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
          me.$refs.RetireInputModal.show({EMP_NAM: _rowData[0].EMP_NAM,
            E_JOIN_DATE: _rowData[0].E_JOIN_DATE,
            VALID_JOIN_DATE: _rowData[0].VALID_JOIN_DATE,
            RETIREBASE_DT: _rowData[0].RETIREBASE_DT,
            RETIRE_DATE: _rowData[0].RETIRE_DATE,
            SERVICE_YEAR: _rowData[0].SERVICE_YEAR,
            SEV_REAL_FINAL_AMT: _rowData[0].SEV_REAL_FINAL_AMT,
            RETIRE_TYPE: me.retireType.value
            // url:'/payroll/code/pay-date/update'
          });
          return true;
        }
      }
    },
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pay-entry-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}

</script>
