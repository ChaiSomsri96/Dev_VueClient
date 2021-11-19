<template>
  <div class="app">
    <!-- ############ LAYOUT START-->
    <div class="popup-wrap">
      <div class="popup-header row v-c">
        <h2>급여 복사</h2>
      </div>
      <div class="popup-content">
        <div class="form-area" style="height: 650px">
          <div class="form-wrap row pt-10">
            <div class="col-5 pr-15 pl-30" style="width: 100%; height: 600px; margin-top: 20px;">
              <div class="form-group row mb-20">
                <div class="input-group col-9 pr-0">
                <salary-months-and-dates :salary-month="payMonth1" :salary-date="payDate1" :degree="payMonthSeq1" :label="label1"/>
                </div>
              </div>
              <div class="form-group row mb-20">
                <div class="input-group col-9 pr-0">
                  <salary-months-and-dates :salary-month="payMonth2" :salary-date="payDate2" :degree="payMonthSeq2" :label="label2"/>
                </div>
                <div class="input-group col-3 pr-0">
                  <button type="button" class="btn btn-md line-1" @click="selectMonth()">
                    <span>찾기</span>
                  </button>
                </div>
              </div>
              <payroll-code-grid id="payroll-code-grid" ref="payrollCodeGrid" />

              <div class="form-group row mb-20 pl-150">
                <button class="btn btn-md" @click="preview()">
                  <i class="icon-lineIcon-sight mr-5"></i>미리보기
                </button>
              </div>
            </div>
            <div class="col-7 pr-15 pl-30">
              <div id="payroll-item-grid-price" class="realgrid-type-style" style="width: 100%; height: 600px; margin-top: 20px;" ></div>
            </div>
            <pay-month-select-modal id="pay-month-select-modal2" ref="payMonthSelectModal2" @change="payMonthChange2($event)" />
          </div>
          <div align="center">
            <div class="btn-wrap">
              <button class="btn btn-mb flat mr-5" @click="close()" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
              </button>
              <button class="btn btn-md danger mr-5" @click="remove()">
                <i class="icon-lineIcon-del mr-5"></i>삭제
              </button>
              <button class="btn btn-md black" @click="save()">
                <i class="icon-lineIcon-check mr-5"></i>저장
              </button>
            </div>
          </div>
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
import grid from '@/mixin/payroll-grid';
import PayMonthSelectModal from '@/components/payroll/common/modals/PayMonthSelectModal';
import PayrollCodeGrid from '@/components/payroll/common/grids/PayrollCodeGrid';
export default {
  mixins: [grid],
  components: {
    BaseModal,
    SalaryMonthsAndDates,
    PayrollItemGrid,
    PayMonthSelectModal,
    PayrollCodeGrid
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      eidList:[],
      label1: "당월급여월",
      payMonth1: '',
      payMonthSeq1: 0,
      label2: "원본급여월",
      payDate1: '',
      payMonth2: '',
      payMonthSeq2: 0,
      payDate2: '',
      isGridShow: false,
      isGridCreated: false,
      fields: [
        { fieldName: 'EMP_NAM', dataType: 'text' },
        { fieldName: 'PAY_CODE', dataType: 'text' },
        { fieldName: 'PAY_NAM', dataType: 'text' },
        { fieldName: 'PAY_CALCAMOUNT', dataType: 'number' }
      ],
      columns: [
        { header: "성명", fieldName: "EMP_NAM" },
        { header: "급여코드", fieldName: "PAY_CODE" },
        { header: "급여항목", fieldName: "PAY_NAM" },
        { header: "금액", fieldName: "PAY_CALCAMOUNT", numberFormat: "#,##0", styleName: "right-column" },
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
    async asyncData() {
      try {
        this.$refs.payrollCodeGrid.createRealGrid({'domId': 'payroll-code-grid'});
        await this.$refs.payrollCodeGrid.loadGridData();
        this.eidList = this.declarationForm;
        this.payMonth1 = this.payMonth;
        this.payMonthSeq1 = this.payMonthSeq;
        this.payDate1 = this.payDate;
        this.payMonth2 = this.payMonth;
        this.payMonthSeq2 = this.payMonthSeq;
        this.payDate2 = this.payDate;
      } catch(e) {
        console.error("PayCarryOver asyncData err: ", e);
      }
    },

    //grid
    async loadGridData(checkedPaycodes) {
      try {
        let {data} = await this.$httpPost({
          url: '/payroll/salarymanual/pay-paycarryover/list',
          param: {
            'ORG_PAY_MONTH': this.payMonth2,
            'ORG_SEQ': this.payMonthSeq2,
            'ORG_PAY_GAAP': '1',
            'COPY_ALL': 'N',
            'ORG_PAY_CODE': checkedPaycodes,
            'PAY_MONTH': this.payMonth1,
            'SEQ': this.payMonthSeq1,
            'PAY_GAAP': '1',
            'COPY_ONE_TO_ONE': 'Y',
            'EMP_SEL': 'SELECT',
            'PAYTYPE_CD': null,
            'MODIFY_TYPE': null,
            'EMP_LIST': this.eidList
          }
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.log("PayCarryoverModal loadGridData error", e);
      }
    },
    selectMonth(){
      this.$refs.payMonthSelectModal2.show();
    },
    payMonthChange($event) {
      this.payMonth2 = $event.payMonth;
      this.payMonthSeq2 = $event.payMonthSeq;
      this.payDate2 = $event.payDate;
    },
    async preview() {
      //
      let checkedPaycodes = this.$refs.payrollCodeGrid.getCheckedPaycodes();
      if(checkedPaycodes.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
        return;
      }
      let paycode = []
      for(let i = 0; i < checkedPaycodes.length; i ++) {
        paycode.push(checkedPaycodes[i]['PAY_CODE']);
      }

      this.loadGridData(paycode);
    },
    async save() {
      //
      let checkedPaycodes = this.$refs.payrollCodeGrid.getCheckedPaycodes();
      if(checkedPaycodes.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
        return;
      }
      let paycode = []
      for(let i = 0; i < checkedPaycodes.length; i ++) {
        paycode.push(checkedPaycodes[i]['PAY_CODE']);
      }

      //
      let me = this;
      this.$httpPost({
        url: '/payroll/salarymanual/pay-paycarryover/insert',
        param: {
          'ORG_PAY_MONTH': me.payMonth2,
          'ORG_SEQ': me.payMonthSeq2,
          'ORG_PAY_GAAP': '1',
          'COPY_ALL': 'N',
          'ORG_PAY_CODE': paycode,
          'PAY_MONTH': me.payMonth1,
          'SEQ': me.payMonthSeq1,
          'PAY_GAAP': '1',
          'COPY_ONE_TO_ONE': 'Y',
          'EMP_SEL': 'SELECT',
          'PAYTYPE_CD': null,
          'MODIFY_TYPE': null,
          'EMP_LIST': me.eidList
        },
        callback: function() {
          me.toastSuccessSave();
        }
      });
    },
    close() {
      window.close()
    },

    payMonthChange2($event) {
      this.payMonth2 = $event.payMonth;
      this.payMonthSeq2= $event.payMonthSeq;
      this.payDate2 = $event.payDate;
    },
    remove() {
      //
      let checkedPaycodes = this.$refs.payrollCodeGrid.getCheckedPaycodes();
      if(checkedPaycodes.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
        return;
      }
      let paycode = []
      for(let i = 0; i < checkedPaycodes.length; i ++) {
        paycode.push(checkedPaycodes[i]['PAY_CODE']);
      }

      //

      let me = this;

      this.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: function() {
          me.$httpPost({
            param: {
              'ORG_PAY_MONTH': me.payMonth2,
              'ORG_SEQ': me.payMonthSeq2,
              'ORG_PAY_GAAP': '1',
              'COPY_ALL': 'N',
              'ORG_PAY_CODE': paycode,
              'PAY_MONTH': me.payMonth1,
              'SEQ': me.payMonthSeq1,
              'PAY_GAAP': '1',
              'COPY_ONE_TO_ONE': 'Y',
              'EMP_SEL': 'SELECT',
              'PAYTYPE_CD': null,
              'MODIFY_TYPE': null,
              'EMP_LIST': me.eidList
            },
            url: '/payroll/salarymanual/pay-paycarryover/delete',
            callback: function() {
              me.toastSuccessDelete();
            }
          });
        }
      });
    }
  },
  mounted() {
    this.asyncData()
    this.createRealGrid({'domId': 'payroll-item-grid-price'});
  }
}
</script>
