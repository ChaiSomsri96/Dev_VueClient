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
                퇴직금 조회
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <!--      <div class="row mb-20" style="height: 400px;">-->
      <sev-pay-query-search-tab></sev-pay-query-search-tab>
      <div class="row col-12">
        <div id="sev-pay-calc-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
      </div>
      <button-panel
          class="col-12"
          btnType='bottom'
          v-bind:remove=true
          v-on:remove="deleteCode"
          v-bind:save=true
          v-on:save="saveMatter()"
      />
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import ButtonPanel from '@/components/common/ButtonPanel';
import { mapGetters } from 'vuex';
import SevPayQuerySearchTab from "./SevPayQuerySearchTab";

export default {
  components:{
    ButtonPanel,
    SevPayQuerySearchTab
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      CAL_DATA: 'sevpayentry/getCalData'
    })
  },
  data() {
    return {
      fields: [],
      columns:[]
    }
  },

  methods: {
    gotoList() {
      let me = this;
      me.$router.push({name: 'SevPayQuery'});
    },

    saveMatter: function(){

    },

    deleteCode: function(){

    },

    loadGridData() {
      let me =this;
      let settingData = me.SET_DATA;
      let data = me.CAL_DATA;
      if( settingData[0].SEV_IN_PAYCODE === 'S'){
        me.fields = [];
        me.columns = [];
        me.setColumns()
      }else{
        me.fields = [];
        me.columns = [];
        me.setColumns()
      }
      me.setFieldsNColumns();
      me.setRealgridData(data || []);
    },

    setColumns(){
      // eid, 사번, 성명, 원천, 기간, 코드, 급여명, 연합쳬(상여금)
      let me = this;
      me.columns= [
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'}
      ]

      me.fields = [
        { fieldName: 'EMP_NAME', dataType: 'text'}

      ]

      let pSevAveSalType = me.SET_DATA[0].SEV_AVE_SAL_TYPE;
      switch ( pSevAveSalType){
        case 'D':
          me.columns.push({ fieldName: 'DAY_AVG_DATA', header: '평균급여(일)', styleName: 'right-column', numberFormat: '#,##0'});
          me.fields.push({ fieldName: 'DAY_AVG_DATA', dataType: 'number'});
          break;
        case 'M':
          me.columns.push({ fieldName: 'MON_AVG_DATA', header: '평균급여(월)', styleName: 'right-column', numberFormat: '#,##0'});
          me.fields.push({ fieldName: 'MON_AVG_DATA', dataType: 'number'});
          break;
      }

      me.columns.push(
          { fieldName: 'APP_CAL_DAY_DATA', header: '적용된 연수', styleName: 'right-column', numberFormat: '#,##0.########'},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0', visible: false},
          { fieldName: 'BF_RETIRE_PAY_AMT', header: '퇴직금계산액', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SET_RETIRE_CAL', header: '퇴직금 조정', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SET_RETIRE_DESC', header: '조정 사유', styleName: 'left-column'},
          { fieldName: 'RETIRE_PAY_AMT', header: '조정후 퇴직금', styleName: 'right-column', numberFormat: '#,##0'}
      );
      me.fields.push(
          { fieldName: 'APP_CAL_DAY_DATA', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', dataType: 'number'},
          { fieldName: 'BF_RETIRE_PAY_AMT', dataType: 'number'},
          { fieldName: 'SET_RETIRE_CAL', dataType: 'number'},
          { fieldName: 'SET_RETIRE_DESC', dataType: 'text'},
          { fieldName: 'RETIRE_PAY_AMT', dataType: 'number'},
      );
    }
  },

  mounted() {
    let me = this;
    if( me.CAL_DATA[0]) {
      me.createGridFrame({
        domId: 'sev-pay-calc-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
