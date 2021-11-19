<template>
  <base-modal title="설문지" id="survey-modal" :scroll="true" width="1000">
    <template v-slot:body>
      <div class="form-area">
        <div class="form-wrap">
          <ye-survey-line
              v-for="(item, index) in filterSurveyList"
              :key="index"
              :options="item"
              @doSurvey="doSurvey($event)"
          />
        </div>
        <div class="form-wrap">
          <div v-html="guideText"></div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close" v-if="!param.showButton">
          <i class="icon-lineIcon-close mr-5"></i>닫기
        </button>
        <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close" v-if="param.showButton">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="doSave()" v-if="param.showButton">
          <i class="icon-lineIcon-del mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import YeSurveyLine from '@/components/yearend/settle/YeSurveyLine';
import {houseSurvey} from '@/utils/yearendHouseSurvey';
import {mapGetters} from "vuex";

export default {
  mixins: [modal],
  components: {
    BaseModal,
    YeSurveyLine
  },
  data() {
    return {
      step: 'HOUSE_LOAN',
      param: {},
      surveyType: '',
      surveyList: {},
      surveyData: {
        'l2': {firstStep: 'H30', QUESTION_TYPE: 'HOUSE_LOAN_INTEREST'},
        'l3': {firstStep: 'R40', QUESTION_TYPE: 'HOUSE_RENT'}, // 월세액
        'l4': {firstStep: 'A22', QUESTION_TYPE: 'HOUSE_RENTAL_LOAN'}, // 대출기관
        'l5': {firstStep: 'A22', QUESTION_TYPE: 'HOUSE_RENTAL_LOAN'}, // 거주자간
        'l6': {firstStep: 'M30', QUESTION_TYPE: 'HOUSE_SAVINGS'}, // 주택저축
      },
      guideText: ''
    }
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    }),
    filterSurveyList() {
      if (this.surveyType != '') {
        return Object.fromEntries(Object.entries(this.surveyList).filter(([key, value]) => !value['hide']));
      } else {
        return {};
      }
    }
  },
  methods: {
    getItemOptions(itm) {
      if (Object.prototype.hasOwnProperty.call(itm, 'hide')) {
        return itm;
      }
      itm.hide = true;
      return itm;
    },
    async resetComponent(forShowSurvey) {
      const me = this;
      const answer = {};
      const created = me.param.YES_ID && me.param.YES_ID > 0;
      let surveyPassedText = '';

      me.guideText = '공제 대상이 아닙니다.';
      me.surveyList = {...houseSurvey[this.surveyType]};

      if (!created) {
        for (let p in me.surveyList) {
          me.surveyList[p].hide = true;
          me.surveyList[p].value = '';
        }
        return;
      }

      // 설문지를 가져온다.
      let {data} = await me.$httpPost({
        url: '/year-end/employee/questionnaire/answer',
        param: {
          'EID': me.eid,
          'ATT_YEAR': me.attYear,
          'CURRENT_STEP': me.step,
          'ACTION': me.houseAction,
          'QUESTION_TYPE': me.surveyData[this.surveyType].QUESTION_TYPE,
          'YES_ID': me.param.YES_ID
        }
      });
      const hasSurvey = (data && data.length > 0);

      if (forShowSurvey && !hasSurvey) {
        me.guideText = '등록된 설문지가 없습니다.';
        me.surveyType = '';
        me.surveyList = {
          noDataToDisplay: true
        };
        return;
      }

      if (hasSurvey) {
        data.forEach(function (val) {
          answer[val.QUESTION_ID] = val.CHOICE_SELECTED;
        });
        for (let p in me.surveyList) {
          let itm = me.surveyList[p];
          if (Object.prototype.hasOwnProperty.call(answer, itm.name)) {
            itm.hide = false;
            itm.value = answer[itm.name] || '';
          }
          if (itm.isFinal) {
            surveyPassedText = itm.guide;
          }
        }
        if (me.param.QUESTION_PASS == 'Y') {
          me.guideText = surveyPassedText;
        }
      }
    },
    //modal
    async asyncDynamicComponentData(data) {
      const me = this;
      me.surveyType = data.surveyType;
      me.param = data.param;
      me.param.showButton = data.param.displaySurvey ? false : true;

      await me.resetComponent(data.param.displaySurvey);
      await me.$nextTick();

      if (me.surveyList && me.surveyList.noDataToDisplay) {
        return;
      }

      me.surveyList[me.surveyData[me.surveyType]['firstStep']]['hide'] = false;
      // 거주자간 주택임차차입금 관련 이자율 텍스트 처리.
      if (me.surveyType == 'l5' && me.param.LEND_START) {
        me.surveyList['D30'].text = '이자율 연간 ' + me.findInterestRateText(me.param.LEND_START) + ' 이상';
      }
    },

    findInterestRateText(date) {
      let intDate = parseInt(date);
      if (20120227 >= intDate) {
        return "3.7%";
      }
      if (20120228 <= intDate && intDate <= 20130227) {
        return '4.0%'
      }
      if (20130228 <= intDate && intDate <= 20140313) {
        return '3.4%'
      }
      if (20140314 <= intDate && intDate <= 20150312) {
        return '2.9%'
      }
      if (20150313 <= intDate && intDate <= 20160315) {
        return '2.5%'
      }
      if (20160316 <= intDate && intDate <= 20170309) {
        return '1.8%'
      }
      if (20170310 <= intDate && intDate <= 20180320) {
        return '1.6%'
      }
      if (20180321 <= intDate && intDate <= 20190319) {
        return '1.8%'
      }
      if (20190320 <= intDate && intDate <= 20200312) {
        return '2.1%'
      }
      if (20200313 >= intDate) {
        return '1.8%'
      }

      return;
    },

    async move(currentStep, _value, nextStep) {
      let me = this;
      let afterCurrentStep = false;
      let nextSurveyItem = nextStep ? me.surveyList[nextStep] : {};
      for (const [key, value] of Object.entries(me.param.QUESTION_INFO)) {
        if (afterCurrentStep) {
          me.surveyList[key]['value'] = '';
          me.surveyList[key]['hide'] = true;
          delete me.param.QUESTION_INFO[key];
        }
        if (!afterCurrentStep && key == currentStep) {
          afterCurrentStep = true;
        }
      }
      nextSurveyItem.hide = false;
      me.param.QUESTION_INFO[currentStep] = _value;
      me.surveyList[currentStep]['value'] = _value;
      me.guideText = nextSurveyItem.isFinal ? nextSurveyItem.guide : (nextStep ? '' : '공제 대상이 아닙니다.');
      me.param.QUESTION_PASS = nextSurveyItem.isFinal ? 'Y' : 'N';

      me.scrollToBottom();
    },

    doSurvey($event) {
      if (Array.isArray($event.nextStep)) { //차입일
        for (let i = 0; i < $event.nextStep.length; i++) {
          if ($event.nextStep[i]['condition']) {
            const operator = $event.nextStep[i]['condition'][1];
            const val = parseInt(this.param[$event.nextStep[i]['condition'][0]]);
            const compareVal = parseInt($event.nextStep[i]['condition'][2]);
            if ((operator == '<=' && val <= compareVal) ||
                (operator == '>=' && val >= compareVal) ||
                (operator == '<' && val < compareVal) ||
                (operator == '>' && val > compareVal)) {
              this.move($event.name, $event.value, $event.nextStep[i]['to']);
              break;
            }
          } else {
            this.move($event.name, $event.value, $event.nextStep[i]['to']);
            break;
          }
        }
      } else {
        this.move($event.name, $event.value, $event.nextStep);
      }
    },
    //저장
    async doSave() {
      const me = this;
      //저장api 호출 
      try {
        this.$httpPost({
          url: '/year-end/employee/deduction/request/save/house',
          param: {
            ...me.param,
            'EID': me.eid,
            'ATT_YEAR': me.attYear,
            'CURRENT_STEP': me.step,
            'QUESTION_INFO': me.jsonStringifyV2(me.param.QUESTION_INFO)
          },
          callback: function () {
            me.toastSuccessSave();
            me.close();
          }
        });
      } catch (err) {
        console.log("SurveyModal doSave err: ", err);
      }
    }
  }
}
</script>