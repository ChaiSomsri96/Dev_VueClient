<template>
  <base-modal title="세무서식 조회" id="sev-tax-report-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="신고연도" :has-error="errors.ATT_YEAR != ''" :required="basicData.ATT_YEAR.isRequired" />
            <table-form-item :error-msg="errors.ATT_YEAR">
              <ui-input :value="basicData.ATT_YEAR.value"
                        @change="basicData.ATT_YEAR.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="제출일" :has-error="errors.SUBMIT_DATE != ''" :required="basicData.SUBMIT_DATE.isRequired"/>
            <table-form-item :error-msg="errors.SUBMIT_DATE">
              <ui-input-date :date="basicData.SUBMIT_DATE.value"
                             @change="basicData.SUBMIT_DATE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="제출자 구분" :has-error="errors.SUBMIT_TYPE != ''" :required="basicData.SUBMIT_TYPE.isRequired"/>
            <table-form-item :error-msg="errors.SUBMIT_TYPE">
              <ui-dropdown :items="basicData.SUBMIT_TYPE.items"
                           :value="basicData.SUBMIT_TYPE.value"
                           @change="basicData.SUBMIT_TYPE.value=$event.value"
                           :return="basicData.SUBMIT_TYPE.items"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="신고관리사업장" :has-error="errors.RETIRE_TYPE != ''" :required="basicData.RETIRE_TYPE.isRequired"/>
            <table-form-item :error-msg="errors.RETIRE_TYPE">
              <ui-dropdown :items="basicData.RETIRE_TYPE.items"
                           :value="basicData.RETIRE_TYPE.value"
                           @change="basicData.RETIRE_TYPE.value=$event.value; setData( $event.object)"
                           :return="basicData.RETIRE_TYPE.items"
                           :options="{ valueField: 'REPORTER_BIZ_ID', labelField: 'DV_NAME', tooltipField: 'DV_NAME'}"/>
            </table-form-item>
          </tr>
        </template>
      </table-form>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave()"  >
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';

export default {
  mixins: [modal],
  components: {
    BaseModal,
    TableForm,
    TableFormItem,
    TableFormLabel
  },

  data() {
    return {
      checkedMembers: [],
      dateTypeGrp: '',
      sevAmtType: '',
      dropDownData: {},
      errors: {},
      basicData: {
        ATT_YEAR: {
          value: '',
          isRequired: true,
          validMsg: '신고연도를 입력해주세요.',
        },
        RETIRE_TYPE: {
          value: '',
          return: null,
          isRequired: true,
          validMsg: '사업장을 선택해주세요.',
          items: []
        },
        SUBMIT_TYPE:{
          value: '2',
          return: null,
          isRequired: true,
          validMsg: '제출자를 선택해주세요.',
          items: [
            { 'message': '법인', 'code': '2'},
            { 'message': '개인', 'code': '3'}
          ]
        },
        SUBMIT_DATE: {
          value: '',
          return: null,
          isRequired: false,
          validMsg: '제출일을 선택해주세요',
        },
        url: {
          plainTextUrl: '/payroll/retirement/nts-report/txt',
          ntsReportPreviewUrl : '/payroll/retirement/nts-report/preview'
        },
      }
    }
  },
  methods: {

    async onCancel() {
      let keys = Object.keys(this.basicData);
      keys.forEach((key) => {
        this.basicData[key].value = '';
        this.errors[key] = '';
      });

    },
    getSaveParams: function() {
      let params = {};
      let formData = this.getFormData();
      let keys = Object.keys(formData);
      keys.forEach((key) => {
        params[key] = formData[key].value;
      });

      return params;
    },

    getFormData: function() {
      let params = {};
      Object.assign(params, this.basicData);
      return params;
    },
    isValiStaticRequiredData: function(formData) {
      this.errors = {};
      const me = this;
      let valid = true;
      let keys = Object.keys(formData);
      keys.forEach((key) => {
        let data = formData[key];
        if(! data.isRequired) {
          return true;
        }

        if(data.isDynamicRequired === true) {
          return true;
        }

        if(this.payrollUtil.isEmpty(data.value)) {
          me.errors[key] = data.validMsg;
          valid = false;
        }
      });

      return valid;
    },

    async onSave() {
      const me = this;
      let formData = this.getFormData();
      if( ! me.isValiStaticRequiredData(formData)) {
        return;
      }
      let paramData = me.dropDownData;
      paramData.DATE_TYPE = me.dateTypeGrp;
      paramData.REPORTER_TYPE = me.basicData.SUBMIT_TYPE.value;
      paramData.SUBMIT_DATE = me.basicData.SUBMIT_DATE.value;
      paramData.ATT_YEAR = me.basicData.ATT_YEAR.value;
      paramData.REPORT_WORK_SITE = me.basicData.RETIRE_TYPE.value;
      paramData.DEL_SEV_AMT_TYPE = me.sevAmtType;
      paramData.EID_LIST = JSON.stringify( me.checkedMembers);

      try {
        let {data} = await me.$httpPostDownload({
          param: paramData,
          url: me.basicData.url.ntsReportPreviewUrl
        });
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    callgrid(){
      this.$parent.loadGridData();
    },

    async loadData() {
      let me = this;
      me.basicData.RETIRE_TYPE.items=[];
      try {
        let {data} = await me.$httpPost({
          param: { },
          url: '/system/setting/division-mgt/list'
        });
        for( let i=0; i< data.length; i++){
          this.basicData.RETIRE_TYPE.items.push({
            BP_CODE: data[i].BP_CODE,
            DV_NAME: data[i].DV_NAME,
            REPORTER_BIZ_NAME: data[i].CLI_NAME,
            REPORTER_BIZ_ID: data[i].DV_VATID,
            REPORTER_HOME_TAX_ID: data[i].HOMETAX_ID,
            DV_VAT_CHILD_SERIAL: data[i].DV_VAT_CHILD_SERIAL,
            CLI_UNIT_TAX: data[i].CLI_UNIT_TAX,
            TAX_OFFICE_ID: data[i].DV_TAXAUTH,
            MANAGER_NAME: data[i].BIZ_ICP_NAME,
            MANAGER_DEPT: data[i].BIZ_ICP_DEPT,
            MANAGER_TEL: data[i].BIZ_ICP_TEL,
            DV_HEAD: data[i].DV_HEAD,
            DV_RN: data[i].DV_RN
          });
        }
        // { 'message': '최종퇴직금', 'code': 'S'},
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    setData( _param){
      this.dropDownData = {};
      this.dropDownData = _param;
    },

    asyncDynamicComponentData(_param) {
      this.checkedMembers = _param.checkedMembers;
      this.dateTypeGrp = _param.dateTypeGrp;
      this.sevAmtType = _param.sevType;
      this.loadData();
    }
  },
  mounted() {}
}
</script>
