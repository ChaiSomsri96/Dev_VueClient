<template>
<div>
    <ui-header :msg="'사회보험신고'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="보수총액신고자료 조회" :to="{name: 'TotalRemuneration'}"/> 
            <base-tabs-item label="직장가입자 취득신고" :to="{name: 'AcquisitionJob'}"/>     
            <base-tabs-item label="직장가입자 상실신고" :to="{name: 'LossJob'}"/>     
        </base-tabs>    
        <div>
            <border-box search>
                <border-box-item title="신고연도">
                    <ui-dropdown :items="formData.DECLARED_YEAR.items"
                                 :value="formData.DECLARED_YEAR.value"
                                 @change="formData.DECLARED_YEAR.value=$event.value; formData.DECLARED_YEAR.return=$event;"
                                 :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                                    }"/>
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <button-panel
                    btnType="top"
                    v-bind:download=true
                    v-bind:add=true
                    v-on:add="createLossJob"
                    v-on:download="downloadRealGridExcel" >
            </button-panel>
            <div>
                <div id="loss-job-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "@/components/common/ButtonPanel";

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        BorderBox,
        BorderBoxItem,
        ButtonPanel,
    },
    data() {
        return {
            formData: {
                DECLARED_YEAR: {
                    value: String(new Date().getFullYear()),
                    items: this.getRecentYearList()
                }
            },
            fields: [
                {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
                {fieldName: 'SI_DEREGIST_MATTER_NAME', dataType: 'text'},
                {fieldName: 'SI_DEREGIST_MATTER_DATE', dataType: 'text'},
                { fieldName: 'TARGET_NUMBERS', dataType: 'text' },
                { fieldName: 'ACTION_UPDATE'},
                { fieldName: 'DETAIL'},
                { fieldName: 'DOWNLOAD'},
                { fieldName: 'DELETE'}
            ],
            columns: [
                { fieldName: 'SI_DEREGIST_MATTER_NO', header: '매터번호' },
                { fieldName: 'SI_DEREGIST_MATTER_NAME', header: '매터명' },
                { fieldName: 'SI_DEREGIST_MATTER_DATE', header: '매터날짜' },
                { fieldName: 'TARGET_NUMBERS', header: '대상 인원수' },
                this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 40}),
                this.getIconColumn({headerText: '신고자료 조회', fieldName: 'DETAIL', columnWidth: 50, type: 'detail'}),
                this.getIconColumn({headerText: '신고자료 다운로드', fieldName: 'DOWNLOAD', columnWidth: 60, type: 'view'}),
                this.getDeleteColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 40})
            ]
        }
    },
    methods: {
        createLossJob: function(data={}) {
            this.$router.push({name: 'LossJobInput', params: {SI_DEREGIST_MATTER_NO: data.SI_DEREGIST_MATTER_NO}});
        },

        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/insurance/deregist/matter/list', {DECLARED_YEAR: this.formData.DECLARED_YEAR.value}) || [];
                this.setRealgridData(data);
            }
            catch(e) {
                console.error(e);
            }
        },

        declareQuery(data) {
            this.$router.push({name: 'LossJobDeclareQuery', params: {SI_DEREGIST_MATTER_NO: data.SI_DEREGIST_MATTER_NO}});
        },

        downloadDeclare: function(param) {
            let {data} = this.$httpPost({
                url: '/payroll/insurance/deregist/report-download',
                param: {
                    FORM_DATA: JSON.stringify({SI_DEREGIST_MATTER_NO: param.SI_DEREGIST_MATTER_NO})
                },
                blob: true
            });

            this.downloadPdf(data, '상실신고서.xlsx');
        },

        initGridHandler: function() {
            const me = this;
            this.gridView.onCellClicked = function(grid, clickData) {
                grid.commit();

                if(clickData.column === 'ACTION_UPDATE') {
                    me.createLossJob({OPEN_TYPE: 'UPDATE', ...me.dataProvider.getJsonRow(clickData.dataRow)});
                    return;
                }

                if(clickData.column === 'DETAIL') {
                    me.declareQuery(me.dataProvider.getJsonRow(clickData.dataRow));
                    return;
                }

                if(clickData.column === 'DOWNLOAD') {
                    me.downloadDeclare(me.dataProvider.getJsonRow(clickData.dataRow));
                    return;
                }

                if(clickData.column === 'DELETE') {
                    me.deleteLossJob(me.dataProvider.getJsonRow(clickData.dataRow));
                }
            }
        },
    },
    mounted() {
        this.createRealGrid({'domId': 'loss-job-grid'});

        this.initGridHandler();

        this.loadGridData();
    }
}
</script>