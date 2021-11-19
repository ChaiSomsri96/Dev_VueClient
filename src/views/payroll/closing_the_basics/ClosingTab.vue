<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'WorkResult'}" active-class="active">근무 결과 연계</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'LeaveOfAbsence'}" active-class="active">휴직 기간 연계</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ClosingTab"
}
</script>

<style scoped>

</style>