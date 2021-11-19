<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'연급여 집계'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <ye-salary-tab></ye-salary-tab>
      <button-panel
          btnType='top'
          v-bind:download=true
          v-on:download="downloadRealGridExcel">
        <template v-slot:start>
          <button class="btn btn-md flat" @click="payrollInput">
            <i class="icon-lineIcon-check mr-5"></i>
            연말정산 조정 급여 입력
          </button>
        </template>
        <template v-slot:end>
          <h3 class="">연말정산 년도 - {{ selCode.ATT_YEAR }}
            <button class="btn btn-s flat solid ml-5" :title='dataDesc' data-toggle="tooltip"
                    data-placement="bottom_right">
              <i class="icon-solidIcon-help"></i>
            </button>
          </h3>
        </template>
      </button-panel>
      <div>
        <div id="realgridDomId" class="realgrid-type-style" style="height:400px;"></div>
      </div>
    </div>
    <pay-entry-input-modal ref="payEntryInputModal" :options="{checkedMembers: checkedMembers}" @close="reloadRealGrid"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import YeSalaryTab from "./YeSalaryTab";
import BorderBox from "../../../components/common/BorderBox";
import BorderBoxItem from "../../../components/common/BorderBoxItem";
import UiInputYear from "../../../components/common/UiInputYear";
import ButtonPanel from "../../../components/common/ButtonPanel";
import PayEntryInputModal from '@/components/payroll/pay_entry/modals/PayEntryInputModal';

export default {
  name: 'ye-count-salary',
  mixins: [grid],
  components: {
    PayEntryInputModal,
    ButtonPanel,
    UiInputYear,
    BorderBoxItem,
    BorderBox,
    YeSalaryTab
  },
  props: {
    yesType: {type: String},
    yesType2: {type: String},
    searchUrl: {type: String},
    saveInitUrl: {type: String},
    openYearUrl: {type: String},
    settleTypeName: {type: String}
  },
  data() {
    return {
      excelFileName: '13월급여 목록',
      dataDesc: '연말정산 년도는 일정관리 메뉴의 정산년도 관리에 입력되어 있는 재직자 연말정산 년도입니다.',
      selCode: {ATT_YEAR: ''},
      checkedMembers: [],
      url: {
        search: '/payroll/salaryqry/payndeduct/list',
        openYear: '/year-end/setting/settle/incumbent/open-year', // 현재 오픈된 정산년도 가져오기.
        saveSalary: '/year-end/admin2/year-income/update' // 급여만 재반영
      },
      settleTypeItems: {
        'YEAREND': '재직자 연말정산',
        'SEV': '퇴사자 정산'
      },
      settleType: {
        return: null
      },
      columns: [
        {header: "이름", fieldName: "EMP_NAME", width: 100, autoFilter: true},
        {header: "부서", fieldName: "HRDEPT_NAM", width: 150, styleName: "left-column", autoFilter: true},
        {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
        {header: "퇴사일", fieldName: "RETIRE_DATE", width: 100},
        {header: "지급총액", fieldName: "ZZ96", width: 100, numberFormat: "#,##0", styleName: "right-column"},
        {header: "공제총액", fieldName: "ZZ97", width: 100, numberFormat: "#,##0", styleName: "right-column"}
      ],
      fields: [
        {fieldName: "EMP_EID", dataType: 'text'},
        {fieldName: "EMP_NAME", dataType: 'text'},
        {fieldName: "HRDEPT_NAM", dataType: 'text'},
        {fieldName: "E_JOIN_DATE", dataType: 'text'},
        {fieldName: "RETIRE_DATE", dataType: 'text'},
        {fieldName: "ZZ96", dataType: 'number'},
        {fieldName: "ZZ97", dataType: 'number'}
      ]
    }
  },

  methods: {

    findSelectEmp: function () {
      let me = this;
      let arr = me.getCheckedValues();
      let paramArr = [];
      arr.forEach(function (val, idx) {
        paramArr.push(val.EMP_EID);
      });
      return paramArr;
    },

    payrollInput() {
      let me = this;
      let emp = me.getCheckedValues();
      if (emp.length == 0) {
        me.toastAlertSelect();
        return null;
      }

      me.checkedMembers=[];
      me.checkedMembers[0] = {
        'EMP_CD': emp[0]['EMP_EID'],
        'EMP_NAM': emp[0]['EMP_NAME'],
        'EMP_NUMBER': emp[0]['EMP_NUMBER']
      };
      me.$refs.payEntryInputModal.show({
        payMonth: me.selCode.ATT_YEAR + "13",
        payMonthSeq: 1,
        checkedMembers: this.checkedMembers
      });
    },

    async onSearch() {
      let me = this;
      let url = me.url.search;
      let emptyList = JSON.stringify([]);
      let param = {
        paycdList: emptyList,
        paymonthseqList: emptyList,
        eidList: emptyList,
        formData: JSON.stringify({
          "QRY_13_MONTH": "YES",
          "SEL_YEAR": me.selCode.ATT_YEAR,
          "SEL_MONTH": "13",
          "PAY_MONTH": me.selCode.ATT_YEAR + "13",
          "SEQ": "1",
          "PAY_GAAP": "1",
          "SORTBY": "PIN",
          "EMPTYPE_CD": null,
          "JOBGROUP_CD": null,
          "ACROSS": "LANDSCAPE",
          "ZEROSUPP": "YES",
          "RPT_LANG": "KOREAN",
          "PERSONAL_INFO_MASK": "N",
          "EMP_SEL": "ALL"
        })
      };

      let {data} = await me.$httpPost({
        url: url,
        param: param
      });

      data.forEach(d => {
        Object.keys(d).forEach((key) => {
          if (key.includes('ZZ96')) {
            d['ZZ96'] = d[key];
          }
          if (key.includes('ZZ97')) {
            d['ZZ97'] = d[key];
          }
        });
      });
      return {data};
    },

    setInitData: function () {
      let me = this;
      me.$httpPost({
        url: me.url.openYear,
        param: {dummy: 'Y'}
      }).then(
          response => {
            me.selCode.ATT_YEAR = response.data.msg;
            me.createRealGrid({
              domId: 'realgridDomId',
              dataLoadFunction: me.onSearch,
              editable: false,
              editEventAdd: false,
              checkbar: 'single',
              uniqueKeys: ['EMP_EID']
            });
          }
      );
    }
  },

  mounted() {
    let me = this;
    me.setInitData();
  }
}
</script>