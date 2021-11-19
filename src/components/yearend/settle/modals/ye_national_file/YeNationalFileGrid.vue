<template>
    <div>
        <grid-title :title="title" />
        <div>
            <div :id="gridId" class="realgrid-type-style" style="width: 100%; height: 300px"></div>
        </div>
    </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import yeNationalFileGridData from '@/utils/yeNationalFileGridData';
import GridTitle from '@/components/common/GridTitle';

export default {
    mixins: [grid],
    components: {
        GridTitle
    },
    props: {
        gridId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            fields: [],
            columns: [],
            title: ''
        }
    },
    methods: {
    },
    mounted() {
        this.fields = yeNationalFileGridData[this.name]['fields'];
        this.columns = yeNationalFileGridData[this.name]['columns'];
        this.title = yeNationalFileGridData[this.name]['title'];
        this.createRealGrid({'domId': this.gridId});
    }
}
</script>