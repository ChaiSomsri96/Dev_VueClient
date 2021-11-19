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
                           :value="searchDate.value"
                           @change="searchDate.value=$event;"/>
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
                <button class="btn btn-md mr-5" @click="saveSevPensionMatter">
                  <i class="icon-lineIcon-check mr-5"></i>
                  내부관리 등록
                </button>
                <button class="btn btn-md mr-5" @click="searchTargetEmp">
                  <i class="icon-lineIcon-check mr-5"></i>
                  대상자 조회
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pension-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
        <sev-pension-matter-emp-modal ref="SevPensionMatterEmpModal" :options="{checkedMembers: checkedMembers}"></sev-pension-matter-emp-modal>
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
import SevPensionMatterEmpModal from './SevPensionMatterEmpModal'

export default {
  components: {
    SevPensionTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    SevPensionMatterEmpModal
  },
  mixins: [grid],
  data() {
    return {
      checkedMembers:[],
      searchDate: {
        value: ''
      },
      fields: [
        //퇴직연금 계산 기준일, 차수, 내부관리 이름, 계산식 관리번호, 계산식 이름, 등록된 인원, 계산기간 시작일, 계산기간 종ㅛ일, 끝전, 3개월 급여시작일, 3개월 급여 종료일, 12개월 급여시작일, 12개월 급여종료일, 상태, 수정
        {fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_PENSION_SEQ', dataType: "number"},
        {fieldName: 'SEV_PENSION_MATTER_NAME', dataType: "text"},
        {fieldName: 'SEV_CONTROL_NO', dataType: "text"},
        {fieldName: 'SEV_CONTROL_TITLE', dataType: "text"},
        {fieldName: 'ENROLL_EMP', dataType: 'number'},
        {fieldName: 'SEV_PENSION_START', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_PENSION_END', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'FINAL_SAL_FROM', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'FINAL_SAL_TL', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'FINAL_BONUS_FROM', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'FINAL_BONUS_TO', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SEV_MATTER_FLAG_NAME', dataType: 'text'},
        {fieldName: 'UPDATE', header: "수정"},
        {fieldName: 'DELETE', header: "삭제"}
      ],
      columns: [
        {fieldName: 'SEV_DATE', header: '퇴직연금 계산 기준일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_PENSION_SEQ', header: '차수', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'SEV_PENSION_MATTER_NAME', header: '내부관리 이름', styleName: 'left-column'},
        {fieldName: 'SEV_CONTROL_NO', header: '계산식 관리번호', styleName: 'left-column'},
        {fieldName: 'SEV_CONTROL_TITLE', header: '계산식 이름', styleName: 'left-column'},
        {fieldName: 'ENROLL_EMP', header: '등록된 인원', styleName: 'right-column', numberFormat: '#,##0'},
        {fieldName: 'SEV_PENSION_START', header: '계산기간 시작일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_PENSION_END', header: '계산기간 종료일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'FINAL_SAL_FROM', header: '3개월 급여시작일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'FINAL_SAL_TL', header: '3개월 급여종료일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'FINAL_BONUS_FROM', header: '12개월 급여시작일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'FINAL_BONUS_TO', header: '12개월 급여종료일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SEV_MATTER_FLAG_NAME', header: '상태', styleName: 'left-column'},
        this.getUpdateColumn({headerText: '수정', fieldName: 'UPDATE', columnWidth: 70}),
        this.getDeleteColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70})
      ],
      rowAttrs: [
        'SEV_DATE', 'SEV_PENSION_SEQ', 'SEV_PENSION_MATTER_NAME', 'SEV_CONTROL_NO', 'SEV_PENSION_START', 'SEV_PENSION_END', 'FINAL_SAL_FROM', 'FINAL_SAL_TL'
        , 'FINAL_BONUS_FROM', 'FINAL_BONUS_TO', 'SEV_MATTER_FLAG_NAME', 'PERIOD_BASIS', 'PERIOD_SIZE', 'SEV_MATTER_FLAG', 'LAST_DIGIT_FLAG', 'SEV_PENSION_MATTER_NOTE'
      ]
    }
  },
  methods: {
    async loadGridData() {
      let me = this;
      let sevDate = me.searchDate.value;
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

    searchData: function () {
      let me = this;
      me.loadGridData();
    },

    saveSevPensionMatter: function () {
      let me = this;
      me.$store.dispatch(
          'sevpension/setSevPensionMatter',
          {
            SEV_DATE: '',
            SEV_PENSION_SEQ: '',
            SEV_PENSION_MATTER_NAME: '',
            SEV_CONTROL_NO: '',
            SEV_PENSION_START: '',
            SEV_PENSION_END: '',
            FINAL_SAL_FROM: '',
            FINAL_SAL_TL: '',
            FINAL_BONUS_FROM: '',
            FINAL_BONUS_TO: '',
            SEV_MATTER_FLAG_NAME: '',
            PERIOD_BASIS:'',
            PERIOD_SIZE: '',
            SEV_MATTER_FLAG: '',
            LAST_DIGIT_FLAG: '',
            SEV_PENSION_MATTER_NOTE: '',
            CREATE: 'Y'
          });
      me.$router.push({name: 'SevPensionMatterMgt'});
    },

    async searchTargetEmp() {
      let me = this;
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        me.toast({message: me.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({ SEV_DATE: _rowData[0].SEV_DATE, SEV_PENSION_SEQ: _rowData[0].SEV_PENSION_SEQ});
      }

      // 2021.08.16 현재는 하나의 메터만 찾지만 여러개 매터 찾도록 수정하기
      let {data} = await me.$httpPost({
        param: {SEV_DATE: __checkedData[0]['SEV_DATE'], SEV_PENSION_SEQ: __checkedData[0]['SEV_PENSION_SEQ']},
        url: '/payroll/retirement/find/sev-pension/target-list'
      });
      me.checkedData = data;
      me.$refs.SevPensionMatterEmpModal.show({checkedMembers: data});

    },

    realgridCreatedCallback: function () {
      let me = this;
      let val;
      let data;

      me.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == "UPDATE") {
          val = me.dataProvider.getJsonRow(clickData.dataRow);
          data = val['ROW_ATTRS'];
          me.$store.dispatch(
              'sevpension/setSevPensionMatter',
              {
                SEV_DATE: data['SEV_DATE'],
                SEV_PENSION_SEQ: data['SEV_PENSION_SEQ'],
                SEV_PENSION_MATTER_NAME: data['SEV_PENSION_MATTER_NAME'],
                SEV_CONTROL_NO: data['SEV_CONTROL_NO'],
                SEV_PENSION_START: data['SEV_PENSION_START'],
                SEV_PENSION_END: data['SEV_PENSION_END'],
                FINAL_SAL_FROM: data['FINAL_SAL_FROM'],
                FINAL_SAL_TL: data['FINAL_SAL_TL'],
                FINAL_BONUS_FROM: data['FINAL_BONUS_FROM'],
                FINAL_BONUS_TO: data['FINAL_BONUS_TO'],
                SEV_MATTER_FLAG_NAME: data['SEV_MATTER_FLAG_NAME'],
                PERIOD_BASIS: data['PERIOD_BASIS'],
                PERIOD_SIZE: data['PERIOD_SIZE'],
                SEV_MATTER_FLAG: data['SEV_MATTER_FLAG'],
                LAST_DIGIT_FLAG: data['LAST_DIGIT_FLAG'],
                SEV_PENSION_MATTER_NOTE: data['SEV_PENSION_MATTER_NOTE'],
                CREATE: 'N'
              });
          me.$router.push({name: 'SevPensionMatterMgt'});
        }
      };
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-grid',
      'checkbar': 'single',
      editable: false
    });
    me.loadGridData();
  }
}
</script>