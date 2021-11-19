<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'세무신고'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-tax-report-tab></bizinc-tax-report-tab>
            <border-box search>
                <border-box-item title="귀속연도">
                    <ui-dropdown :items="searchFormData.ATT_YEAR.items"
                                 :value="searchFormData.ATT_YEAR.value"
                                 @change="searchFormData.ATT_YEAR.value=$event.value;"
                                 :options="{
                                      valueField  : 'code',
                                      labelField  : 'message',
                                      tooltipField: 'message'}"/>
                </border-box-item>
                <border-box-item title="소득종류">
                    <ui-dropdown :items="searchFormData.FILE_TYPE.items"
                                 :value="searchFormData.FILE_TYPE.value"
                                 @change="searchFormData.FILE_TYPE.value=$event.value;"
                                 :options="{
                                      valueField  : 'code',
                                      labelField  : 'message',
                                      tooltipField: 'message'}"/>
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <button-panel btnType="top" >
                <template v-slot:start>
                    <button class="btn btn-md flat" @click="openBizincNtsReportModalByPreview">
                        <i class="icon-lineIcon-download mr-5"></i>
                        미리보기
                    </button>
                    <button class="btn btn-md flat" @click="openBizincNtsReportModalByPlain">
                        <i class="icon-lineIcon-download mr-5"></i>
                        평문 다운로드
                    </button>
                </template>
            </button-panel>
            <div>
                <div id="bizinc-tax-report-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
        </div>
        <bizinc-nts-report-modal ref="bizincNtsReportModal"/>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import BizincTaxReportTab from "./BizincTaxReportTab";
    import grid from '@/mixin/payroll-grid';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincNtsReportModal from '@/views/bizinc/common/BizincNtsReportModal';

    export default {
        mixins: [grid],
        components: {
            BizincTaxReportTab,
            BorderBox,
            BorderBoxItem,
            ButtonPanel,
            BizincNtsReportModal
        },
        data() {
            return {
                searchFormData: {
                    ATT_YEAR: {
                        value: String(new Date().getFullYear()),
                        items: this.getRecentYearList()
                    },
                    FILE_TYPE: {
                        value: 'BIZ',
                        items: [
                            {code: 'BIZ', message: '사업소득'},
                            {code: 'EXT', message: '기타소득'},
                            {code: 'DIVID', message: '이자배당'},
                            {code: 'NON', message: '비거주자 사업소득'},
                            {code: 'VIRUTAL', message: '가상자산소득'},
                        ]
                    }
                },
                fields: [
                    {fieldName: 'EARNER_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_NAME', dataType: 'text'},
                    {fieldName: 'EARNER_REG_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_TYPE', dataType: 'text'},
                    {fieldName: 'EARNER_NATIONALITY', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_CN', dataType: 'text'},
                    {fieldName: 'EARNER_WORK_SITE', dataType: 'text'},
                ],
                columns: [
                    {fieldName: 'EARNER_CODE', header: '관리번호'},
                    {fieldName: 'EARNER_NAME', header: '이름'},
                    {fieldName: 'EARNER_REG_TYPE', header: '소득자구분'},
                    {fieldName: 'EARNER_RESID_TYPE', header: '거주구분'},
                    {fieldName: 'EARNER_NATIONALITY', header: '내외국인'},
                    {fieldName: 'EARNER_RESID_CN', header: '거주국'},
                    {fieldName: 'EARNER_WORK_SITE', header: '관리사업장'},
                ]
            }
        },
        methods: {
            async loadGridData() {
                try {
                    let param = this.getSearchFormData();
                    const {data} = await this.$httpGet('/biz-income/nts-report/earner-list', param);
                    this.setRealgridData([
                        {EARNER_CODE: '00119', EARNER_NAME: '전수철'},
                        {EARNER_CODE: '001194', EARNER_NAME: '이순화'}
                    ]);
                } catch(e) {
                    console.error(e)
                }
            },

            getSearchFormData: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.searchFormData);
                keys.forEach((key) => {
                    params[key] = me.searchFormData[key].value;
                });

                return params;
            },

            openBizincNtsReportModalByPlain: function() {
                this.openBizincNtsReportModal('/biz-income/nts-report/plain');
            },

            openBizincNtsReportModalByPreview: function() {
                this.openBizincNtsReportModal('/biz-income/nts-report/preview');
            },

            openBizincNtsReportModal: function(url) {
                let checkedRows = this.gridView.getCheckedRows();
                if(checkedRows.length < 1) {
                    this.toastAlertSelect()
                    return;
                }

                const me = this;
                let checkDataList = [];
                checkedRows.forEach((row) => {
                    let rowData = me.dataProvider.getJsonRow(row);
                    checkDataList.push({EARNER_CODE: rowData['EARNER_CODE']});
                });

                this.$refs.bizincNtsReportModal.show({
                    ATT_YEAR: this.searchFormData.ATT_YEAR,
                    FILE_TYPE: this.searchFormData.FILE_TYPE,
                    EARNER_CODE_LIST: checkDataList,
                    url: url
                });
            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-tax-report-grid',
                autoLoad: false,
                checkbar: 'multi'
            });

            this.loadGridData();
        }
    }

</script>