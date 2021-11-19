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
          v-bind:add=true
          v-bind:download=true
          v-on:add="addEmptyData"
          v-on:download="download"
      />
      <div>
        <div id="realgrid-tax-table" class="realgrid-type-style" style="height:300px;"></div>
      </div>
      <button-panel
          class="col-12"
          btnType='bottom'
          v-bind:remove=true
          v-bind:save=true
          v-on:save="saveCodePostBody"
          v-on:remove="deleteCodePostBody"
      />
    </div>
  </div>
</template>

<script>
import SystemTaxTab from './SystemTaxTab';
import grid from '@/mixin/payroll-grid';
import systemManager from '@/mixin/system-manager';
import ButtonPanel from "../../components/common/ButtonPanel";

export default {
  components: { SystemTaxTab, ButtonPanel },
  mixins: [grid,systemManager],
  data: function () {
    return {
      TAX_YEAR: '',
      excelFileName: '4대보험요율',
      saveUrl: '/system/setting/4insure/save',
      deleteUrl: '/system/setting/4insure/delete',
      selCode: {},
      emptyRealGridData: {
        BANK_CODE: '', BANK_NAME: '', BANK_ENAME: '', BANK_DESC: '', INACTIVE: 'N'
      },
      columns: [{header: "귀속년도", fieldName: "TAXYEAR", width: 70},
        {header: "보험종류", fieldName: "INSUR_TYPE", width: 100},
        {header: "적용일", fieldName: "APPLY_DATE", width: 70},
        {header: "종료일", fieldName: "REMOVE_DATE", width: 70},
        {header: "하한금액", fieldName: "LOWER_AMOUNT", width: 100},
        {header: "상한금액", fieldName: "UPPER_AMOUNT", width: 100},
        {header: "요율", fieldName: "TAX_RATIO", width: 70}
      ],
      fields: [
        {header: "귀속년도", fieldName: "TAXYEAR"},
        {header: "보험종류", fieldName: "INSUR_TYPE"},
        {header: "적용일", fieldName: "APPLY_DATE"},
        {header: "종료일", fieldName: "REMOVE_DATE"},
        {header: "하한금액", fieldName: "LOWER_AMOUNT"},
        {header: "상한금액", fieldName: "UPPER_AMOUNT"},
        {header: "요율", fieldName: "TAX_RATIO"},
      ]
    }
  },
  methods: {
    reloadRealGrid: function(){
      this.onSearch();
    },

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
      let { data } = await this.$httpGet('/system/setting/4insure/get',
          {
            TAXYEAR: me.TAX_YEAR
          });

      me.setRealgridData(data || []);
    },
  },
  mounted() {
    let me = this;
    me.createRealGrid({
      domId:'realgrid-tax-table',
      editable:true,
      autoLoad:false,
      editEventAdd: true
    });
  },
}
</script>