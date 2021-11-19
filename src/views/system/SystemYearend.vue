<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'연말정산 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <button-panel
          btnType='top'
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="download"
      />
      <div>
        <div id="realgrid-yearend" class="realgrid-type-style" style="height:500px;" ></div>
      </div>
      <button-panel
          btnType='bottom'
          v-bind:remove=true
          v-bind:insert=true
          v-bind:update=true
          v-on:insert="insertCode"
          v-on:update="updateCode"
          v-on:remove="deleteCode"
      />
    </div>
  </div>
</template>

<script>
import SystemTaxTab from './SystemTaxTab';
import ButtonPanel from "../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';

export default {
  components: { SystemTaxTab,ButtonPanel },
  mixins: [grid,systemManager],
  data: function () {
    return {
      excelFileName: '세무표지',
      insertUrl: '/year-end/setting/settle-year/save',
      updateUrl: '/year-end/setting/settle-year/update',
      deleteUrl: '/year-end/setting/settle-year/delete',
      selCode: {},
      emptyRealGridData: {
        INCUM_YEAR: '', TERMI_YEAR: '', BIZINC_YEAR: '', ENTITY_CODE: ''
      },
      columns: [
        { header: "회사코드", fieldName: "ENTITY_CODE", width: 100 },
        { header: "회사명", fieldName: "ENTITY_NAME", width: 150, editable: false },
        { header: "재직자 연말정산연도", fieldName: "INCUM_YEAR", width: 100 },
        { header: "퇴사자 정산연도", fieldName: "TERMI_YEAR", width: 100 },
        { header: "사업소득 연말정산연도", fieldName: "BIZINC_YEAR", width: 100 },
      ],
      fields: [
        { fieldName: "INCUM_YEAR" },
        { fieldName: "TERMI_YEAR" },
        { fieldName: "BIZINC_YEAR" },
        { fieldName: "ENTITY_CODE" },
        { fieldName: "ENTITY_NAME", editable: false }
      ]
    }
  },
  methods: {
    getYearendYears: function() {
      return this.$httpGet('/year-end/setting/settle-year/list');
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-yearend',
      editable:true,
      dataLoadFunction: me.getYearendYears,
      editEventAdd: true,
      uniqueKeys: ['ENTITY_CODE']
    });
  },
}
</script>