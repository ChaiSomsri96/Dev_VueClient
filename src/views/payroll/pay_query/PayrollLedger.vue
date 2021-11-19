<template>
<div>
    <ui-header :msg="'급여조회'" />
    <div class="content-body">
        <pay-query-tab></pay-query-tab>
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
                <button type="button" class="btn btn-md flat" @click="payrollQuery()">
                  <span>급여대장 조회</span>
                </button>
              </div>
            </div>
            <div>
                <div id="payroll-ledger-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
            <payroll-ledger-modal ref="payrollLedgerModal" />
            <ledger-modal ref="ledgermodal" @close="openPayrollSelect($event)"/>
        </div>
    </div>
</div>
</template>

<script>
import PayQueryTab from './PayQueryTab';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import PayrollLedgerModal from './PayrollLedgerModal';
import LedgerModal from './LedgerModal';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        PayQueryTab,
        UiMonthPicker,
        UiRadioButtonInline,
        PayrollLedgerModal,
        BorderBox,
        BorderBoxItem,
        LedgerModal
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
        async asyncData() {

        },
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
                console.error("PayrollLedger loadGridData err: ", e);
            }
        },  
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
        },
        onSearch() {
            this.loadGridData();
        },
        //
        payrollQuery() {

            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePayMonthSelect'], type:"error"});
                return;
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
                __checkedData.push({ 'PAY_MONTH_SEQ': _rowData['PAY_MONTH'] + _rowData['SEQ'],
                                    'PAY_DATE': _rowData['PAY_DATE'] });
            }
            this.$refs.ledgermodal.show({ paymonthseqList: __checkedData});

        },
        openPayrollSelect(param){
          this.$refs.payrollLedgerModal.show({formData:param.formData,
                                              paymonthseqList:param.paymonthseqList});
        }

    },
    mounted() {
        this.createRealGrid({'domId': 'payroll-ledger-grid'});
        this.asyncData();
        this.loadGridData();
    }
}
</script>