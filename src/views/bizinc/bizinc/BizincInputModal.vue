<template>
    <base-modal title="사업소득 입력" id="otherinc-input-modal" width="1000">
        <template v-slot:body>
            <table-form :colgroup="['10%', 'auto', '20%', 'auto']">
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
                        <table-form-label label="업종구분" :has-error="errors.BIZ_TYPE != ''" :required="formData.BIZ_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.BIZ_TYPE">
                            <mastcode-dropdown :options="{superCode: 'AA'}"
                                               v-model="formData.BIZ_TYPE.value"
                                               @change="onChangeBizType" />
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
                                           @change="formData.PAY_DATE.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="지급총액" :has-error="errors.PAY_AMOUNT != ''" :required="formData.PAY_AMOUNT.isRequired"/>
                        <table-form-item :error-msg="errors.PAY_AMOUNT">
                            <ui-input-number :value="formData.PAY_AMOUNT.value"
                                             @change="formData.PAY_AMOUNT.value=$event;formData.PAY_AMOUNT.isChangeData=true" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="세율(%)" :has-error="errors.TAX_RATE != ''" :required="formData.TAX_RATE.isRequired"/>
                        <table-form-item :error-msg="errors.TAX_RATE">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input-number :value="formData.TAX_RATE.value"
                                                 @change="formData.TAX_RATE.value=$event;formData.TAX_RATE.isChangeData=true"
                                                 :options="{readonly: formData.TAX_RATE.isReadOnly}"/>
                                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-0" @click="doCalcIncomeTax">
                                    <span>계산</span>
                                </button>
                            </div>
                        </table-form-item>
                        <table-form-label label="소득세" :has-error="errors.INCOME_TAX != ''" :required="formData.INCOME_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.INCOME_TAX">
                            <ui-input-number :value="formData.INCOME_TAX.value"
                                             @change="formData.INCOME_TAX.value=$event;"
                                             :options="{readonly: formData.INCOME_TAX.isReadOnly}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="지방소득세" :has-error="errors.RESID_TAX != ''" :required="formData.RESID_TAX.isRequired"/>
                        <table-form-item :error-msg="errors.RESID_TAX">
                            <ui-input-number :value="formData.RESID_TAX.value"
                                             @change="formData.RESID_TAX.value=$event;"
                                             :options="{readonly: formData.RESID_TAX.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="비고" :has-error="errors.REMARK != ''" :required="formData.REMARK.isRequired"/>
                        <table-form-item :error-msg="errors.REMARK">
                            <ui-input :value="formData.REMARK.value"
                                      @change="formData.REMARK.value=$event;"/>
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
        name: 'bizinc-input-modal',
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
                    EARNER_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '소득자를 선택해주세요.',
                        isReadOnly: false,
                        items: []
                    },
                    BIZ_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '업종구분을 선택해주세요.'
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: true,
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
                    PAY_AMOUNT: {
                        value: 0,
                        isChangeData: false,
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
                    ATT_YEAR: {
                        value: '',
                        isRequired: false
                    },
                    PAY_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '지급일을 입력해주세요.'
                    },
                    PAY_PER: {
                        value: '',
                        isRequired: false,
                    },
                    TAX_RATE: {
                        value: 3,
                        isChangeData: false,
                        isRequired: false,
                        isReadOnly: true
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
                    REMARK: {
                        value: '',
                        isRequired: false,
                    }
                }
            }
        },

        methods: {
            createDynamicComponent() {
                this.loadDropdownData();
            },

            setReadOnly: function( param) {
                if(param.OPEN_TYPE === 'UPDATE') {
                    this.formData.EARNER_CODE.isReadOnly = true;
                } else {
                    this.formData.EARNER_CODE.isReadOnly = false;
                }
            },

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.setFormData(_param);

                this.setReadOnly(_param);
            },

            setFormData: function(data) {
                const me = this;
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    me.formData[key].value = data[key] || me.$options.data().formData[key].value;
                });
            },

            resetFormData: function() {
                const me = this;
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    me.formData[key].value = me.$options.data().formData[key].value;
                });
            },

            doCalcIncomeTax: function() {
                let payAmount = this.formData.PAY_AMOUNT.value;
                let taxRate = this.formData.TAX_RATE.value / 100;
                let incomeTax = Math.floor(payAmount * taxRate / 10) * 10;
                let residTax = Math.floor(incomeTax / 100) * 10;
                if( incomeTax < 1000) {
                    incomeTax = 0;
                    residTax = 0;
                }

                this.formData.INCOME_TAX.value = incomeTax;
                this.formData.RESID_TAX.value = residTax;
                this.formData.PAY_AMOUNT.isChangeData = false;
            },

            onChangePayMonth: function( fd) {
                this.formData.PAY_MONTH.value = fd.object.code;
                this.formData.PAY_PER.value = this.formData.ATT_YEAR.value + fd.object.code;
            },

            onChangeBizType: function( fd ) {
                if( fd.value == '940905' ) {
                    this.formData.TAX_RATE.value = 5;
                } else if( fd.value == '940904' ) {
                    this.formData.TAX_RATE.value = 20;
                } else {
                    this.formData.TAX_RATE.value = 3;
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
                const {data} = await this.$httpGet( '/bizinc/config/bizinc/open-year/find', {});
                this.formData.ATT_YEAR.value = data.msg || '';
            },

            async loadEarnerCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/earner/selectResidencePersonal', {});
                    this.formData.EARNER_CODE.items = data || [];
                }catch(e) {
                    console.log(e)
                }
            },

            async loadBpCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/division-mgt/list', {});
                    this.formData.BIZUNIT_CODE.items = data;
                }catch(e) {
                    console.log(e)
                }
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
                    if(! me.formData[key].isRequired) {
                        return true;
                    }

                    let data = me.formData[key]
                    if(this.payrollUtil.isEmpty(data.value)) {
                        me.errors[key] = data.validMsg;
                        valid = false;
                    }
                });

                return valid;
            },

            getSaveParams: function() {
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = this.formData[key].value;
                });

                return params;
            },

            checkChageData: function() {
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
                    this.toast({message: '변경된 데이터가 있습니다. 계산 버튼을 클릭해주세요.', type:"error"});
                    return false;
                }

                return true
            },

            async doSave() {
                const me = this;
                // 필수값 체크
                if( ! this.isValidSaveData()) {
                    return;
                }

                // 계산 후 지급총액이 변경되었는지 체크
                if( ! this.checkChageData()) {
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/biz-income/saveBizIncome',
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
