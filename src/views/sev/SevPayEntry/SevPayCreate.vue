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
            <border-box-item title="퇴직일" :width="slotProps.width">
              <ui-input-date :date="sendDateScope.from"
                             @change="sendDateScope.from=$event;" />
            </border-box-item>
            <border-box-item title="계산식번호" :width="slotProps.width">
              <ui-dropdown :items="SEV_CONTROL_NO.items"
                           :value="SEV_CONTROL_NO.value"
                           @change="SEV_CONTROL_NO.value=$event.value; SEV_CONTROL_NO.return=$event;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
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
                  <button class="btn btn-md mr-5" @click="retireCalc">
                    <i class="icon-lineIcon-check mr-5"></i>
                    퇴직금 생성
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
      <retire-input-modal ref="RetireInputModal" :options="{checkedMembers: checkedMembers, checkedData: checkedData}"  />
      <retire-calc-modal ref="RetireCalcModal" />
    </div>
  </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import RetireInputModal from '@/components/retire/RetireInputModal';
import RetireCalcModal from '@/components/retire/RetireCalcModal';
import SevPayEntryTab from "./SevPayEntryTab";


export default {
  components: {
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    RetireInputModal,
    RetireCalcModal,
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
      SEV_CONTROL_NO: {
        isRequired: true,
        validMsg: '종류를 선택해주세요.',
        value: '',
        return: null,
        items: [
        ]
      },
      retireType: {
        value:'',
        return: null,
        items: [
          { 'message': '최종퇴직금', 'code': 'S'},
          { 'message': '퇴직금 중간정산', 'code': 'I'},
          { 'message': '퇴직급여 추계액', 'code': 'A'}
        ]
      },
      selCode:{
        EMP_NAME: ''
      },
      sendDateScope:{
        'from': '20210331'
      },
      fields: [
        { fieldName: 'EMP_NAM', dataType: 'text'},
        { fieldName: 'RETIRE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'VALID_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: 'text'},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: 'number'},
        { fieldName: 'EID', dataType: 'text' }
      ],
      columns:[
        { fieldName: 'EMP_NAM', header: '이름', styleName: 'left-column'},
        { fieldName: 'RETIRE_DATE', header: '퇴직일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'VALID_JOIN_DATE', header: '근무시작인정일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'RETIREBASE_DT', header: '직전중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SERVICE_YEAR', header: '근속년수', styleName: 'left-column'},
        { fieldName: 'SEV_REAL_FINAL_AMT', header: '퇴직금', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'EID', header: '', visible: false }
      ],
      rowAttrs: ['EMP_NAM', 'E_JOIN_DATE', 'VALID_JOIN_DATE', 'RETIREBASE_DT', 'RETIRE_DATE', 'SERVICE_YEAR', 'SEV_REAL_FINAL_AMT', 'EID']
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
        if( !dateCheck){
          dateCheck = _rowData[0]['RETIRE_DATE'];
        } else {
          if( dateCheck !== _rowData[0]['RETIRE_DATE']) {
            sameDate = true;
          }
        }
        __checkedData.push({'EID': _rowData[0]['EID'], 'RETIRE_DATE': _rowData[0]['RETIRE_DATE']});
      }
      if( sameDate){
        this.toast({message: '퇴직일이 같은 날짜인 사원들만 선택해야 됩니다.', type:"error"});
      }
      this.checkedMembers = Object.freeze(__checkedData);
      return true;
    },

    retireCalc: function(){
      let me = this;
      if(!me.validateCheckedStatus()) {
        return false;
      }
      let retireType = me.retireType.value;
      me.checkedData.RETIRE_TYPE = retireType;
      let sevControlNo = me.SEV_CONTROL_NO.value;
      me.checkedData.SEV_CONTROL_NO = sevControlNo;
      this.$refs.RetireCalcModal.show({checkedMembers: me.checkedMembers, checkedData: me.checkedData});
    },

    showSearchData( params){
      let me = this;
      me.$refs.RetireCalcModal.hide();
      me.$store.dispatch(
          'sevpayentry/setSevPayCalcData',
          {
            AVG: params.AVG,
            BONUS: params.BONUS,
            CAL: params.CAL,
            SET: params.SET,
            TEN: params.TEN,
            EXE: params.EXE
          });
      this.$router.push({name: 'SevPayAvg'});
    },
    retireUpload: function(){

    },

    onSearch: function(){

    },

    insertPayday: function(){

    },

    async loadGridData() {
      let me = this;
      me.retireType.value= 'S';
      let retireType = me.retireType.value;
      let retireDate = me.sendDateScope.from;
      let retireControllerNo = me.SEV_CONTROL_NO.value;
      me.gridView.setCheckBar({
        visible: true
      });
      try {
        let { data } = await me.$httpPost({
          param: { RETIRE_TYPE: retireType, RETIRE_ORG_DATE: retireDate, SEV_CONTROL_NO: retireControllerNo},
          url: '/payroll/multiretirecfg/target-emp/list'
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
      let retireDate = me.sendDateScope.from;
      let retireControllerNo = me.SEV_CONTROL_NO.value;
      me.gridView.setCheckBar({
        visible: true
      });

      try {
        let { data } = await me.$httpPost({
          param: { RETIRE_TYPE: retireType, RETIRE_ORG_DATE: retireDate, SEV_CONTROL_NO: retireControllerNo},
          url: '/payroll/multiretirecfg/target-emp/list'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    async loadSevControllData(){
      try {
        let me = this;
        let {data} = await me.$httpPost( {
          param: { ACITVE_ONLY : "YES", SEV_CONTROL_TYPE : "S"},
          url: '/payroll/multiretirecfg/cs-header/list'
        });
        me.SEV_CONTROL_NO.value = data[0]['SEV_CONTROL_NO'];
        for( let i=0; i< data.length; i++) {
          me.SEV_CONTROL_NO.items.push( {
            message: data[i]['SEV_CONTROL_TITLE'],
            code: data[i]['SEV_CONTROL_NO']
          })
        }
      }
      catch(e) {
        console.error("sevControllData asyncData err: ", e);
      }
    },
  },
  async mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pay-entry-grid',
      'checkbar': 'multi',
      editable: false
    });
    await me.loadSevControllData();
    await me.loadGridData();
  }
}

</script>
