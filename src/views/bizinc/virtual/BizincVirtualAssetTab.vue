<template>
    <div class="contents_article">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{name: 'BizincVirtualAsset'}" active-class="active">가상자산소득 입력</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincVirtualAssetQuery'}" active-class="active">가상자산소득 조회</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'BizincVirtualAssetReport'}" active-class="active">가상자산소득 출력</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'bizinc-virtual-asset-tab'
    }
</script>