<template>
  <base-modal title="제외월수 등" id="sev-tax-except-month-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="사원명" :has-error="errors.EMP_NAME != ''" :required="basicData.EMP_NAME.isRequired" />
            <table-form-item :error-msg="errors.EMP_NAME">
              <ui-input :value="basicData.EMP_NAME.value"
                        @change="basicData.EMP_NAME.value=$event;"
                        :options="{readonly: true}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="퇴직일" :has-error="errors.SEV_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_DATE">
              <ui-input-date :date="basicData.SEV_DATE.value"
                              @change="basicData.SEV_DATE.value=$event;"
                             :value="basicData.SEV_DATE.value"
                              :options="{readonly: true}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="종류" :has-error="errors.SEV_TYPE != ''" :required="basicData.SEV_TYPE.isRequired"/>
            <table-form-item :error-msg="errors.SEV_TYPE">
              <ui-dropdown :items="basicData.SEV_TYPE.items"
                           :value="basicData.SEV_TYPE.value"
                           @change="basicData.SEV_TYPE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="조정된 기산일" :has-error="errors.SEV_START_DATE_OVERRIDE != ''" />
            <table-form-item :error-msg="errors.SEV_START_DATE_OVERRIDE">
              <ui-input-date :date="basicData.SEV_START_DATE_OVERRIDE.value"
                             :value="basicData.SEV_START_DATE_OVERRIDE.value"
                              @change="basicData.SEV_START_DATE_OVERRIDE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="DB형 가입일" :has-error="errors.SEV_REAL_DC_JOIN_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_REAL_DC_JOIN_DATE">
              <ui-input-date :date="basicData.SEV_REAL_DC_JOIN_DATE.value"
                             :value="basicData.SEV_REAL_DC_JOIN_DATE.value"
                              @change="basicData.SEV_REAL_DC_JOIN_DATE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="제외월수" :has-error="errors.SEV_REAL_EXCL_MON_A13 != ''" />
            <table-form-item :error-msg="errors.SEV_REAL_EXCL_MON_A13">
              <ui-input-number :value="basicData.SEV_REAL_EXCL_MON_A13.value"
                               @change="basicData.SEV_REAL_EXCL_MON_A13.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="가산월수" :has-error="errors.SEV_REAL_INCL_MON_A13 != ''" />
            <table-form-item :error-msg="errors.SEV_REAL_INCL_MON_A13">
              <ui-input-number :value="basicData.SEV_REAL_INCL_MON_A13.value"
                               @change="basicData.SEV_REAL_INCL_MON_A13.value=$event;"
              />
            </table-form-item>
          <tr>
            <table-form-label label="세액공제액" :has-error="errors.SEV_TAX_DEDUCT != ''" />
            <table-form-item :error-msg="errors.SEV_TAX_DEDUCT">
              <ui-input-number :value="basicData.SEV_TAX_DEDUCT.value"
                               @change="basicData.SEV_TAX_DEDUCT.value=$event;"
              />
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
          value: '',
          return: null,
          isRequired: true,
          validMsg: '종류를 선택해주세요.',
          items: [
            { 'message': '최종퇴직금', 'code': 'S'},
            { 'message': '중간정산', 'code': 'I'}
          ]
        },
        EMP_NAME: {
          value: '',
          isRequired: true,
          isReadonly: true,
          validMsg: '이름을 선택해주세요',
        },
        SEV_START_DATE_OVERRIDE:{
          value: '',
        },
        SEV_REAL_DC_JOIN_DATE: {
          value: '',
        },
        SEV_REAL_EXCL_MON_A13: {
          value: '',
        },
        SEV_REAL_INCL_MON_A13: {
          value: '',
        },
        SEV_TAX_DEDUCT: {
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
        url: '/payroll/retirement/sev-excepnt-month/update',
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
      this.resetFormData();
      if(_param != null){
        this.setBasicData(_param);
        this.setReadOnly(_param);
      }
    }
  },
  mounted() {}
}
</script>
