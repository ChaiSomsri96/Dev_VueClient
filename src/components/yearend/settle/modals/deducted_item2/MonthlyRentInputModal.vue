<template>
  <base-modal title="월세액입력" id="monthly-rent-input-modal" :scroll="false" width="900">
    <template v-slot:body>
      <comment-box class="mb-10"
                   :list="[
                    {'text': '* 설문지의 내용을 수정할 경우 신청버튼을 클릭하여 설문지를 다시 작성하여야 합니다.', 'color': 'red'},
                    {'text': '* 전년도 자료 비교를 위해 필수값이 아니더라도 가능한 한 모든 값을 입력해 주세요.', 'color': 'red'}
                ]"
      />
      <table-form :colgroup="['25%', 'auto', '25%', 'auto']" :footerHide="true">
        <template v-slot:body>
          <tr>
            <table-form-label label="자료분류"/>
            <table-form-item>
              <ui-dropdown
                  :items="itemList.dataSource"
                  :value="monthlyRent.DATA_SOURCE"
                  @change="monthlyRent.DATA_SOURCE=$event.value;"
                  :options="{
                    valueField: 'code',
                    labelField: 'message',
                    tooltipField: 'message',
                    disabled: true
                  }"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="임대인성명(상호)"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="monthlyRent.RENTER_NAME">
            </table-form-item>
            <table-form-label label="임대인 사업자(주민등록)번호"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="monthlyRent.RENTER_NUMBER">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="임대차계약기간 시작일"/>
            <table-form-item>
              <ui-input-date
                  :date="monthlyRent.RENT_START"
                  @change="monthlyRent.RENT_START=$event;"
              />
            </table-form-item>
            <table-form-label label="임대차계약기간 종료일"/>
            <table-form-item>
              <ui-input-date
                  :date="monthlyRent.RENT_END"
                  @change="monthlyRent.RENT_END=$event;"
              />
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="당년도 공제대상월세액"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="monthlyRent.ANNUAL_RENT">
            </table-form-item>
            <table-form-label label="배제액"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="monthlyRent.ANNUAL_RENT_ADJ">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="주택유형"/>
            <table-form-item>
              <ui-dropdown
                  :items="itemList.houseType"
                  :value="monthlyRent.HOUSE_TYPE"
                  @change="monthlyRent.HOUSE_TYPE=$event.value;"
                  :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
              />
            </table-form-item>
            <table-form-label label="계약면적"/>
            <table-form-item>
              <input type="text" class="form-control" v-model="monthlyRent.SPACE_SIZE">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="임대차계약서상 주소지"/>
            <table-form-item :colspan="'3'">
              <input type="text" class="form-control" v-model="monthlyRent.HOUSE_ADDR">
            </table-form-item>
          </tr>
          <tr>
            <table-form-label label="비고/메모"/>
            <table-form-item :colspan="'3'">
              <input type="text" class="form-control" v-model="monthlyRent.EMPLOYEE_COMMENT">
            </table-form-item>
          </tr>
        </template>
      </table-form>
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
import {mapGetters} from "vuex";
import {getYearendCodeList} from "../../../../../utils/yearendCodes";

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
      monthlyRent: {}
    }
  },
  methods: {
    asyncDynamicComponentData(param) {
      this.errors = {};
      this.monthlyRent = param;
    },
    getParameter() {
      let params = {
        'ATT_YEAR': this.attYear,
        'PAYDAY': this.payday,
        'EID': this.eid,
      };
      let _params = this.$mergeProp(params, this.monthlyRent);
      return _params;
    },
    onApply() {
      this.close(this.getParameter());
    },
    onReset() {
    },
    onDelete() {
    }
  },
  async mounted() {
    const me = this;
    const codes = getYearendCodeList();
    me.itemList.dataSource = codes.dataSource.items;
    me.itemList.houseType = codes.houseType.items;
  }
}
</script>