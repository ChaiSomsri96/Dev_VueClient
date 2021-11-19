<template>
  <base-modal title="근로소득원천징수영수증 출력" id="receipt-tax-modal" :scroll="false" size="large" width="1000">
    <template v-slot:body>
      <border-box width="260" v-slot="slotProps">
        <border-box-item title="출력일시" :width="slotProps.width">
          <ui-input-date :date="outputTime"
                         @change="outputTime=$event;"/>
        </border-box-item>
        <border-box-item title="범위" :width="slotProps.width">
          <ui-dropdown :items="scope.items"
                       :value="scope.value"
                       @change="scope.value=$event.value; scope.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"/>
        </border-box-item>
        <border-box-item title="구분" :width="slotProps.width">
          <ui-dropdown :items="type.items"
                       :value="type.value"
                       @change="type.value=$event.value; type.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"/>
        </border-box-item>
        <border-box-item title="언어" :width="slotProps.width">
          <ui-dropdown :items="rptLang.items"
                       :value="rptLang.value"
                       @change="rptLang.value=$event.value; rptLang.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"/>
        </border-box-item>
        <border-box-item title="개인정보" :width="slotProps.width" radio>
          <ui-radio-button-inline :options="personalInfoMask"
                                  @change="personalInfoMask.value=$event.value"/>
        </border-box-item>
        <border-box-item title="Draft" :width="slotProps.width" radio>
          <ui-radio-button-inline :options="draft"
                                  @change="draft.value=$event.value"/>
        </border-box-item>
        <border-box-item title="비거주외국인" :width="slotProps.width">
          <ui-dropdown :items="isRrn.items"
                       :value="isRrn.value"
                       @change="isRrn.value=$event.value; isRrn.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"/>
        </border-box-item>
        <border-box-item title="파일" :width="slotProps.width">
          <ui-dropdown :items="file.items"
                       :value="file.value"
                       @change="file.value=$event.value; file.return=$event;"
                       :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"/>
        </border-box-item>
      </border-box>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button type="button" class="btn btn-md black" @click="queryIncomeTaxPdf()">
          <span>근로소득원천징수영수증 출력</span>
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import YeEmployeeListType2 from "../../../components/yearend/common/YeEmployeeListType2";
import BaseModal from "../../../components/common/BaseModal";
import modal from '@/mixin/modal';

export default {
  mixins: [modal],
  components: {
    BaseModal,
    YeEmployeeListType2,
    BorderBox,
    BorderBoxItem,
    UiRadioButtonInline
  },
  data() {
    return {
      year: '',
      empList: [],
      outputTime: '20210622',
      scope: {
        value: 'ALL',
        return: null,
        items: [
          {message: '전체', code: 'ALL'},
          {message: '영수증', code: 'RECEIPT'},
          {message: '영수증의 3페이지', code: 'RECEIPT3'},
          {message: '명세서', code: 'REPORT'},
        ]
      },
      type: {
        value: '1',
        return: null,
        items: [
          {message: '소득자보관용', code: '1'},
          {message: '발행자보관용', code: '2'},
          {message: '발행자보고용', code: '3'}
        ]
      },
      rptLang: {
        value: 'KOREAN',
        return: null,
        items: [
          {message: '한국어', code: 'KOREAN'},
        ]
      },
      personalInfoMask: {
        name: 'profile-visible',
        value: 'Y',
        domOptList: [
          {value: 'Y', label: '표시', id: 'profile-visible'},
          {value: 'N', label: '숨김', id: 'profile-hide'}
        ]
      },
      draft: {
        name: 'draft',
        value: 'NO',
        domOptList: [
          {value: 'YES', label: '표시', id: 'draft-visible'},
          {value: 'NO', label: '숨김', id: 'draft-hide'}
        ]
      },
      isRrn: {
        value: 'YES',
        return: null,
        items: [
          {message: '주민등록번호', code: 'YES'},
          {message: '여권번호', code: 'NO'},
        ]
      },
      file: {
        value: 'YES',
        return: null,
        items: [
          {message: '인별 분리', code: 'YES'}
        ]
      }
    }
  },
  methods: {
    async onCancel() {
    },
    asyncDynamicComponentData(param) {
      this.empList = param.list;
      this.year = param.year;
    },
    async queryIncomeTaxPdf() {
      try {
        this.hide();
        let __checkedData = this.empList;
        let {data} = await this.$httpPost({
          url: '/yearend/receiptincometax/pay-receiptincometaxqry/pdf-down-list2',
          param: {
            'FORM_DATA': JSON.stringify({
              "FORM_DATA": null,
              "EID_LIST": null,
              "YE_YEAR": this.year,
              "OUTPUT_TIME": this.outputTime,
              "SCOPE": (this.scope.value == 'ALL' ? null : this.scope.value),
              "TYPE": this.type.value, "RPT_LANG": this.rptLang.value,
              "EID": null, "EMP_SEL": "SELECT",
              "PERSONAL_INFO_MASK": this.personalInfoMask.value,
              "DRAFT": this.draft.value,
              "IS_RRN": this.isRrn.value,
              "PDF_NAMING": "STANDARD",
              "PDF_PASSWORD_YN": "N",
              "PDF_TYPE": "PDF",
              "WRITE_PDF_GEN_HISTORY": "N",
              "PAY_DATE_WRITE": null
            }),
            'EID_LIST': JSON.stringify(__checkedData)
          },
          blob: true
        });
        this.openPdf(data, "근로소득원천징수영수증 출력");
      } catch (e) {
        console.log("YeTaxFile queryIncomeTaxPdf: ", e);
      }
    }
  },
}
</script>