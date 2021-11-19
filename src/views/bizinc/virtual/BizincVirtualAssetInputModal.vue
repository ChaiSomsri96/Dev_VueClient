<template>
    <base-modal title="가상자산소득 입력" id="bizinc-virtual-asset-input-modal" width="800">
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
                                         @change="onChangeEarnerCode"
                                         :options="{
                                           valueField  : 'EARNER_CODE',
                                           labelField  : 'EARNER_NAME',
                                           tooltipField: 'EARNER_NAME',
                                           disabled: formData.EARNER_CODE.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
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
                        <table-form-label label="양도일자" :has-error="errors.PAY_DATE != ''" :required="formData.PAY_DATE.isRequired"/>
                        <table-form-item :error-msg="errors.PAY_DATE">
                            <ui-input-date :value="formData.PAY_DATE.value" @change="formData.PAY_DATE.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="거래유형" :has-error="errors.TRANS_TYPE != ''" :required="formData.TRANS_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.TRANS_TYPE">
                            <mastcode-dropdown :options="{superCode: 'Z3'}"
                                               v-model="formData.TRANS_TYPE.value"
                                               @change="formData.TRANS_TYPE.value=$event.value;" />
                        </table-form-item>
                        <table-form-label label="종목명" :has-error="errors.ITEM_NAME != ''" :required="formData.ITEM_NAME.isRequired"/>
                        <table-form-item>
                            <ui-input :value="formData.ITEM_NAME.value"
                                      @change="formData.ITEM_NAME.value=$event;"
                                      :required="formData.ITEM_NAME.isRequired"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="단가" :has-error="errors.UNIT_PRICE != ''" :required="formData.UNIT_PRICE.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.UNIT_PRICE.value"
                                      @change="onChangeUnitPrice"
                                      :required="formData.UNIT_PRICE.isRequired"/>
                        </table-form-item>
                        <table-form-label label="수량" :has-error="errors.QUANTITY != ''" :required="formData.QUANTITY.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.QUANTITY.value"
                                      @change="onChangeQuantity"
                                      :required="formData.QUANTITY.isRequired"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="수입금액" :has-error="errors.REVENUE_AMOUNT != ''" :required="formData.REVENUE_AMOUNT.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.REVENUE_AMOUNT.value"
                                             @change="formData.REVENUE_AMOUNT.value=$event;"
                                             :required="formData.REVENUE_AMOUNT.isRequired"
                                             :options="{readonly: formData.REVENUE_AMOUNT.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="취득가액/경비" :has-error="errors.EXPENSE != ''" :required="formData.EXPENSE.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.EXPENSE.value"
                                             @change="formData.EXPENSE.value=$event;"
                                             :required="formData.EXPENSE.isRequired"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득금액" :has-error="errors.INCOME_AMOUNT != ''" :required="formData.INCOME_AMOUNT.isRequired"/>
                        <table-form-item :error-msg="errors.INCOME_AMOUNT">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input-number :value="formData.INCOME_AMOUNT.value"
                                                 @change="formData.INCOME_AMOUNT.value=$event;"
                                                 :options="{readonly: formData.INCOME_AMOUNT.isReadOnly}"/>
                                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-0" @click="doCalcIncomeTax">
                                    <span>세액계산</span>
                                </button>
                            </div>
                        </table-form-item>
                        <table-form-label label="세율(%)" :has-error="errors.TAX_RATE != ''" :required="formData.TAX_RATE.isRequired"/>
                        <table-form-item :error-msg="errors.TAX_RATE">
                            <ui-input-number :value="formData.TAX_RATE.value"
                                             @change="formData.TAX_RATE.value=$event;"
                                             :options="{readonly: formData.TAX_RATE.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득세" :has-error="errors.INCOME_TAX != ''" :required="formData.INCOME_TAX.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.INCOME_TAX.value"
                                             @change="formData.INCOME_TAX.value=$event;"
                                             :required="formData.INCOME_TAX.isRequired"
                                             :options="{readonly: formData.INCOME_TAX.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="법인세" :has-error="errors.CORP_TAX != ''" :required="formData.CORP_TAX.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.CORP_TAX.value"
                                             @change="formData.CORP_TAX.value=$event;"
                                             :required="formData.CORP_TAX.isRequired"
                                             :options="{readonly: formData.CORP_TAX.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="지방소득세" :has-error="errors.RESID_TAX != ''" :required="formData.RESID_TAX.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.RESID_TAX.value"
                                             @change="formData.RESID_TAX.value=$event;"
                                             :required="formData.RESID_TAX.isRequired"
                                             :options="{readonly: formData.RESID_TAX.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="실명구분" :has-error="errors.REAL_NAME_FL != ''" :required="formData.REAL_NAME_FL.isRequired"/>
                        <table-form-item>
                            <mastcode-dropdown :options="{superCode: 'Z4'}"
                                               v-model="formData.REAL_NAME_FL.value"
                                               @change="formData.REAL_NAME_FL.value=$event.value;" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="비고"/>
                        <table-form-item>
                            <ui-input :value="formData.REMARK.value" @change="formData.REMARK.value=$event;" :required="formData.REMARK.isRequired"/>
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
        name: 'bizinc-virtual-asset-input-modal',
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
                    ATT_YEAR: {
                        value: '',
                        isRequired: false
                    },
                    SEQ_NO: {
                        value: '',
                        isRequired: false
                    },
                    INCOME_TYPE: {
                        value: '63',
                        isRequired: false
                    },
                    EARNER_CODE: {
                        value: '',
                        isRequired: true,
                        isReadOnly: false,
                        isChangeData: true,
                        validMsg: '소득자를 선택해주세요.',
                        items: [],
                    },
                    EARNER_REG_TYPE: {
                        value: '',
                        isRequired: false
                    },
                    TAX_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    WARD_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '사업장을 선택해주세요.',
                        items: [],
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
                    PAY_PER: {
                        value: '',
                        isRequired: false
                    },
                    PAY_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '양도일자를 입력해주세요.'
                    },
                    TRANS_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '거래유형을 선택해주세요'
                    },
                    ITEM_NAME: {
                        value: '',
                        isRequired: true,
                        validMsg: '종목명을 입력해주세요',
                    },
                    UNIT_PRICE: {
                        value: 0,
                        isRequired: true,
                        validMsg: '단가를 입력해주세요',
                    },
                    QUANTITY: {
                        value: 0,
                        isRequired: true,
                        validMsg: '수량을 입력해주세요',
                    },
                    REVENUE_AMOUNT: {
                        value: 0,
                        isRequired: true,
                        isReadOnly: true,
                        validMsg: '수입금액을 입력해주세요',
                    },
                    EXPENSE: {
                        value: 0,
                        isRequired: true,
                        validMsg: '취득가액/경비를 입력해주세요',
                    },
                    INCOME_AMOUNT: {
                        value: 0,
                        isRequired: true,
                        isReadOnly: true,
                        isChangeData: false,
                        validMsg: '소득금액을 입력해주세요'
                    },
                    TAX_RATE: {
                        value: '',
                        isRequired: true,
                        isReadOnly: true,
                        validMsg: '세율을 입력해주세요',
                    },
                    INCOME_TAX: {
                        value: 0,
                        isRequired: true,
                        isReadOnly: true,
                        validMsg: '소득세를 입력해주세요',
                    },
                    CORP_TAX: {
                        value: 0,
                        isRequired: true,
                        isReadOnly: true,
                        validMsg: '법인세를 입력해주세요',
                    },
                    RESID_TAX: {
                        value: 0,
                        isRequired: true,
                        isReadOnly: true,
                        validMsg: '지방소득세를 입력해주세요',
                    },
                    REAL_NAME_FL: {
                        value: '',
                        isRequired: false,
                        items: []
                    },
                    REMARK: {
                        value: '',
                        isRequired: false
                    }
                }
            }
        },
        methods: {
            createDynamicComponent() {
                this.loadDropdownData();
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

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            async loadDropdownData() {
                // 신고관리 사업장
                this.formData.BIZUNIT_CODE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });

                // 소득자
                this.formData.EARNER_CODE.items = await this.getDropdownData({
                    url: '/earner/selectNonResidencePersonal',
                    params: {}
                });

                // 귀속연도
                this.setAttYear();
            },

            async setAttYear() {
                const {data} = await this.$httpGet( '/bizinc/config/bizinc/open-year/find', {});
                this.formData.ATT_YEAR.value = data.msg || '';
            },


            getTaxRate: function() {
                let revenueAmount = this.formData.REVENUE_AMOUNT.value * 10 / 100;
                let incomeAmount = this.formData.INCOME_AMOUNT.value * 20 / 100;
                let expense = this.formData.EXPENSE.value;
                let tax = 0;

                if( expense === 0 || revenueAmount <= incomeAmount) {
                    tax = 10;
                } else {
                    tax = 20;
                }

                return tax;
            },

            doCalcIncomeTax: function() {
                let taxRate = this.getTaxRate();
                let incomeTax = Math.floor(this.formData.INCOME_AMOUNT.value * taxRate / 100 / 10 ) * 10;
                let residTax = Math.floor(incomeTax / 100) * 10 || 0;
                let regType = this.formData.EARNER_REG_TYPE.value;

                this.errors = {};
                if(this.payrollUtil.isEmpty(regType)) {
                    this.errors.EARNER_CODE = this.formData.EARNER_CODE.validMsg;
                    return;
                }

                let regTypeFirstChar = regType.substring(0, 1);
                if(regType === '999A' || regTypeFirstChar === '1') {
                    this.formData.INCOME_TAX.value = incomeTax;
                    this.formData.CORP_TAX.value = 0;
                } else if(regType === '999B' || regTypeFirstChar === '2' || regTypeFirstChar === '3' || regTypeFirstChar === '4') {
                    this.formData.INCOME_TAX.value = 0;
                    this.formData.CORP_TAX.value = incomeTax;
                }

                this.formData.TAX_RATE.value = taxRate;
                this.formData.RESID_TAX.value = residTax;

                this.setFalseChangeData();
            },

            setFalseChangeData: function() {
                const me = this;
                let keys = Object.keys(this.formData);
                let valid = true;
                keys.forEach((key) => {
                    if(me.formData[key].isChangeData) {
                        me.formData[key].isChangeData = false;
                    }
                });
            },

            onChangeUnitPrice: function( value) {
                this.formData.UNIT_PRICE.value = value || 0;
                this.setRevenuAmount();
            },

            onChangeQuantity: function( value) {
                this.formData.QUANTITY.value = value || 0;
                this.setRevenuAmount();
            },

            setRevenuAmount: function() {
                this.formData.REVENUE_AMOUNT.value = this.formData.UNIT_PRICE.value * this.formData.QUANTITY.value;

                this.setIncomeAmount();
            },

            setIncomeAmount: function() {
                this.formData.INCOME_AMOUNT.value = this.formData.REVENUE_AMOUNT.value - this.formData.EXPENSE.value;
                this.formData.INCOME_AMOUNT.isChangeData = true;
            },

            onChangeEarnerCode: function(fd) {
                this.formData.EARNER_CODE.value = fd.object.EARNER_CODE;
                this.formData.EARNER_REG_TYPE.value = fd.object.EARNER_REG_TYPE;
                this.formData.EARNER_CODE.isChangeData = true;
            },

            onChangePayMonth: function( fd) {
                this.formData.PAY_MONTH.value = fd.object.code;
                this.formData.PAY_PER.value = this.formData.ATT_YEAR.value + fd.object.code;
            },

            onChangeBpCode: function( fd) {
                const me = this;
                const targetFdNmList = ['BIZUNIT_CODE', 'WARD_OFFICE', 'TAX_OFFICE'];
                const sourceFdNmList = ['BP_CODE', 'BIZ_WARD', 'DV_TAXAUTH'];

                targetFdNmList.forEach( (fdNm, idx) => {
                    me.formData[fdNm].value = fd.object[sourceFdNmList[idx]];
                });
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

            checkChangeData: function() {
                const me = this;
                let keys = Object.keys(this.formData);
                let valid = true;
                keys.forEach((key) => {
                    if(me.formData[key].isChangeData) {
                        valid = false;
                        return false;
                    }
                });

                if(! valid) {
                    this.toast({message: '변경된 데이터가 있습니다. 세액계산 버튼을 클릭해주세요.', type:"error"});
                    return false;
                }

                return true;
            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
            },

            setFormData: function(data) {
                const me = this;
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    me.formData[key].value = data[key] || me.$options.data().formData[key].value;
                });
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

            doSave: function() {
                const me = this;
                if( ! this.isValidSaveData()) {
                    return;
                }

                if( ! this.checkChangeData()) {
                    return;
                }

                /*this.$httpPost({
                    // url 아직 미정
                   // url: '/bizinc/ext-income/saveExtIncome',
                    param: me.getSaveParams(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.$emit('loadGridData');
                    }
                });*/
            }
        }
    }
</script>