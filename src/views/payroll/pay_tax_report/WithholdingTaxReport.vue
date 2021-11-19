<template>   
<div>
    <ui-header :msg="'세무신고'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="원천징수이행상황신고서" :to="{name: 'WithholdingTaxReport'}"/>
            <base-tabs-item label="근로소득간이지급명세서" :to="{name: 'EarnedIncomeReport'}"/>
            <base-tabs-item label="지방소득세" :to="{name: 'LocalTaxReport'}"/>
            <base-tabs-item label="주민세 종업원분" :to="{name: 'ResidentTaxReport'}"/>
        </base-tabs>
        <div>
            <border-box search>
                <border-box-item title="귀속연도">
                    <ui-dropdown :items="attributableYear.items"
                                :value="attributableYear.value"
                                @change="attributableYear.value=$event.value; attributableYear.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
                <border-box-item title="사업장">
                    <ui-dropdown :items="businessPlace.items"
                                :value="businessPlace.value"
                                @change="businessPlace.value=$event.value; businessPlace.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <div class="box border-box type2">
                <div class="box-body row">
                    <button class="btn btn-md line-1 ml-10">원천징수이행상황신고서 조회</button>
                    <button class="btn btn-md line-1 ml-10">원천징수이행상황신고내용 조회</button>
                    <button class="btn btn-md line-1 ml-10" @click="wtrInputModal()">원천징수이행상황신고서 입력</button>
                </div>
            </div>
            <div>
                <div id="withholding-tax-report-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
            <wtr-input-modal ref="wtrInputModal" :business-list="businessPlace.items" />
        </div>
    </div>
</div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import WtrInputModal from '@/components/payroll/pay_tax_report/modals/WtrInputModal';

