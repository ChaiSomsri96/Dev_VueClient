<template>
<base-modal title="급여월 선택" :id="id" :scroll="false" width="700">
    <template v-slot:body>
        <div class="row" style="height: 400px;">
            <div :id="id + '-grid'" style="width: 100%; height: 400px"></div>
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
import grid from '@/mixin/payroll-grid';
import modal from '@/mixin/modal';
import BaseModal from '@/components/common/BaseModal';
export default {
    mixins: [modal, grid],    
    components: {
        BaseModal
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            // grid
            type: 1,
            fields: [
                { fieldName: 'PAY_MONTH',  dataType: 'text' }, 
                { fieldName: 'SEQ',     dataType: 'text' }, 
                { fieldName: 'PAY_DATE', dataType: 'text' }, 
                { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' }
            ],
            columns: [
                { fieldName: 'PAY_MONTH', header: '급여월', width: 100 }, 
                { fieldName: 'SEQ', header: '차수', width: 30 }, 
                { fieldName: 'PAY_DATE', header: '급여일', width: 120 }, 
                { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 200, styleName: 'left-column' }
            ]   
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpPost({
                    param: {
                        'PAY_MONTH_FROM': '',
                        'PAY_MONTH_TO': ''
                    },
                    url: '/payroll/code/pay-date/list'
                });
                this.setRealgridData(data.list || []);   
            }
            catch(e) {
                console.error("PayMonthSelectModal loadGridData err: ", e);           
            }
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({
                'domId': this.id + '-grid',
                'gridParent': 'modal'
            });       
            this.loadGridData();
        },
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
            this.gridView.setStateBar({ visible: false });
            this.gridView.setCheckBar({ exclusive: true });
        },
        realgridCreatedCallback()   {
            let me = this;
            this.gridView.onItemChecked = function (grid, itemIndex, checked) {
                let _rowData = me.dataProvider.getJsonRow(itemIndex);
                me.$emit('change', {payMonth: _rowData['PAY_MONTH'], payMonthSeq: _rowData['SEQ'],payDate:_rowData['PAY_DATE']});
            }
        }
    }
}
</script>