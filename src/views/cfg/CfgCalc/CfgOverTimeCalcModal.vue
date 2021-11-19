<template>
  <base-modal title="급여마스터 입력" id="cfg-emp-pay-master-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="초과근무코드" :has-error="errors.ONH_CD != ''" :required="basicData.ONH_CD.isRequired"/>
            <table-form-item :error-msg="errors.ONH_CD">
              <ui-dropdown :items="onhcodeItems"
                           :value="basicData.ONH_CD.value"
                           @change="basicData.ONH_CD.value=$event.value;"
                           :options="{ disabled: basicData.ONH_CD.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="통상임금종류" :has-error="errors.OT_PAYMARK != ''" :required="basicData.OT_PAYMARK.isRequired"/>
            <table-form-item :error-msg="errors.OT_PAYMARK">
              <ui-dropdown :items="basicData.OT_PAYMARK.items"
                           :value="basicData.OT_PAYMARK.value"
                           @change="basicData.OT_PAYMARK.value=$event.value;"
                           :options="{ disabled: basicData.OT_PAYMARK.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="월 소정시간" :has-error="errors.OTBASE != ''" :required="basicData.OTBASE.isRequired"/>
            <table-form-item :error-msg="errors.OTBASE">
              <ui-input :value="basicData.OTBASE.value"
                        @change="basicData.OTBASE.value=$event;"
                        :options="{disabled: basicData.OTBASE.isReadOnly}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="지급율(%)" :has-error="errors.OTRATE != ''" :required="basicData.OTRATE.isRequired"/>
            <table-form-item :error-msg="errors.OTRATE">
              <ui-input :value="basicData.OTRATE.value"
                        @change="basicData.OTRATE.value=$event;"
                        :options="{disabled: basicData.OTRATE.isReadOnly}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여코드" :has-error="errors.OT_TARGET_PAYCD != ''" :required="basicData.OT_TARGET_PAYCD.isRequired"/>
            <table-form-item :error-msg="errors.OT_TARGET_PAYCD">
              <ui-dropdown :items="paycodeItems"
                           :value="basicData.OT_TARGET_PAYCD.value"
                           @change="basicData.OT_TARGET_PAYCD.value=$event.value;"
                           :options="{ disabled: basicData.OT_TARGET_PAYCD.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
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
      onhcodeItems:[],
      ROUND_TYPE : 'OFF',
      ROUND_DIGIT : 1,
      url:'',
      basicData: {
        OT_PERIOD:{
          value: '0',
          isRequired: true,
          isReadOnly: false,
          validMsg: '',
        },
        ROUND_TYPE : {
          value: 'OFF',
          isRequired: true,
          isReadOnly: false,
          validMsg: '',
        },
        ROUND_DIGIT : {
          value: '1',
          isRequired: true,
          isReadOnly: false,
          validMsg: '',
        } ,
        ONH_CD: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '초과근무 코드를 선택해주세요',
        },
        OT_PAYMARK: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '통상임금종류를 선택해주세요',
          items: [
            {code: 'OTTYPE1', message: 'OTTYPE1'},
            {code: 'OTTYPE2', message: 'OTTYPE2'},
            {code: 'OTTYPE3', message: 'OTTYPE3'},
            {code: 'OTTYPE4', message: 'OTTYPE4'},
            {code: 'OTTYPE5', message: 'OTTYPE5'},
            {code: 'OTTYPE6', message: 'OTTYPE6'},
            {code: 'OTTYPE7', message: 'OTTYPE7'},
            {code: 'OTTYPE8', message: 'OTTYPE8'},
            {code: 'OTTYPE9', message: 'OTTYPE9'}
          ]
        },
        OTBASE: {
          value: '',
          isRequired: true,
          isReadOnly: false,
          validMsg: '월 소정시간을 입력해주세요',
        },
        OT_TARGET_PAYCD: {
          value: '',
          isRequired: false,
          validMsg: '대상 급여코드를 선택해주세요',
        },
        OTRATE: {
          value: '',
          isRequired: false,
          validMsg: '지급률을 선택해주세요',
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
      this.setOnhcode();
      this.setPaycode();
    },
    async setOnhcode(){
      let { data } = await this.$httpPost({
        param: {},
        url: '/hrm/code/hr-onh/list'
      });
      if(Array.isArray(data) && data.length > 0) {
        for(let i = 0; i < data.length; i ++)
          this.onhcodeItems.push({
            message: data[i]['ONH_NAM'],
            code: data[i]['ONH_CD']
          });
      }
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
