<template>
  <base-modal :title="title" id="education-expense-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <button-panel btn-type="top"
                    v-bind:add=true
                    v-on:add="addEmptyData"/>
      <div class="">
        <div id="education-expense-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md mr-3" data-dismiss="modal" aria-label="Close">
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
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import {mapGetters} from 'vuex';
import {getYearendCodeList} from '@/utils/yearendCodes';
import ButtonPanel from "../../../../common/ButtonPanel";

export default {
  mixins: [modal, grid],
  components: {
    ButtonPanel,
    BaseModal,
    TableForm,
    TableFormItem,
    TableFormLabel
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
      mountParam: {},
      emptyRealGridData: {
        PERSON_NAME: '',
        FAMILY_RRN_ID:'',
        DATA_SOURCE: '',
        SCHOOL_TYPE: '',
        TUITION_TYPE: '',
        TUITION: 0,
        TUITION_ADJ: '',
        CURRENT_STEP: 'EDUCATION'
      },
      educationExpense: {
        PERSON_NAME: {
          value: '',
          labels: [],
          values: []
        },
        FAMILY_RRN_ID: 0
      },
      fields:[],
      columns:[],
      rowAttrs: ['YES_ID', 'INP_REMARK', 'INP_FLAG', 'DED_SELECT',
        'DATA_SOURCE', 'SCHOOL_TYPE', 'TUITION_TYPE', 'TUITION', 'TUITION_ADJ']
    }
  },
  methods: {
    resetComponent() {
      const me = this;
      const code = getYearendCodeList();

      me.fields = [
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'PERSON_AGE', dataType: 'text'},
        {fieldName: 'DATA_SOURCE', dataType: 'text'},
        {fieldName: 'SCHOOL_TYPE', dataType: 'text'},
        {fieldName: 'TUITION_TYPE', dataType: 'text'},
        {fieldName: 'TUITION', dataType: 'number'},
        {fieldName: 'TUITION_ADJ', dataType: 'number'},
        {fieldName: "DELETE", dataType: 'text'}
      ],
      me.columns = [
        {fieldName: 'DATA_SOURCE', header: '자료출처',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.dataSource.codeList,
          "labels": code.dataSource.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {fieldName: 'SCHOOL_TYPE', header: '학교종류',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.schoolType.codeList,
          "labels": code.schoolType.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {fieldName: 'TUITION_TYPE', header: '비용종류',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.tuitionType.codeList,
          "labels": code.tuitionType.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'TUITION', header: '납입금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'TUITION_ADJ', header: '배제액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getDeleteColumn()
      ];
    },
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/step-data-row',
          param: {
            'EID': this.eid,
            'ATT_YEAR': this.attYear,
            'FAMILY_RRN_ID': this.educationExpense.FAMILY_RRN_ID,
            'CURRENT_STEP': 'EDUCATION',
            'PAYDAY': this.payday
          }
        });
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.log("EducationExpense loadGridData error", e);
      }
    },

    //modal callback
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'education-expense-modal-grid',
        'editable': true,
        'useNormalDelete': true
      });
    },
    async asyncDynamicComponentData(param) {
      const me = this;
      try {
        me.educationExpense.FAMILY_RRN_ID = param['FAMILY_RRN_ID'];
        me.educationExpense.PERSON_NAME.value = param['PERSON_NAME'];
        me.emptyRealGridData.PERSON_NAME = param['PERSON_NAME'];
        me.emptyRealGridData.FAMILY_RRN_ID = param['PATIENT_RRN_ID'];
        me.title = param['PERSON_NAME']+ '의 교육비';
        await me.loadGridData();
      } catch (e) {
        console.error("EducationExpenseModal asyncLoad err: ", e);
      }
    },
    //modal method
    validationProcess() {
      let hasError = false;
      if (this.payrollUtil.isEmpty(this.educationExpense.TUITION)) {
        hasError = true;
        //this.errors.TUITION = '납입금액을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.educationExpense.TUITION_ADJ)) {
        hasError = true;
        //this.errors.TUITION_ADJ = '배제액을 입력해 주세요.';
      }
      if (hasError)
        return false;
      return true;
    },
    getParameter() {
      let _params = {
        ...this.mountParam,
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
        'YES_ID': this.educationExpense.FAMILY_RRN_ID,
        'FAMILY_RRN_ID': this.educationExpense.FAMILY_RRN_ID,
        'DATA_SOURCE': this.educationExpense.DATA_SOURCE.value,
        'SCHOOL_TYPE': this.educationExpense.SCHOOL_TYPE.value,
        'TUITION_TYPE': this.educationExpense.TUITION_TYPE.value,
        'TUITION': this.educationExpense.TUITION,
        'TUITION_ADJ': this.educationExpense.TUITION_ADJ
      };
      return _params;
    },
    async onSave() {
      let me = this;
      if (!this.validationProcess())
        return;
      let _params = this.getParameter();
      try {
        await this.$httpPost({
          url: "/year-end/employee/deduction/request/save",
          param: _params,
          callback: function () {
            me.toastSuccessSave();
          }
        });
        this.resetComponent();
        await this.loadGridData();
      } catch (e) {
        console.error("EducationExpenseModal onSave Error: ", e);
      }
    },
    async onDelete() {
      let me = this;
      this.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: async function () {
          if (!me.validationProcess())
            return;
          let _params = me.getParameter();
          try {
            await me.$httpPost({
              url: "/year-end/employee/deduction/request/delete",
              param: _params,
              callback: function () {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
            me.resetComponent();
          } catch (e) {
            console.error('EducationExpenseModal onDelete Error: ', e);
          }
        }
      });
    },
    addEduExpense(){

    }
  },
  created() {
    this.resetComponent();
  },
}
</script>