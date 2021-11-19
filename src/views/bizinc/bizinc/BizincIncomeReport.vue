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
                <div id="bizinc-income-report-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>

            <!--출력 팝업-->
            <bizinc-report-modal ref="bizincReportModal"/>
        </div>
    </div>
</template>
<script>
    import grid from '@/mixin/payroll-grid';
    import BizincTab from './BizincTab';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import BizincReportModal from '../common/BizincReportModal';
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';

    export default {
        mixins: [grid],
        name: 'bizinc-income-report',
        components: {
            BizincTab,
            ButtonPanel,
            UiMonthPicker,
            BizincReportModal,
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
                    {fieldName: 'EARNER_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_NAME', dataType: 'text'},
                    {fieldName: 'SEQ_NO', dataType: 'text'},
                    {fieldName: 'ATT_YEAR', dataType: 'text'},
                    {fieldName: 'BIZUNIT_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_RRN', dataType: 'text'},
                    {fieldName: 'EARNER_REG_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_NATIONALITY', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_CN', dataType: 'text'},
                ],
                columns: [
                    {fieldName: 'EARNER_CODE', header: '관리번호', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_NAME', header: '이름', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_REG_TYPE', header: '소득자 구분', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_RRN', header: '주민등록번호', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_RESID_TYPE', header: '거주구분', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_NATIONALITY', header: '내외국인', styleName: "left-column"},
                    {fieldName: 'EARNER_RESID_CN', header: '거주국', styleName: "left-column"},
                    {fieldName: 'BIZUNIT_CODE', header: '사업장', width: 100, styleName: "left-column"},
                ]
            }
        },
        methods: {
            async loadGridData() {
                try {
                    const {data} = await this.$httpGet( '/bizinc/biz-income/selectEarnerBizIncome', {
                        ATT_YEAR: '2021'
                    });

                    this.setRealgridData(data || []);
                } catch( e) {
                    console.log( e);
                }
            },

            addRealGridOption() {
                this.gridView.checkBar.visible = true;
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
            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-income-report-grid',
                autoLoad: false
            });

            this.loadDropdownData();

            this.loadGridData();
        }
    }
</script>