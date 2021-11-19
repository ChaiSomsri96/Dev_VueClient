<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'일정관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <ye-date-tab></ye-date-tab>

            <div class="">
              <div class="form-group row">
                <label class="form-label type2 col-2">
                  <span>연말정산 메뉴 OPEN 기간</span>
                </label>
                <div class="col-2">
                  <ui-input-date :date="selCode.OPEN_DATE"
                                 :max-date="selCode.CLOSE_DATE"
                                 @change="selCode.OPEN_DATE=$event; selCode.OPEN_DATE=$event;"
                                 />
                </div>
                ~
                <div class="col-2">
                  <ui-input-date :date="selCode.CLOSE_DATE"
                                 :min-date="selCode.OPEN_DATE"
                                 @change="selCode.CLOSE_DATE=$event; selCode.OPEN_DATE=$event;"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label type2 col-2">
                  <span>연말정산 자료입력 차수</span>
                </label>
                <div class="row col-1">
                  <ui-input :value="selCode.UPLOAD_BATCH_NO" @change="selCode.UPLOAD_BATCH_NO=$event; selCode.return=$event;"/>
                </div>
              </div>
            </div>
          <div class="form-group row">
            <ul>
              <li><strong>*</strong>여기에서 설정된 오픈기간이 되면 ESS 의 메뉴 중 "연말정산 입력"을 할 수 있게 됩니다.</li>
              <li><strong>*</strong>메뉴 오픈기간이 종료되면 자동으로 ESS 연말정산 입력 기능이 닫힙니다.</li>
              <li><strong>*</strong>삭제 버튼을 눌러 삭제시에는 즉시 ESS 연말정산 입력 기능이 닫힙니다.</li>
            </ul>
          </div>
          <button-panel
              btnType='bottom'
              v-bind:save=true
              v-bind:remove=true
              v-on:save="saveCode"
              v-on:remove="deleteCode"
          />
        </div>
    </div>
</template>
<script>
import YeDateTab from './YeDateTab';
import ButtonPanel from "../../../components/common/ButtonPanel";

export default {
  components: {
    YeDateTab, ButtonPanel
  },
  data: function () {
    return {
      selCode: {}
    }
  },
  methods: {
    async loadData() {
      const me = this;
      try {
        const {data} = await me.$httpPost({ url: '/year-end/setting/menu-open/find', param: {}});// getEssOpenDate(); // api 호출
        me.selCode = data || {};
      } catch (e) {
        console.error(e);
      }
    },

    saveCode:function(){
      let me = this;
      me.$httpPost({
        url: '/year-end/setting/menu-open/save',
        param: me.selCode,
        callback: function(){
          me.toastSuccessSave();
        }
      });
    },
    deleteCode:function(){
      let me = this;
      me.confirmDelete(function(){
            me.$httpPost({
              url: '/year-end/setting/menu-open/delete',
              param: me.selCode,
              callback: function(){
                me.toastSuccessDelete();
                me.selCode={
                  OPEN_DATE:'',
                  CLOSE_DATE: '',
                  UPLOAD_BATCH_NO: ''
                };
              }
            })
      });
    },
  },
  mounted() {
    let me = this;
    me.loadData();
  }
}
</script>