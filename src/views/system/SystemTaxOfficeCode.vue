<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'표준코드 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <system-code-tab></system-code-tab>
      <button-panel
          btnType='top'
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="download"
      />
      <div>
        <div id="realgrid-country" class="realgrid-type-style" style="height:500px;" ></div>
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

import SystemCodeTab from './SystemCodeTab';
import ButtonPanel from "../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';

export default {
  components: {
    SystemCodeTab,ButtonPanel
  },
  mixins: [grid,systemManager],
  data: function () {
    return {
      excelFileName: '국내은행코드',
      insertUrl: '/system/setting/taxoffice/insert',
      updateUrl: '/system/setting/taxoffice/update',
      deleteUrl: '/system/setting/taxoffice/delete',
      selCode: {},
      emptyRealGridData: {
        TAXOFFICE_CD: '', TAXOFFICE_NAME: '', TAXOFFICE_ENAME: '', INACTIVE: 'N'
      },
      columns: [
        { header: "세무서코드", fieldName: "TAXOFFICE_CD", width: 100 },
        { header: "세무서명 (한글)", fieldName: "TAXOFFICE_NAME", width: 100 },
        { header: "세무서명 (영어)", fieldName: "TAXOFFICE_ENAME", width: 100 },
        { header: "사용중지", fieldName: "INACTIVE", width: 100 }
      ],
      fields: [
        { fieldName: 'TAXOFFICE_CD', dataType: 'text' },
        { fieldName: 'TAXOFFICE_NAME', dataType: 'text' },
        { fieldName: 'TAXOFFICE_ENAME', dataType: 'text' },
        { fieldName: 'INACTIVE', dataType: 'text' }
      ]
    }
  },
  methods: {
    getTaxOfficeCode: function(){
      return this.$httpGet('/system/setting/taxoffice/list');
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-country',
      editable:true,
      dataLoadFunction: me.getTaxOfficeCode, ///system/setting/taxoffice/list
      editEventAdd: true,
      uniqueKeys: ['TAXOFFICE_CD']
    });
  },
}
</script>