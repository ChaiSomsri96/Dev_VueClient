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
                표준급여대장 표시 항목 선택
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-body">
      <div class="form-wrap">
          <labeled-input input-label="급여대장번호" labelClass="col-2" inputClass="col-3"
          :error-msg="errors.REPORT_SEQ">
            <ui-dropdown
                :items="formData.REPORT_SEQ.items" 
                :value="formData.REPORT_SEQ.value" 
                @change="formData.REPORT_SEQ.value=$event.value; formData.REPORT_SEQ.return=$event" 
                :options="{
                                valueField  : 'code',
                                labelField  : 'message',
                                tooltipField: 'message',
                                disabled: (!add)
                }"
            />
          </labeled-input>
          <labeled-input input-label="급여대장명칭" labelClass="col-2" inputClass="col-3"
          :error-msg="errors.REPORT_NAME">
              <ui-input :value="formData.REPORT_NAME"
                        @change="formData.REPORT_NAME=$event;"
                        :options="{
                                disabled: (!add)
                      }"/>
          </labeled-input>
      </div>
      <div class="row mb-20">
        <div class="col-5">
            <div class="form-group row">
                <label class="form-label type2 col-4">
                    <span>인사항목 선택 안됨</span>
                </label>
            </div>
            <cfg-person-item-grid id="cfg-person-item-grid1" ref="cfgPersonItemGrid1" />      
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
                    <span>선택된 인사항목</span>
                    </label>
            </div>
            <cfg-person-item-grid id="cfg-person-item-grid2" ref="cfgPersonItemGrid2" />
        </div>
      </div>

      <div class="row">
        <div class="col-5">
            <div class="form-group row">
                <label class="form-label type2 col-4">
                    <span>급여항목 선택 안됨</span>
                </label>
            </div>
            <cfg-pay-item-grid id="cfg-pay-item-grid1" ref="cfgPayItemGrid1" />
        </div>
        <div class="col-2" style="width: 100%; height: 300px; transform:translateY(50%);">
          <div class="form-wrap">
                    <div class="btn-wrap" align="center" >
                        <button class="btn btn-md flat middle" @click="addPaySelect">
                        <i class="icon icon-lineIcon-line-arrow-right mr-5"></i>추가
                        </button>
                    </div>
                    <div class="btn-wrap" align="center" >
                        <button class="btn btn-md flat middle" @click="delPaySelect">
                        <i class="icon icon-lineIcon-line-arrow-left mr-5"></i>삭제
                        </button>
                    </div>
          </div>
        </div>
        <div class="col-5">
            <div class="form-group row">
              <label class="form-label type2 col-4">
                <span>선택된 급여항목</span>
              </label>
            </div>
            <cfg-pay-item-grid id="cfg-pay-item-grid2" ref="cfgPayItemGrid2" />
        </div>
      </div>

      <div class="tbl-bottom">
        <button type="button" class="btn btn-lg white" @click="onCancel()"><i class="icon-lineIcon-close mr-5"></i>취소</button>
        <button type="button" class="btn btn-lg black ml-10" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
      </div>

    </div>
</div>
</template>

