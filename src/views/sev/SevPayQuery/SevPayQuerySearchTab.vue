<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryAvg'}" active-class="active">평균급여</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryDayBet'}" active-class="active">근속기간</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryCalc'}" active-class="active">퇴직금 계산</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryTax'}" active-class="active">세액 등</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryPer'}" active-class="active" v-if="sevper">퇴충전입액</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQueryExe'}" active-class="active" v-if="showTab">임원퇴직금 한도초과여부 검토</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: 'sev-pay-query-search-tab',
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      AVG_DATA: 'sevpayentry/getAvgData',
      EXE_DATA: 'sevpayentry/getExeData'
    })
  },
  data(){
    return{
      showTab: true,
      sevper: false
    }
  },
  methods: {
    checkTabShow(){
      if( this.SET_DATA[0].RETIRE_TYPE === 'A'){
        this.sevper= true;
      }else{
        if( ! this.EXE_DATA[0]){
          this.showTab=false;
        }
      }
    }
  },
  mounted() {
    this.checkTabShow();
  }
}
</script>

<style scoped>

</style>