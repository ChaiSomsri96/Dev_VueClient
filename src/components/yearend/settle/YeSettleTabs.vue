<template>
<div>
    <ul class="nav nav-pills settle-detail-tabs" style="margin-bottom: 20px;">
        <li
            v-for="(item, index) in tabs"
            :key="index"
            class="nav-item"
        >
            <router-link 
            v-if="item.params"
            :to="{name: item.name, params: item.params}" active-class="active" class="nav-link">{{ item.label }}</router-link>
            <router-link 
            v-else
            :to="{name: item.name}" active-class="active" class="nav-link">{{ item.label }}</router-link>
        </li>
    </ul>
    <div class="tab-container">
        <router-view :initialParam="initialParam" />
    </div>
</div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: function() {
                return [];
            }
        },
        initialParam: {
            type: Object,
            default: function() {
                return null;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.settle-detail-tabs {
    .nav-link {
        min-width:120px;
        text-align: center;
        background-color: #fbfbfb;
        border: 1px solid #e5e5e5;
    }
    .nav-link.active {
        background-color: #0275d8;
    }
}
</style>