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
                   직장가입자 취득신고 입력
                </h1>
            </div>
          </div>
        </div>
    </div>
    <div class="content-body">
        <div class="row">
            <div class="col-3">
                <table-form :colgroup="['auto']">
                    <template v-slot:body>
                        <tr>
                            <table-form-label label="내부관리번호" :has-error="errors.SI_REGIST_MATTER_NO != ''" :required="formData.SI_REGIST_MATTER_NO.isRequired"/>
                        </tr>
                        <tr>
                            <table-form-item :error-msg="errors.SI_REGIST_MATTER_NO">
                                <ui-input :value="formData.SI_REGIST_MATTER_NO.value"
                                          @change="formData.SI_REGIST_MATTER_NO.value=$event;"
                                          :options="{readonly: formData.SI_REGIST_MATTER_NO.isReadOnly}"/>
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="내부관리명"/>
                        </tr>
                        <tr>
                            <table-form-item>
                                <ui-input :value="formData.SI_REGIST_MATTER_NAME.value" @change="formData.SI_REGIST_MATTER_NAME.value=$event;" />
                            </table-form-item>
                        </tr>
                        <tr>
                            <table-form-label label="신고일"/>
                        </tr>
                        <tr>
                            <table-form-item>
                                <ui-input-date :value="formData.SI_REGIST_MATTER_DATE.value" @change="formData.SI_REGIST_MATTER_DATE.value=$event;" />
                            </table-form-item>
                        </tr>
                    </template>
                </table-form>
                <button class="btn btn-md mr-5" @click="openAcquisitionJobPersonInput">
                    <i class="icon-lineIcon-check mr-5"></i>
                    대상자 추가
                </button>
            </div>
            <div class="col-8">
                <div id="acquisition-job-input-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
            </div>
        </div>
        <button-panel
                btnType='bottom'
                v-bind:insert=true
                v-on:insert="doSave"
        />
        <acquisition-job-person-input-modal ref="acquisitionJobPersonInputModal" @addPersonList="addPersonList"/>
    </div>
</div>
</div>
</template>
<script>
import grid from '@/mixin/payroll-grid';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import ButtonPanel from "@/components/common/ButtonPanel";
import AcquisitionJobPersonInputModal from '@/components/payroll/social_insurance/AcquisitionJobPersonInputModal'

