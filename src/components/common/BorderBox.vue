<template>
<div class="box border-box type2">
    <div class="toolbar-box row" :class="{ 'search-wrap' : search }">
        <slot :width="width" />
    </div>
</div>
</template>
<script>
export default {
    props: {
        width: {
            type: String,
            default: '260'
        },
        search: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.toolbar-box {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
}
</style>