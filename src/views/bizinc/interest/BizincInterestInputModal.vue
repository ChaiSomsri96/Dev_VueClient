<template>
    <base-modal title="이자배당소득 입력" id="bizinc-interest-input-modal" size="large" width="1000" :scroll="false">
        <template v-slot:body>
            <div class="form-area">
                <table-form :colgroup="['10%', 'auto', '20%', 'auto']">
                    <template v-slot:body>
                        <tr>
                            <table-form-label label="사업장" :has-error="errors.BIZUNIT_CODE && errors.BIZUNIT_CODE != ''" :required="formData.BIZUNIT_CODE.isRequired"/>
                            <table-form-item :error-msg="errors.BIZUNIT_CODE">
                                <ui-dropdown :items="dropdownValues.bpCodeItems"
                                             :value="formData.BIZUNIT_CODE.value"
                                             @change="onChangeBpCode"
                                             :options="{
                                         valueField  : 'BP_CODE',
                                         labelField  : 'DV_NAME',
                                         tooltipField: 'DV_NAME'}"/>
                            </table-form-item>

                            <table-form-label label="소득자번호" :has-error="errors.EARNER_CODE && errors.EARNER_CODE != ''" :required="formData.EARNER_CODE.isRequired"/>
                            <table-form-item :error-msg="errors.EARNER_CODE">
                                <ui-dropdown :items="dropdownValues.earnerCodeItems"
                                             :value="formData.EARNER_CODE.value"
                                             @change="onChangeEarnerRegType($event); setIncomeTaxSpec(); setCorpTaxSpec();"
                                             :options="{
                                         valueField  : 'EARNER_CODE',
                                         labelField  : 'EARNER_NAME',
                                         tooltipField: 'EARNER_NAME'}"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="귀속월" :has-error="errors.PAY_MONTH && errors.PAY_MONTH != ''" :required="formData.PAY_MONTH.isRequired"/>
                            <table-form-item :error-msg="errors.PAY_MONTH">
                                <ui-dropdown :items="dropdownValues.payMonthItems"
                                             :value="formData.PAY_MONTH.value"
                                             @change="onChangePayMonth"
                                             :options="{
                                           valueField  : 'code',
                                           labelField  : 'message',
                                           tooltipField: 'message'}"/>
                            </table-form-item>
                            <table-form-label label="지급일" :has-error="errors.PAY_DATE && errors.PAY_DATE != ''" :required="formData.PAY_DATE.isRequired"/>
                            <table-form-item :error-msg="errors.PAY_DATE">
                                <ui-input-date :date="formData.PAY_DATE.value" @change="formData.PAY_DATE.value=$event"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="구분" :has-error="errors.INCOME_TYPE && errors.INCOME_TYPE != ''" :required="formData.INCOME_TYPE.isRequired"/>
                            <table-form-item :error-msg="errors.INCOME_TYPE">
                                <ui-dropdown :items="dropdownValues.incomeTypeItems"
                                             :value="formData.INCOME_TYPE.value"
                                             @change="formData.INCOME_TYPE.value=$event.value; formData.INTINC_TYPE.value=''; "
                                             :options="{
                                           valueField  : 'code',
                                           labelField  : 'message',
                                           tooltipField: 'message'}"/>
                            </table-form-item>
                            <table-form-label label="과세구분" :has-error="errors.TAXB_CODE && errors.TAXB_CODE != ''" :required="formData.TAXB_CODE.isRequired"/>
                            <table-form-item :error-msg="errors.TAXB_CODE">
                                <ui-dropdown :items="taxbCodeItems"
                                             :value="formData.TAXB_CODE.value"
                                             @change="formData.TAXB_CODE.value=$event.value; setIncomeTaxSpec(); setCorpTaxSpec();"
                                             :options="{
                                                 valueField  : 'REAL_CODE',
                                                 labelField  : 'CODE_NAME',
                                                 tooltipField: 'CODE_NAME'}"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="소득의 종류" :has-error="errors.INTINC_TYPE && errors.INTINC_TYPE != ''" :required="formData.INTINC_TYPE.isRequired"/>
                            <table-form-item :error-msg="errors.INTINC_TYPE">
                                <ui-dropdown :items="intincTypeItems"
                                             :value="formData.INTINC_TYPE.value"
                                             @change="onChangeIntincType($event); setIncomeTaxSpec();"
                                             :options="{
                                                 valueField  : 'REAL_CODE',
                                                 labelField  : 'CODE_NAME',
                                                 tooltipField: 'CODE_NAME'}"/>
                            </table-form-item>
                            <table-form-label label="지급대상 기간" 
                            :has-error="(errors.PER_START && errors.PER_START != '') || (errors.PER_END && errors.PER_END != '')" 
                            :required="(formData.PER_START.isRequired || formData.PER_END.isRequired)"/>
                            <table-form-item :error-msg="errors.PER_START || errors.PER_END">
                                <div style="display: flex; flexDirection: row; align-items: center;">
                                    <ui-input-date :date="formData.PER_START.value"
                                                   @change="formData.PER_START.value=$event"
                                                   :max-date="formData.PER_END.value"
                                                   :options="{disabled: formData.PER_START.isReadOnly}" />
                                    <span style="padding: 0 2px;">-</span>
                                    <ui-input-date :date="formData.PER_END.value"
                                                   @change="formData.PER_END.value=$event"
                                                   :min-date="formData.PER_START.value"
                                                   :options="{disabled: formData.PER_END.isReadOnly}" />
                                </div>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="이자율(%)" :has-error="errors.INTE_RATE && errors.INTE_RATE != ''" :required="formData.INTE_RATE.isRequired"/>
                            <table-form-item :error-msg="errors.INTE_RATE">
                                <ui-input-number :value="formData.INTE_RATE.value" @change="formData.INTE_RATE.value=$event"
                                :options="{disabled: formData.INTE_RATE.isReadOnly}"
                                />
                            </table-form-item>
                            <table-form-label label="지급액" :has-error="errors.PAY_AMOUNT && errors.PAY_AMOUNT != ''" :required="formData.PAY_AMOUNT.isRequired"/>
                            <table-form-item :error-msg="errors.PAY_AMOUNT">
                                <ui-input-number :value="formData.PAY_AMOUNT.value" @change="formData.PAY_AMOUNT.value=$event"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="세율(%)" :has-error="errors.TAX_RATE && errors.TAX_RATE != ''" :required="formData.TAX_RATE.isRequired"/>
                            <table-form-item :error-msg="errors.TAX_RATE">
                                <div style="display: flex; flexDirection: row; align-items: center;">
                                    <ui-dropdown :items="taxRateItems"
                                                 :value="formData.TAX_RATE.value"
                                                 @change="formData.TAX_RATE.value=$event.value;"
                                                 :options="{
                                                  valueField  : 'code',
                                                  labelField  : 'message',
                                                  tooltipField: 'message'}"/>
                                    <ui-dropdown :items="dropdownValues.rateInclLtaxItems"
                                                 :value="formData.RATE_INCL_LTAX.value"
                                                 @change="formData.RATE_INCL_LTAX.value=$event.value;"
                                                 :options="{
                                                  valueField  : 'code',
                                                  labelField  : 'message',
                                                  tooltipField: 'message',
                                                  readonly: formData.RATE_INCL_LTAX.isReadOnly}"/>
                                    <button type="button" id="btnSearch" class="btn btn-md line-1 ml-0" @click="doCalc">
                                        <span>세액계산</span>
                                    </button>
                                </div>
                            </table-form-item>
                            <table-form-label label="소득세" :has-error="errors.INCOME_TAX && errors.INCOME_TAX != ''" :required="formData.INCOME_TAX.isRequired"/>
                            <table-form-item :error-msg="errors.INCOME_TAX">
                                <ui-input-number :value="formData.INCOME_TAX.value" :options="{disabled: true}" />
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="법인세" :has-error="errors.CORP_TAX && errors.CORP_TAX != ''" :required="formData.CORP_TAX.isRequired"/>
                            <table-form-item :error-msg="errors.CORP_TAX">
                                <ui-input-number :value="formData.CORP_TAX.value" :options="{disabled: true}" />
                            </table-form-item>

                            <table-form-label label="지방소득세" :has-error="errors.RESID_TAX && errors.RESID_TAX != ''" :required="formData.RESID_TAX.isRequired"/>
                            <table-form-item :error-msg="errors.RESID_TAX">
                                <ui-input-number :value="formData.RESID_TAX.value" :options="{disabled: true}" />
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="조세특례" :has-error="errors.JOSE_SPC && errors.JOSE_SPC != ''" :required="formData.JOSE_SPC.isRequired"/>
                            <table-form-item :error-msg="errors.JOSE_SPC">
                                <ui-dropdown :items="joseSpcItems"
                                             :value="formData.JOSE_SPC.value"
                                             @change="formData.JOSE_SPC.value=$event.value; setIncomeTaxSpec();"
                                             :options="{
                                                 valueField  : 'REAL_CODE',
                                                 labelField  : 'CODE_NAME',
                                                 tooltipField: 'CODE_NAME'}"/>
                            </table-form-item>
                            <table-form-label label="금융상품코드" :has-error="errors.PROD_CODE && errors.PROD_CODE != ''" :required="formData.PROD_CODE.isRequired"/>
                            <table-form-item :error-msg="errors.PROD_CODE">
                                <div style="display: flex; flexDirection: row; align-items: center;">
                                    <ui-dropdown :items="productCodeItems"
                                                 :value="formData.PRODUCT_CODE.value"
                                                 @change="formData.PRODUCT_CODE.value=$event.value;formData.PROD_CODE.value=formData.KIND_CODE.value + formData.PRODUCT_CODE.value;"
                                                 :options="{
                                                     valueField  : 'REAL_CODE',
                                                     labelField  : 'CODE_NAME',
                                                     tooltipField: 'CODE_NAME'}"/>
                                    <ui-dropdown :items="productKindItems"
                                                 :value="formData.KIND_CODE.value"
                                                 @change="formData.KIND_CODE.value=$event.value;formData.PROD_CODE.value=formData.KIND_CODE.value + formData.PRODUCT_CODE.value;"
                                                 :options="{
                                                     valueField  : 'REAL_CODE',
                                                     labelField  : 'CODE_NAME',
                                                     tooltipField: 'CODE_NAME'}"/>
                                </div>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="채권이자구분" :has-error="errors.BOND_ITYPE && errors.BOND_ITYPE != ''" :required="formData.BOND_ITYPE.isRequired"/>
                            <table-form-item :error-msg="errors.BOND_ITYPE">
                                <ui-dropdown :items="dropdownValues.bondItypeItems"
                                             :value="formData.BOND_ITYPE.value"
                                             @change="formData.BOND_ITYPE.value=$event.value;"
                                             :options="{
                                                 valueField  : 'REAL_CODE',
                                                 labelField  : 'CODE_NAME',
                                                 tooltipField: 'CODE_NAME',
                                                 disabled: formData.BOND_ITYPE.isReadOnly}"/>
                            </table-form-item>
                            <table-form-label label="신탁이익여부" :has-error="errors.SINTAK_YN && errors.SINTAK_YN != ''" :required="formData.SINTAK_YN.isRequired"/>
                            <table-form-item :error-msg="errors.SINTAK_YN">
                                <ui-dropdown :items="dropdownValues.sintakYnItems"
                                             :value="formData.SINTAK_YN.value"
                                             @change="formData.SINTAK_YN.value=$event.value;"
                                             :options="{
                                           valueField  : 'code',
                                           labelField  : 'message',
                                           tooltipField: 'message'}"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="제한세율근거" :has-error="errors.TAX_MEMO && errors.TAX_MEMO != ''" :required="formData.TAX_MEMO.isRequired"/>
                            <table-form-item :error-msg="errors.TAX_MEMO">
                                <ui-input-number :value="formData.TAX_MEMO.value" @change="formData.TAX_MEMO.value=$event"/>
                            </table-form-item>
                            <table-form-label label="유가증권 표준코드/발행자 사업자등록번호" :has-error="errors.SEC_CODE && errors.SEC_CODE != ''" :required="formData.SEC_CODE.isRequired"/>
                            <table-form-item :error-msg="errors.SEC_CODE">
                                <ui-input-number :value="formData.SEC_CODE.value" @change="formData.SEC_CODE.value=$event"
                                :options="{disabled: formData.SEC_CODE.isReadOnly}" />
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="계좌번호" :has-error="errors.ACC_NO && errors.ACC_NO != ''" :required="formData.ACC_NO.isRequired"/>
                            <table-form-item :error-msg="errors.ACC_NO">
                                <ui-input :value="formData.ACC_NO.value" 
                                          @change="formData.ACC_NO.value=$event"
                                          :options="{disabled: formData.ACC_NO.isReadOnly}" />
                            </table-form-item>
                        </tr>
                    </template>
                </table-form>
            </div>
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
//o -> R ,  X -> D,  △ -> O
const intincTypeOptions = [
    {
        code: '11', 'INTE_RATE': 'R', 'SEC_CODE': 'R', 'BOND_ITYPE': 'R', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '12', 'INTE_RATE': 'R', 'SEC_CODE': 'R', 'BOND_ITYPE': 'R', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '13', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '14', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '15', 'INTE_RATE': 'R', 'SEC_CODE': 'R', 'BOND_ITYPE': 'R', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '16', 'INTE_RATE': 'R', 'SEC_CODE': 'R', 'BOND_ITYPE': 'R', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '17', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '18', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '19', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '20', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: ['N'], excludedTaxbCodeItems: [],
        'ACC_NO': 'R'
    },
    {
        code: '21', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: ['E', 'B'], excludedTaxbCodeItems: [],
        'ACC_NO': 'R'
    },
    {
        code: '22', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '23', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '24', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '25', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '26', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '27', 'INTE_RATE': 'R', 'SEC_CODE': 'D', 'BOND_ITYPE': 'O', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '51', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: ['D', 'G'], excludedTaxbCodeItems: [],
        'ACC_NO': 'D'
    },
    {
        code: '52', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: ['D', 'G'], excludedTaxbCodeItems: [],
        'ACC_NO': 'D'
    },
    {
        code: '53', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: ['D', 'G'], excludedTaxbCodeItems: [],
        'ACC_NO': 'D'
    },
    {
        code: '54', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: ['D', 'G'], excludedTaxbCodeItems: [],
        'ACC_NO': 'D'
    },
    {
        code: '55', 'INTE_RATE': 'R', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '56', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '57', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '58', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '59', 'INTE_RATE': 'D', 'SEC_CODE': 'D', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '60', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '61', 'INTE_RATE': 'D', 'SEC_CODE': 'D', 'BOND_ITYPE': 'D', 'PER_START': 'R', 'PER_END': 'R',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '62', 'INTE_RATE': 'D', 'SEC_CODE': 'R', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '63', 'INTE_RATE': 'D', 'SEC_CODE': 'D', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'D'
    },
    {
        code: '64', 'INTE_RATE': 'D', 'SEC_CODE': 'D', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
    {
        code: '65', 'INTE_RATE': 'D', 'SEC_CODE': 'D', 'BOND_ITYPE': 'D', 'PER_START': 'D', 'PER_END': 'D',
        includedTaxbCodeItems: [], excludedTaxbCodeItems: ['D', 'G'],
        'ACC_NO': 'R'
    },
];

const joseSpc = [
    {
        'INTINC_TYPE': [ '11', '12', '15' ],
        'TAXB_CODE': ['E', 'L', 'T'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 'SY', 'PA', 'PC', 'PE', 
        'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 'PS', 'PV', 'PW', 'PX', 'PT', 'PY', 'PZ', 'TA', 'TB', 'TC', 'ZZ', 'PO', 'SZ']
    },
    {
        'INTINC_TYPE': [ '11', '12', '15' ],
        'TAXB_CODE': ['R'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 'SY', 'PA', 'PC', 
                    'PE', 'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 'PS', 'PV', 'PW', 'PX', 'PT', 'PY', 'PZ', 'TA', 'TB', 'TC', 'ZZ', 'PO', 'PQ', 'PR']
    },
    {
        'INTINC_TYPE': ['13'],
        'TAXB_CODE': ['C', 'X', 'H', 'B', 'R', 'D', 'G'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 'SY', 'PA', 'PC',
                    'PE', 'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 'PS', 'PV', 'PW', 'PX', 'PT', 'PY', 
                    'PZ', 'TA', 'TB', 'TC', 'ZZ', 'SD', 'SE', 'SM']
    },
    {
        'INTINC_TYPE': ['13'],
        'TAXB_CODE': ['E', 'L', 'T'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 
                    'SY', 'PA', 'PC', 'PE', 'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 'PS', 
                    'PV', 'PW', 'PX', 'PT', 'PY', 'PZ', 'TA', 'TB', 'TC', 'ZZ', 'SD', 'SE', 'SM', 'SZ']
    },
    {
        'INTINC_TYPE': ['13'],
        'TAXB_CODE': ['R'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 
                    'SY', 'PA', 'PC', 'PE', 'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 
                    'PS', 'PV', 'PW', 'PX', 'PT', 'PY', 'PZ', 'TA', 'TB', 'TC', 'ZZ', 'SD', 'SE', 'SM', 'PQ', 'PR']
    },
    {
        'INTINC_TYPE': ['13'],
        'TAXB_CODE': ['O'],
        'JOSE_SPC': ['NN', 'SA', 'SB', 'SC', 'SH', 'SL', 'SR', 'SS', 'SV', 'SW', 'SX', 'SY', 
                    'PA', 'PC', 'PE', 'PF', 'PG', 'PU', 'PH', 'PL', 'PM', 'PN', 'PS', 'PV', 
                    'PW', 'PX', 'PT', 'PY', 'PZ', 'TA', 'TB', 'TC', 'ZZ', 'SD', 'SE', 'SM', 'PP']
    }
];

const prodCodeKindCode = [
    {
        'INTINC_TYPE': ['13', '14', '17'],
        'PROD_CODE': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
        'KIND_CODE': ['A', 'B']
    },
    {
        'INTINC_TYPE': ['11', '12', '15', '16'],
        'PROD_CODE': ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35',
        '36', '37', '38', '39', '3A', '3B', '3C'],
        'KIND_CODE': ['A', 'B', 'C']
    },
    {
        'INTINC_TYPE': ['19', '20'],
        'PROD_CODE': ['41', '42', '43', '44'],
        'KIND_CODE': ['A', 'B', 'C']
    },
    {
        'INTINC_TYPE': ['51', '56'],
        'PROD_CODE': ['51', '52', '53', '54'],
        'KIND_CODE': ['A', 'B']
    },
    {
        'INTINC_TYPE': ['53'],
        'PROD_CODE': ['61', '62', '63', '64', '65', '66'],
        'KIND_CODE': ['A', 'B']
    },
    {
        'INTINC_TYPE': ['55'],
        'PROD_CODE': ['71', '72', '73', '74', '75', '76', '77', '78', '79', 
        '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8A', '8B'],
        'KIND_CODE': ['A', 'B', 'C', 'D', 'E', 'F']
    },
    {
        'INTINC_TYPE': ['61'],
        'PROD_CODE': ['91', '92', '93', '94', '95', '96', '97', '98', '99', '9A', '9B'],
        'KIND_CODE': ['A', 'B']
    },
];

const taxRateSpec = [
    { 'EARNER_RESID_TYPE': "1",  'INTINC_TYPE': ['22', '59'], 'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': [], 
       'TAX_RATE': [{'code': '25', 'message': '25'}] 
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': ['21'], 'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': [], 
        'TAX_RATE': [{'code': '0', 'message': '0'},
                    {'code': '6', 'message': '6'},
                    {'code': '15', 'message': '15'},
                    {'code': '24', 'message': '24'},
                    {'code': '35', 'message': '35'},
                    {'code': '38', 'message': '38'},
        ]
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': [], 'TAXB_CODE': ['R'], 'PAY_MONTH': ['2018'], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '40', 'message': '40'},
                     {'code': '90', 'message': '90'},]
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': [], 'TAXB_CODE': ['R'], 'PAY_MONTH': ['2019'], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '42', 'message': '42'},
                     {'code': '90', 'message': '90'},]
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': [], 'TAXB_CODE': ['R'], 'PAY_MONTH': ['2020'], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '42', 'message': '42'},
                     {'code': '90', 'message': '90'},]
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': [], 'TAXB_CODE': ['R'], 'PAY_MONTH_EXCLUDED': true, 'PAY_MONTH': ['2018', '2019', '2020'], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '35', 'message': '35'},
                     {'code': '38', 'message': '38'},
                     {'code': '40', 'message': '40'},
                     {'code': '42', 'message': '42'},
                     {'code': '90', 'message': '90'},]
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE': [], 'TAXB_CODE': ['E', 'X', 'F', 'I', 'W', 'N'], 'PAY_MONTH': [], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '0', 'message': '0'}],
    },
    {
        'EARNER_RESID_TYPE': "1", 'INTINC_TYPE_EXCLUDED': true, 'INTINC_TYPE': ['21', '22', '59'], 'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '0', 'message': '0'},
                    {'code': '4', 'message': '4'},
                    {'code': '5', 'message': '5'},
                    {'code': '6', 'message': '6'},
                    {'code': '9', 'message': '9'},
                    {'code': '10', 'message': '10'},
                    {'code': '12', 'message': '12'},
                    {'code': '14', 'message': '14'},
                    {'code': '15', 'message': '15'},
                    {'code': '16', 'message': '16'},
                    {'code': '20', 'message': '20'},
                    {'code': '22', 'message': '22'},
                    {'code': '24', 'message': '24'},
                    {'code': '25', 'message': '25'},
                    {'code': '30', 'message': '30'},
                    {'code': '35', 'message': '35'},
                    {'code': '36', 'message': '36'},
                    {'code': '38', 'message': '38'},
                    {'code': '40', 'message': '40'},
                    {'code': '42', 'message': '42'},
                    {'code': '49', 'message': '49'},
                    {'code': '60', 'message': '60'},
                    {'code': '90', 'message': '90'},
        ]
    },

    {
        'EARNER_RESID_TYPE': "2", 'INTINC_TYPE': ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'],
        'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': ['NN'],
        'TAX_RATE': [{'code': '14', 'message': '14'},
                    {'code': '15', 'message': '15'},
                    {'code': '20', 'message': '20'},
                    {'code': '22', 'message': '22'}]
    },
    {
        'EARNER_RESID_TYPE': "2", 'INTINC_TYPE': ['51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65'],
        'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': ['NN'],
        'TAX_RATE': [{'code': '20', 'message': '20'},
                    {'code': '22', 'message': '22'}]
    },
    {
        'EARNER_RESID_TYPE': "2", 'INTINC_TYPE': [], 'TAXB_CODE': ['E', 'X', 'F', 'I', 'W', 'N'], 'PAY_MONTH': [], 'JOSE_SPC': [],
        'TAX_RATE': [{'code': '0', 'message': '0'}]
    },
    {
        'EARNER_RESID_TYPE': "2", 'INTINC_TYPE': [], 'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': ['PE', 'PF', 'PG'],
        'TAX_RATE': [{'code': '0', 'message': '0'}]
    },
    {
        'EARNER_RESID_TYPE': "2", 'INTINC_TYPE': [], 'TAXB_CODE': [], 'PAY_MONTH': [], 'JOSE_SPC': ['PT', 'PY', 'PZ'],
        'TAX_RATE': [{'code': '0', 'message': '0'},{'code': '4', 'message': '4'},{'code': '5', 'message': '5'},{'code': '6', 'message': '6'},{'code': '9', 'message': '9'},
        {'code': '10', 'message': '10'},{'code': '12', 'message': '12'},{'code': '14', 'message': '14'},{'code': '15', 'message': '15'},{'code': '16', 'message': '16'},
        {'code': '20', 'message': '20'},{'code': '22', 'message': '22'},{'code': '24', 'message': '24'},{'code': '25', 'message': '25'},{'code': '30', 'message': '30'},
        {'code': '35', 'message': '35'},{'code': '36', 'message': '36'},{'code': '38', 'message': '38'},{'code': '40', 'message': '40'},{'code': '42', 'message': '42'},
        {'code': '49', 'message': '49'},{'code': '60', 'message': '60'},{'code': '90', 'message': '90'}]
    },
];

