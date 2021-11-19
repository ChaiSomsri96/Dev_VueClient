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
          <div id="sev-pay-avg-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
import SevPayEntryResultTab from "./SevPayEntryResultTab";
import { mapGetters } from 'vuex';

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
      // rowAttrs:[
      //     'GAGAMPAY', 'SUM_DATA', 'MON_AVG_DATA', 'DAY_AVG_DATA', 'SUM_DATA_HIDDEN', 'SET_AVG_DAY_DATA_HIDDEN', 'SET_AVG_MON_DATA_HIDDEN'
      // ]
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
      // let data = me.AVG_DATA;
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
      me.gridView.groupBy(['AVG_GROUP_DATA']);
      me.gridView.setRowGroup({
        // headerStatement: "${groupField}: ${groupValue} - ${rowCount} rows"
        headerStatement: "${groupValue}"
      });
      me.setRealgridData(me.AVG_DATA || []);
    },

    setColumns(){
      // eid, 사번, 성명, 원천, 기간, 코드, 급여명, 연합쳬(상여금)
      let me = this;
      me.fields=[
        { fieldName: 'AVG_GROUP_DATA', dataType: 'text', hidden: true},
        { fieldName: 'EMP_NUMBER', dataType: 'text'},
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'IN_WITH', dataType: 'text'},
        { fieldName: 'TERM_TYPE', dataType: 'number'},
        { fieldName: 'PAY_CODE', dataType: 'text'},
        { fieldName: 'PAY_NAME', dataType: 'text'},
        { fieldName: 'YEAR_SUM_DATA', dataType: 'number'},
      ]

      me.columns = [
        { fieldName: 'AVG_GROUP_DATA', header: '그룹', visible: false},
        { fieldName: 'EMP_NUMBER', header: '사번', styleName: "left-column", editable: false},
        { fieldName: 'EMP_NAME', header: '성명', styleName: "left-column", editable: false},
        { fieldName: 'IN_WITH', header: '원천', styleName: "left-column", editable: false},
        { fieldName: 'TERM_TYPE', header: '기간', numberFormat: "#,##0", styleName: "right-column", editable: false},
        { fieldName: 'PAY_CODE', header: '코드', styleName: "left-column", editable: false},
        { fieldName: 'PAY_NAME', header: '급여명', styleName: "left-column", editable: false},
        { fieldName: 'YEAR_SUM_DATA', header: '연합계(상여금)', numberFormat: "#,##0", styleName: "right-column", editable: false}
      ];
      let data = me.AVG_DATA[0];
      let payMonthColumnHeader= [ data['LAST_FOUR_MON_TERM'], data['LAST_THREE_MON_TERM'], data['LAST_TWO_MON_TERM'], data['LAST_MON_TERM']]//, data['LAST_TWO_MON_TERM'], data['LAST_THREE_MON_TERM'], data['LAST_FOUR_MON_TERM']];
      let payMonthData = [ 'LAST_MON_FOUR', 'LAST_MON_THREE', 'LAST_MON_TWO', 'LAST_MON']//, 'LAST_MON_TWO', 'LAST_MON_THREE', 'LAST_MON_FOUR'];
      let payMonthTitle = [ 'LAST_FOUR_MON_TERM', 'LAST_THREE_MON_TERM', 'LAST_TWO_MON_TERM', 'LAST_MON_TERM']//, 'LAST_TWO_MON_TERM', 'LAST_THREE_MON_TERM', 'LAST_FOUR_MON_TERM']
      for( let i=0; i< payMonthColumnHeader.length; i++){
        let fName = payMonthColumnHeader[i]
        if( fName){
          me.columns.push(
              { fieldName: payMonthData[i], editable: false, header: fName},
              { fieldName: payMonthTitle[i], editable: false, header: '기간', visible: false},
          );
          me.fields.push(
              { fieldName: payMonthData[i], dataType: 'number'},
              { fieldName: payMonthTitle[i], dataType: 'text'},
          );
        }else{
          me.columns.push(
              { fieldName: payMonthData[i], editable: false, header: fName, visible: false},
              { fieldName: payMonthTitle[i], editable: false, header: '기간', visible: false},
          );
          me.fields.push(
              { fieldName: payMonthData[i], dataType: 'number'},
              { fieldName: payMonthTitle[i], dataType: 'text'},
          );
        }
      }
      me.columns.push({ fieldName: 'GAGAMPAY', header: '가감액', numberFormat: "#,##0", styleName: "right-column", editable: true});
      me.fields.push( { fieldName: 'GAGAMPAY',dataType: 'number'});
      me.columns.push({
        fieldName: 'SUM_DATA', header: '합계('+data['DIFF_DAY']+')',
        numberFormat: "#,##0", styleName: "right-column", editable: false,
        footer: {
          text: "0",
          expression: "sum",
          numberFormat: "#,##0",
        }
      });
      me.fields.push( { fieldName: 'MON_AVG_DATA',dataType: 'number'});
      me.columns.push({
        fieldName: 'MON_AVG_DATA', header: '월평균',
        numberFormat: "#,##0", styleName: "right-column", editable: false,
        footer: {
          text: "0",
          expression: "sum",
          numberFormat: "#,##0",
        }
      });
      me.fields.push( { fieldName: 'SUM_DATA',dataType: 'number'});

      if( me.SET_DATA[0]['SEV_AVE_SAL_TYPE'] === 'D') {
        me.columns.push({ fieldName: 'CHECK_DAYS', header: '월력상 일수', numberFormat: "#,##0", styleName: "right-column", editable: false});
        me.fields.push({ fieldName: 'CHECK_DAYS',dataType: 'number'});
        me.columns.push({ fieldName: 'CLOSED_VACA_DAYS', header: '휴업등 일수', numberFormat: "#,##0", styleName: "right-column", editable: false});
        me.fields.push({ fieldName: 'CLOSED_VACA_DAYS',dataType: 'number'});
        me.columns.push({ fieldName: 'FINAL_DAYS', header: '최종3개월 일수', numberFormat: "#,##0", styleName: "right-column", editable: false});
        me.fields.push({ fieldName: 'FINAL_DAYS',dataType: 'number'});
        me.columns.push({
          fieldName: 'DAY_AVG_DATA', header: '일평균',
          numberFormat: "#,##0", styleName: "right-column", editable: false,
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }
        });
        me.fields.push({ fieldName: 'DAY_AVG_DATA',dataType: 'number'});
      }

      me.fields.push(
          { fieldName: 'SET_AVG_DAY_DATA_HIDDEN',dataType: 'number'},
          { fieldName: 'SET_AVG_MON_DATA_HIDDEN',dataType: 'number'},
          { fieldName: 'SUM_DATA_HIDDEN',dataType: 'number'},
          { fieldName: 'DIFF_DAY',dataType: 'number'}
      );
      me.columns.push(
          { fieldName: 'SET_AVG_DAY_DATA_HIDDEN', header: '', numberFormat: "#,##0", styleName: "right-column", visible: false},
          { fieldName: 'SET_AVG_MON_DATA_HIDDEN', header: '', numberFormat: "#,##0", styleName: "right-column", visible: false},
          { fieldName: 'SUM_DATA_HIDDEN', header: '', numberFormat: "#,##0", styleName: "right-column", visible: false},
          { fieldName: 'DIFF_DAY', header: '일수', numberFormat: "#,##0", styleName: "right-column", visible: false},
      );
    },

    realgridCreatedCallback: function() {
      let me = this;
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
        if (dataRow > -1) {
          if (field == me.dataProvider.getFieldIndex("GAGAMPAY")) {
            let gagamPay = grid.getValue(itemIndex, "GAGAMPAY");

            let avgDayData = grid.getValue(itemIndex, "SET_AVG_DAY_DATA_HIDDEN");
            let avgMonData = grid.getValue(itemIndex, "SET_AVG_MON_DATA_HIDDEN");

            let sum = parseInt( grid.getValue( itemIndex, "SUM_DATA_HIDDEN"));
            if( gagamPay){
              sum = sum + parseInt( gagamPay);
            }
            grid.setValue( itemIndex, 'GAGAMPAY', gagamPay);
            grid.setValue( itemIndex, 'SUM_DATA', sum);
            grid.setValue( itemIndex, 'MON_AVG_DATA', sum/avgMonData);
            grid.setValue( itemIndex, 'DAY_AVG_DATA', sum/avgDayData);
          }
        }
        // console.log( JSON.stringify( me.dataProvider.getJsonRows(0, -1)));
        console.log( me.dataProvider.getJsonRows(0, -1));
        let gridData = me.dataProvider.getJsonRows(0, -1);
        let avgData = [];
        let pList = [];
        let pEmpNumber = gridData[0].EMP_NUMBER;
        let pMonSum = 0;
        let pDaySum = 0;
        for( let i = 0; i< gridData.length;  i++){
          avgData.push( gridData[i]);

          if( pEmpNumber != gridData[i].EMP_NUMBER){
            let pData = {
              EMP_NUMBER: pEmpNumber,
              MON_AVG_DATA: pMonSum,
              DAY_AVG_DATA: pDaySum
            }
            pList.push( pData);
            pMonSum = 0;
            pDaySum = 0;
            pEmpNumber = gridData[i].EMP_NUMBER;
          }

          pMonSum += gridData[i].MON_AVG_DATA;
          pDaySum += gridData[i].DAY_AVG_DATA;

          if( gridData.length-1 === i) {
            let pData = {
              EMP_NUMBER: pEmpNumber,
              MON_AVG_DATA: pMonSum,
              DAY_AVG_DATA: pDaySum
            }
            pList.push( pData);
            pMonSum = 0;
            pDaySum = 0;
            pEmpNumber = gridData[i].EMP_NUMBER;
          }
        }
        let calData = me.CAL_DATA;
        for( let i= 0; i< pList.length; i++){
          for( let j=0; j< calData.length; j++) {
            if( pList[i].EMP_NUMBER === calData[j].EMP_NUMBER) {
              calData[j].MON_AVG_DATA = pList[i].MON_AVG_DATA;
              calData[j].DAY_AVG_DATA = pList[i].DAY_AVG_DATA;
              // let retirePayAmt = calData[j].SET_RETIRE_CAL ? calData[j].SET_RETIRE_CAL: 0;
              let pRtamt = 0;
              if( me.SET_DATA[0]['SEV_AVE_SAL_TYPE'] === 'D') {
                pRtamt = pList[i].DAY_AVG_DATA * 30 * calData[j].APP_CAL_DAY_DATA;
              }else{
                pRtamt = pList[i].DAY_AVG_DATA* calData[j].APP_CAL_DAY_DATA;
              }
              calData[j].BF_RETIRE_PAY_AMT = pRtamt;
              calData[j].RETIRE_PAY_AMT = pRtamt;
            }
          }
        }
        me.$store.dispatch('sevpayentry/resetAvgData');
        me.$store.dispatch('sevpayentry/setAvgData', avgData);
        me.$store.dispatch('sevpayentry/resetCalData');
        me.$store.dispatch('sevpayentry/setCalData', calData);
      }


    }
  },

  mounted() {
    let me = this;
    if( me.AVG_DATA){
      me.createGridFrame({
        domId: 'sev-pay-avg-grid',
        editable: true
      });
      me.loadGridData();
    }
  }
}
</script>
