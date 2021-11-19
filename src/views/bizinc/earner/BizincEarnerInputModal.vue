<template>
    <base-modal title="소득자 입력" id="bizinc-earner-input-modal" size="large" width="800">
        <template v-slot:body>
            <table-form :colgroup="['20%', 'auto', '15%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="관리번호" :has-error="errors.EARNER_CODE != ''" :required="basicData.EARNER_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_CODE">
                            <ui-input :value="basicData.EARNER_CODE.value"
                                      @change="basicData.EARNER_CODE.value=$event;"
                                      :options="{readonly: basicData.EARNER_CODE.isReadOnly}"/>
                        </table-form-item>
                        <table-form-label label="성명-국문" :has-error="errors.EARNER_NAME_K != ''" :required="basicData.EARNER_NAME_K.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_NAME_K">
                            <ui-input :value="basicData.EARNER_NAME_K.value"
                                      @change="basicData.EARNER_NAME_K.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="주민등록번호" :has-error="errors.EARNER_RRN != ''" :required="basicData.EARNER_RRN.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_RRN">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input :value="basicData.EARNER_RRN_BIRTH.value"
                                          @change="basicData.EARNER_RRN_BIRTH.value=$event;basicData.EARNER_RRN.value=basicData.EARNER_RRN_BIRTH.value+basicData.RRN.value;"
                                          :options="{maxLength: 6}"/>
                                <span style="padding: 0 2px;">-</span>
                                <ui-input :value="basicData.RRN.value"
                                          @change="basicData.RRN.value=$event;basicData.EARNER_RRN.value=basicData.EARNER_RRN_BIRTH.value+basicData.RRN.value;"
                                          :options="{maxLength: 7}"/>
                            </div>
                        </table-form-item>
                        <table-form-label label="관리사업장" :has-error="errors.EARNER_WORK_SITE != ''" :required="basicData.EARNER_WORK_SITE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_WORK_SITE">
                            <ui-dropdown :items="basicData.EARNER_WORK_SITE.items"
                                         :value="basicData.EARNER_WORK_SITE.value"
                                         @change="basicData.EARNER_WORK_SITE.value=$event.value;"
                                         :options="{
                                         valueField  : 'BP_CODE',
                                         labelField  : 'DV_NAME',
                                         tooltipField: 'DV_NAME'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="여권번호" :has-error="errors.EARNER_PASSPORT_NO != ''" :required="basicData.EARNER_PASSPORT_NO.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_PASSPORT_NO">
                            <ui-input :value="basicData.EARNER_PASSPORT_NO.value"
                                      @change="basicData.EARNER_PASSPORT_NO.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="내외국인 구분" :has-error="errors.EARNER_NATIONALITY != ''" :required="basicData.EARNER_NATIONALITY.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_NATIONALITY">
                            <mastcode-dropdown :options="{superCode: 'L3'}"
                                               v-model="basicData.EARNER_NATIONALITY.value"
                                               @change="basicData.EARNER_NATIONALITY.value=$event.value;" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="소득자구분 코드" :has-error="errors.EARNER_REG_TYPE != ''" :required="basicData.EARNER_REG_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_REG_TYPE">
                            <ui-dropdown :items="regTypeItems"
                                         :value="basicData.EARNER_REG_TYPE.value"
                                         @change="basicData.EARNER_REG_TYPE.value=$event.value;"
                                         :options="{
                                             valueField  : 'code',
                                             labelField  : 'desc',
                                             tooltipField: 'desc'}"/>
                        </table-form-item>
                        <table-form-label label="거주구분" :has-error="errors.EARNER_RESID_TYPE != ''" :required="basicData.EARNER_RESID_TYPE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_RESID_TYPE">
                            <mastcode-dropdown :options="{superCode: 'L2'}"
                                               v-model="basicData.EARNER_RESID_TYPE.value"
                                               @change="basicData.EARNER_RESID_TYPE.value=$event.value;" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="거주지국" :has-error="errors.EARNER_RESID_CN != ''" :required="basicData.EARNER_RESID_CN.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_RESID_CN">
                            <ui-dropdown :items="basicData.EARNER_RESID_CN.items"
                                         :value="basicData.EARNER_RESID_CN.value"
                                         @change="basicData.EARNER_RESID_CN.value=$event.value;"
                                         :options="{
                                             valueField  : 'CODE_2DIGIT',
                                             labelField  : 'COUNTRY_NAM',
                                             tooltipField: 'COUNTRY_NAM',
                                             disabled: basicData.EARNER_RESID_CN.isDisabled}"/>
                        </table-form-item>
                        <table-form-label label="주소" :has-error="errors.EARNER_ADDR_K != ''" :required="basicData.EARNER_ADDR_K.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_ADDR_K">
                            <ui-input :value="basicData.EARNER_ADDR_K.value"
                                      @change="basicData.EARNER_ADDR_K.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="이메일" :has-error="errors.EARNER_EMAIL != ''" :required="basicData.EARNER_EMAIL.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_EMAIL">
                            <ui-input :value="basicData.EARNER_EMAIL.value"
                                      @change="basicData.EARNER_EMAIL.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="은행코드" :has-error="errors.EARNER_BANK_CODE != ''" :required="basicData.EARNER_BANK_CODE.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BANK_CODE">
                            <ui-dropdown :items="basicData.EARNER_BANK_CODE.items"
                                         :value="basicData.EARNER_BANK_CODE.value"
                                         @change="basicData.EARNER_BANK_CODE.value=$event.value;"
                                         :options="{
                                             valueField  : 'BANK_CODE',
                                             labelField  : 'BANK_NAM',
                                             tooltipField: 'BANK_NAM'}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="계좌번호" :has-error="errors.EARNER_BANK_AC != ''" :required="basicData.EARNER_BANK_AC.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BANK_AC">
                            <ui-input :value="basicData.EARNER_BANK_AC.value"
                                      @change="basicData.EARNER_BANK_AC.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="예금주명" :has-error="errors.EARNER_BANK_HOLDER != ''" :required="basicData.EARNER_BANK_HOLDER.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BANK_HOLDER">
                            <ui-input :value="basicData.EARNER_BANK_HOLDER.value"
                                      @change="basicData.EARNER_BANK_HOLDER.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="상태" :has-error="errors.EARNER_STATUS != ''" :required="basicData.EARNER_STATUS.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_STATUS">
                            <mastcode-dropdown :options="{superCode: 'Z2'}"
                                               v-model="basicData.EARNER_STATUS.value"
                                               @change="basicData.EARNER_STATUS.value=$event.value;" />
                        </table-form-item>
                    </tr>
                </template>
            </table-form>
            <table-form v-show="openPanel.isOpenForeignerPanel" :colgroup="['20%', 'auto', '15%', 'auto']" title="<외국인 또는 비거주자>">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="성명-영문" :has-error="errors.EARNER_NAME_E != ''" :required="foreignerData.EARNER_NAME_E.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_NAME_E">
                            <ui-input :value="foreignerData.EARNER_NAME_E.value"
                                      @change="foreignerData.EARNER_NAME_E.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="생년월일" :has-error="errors.EARNER_BIRTH_D != ''" :required="foreignerData.EARNER_BIRTH_D.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BIRTH_D">
                            <ui-input :value="foreignerData.EARNER_BIRTH_D.value"
                                      @change="foreignerData.EARNER_BIRTH_D.value=$event;"
                                      :options="{maxLength: 8}"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="외국인등록번호" :has-error="errors.EARNER_FRN != ''" :required="foreignerData.EARNER_FRN.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_FRN">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input :value="foreignerData.EARNER_FRN_BIRTH.value"
                                          @change="foreignerData.EARNER_FRN_BIRTH.value=$event;foreignerData.EARNER_FRN.value=foreignerData.EARNER_FRN_BIRTH.value+foreignerData.FRN.value;"
                                          :options="{maxLength: 6}"/>
                                <span style="padding: 0 2px;">-</span>
                                <ui-input :value="foreignerData.FRN.value"
                                          @change="foreignerData.FRN.value=$event;foreignerData.EARNER_FRN.value=foreignerData.EARNER_FRN_BIRTH.value+foreignerData.FRN.value;"
                                          :options="{maxLength: 7}"/>
                            </div>
                        </table-form-item>
                        <table-form-label label="국내거소번호" :has-error="errors.EARNER_DOMI_NO != ''" :required="foreignerData.EARNER_DOMI_NO.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_DOMI_NO">
                            <ui-input :value="foreignerData.EARNER_DOMI_NO.value"
                                      @change="foreignerData.EARNER_DOMI_NO.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="거주지국 납세번호" :has-error="errors.EARNER_TAXPAYER_ID != ''" :required="foreignerData.EARNER_TAXPAYER_ID.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_TAXPAYER_ID">
                            <ui-input :value="foreignerData.EARNER_TAXPAYER_ID.value"
                                      @change="foreignerData.EARNER_TAXPAYER_ID.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="주소-영문" :has-error="errors.EARNER_ADDR_E != ''" :required="foreignerData.EARNER_ADDR_E.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_ADDR_E">
                            <ui-input :value="foreignerData.EARNER_ADDR_E.value"
                                      @change="foreignerData.EARNER_ADDR_E.value=$event;"/>
                        </table-form-item>
                    </tr>
                </template>
            </table-form>
            <table-form v-show="openPanel.isOpenNativePanel" :colgroup="['20%', 'auto', '15%', 'auto']" title="<내국인 사업자 개인, 법인>">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="상호" :has-error="errors.EARNER_BIZ_NAME != ''" :required="nativeData.EARNER_BIZ_NAME.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BIZ_NAME">
                            <ui-input :value="nativeData.EARNER_BIZ_NAME.value"
                                      @change="nativeData.EARNER_BIZ_NAME.value=$event;"/>
                        </table-form-item>
                        <table-form-label label="전화번호" :has-error="errors.EARNER_BIZ_TEL_NO != ''" :required="nativeData.EARNER_BIZ_TEL_NO.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BIZ_TEL_NO">
                            <ui-input :value="nativeData.EARNER_BIZ_TEL_NO.value"
                                      @change="nativeData.EARNER_BIZ_TEL_NO.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="사업자등록번호" :has-error="errors.EARNER_VAT_ID != ''" :required="nativeData.EARNER_VAT_ID.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_VAT_ID">
                            <ui-input :value="nativeData.EARNER_VAT_ID.value"
                                      @change="nativeData.EARNER_VAT_ID.value=$event;"
                                      :options="{maxLength: 10}"/>
                        </table-form-item>
                        <table-form-label label="법인등록번호" :has-error="errors.EARNER_REG_NO != ''" :required="nativeData.EARNER_REG_NO.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_REG_NO">
                            <ui-input :value="nativeData.EARNER_REG_NO.value"
                                      @change="nativeData.EARNER_REG_NO.value=$event;"/>
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="주소-영문" :has-error="errors.EARNER_BIZ_ADDR != ''" :required="nativeData.EARNER_BIZ_ADDR.isRequired"/>
                        <table-form-item :error-msg="errors.EARNER_BIZ_ADDR">
                            <ui-input :value="nativeData.EARNER_BIZ_ADDR.value"
                                      @change="nativeData.EARNER_BIZ_ADDR.value=$event;"/>
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
        name: 'bizinc-earner-input-modal',
        mixins: [modal],
        components: {
            BaseModal,
            TableForm,
            TableFormItem,
            TableFormLabel,
            MastcodeDropdown
        },
        computed: {
            regTypeItems() {
                let value = this.basicData.EARNER_NATIONALITY.value;
                if(value === '1') {
                    return this.basicData.EARNER_REG_TYPE.nativeItems;
                } else if(value === '9'){
                    return this.basicData.EARNER_REG_TYPE.foreignerItems;
                }

                return [];
            }
        },
        data() {
            return {
                errors: {},
                url: '/earner/insert',
                openPanel: {
                    foreignerItems: ['122', '131', '123', '141', '121', '222', '321', '411', '413'],
                    nativeItems: ['211', '311'],
                    isOpenForeignerPanel: false,
                    isOpenNativePanel: false
                },
                basicData: {
                    EARNER_CODE: {
                        value: '',
                        isRequired: true,
                        isReadOnly: false,
                        validMsg: '관리번호를 입력해주세요.',
                    },
                    EARNER_NAME_K: {
                        value: '',
                        isRequired: true,
                        validMsg: '성명-국문을 입력해주세요.'
                    },
                    EARNER_RRN: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '주민등록번호를 입력해주세요.',
                    },
                    EARNER_RRN_BIRTH: {
                        value: '',
                        isRequired: false,
                    },
                    RRN: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_WORK_SITE: {
                        value: '',
                        isRequired: false,
                        items: [],
                        validMsg: '관리사업장을 선택해주세요.'
                    },
                    EARNER_NATIONALITY: {
                        value: '',
                        isRequired: true,
                        validMsg: '내외국인 구분을 선택해주세요.'
                    },
                    EARNER_REG_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '소득자구분 코드를 선택해주세요.',
                        nativeItems: [],
                        foreignerItems: []
                    },
                    EARNER_RESID_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '거주구분을 선택해주세요.'
                    },
                    EARNER_RESID_CN: {
                        value: '',
                        isRequired: false,
                        isDisabled: false,
                        items: [],
                        validMsg: '거주지국 코드를 선택해주세요.'
                    },
                    EARNER_ADDR_K: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_EMAIL: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_BANK_CODE: {
                        value: '',
                        items: [],
                        isRequired: false,
                    },
                    EARNER_BANK_AC: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_BANK_HOLDER: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_STATUS: {
                        value: '',
                        isRequired: true,
                        validMsg: '상태를 선택해주세요.'
                    },
                    EARNER_PASSPORT_NO: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '여권번호를 입력해주세요.'
                    }
                },
                nativeData: {
                    EARNER_BIZ_NAME: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_BIZ_TEL_NO: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_VAT_ID: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '사업자등록번호를 입력해주세요.'
                    },
                    EARNER_REG_NO: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '법인등록번호를 입력해주세요.'
                    },
                    EARNER_BIZ_ADDR: {
                        value: '',
                        isRequired: false,
                    },
                },
                foreignerData: {
                    EARNER_NAME_E: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_BIRTH_D: {
                        value: '',
                        isRequired: false,
                        validMsg: '생년월일을 입력해주세요.'
                    },
                    EARNER_FRN: {
                        value: '',
                        isDynamicRequired: true,
                        isRequired: false,
                        validMsg: '외국인등록번호를 입력해주세요.',
                    },
                    EARNER_FRN_BIRTH: {
                        value: '',
                        isRequired: false,
                    },
                    FRN: {
                        value: '',
                        isRequired: false,
                    },
                    EARNER_DOMI_NO: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '국내거소번호를 입력해주세요.'
                    },
                    EARNER_TAXPAYER_ID: {
                        value: '',
                        isRequired: false,
                        isDynamicRequired: true,
                        validMsg: '거주지국 납세번호를 입력해주세요.'
                    },
                    EARNER_ADDR_E: {
                        value: '',
                        isRequired: false,
                    },
                },
                requireDataByEarnerRegType: [
                    {
                        code: '111',
                        operator: 'AND',
                        requiredFdList: ['EARNER_RRN']
                    },
                    {
                        code: '112',
                        operator: 'AND',
                        requiredFdList: ['EARNER_PASSPORT_NO'],
                    },
                    {
                        code: '122',
                        operator: 'AND',
                        requiredFdList: ['EARNER_FRN', 'EARNER_BIRTH_D']
                    },
                    {
                        code: '131',
                        operator: 'AND',
                        requiredFdList: ['EARNER_FRN', 'EARNER_BIRTH_D']
                    },
                    {
                        code: '123',
                        operator: 'AND',
                        requiredFdList: ['EARNER_RRN', 'EARNER_BIRTH_D'],
                    },
                    {
                        code: '141',
                        operator: 'AND',
                        requiredFdList: ['EARNER_DOMI_NO'],
                    },
                    {
                        code: '121',
                        operator: 'AND',
                        requiredFdList: ['EARNER_PASSPORT_NO'],
                    },
                    {
                        code: '211',
                        operator: 'AND',
                        requiredFdList: ['EARNER_VAT_ID', 'EARNER_REG_NO'],
                    },
                    {
                        code: '222',
                        operator: 'AND',
                        requiredFdList: ['EARNER_TAXPAYER_ID'],
                    },
                    {
                        code: '311',
                        operator: 'AND',
                        requiredFdList: ['EARNER_VAT_ID'],
                    },
                    {
                        code: '321',
                        operator: 'OR',
                        requiredFdList: ['EARNER_TAXPAYER_ID', 'EARNER_FRN', 'EARNER_DOMI_NO', 'EARNER_PASSPORT_NO']
                    },
                    {
                        code: '331',
                        operator: 'AND',
                        requiredFdList: ['EARNER_RRN']
                    },
                    {
                        code: '411',
                        operator: 'OR',
                        requiredFdList: ['EARNER_TAXPAYER_ID', 'EARNER_FRN', 'EARNER_DOMI_NO', 'EARNER_PASSPORT_NO']
                    },
                    {
                        code: '413',
                        operator: 'OR',
                        requiredFdList:['EARNER_TAXPAYER_ID', 'EARNER_FRN', 'EARNER_DOMI_NO', 'EARNER_PASSPORT_NO']
                    }
                ]
            }
        },
        watch: {
            'basicData.EARNER_REG_TYPE.value': {
                handler: function() {
                    this.setShowPanel();
                }
            },
            'basicData.EARNER_RESID_TYPE.value': {
                handler: function() {
                    this.setResidCnDisabled();
                }
            }
        },
        methods: {
            async doSave() {
                const me = this;
                let formData = this.getFormData();
                if( ! this.isValiStaticRequiredData(formData)) {
                    return;
                }

                if( ! this.isValidDynamicRequiredData(formData)) {
                    return;
                }

                if( ! this.checkDataLength(formData)) {
                    return;
                }

                this.$httpPost({
                    url: this.url,
                    param: me.getSaveParams(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.$emit('loadGridData');
                        me.close();
                    }
                })
            },

            checkDataLength: function(formData) {
                this.errors = {};
                let valid = true;
                if(formData.EARNER_RRN.value.length && formData.EARNER_RRN.value.length !== 13) {
                    this.errors.EARNER_RRN = '주민등록번호 길이를 확인해주세요.';
                    valid = false;
                }

                if(formData.EARNER_FRN.value.length && formData.EARNER_FRN.value.length !== 13) {
                    this.errors.EARNER_FRN = '외국인등록번호 길이를 확인해주세요.';
                    valid = false;
                }

                return valid;
            },

            getSaveParams: function() {
                let params = {};
                let formData = this.getFormData();
                let keys = Object.keys(formData);
                keys.forEach((key) => {
                    params[key] = formData[key].value;
                });

                return params;
            },

            setShowPanel: function() {
                let earnerRegType = this.basicData.EARNER_REG_TYPE.value;
                if(this.openPanel.foreignerItems.includes(earnerRegType)) {
                    this.openPanel.isOpenForeignerPanel = true;
                    this.foreignerData.EARNER_BIRTH_D.isRequired = true;
                } else {
                    this.openPanel.isOpenForeignerPanel = false;
                    this.foreignerData.EARNER_BIRTH_D.isRequired = false;
                }

                if(this.openPanel.nativeItems.includes(earnerRegType)) {
                    this.openPanel.isOpenNativePanel = true;
                } else {
                    this.openPanel.isOpenNativePanel = false;
                }

                this.changeDynamicRequiredFd();
            },

            setDynamicRequiredFalse: function(formData) {
                let keys = Object.keys(formData);
                keys.forEach((key)=> {
                    let data = formData[key];
                    if(data.isDynamicRequired === true) {
                        data.isRequired = false;
                    }
                });
            },

            changeDynamicRequiredFd: function() {
                let formData = this.getFormData();
                this.setDynamicRequiredFalse(formData);

                let regTypeData = this.getRequireDataByEarnerRegType(formData.EARNER_REG_TYPE.value);
                if(! Object.keys(regTypeData).length) {
                    return true;
                }

                regTypeData.requiredFdList.forEach((fdNm) => {
                    formData[fdNm].isRequired = true;
                });
            },

            getRequireDataByEarnerRegType: function(earnerRegType) {
                let list = this.requireDataByEarnerRegType.filter((data) => {
                    return earnerRegType === data.code;
                });

                if( ! list || list.length === 0) {
                    return {}
                }

                return list[0];
            },


            isValidDynamicRequiredData: function(formData) {
                let regTypeData = this.getRequireDataByEarnerRegType(formData.EARNER_REG_TYPE.value);
                if(! Object.keys(regTypeData).length) {
                    return true;
                }

                let checkDataList = regTypeData.requiredFdList.filter((fdNm) => {
                    return this.payrollUtil.isEmpty(formData[fdNm].value)
                });

                if(! checkDataList || checkDataList.length === 0) {
                    return true;
                }

                if( regTypeData.operator === 'OR' && regTypeData.requiredFdList.length !== checkDataList.length) {
                    return true;
                }

                this.errors = {}
                checkDataList.forEach((fdNm) => {
                    this.errors[fdNm] = formData[fdNm].validMsg;
                });

                return false;
            },

            isValiStaticRequiredData: function(formData) {
                this.errors = {};
                const me = this;
                let valid = true;
                let keys = Object.keys(formData);

                keys.forEach((key) => {
                    let data = formData[key];
                    if(! data.isRequired) {
                        return true;
                    }

                    if(data.isDynamicRequired === true) {
                        return true;
                    }

                    if(this.payrollUtil.isEmpty(data.value)) {
                        me.errors[key] = data.validMsg;
                        valid = false;
                    }
                });

                if(formData.EARNER_RESID_TYPE.value === '2' && this.payrollUtil.isEmpty(formData.EARNER_RESID_CN.value)) {
                    this.errors.EARNER_RESID_CN = '거주지국국 코드를 선택해주세요.';
                    valid = false;
                }

                return valid;
            },

            getFormData: function() {
                let params = {};
                Object.assign(params, this.basicData, this.foreignerData, this.nativeData);

                return params;
            },

            resetFormData: function() {
                const me = this;
                Object.keys(this.basicData).forEach((key) => {
                    me.basicData[key].value = me.$options.data().basicData[key].value;
                });

                Object.keys(this.foreignerData).forEach((key) => {
                    me.foreignerData[key].value = me.$options.data().foreignerData[key].value;
                });

                Object.keys(this.nativeData).forEach((key) => {
                    me.nativeData[key].value = me.$options.data().nativeData[key].value;
                });
            },

            async loadDropdownData() {
                // 관리사업장
                this.basicData.EARNER_WORK_SITE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });

                // 거주지국 코드
                this.basicData.EARNER_RESID_CN.items = await this.getDropdownData({
                    url: '/system/setting/country/list',
                    params: {
                        SHOW_FLAG: 'Y'
                    }
                });

                // 은행코드
                this.basicData.EARNER_BANK_CODE.items = await this.getDropdownData({
                    url: '/system/setting/krbank/list',
                    params: {}
                });

                // 소득자 구분
                let items = await this.getDropdownData({
                    url: '/system/setting/mastcode/list-all',
                    params: {
                        SUPER_CODE: 'AK',
                        INACTIVE: 'N'
                    }
                });
                this.setEarnerRegTypeItems(items);
            },

            setEarnerRegTypeItems(items) {
                if(items.length === 0) {
                    return;
                }

                const me = this;
                items.forEach((value) => {
                    if(value.CODE_ATTRIBUTE1 === 'N') {
                        me.basicData.EARNER_REG_TYPE.nativeItems.push({
                            code: value.REAL_CODE,
                            desc: value.CODE_NAME
                        });
                    } else if(value.CODE_ATTRIBUTE1 === 'F') {
                        me.basicData.EARNER_REG_TYPE.foreignerItems.push({
                            code: value.REAL_CODE,
                            desc: value.CODE_NAME
                        });
                    }
                });
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            createDynamicComponent() {
                this.loadDropdownData();
            },

            setBasicData: function(param) {
                const me = this;
                let keys = Object.keys(this.basicData);
                keys.forEach((key) => {
                    me.basicData[key].value = param[key] || me.$options.data().basicData[key].value;
                });
            },

            setForeignerData: function(param) {
                const me = this;
                let keys = Object.keys(this.foreignerData);
                keys.forEach((key) => {
                    me.foreignerData[key].value = param[key] || me.$options.data().foreignerData[key].value;
                });
            },

            setNativeData: function(param) {
                const me = this;
                let keys = Object.keys(this.nativeData);
                keys.forEach((key) => {
                    me.nativeData[key].value = param[key] || me.$options.data().nativeData[key].value;
                });
            },

            setReadOnly: function( param) {
                if(param.OPEN_TYPE === 'UPDATE') {
                    this.basicData.EARNER_CODE.isReadOnly = true;
                    this.url = '/earner/update';
                } else {
                    this.basicData.EARNER_CODE.isReadOnly = false;
                    this.url = '/earner/insert';
                }
            },

            setResidCnDisabled: function() {
                let value = this.basicData.EARNER_RESID_TYPE.value;
                if( value === '2') {
                    this.basicData.EARNER_RESID_CN.isRequired = true;
                    this.basicData.EARNER_RESID_CN.isDisabled = false;
                } else if(value === '1'){
                    this.basicData.EARNER_RESID_CN.isRequired = false;
                    this.basicData.EARNER_RESID_CN.isDisabled = true;
                    this.basicData.EARNER_RESID_CN.value = 'KR';
                }
            },

            asyncDynamicComponentData(_param) {
                this.resetFormData();

                this.setBasicData(_param);

                this.setForeignerData(_param);

                this.setNativeData(_param);

                this.setReadOnly(_param);
            },
        }
    }
</script>