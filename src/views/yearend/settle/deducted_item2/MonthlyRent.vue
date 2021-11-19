<template>
  <div>
    <div class="row">
      <grid-title title="월세액">
        <button class="btn btn-md flat" @click="inputMonthlyRent">
          <i class="icon-lineIcon-plus mr-5"></i>
          월세액 입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="monthly-rent-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <monthly-rent-input-modal ref="monthlyRentInputModal" @close="showSurvey($event)"/>
    <survey-modal ref="surveyModal" @close="loadGridData()"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import MonthlyRentInputModal from '@/components/yearend/settle/modals/deducted_item2/MonthlyRentInputModal';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import SurveyModal from "../../../../components/yearend/settle/modals/deducted_item2/SurveyModal";

export default {
  mixins: [grid],
  components: {
    SurveyModal,
    EvidenceButton,
    MonthlyRentInputModal,
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
      houseAction: 'HOUSE_RENT',
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
        {fieldName: 'RENTER_NAME', dataType: 'text'},
        {fieldName: 'RENT_START', dataType: 'text'},
        {fieldName: 'RENT_END', dataType: 'text'},
        {fieldName: 'ANNUAL_RENT', dataType: 'number'},
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
        {fieldName: 'UPDATE', dataType: 'text'},
        {fieldName: 'DELETE', dataType: 'text'}
      ],
      columns: [
        {fieldName: 'QUESTION_PASS', header: '공제신청'},
        {fieldName: 'RENTER_NAME', header: '임대인성명(상호)'},
        {fieldName: 'RENT_START', header: '임대차계약기간 시작일'},
        {fieldName: 'RENT_END', header: '임대차계약기간 종료일'},
        {
          fieldName: 'ANNUAL_RENT', header: '연간월세액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {fieldName: 'SAME_AS_PRIOR_YR_FLAG', header: '전년도비교'},
        me.getIconColumn({fieldName: 'METHOD', headerText: '설문지조회', type: 'view'}),
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      rowAttrs: [
        'ATT_YEAR', 'PAYDAY', 'EID', 'YES_ID', 'PERSON_RRN_ID',
        'INP_REMARK', 'INP_REMARK', 'INP_FLAG', 'RENT_DEDUCTION',
        'ANNUAL_RENT_NTS', 'QUESTION_PASS', 'QUESTION_INFO', 'DATA_SOURCE',
        'RENTER_NAME', 'RENTER_NUMBER', 'RENT_START', 'RENT_END',
        'ANNUAL_RENT', 'ANNUAL_RENT_ADJ', 'HOUSE_TYPE', 'SPACE_SIZE',
        'HOUSE_ADDR', 'EMPLOYEE_COMMENT'
      ]
    }
  },
  methods: {
    showSurvey(param) {
      this.$refs.surveyModal.show({param: param, surveyType: 'l3'});
    },
    async loadGridData() {
      const me = this;
      try {
        let {data} = await me.$httpPost({
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
        console.error("MonthlyRent loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      const me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        let row = {..._rowData['ROW_ATTRS'], QUESTION_INFO: {}};
        if (clickData.column == 'UPDATE') {
          me.$refs.monthlyRentInputModal.show(row);
        }
        if (clickData.column == 'DELETE') {
          me.deleteHouseRent(row);
        }
        if (clickData.column == 'METHOD') {
          row.displaySurvey = true;
          me.showSurvey(row);
          return;
        }
      }
    },
    deleteHouseRent(row) {
      const me = this;
      me.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function () {
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
              callback: function () {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
          } catch (e) {
            console.log("onDelete: ", e);
          }
        }
      });
    },
    inputMonthlyRent() {
      const me = this;
      me.$refs.monthlyRentInputModal.show({
        'EID': me.eid,
        'ATT_YEAR': me.attYear,
        'CURRENT_STEP': me.step,
        'HOUSE_ACTION': me.houseAction,
        'PAYDAY': me.payday,
        'DATA_SOURCE': '2', // 수기입력.
        'QUESTION_INFO': {}
      });
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'monthly-rent-grid'});
    this.loadGridData();
  }
}
</script>
