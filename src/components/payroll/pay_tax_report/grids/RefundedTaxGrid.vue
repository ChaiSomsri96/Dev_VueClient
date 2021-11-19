<template>
<div>
    <div class="row">
        <grid-tool-bar title="환급세액 조정">
            <button class="btn btn-md flat" @click="findPrevMonthRefund()"><i class="icon-lineIcon-check mr-5"></i>
                전월미환급 찾기
            </button>
        </grid-tool-bar>
    </div>
    <div class="row">
        <div id="refunded-tax-grid" style="width: 100%; height: 200px" class="realgrid-type-style"></div>
    </div>
    <div class="tbl-bottom">
        <button type="button" class="btn btn-lg white"><i class="icon-lineIcon-close mr-5"></i>취소</button>
        <button type="button" class="btn btn-lg black ml-10"><i class="icon-lineIcon-check mr-5"></i>저장</button>
    </div>
</div>
</template>
<script>
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],
    components: {
        GridToolBar
    },
    data() {
        return {
            // grid
            fields: [
                { fieldName: 'UNREFUND_BAL', dataType: 'number' },
                { fieldName: 'APPLIED_BAL', dataType: 'number' },
                { fieldName: 'FIRST_BALANCE', dataType: 'number' },
                { fieldName: 'GEN_REFUND', dataType: 'number' },
                { fieldName: 'TRUST_REFUND', dataType: 'number' },
                { fieldName: 'OTHR_REFUND1', dataType: 'number' },
                { fieldName: 'OTHR_REFUND2', dataType: 'number' },
                { fieldName: 'SEC_BALANCE', dataType: 'number' },
                { fieldName: 'REFUND_USED', dataType: 'number' },
                { fieldName: 'REFUND_CARRY', dataType: 'number' },
                { fieldName: 'REFUND_APPLY', dataType: 'number' }, 
            ],
            columns: [
                { fieldName: 'UNREFUND_BAL', header: {text: '(12)전월미\n환급세액', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'APPLIED_BAL', header: {text: '(13)기환급\n신청세액', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'FIRST_BALANCE', header: {text: '(14)차감잔액\n(12-13)', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0', editable: false },
                { fieldName: 'GEN_REFUND', header: '(15)일반환급', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'TRUST_REFUND', header: {text: '(16)신탁재산\n(금융회사등)', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'OTHR_REFUND1', header: '금융회사등',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'OTHR_REFUND2', header: '합병등',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'SEC_BALANCE', header: {text: '(18) 조정대상\n환급세액\n(14+15+16+17)', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'REFUND_USED', header: {text: '(19) 당월조정\n환급세액계', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0' },
                { fieldName: 'REFUND_CARRY', header: {text: '(20) 차월이월\n환급세액\n(18-19)', styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0', editable: false },
                { fieldName: 'REFUND_APPLY', header: '(21) 환급신청액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    nanText: '0', editable: false }, // api response에 누락됨
            ],
            layout: [
                { 
                    name: 'PREV_Group', direction: "horizontal", 
                    items: [ "UNREFUND_BAL", "APPLIED_BAL", "FIRST_BALANCE" ],
                    header: { text: "전월미환급세액의 계산" }    
                },
                {
                    name: 'NOW_Group', direction: 'horizontal',
                    items: ['GEN_REFUND', 'TRUST_REFUND', 
                        {
                            name: 'EXTRA_Group', direction: 'horizontal',
                            items: ['OTHR_REFUND1', 'OTHR_REFUND2'],
                            header: { text: "(17)그밖의 환급세액" }
                        }
                    ],
                    header: { text: "당월발생환급세액" }
                }, 
                'SEC_BALANCE', 'REFUND_USED', 'REFUND_CARRY', 'REFUND_APPLY'
            ]
        }
    },
    methods: {
        addRealGridOption() {
            this.gridView.header.height = 100;
            this.gridView.setFooters({visible: false});
        },
        findPrevMonthRefund() {
            this.$emit('clickFindPrevMonthRefund');
        }
    },
}
</script>