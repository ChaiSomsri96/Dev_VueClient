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
        <div id="sev-pay-calc-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
        { fieldName: 'EID', visible: false},
        { fieldName: 'EMP_NUMBER', header: '사번', styleName: 'left-column', editable: false},
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column', editable: false}
      ]

      me.fields = [
        { fieldName: 'EID', dataType: 'text'},
        { fieldName: 'EMP_NUMBER', dataType: 'text'},
        { fieldName: 'EMP_NAME', dataType: 'text'}
      ]

      let pSevAveSalType = me.SET_DATA[0].SEV_AVE_SAL_TYPE;
      switch ( pSevAveSalType){
        case 'D':
          me.columns.push({ fieldName: 'DAY_AVG_DATA', header: '평균급여(일)', styleName: 'right-column', numberFormat: '#,##0', editable: false});
          me.fields.push({ fieldName: 'DAY_AVG_DATA', dataType: 'number'});
          break;
        case 'M':
          me.columns.push({ fieldName: 'MON_AVG_DATA', header: '평균급여(월)', styleName: 'right-column', numberFormat: '#,##0', editable: false});
          me.fields.push({ fieldName: 'MON_AVG_DATA', dataType: 'number'});
          break;
      }

      me.columns.push(
          { fieldName: 'APP_CAL_DAY_DATA', header: '적용된 연수', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0', visible: false},
          { fieldName: 'BF_RETIRE_PAY_AMT', header: '퇴직금계산액', styleName: 'right-column', numberFormat: '#,##0', editable: false},
          { fieldName: 'SET_RETIRE_CAL', header: '퇴직금 조정', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SET_RETIRE_DESC', header: '조정 사유', styleName: 'left-column'},
          { fieldName: 'RETIRE_PAY_AMT', header: '조정후 퇴직금', styleName: 'right-column', numberFormat: '#,##0', editable: false}
      );
      me.fields.push(
          { fieldName: 'APP_CAL_DAY_DATA', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', dataType: 'number'},
          { fieldName: 'BF_RETIRE_PAY_AMT', dataType: 'number'},
          { fieldName: 'SET_RETIRE_CAL', dataType: 'number'},
          { fieldName: 'SET_RETIRE_DESC', dataType: 'text'},
          { fieldName: 'RETIRE_PAY_AMT', dataType: 'number'},
      );
    },

    realgridCreatedCallback: function() {
      let me = this;
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
        if (dataRow > -1) {
          if (field == me.dataProvider.getFieldIndex("SET_RETIRE_CAL")) {
            let setRetireCalcAmt = grid.getValue(itemIndex, "SET_RETIRE_CAL");
            let bfRetirePayAmt = grid.getValue(itemIndex, "BF_RETIRE_PAY_AMT");
            grid.setValue(itemIndex, 'RETIRE_PAY_AMT', setRetireCalcAmt + bfRetirePayAmt);
            console.log(me.dataProvider.getJsonRows(0, -1));
            let calList = me.dataProvider.getJsonRows(0, -1);


            me.$store.dispatch('sevpayentry/resetCalData');
            me.$store.dispatch('sevpayentry/setCalData', calList);
          }

          if (field == me.dataProvider.getFieldIndex("SET_RETIRE_DESC")) {
            // let setRetireDesc = grid.getValue(itemIndex, "SET_RETIRE_DESC");
            // let bfRetirePayAmt = grid.getValue(itemIndex, "BF_RETIRE_PAY_AMT");
            // grid.setValue(itemIndex, 'RETIRE_PAY_AMT', setRetireCalcAmt + bfRetirePayAmt);
            // console.log(me.dataProvider.getJsonRows(0, -1));
            let calList = me.dataProvider.getJsonRows(0, -1);


            me.$store.dispatch('sevpayentry/resetCalData');
            me.$store.dispatch('sevpayentry/setCalData', calList);
          }
        }
      }
    }
  },

  mounted() {
    let me = this;
    if( me.CAL_DATA) {
      me.createGridFrame({
        domId: 'sev-pay-calc-grid',
        editable: true
      });
      me.loadGridData();
    }
  }
}
</script>
