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
        </div>
        <div class="row">
          <div class="form-row">
            <button type="button" class="btn btn-md flat" >
              <span>급여전표 미리보기</span>
            </button>
            <button type="button" class="btn btn-md flat" >
              <span>워크플레이스 전표 생성</span>
            </button>
          </div>
        </div>
        <div>
          <div id="gen-pay-check-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        UiMonthPicker,
        BorderBox,
        BorderBoxItem,
    },
    data() {
        return {
          payrollMonthStart: this.getFirstMonthOfTheYear(),
          payrollMonthEnd: this.getCurrentMonth(),
          fields: [
            { fieldName: 'PAY_MONTH',  dataType: "data"},
            { fieldName: 'SEQ',     dataType: 'text' },
            { fieldName: 'PAY_DATE', dataType: "data"},
            { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' },
            { fieldName: 'CLOSE_FLAG', header: '상태' },
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
            { fieldName: 'CLOSE_FLAG', header: '상태',
              displayCallback: function(grid, index, value) {
                return value == 0 ? "미도래" : (value == 1 ? "오픈" : "마감");
              },
              width: 80 ,editable: false},
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


    },
    mounted() {
      this.createRealGrid({'domId': 'gen-pay-check-grid'});
      this.asyncData();
      this.loadGridData();
    }
}
</script>