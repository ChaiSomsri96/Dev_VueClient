<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'퇴직연금 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <sev-pension-tab></sev-pension-tab>

      <div class="box border-box type2">
        <border-box width="180" v-slot="slotProps" search>
          <border-box-item title="이름">
            <ui-input :value="EMP_NAME.value"
                           @change="EMP_NAME.value=$event;"/>
          </border-box-item>
          <border-box-item title="퇴직연금 적립대장 기록일" multi width="260">
            <ui-input-date :date="searchDate.from"
                           :max-date="searchDate.to"
                           :value="searchDate.from"
                           @change="searchDate.from=$event;" />
            <span>~</span>
            <ui-input-date :date="searchDate.to"
                           :min-date="searchDate.from"
                           :value="searchDate.to"
                           @change="searchDate.to=$event;" />
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
                <button class="btn btn-md mr-5" @click="downloadRealGridExcel()">
                  <i class="icon-lineIcon-download mr-5"></i>
                  다운로드
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pension-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
      EMP_NAME: '',
      searchDate:{
        to: '',
        from: '20210331'
      },
      fields: [
        //퇴직연금 계산 기준일, 차수, 내부관리 이름, 계산식 관리번호, 계산식 이름, 등록된 인원, 계산기간 시작일, 계산기간 종ㅛ일, 끝전, 3개월 급여시작일, 3개월 급여 종료일, 12개월 급여시작일, 12개월 급여종료일, 상태, 수정
        {fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'EMP_NAME', dataType: "text"},
        {fieldName: 'SEV_RPEN_SAVE_AMT', dataType: "number"},
        {fieldName: 'SEV_RPEN_INPUT_TYPE', dataType: "text"},
        {fieldName: 'E_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        {fieldName: 'SERVICE_YEAR', dataType: 'text'},
        {fieldName: 'HRDEPT_NAMK', dataType: "text"},
        {fieldName: 'RANK_NAME', dataType: "text"},
        {fieldName: 'EMPTYPE_NAME', dataType: "text"},
        {fieldName: 'PAYTYPE_NAME', dataType: "text"},
        {fieldName: 'RETIREBASE_DT', dataType: "datetime", datetimeFormat: "yyyyMMdd"}
      ],
      columns: [
        {fieldName: 'SEV_DATE', header: '적립대장 기록일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
        {fieldName: 'SEV_RPEN_SAVE_AMT', header: '퇴직연금 적립액', numberFormat: '#,##0', styleName: 'right-column',
          footer: {
            text: '0',
            expression: 'sum',
            numberFormat: '#,##0',
          }
        },
        { fieldName: 'SEV_RPEN_INPUT_TYPE', header: '입력방법', styleName: 'left-column',
          displayCallback: function(grid, index, value) {
            switch (value) {
              case 'A':
                return '자동';
              case 'M':
                return '수동';
              default:
                return '';
            }
          }
        },
        {fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        {fieldName: 'SERVICE_YEAR', header: '근속연수', styleName: 'left-column'},
        {fieldName: 'HRDEPT_NAMK', header: '부서', styleName: 'left-column'},
        {fieldName: 'RANK_NAME', header: '직급', styleName: 'left-column'},
        {fieldName: 'EMPTYPE_NAME', header: '직원구분', styleName: 'left-column'},
        {fieldName: 'PAYTYPE_NAME', header: '임금유형', styleName: 'left-column'},
        {fieldName: 'RETIREBASE_DT', header: '중간정산일', datetimeFormat: 'yyyy.MM.dd'}
      ]
    }
  },
  methods: {
    async loadGridData() {
      let me = this;
      let sevDate = me.searchDate.from;
      try {
        let {data} = await me.$httpPost({
          param: {SEV_DATE: sevDate},
          url: '/payroll/retirement/sev-pension/save-list'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    searchData: function () {
      let me = this;
      me.loadGridData();
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>