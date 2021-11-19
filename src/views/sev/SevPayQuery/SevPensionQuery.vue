<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'계산내역 조회'"/>
    <!-- Body 영역 -->
    <div class="content-body">
      <sev-pay-query-tab></sev-pay-query-tab>
      <border-box width="170" v-slot="slotProps">
        <border-box-item title="기준일" multi :width="slotProps.width">
          <ui-input-date :date="sendDateScope.from"
                         :max-date="sendDateScope.to"
                         :value="sendDateScope.from"
                         @change="sendDateScope.from=$event;" />
          <span>~</span>
          <ui-input-date :date="sendDateScope.to"
                         :min-date="sendDateScope.from"
                         :value="sendDateScope.to"
                         @change="sendDateScope.to=$event;" />
        </border-box-item>
        <border-box-item button>
          <button type="button" id="btnSearch" class="btn btn-md line-1"
                  @click="loadGridData()">
            <span>검색</span>
          </button>
        </border-box-item>
      </border-box>
      <div class="row">
        <div class="form-row">
          <button-panel btnType='top'>
            <template v-slot:start>
              <button class="btn btn-md mr-5" @click="searchSevPensionCalc()">
                <i class="icon-lineIcon-check mr-5"></i>
                퇴직연금 계산내역 조회
              </button>
            </template>
          </button-panel>
        </div>
      </div>
      <div>
        <div id="sev-pension-query-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SevPayQueryTab from "./SevPayQueryTab";
import ButtonPanel from "@/components/common/ButtonPanel";
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  components: {
    SevPayQueryTab,
    ButtonPanel,
    BorderBox,
    BorderBoxItem
  },
  mixins: [grid],
  data(){
    return {
      sendDateScope:{
        from: '20210430',
        to: '20211231'
      },
      fields:[
        { fieldName: 'SEV_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_PENSION_SEQ', dataType: "number"},
        { fieldName: 'EMP_NAME', dataType: "text"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: "text"},
        { fieldName: 'HRDEPT_NAMK', dataType: "text"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime", datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SEV_RPEN_FINAL_AMT', dataType: "number"},
        { fieldName: 'SEV_SAVE_DATE', dataType: "datetime", datetimeFormat: "yyyyMMdd"}
      ],
      columns:[
        { fieldName: 'SEV_DATE', header: '기준일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_PENSION_SEQ', header: '차수', styleName: 'right-column', numberFormat: '#,##0'},
        { fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SERVICE_YEAR', header: '근속연수', styleName: 'left-column'},
        { fieldName: 'HRDEPT_NAMK', header: '부서', styleName: 'left-column'},
        { fieldName: 'RETIREBASE_DT', header: '중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_RPEN_FINAL_AMT', header: '퇴직연금 계산액', numberFormat: '#,##0', styleName: 'right-column',
          footer: {
            text: '0',
            expression: 'sum',
            numberFormat: '#,##0',
          }
        },
        { fieldName: 'SEV_SAVE_DATE', header: '퇴직연금 적립대장기록일', datetimeFormat: 'yyyy.MM.dd'}
      ],
      rowAttrs: [ 'EID', 'SEV_DATE', 'SEV_PENSION_SEQ']
    }
  },
  methods: {
    async loadGridData() {
      let me = this;
      let sDate = me.sendDateScope.from;

      try {
        let {data} = await me.$httpPost({
          param: { SEV_DATE: sDate, SEV_PENSION_SEQ: 4, RETIRE_TYPE: 'P', DELETE_LIST: 'Y'},
          url: '/payroll/retirement/sev-pension/calc-list'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    async searchSevPensionCalc() {
      let me = this;
      let checkedRows = me.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: me.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({EID: _rowData[0].EID, SEV_DATE: _rowData[0].SEV_DATE, SEV_PENSION_SEQ: _rowData[0].SEV_PENSION_SEQ});
      }

      // console.log( __checkedData[0].SEV_DATE);
      // debugger
      let formData= {
        SEV_DATE: __checkedData[0].SEV_DATE,
        SEV_PENSION_SEQ: __checkedData[0].SEV_PENSION_SEQ,
        RETIRE_TYPE: 'P',
        PAGE_TYPE: 'S'
      }
      try {
        let {data} = await me.$httpPost({
          url: '/payroll/multiretirement/multi-retirepesion/new-list-search',
          param: {
            formData: JSON.stringify( formData),
            eidList: JSON.stringify( __checkedData)
          }
        });
        me.$store.dispatch(
            'sevpayentry/resetPayCalcData'
        );

        me.$store.dispatch(
        'sevpayentry/setSevPayCalcData',
        {
          AVG: data[0].AVG,
          BEP: data[0].BEP,
          PEN: data[0].PEN,
          RATE: data[0].RATE,
          SET: data[0].SET
        });
        this.$router.push({name: 'SevPensionQueryAvg'});
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    }
  },

  mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-query-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>
