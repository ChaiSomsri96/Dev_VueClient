<template>
  <div class="contents_article">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link :to="{name: 'CfgMasterCode'}" active-class="active">호봉 테이블 버전</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgHobongTable'}" active-class="active">호봉 테이블</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgHobongPayMaster'}" active-class="active">호봉 급여마스터 생성</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgAnnualSalaryTable'}" active-class="active">연봉 테이블</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgAnnualSalaryPayMaster'}" active-class="active">연봉 급여마스터 생성</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgEmpPayMaster'}" active-class="active">개인별 급여마스터</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'CfgEmployeeMasterEntry'}" active-class="active">개인별 인사자료</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cfg-mater-code-tab"
}
</script>

<style scoped>

</style>