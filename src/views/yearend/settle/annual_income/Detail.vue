<template>
  <div>
    <div class="row">
      <button-panel btn-type="top">
        <template v-slot:start>
          <button v-if="tabId != 0" class="btn btn-md flat" @click="addInputModal()"><i
              class="icon-lineIcon-check mr-5"></i>
            추가
          </button>
          <evidence-button :step="step"/>
        </template>
        <template v-slot:end>
          <span class="tbl-title">{{ gridLabel }}</span>
        </template>
      </button-panel>

    </div>
    <div>
      <div id="ye-annual-income-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
    </div>
    <evidence-input-modal ref="evidenceInputModal"/>
    <annual-income-input-modal ref="annualIncomeInputModal" @close="salaryInputClosed" />
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import EvidenceInputModal from '@/components/yearend/settle/modals/EvidenceInputModal';
import AnnualIncomeInputModal from '@/components/yearend/settle/modals/annual_income/AnnualIncomeInputModal';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";
import ButtonPanel from "../../../../components/common/ButtonPanel";
import codeData from '@/utils/yeAnnualIncome';

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    EvidenceButton,
    GridTitle,
    EvidenceInputModal,
    AnnualIncomeInputModal
  },
  props: {
    initialParam: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    }),
    gridLabel() {
      const nowWorkMsg = '* 현직장소득은 수정할 수 없습니다.';
      if (this.$route.params.COMP_NAME) {
        return this.tabId == 0 ? nowWorkMsg : ('전직장[' + this.$route.params.COMP_NAME + '] 소득명세');
      } else {
        return this.tabId == 0 ? nowWorkMsg : ('전직장[' + this.initialParam.COMP_NAME + '] 소득명세');
      }
    }
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.tabId = to.params.id;
      this.workSeqNo = to.params.WORK_SEQ_NO;
      // this.fields = this.gridData[this.tabId == 0 ? 0 : 1]['fields'];
      // this.columns = this.gridData[this.tabId == 0 ? 0 : 1]['columns'];
      //this.setFieldsNColumns();
      this.loadGridData();
    },
  },
  data() {
    let me = this;
    return {
      workSeqNo: null,
      tabId: 0,
      step: 'YEAR_INCOME',
      fields: [
        {
          fieldName: "TYPE", dataType: "text",
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            const taxCode = values[fieldNames.indexOf("ROW_ATTRS")]['TAX_CODE'];
            let name = '';
            for (let type in codeData) {
              let codeInfo = codeData[type];
              for (let val of codeInfo.items) {
                if (val.code == taxCode) {
                  name = codeData[type].name;
                  break;
                }
              }
              if(name != ''){
                break;
              }
            }
            return name;
          }
        },
        {fieldName: "CODE", dataType: "text",
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            const taxCode = values[fieldNames.indexOf("ROW_ATTRS")]['TAX_CODE'];
            let taxCodeName = '';
            for (let type in codeData) {
              let codeInfo = codeData[type];
              for (let val of codeInfo.items) {
                if (val.code == taxCode) {
                  taxCodeName = val.message;
                  break;
                }
              }
              if(taxCodeName != ''){
                break;
              }
            }
            return taxCodeName;
          }
        },
        {fieldName: "AMOUNT", dataType: "number"},
        {
          fieldName: "UPDATE", dataType: "boolean",
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            let data = values[fieldNames.indexOf("ROW_ATTRS")];
            return data.WORK_SEQ_NO == 1;
          }
        },
        {
          fieldName: "DELETE", dataType: "boolean",
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            let data = values[fieldNames.indexOf("ROW_ATTRS")];
            return data.WORK_SEQ_NO == 1;
          }
        }
      ],
      columns: [
        {header: "종류", fieldName: "TYPE", width: 100, styleName: "left-column"},
        {header: "항목", fieldName: "CODE", width: 400, styleName: "left-column"},
        {
          header: "금액", fieldName: "AMOUNT",
          numberFormat: "#,##0",
          styleName: "right-column",
          nanText: '0', width: 200
        },
        me.getUpdateColumn(),
        me.getDeleteColumn()
      ],
      rowAttrs: ['TYPE', 'EID', 'TAX_CODE', 'PAYDAY', 'WORK_SEQ_NO']
    }
  },
  methods: {
    getInputIncomeList(){
      let codeList = [];
      for (let type in codeData) {
        for (let val of codeData[type].items) {
          codeList.push(val.code);
        }
      }
      return codeList;
    },

    async loadGridData() {
      const me = this;
      // 데이터 조회.
      let {data} = await this.$httpPost({
        url: '/year-end/employee/deduction/request/step-data-row',
        param: {
          EID: me.eid,
          ATT_YEAR: me.attYear,
          CURRENT_STEP: me.step,
          WORK_SEQ_NO: me.workSeqNo
        }
      });
      let salary = data && data['salary'] || [];
      // 조회 및 수정 데이터는 지정된 것만. 후처리로 필터링 작업.
      let viewSalary = [];
      let inputIncomeList = me.getInputIncomeList();
      for(let inc of salary){
        if(inputIncomeList.includes(inc.TAX_CODE)){
          viewSalary.push(inc);
        }
      }
      this.setRealgridData(viewSalary);
    },

    async loadExemptCodes() {
      try {
        // 비과세소득 항목 세팅
        let {data} = await this.$httpGet('/year-end/employee/tax-code/exempt', {ATT_YEAR: this.attYear}) || [];
        for (let i = 0; i < data.length; i++) {
          codeData['T3']['items'].push({code: data[i]['TAXITM_CD'], message: data[i]['TAX_NAME']});
        }
        if (Array.isArray(data) && data.length > 0) {
          codeData['T3']['value'] = data[0]['TAXITM_CD'];
        }
      } catch (e) {
        console.error("AnnualIncomeInputModal mounted err: ", e);
      }
    },

    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
        if(!_rowData['ROW_ATTRS']){
          return;
        }

        _rowData.WORK_SEQ_NO = _rowData['ROW_ATTRS'].WORK_SEQ_NO;
        _rowData.TAX_CODE = _rowData['ROW_ATTRS'].TAX_CODE;

        if (clickData.column == 'UPDATE') {
          if( _rowData['ROW_ATTRS'].WORK_SEQ_NO == 1){
            return;
          }
          me.updateIncome(_rowData);
        }
        if (clickData.column == 'DELETE') {
          if( _rowData.WORK_SEQ_NO == 1){
            return;
          }
          me.deleteIncome(_rowData);
        }
      }
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
      };
    },

    addInputModal() {
      this.$refs.annualIncomeInputModal.show({
        WORK_SEQ_NO: this.workSeqNo
      });
    },

    updateIncome(data){
      this.$refs.annualIncomeInputModal.show(data);
    },

    salaryInputClosed(){
      this.loadGridData();
    },

    async deleteIncome(data) {
      let me = this;
      this.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: async function () {

          let _params = {
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'CURRENT_STEP': me.step,
            'PAYDAY': me.payday,
            'WORK_SEQ_NO': data.WORK_SEQ_NO,
            'TAX_CODE': data.TAX_CODE,
            'AMOUNT': 0
          }

          try {
            await me.$httpPost({
              url: '/year-end/employee/deduction/request/delete/ex-salary',
              param: _params,
              callback: function () {
                me.toastSuccessDelete();
                me.loadGridData();
              }
            });
            me.close();
          } catch (e) {
            console.error("InsuranceFeeModal onDelete Error: ", e);
          }
        }
      });
    }
  },
  mounted() {
    this.loadExemptCodes();
    this.workSeqNo = this.$route.params.WORK_SEQ_NO;
    this.tabId = this.$route.params.id;
    this.createGridFrame({'domId': 'ye-annual-income-grid'});
    this.setFieldsNColumns();
    this.loadGridData();
  },
}
</script>