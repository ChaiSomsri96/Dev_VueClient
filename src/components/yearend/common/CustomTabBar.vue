<template>
  <div class="row custom-tabs">
    <ul class="nav nav-tabs fill-width">
      <li
          v-for="(item, index) in routeArray"
          :key="index"
          class="nav-item"
      >
        <a class="nav-link disabled" :class="{'active': currentRouteName == item.name}"
           tabindex="-1" :aria-current="{'page': currentRouteName == item.name}">{{
            item.label
          }}</a>
      </li>
      <li class="nav-item pull-right">
        <button class="btn btn-md flat green" @click="prev()">
          <i class="icon-lineIcon-line-arrow-left mr-5"></i>이전
        </button>
        <button class="btn btn-md flat red" @click="next()">
          다음<i class="icon-lineIcon-line-arrow-right ml-5"></i>
        </button>
      </li>
      <li class="nav-item pull-right">
        <a>* 이전/다음 버튼을 눌러 진행하실 수 있습니다.</a>
      </li>
    </ul>
<!--    <div class="navigation-bar">
      <button class="btn btn-md flat green" @click="prev()">
        <i class="icon-lineIcon-line-arrow-left mr-5"></i>이전
      </button>
      <button class="btn btn-md flat red" @click="next()">
        다음<i class="icon-lineIcon-line-arrow-right ml-5"></i>
      </button>
    </div>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      routeArray: [
        {name: 'YeBasics', path: 'yebasics', label: '기본사항'},
        {name: 'YeAnnualIncome', path: 'yeannualincome', label: '연소득'},
        {name: 'YeDependents', path: 'yedependents', label: '부양가족'},
        {name: 'YeNationalFile', path: 'yenationalfile', label: '국세청파일'},
        {name: 'YeDeductedItem1', path: 'yededucteditem1', label: '공제항목1'},
        {name: 'YeDeductedItem2', path: 'yededucteditem2', label: '공제항목2'},
        {name: 'YeProoflist', path: 'yeprooflist', label: '증빙목록'},
        {name: 'YeSettlementDetails', path: 'yesettlementdetails', label: '정산내역'}
      ],
      progessRouteNames: [
        'YeBasics', 'YeAnnualIncome', 'YeDependents', 'YeNationalFile', 'YeDeductedItem1', 'YeDeductedItem2', 'YeProoflist', 'YeSettlementDetails'
      ],
      curPage: 1,
      length: 8
    }
  },
  computed: {
    currentRouteName() {
      if (this.progessRouteNames.indexOf(this.$route.name) < 0) {
        return this.$route.matched[this.$route.matched.length - 2]['name'];
      } else {
        return this.$route.name;
      }
    },
    ...mapGetters({
      eid: 'yearend/getEid',
      empNumber: 'yearend/getEmpNumber',
      empName: 'yearend/getEmpName',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  methods: {
    settleStep() {
      let me = this;
      let step = this.routeArray[this.curPage-1]['name'];
      me.$httpPost({
        url: '/year-end/employee/deduction/request/settle-step',
        param: {
          EID: me.eid,
          ATT_YEAR: me.attYear,
          CURRENT_STEP: step
        }
      });
    },
    prev() {
      if (this.curPage == 1) {
        return;
      }
      this.curPage = this.curPage - 1;
      this.settleStep();
      this.$router.push({name: this.routeArray[this.curPage - 1]['name']});
    },
    next() {
      if (this.curPage >= this.length) {
        return;
      }
      this.curPage = this.curPage + 1;
      this.settleStep();
      this.$router.push({name: this.routeArray[this.curPage - 1]['name']});
    }
  },
  created() {
    for (let i = 0; i < this.routeArray.length; i++)
      if (this.routeArray[i]['name'] == this.currentRouteName) {
        this.curPage = i + 1;
      }
  }
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  padding-bottom: 5px;
  margin-bottom: 5px;
  .nav-item a {
    font-size: 13px;
  }

  .fill-width {
    width: 100%;
  }

  .nav-tabs {
    margin-bottom: 0px;
    //border-color: rgba(120,130,140,0.13);
    border-color: #aaa;
  }

  .navigation-bar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
    //border-bottom: 1px solid rgba(120,130,140,0.13);
    border-bottom: 1px solid #aaa;
  }
}
</style>