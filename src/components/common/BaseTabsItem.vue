<template>
<li class="nav-item">
    <router-link :to="to" active-class="active">{{ label }}</router-link>
</li>
</template>

<script>
export default {
    props: {
        to: {
            type: [Object, String],
            required: true
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>