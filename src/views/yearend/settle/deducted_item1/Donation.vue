<template>
  <div>
    <div class="row">
      <grid-title title="기부금">
        <button class="btn btn-md flat" @click="addMonthlyAmount()"><i class="icon-lineIcon-check mr-5"></i>
          이월액입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="donation-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
    </div>
    <button-panel btn-type="bottom">
      <template v-slot:start>
        <button class="btn btn-md black" @click="saveDeductionSelect()"><i class="icon-lineIcon-check mr-5"></i>
          공제신청내역 저장
        </button>
      </template>
    </button-panel>
    <donation-input-modal ref="donationInputModal" @close="loadGridData()"/>
    <donation-month-modal ref="donationMonthModal" @close="loadGridData()"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import DonationInputModal from '@/components/yearend/settle/modals/deducted_item1/DonationInputModal';
import DonationMonthModal from '@/components/yearend/settle/modals/deducted_item1/DonationMonthModal';
import GridTitle from '@/components/common/GridTitle';
import {dedAbleRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import ButtonPanel from "../../../../components/common/ButtonPanel";

export default {
  components: {
    ButtonPanel,
    EvidenceButton,
    DonationInputModal,
    DonationMonthModal,
    GridTitle
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  mixins: [grid],
  data() {
    return {
      step: 'DONATION',
      fields: [
        {
          fieldName: 'DED_ABLE_DONA', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dedAbleRenderer(values[fieldNames.indexOf("DED_ABLE_DONA")]);
          }
        },
        {fieldName: 'DONA_DED', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'DEDUCTIBLE_10', dataType: 'number'},
        {fieldName: 'DEDUCTIBLE_20', dataType: 'number'},
        {fieldName: 'DEDUCTIBLE_40', dataType: 'number'},
        {fieldName: 'DEDUCTIBLE_41', dataType: 'number'},
        {fieldName: 'DEDUCTIBLE_42', dataType: 'number'},
        {fieldName: 'DONA_SUBTRACT', dataType: 'number'},
        {fieldName: 'DEDUCTIBLE_TOT', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'boolean'}
      ],
      columns: [
        {header: "공제", fieldName: "DED_ABLE_DONA", editable: false, width: 80},
        {
          fieldName: 'DONA_DED', header: '공제신청', width: 80,
          "sortable": false,
          "lookupDisplay": true,
          editable: false,
          renderer: {type: "check"},
          styleCallback: function (grid, dataCell) {
            let ret = {};
            let val = grid.getValue(dataCell.index.itemIndex, "ROW_ATTRS");
            if (val.DED_ABLE_DONA == '1') {
              ret.renderer = {
                type: "check",
                trueValues: "1",
                falseValues: "X,2"
              }
            } else {
              ret.renderer = {
                type: "html",
                callback: function () {
                  return "";
                }
              }
            }
            return ret;
          }
        },
        {fieldName: 'PERSON_NAME', header: '성명', editable: false},
        {
          fieldName: 'DEDUCTIBLE_10', header: '10.법정', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DEDUCTIBLE_20', header: '20.정치자금', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DEDUCTIBLE_40', header: '40.지정(종교외)', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DEDUCTIBLE_41', header: '41.지정(종교)', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DEDUCTIBLE_42', header: '42.우리사주조합', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DONA_SUBTRACT', header: '공제제외', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DEDUCTIBLE_TOT', header: '총계', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        this.getUpdateColumn()
      ],
      rowAttrs: ['DONOR_RRN_ID', 'DED_ABLE_DONA', 'PERSON_NAME']
    }
  },
  methods: {
    async loadGridData() {
      console.log('called......');
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
        console.error("Donation loadGridData err: ", e);
      }
    },
    addMonthlyAmount() {
      this.$refs.donationMonthModal.show();
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
          YES_ID: d.DONOR_RRN_ID,
          DONA_DED: f.DONA_DED ? f.DONA_DED : '2',
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
        if (clickData.column == 'UPDATE') {
          grid.commit();
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.donationInputModal.show({
            DONOR_RRN_ID: _rowData['ROW_ATTRS']['DONOR_RRN_ID'],
            PERSON_NAME: _rowData['ROW_ATTRS']['PERSON_NAME']
          });
        }
      }
    }
  },
  mounted() {
    this.createRealGrid({
      'domId': 'donation-grid',
      'editable': true
    });
    this.loadGridData();
  }
}
</script>