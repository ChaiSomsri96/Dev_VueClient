<template>
<div :class="classAttr">
    <div class="tbl-title" v-if="title != ''">
        <h3>{{ title }}</h3>
    </div>
    <div class="tbl-wrap type2" style="overflow: visible;">
        <table class="tbl tbl-type3 dropScroll"
        :style="[disabled ? {'color': '#aaa'} : {}]">
            <colgroup>
                <col v-for="(item, index) in colgroupStyles"
                :key="index" :style="item">
            </colgroup>
            <tbody>
                <slot name="body" />
            </tbody>
        </table>
    </div>
    <div class="footer-toolbar" v-if="!footerHide">
        <slot name="footer" />
    </div>
</div>
</template>
<script>
export default {
    props: {
        classAttr: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        colgroup: {
            type: Array,
            default: function() {
                return [];
            }
        },
        footerHide: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        disabled: {
            type: Boolean,
            default: function() {
                return false;
            }
        }
    },
    computed: {
        colgroupStyles() {
            let styles = [];
            if(!this.colgroup)
                return styles;
            for(let i = 0; i < this.colgroup.length; i ++)  {
                styles.push(`width: ${this.colgroup[i]}`);
            }
            return styles;
        }
    }
}
</script>
<style lang="scss" scoped>
table.tbl.tbl-type3 th {
  text-align: start;
}
</style>