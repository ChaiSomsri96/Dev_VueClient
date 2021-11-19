<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'일정관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <ye-date-tab></ye-date-tab>

      <div class="form-wrap">
        <labeled-input input-label="재직자 연말정산 년도" class="row" labelClass="col-2" inputClass="col-2">
          <ui-input-year :value="settleYear.INCUM_YEAR"
                         @change="settleYear.INCUM_YEAR=$event; settleYear.return=$event;"
          />
        </labeled-input>
        <labeled-input input-label="퇴사자 연말정산 년도" class="row" labelClass="col-2" inputClass="col-2">
          <ui-input-year :value="settleYear.TERMI_YEAR"
                         @change="settleYear.TERMI_YEAR=$event; settleYear.return=$event;"/>
        </labeled-input>
        <labeled-input input-label="근로소득원천징수 의무자" class="row" labelClass="col-2" inputClass="col-6">
          <ui-radio-button-inline :options="withholdingAgent" @change="settleYear.WITHHOLDING_AGENT=$event.value"/>
        </labeled-input>

        <h3 class="title-wrap">
          <span>임직원 소득공제신고서에서 국세청외 증빙자료에 대해 체크할 사항</span>
        </h3>
        <div class="col-6">
        <div class="form-group row col-6" v-for="(item, index) in checkItems" :key="index" >
          <label class="md-check">
            <input type="checkbox"
                   @change="changeCheckboxValue($event,item.code)"
                   :value="settleYear[item.code]"
                   :checked="settleYear[item.code]=='Y'"
                   :name="item.code">
            <i class="black"></i>
            {{item.name}}
          </label>
        </div>
        </div>
        <div class="col-12">
        <button-panel btnType="bottom">
          <template v-slot:start>
            <button type="button"
                    class="btn btn-md black"
                    v-on:click="saveYearendDate">
              <i class="icon-lineIcon-check mr-5"></i><span v-text="message.save[locale]">저장</span>
            </button>
          </template>
        </button-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YeDateTab from './YeDateTab';
import ButtonPanel from "@/components/common/ButtonPanel";
import LabeledInput from "../../../components/common/LabeledInput";
import UiInputYear from "../../../components/common/UiInputYear";
import UiRadioButtonInline from "../../../components/common/UiRadioButtonInline";

export default {
  components: {UiRadioButtonInline, UiInputYear, LabeledInput, YeDateTab, ButtonPanel},

  data: function () {
    return {
      locale: 'ko_KR',
      settleYear: {
        "ENTITY_CODE": null,
        "INCUM_YEAR": null,
        "TERMI_YEAR": null,
        "BIZINC_YEAR": null,
        "WITHHOLDING_AGENT": '1',
        "CRT_EVID_DONA": null,
        "CRT_EVID_SAVINGS": null,
        "CRT_EVID_HOUSE": null,
        "CRT_EVID_MEDI": null,
        "CRT_EVID_INS": null,
        "CRT_EVID_OTHER": null,
        "CRT_EVID_FAMILY": null,
        "CRT_EVID_EDU": null,
        "CRT_EVID_INCOME": null,
        "CRT_EVID_FORTAX": null,
        "CRT_EVID_CARD": null
      },
      checkItems: [
        { name: '소득(전직장 원천징수영수증 포함)', code: 'CRT_EVID_INCOME'},
        { name: '부양가족', code: 'CRT_EVID_FAMILY'},
        { name: '보험료', code: 'CRT_EVID_INS'},
        { name: '의료비', code: 'CRT_EVID_MEDI'},
        { name: '교육비', code: 'CRT_EVID_EDU'},
        { name: '신용카드', code: 'CRT_EVID_CARD'},
        { name: '기부금', code: 'CRT_EVID_DONA'},
        { name: '연금저축', code: 'CRT_EVID_SAVINGS'},
        { name: '주택자금', code: 'CRT_EVID_HOUSE'},
        { name: '기타(소상공인공제, 투자조합출자 등)', code: 'CRT_EVID_OTHER'},
        { name: '외납세액', code: 'CRT_EVID_FORTAX'}
      ],
      withholdingAgent: { //집계기준
        name: 'WITHHOLDING_AGENT',
        value: '1',
        domOptList: [
          {value: '1', label: '회사명', id: 'WITHHOLDING_AGENT-1'},
          {value: '2', label: '사업장명', id: 'WITHHOLDING_AGENT-2'}
        ]
      },
      message: {
        save: {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'}
      }
    }
  },
  methods: {
    getTaxTitle: function () {
      return this.$httpGet('/system/setting/taxflag/list');
    },
    showUpdateYearendDatePopup: function () {
      let me = this;
      let data = me.dataProvider.getJsonRows(0, -1);
      for (let i = 0; i < data.length; i++) {
        if (data[i].ENTITY_CODE && data[i].ENTITY_CODE !== 'SYSTEM') {
          me.settleYear = data[i];
          break;
        }
      }
      this.$refs.yeDatePopup.show();
    },
    saveYearendDate: function () {
      let me = this;
      me.$httpPost({
        url: '/year-end/setting/client-settle-year/update',
        param: me.settleYear,
        callback: function () {
          me.toastSuccessInsert();
        }
      })
    },
    changeCheckboxValue: function($event,code) {
      let me = this;
      // uncheck 시 value 를 N 으로 세팅한다.
      if($event.target.checked) {
        me.settleYear[code] = 'Y';
      }else {
        me.settleYear[code] = 'N';
      }
    },
    async loadFormData() {
      let me = this;
      let {data} = await me.$httpGet('/year-end/setting/client-settle-year/list');
      data.forEach(function (d) {
        if (d.ENTITY_CODE && d.ENTITY_CODE !== 'SYSTEM') {
          me.settleYear = d;
          return false;
        }
      })
    }
  },
  mounted() {
    let me = this;
    me.loadFormData();
  },
}
</script>