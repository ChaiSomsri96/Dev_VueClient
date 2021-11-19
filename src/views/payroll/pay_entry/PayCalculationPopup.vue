<template>
    <div class="app">
        <!-- ############ LAYOUT START-->
        <div class="popup-wrap">
            <div class="popup-header row v-c">
                <h2>급여 계산</h2>      
            </div>

            <div class="popup-content">
                <div class="form-area">
                    <!--
                    <div class="form-wrap row pt-10">
                        <div class="col-5" style="width: 100%; margin-top: 20px;">
                            <div class="form-group row">
                                <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-3" />
                            </div>
                            <div class="form-group row">
                                <label class="form-label type2 col-3">
                                    <span>계산방법</span>
                                </label>
                                <div class="col-4">
                                    <ui-dropdown :items="calcMethod.items" :value="calcMethod.value" 
                                    @change="calcMethod.value=$event.value; calcMethod.return=$event; asyncDynamicComponentData();"
                                    :options="{
                                                            valueField  : 'code',
                                                            labelField  : 'message',
                                                            tooltipField: 'message'
                                                        }" />
                                </div>
                            </div>
                        </div>
                    </div>
                    -->
                    <div class="row pb-20">
                        <div class="col-6">
                            <div class="form-wrap pt-0">
                                    <div class="form-group row">
                                        <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-3" />
                                    </div>
                                    <div class="form-group row">
                                        <label class="form-label type2 col-3">
                                            <span>계산방법</span>
                                        </label>
                                        <div class="col-4">
                                            <ui-dropdown :items="calcMethod.items" :value="calcMethod.value" 
                                            @change="calcMethod.value=$event.value; calcMethod.return=$event; asyncDynamicComponentData();"
                                            :options="{
                                                                    valueField  : 'code',
                                                                    labelField  : 'message',
                                                                    tooltipField: 'message'
                                                                }" />
                                        </div>
                                    </div>
                            </div>
                            <div>
                                <payroll-item-grid id="payroll-item-grid" ref="payrollItemGrid" />
                            </div>
                            <div class="tbl-bottom">
                                <button class="btn btn-lg flat" @click="preview()">
                                    <i class="icon-lineIcon-sight mr-5"></i>미리보기
                                </button>
                            </div>
                        </div>
                        <div class="col-6" style="display: flex; flex-direction: column;">
                            <grid-tool-bar title="급여계산 미리보기"></grid-tool-bar>
                            <div class="row" style="flex-grow: 1;">
                                <div id="payroll-item-grid-price" style="width: 100%; height: 100%;"
                                class="realgrid-type-style"></div>  
                            </div>
                        </div>
                    </div>
                    <div class="tbl-bottom">
                        <button type="button" class="btn btn-lg flat mr-5" @click="close()">
                            <i class="icon-lineIcon-close mr-5"></i>취소
                        </button>
                        <button class="btn btn-lg mr-5" @click="remove">
                            <i class="icon-lineIcon-close mr-5"></i>삭제
                        </button>
                        <button type="button" class="btn btn-lg black" @click="save"><i class="icon-lineIcon-check mr-5"></i>저장</button>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import PayrollItemGrid from '@/components/payroll/pay_entry/grids/PayrollItemGrid';
