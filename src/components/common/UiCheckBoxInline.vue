<template>
<div class="ui-check-box-line">
    <label 
    v-for="(item, index) in cOptions.domOptList"
    :key="index"
    class="md-check">
        <input type="checkbox"
               :name="cOptions.name"
               :value="item.value"
               @change="check($event)"
               :checked="checkedTest(item.value)"
               :disabled="cOptions.disabled"
        >
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
        }
    },
    data() {
        return {
            valueList: []
        }
    },
    computed: {
        cOptions: function cOptions() {
            let defaultOptions = {
                name: 'ui-checkbox-name',
                value: [],
                domOptList: []
            };
            return this.$mergeProp(defaultOptions, this.options);       
        }
    },
    methods: {
        checkedTest(val) {
            return this.cOptions.value.includes(val);
        },
        check($event) {
            if($event.target.checked) {
                this.valueList.push($event.target.value);
            }
            else {
                this.valueList.splice(this.valueList.indexOf($event.target.value), 1);
            }
            this.$emit('change', this.valueList);
        }
    },
    mounted() {
        this.valueList = this.options.value == null ? [] : this.options.value;
    }
}
</script>