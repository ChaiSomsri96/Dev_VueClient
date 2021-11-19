<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionQueryAvg'}" active-class="active">평균급여</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionQueryPen'}" active-class="active">퇴직연금 적립율</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionQueryCal'}" active-class="active">퇴직연금 계산</router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'sev-pension-query-search-tab'
}
</script>

<style scoped>

</style>