<template>
<base-modal title="원천징수이행상황신고서 입력" id="wtr-input-modal" :scroll="false" width="1000">
    <template v-slot:body>
        <div class="form-area">
            <div class="row" style="height: 400px;">
                <div id="find-prevmonth-refund-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
            </div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md black" @click="confirm()">
                <i class="icon-lineIcon-check mr-5"></i>확인
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import BaseModal from '@/components/common/BaseModal';
export default {
    mixins: [modal, grid],
    components: {
        BaseModal,
    },    
    props: {
        businessList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        businessPlace() {
            let _businessPlace = {
                value: '', return: null, items: []
            };
            if(this.businessList.length > 0) {
                _businessPlace.value = this.businessList[0]['code'];
                for(let i = 0; i < this.businessList.length; i ++)
                    _businessPlace.items.push({
                        message: this.businessList[i]['code'] + ' - ' + this.businessList[i]['message'],
                        code: this.businessList[i]['code']
                    });
            }
            return _businessPlace;
        }
    },
    data() {
        return {
            // grid
            columns: [
                { fieldName: 'DV_NAME', header: '사업장' },
                { fieldName: 'PAY_MON', header: '귀속연월' },
                { fieldName: 'CASH_MON', header: '지급연월' },
                { fieldName: 'PER_MONTH', header: '주기' },
                { fieldName: 'DECLARE_DET', header: '신고종류' },
                { fieldName: 'REFUND_CARRY', header: '이월환급세액',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
            ],
            fields: [
                { fieldName: 'DV_NAME', dataType: 'text' },
                { fieldName: 'PAY_MON', dataType: 'text' },
                { fieldName: 'CASH_MON', dataType: 'text' },
                { fieldName: 'PER_MONTH', dataType: 'text',
                    valueCallback: function(prod, dataRow, fieldName, fieldNames, values)  {
                        return values[fieldNames.indexOf("PER_MONTH")] == 'Y' ? '매월' : '반기';
                    }
                },
                { fieldName: 'DECLARE_DET', dataType: 'text' },
                { fieldName: 'REFUND_CARRY', dataType: 'number' },
            ],
        }
    },
    methods: {
        //grid
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/withhold/income-tax/refund/list', {
                        DECLARE_ID: 273
                    }) || [];    
                this.setRealgridData(data);   
            }
            catch(err) {
                console.error("WtrInputModal err: ", err);
            }
        },
        addRealGridOption() {
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({ 
                'domId': 'find-prevmonth-refund-grid', 
                'checkbar': 'single'});
        },
        asyncDynamicComponentData() {
            this.loadGridData();
        },
        confirm() {
            let checkedRows = this.gridView.getCheckedRows();
            let _params = null;
            if(checkedRows.length > 0) {
                let _rowData = this.dataProvider.getJsonRow(checkedRows[0]);
                _params = {
                    'REFUND_CARRY': _rowData['REFUND_CARRY']
                };
            }
            this.close(_params);
        }
    }
}
</script>