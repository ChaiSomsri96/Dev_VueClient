<template>
  <base-modal title="수정" id="update-work-modal" :scroll="false" width="350">
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
                <span>일반</span>
              </label>
              <div class="row col-7">
                <ui-input :value="selCode.A"
                          @change="selCode.A=$event.value;"/>
              </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>연장</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.B"
                        @change="selCode.B=$event.value;"/>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>야간</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.C"
                        @change="selCode.C=$event.value;"/>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴일 일반</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.D"
                        @change="selCode.D=$event.value;"/>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴일 연장</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.E"
                        @change="selCode.E=$event.value;"/>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>휴일 야간</span>
            </label>
            <div class="row col-7">
              <ui-input :value="selCode.F"
                        @change="selCode.F=$event.value;"/>
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
        <button class="btn btn-md black"    >
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
        url:'insert'
      },
      A: '',
      selCode: [],
      paymonthseq : '2021년 07월 1차',
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
