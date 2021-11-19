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
        <div id="sev-pay-avg-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
import SevPensionQuerySearchTab from "./SevPensionQuerySearchTab";
import { mapGetters } from 'vuex';

export default {
  components:{
    ButtonPanel,
    SevPensionQuerySearchTab
    // SevPensionMatterEmpModal
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      AVG_DATA: 'sevpayentry/getAvgData'
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
      let data = me.AVG_DATA;
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
      me.setRealgridData(data || []);
    },

    setColumns(){
      // eid, 사번, 성명, 원천, 기간, 코드, 급여명, 연합쳬(상여금)
      let me = this;
      me.fields=[
        { fieldName: 'AVG_GROUP_DATA', dataType: 'text', hidden: true},
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'IN_WITH', dataType: 'text'},
        { fieldName: 'TERM_TYPE', dataType: 'number'},
        { fieldName: 'PAY_CODE', dataType: 'text'},
        { fieldName: 'PAY_NAME', dataType: 'text'},
        { fieldName: 'YEAR_SUM_DATA', dataType: 'number'},
      ]

      me.columns = [
        { fieldName: 'AVG_GROUP_DATA', header: '사번', visible: false},
        { fieldName: 'EMP_NAME', header: '성명', styleName: "left-column"},
        { fieldName: 'IN_WITH', header: '원천', styleName: "left-column"},
        { fieldName: 'TERM_TYPE', header: '기간', numberFormat: "#,##0", styleName: "right-column"},
        { fieldName: 'PAY_CODE', header: '코드', styleName: "left-column"},
        { fieldName: 'PAY_NAME', header: '급여명', styleName: "left-column"},
        { fieldName: 'YEAR_SUM_DATA', header: '연합계(상여금)', numberFormat: "#,##0", styleName: "right-column"}
      ];
      let data = me.AVG_DATA[0];
      let payMonthColumnHeader= [ data['LAST_MON_TERM'], data['LAST_TWO_MON_TERM'], data['LAST_THREE_MON_TERM'], data['LAST_FOUR_MON_TERM']];
      let payMonthData = [ 'LAST_MON', 'LAST_MON_TWO', 'LAST_MON_THREE', 'LAST_MON_FOUR'];
      for( let i=0; i< payMonthColumnHeader.length; i++){
        let fName = payMonthColumnHeader[i]
        if( fName){
          me.columns.push({
            fieldName: payMonthData[i],
            header: fName,

          })
          me.fields.push({
            fieldName: payMonthData[i],
            dataType: 'number'
          });
        }
      }
      me.columns.push({ fieldName: 'GAGAMPAY', header: '가감액', numberFormat: "#,##0", styleName: "right-column"});
      me.fields.push( { fieldName: 'GAGAMPAY',dataType: 'number'});
      me.columns.push({
        fieldName: 'SUM_DATA', header: '합계('+data['DIFF_DAY']+')',
        numberFormat: "#,##0", styleName: "right-column",
        footer: {
          text: "0",
          expression: "sum",
          numberFormat: "#,##0",
        }
      });
      me.fields.push( { fieldName: 'MON_AVG_DATA',dataType: 'number'});
      me.columns.push({
        fieldName: 'MON_AVG_DATA', header: '월평균',
        numberFormat: "#,##0", styleName: "right-column",
        footer: {
          text: "0",
          expression: "sum",
          numberFormat: "#,##0",
        }
      });
      me.fields.push( { fieldName: 'SUM_DATA',dataType: 'number'});

      if( me.SET_DATA[0]['SEV_AVE_SAL_TYPE'] === 'D') {
        me.columns.push({ fieldName: 'CHECK_DAYS', header: '월력상 일수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'CHECK_DAYS',dataType: 'number'});
        me.columns.push({ fieldName: 'CLOSED_VACA_DAYS', header: '휴업등 일수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'CLOSED_VACA_DAYS',dataType: 'number'});
        me.columns.push({ fieldName: 'FINAL_DAYS', header: '최종3개월 일수', numberFormat: "#,##0", styleName: "right-column"});
        me.fields.push({ fieldName: 'FINAL_DAYS',dataType: 'number'});
        me.columns.push({
          fieldName: 'DAY_AVG_DATA', header: '일평균',
          numberFormat: "#,##0", styleName: "right-column",
          footer: {
            text: "0",
            expression: "sum",
            numberFormat: "#,##0",
          }
        });
        me.fields.push({ fieldName: 'DAY_AVG_DATA',dataType: 'number'});
      }
    }
  },

  mounted() {
    let me = this;
    if( me.AVG_DATA[0]){
      me.createGridFrame({
        domId: 'sev-pay-avg-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
