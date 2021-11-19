<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'파일생성'"/>
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
        </border-box-item>

        <border-box-item title="이름" multi :width="slotProps.width">
          <ui-input :value="empName"
                    @change="empName=$event;" />
        </border-box-item>

        <border-box-item title="퇴직월" multi :width="slotProps.width">
          <ui-dropdown :items="monthType.items"
                       :value="monthType.value"
                       @change="monthType.value=$event.value; monthType.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
          <ui-input-date :date="sendDateScope.from"
                         :max-date="sendDateScope.to"
                         :value="sendDateScope.from"
                         @change="sendDateScope.from=$event;" />
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
              <button class="btn btn-md mr-5" @click="showSevBankModal()" v-if="retireType.value != 'A'">
                <i class="icon-lineIcon-check mr-5"></i>
                퇴직금 계좌 조회
              </button>
              <button class="btn btn-md mr-5" @click="showSevBankFileModal()" v-if="retireType.value != 'A'">
                <i class="icon-lineIcon-check mr-5"></i>
                은행이체파일 생성
              </button>
              <button class="btn btn-md mr-5" @click="showSevPaySlipModal()">
                <i class="icon-lineIcon-check mr-5"></i>
                퇴직금 전표생성
              </button>
            </template>
          </button-panel>
        </div>
      </div>
      <div>
        <div id="sev-pension-query-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
      <sev-bank-acc-search-modal ref="SevBankAccSearchModal"></sev-bank-acc-search-modal>
      <sev-create-pay-slip-modal ref="SevCreatePaySlipModal"></sev-create-pay-slip-modal>
    </div>
  </div>
</template>

<script>
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import SevBankAccSearchModal from "./SevBankAccSearchModal";
import SevCreatePaySlipModal from "./SevCreatePaySlipModal";

export default {
  components: {
    SevCreatePaySlipModal,
    ButtonPanel,
    BorderBox,
    BorderBoxItem,
    SevBankAccSearchModal
  },
  mixins: [grid],
  data(){
    return {
      retireType:{
        value: 'S',
        return: null,
        items: [
          { 'message': '최종퇴직금', 'code': 'S'},
          { 'message': '퇴직금 중간정산', 'code': 'I'},
          { 'message': '퇴직금 추계액', 'code': 'A'}
        ]
      },
      monthType:{
        value: 'AAA',
        return: null,
        items: [
          { 'message': '퇴직월', 'code': 'AAA'},
          { 'message': '퇴직금 지급월', 'code': 'BBB'}
        ]
      },
      empName: '',
      sendDateScope:{
        from: '20210101',
        to: '20211231'
      },
      fields:[
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
      ]
    }
  },
  methods: {
    async loadGridData() {
      let me = this;
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

    showSevBankModal() {
      this.$refs.SevBankAccSearchModal.show();
    },

    showSevBankFileModal() {

    },

    showSevPaySlipModal(){
      this.$refs.SevCreatePaySlipModal.show();
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