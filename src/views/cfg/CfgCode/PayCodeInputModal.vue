<template>
<base-modal title="급여코드 추가" id="pay-code-input-modal" :scroll="false" size="large" width="1000">
  <template v-slot:body>
    <table-form :colgroup="['15%', 'auto', '10%', 'auto', '10%', 'auto']">
      <template v-slot:body>
        <tr>
          <table-form-label label="급여코드" :has-error="errors.PAY_CODE != ''" :required="basicData.PAY_CODE.isRequired"/>
          <table-form-item :error-msg="errors.PAY_CODE">
            <ui-input :value="basicData.PAY_CODE.value"
                      @change="basicData.PAY_CODE.value=$event;"
                      :options="{readonly: basicData.PAY_CODE.isReadOnly}"/>
          </table-form-item>
          <table-form-label label="구분" :has-error="errors.PAYTAX_FLAG != ''" :required="basicData.PAYTAX_FLAG.isRequired"/>
          <table-form-item :error-msg="errors.PAYTAX_FLAG">
            <ui-dropdown :items="basicData.PAYTAX_FLAG.items"
                         :value="basicData.PAYTAX_FLAG.value"
                         @change="basicData.PAYTAX_FLAG.value=$event.value;basicData.PAYTAX_FLAG.return=$event;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                  disabled: basicData.PAYTAX_FLAG.isReadOnly
                                }"
            />
          </table-form-item>
          <table-form-label label="계산방법" :has-error="errors.AUTO_CALC != ''" :required="basicData.AUTO_CALC.isRequired"/>
          <table-form-item :error-msg="errors.AUTO_CALC">
            <ui-dropdown :items="basicData.AUTO_CALC.items"
                         :value="basicData.AUTO_CALC.value"
                         @change="basicData.AUTO_CALC.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
          </table-form-item>
        </tr>
    </template>
    </table-form>
    <table-form :colgroup="['15%', 'auto', '15%', 'auto']">
      <template v-slot:body>
        <tr>
          <table-form-label label="코드명-국어" :has-error="errors.PAY_NAME != ''" :required="basicData.PAY_NAME.isRequired"/>
          <table-form-item :error-msg="errors.PAY_NAME">
            <ui-input :value="basicData.PAY_NAME.value"
                      @change="basicData.PAY_NAME.value=$event;"/>
          </table-form-item>
        </tr>
        <tr v-if="isStatusOnPay">
          <table-form-label label="과세/비과세" :has-error="errors.TAX_FLAG != ''" :required="basicData.TAX_FLAG.isRequired"/>
          <table-form-item :error-msg="errors.TAX_FLAG">
            <ui-dropdown :items="taxItems"
                         :value="basicData.TAX_FLAG.value"
                         @change="basicData.TAX_FLAG.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
          </table-form-item>
          <table-form-label label="퇴직금 표지" :has-error="errors.SEVP_FLAG != ''" :required="basicData.SEVP_FLAG.isRequired"/>
          <table-form-item :error-msg="errors.SEVP_FLAG">
            <ui-dropdown :items="basicData.SEVP_FLAG.items"
                         :value="basicData.SEVP_FLAG.value"
                         @change="basicData.SEVP_FLAG.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
          </table-form-item>
        </tr>
        <tr v-if="isStatusOnTax">
          <table-form-label label="공제표식" :has-error="errors.PAY_FLAG != ''" :required="basicData.PAY_FLAG.isRequired"/>
          <table-form-item :error-msg="errors.PAY_FLAG">
            <ui-dropdown :items="payItems"
                         :value="basicData.PAY_FLAG.value"
                         @change="basicData.PAY_FLAG.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
          </table-form-item>
        </tr>
        <tr>
          <table-form-label label="끝전처리" :has-error="errors.ROUND_TYPE != ''" :required="basicData.ROUND_TYPE.isRequired"/>
          <table-form-item :error-msg="errors.ROUND_TYPE">
            <ui-dropdown :items="basicData.ROUND_TYPE.items"
                         :value="basicData.ROUND_TYPE.value"
                         @change="basicData.ROUND_TYPE.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
          </table-form-item>
          <table-form-label label="끝전처리 자리수" :has-error="errors.ROUND_DIGIT != ''" :required="basicData.ROUND_DIGIT.isRequired"/>
          <table-form-item :error-msg="errors.ROUND_DIGIT">
            <ui-input :value="basicData.ROUND_DIGIT.value"
                      @change="basicData.ROUND_DIGIT.value=$event;"/>
          </table-form-item>
        </tr>
        <tr>
          <table-form-label label="사용중지" :has-error="errors.INACTIVE != ''" :required="basicData.INACTIVE.isRequired"/>
          <table-form-item :error-msg="errors.INACTIVE">
            <label class="md-check">
              <input type="radio" id="radioLnkPsbYn_Y" v-model="basicData.INACTIVE.value" name="basicData.INACTIVE" value="Y" >
              <i class="black"></i>Y
            </label>
            <label class="md-check">
              <input type="radio" id="radioLnkPsbYn_N" v-model="basicData.INACTIVE.value" name="basicData.INACTIVE" value="N" >
              <i class="black"></i>N
            </label>
          </table-form-item>
        </tr>

      </template>
    </table-form>


    <table-form :colgroup="['15%', 'auto', '15%', 'auto']">
      <template v-slot:body>
        <tr>
          <table-form-label label="급여대장용 묶음코드" :has-error="errors.PAYRPT_CODE != ''" :required="basicData.PAYRPT_CODE.isRequired"/>
          <table-form-item :error-msg="errors.PAYRPT_CODE">
            <ui-input :value="basicData.PAYRPT_CODE.value"
                      @change="basicData.PAYRPT_CODE.value=$event;"/>
          </table-form-item>
        </tr>
        <tr>
          <table-form-label label="급여 명세서용 묶음코드" :has-error="errors.SLIP_CODE != ''" :required="basicData.SLIP_CODE.isRequired"/>
          <table-form-item :error-msg="errors.SLIP_CODE">
            <ui-input :value="basicData.SLIP_CODE.value"
                      @change="basicData.SLIP_CODE.value=$event;"/>
          </table-form-item>
        </tr>
        <tr>
          <table-form-label label="비과세 소급" :has-error="errors.RETRO_FLAG != ''" :required="basicData.RETRO_FLAG.isRequired"/>
          <table-form-item :error-msg="errors.RETRO_FLAG">
            <label class="md-check">
              <input type="radio" id="radioCardLnkPsbYn_Y" v-model="basicData.RETRO_FLAG.value" value="Y" name="basicData.RETRO_FLAG" checked="">
              <i class="black"></i>Y
            </label>
            <label class="md-check">
              <input type="radio" id="radioCardLnkPsbYn_N" v-model="basicData.RETRO_FLAG.value" value="N" name="basicData.RETRO_FLAG">
              <i class="black"></i>N
            </label>
          </table-form-item>
        </tr>
        <tr v-if="isStatusOnPay">
          <table-form-label label="전표 회계 코드" :has-error="errors.PROXY_CODE != ''" :required="basicData.PROXY_CODE.isRequired"/>
          <table-form-item :error-msg="errors.PROXY_CODE">
            <ui-input :value="basicData.PROXY_CODE.value"
                      @change="basicData.PROXY_CODE.value=$event;"/>
          </table-form-item>
          <table-form-label label="전표 적요" :has-error="errors.PROXY_REMARK != ''" :required="basicData.PROXY_REMARK.isRequired"/>
          <table-form-item :error-msg="errors.PROXY_REMARK">
            <ui-input :value="basicData.PROXY_REMARK.value"
                      @change="basicData.PROXY_REMARK.value=$event.value;"/>
          </table-form-item>
        </tr>
      </template>
    </table-form>
  </template>
  <template v-slot:footer>
    <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal"  @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave">
          <i class="icon-lineIcon-check mr-5" ></i>저장
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
    data: function (){
      return {
        isStatusOnPay:true,
        isStatusOnTax:true,
        errors: {},
        basicData: {
          PAY_CODE: {
            value: '',
            isRequired: true,
            isReadOnly: false,
            validMsg: '급여코드를 입력해주세요.',
          },
          PAYTAX_FLAG: {
            value: '',
            return: null,
            isReadonly: true,
            isRequired: true,
            items: [
              { message: '급여', code: 'PAY' },
              { message: '공제', code: 'TAX' }
            ]
          },
          PAY_NAME: {
            value: '',
            isRequired: true,
            validMsg: '코드명을 입력해주세요.'
          },
          AUTO_CALC: {
            value: '',
            isRequired: true,
            validMsg: '계산방법을 입력해주세요.',
            items: [
              { message: '급여마스터', code: 'A' },
              { message: '계산공식', code: 'F' },
              { message: 'OT계산', code: 'O' },
              { message: '수동작업', code: 'M' },
              { message: '해당사항 없음', code: 'N' }
            ]
          },
          TAX_FLAG: {
            value: '',
            isRequired: true,
            validMsg: '과세/비과세를 입력해주세요.'

          },
          SEVP_FLAG: {
            value: '',
            isRequired: true,
            validMsg: '퇴직금 표지를 입력해주세요.',
            items: [
              { message: '퇴직금 계산에 포함(3개월 평균)', code: 'N' },
              { message: '퇴직급 계산에 포함(12개월 평균)', code: 'Z' },
              { message: '해당없음', code: 'X' }
            ]
          },
          PAY_FLAG: {
            value: '',
            isRequired: true,
            validMsg: '공제표식을 입력해주세요.'
          },
          ROUND_TYPE: {
            value: '',
            isRequired: true,
            validMsg: '끝전처리를 입력해주세요.',
            items: [
              { message: '절사', code: 'DOWN' },
              { message: '올림', code: 'UP' },
              { message: '반올림', code: 'OFF' }
            ]
          },
          ROUND_DIGIT: {
            value: '-1',
            isRequired: true,
            validMsg: '끝전자릿수를 입력해주세요.'
          },
          INACTIVE: {
            value: 'N',
            isRequired: true,
          },

          PAYRPT_CODE: {
            value: '',
            isRequired: false
          },
          SLIP_CODE: {
            value: '',
            isRequired: false
          },
          RETRO_FLAG: {
            value: 'N',
            isRequired: false
          },
          PROXY_CODE: {
            value: '',
            isRequired: false
          },
          PROXY_REMARK: {
            value: '',
            isRequired: false
          },
          url: {
            value:'insert'
          }
        },
        payItems:[],
        taxItems: []


      }
    },
    methods: {
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
        this.payItems = [];
        this.taxItems = [];
        let code = param.PAYTAX_FLAG;
        if(code == "PAY"){
          this.taxcode();
          this.isStatusOnTax = false;
        }else{
          this.payflag();
          this.isStatusOnPay = false;
        }
      },
      setIsStatusOn: function (param) {
        this.isStatusOnPay = true;
        this.isStatusOnTax = true;
        let code = param.PAYTAX_FLAG;
        if(code == "PAY"){
          this.isStatusOnTax = false;
          this.basicData.PAY_FLAG.isRequired = false;
        }else{
          this.isStatusOnPay = false;
          this.basicData.TAX_FLAG.isRequired = false;
          this.basicData.SEVP_FLAG.isRequired = false;
        }
      },
      setReadOnly: function (param) {
        this.basicData.PAYTAX_FLAG.isReadOnly = true;
        if(param.PAY_CODE!=null){
          this.basicData.PAY_CODE.isReadOnly = true;
        }
      },

      async setData (param){
        try {
          if(param.PAY_CODE!=null){
            let { data } = await this.$httpPost({
              param: {PAY_CODE: param.PAY_CODE},
              url: '/payroll/code/pay-pay/find'
            })  || [];
            let keys = Object.keys(this.basicData);
            keys.forEach((key) => {
              this.basicData[key].value = data[key] || this.$options.data().basicData[key].value;
            });

            if(data.ROUND_DIGIT == 0){
              this.basicData.ROUND_DIGIT.value = 0;
            }

          }
        } catch (e) {
          console.error("PayCode asyncData err: ", e);
        }
      },
      async asyncDynamicComponentData(_param) {
        this.resetFormData()

        this.setBasicData(_param);

        this.setDropData(_param);

        this.setIsStatusOn(_param);

        this.setData(_param);

        this.setReadOnly(_param);

      },

      async taxcode() {
        let { data } = await this.$httpPost({
          param: {},
          url: '/payroll/code/taxcode/list'
        }) ;
        if(Array.isArray(data) && data.length > 0) {


          for(let i = 0; i < data.length; i ++) {
            this.taxItems.push({
              message: data[i]['TAXITM_CD'] + ' - ' + data[i]['ABBREV_NAME'],
              code: data[i]['TAXITM_CD']
            });
          }

        }
      },

      async payflag() {
        let { data } = await this.$httpPost({
          param: {SUPER_CODE: 'AH',INACTIVE: 'N'},
          url: '/system/setting/mastcode/list'
        }) ;
        if(Array.isArray(data) && data.length > 0) {

          for(let i = 0; i < data.length; i ++) {
            this.payItems.push({
              message: data[i]['REAL_CODE'] + ' - ' + data[i]['CODENAMK'],
              code: data[i]['REAL_CODE']
            });
          }

        }
      },

      async onCancel(){
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

        me.$httpPost({
            url: '/payroll/code/pay-pay/'+me.basicData.url,
            param: this.getSaveParams(),
            callback: function () {
              if(me.basicData.url=='insert'){
                me.toastSuccessInsert();
              }else{
                me.toastSuccessUpdate();
              }
            }
        });


      }
    },
    mounted() {
    }
}
</script>

