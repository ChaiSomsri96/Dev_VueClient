<template>
    <base-modal title="이월액입력" id="foreign-monthly-rent-modal" :scroll="false" width="1000">
        <template v-slot:body>
            <table-form :colgroup="['15%', 'auto', '15%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="발생연도"
                        :has-error="errors.APPL_YEAR && errors.APPL_YEAR != ''" />
                        <table-form-item :error-msg="errors.APPL_YEAR">
                            <ui-input :value="monthlyAmount.APPL_YEAR" @change="monthlyAmount.APPL_YEAR=$event;"/>
                        </table-form-item>
                        <table-form-label label="국외원천소득" />
                        <table-form-item>
                            <ui-input-number :value="monthlyAmount.FOREIGN_SOURCE_INCOME"
                            @change="monthlyAmount.FOREIGN_SOURCE_INCOME=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="납세액" />
                        <table-form-item>
                            <ui-input-number :value="monthlyAmount.FOREIGN_TAX_AMT_LC"
                            @change="monthlyAmount.FOREIGN_TAX_AMT_LC=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                        </table-form-item>
                        <table-form-label label="기공제액" />
                        <table-form-item>
                            <ui-input-number :value="monthlyAmount.FOREIGN_TAX_CREDIT"
                            @change="monthlyAmount.FOREIGN_TAX_CREDIT=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                        </table-form-item>
                    </tr>
                </template>
                <template v-slot:footer>
                    <button class="btn btn-md mr-3" data-dismiss="modal" aria-label="Close">
                        <i class="icon-lineIcon-close mr-5"></i>취소
                    </button>
                    <button class="btn btn-md black mr-3" @click="onSave">
                        <i class="icon-lineIcon-check mr-5"></i>저장
                    </button>
                </template>
            </table-form>
            <div class="row mt-20">
                <div id="foreigntax-month-modal-grid" style="width: 100%; height: 300px" class="realgrid-type-style"></div>
            </div>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import { mapGetters } from 'vuex';

const foreignTaxParam = {
   "APPL_YEAR": "",
   "EID": 0,
   "FOREIGN_SOURCE_INCOME": 0,
   "FOREIGN_TAX_AMT_LC": 0,
   "FOREIGN_TAX_BALANCE": 0,
   "FOREIGN_TAX_CREDIT": 0,
   "INP_FLAG": "M",
   "INPUT_DATE": "",
   "PAYDAY": "",
   "YES_ID": 0
};

