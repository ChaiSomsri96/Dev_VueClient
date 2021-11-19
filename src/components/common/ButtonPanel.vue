<template>
  <div :class="topClass">
    <div :class="rowStyle">
      <button type="button"
              v-if="add === true"
              v-on:click="doAdd"
              :class="buttonStyle" >
        <i class="icon-lineIcon-plus mr-5"></i><span v-text="message.add[locale]">추가</span>
      </button>
      <button type="button"
              v-if="insert === true"
              v-on:click="doInsert"
              :class="buttonStyle">
        <i class="icon-lineIcon-plus mr-5"></i><span v-text="message.insert[locale]">입력</span>
      </button>
      <button type="button"
              v-if="update === true"
              v-on:click="doUpdate"
              :class="buttonStyle">
        <i class="icon-lineIcon-check mr-5"></i><span v-text="message.update[locale]">수정</span>
      </button>
      <button type="button"
              v-if="save === true"
              v-on:click="doSave"
              :class="buttonStyle">
        <i class="icon-lineIcon-check mr-5"></i><span v-text="message.save[locale]">저장</span>
      </button>
      <button type="button"
              :class="buttonStyle"
              v-if="remove === true"
              v-on:click="doDelete" >
        <i class="icon-lineIcon-close mr-5"></i><span v-text="message.remove[locale]">삭제</span>
      </button>
      <button type="button"
              :class="buttonStyle"
              v-if="print === true"
              v-on:click="doPrint" >
        <i class="icon-lineIcon-print mr-5"></i><span v-text="message.print[locale]">인쇄</span>
      </button>
      <button type="button"
              :class="buttonStyle"
              v-if="download === true"
              v-on:click="doDownload" >
        <i class="icon-lineIcon-download mr-5"></i><span v-text="message.download[locale]">다운로드</span>
      </button>
      <button type="button"
              :class="buttonStyle"
              v-if="upload === true"
              v-on:click="doUpload" >
        <i class="icon-lineIcon-upload mr-5"></i><span v-text="message.upload[locale]">업로드</span>
      </button>
      <slot name="start"></slot>
      <div class="form-group ml-auto">
        <slot name="end"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {userInfoUtils} from "workplace-vue-common-ui";
export default {
  name   : 'button-panel',
  props  : {
    save: {
      type: Boolean,
      default: false
    },
    insert: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Boolean,
      default: false
    },
    print: {
      type: Boolean,
      default: false
    },
    download: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default : 'ko_KR'// userInfoUtils.getI18nInfo().locale
    },
    btnType:  {
      type: String,
      default : 'bottom'
    }
  },
  data() {
    return {
      message: {
        insert : {ko_KR: '입력', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'},
        update : {ko_KR: '수정', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'},
        add : {ko_KR: '추가', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'},
        save : {ko_KR: '저장', en_US: 'Sort ascending', ja_JP: 'ソート昇順', zh_CN: '升序', zh_TW: '升序'},
        remove: {ko_KR: '삭제', en_US: 'Sort descending', ja_JP: '降順で並べ替え', zh_CN: '降序排列', zh_TW: '降序排列'},
        print: {ko_KR: '인쇄', en_US: 'Sort descending', ja_JP: '降順で並べ替え', zh_CN: '降序排列', zh_TW: '降序排列'},
        download: {ko_KR: '다운로드', en_US: 'Sort descending', ja_JP: '降順で並べ替え', zh_CN: '降序排列', zh_TW: '降序排列'},
        upload: {ko_KR: '업로드', en_US: 'Sort descending', ja_JP: '降順で並べ替え', zh_CN: '降序排列', zh_TW: '降序排列'},
      }
    }
  },
  computed: {
    topClass() {
      return this.btnType === 'top' ? 'tbl-top row':'form-bottom';
    },
    buttonGroupClass(){
      return this.btnType === 'top' ? 'pull-left': '';
    },
    buttonStyle(){
      return this.btnType === 'top' ? 'btn btn-md flat':'btn btn-lg ml-5 black';
    },
    rowStyle(){
      return this.btnType === 'top' ? 'row': '';
    }
  },
  methods: {
    doSave : function () {
      this.$emit('save');
    },
    doInsert : function () {
      this.$emit('insert');
    },
    doUpdate : function () {
      this.$emit('update');
    },
    doAdd : function () {
      this.$emit('add');
    },
    doDelete: function () {
      this.$emit('remove');
    },
    doPrint: function () {
      this.$emit('print');
    },
    doDownload: function () {
      this.$emit('download');
    },
    doUpload: function () {
      this.$emit('upload');
    }
  }
}
</script>