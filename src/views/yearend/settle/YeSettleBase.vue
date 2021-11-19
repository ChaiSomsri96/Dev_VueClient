<template>
  <div>

    <div class="content-header">
      <div class="header-bottom">
        <div class="header-bottom-left">
          <div class="menu-box">
            <div class="menu-item title">
              <div class="menu-item-icon">
                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                  <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                </button>
              </div>
              <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                {{empName+'의 연말정산'}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <ye-settle-progress />
    </div>
  </div>
</template>
<script>
import YeSettleGrid from '@/components/yearend/settle/YeSettleGrid';
import YeSettleProgress from '@/components/yearend/settle/YeSettleProgress';
import { mapGetters } from 'vuex';
export default {
  components: {
    YeSettleGrid,
    YeSettleProgress
  },
  computed: {
    ...mapGetters({
      empNumber: 'yearend/getEmpNumber',
      empName: 'yearend/getEmpName',
      attYear: 'yearend/getAttYear'
    })
  },
  methods: {
    gotoList(){
      let me = this;
      me.$router.push('/yearend/settlement');
    }
  }
}
</script>
<style lang="scss" scoped>
.box.type2 {
  min-width: 10px;
}
</style>