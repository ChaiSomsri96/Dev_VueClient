<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincTaxReport'}" active-class="active">지급명세서</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincTaxSimpleReport'}" active-class="active">간이지급명세서</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-tax-report-tab'
    }
</script>