<template>
<div>
    <ui-header :msg="'분석적 검토'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="전당월 비교" :to="{name: 'PayReview'}"/>
            <base-tabs-item label="급여검증보고서" :to="{name: 'PaycheckReport'}"/>
        </base-tabs>
        <div>
            <border-box>
                <border-box-item title="당월급여월" label>
                    <button class="btn btn-md flat label-button" @click="selectPayMonth(1)">{{ payMonthSeq_1 }}</button>
                </border-box-item>
                <border-box-item title="비교 급여월" label>
                    <button class="btn btn-md flat label-button" @click="selectPayMonth(2)">{{ payMonthSeq_2 }}</button>
                </border-box-item>
                <border-box-item title="기준변동율 %">
                    <ui-input-number :value="gapRatio"
                            @change="gapRatio=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 2,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                                        }"/>
                </border-box-item>
                <border-box-item title="기준순지급액">
                    <ui-input-number :value="newAmount"
                        @change="newAmount=$event;"
                        :options="{
                                        trim         : true,
                                        decimalPlace : 0,
                                        maxLength    : 15,
                                        addDivClass  : 'input-group p-0'
                        }"/>
                </border-box-item>
                <border-box-item title="기준지급횟수">
                    <ui-input-number :value="payCount"
                            @change="payCount=$event;"
                            :options="{
                                            trim         : true,
                                            decimalPlace : 0,
                                            maxLength    : 15,
                                            addDivClass  : 'input-group p-0'
                    }"/>
                </border-box-item>

                <border-box-item title="개인정보" radio>
                    <ui-radio-button-inline :options="profileVisible" />
                </border-box-item>

                <border-box-item title="언어">
                    <ui-dropdown :items="language.items"
                                   :value="language.value"
                                   @change="language.value=$event.value; language.return=$event;"
                                   :options="{
                                                   valueField  : 'code',
                                                   labelField  : 'message',
                                                   tooltipField: 'message'
                                               }" />
                </border-box-item>
                <border-box-item button>
                    <button type="button" class="btn btn-md line-1" @click="queryGrid()">
                        <span>급여검증 보고서 조회</span>
                    </button>
                </border-box-item>
            </border-box>
            <div>
                <div id="paycheck-report-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
            </div>
            <pay-month-select-modal id="pay-month-select-modal1" ref="payMonthSelectModal1" @change="payMonthChange1($event)" />
            <pay-month-select-modal id="pay-month-select-modal2" ref="payMonthSelectModal2" @change="payMonthChange2($event)" />
            <paycheck-report-modal ref="paycheckReportModal" />
        </div>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import PayMonthSelectModal from '@/components/payroll/common/modals/PayMonthSelectModal';
