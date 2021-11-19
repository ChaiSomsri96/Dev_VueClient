<template>
    <base-modal title="이월액입력" id="donation-month-modal" :scroll="false" width="1200">
        <template v-slot:body>
            <table-form :colgroup="['15%', 'auto', '15%', 'auto', '15%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="기부연도" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="monthAmount.DONA_YEAR.items"
                                :value="monthAmount.DONA_YEAR.value"
                                @change="monthAmount.DONA_YEAR.value=$event.value; monthAmount.DONA_YEAR.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                disabled: disabledCheck}" 
                            />
                        </table-form-item>
                        <table-form-label label="기부금종류" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="monthAmount.DONA_TYPE.items"
                                :value="monthAmount.DONA_TYPE.value"
                                @change="monthAmount.DONA_TYPE.value=$event.value; monthAmount.DONA_TYPE.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                disabled: disabledCheck}" 
                            />
                        </table-form-item>
                        <table-form-label label="기부금액" />
                        <table-form-item>
                            <ui-input-number 
                            v-if="!disabledCheck"
                            :value="monthAmount.DONA_AMOUNT"
                            @change="monthAmount.DONA_AMOUNT=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                            <input v-else type="text" class="form-control" readonly :value="monthAmount.DONA_AMOUNT" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="전년까지 공제된 금액" />
                        <table-form-item>
                            <ui-input-number 
                            v-if="!disabledCheck"
                            :value="monthAmount.PREV_DED"
                            @change="monthAmount.PREV_DED=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                            <input v-else type="text" class="form-control" readonly :value="monthAmount.PREV_DED" />
                        </table-form-item>
                        <table-form-label label="당년 종소신고시 추가된 기부금" />
                        <table-form-item>
                            <ui-input-number :value="monthAmount.DONA_AMT_PTR"
                            @change="monthAmount.DONA_AMT_PTR=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                        </table-form-item>
                        <table-form-label label="당년 종소신고시 추가된 공제액" />
                        <table-form-item>
                            <ui-input-number :value="monthAmount.CURR_DEDUCT"
                            @change="monthAmount.CURR_DEDUCT=$event;"
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
                    <button class="btn btn-md mr-3" @click="onDelete" :disabled="disabledCheck">
                        <i class="icon-lineIcon-minus mr-5"></i>삭제
                    </button>
                    <button class="btn btn-md flat mr-3" @click="onReset">
                        <i class="icon-lineIcon-refresh mr-5"></i>초기화
                    </button>
                </template>
            </table-form>
            <div class="row mt-20">
                <div id="donation-month-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
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
import { originFlagRenderer, donaTypeRenderer } from '@/utils/yearendCodes';
import { mapGetters } from 'vuex';

const donationMonthParam = {
    "EID": 0,
    "ATT_YEAR": "",
    "DONA_YEAR": "",
    "INPUT_YEAR": "",
    "DONA_TYPE": "10",
    "ORIGIN_FLAG": "C",
    "CARRY_EXPIRED": 0,
    "DED_TARGET": 0,
    "OPER_ID": "19SJSJ",
    "DONA_AMT_PTR": 0,
    "PREV_DED": 0,
    "DONA_AMOUNT": 0,
    "PAYDAY": "",
    "CARRY_FORWARD": 0,
    "ENTITY_CODE": "BBK",
    "INP_FLAG": "M",
    "CURR_DEDUCT": 0,
};

