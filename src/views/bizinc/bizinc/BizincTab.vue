<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincIncome'}" active-class="active">사업소득 입력</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincIncomeQuery'}" active-class="active">사업소득 조회</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincIncomeReport'}" active-class="active">사업소득 출력</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-tab'
    }
</script>