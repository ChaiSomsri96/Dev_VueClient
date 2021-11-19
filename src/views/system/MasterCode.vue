<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'기초자료 관리'"/>
    <!-- Body 영역  contents_section pt-0 -->
    <div class="content-body">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{name: 'SystemBase'}" active-class="active">수퍼코드 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'mastercode'}" active-class="active">마스터코드 관리</router-link>
        </li>
      </ul>
      <div class="form-group">
        <div class="box border-box type2">
          <div class="box-body row">
            <div class="pull-left search-wrap">
              <div class="input-group type-divide col-6 p-0">
                <div class="divide-left">
                  <span class="input-group-addon title">수퍼코드</span>
                </div>
                <div class="divide-right">
                  <div class="dropdown input-group">
                    <input type="hidden" id="srchEpnAtcCd" name="epnAtcCd" value="">
                    <!--input type="text" name="supercode" readonly="true" v-bind:value="superCode.SUPER_CODE" -->
                    <input type="text" name="supercodeNm" readonly="true" v-bind:value="superCode.CODE_KDESC"
                           data-prev-val="" class="form-control type-two-button ellipsis" autocomplete="off"
                           placeholder="선택된 수퍼코드명">
                  </div>
                </div>
              </div>
              <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" data-toggle="modal"
                      data-target="#supercode-modal" data-backdrop="static" @click="loadSuperCode()">
                <span>선택</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="realgrid-code" style="width: 100%; height: 340px;" class="realgrid-type-style"></div>
      </div>
      <div class="form-wrap"><br>
        <h2 class="title-wrap">마스터코드 : {{ selCode.CODENAMK }}</h2>
        <div class="row col-9">
          <labeled-input input-label="수퍼코드" :error-msg="errors.SUPER_CODE" class="col-6" labelClass="col-3" inputClass="col-9">
              <ui-input :value="selCode.SUPER_CODE" @change="selCode.SUPER_CODE=$event; selCode.return=$event;"/>
          </labeled-input>
          <labeled-input input-label="마스터코드" :error-msg="errors.MAST_CODE" class="col-6" labelClass="col-3" inputClass="col-9">
            <ui-input :value="selCode.MAST_CODE" @change="selCode.MAST_CODE=$event; selCode.return=$event;"/>
          </labeled-input>
          <labeled-input input-label="코드이름" :error-msg="errors.CODENAMK" class="col-6" labelClass="col-3" inputClass="col-9">
            <ui-input :value="selCode.CODENAMK" @change="selCode.CODENAMK=$event; selCode.return=$event;"/>
          </labeled-input>
          <labeled-input input-label="리얼코드" :error-msg="errors.REAL_CODE" class="col-6" labelClass="col-3" inputClass="col-9">
            <ui-input :value="selCode.REAL_CODE" @change="selCode.REAL_CODE=$event; selCode.return=$event;"/>
          </labeled-input>
          <labeled-input input-label="다국어키" :error-msg="errors.CODENAMEX" class="col-6" labelClass="col-3" inputClass="col-9">
            <ui-input :value="selCode.CODENAMEX" @change="selCode.CODENAMEX=$event; selCode.return=$event;"/>
          </labeled-input>
          <labeled-input input-label="비활성상태" :error-msg="errors.INACTIVE" class="col-6" labelClass="col-3" inputClass="col-9">
            <ui-dropdown :items="inactiveItems"
                         :value="selCode.INACTIVE"
                         @change="selCode.INACTIVE=$event.value;"/>
          </labeled-input>
        </div>

        <button-panel class="col-12"
            v-bind:insert=true
            v-bind:update=true
            v-bind:remove=true
            v-on:insert="insertCode"
            v-on:update="updateCode"
            v-on:remove="deleteCode"
        />
      </div>
    </div>

    <!-- 모달창 -->
    <div class="modal" id="supercode-modal" role="dialog" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-lg scroll-type" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">수퍼코드 선택</h2>
            <!-- .btn-resize 클릭 시, .modal-lg에 full클래스 토글 -->
            <button class="btn btn-md flat btn-modal-size large"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
            <button class="btn btn-md flat btn-modal-size small"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
            <button type="button" class="btn btn-m flat btn-close" data-dismiss="modal" aria-label="Close">
              <i class="icon-lineIcon-close"></i>
            </button>
          </div>
          <div class="modal-body ndk-scrollbar">
            <div class="scroll-tbl">
              <div id="realgrid-super" style="width: 100%; height: 340px;" class="realgrid-type-style"></div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap">
              <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>취소
              </button>
              <button class="btn btn-md black" data-dismiss="modal" aria-label="Close" @click="setSelectSuperCode()">
                <i class="icon-lineIcon-check mr-5"></i>선택
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import {getSupercode, getMasterCode} from '@/api/setting';
import LabeledInput from "../../components/common/LabeledInput";
import ButtonPanel from "../../components/common/ButtonPanel";

