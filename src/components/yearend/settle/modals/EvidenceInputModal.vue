<template>
  <base-modal title="증빙등록" id="evid-input-modal" :scroll="false" width="1000">
    <template v-slot:body>
      <div class="row">
        <comment-box class="mb-10"
                     :list="[
                            {'text': '* 국세청 간소화파일에 포함되지 않은 항목은 증명서류는 반드시 첨부하여야 합니다.'},
                            {'text': '* 증명서류는 PDF 또는 그림파일(jpg, png)형식이어야 합니다.'},
                            {'text': '* 일부 증빙은 전년도것이 자동으로 복사됩니다.'},
                            {'text': '* 부양가족변동이 있는 경우에는 반드시 주민등록등본을 새로 제출해야 합니다.'},
                            {'text': '* 부양가족변동이 있고 주민등록등본표로 관계확인이 되지 않는 경우 가족관계증명서를 제출해야 합니다.'},
                            {'text': '* 공제신청을 취소하는 경우, 첨부된 증빙도 함께 삭제해 주십시오.'},
                        ]"
        />
      </div>
      <div class="row">
        <div class="">
          <table-form :colgroup="['20%', 'auto', '20%', 'auto']">
            <template v-slot:body>
              <tr>
                <table-form-label label="증빙차수"/>
                <table-form-item>
                  <input type="text" class="form-control" v-model="evidence.openNo" disabled>
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="항목"/>
                <table-form-item>
                  <ui-dropdown
                      :items="evidence.category.items"
                      :value="evidence.category.value"
                      @change="evidence.category.value=$event.value; evidence.category.return=$event;onChangeCategory();"
                      :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message', disabled:evidence.category.disabled }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="대상자"/>
                <table-form-item>
                  <ui-dropdown
                      :items="evidence.target.items"
                      :value="evidence.target.value"
                      @change="evidence.target.value=$event.value; evidence.target.return=$event;"
                      :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="증빙종류"/>
                <table-form-item>
                  <ui-dropdown
                      :items="evidence.type.items"
                      :value="evidence.type.value"
                      @change="evidence.type.value=$event.value; evidence.type.return=$event;"
                      :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                        disabled: step =='EVID'
                      }"
                  />
                </table-form-item>
              </tr>
              <tr>
                <table-form-label label="증빙파일"/>
                <table-form-item>
                  <ui-attach :attachedFileList="attachedFileList"
                             :deleteFileApi="deleteFileApi"
                             :uploadTempFilesApi="uploadTempFilesApi"
                             :options="{
                                        showFileListDiv : true,
                                        buttonIconClass : 'icon-lineIcon-link',
                                        accept          : '*',
                                        isMultiple      : false
                                   }"
                             @change="attachedFileList = $event;"></ui-attach>
                </table-form-item>
              </tr>
            </template>
            <template v-slot:footer>
              <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
              </button>
              <button class="btn btn-md black mr-3" @click="saveEvid()">
                <i class="icon-lineIcon-check mr-5"></i>증빙등록
              </button>
            </template>
          </table-form>
        </div>
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

export default {
  mixins: [modal],
  components: {
    BaseModal,
    TableForm,
    TableFormItem,
    TableFormLabel,
    CommentBox
  },
  data() {
    return {
      files:null,
      attachedFileList: [],
      step: '',
      fileName: '',
      evidence: {
        category: {
          value: '',
          return: null,
          items: [
            {code: 'YEAR_INCOME', message: '소득'},
            {code: 'FAMILY', message: '부양가족'},
            {code: 'INSURANCE', message: '보험료'},
            {code: 'MEDICINE', message: '의료비'},
            {code: 'EDUCATION', message: '교육비'},
            {code: 'CREDIT_CARD', message: '신용카드'},
            {code: 'DONATION', message: '기부금'},
            {code: 'SAVINGS', message: '연금저축'},
            {code: 'HOUSE_LOAN', message: '주택자금'},
            {code: 'OTHERS', message: '기타'},
            {code: 'FOREIGN_TAX', message: '외납세액'}
          ]
        },
        target: {
          value: '',
          return: null,
          items: [
            {message: '', code: ''}
          ]
        },
        openNo: '',
        type: {
          value: '',
          return: null,
          items: [
            {message: '', code: ''}
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  methods: {
    saveEvid() {
      let me = this;
      let file = me.attachedFileList[0];

      this.$httpPost({
        url: '/year-end/employee/evid/register',
        param: {
          "EID": me.eid,
          "ATT_YEAR": me.attYear,
          "CURRENT_STEP": me.step,
          "FILE_ID": file.fileId,
          "EVID_FILE_NAME": file.fileNm,
          "REL_PERSON_ID": me.evidence.target.value,
          "EVID_CODE": me.evidence.type.value
        },
        callback: function () {
          me.toastSuccessSave();
        }
      });
    },

    onChangeCategory(){
      this.step = this.evidence.category.value;
      if(this.step){
        this.evidence.type.value = '';
        this.setEvidCodes();
      }
    },

    async setEvidCodes() {
      let me = this;
      let {data} = await this.$httpGet(
          '/year-end/employee/evid/codes',
          {
            EID: this.eid,
            ATT_YEAR: this.attYear,
            CURRENT_STEP: me.step
          });
      me.setEvidTypeItems(data);
    },

    setEvidTypeItems(data){
      let me = this;
      let items = [];
      if(data && data.length > 1){
        data.forEach(function (val) {
          items.push({
            message: val.EVID_NAME,
            code: val.EVID_CODE
          })
        });
        me.evidence.type.items = items;
      }
    },

    async setYearendOpenSeq() {
      let {data} = await this.$httpGet('/year-end/employee/evid/open-no');
      this.evidence.openNo = data.OPEN_NO;
      return data;
    },

    async setFamilyList() {
      let me = this;
      let {data} = await me.$httpPost({
        url: '/year-end/employee/family/list',
        param: {
          'EID': me.eid,
          'ATT_YEAR': me.attYear,
          'CURRENT_STEP': 'INSURANCE',
          'PAYDAY': me.payday
        }
      });
      for (let i = 0; i < data.length; i++) {
        me.evidence.target.items.push({
          message: data[i]['PERSON_NAME'], code: data[i]['YES_ID']
        });
      }
    },

    resetComponent() {
      this.evidence = {
        category: {
          value: '',
          return: null,
          disabled: false,
          items: [
            {code: 'YEAR_INCOME', message: '소득'},
            {code: 'FAMILY', message: '부양가족'},
            {code: 'INSURANCE', message: '보험료'},
            {code: 'MEDICINE', message: '의료비'},
            {code: 'EDUCATION', message: '교육비'},
            {code: 'CREDIT_CARD', message: '신용카드'},
            {code: 'DONATION', message: '기부금'},
            {code: 'SAVINGS', message: '연금저축'},
            {code: 'HOUSE_LOAN', message: '주택자금'},
            {code: 'OTHERS', message: '기타'},
            {code: 'FOREIGN_TAX', message: '외납세액'}
          ]
        },
        target: {
          value: '',
          return: null,
          items: [
            {message: '', code: ''}
          ]
        },
        openNo: '',
        type: {
          value: '',
          return: null,
          items: [
            {message: '', code: ''}
          ]
        }
      };
    },

    asyncDynamicComponentData(param) {
      let me = this;
      me.resetComponent();
      me.step = param['step'];
      if (me.step && me.step != 'EVID') {
        me.evidence.category.value = me.step;
        me.evidence.category.disabled = true;
      }
      me.setYearendOpenSeq()
      me.setEvidCodes();
      me.setFamilyList();
    }
  }
}
</script>