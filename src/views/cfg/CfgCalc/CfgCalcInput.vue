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
                            급여 계산식 입력
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content-body">
        <div class="form-area">
            <div class="form-wrap">
                <labeled-input input-label="대상 급여코드" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.TARGET_PAYCD">
                    <ui-dropdown :items="formData.TARGET_PAYCD.items"
                                :value="formData.TARGET_PAYCD.value"
                                @change="targetPaycdChange($event)"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="대상자 선택용 Filter 종류" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.HR_CODETYPE">    
                    <ui-dropdown :items="formData.HR_CODETYPE.items"
                                :value="formData.HR_CODETYPE.value"
                                @change="formData.HR_CODETYPE.value=$event.value; formData.HR_CODETYPE.return=$event; errors['HR_CODETYPE']='';"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <labeled-input input-label="대상자 선택 조건" labelClass="col-3" inputClass="col-3"
                :error-msg="errors.CODETYPE">
                    <ui-dropdown :items="formData.CODETYPE.items"
                                :value="formData.CODETYPE.value"
                                @change="formData.CODETYPE.value=$event.value; formData.CODETYPE.return=$event; errors['CODETYPE']='';"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </labeled-input>
                <base-pay-grid ref="basePayGrid" />
                <labeled-input input-label="Base 급여와 인용테이블 연산" labelClass="col-3" inputClass="col-3" :error-msg="errors.REFER_CALCTYPE">
                    <ui-dropdown :items="formData.REFER_CALCTYPE.items"
                                :value="formData.REFER_CALCTYPE.value"
                                @change="changeReferCalcType($event)"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
                </labeled-input>

                <labeled-input input-label="인용테이블" labelClass="col-3" inputClass="col-3" :error-msg="errors.REFER_TABLE">
                    <ui-dropdown :items="formData.REFER_TABLE.items"
                                 :value="formData.REFER_TABLE.value"
                                 @change="formData.REFER_TABLE.value=$event.value; formData.REFER_TABLE.return=$event; errors['REFER_TABLE']='';" 
                                 :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }"
                    />
                </labeled-input>

                <refer-table-grid ref="referTableGrid" v-if="formData.REFER_CALCTYPE.value != ''" />
            </div>
            <div class="form-bottom">
                <button type="button" class="btn btn-lg flat" @click="cancel()"><i class="icon-lineIcon-close mr-5"></i>취소</button>
                <button type="button" class="btn btn-lg black ml-5" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
            </div>
        </div>
    </div>    
