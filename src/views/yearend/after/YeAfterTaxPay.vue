<template>
    <div>
        <ui-header :msg="'사후 관리'"/>
        <div class="content-body">
            <base-tabs>
                <base-tabs-item label="서류미비자 안내메일 발송" :to="{name: 'YeAfterMail'}"/>
                <base-tabs-item label="서류미비자 안내문자 발송" :to="{name: 'YeAfterText'}"/>
                <base-tabs-item label="정산세액 급여대장반영" :to="{name: 'YeAfterTaxPay'}"/>
            </base-tabs> 
            <div>
              <border-box search>  
                <border-box-item title="정산연도">
                  <ui-dropdown :items="settleYear.items"
                                :value="settleYear.value"
                                @change="settleYear.value=$event.value; settleYear.return=$event;"
                                :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message' }" />
                </border-box-item>
                <border-box-item button>
                  <button type="button" id="btnSearch" class="btn btn-md line-1"
                  @click="loadGridData()">
                      <span>검색</span>
                  </button>  
                </border-box-item>
              </border-box>

              <div class="box border-box type2">
                <div class="box-body row">
                  <button class="btn btn-md line-1 ml-10" @click="saveRecord()">급여대장에 기록</button>
                </div>                
              </div>

              <div>
                <div id="yeafter-taxpay-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
export default {
  mixins: [grid],
  components: {
    BaseTabs,
    BaseTabsItem,
    BorderBox,
    BorderBoxItem
  },
  data() {
    return {
      settleYear: {
        value: 2020,
        return: null,
        items: this.getRecentYearList()
      },
      //visible
      fields: [
        { fieldName: 'EMP_NUMBER',  dataType: 'text' }, 
        { fieldName: 'EMP_NAM',  dataType: 'text' }, 
        { fieldName: 'HRDEPT_NAM',  dataType: 'text' }, 
        { fieldName: 'EMPTYPE_NAM',  dataType: 'text' }, 
        { fieldName: 'D26A',  dataType: 'number' }, 
        { fieldName: 'D26B',  dataType: 'number' }, 
        { fieldName: 'D26C',  dataType: 'number' }, 
        { fieldName: 'ALLOT_APPL',  dataType: 'text' }, 
        { fieldName: 'ALLOT_APPL_EXE', dataType: 'text' }
      ],
      columns: [
        { fieldName: 'EMP_NUMBER', header: '사번' },
        { fieldName: 'EMP_NAM', header: '이름' },
        { fieldName: 'HRDEPT_NAM', header: '부서' },
        { fieldName: 'EMPTYPE_NAM', header: '직원구분' },
        { fieldName: 'D26A', 
          header: {text: '소득세\n차감징수세액', styleName: "multi-line-css-header"} , 
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          } },
        { fieldName: 'D26B', 
        header: {text: '지방소득세\n차감징수세액', styleName: "multi-line-css-header"} , 
        numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }  },
        { fieldName: 'D26C', 
        header: {text: '농특세\n차감징수세액', styleName: "multi-line-css-header"} , 
        numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }  },
        { fieldName: 'ALLOT_APPL', header: '임직원 분납신청',
        type: 'data',
        renderer: {
          type: "html",
              callback: function(grid, cell, w, h) {
                  if (!cell.value)
                          return '';
                  if(cell.value == 1)
                      return '예';
                  else if(cell.value == 2)
                      return '아니오';
          }
        }},
        {
          name: "ALLOT_APPL_EXE",
          fieldName: 'ALLOT_APPL_EXE',
          type: "data",
          editable: false,
          renderer: {
            type: "check",
            trueValues: "1", 
            falseValues: "2"
          },
          header: {
            text: "분납실행"
          }
        }
      ],
      rowAttrs: ['EID', 'LASTPAY_DATE', 'E_JOIN_DATE', 'RETIRE_DATE']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let {data} = await this.$httpGet('/year-end/admin/employee/salary/target', 
                                    {   ATT_YEAR: this.settleYear.value });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("YeAfterTaxPay loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.header.height = 50;
    },
    async saveRecord() {
        let me = this;
        let checkedValues = this.getCheckedValues();
        if(checkedValues.length < 1) {
          this.toastAlertSelect();
          return;
        }
        let _params = {
          "ATT_YEAR" : this.settleYear.value,
          "list": []
        }  
        for(let i = 0; i < checkedValues.length; i ++) {
          _params['list'].push({
              "EID": checkedValues[i]['ROW_ATTRS']['EID'],
              "LASTPAY_DATE": checkedValues[i]['ROW_ATTRS']['LASTPAY_DATE'],
              "D26C": checkedValues[i]['D26C'],
              "D26B": checkedValues[i]['D26B'],
              "EMP_NAM": checkedValues[i]['EMP_NAM'],
              "D26A": checkedValues[i]['D26A'],
              "ALLOT_APPL": checkedValues[i]['ALLOT_APPL'],
              "HRDEPT_NAM": checkedValues[i]['HRDEPT_NAM'],
              "E_JOIN_DATE": checkedValues[i]['ROW_ATTRS']['E_JOIN_DATE'],
              "EMP_NAME": checkedValues[i]['EMP_NAM'],
              "ALLOT_APPL_EXE": (checkedValues[i]['ALLOT_APPL_EXE'] == "1" ? true : checkedValues[i]['ALLOT_APPL_EXE']),
              "EMP_NUMBER": checkedValues[i]['EMP_NUMBER'],
              "EMPTYPE_NAM": checkedValues[i]['EMPTYPE_NAM'],
              "RETIRE_DATE": checkedValues[i]['ROW_ATTRS']['RETIRE_DATE'],
              "isChecked": false
          });
        }
        this.$httpPostBody({
          url: '/year-end/admin/settle-salary/save',
          param: _params,
          callback: function() {
            me.toastSuccessSave();
            me.loadGridData();
          }
        });
    }
  },
  async mounted() {
    try {
      this.createRealGrid({'domId': 'yeafter-taxpay-grid', 'checkbar': 'multi'});
      await this.loadGridData();
    }
    catch(e) {
      console.error("YeAfterTaxPay mounted err: ", e);
    }
  },
}
</script>