<script>
import CfgPersonItemGrid from '@/components/cfg/cfg_report/grids/CfgPersonItemGrid';
import CfgPayItemGrid from '@/components/cfg/cfg_report/grids/CfgPayItemGrid';
import LabeledInput from "@/components/common/LabeledInput";
import { mapGetters } from 'vuex';
export default {
    components: { CfgPersonItemGrid, CfgPayItemGrid, LabeledInput },
    computed: {
        ...mapGetters({
            cfgReportForm: 'cfgreport/getCfgReportForm'
        })
    },
    data() {
      return {
        add: false,
        errors: {},
        formData: {
          REPORT_SEQ: {
            value: '',
            return: null,
            items: [
              { code: '1', message: '1' }, { code: '2', message: '2' },{ code: '3', message: '3' }, { code: '4', message: '4' },
              { code: '5', message: '5' }, { code: '6', message: '6' },{ code: '7', message: '7' }, { code: '8', message: '8' },
              { code: '9', message: '9' }
            ]
          },
          REPORT_NAME: ''
        }
      }
    },
    methods: {
      gotoList() {
            this.$router.push({name: 'CfgReport'});
      },
      asyncData() {
         this.$refs.cfgPersonItemGrid1.loadGridData({url: '/payroll/code/payrolldesignpivotstyle/list-hrpool',
         req: {'REPORT_SEQ': this.formData.REPORT_SEQ.value, 'REPORT_NAME': this.formData.REPORT_NAME}});
         this.$refs.cfgPersonItemGrid2.loadGridData({url: '/payroll/code/payrolldesignpivotstyle/list-hrselected',
         req: {'REPORT_SEQ': this.formData.REPORT_SEQ.value, 'REPORT_NAME': this.formData.REPORT_NAME}});

         //급여항목
         this.$refs.cfgPayItemGrid1.loadGridData({type: 1, url: '/payroll/code/payrolldesignpivotstyle/list-paycdpool',
         req: this.cfgReportForm});
         this.$refs.cfgPayItemGrid2.loadGridData({type: 2, url: '/payroll/code/payrolldesignpivotstyle/list-paycdselected',
         req: this.cfgReportForm});
        
         this.$refs.cfgPersonItemGrid2.visibleset();
         this.$refs.cfgPayItemGrid2.visibleset();
      },
      addSelect() { //인사항목 선택 안됨 추가
        let checkedRows = this.$refs.cfgPersonItemGrid1.getCheckedRows();
        this.$refs.cfgPersonItemGrid2.addRowData(checkedRows);
      },
      delSelect() { //선택된 인사항목 삭제
        let checkedRows = this.$refs.cfgPersonItemGrid2.getCheckedRows();
        this.$refs.cfgPersonItemGrid1.addRowData(checkedRows);
      },

      addPaySelect() { //급여항목 선택 안됨 추가
        let checkedRows = this.$refs.cfgPayItemGrid1.getCheckedRows();
        this.$refs.cfgPayItemGrid2.addRowData(checkedRows);
      },
      delPaySelect() { //선택된 급여항목 삭제
        let checkedRows = this.$refs.cfgPayItemGrid2.getCheckedRows();
        this.$refs.cfgPayItemGrid1.addRowData(checkedRows);
      },
      validationProcess() {
        let hasError = false;
        this.errors = {};
        if(this.payrollUtil.isEmpty(this.formData.REPORT_SEQ.value)) {
          hasError = true;
          this.errors.REPORT_SEQ = '급여대장번호를 선택해 주세요.';
        }
        if(this.payrollUtil.isEmpty(this.formData.REPORT_NAME)) {
          hasError = true;
          this.errors.REPORT_NAME = '급여대장명칭을 입력해 주세요.';
        }
        if(hasError){
          return false;
        }
        return true;
      },
      onSave() { //저장
        if(!this.validationProcess())
          return;
        // getData
        let personItemData = this.$refs.cfgPersonItemGrid2.getData();
        let payItemData = this.$refs.cfgPayItemGrid2.getData();
        let gridData = [];
        for(let i = 0; i < payItemData.length; i ++) {
          gridData.push({
            "FIELD_DESC": payItemData[i]['FIELD_DESC'], "FIELD_NAME": payItemData[i]['FIELD_NAME'], 
            "LOCATION_TYPE":"S", "ROWCNT":(i + 1),
            "REPORT_SEQ": this.formData.REPORT_SEQ.value, "SUB_TOTAL":"N"
          });
        }
        for(let i = 0; i < personItemData.length; i ++) {
          gridData.push({
            "FIELD_DESC": personItemData[i]['FIELD_DESC'], "FIELD_NAME": personItemData[i]['FIELD_NAME'],
            "FIELD_SEQ": personItemData[i]['FIELD_SEQ'], "LOCATION_TYPE": "P", "ROWCNT": (i + 1),
            "REPORT_SEQ": this.formData.REPORT_SEQ.value, "SUB_TOTAL":"N"
          });
        }

        let me = this;

        this.$httpPost({
          url: '/payroll/code/payrolldesignpivotstyle/save',
          param: {
            'gridListData': JSON.stringify(gridData),
            'formData': JSON.stringify({
              'REPORT_SEQ:': this.formData.REPORT_SEQ.value,
              'REPORT_NAME': this.formData.REPORT_NAME
            })
          },
          callback: function() {
            me.toastSuccessSave();
            me.$router.push({name: 'CfgReport'});    
          }
        });
      },
      onCancel() {
        this.$router.push({name: 'CfgReport'});
      }
    },
    mounted() {
      if( this.cfgReportForm ) {
        this.add = false;
        this.formData.REPORT_SEQ.value = this.cfgReportForm.REPORT_SEQ;
        this.formData.REPORT_NAME = this.cfgReportForm.REPORT_NAME;
      }
      else {
        this.add = true;
      }

      this.$refs.cfgPersonItemGrid1.createRealGrid({'domId': 'cfg-person-item-grid1'});
      this.$refs.cfgPersonItemGrid2.createRealGrid({'domId': 'cfg-person-item-grid2'});
      
      //급여항목
      this.$refs.cfgPayItemGrid1.createRealGrid({'domId': 'cfg-pay-item-grid1'});
      this.$refs.cfgPayItemGrid2.createRealGrid({'domId': 'cfg-pay-item-grid2'});

      this.asyncData();
    },
}
</script>

<style lang="scss" scoped>
.content-body .form-group .form-label {
  font-weight: bold;
  color: #222;
}
</style>

