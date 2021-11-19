<template>
  <div>
    <div class="row">
      <grid-title title="연금저축">
        <button class="btn btn-md flat" @click="addSaving()"><i class="icon-lineIcon-plus mr-5"></i>
          추가
        </button>
        <evidence-button :step="step"/>
      </grid-title>
    </div>
    <div>
      <div id="pension-saving-grid" class="realgrid-type-style" style="height: 500px"></div>
    </div>
    <pension-saving-input-modal ref="pensionSavingInputModal" @close="loadGridData"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import PensionSavingInputModal from '@/components/yearend/settle/modals/deducted_item2/PensionSavingInputModal';
import GridTitle from '@/components/common/GridTitle';
import {mapGetters} from 'vuex';
import {dataSourceRenderer, savingTypeRenderer} from '@/utils/yearendCodes';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid],
  components: {
    EvidenceButton,
    PensionSavingInputModal,
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
      step: 'SAVINGS',
      // grid
      fields: [
        {
          fieldName: 'DATA_SOURCE', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return dataSourceRenderer(values[fieldNames.indexOf("DATA_SOURCE")]);
          }
        },
        {
          fieldName: 'SAVINGS_TYPE', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return savingTypeRenderer(values[fieldNames.indexOf("SAVINGS_TYPE")]);
          }
        },
        {fieldName: 'INST_CODE', dataType: 'text'},
        {fieldName: 'INST_NAME', dataType: 'text'},
        {fieldName: 'ACC_NO', dataType: 'text'},
        {fieldName: 'CONTRACT_DATE', dataType: 'text'},
        {fieldName: 'PAID_AMOUNT', dataType: 'number'},
        {fieldName: 'UPDATE', dataType: 'boolean'},
        {fieldName: 'DELETE', dataType: 'boolean'},
      ],
      columns: [
        {fieldName: 'DATA_SOURCE', header: '자료원천'},
        {fieldName: 'SAVINGS_TYPE', header: '항목'},
        {fieldName: 'INST_CODE', header: '금융기관코드'},
        {fieldName: 'INST_NAME', header: '금융기관상호'},
        {fieldName: 'ACC_NO', header: '계좌번호'},
        {fieldName: 'CONTRACT_DATE', header: '가입날자'},
        {
          fieldName: 'PAID_AMOUNT', header: '납입금액',
          numberFormat: "#,##0",
          styleName: "right-column",
          footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
          nanText: '0'
        },
        this.getUpdateColumn(),
        this.getDeleteColumn()
      ],
      rowAttrs: ['YES_ID', 'PAID_AMOUNT_NTS', 'INP_REMARK', 'DED_SELECT', 'INP_FLAG', 'DED_AMOUNT', 'DATA_SOURCE',
        'SAVINGS_TYPE', 'INST_CODE', 'INST_NAME', 'INST_BIZID', 'ACC_NO', 'CONTRACT_DATE', 'PAID_AMOUNT']
    }
  },
  methods: {
    getParameters(){
      const me = this;
      return {
        'EID': me.eid,
        'ATT_YEAR': me.attYear,
        'CURRENT_STEP': me.step,
        'PAYDAY': me.payday
      };
    },
    async loadGridData() {
      const me = this;
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: me.getParameters()
        });
        me.setRealgridData(data.list || []);
      } catch (e) {
        console.error("PensionSaving loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      let me = this;
      me.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.pensionSavingInputModal.show(_rowData['ROW_ATTRS']);
        }
        if (clickData.column == 'DELETE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.deleteSavings(_rowData['ROW_ATTRS']);
        }
      }
    },
    deleteSavings(row) {
      const me = this;
      const params = me.getParameters();
      params['YES_ID'] = row.YES_ID;
      this.confirm({
        title: '확인',
        message: '삭제하시겠습니까?',
        yesCallback: async function() {
          try {
            await me.$httpPost({
              url: "/year-end/employee/deduction/request/delete",
              param: params,
              callback: function()  {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
            me.close();
          }
          catch(e) {
            console.error("PensionSaving onDelete Error: ", e);
          }
        }
      });
    },
    addSaving() {
      this.$refs.pensionSavingInputModal.show();
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'pension-saving-grid'});
    this.loadGridData();
  }
}
</script>