var realgridVO = null;

export default {
  components: {ButtonPanel, LabeledInput},
  mixins: [grid],

  data: function () {
    return {
      errors: {},
      emptyMastCode: {
        SUPER_CODE: '',
        MAST_CODE: '',
        CODENAMEX: '',
        REAL_CODE: '',
        CODENAMK: '',
        INACTIVE: ''
      },
      selCode: {},
      superCode: {},
      supercodeDataProvider: null,
      inactiveItems: [
        { cd: 'Y', cdNm: {message: 'Y' } },
        { cd: 'N', cdNm: {message: 'N'}}
      ],
      columns: [
        {fieldName: 'SUPER_CODE', header: '수퍼코드', width: 120},
        {fieldName: 'MAST_CODE', header: '마스터코드', width: 190, autoFilter: true},
        {fieldName: 'CODENAMEX', header: '다국어키', width: 190, autoFilter: true},
        {fieldName: 'REAL_CODE', header: '리얼코드', width: 190, autoFilter: true},
        {fieldName: 'CODENAMK', header: '코드명', width: 300, autoFilter: true},
        {fieldName: 'INACTIVE', header: '활성여부', width: 190}
      ],

      fields: [
        {fieldName: 'SUPER_CODE', dataType: 'text'},
        {fieldName: 'MAST_CODE', dataType: 'text'},
        {fieldName: 'CODENAMEX', dataType: 'text'},
        {fieldName: 'REAL_CODE', dataType: 'text'},
        {fieldName: 'CODENAMK', dataType: 'text'},
        {fieldName: 'INACTIVE', dataType: 'text'}
      ]
    }
  },
  methods: {

    async loadSuperCode( supercodeDataProvider) {
      if(realgridVO && realgridVO.dataProvider){
        try {
          const {data} = await getSupercode(); // api 호출
          realgridVO.dataProvider.setRows(data || []);
        } catch (e) {
          console.error(e);
        }
      }
    },

    async loadMasterData() {
      let me = this;
      try {
        const {data} = await getMasterCode(me.superCode.SUPER_CODE); // api 호출
        me.dataProvider.setRows(data);
      } catch (e) {
        console.error(e);
      }
    },

    setSelectSuperCode: function () {
      let rows = realgridVO.view.getCheckedRows(true);
      this.superCode = realgridVO.dataProvider.getJsonRow(rows[0]);
      this.loadMasterData(this.superCode);
    },

    setSupercodeGrid: function(){
      const me = this;
      const gridVO = window.workplace.realGrid({
        domId: 'realgrid-super' // 'realgrid',
      });

      realgridVO = gridVO;

      const columns = [
        {fieldName: 'SUPER_CODE', header: '수퍼코드', width: 120, autoFilter: true},
        {fieldName: 'CODE_KDESC', header: '코드명(국문)', width: 190, autoFilter: true},
        {fieldName: 'CODENAMEX', header: '다국어키', width: 190},
        {fieldName: 'OPENFLAG', header: '오픈여부', width: 190},
      ];

      const fields = [
        {fieldName: 'SUPER_CODE', dataType: 'text'},
        {fieldName: 'CODE_KDESC', dataType: 'text'},
        {fieldName: 'CODENAMEX', dataType: 'text'},
        {fieldName: 'OPENFLAG', dataType: 'text'}
      ];

      const supercodeDataProvider = gridVO.dataProvider; // new LocalDataProvider(false);
      const supercodeGridView = gridVO.view; //// new GridView("realgrid-super");

      supercodeDataProvider.setFields(fields);
      supercodeGridView.setDataSource(supercodeDataProvider);
      supercodeGridView.setColumns(columns);
      supercodeGridView.setCheckBar({exclusive: true});
      supercodeGridView.setDisplayOptions({fitStyle: "fill"});
      supercodeGridView.setEditOptions({
        editable: false,
        updatable: false,
        insertable: false,
        appendable: false
      });
      supercodeGridView.onCellClicked = function (grid, clickData) {
        supercodeGridView.checkAll(false);
        supercodeGridView.checkRow(clickData.dataRow);
      };
    },

    realgridCreatedCallback: function () {
      var me = this;

      me.gridView.onCellClicked = function (grid, clickData) {
        let val = me.dataProvider.getJsonRow(clickData.dataRow);
        me.gridView.checkAll(false);
        me.gridView.checkRow(clickData.dataRow);
        // 실험적인 소스.
        me.selCode = me.emptyMastCode;
        Object.keys(val).forEach(k => me.selCode[k] = val[k]);
      };
    },

    isValidMastCode: function(){
      let me = this;
      let hasError = false;
      me.errors = {};
      if(me.payrollUtil.isEmpty(this.selCode.SUPER_CODE)){
        hasError=true;
        me.errors.SUPER_CODE = '수퍼코드를 선택해 주세요.';
      }
      if(me.payrollUtil.isEmpty(this.selCode.MAST_CODE)){
        hasError=true;
        me.errors.MAST_CODE = '마스터코드를 입력해 주세요.';
      }
      if(me.payrollUtil.isEmpty(this.selCode.CODENAMK)){
        hasError=true;
        me.errors.CODENAMK = '코드이름을 입력해 주세요.';
      }
      if(me.payrollUtil.isEmpty(this.selCode.REAL_CODE)){
        hasError=true;
        me.errors.REAL_CODE = '리얼코드를 입력해 주세요.';
      }
      if(me.payrollUtil.isEmpty(this.selCode.CODENAMEX)){
        hasError=true;
        me.errors.CODENAMEX = '다국어키값을 입력해 주세요.';
      }
      if(hasError){
        return false;
      }
      return true;
    },

    isValidMastCodeDelete: function(){
      let me = this;
      if(me.payrollUtil.isEmpty(this.selCode.SUPER_CODE)){
        me.alert({message: '수퍼코드를 선택해 주세요.'});
        return false;
      }
      if(me.payrollUtil.isEmpty(this.selCode.MAST_CODE)){
        me.alert({message: '마스터코드를 입력해 주세요.'});
        return false;
      }
      return true;
    },

    insertCode: function () {
      let me = this;
      if(!me.isValidMastCode()){
        return;
      }
      me.$httpPost({
        url: '/system/setting/mastcode/insert',
        param: me.selCode,
        callback: function () {
          me.toastSuccessInsert();
          me.loadMasterData();
        }
      });
    },

    updateCode: function () {
      let me = this;
      if(!me.isValidMastCode()){
        return;
      }
      me.$httpPost({
        url: '/system/setting/mastcode/update',
        param: me.selCode,
        callback: function () {
          me.toastSuccessUpdate();
          me.loadMasterData();
        }
      });
    },

    deleteCode: function () {
      let me = this;
      if(!me.isValidMastCodeDelete()){
        return;
      }
      me.confirmDelete(function () {
        me.$httpPost({
          param: me.selCode,
          url: '/system/setting/mastcode/delete',
          callback: function () {
            me.toastSuccessDelete();
            me.loadMasterData();
          }
        });
      });
    },

    resetCode: function(){
      this.selCode = {};
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({domId:'realgrid-code'});
    me.setSupercodeGrid();
  }
}
</script>