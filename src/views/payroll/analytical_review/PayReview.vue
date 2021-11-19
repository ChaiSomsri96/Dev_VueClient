<template>
<div>
    <ui-header :msg="'분석적 검토'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="전당월 비교" :to="{name: 'PayReview'}"/>
            <base-tabs-item label="급여검증보고서" :to="{name: 'PaycheckReport'}"/>
        </base-tabs>
        <div>
          <div class="box border-box type2">
            <div class="box-body row">
              <div class="pull-left search-wrap">
                <div class="input-group col-5 pr-0">
                  <salary-months-and-dates :salary-month="payMonth1" :salary-date="payDate1" :degree="payMonthSeq1" :label="label1" />
                </div>
                <div class="input-group col-1 pr-0">
                  <button type="button" class="btn btn-md line-1" @click="selectMonth(1)">
                    <span>찾기</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="box-body row">
              <div class="pull-left search-wrap">
                <div class="input-group col-5 pr-0">
                  <salary-months-and-dates :salary-month="payMonth2" :salary-date="payDate2" :degree="payMonthSeq2" :label="label2" />
                </div>
                <div class="input-group col-1 pr-0">
                  <button type="button" class="btn btn-md line-1" @click="selectMonth(2)">
                    <span>찾기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <payroll-code-grid id="payroll-code-grid" ref="payrollCodeGrid" />
          </div>

          <div class="row"/>
          <div class="form-wrap">
          <div class="form-group row">
              <label class="form-label type2 col-1">
                <span>보고할 차이 % </span>
              </label>
              <div class="row col-1">
                <ui-input :options="GAP_RATIO"
                                        @change="GAP_RATIO=$event" />
              </div>
          </div>
          <div class="form-group row">
              <label class="form-label type2 col-1">
                <span>개인정보</span>
              </label>
              <div class="row col-2">
                <ui-radio-button-inline :options="formData.profileVisible"
                                        @change="formData.profileVisible.value=$event.value" />
              </div>
          </div>
          <div class="form-group row">
            <button class="btn btn-md flat" @click="openReviewModal"><i class="icon-lineIcon-plus mr-5"></i>전당월 비교 보고서 조회</button>
          </div>
          </div>
          <pay-month-select-modal id="pay-month-select-modal1" ref="payMonthSelectModal1" @change="payMonthChange1($event)" />
          <pay-month-select-modal id="pay-month-select-modal2" ref="payMonthSelectModal2" @change="payMonthChange2($event)" />
          <pay-review-modal ref="payreviewmodal"/>
        </div>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import PayMonthSelectModal from '@/components/payroll/common/modals/PayMonthSelectModal';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import PayrollCodeGrid from '@/components/payroll/common/grids/PayrollCodeGrid';
import PayReviewModal from "./PayReviewModal";
export default {
    components: {
        BaseTabs,
        BaseTabsItem,
        SalaryMonthsAndDates,
        PayMonthSelectModal,
        PayrollCodeGrid,
        UiRadioButtonInline,
        PayReviewModal
    },
    data() {
        return {
          label1: "당월급여월",
          payMonth1: '',
          payMonthSeq1: 0,
          payDate1: '',
          label2: "전월급여월",
          payMonth2: '',
          payMonthSeq2: 0,
          payDate2: '',
          GAP_RATIO:'0',
          formData: {

            profileVisible: { //개인정보
              name: 'profile-visible',
              value: 'Y',
              domOptList: [
                { value: 'Y', label: '표시', id: 'profile-visible' },
                { value: 'N', label: '숨김', id: 'profile-hide' }
              ]
            },
          },
          fields: [
            { fieldName: "PAY_CODE",  dataType: 'text' },
            { fieldName: "PAY_NAME",  dataType: 'text' },
            { fieldName: "INACTIVE",  dataType: 'text' },
            { fieldName: "PAYTAX_FLAG",   dataType: 'text' },
          ],
          columns: [
            { header: "코드", fieldName: "PAY_CODE", editable: false },
            { header: "코드명(한글)", fieldName: "PAY_NAME", width: 150, editable: false },
            { header: "중지", fieldName: "INACTIVE", editable: false },
            { header: "급여/공제", fieldName: "PAYTAX_FLAG", editable: false },
          ]
        }
    },
    methods: {
      async asyncData() {
        try {
          this.$refs.payrollCodeGrid.createRealGrid({'domId': 'payroll-code-grid'});
          await this.$refs.payrollCodeGrid.loadGridData();
          const {data} = await this.$store.dispatch('paymonth/getPayMonth');
          this.payMonth1 = data.PAY_MONTH;
          this.payMonthSeq1 = data.SEQ;
          this.payDate1 = data.PAY_DATE;
          this.payMonth2 = data.PAY_MONTH;
          this.payMonthSeq2 = data.SEQ;
          this.payDate2 = data.PAY_DATE;
        } catch(e) {
          console.error("PayReview asyncData err: ", e);
        }
      },
      selectMonth(type){
        if(type == 1) {
          this.$refs.payMonthSelectModal1.show();
        } else {
          this.$refs.payMonthSelectModal2.show();
        }
      },
      payMonthChange1($event) {
        this.payMonth1 = $event.payMonth;
        this.payMonthSeq1 = $event.payMonthSeq;
        this.payDate1 = $event.payDate;
      },
      payMonthChange2($event) {
        this.payMonth2 = $event.payMonth;
        this.payMonthSeq2 = $event.payMonthSeq;
        this.payDate2 = $event.payDate;
      },
      openReviewModal(){
        let checkedRows = this.$refs.payrollCodeGrid.gridView.getCheckedRows();
        if(checkedRows.length < 1) {
          this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
          return;
        }
        let __checkedData = [];
        for(let i = 0; i < checkedRows.length; i ++) {
          let _rowData = this.$refs.payrollCodeGrid.dataProvider.getJsonRow(checkedRows[i]);
          __checkedData.push({ 'PAY_CODE': _rowData['PAY_CODE']});
        }
        let formData = {
          "PAY_MONTH1":this.payMonth1,
          "SEQ1":this.payMonthSeq1,
          "PAY_MONTH2":this.payMonth2,
          "SEQ2":this.payMonthSeq2,
          "GAP_RATIO":this.GAP_RATIO,
          "PERSONAL_INFO_MASK":this.formData.profileVisible.value
        }
        this.$refs.payreviewmodal.show({formData:formData,paycdList:__checkedData});
      }
    },
    mounted() {
      //this.createRealGrid({'domId': 'payroll-code-grid'});
      this.asyncData();
      //this.loadGridData();
    }
}
</script>