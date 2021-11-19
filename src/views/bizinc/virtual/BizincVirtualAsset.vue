<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'비거주자 가상자산소득 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-virtual-asset-tab></bizinc-virtual-asset-tab>
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
                    <ui-month-picker v-model="searchOptionData.PAY_START_MONTH.value" />
                    <span>~</span>
                    <ui-month-picker v-model="searchOptionData.PAY_END_MONTH.value" />
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
                    v-on:add="openVitualAssetInput"
                    v-on:download="downloadRealGridExcel"
                    v-on:click="doUpload" >
            </button-panel>
            <div>
                <div id="virtual-asset-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--가상자산소득 입력-->
            <bizinc-virtual-asset-input-modal ref="bizincVirtualAssetInputModal" @loadGrid="loadGridData"/>
        </div>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import grid from '@/mixin/payroll-grid';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincVirtualAssetTab from './BizincVirtualAssetTab';
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import BizincVirtualAssetInputModal from './BizincVirtualAssetInputModal';

    export default {
        mixins: [grid],
        components: {
            ButtonPanel,
            BorderBox,
            BorderBoxItem,
            BizincVirtualAssetTab,
            UiMonthPicker,
            BizincVirtualAssetInputModal
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
                    PAY_START_MONTH: {
                        value: this.getFirstMonthOfTheYear()
                    },
                    PAY_END_MONTH: {
                        value: this.getCurrentMonth()
                    }
                },
                fields: [
                    {fieldName: 'EARNER_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_NAME', dataType: 'text'},
                    {fieldName: 'BIZUNIT_CODE', dataType: 'text'},
                    {fieldName: 'PAY_MONTH', dataType: "datetime", datetimeFormat: "yyyyMM"},
                    {fieldName: 'PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
                    {fieldName: 'TRANS_TYPE', dataType: 'text'},
                    {fieldName: 'ITEM_NAME', dataType: 'text'},
                    {fieldName: 'UNIT_PRICE', dataType: 'number'},
                    {fieldName: 'QUANTITY', dataType: 'number'},
                    {fieldName: 'REVENUE_AMOUNT', dataType: 'number'},
                    {fieldName: 'EXPENSE', dataType: 'number'},
                    {fieldName: 'INCOME_AMOUNT', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'CORP_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'REAL_NAME_FL', dataType: 'text'},
                    {fieldName: 'REMARK', dataType: 'text'},
                    {fieldName: 'ACTION_DEL', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE', dataType: 'text'},
                    {fieldName: 'SEQ_NO', dataType: 'text'},
                    {fieldName: 'ATT_YEAR', dataType: 'text'},
                    {fieldName: 'PAY_PER', dataType: 'text'},
                    {fieldName: 'TAX_OFFICE', dataType: 'text'},
                    {fieldName: 'WARD_OFFICE', dataType: 'text'}
                ],
                columns: [
                    { fieldName: 'EARNER_NAME', header: '소득자', width: 100, styleName: "left-column"},
                    { fieldName: 'PAY_MONTH', header: '귀속월', width: 100, datetimeFormat: "yyyy.MM"},
                    { fieldName: 'PAY_DATE', header: '양도일자', width: 100, datetimeFormat: "yyyy.MM.dd"},
                    { fieldName: 'TRANS_TYPE', header: '거래유형', width: 100, styleName: "left-column"},
                    { fieldName: 'ITEM_NAME', header: '종목명', width: 100, styleName: "left-column"},
                    { fieldName: 'UNIT_PRICE', header: '단가', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'QUANTITY', header: '수량', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'REVENUE_AMOUNT', header: '수익금액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'EXPENSE', header: '취득가액/경비', width: 110, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'INCOME_AMOUNT', header: '소득금액', width: 110, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'TAX_RATE', header: '세율(%)', width: 100, styleName: "right-column", nanText: '0'},
                    { fieldName: 'INCOME_TAX', header: '소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'CORP_TAX', header: '법인세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'RESID_TAX', header: '지방소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'REAL_NAME_FL', header: '실명구분', width: 100, styleName: "left-column"},
                    { fieldName: 'REMARK', header: '비고', width: 150, styleName: "left-column"},
                    this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 100}),
                    this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
                ]
            }
        },
        methods: {
            async loadGridData() {
                try {
                    const {data} = await this.$httpPostBody({
                        url: '/bizinc/nonresibiz-income/virtual-asset/list',
                        param: this.searchOptionData
                    })

                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
                }
            },

            initGridHandler: function() {
                const me = this;
                this.gridView.onCellClicked = function( grid, clickData) {
                    grid.commit();
                    if(clickData.column === 'ACTION_DEL') {
                        me.deleteVirtualAsset( me.dataProvider.getJsonRow(clickData.dataRow));
                        return;
                    }

                    if(clickData.column === 'ACTION_UPDATE') {
                        me.openVitualAssetInput({OPEN_TYPE: 'UPDATE', ...me.dataProvider.getJsonRow(clickData.dataRow)});
                        return;
                    }
                }
            },

            openVitualAssetInput: function(data = {}) {
                this.$refs.bizincVirtualAssetInputModal.show(data);
            },

            deleteVirtualAsset: function(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPost({
                        param: data,
                        url: '/bizinc/ext-income/deleteExtIncome',
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
                'domId': 'virtual-asset-grid',
                autoLoad: false
            });

            this.initGridHandler();

            this.loadDropdownData();

            this.loadGridData();
        }
    }
</script>