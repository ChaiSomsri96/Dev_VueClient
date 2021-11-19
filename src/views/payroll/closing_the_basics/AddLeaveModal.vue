<template>
  <base-modal title="추가" id="load-work-result-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>급여차수</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="inactiveItems"
                           :value="CLOSE_FLAG"
                           @change="CLOSE_FLAG=$event.value;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>이름</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.EMP_NAME"
                        @change="selCode.EMP_NAME=$event.value;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴직 구분</span>
            </label>
            <div class="row col-7">
              <ui-dropdown :items="leaveItems"
                           :value="LEAVE_FLAG"
                           @change="LEAVE_FLAG=$event.value;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴직 시작일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="START_DATE"
                             @change="START_DATE=$event;"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴직 종료일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="END_DATE"
                             @change="END_DATE=$event;"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal"  aria-label="Close">
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
      CLOSE_FLAG : '0',
      START_DATE: '20210701',
      END_DATE : '20210709',
      selCode : [],
      LEAVE_FLAG:'',
      leaveItems: [
        { cd: '0', cdNm: {message: '육아휴직' } },
        { cd: '1', cdNm: {message: '업무상 휴직'}},
        { cd: '2', cdNm: {message: '연동된 휴직구분'}}
      ],
      inactiveItems: [
        { cd: '0', cdNm: {message: '1' } },
        { cd: '1', cdNm: {message: '2'}},
        { cd: '2', cdNm: {message: '3'}}
      ]
    }
  },
}
</script>
