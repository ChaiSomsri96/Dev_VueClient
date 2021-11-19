<template>
  <base-modal title="퇴직금 입력" id="retire-input-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="사원명" :has-error="errors.EMP_NAM != ''" :required="basicData.EMP_NAM.isRequired" />
            <table-form-item :error-msg="errors.EMP_NAM">
              <ui-input :value="basicData.EMP_NAM.value"
                        @change="basicData.EMP_NAM.value=$event;"
                        :options="{readonly: basicData.EMP_NAM.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="종류" :has-error="errors.RETIRE_TYPE != ''" :required="basicData.RETIRE_TYPE.isRequired"/>
            <table-form-item :error-msg="errors.RETIRE_TYPE">
              <ui-dropdown :items="basicData.RETIRE_TYPE.items"
                           :value="basicData.RETIRE_TYPE.value"
                           @change="basicData.RETIRE_TYPE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="퇴직일(기준일)" :has-error="errors.RETIRE_DATE != ''" :required="basicData.RETIRE_DATE.isRequired"/>
            <table-form-item :error-msg="errors.RETIRE_DATE">
              <ui-input-date :date="basicData.RETIRE_DATE.value"
                             @change="basicData.RETIRE_DATE.value=$event;"
                             :options="{readonly: basicData.RETIRE_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="퇴직금 지급입" :has-error="errors.RETIRE_PAY_DATE != ''" :required="basicData.RETIRE_PAY_DATE.isRequired"/>
            <table-form-item :error-msg="errors.RETIRE_PAY_DATE">
              <ui-input-date :date="basicData.RETIRE_PAY_DATE.value"
                             @change="basicData.RETIRE_PAY_DATE.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="입사일" :has-error="errors.E_JOIN_DATE != ''"/>
            <table-form-item :error-msg="errors.E_JOIN_DATE">
              <ui-input-date :date="basicData.E_JOIN_DATE.value"
                             @change="basicData.E_JOIN_DATE.value=$event;"
                             :options="{readonly: basicData.E_JOIN_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="근무시작인정일" :has-error="errors.VALID_JOIN_DATE != ''"/>
            <table-form-item :error-msg="errors.VALID_JOIN_DATE">
              <ui-input-date :date="basicData.VALID_JOIN_DATE.value"
                             @change="basicData.VALID_JOIN_DATE.value=$event;"
                             :options="{readonly: basicData.VALID_JOIN_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="퇴직금" :has-error="errors.SEV_REAL_FINAL_AMT != ''" :required="basicData.EMP_NAM.isRequired" />
            <table-form-item :error-msg="errors.SEV_REAL_FINAL_AMT">
              <ui-input-number :value="basicData.SEV_REAL_FINAL_AMT.value"
                               @change="basicData.SEV_REAL_FINAL_AMT.value=$event;"/>
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
        // RETIRE_TYPE: {
        //   value: '',
        //   isRequired: true,
        //   isReadonly: false,
        // },
        RETIRE_TYPE: {
          value: '',
          return: null,
          isRequired: true,
          validMsg: '종류를 선택해주세요.',
          items: [
            { 'message': '최종퇴직금', 'code': 'S'},
            { 'message': '퇴직금 중간정산', 'code': 'I'},
            { 'message': '퇴직급여 추계액', 'code': 'A'}
          ]
        },
        RETIRE_DATE: {
          value: '',
          isRequired: false,
          isReadonly: false,
          validMsg: '적용시작일을 선택해주세요',
        },
        RETIRE_PAY_DATE: {
          value: '',
          isRequired: true,
          validMsg: '적용종료일을 선택해주세요',
        },
        E_JOIN_DATE:{
          isReadonly: true,
          value: '',
        },
        VALID_JOIN_DATE: {
          isReadonly: true,
          value: '',
        },
        SEV_REAL_FINAL_AMT: {
          isRequired: true,
          validMsg: '퇴직금을 입력해주세요',
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

    basicReadOnly: function(){
      this.basicData.E_JOIN_DATE.isReadOnly = true;
      this.basicData.VALID_JOIN_DATE.isReadOnly = true;
    },

    asyncDynamicComponentData(_param) {
      this.resetFormData()
      this.basicReadOnly();
      if(_param != null){
        this.setBasicData(_param);
        this.setReadOnly(_param);
      }
    }
  },
  mounted() {}
}
</script>
