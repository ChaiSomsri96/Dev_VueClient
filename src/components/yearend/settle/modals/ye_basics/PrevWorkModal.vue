<template>
  <base-modal title="전직장" id="prev-work-modal" :scroll="false" width="700">
    <template v-slot:body>
      <div class="">
        <table-form :colgroup="['17%', 'auto', '15%', 'auto']"
                    footer-hide>
          <template v-slot:body>
            <tr>
              <table-form-label label="사업자번호"
                                :has-error="errors.BUS_NUMBER && errors.BUS_NUMBER != ''"/>
              <table-form-item colspan="3"
                               :error-msg="errors.BUS_NUMBER">
                <ui-input :value="prevWorkData.busNumber" @change="prevWorkData.busNumber=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="회사명"
                                :has-error="errors.COMPANY_NAME && errors.COMPANY_NAME != ''"/>
              <table-form-item colspan="3"
                               :error-msg="errors.COMPANY_NAME">
                <ui-input :value="prevWorkData.companyName" @change="prevWorkData.companyName=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="납세조합여부"
                                :has-error="errors.TPA_JOIN && errors.TPA_JOIN != ''"/>
              <table-form-item colspan="3"
                               :error-msg="errors.TPA_JOIN">
                <ui-dropdown
                    :items="prevWorkData.tpaJoin.items"
                    :value="prevWorkData.tpaJoin.value"
                    @change="prevWorkData.tpaJoin.value=$event.value; prevWorkData.tpaJoin.return=$event;"
                    :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
                />
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="근무시작일"
                                :has-error="errors.WORK_START_DATE && errors.WORK_START_DATE != ''"/>
              <table-form-item
                  :error-msg="errors.WORK_START_DATE">
                <ui-input-date :date="prevWorkData.workStartDate"
                               @change="prevWorkData.workStartDate=$event;"/>
              </table-form-item>
              <table-form-label label="근무종료일"
                                :has-error="errors.WORK_END_DATE && errors.WORK_END_DATE != ''"/>
              <table-form-item
                  :error-msg="errors.WORK_END_DATE">
                <ui-input-date :date="prevWorkData.workEndDate"
                               @change="prevWorkData.workEndDate=$event;"/>
              </table-form-item>
            </tr>
            <tr>
              <table-form-label label="감면시작일"/>
              <table-form-item>
                <ui-input-date :date="prevWorkData.redStartDate"
                               @change="prevWorkData.redStartDate=$event;"/>
              </table-form-item>
              <table-form-label label="감면종료일"/>
              <table-form-item>
                <ui-input-date :date="prevWorkData.redEndDate"
                               @change="prevWorkData.redEndDate=$event;"/>
              </table-form-item>
            </tr>
          </template>
        </table-form>
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
import {mapGetters} from 'vuex';
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
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    return {
      errors: {
        BUS_NUMBER: '',
        COMPANY_NAME: '',
        WORK_START_DATE: '',
        WORK_END_DATE: '',
        RED_START_DATE: '',
        RED_END_DATE: ''
      },
      prevWorkData: ''
    }
  },
  methods: {
    resetData(){
      this.errors = {};
      this.prevWorkData = {
        busNumber: '',
            companyName: '',
            tpaJoin: {
          value: 'N',
          return: null,
              items: [
            {message: 'Y', code: 'Y'},
            {message: 'N', code: 'N'}
          ]
        },
        workStartDate: '',
        workEndDate: '',
        redStartDate: '',
        redEndDate: '',
        workSeqNo: ''
      }
    },
    asyncDynamicComponentData(param){
      if(param){
        this.prevWorkData={
          busNumber: param.DV_VATID,
          companyName: param.COMP_NAME,
          tpaJoin: {
            value: param.TPA_JOIN,
            return: null,
            items: [
              {message: 'Y', code: 'Y'},
              {message: 'N', code: 'N'}
            ]
          },
          workStartDate: param.ST_DATE,
          workEndDate: param.END_DATE,
          redStartDate: param.EXEMPT_START,
          redEndDate: param.EXEMPT_END,
          workSeqNo: param.WORK_SEQ_NO
        }
      }else{
        this.resetData();
      }
    },
    async onSave() {
      let hasError = false;
      let me = this;
      this.errors = {};
      if (this.payrollUtil.isEmpty(this.prevWorkData.busNumber)) {
        hasError = true;
        this.errors.BUS_NUMBER = '사업자번호를 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.prevWorkData.companyName)) {
        hasError = true;
        this.errors.COMPANY_NAME = '회사명을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.prevWorkData.workStartDate)) {
        hasError = true;
        this.errors.WORK_START_DATE = '근무시작일을 입력해 주세요.';
      }
      if (this.payrollUtil.isEmpty(this.prevWorkData.workEndDate)) {
        hasError = true;
        this.errors.WORK_END_DATE = '근무종료일을 입력해 주세요.';
      }

      if (hasError)
        return;
      try {
        await this.$httpPostBody({
          url: "/year-end/employee/deduction/request/save/work-info",
          param: {
            EID: this.eid,
            DV_VATID: this.prevWorkData.busNumber,
            COMP_NAME: this.prevWorkData.companyName,
            TPA_JOIN: this.prevWorkData.tpaJoin.value,
            COMP_NAME_E: this.prevWorkData.companyName,
            WORK_SEQ_NO: this.prevWorkData.workSeqNo,
            ST_DATE: this.prevWorkData.workStartDate,
            END_DATE: this.prevWorkData.workEndDate,
            EXEMPT_START: this.prevWorkData.redStartDate,
            EXEMPT_END: this.prevWorkData.redEndDate,
            PAYDAY: this.payday,
            ATT_YEAR: this.attYear
          },
          callback: function () {
            me.toastSuccessSave();
          }
        });
        this.close();
      } catch (e) {
        console.log("PrevWorkModal Save: ", e);
      }
    }
  },
  created() {
    this.resetData();
  },
}
</script>