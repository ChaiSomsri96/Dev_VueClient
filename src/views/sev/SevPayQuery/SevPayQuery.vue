<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'계산내역 조회'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <sev-pay-query-tab></sev-pay-query-tab>

      <div class="box border-box type2">
        <border-box width="260" v-slot="slotProps">
          <border-box-item title="종류">
            <ui-dropdown :items="retireType.items"
                         :value="retireType.value"
                         @change="retireType.value=$event.value; retireType.return=$event;"
                         :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
          </border-box-item>
          <border-box-item title="이름">
            <ui-input :value="EMP_NAME.value"
                         @change="EMP_NAME.value=$event.value; EMP_NAME.return=$event;"
            />
          </border-box-item>
          <border-box-item title="퇴직일" multi :width="slotProps.width"  v-if="retireType.value === 'S'">
            <ui-input-date :date="sendDateScope.from"
                           :max-date="sendDateScope.to"
                           :value="sendDateScope.from"
                           @change="sendDateScope.from=$event;" />
            <span>~</span>
            <ui-input-date :date="sendDateScope.to"
                           :min-date="sendDateScope.from"
                           :value="sendDateScope.to"
                           @change="sendDateScope.to=$event;" />
          </border-box-item>
          <border-box-item title="중간정산 기준일" multi :width="slotProps.width"  v-if="retireType.value === 'I'">
            <ui-input-date :date="sendDateScope.from"
                           :max-date="sendDateScope.to"
                           :value="sendDateScope.from"
                           @change="sendDateScope.from=$event;" />
            <span>~</span>
            <ui-input-date :date="sendDateScope2.to"
                           :min-date="sendDateScope2.from"
                           :value="sendDateScope2.to"
                           @change="sendDateScope2.to=$event;" />
          </border-box-item>
          <border-box-item title="이전 퇴직추계액 기준일" multi width="150"  v-if="retireType.value === 'A'">
            <ui-dropdown :items="RETIRE_DATE_FROM.items"
                         :value="RETIRE_DATE_FROM.value"
                         @change="RETIRE_DATE_FROM.value=$event.value;"
                         :options="{
                                  valueField  : 'code',
                                  labelField  : 'message',
                                  tooltipField: 'message'
                              }" />
          </border-box-item>
          <border-box-item title="퇴직추계액 기준일" multi width="140"  v-if="retireType.value === 'A'">
            <ui-dropdown :items="RETIRE_DATE_TO.items"
                         :value="RETIRE_DATE_TO.value"
                         @change="RETIRE_DATE_TO.value=$event.value;"
                         :options="{
                                  valueField  : 'code',
                                  labelField  : 'message',
                                  tooltipField: 'message'
                              }" />
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
                <button class="btn btn-md mr-5" @click="searchSevPayCalc">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직금 계산내역 조회
                </button>
                <button class="btn btn-md mr-5" @click="searchSevPayCalcReport" v-if="retireType.value === 'S' || retireType.value === 'I'">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직금 계산서 조회
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pay-query-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SevPayQueryTab from "./SevPayQueryTab";
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  components: {
    SevPayQueryTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
  },
  mixins: [grid],
  data() {
    return {
      sendDateScope:{
        from: '20210101',
        to: '20211231'
      },
      sendDateScope2:{
        from: '20210101',
        to: '20211231'
      },
      RETIRE_DATE_FROM: {
        value: '',
        return: null,
        items: []
      },
      RETIRE_DATE_TO: {
        value: '',
        return: null,
        items: []
      },
      EMP_NAME: {
        value: ''
      },
      retireType: {
        value:'S',
        return: null,
        items: [
          { 'message': '최종퇴직금', 'code': 'S'},
          { 'message': '퇴직금 중간정산', 'code': 'I'},
          { 'message': '퇴직급여 추계액', 'code': 'A'}
        ]
      },
      fields: [
        //퇴직연금 계산 기준일, 차수, 내부관리 이름, 계산식 관리번호, 계산식 이름, 등록된 인원, 계산기간 시작일, 계산기간 종ㅛ일, 끝전, 3개월 급여시작일, 3개월 급여 종료일, 12개월 급여시작일, 12개월 급여종료일, 상태, 수정
        { fieldName: 'SEV_DATE', dataType: "text"},
        { fieldName: 'RETIRE_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'EMP_NAM', dataType: "text"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'VALID_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIREBASE_DT', dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: "text"},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: "number"}
      ],
      columns: [
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
        { fieldName: 'RETIRE_DATE', header: '퇴사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'EMP_NAM', header: '성명', styleName: 'left-column'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'VALID_JOIN_DATE', header: '근무시작 인정일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'RETIREBASE_DT', header: '직전 중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SERVICE_YEAR', header: '근속연수', styleName: 'left-column'},
        { fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', styleName: 'right-column', numberFormat: '#,##0'}
      ],
      rowAttrs: [ 'EID', 'EMP_NUMBER']
    }
  },

  methods: {
    async loadGridData() {
      let me = this;
      //RETIRE_TYPE, RETIRE_ORG_DATE_FROM, BF_RETIRE_ORG_DATE, RETIRE_ORG_DATE, PAGE_TYPE = 'S'

      // 퇴직금 종류에 따라 params값 바뀌는거 체크하기
      let retireType = me.retireType.value;
      let sDate = me.sendDateScope.from;
      let eDate = me.sendDateScope.to;
      let pageType= 'S';

      // if( retireType === 'S'){
      //   debugger;
      // }else if( retireType === 'I'){
      //   debugger;
      // }else {
      //   debugger;
      // }

      try {
        let {data} = await me.$httpPost({
          param: { RETIRE_ORG_DATE_FROM: sDate, RETIRE_ORG_DATE: eDate, RETIRE_TYPE: retireType, PAGE_TYPE: pageType},
          url: '/payroll/multiretirecfg/target-emp/list'
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

    async searchSevPayCalc() {
      let me = this;
      let retireType = me.retireType.value;
      let sDate = me.sendDateScope.from;
      let eDate = me.sendDateScope.to;
      let pageType= 'S';
      let formData = {
        RETIRE_ORG_DATE_FROM: sDate,
        RETIRE_ORG_DATE: eDate,
        RETIRE_TYPE: retireType,
        PAGE_TYPE: pageType,
        BF_RETIRE_ORG_DATE_A: null,
        RETIRE_ORG_DATE_A: null,
      }
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({EID: _rowData[0].EID});
      }
      try {
        let {data} = await me.$httpPost({
          url: '/payroll/multiretirement/multi-retire/list_search',
          param: {
            formData: JSON.stringify(formData),
            eidList: JSON.stringify(__checkedData),
          }
        });
        me.$store.dispatch(
            'sevpayentry/resetPayCalcData'
        );

        me.$store.dispatch(
        'sevpayentry/setSevPayCalcData',
        {
          AVG: data[0].AVG,
          CAL: data[0].CAL,
          SET: data[0].SET,
          TEN: data[0].TEN,
          EXE: data[0].EXE,
          PER: data[0].PER
        });
        this.$router.push({name: 'SevPayQueryAvg'});
      }catch ( e){
        console.log('eerors', e);
      }
    },

    async searchSevPayCalcReport () {
      let me = this;
      let retireType = me.retireType.value;
      let sDate = me.sendDateScope.from;
      let eDate = me.sendDateScope.to;
      let pageType= 'S';
      let formData = {
        RETIRE_ORG_DATE_FROM: sDate,
        RETIRE_ORG_DATE: eDate,
        RETIRE_TYPE: retireType,
        PAGE_TYPE: pageType
      }

      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({EID: _rowData[0].EID, EMP_NUMBER: _rowData[0].EMP_NUMBER});
      }

      try {
        let {data} = await this.$httpPost({
          url: '/payroll/multiretirement/calc-income/pdf-print',
          param: {
            FORM_DATA: JSON.stringify( formData),
            DATA_LIST: JSON.stringify( __checkedData),
          },
          blob: true
        });
        this.openPdf(data, '퇴직소득 계산서');
      } catch(e) {
        console.log('eerors', e);
      }
    },

    // async setSevDate(){
    //   let me = this;
    //   try {
    //     let {data} = await me.$httpPost({
    //       param: {},
    //       url: '/payroll/multiretirement/multi-retire/list-retire-sevdate'
    //     });
    //     for( let i = 0; i <data.length; i++){
    //       debugger;
    //     }
    //   } catch ( e) {
    //     console.error("AnnualSalary loadGridData err: ", e);
    //   }
    // }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pay-query-grid',
      'checkbar': 'multi',
      editable: false
    });
    // me.setSevDate();
    me.loadGridData();
  }
}
</script>