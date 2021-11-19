<template>
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="현직장" :to="{name: 'CurrentWork'}" />
            <base-tabs-item label="전직장1" :to="{name: 'PrevWork'}" />
        </base-tabs>
        <div>
            <div class="row mb-10 align-items-center">
                <h2>전직장1 (독일안경) 소득명세</h2>
                <button class="btn btn-md line-1 ml-50" @click="addIncomeItem()">
                    + 추가
                </button>
              <evidence-button :step="step" />
            </div>
            <div>
                <div id="prev-work-income-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';

import grid from '@/mixin/payroll-grid';
import EvidenceButton from "../../../components/yearend/settle/EvidenceButton";

const rows = [
    {
        "TYPE": "과세급여",
        "ITEM": "급여",
        "AMOUNT": "20,000,000"
    },
    {
        "TYPE": "과세급여",
        "ITEM": "상여",
        "AMOUNT": "5,000,000",
    },
    {
        "TYPE": "과세급여",
        "ITEM": "합계",
        "AMOUNT": "25,000,000",
    }
];

export default {
    mixins: [grid],
    components: {
      EvidenceButton,
        BaseTabs,
        BaseTabsItem
    },
    data() {
        return {
            // grid
            fields: [
                { fieldName: 'TYPE', dataType: 'text' }, 
                { fieldName: 'ITEM', dataType: 'text' }, 
                { fieldName: 'AMOUNT', dataType: 'text' },
                { fieldName: 'METHOD', dataType: 'text' }
            ],
            columns: [
                { fieldName: 'TYPE', header: '종류', width: 150, styleName: 'left-column' }, 
                { fieldName: 'ITEM', header: '항목', width: 400, styleName: 'left-column' }, 
                { fieldName: 'AMOUNT', header: '금액', width: 200, styleName: 'right-column' },
                { fieldName: 'METHOD', header: "조작", width: 100, type: 'staticButton', buttonLabel: '삭제' }
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
                console.error("YeIncome PrevWork loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
        },
        addIncomeItem() {

        },
        addEvidence() {
        
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'prev-work-income-grid'});
        this.asyncData();
        this.loadGridData();
    }
}
</script>