<template>
<div class="">
<!--    <border-box width="200" v-slot="slotProps">
      <div class="col-9 row">
            <border-box-item title="사번"  :width="slotProps.width">
                <input type="text" class="form-control" v-model="empNumber" readonly />
            </border-box-item>
            <border-box-item title="성명"  :width="slotProps.width">
                <input type="text" class="form-control" v-model="empName" readonly />
            </border-box-item>
            <border-box-item title="연도"  :width="slotProps.width">
                <input type="text" class="form-control" v-model="attYear" readonly />
            </border-box-item>
            <border-box-item title="대상"  :width="slotProps.width">
                <input type="text" class="form-control" value="재직자" readonly />
            </border-box-item>
      </div>
      <div class="col-3">
            <border-box-item button class="pull-right">
              <button type="button" class="btn btn-s menu-item-icon black" @click="gotoList()">
                <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
              </button>
            </border-box-item>
      </div>
    </border-box>-->
    <custom-tab-bar class="mt-20" />
    <div class="progress-container">  <!-- progress-content -->
        <router-view />
    </div>
</div>
</template>
<script>
import CustomTabBar from '@/components/yearend/common/CustomTabBar';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import { mapGetters } from 'vuex';
export default {
    components: {
        CustomTabBar,
        BorderBox,
        BorderBoxItem,
    },
    computed: {
        ...mapGetters({
            empNumber: 'yearend/getEmpNumber',
            empName: 'yearend/getEmpName',
            attYear: 'yearend/getAttYear'
        })
    },
    data() {
        return {
          listUrl: '/yearend/settlement'
        }
    },
  methods: {
    gotoList(){
      let me = this;
      me.$router.push(me.listUrl);
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.content-border {
    border: 1px solid #ededed;
    border-radius: 4px;
    -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.15);
    margin-bottom: 0;
    padding: 10px 10px 20px 10px;
}
.custom-tabs {
    div.btn {
        background: #e4e2e2;
        border-color: #aaa;
        &:hover {
            background: #e4e2e2;
            border-color: #aaa;
        }
        &.selected {
            background: #fbfbfb;
        }
    }
}
</style>