<template>
<div>
    <ui-header :msg="'코드 관리'"/>
    <div class="content-body">
      <cfg-tab></cfg-tab>
      <div>
        <border-box search>
          <border-box-item title="구분">
            <ui-dropdown :items="classification.items"
                                :value="classification.value"
                                @change="classification.value=$event.value; classification.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
          </border-box-item>
          <border-box-item button>
            <button type="button" id="btnSearch" class="btn btn-md line-1" @click="onSearch">
              <span>검색</span>
            </button>
          </border-box-item>
        </border-box>


      </div>
      <div class="row">
        <div class="form-row">
          <button class="btn btn-md flat" @click="addPayCode()"><i class="icon-lineIcon-plus mr-5"></i>급여코드 추가</button>
          <button class="btn btn-md flat" @click="addTaxCode()"><i class="icon-lineIcon-plus mr-5"></i>공제코드 추가</button>
          <button class="btn btn-md flat">표준코드 적용</button>
          <button class="btn btn-md flat" @click="download()"><i class="icon-lineIcon-download mr-5"></i>다운로드</button>
        </div>
      </div>

      <div class="row">
        <div id="cfg-code-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>

      <pay-code-input-modal ref="payCodeInputModal" />
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import PayCodeInputModal from './PayCodeInputModal';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
import CfgTab from './CfgTab';

export default {
  mixins: [grid],
  components: {
    CfgTab,
    BaseTabs,
    BaseTabsItem,
    BorderBox,
    BorderBoxItem,
    PayCodeInputModal
  },
  data() {
    return {
      classification: {
        value: 'all',
        return: null,
        items: [
          { message: '전체', code: 'all' },
          { message: '급여', code: 'pay' },
          { message: '공제', code: 'deduction' },
        ]
      },
      //grid
      columns: [
        { header: '코드', fieldName: 'PAY_CODE' ,width: 50 },
        { header: '코드명', fieldName: 'PAY_NAME',width: 100  },
        { header: '구분', fieldName: 'PAYTAX_FLAG',
          displayCallback: function(grid, index, value) {
            return value == 'PAY' ? "지급" : '공제';
          },width: 75
        },
        { header: '비과세 해당', fieldName: 'RETRO_FLAG',
          displayCallback: function(grid, index, value) {
            return value == 'Y' ? "○" : '';
          },width: 75
        },
        { header: '급여명세서 묶음코드', fieldName: 'PAYRPT_CODE' ,width: 110},
        { header: '퇴직금 계산 포함', fieldName: 'SEVP_FLAG',
          displayCallback: function(grid, index, value) {
            return value == 'N' ? "3개월 평균" : value == 'Z' ? '12개월 평균' : '해당사항 없음';
          },width: 110
        },
        { header: '계산방법', fieldName: 'AUTO_CALC',
          displayCallback: function(grid, index, value) {
            return value == 'A' ? "급여마스터" : value == 'F' ? '계산공식' : value == 'O' ? 'OT계산' : value == 'M' ? '수동작업' : '해당사항 없음';
          },width: 110
        },
        { header: '사용중지', fieldName: 'INACTIVE',width: 70 },
        this.getIconColumn({ headerText: '사용하기', fieldName: 'SETTING',type:'view', columnWidth: 70}),
        this.getUpdateColumn({ headerText: '수정', fieldName: 'UPDATE', columnWidth: 70}),
        this.getDeleteColumn({ headerText: '삭제', fieldName: 'DELETE', columnWidth: 70})
      ],
      fields: [
        { fieldName: 'PAY_CODE', dataType: 'text' },
        { fieldName: 'PAY_NAME', dataType: 'text' },
        { fieldName: 'PAYTAX_FLAG', dataType: 'text' },
        { fieldName: 'RETRO_FLAG', dataType: 'text' },
        { fieldName: 'PAYRPT_CODE', dataType: 'text' },
        { fieldName: 'PAY_FLAG', dataType: 'text' },
        { fieldName: 'SEVP_FLAG', dataType: 'text' },
        { fieldName: 'AUTO_CALC', dataType: 'text' },
        { fieldName: 'INACTIVE', dataType: 'text' },
        { fieldName: 'SETTING', header: "사용하기" },
        { fieldName: 'UPDATE', header: "수정" },
        { fieldName: 'DELETE', header: "삭제" }

      ],
      rowAttrs: ['PAY_CODE', 'PAYTAX_FLAG']
    }
  },
  methods: {
    async loadGridData() {
      try {
        let { data } = await this.$httpGet('/payroll/code/pay-pay/list') || [];
        this.setRealgridData(data);
      }
      catch(e) {
        console.error("CfgCode loadGridData err: ", e);        
      }
    },

    addPayCode() {
      this.$refs.payCodeInputModal.show({PAYTAX_FLAG:'PAY'});
    },
    addTaxCode() {
      this.$refs.payCodeInputModal.show({PAYTAX_FLAG:'TAX'});
    },

    realgridCreatedCallback: function() {
      let me = this;
      this.gridView.onCellItemClicked= function(grid,index,clickData){
        let _rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow);
        if( !(Array.isArray(_rowData) && _rowData.length > 0 ))
          return false;
        if(index.column == "삭제"){
          me.confirm({
            title: '확인',
            message: '정말 삭제하시겠습니까?',
            yesCallback: function() {
              me.$httpPost({
                param: {
                  'formData': JSON.stringify({
                    "PAY_MONTH": _rowData[0].PAY_MONTH,
                    "SEQ": _rowData[0].SEQ,
                    "PAY_DATE": _rowData[0].PAY_DATE
                  })
                },
                url: '/payroll/code/pay-date/delete',
                callback: function() {
                  me.toastSuccessDelete();
                  me.loadGridData();
                }
              });
            }
          });
          return true;
        }
        if(index.column == "수정"){
          me.$refs.payCodeInputModal.show({
            PAY_CODE:_rowData[0].PAY_CODE,
            PAYTAX_FLAG:_rowData[0].PAYTAX_FLAG,
            url:'update'
          });
          return true;
        }
        if(index.column == "사용하기"){
          me.confirm({
            title: '확인',
            message: '사용하시겠습니까?',
            yesCallback: function() {
              //코드 사용하기 로직 추가
            }
          });
          return true;
        }
      }
    },
    download: function() {
      this.downloadRealGridExcel( '급여코드 관리');
    },
    async onSearch() {
      let me = this;
      try {
        let { data } = await this.$httpPost({
          param: {PAYTAX_FLAG: me.classification.value},
          url: '/payroll/code/pay-pay/list'
        });
        this.setRealgridData(data || []);
      }
      catch(e) {
        console.error("CfgCode loadGridData err: ", e);
      }

    },
  },
  mounted() {
    this.createRealGrid({'domId': 'cfg-code-grid'});
    this.loadGridData();
  }
}

</script>
