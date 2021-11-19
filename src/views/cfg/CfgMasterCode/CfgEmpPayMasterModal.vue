<template>
  <base-modal title="급여마스터 입력" id="cfg-emp-pay-master-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>

          <tr>
            <table-form-label label="이름" :has-error="errors.EMP_NAME != ''" :required="basicData.EMP_NAME.isRequired"/>
            <table-form-item :error-msg="errors.EMP_NAME">
              <ui-input :value="basicData.EMP_NAME.value"
                        @change="basicData.EMP_NAME.value=$event;"
                        :options="{disabled: basicData.EMP_NAME.isReadOnly}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="부서" :has-error="errors.DEPT_NAME != ''" :required="basicData.DEPT_NAME.isRequired"/>
            <table-form-item :error-msg="errors.DEPT_NAME">
              <ui-input :value="basicData.DEPT_NAME.value"
                        @change="basicData.DEPT_NAME.value=$event;"
                        :options="{disabled: basicData.DEPT_NAME.isReadOnly}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="시작일" :has-error="errors.START_DATE != ''" :required="basicData.START_DATE.isRequired"/>
            <table-form-item :error-msg="errors.START_DATE">
              <ui-input-date :date="basicData.START_DATE.value"
                             @change="basicData.START_DATE.value=$event;"
                             :options="{disabled: basicData.START_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="종료일" :has-error="errors.END_DATE != ''" :required="basicData.END_DATE.isRequired"/>
            <table-form-item :error-msg="errors.END_DATE">
              <ui-input-date :date="basicData.END_DATE.value"
                             @change="basicData.END_DATE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여코드" :has-error="errors.PAY_CODE != ''" :required="basicData.PAY_CODE.isRequired"/>
            <table-form-item :error-msg="errors.PAY_CODE">
              <ui-dropdown :items="paycodeItems"
                           :value="basicData.PAY_CODE.value"
                           @change="basicData.PAY_CODE.value=$event.value;"
                           :options="{ disabled: basicData.PAY_CODE.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="금액" :has-error="errors.PAY_AMOUNT != ''" :required="basicData.PAY_AMOUNT.isRequired"/>
            <table-form-item :error-msg="errors.PAY_AMOUNT">
              <ui-input :value="basicData.PAY_AMOUNT.value"
                        @change="basicData.PAY_AMOUNT.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="외화통화" :has-error="errors.PAY_FAX != ''" :required="basicData.PAY_FAX.isRequired"/>
            <table-form-item :error-msg="errors.PAY_FAX">
              <ui-dropdown :items="basicData.PAY_FAX.items"
                           :value="basicData.PAY_FAX.value"
                           @change="basicData.PAY_FAX.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="외화금액" :has-error="errors.PAY_FXAMOUNT != ''" :required="basicData.PAY_FXAMOUNT.isRequired"/>
            <table-form-item :error-msg="errors.PAY_FXAMOUNT">
              <ui-input :value="basicData.PAY_FXAMOUNT.value"
                        @change="basicData.PAY_FXAMOUNT.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="비고" :has-error="errors.PAYDAY_MEMO2 != ''" :required="basicData.PAYDAY_MEMO2.isRequired"/>
            <table-form-item :error-msg="errors.PAYDAY_MEMO2">
              <ui-input :value="basicData.PAYDAY_MEMO2.value"
                        @change="basicData.PAYDAY_MEMO2.value=$event;"/>
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
      paycodeItems:[],
      url:'',
      basicData: {
        EMP_NAME: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '이름을 선택해주세요',
        },
        PAY_CODE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '급여코드를 선택해주세요',
        },
        DEPT_NAME: {
          value: '',
          isRequired: true,
          isReadOnly: true,
          validMsg: '부서를 선택해주세요',
        },
        PAY_FXAMOUNT: {
          value: '',
          isRequired: false,
          validMsg: '외화금액을 입력해주세요',
        },
        PAY_DATE: {
          value: '',
          isRequired: true,
          validMsg: '급여일을 선택해주세요',
        },
        START_DATE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '급여 시작일을 선택해주세요',
        },
        END_DATE: {
          value: '',
          isRequired: true,
          validMsg: '급여 종료일을 선택해주세요',
        },
        PAY_FAX: {
          value: '',
          isRequired: false,
          validMsg: '개인별 조회 숨김을 선택해주세요.',
          items: [
            { message: 'USD', code: 'USD' },
            { message: 'YEN', code: 'YEN' }
          ]
        },
        PAY_AMOUNT: {
          value: '',
          isRequired: true,
        },
        PAYDAY_MEMO2: {
          value: '',
          isRequired: false,
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
      if( ! this.isValiStaticRequiredData(formData)) {
        return;
      }
      await this.$httpPost({
        url: me.url,
        param: this.getSaveParams(),
        callback: function() {
          me.toastSuccessSave();
          me.callgrid();
          me.onCancel();
        }
      });

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
      if(param.PAY_MONTH!=null){
        this.basicData.PAY_MONTH.isReadOnly = true;
      }
    },
    setDropData: function () {
      this.setPaycode();
    },
    async setPaycode(){
      let { data } = await this.$httpPost({
        param: {},
        url: '/payroll/code/pay-pay/list_active'
      });
      if(Array.isArray(data) && data.length > 0) {
        for(let i = 0; i < data.length; i ++)
          this.paycodeItems.push({
            message: data[i]['PAY_NAM'],
            code: data[i]['PAY_CODE']
          });
      }
    },
    asyncDynamicComponentData(_param) {
      this.resetFormData()
      this.setDropData()
      if(_param.setting == 'inster'){
        this.url = _param.url
      }else{
        this.url = _param.url
        this.setBasicData(_param);
        this.setReadOnly(_param);
      }

    },
  },
  mounted() {}
}
</script>