import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        BorderBox,
        BorderBoxItem,
        WtrInputModal
    },
    data() {
        let me = this;
        return {
            attributableYear: {
                value: String(new Date().getFullYear()),
                return: null,
                items: this.getRecentYearList()
            },
            businessPlace: {
                value: '',
                return: null,
                items: [
                ]
            },
            //grid
            fields: [
                { fieldName: 'DV_NAME', dataType: 'text' },
                { fieldName: 'PAY_MON', dataType: 'text' },
                { fieldName: 'CASH_MON', dataType: 'text' },
                { fieldName: 'PERIOD', dataType: 'text' },
                { fieldName: 'DECLARE_DET', dataType: 'text' },
                { fieldName: 'PER_MONTH', dataType: 'text' },
                { fieldName: 'PER_QUARTER', dataType: 'text' },
                { fieldName: 'PER_CORRECT', dataType: 'text' },
                { fieldName: 'PER_YEAR', dataType: 'text' },
                { fieldName: 'PER_DISPOSE', dataType: 'text' },
                { fieldName: 'PER_REFUND', dataType: 'text' },
                { fieldName: 'PER_LATE', dataType: 'text' },
                { fieldName: 'PAY_BULK', dataType: 'text' },
                { fieldName: 'PAY_BIZUNIT', dataType: 'text' },
                { fieldName: 'ACTION_UPDATE', dataType: 'text' },
                { fieldName: 'ACTION_DEL', dataType: 'text' },
            ],
            columns: [
                { fieldName: 'DV_NAME', header: '사업장', width: 150 },
                { fieldName: 'PAY_MON', header: '귀속연월', width: 100 },
                { fieldName: 'CASH_MON', header: '지급연월', width: 100 },
                { fieldName: 'PERIOD', header: '주기', width: 100 },
                { fieldName: 'DECLARE_DET', header: '신고종류', width: 100 },
                { fieldName: 'PER_MONTH', header: '매월', width: 80 },
                { fieldName: 'PER_QUARTER', header: '반기', width: 80 },
                { fieldName: 'PER_CORRECT', header: '수정', width: 80 },
                { fieldName: 'PER_YEAR', header: {text: '연말정산\n여부', styleName: 'multi-line-css-header'}, width: 80 },
                { fieldName: 'PER_DISPOSE', header: {text: '소득처분\n여부', styleName: 'multi-line-css-header'}, width: 80 },
                { fieldName: 'PER_REFUND', header: {text: '환급신청\n여부', styleName: 'multi-line-css-header'}, width: 80 },
                { fieldName: 'PER_LATE', header: '기한후신고', width: 80 },
                { fieldName: 'PAY_BULK', header: {text: '일괄납부\n여부', styleName: 'multi-line-css-header'}, width: 80 },
                { fieldName: 'PAY_BIZUNIT', header: {text: '사업자단위\n과세여부', styleName: 'multi-line-css-header'}, width: 80 },
                me.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 50}),
                me.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 50}),
            ],
            rowAttrs: [  //DBNAME, INTEGE_YN, LOGIN_ID, MAGIC_USER_TRACE_ID, 
                'PAY_BIZUNIT', 'PER_YEAR', 'DEC_TAXANUM', 'PAY_MON', 'BP_CODE', 'CASH_MON', 'USER_ID', 'COMP_CEO', 'PER_MONTH', 'REQ_TYPE',
                'PER_DISPOSE', 'DEC_ADDEN6', 'DEC_REFTYPE', 'DEC_ADDEN5', 'DECLARE_DET', 'COMP_LOCA', 'DEC_TYPE_PROXY', 'PER_QUARTER', 'DEC_NAME',
                'CREATE_TIME', 'COMP_EMAIL', 'DEC_ADDEN4', 'DEC_ADDEN3', 'DATA_SEL_FROM', 'DATA_SEL_TO', 'PER_LATE', 'DEC_ADDEN1', 'DV_NAME',
                'DECLARE_PER', 'DEC_YM', 'PAY_BULK', 'DEC_DATE', 'DEC_REF_BANK', 'COMP_NUMBER', 'PER_REFUND', 'DATA_SEL_PER', 'OPER_ID',
                'DEC_TAXAREF', 'PER_CORRECT', 'DEC_TAXANAME', 'COMP_NAME', 'DATA_SEL_TYPE', 'COMP_TEL', 'DEC_TAXATEL', 'ENTITY_CODE', 'DECLARE_ID', 'DEC_REF_ACC'
            ]
        }
    },
    methods: {
        async asyncData() {
            try {
                const { data } = await this.$httpPost({
                    param: {
                        INACTIVE: 'NO',
                        MAAL: 'KOREAN'
                    },
                    url: '/system/setting/division-mgt/list'
                });
                if(Array.isArray(data) && data.length > 0) {
                    this.businessPlace.value = data[0]['BP_CODE'];
                    for(let i = 0; i < data.length; i ++)
                        this.businessPlace.items.push({
                            message: data[i]['DV_NAM'],
                            code: data[i]['BP_CODE']
                        });
                }
            }
            catch(e) {
                console.error("WithholdingTaxReport asyncData err: ", e);
            }
        },
        async loadGridData() {
            try {
                let { data } = await this.$httpPost({
                    param: {},
                    url: '/payroll/withhold/income-tax/report-list'
                });
                for(let i = 0; i < data.length; i ++)
                    data[i]['PERIOD'] = data[i]['PER_MONTH'] == 'Y' ? '매월' : '반기';
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("WithholdingTaxReport loadGridData err: ", e);       
            }
        },
        addRealGridOption() {
            this.gridView.header.height = 50;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'ACTION_DEL') {
                    // 삭제처리
                }
                else if(clickData.column == 'ACTION_UPDATE') {
                    let _rowData = me.dataProvider.getJsonRow(clickData.dataRow)['ROW_ATTRS'];
                    me.$store.dispatch(
                        'withholding/setDeclarationForm',
                        {
                            DECLARATION_FORM: _rowData
                        });             
                    me.$router.push({name: 'WithholdingInput'});
                }
            }
        },
        wtrInputModal() {
            this.$store.dispatch( 'withholding/setDeclarationForm',
                        { DECLARATION_FORM: null });
            this.$router.push({name: 'WithholdingInput'});
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'withholding-tax-report-grid'});
        this.asyncData();   
        this.loadGridData();
    }
}
</script>