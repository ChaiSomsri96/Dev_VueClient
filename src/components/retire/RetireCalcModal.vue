<template>
  <base-modal title="퇴직금 입력" id="retire-calc-modal" :scroll="false" width="500" >
    <template v-slot:body>
      <table-form :colgroup="['30%', 'auto']">
        <template v-slot:body>
<!--          <tr>-->
<!--            <table-form-label label="계산식 번호" :has-error="errors.SEV_CONTROL_NO != ''" :required="basicData.SEV_CONTROL_NO.isRequired"/>-->
<!--            <table-form-item :error-msg="errors.SEV_CONTROL_NO">-->
<!--              <ui-dropdown :items="basicData.SEV_CONTROL_NO.items"-->
<!--                           :value="basicData.SEV_CONTROL_NO.value"-->
<!--                           @change="basicData.SEV_CONTROL_NO.value=$event.value;"-->
<!--                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>-->
<!--            </table-form-item>-->
<!--          </tr>-->
          <tr>
            <table-form-label label="최종 3개월 급여" :has-error="errors.THRE_MON_PAY != ''" :required="basicData.THRE_MON_PAY.isRequired"/>
            <table-form-item :error-msg="errors.THRE_MON_PAY">
              <div class="colwrap">
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.THRE_MON_PAY_ST.value"
                                 @change="basicData.THRE_MON_PAY_ST.value=$event;"
                                 :options="{readonly: basicData.THRE_MON_PAY_ST.isReadOnly}"
                  />
                </div>
                <div class="colwrap-item">

                  <span>~</span>
                </div>
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.THRE_MON_PAY_TO.value"
                                 @change="basicData.THRE_MON_PAY_TO.value=$event;"
                                 :options="{readonly: basicData.THRE_MON_PAY_TO.isReadOnly}"
                  />
                </div>
              </div>
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="최종 12개월 급여" :has-error="errors.TWEL_MON_PAY != ''" :required="basicData.TWEL_MON_PAY.isRequired"/>
            <table-form-item :error-msg="errors.TWEL_MON_PAY_ST">
              <div class="colwrap">
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.TWEL_MON_PAY_ST.value"
                                 @change="basicData.TWEL_MON_PAY_ST.value=$event;"
                                 :options="{readonly: basicData.TWEL_MON_PAY_ST.isReadOnly}"
                  />
                </div>
                <div class="colwrap-item">

                  <span>~</span>
                </div>
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.TWEL_MON_PAY_TO.value"
                                 @change="basicData.TWEL_MON_PAY_TO.value=$event;"
                                 :options="{readonly: basicData.TWEL_MON_PAY_TO.isReadOnly}"
                  />
                </div>
              </div>
            </table-form-item>
          </tr>
          <tr v-if="false">
            <table-form-label label="최종 3년 급여" :has-error="errors.TWEL_MON_PAY != ''" :required="basicData.THRE_YEAR_PAY.isRequired"/>
            <table-form-item :error-msg="errors.THRE_YEAR_PAY_ST">
              <div class="colwrap">
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.THRE_YEAR_PAY_ST.value"
                                 @change="basicData.THRE_YEAR_PAY_ST.value=$event;"
                                 :options="{readonly: basicData.THRE_YEAR_PAY_ST.isReadOnly}"
                  />
                </div>
                <div class="colwrap-item">

                  <span>~</span>
                </div>
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.THRE_YEAR_PAY_TO.value"
                                 @change="basicData.THRE_YEAR_PAY_TO.value=$event;"
                                 :options="{readonly: basicData.THRE_YEAR_PAY_TO.isReadOnly}"
                  />
                </div>
              </div>
            </table-form-item>
          </tr>

          <tr v-if="false">
            <table-form-label label="최종 1개월 급여" :has-error="errors.ONE_MON_PAY != ''" :required="basicData.ONE_MON_PAY.isRequired"/>
            <table-form-item :error-msg="errors.ONE_MON_PAY_ST">
              <div class="colwrap">
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.ONE_MON_PAY_ST.value"
                                 @change="basicData.ONE_MON_PAY_ST.value=$event;"
                                 :options="{readonly: basicData.ONE_MON_PAY_ST.isReadOnly}"
                  />
                </div>
                <div class="colwrap-item">

                  <span>~</span>
                </div>
                <div class="colwrap-item bradius-all">
                  <ui-input-date :date="basicData.ONE_MON_PAY_TO.value"
                                 @change="basicData.ONE_MON_PAY_TO.value=$event;"
                                 :options="{readonly: basicData.ONE_MON_PAY_TO.isReadOnly}"
                  />
                </div>
              </div>
            </table-form-item>
          </tr>

          <tr>
            <table-form-label label="퇴직금 지급일" :has-error="errors.RETIRE_PAY_DATE != ''"/>
            <table-form-item :error-msg="errors.RETIRE_PAY_DATE">
              <ui-input-date :date="basicData.RETIRE_PAY_DATE.value"
                             @change="basicData.RETIRE_PAY_DATE.value=$event;"
                             :options="{readonly: basicData.RETIRE_PAY_DATE.isReadOnly}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="소수점이하" :has-error="errors.ROUND_DIGIT != ''" :required="basicData.ROUND_DIGIT.isRequired"/>
            <table-form-item :error-msg="errors.ROUND_DIGIT">
              <ui-dropdown :items="basicData.ROUND_DIGIT.items"
                           :value="basicData.ROUND_DIGIT.value"
                           @change="basicData.ROUND_DIGIT.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </table-form-item>
          </tr>
        </template>
      </table-form>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close" >
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
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modalShow: false,
      errors: {},
      EMP_LIST: [],
      basicData: {
        // SEV_CONTROL_NO: {
        //   isRequired: true,
        //   validMsg: '종류를 선택해주세요.',
        //   value: '',
        //   return: null,
        //   items: [
        //   ]
        // },
        THRE_MON_PAY: {
          isRequired: true
        },
        THRE_MON_PAY_ST: {
          value: '',
          return: null
        },
        THRE_MON_PAY_TO: {
          value: '',
          return: null
        },
        TWEL_MON_PAY: {
          isRequired: true
        },
        TWEL_MON_PAY_ST: {
          value: '',
          return: null
        },
        TWEL_MON_PAY_TO: {
          value: '',
          return: null
        },
        THRE_YEAR_PAY: {
          isRequired: true
        },
        THRE_YEAR_PAY_ST: {
          value: '',
          return: null
        },
        THRE_YEAR_PAY_TO: {
          value: '',
          return: null
        },
        ONE_MON_PAY_ST: {
          value: '',
          return: null
        },
        ONE_MON_PAY_TO: {
          value: '',
          return: null
        },
        RETIRE_PAY_DATE: {
          value: '',
          return: null
        },
        ROUND_DIGIT: {
          value: 'UP',
          return: null,
          isRequired: true,
          validMsg: '종류를 선택해주세요.',
          items: [
            { 'message': '절사', 'code': 'DOWN'},
            { 'message': '반올림', 'code': 'OFF'},
            { 'message': '올림', 'code': 'UP'}
          ]
        }
        // url: {
        //   value: ''
        // },
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
      let _eidList = [];
      for(let i = 0; i < me.EMP_LIST["checkedMembers"].length; i ++)
        _eidList.push({"EID": me.EMP_LIST["checkedMembers"][i]['EID']});
      // if( ! me.isValiStaticRequiredData(formData)) {
      //   return;
      // }
      let retireType = me.EMP_LIST["checkedData"].RETIRE_TYPE;
      let sevControlNo = me.EMP_LIST["checkedData"].SEV_CONTROL_NO;
      let {data} = await this.$httpPost({
        url: '/payroll/multiretirement/multi-retire/list',
        param: {
          'formData': JSON.stringify({
            "RETIRE_TYPE": retireType,
            "SEV_CONTROL_NO": String( sevControlNo),
            "THRE_MON_PAY_ST": me.basicData.THRE_MON_PAY_ST.value,
            "THRE_MON_PAY_TO": me.basicData.THRE_MON_PAY_TO.value,
            "TWEL_MON_PAY_ST": me.basicData.TWEL_MON_PAY_ST.value,
            "TWEL_MON_PAY_TO": me.basicData.TWEL_MON_PAY_TO.value,
            "THRE_YEAR_PAY_ST": me.basicData.THRE_YEAR_PAY_ST.value,
            "THRE_YEAR_PAY_TO": me.basicData.THRE_MON_PAY_TO.value,
            "RETIRE_PAY_DATE": me.basicData.RETIRE_PAY_DATE.value,
            "RETIRE_ORG_DATE": me.EMP_LIST["checkedMembers"][0]['RETIRE_DATE'],
            "ONE_MON_PAY_ST": me.basicData.ONE_MON_PAY_ST.value,
            "ONE_MON_PAY_TO": me.basicData.ONE_MON_PAY_TO.value,
            "ROUND_DIGIT": me.basicData.ROUND_DIGIT.value
          }),
          'eidList': JSON.stringify(_eidList)
        }
      });



      me.onCancel();
      me.callgrid( data[0]);
    },

    callgrid( params){
      this.$parent.showSearchData( params);
      // this.$parent.loadGridData();
    },

    resetFormData: function() {
      Object.assign(this.basicData, this.$options.data().basicData);
    },

    setBasicData: function() {
      const me = this;
      let retireDate = me.EMP_LIST["checkedMembers"][0]['RETIRE_DATE'];
      let defaultDate = new Date( parseInt( retireDate.substr( 0,4)) , parseInt(retireDate.substr(4, 2))-1, parseInt( retireDate.substr( 6,2))+1);
      let oneMonthStDate = new Date( defaultDate.setMonth( defaultDate.getMonth() -1));
      me.basicData.ONE_MON_PAY_ST.value = me.changeDate( oneMonthStDate);
      let  threeMonthStDate = new Date( defaultDate.setMonth( defaultDate.getMonth() -2));
      me.basicData.THRE_MON_PAY_ST.value = me.changeDate( threeMonthStDate);
      let twelMonPayStDate =  new Date( defaultDate.setMonth( defaultDate.getMonth() - 9));
      me.basicData.TWEL_MON_PAY_ST.value = me.changeDate( twelMonPayStDate);
      let threYearPayStDate = new Date( defaultDate.setFullYear( defaultDate.getFullYear() -2));
      me.basicData.THRE_YEAR_PAY_ST.value = me.changeDate( threYearPayStDate);

      me.basicData.THRE_MON_PAY_TO.value = retireDate;
      me.basicData.TWEL_MON_PAY_TO.value = retireDate;
      me.basicData.THRE_YEAR_PAY_TO.value = retireDate;
      me.basicData.ONE_MON_PAY_TO.value = retireDate;
    },

    changeDate( date) {
      let tYear = date.getFullYear();
      let tMonth = date.getMonth()+1;
      let tDate = date.getDate();
      return tYear+ (tMonth > 10 ? tMonth : "0"+tMonth) + (tDate > 10 ? tDate : "0"+tDate);
    },

    setReadOnly: function (param) {
      if(param.EMP_NAM!=null){
        this.basicData.EMP_NAM.isReadOnly = true;
      }
    },

    asyncDynamicComponentData(_param) {
      this.resetFormData()
      this.EMP_LIST = _param;
      this.setBasicData();
      // this.setReadOnly(_param);
    }
  },
  mounted() {}
}
</script>
