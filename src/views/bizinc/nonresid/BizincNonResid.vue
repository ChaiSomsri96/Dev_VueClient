<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'비거주자소득 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-non-resid-tab></bizinc-non-resid-tab>
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
                    v-on:add="openNonResidInput"
                    v-on:download="downloadRealGridExcel"
                    v-on:click="doUpload" >
            </button-panel>
            <div>
                <div id="non-resid-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--비거주자소득 입력-->
            <bizinc-non-resid-input-modal ref="bizincNonResidInputModal" @loadGridData="loadGridData"/>
        </div>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import grid from '@/mixin/payroll-grid';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincNonResidTab from './BizincNonResidTab';
    import BizincNonResidInputModal from './BizincNonResidInputModal';
    import UiMonthPicker from '@/components/common/UiMonthPicker';

    export default {
        mixins: [grid],
        components: {
            ButtonPanel,
            BorderBox,
            BorderBoxItem,
            BizincNonResidTab,
            UiMonthPicker,
            BizincNonResidInputModal
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
                    {fieldName: 'INC_TYPE_NAME', dataType: 'text'},
                    {fieldName: 'PAY_PER', dataType: "datetime", datetimeFormat: "yyyyMM"},
                    {fieldName: 'PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
                    {fieldName: 'PAY_AMOUNT', dataType: 'number'},
                    {fieldName: 'EXPENSE', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'RATE_INCL_LTAX', dataType: 'text'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'CORP_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'AGRO_TAX', dataType: 'number'},
                    {fieldName: 'TAX_MEMO', dataType: 'text'},
                    {fieldName: 'REMARK', dataType: 'text'},
                    {fieldName: 'ACTION_DEL', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE', dataType: 'text'}
                ],
                columns: [
                    { fieldName: 'EARNER_NAME', header: '소득자', width: 100, styleName: "left-column"},
                    { fieldName: 'INC_TYPE_NAME', header: '소득구분', width: 100, styleName: "left-column"},
                    { fieldName: 'PAY_PER', header: '귀속월', width: 100},
                    { fieldName: 'PAY_DATE', header: '지급일', width: 100, datetimeFormat: "yyyy.MM.dd"},
                    { fieldName: 'PAY_AMOUNT', header: '지급총액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'EXPENSE', header: '필요경비', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'TAX_RATE', header: '세율(%)', width: 100, styleName: "right-column"},
                    { fieldName: 'RATE_INCL_LTAX', header: '지방소득세 포함', columnWidth: 100, styleName: "right-column", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'INCOME_TAX', header: '소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'CORP_TAX', header: '법인세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'RESID_TAX', header: '지방소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'AGRO_TAX', header: '농특세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0"}
                    },
                    { fieldName: 'TAX_MEMO', header: '세액감면 및 제한세율근거', width: 150, styleName: "left-column"},
                    { fieldName: 'REMARK', header: '비고', width: 150, styleName: "left-column"},
                    this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 100}),
                    this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
                ],
                rowAttrs: ['EARNER_CODE', 'EARNER_NAME', 'EARNER_REG_TYPE', 'BIZUNIT_CODE', 'INC_TYPE', 'PAY_MONTH', 'PAY_DATE',
                    'PAY_AMOUNT', 'EXPENSE', 'TAX_RATE', 'RATE_INCL_LTAX', 'INCOME_TAX', 'CORP_TAX', 'RESID_TAX', 'AGRO_TAX',
                    'TAX_MEMO', 'REMARK', 'SEQ_NO', 'ATT_YEAR', 'PAY_PER', 'TAX_OFFICE', 'WARD_OFFICE']
            }
        },
        methods: {
            async loadGridData() {
                try {
                    const {data} = await this.$httpPostBody({
                        url: '/bizinc/nonresibiz-income/getNonResiBizIncome',
                        param: this.getSearchOptionData()
                    });

                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
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

            initGridHandler: function() {
                const me = this;
                this.gridView.onCellItemClicked = function(grid, index) {
                    grid.commit();
                    let rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow)[0];
                    if(index.column.fieldName === 'ACTION_DEL') {
                        me.deleteNonResid( rowData);
                        return;
                    }

                    if(index.column.fieldName === 'ACTION_UPDATE') {
                        me.openNonResidInput({OPEN_TYPE: 'UPDATE', ...rowData});
                        return;
                    }
                }
            },

            openNonResidInput: function(data = {}) {
                this.$refs.bizincNonResidInputModal.show(data);
            },

            deleteNonResid: function(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPost({
                        param: data,
                        url: '/bizinc/nonresibiz-income/deleteNonResiBizIncome',
                        callback: function() {
                            me.toastSuccessDelete();
                            me.loadGridData()
                        }
                    })
                });
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
                    url: '/earner/selectNonResidencePersonal',
                    params: {}
                });
            },

            doUpload: function() {

            }
        },

        mounted() {
            this.createRealGrid({
                'domId': 'non-resid-grid',
                autoLoad: false
            });

            this.initGridHandler();

            this.loadDropdownData();

            this.loadGridData();

        }
    }
</script>