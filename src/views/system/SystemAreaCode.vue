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
        <div id="realgrid-area" class="realgrid-type-style" style="height:500px;" ></div>
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
      insertUrl: '/system/setting/govercode/insert',
      updateUrl: '/system/setting/govercode/update',
      deleteUrl: '/system/setting/govercode/delete',
      selCode: {},
      emptyRealGridData: { GOVERCODE:'', GOVER_NAME:'', GOVER_ENAME:'', ZIPCODE:'', ADDRESS:'', CITYHALL: '', SIDO_CODE: '', SIGUNGU_CODE: '', INACTIVE: 'N' },
      columns: [
        { header : '납세처코드(지방세)', fieldName: 'GOVERCODE', width: 40  },
        { header : '시군구청명 (한글)', fieldName: 'GOVER_NAME', width: 120 },
        { header : '시군구청명 (영어)', fieldName: 'GOVER_ENAME', width: 120 },
        { header : '우편번호', fieldName: 'ZIPCODE', width: 50  },
        { header : '주소', fieldName: 'ADDRESS', width: 120, styleName: "left-column" },
        { header: '납세처명', name: 'CITYHALL', width: 60  },
        { header : '시도코드', fieldName: 'SIDO_CODE', width: 50 },
        { header : '시군구코드', fieldName: 'SIGUNGU_CODE', width: 50 },
        { header :'사용중지', fieldName:'INACTIVE', width: 50 }
      ],
      fields: [
        { fieldName: 'GOVERCODE', dataType: 'text' },
        { fieldName: 'GOVER_NAME', dataType: 'text' },
        { fieldName: 'GOVER_ENAME', dataType: 'text' },
        { fieldName: 'ZIPCODE', dataType: 'text'  },
        { fieldName: 'ADDRESS', dataType: 'text'  },
        { fieldName: 'CITYHALL', dataType: 'text'  },
        { fieldName: 'SIDO_CODE', dataType: 'text' },
        { fieldName: 'SIGUNGU_CODE', dataType: 'text'},
        { fieldName:'INACTIVE', dataType: 'text' }
      ]
    }
  },
  methods: {
    getAreaCode: function(){
      return this.$httpGet('/system/setting/govercode/list');
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-area',
      editable:true,
      dataLoadFunction: me.getAreaCode, ///system/setting/taxoffice/list
      editEventAdd: true,
      uniqueKeys: ['TAXOFFICE_CD']
    });
  },
}
</script>