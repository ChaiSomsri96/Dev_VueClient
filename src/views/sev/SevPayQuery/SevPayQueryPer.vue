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
import SevPayQuerySearchTab from "./SevPayQuerySearchTab";
import { mapGetters } from 'vuex';

export default {
  components:{
    ButtonPanel,
    SevPayQuerySearchTab
    // SevPensionMatterEmpModal
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SET_DATA: 'sevpayentry/getSetData',
      PER_DATA: 'sevpayentry/getAvgData'
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
      let data = me.PER_DATA;
      me.fields = [];
      me.columns = [];
      me.setColumns()
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
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'SEV_INDEM_PREV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_INDEM_PREV_AMT', dataType: 'number'},
        { fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_INDEM_CURR_AMT', dataType: 'number'},
        { fieldName: 'SEV_INDEM_S_TYPE', dataType: 'text'},
        { fieldName: 'SEV_INDEM_SAVING', dataType: 'number'},
      ]

      me.columns = [
        { fieldName: 'EMP_NAME', header: '성명', styleName: "left-column"},
        { fieldName: 'SEV_INDEM_PREV_DATE', header: '직전 퇴직금 추계일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_INDEM_PREV_AMT', header: '직천 퇴직금 추계액', numberFormat: "#,##0", styleName: "right-column"},
        { fieldName: 'SEV_DATE', header: '이번 퇴직금 추계일', styleName: "left-column", datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_INDEM_CURR_AMT', header: '이번 퇴직금 추계액', numberFormat: "#,##0", styleName: "right-column"},
        { fieldName: 'SEV_INDEM_S_TYPE', header: 'TYPE', styleName: "left-column"},
        { fieldName: 'SEV_INDEM_SAVING', header: '퇴충 적립액', numberFormat: "#,##0", styleName: "right-column"},
      ];
    }
  },

  mounted() {
    let me = this;
    if( me.PER_DATA[0]){
      me.createGridFrame({
        domId: 'sev-pay-avg-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
