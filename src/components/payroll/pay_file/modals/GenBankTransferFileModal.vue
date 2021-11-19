<template>
<base-modal title="은행이체파일" id="gen-bank-transfer-file-modal" :scroll="false" width="1380">
    <template v-slot:body>
        <div class="row" style="height: 500px;">
            <div id="genBankTransferFileModalGrid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>창닫기
            </button>
            <button class="btn btn-md black" @click="downloadRealGridExcel('은행이체파일');">
                <i class="icon-lineIcon-del mr-5"></i>다운로드
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
                let {data} = await this.$httpPostBody({
                    url: '/payroll/salaryqry/banktr/list',
                    param: {
                        "CONTROL_NO": "100K",
                        "DOUBLE_QUOTE": __param['DOUBLE_QUOTE'],
                        "RPT_LANG": __param['RPT_LANG'],
                        "paymonthseqList": __param['paymonthseqList']
                    }
                });

                for(let i = 0; i < data.columns.length; i ++)    {
                    this.fields.push({
                        fieldName: data.columns[i]['SELECTED_ITEM'],
                        dataType: (data.columns[i]['SELECTED_ITEM'] == 'PAY_SUM' ? 'number' : 'text')           
                    });
                    if(data.columns[i]['SELECTED_ITEM'] == 'PAY_SUM') {
                        this.columns.push({
                            header: data.columns[i]['CODE_NAM'],
                            fieldName: data.columns[i]['SELECTED_ITEM'],
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
                            header: data.columns[i]['CODE_NAM'],
                            fieldName: data.columns[i]['SELECTED_ITEM']
                        });    
                    }
                }
                this.setFieldsNColumns();
                this.setRealgridData(data.rows || []);
                this.gridView.groupBy(["BANK_CD"]);
            }
            catch(e)    {
                console.log("GenBankTransferFileModal loadGridData error", e);       
            }
        },
         //modal
        createDynamicComponent() {
            this.createGridFrame({
                'domId': 'genBankTransferFileModalGrid'
            });
        },
        asyncDynamicComponentData(param) {
            this.loadGridData(param);
        }
    }
}
</script>