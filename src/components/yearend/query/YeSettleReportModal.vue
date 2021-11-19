<template>
  <base-modal :title="title" id="ye-settle-report-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row" style="height: 500px;">
        <div id="ye-settle-report-modal-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>창닫기
        </button>
        <button class="btn btn-md black" @click="downloadRealGridExcel(title);">
          <i class="icon-lineIcon-del mr-5"></i>다운로드
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import gridData from '@/utils/yeReportGridData';

export default {
  mixins: [modal, grid],
  components: {
    BaseModal
  },
  data() {
    return {
      fields: [],
      columns: [],
      layout: [],
      title: ''
    }
  },
  methods: {
    createFieldsAndColumns(data) {
      let _keys = Object.keys(data[0]).sort();
      for (let i = 0; i < _keys.length; i++) {
        if (_keys[i].indexOf('-') >= 0) {
          this.fields.push({
            fieldName: _keys[i],
            dataType: 'number'
          });
          this.columns.push({
            header: _keys[i].split('-')[0],
            fieldName: _keys[i],
            numberFormat: "#,##0",
            footer: {
              text: "0",
              expression: "sum",
              numberFormat: "#,##0",
            },
            styleName: "right-column"
          });
          this.layout.push({
            name: _keys[i].split('-')[0] + "Group",
            direction: "horizontal",
            items: [
              _keys[i]
            ],
            header: {
              text: _keys[i].split('-')[1],
            }
          });
        }
      }
    },
    async loadGridData(param) {
      try {
        let {
          data
        } = await this.$httpPost({
          url: '/yearend/receiptincometax/incometaxqry/list',
          param: {
            'formData': JSON.stringify(
                {
                  "YE_YEAR": param['yeYear'],
                  "REPORT_TYPE": param['reportType'],
                  "RPT_LANG": "KOREAN",
                  "OTH_UPLOAD": "YES",
                  "NTS_MANUAL": "YES",
                  "OTH_MANUAL": "YES",
                  "SORTBY": "PIN",
                  "EMP_SEL": "SELECT"
                }),
            'eidList': JSON.stringify(param['eidList'])
          }
        });

        if (gridData[param['reportType']]['dynamic'] && data.length > 0) {
          this.createFieldsAndColumns(data);
          this.setFieldsNColumns();
        }
        if(gridData[param['reportType']]['hideFooter']){
          this.gridView.setFooters({visible: false});
        }else{
          this.gridView.setFooters({visible: true});
        }

        if (gridData[param['reportType']]['groupByEmp']) {
          this.gridView.groupPanel.visible = true;
          this.gridView.groupBy(["EMP_NAM"]);
          this.gridView.setRowGroup({
            mergeMode: true,
            expandedAdornments: 'none'
          });
        } else {
          this.gridView.groupPanel.visible = false;
          this.gridView.setRowGroup({
            mergeMode: false
          });
        }

        this.setRealgridData(data || []);
      } catch (e) {
        console.log("YeSettleReportModal loadGridData error", e);
      }
    },
    // modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'ye-settle-report-modal-grid'
      });
      this.gridView.setStateBar({
        visible: false
      });
    },
    asyncDynamicComponentData(param) {
      this.fields = [];
      this.columns = [];
      this.layout = [];
      this.title = param['title'];

      //initialize
      for (let i = 0; i < gridData[param['reportType']]['fields'].length; i++) {
        this.fields.push(gridData[param['reportType']]['fields'][i]);
      }

      for (let i = 0; i < gridData[param['reportType']]['columns'].length; i++) {
        this.columns.push(gridData[param['reportType']]['columns'][i]);
      }

      for (let i = 0; i < this.columns.length; i++) {
        this.layout.push(this.columns[i]['fieldName']);
      }

      if (!gridData[param['reportType']]['dynamic']) {
        this.setFieldsNColumns();
        this.gridView.setFixedOptions({
          colCount: 0
        });
        this.gridView.header.height = 35;
      } else {
        this.gridView.setFixedOptions({
          colCount: this.columns.length
        });
        this.gridView.header.heights = [50, 35]
      }
      this.loadGridData(param);
    }
  }
}
</script>

