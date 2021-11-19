<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'코드 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-tab></cfg-tab>

      <div class="row">
        <div class="form-row">
          <button-panel
              btnType='top'
              v-bind:download=true
              v-on:download="download"
          />
        </div>
      </div>
      <div  class="row">
        <div id="cfg-over-time-code-grid"  class="realgrid-type-style" style="width: 100%; height: 500px"></div>
      </div>


    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import CfgTab from './CfgTab';
import ButtonPanel from "../../../components/common/ButtonPanel";
import CfgYearModal from "./CfgYearModal";
export default {
  components: {
    ButtonPanel,
    CfgTab,
    CfgYearModal
  },
  mixins: [grid],
  data: function () {
    return {
      columns: [
        { header: '코드', fieldName: 'ONH_CD' },
        { header: '코드명', fieldName: 'ONH_NAME' },
        { header: '단위구분', fieldName: 'OT_UNIT' },
        { header: '사용중지', fieldName: 'INACTIVE'}
      ],
      fields: [
        { fieldName: 'ONH_CD', dataType: 'text' },
        { fieldName: 'ONH_NAME', dataType: 'text' },
        { fieldName: 'OT_UNIT', dataType: 'text' },
        { fieldName: 'INACTIVE', dataType: 'text' },
      ],
    }
  },
  methods:{
    async loadGridData() {
      try {
        let { data } = await this.$httpGet('/hrm/code/hr-onh/list') || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgOvertimeCode loadGridData err: ", e);
      }
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'cfg-over-time-code-grid'});
    this.loadGridData();
  }
}
</script>

<style scoped>

</style>