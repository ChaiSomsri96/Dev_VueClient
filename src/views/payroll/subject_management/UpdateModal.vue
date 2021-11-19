<template>
  <base-modal title="업로드" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>급여차수</span>
            </label>
            <div class="row col-7">
              <span>{{ paymonthseq }}</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>이름</span>
            </label>
            <div class="row col-7">
              <span>{{ selCode.EMP_NAM }}</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>부서</span>
            </label>
            <div class="row col-7">
              <div class="input-group dropdown resizable">
                <input type="text" class="form-control" data-srch-dept="true" id="dept" baap-autocomplete-component="input[name='condition.deptNo']"
                       name="condition.deptNm" value="" autocomplete="off" data-range="DEPT" data-org-search-type="AC_TYPE_SC1" data-toggle="dropdown" aria-expanded="false"/>
                <button id="search-highlight-btn" type="button" class="btn btn-s white"><i class="icon-lineIcon-treemenu"></i></button>
                <div class="dropdown-menu" style="display: none;">
                  <div class=" ndk-scrollbar" style="max-height: 380px" baap-autocomplete-result></div>
                </div>
                <div class="menu-container">
                  <div class="menu-kit">
                    <div class="menu-resizable horizontal">
                      <div class="menu-scroll  ndk-scrollbar">
                        <div class="menu-kit-area" baap-autocomplete-tree></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>입사일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="selCode.E_JOIN_DATE"
                             @change="selCode.E_JOIN_DATE=$event;"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>퇴사일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="selCode.RETIRE_DATE"
                             @change="selCode.RETIRE_DATE=$event;"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>직급</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="inactiveItems"
                           :value="CLOSE_FLAG"
                           @change="CLOSE_FLAG=$event.value;"/>
            </div>
          </div>

          <div class="form-group row">
          <label class="form-label type2 col-4">
            <span>직책</span>
          </label>
          <div class="row col-7">
            <ui-dropdown :items="inactiveItems"
                         :value="CLOSE_FLAG"
                         @change="CLOSE_FLAG=$event.value;"/>
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
        <button class="btn btn-md black"   >
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
export default {
  mixins: [modal],
  components: {
    BaseModal
  },
  data() {
    return {
      emptyMastCode:{
        EMP_NAM:'',
        E_JOIN_DATE : '',
        RETIRE_DATE : '',
        url:'insert'
      },
      paymonthseq : '2021년 07월 1차',
      EMP_NAM : '',
      E_JOIN_DATE : '',
      RETIRE_DATE : '',
      CLOSE_FLAG: '',
      selCode: {},
      inactiveItems: [
        { cd: '0', cdNm: {message: '미도래' } },
        { cd: '1', cdNm: {message: '오픈'}},
        { cd: '2', cdNm: {message: '마감'}}
      ]
    }
  },
  methods: {
    async asyncDynamicComponentData(_param) {
      this.selCode = this.emptyMastCode;
      Object.keys(_param).forEach(k => this.selCode[k] = _param[k]);
      Object.keys(_param).forEach(k => this.emptyMastCode[k] = _param[k]);


    },
    async onCancel(){
      this.selCode = this.emptyMastCode;
      this.selCode.EMP_NAM = '';
      Object.keys(this.emptyMastCode).forEach(k => this.selCode[k] = '');
      this.emptyMastCode.url = 'insert';

    },
  }
}
</script>
