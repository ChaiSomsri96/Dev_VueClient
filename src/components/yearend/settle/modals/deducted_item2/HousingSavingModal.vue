<template>
  <base-modal title="주택마련저축 입력" id="housing-saving-modal" :scroll="false" width="800">
    <template v-slot:body>
      <table-form :colgroup="['25%', 'auto', '15%', 'auto']">
        <template v-slot:body>
          <tr>
            <table-form-label label="소득공제 구분"/>
            <table-form-item>
              <ui-dropdown
                  :items="itemList.houseSavingsType"
                  :value="housingSaving.SAVINGS_TYPE"
                  @change="housingSaving.SAVINGS_TYPE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
            <table-form-label label="자료분류"/>
            <table-form-item>
              <ui-dropdown
                  :items="itemList.dataSource"
                  :value="housingSaving.DATA_SOURCE"
                  @change="housingSaving.DATA_SOURCE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="금융기관"/>
            <table-form-item :colspan="'3'">
              <ui-dropdown
                  :items="itemList.bankList"
                  :value="housingSaving.INST_CODE"
                  @change="housingSaving.INST_CODE=$event.value;onChangeInstCode($event);"
                  :options="{ valueField: 'REAL_CODE', labelField: 'label', tooltipField: 'CODE_NAME'}"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="금융기관 사업자등록번호"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="housingSaving.INST_BIZID">
            </table-form-item>
            <table-form-label label="계좌번호"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="housingSaving.ACC_NO">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="가입일자"/>
            <table-form-item>
              <ui-input-date
                  :date="housingSaving.CONTRACT_DATE"
                  @change="housingSaving.CONTRACT_DATE=$event;"
              />
            </table-form-item>
            <table-form-label label="납입금액"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="housingSaving.PAID_AMOUNT">
            </table-form-item>
          </tr>
        </template>
      </table-form>
      <comment-box class="mt-10"
                   :list="[
                    {'text': '* 주택청약종합저축의 경우, 저축을 가입한 금융기관에 2월말까지 무주택 확인서를 제출해야 합니다', 'color': 'red'},
                    {'text': '* 설문지의 내용을 수정할 경우 신청버튼을 클릭하여 설문지를 다시 작성하여야 합니다.', 'color': 'red'}
                ]"
      />
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black mr-3" @click="onApply">
          <i class="icon-lineIcon-check mr-5"></i>신청
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
import CommentBox from '@/components/common/CommentBox';
import {getYearendCodeList} from "../../../../../utils/yearendCodes";
import {mapGetters} from "vuex";

export default {
  mixins: [modal],
  components: {
    BaseModal,
    TableForm,
    TableFormItem,
    TableFormLabel,
    CommentBox
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    return {
      itemList: {},
      houseAction: 'HOUSE_SAVINGS',
      step: 'HOUSE_LOAN',
      housingSaving: {}
    }
  },
  methods: {
    async asyncDynamicComponentData(param) {
      const me = this;
      me.housingSaving = param;
    },
    getParameter() {
      const me = this;
      let params = {
        ...me.housingSaving,
        'ATT_YEAR': me.attYear,
        'PAYDAY': me.payday,
        'EID': me.eid,
        'HOUSE_ACTION': me.houseAction,
        'QUESTION_INFO': {}
      };
      console.log(params);
      return params;
    },
    onApply() {
      const me = this;
      me.close( me.getParameter());
    },
    onChangeInstCode(evt){
      this.housingSaving.INST_NAME = evt.object.CODE_NAME;
    },
    async getBankList(){
      const me = this;
      const {data} = await me.$httpGet('/system/setting/mastcode/list', {
        SUPER_CODE: '22',
        INACTIVE: 'N'
      });
      if(data){
        data.forEach(function(val){
          val.label = val.REAL_CODE + '-' + val.CODE_NAME;
        })
      }
      return data;
    },
  },

  async mounted() {
    const me = this;
    const codes = getYearendCodeList();
    me.itemList.dataSource = codes.dataSource.items;
    me.itemList.houseSavingsType = codes.houseSavingsType.items;
    me.itemList.houseType = codes.houseType.items;
    me.itemList.bankList = await me.getBankList();
  }
}
</script>