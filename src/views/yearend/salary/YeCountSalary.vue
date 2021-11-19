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
          <button class="btn btn-md flat" @click="saveInit">
            <i class="icon-lineIcon-check mr-5"></i>
            연말정산 초기화
          </button>
          <button class="btn btn-md flat" @click="saveSalary">
            <i class="icon-lineIcon-check mr-5"></i>
            급여만 재반영
          </button>
        </template>
        <template v-slot:end>
          <h4>{{ settleTypeName }}(정산년도 - {{ selCode.ATT_YEAR }})
            <button class="btn btn-s flat solid ml-5" :title='dataDesc' data-toggle="tooltip"
                    data-placement="bottom_right">
              <i class="icon-solidIcon-help"></i>
            </button>
          </h4>
        </template>
      </button-panel>
      <div>
        <div :id="realgridDomId" class="realgrid-type-style" style="height:400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import YeSalaryTab from "./YeSalaryTab";
import BorderBox from "../../../components/common/BorderBox";
import BorderBoxItem from "../../../components/common/BorderBoxItem";
import UiInputYear from "../../../components/common/UiInputYear";
import ButtonPanel from "../../../components/common/ButtonPanel";

export default {
  name: 'ye-count-salary',
  mixins: [grid],
  components: {
    ButtonPanel,
    UiInputYear,
    BorderBoxItem,
    BorderBox,
    YeSalaryTab
  },
  props: {
    realgridDomId: {type: String},
    yesType: {type: String},
    yesType2: {type: String},
    searchUrl: {type: String},
    saveInitUrl: {type: String},
    openYearUrl: {type: String},
    settleTypeName: {type: String}
  },
  data() {
    return {
      initAlertMsg: '초기화 및 자동집계시 이미 입력한 연말정산 자료가 있다면 초기화됩니다. 계속 진행하시겠습니까?',
      dataDesc: '정산년도는 일정관리 메뉴의 정산년도 관리에 입력되어 있는 년도입니다.',
      excelFileName: '사원목록',
      selCode: {
        ATT_YEAR: '',
        QRY_SETTLE_TYPE: ''
      },
      url: {
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
        {header: "이름", fieldName: "EMP_NAM", width: 100, autoFilter: true},
        {header: "부서", fieldName: "HRDEPT_NAM", width: 150, styleName: "left-column", autoFilter: true},
        {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
        {header: "퇴사일", fieldName: "RETIRE_DATE", width: 100}
      ],
      fields: [
        {fieldName: "EID", dataType: 'text'},
        {fieldName: "E_JOIN_DATE", dataType: 'text'},
        {fieldName: "EMP_NAM", dataType: 'text'},
        {fieldName: "HRDEPT_NAM", dataType: 'text'},
        {fieldName: "RETIRE_DATE", dataType: 'text'}
      ]
    }
  },

  methods: {

    findSelectEmp: function () {
      let me = this;
      let arr = me.getCheckedValues();
      let paramArr = [];
      arr.forEach(function (val, idx) {
        paramArr.push(val.EID);
      });
      return paramArr;
    },

    getRequestParam: function (actionType) {
      let me = this;
      let arr = me.findSelectEmp();

      if (arr.length == 0) {
        me.toastAlertSelect();
        return null;
      }

      return {
        YES_TYPE: me.yesType,
        ATT_YEAR: me.selCode.ATT_YEAR,
        EMP_SEL: 'SELECT',
        EID_LIST: '' + arr.join(',')
      };
    },

    postSalary: function (callUrl, param) {
      let me = this;
      me.$httpPost({
        url: callUrl,
        param: param,
        callback: function () {
          me.toastSuccessSave();
          me.onSearch();
        }
      });
    },

    save: function (callUrl) {
      let me = this;
      let param = me.getRequestParam();
      if (!param) {
        return false;
      }

      if (callUrl == this.saveInitUrl) {
        param.UPDATE_TYPE = 'NEW_SUMMARY';
        me.confirm({
          title: '확인',
          message: me.initAlertMsg,
          yesCallback: function () {
            me.postSalary(callUrl, param);
          }
        });
      } else if (callUrl == this.url.saveSalary) {
        param.UPDATE_TYPE = 'UPDATE';
        me.postSalary(callUrl, param);
        return;
      }
    },

    saveInit: function () {
      this.save(this.saveInitUrl);
    },

    saveSalary: function () {
      this.save(this.url.saveSalary);
    },

    async onSearch() {
      let me = this;
      let url = me.searchUrl;
      return await me.$httpPost({
        url: url,
        param: me.selCode
      });
    },

    async findOpenYear() {
      const me = this;
      if (!me.openYearUrl) {
        return;
      }
      const {data} = await me.$httpPost({
        url: me.openYearUrl,
        param: {dummy: 'Y'}
      }); // api 호출
      me.selCode.ATT_YEAR = data.msg;
    }
  },

  mounted() {
    this.findOpenYear();
    if (this.realgridDomId) {
      this.createRealGrid({
        domId: this.realgridDomId,
        dataLoadFunction: this.onSearch,
        editable: false,
        editEventAdd: false,
        checkbar: 'multi',
        uniqueKeys: ['EID']
      });
    }
  }
}
</script>