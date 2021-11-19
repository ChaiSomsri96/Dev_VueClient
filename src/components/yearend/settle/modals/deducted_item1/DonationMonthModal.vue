<template>
  <base-modal title="이월액입력" id="donation-month-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <button-panel btn-type="top"
                    v-bind:add=true
                    v-on:add="addEmptyData"/>
      <div class="">
        <div id="donation-month-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
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
import {mapGetters} from 'vuex';
import ButtonPanel from "../../../../common/ButtonPanel";
import {getYearendCodeList,originFlagRenderer} from '@/utils/yearendCodes';

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
      monthAmount: {},
      emptyRealGridData: {
        "EID": 0,
        "ATT_YEAR": '',
        "DONA_YEAR": '',
        "INPUT_YEAR": '',
        "DONA_TYPE": '',
        "ORIGIN_FLAG": 'P',
        "CARRY_EXPIRED": 0,
        "DED_TARGET": 0,
        "DONA_AMT_PTR": 0,
        "PREV_DED": 0,
        "DONA_AMOUNT": 0,
        "PAYDAY": "",
        "CARRY_FORWARD": 0,
        "INP_FLAG": "M",
        "CURR_DEDUCT": 0,
      },
      fields: [
        {fieldName: 'DONA_YEAR', dataType: 'text'},
        {fieldName: 'DONA_TYPE', dataType: 'text'},
        {fieldName: 'DONA_AMOUNT', dataType: 'number'},
        {fieldName: 'DONA_AMT_PTR', dataType: 'number'},
        {fieldName: 'PREV_DED', dataType: 'number'},
        {fieldName: 'COMP_DEDUCT', dataType: 'number'},
        {fieldName: 'COMP_TAX_RETURN_AMT', dataType: 'number'},
        {fieldName: 'CARRY_EXPIRED', dataType: 'number'},
        {fieldName: 'DED_TARGET', dataType: 'number'},
        {fieldName: 'DELETE', dataType: 'boolean',

        },
      ],
      columns: [],
      rowAttrs: ['DONA_YEAR', 'DONA_TYPE', 'ORIGIN_FLAG', 'DONA_AMOUNT', 'PREV_DED', 'DONA_AMT_PTR', 'CURR_DEDUCT']
    }
  },
  methods: {
    resetComponent() {
      const me = this;
      const code = getYearendCodeList();
      me.columns = [
        {fieldName: 'DONA_YEAR', header: '기부연도', width: 80},
        {
          fieldName: 'DONA_TYPE', header: '기부유형', width: 150, styleName: 'left-column',
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
          fieldName: 'DONA_AMOUNT', header: '기부금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DONA_AMT_PTR', header: {
            text: '종소신고로\n추가된 기부금',
            styleName: 'multi-line-css-header'
          },
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'PREV_DED', header: '기 공제액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'COMP_DEDUCT', header: {
            text: '종소신고로\n추가된 공제액\n(직전년이전)',
            styleName: 'multi-line-css-header'
          },
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'COMP_TAX_RETURN_AMT', header: {
            text: '종소신고로\n추가된 공제액\n(직전년)',
            styleName: 'multi-line-css-header'
          },
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'CARRY_EXPIRED', header: '소멸된 금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'DED_TARGET', header: '이월금액',
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
        let {data} = await this.$httpGet('/year-end/employee/donation/carry/list', {
          'EID': this.eid,
          'PAYDAY': this.payday
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.log("DonationMonthModal loadGridData error", e);
      }
    },

    //modal
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'donation-month-modal-grid',
        'editable': true,
        'useNormalDelete': true
      });
    },
    asyncDynamicComponentData(param) {
      const me = this;
      me.loadGridData();
      me.emptyRealGridData.EID = me.eid;
      me.emptyRealGridData.ATT_YEAR = me.attYear;
      me.emptyRealGridData.PAYDAY = me.payday;
    },

    //이월액 팝업 저장
    async onSave() {
      let me = this;
      let rows = me.getSaveDeleteRows(me.dataProvider,{
        'EID': me.eid,
        'ATT_YEAR': me.attYear,
        'PAYDAY': me.payday
      });
      try {
        await this.$httpPostBody({
          url: "/year-end/employee/donation/carry/save",
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'PAYDAY': me.payday,
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