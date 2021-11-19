<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'세무 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <system-tax-tab></system-tax-tab>
      <div class="box border-box type2">
        <h3 class="blind">상세 검색</h3>

        <div class="box-body row">
          <div class="pull-left search-wrap">
            <div class="input-group type-divide col-3 pr-0">
              <div class="input-group type-divide">
                <div class="divide-left">
                  <span class="input-group-addon title" >연도</span>
                </div>
                <div class="divide-right">
                  <div class="input-group">
                    <ui-input :value="TAX_YEAR"
                              @change="TAX_YEAR=$event;"
                              :options="{
                                                trim         : true,
                                                maxLength    : 4,
                                                minLength    : 4,
                                                placeHolder  : 'yyyy'
                                            }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
              <span>검색</span>
            </button>
          </div>
        </div>
      </div>
      <button-panel
          btnType='top'
          v-bind:download=true
          v-bind:upload=true
          v-bind:add=true
          v-on:update="upload"
          v-on:add="addEmptyData"
          v-on:download="download"
          v-on:upload="upload"
      />
      <div>
        <div id="realgrid-tax-table"  class="realgrid-type-style" style="height:400px;" ></div>
      </div>
      <div class="tbl-title">
        <span>* 소득구간 시작/종료의 금액단위는 천원(1000)단위입니다.</span>
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
import {getTaxRateTable} from '@/api/system';
import SystemTaxTab from './SystemTaxTab';
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';
import ButtonPanel from "../../components/common/ButtonPanel";

export default {
  components: { SystemTaxTab, ButtonPanel },
  mixins: [grid,systemManager],
  data: function () {
    let columns = [
      { header: "귀속년도", fieldName: "TAX_YEAR", width: 70 },
      { header: "소득구간 시작", fieldName: "INCOME1", width: 100,
        numberFormat: "#,##0",
        styles: { textAlignment: "far"},
        dataType: 'number',
        editor: {
          "type": "number"
        }
      },
      { header: "소득구간 종료", fieldName: "INCOME2", width: 100,
        numberFormat: "#,##0",
        styles: { textAlignment: "far"},
        dataType: 'number',
        editor: {
          "type": "number"
        }
      }
    ];
    let oneData={ TAX_YEAR:'', INCOME1:0, INCOME2:0};
    for(let i=1;i<51;i++){
      columns.push( {
        header: i+"명",
        fieldName: "FAMILY_"+i,
        width: 70,
        numberFormat: "#,##0",
        dataType: 'number',
        editor: {
          "type": "number",
          editFormat: "#,##0"
        }
      });
      oneData["FAMILY_"+i] = 0;
    }
    return {
      selCode: {},
      emptyRealGridData: oneData,
      insertUrl: '/system/setting/nts_tax_table-mgt/insert',
      updateUrl: '/system/setting/nts_tax_table-mgt/update',
      deleteUrl: '/system/setting/nts_tax_table-mgt/delete',
      TAX_YEAR: '',
      excelFileName: '간이세액표',
      columns: columns,
      fields: columns
    }
  },
  methods: {
    async onSearch() {
      let me = this;
      if(me.payrollUtil.isNull(me.TAX_YEAR)){
        me.alert({message:'검색 대상 연도값을 입력해 주세요.'});
        return false;
      }
      if(!me.payrollUtil.isNumeric(me.TAX_YEAR)){
        me.alert({message:'검색 대상 연도값을 정확히 입력해 주세요.'});
        return false;
      }
      let { data } = await this.$httpGet('/system/setting/nts_tax_table-mgt/list',
          {
            TAX_YEAR: me.TAX_YEAR
          });

      me.setRealgridData(data || []);
    },
    upload: function(){
      this.alert({message:'Front 작업 후 추후에 다시 작업할 예정입니다.'})
    },
    reloadRealGrid: function(){
      this.onSearch();
    }
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-tax-table',
      editable: true,
      autoLoad: false,
      dataLoadFunction: getTaxRateTable,
      editEventAdd: true,
      uniqueKeys: ['INCOME1']
    });
  },
}
</script>