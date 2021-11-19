<template>
  <base-modal title="불러오기" id="load-work-result-modal" :scroll="false" width="500">
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
              <span>반영 시작일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="START_DATE"
                             @change="START_DATE=$event;"
              />
            </div>
            </div>
            <div class="form-group row">
              <label class="form-label type2 col-4">
                <span>반영 종료일</span>
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
      inactiveItems: [
        { cd: '0', cdNm: {message: '1' } },
        { cd: '1', cdNm: {message: '2'}},
        { cd: '2', cdNm: {message: '3'}}
      ]
    }
  },
}
</script>

<style scoped>

</style>