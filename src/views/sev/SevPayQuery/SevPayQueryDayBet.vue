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
      TEN_DATA: 'sevpayentry/getTenData'
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
        { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'VALID_JOIN_DATE', header: '시작 지정일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'RETIREBASE_DT', header: '중간 정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'BASE_DATE', header: '배제일 감안 기산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'RETIRE_DATE', header: '퇴사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'EXCLUDE_WORKDAY', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'AF_WORK_DAY', header: '인정 근속일수', styleName: 'right-column', numberFormat: '#,##0'}
      ]

      me.fields = [
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
              { fieldName: 'BASE_YMD_WORK', header: '근속 연월일', styleName: 'left-column'},
              { fieldName: 'BF_CAL_DAY_VIEW', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'BF_CAL_DAY_HIDDEN', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
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
              { fieldName: 'BASE_YMD_WORK', header: '근속 연월일', styleName: 'left-column'},
              { fieldName: 'BF_CAL_DAY_VIEW', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'BF_CAL_DAY_HIDDEN', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
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
          break;
      }

      switch ( pSevProgType) {
        case 'F':
          me.columns.push(
              { fieldName: 'EQU_DAY', header: '수식', styleName: 'left-column'},
          );
          me.fields.push(
              { fieldName: 'EQU_DAY', dataType: 'text'},
          );
          break;
        case 'V':
          me.columns.push(
              { fieldName: 'ADD_DAY', header: '추가'+pWorkText, styleName: 'left-column'},
          );
          me.fields.push(
              { fieldName: 'ADD_DAY', dataType: 'text'},
          );
          break;
        case 'R':
          me.columns.push(
              { fieldName: 'PER_DAY', header: '누진율', styleName: 'left-column'},
          );
          me.fields.push(
              { fieldName: 'PER_DAY', dataType: 'text'},
          );
          break;
      }
      me.columns.push(
          { fieldName: 'AF_CAL_DAY_VIEW', header: '인정'+pWorkText, styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'APP_CAL_DAY_VIEW', header: '적용된 연수', styleName: 'right-column', numberFormat: '#,##0.########'},
          { fieldName: 'APP_CAL_DAY_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0', visible: false}
      );
      me.fields.push(
          { fieldName: 'AF_CAL_DAY_VIEW', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_VIEW', dataType: 'number'},
          { fieldName: 'APP_CAL_DAY_HIDDEN', dataType: 'number'}
      );
    }
  },

  mounted() {
    let me = this;
    if( me.TEN_DATA[0]) {
      me.createGridFrame({
        domId: 'sev-pay-ten-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
