<template>
  <base-modal title="IRP 입금액" id="sev-tax-irp-input-modal" :scroll="false" width="500" >
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
            <table-form-label label="퇴직일" :has-error="errors.SEV_DATE != ''" :required="basicData.SEV_DATE.isRequired"/>
            <table-form-item :error-msg="errors.SEV_DATE">
              <ui-input-date :date="basicData.SEV_DATE.value"
                             @change="basicData.SEV_DATE.value=$event;"
                             :options="{readonly: basicData.SEV_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="입금일자" :has-error="errors.SEV_IRP_SV_DATE != ''" />
            <table-form-item :error-msg="errors.SEV_IRP_SV_DATE">
              <ui-input-date :date="basicData.SEV_IRP_SV_DATE.value"
                             @change="basicData.SEV_IRP_SV_DATE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="종류" :has-error="errors.SEV_IRP_SV_TYPE != ''" :required="basicData.SEV_IRP_SV_TYPE.isRequired"/>
            <table-form-item :error-msg="errors.SEV_IRP_SV_TYPE">
              <ui-dropdown :items="basicData.SEV_IRP_SV_TYPE.items"
                           :value="basicData.SEV_IRP_SV_TYPE.value"
                           @change="basicData.SEV_IRP_SV_TYPE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="연금사업자명" :has-error="errors.SEV_IRP_COMP_NAME != ''"/>
            <table-form-item :error-msg="errors.SEV_IRP_COMP_NAME">
              <ui-input :value="basicData.SEV_IRP_COMP_NAME.value"
                        @change="basicData.SEV_IRP_COMP_NAME.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="사업자번호" :has-error="errors.SEV_IRP_COMP_VATID != ''"/>
            <table-form-item :error-msg="errors.SEV_IRP_COMP_VATID">
              <ui-input :value="basicData.SEV_IRP_COMP_VATID.value"
                        @change="basicData.SEV_IRP_COMP_VATID.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="계좌번호" :has-error="errors.SEV_IRP_AC_NO != ''" />
            <table-form-item :error-msg="errors.SEV_IRP_AC_NO">
              <ui-input :value="basicData.SEV_IRP_AC_NO.value"
                        @change="basicData.SEV_IRP_AC_NO.value=$event;"/>
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
        EMP_NAME: {
          value: '',
          isRequired: true,
          isReadonly: true,
          validMsg: '이름을 선택해주세요',
        },
        SEV_DATE: {
          value: '',
          return: null,
          isReadonly: true,
          isRequired: true,
          validMsg: '종류를 선택해주세요.',
          items: [
            { 'message': '최종퇴직금', 'code': 'S'},
            { 'message': '퇴직금 중간정산', 'code': 'I'},
            { 'message': '퇴직급여 추계액', 'code': 'A'}
          ]
        },
        SEV_IRP_SV_DATE: {
          value: '',
          validMsg: '적용종료일을 선택해주세요',
        },

        SEV_IRP_SV_TYPE: {
          value: '',
          return: null,
          isRequired: true,
          validMsg: '종류를 선택해주세요.',
          items: [
            { 'message': '원천징수후 입금(사후입금)', 'code': 'B'},
            { 'message': '원천징수전 입금(사전입금)', 'code': 'A'}
          ]
        },
        SEV_IRP_COMP_NAME:{
          value: '',
        },
        SEV_IRP_COMP_VATID: {
          value: '',
        },
        SEV_IRP_AC_NO: {
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
      // await this.$httpPost({
      //   url: '',
      //   param: this.getSaveParams(),
      //   callback: function() {
      //     me.toastSuccessSave();
      //     me.callgrid();
      //     me.onCancel();
      //   }
      // });
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
