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
            <comment-box
                :list="[{'text': '* 연말정산 자료를 기반으로 생성하며 현직장의 과세급여를 집계합니다.'},
                        {'text': '* 건강보험과표 = 과세급여(임원퇴직금한도초과액 제외) + 비과세 국외근로소득 + 비과세 주식매수선택권 행사이익 + 비과세 벤처기업 주식매수선택권 행사이익'},
                        {'text': '* 고용보험과표 = 과세급여(임원퇴직금한도초과액 포함) + 비과세 우리사주조합인출금 + 비과세 주식매수선택권 행사이익 + 비과세 벤처기업 주식매수선택권 행사이익'},
                        {'text': '* 외국인 단일세율자인 경우 회사부담 보험료는 포함하지 않습니다.'},]"
            />
        </div>
        <border-box width="200" v-slot="slotProps" class="mt-9">
            <border-box-item title="연도" :width="slotProps.width">
                <ui-dropdown :items="searchOptionData.ATT_YEAR.items"
                             :value="searchOptionData.ATT_YEAR.value"
                             @change="searchOptionData.ATT_YEAR.value=$event.value;"
                             :options="{
                                valueField  : 'code',
                                labelField  : 'message',
                                tooltipField: 'message'
                            }"/>
            </border-box-item>
            <border-box-item title="대상" :width="slotProps.width">
                <ui-dropdown :items="searchOptionData.QRY_SETTLE_TYPE.items"
                             :value="searchOptionData.QRY_SETTLE_TYPE.value"
                             @change="searchOptionData.QRY_SETTLE_TYPE.value=$event.value;"
                             :options="{
                                valueField  : 'code',
                                labelField  : 'message',
                                tooltipField: 'message'
                            }"/>
            </border-box-item>
            <border-box-item button>
                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
                    <span>검색</span>
                </button>
            </border-box-item>
        </border-box>
        <button-panel btnType="top">
            <template v-slot:start>
                <button class="btn btn-md mr-5" @click="downloadHealth">
                    <i class="icon-lineIcon-check mr-5"></i>
                    건강보험 신고자료 다운로드
                </button>
                <button class="btn btn-md mr-5" @click="downloadEmp">
                    <i class="icon-lineIcon-check mr-5"></i>
                    고용보험 신고자료 다운로드
                </button>
            </template>
        </button-panel>
        <div>
            <div id="total-remuneration-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
        </div>
    </div>
</div>
</template>
<script>
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import CommentBox from '@/components/common/CommentBox';
import UiInputYear from "@/components/common/UiInputYear";
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        CommentBox,
        UiInputYear,
        BorderBox,
        BorderBoxItem,
        ButtonPanel
    },
    data() {
        return {
            searchOptionData: {
                ATT_YEAR: {
                    value: String(new Date().getFullYear()),
                    items: this.getRecentYearList()
                },
                QRY_SETTLE_TYPE: {
                    value: 'ALL',
                    items: [
                        {code: 'ALL', message: '전체'},
                        {code: 'YEAREND', message: '재직자'},
                        {code: 'SEV', message: '퇴직자'},
                    ]
                }
            },
            fields: [
                {fieldName: 'EID', dataType: 'text'},
                {fieldName: 'EMP_NAME', dataType: 'text'},
                {fieldName: 'E_JOIN_DATE', dataType: 'text'},
                {fieldName: 'RETIRE_DATE', dataType: 'text'},
                {fieldName: 'HRDEPT_NAME', dataType: 'text'},
                {fieldName: 'A', dataType: 'text'},
                {fieldName: 'B', dataType: 'text'},
                {fieldName: 'C', dataType: 'text'},
            ],
            columns: [
                {fieldName: 'EMP_NAME', header: '이름'},
                {fieldName: 'E_JOIN_DATE', header: '입사일'},
                {fieldName: 'RETIRE_DATE', header: '퇴사일'},
                {fieldName: 'HRDEPT_NAME', header: '부서'},
                {fieldName: 'A', header: '연말 근무형태'},
                {fieldName: 'B', header: '연말정산상태'},
                {fieldName: 'C', header: '신고대상'},
            ]
        }
    },
    methods: {
        async downloadHealth() {
            let checkedRows = this.getGridData();
            if(checkedRows.length < 1) {
                this.toastAlertSelect()
                return;
            }


            let params = this.getParams();
            params.REPORT_TYPE = 'HEALTH';
            try {
                const me = this;
                let {data} = await this.$httpPost({
                    url: '/year-end/report/year-income/report/excel',
                    param: {
                        FORM_DATA: JSON.stringify(params),
                        EID_LIST: checkedRows.join(',')
                    }
                });
                this.openPdf(data, 'text.xlsx');
            } catch(e) {
                console.log(e)
            }
        },

        getGridData: function() {
            let rows = this.getCheckedValues();
            if(rows.length < 1) {
                return [];
            }

            let returnList = [];
            rows.forEach((row) => {
                returnList.push(row.EID);
            });

            return returnList;
        },

        async downloadEmp() {

        },

        addRealGridOption() {
            this.gridView.setStateBar({ visible: false });
        },

        getParams: function() {
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
                let params = this.getParams();
                let {data} = await this.$httpGet('/year-end/employee/list', params);
                this.setRealgridData(data || []);
            } catch(e) {
                console.loe(e)
            }
        }
    },
    async mounted() {
        this.createRealGrid({
            'domId': 'total-remuneration-grid',
            autoLoad: false,
            'checkbar': 'multi'
        });

        await this.loadGridData();
    }
}
</script>