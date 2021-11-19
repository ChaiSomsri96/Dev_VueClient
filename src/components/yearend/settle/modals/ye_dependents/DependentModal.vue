<template>
    <base-modal title="부양가족" id="dependent-modal" :scroll="false" width="800">
        <template v-slot:body>
            <table-form :colgroup="['15%', 'auto', '15%', 'auto']" :footerHide="true">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="성명"
                        :has-error="errors.PERSON_NAME && errors.PERSON_NAME != ''" />
                        <table-form-item :error-msg="errors.PERSON_NAME">
                            <ui-input :value="dependent.PERSON_NAME.value"
                                      @change="dependent.PERSON_NAME.value=$event;"
                                      :options="{ readonly: dependent.PERSON_NAME.readonly }"
                            />
                        </table-form-item>
                        <table-form-label label="주민등록번호" 
                        :has-error="errors.PERSON_RRN && errors.PERSON_RRN != ''"/> 
                        <table-form-item :error-msg="errors.PERSON_RRN">
                            <div style="display: flex; flexDirection: row; align-items: center;">
                                <ui-input :value="dependent.PERSON_BIRTH"
                                          @change="dependent.PERSON_BIRTH=$event;" />
                                <span style="padding: 0 2px;">-</span>
                                <ui-input :value="dependent.PERSON_RRN"
                                          @change="dependent.PERSON_RRN=$event;" />
                            </div>
                        </table-form-item>
                  </tr>
                  <tr>
                        <table-form-label label="연소득(100만)" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.PERSON_INCOME.items"
                                :value="dependent.PERSON_INCOME.value"
                                @change="dependent.PERSON_INCOME.value=$event.value; dependent.PERSON_INCOME.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                    disabled: dependent.PERSON_INCOME.readonly
                                }"
                            />
                        </table-form-item>
                        <table-form-label label="관계" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.PERSON_REL.items"
                                :value="dependent.PERSON_REL.value"
                                @change="dependent.PERSON_REL.value=$event.value; dependent.PERSON_REL.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                  disabled: dependent.PERSON_REL.readonly
                                }"
                            />
                        </table-form-item>
                  </tr>
                  <tr>
                        <table-form-label label="생계" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.PERSON_LIVING.items"
                                :value="dependent.PERSON_LIVING.value"
                                @change="dependent.PERSON_LIVING.value=$event.value; dependent.PERSON_LIVING.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                    disabled: dependent.PERSON_LIVING.readonly
                                }"
                            />
                        </table-form-item>
                        <table-form-label label="내외국인" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.PERSON_NATION.items"
                                :value="dependent.PERSON_NATION.value"
                                @change="dependent.PERSON_NATION.value=$event.value; dependent.PERSON_NATION.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="장애인" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.HANDI_DED.items"
                                :value="dependent.HANDI_DED.value"
                                @change="dependent.HANDI_DED.value=$event.value; dependent.HANDI_DED.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                        <table-form-label label="장애기한(치유일)" />
                        <table-form-item>
                            <ui-input-date :date="dependent.CURE_DATE" @change="dependent.CURE_DATE=$event;" />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="기본공제" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.BASIC_DED.items"
                                :value="dependent.BASIC_DED.value"
                                @change="dependent.BASIC_DED.value=$event.value; dependent.BASIC_DED.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                  disabled: dependent.BASIC_DED.readonly
                                }"
                            />
                        </table-form-item>
                        <table-form-label label="경로우대" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.ELDER_DED.items"
                                :value="dependent.ELDER_DED.value"
                                @change="dependent.ELDER_DED.value=$event.value; dependent.ELDER_DED.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="출생" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.BIRTH_DED.items"
                                :value="dependent.BIRTH_DED.value"
                                @change="dependent.BIRTH_DED.value=$event.value; dependent.BIRTH_DED.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                  disabled: dependent.BIRTH_DED.readonly
                                }"
                            />
                        </table-form-item>
                        <table-form-label label="입양" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="dependent.ADOPTION_DED.items"
                                :value="dependent.ADOPTION_DED.value"
                                @change="dependent.ADOPTION_DED.value=$event.value; dependent.ADOPTION_DED.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message',
                                  disabled: dependent.ADOPTION_DED.readonly
                                }"
                            />
                        </table-form-item>
                    </tr>
                  <tr>
                    <table-form-label label="여권번호" />
                    <table-form-item>
                      <ui-input :value="dependent.PASSPORT_NO" @change="dependent.PASSPORT_NO=$event;" />
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
                <button class="btn btn-md black" @click="onSave">
                    <i class="icon-lineIcon-check mr-5"></i>저장
                </button>
