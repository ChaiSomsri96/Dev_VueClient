<template>
    <td :colspan="colspan">
        <div class="td-box">
            <div class="has-danger">
                <div class="input-group">
                    <slot />
                </div>
                <h5 class="mt-5" v-if="errorMsg != ''">{{ errorMsg }}</h5>
            </div>
        </div>
    </td>
</template>
<script>
export default {
    props: {
        colspan: {
            type: String,
            default: ''
        },
        errorMsg: {
            type: String,
            default: ''
        },
    }
}
</script>
