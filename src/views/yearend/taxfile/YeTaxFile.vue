<template>
  <div>
    <ui-header :msg="'세무서식 조회'"/>
    <div class="content-body">
      <base-tabs>
        <base-tabs-item label="기타서식" :to="{name: 'YeExtraFile'}"/>
        <base-tabs-item label="근로소득원천징수영수증" :to="{name: 'YeTaxFile'}"/>
      </base-tabs>
      <ye-employee-list-type2 width="260" ref="yeEmployeeList">
        <template v-slot:additional-btn>
          <button class="btn btn-md flat" @click="showTaxFileModal()"><i class="icon-lineIcon-check mr-5"></i>근로소득원천징수영수증
            출력
          </button>
        </template>
      </ye-employee-list-type2>
    </div>
    <ye-tax-file-modal ref="receiptTaxModal"/>
  </div>
</template>
<script>
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import YeEmployeeListType2 from "../../../components/yearend/common/YeEmployeeListType2";
import YeTaxFileModal from "./YeTaxFileModal";
import BaseTabs from "../../../components/common/BaseTabs";
import BaseTabsItem from "../../../components/common/BaseTabsItem";

export default {
  components: {
    BaseTabsItem,
    BaseTabs,
    YeTaxFileModal,
    YeEmployeeListType2,
    UiRadioButtonInline
  },
  data() {
    return {}
  },
  methods: {
    showTaxFileModal() {
      let checkedRows = this.$refs.yeEmployeeList.gridView.getCheckedRows();
      let __checkedData = [];
      if (checkedRows.length < 1) {
        this.toastAlertSelect();
        return;
      }

      for (let i = 0; i < checkedRows.length; i++) {
        let _rowData = this.$refs.yeEmployeeList.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({'EID': _rowData[0]['EID'], 'YE_PROGRESS': _rowData[0]['YE_PROGRESS']});
      }
      this.$refs.receiptTaxModal.show({
        year: this.$refs.yeEmployeeList.searchedYear,
        list: __checkedData
      });
    }
  },
}
</script>