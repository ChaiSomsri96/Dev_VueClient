<template>
  <base-modal title="대상자 관리" id="acquisition-job-person-input-modal" :scroll="false" width="1300">
      <template v-slot:body>
        <border-box width="200" v-slot="slotProps">
            <border-box-item title="입사일" :width="slotProps.width" multi>
                <ui-month-picker v-model="formData.DATE_FROM.value" />
                <span>~</span>
                <ui-month-picker v-model="formData.DATE_TO.value" />
            </border-box-item>
            <border-box-item button>
                <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
                    <span>검색</span>
                </button>
            </border-box-item>
        </border-box>
        <div>
            <div id="acquisition-job-person-input-modal-grid" class="realgrid-type-style" style="width: 100%; height: 300px"></div>
        </div>
      </template>
      <template v-slot:footer>
          <div class="btn-wrap">
              <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                  <i class="icon-lineIcon-close mr-5"></i>취소
              </button>
              <button type="button"
                      class="btn btn-md black"
                      data-dismiss="modal"
                      aria-label="Close"
                      v-on:click="doSave">
                  <i class="icon-lineIcon-check mr-5"></i><span>확인</span>
              </button>
          </div>
      </template>
  </base-modal>
</template>
<script>
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import grid from '@/mixin/payroll-grid';

export default {
    name: 'acquisition-job-person-input-modal',
    mixins: [modal, grid],
    components: {
        BaseModal,
        BorderBox,
        BorderBoxItem,
        UiMonthPicker
    },    
    data() {
        let month = this.parent ? this.parent.getCurrentMonth() : this.getCurrentMonth();
        return {
            formData: {
                DATE_FROM: {
                    value: month
                },
                DATE_TO: {
                    value: month
                },
                SI_REGIST_MATTER_NO: {
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
            ],
            columns: [
                {fieldName: 'EMP_NAME', header: '이름', width: 100},
                {fieldName: 'HRDEPT_NAMK', header: '부서', width: 140},
                {fieldName: 'RANK_NAME', header: '직급', width: 120},
                {fieldName: 'ROLE_NAME', header: '직책', width: 100},
                {fieldName: 'EMPTYPE_NAM', header: '고용형태', width: 100},
            ]
        }
    },
    methods: {
        //modal
        createDynamicComponent() {
            this.createRealGrid({
                'domId': 'acquisition-job-person-input-modal-grid',
                'autoLoad': false,
                'checkbar': 'multi'
            });
        },
        asyncDynamicComponentData(param) {
            this.resetFromData();

            this.setFormData(param);

            this.loadGridData();
        },

        setFormData: function(data) {
            const me = this;
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                me.formData[key].value = data[key] || me.$options.data().formData[key].value;
            });
        },

        resetFromData: function() {
            Object.assign(this.formData, this.$options.data().formData);
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
            try {
                let param = this.getFormData();
                if(this.payrollUtil.isEmpty(param.DATE_FROM) || this.payrollUtil.isEmpty(param.DATE_TO)) {
                    this.toast({message: '입사일을 입력해주세요.', type:"error"});
                    return;
                }

                this.dataProvider.clearRows();

                const {data} = await this.$httpGet('/payroll/insurance/regist/common-inf/not-in-list', param);
                this.setRealgridData(data || []);
            } catch(e) {
                console.error(e)
            }
        },

        doSave: function() {
            let checkedRows = this.getCheckedValues();
            if(checkedRows.length < 1) {
                this.toastAlertSelect()
                return;
            }

            let list = [];
            checkedRows.forEach((data) => {
                let keys = Object.keys(data);
                let l = [];
                keys.forEach((key) => {
                    l.push(data[key]);
                });
                list.push(l);
            });

            this.$emit('addPersonList', list);
        }
    },
}
</script>