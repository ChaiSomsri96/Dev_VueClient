<template>
  <div class="app">
    <!-- ############ LAYOUT START-->
    <div class="popup-wrap">
      <div class="popup-header row v-c">
        <h2>원천세 계산</h2>
      </div>
      <div class="popup-content">
      <div class="form-area" style="height: 650px">
        <div class="form-wrap row pt-10">
          <div class="col-4 pr-15 pl-30" style="width: 100%; height: 600px; margin-top: 20px;">
            <div class="form-group row mb-20">
              <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-2" />
            </div>
            <div class="form-group row mb-20">
              <label class="form-label type2 col-2">
                <span>간이세액표</span>
              </label>
              <div class="col-3">
                <ui-dropdown :items="calcMethod.items" :value="calcMethod.value"
                             @change="calcMethod.value=$event.value; calcMethod.return=$event; asyncDynamicComponentData();"
                             :options="{
                                                     valueField  : 'code',
                                                     labelField  : 'message',
                                                     tooltipField: 'message'
                                                 }" />
              </div>
            </div>
            <div class="form-group row mb-20">
              <div class="form-group row col-6" v-for="(item, index) in checkItems" :key="index" >
                <label class="md-check">
                  <input type="checkbox"
                         @change="changeCheckboxValue($event,item.code)"
                         :value="settle[item.code]"
                         :checked="settle[item.code]=='Y'"
                         :name="item.code">
                  <i class="black"></i>
                  {{item.name}}
                </label>
              </div>
            </div>
            <div class="form-group row mb-20 pl-100" align="center">
              <button class="btn btn-md" @click="preview()">
                <i class="icon-lineIcon-sight mr-5"></i>미리보기
              </button>
            </div>
          </div>
          <div class="col-8 pr-15 pl-30">
                <div id="payroll-item-grid-price" style="width: 100%; height: 600px; margin-top: 20px;"  class="realgrid-type-style"></div>

          </div>
        </div>

      </div>
      <div align="center">
        <button class="btn btn-mb flat mr-5" data-dismiss="modal" @click="close" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md danger mr-5" @click="remove()">
          <i class="icon-lineIcon-del mr-5"></i>삭제
        </button>
        <button class="btn btn-md black" @click="save()">
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>

      </div>
    <div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '@/components/common/BaseModal';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import PayrollItemGrid from '@/components/payroll/pay_entry/grids/PayrollItemGrid';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';

