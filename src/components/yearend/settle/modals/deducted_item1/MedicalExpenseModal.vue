<template>
  <base-modal :title="title" id="medical-expense-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <button-panel btn-type="top">
        <template v-slot:start>
          <button class="btn btn-md flat" @click="addEmptyData"><i class="icon-lineIcon-plus mr-5"></i>
            추가
          </button>
        </template>
        <template v-slot:end>
          * 자료코드가 실손보험-배제액인 경우 지출액은 0으로 입력됩니다.
        </template>
      </button-panel>
      <div style="height: 400px;">
        <div id="medical-expense-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat mr-3" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black mr-3" @click="onSave()">
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';

import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import {mapGetters} from 'vuex';
import {getCodes} from '@/utils/yearendCodes';
import ButtonPanel from "../../../../common/ButtonPanel";
import {getYearendCodeList} from "../../../../../utils/yearendCodes";

export default {
  mixins: [modal, grid],
  components: {
    ButtonPanel,
    BaseModal
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
      title: '',
      medicalExpense: {
        PERSON_NAME: '',
        PATIENT_RRN_ID: 0
      },
      //grid
      fields: [],
      columns: [],
      rowAttrs: ['YES_ID', 'INP_REMARK', 'INP_FLAG', 'DATA_SOURCE', 'FERTIL_TREAT', 'NHI_SPECIAL_CASE', 'TYPE_WITH_FERTIL', 'AMOUNT',
        'MED_EVID_CODE', 'DATA_TYPE_CODE', 'MED_INST_NAME', 'MED_INST_NUM', 'EVID_COUNT',
        'EXP_AMOUNT', 'REFUTE_AMOUNT'],
      emptyRealGridData: {
        MED_EVID_CODE: '', DATA_TYPE_CODE: '', MED_INST_NAME: '',
        MED_INST_NUM: '', EVID_COUNT: '', EXP_AMOUNT: '', REFUTE_AMOUNT: '', DELETE: ''
      }
    }
  },
  methods: {
    //grid
    async loadGridData() {
      let me = this;
      try {
        let {data} = await me.$httpPost({
          url: '/year-end/employee/deduction/request/step-data-row',
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'PATIENT_RRN_ID': me.medicalExpense.PATIENT_RRN_ID,
            'CURRENT_STEP': 'MEDICINE',
            'PAYDAY': me.payday
          }
        });
        me.setRealgridData(data.list || []);
      } catch (e) {
        console.log("MedicalExpenseModal loadGridData error", e);
      }
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
        if (dataRow > -1) {
          if (field == me.dataProvider.getFieldIndex("TYPE_WITH_FERTIL")) {
            if(grid.getValue(itemIndex, "TYPE_WITH_FERTIL") == "G0040"){
              // grid.setColumnProperty("EXP_AMOUNT","editable", false); //
              me.dataProvider.setValue(itemIndex,me.dataProvider.getFieldIndex("EXP_AMOUNT"), 0);
            }
          }
          if (field == me.dataProvider.getFieldIndex("EXP_AMOUNT")) {
            if(grid.getValue(itemIndex, "TYPE_WITH_FERTIL") == "G0040"){
              me.dataProvider.setValue(itemIndex,me.dataProvider.getFieldIndex("EXP_AMOUNT"), 0);
            }
          }
        }
        grid.commit();
      };
    },
    setDataTypeCode(medi) {
      switch (medi.TYPE_WITH_FERTIL) {
        case 'G0040':
          medi.EXP_AMOUNT = 0;
          break;
        case 'G0003-1':
          medi.DATA_TYPE_CODE = 'G0003';
          medi.FERTIL_TREAT = '1';
          break;
        case 'G0003-2':
          medi.DATA_TYPE_CODE = 'G0003';
          medi.NHI_SPECIAL_CASE = '1';
          break;
        default:
          medi.FERTIL_TREAT = 'x';
          medi.NHI_SPECIAL_CASE = '2';
          break;
      }
    },

    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'medical-expense-modal-grid',
        'editable': true,
        'useNormalDelete': true
      });
    },
    async asyncDynamicComponentData(param) {
      try {
        this.medicalExpense.PERSON_NAME = param['PERSON_NAME'];
        this.medicalExpense.PATIENT_RRN_ID = param['PATIENT_RRN_ID'];
        this.emptyRealGridData.PERSON_NAME = param['PERSON_NAME'];
        this.emptyRealGridData.PATIENT_RRN_ID = param['PATIENT_RRN_ID'];
        this.title = param['PERSON_NAME']+ '의 의료비';
        await this.loadGridData();
      } catch (e) {
        console.error("MedicalExpenseModal asyncLoad err: ", e);
      }
    },
    getParameter(rowAttrs, data = {}) {
      let _params = {
        ...rowAttrs,
        ...data,
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
        'PATIENT_RRN_ID': this.medicalExpense.PATIENT_RRN_ID,
        'CURRENT_STEP': 'MEDICINE',
      }
      return _params;
    },
    getGridData(_rowData) {
      let _gridData = {
        'YES_ID': this.payrollUtil.getString(_rowData['YES_ID']),
        'MED_EVID_CODE': this.payrollUtil.getString(_rowData['MED_EVID_CODE']),
        'TYPE_WITH_FERTIL': this.payrollUtil.getString(_rowData['TYPE_WITH_FERTIL']),
        'DATA_TYPE_CODE': this.payrollUtil.getString(_rowData['DATA_TYPE_CODE']),
        'MED_INST_NAME': this.payrollUtil.getString(_rowData['MED_INST_NAME']),
        'MED_INST_NUM': this.payrollUtil.getString(_rowData['MED_INST_NUM']),
        'EVID_COUNT': this.payrollUtil.getNumber(_rowData['EVID_COUNT']),
        'EXP_AMOUNT': this.payrollUtil.getNumber(_rowData['EXP_AMOUNT']),
        'REFUTE_AMOUNT': this.payrollUtil.getNumber(_rowData['REFUTE_AMOUNT']),
        'FERTIL_TREAT': this.payrollUtil.getString(_rowData['FERTIL_TREAT']),
        'NHI_SPECIAL_CASE': this.payrollUtil.getString(_rowData['NHI_SPECIAL_CASE']),
      }
      return _gridData;
    },
    async onSave() { //저장
      let me = this;
      let stateRows = this.dataProvider.getAllStateRows();
      let list = [];
      let delList = [];
      for (let i = 0; i < stateRows.created.length; i++) {
        let _rowData = this.dataProvider.getJsonRow(stateRows.created[i]);
        me.setDataTypeCode(_rowData);
        list.push(this.getParameter({}, this.getGridData(_rowData)));
      }
      for (let i = 0; i < stateRows.updated.length; i++) {
        let _rowData = this.dataProvider.getJsonRow(stateRows.updated[i]);
        me.setDataTypeCode(_rowData);
        list.push(this.getParameter(_rowData['ROW_ATTRS'], this.getGridData(_rowData)));
      }
      for (let i = 0; i < stateRows.deleted.length; i++) {
        let _rowData = this.dataProvider.getJsonRow(stateRows.deleted[i]);
        delList.push(this.getParameter(_rowData['ROW_ATTRS']));
      }

      try {
        await this.$httpPost({
          url: "/year-end/employee/deduction/request/save/medicine",
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'PATIENT_RRN_ID': me.medicalExpense.PATIENT_RRN_ID,
            'CURRENT_STEP': 'MEDICINE',
            'PAYDAY': me.payday,
            list: JSON.stringify(list),
            delList: JSON.stringify(delList)
          },
          callback: function () {
            me.toastSuccessSave();
          }
        });
        this.loadGridData();
      } catch (e) {
        console.error('MedicalExpenseModal onSave Error: ', e);
      }
    }
  },
  async created() {
    let me = this;
    const code = getYearendCodeList();

    try {
      this.fields = [
        {fieldName: 'YES_ID', dataType: 'text'},
        {fieldName: 'FERTIL_TREAT', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'MED_EVID_CODE', dataType: 'text'},
        {fieldName: 'DATA_TYPE_CODE', dataType: 'text'},
        {fieldName: 'TYPE_WITH_FERTIL', dataType: 'text'},
        {fieldName: 'MED_INST_NAME', dataType: 'text'},
        {fieldName: 'MED_INST_NUM', dataType: 'text'},
        {fieldName: 'EVID_COUNT', dataType: 'number'},
        {fieldName: 'EXP_AMOUNT', dataType: 'number'},
        {fieldName: 'REFUTE_AMOUNT', dataType: 'number'},
        {fieldName: "DELETE", dataType: 'text'}
      ];
      this.columns = [
        {
          fieldName: 'MED_EVID_CODE', header: '의료증빙코드',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.evidCode.codeList,
          "labels": code.evidCode.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }, width: 170
        },
        {
          fieldName: 'TYPE_WITH_FERTIL', header: '자료코드',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.dataTypeCode.codeList,
          "labels": code.dataTypeCode.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }, width: 170
        },
        {fieldName: 'MED_INST_NAME', header: '지급처상호'},
        {fieldName: 'MED_INST_NUM', header: '지급처사업자번호'},
        {
          fieldName: 'EVID_COUNT', header: '건수',
          numberFormat: "0", nanText: '0', width: 70
        },
        {
          fieldName: 'EXP_AMOUNT', header: '지출액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'REFUTE_AMOUNT', header: '실손보험금',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getDeleteColumn()
      ];
    } catch (e) {
      console.log("async created err: ", e);
    }
  }
}
</script>