</div>
</template>
<script>
import BasePayGrid from "@/components/cfg/cfg_calc/grids/BasePayGrid";
import ReferTableGrid from '@/components/cfg/cfg_calc/grids/ReferTableGrid';
import LabeledInput from "@/components/common/LabeledInput";
import { mapGetters } from 'vuex';
export default {    
    components: {
        LabeledInput,
        BasePayGrid,
        ReferTableGrid
    },
    computed: {
        ...mapGetters({
            cfgCalcForm: 'cfgcalc/getCfgCalcForm'
        })
    },
    data() {
        return {
            errors: {},
            formData: {
                TARGET_PAYCD: {
                    value: '',
                    return: null,
                    items: []
                },
                HR_CODETYPE: {
                    value: '',
                    return: null,
                    items: [
                        { code: 'EMP_TYPE', message: '고용형태' },
                        { code: 'EMPRANK_CD', message: '직급' },
                        { code: 'EMPROLE_CD', message: '직책' },
                        { code: 'WORK_SITE', message: '사업장' },
                    ]
                },
                CODETYPE: {
                    value: '',
                    return: null,
                    items: [
                        { code: '정규직', message: '정규직' },
                        { code: '일반직', message: '일반직' },
                        { code: '계약직', message: '계약직' },
                    ]
                },
                REFER_CALCTYPE: { // Base 급여와 인용테이블 연산
                    value: '',
                    return: null,
                    items: [
                        { code: '+', message: '+' },
                        { code: '*', message: 'x' },
                        { code: '-', message: '-' },
                        { code: '/', message: '/' },
                    ]
                },
                REFER_TABLE: { // 인용테이블
                    value: '',
                    return: null,
                    items: [
                        { code: 'EMPTYPE', message: '고용형태' },
                        { code: 'RANK', message: '직급' },
                        { code: 'ROLE', message: '직책' },
                    ]   
                }
            }
        }
    },
    methods: {
        gridDataLoad() {
            if(this.formData.TARGET_PAYCD.value != '') {
                this.$refs.basePayGrid.loadGridData(this.formData.TARGET_PAYCD.value);
                if(this.formData.REFER_CALCTYPE.value != '') {
                    this.$refs.referTableGrid.loadGridData(this.formData.TARGET_PAYCD.value);
                }
            }
        },
        async changeReferCalcType($event) {
            //REFER_CALCTYPE
            let prevReferCalcTypeValue = this.formData.REFER_CALCTYPE.value;
            this.formData.REFER_CALCTYPE.value=$event.value;
            this.formData.REFER_CALCTYPE.return=$event;
            this.errors['REFER_CALCTYPE']='';

            await this.$nextTick();

            if(prevReferCalcTypeValue == '' && this.formData.TARGET_PAYCD.value != '') {
                this.$refs.referTableGrid.loadGridData(this.formData.TARGET_PAYCD.value);
            }
        },
        targetPaycdChange($event) { // 대상 급여코드 변경
            this.errors['TARGET_PAYCD'] = '';
            this.formData.TARGET_PAYCD.value=$event.value; 
            this.formData.TARGET_PAYCD.return=$event;

            this.gridDataLoad();
        },
        validationProcess() {
            let hasError = false;
            this.errors = {};
            
            if(this.payrollUtil.isEmpty(this.formData.TARGET_PAYCD.value)) {
                hasError = true;
                this.errors.TARGET_PAYCD = '대상 급여코드를 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.HR_CODETYPE.value)) {
                hasError = true;
                this.errors.HR_CODETYPE = '대상자 선택용 Filter 종류를 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.CODETYPE.value)) {
                hasError = true;
                this.errors.CODETYPE = '대상자 선택 조건을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.REFER_CALCTYPE.value)) {
                hasError = true;
                this.errors.REFER_CALCTYPE = 'Base 급여와 인용테이블 연산을 선택해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.formData.REFER_TABLE.value)) {
                hasError = true;
                this.errors.REFER_TABLE = '인용테이블을 선택해 주세요.';
            }

            if(hasError) {
                return false;
            }
            return true;
        },
        gotoList() {
            let me = this;
            me.$router.push({name: 'CfgCalc'});
        },       
        cancel() {
            this.$router.push({name: 'CfgCalc'});   
        },
        async loadTargetPaycd () {
            let { data } = await this.$httpPost({
                url: '/payroll/code/pay-pay/list_activive_with_virtual',
                param: {}          
            }) || [];
            for(let  i = 0; i < data.length;  i ++) {
                this.formData.TARGET_PAYCD.items.push({
                    code: data[i]['PAY_CODE'],
                    message: data[i]['PAY_NAME']
                })
            }
        },
        onSave() {
            if(!this.validationProcess()) {
                return;
            }
            let _payCodeList = this.$refs.basePayGrid.getGridData();
            let _filterConditionList = this.$refs.referTableGrid.getGridData();

            this.$httpPost({
                url: '/payroll/code/cfg-paycalc/save',
                param: {
                    'formData': JSON.stringify({
                        "TARGET_PAYCD" : this.formData.TARGET_PAYCD.value,
                        "HR_CODETYPE" : this.formData.HR_CODETYPE.value,
                        "BASE_PAY" : this.cfgCalcForm ? this.cfgCalcForm.BASE_PAY : '',
                        "REFER_CALCTYPE" : this.formData.REFER_CALCTYPE.value,
                        "REFER_TABLE" : this.formData.REFER_TABLE.value,
                        "REFER_NUMBER" : this.cfgCalcForm ? this.cfgCalcForm.REFER_NUMBER : '',
                        "DAILY_CALC" : this.cfgCalcForm ? this.cfgCalcForm.DAILY_CALC : '' 
                    }),
                    'payCodeList': JSON.stringify(_payCodeList),
                    'filterConditionList': JSON.stringify(_filterConditionList),
                },
                callback: function() {
                    me.toastSuccessSave();
                    me.$router.push({name: 'CfgCalc'});   
                } 
            });
        },
    },
    async mounted() {
        await this.loadTargetPaycd();
        if(!this.cfgCalcForm) 
            return;
       
        this.formData.TARGET_PAYCD.value = this.cfgCalcForm['TARGET_PAYCD'];
        this.formData.HR_CODETYPE.value = this.cfgCalcForm['HR_CODETYPE'];
        this.formData.REFER_CALCTYPE.value = this.cfgCalcForm['REFER_CALCTYPE'];
        this.formData.REFER_TABLE.value = this.cfgCalcForm['REFER_TABLE'];

        await this.$nextTick();

        this.gridDataLoad();
    },
}
</script>
