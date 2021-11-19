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
                    v-on:download="downloadRealGridExcel">
                <template v-slot:start>
                    <button class="btn btn-md mr-5" @click="openReportModal">
                        <i class="icon-lineIcon-check mr-5"></i>
                        발급
                    </button>
                </template>
            </button-panel>
            <div>
                <div id="bizinc-non-resid-report-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import grid from '@/mixin/payroll-grid';
    import BizincNonResidTab from "./BizincNonResidTab"
    import ButtonPanel from "@/components/common/ButtonPanel";
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';

    export default {
        mixins: [grid],
        name: 'bizinc-non-resid-report',
        components: {
            BizincNonResidTab,
            ButtonPanel,
            UiMonthPicker,
            BorderBox,
            BorderBoxItem
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
                    {fieldName: 'DV_NAM', dataType: 'text'},
                    {fieldName: 'INC_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_NAM', dataType: 'text'},
                    {fieldName: 'EARNER_VAT_ID', dataType: 'text'},
                    {fieldName: 'BIZUNIT_CODE', dataType: 'text'},
                    {fieldName: 'BIZ_TYPE', dataType: 'text'},
                    {fieldName: 'PAY_MONTH', dataType: "datetime", datetimeFormat: "yyyyMM"},
                    {fieldName: 'PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
                    {fieldName: 'PAY_AMOUNT', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'RATE_INCL_LTAX', dataType: 'text'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'CORP_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'AGRO_TAX', dataType: 'number'},
                    {fieldName: 'TAX_MEMO', dataType: 'text'},
                    {fieldName: 'REMARK', dataType: 'text'},
                ],
                columns: [
                    {fieldName: 'DV_NAM', header: '사업장', width: 100, styleName: "left-column"},
                    { fieldName: 'INC_TYPE', header: '소득구분', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_NAM', header: '소득자', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_VAT_ID', header: '주민(사업자)등록번호', width: 100, styleName: "left-column"},
                    {fieldName: 'PAY_MONTH', header: '귀속월', width: 100, datetimeFormat: "yyyy.MM"},
                    {fieldName: 'PAY_DATE', header: '지급일', width: 100, datetimeFormat: "yyyy.MM.dd"},
                    {fieldName: 'PAY_AMOUNT', header: '지급총액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'TAX_RATE', header: '세율(%)', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0'},
                    { fieldName: 'RATE_INCL_LTAX', header: '지방소득세 포함', columnWidth: 100, styleName: "left-column"},
                    {fieldName: 'INCOME_TAX', header: '소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'CORP_TAX', header: '법인세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'RESID_TAX', header: '지방소득세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'AGRO_TAX', header: '농특세', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    { fieldName: 'TAX_MEMO', header: '세액감면 및 제한세율근거', width: 150, styleName: "left-column"},
                    {fieldName: 'REMARK', header: '비고', width: 100, styleName: "left-column"},
                ]
            }
        },
        methods: {
            async loadGridData() {
                try {
                    const {data} = await this.$httpGet('/bizinc/nonresibiz-income/selectEarnerNonResiBizIncome', this.getFormDataData())
                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
                }
            },

            openReportModal: function() {
                let checkedRows = this.gridView.getCheckedRows();
                if(checkedRows.length < 1) {
                    this.toastAlertSelect()
                    return;
                }
                const me = this;
                let checkDataList = [];
                checkedRows.forEach((row) => {
                    let rowData = me.dataProvider.getJsonRow(row);
                    checkDataList.push({EARNER_CODE: rowData['EARNER_CODE'], BIZUNIT_CODE: rowData['BIZUNIT_CODE']});
                });

                this.$refs.bizincReportModal.show({EARNER_CODE_LIST: checkDataList});
            },

            getFormDataData: function() {
                let params = {};
                let keys = Object.keys(this.searchOptionData);
                keys.forEach((key) => {
                    params[key] = this.searchOptionData[key].value;
                });

                return params;
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
            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-non-resid-report-grid',
                autoLoad: false
            });

            this.loadDropdownData();

            this.loadGridData();
        }
    }
</script>