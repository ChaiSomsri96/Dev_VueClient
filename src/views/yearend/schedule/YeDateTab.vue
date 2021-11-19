<template>
    <div class="contents_article">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{name: 'YeDate'}" active-class="active">정산년도 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'YeResultTaxDate'}" active-class="active">분납일자 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'YeSettleSchedule'}" active-class="active">임직원 공제신청 일정 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'YeReceiptOpen'}" active-class="active">임직원 근로소득영수증 조회 관리</router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: 'ye-date-tab'
}
</script>