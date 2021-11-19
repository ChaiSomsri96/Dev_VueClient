<template>
    <base-modal title="기타소득 입력" id="otherinc-input-modal" size="large" width="800">

        <template v-slot:body>
            <table-form :colgroup="['15%', 'auto', '15%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="사업장" :has-error="errors.BIZUNIT_CODE != ''" :required="formData.BIZUNIT_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.BIZUNIT_CODE">
                            <ui-dropdown :items="formData.BIZUNIT_CODE.items"
                                         :value="formData.BIZUNIT_CODE.value"
                                         @change="onChangeBpCode"
                                         :options="{
                                             valueField  : 'BP_CODE',
                                             labelField  : 'DV_NAME',
                                             tooltipField: 'DV_NAME'}"/>
                        </table-form-item>
                        <table-form-label label="소득자" :has-error="errors.EARNER_CODE != ''" :required="formData.EARNER_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_CODE">
                            <ui-dropdown :items="formData.EARNER_CODE.items"
                                         :value="formData.EARNER_CODE.value"
                                         @change="formData.EARNER_CODE.value=$event.value;"
                                         :options="{
                                           valueField  : 'EARNER_CODE',
                                           labelField  : 'EARNER_NAME',
                                           tooltipField: 'EARNER_NAME',
                                           disabled: formData.EARNER_CODE.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득구분" :has-error="errors.INCOME_TYPE != ''" :required="formData.INCOME_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.INCOME_TYPE">
                            <mastcode-dropdown :options="{superCode: 'L7'}"
                                               v-model="formData.INCOME_TYPE.value"
                                               @change="formData.INCOME_TYPE.value=$event.value;" />
                        </table-form-item>
                        <table-form-label label="귀속월" :has-error="errors.PAY_MONTH != ''" :required="formData.PAY_MONTH.isRequired"/>
                        <table-form-item :error-msg="errors.PAY_MONTH">
                            <ui-dropdown :items="formData.PAY_MONTH.items"
                                         :value="formData.PAY_MONTH.value"
                                         @change="onChangePayMonth"
                                         :options="{
                                               valueField  : 'code',
                                               labelField  : 'message',
                                               tooltipField: 'message'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="지급일" :has-error="errors.PAY_DATE != ''" :required="formData.PAY_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.PAY_DATE">
                            <ui-input-date :date="formData.PAY_DATE.value"
                                           @change="formData.PAY_DATE.value=$event"/>
                        </table-form-item>
                        <table-form-label label="지급총액" :has-error="errors.PAY_AMOUNT != ''" :required="formData.PAY_AMOUNT.isRequired"/>
                        <table-form-item :error-msg="errors.PAY_AMOUNT">
                            <ui-input-number :value="formData.PAY_AMOUNT.value"
                                             @change="onChangePayAmount" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="보유기간" :has-error="errors.HOLDING_PERIOD != ''" :required="formData.HOLDING_PERIOD.isRequired"/>
                        <table-form-item :error-msg="errors.HOLDING_PERIOD">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-dropdown :items="formData.HOLDING_PERIOD.items"
                                             :value="formData.HOLDING_PERIOD.value"
                                             @change="formData.HOLDING_PERIOD.value=$event.value;formData.HOLDING_PERIOD.isChangeData=true"
                                             :options="{
                                              disabled: formData.HOLDING_PERIOD.isDisabled,
                                                  valueField  : 'code',
                                                  labelField  : 'message',
                                                  tooltipField: 'message'}"/>
                                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-0" @click="doCalcExpense">
                                    <span>경비계산</span>
                                </button>
                            </div>
                        </table-form-item>
                        <table-form-label label="필요경비" :has-error="errors.EXPENSE != ''" :required="formData.EXPENSE.isRequired"/>
                        <table-form-item :error-msg="errors.EXPENSE">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input-number :value="formData.EXPENSE.value"
                                                 @change="onChangeExpense"
                                                 :options="{readonly: formData.EXPENSE.isReadOnly}"/>
                                <span style="padding: 0 5px; width: 70px">{{formData.EXPRATE.value}}(%)</span>
                            </div>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득금액" :required="formData.AMT.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.AMT.value"
                                             @change="formData.AMT.value=$event;"
                                             :options="{readonly: formData.AMT.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="세율" :required="formData.TAX_RATE.isRequired"/>
                        <table-form-item>
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input-number :value="formData.TAX_RATE.value"
                                                 @change="formData.TAX_RATE.value=$event;"
                                                 :options="{readonly: formData.TAX_RATE.isReadOnly}"/>
                                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-0" @click="doCalcRate">
                                    <span>세액계산</span>
                                </button>
                            </div>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득세" :has-error="errors.INCOME_TAX != ''" :required="formData.INCOME_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.INCOME_TAX">
                            <ui-input-number :value="formData.INCOME_TAX.value"
                                             @change="formData.INCOME_TAX.value=$event;"
                                             :options="{readonly: formData.INCOME_TAX.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="지방소득세" :has-error="errors.RESID_TAX != ''" :required="formData.RESID_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.RESID_TAX">
                            <ui-input-number :value="formData.RESID_TAX.value"
                                             @change="formData.RESID_TAX.value=$event;"
                                             :options="{readonly: formData.RESID_TAX.isReadOnly}" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="농특세" :required="formData.AGRO_TAX.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.AGRO_TAX.value"
                                             @change="formData.AGRO_TAX.value=$event;" />
                        </table-form-item>
                        <table-form-label label="비고" :required="formData.REMARK.isRequired"/>
                        <table-form-item>
                            <ui-input :value="formData.REMARK.value"
                                      @change="formData.REMARK.value=$event;" />
                        </table-form-item>
                    </tr>
                </template>
            </table-form>
        </template>
        <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
            </button>
            <button type="button"
                    class="btn btn-md black"
                    v-on:click="doSave">
                <i class="icon-lineIcon-check mr-5"></i><span>저장</span>
            </button>
        </div>
    </template>
    </base-modal>
