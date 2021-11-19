<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'CfgCalc'}" active-class="active">급여계산식</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgOverTimeCalc'}" active-class="active">연장근무 수당 계산식</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgRetireCalc'}" active-class="active">퇴직금 계산식</router-link>
      </li>
      <!--
      <li class="nav-item">
        <router-link :to="{name: ''}" active-class="active">유급휴직 계산식</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: ''}" active-class="active">퇴직금 계산식</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: ''}" active-class="active">퇴직연금 계산식</router-link>
      </li>
      -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "cfg-Calc-tab"
}
</script>

<style scoped>

</style>