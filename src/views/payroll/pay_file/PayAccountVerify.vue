<template>   
<div>
    <ui-header :msg="'파일 생성'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="급여계좌검증" :to="{name: 'PayAccountVerify'}"/>
            <base-tabs-item label="은행이체파일생성" :to="{name: 'GenBankTransferFile'}"/>
            <base-tabs-item label="급여전표생성" :to="{name: 'GenPayCheck'}"/>
        </base-tabs>
        <div>
          <div class="box border-box type2">
            <div class="box-body row">
              <div class="pull-left search-wrap">
                <label class="form-label type2 col-1 pr-0">
                  <span>급여일</span>
                </label>
                <div class="input-group col-2 pr-0">
                  <ui-month-picker v-model="payrollMonthStart" />
                </div>
                <div class="input-group col-2 pr-0">
                  <ui-month-picker v-model="payrollMonthEnd" />
                </div>
                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
                  <span>검색</span>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-row">
              <button type="button" class="btn btn-md flat" @click="payAccount">
                <span>급여계좌 검증</span>
              </button>
            </div>
          </div>

        </div>

        <div class="row">
          <div id="pay-account-verify-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
        <pay-account-verify-modal ref="payaccountverifymodal"/>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import grid from '@/mixin/payroll-grid';
import PayAccountVerifyModal from "./PayAccountVerifyModal";
export default {
  mixins: [grid],
  components: {
      BaseTabs,
      BaseTabsItem,
      UiMonthPicker,
      PayAccountVerifyModal
  },
  data() {
      return {
        payrollMonthStart: this.getFirstMonthOfTheYear(),
        payrollMonthEnd: this.getCurrentMonth(),
        //grid
        fields: [
          { fieldName: 'PAY_MONTH',  dataType: "data"},
          { fieldName: 'SEQ',     dataType: 'text' },
          { fieldName: 'PAY_DATE', dataType: "data"},
          { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' },
        ],
        columns: [
          { fieldName: 'PAY_MONTH', header: '급여월', width: 100,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                return year+'.'+month;
              }
            } },
          { fieldName: 'SEQ', header: '차수', width: 30 },
          { fieldName: 'PAY_DATE', header: '급여일', width: 120,
            renderer: {
              type: "html",
              callback: function (grid, cell, w, h) {
                let year = cell.value.toString().slice(0,4)
                let month = cell.value.toString().slice(4,6)
                let day = cell.value.toString().slice(6,8)
                return year+'.'+month+'.'+day;
              }
            } },
          { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 200, styleName: 'left-column' },
        ]
      }
  },
  methods: {
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param: {
            'PAY_MONTH_FROM': this.payrollMonthStart.replace('-', ''),
            'PAY_MONTH_TO': this.payrollMonthEnd.replace('-', '')
          },
          url: '/payroll/code/pay-date/list'
        });
        this.setRealgridData(data.list || []);
      }
      catch(e) {
        console.error("payAccountVerify loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.checkBar.visible=true;
    },
    onSearch() {
      this.loadGridData();
    },
    payAccount(){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOnePayMonthSelect'], type:"error"});
        return;
      }
      let paymonthseqList = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
        paymonthseqList.push({
          'PAY_MONTH_SEQ': _rowData['PAY_MONTH']+'-'+  _rowData['SEQ']
        } );
      }

      this.$refs.payaccountverifymodal.show({ 'paymonthseqList': paymonthseqList});

    }
  },
  mounted() {
    this.createRealGrid({'domId': 'pay-account-verify-grid'});
    this.loadGridData();
  }
}
</script>
