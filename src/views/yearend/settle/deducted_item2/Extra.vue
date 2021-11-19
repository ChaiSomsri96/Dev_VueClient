<template>
  <div>
    <div class="row">
      <grid-title title="기타">
        <button class="btn btn-md flat" @click="addSmallbusDeduction('E20B')">
          <i class="icon-lineIcon-plus mr-5"></i>
          소상공인 공제부금 입력
        </button>
        <button class="btn btn-md flat" @click="addSmallbusDeduction('E60A')">
          <i class="icon-lineIcon-plus mr-5"></i>
          우리사주조합출연금 입력
        </button>
        <button class="btn btn-md flat" @click="addSmallbusDeduction('E60B')">
          <i class="icon-lineIcon-plus mr-5"></i>
          고용유지중소기업 근로자 입력
        </button>
        <button class="btn btn-md flat" @click="addInvestAssoc">
          <i class="icon-lineIcon-plus mr-5"></i>
          투자조합출자 입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="extra-grid" class="realgrid-type-style" style="height: 400px"></div>
    </div>
    <small-bus-ded-modal ref="smallbusDedModal" @close="loadGridData"/>
    <invest-assoc-modal ref="investAssocModal" @close="loadGridData"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import SmallBusDedModal from '@/components/yearend/settle/modals/deducted_item2/extra/SmallBusDedModal';
import InvestAssocModal from '@/components/yearend/settle/modals/deducted_item2/extra/InvestAssocModal';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    SmallBusDedModal,
    InvestAssocModal,
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
      step: 'OTHERS',
      fields: [
        {fieldName: 'ITEM_NAME', dataType: 'text'},
        {fieldName: 'INST_NAME', dataType: 'text'},
        {fieldName: 'ACC_NO', dataType: 'text'},
        {fieldName: 'CONTRACT_DATE', dataType: 'text'},
        {fieldName: 'DISPLAY_AMOUNT', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'text'},
        {fieldName: 'DELETE', dataType: 'text'}
      ],
      columns: [
        {fieldName: 'ITEM_NAME', header: '구분'},
        {fieldName: 'INST_NAME', header: '금융기관'},
        {fieldName: 'ACC_NO', header: '계좌번호'},
        {fieldName: 'CONTRACT_DATE', header: '계약일자'},
        {
          fieldName: 'DISPLAY_AMOUNT', header: '금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      rowAttrs: [
        "YES_ID",
        "EID",
        "INP_REMARK",
        "ACC_NO",
        "PAID_AMOUNT",
        "PAID_AMOUNT_NTS",
        "DATA_SOURCE",
        "INVEST_CODE",
        "INST_BIZID",
        "PERSON_RRN_ID",
        "INST_CODE",
        "SAVINGS_TYPE",
        "CONTRACT_DATE",
        "PAYDAY",
        "DED_AMOUNT",
        "INP_FLAG",
        "INST_NAME",
        "DED_SELECT",
        "QUESTION_PASS",

        "ITEM_CODE",
        "APPL_AMOUNT",
        "APPL_AMOUNT_NTS",
        "ITEM_TYPE",
        "EXPIRE_DATE",

        'ITEM_NAME',
        'othersType'
      ]
    }
  },
  methods: {
    /*
    Need To update api
    */
    async loadGridData() {
      try {
        let {data} = await this.$httpPostBody({
          url: '/year-end/employee/deduction/request/others/list',
          param: {
            'EID': this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': this.step,
            'PAYDAY': this.payday
          }
        });
        if (data && data.length > 0) {
          data.forEach(function (val) {
            switch (val.SAVINGS_TYPE + '') {
              case '51':
                val.ITEM_NAME = '장기집합투자증권';
                val.othersType = '1';
                val.DISPLAY_AMOUNT = val.PAID_AMOUNT;
                break;
              case '61':
                val.ITEM_NAME = '투자조합출자';
                val.othersType = '2';
                val.DISPLAY_AMOUNT = val.PAID_AMOUNT;
                break;
            }
            switch (val.ITEM_CODE + '') {
              case 'E20B':
                val.ITEM_NAME = '소기업 소상공인 공제부금';
                val.othersType = '3';
                val.DISPLAY_AMOUNT = val.APPL_AMOUNT;
                break;
              case 'E60A':
                val.ITEM_NAME = '우리사주조합 출연금';
                val.othersType = '4';
                val.DISPLAY_AMOUNT = val.APPL_AMOUNT;
                break;
              case 'E60B':
                val.ITEM_NAME = '고용유지중소기업 근로자';
                val.othersType = '5';
                val.DISPLAY_AMOUNT = val.APPL_AMOUNT;
                break;
            }
          });
        }
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("Extra loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      const me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow).ROW_ATTRS;
        if (clickData.column == 'UPDATE') {
          switch (_rowData.othersType) {
            case '1':
            case '2':
              me.$refs.investAssocModal.show({..._rowData});
              break;
            case '3':
            case '4':
            case '5':
              me.$refs.smallbusDedModal.show({..._rowData});
              break;
          }
        }
        if (clickData.column == 'DELETE') {
          me.deleteData({..._rowData});
        }
      }
    },
    deleteData(val){
      const me = this;
      const urlInvest = '/year-end/employee/deduction/request/others-invest/delete';
      const urlOthers = '/year-end/employee/deduction/request/others-nts/delete';
      let param = {
        ...val,
        'EID': this.eid,
        'ATT_YEAR': this.attYear,
        'CURRENT_STEP': this.step,
        'PAYDAY': this.payday
      };
      let calUrl = '';
      switch (val.othersType) {
        case '1':
        case '2':
          calUrl = urlInvest;
          break;
        case '3':
        case '4':
        case '5':
          calUrl = urlOthers;
          break;
      }

      me.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function () {
          try {
            await me.$httpPostBody({
              url: calUrl,
              param: param,
              callback: function () {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
          } catch (e) {
            console.error('EducationExpenseModal onDelete Error: ', e);
          }
        }
      });
    },
    //소상공인 공제부금 입력
    addSmallbusDeduction(itemCode) {
      let title = '';
      switch (itemCode) {
        case 'E20B': title= '소기업 소상공인 공제부금'; break;
        case 'E60A': title = '우리사주조합 출연금'; break;
        case 'E60B': title = '고용유지중소기업 근로자'; break;
      }
      this.$refs.smallbusDedModal.show({
        ITEM_CODE: itemCode,
        DATA_SOURCE: '2',
        TITLE: title
      });
    },
    //투자조합출자 입력
    addInvestAssoc() {
      this.$refs.investAssocModal.show({
        SAVINGS_TYPE: '61',
        DATA_SOURCE: '2'
      });
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'extra-grid'});
    this.loadGridData();
  }
}
</script>