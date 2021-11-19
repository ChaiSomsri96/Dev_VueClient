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
      RATE_DATA: 'sevpayentry/getRateData',
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
      let settingData = me.PEN_DATA;
      let data = me.RATE_DATA;
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

      let pSvcPerMethod = me.PEN_DATA[0].SVC_PER_METHOD;
      let pSevProgType = me.PEN_DATA[0].SEV_RPEN_RATE_TYPE;
      let pWorkText = '';
      let pWorkYmd = 1; //Y=1, M=12, D=365
      let pDayText = '일';

      if( pSvcPerMethod === 'Y'){
        pDayText = '년';
      }else if( pSvcPerMethod === 'M'){
        pDayText = '월';
      }

      switch ( pSevProgType) {
        case 'P':
          me.columns.push(
              { fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
              { fieldName: 'LAST_PER_DAY', header: '결정된 연적립율', styleName: 'right-column', numberFormat: '#,##0.########'},
          );

          me.fields.push(
              { fieldName: 'EMP_NAME', dataType: 'text'},
              { fieldName: 'LAST_PER_DAY', dataType: 'number'},
          )
          break;
        case 'F':
          me.columns.push(
              { fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
              { fieldName: 'LAST_PER_DAY', header: '결정된 연적립율', styleName: 'right-column', numberFormat: '#,##0.########'},
          );

          me.fields.push(
              { fieldName: 'EMP_NAME', dataType: 'text'},
              { fieldName: 'LAST_PER_DAY', dataType: 'number'},
          )
          break;
        default:
          me.columns.push(
              { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
              { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
              { fieldName: 'VALID_JOIN_DATE', header: '시작 지정일', datetimeFormat: 'yyyy.MM.dd'},
              { fieldName: 'RETIREBASE_DT', header: '중간 정산일', datetimeFormat: 'yyyy.MM.dd'},

              { fieldName: 'BF_BASE_DATE', header: '기산일일', datetimeFomat: 'yyyy.MM.dd'},
              { fieldName: 'EXCLUDE_WORKDAY', header: '배제일수', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'BASE_DATE', header: '베제일 감안 기산일', datetimeFormat: 'yyyy.MM.dd'},
              { fieldName: 'CALC_PERIOD_ST_DT', header: '계산기간 초일', datetimeFormat: 'yyyy.MM.dd'},
              { fieldName: 'CALC_PERIOD_EN_DT', header: '계산기간 말일', daetimeFormat: 'yyyy.MM.dd'},

              { fieldName: 'OTHER_CALC_PERIOD_DAY', header: '계산기산' +pDayText+'수', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'CALC_PERIOD_LAPSE_DAY', header: '계산기간 경과', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'CALC_PERIOD_MOD_DAY', header: '계산기간 잔여', styleName: 'right-column', numberFormat: '#,##0'},

              { fieldName: 'END_BASE_DAY', header: '말일긴준 근속일수', styleName: 'right-column', numberFormat: '#,##0'},
              { fieldName: 'START_BASE_DAY', header: '초일기준 근속일수', styleName: 'right-column', numberFormat: '#,##0'},
          )

          me.fields.push(
              { fieldName: 'EMP_NAME', dataType: 'text'},
              { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
              { fieldName: 'VALID_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
              { fieldName: 'RETIREBASE_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},

              { fieldName: 'BF_BASE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
              { fieldName: 'EXCLUDE_WORKDAY', dataType: 'number'},
              { fieldName: 'BASE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
              { fieldName: 'CALC_PERIOD_ST_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
              { fieldName: 'CALC_PERIOD_EN_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},

              { fieldName: 'OTHER_CALC_PERIOD_DAY', dataType: 'number'},
              { fieldName: 'CALC_PERIOD_LAPSE_DAY', dataType: 'number'},
              { fieldName: 'CALC_PERIOD_MOD_DAY', dataType: 'number'},

              { fieldName: 'END_BASE_DAY', dataType: 'number'},
              { fieldName: 'START_BASE_DAY', dataType: 'number'},
          );

          switch ( pSvcPerMethod){
            case 'Y':
              pWorkText= '연수';
              me.columns.push(
                  { fieldName: 'END_BASE_YMD', header: '말일기준 근속 연+월+일', styleName: 'left-column'},
                  { fieldName: 'START_BASE_YMD', header: '초일기준 근속 연+월+일', styleName: 'left-column'},
                  { fieldName: 'END_BF_CAL_DAY_VIEW', header: '말일기준 근속연수', styleName: 'right-column', numberFormat: '#,##0'},
                  { fieldName: 'END_BF_CAL_DAY_HIDDEN', header: '말일기준 근속연수', styleName: 'right-column', numberFormat: '#,##0', visible: false},
                  { fieldName: 'START_BF_CAL_DAY_VIEW', header: '초일기준 근속연수', styleName: 'right-column', numberFormat: '#,##0'},
                  { fieldName: 'START_BF_CAL_DAY_HIDDEN', header: '초일기준 근속연수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
              );
              me.fields.push(
                  { fieldName: 'END_BASE_YMD', dataType: 'text'},
                  { fieldName: 'START_BASE_YMD', dataType: 'text'},
                  { fieldName: 'END_BF_CAL_DAY_VIEW', dataType: 'number'},
                  { fieldName: 'END_BF_CAL_DAY_HIDDEN', dataType: 'number'},
                  { fieldName: 'START_BF_CAL_DAY_VIEW', dataType: 'number'},
                  { fieldName: 'START_BF_CAL_DAY_HIDDEN', dataType: 'number'}
              );
              break;
            case 'M':
              me.columns.push(
                  { fieldName: 'END_BASE_YMD', header: '말일기준 근속 연+월+일', styleName: 'left-column'},
                  { fieldName: 'START_BASE_YMD', header: '초일기준 근속 연+월+일', styleName: 'left-column'},
                  { fieldName: 'END_BF_CAL_DAY_VIEW', header: '말일기준 근속월수', styleName: 'right-column', numberFormat: '#,##0'},
                  { fieldName: 'END_BF_CAL_DAY_HIDDEN', header: '말일기준 근속월수', styleName: 'right-column', numberFormat: '#,##0', visible: false},
                  { fieldName: 'START_BF_CAL_DAY_VIEW', header: '초일기준 근속월수', styleName: 'right-column', numberFormat: '#,##0'},
                  { fieldName: 'START_BF_CAL_DAY_HIDDEN', header: '초일기준 근속월수', styleName: 'right-column', numberFormat: '#,##0', visible: false}
              );
              me.fields.push(
                  { fieldName: 'END_BASE_YMD', dataType: 'text'},
                  { fieldName: 'START_BASE_YMD', dataType: 'text'},
                  { fieldName: 'END_BF_CAL_DAY_VIEW', dataType: 'number'},
                  { fieldName: 'END_BF_CAL_DAY_HIDDEN', dataType: 'number'},
                  { fieldName: 'START_BF_CAL_DAY_VIEW', dataType: 'number'},
                  { fieldName: 'START_BF_CAL_DAY_HIDDEN', dataType: 'number'}
              );
              break;
            case 'D':
              pWorkText= '일수';
              pWorkYmd= 365;
              break;
          }

          me.columns.push(
              { fieldName: 'END_PER_DAY', header: '말일기준 적립율', styleName: 'right-column', numberFormat: '#,##0.########'},
              { fieldName: 'END_APP_CAL_DAY_HIDDEN', header: '초일기준 근속월수', styleName: 'right-column', numberFormat: '#,##0.########', visible: false},
              { fieldName: 'START_PER_DAY', header: '초일기준 적립율', styleName: 'right-column', numberFormat: '#,##0.########'},
              { fieldName: 'START_APP_CAL_DAY_HIDDEN', header: '', styleName: 'right-column', numberFormat: '#,##0.########', visible: false},

              { fieldName: 'RATE_EQUAL', header: '적립율 사이', styleName: 'left-column'},
              { fieldName: 'RATE_RE_CALC', header: '비율 재계산', styleName: 'left-column'},

              { fieldName: 'LAST_PER_DAY', header: '결정된 적립율', styleName: 'right-column', numberFormat: '#,##0.########'},
              { fieldName: 'LAST_PART_DAY', header: '마디', styleName: 'right-column', numberFormat: '#,##0.########'},
              { fieldName: 'LAST_SEV_PROG_BORDER', header: '구분', styleName: 'left-column'},
          );
          me.fields.push(
              { fieldName: 'END_PER_DAY', dataType: 'number'},
              { fieldName: 'END_APP_CAL_DAY_HIDDEN', dataType: 'number'},
              { fieldName: 'START_PER_DAY', dataType: 'number'},
              { fieldName: 'START_APP_CAL_DAY_HIDDEN', dataType: 'number'},

              { fieldName: 'RATE_EQUAL', dataType: 'text'},
              { fieldName: 'RATE_RE_CALC', dataType: 'text'},

              { fieldName: 'LAST_PER_DAY', dataType: 'number'},
              { fieldName: 'LAST_PART_DAY', dataType: 'number'},
              { fieldName: 'LAST_SEV_PROG_BORDER', dataType: 'text'}
          );
          break;
      }

    }
  },

  mounted() {
    let me = this;
    if( me.RATE_DATA[0]) {
      me.createGridFrame({
        domId: 'sev-pay-ten-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
