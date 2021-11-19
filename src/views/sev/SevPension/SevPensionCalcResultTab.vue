<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionCalcResultAvg'}" active-class="active">평균급여</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionCalcResultTen'}" active-class="active">퇴직연금 적립율</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionCalcResultCal'}" active-class="active">퇴직연금 계산</router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'sev-pension-calc-result-tab'
}
</script>

<style scoped>

</style>