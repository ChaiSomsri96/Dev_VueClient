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
                퇴직연금 조회
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <!--      <div class="row mb-20" style="height: 400px;">-->
      <sev-pension-query-search-tab></sev-pension-query-search-tab>
      <div class="row col-12">
        <div id="sev-pay-ten-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
import SevPensionQuerySearchTab from "./SevPensionQuerySearchTab";

export default {
  components:{
    ButtonPanel,
    SevPensionQuerySearchTab
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      PEN_DATA: 'sevpayentry/getPenData'
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
      me.$router.push({name: 'SevPensionQuery'});
    },

    saveMatter: function(){

    },

    deleteCode: function(){

    },

    loadGridData() {
      let me =this;
      let settingData = me.SET_DATA;
      let data = me.PEN_DATA;
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

      let pSevAveSalType = me.SET_DATA[0].SEV_AVE_SAL_TYPE;
      let pPeriodSaveMethod = me.SET_DATA[0].PERIOD_SAVE_METHOD;
      let pPeriodText = '일';

      me.columns.push(
          { fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column', editable: false}
      );

      me.fields.push(
          { fieldName: 'EMP_NAME', dataType: 'text'}
      );

      switch ( pSevAveSalType) {
        case 'D':
          me.columns.push(
              { fieldName: 'DAY_AVG_DATA', header: '평균급여(일)', styleName: 'right-column', numberFormat: '#,##0.########', editable: false}
          );
          me.fields.push(
              { fieldName: 'DAY_AVG_DATA', dataType: 'number'}
          );
          break;
        case 'M':
          me.columns.push(
              { fieldName: 'MON_AVG_DATA', header: '평균급여(월)', styleName: 'right-column', numberFormat: '#,##0.########', editable: false}
          );
          me.fields.push(
              { fieldName: 'MON_AVG_DATA', dataType: 'number'}
          );
          break;
        default:
          break;
      }

      me.columns.push(
          { fieldName: 'LAST_PER_DAY', header: '결정된 연적립율', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'END_PER_DAY', header: '말일기준 연적립율', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'BASE_DATE', header: '배제일 감안 기산일', datetimeFormat: 'yyyy.MM.dd', editable: false},
          { fieldName: 'CALC_PERIOD_ST_DT', header: '계산기간 초일', datetimeFormat: 'yyyy.MM.dd', editable: false},
          { fieldName: 'CALC_PERIOD_EN_DT', header: '계산기간 말일', datetimeFormat: 'yyyy.MM.dd', editable: false}
      );
      me.fields.push(
          { fieldName: 'LAST_PER_DAY', dataType: 'number'},
          { fieldName: 'END_PER_DAY', dataType: 'number'},
          { fieldName: 'BASE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
          { fieldName: 'CALC_PERIOD_ST_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
          { fieldName: 'CALC_PERIOD_EN_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"}
      );

      if(pPeriodSaveMethod == 'M'){
        pPeriodText = '월';
      }

      me.columns.push(
          { fieldName: 'AMT_PERIOD', header: '계산기간 ' +pPeriodText+'수', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'JOINDATE_YEAR_SAVE_AMT_FLAG', header: '기산일부터 누적계산', styleName: 'left-column', editable: false},
          { fieldName: 'BF_START_BASE', header: '가산 '+pPeriodText+'수', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'ADD_AMT_PERIOD', header: '총 '+pPeriodText+'수', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'BF_RETIRE_PENSION_PAY_AMT', header: '퇴직연금 계산액', styleName: 'right-column', numberFormat: '#,##0.########', editable: false},
          { fieldName: 'CHANGE_RETIRE_PENSION_PAY_AMT', header: '퇴직연금 조정', styleName: 'right-column', numberFormat: '#,##0.########'},
          { fieldName: 'CHANGE_RETIRE_PENSION_PAY_DESC', header: '조정 사유', styleName: 'left-column'},
          { fieldName: 'RETIRE_PENSION_PAY_AMT', header: '조정후 퇴직연금', styleName: 'right-column', numberFormat: '#,##0.########', editable: false}
      );

      me.fields.push(
          { fieldName: 'AMT_PERIOD', dataType: 'number'},
          { fieldName: 'JOINDATE_YEAR_SAVE_AMT_FLAG', dataType: 'text'},
          { fieldName: 'BF_START_BASE', dataType: 'number'},
          { fieldName: 'ADD_AMT_PERIOD', dataType: 'number'},
          { fieldName: 'BF_RETIRE_PENSION_PAY_AMT', dataType: 'number'},
          { fieldName: 'CHANGE_RETIRE_PENSION_PAY_AMT', dataType: 'number'},
          { fieldName: 'CHANGE_RETIRE_PENSION_PAY_DESC', dataType: 'text'},
          { fieldName: 'RETIRE_PENSION_PAY_AMT', dataType: 'number'}
      );
    },

    realgridCreatedCallback: function() {
      let me = this;
      me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
        grid.commit();
        if (dataRow > -1) {
          if (field == me.dataProvider.getFieldIndex("CHANGE_RETIRE_PENSION_PAY_AMT")) {
            let setRetireCalcAmt = grid.getValue(itemIndex, "CHANGE_RETIRE_PENSION_PAY_AMT");
            let bfRetirePayAmt = grid.getValue(itemIndex, "BF_RETIRE_PENSION_PAY_AMT");
            grid.setValue(itemIndex, 'RETIRE_PENSION_PAY_AMT', setRetireCalcAmt + bfRetirePayAmt);
            let calList = me.dataProvider.getJsonRows(0, -1);
            me.$store.dispatch('sevpayentry/resetPenData');
            me.$store.dispatch('sevpayentry/setPenData', calList);
          }

          if (field == me.dataProvider.getFieldIndex("CHANGE_RETIRE_PENSION_PAY_DESC")) {
            let calList = me.dataProvider.getJsonRows(0, -1);
            me.$store.dispatch('sevpayentry/resetPenData');
            me.$store.dispatch('sevpayentry/setPenData', calList);
          }
        }
      }
    }
  },

  mounted() {
    let me = this;
    if( me.PEN_DATA[0]) {
      me.createGridFrame({
        domId: 'sev-pay-ten-grid',
        editable: true
      });
      me.loadGridData();
    }
  }
}
</script>
