<template>
  <div>
    <ui-header :msg="'세무 신고'"/>
    <div class="content-body">
      <ye-tax-report-tab></ye-tax-report-tab>
      <ye-employee-list-type2 ref="yeEmployeeList">
        <template v-slot:additional-btn>
          <button class="btn btn-md flat" @click="downloadReport()">
            <i class="icon-lineIcon-download mr-5"></i>소득자료제출집계표 다운로드
          </button>
        </template>
      </ye-employee-list-type2>
    </div>
    <ye-tax-income-report-modal ref="yeTaxIncomeReportModal" />
  </div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import YeEmployeeList from '@/components/yearend/common/YeEmployeeList';
import YeEmployeeListType2 from "../../../components/yearend/common/YeEmployeeListType2";
import YeTaxReportTab from "./YeTaxReportTab";
import BorderBox from "../../../components/common/BorderBox";
import BorderBoxItem from "../../../components/common/BorderBoxItem";
import YeTaxIncomeReportModal from "./YeTaxIncomeReportModal";
export default {
  components: {
    YeTaxIncomeReportModal,
    BorderBoxItem,
    BorderBox,
    YeTaxReportTab,
    YeEmployeeListType2,
    BaseTabs,
    BaseTabsItem,
    YeEmployeeList
  },
  data() {
    return {
      outputTime: '20210622',
      scope: {
        value: 'ALL',
        return: null,
        items: [
          {message: '전체', code: 'ALL'},
          {message: '영수증', code: 'RECEIPT'},
          {message: '영수증의 3페이지', code: 'RECEIPT3'},
          {message: '명세서', code: 'REPORT'},
        ]
      },
      type: {
        value: '1',
        return: null,
        items: [
          {message: '소득자보관용', code: '1'},
          {message: '발행자보관용', code: '2'},
          {message: '발행자보고용', code: '3'}
        ]
      },
      rptLang: {
        value: 'KOREAN',
        return: null,
        items: [
          {message: '한국어', code: 'KOREAN'},
        ]
      },
      personalInfoMask: {
        name: 'profile-visible',
        value: 'Y',
        domOptList: [
          { value: 'Y', label: '표시', id: 'profile-visible' },
          { value: 'N', label: '숨김', id: 'profile-hide' }
        ]
      },
      draft: {
        name: 'draft',
        value: 'NO',
        domOptList: [
          { value: 'YES', label: '표시', id: 'draft-visible' },
          { value: 'NO', label: '숨김', id: 'draft-hide' }
        ]
      },
      isRrn: {
        value: 'YES',
        return: null,
        items: [
          {message: '주민등록번호', code: 'YES'},
          {message: '여권번호', code: 'NO'},
        ]
      },
      file: {
        value: 'YES',
        return: null,
        items: [
          {message: '인별 분리', code: 'YES'}
        ]
      }
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
    downloadReport() {
      let me = this;
      me.$refs.yeTaxIncomeReportModal.show({
        type: 'plain',
        title: '지급명세서 평문 다운로드',
        buttonText: '평문 다운로드',
        list: me.findSelectEmp()
      });
    },
  },
  mounted() {
  },
}
</script>