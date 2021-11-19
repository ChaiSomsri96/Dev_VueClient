<template>
<div>
    <div class="content-header">
      <div class="header-bottom">
        <div class="header-bottom-left">
          <div class="menu-box">
            <div class="menu-item title">
              <div class="menu-item-icon">
                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                  <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                </button>
              </div>
                <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                   원천징수이행상황신고서 입력
                </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
        <border-box width="220" v-slot="slotProps">
            <border-box-item title="신고(대표)사업장" :width="slotProps.width" multi>
                <ui-dropdown :items="GEN_FORM.BP_CODE.items"
                            :value="GEN_FORM.BP_CODE.value"
                            @change="GEN_FORM.BP_CODE.value=$event.value; GEN_FORM.BP_CODE.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="신고종류" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.DECLARE_DET.items"
                            :value="GEN_FORM.DECLARE_DET.value"
                            @change="GEN_FORM.DECLARE_DET.value=$event.value; GEN_FORM.DECLARE_DET.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="주기" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.PERIOD.items"
                            :value="GEN_FORM.PERIOD.value"
                            @change="GEN_FORM.PERIOD.value=$event.value; GEN_FORM.PERIOD.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="신고구분" radio :width="slotProps.width">
                <ui-check-box-inline :options="GEN_FORM.DECLARE_SORT"
                @change="GEN_FORM.DECLARE_SORT.value = $event" />
            </border-box-item>
            <border-box-item title="일괄납부" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.PAY_BULK.items"
                            :value="GEN_FORM.PAY_BULK.value"
                            @change="GEN_FORM.PAY_BULK.value=$event.value; GEN_FORM.PAY_BULK.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="사업자단위과세" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.PAY_BIZUNIT.items"
                            :value="GEN_FORM.PAY_BIZUNIT.value"
                            @change="GEN_FORM.PAY_BIZUNIT.value=$event.value; GEN_FORM.PAY_BIZUNIT.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="추출범위" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.DATA_SEL_TYPE.items"
                            :value="GEN_FORM.DATA_SEL_TYPE.value"
                            @change="GEN_FORM.DATA_SEL_TYPE.value=$event.value; GEN_FORM.DATA_SEL_TYPE.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />    
            </border-box-item>
            <border-box-item title="귀속연월" :width="slotProps.width" month-picker>
                <ui-month-picker v-model="GEN_FORM.PAY_MON" />
            </border-box-item>
            <border-box-item title="지급연월" :width="slotProps.width" month-picker>
                <ui-month-picker v-model="GEN_FORM.CASH_MON" />
            </border-box-item>
            <border-box-item title="제출연월" :width="slotProps.width" month-picker>
                <ui-month-picker v-model="GEN_FORM.DEC_YM" />
            </border-box-item>
            <border-box-item title="작성일자" :width="slotProps.width">
                <ui-input-date :date="GEN_FORM.DEC_DATE"
                                        @change="GEN_FORM.DEC_DATE=$event;" />
            </border-box-item>
            <border-box-item title="자료추출기준" :width="slotProps.width">
                <ui-dropdown :items="GEN_FORM.DATA_SEL_PER.items"
                            :value="GEN_FORM.DATA_SEL_PER.value"
                            @change="GEN_FORM.DATA_SEL_PER.value=$event.value; GEN_FORM.DATA_SEL_PER.return=$event;"
                            :options="{
                                            valueField  : 'code',
                                            labelField  : 'message',
                                            tooltipField: 'message'
                                        }" />
            </border-box-item>
            <border-box-item title="자료추출기간" multi :width="slotProps.width" month-picker>
                <ui-month-picker v-model="GEN_FORM.DATA_SEL_FROM" />  
                <span>~</span>
                <ui-month-picker v-model="GEN_FORM.DATA_SEL_TO" />
            </border-box-item>
            <border-box-item button>
                <button type="button" class="btn btn-md line-1" @click="generate()">
                    <span>생성</span>
                </button>
            </border-box-item>
        </border-box>
        <div class="row">
                <grid-tool-bar title="명세 및 부표">
                    <button class="btn btn-md flat"
                    @click="addNewLine()"><i class="icon-lineIcon-plus mr-5"></i>
                        라인추가
                    </button>
                </grid-tool-bar>
        </div>
        <div class="row mb-20" style="height: 400px;">
            <div id="wtr-input-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
        </div>
        <refunded-tax-grid ref="refundedTaxGrid" @clickFindPrevMonthRefund="showWtrInputModal()" />
        <wtr-input-modal ref="wtrInputModal" @close="wtrInputModalClose($event)" />
        <particulars-buoys-modal ref="particularsBuoysModal"
                                    @close="loadGridData()" />
    </div>
