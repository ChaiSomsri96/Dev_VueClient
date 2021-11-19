<template>
<div class="grid-tool-bar">
    <h3>{{ title }}</h3>
    <div class="mb-10">
        <slot />
    </div>
</div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }    
}
</script>
<style lang="scss" scoped>
.grid-tool-bar {
    h3 {
        margin-left: 15px;
        line-height: 32px;
    }
}
</style>