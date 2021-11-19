<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincNonResid'}" active-class="active">비거주자소득 입력</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincNonResidQuery'}" active-class="active">비거주자소득 조회</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincNonResidReport'}" active-class="active">비거주자소득 출력</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-non-resid-tab'
    }
</script>