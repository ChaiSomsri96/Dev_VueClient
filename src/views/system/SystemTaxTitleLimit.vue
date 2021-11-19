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
        <div id="realgrid-tax-limit" class="realgrid-type-style" style="height:500px;" ></div>
      </div>
      <button-panel
          class="col-12"
          btnType='bottom'
          v-bind:remove=true
          v-bind:insert=true
          v-bind:update=true
          v-on:insert="insertCodePostBody"
          v-on:update="updateCodePostBody"
          v-on:remove="deleteCodePostBody"
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
      insertUrl: '/system/setting/TaxFlagExempt/insert',
      updateUrl: '/system/setting/TaxFlagExempt/update',
      deleteUrl: '/system/setting/TaxFlagExempt/delete',
      selCode: {},
      emptyRealGridData: {
        TAXYEAR: '', TAXITM_CD: '', TAX_NAME: '', ABBREV_NAME: '', LIMIT_AMOUNT:0, LIMIT_RATE: 0, LIMIT_YEARSUM: 0, INACTIVE:'N', INACTIVE_FROM:''
      },
      columns: [
        { header: "귀속년도", fieldName: "TAXYEAR", width: 60, autoFilter: true },
        { header: "세무코드", fieldName: "TAXITM_CD", width: 60, autoFilter: true },
        { header: "세무표식명", fieldName: "TAX_NAME", width: 250, autoFilter: true, styleName: "left-column" },
        { header: "세무표식약칭", fieldName: "ABBREV_NAME", width: 150, styleName: "left-column" },
        { header: "한계금액", fieldName: "LIMIT_AMOUNT", width: 70,
          numberFormat: "#,##0", styleName: "right-column",
          editor: {
            type: "number",
            editFormat: "#,##0",
            multipleChar: "+"
          }
        },
        { header: "한계요율", fieldName: "LIMIT_RATE", width: 50 },
        { header: "연 한계금액", fieldName: "LIMIT_YEARSUM", width: 70,
          numberFormat: "#,##0", styleName: "right-column",
          editor: {
            type: "number",
            editFormat: "#,##0",
            multipleChar: "+"
          }
        }
      ],
      fields: [
        { fieldName: "TAXYEAR", },
        { fieldName: "TAXITM_CD", editable: false },
        { fieldName: "TAX_NAME" },
        { fieldName: "ABBREV_NAME" },
        { fieldName: "LIMIT_AMOUNT",type: "number", dataType: 'number' },
        { fieldName: "LIMIT_RATE",type: "number" },
        { fieldName: "LIMIT_YEARSUM",type: "number", dataType: 'number' },
        { fieldName: "INACTIVE" },
        { fieldName: "INACTIVE_FROM"},
      ]
    }
  },
  methods: {
    getTaxTitleLimit: function() {
      return this.$httpGet('/system/setting/TaxFlagExempt/get');
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-tax-limit',
      editable:true,
      dataLoadFunction: me.getTaxTitleLimit,
      editEventAdd: true,
      uniqueKeys: ['TAXITM_CD']
    });
  },
}
</script>