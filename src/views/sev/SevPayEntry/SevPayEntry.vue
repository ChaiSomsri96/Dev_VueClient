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
            <border-box-item title="사원명" :width="slotProps.width">
              <ui-input :value="selCode.EMP_NAME" @change="selCode.EMP_NAME=$event; selCode.return=$event;"/>
            </border-box-item>
            <border-box-item title="퇴직월" :width="slotProps.width" id="dateFieldName">
              <ui-input :value="sendDateScope.value"
                         @change="sendDateScope.value=$event;" />
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
                <button class="btn btn-md mr-5" @click="retireInput">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직금 입력
                </button>
                <button class="btn btn-md mr-5" @click="retireUpload">
                  <i class="icon-lineIcon-check mr-5"></i>
                  퇴직금 업로드
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
    </div>
  </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import RetireInputModal from '@/components/retire/RetireInputModal';
import SevPayEntryTab from "./SevPayEntryTab";

export default {
  components: {
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    RetireInputModal,
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
        value: '202103'
      },
      fields: [
        { fieldName: 'EMP_NAM', dataType: 'text'},
        { fieldName: 'RETIRE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'VALID_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: 'text'},
        { fieldName: 'SEV_REAL_FINAL_AMT', dataType: 'number'},
        { fieldName: 'RETIRE_TAX_CHECK', dataType: 'text'},
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
        { fieldName: 'RETIRE_TAX_CHECK', header: '세액계산', styleName: 'left-column'},
        { fieldName: 'EID', header: '', visible: false }
      ],
      rowAttrs: ['EMP_NAM', 'E_JOIN_DATE', 'VALID_JOIN_DATE', 'RETIREBASE_DT', 'RETIRE_DATE', 'SERVICE_YEAR', 'SEV_REAL_FINAL_AMT', 'EID']
    }
  },

  methods: {
    retireInput: function () {
      let me = this;
      let retireType = me.retireType.value;
      if (retireType === 'A') {
        me.toast({message: '추계액은 퇴직금 입력을 할 수 없습니다.', type: "error"});
        return false;
      }
      me.$refs.RetireInputModal.show();
    },

    retireUpload: function () {

    },

    onSearch: function () {

    },

    insertPayday: function () {

    },

    async loadGridData() {
      let me = this;
      me.retireType.value = 'S';
      let retireType = me.retireType.value;
      let retireOrgDate = me.sendDateScope.value;
      // me.loadSevControllData();
      try {
        let {data} = await me.$httpPost({
          param: {
            RETIRE_MONTH: retireType,
            INPUT_SEV_AMT_TYPE: retireOrgDate
          },
          url: '/payroll/multiretirement/manual/input/target/new'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    addRealGridOption() {
      this.gridView.setStateBar({
        visible: false
      });
    },

    searchData: async function () {
      let me = this;
      let retireType = me.retireType.value;
      let retireOrgDate = me.sendDateScope.value;
      if( retireOrgDate.length > 6){
        me.toast({message: '퇴직월을 정확히 입력해주세요.', type:"error"});
        return;
      }
      try {
        let {data} = await me.$httpPost({
          param: {
            RETIRE_MONTH: retireType,
            INPUT_SEV_AMT_TYPE: retireOrgDate
          },
          url: '/payroll/multiretirement/manual/input/target/new'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pay-entry-grid',
      editable: false
    });
    me.loadGridData();
  }
}

</script>
