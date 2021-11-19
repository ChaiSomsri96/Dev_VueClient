<template>
  <base-modal title="통상임금 추가" id="cfg-year-modal" :scroll="false" width="450">
    <template v-slot:body>

      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="통상임금종류" :has-error="errors.OT_PAYMARK != ''" :required="basicData.OT_PAYMARK.isRequired"/>
            <table-form-item :error-msg="errors.OT_PAYMARK">
              <ui-dropdown :items="basicData.OT_PAYMARK.items"
                           :value="basicData.OT_PAYMARK.value"
                           @change="basicData.OT_PAYMARK.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여코드" :has-error="errors.PAY_CODE != ''" :required="basicData.PAY_CODE.isRequired"/>
            <table-form-item :error-msg="errors.PAY_CODE">
              <ui-dropdown :items="paycodeItems"
                           :value="basicData.PAY_CODE.value"
                           @change="basicData.PAY_CODE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여원천" :has-error="errors.CALC_SOURCE != ''" :required="basicData.CALC_SOURCE.isRequired"/>
            <table-form-item :error-msg="errors.CALC_SOURCE">
              <ui-dropdown :items="basicData.CALC_SOURCE.items"
                           :value="basicData.CALC_SOURCE.value"
                           @change="basicData.CALC_SOURCE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여기준월" :has-error="errors.OT_PERIOD != ''" :required="basicData.OT_PERIOD.isRequired"/>
            <table-form-item :error-msg="errors.OT_PERIOD">
              <ui-dropdown :items="basicData.OT_PERIOD.items"
                           :value="basicData.OT_PERIOD.value"
                           @change="basicData.OT_PERIOD.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="1년중 지급횟수" :has-error="errors.DIVIDE_BOTTOM != ''" :required="basicData.DIVIDE_BOTTOM.isRequired"/>
            <table-form-item :error-msg="errors.DIVIDE_BOTTOM">
              <ui-input :value="basicData.DIVIDE_BOTTOM.value"
                        @change="changeValue"/>
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
        <button class="btn btn-md black"  @click="onSave"  >
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
      basicData: {
        PAY_CODE: {
          value: '',
          isRequired: true,
          validMsg: '급여코드를 입력해주세요.',
        },
        OT_PAYMARK: {
          value: 'OTTYPE1',
          return: null,
          isRequired: true,
          items: [
            { message: 'TYPE1', code: 'OTTYPE1' },
            { message: 'TYPE2', code: 'OTTYPE2' },
            { message: 'TYPE3', code: 'OTTYPE3' },
            { message: 'TYPE4', code: 'OTTYPE4' },
            { message: 'TYPE5', code: 'OTTYPE5' },
            { message: 'TYPE6', code: 'OTTYPE6' },
            { message: 'TYPE7', code: 'OTTYPE7' },
            { message: 'TYPE8', code: 'OTTYPE8' },
            { message: 'TYPE9', code: 'OTTYPE9' },
          ]
        },
        CALC_SOURCE: {
          value: '',
          isRequired: true,
          validMsg: '급여원천을 선택해주세요.',
          items: [
            { message: '급여대장', code: 'TRANSACTION' },
            { message: '급여마스터', code: 'MASTER' }
          ]
        },
        DIVIDE_BOTTOM: {
          value: '12',
          isRequired: true,
          validMsg: '지급횟수를 입력해주세요.'

        },
        OT_PERIOD: {
          value: '0',
          isRequired: true,
          validMsg: '급여 기준월을 선택해주세요.',
          items: [
            { message: '당월', code: '0' },
            { message: '전월', code: '1' },
            { message: '2개월전', code: '2' }
          ]
        },
        url: {
          value: 'insert'

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

      this.$httpPost({
        url: '/payroll/code/cfg-otpay/'+me.basicData.url.value,
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
    setDropData: function (param) {
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


    async asyncDynamicComponentData(_param) {
      this.resetFormData();

      this.setDropData(_param);

      if(_param != null){

        this.setBasicData(_param);
      }



    },


    changeValue       : function () {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      if(event.target.value.length>2){
        event.target.value = event.target.value.substring(0,event.target.value.length - 1);

      }
      if(event.target.value>12){
        event.target.value = event.target.value.substring(0,event.target.value.length - 1);
        this.toast({message:'1년중 지급횟수는 12회를 초과할 수 없습니다'});
      }
      if(event.target.value==0){
        event.target.value = event.target.value.replace('1');
        this.toast({message:'1년중 지급횟수는 1회 이상 입력해야 합니다'});
      }

      this.basicData.DIVIDE_BOTTOM = event.target.value;
    },

  },
  mounted() {

  },


}

</script>
