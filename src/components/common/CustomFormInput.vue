<template>
<div class="input-group">
    <input type="text" maxlength="100" :placeholder="placeholder"
           autocomplete="off" class="form-control ellipsis" @keyup.enter="submit" />
</div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        submit($event) {
            this.$emit('return', $event.target.value);
        }
    }
}
</script>
