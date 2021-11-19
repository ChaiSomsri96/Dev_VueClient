<template>
  <base-modal title="추가" id="cfg-year-modal" :scroll="false" width="500">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>급여차수</span>
            </label>
            <div class="row col-7">
              <ui-dropdown
                           :value="CLOSE_FLAG"
                           @change="CLOSE_FLAG=$event.value;"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>인사 정보 기준일</span>
            </label>
            <div class="row col-7">
              <ui-input-date :date="END_DATE"
                             @change="END_DATE=$event;"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>대상자</span>
            </label>
            <div class="row col-7">
                <div class="input-group dropdown ellipsis">
                  <input type="text" class="form-control type-two-button" id="searchEmpNm" value="" name="searchEmpNm" data-type="EMP" data-organization-type="COMPANY" data-include-rest="true" data-org-search-type="AC_TYPE_SC96" data-range="EMP"
                         placeholder='사원명' autocomplete="off" data-toggle="dropdown" aria-expanded="false">
                  <button type="button" class="btn btn-s solid"><i class="icon-solidIcon-cancel-default"></i></button>
                  <button id="search-highlight-btn2" type="button" class="btn btn-s white"><i class="icon-lineIcon-search"></i></button>
                  <div class="dropdown-menu" style="max-width:460px;">
                    <div class="autocompleteScrollbar" style="max-height: 350px; position: relative; overflow: visible;"></div>
                  </div>
                </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-11">
              <div class="box border-box type3">
                <div class="box-body mCustomScrollbar _mCS_7 mCS-autoHide" ui-jp="mCustomScrollbar" style="overflow: visible;">
                  <div id="mCSB_7" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: none;">
<!--                    <div id="targetList" v-for="item in list" ref="targetList" @click="removeitem"  class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">-->
<!--                      <div>{{item}}</div>-->
<!--                      <div v-html="item"></div>-->
                      <div id="targetList"  ref="targetList" @click="removeitem"  class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
<!--                      <component v-for="item in buttons" :key="item" :is="item"></component>-->

                      <div class="inner-item add_item" id='tmp_DEPT_cgv2008000663' oriName='운영팀' typeCode='DEPT'>
                        <input type='hidden' name='depts' value='cgv2008000663'>
                        <span class="text-888 mr-5" data-original-title="" style="display: none;">[이름]</span>
                        <a href="#" class="h-color">
                          <i class="badge lg blue ellipsis" data-original-title="">
                            운영팀</i>
                        </a>
                        <button type="button" class="btn btn-s flat solid pull-right btn_delete m-0">
                          <i class="icon-solidIcon-cancel-red"><span class="blind">취소</span></i>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <button type="button" id="btnSearch" class="btn btn-md line-1" @click="onadd">
              <span>검색</span>
            </button>
            <button type="button" id="btnTest" class="btn btn-md line-1" @click="ontest">
              <span>추출</span>
            </button>
          </div>

        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
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
    BaseModal,

  },

  data() {
    return {
      list:[],
      test:'1',
      CLOSE_FLAG: '',
      END_DATE: '',
      inactiveItems :{

      }
    }
  },

  methods:{
    removeitem(event){
      //btn_delete
      //this.toast({message:JSON.stringify(event.target.parentElement.tagName)})
      if(event.target.className == "icon-solidIcon-cancel-red"){
        //this.toast({message:JSON.stringify(event.target.parentElement.className)})
        event.target.parentElement.parentElement.remove();
      }

    },
    ontest() {
      this.toast({message:JSON.stringify(this.$refs.targetList.children[1].getAttribute('typeCode'))});
      //this.toast({message:JSON.stringify(this.$refs.targetList.children.length)})
    },
    onadd(){
      this.test = this.test+1;
      let nmTag = " <a href='#' class='h-color'><i class='badge lg blue ellipsis' data-original-title=''>"+this.test+"</i></a>"

      $("#targetList").append(
          '<div class="inner-item add_item" id="tmp_1" oriName="aa" typeCode="ss">'+
          '<input type="hidden" name="name" value="123">' +
          '<span class="authNm">'+
          '<span class="text-888 mr-5" style="display: none;">[이름]</span>'+
          nmTag +
          '</span>'+
          '<button type="button" class="btn btn-s flat solid pull-right btn_delete m-0">'+
          '<i class="icon-solidIcon-cancel-red"><span class="blind">취소</span></i>'+
          '</button>'+
          '</div>'
      );
    }
  },

}
</script>

<style scoped>

</style>