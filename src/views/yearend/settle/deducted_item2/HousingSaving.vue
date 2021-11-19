<template>
  <div>
    <div class="row">
      <button-panel btn-type="top"
                    v-bind:add=true
                    v-on:add="addHousingSaving" >
        <template v-slot:start>
          <evidence-button :step="step"/>
        </template>
      </button-panel>
    </div>
    <div>
      <div id="housing-saving-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <housing-saving-modal ref="housingSavingModal" @close="showSurvey($event)"/>
    <survey-modal ref="surveyModal" @close="loadGridData()"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import HousingSavingModal from '@/components/yearend/settle/modals/deducted_item2/HousingSavingModal';
import GridTitle from '@/components/common/GridTitle';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import SurveyModal from "../../../../components/yearend/settle/modals/deducted_item2/SurveyModal";
import ButtonPanel from "../../../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    SurveyModal,
    EvidenceButton,
    HousingSavingModal,
    GridTitle
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    const me = this;
    return {
      step: 'HOUSE_LOAN',
      houseAction: 'HOUSE_SAVINGS',
      fields: [
        {
          fieldName: 'QUESTION_PASS', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("QUESTION_PASS")] == 'Y')
              return '공제대상';
            else
              return '대상아님';
          }
        },
        {fieldName: 'INST_CODE', dataType: 'text'},
        {fieldName: 'INST_NAME', dataType: 'text'},
        {fieldName: 'INST_BIZID', dataType: 'text'},
        {fieldName: 'ACC_NO', dataType: 'text'},
        {fieldName: 'CONTRACT_DATE', dataType: 'text'},
        {fieldName: 'PAID_AMOUNT', dataType: 'number'},
        {fieldName: 'METHOD', dataType: 'text'},
        {fieldName: 'UPDATE', dataType: 'text'},
        {fieldName: 'DELETE', dataType: 'text'}
      ],
      columns: [
        {fieldName: 'QUESTION_PASS', header: '공제신청'},
        {fieldName: 'INST_CODE', header: '금융기관코드', width: 80},
        {fieldName: 'INST_NAME', header: '상호', width: 150, styleName: 'left-column'},
        {fieldName: 'INST_BIZID', header: '사업자등록번호'},
        {fieldName: 'ACC_NO', header: '계좌번호'},
        {fieldName: 'CONTRACT_DATE', header: '가입일자'},
        {
          fieldName: 'PAID_AMOUNT', header: '납입금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getIconColumn({fieldName: 'METHOD', headerText: '설문지조회', type: 'view'}),
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      layout: [
        'QUESTION_PASS',
        {
          name: 'FIN_Group', direction: "horizontal",
          items: ["INST_CODE", "INST_NAME", "INST_BIZID", "ACC_NO"],
          header: {text: "금융기관"}
        },
        'CONTRACT_DATE', 'PAID_AMOUNT', 'METHOD', 'UPDATE', 'DELETE'
      ],
      rowAttrs: [
        'ATT_YEAR','PAYDAY','EID','YES_ID',
        'PERSON_RRN_ID','INP_REMARK','INP_FLAG','PAID_AMOUNT_NTS',
        'QUESTION_PASS','QUESTION_INFO','SAVINGS_TYPE','DATA_SOURCE',
        'INST_CODE','INST_NAME','INST_BIZID','ACC_NO','CONTRACT_DATE',
        'PAID_AMOUNT','HOUSE_ACTION','CURRENT_STEP'
      ]
    }
  },
  methods: {
    async loadGridData() {
      const me = this;
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'CURRENT_STEP': me.step,
            'HOUSE_ACTION': me.houseAction,
            'PAYDAY': me.payday
          }
        });
        me.setRealgridData(data.list || []);
      } catch (e) {
        console.error("HousingSaving loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.header.height = 72;
    },
    addHousingSaving() {
      const me = this;
      me.$refs.housingSavingModal.show({
        'EID': me.eid,
        'ATT_YEAR': me.attYear,
        'CURRENT_STEP': me.step,
        'HOUSE_ACTION': me.houseAction,
        'PAYDAY': me.payday
      });
    },
    showSurvey(param) {
      this.$refs.surveyModal.show({param: param, surveyType: 'l6'});
    },
    realgridCreatedCallback() {
      const me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        let row = { ..._rowData['ROW_ATTRS'], QUESTION_INFO: {} };
        if (clickData.column == 'UPDATE') {
          me.$refs.housingSavingModal.show(row);
        }
        if (clickData.column == 'DELETE') {
          me.deleteHouseSavings(row);
        }
        if (clickData.column == 'METHOD') {
          row.displaySurvey = true;
          me.showSurvey(row);
          return;
        }
      }
    },
    deleteHouseSavings(row){
      const me = this;
      me.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function() {
          let _params = {
            ATT_YEAR: me.attYear,
            EID: me.eid,
            PAYDAY: me.payday,
            CURRENT_STEP: me.step,
            HOUSE_ACTION: me.houseAction,
            YES_ID: row.YES_ID
          };
          try {
            await me.$httpPost({
              url: "/year-end/employee/deduction/request/delete",
              param: _params,
              callback: function() {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
          }
          catch(e) {
            console.log("DependentModal onDelete: ", e);
          }
        }
      });
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'housing-saving-grid'});
    this.loadGridData();
  }
}
</script>