export default {
    mixins: [grid, modal],
    components: {
        BaseModal,
        TableForm,
        TableFormItem,
        TableFormLabel
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
            errors: {},
            monthlyAmount: {},
            mountParam: {},
            // grid
            fields: [
                { fieldName: 'APPL_YEAR', dataType: 'text' }, 
                { fieldName: 'FOREIGN_SOURCE_INCOME', dataType: 'number' }, 
                { fieldName: 'FOREIGN_TAX_AMT_LC', dataType: 'number' }, 
                { fieldName: 'FOREIGN_TAX_CREDIT', dataType: 'number' }, 
                { fieldName: 'FOREIGN_TAX_BALANCE', dataType: 'number' }
            ],
            columns: [
                { fieldName: 'APPL_YEAR', header: '발생연도' },
                { fieldName: 'FOREIGN_SOURCE_INCOME', header: '국외원천소득',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0' },
                { fieldName: 'FOREIGN_TAX_AMT_LC', header: '납세액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0' },
                { fieldName: 'FOREIGN_TAX_CREDIT', header: '기공제액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'FOREIGN_TAX_BALANCE', header: '미공제액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                 }
            ],
            rowAttrs: ['APPL_YEAR', 'FOREIGN_SOURCE_INCOME', 'FOREIGN_TAX_AMT_LC', 'FOREIGN_TAX_BALANCE', 'FOREIGN_TAX_CREDIT',
                        'INPUT_DATE', 'YES_ID']
        }
    },
    methods: {
        resetParameter() {
            this.mountParam = foreignTaxParam;
        },
        resetComponent() {
            this.errors = {};
            this.monthlyAmount = {
                APPL_YEAR: '', //발생연도
                FOREIGN_SOURCE_INCOME: '', //국외원천소득
                FOREIGN_TAX_AMT_LC: '', //납세액
                FOREIGN_TAX_CREDIT: '' //기공제액
            };
            this.resetParameter();
        },
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/year-end/employee/fortax/carry/list', {
                    EID: this.eid,
                    ATT_YEAR: this.attYear,
                    PAYDAY: this.payday,
                    APPL_PAYDAY: this.payday
                }) || [];
                this.setRealgridData(data || []);
            } catch(e) {
                console.log("ForeignTax loadGridData error", e);   
            }
        },
        addRealGridOption() {
            this.gridView.setStateBar({ visible: false });
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onItemChecked = function(grid, itemIndex, checked) {
                if(checked) {
                    let _rowData = me.dataProvider.getJsonRow(itemIndex);    
                    me.mountParam = {...foreignTaxParam, ..._rowData['ROW_ATTRS']};
                    me.monthlyAmount.APPL_YEAR = _rowData['ROW_ATTRS']['APPL_YEAR'];
                    me.monthlyAmount.FOREIGN_SOURCE_INCOME = _rowData['ROW_ATTRS']['FOREIGN_SOURCE_INCOME'];
                    me.monthlyAmount.FOREIGN_TAX_AMT_LC = _rowData['ROW_ATTRS']['FOREIGN_TAX_AMT_LC'];
                    me.monthlyAmount.FOREIGN_TAX_CREDIT = _rowData['ROW_ATTRS']['FOREIGN_TAX_CREDIT'];
                }
            }
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({
                'domId': 'foreigntax-month-modal-grid',
                'checkbar': 'single'
            });
        },
        asyncDynamicComponentData(param) {
            this.errors = {};
            this.resetParameter();
            this.loadGridData(param);
        },
        //
        getParameter() {
            let _params = {
                ...this.mountParam,
                "APPL_YEAR": this.monthlyAmount.APPL_YEAR,
                "EID": this.eid,
                "FOREIGN_SOURCE_INCOME": this.monthlyAmount.FOREIGN_SOURCE_INCOME,
                "FOREIGN_TAX_AMT_LC": this.monthlyAmount.FOREIGN_TAX_AMT_LC,
                "FOREIGN_TAX_BALANCE": this.monthlyAmount.FOREIGN_TAX_BALANCE,
                "FOREIGN_TAX_CREDIT": this.monthlyAmount.FOREIGN_TAX_CREDIT,
                "PAYDAY": this.monthlyAmount.payday
            };
            return _params;
        },
        validationProcess() {
            let hasError = false;
            this.errors = {};
            if(this.payrollUtil.isEmpty(this.monthlyAmount.APPL_YEAR)) {
                hasError = true;
                this.errors.APPL_YEAR = '발생연도를 입력해 주세요.';
            }
            if(hasError)
                return false;
            return true;
        },
        async onSave() {
            let me = this;
            if(!this.validationProcess()) 
                return;
            let _params = this.getParameter();
            try {
                await this.$httpPostBody({
                    url: "/year-end/employee/fortax/carry/save",
                    param: {
                        "ATT_YEAR": this.attYear,
                         "list": [
                            _params
                        ]
                    },
                    callback: function() {
                        me.toastSuccessSave();
                    }
                });
                this.resetComponent();
                this.loadGridData();
            }
            catch(e) {
                console.error('ForeignTaxMonthModal onSave Error: ', e);
            }
        },
        onDelete() {
            let me = this;
            this.confirm({
                title: '확인',
                message: '정말 삭제하시겠습니까?',
                yesCallback: async function() {
                    if(!me.validationProcess()) 
                        return;
                    let _params = me.getParameter();
                    try {
                        await me.$httpPostBody({
                            url: "/year-end/employee/fortax/carry/delete",
                            param: {
                                "ATT_YEAR": me.attYear,
                                "list": [
                                    _params
                                ]
                            },
                            callback: function() {
                                me.toastSuccessDelete();
                                me.loadGridData();
                            }
                        });
                        me.resetComponent();
                    }
                    catch(e) {
                        console.error('MedicalExpenseModal onDelete Error: ', e);
                    }
                }
            });
        }
    },
    created() {
        this.resetComponent();
    },
}
</script>