export default {
    mixins: [grid],
    components: {
        TableForm,
        TableFormItem,
        TableFormLabel,
        ButtonPanel,
        AcquisitionJobPersonInputModal
    },
    data() {
        return {
            errors: {},
            formData: {
                SI_REGIST_MATTER_NO: {
                    value: '',
                    isReadOnly: true,
                    isRequired: true,
                    validMsg: '내부관리번호를 입력해주세요'
                },
                SI_REGIST_MATTER_NAME: {
                    value: '',
                },
                SI_REGIST_MATTER_DATE: {
                    value: ''
                },
                OPEN_TYPE: {
                    value: ''
                }
            },
            fields: [
                {fieldName: 'EID', dataType: 'text'},
                {fieldName: 'EMP_NAME', dataType: 'text'},
                {fieldName: 'HRDEPT_NAMK', dataType: 'text'},
                {fieldName: 'RANK_NAME', dataType: 'text'},
                {fieldName: 'ROLE_NAME', dataType: 'text'},
                {fieldName: 'EMPTYPE_NAM', dataType: 'text'},
                {fieldName: "DELETE", dataType: 'text'}
            ],
            columns: [
                {fieldName: 'EMP_NAME', header: '이름', width: 100},
                {fieldName: 'HRDEPT_NAMK', header: '부서', width: 140},
                {fieldName: 'RANK_NAME', header: '직급', width: 120},
                {fieldName: 'ROLE_NAME', header: '직책', width: 100},
                {fieldName: 'EMPTYPE_NAM', header: '고용형태', width: 100},
                this.getDeleteColumn({columnWidth:45})
            ]
        }
    },
    methods: {
        gotoList() {
            let me = this;
            me.$router.push({name: 'AcquisitionJob'});
        },

        async doSave() {
            const me = this;
            let gridData = this.getGridDataList();
            let params = this.getFormData();

            try {
                await this.$httpPost({
                    url: '/payroll/insurance/regist/save',
                    param: {
                        FORM_DATA: JSON.stringify(params),
                        DATA_LIST: JSON.stringify(gridData)
                    },
                    callback: function() {
                        me.toastSuccessSave();
                        me.loadGridData();
                    }
                })

            } catch(e) {
                console.log(e)
            }
        },

        getGridDataList: function() {
            let list = this.dataProvider.getJsonRows(0, -1) || [];
            let returnList = [];
            list.forEach((data) => {
                returnList.push({
                    EID: data.EID,
                    E_JOIN_DATE: data.E_JOIN_DATE,
                    SI_EMP_TEL_NO: data.TEL_NO
                });
            });

            return returnList;
        },

        async openAcquisitionJobPersonInput() {
            if(! this.checkValidData()) {
                return;
            }

            if( this.formData.OPEN_TYPE !== 'UPDATE' && ! await this.checkExistMatterNo()) {
                this.toast({message: '동일한 내부 관리번호가 있습니다.<br>다른 내부 관리번호를 입력해주세요.', type:"error"});
                return;
            }

            this.$refs.acquisitionJobPersonInputModal.show({SI_REGIST_MATTER_NO: this.formData.SI_REGIST_MATTER_NO.value});
        },

        //TODO list-> find로 수정하기
        async checkExistMatterNo() {
            try {
                let {data} = await this.$httpGet( '/payroll/insurance/regist/matter/list', {});
                if( data.length > 0) {
                    return true;
                }

                return true;
            } catch(e) {
                console.log(e)
            }
        },

        checkValidData: function() {
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

        getFormData: function() {
            let params = {};
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                params[key] = this.formData[key].value;
            });

            return params;
        },

        async loadGridData() {
            let param = this.getFormData();
            if(this.payrollUtil.isEmpty(param.SI_REGIST_MATTER_NO)) {
                return;
            }

            try {
                const {data} = await this.$httpGet('/payroll/insurance/regist/common-inf/in-list', param)
                this.setRealgridData(data || []);
            } catch(e) {
                console.error(e)
            }
        },

        getRemoveDuplicateData: function(dataList) {
            const me = this;
            let options = {
                fields: ['EID'],
                values: []
            };

            let returnList = [];
            dataList.forEach((list) => {
                options.values = [];
                options.values.push(list[0]);
                if(me.gridView.searchItem(options) === -1) {
                    returnList.push(list);
                }
            });

            return returnList;
        },

        addPersonList: function(dataList = []) {
            let list = this.getRemoveDuplicateData(dataList);

            list.forEach((l) => {
                this.dataProvider.insertRow(0, l);
            });
        },

        addRealGridOption: function() {
            this.dataProvider.setOptions({
                softDeleting: false,
                deleteCreated: true
            });

            this.gridView.setStateBar({
                visible: true
            });
        },

        async setUpdateLayout() {
            this.formData.SI_REGIST_MATTER_NO.value = this.$route.params.SI_REGIST_MATTER_NO;
            this.formData.SI_REGIST_MATTER_NO.isReadOnly = true;
            this.formData.OPEN_TYPE.value = 'UPDATE';

            await this.loadGridData();
        }
    },
    mounted() {
        this.createRealGrid({
            domId: 'acquisition-job-input-grid',
            autoLoad: false,
            useNormalDelete: true
        });


        if(! this.payrollUtil.isEmpty(this.$route.params.SI_REGIST_MATTER_NO)) {
            this.setUpdateLayout();
        } else {
            this.formData.SI_REGIST_MATTER_NO.isReadOnly = false;
        }
    },
}
</script>

