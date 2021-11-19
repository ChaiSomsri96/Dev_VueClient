<template>
  <base-modal title="대상자 업로드" id="upload-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="row">
        <comment-box class="mb-10"
                     :list="[
                            {'text': '아래 템플릿 파일을 다운로드해서 작성한 후 업로드하세요.'}
                        ]"
        />
      </div>
      <div class="row">
        <div class="">
          <table-form :colgroup="['25%', 'auto']">
            <template v-slot:body>
              <tr>
                <button class="btn btn-md flat" ><i class="icon-lineIcon-download mr-5"></i>다운로드</button>
              </tr>
              <tr>
                <table-form-label label="대상자 목록"/>
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
                <i class="icon-lineIcon-check mr-5"></i>대상자 등록
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
      fileName: ''

    }
  },
  computed: {
  },
  methods: {
    saveEvid() {
      let me = this;
      let file = me.attachedFileList[0];


    },



    asyncDynamicComponentData(param) {

    }
  }
}
</script>