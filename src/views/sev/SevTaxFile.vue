<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'세무서식 조회'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <border-box width="170" v-slot="slotProps">
            <border-box-item title="종류" multi :width="slotProps.width">
              <ui-dropdown :items="retireType.items"
                           :value="retireType.value"
                           @change="retireType.value=$event.value; retireType.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
              <ui-dropdown :items="dateTypeGrp.items"
                           :value="dateTypeGrp.value"
                           @change="dateTypeGrp.value=$event.value; dateTypeGrp.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
            </border-box-item>


            <border-box-item title="기준일" multi :width="slotProps.width">
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
            <border-box-item button>
              <button type="button" id="btnSearch" class="btn btn-md line-1"
                      @click="loadGridData()">
                <span>검색</span>
              </button>
            </border-box-item>
          </border-box>
          <div class="row">
            <div class="form-row">
              <button-panel btnType='top'>
                <template v-slot:start>
                  <button class="btn btn-md mr-5" @click="searchSevPensionCalc()">
                    <i class="icon-lineIcon-check mr-5"></i>
                    퇴직소득원천징수영수증 조회
                  </button>
                </template>
              </button-panel>
            </div>
          </div>
          <div>
            <div id="sev-pension-query-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
          </div>
        </div>
    </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  components: {
    ButtonPanel,
    BorderBox,
    BorderBoxItem
  },
  mixins: [grid],
  data(){
    return {
      retireType:{
        value: 'SEV',
        return: null,
        items: [
          { 'message': '최종퇴직금', 'code': 'SEV'},
          { 'message': '퇴직금 중간정산', 'code': 'INTER'}
        ]
      },
      dateTypeGrp:{
        value: 'RETIRE',
        return: null,
        items: [
          { 'message': '퇴직(중간정산)일자', 'code': 'RETIRE'},
          { 'message': '지급일자', 'code': 'PAY'}
        ]
      },
      sendDateScope:{
        from: '20210101',
        to: '20211231'
      },
      fields:[
        { fieldName: 'EID', dataType: 'text'},
        { fieldName: 'SEV_TYPE', dataType: "text"},
        { fieldName: 'RETIRE_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'EMP_NAM', dataType: "text"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'VALID_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: "text"},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: "number"},
        { fieldName: 'RETIRE_TAX_CHECK', dataType: "text"},
        { fieldName: 'TARGET_RETIRE_INCOME_TAX', dataType: "number"},
        { fieldName: 'TAX_WITHHOLD', dataType: "number"},
        { fieldName: 'RETIRE_INCOME_TAX_COLLECTED', dataType: "number"}

      ],
      columns:[
        { fieldName: 'EID', visible: false},
        { fieldName: 'SEV_TYPE', header: '종류', datetimeFormat: 'yyyy.MM.dd', styleName: 'left-column'},
        { fieldName: 'RETIRE_DATE', header: '퇴직일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'EMP_NAM', header: '성명', styleName: 'left-column'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'VALID_JOIN_DATE', header: '근무시작 인정일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'RETIREBASE_DT', header: '직전중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SERVICE_YEAR', header: '근속년수', styleName: 'left-column'},
        { fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', numberFormat: '#,##0', styleName: 'right-column'},
        { fieldName: 'RETIRE_TAX_CHECK', header: '세액계산', styleName: 'left-column'},
        { fieldName: 'TARGET_RETIRE_INCOME_TAX', header: '대상퇴직 소득세', numberFormat: '#,##0', styleName: 'right-column'},
        { fieldName: 'TAX_WITHHOLD', header: '이연퇴직 소득세', numberFormat: '#,##0', styleName: 'right-column'},
        { fieldName: 'RETIRE_INCOME_TAX_COLLECTED', header: '징수퇴직 소득세', numberFormat: '#,##0', styleName: 'right-column'},
      ],
      rowAttrs: [ 'EID', 'SEV_TYPE', 'RETIRE_DATE']
    }
  },
  methods: {
    async loadGridData() {
      let me = this;
      let sDate = me.sendDateScope.from;
      let eDate = me.sendDateScope.to;

      if( ! sDate || sDate.length !==8){
        me.toast({message: '시작일을 정확히 입력해주세요.', type:"error"});
        return
      }
      if( ! eDate || eDate.length !==8){
        me.toast({message: '종료일을 정확히 입력해주세요.', type:"error"});
        return
      }
      if(  sDate.substr( 0,4)  !== eDate.substr( 0,4)){
        me.toast({message: '기준일의 시작일과 종료일의 연도는 같아야합니다.', type:"error"});
        return
      }
      try {
        let {data} = await me.$httpPost({
          // RETIRE_TYPE: me.retireType.value,
          param: { RETIRE_ORG_DATE_FROM:  me.sendDateScope.from, RETIRE_ORG_DATE:  me.sendDateScope.to, RETIRE_TYPE: 'S', PAGE_TYPE: 'S'},
          url: '/payroll/multiretirecfg/target-emp/list'
          // param:{ REPORT_TYPE: 'BY_EMP', DEL_SEV_AMT_TYPE: me.retireType.value, DATE_TYPE: me.dateTypeGrp.value, DATE_FROM: me.sendDateScope.from, DATE_TO: me.sendDateScope.to, SORTBY: 'EMP_NUMBER'},
          // url: '/payroll/retirement/pay-report'

        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    async searchSevPensionCalc() {
      let me = this;
      let sDate = me.sendDateScope.from;
      let eDate = me.sendDateScope.to;


      if( ! sDate || sDate.length !==8){
        me.toast({message: '시작일을 정확히 입력해주세요.', type:"error"});
        return
      }
      if( ! eDate || eDate.length !==8){
        me.toast({message: '종료일을 정확히 입력해주세요.', type:"error"});
        return
      }
      if(  sDate.substr( 0,4)  !== eDate.substr( 0,4)){
        me.toast({message: '기준일의 시작일과 종료일의 연도는 같아야합니다.', type:"error"});
        return
      }

      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({EID: _rowData[0].EID, SEV_TYPE: _rowData[0].SEV_TYPE, SEV_DATE: _rowData[0].RETIRE_DATE});
      }
      try {
        let {data} = await this.$httpPost({
          url: '/payroll/retirement/sev-tax/down-pdf',
          param: {
            DEL_SEV_AMT_TYPE: me.retireType.value,
            RETIRE_YEAR: sDate.substr(0,4),
            list: JSON.stringify( __checkedData),
          },
          blob: true
        });
        this.openPdf(data, '퇴직소득 원천징수영수증');
      } catch(e) {
        console.log('eerors', e);
      }
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-query-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>