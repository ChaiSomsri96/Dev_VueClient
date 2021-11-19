<template>
  <base-modal title="급여마스터 입력" id="annual-salary-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="이름" :has-error="errors.EMP_NAM != ''" :required="basicData.EMP_NAM.isRequired" />
            <table-form-item :error-msg="errors.EMP_NAM">
              <ui-input :value="basicData.EMP_NAM.value"
                        @change="basicData.EMP_NAM.value=$event;"
                        :options="{readonly: basicData.EMP_NAM.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="부서" :has-error="errors.HRDEPT_NAM != ''" />
            <table-form-item :error-msg="errors.HRDEPT_NAM">
              <ui-input :value="basicData.HRDEPT_NAM.value"
                        @change="basicData.HRDEPT_NAM.value=$event;"
                        :options="{readonly: basicData.HRDEPT_NAM.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="적용시작일" :has-error="errors.APPLY_DATE != ''" :required="basicData.APPLY_DATE.isRequired"/>
            <table-form-item :error-msg="errors.APPLY_DATE">
              <ui-input-date :date="basicData.APPLY_DATE.value"
                             @change="basicData.APPLY_DATE.value=$event;"
                             :options="{readonly: basicData.APPLY_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="적용종료일" :has-error="errors.END_DATE != ''" :required="basicData.END_DATE.isRequired"/>
            <table-form-item :error-msg="errors.END_DATE">
              <ui-input-date :date="basicData.END_DATE.value"
                             @change="basicData.END_DATE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="연봉" :has-error="errors.ANNUAL_PAY1 != ''" :required="basicData.ANNUAL_PAY1.isRequired" />
            <table-form-item :error-msg="errors.ANNUAL_PAY1">
              <ui-input-number :value="basicData.ANNUAL_PAY1.value"
                               @change="basicData.ANNUAL_PAY1.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="기본급" :has-error="errors.BASIC_PAY != ''" />
            <table-form-item :error-msg="errors.BASIC_PAY">
              <ui-input-number :value="basicData.BASIC_PAY.value"
                               @change="basicData.BASIC_PAY.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="연간 식대" :has-error="errors.MEAL_ALLOWANCE != ''" />
            <table-form-item :error-msg="errors.MEAL_ALLOWANCE">
              <ui-input-number :value="basicData.MEAL_ALLOWANCE.value"
                               @change="basicData.MEAL_ALLOWANCE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="연간 차량유지비" :has-error="errors.CAR_ALLOWANCE != ''" />
            <table-form-item :error-msg="errors.CAR_ALLOWANCE">
              <ui-input-number :value="basicData.CAR_ALLOWANCE.value"
                               @change="basicData.CAR_ALLOWANCE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="연간 기타 수당" :has-error="errors.NOT_EXIST != ''" />
            <table-form-item :error-msg="errors.NOT_EXIST">
              <ui-input-number :value="basicData.NOT_EXIST.value"
                               @change="basicData.NOT_EXIST.value=$event;"/>
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
        EMP_NAM: {
          value: '',
          isRequired: true,
          isReadonly: false,
          validMsg: '이름을 선택해주세요',
        },
        HRDEPT_NAM: {
          value: '',
          isReadonly: false,
        },
        APPLY_DATE: {
          value: '',
          isRequired: false,
          isReadonly: false,
          validMsg: '적용시작일을 입력해주세요',
        },
        END_DATE: {
          value: '',
          isRequired: true,
          validMsg: '적용종료일을 선택해주세요',
        },
        ANNUAL_PAY1: {
          value: '',
          isRequired: true,
          validMsg: '연봉을 입력해주세요',
        },
        BASIC_PAY: {
          value: ''
        },
        MEAL_ALLOWANCE: {
          value: ''
        },
        CAR_ALLOWANCE: {
          value: '',
        },
        NOT_EXIST: {
          value: '',
        },
        url: {
          value: ''
        },
      },
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
      this.basicData.HRDEPT_NAM.isReadOnly = true;
      if( param.APPLY_DATE != null) {
        this.basicData.APPLY_DATE.isReadOnly = true;
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
