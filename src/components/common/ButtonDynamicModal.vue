<template>
<section class="button-dynamic-modal">
    <button :class="classAttr" @click="isModalButtonTrigger = !isModalButtonTrigger" data-toggle="modal" :data-target="modalId" data-backdrop="static">{{ title }}</button>
    <slot :is-modal-button-trigger="isModalButtonTrigger"  />
</section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        classAttr: {
            type: String
        },
        modalId: {
            type: String
        }
    },
    data() {
        return {
            isModalButtonTrigger: false
        }
    }
}
</script>
