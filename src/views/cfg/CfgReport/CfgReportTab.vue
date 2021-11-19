<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'CfgReport'}" active-class="active">급여대장</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgPaySlip'}" active-class="active">급여명세서</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgBankTransfer'}" active-class="active">은행이체파일</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgSalarySlip'}" active-class="active">급여전표</router-link>
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