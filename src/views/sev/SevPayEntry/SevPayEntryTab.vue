<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'SevPayEntry'}" active-class="active">퇴직금입력</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayCreate'}" active-class="active">퇴직금 생성</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'SevPayDelete'}" active-class="active">퇴직금 및 세액삭제</router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'sev-pay-entry-tab'
}
</script>

<style scoped>

</style>