const incomeTaxSpec = [   //소득세
    {
        'EARNER_REG_TYPE': ['211', '222'],
        'INTINC_TYPE': [],
        'JOSE_SPC': [],
        'TAXB_CODE': [],
        'INCOME_TAX': 0
    },
    {
        'EARNER_REG_TYPE': ['211', '222'],
        'EARNER_REG_TYPE_EXCLUDED': true,
        'INTINC_TYPE': ['51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65'],
        'JOSE_SPC': [],
        'TAXB_CODE': [],
        'INCOME_TAX': 'rule'
    }, 
    {
        'EARNER_REG_TYPE': [],
        'INTINC_TYPE': [],
        'JOSE_SPC': [],
        'TAXB_CODE': [],
        'INCOME_TAX': 0
    }
];        

const corpTaxSpec = [ //법인세
    {
        'EARNER_REG_TYPE': ['211', '222'],
        'TAXB_CODE': [],
        'CORP_TAX': 'rule'
    },
    {
        'EARNER_REG_TYPE': [],
        'TAXB_CODE': ['W'],
        'CORP_TAX': 0
    },
    {
        'EARNER_REG_TYPE': ['211', '222', '411', '413'],
        'EARNER_REG_TYPE_EXCLUDED': true,
        'TAXB_CODE': [],
        'CORP_TAX': 0
    },
    {
        'EARNER_REG_TYPE': [],
        'TAXB_CODE': ['E', 'L', 'H', 'R', 'O', 'B', 'T', 'D', 'G', 'N'],
        'CORP_TAX': 0
    }
];

    export default {
        name: 'bizinc-interest-input-modal',
        mixins: [modal],
        components: {
            BaseModal,
            TableForm,
            TableFormItem,
            TableFormLabel
        },
        props: {
            options: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                errors: {},
                rule: {
                    INCOME_TAX: null,
                    CORP_TAX: null
                },
                dropdownValues: {
                    earnerCodeItems: [],
                    bpCodeItems: [],                    // 사업장
                    bondItypeItems: [],                 // 채권이자구분
                    joseSpcSet: [],             // 조세특례
                    product: {
                        codeItems: [],
                        kindItems: []
                    },
                    intincType: {
                        interestItems: [],
                        dividendItems: []
                    },
                    taxbCodeList: [],  // 과세구분 목록
                    sintakYnItems: [
                        {code: '1', message: 'Y'},
                        {code: '2', message: 'N'}
                    ],
                    incomeTypeItems: [
                        {code: '1', message: '이자'},
                        {code: '2', message: '배당'}
                    ],
                    rateInclLtaxItems: [
                        {code: '1', message: '지방세 불포함'},
                        {code: '2', message: '지방세 포함'}
                    ],
                    payMonthItems: [
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
                        {code: '12', message: '12월'}
                    ]
                },
                formData: {
                    BIZUNIT_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '사업장을 선택해주세요.'
                    },
                    TAX_OFFICE: { //
                        value: '',
                        isRequired: false
                    },
                    WARD_OFFICE: {
                        value: '',
                        isRequired: false
                    },
                    INCOME_TYPE: { //구분
                        value: '',
                        isRequired: true,
                        validMsg: '구분을 선택해주세요.'
                    },
                    PAY_MONTH: { //귀속월
                        value: '',
                        isRequired: true,
                        validMsg: '귀속월을 선택해주세요.'  
                    },
                    PAY_PER: {
                        value: '',
                        isRequired: false,
                    },
                    PAY_DATE: {
                        value: '',
                        isRequired: true,
                        validMsg: '지급일을 입력해주세요.'  
                    },
                    TAXB_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '과세구분을 선택해주세요.'  
                    },
                    TAXB_CODE_TYPE: {
                        value: '',
                        isRequired: false
                    },
                    INTINC_TYPE: {
                        value: '',
                        isRequired: true,
                        validMsg: '소득의 종류를 선택해주세요.'
                    },
                    PER_START: {
                        value: '',
                        isRequired: false,
                        validMsg: '지급대상 기간을 입력해주세요.'
                    },
                    PER_END: {
                        value: '',
                        isRequired: false,
                        validMsg: '지급대상 기간을 입력해주세요.'
                    },
                    INTE_RATE: {
                        value: null,
                        isRequired: false,
                        validMsg: '이자율을 입력해주세요.'
                    },
                    PAY_AMOUNT: {
                        value: 0,
                        isRequired: false,
                        validMsg: '지급액을 입력해주세요.'
                    },
                    TAX_RATE: {
                        value: '',
                        isRequired: false
                    },
                    RATE_INCL_LTAX: {
                        value: '',
                        isRequired: false,
                        isReadOnly: false,
                    },
                    INCOME_TAX: {
                        value: null,
                        isRequired: false,
                        validMsg: '소득세를 입력해주세요.'
                    },
                    CORP_TAX: {
                        value: null,
                        isRequired: false,
                        validMsg: '법인세를 입력해주세요.'
                    },
                    RESID_TAX: {
                        value: null,
                        isRequired: false,
                        validMsg: '지방소득세를 입력해주세요.'
                    },
                    JOSE_SPC: {
                        value: '',
                        isRequired: false,
                        validMsg: '조세특례를 선택해주세요.'
                    },
                    PROD_CODE: {
                        value: '',
                        isRequired: false,
                        validMsg: '금융상품코드를 선택해주세요.'
                    },
                    PRODUCT_CODE: {
                        value: ''
                    },
                    KIND_CODE: {
                        value: ''
                    },
                    SEC_CODE: {
                        value: '',
                        isRequired: false,
                        validMsg: '유가증권을 입력해주세요.'
                    },
                    BOND_ITYPE: {
                        value: '',
                        isRequired: false,
                        validMsg: '채권이자구분을 선택해주세요.'
                    },
                    SINTAK_YN: {
                        value: '',
                        isRequired: false,
                        validMsg: '신탁이익여부를 선택해주세요.'
                    },
                    TAX_MEMO: {
                        value: '',
                        isRequired: false,
                        validMsg: '제한세율근거를 입력해주세요.'
                    },
                    EARNER_CODE: {
                        value: '',
                        isRequired: true,
                        validMsg: '소득자번호를 선택해주세요.'
                    },
                    EARNER_REG_TYPE: {
                        value: '',
                        isRequired: false
                    },
                    EARNER_RESID_TYPE: {
                        value: '',
                        isRequired: false
                    },
                    ACC_NO: {
                        value: '',
                        isRequired: false,
                        validMsg: '계좌번호를 입력해주세요.'   
                    }
                },
                taxRateValues: {
                    defaultValues: [
                        0, 5, 6, 9, 10, 12, 14, 15, 16, 20, 22, 24, 25, 30, 35, 36, 38, 40, 49, 60, 90
                    ],
                    resident: [
                        {
                            codeName: 'INTINC_TYPE',
                            codeList: ['22', '59'],
                            rateList: [25]
                        },
                        {
                            codeName: 'INTINC_TYPE',
                            codeList: ['21'],
                            rateList: [0, 6, 15, 24, 35, 38]
                        },
                        {
                            codeName: 'TAXB_CODE',
                            codeList: ['R'],
                            rateList: [35, 38, 90]
                        },
                        {
                            codeName: 'TAXB_CODE',
                            codeList: ['E', 'X'],
                            rateList: [0]
                        }
                    ],
                    nonResident: [
                        {
                            codeName: 'JOSE_SPC',
                            codeList: ['NN'],
                            secondConditional: [
                                {
                                    codeName: 'INCOME_TYPE',
                                    codeList: ['1'],
                                    rateList: [14, 15.4, 20, 22]
                                },
                                {
                                    codeName: 'INCOME_TYPE',
                                    codeList: ['2'],
                                    rateList: [20, 22]
                                }
                            ]
                        },
                        {
                            codeName: 'JOSE_SPC',
                            codeList: ['PE', 'PF', 'PG'],
                            rateList: [0]
                        },
                        {
                            codeName: 'TAXB_CODE',
                            codeList: ['E', 'X'],
                            rateList: [0]
                        }
                    ]
                },

                requiredDataByIntincType: [
                    {
                        codeList: ['11', '12', '15', '16'],
                        requiredFdList: ['SEC_CODE', 'BOND_ITYPE']
                    },
                    {
                        codeList: ['51', '52', '53', '54', '55', '56', '57', '58', '60', '62'],
                        requiredFdList: ['SEC_CODE']
                    },
                    {
                        codeList: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                            '25', '26', '27', '55', '60', '61'],
                        requiredFdList: ['PER_PERIOD']
                    }
                ],

            }
        },
        computed: {
            taxRateItems: function() {
                for(let i = 0; i < taxRateSpec.length; i ++) {
                    if(this.formData.EARNER_RESID_TYPE.value == taxRateSpec[i]['EARNER_RESID_TYPE']
                    && (taxRateSpec[i]['INTINC_TYPE'].length == 0 || 
                        (taxRateSpec[i]['INTINC_TYPE_EXCLUDED'] && taxRateSpec[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) < 0) || 
                        (!taxRateSpec[i]['INTINC_TYPE_EXCLUDED'] && taxRateSpec[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) >= 0)   )
                    && (taxRateSpec[i]['TAXB_CODE'].length == 0 || 
                        taxRateSpec[i]['TAXB_CODE'].indexOf(this.formData.TAXB_CODE.value) >= 0)

                    && (taxRateSpec[i]['PAY_MONTH'].length == 0 || 
                        (taxRateSpec[i]['PAY_MONTH_EXCLUDED'] && taxRateSpec[i]['PAY_MONTH'].indexOf(this.formData.PAY_MONTH.value) < 0) || 
                        (!taxRateSpec[i]['PAY_MONTH_EXCLUDED'] && taxRateSpec[i]['PAY_MONTH'].indexOf(this.formData.PAY_MONTH.value) >= 0)   )   

                    && (taxRateSpec[i]['JOSE_SPC'].length == 0 || 
                        taxRateSpec[i]['JOSE_SPC'].indexOf(this.formData.JOSE_SPC.value) >= 0)
                        ) {
                            return taxRateSpec[i]['TAX_RATE'];  
                    }
                }
                return [];
            },
            productCodeItems: function() {
                if(this.payrollUtil.isEmpty(this.formData.INTINC_TYPE.value)) {
                    return [];
                }
                for(let i = 0; i < prodCodeKindCode.length; i ++) {
                    if(prodCodeKindCode[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) >= 0) {
                        let _items = [];
                        for(let j = 0; j < prodCodeKindCode[i]['PROD_CODE'].length; j ++) {
                            for(let k = 0; k < this.dropdownValues.product.codeItems.length; k ++) {
                                if(prodCodeKindCode[i]['PROD_CODE'][j] == this.dropdownValues.product.codeItems[k]['REAL_CODE']) {
                                    _items.push(this.dropdownValues.product.codeItems[k]);
                                    break;
                                }
                            }
                        }
                        return _items;
                    }
                }
                return [];
            },
            productKindItems: function() {
                if(this.payrollUtil.isEmpty(this.formData.INTINC_TYPE.value)) {
                    return [];
                }
                for(let i = 0; i < prodCodeKindCode.length; i ++) {
                    if(prodCodeKindCode[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) >= 0) {
                        let _items = [];
                        for(let j = 0; j < prodCodeKindCode[i]['KIND_CODE'].length; j ++) {
                            for(let k = 0; k < this.dropdownValues.product.kindItems.length; k ++) {
                                if(prodCodeKindCode[i]['KIND_CODE'][j] == this.dropdownValues.product.kindItems[k]['REAL_CODE']) {
                                    _items.push(this.dropdownValues.product.kindItems[k]);
                                    break;
                                }
                            }
                        }
                        return _items;
                    }
                }
                return [];
            },
            joseSpcItems: function() { //조세 특례
                if(this.payrollUtil.isEmpty(this.formData.INTINC_TYPE.value) || this.payrollUtil.isEmpty(this.formData.TAXB_CODE.value))
                    return [];

                for(let i = 0; i < joseSpc.length; i ++) {
                    if(joseSpc[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) >= 0 && joseSpc[i]['TAXB_CODE'].indexOf(this.formData.TAXB_CODE.value) >= 0) {
                        let _items = [];
                        for(let j = 0; j < joseSpc[i]['JOSE_SPC'].length; j ++) {
                            for(let k = 0; k < this.dropdownValues.joseSpcSet.length; k ++) {
                                if(joseSpc[i]['JOSE_SPC'][j] == this.dropdownValues.joseSpcSet[k]['REAL_CODE']) {
                                    _items.push(this.dropdownValues.joseSpcSet[k]);
                                    break;
                                }
                            }
                        }
                        return _items;
                    }
                }
                return [];
            },
            taxbCodeItems: function() {  // 과세구분
                if(this.payrollUtil.isEmpty(this.formData.INTINC_TYPE.value))
                    return this.dropdownValues.taxbCodeList;

                for(let j = 0; j < intincTypeOptions.length; j ++) {
                    if(intincTypeOptions[j]['code'] == this.formData.INTINC_TYPE.value) {
                        if(intincTypeOptions[j]['includedTaxbCodeItems'].length > 0) {
                            let _items = [];
                            for(let k = 0; k < intincTypeOptions[j]['includedTaxbCodeItems'].length; k ++) {
                                for(let l = 0; l < this.dropdownValues.taxbCodeList.length; l ++) {
                                    if(this.dropdownValues.taxbCodeList[l]['REAL_CODE'] == intincTypeOptions[j]['includedTaxbCodeItems'][k])
                                    {
                                        _items.push(this.dropdownValues.taxbCodeList[l]);
                                        break;
                                    }
                                }
                            }
                            return _items;
                        }
                        else if(intincTypeOptions[j]['excludedTaxbCodeItems'].length > 0) {
                            let _items = [];
                            for(let k = 0; k < this.dropdownValues.taxbCodeList.length; k ++) {
                                let excludedFlag = false;
                                for(let l = 0; l < intincTypeOptions[j]['excludedTaxbCodeItems'].length; l ++) {
                                    if(this.dropdownValues.taxbCodeList[k]['REAL_CODE'] == intincTypeOptions[j]['excludedTaxbCodeItems'][l]) {
                                        excludedFlag = true;
                                        break;
                                    }
                                }
                                if(!excludedFlag)
                                    _items.push(this.dropdownValues.taxbCodeList[k]);
                            }
                            return _items;
                        }
                        else 
                            return this.dropdownValues.taxbCodeList;
                    }
                }                
                return this.dropdownValues.taxbCodeList;
            },

            intincTypeItems: function() {
                let value = this.formData.INCOME_TYPE.value;
                if( value === '1') {
                    return this.dropdownValues.intincType.interestItems;
                } else if( value === '2') {
                    return this.dropdownValues.intincType.dividendItems;
                }

                return [];
            },
        },

        methods: {
            createDynamicComponent() {
                this.loadDropdownData();
            },

            onChangeBpCode: function( fd) {
                const me = this;
                const targetFdNmList = ['BIZUNIT_CODE', 'WARD_OFFICE', 'TAX_OFFICE'];
                const sourceFdNmList = ['BP_CODE', 'BIZ_WARD', 'DV_TAXAUTH'];

                targetFdNmList.forEach( (fdNm, idx) => {
                    me.formData[fdNm].value = fd.object[sourceFdNmList[idx]];
                });
            },

            onChangeEarnerRegType: function(fd) {
                this.formData.EARNER_CODE.value = fd.value;
                this.formData.EARNER_REG_TYPE.value = fd['object']['EARNER_REG_TYPE'] ? fd['object']['EARNER_REG_TYPE'] : '';
                this.formData.EARNER_RESID_TYPE.value = fd['object']['EARNER_RESID_TYPE'] ? fd['object']['EARNER_RESID_TYPE'] : '';
            },

            setIncomeTaxSpec() {
                this.rule.INCOME_TAX = null;
                for(let i = 0; i < incomeTaxSpec.length; i ++) {
                    if( (incomeTaxSpec[i]['EARNER_REG_TYPE'].length == 0 || 
                        (incomeTaxSpec[i]['EARNER_REG_TYPE_EXCLUDED'] && incomeTaxSpec[i]['EARNER_REG_TYPE'].indexOf(this.formData.EARNER_REG_TYPE.value) < 0) || 
                        (!incomeTaxSpec[i]['EARNER_REG_TYPE_EXCLUDED'] && incomeTaxSpec[i]['EARNER_REG_TYPE'].indexOf(this.formData.EARNER_REG_TYPE.value) >= 0)   ) 

                        && (incomeTaxSpec[i]['INTINC_TYPE'].length == 0 || 
                            incomeTaxSpec[i]['INTINC_TYPE'].indexOf(this.formData.INTINC_TYPE.value) >= 0)

                        && (incomeTaxSpec[i]['JOSE_SPC'].length == 0 || 
                            incomeTaxSpec[i]['JOSE_SPC'].indexOf(this.formData.JOSE_SPC.value) >= 0)

                        && (incomeTaxSpec[i]['TAXB_CODE'].length == 0 || 
                            incomeTaxSpec[i]['TAXB_CODE'].indexOf(this.formData.TAXB_CODE.value) >= 0)

                    ) {
                        this.rule.INCOME_TAX = incomeTaxSpec[i]['INCOME_TAX'];
                        break;
                    }
                }
            },

            setCorpTaxSpec() {
                this.rule.CORP_TAX = null;
                for(let i = 0; i < corpTaxSpec.length; i ++) {
                    if( (corpTaxSpec[i]['EARNER_REG_TYPE'].length == 0 || 
                        (corpTaxSpec[i]['EARNER_REG_TYPE_EXCLUDED'] && corpTaxSpec[i]['EARNER_REG_TYPE'].indexOf(this.formData.EARNER_REG_TYPE.value) < 0) || 
                        (!corpTaxSpec[i]['EARNER_REG_TYPE_EXCLUDED'] && corpTaxSpec[i]['EARNER_REG_TYPE'].indexOf(this.formData.EARNER_REG_TYPE.value) >= 0)   )

                        &&  (corpTaxSpec[i]['TAXB_CODE'].length == 0 || 
                            corpTaxSpec[i]['TAXB_CODE'].indexOf(this.formData.TAXB_CODE.value) >= 0)  ) {
                        this.rule.CORP_TAX = corpTaxSpec[i]['CORP_TAX'];
                        break;
                    }
                }
            },

            loadDropdownData: function() {
                // 관리사업장
                this.loadBpCodeItems();

                this.loadEarnerCodeItems();

                // 과세구분 목록 가져오기
                this.loadTaxbCodeSet();

                // 소득의 종류 - 이자
                this.loadIntincTypeInterestItems();

                // 소득의 종류 - 배당
                this.loadIntincTypeDividendItems();

                // 조세특례
                this.loadJoseSpcItems();

                // 채권이자구분
                this.loadBondItypeItems();

                // 금융상품코드
                this.loadProductCodeItems();

                // 금융상품종류
                this.loadProductKindItems();
            },
            
            async loadTaxbCodeSet() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LI', INACTIVE: 'N'});
                    this.dropdownValues.taxbCodeList = data || [];
                }
                catch(e) {
                    console.error( e);
                }
            },

            async loadEarnerCodeItems() { // 소득자 번호 & 소득자 종류
                try {
                    const {data} = await this.$httpGet( '/earner/select', {});
                    this.dropdownValues.earnerCodeItems = data || [];
                }
                catch(e) {
                    console.error( e);
                }
            },

            // 금융상품종류
            async loadProductKindItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LH', INACTIVE: 'N'});
                    this.dropdownValues.product.kindItems = data || [];

                }catch(e) {
                    console.error( e);
                }
            },

            // 금융상품코드
            async loadProductCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LC', INACTIVE: 'N'});
                    this.dropdownValues.product.codeItems = data || [];

                }catch(e) {
                    console.error( e);
                }
            },

            async loadBondItypeItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LD', INACTIVE: 'N'});
                    this.dropdownValues.bondItypeItems = data || [];
                }catch(e) {
                    console.error( e);
                }
            },

            async loadJoseSpcItems() { //조세특례 목록
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LB', INACTIVE: 'N'});
                    this.dropdownValues.joseSpcSet = data || [];
                }catch(e) {
                    console.error( e);
                }
            },

            async loadIntincTypeInterestItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'L9', INACTIVE: 'N'});
                    this.dropdownValues.intincType.interestItems = data || [];
                }catch(e) {
                    console.error( e);
                }
            },

            async loadIntincTypeDividendItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'LA', INACTIVE: 'N'});
                    this.dropdownValues.intincType.dividendItems = data || [];
                }catch(e) {
                    console.error( e);
                }
            },

            async loadBpCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/division-mgt/list', {});
                    this.dropdownValues.bpCodeItems = data;
                }catch(e) {
                    console.log(e)
                }
            },

            onChangeIntincType: function(fd) {
                let intincType = fd.object.REAL_CODE;
                this.formData.INTINC_TYPE.value = intincType;

                this.setRequiredFieldByIntincType();
            },

            setRequiredFieldByIntincType: function() {
                const me = this;
                let intincType = this.formData.INTINC_TYPE.value;

                this.formData['INTE_RATE']['isReadOnly'] = this.formData['INTE_RATE']['isRequired'] = false;
                this.formData['SEC_CODE']['isReadOnly'] = this.formData['SEC_CODE']['isRequired'] = false;
                this.formData['BOND_ITYPE']['isReadOnly'] = this.formData['BOND_ITYPE']['isRequired'] = false;
                this.formData['PER_START']['isReadOnly'] = this.formData['PER_START']['isRequired'] = false;
                this.formData['PER_END']['isReadOnly'] = this.formData['PER_END']['isRequired'] = false;
                this.formData['ACC_NO']['isReadOnly'] = this.formData['ACC_NO']['isRequired'] = false;

                for(let i = 0; i < intincTypeOptions.length; i ++) {
                    if(intincTypeOptions[i]['code'] == intincType) {
                        this.formData['INTE_RATE']['isReadOnly'] = (intincTypeOptions[i]['INTE_RATE'] == 'D' ? true : false);
                        this.formData['INTE_RATE']['isRequired'] = (intincTypeOptions[i]['INTE_RATE'] == 'R' ? true : false);

                        this.formData['SEC_CODE']['isReadOnly'] = (intincTypeOptions[i]['SEC_CODE'] == 'D' ? true : false);
                        this.formData['SEC_CODE']['isRequired'] = (intincTypeOptions[i]['SEC_CODE'] == 'R' ? true : false);

                        this.formData['BOND_ITYPE']['isReadOnly'] = (intincTypeOptions[i]['BOND_ITYPE'] == 'D' ? true : false);
                        this.formData['BOND_ITYPE']['isRequired'] = (intincTypeOptions[i]['BOND_ITYPE'] == 'R' ? true : false);

                        this.formData['PER_START']['isReadOnly'] = (intincTypeOptions[i]['PER_START'] == 'D' ? true : false);
                        this.formData['PER_START']['isRequired'] = (intincTypeOptions[i]['PER_START'] == 'R' ? true : false);

                        this.formData['PER_END']['isReadOnly'] = (intincTypeOptions[i]['PER_END'] == 'D' ? true : false);
                        this.formData['PER_END']['isRequired'] = (intincTypeOptions[i]['PER_END'] == 'R' ? true : false);


                        this.formData['ACC_NO']['isReadOnly'] = (intincTypeOptions[i]['ACC_NO'] == 'D' ? true : false);
                        this.formData['ACC_NO']['isRequired'] = (intincTypeOptions[i]['ACC_NO'] == 'R' ? true : false);

                        break;
                    }
                }
            },

            onChangePayMonth: function( fd) {
                this.formData.PAY_MONTH.value = fd.object.code;
                this.formData.PAY_PER.value = this.formData.ATT_YEAR + fd.object.code;
            },

            resetFormData: function() {
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    this.formData[key].value = this.$options.data().formData[key].value;
                });
            },

            asyncDynamicComponentData: function(_param) {
                this.resetFormData();

                let data = {}
                Object.assign(data, _param, this.options);
                this.setFormData(data);

                this.setReadOnlyRateInclLtax();
            },

            setReadOnlyRateInclLtax: function() {
                if(this.formData.EARNER_RESID_TYPE.value !== '2') {
                    return;
                }

                this.formData.RATE_INCL_LTAX.isReadOnly = true;
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

            isValidSaveData: function() {
                const me = this;
                let hasError = false;
                this.errors = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    let data = me.formData[key];
                    if(data['isRequired'] && me.payrollUtil.isEmpty(data['value'])) {
                        hasError = true;
                        me.errors[key] = data['validMsg'];
                    }
                });
                if(hasError) {
                    return false;
                }
                return true;
            },

            async doSave() {
                const me = this;
                if( !this.isValidSaveData()) {
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/dividend/saveDividendIncome',
                    param: me.getSaveParams(),
                    callback: function() {
                        me.toastSuccessSave();
                        me.$emit('loadGridData');
                    }
                })
            },

            doCalc: function() { //세액 계산 클릭
                let _ret = null;
                if(this.rule.INCOME_TAX == null) {
                    _ret = null;
                }
                if(this.rule.INCOME_TAX != 'rule') {
                    _ret = this.rule.INCOME_TAX;
                }
                else {
                    if(this.payrollUtil.isEmpty(this.formData.RATE_INCL_LTAX.value) ||
                       this.payrollUtil.isEmpty(this.formData.PAY_AMOUNT.value) || 
                       this.payrollUtil.isEmpty(this.formData.TAX_RATE.value)) {
                           _ret = null;
                    }
                    else {
                        if(this.formData.RATE_INCL_LTAX.value == '1') {
                            _ret = parseInt(this.formData.PAY_AMOUNT.value * this.formData.TAX_RATE.value);
                        }
                        else if(this.formData.RATE_INCL_LTAX.value == '2') {
                            _ret = parseInt(this.formData.PAY_AMOUNT.value * this.formData.TAX_RATE.value / 1.1);
                        }
                    }
                }
                if(_ret != null && _ret < 1000)
                    _ret = 0;
                this.formData.INCOME_TAX.value = _ret;

                _ret = null;
                if(this.rule.CORP_TAX == null){
                    _ret = null;
                }
                if(this.rule.CORP_TAX != 'rule') {
                    _ret = this.rule.CORP_TAX;
                }
                else {
                    if(this.payrollUtil.isEmpty(this.formData.RATE_INCL_LTAX.value) ||
                       this.payrollUtil.isEmpty(this.formData.PAY_AMOUNT.value) || 
                       this.payrollUtil.isEmpty(this.formData.TAX_RATE.value)) {
                           _ret = null;
                    }
                    else {
                        if(this.formData.RATE_INCL_LTAX.value == '1') {
                            _ret = parseInt(this.formData.PAY_AMOUNT.value * this.formData.TAX_RATE.value);
                        }
                        else if(this.formData.RATE_INCL_LTAX.value == '2') {
                            _ret = parseInt(this.formData.PAY_AMOUNT.value * this.formData.TAX_RATE.value / 1.1);
                        }
                    }
                }
                if(_ret != null && _ret < 1000)
                    _ret = 0;
                this.formData.CORP_TAX.value = _ret;

                if(this.formData.INCOME_TAX.value != 0) {
                    this.formData.RESID_TAX.value = parseInt(this.formData.INCOME_TAX.value * 0.1);
                }
                else if(this.formData.CORP_TAX.value != 0) {
                    this.formData.RESID_TAX.value = parseInt(this.formData.CORP_TAX.value * 0.1);
                }
                else {
                    this.formData.RESID_TAX.value = 0;
                }
            }
        }
    }
</script>