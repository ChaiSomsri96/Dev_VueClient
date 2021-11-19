<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'YeSalary'}" active-class="active">연말정산 급여자동집계</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'YeRetireSalary'}" active-class="active">퇴사자정산 급여자동집계</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'YeSalary13Month'}" active-class="active">연말정산 조정 급여관리</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ye-salary-tab'
}
</script>