export default {
    mixins: [modal, grid],
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
        }),
        disabledCheck() {
            return this.monthAmount.ORIGIN_FLAG == 'P'
        }
    },
    data() {
        return {
            monthAmount: {},
            fields: [
                { fieldName: 'ORIGIN_FLAG', dataType: 'text' ,
                    valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                        return originFlagRenderer(values[fieldNames.indexOf("ORIGIN_FLAG")]);
                    } 
                },
                { fieldName: 'DONA_YEAR', dataType: 'text' },
                { fieldName: 'DONA_TYPE', dataType: 'text',
                    valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                        return donaTypeRenderer(values[fieldNames.indexOf("DONA_TYPE")]);
                    } 
                },
                { fieldName: 'DONA_AMOUNT', dataType: 'number' },
                { fieldName: 'DONA_AMT_PTR', dataType: 'number' },
                { fieldName: 'PREV_DED', dataType: 'number' },
                { fieldName: 'COMP_DEDUCT', dataType: 'number' },
                { fieldName: 'COMP_TAX_RETURN_AMT', dataType: 'number' },
                { fieldName: 'CARRY_EXPIRED', dataType: 'number' },
                { fieldName: 'DED_TARGET', dataType: 'number' },
            ],
            columns: [
                { fieldName: 'ORIGIN_FLAG', header: '데이터 원천' },
                { fieldName: 'DONA_YEAR', header: '기부연도' },
                { fieldName: 'DONA_TYPE', header: '기부금 종류', width: 180 },
                { fieldName: 'DONA_AMOUNT', header: '기부금액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'DONA_AMT_PTR', header: {text:'종소신고로\n추가된\n기부금',
                styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'PREV_DED', header: '기 공제액', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'COMP_DEDUCT', header: {text: '종소신고로\n추가된 공제액\n(직전년이전)',
                styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'COMP_TAX_RETURN_AMT', header: {text: '종소신고로\n추가된 공제액\n(직전년)',
                styleName: 'multi-line-css-header'},
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'CARRY_EXPIRED', header: '소멸된 금액', 
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                },
                { fieldName: 'DED_TARGET', header: '이월금액',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0'
                }
            ],
            rowAttrs: ['DONA_YEAR', 'DONA_TYPE', 'ORIGIN_FLAG', 'DONA_AMOUNT', 'PREV_DED', 'DONA_AMT_PTR', 'CURR_DEDUCT']
        }
    },
    methods: {
        resetComponent() {
            this.monthAmount = {
                ORIGIN_FLAG: 'C',
                DONA_YEAR: {
                    value: String(new Date().getFullYear() - 1),
                    return: null,
                    items: this.getDonaYearList()
                },
                DONA_TYPE: {
                    value: '10',
                    return: null,
                    items: [
                        { message: '10-법정기부금', code: '10' },
                        { message: '20-정치자금기부금', code: '20' },
                        { message: '40-종교단체외 지정기부금', code: '40' },
                        { message: '41-종교단체 지정기부금', code: '41' },
                        { message: '42-우리사주조함 기부금', code: '42' },
                        { message: '50-기타기부금(불공제)', code: '50' },
                    ]
                },
                DONA_AMOUNT: '',  //기부금액
                PREV_DED: '',    //전년까지 공제된 금액
                DONA_AMT_PTR: '',  //당년 종소신고시 추가된 기부금
                CURR_DEDUCT: ''  //당년 종소신고시 추가된 공제액
            };
        },
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/year-end/employee/donation/history', {
                        'EID': 1491, //this.eid,
                        'PAYDAY': '20201301',
                        'BEFORE_DONA_YEAR': '2020'
                });
                this.setRealgridData(data || []);
            } catch(e) {
                console.log("DonationMonthModal loadGridData error", e);   
            }
        },
        addRealGridOption() {
            this.gridView.header.height = 70;
            this.gridView.setStateBar({ visible: false });
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onItemChecked = function(grid, itemIndex, checked) {
                if(checked) {
                    let _rowData = me.dataProvider.getJsonRow(itemIndex);
                    me.monthAmount.DONA_YEAR.value = _rowData['ROW_ATTRS']['DONA_YEAR'];
                    me.monthAmount.DONA_TYPE.value = _rowData['ROW_ATTRS']['DONA_TYPE'];
                    me.monthAmount.DONA_AMOUNT = _rowData['ROW_ATTRS']['DONA_AMOUNT'] == null ? '' : _rowData['ROW_ATTRS']['DONA_AMOUNT'];
                    me.monthAmount.PREV_DED = _rowData['ROW_ATTRS']['PREV_DED'] == null ? '' : _rowData['ROW_ATTRS']['PREV_DED'];
                    me.monthAmount.DONA_AMT_PTR = _rowData['ROW_ATTRS']['DONA_AMT_PTR'] == null ? '' : _rowData['ROW_ATTRS']['DONA_AMT_PTR'];
                    me.monthAmount.CURR_DEDUCT = _rowData['ROW_ATTRS']['CURR_DEDUCT'] == null ? '' : _rowData['ROW_ATTRS']['CURR_DEDUCT'];
                    me.monthAmount.ORIGIN_FLAG = _rowData['ROW_ATTRS']['ORIGIN_FLAG'];
                }      
            }
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({
                'domId': 'donation-month-modal-grid',
                'checkbar': 'single'
            });
        },
        asyncDynamicComponentData(param) {
            this.loadGridData();
        },

        getParameter() {
            let _params = {
                ...donationMonthParam,
                'EID': this.eid,
                'ATT_YEAR': this.attYear,
                'PAYDAY': this.payday,
                'DONA_YEAR': this.monthAmount.DONA_YEAR.value,
                'INPUT_YEAR': this.attYear,
                'DONA_TYPE': this.monthAmount.DONA_TYPE.value,
                'ORIGIN_FLAG': this.monthAmount.ORIGIN_FLAG,
                'DONA_AMOUNT': this.monthAmount.DONA_AMOUNT,
                'PREV_DED': this.monthAmount.PREV_DED,
                'DONA_AMT_PTR': this.monthAmount.DONA_AMT_PTR,
                'CURR_DEDUCT': this.monthAmount.CURR_DEDUCT
            }
            return _params;
        },
        //이월액 팝업 저장
        async onSave() {
            let me = this;
            let _params = this.getParameter();
            try {
                await this.$httpPostBody({
                    url: "/year-end/employee/donation/save",
                    param: _params,
                    callback: function() {
                        me.toastSuccessSave();
                    }
                });
                this.resetComponent();
                this.loadGridData();
            }
            catch(e) {
                console.error('DonationMonthModal onSave Error: ', e);
            }
        },
        //이월액 팝업 삭제
        onDelete() {
            let me = this;
            this.confirm({
                title: '확인',
                message: '정말 삭제하시겠습니까?',
                yesCallback: async function() {
                    let _params = me.getParameter();
                    try {
                        await me.$httpPostBody({
                            url: "/year-end/employee/donation/delete",
                            param: _params,
                            callback: function() {
                                me.toastSuccessDelete();
                                me.loadGridData();
                            }
                        });
                        me.resetComponent();
                    }
                    catch(e) {
                        console.error('DonationMonthModal onDelete Error: ', e);
                    }
                }
            });
        },
        onReset() {}
    },
    created() {
        this.resetComponent();
    },
}
</script>