<template>
<ui-dropdown
    :items="mastcode.items"
    :value="cValue"
    :options="cOptions"
    @change="mastcodeChange"
/>
</template>
<script>
export default {
    props: {
        options: {
            type: Object,
            default: null
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        cValue() {
            return this.value;
        },
        cOptions: function cOptions() {
            return this.$mergeProp(this.defaultOptions, this.options);
        }
    },
    data() {
        return {
            mastcode: {
                items: []   
            },
            defaultOptions: {
                valueField: 'REAL_CODE',
                labelField: 'CODE_NAME',
                tooltipField: 'CODE_NAME',
                superCode: 'AA'       
            }
        }
    },
    methods: {
        async loadMastcodeList() {
            try {
                const { data } = await this.$httpGet('/system/setting/mastcode/list-all', 
                { SUPER_CODE: this.cOptions['superCode'], INACTIVE: 'N' }) || [];
                if(Array.isArray(data) && data.length > 0) {
                    if(this.cOptions['valueField'] == this.defaultOptions['valueField']
                    && this.cOptions['labelField'] == this.defaultOptions['labelField']
                    && this.cOptions['tooltipField'] == this.defaultOptions['tooltipField']) {
                        this.mastcode.items = data;
                    }
                    else {
                        for(let i = 0; i < data.length; i ++) {
                            let _items = {};
                            _items[this.cOptions['valueField']] = data[i]['REAL_CODE'];
                            _items[this.cOptions['labelField']] = data[i]['CODE_NAME'];
                            _items[this.cOptions['tooltipField']] = data[i]['CODE_NAME'];
                            this.mastcode.items.push(_items);
                        }
                    }
                }
            }
            catch(e) {
                console.error("MastcodeList err: ", e);
            }
        },
        mastcodeChange($event) {
            this.$emit('change', $event);
            this.$emit('input', $event.value);
        }
    },
    mounted() {
        this.loadMastcodeList();
    },
}
</script>
