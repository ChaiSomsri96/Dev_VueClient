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
                {{ name }} 은행이체파일 항목 선택
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="form-wrap"  >
        <div class="col-5">
          <div class="form-group row">
            <label class="form-label type2 col-4">
              <span>급여항목 선택 안됨</span>
            </label>
          </div>
            <cfg-bank-grid id="cfg-bank-grid1" ref="cfgbankgrid1"></cfg-bank-grid>
        </div>
        <div class="col-2" style="width: 100%; height: 400px; transform:translateY(50%);">
          <div class="form-wrap" >
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
              <span>선택된 급여항목</span>
            </label>
          </div>
            <cfg-bank-grid id="cfg-bank-grid2" ref="cfgbankgrid2"></cfg-bank-grid>
        </div>
      </div>
      <div class="row"/>
      <div class="form-wrap">
        <div class="btn-wrap" align="center">
          <button class="btn btn-md flat" @click="gotoList">
            <i class="icon-lineIcon-close mr-5"></i>취소
          </button>
          <button class="btn btn-md black" @click="onSave" >
            <i class="icon-lineIcon-check mr-5"></i>저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import grid from '@/mixin/payroll-grid';
import CfgBankGrid from "@/components/cfg/cfgbank/grids/CfgBankGrid";
export default {
  components: {CfgBankGrid},
  mixins: [grid],
  computed: {
    ...mapGetters({
      declarationForm: 'withholding/getDeclarationForm'
    })
  },
  data() {
    return {
      name: '',
    }
  },
  methods: {
    async asyncData() {
      this.$refs.cfgbankgrid1.createRealGrid({'domId': 'cfg-bank-grid1'});
      this.$refs.cfgbankgrid2.createRealGrid({'domId': 'cfg-bank-grid2'});
      let val1 = {"url": '/payroll/code/bank-trfile/not-in-list', "CONTROL_NO": this.declarationForm[0].CONTROL_NO, "VISIBLE":'false'}
      let val2 = {"url": '/payroll/code/bank-trfile/in-list', "CONTROL_NO": this.declarationForm[0].CONTROL_NO,"VISIBLE":'true'}
      await this.$refs.cfgbankgrid1.loadGridData(val1);
      await this.$refs.cfgbankgrid2.loadGridData(val2);
      this.$refs.cfgbankgrid2.visibleset(); 
    },
    async applyComponent() {

    },
    gotoList() {
      let me = this;
      me.$router.push({name: 'CfgBankTransfer'});
    },
    async onSave() {
      let checkedPaycodes =[];
      checkedPaycodes = this.$refs.cfgbankgrid2.getData();
      let checkedPaycodes1 =[];
      checkedPaycodes1 = this.$refs.cfgbankgrid1.getData();
      for(let i = 0 ; i < checkedPaycodes1.length; i++){
        let key1 =  checkedPaycodes1[i]['SELECTED_ITEM']
        for(let j = 0 ; j < checkedPaycodes.length; j++){
          let key2 =  checkedPaycodes[j]['SELECTED_ITEM']
          if(key1==key2){
            checkedPaycodes.splice(j,1)
          }
        }
      }
      const me = this;
      let params = {
        'CONTROL_NO' : this.declarationForm[0].CONTROL_NO,
        'data': checkedPaycodes
      }
      await this.$httpPostBody({
        url: '/payroll/code/bank-trfile/item-save',
        param: params,
        callback: function() {
          me.toastSuccessSave();
        }
      });
    },
    addSelect(){
      let checkedRows = this.$refs.cfgbankgrid1.getCheckedRows();
      this.$refs.cfgbankgrid2.addRowData(checkedRows);
    },
    delSelect(){
      let checkedRows = this.$refs.cfgbankgrid2.getCheckedRows();
      this.$refs.cfgbankgrid1.addRowData(checkedRows);
    }
  },
  async mounted() {
    try {
      await this.asyncData();
      if(!this.declarationForm)
        return;
      this.name = this.declarationForm[0].CONTROL_TITLE
      this.applyComponent();
    }
    catch(err) {
      console.log("CfgEmployeeMasterEntryInput mounted err: ", err);
    }
  },
  name: "CfgBankTransferInput"
}
</script>

<style scoped>
.middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>