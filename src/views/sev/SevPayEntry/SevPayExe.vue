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
                퇴직금 계산
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <!--      <div class="row mb-20" style="height: 400px;">-->
      <sev-pay-entry-result-tab></sev-pay-entry-result-tab>
      <div class="row col-12">
        <div id="sev-pay-exe-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
      </div>
      <button-panel
          class="col-12"
          btnType='bottom'
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
import SevPayEntryResultTab from "./SevPayEntryResultTab";

export default {
  components:{
    ButtonPanel,
    SevPayEntryResultTab
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      AVG_DATA: 'sevpayentry/getAvgData',
      CAL_DATA: 'sevpayentry/getCalData',
      TEN_DATA: 'sevpayentry/getTenData',
      EXE_DATA: 'sevpayentry/getExeData',
      PER_DATA: 'sevpayentry/getPerData',
      BOUNUS_DATA: 'sevpayentry/getBonusData'
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
      me.$router.push({name: 'SevPayCreate'});
    },

    saveMatter: function(){
      let me = this;
      let set= me.SET_DATA[0];
      let avg= me.dataCheck( me.AVG_DATA);
      let ten= me.dataCheck( me.TEN_DATA);
      let cal= me.dataCheck( me.CAL_DATA);
      let exe= me.dataCheck( me.EXE_DATA);
      let per= me.dataCheck( me.PER_DATA);
      let bonus= me.dataCheck( me.BOUNUS_DATA);
      this.$httpPost({
        param:{
          bas: JSON.stringify( set),
          avg: JSON.stringify( avg),
          ten: JSON.stringify( ten),
          cal: JSON.stringify( cal),
          exe: JSON.stringify( exe),
          per: JSON.stringify( per),
          bonus: JSON.stringify(  bonus)
        },
        url: '/payroll/multiretirement/multi-retire/save_pop',
        callback: function(){
          me.toastSuccessSave();
        }
      });
    },

    dataCheck( list) {
      if( ! list){
        return [];
      }
      return list;
    },

    deleteCode: function(){

    },

    loadGridData() {
      let me =this;
      let settingData = me.SET_DATA;
      let data = me.EXE_DATA;
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
      if( me.EXE_DATA[0].RETIRE_DATE < 20200101) {
        me.columns.push({ fieldName: 'EMP_NAME', header: '성명', styleName: "left-column"});
        me.fields.push({ fieldName: 'EMP_NAME',dataType: 'text'});
        me.columns.push({ fieldName: 'RETIRE_PAY_AMT', header: '퇴직금 계산액', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'RETIRE_PAY_AMT',dataType: 'number'});
        me.columns.push({ fieldName: 'PAY_AMOUNT', header: '최근 3년간 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'PAY_AMOUNT',dataType: 'number'});
        me.columns.push({ fieldName: 'THREE_YEAR_PAY_MONTH', header: '최근 3년간 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'THREE_YEAR_PAY_MONTH',dataType: 'number'});
        me.columns.push({ fieldName: 'YEAR_AVG_PAY', header: '최근 3년간 연평균 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'YEAR_AVG_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'BASE_YMD_WORK', header: '근속 년월일', styleName: "left-column"});
        me.fields.push({ fieldName: 'BASE_YMD_WORK',dataType: 'text'});
        me.columns.push({ fieldName: 'WORK_MONTH', header: '인정 근속월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'WORK_MONTH',dataType: 'number'});
        me.columns.push({ fieldName: 'BF_YMD_WORK', header: '2011말까지 근속 연월일', styleName: "left-column"});
        me.fields.push({ fieldName: 'BF_YMD_WORK',dataType: 'text'});
        me.columns.push({ fieldName: 'BF_MONTH_WORK', header: '2011말까지 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_MONTH_WORK',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_MONTH_WORK', header: '2012이후 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_MONTH_WORK',dataType: 'number'});
        me.columns.push({ fieldName: 'BF_RETIRE_PAY', header: '2011년까지 퇴직금', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_RETIRE_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_RETIRE_PAY', header: '2012년 이후 퇴직금', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_RETIRE_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'TAX_LIMIT_1', header: '소득세법상 임원퇴직금 한도', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'TAX_LIMIT_1',dataType: 'number'});
        me.columns.push({ fieldName: 'LIMIT_EXEC_1', header: '한도 초과액', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'LIMIT_EXEC_1',dataType: 'number'});
        me.columns.push({ fieldName: 'ONE_PAY_YEAR', header: '최근 1년간 연급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'ONE_PAY_YEAR',dataType: 'number'});
        me.columns.push({ fieldName: 'TAX_LIMIT_2', header: '법인세법상 손금산입한도', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'TAX_LIMIT_2',dataType: 'number'});
        me.columns.push({ fieldName: 'LIMIT_EXEC_2', header: '한도 초과액2', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'LIMIT_EXEC_2',dataType: 'number'});
      }else{
        me.columns.push({ fieldName: 'EMP_NAME', header: '성명', styleName: "left-column"});
        me.fields.push({ fieldName: 'EMP_NAME',dataType: 'text'});
        me.columns.push({ fieldName: 'RETIRE_PAY_AMT', header: '퇴직금 계산액', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'RETIRE_PAY_AMT',dataType: 'number'});
        me.columns.push({ fieldName: 'BF_2020_PAY_SUM', header: '19년 이전 3년간 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_2020_PAY_SUM',dataType: 'number'});
        me.columns.push({ fieldName: 'BF_2020_PAY_MONTH', header: '19년 이전 3년간 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_2020_PAY_MONTH',dataType: 'number'});
        me.columns.push({ fieldName: 'BF_2020_AVG_PAY', header: '19년 이전 연평균 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_2020_AVG_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_2020_PAY_SUM', header: '20년 이후 3년간 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_2020_PAY_SUM',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_2020_PAY_MONTH', header: '20년 이후 3년간 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_2020_PAY_MONTH',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_2020_AVG_PAY', header: '20년 이후 연평균 급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_2020_AVG_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'BASE_YMD_WORK', header: '근속 년월일', styleName: "left-column"});
        me.fields.push({ fieldName: 'BASE_YMD_WORK',dataType: 'text'});
        me.columns.push({ fieldName: 'WORK_MONTH', header: '인정근속 월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'WORK_MONTH',dataType: 'number'});

        me.columns.push({ fieldName: 'BF_YMD_WORK', header: '2011말까지 근속 연월일', styleName: "left-column"});
        me.fields.push({ fieldName: 'BF_YMD_WORK',dataType: 'text'});
        me.columns.push({ fieldName: 'BF_MONTH_WORK', header: '2011말까지 근속월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_MONTH_WORK',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_MONTH_WORK3', header: '12~19년 근속월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_MONTH_WORK3',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_MONTH_WORK4', header: '20년 이후 근속월수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_MONTH_WORK4',dataType: 'number'});

        me.columns.push({ fieldName: 'BF_RETIRE_PAY', header: '2011년까지 퇴직금', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'BF_RETIRE_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'AF_RETIRE_PAY', header: '2012년이후 퇴직금', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'AF_RETIRE_PAY',dataType: 'number'});
        me.columns.push({ fieldName: 'TAX_LIMIT_3', header: '소득세법상 임원퇴직금 한도', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'TAX_LIMIT_3',dataType: 'number'});
        me.columns.push({ fieldName: 'LIMIT_EXEC_3', header: '한도 초과액', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'LIMIT_EXEC_3',dataType: 'number'});
        me.columns.push({ fieldName: 'ONE_PAY_YEAR', header: '최근 1년간 연급여', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'ONE_PAY_YEAR',dataType: 'number'});
        me.columns.push({ fieldName: 'TAX_LIMIT_2', header: '법인세법상 손금산입한도', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'TAX_LIMIT_2',dataType: 'number'});
        me.columns.push({ fieldName: 'LIMIT_EXEC_2', header: '한도 초과액2', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'LIMIT_EXEC_2',dataType: 'number'});
      }
    }
  },

  mounted() {
    let me = this;
    if( me.EXE_DATA) {
      me.createGridFrame({
        domId: 'sev-pay-exe-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
