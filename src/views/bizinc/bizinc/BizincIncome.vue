<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'사업소득 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-tab></bizinc-tab>
            <border-box width="260" v-slot="slotProps">
                <border-box-item title="사업장" :width="slotProps.width">
                    <ui-dropdown :items="searchOptionData.BIZUNIT_CODE.items"
                                 :value="searchOptionData.BIZUNIT_CODE.value"
                                 @change="searchOptionData.BIZUNIT_CODE.value=$event.value;"
                                 :options="{
                                     valueField  : 'BP_CODE',
                                     labelField  : 'DV_NAME',
                                     tooltipField: 'DV_NAME'}"/>
                </border-box-item>
                <border-box-item title="소득자" :width="slotProps.width">
                    <ui-dropdown :items="searchOptionData.EARNER_CODE.items"
                                 :value="searchOptionData.EARNER_CODE.value"
                                 @change="searchOptionData.EARNER_CODE.value=$event.value;"
                                 :options="{
                                           valueField  : 'EARNER_CODE',
                                           labelField  : 'EARNER_NAME',
                                           tooltipField: 'EARNER_NAME'}"/>
                </border-box-item>
                <border-box-item title="귀속월" :width="slotProps.width" multi>
                    <ui-month-picker v-model="searchOptionData.PAY_PER_START.value" />
                    <span>~</span>
                    <ui-month-picker v-model="searchOptionData.PAY_PER_END.value" />
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <button-panel
                    btnType="top"
                    v-bind:download=true
                    v-bind:add=true
                    v-bind:upload=true
                    v-on:add="openBizincInput"
                    v-on:click="doUpload"
                    v-on:download="downloadRealGridExcel" >
            </button-panel>
            <div>
                <div id="bizinc-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--사업소득 입력-->
            <bizinc-input-modal ref="bizincInputModal" @loadGridData="loadGridData"/>
        </div>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import grid from '@/mixin/payroll-grid';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincTab from "./BizincTab"
    import BizincInputModal from './BizincInputModal';

    export default {
        mixins: [grid],
        components: {
            BizincTab,
            ButtonPanel,
            UiMonthPicker,
            BorderBox,
            BorderBoxItem,
            BizincInputModal
        },
        data() {
            return {
                searchOptionData: {
                    EARNER_CODE: {
                        value: '',
                        items: []
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        items: []
                    },
                    PAY_PER_START: {
                        value: this.getCurrentMonth()
                    },
                    PAY_PER_END: {
                        value: this.getCurrentMonth()
                    }
                },
                fields: [
                    {fieldName: 'EARNER_NAME', dataType: 'text'},
                    {fieldName: 'BIZUNIT_CODE', dataType: 'text'},
                    {fieldName: 'BIZ_TYPE_NAME', dataType: 'text'},
                    {fieldName: 'PAY_PER', dataType: "datetime", datetimeFormat: "yyyyMM"},
                    {fieldName: 'PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
                    {fieldName: 'PAY_AMOUNT', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'SUM_TAX', dataType: 'number'},
                    {fieldName: 'TOTAL', dataType: 'number'},
                    {fieldName: 'REMARK', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE'},
                    {fieldName: 'ACTION_DEL'},
                ],
                columns: [
                    {fieldName: 'EARNER_NAME', header: '소득자', width: 100, styleName: "left-column"},
                    {fieldName: 'BIZUNIT_CODE', header: '사업장', width: 100, styleName: "left-column"},
                    {fieldName: 'BIZ_TYPE_NAME', header: '업종구분', width: 100, styleName: "left-column"},
                    {fieldName: 'PAY_PER', header: '귀속월', width: 100, datetimeFormat: "yyyy.MM"},
                    {fieldName: 'PAY_DATE', header: '지급일', width: 100, datetimeFormat: "yyyy.MM.dd"},
                    {fieldName: 'PAY_AMOUNT', header: '지급총액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'TAX_RATE', header: '세율(%)', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0'},
                    {fieldName: 'INCOME_TAX', header: '소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'RESID_TAX', header: '지방소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    {fieldName: 'SUM_TAX', header: '합계', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'TOTAL', header: '순지급액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'REMARK', header: '비고', width: 100, styleName: "left-column"},
                    this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 100}),
                    this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
                ],
                rowAttrs: ['EARNER_CODE', 'EARNER_NAME', 'SEQ_NO', 'ATT_YEAR', 'BIZUNIT_CODE', 'BIZ_TYPE', 'PAY_MONTH', 'PAY_DATE', 'PAY_PER',
                    'PAY_AMOUNT', 'TAX_RATE', 'INCOME_TAX', 'RESID_TAX', 'SUM_TAX', 'TOTAL', 'REMARK', 'WARD_OFFICE', 'TAX_OFFICE']
            }
        },
        methods: {
            openBizincInput: function(data = {}) {
                this.$refs.bizincInputModal.show(data);
            },

            deleteBizinc: function(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPost({
                        param: {
                            SEQ_NO: data.SEQ_NO,
                            ATT_YEAR: data.ATT_YEAR
                        },
                        url: '/bizinc/biz-income/deleteBizIncome',
                        callback: function() {
                            me.toastSuccessDelete();
                            me.loadGridData();
                        }
                    });
                });
            },

            initGridHandler: function() {
                const me = this;
                this.gridView.onCellItemClicked = function(grid, index) {
                    grid.commit();
                    let rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow)[0];
                    if(index.column.fieldName === 'ACTION_DEL') {
                        me.deleteBizinc(rowData);
                        return;
                    }

                    if(index.column.fieldName === 'ACTION_UPDATE') {
                        me.openBizincInput({OPEN_TYPE: 'UPDATE', ...rowData});
                        return;
                    }
                }
            },

            getSearchOptionData: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.searchOptionData);
                keys.forEach((key) => {
                    params[key] = me.searchOptionData[key].value;
                });

                return params;
            },

            async loadGridData() {
                try {
                    const {data} = await this.$httpPostBody({
                        url: '/bizinc/biz-income/getBizIncomeList',
                        param: this.getSearchOptionData()
                    });

                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
                }
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            async loadDropdownData() {
                // 신고관리 사업장
                this.searchOptionData.BIZUNIT_CODE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });

                // 소득자 구분
                this.searchOptionData.EARNER_CODE.items  = await this.getDropdownData({
                    url: '/earner/selectResidencePersonal',
                    params: {}
                });
            },

            doUpload: function() {

            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-grid',
                autoLoad: false,
            });

            this.initGridHandler();

            this.loadDropdownData();

            this.loadGridData();
        }
    }
</script>