import grid from '@/mixin/payroll-grid';
import GridToolBar from '@/components/common/GridToolBar';
export default {
    mixins: [grid],
    components: {
        SalaryMonthsAndDates,
        PayrollItemGrid,
        GridToolBar
    },
    computed: {
        ...mapGetters({
            eidList: 'payentry/getEidList',
            payMonth: 'paymonth/getPayMonth' ,
            payMonthSeq: 'paymonth/getPayMonthSeq' ,
            payDate: 'paymonth/getPayDate'
        })
    },
    data() {
        return {
            calcMethod: {
                value: 'A',
                return: null,
                items: [ {
                    message: '급여마스터 적용',
                    code: 'A'
                },
                {
                    message: '계산공식',
                    code: 'F'
                },
                {
                    message: '연장근로수당',
                    code: 'O'
                }]       
            },
            fields: [
                { fieldName: 'EMP_NUMBER', dataType: 'text' },
                { fieldName: 'EMP_NAME', dataType: 'text' },
                { fieldName: 'TARGET_PAYCD', dataType: 'text' },
                { fieldName: 'PAY_NAME', dataType: 'text' },
                { fieldName: 'PAY_AMOUNT', dataType: 'number' }
            ],
            columns: [
                { header: "사번", fieldName: "EMP_NUMBER" }, 
                { header: "성명", fieldName: "EMP_NAME" }, 
                { header: "급여코드", fieldName: "TARGET_PAYCD" }, 
                { header: "급여항목", fieldName: "PAY_NAME" }, 
                { header: "금액", fieldName: "PAY_AMOUNT", numberFormat: "#,##0", styleName: "right-column",
                    footer: {
                    text: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                } },
            ]
        }
    },
    methods: {
        async asyncDynamicComponentData() {
            try {
                await this.$refs.payrollItemGrid.loadGridData(this.calcMethod.value);
            }
            catch(e) {
                console.error("PayCalculationModal asyncDynamicComponentData err: ", e);
            }
        },
        save() {
            //
            let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
            if(checkedPaycodes.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
                return;
            }
            let _eidList = [];
            for(let i = 0; i < this.eidList.length; i ++)
                _eidList.push({"EID": this.eidList[i]});
            //
            let me = this;
            this.$httpPost({
                url: '/payroll/salarycalc/integrate-paygen/insert',
                param: {
                    'formData': JSON.stringify({
                        "PAY_MONTH": this.payMonth,
                        "SEQ": String(this.payMonthSeq),
                        "PAY_GAAP":"1",
                        "EMPTYPE_CD":null,
                        "PAYTYPE_CD":null,
                        "JOBGROUP_CD":null,
                        "MODIFY_TYPE":null,
                        "EMP_SEL":"SELECT"}),
                    'paycdList': JSON.stringify(checkedPaycodes),
                    'paymonthseqList': '[]',
                    'eidList': JSON.stringify(_eidList)
                },
                callback: function() {
                    me.toastSuccessSave();
                }
            });
        },
        remove() {
            //
            let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
            if(checkedPaycodes.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
                return;
            }
            //
            let _eidList = [];
            for(let i = 0; i < this.eidList.length; i ++)
                _eidList.push({"EID": this.eidList[i]});

            let me = this;
            this.confirm({
                title: '확인',
                message: '정말 삭제하시겠습니까?',
                yesCallback: function() {
                    me.$httpPost({
                        param: {
                            'formData': JSON.stringify({
                                "PAY_MONTH": me.payMonth,
                                "SEQ": String(me.payMonthSeq),
                                "PAY_GAAP":"1",
                                "EMPTYPE_CD":null,
                                "PAYTYPE_CD":null,
                                "JOBGROUP_CD":null,
                                "MODIFY_TYPE":null,
                                "EMP_SEL":"SELECT"
                            }),
                            'paycdList': JSON.stringify(checkedPaycodes),
                            'paymonthseqList': '[]',
                            'eidList': JSON.stringify(_eidList)
                        },
                        url: '/payroll/salarycalc/integrate-paygen/delete',
                        callback: function() {
                            me.toastSuccessDelete();
                        }
                    });
                }
            });
        },
        close() {
            window.close();
        },
        //grid
        async loadGridData(checkedPaycodes) {
            try {
                let _eidList = [];
                for(let i = 0; i < this.eidList.length; i ++)
                    _eidList.push({"EID": this.eidList[i]});

                let {data} = await this.$httpPost({
                    url: '/payroll/salarycalc/integrate-paygen/list',
                    param: {
                        'formData': JSON.stringify({
                            "PAY_MONTH":this.payMonth,
                            "SEQ":String(this.payMonthSeq),
                            "PAY_GAAP":"1",
                            "EMPTYPE_CD":null,
                            "PAYTYPE_CD":null,
                            "JOBGROUP_CD":null,
                            "MODIFY_TYPE":null,
                            "EMP_SEL":"ALL"}
                        ),
                        'paycdList': JSON.stringify(checkedPaycodes),
                        'eidList': JSON.stringify(_eidList)
                    }
                });
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.log("PayCalculationPopup loadGridData error", e);    
            }
        },
        preview() {
            //
            let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
            if(checkedPaycodes.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
                return;
            }
            //
            this.loadGridData(checkedPaycodes);            
        }
    },
    mounted() {
        this.$refs.payrollItemGrid.createRealGrid({'domId': 'payroll-item-grid'});
        this.createRealGrid({'domId': 'payroll-item-grid-price'});
        this.asyncDynamicComponentData();
    },
}
</script>
