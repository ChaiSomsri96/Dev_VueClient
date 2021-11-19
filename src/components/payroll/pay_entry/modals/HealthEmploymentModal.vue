<template>
<base-modal title="건강/고용보험료 정산" id="health-employment" :scroll="false" width="700">
    <template v-slot:body>
        <div class="form-area">
            <div class="form-wrap">
                <div class="form-group row">
                    <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-2" />
                </div>
            </div>
            <div class="form-wrap">
                <div class="form-group row">
                    <label class="form-label type2 col-2">급여월 시작</label>
                    <div class="col-3">
                        <ui-month-picker v-model="formData.PAY_MONTH_FROM" />
                    </div>
                    <label class="form-label type2 col-2">급여월 끝</label>
                    <div class="col-3">
                        <ui-month-picker v-model="formData.PAY_MONTH_TO" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="form-label type2 col-2">정산기준연도</label>
                    <div class="col-3">
                        <ui-dropdown 
                        :items="formData.ATT_YEAR.items" 
                        :value="formData.ATT_YEAR.value" 
                        @change="formData.ATT_YEAR.value=$event.value; formData.ATT_YEAR.return=$event" 
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                        }"/>
                    </div>
                    <label class="form-label type2 col-2">정산연도</label>
                    <div class="row col-5">
                        <ui-radio-button-inline :options="formData.YEAR_TYPE" />
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소    
            </button>
            <button class="btn btn-md black"  @click="doCalc()">
                <i class="icon-lineIcon-del mr-5"></i>계산하기
            </button>
        </div>    
    </template>
</base-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '@/components/common/BaseModal';
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';

import modal from '@/mixin/modal';

export default {
    mixins: [modal],
    components: {
        BaseModal,
        SalaryMonthsAndDates,
        UiMonthPicker,
        UiRadioButtonInline
    },
    props: {
        options: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            eidList: [],
            formData: {
                PAY_MONTH_FROM: '202101',
                PAY_MONTH_TO: '202104',
                ATT_YEAR: {
                    value: String(new Date().getFullYear()),
                    return: null,
                    items: this.getRecentYearList()
                },
                YEAR_TYPE: {
                    name: 'calculate',
                    value: 'PRV',
                    domOptList: [
                        { value: 'NOW', label: '당년정산', id: 'radio-this-year' },
                        { value: 'PRV', label: '전년정산', id: 'radio-last-year' } ]
                }      
            }
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
        //modal
        asyncDynamicComponentData(param) {
            this.eidList = param;
        },
        doCalc() {
            this.close({
                'PAY_MONTH_FROM': this.formData.PAY_MONTH_FROM,
                'PAY_MONTH_TO': this.formData.PAY_MONTH_TO,
                'YEAR_TYPE': this.formData.YEAR_TYPE.value,
                'SETTLE_YEAR': this.formData.ATT_YEAR.value,
                'selectedEids': this.eidList
            });
        }
    },
}
</script>
