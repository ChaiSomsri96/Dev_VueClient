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
        <div id="realgrid-bank"  class="realgrid-type-style" style="height:500px;"></div>
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
import {getBankCode} from '@/api/system';
import SystemCodeTab from './SystemCodeTab';
import ButtonPanel from "../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';

export default {
  components: { SystemCodeTab,ButtonPanel },
  mixins: [grid,systemManager],
  data: function () {
    return {
      excelFileName: '국내은행코드',
      insertUrl: '/system/setting/krbank/insert',
      updateUrl: '/system/setting/krbank/update',
      deleteUrl: '/system/setting/krbank/delete',
      selCode: {},
      emptyRealGridData: {
        BANK_CODE: '', BANK_NAME: '', BANK_ENAME: '', BANK_DESC: '', INACTIVE: 'N'
      },
      columns: [
        { fieldName: 'BANK_CODE', header: '금융기관코드', width: 90, autoFilter: true },
        { fieldName: 'BANK_NAME', header: '은행명 (한글)', width: 120, autoFilter: true },
        { fieldName: 'BANK_ENAME', header: '은행명 (영어)', width: 120, autoFilter: true },
        { fieldName: 'BANK_DESC', header: '설명', width: 120, autoFilter: true },
        { fieldName: 'INACTIVE', header: '사용중지', width: 70 }
      ],
      fields: [
        { fieldName: 'BANK_CODE', dataType: 'text' },
        { fieldName: 'BANK_NAME', dataType: 'text' },
        { fieldName: 'BANK_ENAME', dataType: 'text' },
        { fieldName: 'BANK_DESC', dataType: 'text' },
        { fieldName: 'INACTIVE', dataType: 'text' }
      ]
    }
  },
  methods: {
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-bank',
      editable:true,
      dataLoadFunction: getBankCode,
      editEventAdd: true,
      uniqueKeys: ['BANK_CODE']
    });
  },
}
</script>