<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'YeTaxReport'}" active-class="active">지급명세서</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'YeTaxIncomeReport'}" active-class="active">소득자료제출집계표</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ye-tax-report-tab'
}
</script>