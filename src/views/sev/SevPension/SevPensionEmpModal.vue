<template>
  <base-modal title="퇴직연금 대상자 등록" id="sev-pension-emp-modal" :scroll="false" size="large" width="1200">
    <template v-slot:body>
        <border-box>
          <border-box-item title="퇴직연금계산 기준일">
            <ui-input-date :date="sevDate"
                            :value="sevDate"
                            @change="sevDate=$event;"
                           :options="{readOnly: true}"
            />
          </border-box-item>
          <border-box-item title="차수" width="150">
            <ui-input :value="sevPensionSeq"
                      @change="sevPensionSeq=$event;"
                      :options="{readOnly: true}"

            />
          </border-box-item>
        </border-box>
        <div class="row">
          <div class="col-5">
            <div class="form-group row">
                <label class="form-label type2 col-4">
                    <span>등록대상자</span>
                </label>
            </div>
            <register-emp-grid id="not-emp-grid" ref="NotRegisterEmpRealGrid" />
          </div>
          <div class="col-2" style="width: 100%; height: 300px; transform:translateY(50%);">
            <div class="form-wrap">
                    <div class="btn-wrap" align="center" >
                        <button class="btn btn-md flat middle" @click="addSelect">
                        <i class="icon icon-lineIcon-line-arrow-right mr-5"></i>추가
                        </button>
                    </div>
                    <div class="btn-wrap" align="center" >
                        <button class="btn btn-md flat middle" @click="delSelect">
                        <i class="icon icon-lineIcon-line-arrow-left mr-5"></i>삭제
                        </button>
                    </div>
            </div>
          </div>
          <div class="col-5">
            <div class="form-group row">
                    <label class="form-label type2 col-4">
                    <span>등록된사람</span>
                    </label>
            </div>
            <register-emp-grid id="emp-grid" ref="RegisterEmpRealGrid" ></register-emp-grid>
          </div>
        </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" @click="close()">
          <i class="icon-lineIcon-close mr-5"></i>창닫기
        </button>
        <button class="btn btn-md black" @click="doSave()">
          <i class="icon-lineIcon-del mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import RegisterEmpGrid from './RegisterEmpGrid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  mixins: [modal],
  components: {
    BaseModal,
    RegisterEmpGrid,
    BorderBox,
    BorderBoxItem
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      sevDate: '',
      sevPensionSeq: '',
      sevControlNo: ''
    }
  },
  methods: {
    asyncDynamicComponentData(_param) {
      this.sevDate = _param.sevDate;
      this.sevPensionSeq = _param.sevPensionSeq;
      this.sevControlNo = _param.sevControlNo;
      _param.ENROLL = 'Y'
      this.$refs.RegisterEmpRealGrid.loadGridData( _param);
      _param.ENROLL = 'N'
      this.$refs.NotRegisterEmpRealGrid.loadGridData( _param);

      this.$refs.RegisterEmpRealGrid.visibleset();
    },
    createDynamicComponent() {
      this.$refs.RegisterEmpRealGrid.createRealGrid({'domId': 'emp-grid', 'gridParent': 'modal', 'checkbar': true});
      this.$refs.NotRegisterEmpRealGrid.createRealGrid({'domId': 'not-emp-grid', 'gridParent': 'modal', 'checkbar': true});
    },
    doSave() {
      let _data = this.$refs.RegisterEmpRealGrid.getData();
      let empList = [];
      for(let i = 0; i < _data.length; i ++) {
        empList.push({
          "EID": _data[i]['EID'],
          "SEV_DATE": this.sevDate,
          "SEV_PENSION_SEQ": this.sevPensionSeq
        });
      }
      let me = this;
      this.$httpPost({
        url: '/payroll/retirement/sev-pension/save-enroll',
        param: {
          "EMP_LIST": JSON.stringify(empList),
          "FORM_DATA": JSON.stringify({
            "SEV_DATE": this.sevDate,
            "SEV_PENSION_SEQ": this.sevPensionSeq
          })
        },
        callback: function() {
          me.toastSuccessSave();
          me.loadParentGrid();
          me.close();
        }
      });
    },

    loadParentGrid() {
      let me =this;
      me.$parent.loadGridData();
    },

    addSelect() { //등록대상자 
        let checkedRows = this.$refs.NotRegisterEmpRealGrid.getCheckedRows();
        this.$refs.RegisterEmpRealGrid.addRowData(checkedRows);
    },
    delSelect() { //등록된사람
        let checkedRows = this.$refs.RegisterEmpRealGrid.getCheckedRows();
        this.$refs.NotRegisterEmpRealGrid.addRowData(checkedRows);
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
#sev-pension-emp-modal {
  .form-group .form-label {
    font-weight: bold;
    color: #222;
  }
}
</style>
