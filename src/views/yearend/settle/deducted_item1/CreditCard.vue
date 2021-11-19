<template>
  <div>
    <div class="row">
      <grid-title title="신용카드">
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="credit-card-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
    </div>
    <button-panel btn-type="bottom">
      <template v-slot:start>
        <button class="btn btn-md black" @click="saveDeductionSelect()"><i class="icon-lineIcon-check mr-5"></i>
          공제신청내역 저장
        </button>
      </template>
    </button-panel>
    <credit-card-input-modal ref="creditCardInputModal" @close="loadGridData()" />
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import CreditCardInputModal from '@/components/yearend/settle/modals/deducted_item1/CreditCardInputModal';
import GridTitle from '@/components/common/GridTitle';
import {dedAbleRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import ButtonPanel from "../../../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    EvidenceButton,
    CreditCardInputModal,
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
    return {
      step: 'CREDIT_CARD',
      fields: [
        {
          fieldName: 'DED_ABLE_CARD', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dedAbleRenderer(values[fieldNames.indexOf("DED_ABLE_CARD")]);
          }
        },
        {fieldName: 'CARD_DED', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'CARD_CREDIT_3', dataType: 'number'},
        {fieldName: 'CARD_CASH_3', dataType: 'number'},
        {fieldName: 'CASH_3', dataType: 'number'},
        {fieldName: 'MARKET_3', dataType: 'number'},
        {fieldName: 'TRAFFIC_3', dataType: 'number'},
        {fieldName: 'CULTURE_3', dataType: 'number'},
        {fieldName: 'REFUTE_3', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'boolean'}
      ],
      columns: [
        {header: "공제", fieldName: "DED_ABLE_CARD", editable: false, width: 80},
        {
          fieldName: 'CARD_DED', header: '공제신청', width: 80,
          "sortable": false,
          "lookupDisplay": true,
          editable: false,
          renderer: {type: "check"},
          styleCallback: function (grid, dataCell) {
            let ret = {};
            let val = grid.getValue(dataCell.index.itemIndex, "ROW_ATTRS");
            if (val.DED_ABLE_CARD == '1') {
              ret.renderer = {
                type: "check",
                trueValues: "1",
                falseValues: "X,2"
              }
            } else {
              ret.renderer = {
                type: "html",
                callback: function (grid, cell, w, h) {
                  return "";
                }
              }
            }
            return ret;
          }
        },
        {fieldName: 'PERSON_NAME', header: '성명', editable: false},
        {
          fieldName: 'CARD_CREDIT_3', header: '신용카드(일반)', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'CARD_CASH_3', header: '직불카드(일반)', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'CASH_3', header: '현금영수증(일반)', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'MARKET_3', header: '전통시장 사용분', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'TRAFFIC_3', header: '대중교통 이용분', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'CULTURE_3', header: '도서와 공연', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'REFUTE_3', header: '차감액', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        this.getUpdateColumn()
      ],
      rowAttrs: ['CARD_RRN_ID', 'DED_ABLE_CARD', 'PERSON_NAME']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID': this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': this.step,
            'PAYDAY': this.payday
          }
        });
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.error("CreditCard loadGridData err: ", e);
      }
    },
    saveDeductionSelect() {
      let me = this;
      let data = this.dataProvider.getJsonRows(0, -1);
      let family = [];

      if (me.gridView.isEditing()) {
        me.toastAlertEditing();
        return false;
      }

      me.gridView.commit();
      data.forEach(f => {
        let d = f.ROW_ATTRS; // 원래의 값이다.

        family.push({
          YES_ID: d.CARD_RRN_ID,
          CARD_DED: f.CARD_DED ? f.CARD_DED : '2', // 화면에서 선택한 값이므로 f 의 medi_ded 를 써야 한다.
        });
      });

      this.$httpPost({
        url: '/year-end/employee/deduction/request/settle-step',
        param: {
          'EID': this.eid,
          'ATT_YEAR': this.attYear,
          'CURRENT_STEP': this.step,
          'PAYDAY': this.payday,
          'FAMILY_LIST': JSON.stringify(family)
        },
        callback: function () {
          me.toastSuccessSave();
        }
      })
    },
    realgridCreatedCallback() {
      let me = this;
      me.gridView.onCellClicked = function (grid, clickData) {
        grid.commit();
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.creditCardInputModal.show({
            CARD_RRN_ID: _rowData['ROW_ATTRS']['CARD_RRN_ID'],
            PERSON_NAME: _rowData['ROW_ATTRS']['PERSON_NAME']
          });
        }
      }
    }
  },
  mounted() {
    this.createRealGrid({
      'domId': 'credit-card-grid',
      'editable': true
    });
    this.loadGridData();
  }
}
</script>