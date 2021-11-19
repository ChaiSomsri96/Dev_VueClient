<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'기타소득 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-other-tab></bizinc-other-tab>
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
                    v-on:add="openOtherincInput"
                    v-on:download="downloadRealGridExcel"
                    v-on:click="doUpload">
            </button-panel>
            <div>
                <div id="other-inc-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--기타소득 입력-->
            <bizinc-other-input-modal ref="bizincOtherInputModal" @loadGridData="loadGridData"/>
            <!--서화 골동품-->
            <bizinc-other-curios-modal ref="bizincOtherCuriosModal"/>
        </div>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import BizincOtherInputModal from './BizincOtherInputModal';
    import BizincOtherCuriosModal from './BizincOtherCuriosModal';
    import grid from '@/mixin/payroll-grid';
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincOtherTab from './BizincOtherTab';

    export default {
        mixins: [grid],
        components: {
            BizincOtherTab,
            ButtonPanel,
            BorderBox,
            UiMonthPicker,
            BorderBoxItem,
            BizincOtherInputModal,
            BizincOtherCuriosModal
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
                    {fieldName: 'INCOME_TYPE', dataType: 'text'},
                    {fieldName: 'INCOME_TYPE_NAME', dataType: 'text'},
                    {fieldName: 'PAY_PER', dataType: "datetime", datetimeFormat: "yyyyMM"},
                    {fieldName: 'PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
                    {fieldName: 'PAY_AMOUNT', dataType: 'number'},
                    {fieldName: 'EXPENSE', dataType: 'number'},
                    {fieldName: 'AMT', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'AGRO_TAX', dataType: 'number'},
                    {fieldName: 'REMARK', dataType: 'text'},
                    {fieldName: 'ACTION_CURIOS', dataType: 'text'},
                    {fieldName: 'ACTION_DEL', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE', dataType: 'text'},
                    {fieldName: 'HOLDING_PERIOD', dataType: 'text'},
                    {fieldName: 'EXPRATE', dataType: 'number'}
                ],
                columns: [
                    { fieldName: 'EARNER_NAME', header: '소득자', width: 100, styleName: "left-column"},
                    { fieldName: 'INCOME_TYPE_NAME', header: '소득구분', width: 100, styleName: "left-column"},
                    { fieldName: 'PAY_PER', header: '귀속월', width: 100, datetimeFormat: "yyyy.MM"},
                    { fieldName: 'PAY_DATE', header: '지급일', width: 100, datetimeFormat: "yyyy.MM.dd"},
                    { fieldName: 'PAY_AMOUNT', header: '지급총액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'EXPENSE', header: '필요경비', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'AMT', header: '소득금액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'TAX_RATE', header: '세율(%)', width: 100, styleName: "right-column"},
                    { fieldName: 'INCOME_TAX', header: '소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'RESID_TAX', header: '지방소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'AGRO_TAX', header: '농특세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'REMARK', header: '비고', width: 100, styleName: "left-column"},
                    this.getUpdateColumn({
                        headerText: '서화명세',
                        fieldName: 'ACTION_CURIOS',
                        columnWidth: 100,
                        renderer: {
                            type: 'html',
                            callback: function(grid, cell, w, h) {
                                let incomeType = grid.getJsonRows()[cell.index.dataRow].INCOME_TYPE;
                                if( incomeType !== '64') {
                                    return ''
                                }

                                return `<span class="td-icon">
                                           <button type="button" class="btn btn-s flat solid btn-down">
                                              <i name="down" class="icon-solidIcon-edit"><span class="blind">update</span></i>
                                          </button>
                                      </span>`;
                            }
                        }
                    }),
                    this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 100}),
                    this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
                ],
                rowAttrs: ['EARNER_CODE', 'EARNER_NAME', 'EARNER_RRN', 'BIZUNIT_CODE', 'INCOME_TYPE', 'PAY_PER', 'PAY_MONTH', 'PAY_DATE', 'PAY_AMOUNT', 'EXPENSE', 'AMT', 'TAX_RATE',
                    'INCOME_TAX', 'RESID_TAX', 'AGRO_TAX', 'REMARK', 'SEQ_NO', 'ATT_YEAR', 'HOLDING_PERIOD', 'EXPRATE', 'PAY_PER', 'TAX_OFFICE', 'WARD_OFFICE',]
            }
        },
        methods: {
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
                        url: '/bizinc/ext-income/getExtIncome',
                        param: this.getSearchOptionData()
                    })

                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
                }
            },

            openOtherincInput: function( data = {}) {
                this.$refs.bizincOtherInputModal.show(data);
            },

            initGridHandler: function() {
                const me = this;
                this.gridView.onCellItemClicked = function(grid, index) {
                    grid.commit();
                    let rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow)[0];
                    if(index.column.fieldName === 'ACTION_DEL') {
                        me.deleteOtherInc( rowData);
                        return;
                    }

                    if(index.column.fieldName === 'ACTION_UPDATE') {
                        me.openOtherincInput({OPEN_TYPE: 'UPDATE', ...rowData});
                        return;
                    }

                    if(index.column.fieldName === 'ACTION_CURIOS') {
                        me.openOtherCuriosModal( rowData);
                        return;
                    }
                }
            },

            openOtherCuriosModal: function(data) {
                if( data.INCOME_TYPE !== '64') {
                    this.toast({message: '소득구분이 서화,골동품 등 양도소득이 아닙니다.', type: 'error'})
                    return;
                }
                this.$refs.bizincOtherCuriosModal.show({
                    PAY_DATE: data.PAY_DATE,
                    EXTRA_SEQ_NO: data.SEQ_NO,
                    EXTRA_ATT_YEAR: data.ATT_YEAR,
                    EARNER_NAME: data.EARNER_NAME,
                    EARNER_RRN: data.EARNER_RRN
                });
            },

            deleteOtherInc: function(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPostBody({
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
                    url: '/earner/selectResidencePersonal',
                    params: {}
                });
            },

            doUpload: function() {

            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'other-inc-grid',
                autoLoad: false
            });

            this.initGridHandler();

            this.loadDropdownData();

            this.loadGridData();
        }
    }
</script>