</template>
<script>
    import BaseModal from '@/components/common/BaseModal';
    import modal from '@/mixin/modal';
    import TableForm from '@/components/common/TableForm';
    import TableFormItem from '@/components/common/TableFormItem';
    import TableFormLabel from '@/components/common/TableFormLabel';
    import MastcodeDropdown from '@/components/common/MastcodeDropdown';

    export default {
        name: 'bizinc-other-input-modal',
        mixins: [modal],
        components: {
            BaseModal,
            TableForm,
            TableFormItem,
            TableFormLabel,
            MastcodeDropdown
        },
        data() {
            return {
                errors: {},
                formData: {
                    SEQ_NO: {
                        value: '',
                        isRequired: false,
                    },
                    ATT_YEAR: {
                        value: '',
                        isRequired: false
                    },
                    EARNER_CODE: {
                        value: '',
                        isRequired: true,
                        isReadOnly: true,
                        items: [],
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '사업장을 선택해주세요.',
                        items: [],
                    },
                    TAX_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    WARD_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    INCOME_TYPE: {
                        value: '',
                        isRequired: true,
                        isChangeDataByExpense: false,
                        isChangeDataByRate: false,
                        validMsg: '소득구분을 선택해주세요.'
                    },
                    PAY_PER: {
                        value: '',
                        isRequired: false,
                    },
                    PAY_MONTH: {
                        value: '',
                        isRequired: true,
                        validMsg: '귀속월을 선택해주세요.',
                        items: [
                            {code: '01', message: '1월'},
                            {code: '02', message: '2월'},
                            {code: '03', message: '3월'},
                            {code: '04', message: '4월'},
                            {code: '05', message: '5월'},
                            {code: '06', message: '6월'},
                            {code: '07', message: '7월'},
                            {code: '08', message: '8월'},
                            {code: '09', message: '9월'},
                            {code: '10', message: '10월'},
                            {code: '11', message: '11월'},
                            {code: '12', message: '12월'},
                        ]
                    },
                    PAY_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '지급일을 입력해주세요.'
                    },
                    PAY_AMOUNT: {
                        value: 0,
                        isRequired: true,
                        isChangeData: false,
                        validMsg: '지급총액을 입력해주세요.'
                    },
                    HOLDING_PERIOD: {
                        value: '',
                        isRequired: false,
                        isDisabled: true,
                        isChangeData: false,
                        validMsg: '보유기간을 선택해주세요.',
                        items: [
                            {code: '1', message: '10년 미만'},
                            {code: '2', message: '10년 이상'}
                        ]
                    },
                    EXPRATE: {
                        value: 0,
                        isRequired: false,
                    },
                    EXPENSE: {
                        value: 0,
                        isRequired: false,
                        isChangeData: false,
                        isReadOnly: false,
                    },
                    AMT: {
                        value: 0,
                        isRequired: false,
                        isReadOnly: true
                    },
                    TAX_RATE: {
                        value: 0,
                        isRequired: false,
                        isReadOnly: true,
                    },
                    INCOME_TAX: {
                        value: 0,
                        isRequired: false,
                        isReadOnly: true
                    },
                    RESID_TAX: {
                        value: 0,
                        isRequired: false,
                        isReadOnly: true
                    },
                    AGRO_TAX: {
                        value: 0,
                        isRequired: false,
                    },
                    REMARK: {
                        value: '',
                        isRequired: false,
                    }
                },
                expRateValueItems: {
                    type1: {
                        DEFAULT_RATE_VALUE: 0,
                        isReadOnly: true,
                        INCOME_TYPE_LIST: ['60', '61', '63', '65', '68'],
                        getRateValue: function(param) {
                            let expenseValue = param.EXPENSE.value;
                            let payAmount = param.PAY_AMOUNT.value;
                            if( expenseValue === 0) {
                                return 0;
                            }

                            return Math.floor(expenseValue / payAmount * 100 * 10) / 10;
                        },
                        getExpenseValue: function(param) {
                            return param.PAY_AMOUNT.value * this.DEFAULT_RATE_VALUE / 100;
                        },
                        isValid: function(param) {
                            if(param.EXPRATE.value !== 0) {
                                return {
                                    valid: false,
                                    msg: '경비율이 0(%)이 아닌 값을 입력할 수 없습니다.<br>필요경비 또는 지급총액을 수정해주세요.'
                                };
                            }

                            return {
                                valid: true,
                                msg: ''
                            }
                        }
                    },
                    type2: {
                        INCOME_TYPE_LIST: ['71', '74'],
                        DEFAULT_RATE_VALUE: 80,
                        isReadOnly: false,
                        getRateValue: function(param) {
                            let expenseValue = param.EXPENSE.value;
                            let payAmount = param.PAY_AMOUNT.value;
                            if( expenseValue === 0) {
                                return 0;
                            }

                            return Math.floor(expenseValue / payAmount * 100 * 10) / 10;
                        },
                        getExpenseValue: function(param) {
                            return param.PAY_AMOUNT.value * this.DEFAULT_RATE_VALUE / 100;
                        },
                        isValid: function(param) {
                            if(param.EXPRATE.value < 80) {
                                return {
                                    valid: false,
                                    msg: '경비율이 80(%)미만인 값을 입력할 수 없습니다.<br>필요경비 또는 지급총액을 수정해주세요.'
                                };
                            }

                            return {
                                valid: true,
                                msg: ''
                            }
                        }
                    },
                    type3: {
                        INCOME_TYPE_LIST: ['72', '73', '75', '76', '79', '80'],
                        DEFAULT_RATE_VALUE: 60,
                        isReadOnly: false,
                        getRateValue: function(param) {
                            let expenseValue = param.EXPENSE.value;
                            let payAmount = param.PAY_AMOUNT.value;
                            if( expenseValue === 0) {
                                return 0;
                            }

                            return Math.floor(expenseValue / payAmount * 100 * 10) / 10;
                        },
                        getExpenseValue: function(param) {
                            return param.PAY_AMOUNT.value * this.DEFAULT_RATE_VALUE / 100;
                        },
                        isValid: function(param) {
                            if(param.EXPRATE.value < 60) {
                                return {
                                    valid: false,
                                    msg: '경비율이 60(%)미만인 값을 입력할 수 없습니다.<br>필요경비 또는 지급총액을 수정해주세요.'
                                };
                            }

                            return {
                                valid: true,
                                msg: ''
                            }
                        }
                    },
                    type4: {
                        INCOME_TYPE_LIST: ['62'],
                        DEFAULT_RATE_VALUE: 0,
                        isReadOnly: true,
                        getRateValue: function(param) {
                            let expenseValue = param.EXPENSE.value;
                            let payAmount = param.PAY_AMOUNT.value;
                            if( expenseValue === 0) {
                                return 0;
                            }

                            return Math.floor(expenseValue / payAmount * 100 * 10) / 10;
                        },
                        getExpenseValue: function(param) {
                            return param.PAY_AMOUNT.value * this.DEFAULT_RATE_VALUE / 100;
                        },
                        isValid: function(param) {
                            if(param.EXPRATE.value !== 0) {
                                return {
                                    valid: false,
                                    msg: '경비율이 0(%)이 아닌 값을 입력할 수 없습니다.<br>필요경비 또는 지급총액을 수정해주세요.'
                                };
                            }

                            return {
                                valid: true,
                                msg: ''
                            }
                        }
                    },
                    type5: {
                        INCOME_TYPE_LIST: ['64'],
                        DIVISION_AMT: 100000000,
                        isReadOnly: true,
                        getRateValue: function(param) {
                            let expenseValue = param.EXPENSE.value;
                            let payAmount = param.PAY_AMOUNT.value;
                            if( expenseValue === 0) {
                                return 0;
                            }

                            return Math.floor(expenseValue / payAmount * 100 * 10) / 10;
                        },
                        getExpenseValue: function(param) {
                            // 보유기간이 10년 이상인 경우 -> 지급총액 * 90%
                            if(param.HOLDING_PERIOD.value === '2') {
                                return param.PAY_AMOUNT.value * 90 / 100;
                            }

                            // 보유기간이 10년 미만이고 지급총액이 1억 이하인 경우 -> 지급총액 * 90%
                            if(param.PAY_AMOUNT.value <= this.DIVISION_AMT) {
                                return param.PAY_AMOUNT.value * 90 / 100;
                            }

                            // 보유기간이 10년 미만이고 지급총액이 1억 초과인 경우 -> 1억 * 90% + (지급총액 - 1억) * 80%
                            return (this.DIVISION_AMT * 90 / 100) + (param.PAY_AMOUNT.value - this.DIVISION_AMT) * 80 / 100;
                        },
                        isValid: function() {
                            return {
                                valid: true,
                                msg: ''
                            }
                        }
                    }
                },
                taxRateValueItems: {
                    type1: {
                        INCOME_TYPE_LIST: ['60', '62', '64', '65', '71', '72', '73', '74', '75', '76', '78', '79', '80'],
                        SMALL_TAX_AMT: 50000, // 소액부징수 소득금액 50,000
                        SMALL_INCOME_TAX: 1000, // 소액부징수 세액 1000
                        getRateValue: function() {
                            return 20;
                        },
                        getIncomeTaxValue: function(param) {
                            // 소득금액 50,000원 이하 소액부징수
                            if( param.AMT.value <= this.SMALL_TAX_AMT) {
                                return 0;
                            }

                            let value = this.getRateValue() * param.AMT.value / 100;
                            // 세액 1,000원 미만 소액부징수
                            if( value < this.SMALL_INCOME_TAX) {
                                return 0;
                            }

                            return value;
                        }
                    },
                    type2: {
                        INCOME_TYPE_LIST: ['63'],
                        SMALL_TAX_AMT: 50000, // 소액부징수 소득금액 50,000
                        SMALL_INCOME_TAX: 1000, // 소액부징수 세액 1000
                        getRateValue: function() {
                            return 15;
                        },
                        getIncomeTaxValue: function(param) {
                            // 소득금액 50,000원 이하 소액부징수
                            if( param.AMT.value <= this.SMALL_TAX_AMT) {
                                return 0;
                            }

                            let value = this.getRateValue() * param.AMT.value / 100;
                            // 세액 1,000원 미만 소액부징수
                            if( value < this.SMALL_INCOME_TAX) {
                                return 0;
                            }

                            return value;
                        }
                    },
                    type3: {
                        INCOME_TYPE_LIST: ['61', '68'],
                        SMALL_TAX_AMT: 50000, // 소액부징수 소득금액 50,000
                        SMALL_INCOME_TAX: 1000, // 소액부징수 세액 1000
                        getRateValue: function() {
                            return 0;
                        },
                        getIncomeTaxValue: function(param) {
                            // 소득금액 50,000원 이하 소액부징수
                            if( param.AMT.value <= this.SMALL_TAX_AMT) {
                                return 0;
                            }

                            let value = this.getRateValue() * param.AMT.value / 100;
                            // 세액 1,000원 미만 소액부징수
                            if( value < this.SMALL_INCOME_TAX) {
                                return 0;
                            }

                            return value;
                        }
                    },
                    type4: {
                        INCOME_TYPE_LIST: [ '69'],
                        DIVISION_AMT: 300000000,
                        SMALL_TAX_AMT: 50000, // 소액부징수 소득금액 50,000
                        SMALL_INCOME_TAX: 1000, // 소액부징수 세액 1000
                        getRateValue: function(amt = 0) {
                           if(amt > this.DIVISION_AMT) {
                                return 30;
                            } else {
                                return 20;
                            }
                        },
                        getIncomeTaxValue: function(param) {
                            // 소득금액 50,000원 이하 소액부징수
                            if( param.AMT.value <= this.SMALL_TAX_AMT) {
                                return 0;
                            }

                            let value = 0;
                            if(param.INCOME_TYPE.value !== '69') {
                                value =  this.getRateValue() * param.AMT.value / 100;
                            } else if(param.AMT.value <= this.DIVISION_AMT) {
                                value =  this.getRateValue() * param.AMT.value / 100;
                            } else {
                                value = (this.DIVISION_AMT * 20 / 100) + (param.AMT.value - this.DIVISION_AMT) * 30 / 100;
                            }

                            // 세액 1,000원 미만 소액부징수
                            if( value < this.SMALL_INCOME_TAX) {
                                return 0;
                            }

                            return value;
                        }
                    }
                }
            }
        },

        watch: {
            'formData.INCOME_TYPE.value': {
                handler: function() {
                    this.formData.INCOME_TYPE.isChangeDataByExpense = true;
                    this.formData.INCOME_TYPE.isChangeDataByRate = true;

                    this.setHoldingPeriodOptions();

                    this.setRateValue();

                    this.setExpRateReadOnly();
                }
            }
        },
        methods: {
            createDynamicComponent() {
                this.loadDropdownData();
            },

            async loadDropdownData() {
                // 신고관리 사업장
                this.formData.BIZUNIT_CODE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });

                // 소득자
                this.formData.EARNER_CODE.items = await this.getDropdownData({
                    url: '/earner/selectResidencePersonal',
                    params: {}
                });

                // 귀속연도
                this.setAttYear();
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            async setAttYear() {
                const {data} = await this.$httpGet( '/bizinc/config/extinc/open-year/find', {});
                this.formData.ATT_YEAR.value = data.msg || '';
            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
            },

            onChangePayAmount: function(value) {
                this.formData.PAY_AMOUNT.value = value;
                this.formData.PAY_AMOUNT.isChangeData = true;

                // 소득금액 셋팅
                this.setAmtValue();

                // 경비율 셋팅
                this.setExpRateValue();
            },

            onChangeExpense: function(value) {
                this.formData.EXPENSE.value = value;

                // 소득금액 셋팅
                this.setAmtValue();

                // 경비율 셋팅
                this.setExpRateValue();
            },

            setAmtValue: function() {
                this.formData.AMT.value = this.formData.PAY_AMOUNT.value - this.formData.EXPENSE.value;
                if(this.formData.INCOME_TYPE.value === '69') {
                    this.setRateValue();
                }
            },

            setHoldingPeriodOptions: function() {
                let holdingPeriodData = this.formData.HOLDING_PERIOD;
                if(this.formData.INCOME_TYPE.value === '64') {
                    holdingPeriodData.isDisabled = false;
                    holdingPeriodData.isRequired = true;
                } else {
                    holdingPeriodData.value = this.$options.data().formData.HOLDING_PERIOD.value;
                    holdingPeriodData.isDisabled = true;
                    holdingPeriodData.isRequired = false;
                }
            },

            setRateValue: function() {
                let incomeType = this.formData.INCOME_TYPE.value;
                let amt = this.formData.AMT.value;
                let keys = Object.keys( this.taxRateValueItems);
                const me = this;
                let value = 0;

                keys.forEach((key) => {
                    if(me.taxRateValueItems[key].INCOME_TYPE_LIST.includes( incomeType)) {
                        value = me.taxRateValueItems[key].getRateValue(amt);
                        return false;
                    }
                });

                me.formData.TAX_RATE.value = value;
            },

            doCalcRate: function() {
                let incomeType = this.formData.INCOME_TYPE.value;
                let keys = Object.keys( this.taxRateValueItems);
                const me = this;
                let incomeValue = 0;

                keys.forEach((key) => {
                    let item = me.taxRateValueItems[key];
                    if(item.INCOME_TYPE_LIST.includes( incomeType)) {
                        incomeValue = Math.floor(item.getIncomeTaxValue(me.formData) * 0.1) * 10;
                        return false;
                    }
                });

                this.formData.INCOME_TAX.value = incomeValue;
                this.formData.RESID_TAX.value = Math.floor(incomeValue * 0.01) * 10;

                this.setFalseChangeDataByRate();
            },

            onChangeBpCode: function( fd) {
                const me = this;
                const targetFdNmList = ['BIZUNIT_CODE', 'WARD_OFFICE', 'TAX_OFFICE'];
                const sourceFdNmList = ['BP_CODE', 'BIZ_WARD', 'DV_TAXAUTH'];

                targetFdNmList.forEach( (fdNm, idx) => {
                    me.formData[fdNm].value = fd.object[sourceFdNmList[idx]];
                });
            },

            setFalseChangeDataByRate: function() {
                this.formData.INCOME_TYPE.isChangeDataByRate = false;
            },

            setFalseChangeDataByEpense: function() {
                this.formData.INCOME_TYPE.isChangeDataByExpense = false;
                this.formData.PAY_AMOUNT.isChangeData = false;
                this.formData.HOLDING_PERIOD.isChangeData = false;
            },

            doCalcExpense: function() {
                if(! this.isValidCalcExpense()) {
                    return;
                }

                // 경비계산과 관련된 항목 데이터 변경여부를  false로 변경
                this.setFalseChangeDataByEpense();

                // 필요경비 셋팅
                this.setExpenseValue();

                // 경비율 셋팅
                this.setExpRateValue();
            },

            isValidCalcExpense: function() {
                this.errors  = {};
                let incomeType = this.formData.INCOME_TYPE.value;
                let valid = true;
                if(this.payrollUtil.isEmpty(this.formData.INCOME_TYPE.value)) {
                    this.errors.INCOME_TYPE = '소득구분을 선택해주세요';
                    valid = false;
                }

                if(this.formData.PAY_AMOUNT.value === 0) {
                    this.errors.PAY_AMOUNT = '지급총액을 입력해주세요.';
                    valid = false;
                }

                if(incomeType === '64' && ! this.formData.HOLDING_PERIOD.value) {
                    this.errors.HOLDING_PERIOD = '보유기간을 선택해주세요.';
                    valid = false;
                }

                return valid;
            },

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.setFormData(_param);

                this.setReadOnly(_param);
            },

            setReadOnly: function( param) {
                if(param.OPEN_TYPE === 'UPDATE') {
                    this.formData.EARNER_CODE.isReadOnly = true;
                } else {
                    this.formData.EARNER_CODE.isReadOnly = false;
                }
            },

            setFormData: function(data) {
                const me = this;
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    me.formData[key].value = data[key] || me.$options.data().formData[key].value;
                });
            },

            onChangePayMonth: function( fd) {
                this.formData.PAY_MONTH.value = fd.object.code;
                this.formData.PAY_PER.value = this.formData.ATT_YEAR.value + fd.object.code;
            },

            isValidSaveData: function() {
                this.errors = {};
                const me = this;
                let valid = true;
                let keys = Object.keys(this.formData);

                keys.forEach((key) => {
                    let data = me.formData[key];
                    if(! data.isRequired) {
                        return true;
                    }

                    if(this.payrollUtil.isEmpty(data.value)) {
                        me.errors[key] = data.validMsg;
                        valid = false;
                        return true;
                    }
                });

                return valid;
            },

            setExpRateReadOnly: function() {
                const incomeType = this.formData.INCOME_TYPE.value;
                const keys = Object.keys(this.expRateValueItems);
                const me = this;
                let isReadOnly = false;

                keys.forEach((key) => {
                    let item = me.expRateValueItems[key];
                    if(! item.INCOME_TYPE_LIST.includes( incomeType)) {
                        return true;
                    }

                    isReadOnly = item.isReadOnly;
                    return false;
                });

                me.formData.EXPENSE.isReadOnly = isReadOnly;
            },

            setExpRateValue: function() {
                const incomeType = this.formData.INCOME_TYPE.value;
                const keys = Object.keys(this.expRateValueItems);
                const me = this;
                let rate = 0;

                keys.forEach((key) => {
                    let item = me.expRateValueItems[key];
                    if(! item.INCOME_TYPE_LIST.includes( incomeType)) {
                        return true;
                    }

                    rate = item.getRateValue(me.formData);
                    return false;
                });

                this.formData.EXPRATE.value = rate;
            },

            setExpenseValue: function() {
                let incomeType = this.formData.INCOME_TYPE.value;
                let keys = Object.keys(this.expRateValueItems);
                const me = this;
                let value = 0;

                keys.forEach((key) => {
                    let item = me.expRateValueItems[key];
                    if(! item.INCOME_TYPE_LIST.includes( incomeType)) {
                        return true;
                    }

                    value = item.getExpenseValue(me.formData);
                    return false;
                });

                this.formData.EXPENSE.value = value;

                this.setAmtValue();
            },

            checkExpRateValue: function() {
                let incomeType = this.formData.INCOME_TYPE.value;
                let keys = Object.keys(this.expRateValueItems);
                const me = this;
                let valid = {};

                keys.forEach((key) => {
                    let item = me.expRateValueItems[key];
                    if(! item.INCOME_TYPE_LIST.includes( incomeType)) {
                        return true;
                    }

                    valid = item.isValid(me.formData);
                    return false;
                });

                if(valid.valid === true) {
                    return true;
                }

                this.toast({message: valid.msg, type:"error"});

                return false;
            },

            getSaveParams: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = me.formData[key].value;
                });

                return params;
            },

            checkChangeDataByEpense: function() {
                let valid = true;
                if(this.formData.INCOME_TYPE.isChangeDataByExpense) {
                    valid = false;
                }

                if(this.formData.PAY_AMOUNT.isChangeData) {
                    valid = false;
                }

                if(this.formData.HOLDING_PERIOD.isChangeData) {
                    valid = false;
                }

                return valid;
            },

            checkChangeDataByRate: function() {
                let valid = true;
                if(this.formData.INCOME_TYPE.isChangeDataByRate) {
                    valid = false;
                }

                if(this.formData.EXPENSE.isChangeData) {
                    valid = false;
                }

                return valid;
            },

            async doSave() {
                const me = this;
                if( ! this.isValidSaveData()) {
                    return;
                }

                if( ! this.checkExpRateValue()) {
                    return;
                }

                if( ! this.checkChangeDataByEpense()) {
                    this.toast({message: '변경된 데이터가 있습니다. 경비계산 버튼을 클릭해주세요.', type:"error"});
                    return;
                }

                if( ! this.checkChangeDataByRate()) {
                    this.toast({message: '변경된 데이터가 있습니다. 세액계산 버튼을 클릭해주세요.', type:"error"});
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/ext-income/saveExtIncome',
                    param: me.getSaveParams(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.$emit('loadGridData');
                        me.close();
                    }
                });
            }
        }
    }
</script>