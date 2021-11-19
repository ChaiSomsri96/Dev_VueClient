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
        <div id="sev-pay-ten-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
      let data = me.TEN_DATA;
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
        { fieldName: 'EID', header: '', visible: false},
        { fieldName: 'EMP_NUMBER', header: '사번', styleName: 'left-column'},
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column', editable: false},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd', editable: false},
        { fieldName: 'VALID_JOIN_DATE', header: '시작 지정일', datetimeFormat: 'yyyy.MM.dd', editable: false},
        { fieldName: 'RETIREBASE_DT', header: '중간 정산일', datetimeFormat: 'yyyy.MM.dd', editable: false},
        { fieldName: 'BASE_DATE', header: '배제일 감안 기산일', datetimeFormat: 'yyyy.MM.dd', editable: false},
        { fieldName: 'RETIRE_DATE', header: '퇴사일', datetimeFormat: 'yyyy.MM.dd', editable: false},
        { fieldName: 'EXCLUDE_WORKDAY', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0', editable: false},
        { fieldName: 'AF_WORK_DAY', header: '인정 근속일수', styleName: 'right-column', numberFormat: '#,##0', editable: false}
      ]

      me.fields = [
        { fieldName: 'EID', dataType: 'text'},
        { fieldName: 'EMP_NUMBER', dataType: 'text'},
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'VALID_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'BASE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIRE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'EXCLUDE_WORKDAY', dataType: 'number'},
        { fieldName: 'AF_WORK_DAY', dataType: 'number'}

      ]

      let pSvcPerMethod = me.SET_DATA[0].SVC_PER_METHOD;
      let pSevProgType = me.SET_DATA[0].SEV_PROG_TYPE;
      let pWorkText = '';
      let pWorkYmd = 1; //Y=1, M=12, D=365

      switch ( pSvcPerMethod){
        case 'Y':
          pWorkText= '연수';
          me.columns.push(
              { fieldName: 'BASE_YMD_WORK', header: '근속 연월일', styleName: 'left-column', editable: false},
              { fieldName: 'BF_CAL_DAY_VIEW', header: '근속연수', styleName: 'right-column', numberFormat: '#,##0', editable: false},
              { fieldName: 'BF_CAL_DAY_HIDDEN', header: '근속연수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
          );
          me.fields.push(
              { fieldName: 'BASE_YMD_WORK', dataType: 'text'},
              { fieldName: 'BF_CAL_DAY_VIEW', dataType: 'number'},
              { fieldName: 'BF_CAL_DAY_HIDDEN', dataType: 'number'}
          );
          break;
        case 'M':
          pWorkText= '월수';
          pWorkYmd= 12;
          me.columns.push(
              { fieldName: 'BASE_YMD_WORK', header: '근속 연월일', styleName: 'left-column', editable: false},
              { fieldName: 'BF_CAL_DAY_VIEW', header: '근속월수', styleName: 'right-column', numberFormat: '#,##0', editable: false},
              { fieldName: 'BF_CAL_DAY_HIDDEN', header: '근속월수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
          );
          me.fields.push(
              { fieldName: 'BASE_YMD_WORK', dataType: 'text'},
              { fieldName: 'BF_CAL_DAY_VIEW', dataType: 'number'},
              { fieldName: 'BF_CAL_DAY_HIDDEN', dataType: 'number'}
          );
          break;
        case 'D':
          pWorkText= '일수';
          pWorkYmd= 365;
          me.columns.push( { fieldName: 'BF_CAL_DAY_HIDDEN', header: '근속일수', styleName: 'right-column', numberFormat: '#,##0', visible: false});
          me.fields.push(  { fieldName: 'BF_CAL_DAY_HIDDEN', dataType: 'number'});
          break;
      }

      switch ( pSevProgType) {
        case 'F':
          me.columns.push(
              { fieldName: 'EQU_DAY', header: '수식', styleName: 'left-column', editable: false},
          );
          me.fields.push(
              { fieldName: 'EQU_DAY', dataType: 'text'},
          );
          break;
        case 'V':
          me.columns.push(
              { fieldName: 'ADD_DAY', header: '추가'+pWorkText, styleName: 'right-column', numberFormat: '#,##0'},
          );
          me.fields.push(
              { fieldName: 'ADD_DAY', dataType: 'number'},
          );
          break;
        case 'R':
          me.columns.push(
              { fieldName: 'PER_DAY', header: '누진율', styleName: 'right-column', numberFormat: '#,##0'},
          );
          me.fields.push(
              { fieldName: 'PER_DAY', dataType: 'number'},
          );
          break;
      }
      me.columns.push(
          { fieldName: 'AF_CAL_DAY_VIEW', header: '인정'+pWorkText, styleName: 'right-column', numberFormat: '#,##0', editable: false},
          { fieldName: 'APP_CAL_DAY_VIEW', header: '적용된 연수', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'APP_CAL_DAY_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0', visible: false},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0', visible: false}
      );
      me.fields.push(
          { fieldName: 'AF_CAL_DAY_VIEW', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_VIEW', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_HIDDEN', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_DATA_HIDDEN', dataType: 'number'}
      );
    },

    realgridCreatedCallback: function() {
      let me = this;
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
        if (dataRow > -1) {
          if (field == me.dataProvider.getFieldIndex("ADD_DAY")) {
            let addDay = grid.getValue(itemIndex, "ADD_DAY");
            let bfCalDayHidden = grid.getValue( itemIndex, 'BF_CAL_DAY_HIDDEN');
            let appData = addDay ? bfCalDayHidden + addDay : bfCalDayHidden;
            let pSvcPerMethod = me.SET_DATA[0].SVC_PER_METHOD;
            let pWorkYmd = 1; //Y=1, M=12, D=365
            switch ( pSvcPerMethod){
              case 'M': pWorkYmd = 12;
              break;
              case 'D': pWorkYmd = 365;
              break;
            }
            let appYearData = appData/pWorkYmd;

            grid.setValue( itemIndex, 'AF_CAL_DAY_VIEW', appData.toFixed( 8));
            grid.setValue( itemIndex, 'APP_CAL_DAY_VIEW', appYearData.toFixed( 8));
            grid.setValue( itemIndex, 'APP_CAL_DAY_DATA_HIDDEN', appYearData.toFixed( 11));

            let gridData = me.dataProvider.getJsonRows(0, -1);
            let pList = [];
            let tenDataList = [];
            for( let i=0; i< gridData.length; i++) {
              pList.push(
                  {
                    EMP_NUMBER: gridData[i].EMP_NUMBER,
                    APP_CAL_DAY_DATA: gridData[i].APP_CAL_DAY_VIEW.toFixed( 8),
                    APP_CAL_DAY_DATA_HIDDEN: gridData[i].APP_CAL_DAY_VIEW.toFixed( 11)
                  }
              );
              tenDataList.push( gridData[i]);
            }

            for( let i=0; i< pList.length; i++){
              for( let j=0; j< me.CAL_DATA.length; j++) {
                if( pList[i].EMP_NUMBER === me.CAL_DATA[j].EMP_NUMBER){
                  me.CAL_DATA[j].APP_CAL_DAY_DATA = pList[i].APP_CAL_DAY_DATA;
                  me.CAL_DATA[j].APP_CAL_DAY_DATA_HIDDEN = pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  let pRtamt = 0;
                  if( me.SET_DATA[0]['SEV_AVE_SAL_TYPE'] === 'D') {
                    pRtamt = me.CAL_DATA[j].DAY_AVG_DATA * 30 * pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  }else {
                    pRtamt = me.CAL_DATA[j].DAY_AVG_DATA * 30 * pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  }
                  me.CAL_DATA[j].BF_RETIRE_PAY_AMT = parseInt( pRtamt);
                  me.CAL_DATA[j].RETIRE_PAY_AMT = parseInt( pRtamt);
                }
              }
            }
            me.$store.dispatch('sevpayentry/resetTenData');
            me.$store.dispatch('sevpayentry/setTenData', tenDataList);
          }

          if (field == me.dataProvider.getFieldIndex("PER_DAY")) {
            let addDay = grid.getValue(itemIndex, "PER_DAY");
            let bfCalDayHidden = grid.getValue( itemIndex, 'BF_CAL_DAY_HIDDEN');
            let appData = addDay ? bfCalDayHidden * addDay : bfCalDayHidden;
            let pSvcPerMethod = me.SET_DATA[0].SVC_PER_METHOD;
            let pWorkYmd = 1; //Y=1, M=12, D=365
            switch ( pSvcPerMethod){
              case 'M': pWorkYmd = 12;
                break;
              case 'D': pWorkYmd = 365;
                break;
            }
            let appYearData = appData/pWorkYmd;

            grid.setValue( itemIndex, 'AF_CAL_DAY_VIEW', appData.toFixed( 4));
            grid.setValue( itemIndex, 'APP_CAL_DAY_VIEW', appYearData.toFixed( 4));
            grid.setValue( itemIndex, 'APP_CAL_DAY_DATA_HIDDEN', appYearData.toFixed( 11));

            let gridData = me.dataProvider.getJsonRows(0, -1);
            let pList = [];
            let tenDataList = [];
            for( let i=0; i< gridData.length; i++) {
              pList.push(
                  {
                    EMP_NUMBER: gridData[i].EMP_NUMBER,
                    APP_CAL_DAY_DATA: gridData[i].APP_CAL_DAY_VIEW.toFixed( 8),
                    APP_CAL_DAY_DATA_HIDDEN: gridData[i].APP_CAL_DAY_VIEW.toFixed( 11)
                  }
              );
              tenDataList.push( gridData[i]);
            }

            for( let i=0; i< pList.length; i++){
              for( let j=0; j< me.CAL_DATA.length; j++) {
                if( pList[i].EMP_NUMBER === me.CAL_DATA[j].EMP_NUMBER){
                  me.CAL_DATA[j].APP_CAL_DAY_DATA = pList[i].APP_CAL_DAY_DATA;
                  me.CAL_DATA[j].APP_CAL_DAY_DATA_HIDDEN = pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  let pRtamt = 0;
                  // let retirePayAmt = calData[j].SET_RETIRE_CAL ? calData[j].SET_RETIRE_CAL: 0;
                  if( me.SET_DATA[0]['SEV_AVE_SAL_TYPE'] === 'D') {
                    pRtamt = me.CAL_DATA[j].DAY_AVG_DATA * 30 * pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  }else {
                    pRtamt = me.CAL_DATA[j].DAY_AVG_DATA * 30 * pList[i].APP_CAL_DAY_DATA_HIDDEN;
                  }
                  me.CAL_DATA[j].BF_RETIRE_PAY_AMT = parseInt( pRtamt);
                  me.CAL_DATA[j].RETIRE_PAY_AMT = parseInt( pRtamt);
                }
              }
            }
            me.$store.dispatch('sevpayentry/resetTenData');
            me.$store.dispatch('sevpayentry/setTenData', tenDataList);
          }
        }

      }
    }
  },

  mounted() {
    let me = this;
    if( me.TEN_DATA) {
      me.createGridFrame({
        domId: 'sev-pay-ten-grid',
        editable: true
      });
      me.loadGridData();
    }
  }
}
</script>
