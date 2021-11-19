<template>
  <div>
    <button-panel btnType='top'
                  v-bind:add=true
                  v-on:add="addEmptyData">
      <template v-slot:start>
        <evidence-button :step="step" />
      </template>
      <template v-slot:end>
        <h4>* 국세청 간소화 자료는 수정할 수 없고 삭제만 가능합니다.</h4>
      </template>
    </button-panel>
    <div>
      <div id="insurance-fee-grid" class="realgrid-type-style" style="height: 400px"></div>
    </div>
    <button-panel btn-type="bottom"
                  v-bind:save=true
                  v-on:save="saveDeductionSelect()"
    >
    </button-panel>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import yearendMixin from '@/mixin/yearend';
import ButtonPanel from '@/components/common/ButtonPanel';
import GridTitle from '@/components/common/GridTitle';
import {getYearendCodeList} from '@/utils/yearendCodes';
import {mapGetters} from 'vuex';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
  mixins: [grid,yearendMixin],
  components: {
    EvidenceButton,
    ButtonPanel,
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
    let me = this;
    return {
      step: 'INSURANCE',
      emptyRealGridData: {
        DED_SELECT: '1'
      },
      insuranceFee: {
        PERSON_NAME: {
          labels: [],
          values: []
        },
        YES_ID:{
          value: 0,
          return: null
        },
        INS_CODE: {
          value: 'G1',
          return: null,
          items: [
            { message: '보장성', code: 'G1' },
            { message: '지역건강', code: 'A5' },
            { message: '지역국민연금', code: 'C2' },
            { message: '장애인 보장성', code: 'H1' },
          ]
        },
        DATA_SOURCE: {
          value: '1',
          return: null,
          items: [
            { message: '국세청', code: '1' },
            { message: '기타', code: '2' },
          ]
        },
        INS_BUYER: {
          value: '', return: null, items: []
        },
        PERSON_RRN_ID: {
          value: '', return: null, items: []
        },
        SUB_INSURED_RRN1: {
          value: '', return: null, items: []
        },
        SUB_INSURED_RRN2: {
          value: '', return: null, items: []
        },
        SUB_INSURED_RRN3: {
          value: '', return: null, items: []
        },
        INS_OTHER: '',
        INS_NTS: '',
        INS_AMOUNT: '',
        INP_FLAG: {
          value: 'M',
          return: null
        },
      },
      fields: [
        {fieldName: 'DATA_SOURCE', dataType: 'text'},
        {fieldName: 'INS_BUYER', dataType: 'text'},
        {fieldName: 'DED_SELECT', dataType: 'text'},
        {fieldName: 'PERSON_RRN_ID', dataType: 'text'},
        {fieldName: 'SUB_INSURED_RRN1', dataType: 'text'},
        {fieldName: 'SUB_INSURED_RRN2', dataType: 'text'},
        {fieldName: 'SUB_INSURED_RRN3', dataType: 'text'},
        {fieldName: 'INS_CODE', dataType: 'text'},
        {fieldName: 'INS_NTS', dataType: 'number'},
        {fieldName: 'INS_OTHER', dataType: 'number'},
        {fieldName: 'INS_AMOUNT', dataType: 'number'},
        {fieldName: 'YES_ID'},
        {fieldName: 'DELETE'}
      ],
      columns: [],
      rowAttrs: ['EID', 'YES_ID','DATA_SOURCE', 'YES_ID_NTS', 'YES_ID_OTHER', 'DATA_SOURCE', 'DED_SELECT', 'INS_CODE',
        'INS_BUYER', 'PERSON_RRN_ID', 'SUB_INSURED_RRN1', 'SUB_INSURED_RRN2', 'SUB_INSURED_RRN3',
        'INS_AMOUNT', 'INS_NTS', 'INS_OTHER', 'INP_FLAG'],
    }
  },
  methods: {
    getPersonRel( v){
      return v;
    },
    async asyncData() {
      let me = this;
      const codes = getYearendCodeList();

      try {
        await this.loadFamily(this.insuranceFee.PERSON_NAME.labels, this.insuranceFee.PERSON_NAME.values);

        this.columns = [
          {
            fieldName: 'DED_SELECT', name: 'DED_SELECT', width: 70,
            header: {'text': '공제신청'},
            editable: true,
            renderer: {
              type: "check",
              trueValues: "1",
              falseValues: "2"
            }
          },
          {fieldName: 'INS_CODE', header: '종류', editable: true,
            "sortable": false,
            "lookupDisplay": true,
            "values": codes.insCode.codeList,
            "labels": codes.insCode.valueList,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          {fieldName: 'DATA_SOURCE', header: '원천', editable: true,
            "sortable": false,
            "lookupDisplay": true,
            "values": codes.dataSource.codeList,
            "labels": codes.dataSource.valueList,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 80
          },
          { fieldName: 'INS_BUYER', header: '계약자',
            "sortable": false,
            "lookupDisplay": true,
            "values": me.insuranceFee.PERSON_NAME.values,
            "labels": me.insuranceFee.PERSON_NAME.labels,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          { fieldName: 'PERSON_RRN_ID', header: '주피보험자',
            "sortable": false,
            "lookupDisplay": true,
            "values": me.insuranceFee.PERSON_NAME.values,
            "labels": me.insuranceFee.PERSON_NAME.labels,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          {
            fieldName: 'SUB_INSURED_RRN1',
            header: {text: '(종)피보험자1\n(수익자1)', styleName: 'multi-line-css-header'},
            editable: true,
            "sortable": false,
            "lookupDisplay": true,
            "values": me.insuranceFee.PERSON_NAME.values,
            "labels": me.insuranceFee.PERSON_NAME.labels,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          {
            fieldName: 'SUB_INSURED_RRN2',
            header: {text: '(종)피보험자2\n(수익자2)', styleName: 'multi-line-css-header'},
            editable: true,
            "sortable": false,
            "lookupDisplay": true,
            "values": me.insuranceFee.PERSON_NAME.values,
            "labels": me.insuranceFee.PERSON_NAME.labels,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          {
            fieldName: 'SUB_INSURED_RRN3',
            header: {text: '(종)피보험자3\n(수익자3)', styleName: 'multi-line-css-header'},
            editable: true,
            "sortable": false,
            "lookupDisplay": true,
            "values": me.insuranceFee.PERSON_NAME.values,
            "labels": me.insuranceFee.PERSON_NAME.labels,
            "editor": {
              "type": "dropdown",
              "dropDownCount": 5
            }, width: 100
          },
          {
            fieldName: 'INS_AMOUNT', header: '금액',
            numberFormat: "#,##0",
            styleName: "right-column",
            footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
            nanText: '0', editable: true, width: 80
          },
          this.getDeleteColumn()
        ];
      } catch (e) {
        console.error("InsuranceFee asyncData err: ", e);
      }
    },
    async loadGridData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID': this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': 'INSURANCE',
            'PAYDAY': this.payday
          }
        });
        for(let f of data.list){
          if(f.SUB_INSURED_RRN1 == 0){
            f.SUB_INSURED_RRN1 = '';
          }
          if(f.SUB_INSURED_RRN2 == 0){
            f.SUB_INSURED_RRN2 = '';
          }
          if(f.SUB_INSURED_RRN3 == 0){
            f.SUB_INSURED_RRN3 = '';
          }
        }
        this.setRealgridData(data.list || []);
      } catch (e) {
        console.error("InsuranceFee loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.header.height = 50;
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'DELETE') {
          me.deleteInsurance(clickData.dataRow);
        }
      }
    },
    async deleteInsurance(dataRow) {
      let me = this;
      this.confirm({
        title: '확인',
        message: '삭제하시겠습니까? 삭제 후 저장버튼을 클릭해야 삭제가 완료됩니다.',
        yesCallback: async function () {
          me.dataProvider.removeRow(dataRow);
        }
      });
    },
    isValidInsurance(val){
      if(this.payrollUtil.isEmpty(val.INS_AMOUNT)) {
        this.toast({message: '금액을 입력해 주세요.', type:"error"});
        return false;
      }
      if(this.payrollUtil.isEmpty(val.DATA_SOURCE)) {
        this.toast({message: '원천을 선택해 주세요.', type:"error"});
        return false;
      }
      if(this.payrollUtil.isEmpty(val.INS_CODE)) {
        this.toast({message: '보험종류를 선택해 주세요.', type:"error"});
        return false;
      }
      if(this.payrollUtil.isEmpty(val.INS_BUYER)) {
        this.toast({message: '계약자를 선택해 주세요.', type:"error"});
        return false;
      }
      if(this.payrollUtil.isEmpty(val.PERSON_RRN_ID)) {
        this.toast({message: '주피보험자를 선택해 주세요.', type:"error"});
        return false;
      }
      return true;
    },

    saveDeductionSelect(){
      let me = this;
      let params = {
          'EID': this.eid,
          'ATT_YEAR': this.attYear,
          'CURRENT_STEP': this.step,
          'PAYDAY': this.payday,
          };
      let data = this.getSaveDeleteRows(this.dataProvider, params);
      let saveList = [];

      if(me.gridView.isEditing()) {
        me.toastAlertEditing();
        return false;
      }

      me.gridView.commit();

      if(data.save && data.save.length > 0){
        for( let val of data.save ){
          if(val.INP_FLAG !== 'S' && val.INP_FLAG !== 'T'){
            val.INS_NTS = val.DATA_SOURCE == '1' ? val.INS_AMOUNT: 0;
            val.INS_OTHER = val.DATA_SOURCE == '1' ? 0: val.INS_AMOUNT;
            if(me.isValidInsurance(val)){
              saveList.push(val);
            }else{
              return;
            }
          }
        }
      }

      this.$httpPost({
        url: '/year-end/employee/deduction/request/save/ins',
        param: {
          'EID': this.eid,
          'ATT_YEAR': this.attYear,
          'CURRENT_STEP': this.step,
          'PAYDAY': this.payday,
          'SAVE_LIST': JSON.stringify( saveList),
          'DELETE_LIST': JSON.stringify( data.delete)
        },
        callback: function () {
          me.toastSuccessSave();
          me.loadGridData();
        }
      })
    }
  },
  async mounted() {
    await this.asyncData();
    this.createRealGrid({
      'domId': 'insurance-fee-grid',
      'editable': true
    });
    await this.loadGridData();
  }
}
</script>