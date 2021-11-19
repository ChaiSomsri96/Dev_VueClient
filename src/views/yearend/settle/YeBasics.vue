<template>
  <div>
    <div class="row">
      <table-form :colgroup="['15%', 'auto', '15%', 'auto', '15%', 'auto']"
                  title="사원정보">
        <template v-slot:body>
          <tr>
            <table-form-label label="국적"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.nationality.items"
                  :value="personalData.nationality.value"
                  @change="personalData.nationality.value=$event.value; personalData.nationality.return=$event;"
                  :options="{valueField  : 'code',labelField  : 'message',tooltipField: 'message'}"/>
            </table-form-item>
            <table-form-label label="거주구분"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.yesBaseResidStatus.items"
                  :value="personalData.yesBaseResidStatus.value"
                  @change="personalData.yesBaseResidStatus.value=$event.value; personalData.yesBaseResidStatus.return=$event;"
                  :options="{valueField  : 'code', labelField  : 'message', tooltipField: 'message' }"/>
            </table-form-item>
            <table-form-label label="거주지국"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.residentCountry.items"
                  :value="personalData.residentCountry.value"
                  @change="personalData.residentCountry.value=$event.value; personalData.residentCountry.return=$event;"
                  :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="외국법인파견근로자"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.yesCommYesno.items"
                  :value="personalData.yesCommYesno.value"
                  @change="personalData.yesCommYesno.value=$event.value; personalData.yesCommYesno.return=$event;"
                  :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message' }"/>
            </table-form-item>

            <table-form-label label="표준세액공제"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.yesBaseStdDeduct.items"
                  :value="personalData.yesBaseStdDeduct.value"
                  @change="personalData.yesBaseStdDeduct.value=$event.value; personalData.yesBaseStdDeduct.return=$event;"
                  :options="{valueField  : 'code', labelField  : 'message', tooltipField: 'message' }"/>
            </table-form-item>

            <table-form-label label="단일세율적용"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.yesBaseFlatRate.items"
                  :value="personalData.yesBaseFlatRate.value"
                  @change="personalData.yesBaseFlatRate.value=$event.value; personalData.yesBaseFlatRate.return=$event;"
                  :options="{ valueField  : 'code', labelField  : 'message', tooltipField: 'message' }"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="분납신청"/>
            <table-form-item>
              <ui-dropdown
                  :items="personalData.installApply.items"
                  :value="personalData.installApply.value"
                  @change="personalData.installApply.value=$event.value; personalData.installApply.return=$event;"
                  :options="{valueField  : 'code', labelField  : 'message', tooltipField: 'message'}"/>
            </table-form-item>

            <table-form-label label="당년근무시작일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="personalData.workStartDate" readonly>
            </table-form-item>

            <table-form-label label="당년근무종료일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="personalData.workEndDate" readonly>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="근무월" :helpDesc="wkmDesc"/>
            <table-form-item colspan="5">
              <ui-check-box-inline :options="personalData.wkm"/>
            </table-form-item>
          </tr>
        </template>
      </table-form>
    </div>
    <div class="row mt-10">
      <table-form :colgroup="['12%', 'auto', '12%', 'auto', '12%', 'auto', '12%', 'auto']"
                  footer-hide title="현직장">
        <template v-slot:body>
          <tr>
            <table-form-label label="사업자번호"/>
            <table-form-item colspan="3">
              <input type="text" class="form-control" v-model="currentWork.busNumber" readonly>
            </table-form-item>
            <table-form-label label="회사명"/>
            <table-form-item colspan="3">
              <input type="text" class="form-control" v-model="currentWork.companyName" readonly>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="근무시작일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="currentWork.startDate" readonly>
            </table-form-item>

            <table-form-label label="근무종료일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="currentWork.endDate" readonly>
            </table-form-item>

            <table-form-label label="감면시작일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="currentWork.reductionStartDate" readonly>
            </table-form-item>

            <table-form-label label="감면종료일"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="currentWork.reductionEndDate" readonly>
            </table-form-item>
          </tr>
        </template>
      </table-form>
    </div>
    <div class="row mt-10">
      <div class="row" style="margin-top:15px;">
        <h4>전직장</h4>
      </div>
      <grid-title>
        <button class="btn btn-md flat" @click="addEmptyData">
          <i class="icon-lineIcon-plus mr-5"></i><span>추가</span>
        </button>
      </grid-title>
    </div>
    <div class="row">
      <div id="prev-work-grid" class="realgrid-type-style" style="width: 100%;height: 180px"></div>
    </div>
    <button-panel btn-type="bottom"
                  v-bind:save=true
                  v-on:save="saveBasics"
    />
    <!--    <prev-work-modal ref="prevWorkModal" @close="loadGridData()"/>-->
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import grid from '@/mixin/payroll-grid';
import PrevWorkModal from '@/components/yearend/settle/modals/ye_basics/PrevWorkModal';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import UiCheckBoxInline from '@/components/common/UiCheckBoxInline';
import GridTitle from '@/components/common/GridTitle';
import ButtonPanel from "../../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    PrevWorkModal,
    TableForm,
    TableFormItem,
    TableFormLabel,
    UiCheckBoxInline,
    GridTitle
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      empNumber: 'yearend/getEmpNumber',
      empName: 'yearend/getEmpName',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    const me = this;
    return {
      step: 'BASE',
      wkmDesc: '근무월은 당년 근무시작/종료일로부터 자동으로 계산됩니다.',
      saveData: {},
      personalData: {
        nationality: {
          value: 'KR',
          return: null,
          items: []
        },
        yesBaseResidStatus: {
          value: '1',
          return: null,
          items: [
            {message: '거주자', code: '1'},
            {message: '비 거주자', code: '2'},
          ]
        },
        residentCountry: {
          value: 'KR',
          return: null,
          items: []
        },
        yesCommYesno: {
          value: '1',
          return: null,
          items: [
            {message: '예', code: '1'},
            {message: '아니오', code: '2'}
          ]
        },
        yesBaseStdDeduct: {
          value: '1',
          return: null,
          items: [
            {message: '세액이 적게 나오는 경우 표준세액공제 적용', code: '1'},
            {message: '무조건 표준세액공제 적용', code: '2'},
            {message: '표준세액공제 안함', code: 'Z'},
          ]
        },
        yesBaseFlatRate: {
          value: '1',
          return: null,
          items: [
            {message: '무조건 단일세율 적용', code: '1'},
            {message: '세액이 적게 나오는 경우 단일세율 적용', code: '2'},
            {message: '세액이 많이 나오는 경우 단일세율 적용', code: '3'},
            {message: '단일세율적용 안함', code: '4'},
          ]
        },
        installApply: {
          value: '1',
          return: null,
          items: [
            {message: '예', code: '1'},
            {message: '아니오', code: '2'},
          ]
        },
        workStartDate: '',
        workEndDate: '',
        wkm: {
          name: 'workMonth',
          disabled: true,
          value: [],
          domOptList: []
        }
      },
      currentWork: {
        busNumber: '',
        companyName: '',
        startDate: '',
        endDate: '',
        reductionStartDate: '',
        reductionEndDate: ''
      },
      fields: [
        {fieldName: 'DV_VATID', dataType: 'text'},
        {fieldName: 'COMP_NAME', dataType: 'text'},
        {fieldName: 'TPA_JOIN', dataType: 'text'},
        {fieldName: 'ST_DATE', dataType: 'text'},
        {fieldName: 'END_DATE', dataType: 'text'},
        {fieldName: 'EXEMPT_START', dataType: 'text'},
        {fieldName: 'EXEMPT_END', dataType: 'text'},
        {fieldName: 'UPDATE', dataType: 'text'},
        {fieldName: 'DELETE', dataType: 'text'}
      ],
      columns: [
        {fieldName: 'DV_VATID', header: '사업자번호'},
        {fieldName: 'COMP_NAME', header: '회사명', width: 200},
        {
          fieldName: 'TPA_JOIN', header: '납세조합',
          editor: {
            type: "dropdown", dropDownCount: 2, domainOnly: true, textReadOnly: true,
            values: ["Y", "N"], labels: ['Y', 'N']
          }
        },
        {
          fieldName: 'ST_DATE', header: '시작일',
          editor: {
            "type": "date",
            "datetimeFormat": "yyyyMMdd"
          }
        },
        {
          fieldName: 'END_DATE', header: '종료일',
          editor: {
            "type": "date",
            "datetimeFormat": "yyyyMMdd"
          }
        },
        {
          fieldName: 'EXEMPT_START', header: '감면시작일',
          editor: {
            "type": "date",
            "datetimeFormat": "yyyyMMdd"
          }
        },
        {
          fieldName: 'EXEMPT_END', header: '감면종료일',
          editor: {
            "type": "date",
            "datetimeFormat": "yyyyMMdd"
          }
        },
        me.getDeleteColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70})
      ],
      rowAttrs: ['EID', 'WORK_SEQ_NO', 'PAYDAY', 'DV_VATID', 'COMP_NAME', 'ST_DATE', 'END_DATE', 'EXEMPT_START', 'EXEMPT_END', 'TPA_JOIN'],
      emptyRealGridData: {
        'DV_VATID': '',
        'COMP_NAME': '',
        'ST_DATE': '',
        'END_DATE': '',
        'EXEMPT_START': '',
        'EXEMPT_END': '',
        'TPA_JOIN': ''
      },
    }
  },
  methods: {
    async asyncData() {
      try {
        let {data} = await this.$httpGet('/system/setting/country/list', {
          SHOW_FLAG: 'Y'
        }) || [];
        for (let i = 0; i < data.length; i++) {
          this.personalData.nationality.items.push({message: data[i]['COUNTRY_NAM'], code: data[i]['CODE_2DIGIT']});
          this.personalData.residentCountry.items.push({message: data[i]['COUNTRY_NAM'], code: data[i]['CODE_2DIGIT']});
        }

        let userInfo = await this.$httpPost({
          url: '/year-end/employee/deduction/request',
          param: {
            EID: this.eid,
            ATT_YEAR: this.attYear,
            PAYDAY: this.payday,
            CURRENT_STEP: 'BASE'
          }
        }) || [];

        this.saveData = userInfo.data['header'];
        this.personalData.nationality.value = userInfo.data['header']['NATION_CODE'];
        this.personalData.residentCountry.value = userInfo.data['header']['RESID_CODE'];
        this.personalData.yesBaseResidStatus.value = userInfo.data['header']['RESID_STATUS'];
        this.personalData.yesCommYesno.value = userInfo.data['header']['DISPATCH'];
        this.personalData.yesBaseStdDeduct.value = userInfo.data['header']['STD_DEDUCT'];
        this.personalData.yesBaseFlatRate.value = userInfo.data['header']['FLAT_RATE'];
        this.personalData.installApply.value = userInfo.data['header']['ALLOT_APPL'];
        this.personalData.workStartDate = userInfo.data['header']['WORK_START'];
        this.personalData.workEndDate = userInfo.data['header']['WORK_END'];
        for (let i = 0; i < this.personalData.wkm.domOptList.length; i++) {
          if (userInfo.data['header'][this.personalData.wkm.domOptList[i]['value']] && userInfo.data['header'][this.personalData.wkm.domOptList[i]['value']] == 'Y') {
            this.personalData.wkm.value.push(this.personalData.wkm.domOptList[i]['value']);
          }
        }
        this.currentWork.companyName = userInfo.data['work_now']['COMP_NAME'];
        this.currentWork.busNumber = userInfo.data['work_now']['DV_VATID'];
        this.currentWork.startDate = userInfo.data['work_now']['ST_DATE'];
        this.currentWork.endDate = userInfo.data['work_now']['END_DATE'];
        this.currentWork.reductionStartDate = userInfo.data['work_now']['EXEMPT_START'];
        this.currentWork.reductionEndDate = userInfo.data['work_now']['EXEMPT_END'];
      } catch (e) {
        console.log("YeBasics asyncData error: ", e);
      }
    },
    async loadGridData() {
      try {
        let {data} = await this.$httpPostBody({
          url: '/year-end/employee/deduction/request/work-info/previous',
          param: {
            "EID": this.eid,
            "ATT_YEAR": this.attYear,
            "PAYDAY": this.payday,
            "CURRENT_STEP": 'BASE'
          }
        });
        this.setRealgridData(data);
      } catch (e) {
        console.error("PrevWork loadGridData err: ", e);
      }
    },

    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'DELETE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow)['ROW_ATTRS'];
          _rowData['ATT_YEAR'] = me.attYear;
          me.confirm({
            title: '확인',
            message: '삭제하시겠습니까?',
            yesCallback: function () {
              me.dataProvider.removeRow(clickData.dataRow);
            }
          });
        }
      }
    },

    saveBasics() {
      let me = this;
      let param = me.getHeaderParam();
      let exworkList = me.getExworkList();
      if (exworkList && exworkList.length > 0) {
        if (me.hasExworkError(exworkList)) {
          this.alert({
            message: '전직장의 사업자번호, 회사명, 납세조합여부, 시작일, 종료일 값은 필수입력값입니다.'
          });
          return false;
        }
      }

      param.EXWORK_LIST = JSON.stringify(exworkList);
      me.$httpPost({
        url: '/year-end/employee/deduction/request/save-basics',
        param: param,
        callback: function () {
          me.toastSuccessSave();
        }
      });
    },
    getHeaderParam() {
      //사원정보 저장
      let _param = this.saveData;
      _param['NATION_CODE'] = this.personalData.nationality.value;
      _param['RESID_CODE'] = this.personalData.residentCountry.value;
      _param['RESID_STATUS'] = this.personalData.yesBaseResidStatus.value;
      _param['DISPATCH'] = this.personalData.yesCommYesno.value;
      _param['STD_DEDUCT'] = this.personalData.yesBaseStdDeduct.value;
      _param['FLAT_RATE'] = this.personalData.yesBaseFlatRate.value;
      _param['ALLOT_APPL'] = this.personalData.installApply.value;
      _param['WORK_START'] = this.personalData.workStartDate;
      _param['WORK_END'] = this.personalData.workEndDate;
      _param = {
        ..._param,
        'RPT_LANG': '',
        'FORM_DATA': '',
        'ST_DATE': this.personalData.workStartDate,
        'END_DATE': this.personalData.workEndDate,
        'COMP_NAME': '',
        'CURRENT_STEP': this.step,
        'ATT_YEAR': this.attYear
      }
      for (const [key, value] of Object.entries(_param)) {
        if (value == null)
          _param[key] = '';
      }
      return _param;
    },

    getExworkList: function () {
      const me = this;
      let rows = this.dataProvider.getAllStateRows();
      let exworkList = [];

      rows.deleted.forEach((row) => {
        let exwork = me.dataProvider.getJsonRow(row);
        exwork.DEL_TARGET = 'YES';
        exwork.WORK_SEQ_NO = exwork['ROW_ATTRS'].WORK_SEQ_NO;
        delete exwork.ROW_ATTRS;
        exworkList.push(exwork);
      });
      rows.created.forEach((row) => {
        let exwork = me.dataProvider.getJsonRow(row);
        exwork.WORK_SEQ_NO = null;
        delete exwork.ROW_ATTRS;
        exworkList.push(exwork);
      });
      rows.updated.forEach((row) => {
        let exwork = me.dataProvider.getJsonRow(row);
        exwork.WORK_SEQ_NO = exwork['ROW_ATTRS'].WORK_SEQ_NO;
        delete exwork.ROW_ATTRS;
        exworkList.push(exwork);
      });
      return exworkList;
    },

    hasExworkError(list) {
      let error = false;
      list.forEach(exwork => {
        if (this.payrollUtil.isEmpty(exwork.DV_VATID)) {
          error = true;
          return false;
        }
        if (this.payrollUtil.isEmpty(exwork.COMP_NAME)) {
          error = true;
          return false;
        }
        if (this.payrollUtil.isEmpty(exwork.TPA_JOIN)) {
          error = true;
          return false;
        }
        if (this.payrollUtil.isEmpty(exwork.ST_DATE)) {
          error = true;
          return false;
        }
        if (this.payrollUtil.isEmpty(exwork.END_DATE)) {
          error = true;
          return false;
        }
      });
      return error;
    }
  },

  async mounted() {
    try {
      //근무월 셋팅
      for (let i = 1; i <= 12; i++) {
        this.personalData.wkm.domOptList.push({
          value: 'WKM_' + (i < 10 ? ('0' + i) : i), label: i + '월'
        });
      }
      this.createRealGrid({
        domId: 'prev-work-grid',
        editable: true,
        hideFooters: true
      });
      await this.asyncData();
      await this.loadGridData();
    } catch (e) {
      console.log("Ye Basics mounted err: ", e);
    }
  },
}
</script>

<style lang="scss" scoped>
.tbl-personal-info, .tbl-current-work {
  th, td {
    border: 0 !important;
    padding-bottom: 10px !important;
  }
}
</style>