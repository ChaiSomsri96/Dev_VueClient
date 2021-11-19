<template>   
<div>
    <ui-header :msg="'세무서식 조회'" />
    <div class="content-body">
        <pay-tax-file-tab></pay-tax-file-tab>
        <border-box width="200" v-slot="slotProps">
            <border-box-item title="부서" :width="slotProps.width">
                <ui-dropdown :items="searchForm.HRDEPT_CODE.items"
                             :value="searchForm.HRDEPT_CODE.value"
                             @change="searchForm.HRDEPT_CODE.value=$event.value;"
                             :options="{
                                  valueField  : 'HRDEPT_CODE',
                                  labelField  : 'HRDEPT_NAM',
                                  tooltipField: 'HRDEPT_NAM'
                              }" />
            </border-box-item>
            <border-box-item title="사원명" :width="slotProps.width">
                <ui-dropdown :items="searchForm.EMP_CODE.items"
                             :value="searchForm.EMP_CODE.value"
                             @change="searchForm.EMP_CODE.value=$event.value;"
                             :options="{
                                  valueField  : 'EMP_CODE',
                                  labelField  : 'EMP_NAM',
                                  tooltipField: 'EMP_NAM'
                              }" />
            </border-box-item>
            <border-box-item title="재직구분" :width="slotProps.width">
                <ui-dropdown :items="searchForm.WORK_TYPE.items"
                             :value="searchForm.WORK_TYPE.value"
                             @change="onChangeWorkType"
                             :options="{
                                  valueField  : 'code',
                                  labelField  : 'message',
                                  tooltipField: 'message'
                              }" />
            </border-box-item>
            <border-box-item title="퇴직일" :width="slotProps.width" multi>
                <ui-input-date :date="searchForm.RETIRE_FROM.value"
                               :max-date="searchForm.RETIRE_TO.value"
                               @change="searchForm.RETIRE_FROM.value=$event;"
                               :options="{readonly: searchForm.RETIRE_FROM.isReadOnly}"/>
                <span>~</span>
                <ui-input-date :date="searchForm.RETIRE_TO.value"
                               :min-date="searchForm.RETIRE_FROM.value"
                               @change="searchForm.RETIRE_TO.value=$event;"
                               :options="{readonly: searchForm.RETIRE_TO.isReadOnly}"/>
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
                v-on:download="downloadRealGridExcel" >
            <template v-slot:start>
                <button class="btn btn-md flat" @click="openReportModal">
                    <i class="icon-lineIcon-check mr-5"></i>
                    근로소득원천징수부 조회
                </button>
            </template>
        </button-panel>
        <div>
            <div id="earned-income-source-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
        </div>

        <pay-tax-file-report-modal ref="payTaxFileReportModal"/>
    </div>
</div>
</template>

<script>
    import grid from '@/mixin/payroll-grid';
    import PayTaxFileTab from './PayTaxFileTab';
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import PayTaxFileReportModal from './PayTaxFileReportModal';
    export default {
        mixins: [grid],
        components: {
            PayTaxFileReportModal,
            PayTaxFileTab,
            BorderBox,
            BorderBoxItem,
            ButtonPanel
        },
        data() {
            return {
                searchForm: {
                    WORK_TYPE: {
                        value: 'ALL',
                        items: [
                            { message: '전체', code: 'ALL' },
                            { message: '재직', code: 'WORK' },
                            { message: '퇴직', code: 'RETIRE' },
                        ]
                    },
                    RETIRE_FROM: {
                        value: '',
                        isReadOnly: false
                    },
                    RETIRE_TO: {
                        value: '',
                        isReadOnly: false
                    },
                    HRDEPT_CODE: {
                        value: '',
                        items: []
                    },
                    EMP_CODE: {
                        value: '',
                        items: []
                    }
                },
                fields: [
                    {fieldName: 'EID', dataType: 'text'},
                    {fieldName: 'EMP_NAM', dataType: 'text'},
                    {fieldName: 'E_JOIN_DATE', dataType: 'text'},
                    {fieldName: 'RETIRE_DATE', dataType: 'text'},
                    {fieldName: 'HRDEPT_NAM', dataType: 'text'},
                    {fieldName: 'EMPTYPE_NAM', dataType: 'text'},
                ],
                columns: [
                    {fieldName: 'EMP_NAM', header: '성명', width: 100},
                    {fieldName: 'E_JOIN_DATE', header: '입사일', width: 100},
                    {fieldName: 'RETIRE_DATE', header: '퇴사일', width: 100},
                    {fieldName: 'HRDEPT_NAM', header: '부서', width: 100},
                    {fieldName: 'EMPTYPE_NAM', header: '고용형태', width: 100},
                ]
            }
        },
        methods: {
            getSearchOptionData: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.searchForm);
                keys.forEach((key) => {
                    params[key] = me.searchForm[key].value;
                });

                return params;
            },

            async loadGridData() {
                try {
                    let params = this.getSearchOptionData();
                    const {data} = await this.$httpGet( '/payroll/salarymanual/emp_qry/list', params);

                    this.setRealgridData(data || []);
                } catch( e) {
                    console.log( e);
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
                    checkDataList.push({EID: rowData['EID']});
                });


                this.$refs.payTaxFileReportModal.show({EID_LIST: checkDataList});
            },

            onChangeWorkType: function(fd) {
                let value = fd.object.code;
                this.searchForm.WORK_TYPE.value = value;

                if(value === 'WORK') {
                    this.searchForm.RETIRE_FROM.isReadOnly = true;
                    this.searchForm.RETIRE_TO.isReadOnly = true;
                } else {
                    this.searchForm.RETIRE_FROM.isReadOnly = false;
                    this.searchForm.RETIRE_TO.isReadOnly = false;
                }
            },
            addRealGridOption() {
                this.gridView.checkBar.visible=true;
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            async loadDropdownItems() {
                // 부서
                this.searchForm.HRDEPT_CODE.items = await this.getDropdownData({
                    url: '/hrm/code/hr-dept/list',
                    params: {}
                });

                // TODO 사원명
            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'earned-income-source-grid',
                autoLoad: false
            });

            this.loadDropdownItems();

            this.loadGridData();
        }
    }
</script>