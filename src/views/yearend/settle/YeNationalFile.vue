<template>
  <div class="row">
    <comment-box
        :list="[{'text': '* 본 탭에서 국세청 연말정산 간소화 파일을 업로드 할수 있습니다.'},
                {'text': '* 국세청 연말정산 간소화파일은 암호가 걸리지 않은 일괄 파일이어야 합니다.', 'color': 'red'},
                {'text': '* 업로딩 파일이름에는 [사원의 주민번호상 생년월일 6자리]가 포함되어 있어야 합니다.\xa0\xa0 파일이름 예시) 홍길동(750101)-2020년자료.pdf', 'color': 'red'},
                {'text': '* 당해년도 근무기간과 국세청 간소화파일 선택월수가 다르면 에러가 발생하며, 간소화 파일이 등록되지 않습니다.', 'color': 'red'},]"
    />
    <div class="row mt-20">
      <input id="file" ref="file" type="file" style="display:none;" @change="handleFileUpload()"/>
      <button type="button" class="btn btn-md line-1 mr-10" @click="registerFile()">
        <i class="icon-lineIcon-upload mr-5"></i>
        <span>간소화 파일 등록</span>
      </button>
      <button type="button" class="btn btn-md line-1 mr-10" @click="downloadFile()">
        <i class="icon-lineIcon-download mr-5"></i>
        <span>간소화 파일 다운로드</span>
      </button>
      <button type="button" class="btn btn-md line-1 mr-10" @click="loadNtsGridData()">
        <i class="icon-lineIcon-search mr-5"></i>
        <span>간소화 파일 자료조회</span>
      </button>
    </div>
    <div v-for="(item, index) in arrGridInfo">
      <div class="mt-20">
        <h3 v-if="displayGrid">{{ item.title }}</h3>
        <div>
          <div :id="item.code" :name="item.code" :ref="item.code" :style="{ height: item.height + 'px' }"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import YeNationalFileGrid from '@/components/yearend/settle/modals/ye_national_file/YeNationalFileGrid';
import CommentBox from '@/components/common/CommentBox';

import {mapGetters} from 'vuex';

