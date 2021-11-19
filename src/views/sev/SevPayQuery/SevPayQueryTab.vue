<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPayQuery'}" active-class="active">퇴직금 계산내역</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionQuery'}" active-class="active">퇴직연금 계산내역</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'sev-pay-query-tab'
}
</script>

<style scoped>

</style>