<template>
  <base-modal :title="title" id="credit-card-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <button-panel btn-type="top"
                    v-bind:add=true
                    v-on:add="addEmptyData">
        <template v-slot:end>
          <div class="mr-2">* 국세청간소화 파일 데이터는 수정할 수 없고, 삭제만 가능합니다.</div>
        </template>
      </button-panel>
      <div class="">
        <div id="credit-card-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
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
import {getYearendCodeList} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
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
      step: 'CREDIT_CARD',
      emptyRealGridData: {
        CARD_RRN_ID: '',
        PERSON_NAME: '',
        CARD_PERIOD: '3',
        CARD_TYPE: '',
        DATA_SOURCE: '',
        CARD_USE_TYPE: '',
        TUITION_TYPE: '',
        CARD_AMOUNT: 0,
        CRED_CARD_REFUTE: '',
        CURRENT_STEP: 'CREDIT_CARD',
        INP_FLAG: 'M'
      },
      fields:  [
        {fieldName: 'INP_FLAG', dataType: 'text'},
        {fieldName: 'YES_ID', dataType: 'text'},
        {fieldName: 'CARD_YEAR', dataType: 'text'},
        {fieldName: 'CARD_RRN_ID', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'CARD_TYPE', dataType: 'text'},
        {fieldName: 'CARD_USE_TYPE', dataType: 'text'},
        {fieldName: 'CARD_PERIOD', dataType: 'text'},
        {fieldName: 'DATA_SOURCE', dataType: 'text'},
        {fieldName: 'CARD_AMOUNT', dataType: 'number'},
        {fieldName: 'CRED_CARD_REFUTE', dataType: 'number'},
        {fieldName: "DELETE", dataType: 'text'}
      ],
      columns: [],
      rowAttrs: [
        'YES_ID','EID','PAYDAY','CARD_RRN_ID','DATA_SOURCE',
        'CARD_TYPE','CARD_YEAR','CARD_PERIOD','CARD_USE_TYPE',
        'CARD_AMOUNT','CRED_CARD_REFUTE','INP_FLAG','INP_REMARK','CARD_AMOUNT_NTS',
      ]
    }
  },
  methods: {
    resetComponent() {
      const me = this;
      const code = getYearendCodeList();

      me.columns = [
        {
          fieldName: 'INP_FLAG', header: '입력구분',
          "sortable": false,
          "lookupDisplay": true,
          editable: false,
          "values": ["S","T","M"," "],
          "labels": ["국세청 간소화파일","국세청 간편파일","수동입력","수동입력"],
          "nanText": "수동입력",
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'DATA_SOURCE', header: '원천',
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
          fieldName: 'CARD_TYPE', header: '카드종류',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.cardType.codeList,
          "labels": code.cardType.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'CARD_USE_TYPE', header: '사용종류',
          "sortable": false,
          "lookupDisplay": true,
          "values": code.cardUseType.codeList,
          "labels": code.cardUseType.valueList,
          "editor": {
            "type": "dropdown",
            "dropDownCount": 4
          }
        },
        {
          fieldName: 'CARD_AMOUNT', header: '사용액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'CRED_CARD_REFUTE', header: '차감액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getDeleteColumn()
      ];
    },
    async loadGridData() {
      const me = this;

      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/step-data-row',
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'CURRENT_STEP':	me.step,
            'CARD_RRN_ID': me.emptyRealGridData.CARD_RRN_ID
          }
        });
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.log("CreditCardInputModal loadGridData error", e);
      }
    },

    //modal
    createDynamicComponent() {
      const me = this;
      me.createRealGrid({
        domId: 'credit-card-modal-grid',
        editable: true,
        useNormalDelete: true,
        rowEditableFunction: function(row){
          if( row['ROW_ATTRS']){
            return (row['ROW_ATTRS']['INP_FLAG'] !== 'S' && row['ROW_ATTRS']['INP_FLAG'] !== 'T');
          }
          return true;
        }
      });
    },
    async asyncDynamicComponentData(param) {
      const me = this;
      me.emptyRealGridData.EID = me.eid;
      me.emptyRealGridData.ATT_YEAR = me.attYear;
      me.emptyRealGridData.PERSON_NAME = param['PERSON_NAME'];
      me.emptyRealGridData.CARD_RRN_ID = param['CARD_RRN_ID'];
      me.emptyRealGridData.CARD_YEAR= me.attYear;
      me.title = param['PERSON_NAME']+ '의 신용카드 사용내역';

      await me.loadGridData();
    },
    async onSave() {
      let me = this;
      let rows = me.getSaveDeleteRows(me.dataProvider,{
        'EID': me.eid,
        'ATT_YEAR': me.attYear,
        'PAYDAY': me.payday,
        'CARD_RRN_ID': me.emptyRealGridData.CARD_RRN_ID
      });
      try {
        await this.$httpPostBody({
          url: "/year-end/employee/deduction/request/save/card",
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'PAYDAY': me.payday,
            'CARD_RRN_ID': me.emptyRealGridData.CARD_RRN_ID,
            'saveList': JSON.stringify(rows.save),
            'delList': JSON.stringify(rows.delete)
          },
          callback: function () {
            me.toastSuccessSave();
            me.close();
          }
        });
        await this.loadGridData();
      } catch (e) {
        console.error('DonationMonthModal onSave Error: ', e);
      }
    }
  },
  created() {
    this.resetComponent();
  },
}
</script>