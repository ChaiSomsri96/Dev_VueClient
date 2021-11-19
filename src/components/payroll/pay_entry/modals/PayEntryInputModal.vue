<template>
<base-modal title="급여입력" id="payentry-input-modal" :scroll="false" size="large" width="1000">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <div class="row">
                    <label class="form-label type2 col-3">
                        <span>사번 {{ cOptions.empNumber }}</span>
                    </label>
                    <label class="form-label type2 col-3">
                        <span>이름: {{ cOptions.empNam }} </span>
                    </label>
                </div>
            </div>

            <div class="form-wrap">
                <div class="col-6">
                    <div class="form-group row">
                        <label class="form-label type2 col-4">
                            <span>지급</span>
                        </label>
                        <div class="col-8">
                            <custom-form-input @return="searchPayByKeyword" placeholder="급여코드/급여코드명 검색" />
                        </div>
                    </div>
                    <pay-entry-input-grid id="pay-input-realgrid" ref="payInputRealgrid" @change="inputPayAmount" />
                </div>
                <div class="col-6">
                    <div class="form-group row">
                        <label class="form-label type2 col-4">
                            <span>공제</span>
                        </label>
                        <div class="col-8">
                            <custom-form-input @return="searchDeductionByKeyword" placeholder="급여코드/급여코드명 검색" />
                        </div>
                    </div>
                    <pay-entry-input-grid id="deduction-input-realgrid" ref="deductionInputRealgrid" payroll-input-type="TAX" @change="inputPayAmount" />
                </div>
            </div>

        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" @click="close()">
                <i class="icon-lineIcon-close mr-5"></i>창닫기
            </button>
            <button class="btn btn-md black" @click="doSave()">
                <i class="icon-lineIcon-check mr-5"></i>저장
            </button>
            <button class="btn btn-md" @click="initialize()">
                <i class="icon-lineIcon-close mr-5"></i>초기화
            </button>
        </div>
    </template>
</base-modal>
</template>

<script>
// import { mapGetters } from 'vuex';
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import CustomFormInput from '@/components/common/CustomFormInput';
import PayEntryInputGrid from '@/components/payroll/pay_entry/grids/PayEntryInputGrid';

export default {
    mixins: [modal],
    components: {
        BaseModal,
        CustomFormInput,
        PayEntryInputGrid
    },
    props: {
        options: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            selectList: [],
            payMonth: '',
            payMonthSeq: 0
        }
    },
    computed: {
        /* 
        ...mapGetters({
            payMonth: 'paymonth/getPayMonth' ,
            payMonthSeq: 'paymonth/getPayMonthSeq'
        }), */
        cOptions: function cOptions() {
            let defaultOptions = {
                empCd: 0,
                empNam: '',
                empNumber: ''
            };
            if (Array.isArray(this.options.checkedMembers) && this.options.checkedMembers.length > 0) {
              console.log(this.options)
                defaultOptions['empCd'] = this.options.checkedMembers[0]['EMP_CD'];
                defaultOptions['empNam'] = this.options.checkedMembers[0]['EMP_NAM'];
                defaultOptions['empNumber'] = this.options.checkedMembers[0]['EMP_NUMBER'];
            }
            return defaultOptions;
        }
    },
    methods: {
        asyncDynamicComponentData(_param) {
            this.payMonth = _param.payMonth;
            this.payMonthSeq = _param.payMonthSeq;
            this.setDataToPayrollInputGrid({
                payMonth: _param.payMonth,
                payMonthSeq: _param.payMonthSeq,
                empNumber: _param.checkedMembers[0]['EMP_NUMBER'],
                empCd: _param.checkedMembers[0]['EMP_CD'],
                empNam: _param.checkedMembers[0]['EMP_NAM']
            });
        },
        createDynamicComponent() {
            this.$refs.payInputRealgrid.createRealGrid({'domId': 'pay-input-realgrid', 'gridParent': 'modal', 'editable': true});
            this.$refs.deductionInputRealgrid.createRealGrid({'domId': 'deduction-input-realgrid', 'gridParent': 'modal', 'editable': true});
        },
        searchPayByKeyword(_keyword) {
            this.$refs.payInputRealgrid.searchPayrollItemByKeyword(_keyword);
        },
        searchDeductionByKeyword(_keyword) {
            this.$refs.deductionInputRealgrid.searchPayrollItemByKeyword(_keyword);
        },
        initialize() {
            if(this.$refs.payInputRealgrid.gridView.isItemEditing() || this.$refs.deductionInputRealgrid.gridView.isItemEditing()) {
                this.toastAlertEditing();
                return false;
            }
            this.setDataToPayrollInputGrid({
                'payMonth': this.payMonth,
                'payMonthSeq': this.payMonthSeq,
                ...this.cOptions
            });
        },
        doSave() {
            let me = this;
            if(this.$refs.payInputRealgrid.gridView.isItemEditing() || this.$refs.deductionInputRealgrid.gridView.isItemEditing()) {
                me.toastAlertEditing();
                return false;
            }
            this.$httpPost({
                url: '/payroll/salarymanual/pay-entrypaycd/insert',
                param: {
                    'selectList': JSON.stringify(this.selectList),
                    'selectFormData': JSON.stringify({
                        'PAY_MONTH': this.payMonth,
                        'SEQ': this.payMonthSeq,
                        'PAY_GAAP': "1",
                        'EMP_NUMBER': this.cOptions.empNumber,
                        'EMP_NAM': this.cOptions.empNam,
                        'EMP_CD': this.cOptions.empCd
                    })
                },
                callback: function() {
                    me.toastSuccessSave();
                    me.selectList = [];
                    me.setDataToPayrollInputGrid({
                        'payMonth': me.payMonth,
                        'payMonthSeq': me.payMonthSeq,
                        ...me.cOptions
                    });
                }
            });
        },
        
        setDataToPayrollInputGrid(param) {
            this.$refs.payInputRealgrid.loadGridData(param);
            this.$refs.deductionInputRealgrid.loadGridData(param);
        },
        inputPayAmount(event) {
            for(let i = 0; i < this.selectList.length; i ++) {
                if(this.selectList[i]['PAY_CODE'] == event['PAY_CODE']) {
                    this.selectList[i]['PAY_AMOUNT'] = event['PAY_AMOUNT'];
                    event = null;
                    break;
                }
            }

            if( event != null )
                this.selectList.push({ ...event, "M_OVERRID": "M", "isChecked": true});
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
#payentry-input-modal {
    .form-wrap {
        display: flex;
    }
}
</style>
