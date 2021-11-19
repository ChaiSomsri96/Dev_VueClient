<template>
  <div>
    <div class="row">
      <grid-title title="의료비">
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="education-expense-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
    </div>
    <button-panel btn-type="bottom">
      <template v-slot:start>
        <button class="btn btn-md black" @click="saveDeductionSelect()"><i class="icon-lineIcon-check mr-5"></i>
          공제신청내역 저장
        </button>
      </template>
    </button-panel>
    <education-expense-modal ref="educationExpenseModal"/>
  </div>
</template>
<script>
import grid from '@/mixin/payroll-grid';
import yearendMixin from '@/mixin/yearend';
import EducationExpenseModal from '@/components/yearend/settle/modals/deducted_item1/EducationExpenseModal';
import GridTitle from '@/components/common/GridTitle';
import {dedAbleRenderer} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import ButtonPanel from "../../../../components/common/ButtonPanel";

export default {
  mixins: [grid,yearendMixin],
  components: {
    ButtonPanel,
    EvidenceButton,
    EducationExpenseModal,
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
      step: 'EDUCATION',
      fields: [
        {
          fieldName: 'DED_ABLE_EDU', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dedAbleRenderer(values[fieldNames.indexOf("DED_ABLE_EDU")]);
          }
        },
        {fieldName: 'EDU_DED', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'TUITION_NTS_1', dataType: 'number'},
        {fieldName: 'TUITION_1', dataType: 'number'},
        {fieldName: 'TUITION_NTS_2', dataType: 'number'},
        {fieldName: 'TUITION_2', dataType: 'number'},
        {fieldName: 'TUITION_NTS_3', dataType: 'number'},
        {fieldName: 'TUITION_3', dataType: 'number'},
        {fieldName: 'TUITION_NTS_4', dataType: 'number'},
        {fieldName: 'TUITION_4', dataType: 'number'},
        {fieldName: 'TUITION_NTS_5', dataType: 'number'},
        {fieldName: 'TUITION_5', dataType: 'number'},
        {fieldName: 'TUITION_ADJ', dataType: 'number'},
        {fieldName: 'TUITION_SUM', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'boolean'}
      ],
      columns: [
        {header: "공제", fieldName: "DED_ABLE_EDU", editable: false, width: 80},
        {
          fieldName: 'EDU_DED', header: '공제신청', width: 80,
          "sortable": false,
          "lookupDisplay": true,
          editable: false,
          renderer: {type: "check"},
          styleCallback: function (grid, dataCell) {
            let ret = {};
            let val = grid.getValue(dataCell.index.itemIndex, "ROW_ATTRS");
            if (val.DED_ABLE_EDU == '1') {
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
        {header: "성명", fieldName: "PERSON_NAME", editable: false},
        {
          header: "국세청", fieldName: "TUITION_NTS_1", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "기타", fieldName: "TUITION_1", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "국세청", fieldName: "TUITION_NTS_2", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "기타", fieldName: "TUITION_2", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "국세청", fieldName: "TUITION_NTS_3", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "기타", fieldName: "TUITION_3", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "국세청", fieldName: "TUITION_NTS_4", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "기타", fieldName: "TUITION_4", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "국세청", fieldName: "TUITION_NTS_5", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "기타", fieldName: "TUITION_5", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "배제액", fieldName: "TUITION_ADJ", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          header: "합계액(순)", fieldName: "TUITION_SUM", editable: false,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        this.getUpdateColumn()
      ],
      layout: ['DED_ABLE_EDU', 'EDU_DED', 'PERSON_NAME',
        {
          name: 'TUITION_1Group', direction: "horizontal",
          items: ["TUITION_NTS_1", "TUITION_1"],
          header: {text: "수업료등"}
        },
        {
          name: 'TUITION_2Group', direction: "horizontal",
          items: ["TUITION_NTS_2", "TUITION_2"],
          header: {text: "직업훈련비"}
        },
        {
          name: 'TUITION_3Group', direction: "horizontal",
          items: ["TUITION_NTS_3", "TUITION_3"],
          header: {text: "교복구입비"}
        },
        {
          name: 'TUITION_4Group', direction: "horizontal",
          items: ["TUITION_NTS_4", "TUITION_4"],
          header: {text: "체험학습비"}
        },
        {
          name: 'TUITION_5Group', direction: "horizontal",
          items: ["TUITION_NTS_5", "TUITION_5"],
          header: {text: "학자금상환"}
        },
        'TUITION_ADJ', 'TUITION_SUM', 'UPDATE'
      ],
      rowAttrs: ['FAMILY_RRN_ID', 'DED_ABLE_EDU', 'PERSON_NAME']
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
        console.error("EducationalExpense loadGridData err: ", e);
      }
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
          YES_ID: d.FAMILY_RRN_ID,
          FAMILY_RRN_ID: d.FAMILY_RRN_ID,
          EDU_DED: f.EDU_DED ? f.EDU_DED : '2', // 화면에서 선택한 값이므로 f 의 medi_ded 를 써야 한다.
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

    addRealGridOption() {
      this.gridView.header.height = 72;
    },

    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        grid.commit();
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.educationExpenseModal.show({
            PERSON_NAME: _rowData['ROW_ATTRS']['PERSON_NAME'],
            FAMILY_RRN_ID: _rowData['ROW_ATTRS']['FAMILY_RRN_ID']
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
      'domId': 'education-expense-grid',
      'editable': true
    });
    this.loadGridData();
  }
}
</script>