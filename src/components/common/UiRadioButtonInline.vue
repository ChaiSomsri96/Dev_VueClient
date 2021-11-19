<template>
<div class="ui-radio-button-line" :class="{'vertical-align': vertical}">
    <label 
    v-for="(item, index) in cOptions.domOptList"
    :key="index"
    class="md-check"
    :style="[vertical && index > 0 ? { marginTop: '13px' } : {},
                {marginRight: margin+'px'}]">
        <input type="radio" :name="cOptions.name" :value="item.value" class="blind"
        :checked="item.value == cOptions.value" @change="check($event)">
        <i class="black"></i>{{ item.label }}
    </label>
</div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: null
        }, 
        margin: {
            type: Number
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cOptions: function cOptions() {
            let defaultOptions = {
                name: 'ui-radio-name',
                value:  '',
                domOptList: []
                /*
                domOptList: [{ value: 'thisYear', label: '당년정산', id: 'radio-this-year' },
                { value: 'lastYear', label: '전년정산', id: 'radio-last-year' }] */
            };
            return this.$mergeProp(defaultOptions, this.options);
        }
    },
    methods: {
        check($event) {
            for(let i = 0; i < this.cOptions.domOptList.length; i ++) {
                if(this.cOptions.domOptList[i]['value'] == $event.target.value) {
                    this.$emit('change', {name: this.cOptions.name , ...this.cOptions.domOptList[i]});
                    break;
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.vertical-align {
    display: flex;
    flex-direction: column;
}
</style>
