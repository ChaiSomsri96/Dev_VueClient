<template>
  <base-modal :title="title" id="donation-input-modal" :scroll="false" width="1250">
    <template v-slot:body>
      <button-panel btn-type="top"
                    v-bind:add=true
                    v-on:add="addEmptyData"/>
      <div>
        <div id="donation-input-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
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
      step: 'DONATION',
      emptyRealGridData: {
        DONOR_RRN_ID: '',
        PERSON_NAME: '',
        DONA_TYPE: '',
        DATA_SOURCE: '2',
        DONA_METHOD: '1',
        DONEE_NUMBER: '',
        DONEE_NAME: '',
        DONA_COUNT: '',
        DONA_DEDUCTIBLE: '',
        DONA_SUBSIDY: '',
        DONA_ADJ: '',
        CURRENT_STEP: 'DONATION'
      },
      fields: [
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'DATA_SOURCE', dataType: 'text'},
        {fieldName: 'DONA_TYPE', dataType: 'text'},
        {fieldName: 'DONA_METHOD', dataType: 'text'},
        {fieldName: 'DONEE_NUMBER', dataType: 'text'},
        {fieldName: 'DONEE_NAME', dataType: 'text'},
        {fieldName: 'DONA_COUNT', dataType: 'text'},
        {fieldName: 'DONA_DEDUCTIBLE', dataType: 'number'},
        {fieldName: 'DONA_SUBSIDY', dataType: 'number'},
        {fieldName: 'DONA_ADJ', dataType: 'number'},
        {fieldName: "DELETE", dataType: 'text'}
      ],
      columns: [],
      rowAttrs: ['YES_ID', 'INP_REMARK', 'INP_FLAG', 'PERSON_NAME',
        'DATA_SOURCE', 'DONA_TYPE', 'DONA_METHOD', 'DONEE_NUMBER', 'DONEE_NAME', 'DONA_COUNT',
        'DONA_DEDUCTIBLE', 'DONA_SUBSIDY', 'DONA_ADJ', 'DONA_AMOUNT']
    }
  },
  methods: {
    resetParameter() {
      const me = this;
      const code = getYearendCodeList();

      me.columns = [
        {
          fieldName: 'DATA_SOURCE', header: '원천', width: 60,
          "sortable": false,
          "lookupDisplay": true,
          "values": code.dataSource.codeList,
          "labels": code.dataSource.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'DONA_TYPE', header: '기부유형', width: 120, styleName: 'left-column',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.donaType.codeList,
          "labels": code.donaType.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'DONA_METHOD', header: '기부내용', width: 60,
          "sortable": false,
          "lookupDisplay": true,
          "values": code.donaMethod.codeList,
          "labels": code.donaMethod.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {fieldName: 'DONEE_NUMBER', header: {text: '기부처\n사업자번호', styleName: 'multi-line-css-header'}, width: 90},
        {fieldName: 'DONEE_NAME', header: '기부처명', width: 120},
        {fieldName: 'DONA_COUNT', header: '건수', width: 50},
        {
          fieldName: 'DONA_DEDUCTIBLE', header: {text: '공제대상\n기부금', styleName: 'multi-line-css-header'}, width: 80,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DONA_SUBSIDY', header: {text: '기부장려금\n신청액', styleName: 'multi-line-css-header'}, width: 80,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DONA_ADJ', header: {text: '기타\n공제제외', styleName: 'multi-line-css-header'}, width: 60,
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getDeleteColumn({columnWidth:45})
      ];
    },
    resetComponent() {
      this.errors = {};
      this.resetParameter();
    },
    async loadGridData() {
      const me = this;
      const param = me.getParameter();
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/step-data-row',
          param: param
        });
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.log("DonationInputModal loadGridData error", e);
      }
    },
    addRealGridOption() {
      this.gridView.header.height = 50;
      this.gridView.setStateBar({visible: false});
    },
    //modal
    createDynamicComponent() {
      this.createRealGrid({
        domId: 'donation-input-modal-grid',
        editable: true,
        useNormalDelete: true
      });
    },
    async asyncDynamicComponentData(param) {
      const me = this;
      me.resetParameter();
      me.emptyRealGridData.PERSON_NAME = param['PERSON_NAME'];
      me.emptyRealGridData.DONOR_RRN_ID = param['DONOR_RRN_ID'];
      me.title = param['PERSON_NAME']+ '의 기부금';
      await me.loadGridData();
    },
    //method
    getParameter() {
      const me = this;
      let _params = {
        'ATT_YEAR': me.attYear,
        'PAYDAY': me.payday,
        'EID': me.eid,
        'CURRENT_STEP': me.step,
        'DONOR_RRN_ID': me.emptyRealGridData.DONOR_RRN_ID
      };
      return _params;
    },

    isValidRow(val) {
      const me = this;
      me.errors = {hasError: false};
      if (me.payrollUtil.isEmpty(val.DONEE_NUMBER)) {
        me.errors.hasError = true;
      }
      if (me.payrollUtil.isEmpty(val.DONEE_NAME)) {
        me.errors.hasError = true;
      }
      if (me.payrollUtil.isEmpty(val.DONA_COUNT)) {
        me.errors.hasError = true;
      }
      if (me.payrollUtil.isEmpty(val.DONA_DEDUCTIBLE)) {
        me.errors.hasError = true;
      }
    },

    isValidList(saveList){
      const me = this;
      if(saveList && saveList.length > 0){
        saveList.forEach(function(v){
          me.isValidRow(v);
        })
      }
      return ! me.errors.hasError;
    },

    async onSave() {
      const me = this;
      let _params = me.getParameter();
      let gridData = me.getSaveDeleteRows(me.dataProvider, _params);
      if( ! me.isValidList(gridData.save)){
        me.toast({message: '기부처 사업자번호/기부처명, 기부건수, 공제대상 기부금은 필수입력 항목입니다.', type:"error"});
        return false;
      }

      try {
        await me.$httpPost({
          url: "/year-end/employee/deduction/request/save/dona",
          param: {
            ..._params,
            'saveList': JSON.stringify(gridData.save || []),
            'delList': JSON.stringify(gridData.delete || [])
          },
          callback: function () {
            me.toastSuccessSave();
            me.resetComponent();
            me.close();
          }
        });
      } catch (e) {
        console.error('DonationInputModal onSave Error: ', e);
      }
    }
  },
  async created() {
    const me = this;
    me.resetComponent();
  },
}
</script>