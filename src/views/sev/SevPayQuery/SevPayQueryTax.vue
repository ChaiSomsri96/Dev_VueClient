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
        <div id="sev-pay-tax-grid" style="width: 100%; height: 600px" class="realgrid-type-style"/>
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
      let data = me.CAL_DATA;
      me.fields = [];
      me.columns = [];
      me.setColumns();
      me.setFieldsNColumns();
      me.setRealgridData(data || []);
    },

    setColumns(){
      let me = this;
      me.columns.push(
          { fieldName: 'EMP_NAME', header: '이름', styleName: 'left-column'},
          { fieldName: 'EMPDEPT_NAME', header: '부서', styleName: 'left-column'},
          { fieldName: 'RETIRE_PAY_DATE', header: '퇴직금 지급일', datetimeFormat: 'yyyy.MM.dd'},
          { fieldName: 'SEV_REAL_REASON', header: '퇴직사유', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SEV_IRP_SV_DATE', header: '입금일자', datetimeFormat: 'yyyy.MM.dd'},
          { fieldName: 'SEV_IRP_SV_TYPE', header: '입금시기', styleName: 'left-column'},
          { fieldName: 'SEV_IRP_COMP_NAME', header: '연금사업자명', styleName: 'left-column'},
          { fieldName: 'SEV_IRP_COMP_VATID', header: '연금사업자번호', styleName: 'left-column'},
          { fieldName: 'SEV_IRP_AC_NO', header: '계좌번호', styleName: 'left-column'},
          { fieldName: 'SEV_IRP_SV_AMT', header: '계좌입금금액', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SEV_TAX', header: '퇴직소득세', styleName: 'right-column', numberFormat: '#,##0'},
          { fieldName: 'SEV_RESIDENT_TAX', header: '지방소득세', styleName: 'right-column', numberFormat: '#,##0'},
      );
      me.fields.push(
          { fieldName: 'EMP_NAME', dataType: 'text'},
          { fieldName: 'EMPDEPT_NAME', dataType: 'text'},
          { fieldName: 'RETIRE_PAY_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
          { fieldName: 'SEV_REAL_REASON', dataType: 'number'},
          { fieldName: 'SEV_IRP_SV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
          { fieldName: 'SEV_IRP_SV_TYPE', dataType: 'number'},
          { fieldName: 'SEV_IRP_COMP_NAME', dataType: 'text'},
          { fieldName: 'SEV_IRP_COMP_VATID', dataType: 'text'},
          { fieldName: 'SEV_IRP_AC_NO', dataType: 'text'},
          { fieldName: 'SEV_IRP_SV_AMT', dataType: 'text'},
          { fieldName: 'SEV_TAX', dataType: 'text'},
          { fieldName: 'SEV_RESIDENT_TAX', dataType: 'text'}

      );
    }
  },

  mounted() {
    let me = this;
    if( me.CAL_DATA[0]) {
      me.createGridFrame({
        domId: 'sev-pay-tax-grid',
        editable: false
      });
      me.loadGridData();
    }
  }
}
</script>
