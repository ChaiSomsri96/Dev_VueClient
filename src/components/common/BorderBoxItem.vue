<template>
<div v-if="!button" class="toolbar-group input-group type-divide ml-10"
    :style="{width: itemWidth + 'px'}">
    <div class="divide-left">
        <span class="input-group-addon title" >{{ title }}</span>
    </div>
    <div v-if="label" class="divide-right label-container">
            <slot />
    </div>
    <div v-else-if="monthPicker" class="divide-right month-picker-container">
        <div class="input-group" v-if="multi">
            <div class="multi-element-line">
                <slot />
            </div>
        </div>
        <div class="input-group" v-else>
            <slot />
        </div>
    </div>
    <div v-else class="divide-right" :class="{'radio-container': radio}">
        <div class="input-group" v-if="multi">
            <div class="multi-element-line">
                <slot />
            </div>
        </div>
        <div class="input-group" v-else>
            <slot />
        </div>
    </div>
</div>
<div v-else class="ml-10 payroll-button">
    <slot />
</div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        multi: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '260'
        },
        button: {
            type: Boolean,
            default: false
        },
        radio: {
            type: Boolean,
            default: false
        },
        label: {
            type: Boolean,
            default: false
        },
        monthPicker: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        itemWidth() {
            if(!this.multi)
                return this.width;
            else
                return String(parseInt(this.width) * 2 + 10);
        }
    }
}
</script>
<style lang="scss" scoped>
.toolbar-group {
    padding-top: 10px;
}
.payroll-button {
    padding-top: 10px;
}
.multi-element-line {
    display: flex;
    align-items: center;
}
.toolbar-group {
    .form-control[readonly] {
        background-color: #fbfbfb;
        color: #222;
        cursor: default;
        -webkit-box-shadow: 0 0 0 2px transparent inset, 0 0 0 1px #aaa inset;
        box-shadow: 0 0 0 2px transparent inset, 0 0 0 1px #aaa inset;
    }
}
</style>