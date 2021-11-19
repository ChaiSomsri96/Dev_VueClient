<template>
  <div>
    <div class="row">
      <grid-title title="주택임차차입금">
        <button class="btn btn-md flat" @click="showLendingModal">
          <i class="icon-lineIcon-plus mr-5"></i>
          대출기관 입력
        </button>
        <button class="btn btn-md flat" @click="showResidentModal">
          <i class="icon-lineIcon-plus mr-5"></i>
          거주자간 입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="home-rental-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <home-rental-lending-modal ref="homeRentalLendingModal" @close="showSurvey($event)"/>
    <home-rental-resident-modal ref="homeRentalResidentModal" @close="showSurvey($event)"/>
    <survey-modal ref="surveyModal" @close="loadGridData()" />
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import HomeRentalLendingModal from '@/components/yearend/settle/modals/deducted_item2/HomeRentalLendingModal';
import HomeRentalResidentModal from '@/components/yearend/settle/modals/deducted_item2/HomeRentalResidentModal';
import SurveyModal from '@/components/yearend/settle/modals/deducted_item2/SurveyModal';
import {dataSourceRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import EvidenceButton from "@/components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    HomeRentalLendingModal,
    HomeRentalResidentModal,
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
    const me = this;
    return {
      step: 'HOUSE_LOAN',
      houseAction: 'HOUSE_RENTAL_LOAN',
      surveyType: '',
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
        {fieldName: 'BUSNID', dataType: 'text'},
        {fieldName: 'TRADE_NM', dataType: 'text'},
        {fieldName: 'ACC_NO', dataType: 'text'},
        {fieldName: 'LEND_DT', dataType: 'text'},
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
        {fieldName: 'DELETE', dataType: 'text'},
        {fieldName: 'UPDATE', dataType: 'text'},
      ],
      columns: [
        {fieldName: 'DATA_SOURCE', header: '자료분류'},
        {fieldName: 'QUESTION_PASS', header: '공제신청'},
        {fieldName: 'NAME', header: '성명'},
        {fieldName: 'BUSNID', header: '사업자번호'},
        {fieldName: 'TRADE_NM', header: '취급기관'},
        {fieldName: 'ACC_NO', header: '계좌번호'},
        {fieldName: 'LEND_DT', header: '대출일'},
        {
          fieldName: 'APPL_AMOUNT', header: '금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {fieldName: 'SAME_AS_PRIOR_YR_FLAG', header: '전년도비교'},
        me.getIconColumn({fieldName:'METHOD',headerText:'설문지조회',type:'view'}),
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      rowAttrs: [
        "LEND_END", "LENDING_END", "YES_ID", "REFUTE_AMOUNT", "DATA_SOURCE", "LENDER_TYPE", "INTEREST_PAID",
        "REFUTE_AMOUNT_PRINCIPAL", "APPL_AMOUNT", "IS_NMDF_NTS", "LESSOR_NAME", "HOUSE_TYPE", "HOUSE_ADDR",
        "APPL_AMOUNT_NTS", "INTEREST_RATE", "LENDER_RRN", "GOODS_NM", "INP_FLAG", "PRINCIPAL_REDEMP",
        "QUESTION_PASS", "EID", "LEND_DT", "ACC_NO", "SAME_AS_PRIOR_YR_FLAG", "KEY_MONEY", "LEND_START", "NAME",
        "LENDING_START", "TRADE_NM", "REFUTE_AMOUNT_INTEREST", "PERSON_RRN_ID", "YES_ID_CONTRACT_RENT", "PAYDAY",
        "REDEMP_DED", "HAS_ANSWER", "YES_ID_CONTRACT_LOAN", "EMPLOYEE_COMMENT", "LENDER_NAME", "SPACE_SIZE", "LESSOR_NUMBER", "BUSNID",
      ]
    }
  },
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID':this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': this.step,
            'HOUSE_ACTION': this.houseAction,
            'PAYDAY': this.payday
          }
        });
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.error("HomeRental loadGridData err: ", e);
      }
    },

    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        let row = { ..._rowData['ROW_ATTRS'], QUESTION_INFO: {} };

        me.surveyType = row.LENDER_TYPE == '2' ? 'l4' : 'l5';
        if (clickData.column == 'METHOD') {
          row.displaySurvey = true;
          me.showSurvey(row);
          return;
        }
        if (clickData.column == 'UPDATE') {
          if(row.LENDER_TYPE == '2') { // 거주자
            me.$refs.homeRentalResidentModal.show(row);
          }else{
            me.$refs.homeRentalLendingModal.show(row);
          }
          return;
        }
        if (clickData.column == 'DELETE') {
          me.deleteHouseRentalRow(row);
        }
      }
    },

    deleteHouseRentalRow(row){
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
    showLendingModal() {
      this.$refs.homeRentalLendingModal.show();
      this.surveyType = 'l4';
    },
    showResidentModal() {
      this.$refs.homeRentalResidentModal.show();
      this.surveyType = 'l5';
    },
    showSurvey(param) {
      this.$refs.surveyModal.show({param: param, surveyType: this.surveyType});
    }
  },
  mounted() {
    this.createRealGrid({
      'domId': 'home-rental-grid'
    });
    this.loadGridData();
  }
}
</script>
