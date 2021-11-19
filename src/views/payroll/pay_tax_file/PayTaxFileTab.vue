<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'EarnedIncomeSource'}" active-class="active">근로소득원천징수부</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'IncomeTaxSource'}" active-class="active">소득세원천징수확인서</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'pay-tax-file-tab'
    }
</script>