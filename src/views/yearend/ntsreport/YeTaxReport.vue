<template>
  <div>
    <ui-header :msg="'세무 신고'"/>
    <div class="content-body">
      <ye-tax-report-tab/>
      <ye-employee-list-type2 ref="yeEmployeeList">
        <template v-slot:additional-btn>
          <button class="btn btn-md flat" @click="previewReport()">
            <i class="icon-lineIcon-download mr-5"></i>미리보기
          </button>
          <button class="btn btn-md flat" @click="downloadPlain()">
            <i class="icon-lineIcon-download mr-5"></i>평문 다운로드
          </button>
          <button class="btn btn-md flat" @click="downloadEnc()">
            <i class="icon-lineIcon-download mr-5"></i>암호문 다운로드
          </button>
        </template>
      </ye-employee-list-type2>
    </div>
    <ye-tax-report-modal ref="yeTaxReportModal" />
  </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import YeEmployeeList from '@/components/yearend/common/YeEmployeeList';
import YeEmployeeListType2 from "../../../components/yearend/common/YeEmployeeListType2";
import YeTaxReportTab from "./YeTaxReportTab";
import YeTaxReportModal from "./YeTaxReportModal";

export default {
  components: {
    YeTaxReportModal,
    YeTaxReportTab,
    YeEmployeeListType2,
    BaseTabs,
    BaseTabsItem,
    YeEmployeeList
  },
  data() {
    return {
    }
  },
  methods: {
    findSelectEmp: function () {
      let me = this;
      let arr = me.$refs.yeEmployeeList.getCheckedValues();
      let paramArr = [];
      arr.forEach(function (val, idx) {
        paramArr.push({EID:val.ROW_ATTRS.EID, PAYDAY:val.PAYDAY});
      });
      return paramArr;
    },
    previewReport() {
      let me = this;
      me.$refs.yeTaxReportModal.show({
        type: 'preview',
        title: '지급명세서 미리보기',
        buttonText: '미리보기',
        list: me.findSelectEmp()
      });
    },
    downloadPlain() {
      let me = this;
      me.$refs.yeTaxReportModal.show({
        type: 'plain',
        title: '지급명세서 평문 다운로드',
        buttonText: '평문 다운로드',
        list: me.findSelectEmp()
      });
    },
    downloadEnc() {
      let me = this;
      me.$refs.yeTaxReportModal.show({
        type: 'encrypt',
        title: '지급명세서 암호문 다운로드',
        buttonText: '암호문 다운로드',
        list: me.findSelectEmp()
      });
    }
  },
  mounted() {
  },
}
</script>