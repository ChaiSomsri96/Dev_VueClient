<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'CfgCode'}" active-class="active">급여코드 관리</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgYearSalary'}" active-class="active">통상임금 세팅</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgOvertimeCode'}" active-class="active">초과근무코드 조회</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "Cfg-Tab"
}
</script>

<style scoped>

</style>