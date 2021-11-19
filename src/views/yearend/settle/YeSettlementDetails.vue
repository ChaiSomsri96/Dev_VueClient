<template>
    <div>
        <div class="row">
            <grid-title title="정산내역">
                <button class="btn btn-md flat" @click="downloadRealGridExcel('정산내역')"><i class="icon-lineIcon-download mr-5"></i>
                    다운로드
                </button>
            </grid-title>
        </div>
        <div>
            <div id="settle-detail-grid" class="realgrid-type-style" style="height: 500px"></div>
        </div>
    </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import { mapGetters } from 'vuex';
export default {
    mixins: [grid],
    components: {
        GridTitle
    },
    computed: {
        ...mapGetters({
            eid: 'yearend/getEid',
            attYear: 'yearend/getAttYear',
            payday: 'yearend/getPayday'
        })
    },
    data() {
        return {
            // grid
            fields: [
                { fieldName: 'TAX_CODE', dataType: 'text' }, 
                { fieldName: 'TAX_CODE_NAME', dataType: 'text' }, 
                { fieldName: 'AMOUNT', dataType: 'number' }, 
                { fieldName: 'REF_AMOUNT', dataType: 'number' }, 
                { fieldName: 'BASE_AMOUNT', dataType: 'number' }, 
                { fieldName: 'APPL_AMOUNT', dataType: 'number' }, 
                { fieldName: 'HEAD_COUNT', dataType: 'number' },
                { fieldName: 'APPL_TXT', dataType: 'text' },
                { fieldName: 'REF_DATE', dataType: 'text' }
            ],
            columns: [
                { fieldName: 'TAX_CODE', header: '코드' },
                { fieldName: 'TAX_CODE_NAME', header: '코드명' },
                { fieldName: 'AMOUNT', header: '공제액', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'REF_AMOUNT', header: '조정전 공제액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'BASE_AMOUNT', header: '공제대상액', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'APPL_AMOUNT', header: '신청액', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'HEAD_COUNT', header: '인원수', nanText: '0' },
                { fieldName: 'APPL_TXT', header: '참고' },
                { fieldName: 'REF_DATE', header: '참조일자' }
            ]
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpPost({
                    url: '/year-end/employee/deduction/request/next-step-data',
                    param: {
                        'EID': 1491, //this.eid,
                        'ATT_YEAR': this.attYear,
                        'CURRENT_STEP': 'FINAL_TAX',
                        'PAYDAY': this.payday
                    }
                });
                this.setRealgridData(data.list || []);
            } catch(e) {
                console.error("SettlementDetails loadGridData err: ", e);
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'settle-detail-grid'});
        this.loadGridData();
    }
}
</script>
