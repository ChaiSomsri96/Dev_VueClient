<template>
  <base-modal title="급여일 입력" id="pay-day-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="급여월" :has-error="errors.PAY_MONTH != ''" :required="basicData.PAY_MONTH.isRequired"/>
            <table-form-item :error-msg="errors.PAY_MONTH">
              <div class="input-group" >
                <ui-month-picker v-model="basicData.PAY_MONTH.value"
                                 :options="{disabled: basicData.PAY_MONTH.isReadOnly}"/>
              </div>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="차수" :has-error="errors.SEQ != ''" :required="basicData.SEQ.isRequired"/>
            <table-form-item :error-msg="errors.SEQ">
              <ui-input :value="basicData.SEQ.value"
                        @change="basicData.SEQ.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여일" :has-error="errors.PAY_DATE != ''" :required="basicData.PAY_DATE.isRequired"/>
            <table-form-item :error-msg="errors.PAY_DATE">
              <ui-input-date :date="basicData.PAY_DATE.value"
                             @change="basicData.PAY_DATE.value=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="제목" :has-error="errors.PAYDAY_TYPE_MEMO != ''" :required="basicData.PAYDAY_TYPE_MEMO.isRequired"/>
            <table-form-item :error-msg="errors.PAYDAY_TYPE_MEMO">
              <ui-input :value="basicData.PAYDAY_TYPE_MEMO.value"
                        @change="basicData.PAYDAY_TYPE_MEMO.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="시작일" :has-error="errors.START_DATE != ''" :required="basicData.START_DATE.isRequired"/>
            <table-form-item :error-msg="errors.START_DATE">
              <ui-input-date :date="basicData.START_DATE.value"
                             @change="basicData.START_DATE.value=$event;"
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
            <table-form-label label="개인별 조회 숨김" :has-error="errors.HIDE_INDIVIDUALQRY != ''" :required="basicData.HIDE_INDIVIDUALQRY.isRequired"/>
            <table-form-item :error-msg="errors.HIDE_INDIVIDUALQRY">
              <ui-dropdown :items="basicData.HIDE_INDIVIDUALQRY.items"
                           :value="basicData.HIDE_INDIVIDUALQRY.value"
                           @change="basicData.HIDE_INDIVIDUALQRY.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="상태" :has-error="errors.CLOSE_FLAG != ''" :required="basicData.CLOSE_FLAG.isRequired"/>
            <table-form-item :error-msg="errors.CLOSE_FLAG">
              <ui-dropdown :items="basicData.CLOSE_FLAG.items"
                           :value="basicData.CLOSE_FLAG.value"
                           @change="basicData.CLOSE_FLAG.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여명세서 메모 1" :has-error="errors.PAYDAY_MEMO1 != ''" :required="basicData.PAYDAY_MEMO1.isRequired"/>
            <table-form-item :error-msg="errors.PAYDAY_MEMO1">
              <ui-input :value="basicData.PAYDAY_MEMO1.value"
                        @change="basicData.PAYDAY_MEMO1.value=$event;"/>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="급여명세서 메모 2" :has-error="errors.PAYDAY_MEMO2 != ''" :required="basicData.PAYDAY_MEMO2.isRequired"/>
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
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiInputYear from "../../../common/UiInputYear";
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';

export default {
  mixins: [modal],
  components: {
    UiInputYear,
    BaseModal,
    UiMonthPicker,
    TableForm,
    TableFormItem,
    TableFormLabel
  },

  data() {
    return {
      errors: {},
      basicData: {
        PAY_MONTH: {
          value: '',
          isRequired: true,
          isReadonly: false,
          validMsg: '급여월을 선택해주세요',
        },
        SEQ: {
          value: '',
          isRequired: true,
          validMsg: '차수를 선택해주세요',
        },
        PAYDAY_TYPE_MEMO: {
          value: '',
          isRequired: false,
          validMsg: '제목을 입력해주세요',
        },
        PAY_DATE: {
          value: '',
          isRequired: true,
          validMsg: '급여일을 선택해주세요',
        },
        START_DATE: {
          value: '',
          isRequired: true,
          validMsg: '급여 시작일을 선택해주세요',
        },
        END_DATE: {
          value: '',
          isRequired: true,
          validMsg: '급여 종료일을 선택해주세요',
        },
        HIDE_INDIVIDUALQRY: {
          value: 'N',
          return: null,
          isRequired: true,
          validMsg: '개인별 조회 숨김을 선택해주세요.',
          items: [
            { message: '예', code: 'Y' },
            { message: '아니오', code: 'N' }
          ]
        },
        CLOSE_FLAG: {
          value: '',
          isRequired: true,
          validMsg: '상태를 선택해주세요.',
          items: [
            { message: '미도래', code: '0' },
            { message: '오픈', code: '1' },
            { message: '마감', code: '2' }
          ]
        },
        PAYDAY_MEMO1: {
          value: '',
          isRequired: false,
        },
        PAYDAY_MEMO2: {
          value: '',
          isRequired: false,
        },
        WORKING_DAY: {
          value: '0'
        },
        BASE_COUNT_DAY: {
          value: '0'
        },
        CUTOFF_DATE: {
          value: '',
        },
        SPECIALPAY_FLAG: {
          value: 'N',
        },
        SECONDARY_ONLY: {
          value: 'N',
        },
        url: {
          value: '/payroll/code/pay-date/insert'

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
        url: me.basicData.url.value,
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

    asyncDynamicComponentData(_param) {
      this.resetFormData()
      if(_param != null){
        this.setBasicData(_param);

        this.setReadOnly(_param);
      }


    },



  },
  mounted() {}
}
</script>