<!--                <button class="btn btn-md flat" @click="onDelete">
                    <i class="icon-lineIcon-close mr-5"></i>삭제
                </button>-->
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
import { mapGetters } from 'vuex';

export default {
    mixins: [modal],
    components: {
        BaseModal,
        TableForm,
        TableFormItem,
        TableFormLabel
    },
    computed: {
        ...mapGetters({
            eid: 'yearend/getEid',
            attYear: 'yearend/getAttYear',
            payday: 'yearend/getPayday'
        })
    },
    data() {
        return {
            step: 'FAMILY',
            errors: {},
            dependent: {}
        }
    },
    methods: {
        resetComponent() {
            this.errors = {};
            this.dependent = {
                PERSON_NAME: {
                  value:'',
                  readonly: false
                },
                PERSON_BIRTH: '',
                PERSON_RRN: '',
                PERSON_INCOME:  {
                    value: 1,
                    readonly: false,
                    return: null,
                    items: [
                        { message: '이하', code: 1 },
                        { message: '초과', code: 2 }
                    ]
                },
                PERSON_REL: {
                    value: '0',
                    readonly: false,
                    return: null,
                    items: [
                        { message: '본인', code: '0' },
                        { message: '1-소득자 직계존속', code: '1' },
                        { message: '2-배우자 직계존속', code: '2' },
                        { message: '3-배우자', code: '3' },
                        { message: '4-직계비속(자녀,입양자)', code: '4' },
                        { message: '5-직계비속(기타)', code: '5' },
                        { message: '6-형제자매', code: '6' },
                        { message: '7-수급자', code: '7' },
                        { message: '8-위탁아동', code: '8' },
                    ]
                },
                PERSON_LIVING: {
                    value: '1',
                    return: null,
                    readonly: false,
                    items: [
                        { message: '동거', code: '1' },
                        { message: '취학 질병등으로 일시퇴거', code: '2' },
                        { message: '주거형편상 별거', code: '3' },
                        { message: '별거', code: '4' },
                    ]
                },
                PERSON_NATION: {
                    value: 1,
                    return: null,
                    items: [
                        { message: '내국인', code: 1 },
                        { message: '외국인', code: 9 }
                    ]
                },
                HANDI_DED: {
                    value: 'Z',
                    return: null,
                    items: [
                        { message: '장애인 복지법에 따른 장애인', code: '1' },
                        { message: '국가유공자예우법에 따른 상이자 등', code: '2' },
                        { message: '항시치료를 요하는 중증환자', code: '3' },
                        { message: '대상아님', code: 'Z' },
                    ]
                },
                CURE_DATE: '',
                BASIC_DED: {
                    value: '1',
                    return: null,
                    readonly: false,
                    items: [
                        { message: 'Y', code: '1' },
                        { message: 'N', code: 'Z' }
                    ]
                },
                ELDER_DED: {
                    value: '1',
                    return: null,
                    items: [
                        { message: 'Y', code: '1' },
                        { message: 'N', code: 'Z' }
                    ]
                },
                BIRTH_DED: {
                    value: '1',
                    return: null,
                    readonly: false,
                    items: [
                        { message: '예', code: '1' },
                        { message: '아니오', code: 'Z' }
                    ]
                },
                ADOPTION_DED: {
                    value: '1',
                    return: null,
                    readonly: false,
                    items: [
                        { message: '예', code: '1' },
                        { message: '아니오', code: 'Z' }
                    ]
                },
                PASSPORT_NO: '',
                YES_ID:''
            };
        },
        validationProcess() {
            let hasError = false;
            this.errors = {};
            if(this.payrollUtil.isEmpty(this.dependent.PERSON_NAME)) {
                hasError = true;
                this.errors.PERSON_NAME = '성명을 입력해 주세요.';
            }
            if(this.payrollUtil.isEmpty(this.dependent.PERSON_BIRTH) || this.payrollUtil.isEmpty(this.dependent.PERSON_RRN) ) {
                hasError = true;
                this.errors.PERSON_RRN = '주민등록번호를 입력해 주세요.';
            }
            if(hasError)
                return false;
            return true;
        },
        async onSave() {
            let me = this;
            if(!this.validationProcess())
                return;
            let _params = {
                ATT_YEAR: this.attYear,
                EID: this.eid,
                PAYDAY: this.payday,
                CURRENT_STEP: this.step,
                YES_ID: this.dependent.YES_ID,
                PERSON_NAME: this.dependent.PERSON_NAME.value,
                PERSON_BIRTH: this.dependent.PERSON_BIRTH,
                PERSON_RRN: this.dependent.PERSON_RRN,
                PERSON_INCOME: this.dependent.PERSON_INCOME.value,
                PERSON_REL: this.dependent.PERSON_REL.value,
                PERSON_LIVING: this.dependent.PERSON_LIVING.value,
                PERSON_NATION: this.dependent.PERSON_NATION.value,
                HANDI_DED: this.dependent.HANDI_DED.value,
                CURE_DATE: this.dependent.CURE_DATE,
                BASIC_DED: this.dependent.BASIC_DED.value,
                ELDER_DED: this.dependent.ELDER_DED.value,
                BIRTH_DED: this.dependent.BIRTH_DED.value,
                ADOPTION_DED: this.dependent.ADOPTION_DED.value,
                PASSPORT_NO: this.dependent.PASSPORT_NO
            };
            try {
                await this.$httpPost({
                    url: "/year-end/employee/deduction/request/save-family",
                    param: _params,
                    callback: function() {
                        me.toastSuccessSave();
                    }
                });
                this.close();
            }  
            catch (e) {
                console.log("DependentModal onSave: ", e);
            }
        },
        async onDelete() {
            let me = this;
            me.confirm({
                title: '확인',
                message: '정말 삭제하시겠습니까?',
                yesCallback: async function() {
                    if(!me.validationProcess())
                        return; 
                    let _params = {
                        ATT_YEAR: me.attYear,
                        EID: me.eid,
                        PAYDAY: me.payday,
                        PERSON_NAME: me.dependent.PERSON_NAME.value,
                        PERSON_BIRTH: me.dependent.PERSON_BIRTH,
                        PERSON_RRN: me.dependent.PERSON_RRN,
                        PERSON_INCOME: me.dependent.PERSON_INCOME.value,
                        PERSON_REL: me.dependent.PERSON_REL.value,
                        PERSON_LIVING: me.dependent.PERSON_LIVING.value,
                        PERSON_NATION: me.dependent.PERSON_NATION.value,
                        HANDI_DED: me.dependent.HANDI_DED.value,
                        CURE_DATE: me.dependent.CURE_DATE,
                        BASIC_DED: me.dependent.BASIC_DED.value,
                        ELDER_DED: me.dependent.ELDER_DED.value,
                        BIRTH_DED: me.dependent.BIRTH_DED.value,
                        ADOPTION_DED: me.dependent.ADOPTION_DED.value,
                        PASSPORT_NO: me.dependent.PASSPORT_NO
                    };
                    try {
                        await me.$httpPost({
                            url: "/year-end/employee/deduction/request/delete",
                            param: _params,
                            callback: function() {
                                me.toastSuccessDelete();
                            }
                        });
                        me.close();
                    }
                    catch(e) {
                        console.log("DependentModal onDelete: ", e);
                    }
                }
            });
        },
        asyncDynamicComponentData(_param) {
            this.errors = {};
            this.resetComponent();
            this.dependent.YES_ID = _param['YES_ID'];
            this.dependent.PERSON_NAME.value = _param['PERSON_NAME'];
            this.dependent.PERSON_NAME.readonly = _param['PERSON_REL'] == '0';
            this.dependent.PERSON_BIRTH = _param['PERSON_BIRTH'];
            this.dependent.PERSON_RRN = _param['PERSON_RRN'];
            this.dependent.PERSON_INCOME.value = _param['PERSON_REL'] == '0' ? '2' : _param['PERSON_INCOME'];
            this.dependent.PERSON_INCOME.readonly = _param['PERSON_REL'] == '0';
            this.dependent.PERSON_REL.value = _param['PERSON_REL'];
            this.dependent.PERSON_REL.readonly = _param['PERSON_REL'] == '0';
            this.dependent.PERSON_LIVING.value = _param['PERSON_LIVING'];
            this.dependent.PERSON_LIVING.readonly = _param['PERSON_REL'] == '0';
            this.dependent.PERSON_NATION.value = _param['PERSON_NATION'];
            this.dependent.HANDI_DED.value = _param['HANDI_DED'];
            this.dependent.CURE_DATE = _param['CURE_DATE'];
            this.dependent.BASIC_DED.value = _param['BASIC_DED'];
            this.dependent.BASIC_DED.readonly = _param['PERSON_REL'] == '0';
            this.dependent.ELDER_DED.value = _param['ELDER_DED'];
            this.dependent.BIRTH_DED.value = _param['BIRTH_DED'];
            this.dependent.BIRTH_DED.readonly = _param['PERSON_REL'] == '0';
            this.dependent.ADOPTION_DED.value = _param['ADOPTION_DED'];
            this.dependent.ADOPTION_DED.readonly = _param['PERSON_REL'] == '0';
            this.dependent.PASSPORT_NO = _param['PASSPORT_NO'];
        }
    },
    created() {
        this.resetComponent();
    },
}
</script>

<style lang="scss" scoped>
.resident-reg-number {
    width: 50%;
}
</style>