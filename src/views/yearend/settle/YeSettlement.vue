<template>
  <div>
    <ui-header :msg="'연말정산 실행'"/>
    <div class="content-body">
      <border-box width="180" v-slot="slotProps">
        <border-box-item title="연도" :width="slotProps.width">
          <input type="text" class="form-control" v-model="attYear" readonly>
        </border-box-item>
        <border-box-item title="대상" :width="slotProps.width">
          <ui-dropdown :items="qrySettleType.items"
                       :value="qrySettleType.value"
                       @change="qrySettleType.value=$event.value; qrySettleType.return=$event;"
                       :options="{
                                valueField  : 'code',
                                labelField  : 'message',
                                tooltipField: 'message'
                            }"/>
        </border-box-item>
        <border-box-item button>
          <button type="button" class="btn btn-md flat" @click="onSearch">
            <span>검색</span>
          </button>
        </border-box-item>
      </border-box>
      <button-panel btn-type="top">
        <template v-slot:start>
          <button class="btn btn-md flat"><i class="icon-lineIcon-check mr-5"></i>
            간소화 Zip 파일 업로드
          </button>
          <button class="btn btn-md flat"><i class="icon-lineIcon-check mr-5"></i>
            소득공제신고서 조회
          </button>
          <button class="btn btn-md flat"><i class="icon-lineIcon-check mr-5"></i>
            근로소득원천징수영수증 조회
          </button>
          <button class="btn btn-md flat" @click="end(false, 'CLOSED')"><i class="icon-lineIcon-check mr-5"></i>
            마감
          </button>
          <button class="btn btn-md flat" @click="end(true, 'CLOSED')"><i class="icon-lineIcon-check mr-5"></i>
            마감해제
          </button>
          <button class="btn btn-md flat" @click="end(false, 'DRAFT')"><i class="icon-lineIcon-check mr-5"></i>
            Draft 표시
          </button>
          <button class="btn btn-md flat" @click="end(true, 'DRAFT')"><i class="icon-lineIcon-check mr-5"></i>
            Draft 해제
          </button>
        </template>
      </button-panel>
      <div>
        <div id="yearend-settle-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
import ButtonPanel from "../../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    BorderBox,
    BorderBoxItem
  },
  data() {
    return {
      editUrl: '/yearend/yesettlebase',
      attYear: '',
      qrySettleType: {
        value: 'ALL',
        return: null,
        items: [
          {message: '전체', code: 'ALL'},
          {message: '재직자', code: 'YEAREND'},
          {message: '퇴직자', code: 'SEV'}
        ]
      },
      //grid
      fields: [
        {fieldName: 'EMP_NAME', dataType: 'text'},
        {fieldName: 'HRDEPT_NAMK', dataType: 'text'},
        {fieldName: 'YE_PROGRESS', dataType: 'text'},
        {fieldName: 'DRAFT_YES', dataType: 'text'},
        {fieldName: 'WORK_TIME', dataType: "datetime"},
        {fieldName: "METHOD", dataType: 'text'}
      ],
      columns: [
        {fieldName: 'EMP_NAME', header: '성명', width: 75,
          /*columnType: {
            type: 'popup',
            options: {
              url: 'http://127.0.0.1:5500/test/{{value}}/ewrwrwerewr/wrerw',
              linkField: 'EMP_NAME'
            },
          }*/
        },
        {fieldName: 'HRDEPT_NAMK', header: '부서', width: 75},
        {fieldName: 'YE_PROGRESS', header: '진행단계', width: 75},
        {fieldName: 'DRAFT_YES', header: 'Draft', width: 50,
          renderer: {
            type: "html",
            callback: function(grid, cell, w, h) {
              if(cell.value == 'Y'){
                return 'Y';
              }
              return '';
            }
          }
        },
        {fieldName: 'WORK_TIME', header: '최종작업일', width: 90 },
        this.getUpdateColumn({headerText: '정산', fieldName: 'METHOD', columnWidth: 100})
      ],
      rowAttrs: ['EID', 'EMP_NUMBER', 'PAYDAY', 'YE_PROGRESS'],
    }
  },
  methods: {
    async asyncData() {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/setting/settle/incumbent/open-year',
          param: {dummy: 'Y'}
        });
        this.attYear = data.msg;
        // await this.$store.dispatch('/yearend/setAttYear', this.attYear);
      } catch (e) {
        console.error("YeSettlement asyncData error: ", e);
      }
    },
    async loadGridData() {
      try {
        let {data} = await this.$httpGet('/year-end/admin/deduction/mass-emp/status', {
          ATT_YEAR: this.attYear
        }) || [];
        this.setRealgridData(data);
      } catch (e) {
        console.error("YeSettle loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.setStateBar({
        visible: false
      });
    },
    onSearch() {
      this.loadGridData();
    },
    async end(release = false, step) {  // 마감  false , 마감해제 true
      try {
        let checkedRows = this.gridView.getCheckedRows();
        if (checkedRows.length < 1) {
          this.toastAlertSelect()
          return;
        }
        let eidList = [];
        for (let i = 0; i < checkedRows.length; i++) {
          let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
          eidList.push({'EID': _rowData[0]['EID']});
        }
        let _param = {
          "ATT_YEAR": this.attYear,
          "CURRENT_STEP": step,
          "EID_LIST": JSON.stringify(eidList)
        };
        if (step == 'DRAFT') {
          _param['DRAFT_YES'] = (release ? 'N' : 'Y');
        } else {
          _param['CLOSE_YN'] = (release ? 'N' : 'Y');
        }
        await this.$httpPost({
          url: (step == 'DRAFT' ? '/year-end/admin/deduction/mass-emp/draft' : '/year-end/admin/deduction/mass-emp/closing'),
          param: _param
        });
        this.toastSuccessModify();
        await this.loadGridData();
      } catch (e) {
        console.error("YeSettleGrid end error: ", e);
      }
    },
    realgridCreatedCallback: function () {
      let me = this;
      let val;
      let data;

      me.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == "METHOD") {
          val = me.dataProvider.getJsonRow(clickData.dataRow);
          data = val['ROW_ATTRS'];
          me.$store.dispatch(
              'yearend/setEmployee',
              {
                EID: data['EID'],
                EMP_NUMBER: data['EMP_NUMBER'],
                EMP_NAME: val['EMP_NAME'],
                PAYDAY: data['PAYDAY']
              });
          me.$router.push({name: me.getYearEndPathName(data['YE_PROGRESS'])});
        }
      };
    }
  },
  async mounted() {
    // try {
      let me = this;
      this.columns[2]['type'] = this.columns[4]['type'] = 'data';
      this.columns[2]['renderer'] = {
        type: "html",
        callback: function (grid, cell, w, h) {
          return me.getYeProgressText(cell.value);
        }
      };
      this.columns[4]['renderer'] = {
        type: "html",
        callback: function (grid, cell, w, h) {
          return me.getDateFromTimeStamp(cell.value);
        }
      };
      this.createRealGrid({'domId': 'yearend-settle-grid', 'checkbar': 'multi'});
      await this.asyncData();
      await this.loadGridData();
    // } catch (e) {
    //   console.error("YeSettlement mount err: ", e);
    // }
  },
}
</script>