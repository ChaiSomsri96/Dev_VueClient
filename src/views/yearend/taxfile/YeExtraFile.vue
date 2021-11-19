<template>
  <div>
    <ui-header :msg="'세무서식 조회'"/>
    <div class="content-body">
      <base-tabs>
        <base-tabs-item label="기타서식" :to="{name: 'YeExtraFile'}"/>
        <base-tabs-item label="근로소득원천징수영수증" :to="{name: 'YeTaxFile'}"/>
      </base-tabs>
      <ye-employee-list-type2 ref="yeEmployeeList">
        <template v-slot:additional-btn>
          <button class="btn btn-md flat" @click="queryTaxFile()"><i class="icon-lineIcon-check mr-5"></i>소득공제신고서 조회</button>
          <button class="btn btn-md flat" @click="queryEarnedIncome()"><i class="icon-lineIcon-check mr-5"></i>근로소득원천징수부 조회</button>
        </template>
      </ye-employee-list-type2>
    </div>
  </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import YeEmployeeList from '@/components/yearend/common/YeEmployeeList';
import YeEmployeeListType2 from "../../../components/yearend/common/YeEmployeeListType2";

export default {
  components: {
    YeEmployeeListType2,
    BaseTabs,
    BaseTabsItem,
    YeEmployeeList
  },
  data() {
    return {}
  },
  methods: {
    async queryTaxFile() {
      try {
        let checkedRows = this.$refs.yeEmployeeList.gridView.getCheckedRows();
        if (checkedRows.length < 1) {
          this.toastAlertSelect();
          return;
        }
        let __checkedData = [];
        for (let i = 0; i < checkedRows.length; i++) {
          let _rowData = this.$refs.yeEmployeeList.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
          __checkedData.push({'EID': _rowData[0]['EID']});
        }
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/report-pdf-list',
          param: {
            'FORM_DATA': JSON.stringify({
              "FORM_DATA": null,
              "EARNER_CODE_LIST": null,
              "ATT_YEAR": this.$refs.yeEmployeeList.searchedYear,
              "SELECT_ALL": false
            }),
            'EID_LIST': JSON.stringify(__checkedData)
          },
          blob: true
        });
        this.openPdf(data, "소득공제신고서 조회");
      } catch (e) {
        console.log("YeExtracFile queryTaxFile====>", e);
      }
    },
    queryEarnedIncome() {
    }
  },
  mounted() {
  },
}
</script>