export default {
  mixins: [grid],
  components: {
    YeNationalFileGrid,
    CommentBox
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    return {
      displayGrid: false,
      arrGridInfo: [
        {
          code: 'NATIONALTAX_A102', title: '보장성 보험, 장애인전용보장성보험', height: 300,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'INSU1_NM', header: '주피보험자'},
            {fieldName: 'NAME', header: '계약자'},
            {fieldName: 'SUM', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_B101Y', title: '의료비', height: 300,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {fieldName: 'SUM', header: '금액', isFieldOnly: true},
            {fieldName: 'DAT_CD', header: '종류', isFieldOnly: true},
            {
              fieldName: 'DAT_CD_TYPE', header: '종류',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("DAT_CD")];
                if (!val) {
                  return '';
                }
                switch (val) {
                  case 'G0003':
                    return '의료비';
                  case 'G0025':
                    return '의료기기 구입비용';
                  case 'G0026':
                    return '안경 또는 콘택트렌즈 구입비용';
                  case 'G0027':
                    return '보청기 또는 장애인 보장구 구입비용';
                  case 'G0034':
                    return '산후조리원비용';
                  case 'G0040':
                    return '실손보험-배제액';
                }
              }
            },
            {
              fieldName: 'MEDI_SUM', header: '의료비 금액', dataType: 'number',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let code = values[fieldNames.indexOf("DAT_CD")];
                console.log(fieldNames.indexOf("DAT_CD"));
                console.log(values[fieldNames.indexOf("DAT_CD")]);
                if (code && code !== 'G0040') {
                  return values[fieldNames.indexOf("SUM")];
                }
              }
            },
            {
              fieldName: 'REFUTE_SUM', header: '실손보험 금액', dataType: 'number',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let code = values[fieldNames.indexOf("DAT_CD")];
                if (code && code === 'G0040') {
                  return values[fieldNames.indexOf("SUM")];
                }
              }
            }
          ]
        },
        {
          code: 'NATIONALTAX_C101', title: '교육비', height: 200,
        },
        {
          code: 'NATIONALTAX_C202', title: '직업훈련비', height: 200,
        },
        {
          code: 'NATIONALTAX_C301', title: '교복구입비', height: 200,
        },
        {
          code: 'NATIONALTAX_D101', title: '개인연금저축', height: 200,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {
              fieldName: 'START_DT', header: '계약시작일',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("START_DT")];
                if (val && val.length == 8) {
                  return val.substring(0, 4) + '.' + val.substring(4, 6) + "." + val.substring(6, 8);
                }

                return val;
              }
            },
            {fieldName: 'SUM', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_E102', title: '연금저축', height: 200,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {fieldName: 'DDCT_BS_ASS_AMT', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_F102', title: '퇴직연금', height: 200,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {fieldName: 'DDCT_BS_ASS_AMT', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_G108', title: '신용카드', height: 300,
          columns: [
            {fieldName: 'NAME', header: '이름'},
            {
              fieldName: 'FORM_CD', header: '구분',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("FORM_CD")];
                if (!val) {
                  return '';
                }
                switch (val) {
                  case 'G108M':
                    return '신용카드';
                  case 'G208M':
                    return '현금';
                  case 'G308M':
                    return '직불카드';
                  case 'G408M':
                    return '제로페이';
                }
              }
            },
            {fieldName: 'GNRL_SUM', header: '일반합계', dataType: 'number'},
            {fieldName: 'TDMR_SUM', header: '전통시장합계', dataType: 'number'},
            {fieldName: 'TRP_SUM', header: '대중교통합계', dataType: 'number'},
            {fieldName: 'ISLD_SUM', header: '도서공연등합계', dataType: 'number'},
            {fieldName: 'TOT_SUM', header: '총합계', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_J101', title: '주택임차차입금 원리금상환액', height: 200,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {
              fieldName: 'LEND_DT', header: '가입일자',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("LEND_DT")];
                if (val && val.length == 8) {
                  return val.substring(0, 4) + '.' + val.substring(4, 6) + "." + val.substring(6, 8);
                }

                return val;
              }
            },
            {fieldName: 'SUM', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_J203', title: '장기주택저당차입금 이자상환액', height: 200
        },
        {
          code: 'NATIONALTAX_J301', title: '주택마련저축', height: 200,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {
              fieldName: 'REG_DT', header: '가입일자',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("REG_DT")];
                if (val && val.length == 8) {
                  return val.substring(0, 4) + '.' + val.substring(4, 6) + "." + val.substring(6, 8);
                }

                return val;
              }
            },
            {fieldName: 'SUM', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_J401', title: '목돈 안드는 전세 이자상환액', height: 200
        },
        {
          code: 'NATIONALTAX_K101', title: '소기업소상공인 공제부금', height: 200
        },
        {
          code: 'NATIONALTAX_L102Y', title: '기부금', height: 300,
          columns: [
            {fieldName: 'BUSNID', header: '사업자번호'},
            {fieldName: 'TRADE_NM', header: '상호'},
            {fieldName: 'NAME', header: '이름'},
            {
              fieldName: 'DONATION_CD', header: '기부유형',
              valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("DONATION_CD")];
                if (!val) {
                  return '';
                }
                switch (val) {
                  case '10':
                    return '법정기부금';
                  case '20':
                    return '정치자금 기부금';
                  case '40':
                    return '종교단체외 지정기부금';
                  case '41':
                    return '종교단체 지정기부금';
                  case '42':
                    return '우리사주조합 기부금';
                  case '50':
                    return '기타기부금(불공제)';
                }
              }
            },
            {fieldName: 'SUM', header: '금액', dataType: 'number'}
          ]
        },
        {
          code: 'NATIONALTAX_N101A', title: '장기집합투자증권저축', height: 200
        },
        {
          code: 'NATIONALTAX_N101B', title: '벤처기업투자신탁', height: 200
        },
        {
          code: 'NATIONALTAX_O101', title: '건강보험료', height: 200
        },
        {
          code: 'NATIONALTAX_P101', title: '국민연금보험료', height: 200
        },
        {
          code: 'NATIONALTAX_MRENT', title: '주택자금 - 월세액', height: 200,
          columns: [
            {header: "#{key_rentername}", fieldName: "RENTER_NAME"},
            {header: "#{key_rentstart}", fieldName: "RENT_START"},
            {header: "#{key_rentend}", fieldName: "RENT_END"},
            {header: "#{key_annualrent}", fieldName: "ANNUAL_RENT", dataType: 'number'}
          ]
        }
      ],
      gridColumnDefault: [
        {fieldName: 'BUSNID', header: '사업자번호', styleName: 'left-column'},
        {fieldName: 'TRADE_NM', header: '상호', styleName: 'left-column'},
        {fieldName: 'NAME', header: '이름', styleName: 'left-column'},
        {
          fieldName: 'SUM', header: '금액', styleName: 'right-column',
          numberFormat: "#,##0", nanText: '0',
          footer: {header: "0", expression: "sum", numberFormat: "#,##0"}
        }
      ],
      gridFieldsDefault: [
        {fieldName: 'BUSNID', header: '사업자번호'},
        {fieldName: 'TRADE_NM', header: '상호'},
        {fieldName: 'NAME', header: '이름'},
        {fieldName: 'SUM', header: '금액', dataType: 'number'}
      ],
      fields: null,
      columns: null
    }
  },
  methods: {
    addRealGridOption() {
      this.gridView.setStateBar({
        visible: false
      });
    },
    makeColumns(columns) {
      let newCols = [];
      columns.forEach(c => {
        let fd = {
          fieldName: c.fieldName,
          header: c.header,
          dataType: c.dataType === 'number' ? 'number' : 'text',
          styleName: c.dataType === 'number' ? 'right-column' : 'left-column',
          visible: c.isFieldOnly ? false : true
        };
        if (c.valueCallback) {
          fd['valueCallback'] = c.valueCallback;
        }
        if (c.dataType === 'number') {
          fd['numberFormat'] = "#,##0";
          fd['footer'] = {header: "0", expression: "sum", numberFormat: "#,##0"};
          fd['nanText'] = '0';
        }
        newCols.push(fd);
      })
      return newCols;
    },
    setGridColumnInfo(gridInfo) {
      let me = this;
      let cols;
      if (gridInfo.columns) {
        cols = me.makeColumns(gridInfo.columns);
        me.columns = cols;
        me.fields = cols;
      } else {
        me.columns = me.gridColumnDefault;
        me.fields = me.gridFieldsDefault;
      }
    },
    async loadNtsGridData() {
      let me = this;
      let {data} = await this.$httpPost({
        url: '/year-end/employee/deduction/request/next-step-data',
        param: {
          'EID': this.eid,
          'ATT_YEAR': this.attYear,
          'CURRENT_STEP': 'NTS_FILE',
          'PAYDAY': this.payday
        }
      });
      me.arrGridInfo.forEach(info => {
        if (!me.displayGrid) {
          me.createGridFrame({domId: info.code});
        }
        me.setGridColumnInfo(info);
        me.setFieldsNColumns();
        me.setRealgridData(data[info.code] || []);
      });
      me.displayGrid = true;
    },
    //간소화 파일 등록
    registerFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      let me = this;
      let file = this.$refs.file.files[0];
      this.$httpPostFile({
        url: "/year-end/employee/upload-simple",
        param: {
          "ATT_YEAR": this.attYear,
          "CURRENT_STEP": 'NTS_FILE',
          "IS": this.eid,
          "EID": this.eid,
          "UP_FILE": file
        },
        callback: function () {
          me.toastSuccessFileUpload();
        }
      });
    },
    //간소화 파일 다운로드
    async downloadFile() {
      try {
        let {data} = await this.$httpPost({
          url: 'http://waltz.tx2.kr/file/download/10000006_1622001798615',
          param: {},
          blob: true
        });
        this.downloadPdf(data, "간소화파일.pdf");
      } catch (e) {
        console.log("YeNationalFile downloadFile: ", e);
      }
    }
  },
  mounted() {
    // 데이터가 많을 수 있다. 처음부터 불러오지 않는다.
    // this.asyncData();
  }
}
</script>