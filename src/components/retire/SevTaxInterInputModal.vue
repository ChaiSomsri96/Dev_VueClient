<template>
  <base-modal title="합산대상퇴직금" id="sev-tax-irp-input-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="사원명" :has-error="errors.EMP_NAME != ''" :required="basicData.EMP_NAME.isRequired" />
            <table-form-item :error-msg="errors.EMP_NAME">
              <ui-input :value="basicData.EMP_NAME.value"
                        @change="basicData.EMP_NAME.value=$event;"
                        :options="{readonly: basicData.EMP_NAME.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="중간정산액" :has-error="errors.SEV_INTER_AMT != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_AMT">
              <ui-input-number :value="basicData.SEV_INTER_AMT.value"
                               @change="basicData.SEV_INTER_AMT.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="퇴직소득세" :has-error="errors.SEV_INTER_TAX != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_TAX">
              <ui-input-number :value="basicData.SEV_INTER_TAX.value"
                               @change="basicData.SEV_INTER_TAX.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="사업자번호" :has-error="errors.SEV_INTER_C_VATID != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_C_VATID">
              <ui-input :value="basicData.SEV_INTER_C_VATID.value"
                        @change="basicData.SEV_INTER_C_VATID.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="사업자명" :has-error="errors.SEV_INTER_C_NAME != ''"/>
            <table-form-item :error-msg="errors.SEV_INTER_C_NAME">
              <ui-input :value="basicData.SEV_INTER_C_NAME.value"
                        @change="basicData.SEV_INTER_C_NAME.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="중간지급 입사일" :has-error="errors.SEV_INTER_JOIN_DATE != ''"/>
            <table-form-item :error-msg="errors.SEV_INTER_JOIN_DATE">
              <ui-input-date :date="basicData.SEV_INTER_JOIN_DATE.value"
                             @change="basicData.SEV_INTER_JOIN_DATE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="중간지급 기산일" :has-error="errors.SEV_INTER_START_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_START_DATE">
              <ui-input-date :date="basicData.SEV_INTER_START_DATE.value"
                             @change="basicData.SEV_INTER_START_DATE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="중간지급 퇴사일" :has-error="errors.SEV_INTER_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_DATE">
              <ui-input-date :date="basicData.SEV_INTER_DATE.value"
                             @change="basicData.SEV_INTER_DATE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="중간지급 지급일" :has-error="errors.SEV_INTER_PAYMENT_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_INTER_PAYMENT_DATE">
              <ui-input-date :date="basicData.SEV_INTER_PAYMENT_DATE.value"
                             @change="basicData.SEV_INTER_PAYMENT_DATE.value=$event;"/>
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
        <button class="btn btn-md black" @click="onSave"  >
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
      errors: {},
      basicData: {
        EID: {
          value: ''
        },
        SEV_DATE: {
          value: ''
        },
        SEV_TYPE: {
          value: ''
        },
        EMP_NAME: {
          value: '',
          isRequired: true,
          isReadonly: true,
          validMsg: '이름을 선택해주세요',
        },
        SEV_INTER_AMT: {
          value: ''
        },
        SEV_INTER_TAX: {
          value: ''
        },
        SEV_INTER_C_VATID: {
          value: '',
        },
        SEV_INTER_C_NAME:{
          value: '',
        },
        SEV_INTER_JOIN_DATE: {
          value: '',
        },
        SEV_INTER_START_DATE: {
          value: '',
        },
        SEV_INTER_DATE: {
          value: '',
        },
        SEV_INTER_PAYMENT_DATE: {
          value: '',
        },
        url: {
          value: ''
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
      await me.$httpPost({
        url: '/payroll/retirement/sev-inter-tax/update',
        param: me.getSaveParams(),
        callback: function() {
          me.toastSuccessSave();
          me.callgrid();

        }
      }).then( me.onCancel());
    },

    callgrid(){
      this.$parent.loadGridData();
    },

    resetFormData: function() {
      Object.assign(this.basicData, this.$options.data().basicData);
    },

    setBasicData: function(param) {
      const me = this;
      let keys = Object.keys(this.basicData);
      keys.forEach((key) => {
        me.basicData[key].value = param[key] || me.$options.data().basicData[key].value;
      });
    },
    setReadOnly: function (param) {
      if(param.EMP_NAM!=null){
        this.basicData.EMP_NAM.isReadOnly = true;
      }
    },

    asyncDynamicComponentData(_param) {
      this.resetFormData()
      if(_param != null){
        this.setBasicData(_param);
        this.setReadOnly(_param);
      }
    }
  },
  mounted() {}
}
</script>
