<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'세액 계산'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <div>
            <div class="box border-box type2">
              <border-box width="200" search>
                <border-box-item title="연도">
                  <ui-input :value="searchYear.value" @change="searchYear.value=$event;"/>
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
                  <button-panel btnType='top'>
                    <template v-slot:start>
                      <button class="btn btn-md mr-5" @click="retireCalc">
                        <i class="icon-lineIcon-check mr-5"></i>
                        세액 계산
                      </button>
                    </template>
                  </button-panel>
                </div>
              </div>
              <div>
                <div id="sev-pay-calc-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
              </div>
            </div>
          </div>
          <sev-tax-irp-input-modal ref="SevTaxIrpInputModal"  />
          <sev-tax-inter-input-modal ref="SevTaxInterInputModal" />
          <sev-tax-calc-modal ref="SevTaxCalcModal" />
          <sev-tax-except-month ref="SevTaxExceptMonth" />
        </div>
    </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import SevTaxIrpInputModal from '@/components/retire/SevTaxIrpInputModal';
import SevTaxInterInputModal from '@/components/retire/SevTaxInterInputModal';
import SevTaxCalcModal from './SevTaxCalcModal';
import SevTaxExceptMonth from "@/components/retire/SevTaxExceptMonth";

export default {
  components:{
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    SevTaxIrpInputModal,
    SevTaxInterInputModal,
    SevTaxCalcModal,
    SevTaxExceptMonth
  },
  mixins: [grid],
  data() {
    return {
      checkedMembers: [],
      searchYear: {
        value: ''
      },
      fields: [
        { fieldName: 'SEV_TYPE', dataType: 'text'},
        { fieldName: 'SEV_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: 'number'},
        { fieldName: 'SEV_TAX_DEDUCT', dataType: 'number'},
        { fieldName: 'SEV_START_DATE_OVERRIDE', dataType: 'text'},
        { fieldName: 'SEV_IRP_SV_AMT', dataType: 'number'},
        { fieldName: 'SEV_INTER_AMT', dataType: 'number'},
        { fieldName: 'UPDATE3', header: "제외월수 등" },
        { fieldName: 'UPDATE2', header: "IRP 입금액" },
        { fieldName: 'UPDATE', header: "합산대상 퇴직금" },
        { fieldName: 'DELETE', header: "삭제" },
        { fieldName: 'SEV_IRP_SV_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"}, // 입금일자
        { fieldName: 'SEV_IRP_SV_TYPE', dataType: 'text'}, // 입금시기
        { fieldName: 'SEV_IRP_COMP_NAME', dataType: 'text'}, // 연금사업자명
        { fieldName: 'SEV_IRP_COMP_VATID', dataType: 'text'}, // 사업자번호
        { fieldName: 'SEV_IRP_AC_NO', dataType: 'text'},  // 계좌번호

        { fieldName: 'SEV_INTER_TAX', dataType: 'number'}, // 퇴직소득세
        { fieldName: 'SEV_INTER_C_VATID', dataType: 'text'}, // 사업자번호
        { fieldName: 'SEV_INTER_C_NAME', dataType: 'text'}, // 사업장명
        { fieldName: 'SEV_INTER_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"}, // 중간지급 입사일
        { fieldName: 'SEV_INTER_START_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"}, // 중간지급 기산일
        { fieldName: 'SEV_INTER_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"}, // 중간지급 퇴사일
        { fieldName: 'SEV_INTER_PAYMENT_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"}, // 중간지급 지급일
        { fieldName: 'EID', dataType: 'text'} // 고유번호
      ],
      columns:[
        { fieldName: 'SEV_TYPE', header: '종류', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            switch ( value){
              case 'S': return '최종퇴직금';
              case 'I': return '퇴직금 중간정산';
              case 'A': return '퇴직급여 추계액';
              default: return '';
            }
          },
        },
        { fieldName: 'SEV_DATE', header: '퇴직일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
        { fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', styleName: 'right-column', numberFormat: '#,##0'},
        // { fieldName: 'RETIRE_DATE', header: '대상퇴직 소득세'},
        // { fieldName: 'SERVICE_YEAR', header: "이연퇴직 소득세"},
        // { fieldName: 'SEV_REAL_FINAL_AMT', header: '정수퇴직 소득세'},
        { fieldName: 'SEV_TAX_DEDUCT', header: '세액공제', styleName: 'right-column', numberFormat: '#,##0'},
        // { fieldName: 'RETIRE_TAX_CHECK', header: 'DB형 가입일'},
        // { fieldName: 'RETIRE_TAX_CHECK', header: '제외일수'},
        // { fieldName: 'RETIRE_TAX_CHECK', header: '가산일수'},
        { fieldName: 'SEV_START_DATE_OVERRIDE', header: '조정된 가산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_IRP_SV_AMT', header: 'IRP 입금액', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'SEV_INTER_AMT', header: '합산대상 퇴직금', styleName: 'right-column', numberFormat: '#,##0'},
        this.getUpdateColumn({headerText: '제외월수 등', fieldName: 'UPDATE3', columnWidth: 70}),
        this.getUpdateColumn({headerText: 'IRP 입금액', fieldName: 'UPDATE2', columnWidth: 70}),
        this.getUpdateColumn({headerText: '합산대상 퇴직금', fieldName: 'UPDATE', columnWidth: 70})

      ],
      rowAttrs: [
        'SEV_TYPE', 'SEV_DATE', 'EMP_NAME', 'SEV_IRP_SV_DATE', 'SEV_IRP_SV_TYPE', 'SEV_IRP_COMP_NAME', 'SEV_IRP_COMP_VATID', 'SEV_IRP_AC_NO'
          , 'SEV_INTER_AMT','SEV_INTER_TAX','SEV_INTER_C_VATID','SEV_INTER_C_NAME','SEV_INTER_JOIN_DATE','SEV_INTER_START_DATE','SEV_INTER_DATE','SEV_INTER_PAYMENT_DATE'
          , 'EID', 'EMP_NUMBER', 'DV_VATID', 'RETIRE_REASON', 'SEV_TAX'
          , 'SEV_PAYMENT_DATE', 'SEV_REAL_REASON', 'SEV_REAL_SVC_YR', 'SEV_REAL_AVE_SAL_MON', 'SEV_REAL_AVE_SAL_DAY', 'SEV_REAL_CALC_AMT', 'SEV_REAL_ADJ_AMT', 'SEV_REAL_FINAL_AMT'
          , 'SEV_REAL_ADJ_REM', 'SEV_IRP_SV_AMT', 'SEV_RESIDENT_TAX', 'SEV_REAL_DC_JOIN_DATE', 'SEV_REAL_EXCL_MON_B12', 'SEV_REAL_EXCL_MON_A13', 'SEV_REAL_INCL_MON_B12', 'SEV_REAL_INCL_MON_A13'
          , 'SEV_INTER_EXCL_MON_B12', 'SEV_INTER_EXCL_MON_A13', 'SEV_INTER_INCL_MON_B12', 'SEV_INTER_INCL_MON_A13', 'SEV_START_DATE_OVERRIDE', 'SEV_INDEM_SAVING', 'SEV_TAX_DEDUCT'
          , 'SEV_JOIN_DATE', 'SEV_JOIN_DESIG_DATE', 'SEV_INTERIM_DATE', 'SEV_START_DATE', 'SEV_SERVICE_CALC_DAYS', 'SEV_OFF_DAYS', 'SEV_SERVICE_CALC_MONS', 'SEV_SERVICE_CALC_YEARS'
          , 'SEV_SERVICE_YMD_YEAR', 'SEV_SERVICE_YMD_MON', 'SEV_SERVICE_YMD_DAY', 'SEV_ONE_YR_MAN', 'SEV_SERVICE_ADD_DAYS', 'SEV_SERVICE_MULTI_RATE', 'SEV_SERVICE_DEEM_DAYS', 'SEV_SERVICE_DEEM_MONS'
          , 'SEV_SERVICE_DEEM_YEARS', 'SEV_SERVICE_APP_YEAR', 'SVC_PER_METHOD', 'SEV_PROG_EQUATION', 'SEV_PROG_TYPE', 'MONTH_3_START', 'MONTH_12_START'
      ]
    }
  },

  methods: {
    async loadGridData() {
      let me = this;
      let searchYear = me.searchYear.value;
      try {
        let { data } = await me.$httpPost({
          param: { YEAR_VALUE: searchYear},
          url: '/payroll/retirement/sev-tax/target'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("sevTaxCalc loadGridData err: ", e);
      }
    },

    searchData() {
      let me = this;
      me.loadGridData();
    },

    async retireCalc() {
      let me = this;
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push(_rowData[0]);
      }
      let {data} = await this.$httpPost({
        url: '/payroll/retirement/sev-tax/calc',
        param: {
          'EID_LIST': JSON.stringify( __checkedData)
        },
        callback: function() {
          me.toastSuccessSave();
          me.searchData();
        }
      });
      me.$refs.SevTaxCalcModal.show({checkedMembers: data});
    },

    realgridCreatedCallback: function() {
      let me = this;
      this.gridView.onCellItemClicked = function (grid, index) {
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);
        if (!(Array.isArray(_rowData) && _rowData.length > 0))
          return false;
        if (index.column == "IRP 입금액") {
          me.$refs.SevTaxIrpInputModal.show({
            SEV_TYPE: _rowData[0].SEV_TYPE,
            SEV_DATE: _rowData[0].SEV_DATE,
            EMP_NAME: _rowData[0].EMP_NAME,
            SEV_IRP_SV_DATE: _rowData[0].SEV_IRP_SV_DATE,
            SEV_IRP_SV_TYPE: _rowData[0].SEV_IRP_SV_TYPE,
            SEV_IRP_COMP_NAME: _rowData[0].SEV_IRP_COMP_NAME,
            SEV_IRP_COMP_VATID: _rowData[0].SEV_IRP_COMP_VATID,
            SEV_IRP_AC_NO: _rowData[0].SEV_IRP_AC_NO,
            // url:'/payroll/code/pay-date/update'
          });
          return true;
        }
        // 'SEV_INTER_AMT','SEV_INTER_TAX','SEV_INTER_C_VATID','SEV_INTER_C_NAME','SEV_INTER_JOIN_DATE','SEV_INTER_START_DATE','SEV_INTER_DATE','SEV_INTER_PAYMENT_DATE'
        if (index.column == "합산대상 퇴직금") {
          me.$refs.SevTaxInterInputModal.show({
            EMP_NAME: _rowData[0].EMP_NAME,
            SEV_INTER_AMT: _rowData[0].SEV_INTER_AMT,
            SEV_INTER_TAX: _rowData[0].SEV_INTER_TAX,
            SEV_INTER_C_VATID: _rowData[0].SEV_INTER_C_VATID,
            SEV_INTER_C_NAME: _rowData[0].SEV_INTER_C_NAME,
            SEV_INTER_JOIN_DATE: _rowData[0].SEV_INTER_JOIN_DATE,
            SEV_INTER_START_DATE: _rowData[0].SEV_INTER_START_DATE,
            SEV_INTER_DATE: _rowData[0].SEV_INTER_DATE,
            SEV_INTER_PAYMENT_DATE: _rowData[0].SEV_INTER_PAYMENT_DATE,
            EID: _rowData[0].EID,
            SEV_DATE: _rowData[0].SEV_DATE,
            SEV_TYPE: _rowData[0].SEV_TYPE
            // url:'/payroll/code/pay-date/update'
          });
        }
        //
        if (index.column == "제외월수 등") {
          me.$refs.SevTaxExceptMonth.show({
            EMP_NAME: _rowData[0].EMP_NAME,
            SEV_START_DATE_OVERRIDE: _rowData[0].SEV_START_DATE_OVERRIDE,
            SEV_REAL_DC_JOIN_DATE: _rowData[0].SEV_REAL_DC_JOIN_DATE,
            SEV_REAL_EXCL_MON_A13: _rowData[0].SEV_REAL_EXCL_MON_A13,
            SEV_REAL_INCL_MON_A13: _rowData[0].SEV_REAL_INCL_MON_A13,
            SEV_TAX_DEDUCT: _rowData[0].SEV_TAX_DEDUCT,
            EID: _rowData[0].EID,
            SEV_DATE: _rowData[0].SEV_DATE,
            SEV_TYPE: _rowData[0].SEV_TYPE
            // url:'/payroll/code/pay-date/update'
          });
        }
      }
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pay-calc-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>