export default {
  mixins: [ grid],
  components: {
    BaseModal,
    SalaryMonthsAndDates,
    PayrollItemGrid
  },

  props: {
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isGridShow: false,
      isGridCreated: false,
      eidList: [],
      settle: {
        "T1": 'Y',
        "N1": 'Y',
        "M1": 'Y',
        "E1": 'Y'
      },
      checkItems: [
        { name: '소득세 신고', code: 'T1'},
        { name: '국민연금 계산', code: 'N1'},
        { name: '건강보험 계산', code: 'M1'},
        { name: '고용보험 계산', code: 'E1'}
      ],
      calcMethod: {
        value: '2021',
        return: null,
        items: [
          {
            message: '2021',
            code: '2021'
          },
          {
            message: '2020',
            code: '2020'
          },
          {
            message: '2019',
            code: '2019'
          }]
      },
      fields: [
        { fieldName: 'EMP_NAME', dataType: 'text' },
        { fieldName: 'TOTAL_FAMILY', dataType: 'text' },
        { fieldName: 'WITHHOLDING_TAX', dataType: 'number' },
        { fieldName: 'INHABITANT_TAX', dataType: 'number' },
        { fieldName: 'N1', dataType: 'number' },
        { fieldName: 'M1', dataType: 'number' },
        { fieldName: 'L1', dataType: 'number' },
        { fieldName: 'E1', dataType: 'number' }
      ],
      columns: [
        { header: "이름", fieldName: "EMP_NAME",styleName: "left-column" },
        { header: "총 가족 수", fieldName: "TOTAL_FAMILY" },
        { header: "소득세 산출액", fieldName: "WITHHOLDING_TAX" , numberFormat: "#,##0", styleName: "right-column" },
        { header: "지방소득세", fieldName: "INHABITANT_TAX" , numberFormat: "#,##0", styleName: "right-column" },
        { header: "국민연금", fieldName: "N1", numberFormat: "#,##0", styleName: "right-column" },
        { header: "건강보험", fieldName: "M1", numberFormat: "#,##0", styleName: "right-column" },
        { header: "노인장기요양보험", fieldName: "L1", numberFormat: "#,##0", styleName: "right-column" },
        { header: "고용보험", fieldName: "E1", numberFormat: "#,##0", styleName: "right-column" },


      ]
    }
  },
  computed: {
    ...mapGetters({
      payMonth: 'paymonth/getPayMonth' ,
      payMonthSeq: 'paymonth/getPayMonthSeq' ,
      payDate: 'paymonth/getPayDate',
      declarationForm: 'withholding/getDeclarationForm'
    })
  },
  methods: {

    //grid
    async loadGridData() {
      try {
        let USER_PAY_FLAG = null;
        let CALC_TAX_FLAG = null;
        for(let data in this.settle){
          if(this.settle[data] == 'Y'){
            if(data == 'T1'){
              CALC_TAX_FLAG = data;
            }else{
              if(USER_PAY_FLAG == null){
                USER_PAY_FLAG = data
              }else{
                USER_PAY_FLAG = USER_PAY_FLAG+','+data
              }
            }
          }
        }
        let {data} = await this.$httpPost({
          url: '/payroll/deduction2/preview',
          param: {

              "PAY_MONTH":this.payMonth,
              "SEQ":String(this.payMonthSeq),
              "ADJUST_RATIO":100,
              "PAY_GAAP":"1",
              "WITHTAX":this.calcMethod.value,
              "CALC_PERIOD_TOTAL_TYPE":"AUTO",
              "CALC_PERIOD_COUNT":1,
              "SHOW_ONLY_CREATED":"YES",
              "USER_PAY_FLAG":USER_PAY_FLAG,
              "CALC_TAX_FLAG":CALC_TAX_FLAG,
              "EMP_SEL" :'SELECT',
              "EID_LIST" : this.eidList


          }
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.log("PayCalculationModal loadGridData error", e);
      }
    },
    changeCheckboxValue: function($event,code) {
      let me = this;
      // uncheck 시 value 를 N 으로 세팅한다.
      if($event.target.checked) {
        me.settle[code] = 'Y';
      }else {
        me.settle[code] = 'N';
      }
    },
    async preview() {
      //this.toast({message:JSON.stringify(this.settle)})
      this.loadGridData();
    },
    async save() {
      //
      let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
      if(checkedPaycodes.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
        return;
      }
      //
      let _eidList = [];
      for(let i = 0; i < this.options.checkedMembers.length; i ++)
        _eidList.push({"EID": this.options.checkedMembers[i]['EMP_CD']});
      let me = this;
      this.$httpPost({
        url: '/payroll/salarycalc/integrate-paygen/insert',
        param: {
          'formData': JSON.stringify({
            "PAY_MONTH": this.payMonth,
            "SEQ": String(this.payMonthSeq),
            "PAY_GAAP":"1",
            "EMPTYPE_CD":null,
            "PAYTYPE_CD":null,
            "JOBGROUP_CD":null,
            "MODIFY_TYPE":null,
            "EMP_SEL":"SELECT"}),
          'paycdList': JSON.stringify(checkedPaycodes),
          'paymonthseqList': '[]',
          'eidList': JSON.stringify(_eidList)
        },
        callback: function() {
          me.toastSuccessSave();
        }
      });
    },
    close(){
      window.close();
    },
    remove() {
      //
      let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
      if(checkedPaycodes.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
        return;
      }
      //
      let _eidList = [];
      for(let i = 0; i < this.options.checkedMembers.length; i ++)
        _eidList.push({"EID": this.options.checkedMembers[i]['EMP_CD']});
      let me = this;

      this.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: function() {
          me.$httpPost({
            param: {
              'formData': JSON.stringify({
                "PAY_MONTH": me.payMonth,
                "SEQ": String(me.payMonthSeq),
                "PAY_GAAP":"1",
                "EMPTYPE_CD":null,
                "PAYTYPE_CD":null,
                "JOBGROUP_CD":null,
                "MODIFY_TYPE":null,
                "EMP_SEL":"SELECT"
              }),
              'paycdList': JSON.stringify(checkedPaycodes),
              'paymonthseqList': '[]',
              'eidList': JSON.stringify(_eidList)
            },
            url: '/payroll/salarycalc/integrate-paygen/delete',
            callback: function() {
              me.toastSuccessDelete();
            }
          });
        }
      });
    }
  },
  mounted() {

    this.eidList = this.declarationForm
    this.createRealGrid({'domId': 'payroll-item-grid-price'});
  }
}
</script>
