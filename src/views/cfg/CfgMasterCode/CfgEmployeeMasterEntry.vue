<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'마스터 관리'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <cfg-mater-code-tab></cfg-mater-code-tab>
      <border-box width="260" v-slot="slotProps">
        <border-box-item title="재직상태" :width="slotProps.width">
          <ui-dropdown :items="formData.WORK_STATUS.items"
                       :value="formData.WORK_STATUS.value"
                       @change="formData.WORK_STATUS.value=$event.value;"
                       :options="{
                                     valueField  : 'REAL_CODE',
                                     labelField  : 'CODE_NAME',
                                     tooltipField: 'CODE_NAME'}"/>
        </border-box-item>
        <border-box-item title="직급" :width="slotProps.width">
          <ui-dropdown :items="formData.RANK_CD.items"
                       :value="formData.RANK_CD.value"
                       @change="formData.RANK_CD.value=$event.value;"
                       :options="{
                                     valueField  : 'REAL_CODE',
                                     labelField  : 'CODE_NAME',
                                     tooltipField: 'CODE_NAME'}"/>
        </border-box-item>
        <border-box-item title="부서" :width="slotProps.width">
          <ui-input :value="formData.EMPDEPT_CD.value"
                    @change="formData.EMPDEPT_CD.value=$event;"/>
        </border-box-item>
        <border-box-item title="로그인 아이디" :width="slotProps.width">
          <ui-input :value="formData.LOGIN_ID.value"
                    @change="formData.LOGIN_ID.value=$event;"/>
        </border-box-item>
        <border-box-item title="이름" :width="slotProps.width">
          <ui-input :value="formData.EMP_NAME.value"
                    @change="formData.EMP_NAME.value=$event;"/>
        </border-box-item>
        <border-box-item title="입사일" :width="slotProps.width" multi>
          <ui-input-date :date="formData.sendDateScope.from"
                         :max-date="formData.sendDateScope.to"
                         :value="formData.sendDateScope.from"
                         @change="formData.sendDateScope.from=$event;" />
          <span>~</span>
          <ui-input-date :date="formData.sendDateScope.to"
                         :min-date="formData.sendDateScope.from"
                         :value="formData.sendDateScope.to"
                         @change="formData.sendDateScope.to=$event;" />
        </border-box-item>
        <border-box-item button>
          <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
            <span>검색</span>
          </button>
        </border-box-item>
      </border-box>
      <div class="row">
        <div id="cfg-emp-master-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import ButtonPanel from "../../../components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  components: {
    CfgMaterCodeTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem
  },
  mixins: [grid],
  data(){
    return {

      formData: {
        EMPDEPT_CD: {
          value: ''
        },
        LOGIN_ID: {
          value: ''
        },
        EMP_NAME: {
          value: ''
        },
        WORK_STATUS: {
          value: 'ALL',
          items: [
            {CODE_NAME: '전체', REAL_CODE: 'ALL'},
            {CODE_NAME: '재직', REAL_CODE: 'INC'},
            {CODE_NAME: '퇴직', REAL_CODE: 'RET'}
          ]
        },
        RANK_CD: {
          value: '',
          items: []
        },
        DATE_STATUS: {
          value: 'ALL',
          items: [
            {CODE_NAME: '전체', REAL_CODE: 'ALL'},
            {CODE_NAME: '선택', REAL_CODE: 'SEL'}
          ]
        },
        EARNER_WORK_SITE: {
          value: '',
          items: []
        },
        EARNER_STATUS: {
          value: '',
          items: []
        },
        sendDateScope: {
          'from': '20201118',
          'to': '20210210'
        },
      },

      columns : [
        { header: 'EID', fieldName: 'EID' ,visible: false },
        { header: '입사일', fieldName: 'JOIN_DATE' ,width: 50 },
        { header: '이름', fieldName: 'EMP_NAM' ,width: 50 },
        { header: '부서', fieldName: 'HRDEPT_NAM' ,width: 50 },
        { header: '직급', fieldName: 'ROLE_NAME' ,width: 50 },
        { header: '국세신고처', fieldName: 'PAY_CODE' ,width: 50 },
        { header: '소득세 원천징수율', fieldName: 'PAY_NAME' ,width: 50 },
        this.getUpdateColumn({ headerText: '급여관련 인사자료 수정', fieldName: 'UPDATE', columnWidth: 50}),

      ],
      fields: [
        { fieldName: 'EID', dataType: 'text' },
        { fieldName: 'JOIN_DATE', dataType: 'text' },
        { fieldName: 'EMP_NAM', dataType: 'text' },
        { fieldName: 'HRDEPT_NAM', dataType: 'text' },
        { fieldName: 'ROLE_NAME', dataType: 'text' },
        { fieldName: 'PAY_CODE', dataType: 'text' },
        { fieldName: 'PAY_NAME', dataType: 'text' },
        { fieldName: 'UPDATE', header: "급여관련 인사자료 수정" },

      ],
      rowAttrs : ['EID','EMP_NAM','JOIN_DATE']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let { data } = await this.$httpPost({
          param:{START_DATE:this.START_DATE},
          url: '/employee/list'}) || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgCode loadGridData err: ", e);
      }
    },
    realgridCreatedCallback() {
      let me = this;

      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);

        if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
          return false;
        if(index.column == "삭제"){
          return true;
        }
        if(index.column == "급여관련 인사자료 수정"){
          me.$store.dispatch(
              'withholding/setDeclarationForm',
              {
                DECLARATION_FORM: _rowData
              });
           me.$router.push({name: 'CfgEmployeeMasterEntryInput'});
          return true;
        }
      }

    },
  },
  name: "CfgEmployeeMasterEntry",
  mounted() {
    this.createRealGrid({'domId': 'cfg-emp-master-grid'});
    this.loadGridData();
  }
}
</script>

<style scoped>

</style>