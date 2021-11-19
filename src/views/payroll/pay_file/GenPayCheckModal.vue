<template>
  <base-modal title="급여전표" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>관리 번호</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="basicData.JL_RULE_NO.items"
                           :value="basicData.JL_RULE_NO.value"
                           @change="basicData.JL_RULE_NO.value=$event.value;"
                           :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>전표일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :value="basicData.JL_DATE.value"
                        @change="basicData.JL_DATE.value=$event;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>적요 앞 첨자 문구</span>
            </label>
            <div class="row col-7">
              <ui-input :value="basicData.REMARK_PREFIX.value"
                        @change="basicData.REMARK_PREFIX.value=$event;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>적요 뒤 첨자 문구</span>
            </label>
            <div class="row col-7">
              <ui-input :value="basicData.REMARK_SUFFIX.value"
                        @change="basicData.REMARK_SUFFIX.value=$event;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>고정문자열1</span>
            </label>
            <div class="row col-7">
              <ui-input :value="basicData.FIXED_STR1_FOR_FLEX.value"
                        @change="basicData.FIXED_STR1_FOR_FLEX.value=$event;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>고정문자열2</span>
            </label>
            <div class="row col-7">
              <ui-input :value="basicData.FIXED_STR2_FOR_FLEX.value"
                        @change="basicData.FIXED_STR2_FOR_FLEX.value=$event;"/>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black"  @click="onSelect" >
          <i class="icon-lineIcon-check mr-5" ></i>조회
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
export default {
  mixins: [modal],
  components: {
    BaseModal,
    UiRadioButtonInline
  },
  data() {
    return {
      paymonthseq:[],
      basicData: {
        JL_RULE_NO: {
          value: '',
          items:[]
        },
        JL_DATE: {
          value: ''
        },
        REMARK_PREFIX: {
          value: ''
        },
        REMARK_SUFFIX: {
          value: ''
        },
        FIXED_STR1_FOR_FLEX: {
          value: ''
        },
        FIXED_STR2_FOR_FLEX: {
          value: ''
        }
      },
    }
  },
  methods: {

    async asyncDynamicComponentData(_param) {
      this.paymonthseq = _param.paymonthseqList;
      try {
        this.setDropData();
      }catch(e) {
        console.error( e);
      }
    },
    setDropData: function () {
      this.setPaycode();
    },

    async setPaycode(){
      try {
        let { data } = await this.$httpPostBody({
          url:'/payroll/salary-extraqry/jlentry-rule/header-select',
          param:{
            'INACTIVE': 'N'
          }});
        //let { data } = await this.$httpGet('/acct/payjlcfg/jlentry-rule/header-select',{'INACTIVE': 'N'});
        if(Array.isArray(data) && data.length > 0) {
          for(let i = 0; i < data.length; i ++)
            this.basicData.JL_RULE_NO.items.push({
              message: data[i]['PAY_NAM'],
              code: data[i]['PAY_CODE']
            });
        }
      } catch(e) {
        console.error("GenPayCheck err: ", e);
      }

    },

    onSelect() {
      this.close({formData: {
          JL_RULE_NO: this.basicData.JL_RULE_NO.value,
          JL_DATE: this.basicData.JL_DATE.value,
          REMARK_PREFIX: this.basicData.REMARK_PREFIX.value,
          REMARK_SUFFIX: this.basicData.REMARK_SUFFIX.value,
          FIXED_STR1_FOR_FLEX: this.basicData.FIXED_STR1_FOR_FLEX.value,
          FIXED_STR2_FOR_FLEX: this.basicData.FIXED_STR2_FOR_FLEX.value,
        }, paymonthseqList: this.paymonthseq});
    },
    async loadEarnerRegTypeItems() {

    },
    async onCancel(){

    },
  }
}
</script>
