<template>
  <div>
    <div class="row">
      <grid-title title="외납세액">
        <button class="btn btn-md flat" @click="addForeignTax"><i class="icon-lineIcon-check mr-5"></i>
          입력
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="foreign-tax-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <foreign-tax-input-modal ref="foreignTaxInputModal" @close="loadGridData()"/>
    <foreign-tax-month-modal ref="foreignTaxMonthModal"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import ForeignTaxInputModal from '@/components/yearend/settle/modals/deducted_item2/ForeignTaxInputModal';
import ForeignTaxMonthModal from '@/components/yearend/settle/modals/deducted_item2/ForeignTaxMonthModal';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    ForeignTaxInputModal,
    ForeignTaxMonthModal,
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
      step: 'FOREIGN_TAX',
      countries:{
        items: [],
        values: [],
        labels: []
      },
      // grid
      fields: [
        {fieldName: 'COUNTRY_NAME', dataType: 'text'},
        {fieldName: 'FORIGN_TAX_PAYMENT_DATE', dataType: 'text'},
        {fieldName: 'FOREIGN_SOURCE_INCOME', dataType: 'number'},
        {fieldName: 'FOREIGN_TAX_AMT_LC', dataType: 'number'},
        {fieldName: 'FOREIGN_TAX_CREDIT', dataType: 'number'},
        {fieldName: 'FOREIGN_TAX_BALANCE', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'text'},
        {fieldName: 'DELETE', dataType: 'text'},
      ],
      columns: [
        {fieldName: 'COUNTRY_NAME', header: '납세국', styleName: 'left-column'},
        {fieldName: 'FORIGN_TAX_PAYMENT_DATE', header: '납부일'},
        {
          fieldName: 'FOREIGN_SOURCE_INCOME', header: '국외원천소득',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'FOREIGN_TAX_AMT_LC', header: '납세액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'FOREIGN_TAX_CREDIT', header: '기공제액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        {
          fieldName: 'FOREIGN_TAX_BALANCE', header: '미공제액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      rowAttrs: ['APPL_YEAR', 'INPUT_DATE', 'YES_ID', 'FOREIGN_SOURCE_INCOME', 'FOREIGN_TAX_AMT_LC', 'WORK_COUNTRY', 'FORIGN_TAX_PAYMENT_DATE',
        'FOREIGN_TAX_AMT_FX', 'FOREIGN_TAX_FXT', 'WORK_START_DATE', 'WORK_END_DATE', 'APPL_SUBMIT_DATE', 'WORK_LOCATION', 'WORK_POST', 'FOREIGN_EXEMPT_INCOME1',
        'EXEMPT_RATE1', 'FOREIGN_EXEMPT_INCOME2', 'EXEMPT_RATE2', 'FOREIGN_EXEMPT_INCOME3', 'EXEMPT_RATE3']
    }
  },
  methods: {
    findCountryName(code){
      const me = this;
      let i=0;
      for(; i < me.countryList.length; i++){
        if(me.countryList[i].CODE_2DIGIT==code){
          return me.countryList[i].COUNTRY_NAME;
        }
      }
      return '';
    },
    async loadGridData() {
      const me = this;
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'CURRENT_STEP': me.step,
            'PAYDAY': me.payday
          }
        });
        for(let r of data.list){
          r.COUNTRY_NAME = me.countries.values[r.WORK_COUNTRY];
        }
        me.setRealgridData(data.list || []);
      } catch (e) {
        console.error("ForeignTax loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.foreignTaxInputModal.show({
            ..._rowData['ROW_ATTRS'],
            COUNTRY_LIST: me.countries.items,
          });
        }
        if (clickData.column == 'DELETE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow).ROW_ATTRS;
          me.delete({
            ..._rowData,
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'PAYDAY': me.payday,
            'CURRENT_STEP': me.step
          });
        }
      }
    },
    addForeignTax() {
      const me = this;
      me.$refs.foreignTaxInputModal.show({
        COUNTRY_LIST: me.countries.items,
      });
    },
    addMonthlyAmount() {
      this.$refs.foreignTaxMonthModal.show();
    },
    delete(data) {
      let me = this;
      this.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function () {
          me.$httpPost({
            url: "/year-end/employee/deduction/request/delete",
            param: data,
            callback: function () {
              me.toastSuccessDelete();
              me.loadGridData();
            }
          });
        }
      });
    },
    async loadCountry() {
      const me = this;
      let {data} = await me.$httpGet('/system/setting/country/list', {SHOW_FLAG: 'Y'}) || [];
      let code;
      let name;
      for (let i = 0; i < data.length; i++) {
        code = data[i]['CODE_2DIGIT'];
        name = code+'-'+data[i]['COUNTRY_NAME'];
        me.countries.items.push({
          message: name,
          code: code
        });
        me.countries.values[code] = name;
      }
    }
  },
  async mounted() {
    this.createRealGrid({'domId': 'foreign-tax-grid'});
    await this.loadCountry();
    await this.loadGridData();
  }
}
</script>