</div>
</template>
<script>
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import GridToolBar from '@/components/common/GridToolBar';
import UiCheckBoxInline from '@/components/common/UiCheckBoxInline';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import RefundedTaxGrid from '@/components/payroll/pay_tax_report/grids/RefundedTaxGrid';
import WtrInputModal from '@/components/payroll/pay_tax_report/modals/WtrInputModal';
import ParticularsBuoysModal from '@/components/payroll/pay_tax_report/modals/ParticularsBuoysModal';

import { mapGetters } from 'vuex';
export default {
    mixins: [grid],
    components: {
        BorderBox,
        BorderBoxItem,
        GridToolBar,
        UiCheckBoxInline,
        UiMonthPicker,
        RefundedTaxGrid,
        WtrInputModal,
        ParticularsBuoysModal
    },
    computed: {
        ...mapGetters({
            declarationForm: 'withholding/getDeclarationForm'
        })
    },
    data() {
        let me = this;
        return {
            GEN_FORM: {
                BP_CODE: {
                    value: '',
                    return: null,
                    items: []
                },
                DECLARE_DET: { //신고종류
                    value: '01',
                    return: null,
                    items: [{message: '정기', code: '01'},{message: '수정', code: '02'},{message: '기한후', code: '03'},]
                },
                PERIOD: { //주기
                    value: 'PER_MONTH',
                    return: null,
                    items: [{message: '매월', code: 'PER_MONTH'},{message: '반기', code: 'PER_QUARTER'},]
                },
                DECLARE_SORT: { //신고구분
                    name: 'declare-sort',
                    value: [],
                    domOptList: [ { value: 'PER_YEAR', label: '연말' }, { value: 'PER_DISPOSE', label: '소득처분' } ]
                },
                PAY_BULK: {
                    value: 'Y',
                    return: null,
                    items: [{message: '여', code: 'Y'}, {message: '부', code: 'N'},]
                },
                PAY_BIZUNIT: {
                    value: 'N',
                    return: null,
                    items: [{message: '여', code: 'Y'}, {message: '부', code: 'N'},]      
                },
                DATA_SEL_TYPE: { //추출범위
                    value: 'A',
                    return: null,
                    items: [{message: '회사전체', code: 'A'},
                            {message: '사업장', code: 'P'},]    
                },
                PAY_MON: '202104', // 귀속연월
                CASH_MON: '202104', // 지급연월
                DEC_YM: '202104', // 제출연월
                DEC_DATE: '20210401', // 작성일자
                DATA_SEL_PER: {   // 자료추출기준
                    value: 'PAY',
                    return: null,
                    items: [{message: '귀속월', code: 'PAY'},
                            {message: '지급월', code: 'CASH'},]
                },
                DATA_SEL_FROM: '202104',
                DATA_SEL_TO: '202104'
            },
            GRID_REQ_PARAM: {},
            // grid
            columns: [
                { fieldName: 'INC_CODE', header: '코드', width: 70 },
                { fieldName: 'INC_CODE_NAME', header: '코드명', width: 200 },
                { fieldName: 'INC_HEAD_C', header: '인원', 
                        numberFormat: "###0", nanText: '0', width: 70},  
                { fieldName: 'INC_TOT_PAY', header: '총지급액',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_NTAX', header: '소득세등',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_ATAX', header: '농어촌특별세',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_PENALTY', header: '가산세',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_REF_ADJ', header: '당월조정환급세액',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_PAY_NTAX', header: '소득세등',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                { fieldName: 'INC_PAY_ATAX', header: '농어촌특별세',
                        numberFormat: "#,##0", 
                        styleName: "right-column", 
                        footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                        nanText: '0' },
                me.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 50}),
            ],
            fields: [
                { fieldName: 'INC_CODE', dataType: 'text' },
                { fieldName: 'INC_CODE_NAME', dataType: 'text' },
                { fieldName: 'INC_HEAD_C', dataType: 'number' },
                { fieldName: 'INC_TOT_PAY', dataType: 'number' },
                { fieldName: 'INC_NTAX', dataType: 'number' },
                { fieldName: 'INC_ATAX', dataType: 'number' },
                { fieldName: 'INC_PENALTY', dataType: 'number' },
                { fieldName: 'INC_REF_ADJ', dataType: 'number' },
                { fieldName: 'INC_PAY_NTAX', dataType: 'number' },
                { fieldName: 'INC_PAY_ATAX', dataType: 'number' },
                { fieldName: 'ACTION_UPDATE', dataType: 'text' },
            ],
            layout: [
                'INC_CODE',
                'INC_CODE_NAME',
                { 
                    name: 'INCOME_Group', direction: "horizontal",
                    items: [ "INC_HEAD_C", "INC_TOT_PAY" ],
                    header: { text: "소득" }      
                },
                { 
                    name: 'COLLECT_TAX_Group', direction: "horizontal",
                    items: [ "INC_NTAX", "INC_ATAX", "INC_PENALTY" ],
                    header: { text: "징수세액" }      
                },
                'INC_REF_ADJ',
                { 
                    name: 'TAX_PAID_Group', direction: "horizontal",
                    items: [ "INC_PAY_NTAX", "INC_PAY_ATAX" ],
                    header: { text: "납부세액" }      
                },
                'ACTION_UPDATE'
            ]
        }
    },
    methods: {
        //grid
        loadGridData() {
            let me = this;
            this.$httpGet('/payroll/withhold/income-tax/items', this.GRID_REQ_PARAM)
            .then((ret) => {
                me.setRealgridData(ret.data || []);
            })
            .catch((err) => {
                console.log("WtrInputModal err: ", err);
            });
        },
        loadRefundedTaxGridData() {
            this.$httpPost({
                url: '/payroll/withhold/income-tax/refund/find',
                param: this.GRID_REQ_PARAM,
                callback: function() {}
            }).then((ret) => {
                this.$refs.refundedTaxGrid.setRealgridData([ret.data]);
            })
            .catch((err) => {
                console.log("WtrInputModal refundedTaxGrid err: ", err);
            }); 
        },
        addRealGridOption() {
            this.gridView.header.height = 72;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = async function(grid, clickData) {
                if(clickData.column == 'ACTION_UPDATE') {
                    let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
                    let codeData = {
                        'INC_CODE': _rowData['INC_CODE'],
                        'INC_CODE_NAME': _rowData['INC_CODE_NAME'],
                        'DECLARE_ID': me.GRID_REQ_PARAM.DECLARE_ID
                    };
                    delete _rowData['ACTION_UPDATE']; 
                    delete _rowData['INC_CODE']; 
                    delete _rowData['INC_CODE_NAME']; 
                    me.$refs.particularsBuoysModal.show({codeData: codeData, 
                    valueData: _rowData});
                }
            }
        },
        //method
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
                    this.GEN_FORM.BP_CODE.value = data[0]['BP_CODE'];
                    for(let i = 0; i < data.length; i ++)
                        this.GEN_FORM.BP_CODE.items.push({
                            message: data[i]['DV_NAM'],
                            code: data[i]['BP_CODE']
                        });
                }
            }
            catch(err) {
                console.error("WithholdingInput asyncData err: ", e);
            }
        },
        async generate() {
            try {
                let { data } = await this.$httpPostBody({
                    url: '/payroll/withhold/income-tax/header/save',
                    param: {
                        "BP_CODE": this.GEN_FORM.BP_CODE.value,
                        "CASH_MON": this.GEN_FORM.CASH_MON,
                        "DATA_SEL_FROM": this.GEN_FORM.DATA_SEL_FROM,
                        "DATA_SEL_PER": this.GEN_FORM.DATA_SEL_PER.value,
                        "DATA_SEL_TO": this.GEN_FORM.DATA_SEL_TO,
                        "DATA_SEL_TYPE": this.GEN_FORM.DATA_SEL_TYPE.value,
                        "DEC_DATE": this.GEN_FORM.DEC_DATE,
                        "DEC_TYPE_PROXY": this.GEN_FORM.DEC_TYPE_PROXY,
                        "DEC_YM": this.GEN_FORM.DEC_YM,
                        "DECLARE_DET": this.GEN_FORM.DECLARE_DET.value,
                        "DECLARE_ID": null,
                        "INTEGE_YN": "N",
                        "PAY_BIZUNIT": this.GEN_FORM.PAY_BIZUNIT.value,
                        "PAY_BULK": this.GEN_FORM.PAY_BULK.value,
                        "PAY_MON": this.GEN_FORM.PAY_MON,
                        "PER_DISPOSE": this.GEN_FORM.DECLARE_SORT.value.indexOf("PER_DISPOSE") >= 0?'Y':'N',
                        "PER_YEAR": this.GEN_FORM.DECLARE_SORT.value.indexOf("PER_YEAR") >= 0?'Y':'N',
                        "PERIOD": this.GEN_FORM.PERIOD.value
                    }
                });
                this.GRID_REQ_PARAM = data;
                this.$store.dispatch(
                        'withholding/setDeclarationForm',
                        {
                            DECLARATION_FORM: data
                        });
                this.loadGridData();
                this.loadRefundedTaxGridData();
            }
            catch(e) {
                console.log("WtrInputModal generate error: ", e);
            }
        },
        gotoList() {
            let me = this;
            me.$router.push({name: 'WithholdingTaxReport'});
        },
        applyComponent () {
            this.GEN_FORM.BP_CODE.value = this.declarationForm.BP_CODE;
            this.GEN_FORM.DECLARE_DET.value = this.declarationForm.DECLARE_DET;
            this.GEN_FORM.DECLARE_SORT.value = [];
            if(this.declarationForm.PER_YEAR == 'Y') this.GEN_FORM.DECLARE_SORT.value.push('PER_YEAR');
            if(this.declarationForm.PER_DISPOSE == 'Y') this.GEN_FORM.DECLARE_SORT.value.push('PER_DISPOSE');
            this.GEN_FORM.PAY_BULK.value = this.declarationForm.PAY_BULK;
            this.GEN_FORM.PAY_BIZUNIT.value = this.declarationForm.PAY_BIZUNIT;
            this.GEN_FORM.DATA_SEL_TYPE.value = this.declarationForm.DATA_SEL_TYPE;
            this.GEN_FORM.PAY_MON = this.declarationForm.PAY_MON;
            this.GEN_FORM.CASH_MON = this.declarationForm.CASH_MON;
            this.GEN_FORM.DEC_YM = this.declarationForm.DEC_YM;
            this.GEN_FORM.DEC_DATE = this.declarationForm.DEC_DATE;
            this.GEN_FORM.DATA_SEL_PER.value = this.declarationForm.DATA_SEL_PER;
            this.GEN_FORM.DATA_SEL_FROM = this.declarationForm.DATA_SEL_FROM;
            this.GEN_FORM.DATA_SEL_TO = this.declarationForm.DATA_SEL_TO;      
        },
        showWtrInputModal() {
            this.$refs.wtrInputModal.show();
        },
        addNewLine() {
            let codeData = { 'DECLARE_ID': this.GRID_REQ_PARAM.DECLARE_ID };
            this.$refs.particularsBuoysModal.show( { codeData: codeData, valueData: null } );
        },
        wtrInputModalClose($event) {
            if(!$event)
                return;
            this.$refs.refundedTaxGrid.dataProvider.setValue(0, this.$refs.refundedTaxGrid.dataProvider.getFieldIndex("UNREFUND_BAL"), $event['REFUND_CARRY']);
        }
    },
    async mounted() {
        try {
            this.createRealGrid({
                'domId': 'wtr-input-modal-grid'
            });
            this.$refs.refundedTaxGrid.createRealGrid({
                'domId': 'refunded-tax-grid',
                'editable': true
            });
            await this.asyncData();

            if(!this.declarationForm)
                return;
            this.GRID_REQ_PARAM = this.declarationForm;
            this.applyComponent();
            //grid data
            this.loadGridData();
            this.loadRefundedTaxGridData();
        }
        catch(err) {
            console.log("WithholdingInput mounted err: ", err);
        }
    },
}
</script>

