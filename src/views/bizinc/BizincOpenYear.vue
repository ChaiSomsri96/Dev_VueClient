<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'사업소득 정산년도 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <div class="form-wrap">
                <labeled-input input-label="사업소득 오픈연도" :error-msg="errors.BIZ_YEAR" class="col-6" labelClass="col-3" inputClass="col-9">
                    <ui-input :value="formData.BIZ_YEAR" @change="formData.BIZ_YEAR=$event;" />
                </labeled-input>
                <labeled-input input-label="기타소득 오픈연도" :error-msg="errors.EXT_YEAR" class="col-6" labelClass="col-3" inputClass="col-9">
                    <ui-input :value="formData.EXT_YEAR" @change="formData.EXT_YEAR=$event;" />
                </labeled-input>
                <labeled-input input-label="이자배당소득 오픈연도" :error-msg="errors.DIVID_YEAR" class="col-6" labelClass="col-3" inputClass="col-9">
                    <ui-input :value="formData.DIVID_YEAR" @change="formData.DIVID_YEAR=$event;" />
                </labeled-input>
                <labeled-input input-label="비거주자소득 오픈연도" :error-msg="errors.NON_RESID_BIZ_YEAR" class="col-6" labelClass="col-3" inputClass="col-9">
                    <ui-input :value="formData.NON_RESID_BIZ_YEAR" @change="formData.NON_RESID_BIZ_YEAR=$event;" />
                </labeled-input>
            </div>
        </div>
        <button-panel class="col-12"
                      v-bind:update=true
                      v-on:update="updateOpenYear"/>
    </div>
</template>

<script>
    import LabeledInput from "../../components/common/LabeledInput";
    import ButtonPanel from "../../components/common/ButtonPanel";

    export default {
        components: {ButtonPanel, LabeledInput},
        data() {
            return {
                errors: {},
                formData: {
                    BIZ_YEAR: '',
                    EXT_YEAR: '',
                    DIVID_YEAR: '',
                    NON_RESID_BIZ_YEAR: ''
                }
            }
        },
        methods: {
            async setOpenYear() {
                const me = this;
                const {data} = await this.$httpGet( '/bizinc/config/open-year/find', {}) || {};
                Object.keys( this.formData).forEach( key => me.formData[key] = data[key]);
            },

            updateOpenYear: function() {
                const me = this;
                if( ! this.isValidFormData()) {
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/config/open-year/update',
                    param: this.formData,
                    callback: function() {
                        me.toastSuccessInsert();
                    }
                })
            },

            isValidFormData: function() {
                this.errors = {};

                let hasError = false;
                if( this.payrollUtil.isEmpty(this.formData.BIZ_YEAR)) {
                    this.errors.BIZ_YEAR = '사업소득 오픈연도를 입력해주세요.';
                    hasError = true;
                }

                if( this.payrollUtil.isEmpty(this.formData.EXT_YEAR)) {
                    this.errors.EXT_YEAR = '기타소득 오픈연도를 입력해주세요.';
                    hasError = true;
                }

                if( this.payrollUtil.isEmpty(this.formData.DIVID_YEAR)) {
                    this.errors.DIVID_YEAR = '이자배당소득 오픈연도를 입력해주세요.';
                    hasError = true;
                }

                if( this.payrollUtil.isEmpty(this.formData.NON_RESID_BIZ_YEAR)) {
                    this.errors.NON_RESID_BIZ_YEAR = '비거주자소득 오픈연도를 입력해주세요.';
                    hasError = true;
                }

                return ! hasError;
            }
        },
        mounted() {
            this.setOpenYear();
        }
    }


</script>
