<template>
  <base-modal title="부녀자/한부모 공제신청" id="deduction-application-modal" :scroll="false" width="1200">
    <template v-slot:body>
      <comment-box
          :list="[{'text': '* 공제한도는 부녀자공제가 50만원이고 한부모공제가 100만원 입니다.'},
                {'text': '* 여성으로서 공제요건에 부합한 경우 부녀자공제와 한부모공제 중 하나만 적용받을 수 있습니다. 둘 다 가능한 경우 한부모공제를 선택하십시오.'},
                {'text': '* 1) 배우자가 있거나, 기본공제대상자인 부양가족이 있는 세대주 여성으로서, 2) 소득금액이 3천만원 이하인 경우 부녀자공제를 받을 수 있습니다.'},
                {'text': '* 근로소득금액 또는 종합소득금액이 한도를 초과하였거나, 남성인 경우 부녀자 공제를 받을 수 없습니다.'}]"
      />
      <div class="row mt-20">
        <div class="col-12">
          <div class="form-wrap">
            <div class="form-group row">
              <label class="form-label type2 col-2">공제 선택</label>
              <div class="row col-8">
                <ui-radio-button-inline
                    :margin="90"
                    :options="selectDeduction"
                    @change="selectDeduction.value=$event.value;onChangeDedType()"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <table-form title="부녀자공제" :colgroup="['50%', 'auto']" :footerHide="true" :disabled="wdDisable">
            <template v-slot:body>
              <tr>
                <table-form-label label="배우자 있음"/>
                <table-form-item>
                  <ui-dropdown
                      :items="itemsYesNo"
                      :value="womanDeduction.SPOUSE.value"
                      @change="womanDeduction.SPOUSE.value=$event.value;onChangeFemaleDedSpecial('SPOUSE',$event.value);"
                      :options="{
                        valueField: 'code',
                        labelField: 'message',
                        tooltipField: 'message',
                        disabled: womanDeduction.SPOUSE.disabled || wdDisable
                      }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="기본공제대상인 부양가족 있음"/>
                <table-form-item>
                  <ui-dropdown
                      :items="itemsYesNo"
                      :value="womanDeduction.DEPENDENTS.value"
                      @change="womanDeduction.DEPENDENTS.value=$event.value;onChangeFemaleDed('DEPENDENTS',$event.value);"
                      :options="{
                            valueField: 'code',
                            labelField: 'message',
                            tooltipField: 'message',
                            disabled: womanDeduction.DEPENDENTS.disabled || wdDisable
                          }"/>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="세대주임"/>
                <table-form-item>
                  <ui-dropdown
                      :items="itemsYesNo"
                      :value="womanDeduction.HOUSEHOLDER.value"
                      @change="womanDeduction.HOUSEHOLDER.value=$event.value;onChangeFemaleDed('HOUSEHOLDER',$event.value);"
                      :options="{
                            valueField: 'code',
                            labelField: 'message',
                            tooltipField: 'message',
                            disabled: womanDeduction.HOUSEHOLDER.disabled || wdDisable
                          }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="부녀자 공제 대상"/>
                <table-form-item>
                  <ui-input :value="womanDeduction.DEDUCTION_TARGET.desc"
                            :options="{readonly:true}"
                  />
                </table-form-item>
              </tr>
            </template>
          </table-form>
        </div>
        <div class="col-6">
          <table-form title="한부모공제" :colgroup="['50%', 'auto']" :footerHide="true" :disabled="spdDisble">
            <template v-slot:body>
              <tr>
                <table-form-label label="배우자 있음"/>
                <table-form-item>
                  <ui-dropdown
                      :items="itemsYesNo"
                      :value="singleParentDeduction.SPOUSE.value"
                      @change="singleParentDeduction.SPOUSE.value=$event.value;onChangeSingle('SPOUSE',$event.value);"
                      :options="{
                                      valueField: 'code',
                                      labelField: 'message',
                                      tooltipField: 'message',
                                      disabled: singleParentDeduction.SPOUSE.disabled || spdDisble
                                    }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="기본공제대상인 직계비속 또는 입양자 있음"/>
                <table-form-item>
                  <ui-dropdown
                      :items="itemsYesNo"
                      :value="singleParentDeduction.ADOPTED_PERSON.value"
                      @change="singleParentDeduction.ADOPTED_PERSON.value=$event.value;onChangeSingle('ADOPTED_PERSON',$event.value);"
                      :options="{
                                      valueField: 'code',
                                      labelField: 'message',
                                      tooltipField: 'message',
                                      disabled: singleParentDeduction.SPOUSE.disabled || spdDisble
                                    }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="한부모 공제 대상"/>
                <table-form-item>
                  <ui-input :value="singleParentDeduction.DEDUCTION_TARGET.desc"
                            :options="{readonly:true}"
                  />
                </table-form-item>
              </tr>
            </template>
          </table-form>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="onSave">
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import CommentBox from '@/components/common/CommentBox';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import {mapGetters} from "vuex";

