<template>
    <div class="contents_article">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{name: 'SystemCode'}" active-class="active">국가코드</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'SystemBankCode'}" active-class="active">국내은행코드</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'SystemTaxOfficeCode'}" active-class="active">세무서코드</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'SystemAreaCode'}" active-class="active">시군구청코드</router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: 'system-code-tab'
}
</script>