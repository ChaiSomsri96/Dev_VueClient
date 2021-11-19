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
                  퇴직연금 계산
                </button>
                <button class="btn btn-md mr-5" @click="deleteCalcSevPension">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직연금 조회 및 삭제
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pension-calc-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
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

export default {
  components: {
    SevPensionTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem
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
        { fieldName: 'SEV_MATTER_FLAG_NAME', dataType: 'text'}
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
        { fieldName: 'SEV_MATTER_FLAG_NAME', header: '상태', styleName: 'left-column'}
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
      let sevDate = me.searchDate;

      // me.gridView.setCheckBar({
      //   visible: true
      // });
      try {
        let {data} = await me.$httpPost({
          param: {SEV_DATE: sevDate},
          url: '/payroll/retirement/sev-pension/matter-list'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    validateCheckedStatus(){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({'EID': _rowData[0]['EID']});
      }
      return true;
    },

    calcSevPension: function(){
      let me = this;
      if(!me.validateCheckedStatus()) {
        return false;
      }
      me.$store.dispatch(
          'sevpension/setSevPensionMatter',
          {
            SEV_DATE: me.matterKeys.SEV_DATE,
            SEV_PENSION_SEQ: me.matterKeys.SEV_PENSION_SEQ,
            SEV_PENSION_MATTER_NAME: me.matterKeys.SEV_PENSION_MATTER_NAME,
            SEV_CONTROL_NO: me.matterKeys.SEV_CONTROL_NO
          });
      me.$router.push({name: 'SevPensionCalcMgt'});
    },

    deleteCalcSevPension: function (){
      let me = this;
      if(!me.validateCheckedStatus()) {
        return false;
      }
      me.$store.dispatch(
          'sevpension/setSevPensionMatter',
          {
            SEV_DATE: me.matterKeys.SEV_DATE,
            SEV_PENSION_SEQ: me.matterKeys.SEV_PENSION_SEQ,
            SEV_PENSION_MATTER_NAME: me.matterKeys.SEV_PENSION_MATTER_NAME,
            SEV_CONTROL_NO: me.matterKeys.SEV_CONTROL_NO
          });
      me.$router.push({name: 'SevPensionCalcDelete'});
    },

    realgridCreatedCallback: function () {
      let me = this;
      let val;
      let data;
      me.gridView.onCellClicked = function (grid, clickData) {
        val = me.dataProvider.getJsonRow(clickData.dataRow);
        data = val['ROW_ATTRS'];
        me.matterKeys.SEV_DATE = data.SEV_DATE;
        me.matterKeys.SEV_PENSION_SEQ = data.SEV_PENSION_SEQ;
        me.matterKeys.SEV_PENSION_MATTER_NAME = data.SEV_PENSION_MATTER_NAME;
        me.matterKeys.SEV_CONTROL_NO = data.SEV_CONTROL_NO;
      }
    },

    searchData: function() {

    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-calc-grid',
      'checkbar': 'single',
      editable: false
    });
    me.loadGridData();
  }
}
</script>