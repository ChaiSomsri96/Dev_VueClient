<template>
  <base-modal title="퇴직금 입력" id="sev-pension-record-delete-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="퇴직연금 적립대장 기록일" :has-error="errors.SEV_DATE != ''" :required="basicData.SEV_DATE.isRequired"/>
            <table-form-item :error-msg="errors.SEV_DATE">
              <ui-dropdown :items="basicData.SEV_DATE.items"
                           :value="basicData.SEV_DATE.value"
                           @change="basicData.SEV_DATE.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
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
          <i class="icon-lineIcon-del mr-5"></i>삭제
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
        SEV_DATE: {
          value: '',
          return: null,
          isRequired: true,
          validMsg: '날짜를 선택해주세요.',
          items: []
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

    onSave() {
      const me = this;
      this.$httpPost({
        url: '/payroll/multiretirement/multi-retire-remove/new-list',
        param: {
          SEV_RPEN_SAVE_SOURCE: 'A',
          SEV_RPEN_SAVE_TYPE: 'S',
          SEV_RPEN_INPUT_TYPE: 'A',
          SEV_DATE: String( me.basicData.SEV_DATE.value)
        },
        callback: function () {
          me.toastSuccessDelete();
          me.resetFormData();
          me.setBasicData();
          me.callgrid();
        }
      });
    },

    callgrid(){
      this.$parent.loadGridData();
    },

    resetFormData: function() {
      Object.assign(this.basicData, this.$options.data().basicData);
    },

    async setBasicData() {
      const me = this;

      try {
        const {data} = await me.$httpPost({
          url:'/payroll/retirement/sev-pension/sev-date-list',
          param:{
            SAVE_RECORD: 'Y',
            SEV_RPEN_SAVE_SOURCE: 'A',
            SEV_RPEN_SAVE_TYPE: 'S',
            SEV_RPEN_INPUT_TYPE: 'A'
          }
        });
        for( let i=0; i< data.length; i++){
          let sevDate = data[i].SEV_DATE;
          me.basicData.SEV_DATE.items.push({
            message: sevDate.substr( 0,4)+'.'+sevDate.substr( 4,2)+'.'+sevDate.substr( 6),
            code: sevDate
          });
        }
      } catch (e) {
        console.error(e);
      }
    },

    asyncDynamicComponentData() {
      this.resetFormData()
      this.setBasicData();
    }
  },
  mounted() {}
}
</script>
