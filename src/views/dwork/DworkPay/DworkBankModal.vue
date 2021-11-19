<template>
  <base-modal title="은행이체용 파일 조회" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row">
        <div class="form-row">
          <button-panel
              btnType='top'
              v-bind:download=true
              v-on:download="downloadRealGridExcel"
          />
        </div>
      </div>
      <div class="row" style="height: 500px;">
        <div id="dwork-bank-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "../../../components/common/ButtonPanel";
export default {
  mixins: [modal, grid],
  components: {
    BaseModal,
    ButtonPanel
  },
  data() {
    return {
      WORK_MON:'',
      fields: [
        { fieldName: 'PAY_DATE',  dataType: "datetime",datetimeFormat: "yyyyMMdd"  },
        { fieldName: 'EMP_NAM',dataType: 'text'},
        { fieldName: 'BANK_CD',dataType: 'text'},
        { fieldName: 'BANK_NAME',     dataType: 'text' },
        { fieldName: 'BANK_AC', dataType: 'text' },
        { fieldName: 'CAL_PAY', dataType: 'number' },
      ],
      columns: [
        { fieldName: 'PAY_DATE', header: '급여일자', width: 30,
          datetimeFormat: "yyyy.MM.dd"},
        { fieldName: 'EMP_NAM', header: '성명', width: 30, styleName: "left-column" },
        { fieldName: 'BANK_CD', header: '은행코드', width: 30, styleName: "left-column" },
        { fieldName: 'BANK_NAME', header: '은행명', width: 30, styleName: "left-column" },
        { fieldName: 'BANK_AC', header: '입급계좌', width: 30, styleName: "left-column" },
        { fieldName: 'CAL_PAY', header: '실지급액', width: 30,
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }},
      ],
    }
  },
  methods:{
    async asyncDynamicComponentData(_param) {
      this.WORK_MON = _param.WORK_MON;
      try {
        const {data} = await this.$httpGet('payroll/deduction/pay-inwithtaxdailycal/bank-file'
            ,{
              WORK_MON: this.WORK_MON
            });
        this.setRealgridData(data || []);
      }catch(e) {
        console.error( e);
      }
    },
    createDynamicComponent() {
      this.createRealGrid({
        'domId': 'dwork-bank-modal-grid'
      });
    },
  }
}
</script>

<style scoped>

</style>