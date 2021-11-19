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
                내부관리 입력
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="row mb-20" style="height: 400px;">

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>퇴직연금 계산 기준일</span>
          </label>
          <div class="row col-2">
            <ui-input-date :date="selCode.SEV_DATE"
                           @change="selCode.SEV_DATE=$event; selCode.SEV_DATE=$event;"
                           :options="{readonly: readonlyCheck}"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>차수</span>
          </label>
          <div class="row col-2">
            <ui-input-number :value="selCode.SEV_PENSION_SEQ" @change="selCode.SEV_PENSION_SEQ=$event; selCode.SEV_PENSION_SEQ=$event;" :options="{readonly: readonlyCheck}"/>
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>내부관리 이름</span>
          </label>
          <div class="row col-2">
            <ui-input :value="selCode.SEV_PENSION_MATTER_NAME" @change="selCode.SEV_PENSION_MATTER_NAME=$event; selCode.SEV_PENSION_MATTER_NAME=$event;"/>
          </div>
          <label class="form-label type2 col-2">
            <span>계산식 관리번호</span>
          </label>
          <div class="row col-2">
            <ui-dropdown :items="selCode.SEV_CONTROL_NO.items"
                         :value="selCode.SEV_CONTROL_NO.value"
                         @change="selCode.SEV_CONTROL_NO.value=$event.value;selCode.SEV_CONTROL_TITLE=$event['label']"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>계산기간</span>
          </label>
          <div class="col-2">
            <ui-input-date :date="selCode.SEV_PENSION_START"
                           @change="selCode.SEV_PENSION_START=$event; selCode.SEV_PENSION_START=$event;"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>~</span>
          </label>
          <div class="col-2">
            <ui-input-date :date="selCode.SEV_PENSION_END"
                           @change="selCode.SEV_PENSION_END=$event; selCode.SEV_PENSION_END=$event;"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>기간적용 방법</span>
          </label>
          <div class="row col-2">
            <ui-dropdown :items="selCode.PERIOD_BASIS.items"
                         :value="selCode.PERIOD_BASIS.value"
                         @change="selCode.PERIOD_BASIS.value=$event.value; selCode.SEV_CONTROL_NO.return=$event"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message', setAll: true,}"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>기간적용 월/일</span>
          </label>
          <div class="row col-2">
            <ui-input-number :value="selCode.PERIOD_SIZE" @change="selCode.PERIOD_SIZE=$event; selCode.PERIOD_SIZE=$event;"/>
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>최종 3개월 급여기간</span>
          </label>
          <div class="row col-2">
            <ui-input-date :date="selCode.FINAL_SAL_FROM"
                           @change="selCode.FINAL_SAL_FROM=$event; selCode.FINAL_SAL_FROM=$event;"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>~</span>
          </label>
          <div class="row col-2">
            <ui-input-date :date="selCode.FINAL_SAL_TL"
                           @change="selCode.FINAL_SAL_TL=$event; selCode.FINAL_SAL_TL=$event;"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>최종 12개월 급여기간</span>
          </label>
          <div class="row col-2">
            <ui-input-date :date="selCode.FINAL_BONUS_FROM"
                           @change="selCode.FINAL_BONUS_FROM=$event; selCode.FINAL_BONUS_FROM=$event;"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>~</span>
          </label>
          <div class="row col-2">
            <ui-input-date :date="selCode.FINAL_BONUS_TO"
                           @change="selCode.FINAL_BONUS_TO=$event; selCode.FINAL_BONUS_TO=$event;"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>퇴직금 끝전처리</span>
          </label>
          <div class="row col-2">
            <ui-dropdown :items="selCode.LAST_DIGIT_FLAG.items"
                         :value="selCode.LAST_DIGIT_FLAG.value"
                         @change="selCode.LAST_DIGIT_FLAG.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
            />
          </div>
          <label class="form-label type2 col-2">
            <span>상태</span>
          </label>
          <div class="row col-2">
            <ui-dropdown :items="selCode.SEV_MATTER_FLAG.items"
                         :value="selCode.SEV_MATTER_FLAG.value"
                         @change="selCode.SEV_MATTER_FLAG.value=$event.value;"
                         :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="form-label type2 col-2">
            <span>비고</span>
          </label>
          <div class="row col-6">
            <ui-input :value="selCode.SEV_PENSION_MATTER_NOTE" @change="selCode.SEV_PENSION_MATTER_NOTE=$event; selCode.SEV_PENSION_MATTER_NOTE=$event;"/>
          </div>
        </div>

        <div class="row col-12 align-center mt-20" v-if="SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ == ''">
            <button type="button" class="btn btn-lg flat"><i class="icon-lineIcon-close mr-5"></i>취소</button>
            <button type="button" class="btn btn-lg black ml-5" @click="saveMatter()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
        </div>

        <div class="row">
          <div class="form-row">
            <button-panel btnType='top'>
              <template v-slot:start>
                <button class="btn btn-md mr-5" @click="loadEmpList()">
                  <i class="icon-lineIcon-check mr-5"></i>
                  대상자 등록
                </button>
              </template>
            </button-panel>
          </div>
        </div>
        <div class="row col-12">
          <div id="sev-pension-matter-mgt-grid" style="width: 100%; height: 400px" class="realgrid-type-style"/>
        </div>
        <div class="row col-12 align-center mt-20">
            <button type="button" class="btn btn-lg flat"><i class="icon-lineIcon-close mr-5"></i>취소</button>
            <button type="button" class="btn btn-lg black ml-5" @click="saveMatter()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
        </div>
      </div>
      <sev-pension-emp-modal ref="SevPensionEmpModal" :options="{checkedMembers: checkedMembers}"></sev-pension-emp-modal>
