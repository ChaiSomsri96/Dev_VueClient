<template>
  <base-modal :title="title" id="ye-tax-report-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">
          <labeled-input input-label="제출일" labelClass="col-4" inputClass="col-8">
            <ui-input-date :date="selCode.SUBMIT_DATE"
                           @change="selCode.SUBMIT_DATE=$event;"
            />
          </labeled-input>
          <labeled-input input-label="제출대상기간" labelClass="col-4" inputClass="col-8">
            <ui-dropdown :items="periodTypes"
                         :value="selCode.PERIOD_TYPE"
                         @change="selCode.PERIOD_TYPE=$event.value; selCode.return=$event"
                         :options="{ valueField : 'val', labelField: 'desc' }"
            />
          </labeled-input>
          <labeled-input input-label="신고관리사업장" labelClass="col-4" inputClass="col-8">
            <ui-dropdown :items="workSites"
                         :value="selCode.REPORT_WORK_SITE"
                         @change="selCode.REPORT_WORK_SITE=$event.value; selCode.return=$event"
                         :options="{ valueField : 'DV_VATID', labelField: 'DV_NAME' }"
            />
          </labeled-input>
          <labeled-input input-label="신고종류" labelClass="col-4" inputClass="col-8">
            <ui-radio-button-inline :options="fileTypes" @change="selCode.FILE_TYPE=$event.value"/>
          </labeled-input>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" data-dismiss="modal" @click="onSave">
          <i class="icon-lineIcon-check mr-5"></i>{{ buttonText }}
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import LabeledInput from "../../../components/common/LabeledInput";
import UiRadioButtonInline from "../../../components/common/UiRadioButtonInline";
import UiInputYear from "../../../components/common/UiInputYear";

export default {
  mixins: [modal],
  components: {
    UiInputYear,
    UiRadioButtonInline,
    LabeledInput,
    BaseModal
  },
  data() {
    return {
      reportType: {
        preview: { name: 'preview', url: '/year-end/report/income/nts-report/preview' },
        plain: { name: 'plain', url: '/year-end/report/income/nts-report/txt' },
        encrypt: { name: 'encrypt', url: '/year-end/report/income/nts-report/enc-txt'}
      },
      reportUrl: '',
      title: '',
      buttonText: '',
      selCode: {
        FILE_TYPE: 'WORK',
        PERIOD_TYPE: '1',
        SUBMIT_DATE: '',
        REPORT_WORK_SITE: ''
      },
      periodTypes:  [
          {desc: '연간합산제출', val: '1'},
          {desc: '휴/폐업에 의한 수시제출', val: '2'},
          {desc: '수시분할제출', val: '3'}
        ],
      workSites: [],
      empList: [],
      fileTypes: {
        name: 'FILE_TYPE',
        value: 'WORK',
        domOptList: [
          {value: 'WORK', label: '근로소득', id: 'FILE_TYPE-WORK-1'},
          {value: 'MEDI', label: '의료비', id: 'FILE_TYPE-MEDI-2'}
        ]
      },
    }
  },
  methods: {
    loadCorpDivision: async function () {
      let {data} = await this.$httpGet('/system/setting/division-mgt/list', {});
      this.workSites = data;
    },
    // '/system/setting/division-mgt/list'
    createDynamicComponent() {
      this.loadCorpDivision();
    },
    asyncDynamicComponentData(param) {
      let me = this;
      this.type = param['type'];
      this.title = param['title'];
      this.buttonText = param['buttonText'];
      this.empList = param.list;
      switch (param.type){
        case me.reportType.preview.name:
          me.reportUrl = me.reportType.preview.url; break;
        case me.reportType.plain.name:
          me.reportUrl = me.reportType.plain.url; break;
        case me.reportType.encrypt.name:
          me.reportUrl = me.reportType.encrypt.url; break;
      }
    },
    async onCancel() {

    },
    async onSave() {
      let me = this;
      let {data} = await me.$httpPostDownload({
        url: me.reportUrl,
        param: me.getParameter()
      });
    },

    getParameter: function(){
      return {
        ATT_YEAR:"2020",
        SUBMIT_DATE:"20210628",
        REPORTER_TYPE:"1",
        PERIOD_TYPE:"1",
        TAX_AGENT_NUMBER:"",
        REPORT_WORK_SITE:"1028134334",
        IS_RRN:"YES",
        REPORTER_BIZ_NAME:"블랙버드 코리아",
        REPORTER_BIZ_ID:"1028134334",
        REPORTER_HOME_TAX_ID:"Donghong",
        TAX_OFFICE_ID:"114",
        MANAGER_NAME:"이순자",
        MANAGER_DEPT:"경리부",
        MANAGER_TEL:"02-1234-9973",
        FILE_TYPE:"WORK",
        DV_HEAD:"닉퓨리",
        DV_RN:"1234567890123",
        DV_VAT_CHILD_SERIAL:"0000",
        CLI_UNIT_TAX:"Y",
        EID_LIST:"3286,3277,1465"
      }
    }
  },
  mounted() {
  }
}
</script>
