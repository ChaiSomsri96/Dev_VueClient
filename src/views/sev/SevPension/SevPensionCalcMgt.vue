<template>
  <div>
    <div class="content-header">
      <div class="header-bottom">
        <div class="header-bottom-left">
          <div class="menu-box">
            <div class="menu-item title">
              <div class="menu-item-icon">
                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                  <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                </button>
              </div>
              <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                퇴직연금 계산
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div>
        <div class="box border-box type2">

          <border-box>
            <border-box-item title="기준일" width="200" >
              <ui-input :value="selCode.SEV_DATE"
                             @change="selCode.SEV_DATE=$event;"
                             :options="{readonly: true}"
              />
            </border-box-item>

            <border-box-item title="차수" width="100">
              <ui-input :value="selCode.SEV_PENSION_SEQ"
                        @change="selCode.SEV_PENSION_SEQ=$event;"
                        :options="{readonly: true}"
              />
            </border-box-item>

            <border-box-item title="내부관리 이름" width="500">
              <ui-input :value="selCode.SEV_PENSION_MATTER_NAME"
                        @change="selCode.SEV_PENSION_MATTER_NAME=$event;"
                        :options="{readonly: true}"
              />
            </border-box-item>
          </border-box>
        </div>
        <div class="row">
          <div class="form-row">
            <button-panel btnType='top'>
              <template v-slot:start>
                <button class="btn btn-md mr-5" @click="sevPensionCalc()">
                  <i class="icon-lineIcon-check mr-5"></i>
                  실행
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div>
          <div id="sev-pension-calc-mgt-grid" style="width: 100%; height: 400px" class="realgrid-type-style"/>
        </div>
      </div>
      <!--      <sev-pension-matter-emp-modal ref="SevPensionMatterEmpModal" />-->
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import ButtonPanel from '@/components/common/ButtonPanel';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
// import SevPensionMatterEmpModal from '@/components/retire/SevPensionMatterEmpModal';
import { mapGetters } from 'vuex';

export default {
  components:{
    ButtonPanel,
    BorderBox,
    BorderBoxItem
    // SevPensionMatterEmpModal
  },

  mixins: [grid],
  computed: {
    ...mapGetters({
      SEV_PENSION_MATTER_DATA: 'sevpension/getData'
    })
  },
  data() {
    return {
      EMP_LIST:[],
      selCode:{
        SEV_DATE: '',
        SEV_PENSION_SEQ: '',
        SEV_PENSION_MATTER_NAME: ''
      },

      fields: [
        { fieldName: 'EID', dataType: "text"},
        { fieldName: 'EMP_NUMBER', dataType: "text"},
        { fieldName: 'EMP_NAME', dataType: "text"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'SERVICE_YEAR', dataType: "text"},
        { fieldName: 'HRDEPT_NAMK', dataType: "text"},
        { fieldName: 'RANK_NAME', dataType: "text"},
        { fieldName: 'EMPTYPE_NAME', dataType: "text"},
        { fieldName: 'PAYTYPE_NAME', dataType: "text"},
        { fieldName: 'RETIREBASE_DT', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
      ],
      columns:[
        { fieldName: 'EMP_NUMBER', header: '사번'},
        { fieldName: 'EMP_NAME', header: '성명'},
        { fieldName: 'E_JOIN_DATE', header: '입사일'},
        { fieldName: 'SERVICE_YEAR', header: '근속연수'},
        { fieldName: 'HRDEPT_NAMK', header: '부서'},
        { fieldName: 'RANK_NAME', header: '직급'},
        { fieldName: 'EMPTYPE_NAME', header: '직원구분'},
        { fieldName: 'PAYTYPE_NAME', header: '임금유형'},
        { fieldName: 'RETIREBASE_DT', header: '중간정산일'},
      ],
      rowAttrs: [
        'EID'
      ]
    }
  },

  methods: {
    gotoList() {
      let me = this;
      me.$router.push('/sev/sevpensioncalc');
    },

    validateCheckedStatus(){
      let checkedRows = this.gridView.getCheckedRows();
      if(checkedRows.length < 1) {
        this.toast({message: this.messages['mustAtLeastOneMemberSelect'], type:"error"});
        return false;
      }
      let __checkedData = [];
      for(let i = 0; i < checkedRows.length; i ++) {
        let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);
        __checkedData.push({'EID': _rowData[0]['EID']});
      }
      this.EMP_LIST = Object.freeze(__checkedData);
      return true;
    },

    async sevPensionCalc(){
      let me = this;
      let searchMap= {
        SEV_DATE: me.SEV_PENSION_MATTER_DATA.SEV_DATE,
        SEV_PENSION_SEQ: me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ,
        SEV_CONTROL_NO: me.SEV_PENSION_MATTER_DATA.SEV_CONTROL_NO
      }
      if(!me.validateCheckedStatus()) {
        return false;
      }
      try {
        let {data} = await me.$httpPost({
          param: {
            'formData': JSON.stringify({
              'SEV_DATE': me.SEV_PENSION_MATTER_DATA.SEV_DATE,
              'SEV_PENSION_SEQ': String( me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ),
              'SEV_CONTROL_NO': me.SEV_PENSION_MATTER_DATA.SEV_CONTROL_NO,
              'RETIRE_TYPE': 'P'
            }),
            'eidList': JSON.stringify( me.EMP_LIST)
          },
          url: '/payroll/multiretirement/multi-retirepension/new-list'
        });

        me.$store.dispatch(
            'sevpayentry/resetPayCalcData'
        );

        me.$store.dispatch(
            'sevpayentry/setSevPayCalcData',
            {
              AVG: data[0].AVG,
              CAL: data[0].CAL,
              SET: data[0].SET,
              TEN: data[0].TEN,
              BONUS: data[0].BONUS
            });
        this.$router.push({name: 'SevPensionCalcResultAvg'});

      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    deleteCode: function(){

    },

    addEmp: function(){
      console.log( 'AAA');
    },

    loadEmpList: function(){

    },

    async loadGridData() {
      let me = this;
      try {
        let {data} = await me.$httpPost({
          param: { SEV_DATE: me.SEV_PENSION_MATTER_DATA.SEV_DATE, SEV_PENSION_SEQ: me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ, RETIRE_TYPE: 'P'},
          url: '/payroll/retirement/sev-pension/calc-list'
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("AnnualSalary loadGridData err: ", e);
      }
    },

    setData() {
      let me = this;
      me.selCode.SEV_DATE = me.SEV_PENSION_MATTER_DATA.SEV_DATE;
      me.selCode.SEV_PENSION_SEQ = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ;
      me.selCode.SEV_PENSION_MATTER_NAME = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_MATTER_NAME;
    }

  },

  mounted() {
    let me = this;
    me.setData();
    me.createRealGrid({
      domId: 'sev-pension-calc-mgt-grid',
      'checkbar': 'multi',
      editable: false
    });
    me.loadGridData();
  }
}
</script>
