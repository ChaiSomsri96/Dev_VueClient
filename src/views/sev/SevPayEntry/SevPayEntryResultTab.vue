<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPayAvg'}" active-class="active">평균급여</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayDayBet'}" active-class="active">근속기간</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayCalc'}" active-class="active">퇴직금 계산</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayExe'}" active-class="active" v-if="showTab">임원퇴직금 한도초과여부 검토</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: 'sev-pay-entry-result-tab',
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      AVG_DATA: 'sevpayentry/getAvgData',
      EXE_DATA: 'sevpayentry/getExeData'
    })
  },
  data(){
    return{
      showTab: true
    }
  },
  methods: {
    checkTabShow(){
      if( ! this.EXE_DATA){
        this.showTab=false;
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