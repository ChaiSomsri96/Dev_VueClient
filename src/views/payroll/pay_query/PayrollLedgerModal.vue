<template>
<base-modal title="급여대장 조회" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
        <div class="row">
          <button class="btn btn-md" @click="downloadRealGridExcel('급여대장 조회');">
            <i class="icon-lineIcon-download mr-5"></i>다운로드
          </button>
        </div>
        <div class="row" style="height: 500px;">
            <div id="payroll-ledger-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
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
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [modal, grid],
    components: {
        BaseModal
    },
    data() {
        return {
            fields: [],
            columns: [],
        }
    },
    methods: {
        async loadGridData(__param) {
            try {
                this.fields = [];
                this.columns = [];
                let { data } = await this.$httpPost({
                    url: '/payroll/payrollqry/monthly-horizon/list',
                    param: {    
                        formData: JSON.stringify({
                            "EID_LIST":null,    
                            "PAY_MONTH_FROM":"201906",
                            "PAY_MONTH_TO":null,
                            "PAY_GAAP":"1",
                            "REPORT_SEQ":String(__param.formData.reportSeq),
                            "SORTBY":"EMP_NUMBER",
                            "EMPTYPE_CD":null,
                            "PAYTYPE_CD":null,
                            "JOBGROUP_CD":null,
                            "RANK_CD":null,
                            "POSITION_CD":null,
                            "BP_CODE":null,
                            "HRDEPT_CODE":null,
                            "MODIFY_TYPE":null,
                            "ZEROSUPP":"YES",
                            "RTYPE": __param.formData.rtype,
                            "PERSONAL_INFO_MASK": __param.formData.personalInfoMask,
                            "RPT_LANG": __param.formData.rptLang,
                            "EMP_SEL":"ALL"}),
                        paymonthseqList: JSON.stringify(__param.paymonthseqList),
                        eidList: '[]'
                    }
                });
                // console.log("grid columns ===>", data.columns);
                for(let i = 0; i < data.columns.length; i ++)    {
                    this.fields.push({
                        fieldName: data.columns[i]['FIELD_NAME'],
                        dataType: (data.columns[i]['PROPERTY1'] == 'PAY_CD' ? 'number' : 'text')
                    });
                    if(data.columns[i]['PROPERTY1'] == 'PAY_CD') {
                        this.columns.push({
                            header: data.columns[i]['DESCRIPTION'],
                            fieldName: data.columns[i]['FIELD_NAME'],
                            numberFormat: "#,##0", styleName: "right-column",
                            footer: {
                                text: "0",
                                expression: "sum",
                                numberFormat: "#,##0",
                            }
                        });
                    }
                    else {
                        this.columns.push({
                            header: data.columns[i]['DESCRIPTION'],
                            fieldName: data.columns[i]['FIELD_NAME']
                        });
                    }
                }
                this.setFieldsNColumns();
                this.setRealgridData(data.rows || []);
            }
            catch(e) {
                console.log("PaycheckReportModal loadGridData error", e);   
            }
        },
        //modal
        createDynamicComponent() {
            this.createGridFrame({
                'domId': 'payroll-ledger-modal-grid'
            });
        },
        asyncDynamicComponentData(param) {
            this.loadGridData(param);
        }
    }
}
</script>