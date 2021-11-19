<template>
<div class="pay-query-tab">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <router-link :to="{name: 'PayrollLedger'}" active-class="active">급여대장 조회</router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'SalaryHistory'}" active-class="active">급여이력 조회</router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'TaxLedger'}" active-class="active">세무대장 조회</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'PaySpecification'}" active-class="active">급여명세서 조회</router-link>
        </li>
    </ul>
</div>
</template>