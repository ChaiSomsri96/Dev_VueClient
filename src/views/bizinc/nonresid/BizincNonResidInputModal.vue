<template>
    <base-modal title="비거주자소득 입력" id="non-resid-input-modal" size="large" width="900">

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
                        <table-form-label label="소득구분" :has-error="errors.INC_TYPE != ''" :required="formData.INC_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.INC_TYPE">
                            <mastcode-dropdown :options="{superCode: 'L8'}"
                                               v-model="formData.INC_TYPE.value"
                                               @change="onChangeIncomeType" />
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
                                             @change="formData.PAY_AMOUNT.value=$event;formData.PAY_AMOUNT.isChangeData=true" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="필요경비" :has-error="errors.EXPENSE != ''" :required="formData.EXPENSE.isRequired"/>
                        <table-form-item :error-msg="errors.EXPENSE">
                            <ui-input-number :value="formData.EXPENSE.value"
                                             @change="formData.EXPENSE.value=$event;formData.EXPENSE.isChangeData=true" />
                        </table-form-item>
                        <table-form-label label="세율" :required="formData.TAX_RATE.isRequired"/>
                        <table-form-item :error-msg="errors.TAX_RATE">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-dropdown :items="formData.TAX_RATE.items"
                                             :value="formData.TAX_RATE.value"
                                             @change="formData.TAX_RATE.value=$event.value;formData.TAX_RATE.isChangeData=true"
                                             :options="{setSelect: true}"/>
                                <ui-dropdown :items="formData.RATE_INCL_LTAX.items"
                                             :value="formData.RATE_INCL_LTAX.value"
                                             @change="formData.RATE_INCL_LTAX.value=$event.value;formData.RATE_INCL_LTAX.isChangeData=true"
                                             :options="{
                                                  valueField  : 'code',
                                                  labelField  : 'message',
                                                  tooltipField: 'message',
                                                  readonly: formData.RATE_INCL_LTAX.isReadOnly}"/>
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
                        <table-form-label label="법인세" :has-error="errors.CORP_TAX != ''" :required="formData.CORP_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.INCOME_TAX">
                            <ui-input-number :value="formData.CORP_TAX.value"
                                             @change="formData.CORP_TAX.value=$event;"
                                             :options="{readonly: formData.CORP_TAX.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="지방소득세" :has-error="errors.RESID_TAX != ''" :required="formData.RESID_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.RESID_TAX">
                            <ui-input-number :value="formData.RESID_TAX.value"
                                             @change="formData.RESID_TAX.value=$event;"
                                             :options="{readonly: formData.RESID_TAX.isReadOnly}" />
                        </table-form-item>
                        <table-form-label label="농특세" :required="formData.AGRO_TAX.isRequired"/>
                        <table-form-item>
                            <ui-input-number :value="formData.AGRO_TAX.value"
                                             @change="formData.AGRO_TAX.value=$event;" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="세액감면 및 제한세율근거" :required="formData.TAX_MEMO.isRequired"/>
                        <table-form-item>
                            <ui-input :value="formData.TAX_MEMO.value"
                                      @change="formData.TAX_MEMO.value=$event;" />
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
    import LabeledInput from "@/components/common/LabeledInput";
    import MastcodeDropdown from '@/components/common/MastcodeDropdown';

    export default {
        name: 'bizinc-non-resid-input-modal',
        mixins: [modal],
        components: {
            LabeledInput,
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
                        isReadOnly: false,
                        validMsg: '소득자를 선택해주세요',
                        items: []
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: false,
                        validMsg: '사업장을 선택해주세요.',
                        items: []
                    },
                    TAX_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    WARD_OFFICE: {
                        value: '',
                        isRequired: false,
                    },
                    INC_TYPE: {
                        value: '',
                        isRequired: true,
                        isChangeData: false,
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
                    EXPENSE: {
                        value: 0,
                        isRequired: false,
                        isChangeData: false
                    },
                    TAX_RATE: {
                        value: '',
                        isRequired: true,
                        isChangeData: false,
                        validMsg: '세액을 선택해주세요.',
                        items: []
                    },
                    INCOME_TAX: {
                        value: 0,
                        isRequired: false,
                        isReadOnly: true
                    },
                    CORP_TAX: {
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
                    TAX_MEMO: {
                        value: '',
                        isRequired: false
                    },
                    EARNER_REG_TYPE: {
                        value: '',
                        isRequired: false
                    },
                    RATE_INCL_LTAX: {
                        value: '2',
                        isRequired: true,
                        items: [
                            {code: '1', message: '지방세 불포함'},
                            {code: '2', message: '지방세 포함'}
                        ]
                    },
                    REMARK: {
                        value: '',
                        isRequired: false,
                    }
                },
                taxRateValues: [
                    {
                        code: '40',
                        rateList: [0, 2]
                    },
                    {
                        code: '41',
                        rateList: [0, 1, 2]
                    },
                    {
                        code: '42',
                        rateList: [0, 20, 22]
                    },
                    {
                        code: '61',
                        rateList: [5, 7, 8, 10, 12, 15, 20, 22, 25]
                    },
                    {
                        code: '62',
                        rateList: [0, 10, 15, 20, 22]
                    }
                ]
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
                    url: '/earner/selectNonResidencePersonal',
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
                const {data} = await this.$httpGet( '/bizinc/config/nonresid/open-year/find', {});
                this.formData.ATT_YEAR.value = data.msg || '';
            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
            },

            onChangeEarnerCode: function(fd) {
                this.formData.EARNER_CODE.value = fd.object.EARNER_CODE;
                this.formData.EARNER_REG_TYPE.value = fd.object.EARNER_REG_TYPE;
            },

            onChangeIncomeType: function(fd) {
                this.formData.INC_TYPE.value = fd.object.REAL_CODE;
                this.formData.INC_TYPE.isChangeData = true;

                this.setTaxRateValues();
            },

            setTaxRateValues: function(clearValue = 'YES') {
                if(clearValue === 'YES') {
                    this.formData.TAX_RATE.value = '';
                }

                let incomeType = this.formData.INC_TYPE.value;
                if(this.payrollUtil.isEmpty(incomeType)) {
                    this.formData.TAX_RATE.items = [];
                }

                const me = this;
                let returnList = [];
                this.taxRateValues.forEach((data) => {
                    if(data.code !== incomeType) {
                        return true;
                    }

                    me.formData.TAX_RATE.items = data.rateList;
                    return false;
                });
            },

            onChangeBpCode: function( fd) {
                const me = this;
                const targetFdNmList = ['BIZUNIT_CODE', 'WARD_OFFICE', 'TAX_OFFICE'];
                const sourceFdNmList = ['BP_CODE', 'BIZ_WARD', 'DV_TAXAUTH'];

                targetFdNmList.forEach( (fdNm, idx) => {
                    me.formData[fdNm].value = fd.object[sourceFdNmList[idx]];
                });
            },

            validCalcRate: function() {
                this.errors = {}
                let valid = true;
                if(this.payrollUtil.isEmpty(this.formData.TAX_RATE.value)) {
                    this.errors.TAX_RATE = '세율을 선택해주세요.';
                    valid = false;
                }

                return valid;
            },

            doCalcRate: function() {
                if(! this.validCalcRate()) {
                    return;
                }

                let inclLtax = this.formData.RATE_INCL_LTAX.value;
                let amt = this.formData.TAX_RATE.value * (this.formData.PAY_AMOUNT.value - this.formData.EXPENSE.value);
                let tax = 0;
                if( inclLtax === '1') {
                    tax = Math.floor(amt / 100 / 10) * 10;
                } else {
                    tax = Math.floor((amt / 100 / 1.1) / 10) * 10;
                }

                let regType = this.formData.EARNER_REG_TYPE.value;
                if(this.payrollUtil.isEmpty(regType)) {
                    return;
                }

                let regTypeFirstChar = regType.substring(0, 1);
                if(regType === '999A' || regTypeFirstChar === '1') {
                    this.formData.INCOME_TAX.value = tax;
                    this.formData.CORP_TAX.value = 0;
                } else if(regType === '999B' || regTypeFirstChar === '2' || regTypeFirstChar === '3' || regTypeFirstChar === '4') {
                    this.formData.INCOME_TAX.value = 0;
                    this.formData.CORP_TAX.value = tax;
                }

                this.formData.RESID_TAX.value = Math.floor(tax / 10 / 10) * 10;

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

            setReadOnly: function( param) {
                if(param.OPEN_TYPE === 'UPDATE') {
                    this.formData.EARNER_CODE.isReadOnly = true;
                } else {
                    this.formData.EARNER_CODE.isReadOnly = false;
                }
            },

            loadTaxRateItems: function(param) {
                if(param.OPEN_TYPE === 'UPDATE') {
                    this.setTaxRateValues('NO');
                }
            },

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.setFormData(_param);

                this.setReadOnly(_param);

                this.loadTaxRateItems(_param);
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

            getSaveParams: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = me.formData[key].value;
                });

                return params;
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

            async doSave() {
                const me = this;
                if( ! this.isValidSaveData()) {
                    return;
                }

                if( ! this.checkChangeData()) {
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/nonresibiz-income/saveNonResiBizIncome',
                    param: me.getSaveParams(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.$emit('loadGridData');
                    }
                });
            }
        }
    }
</script>