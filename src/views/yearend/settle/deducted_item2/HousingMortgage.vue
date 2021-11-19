<template>
  <div>
    <div class="row">
      <grid-title title="장기주택저당차입금">
        <button class="btn btn-md flat" @click="addHousingMortage">
          <i class="icon-lineIcon-plus mr-5"></i>
          장기주택저당차입금 입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="housing-mortage-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <housing-mortage-modal ref="housingMortageModal" @close="showSurvey($event)"/>
    <survey-modal ref="surveyModal" @close="loadGridData()"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import HousingMortageModal from '@/components/yearend/settle/modals/deducted_item2/HousingMortageModal';
import SurveyModal from '@/components/yearend/settle/modals/deducted_item2/SurveyModal';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import {dataSourceRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    HousingMortageModal,
    GridTitle,
    SurveyModal
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    let me = this;
    return {
      houseAction: 'HOUSE_LOAN_INTEREST',
      step: 'HOUSE_LOAN',
      // grid
      fields: [
        {
          fieldName: 'DATA_SOURCE', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dataSourceRenderer(values[fieldNames.indexOf("DATA_SOURCE")]);
          }
        },
        {
          fieldName: 'QUESTION_PASS', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("QUESTION_PASS")] == 'Y')
              return '공제대상';
            else
              return '대상아님';
          }
        },
        {fieldName: 'NAME', dataType: 'text'},
        {fieldName: 'TRADE_NM', dataType: 'text'},
        {fieldName: 'START_DT', dataType: 'text'},
        {fieldName: 'LEND_GOODS_NM', dataType: 'text'},
        {fieldName: 'DEBT', dataType: 'number'},
        {fieldName: 'THIS_YEAR_REDE_AMT', dataType: 'number'},
        {fieldName: 'APPL_AMOUNT', dataType: 'number'},
        {
          fieldName: 'SAME_AS_PRIOR_YR_FLAG', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("SAME_AS_PRIOR_YR_FLAG")] &&
                values[fieldNames.indexOf("SAME_AS_PRIOR_YR_FLAG")].trim() == 'Y')
              return '동일';
            else
              return '상이';
          }
        },
        {fieldName: 'METHOD', dataType: 'text'},
        {fieldName: 'ACTION_UPDATE'},
        {fieldName: 'ACTION_DEL'},
      ],
      columns: [
        {fieldName: 'DATA_SOURCE', header: '자료분류'},
        {fieldName: 'QUESTION_PASS', header: '공제신청'},
        {fieldName: 'NAME', header: '성명'},
        {fieldName: 'TRADE_NM', header: '취급기관'},
        {fieldName: 'START_DT', header: '최초차입일'},
        {fieldName: 'LEND_GOODS_NM', header: '상품명', width: 180},
        {
          fieldName: 'DEBT', header: '차입금',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0', width: 120
        },
        {
          fieldName: 'THIS_YEAR_REDE_AMT', header: '당해년 원금상환액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0', width: 120
        },
        {
          fieldName: 'APPL_AMOUNT', header: '연간 이자납입액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0', width: 120
        },
        {fieldName: 'SAME_AS_PRIOR_YR_FLAG', header: '전년도비교'},
        me.getIconColumn({fieldName: 'METHOD', headerText: '설문지조회', type: 'view'}),
        me.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 70}),
        me.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 70}),
      ],
      rowAttrs: ['YES_ID', 'PERSON_RRN_ID', 'INP_FLAG', 'QUESTION_PASS', 'APPL_AMOUNT_NTS', 'BASE_AMOUNT_NTS', 'NAME', 'DATA_SOURCE',
        'BUSNID', 'TRADE_NM', 'ACC_NO', 'LEND_KD', 'HOUSE_TAKE_DT', 'MORT_SETUP_DT', 'START_DT', 'END_DT', 'REPAY_YEARS', 'LEND_GOODS_NM',
        'DEBT', 'FIXED_RATE_DEBT', 'NOT_DEFER_DEBT', 'THIS_YEAR_REDE_AMT', 'APPL_AMOUNT', 'REFUTE_AMOUNT', 'EMPLOYEE_COMMENT']
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
        console.error("HousingMortgage loadGridData err: ", e);
      }
    },
    addRealGridOption() {
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        let row = { ..._rowData['ROW_ATTRS'], QUESTION_INFO: {} };
        if (clickData.column == 'ACTION_UPDATE') {
          me.$refs.housingMortageModal.show(row);
        }
        if (clickData.column == 'ACTION_DEL') {
          me.deleteHouseMortage(row);
        }
        if (clickData.column == 'METHOD') {
          row.displaySurvey = true;
          me.showSurvey(row);
          return;
        }
      }
    },
    deleteHouseMortage(row){
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
    },
    addHousingMortage() {
      this.$refs.housingMortageModal.show();
    },
    showSurvey(param) {
      this.$refs.surveyModal.show({param: param, surveyType: 'l2'});
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'housing-mortage-grid'});
    this.loadGridData();
  }
}
</script>
