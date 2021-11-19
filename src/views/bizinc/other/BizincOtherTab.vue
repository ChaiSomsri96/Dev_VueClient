<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincOtherInc'}" active-class="active">기타소득 입력</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincOtherQuery'}" active-class="active">기타소득 조회</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincOtherReport'}" active-class="active">기타소득 출력</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-other-tab'
    }
</script>