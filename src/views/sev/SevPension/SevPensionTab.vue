<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPension'}" active-class="active">퇴직연금 내부관리</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionCalc'}" active-class="active">퇴직연금 계산</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionSaving'}" active-class="active">퇴직연금 적립대장 기록</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPensionSavingSearch'}" active-class="active">퇴직연금 적립액 조회</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'sev-pension-tab'
}
</script>

<style scoped>

</style>