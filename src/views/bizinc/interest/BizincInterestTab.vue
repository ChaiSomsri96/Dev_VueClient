<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincInterest'}" active-class="active">이자배당소득 입력</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincInterestQuery'}" active-class="active">이자배당소득 조회</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincInterestReport'}" active-class="active">이자배당소득 출력</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-interest-tab'
    }
</script>