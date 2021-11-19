<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'보고서 디자인'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-report-tab></cfg-report-tab>

      <div class="form-wrap">
        <labeled-input input-label="명세서 타입" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.SLIPTYPE.items"
                       :value="basicData.SLIPTYPE.value"
                       @change="basicData.SLIPTYPE.value=$event.value;"
                       :options="{ disabled: basicData.SLIPTYPE.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="회사로고 표시" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.LOGO_SHOW.items"
                       :value="basicData.LOGO_SHOW.value"
                       @change="basicData.LOGO_SHOW.value=$event.value;"
                       :options="{ disabled: basicData.LOGO_SHOW.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="은행계좌 표시" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.SHOW_BANKAC.items"
                       :value="basicData.SHOW_BANKAC.value"
                       @change="basicData.SHOW_BANKAC.value=$event.value;"
                       :options="{ disabled: basicData.SHOW_BANKAC.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="은행계좌 Masking 처리" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.MASKING_BANKAC.items"
                       :value="basicData.MASKING_BANKAC.value"
                       @change="basicData.MASKING_BANKAC.value=$event.value;"
                       :options="{ disabled: basicData.MASKING_BANKAC.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="부서명 표시" class="row" labelClass="col-2" inputClass="col-3">
          <ui-dropdown :items="basicData.SHOW_DEPT.items"
                       :value="basicData.SHOW_DEPT.value"
                       @change="basicData.SHOW_DEPT.value=$event.value;"
                       :options="{ disabled: basicData.SHOW_DEPT.isReadOnly, valueField: 'code', labelField: 'message', tooltipField: 'message'}"/>
        </labeled-input>
        <labeled-input input-label="관리자가 일괄 다운로드시 pdf 파일명" class="row" labelClass="col-2" inputClass="col-3">
          <ui-input :value="basicData.PDF_FILE_NAME.value"
                    @change="basicData.PDF_FILE_NAME.value=$event;"
                    :options="{disabled: basicData.PDF_FILE_NAME.isReadOnly}"/>
        </labeled-input>


        <div class="col-12">
          <button-panel btnType="bottom">
            <template v-slot:start>
              <button type="button"
                      class="btn btn-md black"
                      v-on:click="savePaySlip">
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
import CfgReportTab from "./CfgReportTab";
import LabeledInput from '@/components/common/LabeledInput';
import ButtonPanel from "../../../components/common/ButtonPanel";
export default {
  components:{
    CfgReportTab,
    LabeledInput,
    ButtonPanel
  },
  data() {
    return {
      locale: 'ko_KR',
      errors: {},
      paycodeItems:[],
      url:'',
      basicData: {
        SLIPTYPE: {
          value: 'VER',
          isRequired: true,
          isReadOnly: false,
          validMsg: '명세서 타입을 선택해주세요',
          items: [
            { message: '세로형', code: 'VER' },
            { message: '가로형', code: 'HOR' }
          ]
        },
        LOGO_SHOW: {
          value: 'N',
          isRequired: true,
          isReadOnly: false,
          validMsg: '회사로고 표시를 선택해주세요',
          items: [
            { message: 'Y', code: 'Y' },
            { message: 'N', code: 'N' }
          ]
        },
        SHOW_BANKAC: {
          value: 'Y',
          isRequired: true,
          validMsg: '은행계좌 표시를 선택해주세요',
          items: [
            { message: 'Y', code: 'Y' },
            { message: 'N', code: 'N' }
          ]
        },
        MASKING_BANKAC: {
          value: 'Y',
          isRequired: false,
          validMsg: '은행계좌 Masking 처리를 선택해주세요',
          items: [
            { message: 'Y', code: 'Y' },
            { message: 'N', code: 'N' }
          ]
        },
        SHOW_DEPT: {
          value: 'Y',
          isRequired: false,
          validMsg: '부서명 표시를 선택해주세요',
          items: [
            { message: 'Y', code: 'Y' },
            { message: 'N', code: 'N' }
          ]
        },
        PDF_FILE_NAME: {
          value: '급여명세서.pdf',
          isRequired: true,
          isReadOnly: false,
          validMsg: 'pdf파일명을 입력해주세요',
        }

      },
      message: {
        save: {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'}
      }
    }
  },
  methods: {
    async savePaySlip() {
      const me = this;
      let data = [];
      data.push({INPUT_ITEM:'SLIPTYPE',SHOW_FALG:me.basicData.SLIPTYPE.value,SETTING_VALUE:me.basicData.SLIPTYPE.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      data.push({INPUT_ITEM:'LOGO_SHOW',SHOW_FALG:me.basicData.LOGO_SHOW.value,SETTING_VALUE:me.basicData.LOGO_SHOW.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      data.push({INPUT_ITEM:'SHOW_BANKAC',SHOW_FALG:me.basicData.SHOW_BANKAC.value,SETTING_VALUE:me.basicData.SHOW_BANKAC.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      data.push({INPUT_ITEM:'MASKING_BANKAC',SHOW_FALG:me.basicData.MASKING_BANKAC.value,SETTING_VALUE:me.basicData.MASKING_BANKAC.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      data.push({INPUT_ITEM:'SHOW_DEPT',SHOW_FALG:me.basicData.SHOW_DEPT.value,SETTING_VALUE:me.basicData.SHOW_DEPT.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      data.push({INPUT_ITEM:'PDF_FILE_NAME',SHOW_FALG:me.basicData.PDF_FILE_NAME.value,SETTING_VALUE:me.basicData.PDF_FILE_NAME.value,SHOW_FLAG:'N',SHOW_EXTEND:'N'})
      let param = {};
      param['data'] = JSON.stringify(data);
      await this.$httpPostBody({
        url: '/payroll/code/payslipconfig-item/saveall',
        param: {'data':data},
        callback: function() {
          me.toastSuccessSave();
          me.callgrid();
          me.onCancel();
        }
      });

    },
    async setData(){
      let { data } = await this.$httpGet('payroll/code/payslipconfig-item/list');
      if(Array.isArray(data) && data.length > 0) {
        for(let i = 0; i < data.length; i ++) {
          if(data[i].INPUT_ITEM=='SLIPTYPE'){
            this.basicData.SLIPTYPE.value = data[i].SETTING_VALUE
          }else if(data[i].INPUT_ITEM=='LOGO_SHOW'){
            this.basicData.LOGO_SHOW.value = data[i].SETTING_VALUE
          }else if(data[i].INPUT_ITEM=='SHOW_BANKAC'){
            this.basicData.SHOW_BANKAC.value = data[i].SETTING_VALUE
          }else if(data[i].INPUT_ITEM=='MASKING_BANKAC'){
            this.basicData.MASKING_BANKAC.value = data[i].SETTING_VALUE
          }else if(data[i].INPUT_ITEM=='SHOW_DEPT'){
            this.basicData.SHOW_DEPT.value = data[i].SETTING_VALUE
          }else if(data[i].INPUT_ITEM=='PDF_FILE_NAME'){
            this.basicData.PDF_FILE_NAME.value = data[i].SETTING_VALUE
          }
        }
      }
    },
  },
  mounted() {
    this.setData();
  }
}
</script>

<style scoped>

</style>