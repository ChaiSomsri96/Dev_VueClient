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
                            {{ menuText }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content-body">
        <div class="form-area pb-0">
            <div class="form-wrap">  
                <div class="form-group row">
                    <salary-months-and-dates :salary-month="payMonth" :salary-date="payDate" :degree="payMonthSeq" label-class-attr="col-2" />
                </div>

                <div class="form-group row">
                    <label class="form-label type2 col-2">급여월 시작</label>
                    <div class="col-2">
                        <ui-month-picker v-model="formData.PAY_MONTH_FROM" />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="form-label type2 col-2">급여월 끝</label>
                    <div class="col-2">
                        <ui-month-picker v-model="formData.PAY_MONTH_TO" />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="form-label type2 col-2">정산기준연도</label>
                    <div class="col-2">
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
                </div>

                <div class="form-group row">
                    <label class="form-label type2 col-2">정산연도</label>
                    <div class="row col-2">
                        <ui-radio-button-inline :options="formData.YEAR_TYPE" />
                    </div>
                </div>
            </div>

            <div class="form-bottom">
                <button class="btn btn-md black"  @click="doCalc()">
                    <i class="icon-lineIcon-del mr-5"></i>계산하기
                </button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import SalaryMonthsAndDates from '@/components/common/SalaryMonthsAndDates';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import { mapGetters } from 'vuex';

export default {
    components: {
        SalaryMonthsAndDates,
        UiMonthPicker,
        UiRadioButtonInline
    },
    computed: {
        ...mapGetters({
            payMonth: 'paymonth/getPayMonth',
            payMonthSeq: 'paymonth/getPayMonthSeq',
            payDate: 'paymonth/getPayDate',
            eidList: 'health_employment/getSelectedEids'
        }),
        menuText() {
            return this.payMonth + '월 ' + this.payMonthSeq + '차 건강/고용 보험료 정산';
        }
    },
    data() {
        return {
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
    methods: {
        gotoList()  {
            this.$router.push({ name: 'PayEntry' });
        },
        doCalc() {   
            // vuex 추가
            this.$store.dispatch('health_employment/setData', {
                payMonthFrom: this.formData.PAY_MONTH_FROM,
                payMonthTo: this.formData.PAY_MONTH_TO,
                settleDay: this.formData.ATT_YEAR.value + '1231',
                yearType: this.formData.YEAR_TYPE.value,
                selectedEids: this.eidList
            });
            this.$router.push({name: 'HealthEmployment'});
        }
    }
}
</script>