<template>
<base-modal title="급여 및 공제내역 가로보기" id="pay-query-modal" :scroll="false" width="1380">
    <template v-slot:body>
        <div class="row">
          <div class="form-row">
            <button-panel
                btnType='top'
                v-bind:download=true
                v-on:download="downloadRealGridExcel"
            />
          </div>
        </div>
        <div class="row">
          <div class="row" style="height: 400px;">
            <div id="pay-query-modal-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
          </div>
        </div>

    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>창닫기
            </button>
        </div>
    </template>
</base-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "@/components/common/ButtonPanel";
export default {
    mixins: [modal, grid],
    components: {
        BaseModal,
      ButtonPanel
    },
    data() {
        return {
            fields: [{
                    fieldName: "PAY_MONTH",
                    dataType: 'text'
                },
                {
                    fieldName: "SEQ",
                    dataType: 'text'
                },
                {
                    fieldName: "EMP_NUMBER",
                    dataType: 'text'
                },
                {
                    fieldName: "EMPNAM_MASK",
                    dataType: 'text'
                },
                {
                    fieldName: "HRDEPT_NAM",
                    dataType: 'text'
                },
                {
                    fieldName: "RANK_NAM",
                    dataType: 'text'
                },
                {
                    fieldName: "E_JOIN_DATE",
                    dataType: 'text'
                },
                {
                    fieldName: "RETIRE_DATE",
                    dataType: 'text'
                },
                {
                    fieldName: "1000-기본급",
                    dataType: 'number'
                },
                {
                    fieldName: "1005-직책수당",
                    dataType: 'number'
                },
                {
                    fieldName: "1010-직무발명보상금",
                    dataType: 'number'
                },
                {
                    fieldName: "ZZ96-지급총액",
                    dataType: 'number'
                },
                {
                    fieldName: "ZZ97-공제총액",
                    dataType: 'number'
                },
                {
                    fieldName: "ZZ98-순지급액",
                    dataType: 'number'
                }
            ],
            columns: [{
                    header: "급여월",
                    fieldName: "PAY_MONTH",
                    width: 100
                },
                {
                    header: "차수",
                    fieldName: "SEQ",
                    width: 40
                },
                {
                    header: "사번",
                    fieldName: "EMP_NUMBER",
                    width: 100
                },
                {
                    header: "성명",
                    fieldName: "EMPNAM_MASK",
                    width: 100
                },
                {
                    header: "부서",
                    fieldName: "HRDEPT_NAM",
                    width: 100
                },
                {
                    header: "직급",
                    fieldName: "RANK_NAM",
                    width: 100
                },
                {
                    header: "입사일",
                    fieldName: "E_JOIN_DATE",
                    width: 100
                },
                {
                    header: "퇴사일",
                    fieldName: "RETIRE_DATE",
                    width: 100
                },
                {
                    header: "1000",
                    fieldName: "1000-기본급",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "right-column"
                },
                {
                    header: "1005",
                    fieldName: "1005-직책수당",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "right-column"
                },
                {
                    header: "1010",
                    fieldName: "1010-직무발명보상금",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "right-column"
                },
                {
                    header: "ZZ96-지급총액",
                    fieldName: "ZZ96-지급총액",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "grid-bold-column right-column"
                },
                {
                    header: "ZZ97-공제총액",
                    fieldName: "ZZ97-공제총액",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "grid-bold-column right-column"
                },
                {
                    header: "ZZ98-순지급액",
                    fieldName: "ZZ98-순지급액",
                    numberFormat: "#,##0",
                    width: 100,
                    footer: {
                        text: "0",
                        expression: "sum",
                        numberFormat: "#,##0",
                    },
                    styleName: "grid-bold-column right-column"
                }
            ],
            layout: [
                "PAY_MONTH",
                "SEQ",
                "EMP_NUMBER",
                "EMPNAM_MASK",
                "HRDEPT_NAM",
                "RANK_NAM",
                "E_JOIN_DATE",
                "RETIRE_DATE",
                {
                    name: "1000Group",
                    direction: "horizontal",
                    items: [
                        "1000-기본급"
                    ],
                    header: {
                        text: "기본급",
                    }
                },
                {
                    name: "1005Group",
                    direction: "horizontal",
                    items: [
                        "1005-직책수당"
                    ],
                    header: {
                        text: "직책.수당",
                    }
                },
                {
                    name: "1010Group",
                    direction: "horizontal",
                    items: [
                        "1010-직무발명보상금"
                    ],
                    header: {
                        text: "직무발명보상금",
                    }
                },
                "ZZ96-지급총액",
                "ZZ97-공제총액",
                "ZZ98-순지급액"
            ]
        }
    },
    computed: {
        ...mapGetters({
            payMonth: 'paymonth/getPayMonth' ,
            payMonthSeq: 'paymonth/getPayMonthSeq'
        })
    },
    methods: {
        async loadGridData(eidList = []) {
            try {
                let {
                    data
                } = await this.$httpPost({
                    url: '/payroll/salaryqry/payndeduct/list',
                    param: {
                        'formData': JSON.stringify({
                            "PAY_MONTH": this.payMonth,
                            "SEQ": this.payMonthSeq,
                            "PAY_GAAP": "1",
                            "SORTBY": "PIN",
                            "SELECT_PAYCODE": "ALL",
                            "MODIFY_TYPE": null,
                            "ACROSS": "LANDSCAPE",
                            "ZEROSUPP": "YES",
                            "PERSONAL_INFO_MASK": "N",
                            "RPT_LANG": "KOREAN",
                            "EMP_SEL": "SELECT"
                        }),
                        'paycdList': '[]',
                        'paymonthseqList': '[]',
                        'eidList': JSON.stringify(eidList)
                    }
                });
                this.setRealgridData(data || []);
            } catch (e) {
                console.log("PayQueryModal loadGridData error", e);
            }
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({
                'domId': 'pay-query-modal-grid',
                'gridParent': 'modal'
            });
        },
        asyncDynamicComponentData(param) {
            let eidList = [];
            if(Array.isArray(param.checkedMembers) && param.checkedMembers.length > 0) {
                for(let i = 0; i < param.checkedMembers.length; i ++)
                    eidList.push({ "EID": param.checkedMembers[i]['EMP_CD'] });
            }
            this.loadGridData(eidList);
        }
    },
}
</script>
<style lang="scss" scoped>

</style>