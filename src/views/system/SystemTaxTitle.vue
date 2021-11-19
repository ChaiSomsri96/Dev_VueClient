<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'세무 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <system-tax-tab></system-tax-tab>
      <button-panel
          btnType='top'
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="download"
      />
      <div>
        <div id="realgrid-tax-title" class="realgrid-type-style" style="height:500px;"></div>
      </div>
      <button-panel
          class="col-12"
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
      insertUrl: '/system/setting/taxflag/insert',
      updateUrl: '/system/setting/taxflag/update',
      deleteUrl: '/system/setting/taxflag/delete',
      selCode: {},
      emptyRealGridData: {
        TAXITM_CD: '', TAX_NAME: '', ABBREV_NAME: '', INC_FLAG: '', RP_LINE:'', DISPLAY_ORDER: '', INACTIVE: 'N'
      },
      columns: [
        { header: "세무표식", fieldName: "TAXITM_CD", width: 50 },
        { header: "세무표식명", fieldName: "TAX_NAME", width: 250, styleName: "left-column" },
        { header: "세무표식 약칭", fieldName: "ABBREV_NAME", width: 100, styleName: "left-column" },
        { header: "INC_FLAG", fieldName: "INC_FLAG", width: 40 },
        { header: "RP_LINE", fieldName: "RP_LINE", width: 40 },
        { header: "표시순서", fieldName: "DISPLAY_ORDER", width: 40 },
        { header: "사용중지", fieldName: "INACTIVE", width: 40 },
        { header: "비활성 시작일", fieldName: "INACTIVE_FROM", width: 60 },
      ],
      fields: [
        { header: "세무표식", fieldName: "TAXITM_CD" },
        { header: "세무표식명", fieldName: "TAX_NAME" },
        { header: "세무표식 약칭", fieldName: "ABBREV_NAME" },
        { header: "INC_FLAG", fieldName: "INC_FLAG" },
        { header: "RP_LINE", fieldName: "RP_LINE" },
        { header: "표시순서", fieldName: "DISPLAY_ORDER" },
        { header: "사용중지", fieldName: "INACTIVE" },
        { header: "비활성 시작일", fieldName: "INACTIVE_FROM"},
      ]
    }
  },
  methods: {
    getTaxTitle: function() {
      return this.$httpGet('/system/setting/taxflag/list');
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-tax-title',
      editable:true,
      dataLoadFunction: me.getTaxTitle,
      editEventAdd: true,
      uniqueKeys: ['TAXITM_CD']
    });
  },
}
</script>