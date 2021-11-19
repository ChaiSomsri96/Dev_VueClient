<template>
  <div>
    <button-panel btn-type="top">
      <template v-slot:start>
        <evidence-button :step="step" />
      </template>
      <template v-slot:end>
        <h4>* 공제신청 여부값을 체크하신 후 [공제신청내역 저장] 버튼을 클릭해서 저장해 주세요.</h4>
      </template>
    </button-panel>
    <div>
      <div id="medical-expense-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
    </div>
    <button-panel btn-type="bottom">
      <template v-slot:start>
        <button class="btn btn-md black" @click="saveDeductionSelect()"><i class="icon-lineIcon-check mr-5"></i>
          공제신청내역 저장
        </button>
      </template>
    </button-panel>
    <medical-expense-modal ref="medicalExpenseModal"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import MedicalExpenseModal from '@/components/yearend/settle/modals/deducted_item1/MedicalExpenseModal';
import GridTitle from '@/components/common/GridTitle';
import {dedAbleRenderer, familyRelationRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import ButtonPanel from "../../../../components/common/ButtonPanel";
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    ButtonPanel,
    MedicalExpenseModal,
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
      step: 'MEDICINE',
      fields: [
        {
          fieldName: 'DED_ABLE_MEDI', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dedAbleRenderer(values[fieldNames.indexOf("DED_ABLE_MEDI")]);
          }
        },
        {fieldName: 'MEDI_DED', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'PERSON_RRN_FULL', dataType: 'text'},
        {
          fieldName: 'PERSON_REL', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
          }
        },
        {fieldName: 'INS_AMOUNT_NTS', dataType: 'number'},
        {fieldName: 'INS_AMOUNT_OTH', dataType: 'number'},
        {fieldName: 'REFUTE_AMOUNT', dataType: 'number'},
        {fieldName: 'DIFF_AMOUNT', dataType: 'number'},
        {fieldName: 'ACTUAL_AMOUNT', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'boolean' }
      ],
      columns: [
        {
          fieldName: 'DED_ABLE_MEDI', name: 'DED_ABLE_MEDI', width: 80,
          header: {'text': '공제'}, editable: false
        },
        {
          fieldName: 'MEDI_DED', header: '공제신청', width: 80,
          "sortable": false,
          "lookupDisplay": true,
          editable: false,
          renderer: { type: "check" },
          styleCallback: function(grid, dataCell){
            let ret = {};
            let val = grid.getValue(dataCell.index.itemIndex, "ROW_ATTRS");
            if(val.DED_ABLE_MEDI == '1') {
              ret.renderer = {
                type: "check",
                trueValues: "1",
                falseValues: "X,2"
              }
            }else {
              ret.renderer = {
                type:"html",
                callback: function(grid, cell, w, h) {
                  return "";
                }
              }
            }
            return ret;
          }
        },
        {fieldName: 'PERSON_NAME', header: '성명', editable: false},
        {fieldName: 'PERSON_RRN_FULL', header: '주민등록번호', editable: false},
        {fieldName: 'PERSON_REL', header: '관계', editable: false},
        {
          fieldName: 'INS_AMOUNT_NTS', header: '국세청', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'INS_AMOUNT_OTH', header: '기타', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'REFUTE_AMOUNT', header: '실손보험금', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DIFF_AMOUNT', header: '순일반의료비', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'ACTUAL_AMOUNT', header: '실공제대상금액', editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        this.getUpdateColumn(),
      ],
      rowAttrs: ['PATIENT_RRN_ID','DED_ABLE_MEDI','MEDI_DED','PERSON_NAME']
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
        console.error("MedicalExpense loadGridData err: ", e);
      }
    },

    addMedicalExpense() {
      let checkedRows = this.gridView.getCheckedRows();
      if (checkedRows.length < 1) {
        this.toastAlertSelect();
        return;
      }
      let _rowData = this.dataProvider.getJsonRow(checkedRows[0]);
      this.$refs.medicalExpenseModal.show({
        PERSON_NAME: _rowData['ROW_ATTRS']['PERSON_NAME'],
        PATIENT_RRN_ID: _rowData['ROW_ATTRS']['PATIENT_RRN_ID']
      });
    },
    saveDeductionSelect(){
      let me = this;
      let data = this.dataProvider.getJsonRows(0, -1);
      let family=[];

      if(me.gridView.isEditing()) {
        me.toastAlertEditing();
        return false;
      }

      me.gridView.commit();
      data.forEach(f => {
        let d = f.ROW_ATTRS; // 원래의 값이다.
        family.push({
          YES_ID: d.PATIENT_RRN_ID,
          MEDI_DED: f.MEDI_DED ? f.MEDI_DED : '2', // 화면에서 선택한 값이므로 f 의 medi_ded 를 써야 한다.
          DED_ABLE_MEDI: d.DED_ABLE_MEDI
        });
      });

      this.$httpPost({
        url: '/year-end/employee/deduction/request/settle-step',
        param: {
          'EID': this.eid,
          'ATT_YEAR': this.attYear,
          'CURRENT_STEP': this.step,
          'PAYDAY': this.payday,
          'FAMILY_LIST': JSON.stringify( family)
        },
        callback: function () {
          me.toastSuccessSave();
        }
      })
    },

    realgridCreatedCallback(){
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        grid.commit();
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.medicalExpenseModal.show({
            PERSON_NAME: _rowData['ROW_ATTRS']['PERSON_NAME'],
            PATIENT_RRN_ID: _rowData['ROW_ATTRS']['PATIENT_RRN_ID']
          });
        }
      }
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
      };
    }
  },
  mounted() {
    this.createRealGrid({
      'domId': 'medical-expense-grid',
      'editable': true
    });
    this.loadGridData();
  }
}
</script>