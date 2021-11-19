<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'퇴직연금 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <sev-pension-tab></sev-pension-tab>

      <div class="box border-box type2">
        <border-box width="200" search>
          <border-box-item title="기준일">
            <ui-input-date :date="searchDate.value"
                           @change="searchDate.value=$event;" />
          </border-box-item>
          <border-box-item button>
            <button type="button" id="btnSearch" class="btn btn-md line-1"
                    @click="searchData">
              <span>검색</span>
            </button>
          </border-box-item>
        </border-box>
        <div class="row">
          <div class="form-row">
            <button-panel btnType='top'>
              <template v-slot:start>
                <button class="btn btn-md mr-5" @click="calcSevPension">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직연금 적립대장 기록
                </button>
                <button class="btn btn-md mr-5" @click="deleteCalcSevPension">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직연금 적립대장 삭제
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pension-saving-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
        <sev-pension-saving-modal ref="SevPensionSavingModal"/>
        <sev-pension-record-delete-modal ref="SevPensionRecordDeleteModal"/>
      </div>
    </div>
  </div>
</template>
<script>
import SevPensionTab from "./SevPensionTab";
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import SevPensionSavingModal from './SevPensionSavingModal';
import SevPensionRecordDeleteModal from './SevPensionRecordDeleteModal';

export default {
  components: {
    SevPensionTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    SevPensionSavingModal,
    SevPensionRecordDeleteModal
  },
  mixins: [grid],
  data() {
    return {
      searchDate: '',
      matterKeys: {
        SEV_DATE: '',
        SEV_PENSION_SEQ: '',
        SEV_PENSION_MATTER_NAME: '',
        SEV_CONTROL_NO: ''
      },
      fields: [
        //퇴직연금 계산 기준일, 차수, 내부관리 이름, 계산식 관리번호, 계산식 이름, 등록된 인원, 계산기간 시작일, 계산기간 종ㅛ일, 끝전, 3개월 급여시작일, 3개월 급여 종료일, 12개월 급여시작일, 12개월 급여종료일, 상태, 수정
        { fieldName: 'SEV_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_PENSION_SEQ', dataType: "text"},
        { fieldName: 'SEV_PENSION_MATTER_NAME', dataType: "text"},
        { fieldName: 'SEV_CONTROL_NO', dataType: "text"},
        { fieldName: 'SEV_CONTROL_TITLE', dataType: "text"},
        { fieldName: 'ENROLL_EMP', dataType: 'number'},
        { fieldName: 'SEV_PENSION_START', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_PENSION_END', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'FINAL_SAL_FROM', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'FINAL_SAL_TL', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'FINAL_BONUS_FROM', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'FINAL_BONUS_TO', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_MATTER_FLAG', dataType: 'text'},
        { fieldName: 'SEV_SAVE_DATE', dataType: 'text'}
      ],
      columns: [
        { fieldName: 'SEV_DATE', header: '퇴직연금 계산 기준일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_PENSION_SEQ', header: '차수', styleName: 'right-column'},
        { fieldName: 'SEV_PENSION_MATTER_NAME', header: '내부관리 이름', styleName: 'left-column'},
        { fieldName: 'SEV_CONTROL_NO', header: '계산식 관리번호', styleName: 'left-column'},
        { fieldName: 'SEV_CONTROL_TITLE', header: '계산식 이름', styleName: 'left-column'},
        { fieldName: 'SEV_PENSION_START', header: '계산기간 시작일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_PENSION_END', header: '계산기간 종료일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'ENROLL_EMP', header: '등록된 인원', styleName: 'right-column'},
        { fieldName: 'FINAL_SAL_FROM', header: '3개월 급여시작일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'FINAL_SAL_TL', header: '3개월 급여종료일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'FINAL_BONUS_FROM', header: '12개월 급여시작일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'FINAL_BONUS_TO', header: '12개월 급여종료일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_MATTER_FLAG', header: '상태', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            switch (value) {
              case 'O':
                return '오픈';
              case 'C':
                return '마감';
              default:
                return '';
            }
          }
        },
        { fieldName: 'SEV_SAVE_DATE', header: '기록상태', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            let val = value == null ? value: value.trim();
            if (!val || val === '') {
              return '기록안됨';
            } else {
              return '기록됨';
            }
          }
        }
      ],
      rowAttrs: [
        'SEV_DATE', 'SEV_PENSION_SEQ', 'SEV_PENSION_MATTER_NAME', 'SEV_CONTROL_NO', 'SEV_PENSION_START', 'SEV_PENSION_END', 'FINAL_SAL_FROM', 'FINAL_SAL_TL'
        , 'FINAL_BONUS_FROM', 'FINAL_BONUS_TO', 'SEV_MATTER_FLAG_NAME', 'PERIOD_BASIS', 'PERIOD_SIZE', 'SEV_MATTER_FLAG', 'LAST_DIGIT_FLAG', 'SEV_PENSION_MATTER_NOTE'
      ]
    }
  },

  methods:{
    async loadGridData() {
      let me = this;
      // me.gridView.setCheckBar({
      //   visible: true
      // });
      try {
        let {data} = await me.$httpPost({
          param: {}, //{SAVE_RECORD: 'Y', SEV_MATTER_FLAG: 'C'},
          url: '/payroll/retirement/sev-pension/matter-list'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    calcSevPension: function(){
      let me = this;
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: me.messages['mustAtLeastOnePayMonthSelect'], type:"error"});
        return;
      }

      let bCheck = false;
      let bCheck2 = false;
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = me.dataProvider.getJsonRow( checkedRows[i]);
        if( _rowData['SEV_MATTER_FLAG'] !== 'C') {
          bCheck = true;
        }

        let val = _rowData['SEV_SAVE_DATE'] == null ? _rowData['SEV_SAVE_DATE']: _rowData['SEV_SAVE_DATE'].trim();
        if (val && val !== '') {
          bCheck2 = true;
        }

        let year = _rowData.SEV_DATE.getFullYear();
        let month = (_rowData.SEV_DATE.getMonth()+1) >10 ? _rowData.SEV_DATE.getMonth()+1: '0'+(_rowData.SEV_DATE.getMonth()+1);
        let date = _rowData.SEV_DATE.getDate() > 10 ? _rowData.SEV_DATE.getDate() : '0'+_rowData.SEV_DATE.getDate();
        __checkedData.push({ 'SEV_DATE': year+month+date, 'SEV_PENSION_SEQ': _rowData['SEV_PENSION_SEQ'] });
      }
      if( bCheck){
        this.toast({message: '적립대장은 퇴직연금이 마감된 후에 기록 할 수 있습니다.', type:"error"});
        return false;
      }
      if( bCheck2) {
        this.toast({message: '기록된 퇴직연금 적립대장은 삭제 한 후 다시 기록해야 됩니다.', type:"error"});
        return false;
      }
      this.$refs.SevPensionSavingModal.show({ sevPensionList: __checkedData});
    },

    deleteCalcSevPension: function (){
      let me = this;
      this.$refs.SevPensionRecordDeleteModal.show();
    },


    searchData: function() {

    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-saving-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>