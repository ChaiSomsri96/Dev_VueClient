<template>
  <base-modal title="조회" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>조회형식</span>
            </label>
            <div class="row col-7">
              <ui-radio-button-inline :options="formData.select"
                                      @change="formData.select.value=$event.value" />
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
      eidList : [],
      dateData : [],
      formData: {
        select: { //값이 없는 회차
          name: 'select',
          value: 'Excel',
          domOptList: [
            { value: 'Excel', label: 'excel', id: 'excel-visible' },
            { value: 'Pdf', label: 'pdf', id: 'pdf-hide' }
          ]
        }
      },
    }
  },
  methods: {

    async asyncDynamicComponentData(_param) {
      this.eidList = _param.eidList;
      this.dateData = _param.dateData;
    },
    onSelect() {
      if(this.formData.select.value == "Excel"){
        let form = JSON.stringify({
          "PAY_MONTH": this.dateData[0].PAY_MONTH,
          "SEQ": this.dateData[0].SEQ,
          "PAY_DATE": this.dateData[0].PAY_DATE,
          "TEST_EMAIL_RECEIVER":null,
          "CONTROL_NO":1,
          "EMPTYPE_CD":null,
          "PAYTYPE_CD":null,
          "JOBGROUP_CD":null,
          "BP_CODE":null,
          "MODIFY_TYPE":null,
          "GROUP_BY": "PAY_CODE",
          "RPT_LANG": "KOREAN",
          "SHOW_SEQ":"YES",
          "WRITE_PDF_GEN_HISTORY":"N",
          "EMP_SEL":this.eidList==null ? "ALL" : "SELECT"
        });
        let {data} = this.$httpPost({
          url: 'payroll/salaryqry/mysalary/download_excel_multisheet',
          param:{
            'formData': form,
            'eidList' : JSON.stringify(this.eidList)
          },
          blob: true
        })
        this.downloadPdf(data,'exampleTable.xls')
      }
      // this.close({formData: {
      //     reportSeq: this.formData.REPORT_SEQ.value,
      //     rtype: this.formData.aggregationCriteria.value,
      //     personalInfoMask: this.formData.profileVisible.value,
      //   }, paymonthseqList: this.paymonthseq});
    },
    async loadEarnerRegTypeItems() {

    },
    async onCancel(){

    },
  }
}
</script>
