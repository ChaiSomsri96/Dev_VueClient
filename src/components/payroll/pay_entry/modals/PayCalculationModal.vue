<template>
<base-modal title="급여계산" id="pay-calculation-modal" :scroll="false" width="700">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <div class="form-group row">
                    <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-2" />
                </div>
                <div class="form-group row">
                    <label class="form-label type2 col-2">
                        <span>계산방법</span>
                    </label>
                    <div class="col-3">
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
            <payroll-item-grid id="payroll-item-grid" ref="payrollItemGrid" />
            <div id="payroll-item-grid-price" style="width: 100%; height: 250px; margin-top: 20px;" v-if="isGridShow"></div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
            </button>
            <button class="btn btn-md flat" @click="preview()">
                <i class="icon-lineIcon-sight mr-5"></i>미리보기
            </button>
            <button class="btn btn-md black" @click="save()">
                <i class="icon-lineIcon-check mr-5"></i>저장
            </button>
            <button class="btn btn-md" @click="remove()">
                <i class="icon-lineIcon-close mr-5"></i>삭제
            </button>
        </div>
    </template>
</base-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '@/components/common/BaseModal';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import PayrollItemGrid from '@/components/payroll/pay_entry/grids/PayrollItemGrid';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [modal, grid],
    components: {
        BaseModal,
        SalaryMonthsAndDates,
        PayrollItemGrid
    },
    props: {
        options: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isGridShow: false,
            isGridCreated: false,
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
                { header: "금액", fieldName: "PAY_AMOUNT", numberFormat: "#,##0", styleName: "right-column" },
            ]
        }
    },
    computed: {
        ...mapGetters({
            payMonth: 'paymonth/getPayMonth' ,
            payMonthSeq: 'paymonth/getPayMonthSeq' ,
            payDate: 'paymonth/getPayDate'
        })
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
        createDynamicComponent() {
           this.$refs.payrollItemGrid.createRealGrid({'domId': 'payroll-item-grid', 'gridParent': 'modal'});
        },
        //grid
        async loadGridData(checkedPaycodes) {
            try {
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
                        'eidList': '[]'
                    }
                });
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.log("PayCalculationModal loadGridData error", e);    
            }
        },

        async preview() {
            //
            let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
            if(checkedPaycodes.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
                return;
            }
            //
            this.isGridShow = true;
            await this.$nextTick();
            if(!this.isGridCreated) {
                this.isGridCreated = true;
                this.createRealGrid({'domId': 'payroll-item-grid-price', 'gridParent': 'modal'});
            }
            this.loadGridData(checkedPaycodes);
        },
        async save() {
            //
            let checkedPaycodes = this.$refs.payrollItemGrid.getCheckedPaycodes();
            if(checkedPaycodes.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePaycodeSelect'], type:"error"});
                return;
            }
            //
            let _eidList = [];
            for(let i = 0; i < this.options.checkedMembers.length; i ++)
                _eidList.push({"EID": this.options.checkedMembers[i]['EMP_CD']});
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
            for(let i = 0; i < this.options.checkedMembers.length; i ++)
                _eidList.push({"EID": this.options.checkedMembers[i]['EMP_CD']});
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
        }
    },
    mounted() {}
}
</script>