<!--      <sev-pension-matter-emp-modal ref="SevPensionMatterEmpModal" />-->
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import ButtonPanel from '@/components/common/ButtonPanel';
import { mapGetters } from 'vuex';
import SevPensionEmpModal from './SevPensionEmpModal'

export default {
  components:{
    ButtonPanel,
    SevPensionEmpModal
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
      checkedMembers: [],
      readonlyCheck: '',
      selCode:{
        SEV_DATE: '',
        SEV_PENSION_SEQ: '',
        SEV_PENSION_MATTER_NAME: '',
        SEV_CONTROL_NO: {
          // isRequired: true,
          // validMsg: '종류를 선택해주세요.',
          value: '',
          return: null,
          items: []
        },
        SEV_CONTROL_TITLE: '',
        SEV_PENSION_START: '',
        SEV_PENSION_END: '',
        FINAL_SAL_FROM: '',
        FINAL_SAL_TL: '',
        FINAL_BONUS_FROM: '',
        FINAL_BONUS_TO: '',
        PERIOD_BASIS: {
          // isRequired: true,
          // validMsg: '종류를 선택해주세요.',
          value: '',
          return: null,
          items: [
            { message: '일수', code: 'D'},
            { message: '월수', code: 'M'}
          ]
        },
        SEV_PENSION_MATTER_NOTE: '',
        LAST_DIGIT_FLAG: {
          // isRequired: true,
          // validMsg: '종류를 선택해주세요.',
          value: 'UP',
          return: null,
          items: [
            { message: '절사', code: 'DOWN'},
            { message: '반올림', code: 'OFF'},
            { message: '올림', code: 'UP'}
          ]
        },
        SEV_MATTER_FLAG: {
          // isRequired: true,
          // validMsg: '종류를 선택해주세요.',
          value: 'O',
          return: null,
          items: [
            { message: '오픈', code: 'O'},
            { message: '마감', code: 'C'}
          ]
        }
      },

      fields: [
        { fieldName: 'EMP_NAME', dataType: "text"},
        { fieldName: 'SEV_PENSION_TYPE', dataType: "text"},
        { fieldName: 'HRDEPT_NAMK', dataType: "text"},
        { fieldName: 'RANK_NAME', dataType: "text"},
        { fieldName: 'E_JOIN_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
        { fieldName: 'RETIRE_DATE', dataType: "datetime",datetimeFormat: "yyyyMMdd"},
      ],
      columns:[
        { fieldName: 'EMP_NAME', header: '성명'},
        { fieldName: 'SEV_PENSION_TYPE', header: '퇴직연금 구분'},
        { fieldName: 'HRDEPT_NAMK', header: '부서'},
        { fieldName: 'RANK_NAME', header: '직급'},
        { fieldName: 'E_JOIN_DATE', header: '입사일'},
        { fieldName: 'RETIRE_DATE', header: '퇴사일'},
      ]
    }
  },

  methods: {
    gotoList() {
      let me = this;
      me.$router.push('/sev/sevpension');
    },

    saveMatter(){
      let _param = {
        SEV_DATE: this.selCode.SEV_DATE,
        SEV_PENSION_SEQ: this.selCode.SEV_PENSION_SEQ,
        SEV_PENSION_MATTER_NAME: this.selCode.SEV_PENSION_MATTER_NAME,
        SEV_CONTROL_NO: this.selCode.SEV_CONTROL_NO.value,
        SEV_CONTROL_TITLE: this.selCode.SEV_CONTROL_TITLE,
        SEV_RPEN_RATE_TYPE_NAME: '고정된 연적립율',
        SEV_RPEN_RATE_TYPE: 'F',
        SEV_CONTROL_TARGET_NAME: '전체',
        SEV_CONTROL_TARGET: 'A',
        SEV_PENSION_START: this.selCode.SEV_PENSION_START,
        SEV_PENSION_END: this.selCode.SEV_PENSION_END,
        PERIOD_BASIS: this.selCode.PERIOD_BASIS.value,
        PERIOD_SIZE: this.selCode.PERIOD_SIZE,
        LAST_DIGIT_FLAG: this.selCode.LAST_DIGIT_FLAG.value,
        NEWMAN_CUMUL_FLAG: 'N',
        FINAL_SAL_ONE_FROM: '20210601',
        FINAL_SAL_ONE_TO: '20210630',
        FINAL_SAL_FROM: this.selCode.FINAL_SAL_FROM,
        FINAL_SAL_TL: this.selCode.FINAL_SAL_TL,
        FINAL_BONUS_FROM: this.selCode.FINAL_BONUS_FROM,
        FINAL_BONUS_TO: this.selCode.FINAL_BONUS_TO,
        FINAL_BONUS_NO_MONTH: 12,
        SEV_PENSION_MATTER_NOTE: this.selCode.SEV_PENSION_MATTER_NOTE,
        SEV_MATTER_FLAG: this.selCode.SEV_MATTER_FLAG.value,
        SEV_SAVE_DATE:  '20210630'
      };

      let me = this;
      this.$httpPost({
        url: '/payroll/retirement/sev-pension/save-matter',
        param: _param,
        callback: function() {
          me.toastSuccessSave();
        }
      });
    },

    deleteCode(){
    },

    loadEmpList(){
      let me = this;
      if( ! me.selCode.SEV_DATE && ! me.selCode.SEV_PENSION_SEQ){
        this.toast({message: '기준일과 차수가 없습니다', type:"error"});
        return;
      }
      if( me.SEV_PENSION_MATTER_DATA.SEV_MATTER_FLAG === 'C'){
        this.toast({message: '상태가 마감인 내부관리는 대상자를 등록할 수 없습니다.', type:"error"});
        return;
      }
      me.$refs.SevPensionEmpModal.show({sevDate: this.selCode.SEV_DATE, sevPensionSeq: this.selCode.SEV_PENSION_SEQ, sevControlNo: this.selCode.SEV_CONTROL_NO.value});
    },

    async loadGridData() {
      let me = this;
      if( me.SEV_PENSION_MATTER_DATA.SEV_DATE){
        try {
          let {data} = await me.$httpPost({
            param: { ENROLL: 'Y', SEV_DATE: me.SEV_PENSION_MATTER_DATA.SEV_DATE, SEV_PENSION_SEQ: me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ, SEV_CONTROL_NO: me.SEV_PENSION_MATTER_DATA.SEV_CONTROL_NO},
            url: '/payroll/retirement/sev-pension/emp-list'
          });
          this.setRealgridData(data || []);
        } catch (e) {
          console.error("AnnualSalary loadGridData err: ", e);
        }
      }
    },

    setData: function(){
      let me = this;
      if( me.SEV_PENSION_MATTER_DATA.CREATE === 'Y'){
        me.readonlyCheck = false;
      }else{
        me.readonlyCheck = true;
      }
      me.selCode.SEV_DATE = me.SEV_PENSION_MATTER_DATA.SEV_DATE;
      me.selCode.SEV_PENSION_MATTER_NAME = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_MATTER_NAME;
      me.selCode.SEV_PENSION_SEQ = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_SEQ;
      me.selCode.SEV_CONTROL_NO.value = me.SEV_PENSION_MATTER_DATA.SEV_CONTROL_NO;
      me.selCode.SEV_PENSION_START = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_START;
      me.selCode.SEV_PENSION_END = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_END;
      me.selCode.FINAL_SAL_FROM = me.SEV_PENSION_MATTER_DATA.FINAL_SAL_FROM;
      me.selCode.FINAL_SAL_TL = me.SEV_PENSION_MATTER_DATA.FINAL_SAL_TL;
      me.selCode.FINAL_BONUS_FROM = me.SEV_PENSION_MATTER_DATA.FINAL_BONUS_FROM;
      me.selCode.FINAL_BONUS_TO = me.SEV_PENSION_MATTER_DATA.FINAL_BONUS_TO;
      me.selCode.SEV_MATTER_FLAG.value = me.SEV_PENSION_MATTER_DATA.SEV_MATTER_FLAG;
      me.selCode.PERIOD_BASIS.value = me.SEV_PENSION_MATTER_DATA.PERIOD_BASIS;
      me.selCode.PERIOD_SIZE = me.SEV_PENSION_MATTER_DATA.PERIOD_SIZE;
      me.selCode.LAST_DIGIT_FLAG.value = me.SEV_PENSION_MATTER_DATA.LAST_DIGIT_FLAG;
      me.selCode.SEV_PENSION_MATTER_NOTE = me.SEV_PENSION_MATTER_DATA.SEV_PENSION_MATTER_NOTE;

      for(let i = 0; i < me.selCode.SEV_CONTROL_NO.items.length; i ++) {
        if(me.selCode.SEV_CONTROL_NO.items[i]['code'] == me.selCode.SEV_CONTROL_NO.value) {
          me.selCode.SEV_CONTROL_TITLE =  me.selCode.SEV_CONTROL_NO.items[i]['message']
          break;
        }
      }

    },

    async loadSevControlData() {
      try {
        let me = this;
        const { data } = await me.$httpPost( {
          param: { ACITVE_ONLY : "YES", SEV_CONTROL_TYPE : "P"},
          url: '/payroll/multiretirecfg/cs-header/list'
        });
        for( let i=0; i< data.length; i++) {
          me.selCode.SEV_CONTROL_NO.items.push( {
            message: String( data[i]['SEV_CONTROL_TITLE']),
            code: String( data[i]['SEV_CONTROL_NO'])
          });
        }
      }
      catch(e) {
        console.error("sevControllData asyncData err: ", e);
      }
    }
  },
  async mounted() {
    let me = this;
    me.createRealGrid({
      domId: 'sev-pension-matter-mgt-grid',
      editable: false
    });
    await me.loadGridData();
    await me.loadSevControlData();
    me.setData();

  }
}
</script>