export default {
  mixins: [modal],
  components: {
    BaseModal,
    CommentBox,
    TableForm,
    TableFormItem,
    TableFormLabel,
    UiRadioButtonInline
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    }),
    //부녀자 공제 disable 여부
    wdDisable() {
      return this.selectDeduction.value == 'Z' || this.selectDeduction.value == 'S';
    },
    //한부모 공제 disable 여부
    spdDisble() {
      return this.selectDeduction.value == 'Z' || this.selectDeduction.value == 'F';
    }
  },
  data() {
    return {
      URL_QRY: '/year-end/employee/emp-spc-ded/select',
      URL_SAVE: '/year-end/employee/emp-spc-ded/save',
      itemsYesNo: [
        {message: '예', code: '1'},
        {message: '아니오', code: '2'},
      ],
      dedMsg: {
        '1': '공제대상입니다.',
        '2': '공제대상이 아닙니다.'
      },
      /*
      * 부녀자 공제
      */
      womanDeduction: {
        SPOUSE: {                   //배우자있음
          value: '',
          code: 'A120',
          return: null,
          disabled: false,
          dedPass: function () {
            return this.value === '1';
          }
        },
        DEPENDENTS: {             //부양가족 있음
          value: '',
          code: 'A130',
          return: null,
          disabled: false,
          dedPass: function () {
            return this.value === '1';
          }
        },
        HOUSEHOLDER: {            //세대주임
          value: '',
          code: 'A140',
          return: null,
          disabled: false,
          dedPass: function (val) {
            return this.value === '1';
          }
        },
        DEDUCTION_TARGET: {        //공제대상
          value: '',
          desc: '',
          code: 'FEMALE_DED',
          return: null
        },
      },
      /*
      * 한부모 공제
      */
      singleParentDeduction: {
        SPOUSE: {                   //배우자있음
          value: '',
          code: 'B120',
          return: null,
          disabled: false,
          dedPass: function (val) {
            return this.value === '2';
          }
        },
        ADOPTED_PERSON: {
          value: '',         //기본공제대상인 직계비속 또는 입양자 있음
          code: 'B130',
          disabled: false,
          dedPass: function (val) {
            return this.value === '1';
          }
        },
        DEDUCTION_TARGET: {        //공제대상
          value: '',
          code: 'SINGLE_PARENT'
        }
      },
      /*
      * 공제 선택
      */
      selectDeduction: {
        name: 'select-deduction',
        value: 'none',
        code: 'EMPDD',
        domOptList: [
          {value:'Z', label: '해당사항 없음 / 공제안함'},
          {value:'F', label: '부녀자 공제'},
          {value:'S', label: '한부모 공제'}
        ]
      }
    }
  },
  methods: {
    appendCodeValue: function(obj,param){
      let tmp = null;
      if(obj.code && obj.code == 'EMPDD'){
        param[obj.code] = obj.value;
        return;
      }
      for( let p in obj){
        tmp = obj[p];
        param[tmp.code] = tmp.value;
      }
    },
    onSave: function( flag){
      let me = this;
      let param = {
        ATT_YEAR: me.attYear,
        EID: me.eid,
        PAYDAY: me.payday,
        CURRENT_STEP: me.step,
      };

      me.appendCodeValue(me.womanDeduction,param);
      me.appendCodeValue(me.singleParentDeduction,param);
      me.appendCodeValue(me.selectDeduction,param);

      me.$httpPost({
        url: me.URL_SAVE,
        param: param
      });
    },

    onChangeFemaleDedSpecial: function (code, val) {
      let me = this;
      const absoluteYes = (val == '1');
      me.womanDeduction.DEDUCTION_TARGET.value = absoluteYes ? '1' : '';
      me.womanDeduction.DEDUCTION_TARGET.desc = absoluteYes ? me.dedMsg['1'] : '';
      me.womanDeduction.DEPENDENTS.disabled = absoluteYes;
      me.womanDeduction.HOUSEHOLDER.disabled = absoluteYes;
    },

    onChangeFemaleDed: function (code, val) {
      let me = this;
      let ded = '2';
      if (me.womanDeduction[code].dedPass()) {
        ded = me.womanDed();
      }
      me.womanDeduction.DEDUCTION_TARGET.value = ded;
      me.womanDeduction.DEDUCTION_TARGET.desc = me.dedMsg[ded];
    },

    womanDed() {
      let me = this;
      if (me.womanDeduction.SPOUSE.value == '1') {
        return '1';
      }
      if (me.womanDeduction.SPOUSE.dedPass() &&
          me.womanDeduction.DEPENDENTS.dedPass() &&
          me.womanDeduction.HOUSEHOLDER.dedPass()) {
        return '1';
      }
      return '2';
    },

    singleDed() {
      let me = this;
      if (me.singleParentDeduction.SPOUSE.dedPass() &&
          me.singleParentDeduction.ADOPTED_PERSON.dedPass()) {
        return '1';
      }
      return '2';
    },

    onChangeSingle: function (code, val) {
      let me = this;
      let ded = '2';
      if (me.singleParentDeduction[code].dedPass()) {
        ded = me.singleDed();
      }
      me.singleParentDeduction.DEDUCTION_TARGET.value = ded;
      me.singleParentDeduction.DEDUCTION_TARGET.desc = me.dedMsg[ded];
    },

    onChangeDedType: function () {
      let me = this;
      let wDed = '';
      let sDed = '';
      switch (this.selectDeduction.value) {
        case 'Z':
          wDed = '2';
          sDed = '2';
          break;

        case 'F':
          wDed = '';
          sDed = '2';
          break;

        case 'S':
          wDed = '2';
          sDed = '';
          break;
      }
      me.womanDeduction.DEDUCTION_TARGET.value = wDed;
      me.womanDeduction.DEDUCTION_TARGET.desc = me.dedMsg[wDed];
      me.singleParentDeduction.DEDUCTION_TARGET.value = sDed;
      me.singleParentDeduction.DEDUCTION_TARGET.desc = me.dedMsg[sDed];
    }
  }
}
</script>