import PaycheckReportModal from '@/components/payroll/analytical_review/modals/PaycheckReportModal';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        UiRadioButtonInline,
        PayMonthSelectModal,
        PaycheckReportModal,
        BorderBox,
        BorderBoxItem
    },
    computed: {
        payMonthSeq_1() {
            return this.payMonth1 == '' ? '' : (this.payMonth1 + '-' + this.payMonthSeq1);
        },
        payMonthSeq_2() {
            return this.payMonth2 == '' ? '' : (this.payMonth2 + '-' + this.payMonthSeq2);
        }
    },
    data() {
        return {
            language: {
                value: 'ko',
                return: null,
                items: [{
                    message: '한국어',
                    code: 'ko'
                },{
                    message: '영어',
                    code: 'en'
                },{
                    message: '일어',
                    code: 'jp'
                }]
            },
            profileVisible: { //개인정보
                name: 'profile-visible',
                value: 'visible',
                domOptList: [
                    { value: 'visible', label: '표시', id: 'profile-visible' },
                    { value: 'hide', label: '숨김', id: 'profile-hide' }
                ]
            },

            //grid
            fields: [
                { fieldName: 'RPT_TYPE', dataType: 'text' },
                { fieldName: 'RPT_TYPE_DESC', dataType: 'text' },
                { fieldName: 'PAY_MONTH', dataType: 'text' },
                { fieldName: 'SEQ', dataType: 'text' },
                { fieldName: 'DETACTED_COUNT', dataType: 'text' },
                { fieldName: "DETAIL",      dataType: 'text' }
            ],
            columns: [
                { fieldName: 'RPT_TYPE', header: '유형코드', width: 30 },
                { fieldName: 'RPT_TYPE_DESC', header: '보고서 유형', styleName: 'left-column', width: 150 },
                { fieldName: 'PAY_MONTH', header: '급여월', width: 50 },
                { fieldName: 'SEQ', header: '차수', width: 50 },
                { fieldName: 'DETACTED_COUNT', header: '해당 데이터 건수', width: 50 },
                { 
                    fieldName: 'DETAIL', 
                    header: '상세보기',
                    width: 50,
                    type: 'staticButton',
                    buttonLabel: '상세보기'
                },
            ],
            payCount: '1',                   //기준지급횟수
            newAmount: '1000000',           //기준순지급액
            gapRatio: '5',                  //기준변동율
            payMonth1: '202101',
            payMonth2: '202103',
            payMonthSeq1: '1',
            payMonthSeq2: '1',
            searchedParam: null
        }
    },
    methods: {
        async loadGridData() {
            try {
                this.searchedParam = {
                    'payMonth1': this.payMonth1,
                    'seq1': this.payMonthSeq1,
                    'payMonth2': this.payMonth2,
                    'seq2': this.payMonthSeq2,
                    'stdPayCount': this.payrollUtil.isEmpty(this.payCount) ? '' : String(this.payCount),
                    'stdNetAmount': this.payrollUtil.isEmpty(this.newAmount) ? '' : String(this.newAmount),
                    'stdGapRatio': this.payrollUtil.isEmpty(this.gapRatio) ? '' : String(this.gapRatio)
                };

                let { data } = await this.$httpPost({
                    url: '/payroll/salaryqry/validation/list',
                    param: {
                        'formData': JSON.stringify({
                            "PAY_MONTH1": this.payMonth1,
                            "SEQ1": String(this.payMonthSeq1),
                            "PAY_MONTH2": this.payMonth2,
                            "SEQ2": String(this.payMonthSeq2),
                            "PAY_GAAP":"1",
                            "PAY_COUNT": this.payrollUtil.isEmpty(this.payCount) ? '' : String(this.payCount),
                            "NET_AMOUNT": this.payrollUtil.isEmpty(this.newAmount) ? '' : String(this.newAmount),
                            "GAP_RATIO": this.payrollUtil.isEmpty(this.gapRatio) ? '' : String(this.gapRatio)
                        })
                    }
                });
                this.setRealgridData(data || []);
            } catch(e) {
                console.error("PaycheckReport loadGridData err: ", e);       
            }
        },
        //define event callback
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellItemClicked = function (grid, index, clickData) {
                let _rowData = me.dataProvider.getJsonRow(index.dataRow);
                me.$refs.paycheckReportModal.show({rptType: parseInt(_rowData['RPT_TYPE']), title: _rowData['RPT_TYPE_DESC'], searchedParam: me.searchedParam});
                return true;
            }
        },
        selectPayMonth(type) {
            if(type == 1) {
                this.$refs.payMonthSelectModal1.show();
            } else {
                this.$refs.payMonthSelectModal2.show();
            }
        },
        payMonthChange1($event) {
            this.payMonth1 = $event.payMonth;
            this.payMonthSeq1 = $event.payMonthSeq;
        },
        payMonthChange2($event) {
            this.payMonth2 = $event.payMonth;
            this.payMonthSeq2 = $event.payMonthSeq;
        },

        queryGrid() {
            if(this.payMonth1 == '') {
                this.toast({message: this.messages['mustCurPayMonthSelect'], type:"error"});
                return;
            }
            if(this.payMonth2 == '') {
                this.toast({message: this.messages['mustPrevPayMonthSelect'], type:"error"});
                return;
            }
            if(this.payrollUtil.isEmpty(this.gapRatio)) {
                this.toast({message: this.messages['mustGapRatioSelect'], type:"error"});
                return;
            }
            if(this.payrollUtil.isEmpty(this.newAmount)) {
                this.toast({message: this.messages['mustNewAmountSelect'], type:"error"});
                return;
            }
            if(this.payrollUtil.isEmpty(this.payCount)) {
                this.toast({message: this.messages['mustPayCountSelect'], type:"error"});
                return;
            }
            this.loadGridData();
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'paycheck-report-grid'});
    },
}
</script>