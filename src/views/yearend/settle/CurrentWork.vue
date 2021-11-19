<template>
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="현직장" :to="{name: 'CurrentWork'}" />
            <base-tabs-item label="전직장1" :to="{name: 'PrevWork'}" />
        </base-tabs>
        <div>
            <h2 class="mb-10">현직장 소득명세</h2>
            <div>
                <div id="current-work-income-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';

import grid from '@/mixin/payroll-grid';

const rows = [
    {
        "TYPE": "과세급여",
        "ITEM": "급여",
        "AMOUNT": "55,000,000"
    },
    {
        "TYPE": "과세급여",
        "ITEM": "상여",
        "AMOUNT": "25,000,000",
    },
    {
        "TYPE": "과세급여",
        "ITEM": "합계",
        "AMOUNT": "80,000,000",
    }
];

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem
    },
    data() {
        return {
            // grid
            fields: [
                { fieldName: 'TYPE', dataType: 'text' }, 
                { fieldName: 'ITEM', dataType: 'text' }, 
                { fieldName: 'AMOUNT', dataType: 'text' }
            ],
            columns: [
                { fieldName: 'TYPE', header: '종류', width: 150, styleName: 'left-column' }, 
                { fieldName: 'ITEM', header: '항목', width: 400, styleName: 'left-column' }, 
                { fieldName: 'AMOUNT', header: '금액', width: 200, styleName: 'right-column' }
            ]
        }
    },
    methods: {
        async asyncData() {
        },
        async loadGridData() {
            try {
                this.setRealgridData(rows);
            } catch(e) {
                console.error("YeIncome CurrentWork loadGridData err: ", e);
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'current-work-income-grid'});
        this.asyncData();
        this.loadGridData();
    }
}
</script>