<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link :to="{name: 'SystemTax'}" active-class="active">간이세액표</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name: 'SystemInsRate'}" active-class="active">4대보험요율</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name: 'SystemTaxTitle'}" active-class="active">세무표지</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name: 'SystemTaxTitleLimit'}" active-class="active">세무표지별 비과세한도</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'system-tax-tab'
}
</script>