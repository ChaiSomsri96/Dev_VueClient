<template>
  <base-modal title="세액이력 조회" id="payroll-ledger-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <div class="row mb-10">
        <div class="btn-wrap">
          <button class="btn btn-md flat" @click="downloadRealGridExcel('세액이력 조회');">
            <i class="icon-lineIcon-download mr-5"></i>다운로드
          </button>
        </div>
      </div>
      <div class="row" style="height: 500px;">
        <div id="salary-history-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>창닫기
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';

export default {
  mixins: [modal, grid],
  components: {
    BaseModal
  },
  data() {
    return {
      fields: [],
      columns: [],
    }
  },
  methods: {
    async loadGridData(__param) {
      try {
        let dat1 = String(__param.formData.paymonth).substring(0,4);
        let dat2 = parseInt(String(__param.formData.paymonth).substring(4,6));
        let dat3 = 1;
        let start = "";
        if((dat2-dat3) < 10) {
          let datZero2 = dat2;
          if(datZero2<10) datZero2 = '0'+datZero2;

          start = "";
          if(dat2 <= dat3) {  // 이전개월이 년을 넘어갈 경우는 무조건 1월부터
            start = dat1+"01";
          } else {
            start = dat1+"0"+(dat2-dat3)
          }
        } else {

          start = dat1+(dat2-dat3)
        }
        this.fields = [];
        this.columns = [];

        let { data } = await this.$httpPost({
          url: '/payroll/deduction/tax/history2',
          param: {
            formData: JSON.stringify({
              "PAY_MONTH":__param.formData.paymonth,
              "START_MONTH":start,
              "PREV":"1",
              "PAY_GAAP":"1",
              "WHATDATA":"MON",
              "VIEWTP":"D",
              "EMPTYPE_CD":null,
              "PAYTYPE_CD":null,
              "JOBGROUP_CD":null,
              "MODIFY_TYPE":null,
              "PERSONAL_INFO_MASK":__param.formData.personalInfoMask,
              "RPT_LANG":"KOREAN",
              "EMP_SEL":"ALL"}),
            paycdList:'[]',
            paymonthseqList:'[]',
            eidList: '[]'
          }
        });
        data.sort(function(a, b) { // 오름차순
          return a.EMP_NAME < b.EMP_NAME ? -1 : a.EMP_NAME > b.EMP_NAME ? 1 : 0;
        });
        let fieldList = [];
        let payDateArr = [];
        let tempColumns = Object.assign({}, data[0]);
        for (let i = 0; i < this.columns.length; i++) {
          delete tempColumns[this.columns[i].fieldName];
        }
        $.each(tempColumns, function(key){
          fieldList.push(key);
        });


        // 위치와 개수가 고정된 컬럼은 미리 설정한다.
        // columns 배열에 월별 금액을 제외한 사원과 코드 속성값등 컬럼들을 세팅한다.
        for (let i = 0; i < fieldList.length; i++) {
          let dataIndex = fieldList[i];
          if (dataIndex == "EMP_NAME") {
            this.columns[0] = {
              text: "이름",
              dataIndex: dataIndex,
              fieldName: dataIndex,
              locked: true,
              filterable: true, filter: true, style: 'text-align:center',
              renderer: function (value, metaData, record) {
                if (record.get("TAXITM_CD") == "ZZZ" || record.get("TAXITM_CD") == "") {
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") == "D") {
                    metaData.style = "color:purple;text-align:right;";
                  }
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") != "D") {
                    metaData.style = "color:green;text-align:right;font-weight:bold;";
                  }

                  return value
                } else {
                  return value
                }
              }
            };
            this.fields[0] = {fieldName: dataIndex,dataType: dataIndex};
          } else if (dataIndex == "TAXITM_CD") {
            this.columns[1] = {
              text: "코드",
              dataIndex: dataIndex,
              fieldName: dataIndex,
              width: 60,
              locked: true,
              filterable: true,
              filter: true,
              style: 'text-align:center',
              renderer: function (value, metaData, record) {
                if (value == "ZZZ" || value == "") {
                  value = "";
                  // if (record.get("VIEWTP") == "D") {
                  //     metaData.style = "color:green;text-align:right;font-weight:bold;";
                  // }
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") == "D") {
                    metaData.style = "color:purple;text-align:right;";
                  }
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") != "D") {
                    metaData.style = "color:green;text-align:right;font-weight:bold;";
                  }

                  if (record.get("SORTCODE") == "A") {
                    //resultList[rowIndex].TAXITM_CD = "소계1";
                    return "소계1"
                  } else if (record.get("SORTCODE") == "B") {
                    //resultList[rowIndex].TAXITM_CD = "소계2";
                    return "소계2"
                  } else if (record.get("SORTCODE") == "C") {
                    //resultList[rowIndex].TAXITM_CD = "소계3";
                    return "소계3"
                  } else if (record.get("SORTCODE") == "D") {
                    return ""
                  }
                } else {
                  return value
                }
              }
            };
            this.fields[1] = {fieldName: dataIndex,dataType: dataIndex};
          } else if (dataIndex == "TAX_DSC") {
            this.columns[2] = {
              text: "세목",
              dataIndex: dataIndex,
              fieldName: dataIndex,
              width: 220,
              locked: true,
              filterable: true,
              filter: true,
              style: 'text-align:center',
              renderer: function (value, metaData, record) {
                if (value == null || value == "") {
                  if (record.get("VIEWTP") == "D") {
                    metaData.style = "color:green;text-align:right;font-weight:bold;";
                  }
                } else {
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") == "D") {
                    metaData.style = "color:purple;text-align:right;";
                  }
                  if (record.get("TAXITM_CD") == "ZZZ" && record.get("SORTCODE") != "D") {
                    metaData.style = "color:green;text-align:right;font-weight:bold;";
                  }
                  return value
                }
              }
            };
            this.fields[2] = {fieldName: dataIndex,dataType: dataIndex};
          } else if (dataIndex == "EMP_NUMBER") {
            this.columns[3] = {text: "사번", dataIndex: dataIndex,fieldName: dataIndex, visible: false};
            this.fields[3] = {fieldName: dataIndex,dataType: dataIndex};
          } else if (dataIndex == "SORTCODE") {
            this.columns[4] = {text: "SORT", dataIndex: dataIndex,fieldName: dataIndex, visible: false};
            this.fields[4] = {fieldName: dataIndex,dataType: dataIndex};
          } else if (dataIndex == "VIEWTP") {
            this.columns[5] = {text: "TP", dataIndex: dataIndex,fieldName: dataIndex, visible: false};
            this.fields[5] = {fieldName: dataIndex,dataType: dataIndex};
          }
        }

        // 위에서 고정된 컬럼을 제외한, 컬럼 명이 날짜인 것들의 dataIndex(쿼리에서 리턴되는 필드명)들을 payDateArr 배열에 담는다
        for (let i = 0; i < fieldList.length; i++) {
          let dataIndex = fieldList[i];
          if (dataIndex == "EMP_NAME" || dataIndex == "TAXITM_CD" || dataIndex == "TAX_DSC" || dataIndex == "ENTITY_CODE" || dataIndex == "EID"
              || dataIndex == "EMP_NUMBER" || dataIndex == "SORTCODE" || dataIndex == "VIEWTP") {
            continue;
          } else {
            payDateArr.push(dataIndex);
          }
        }

        // 급여일을 큰 순서대로 sort 한다.
        this.sortPayDate(payDateArr);

        // sort가 끝난 배열을 가지고 각 급여월차수별 금액 컬럼을 세팅한다.
        for (let i = 0; i < payDateArr.length; i++) {
          let text = payDateArr[i],
              dataIndex = payDateArr[i];
          this.columns.push({
            text: text,
            dataIndex: dataIndex,
            fieldName: dataIndex,
            numberFormat: "#,##0", styleName: "right-column",
            footer: {
              text: "0",
              expression: "sum",
              numberFormat: "#,##0",
            },

            renderer: function (value, metaData, record, rowIndex, colIndex) {
              if (record.get("TAXITM_CD") == "ZZZ" || record.get("TAXITM_CD") == "") {
                if (record.get("VIEWTP") == "D") {
                  if (record.get("SORTCODE") == "D") {
                    if (value !== 0) {
                      metaData.style = "color:red;text-align:right;font-weight:bold;";
                    } else {
                      metaData.style = "color:green;text-align:right;font-weight:bold;";
                    }
                  } else {
                    metaData.style = "color:green;text-align:right;font-weight:bold;";
                  }
                }
                return value
              } else {
                if(colIndex == this.columns.length-1){
                  metaData.style = "color:green;text-align:right;font-weight:bold;";
                } else {
                  metaData.style = "color:black;text-align:right;font-weight:normal;";
                }
                return value
              }
            },
          });
          this.fields.push({fieldName: dataIndex,dataType: dataIndex, defaultValue: 0});
        }

        this.setFieldsNColumns();
        this.setRealgridData(data || []);
        // this.gridView.setColumnProperty("202107-3", "footer", {expression: "sum"});
        this.gridView.groupBy(["EMP_NUMBER"]);
      }
      catch(e) {
        console.log("salaryhistoryModal loadGridData error", e);
      }
    },
    sortPayDate: function (payDateArr) {
      let i, j, temp = 0;

      for (i = 0; i < payDateArr.length; i++) {
        for (j = 0; j < payDateArr.length - 1; j++) {
          if (payDateArr[j] < payDateArr[j + 1]) {
            temp = payDateArr[j];
            payDateArr[j] = payDateArr[j + 1];
            payDateArr[j + 1] = temp;
          }
        }
      }
    },
    //modal
    createDynamicComponent() {
      this.createGridFrame({
        'domId': 'salary-history-modal-grid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData(param);
    }
  }
}
</script>