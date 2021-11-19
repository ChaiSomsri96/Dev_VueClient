<template>
  <div :class="cOptions.addDivClass">
    <input type="text"
           v-model="cValue"
           @input="inputValue"
           @change="changeValue"
           :placeholder="cOptions.placeHolder"
           class="form-control text-right ellipsis"
           :class="cOptions.addInputClass"
           autocomplete="off">

    <button type="button"
            v-show="!gfnIsEmpty(cValue)"
            @click="cValue=''; changeValue();"
            class="btn btn-s flat solid">
      <i class="icon-solidIcon-cancel-default"><span class="blind" v-text="message.delete[cOptions.locale]">삭제</span></i>
    </button>
  </div>
</template>

<script>
/** =============================================== 설명 =============================================== **/
/**
 * workplace ui-input-number 를 복사해서 일부 변형함.
 */
const descUse = `
<ui-input-year :value="param.year" @change="param.year=$event"/>
`;

/**
 * 파라미터
 */
const descParameter = `
- value   : 바인딩할 value 값 (Number)
- options : 옵션 (Object, Optional)
  {
      addDivClass   : 최외각 div 에 추가할 class (기본값  : "input-group")
      addInputClass : input 에 추가할 class
  }
`;

/**
 * 리턴
 */
const descReturn = `
- $event (Number)
`;
/** =================================================================================================== **/


//import userInfoUtils from "@/utils/userInfoUtils";
//import commonUtils from "@/utils/commonUtils";

export default {
  name    : 'ui-input-year',
  desc    : {
    use      : descUse.trim(),
    parameter: descParameter.trim(),
    return   : descReturn.trim()
  },
  props   : ['value', 'options'],
  data    : function () {
    return {
      innerValue: '', // string
      message   : {
        delete: {ko_KR: '삭제', en_US: 'Delete', ja_JP: '削除', zh_CN: '删除', zh_TW: '刪除'}
      }
    }
  },
  computed: {
    /**
     * props 로 전달된 options 를 defaultOptions 와 merge
     *
     * @returns cOptions : 변환된 options
     */
    cOptions: function () {
      // Default
      let defaultOptions = {
        allowMinus   : false,
        maxLength    : 4,
        decimalPlace : 0,
        placeHolder  : 'yyyy',
        addDivClass  : 'input-group',
        addInputClass: '',
        locale: {
          type: String,
          default : 'ko_KR'// userInfoUtils.getI18nInfo().locale
        },
      };

      return {...defaultOptions, ...this.options};
    },
    /**
     * 화면에 나타내는 값
     */
    cValue  : {
      get: function () {
        // 마지막 글자가 소수점 입력인 경우 그대로 출력
        // if (this.getLastStr(this.innerValue) === ".") {
        //   return this.innerValue;
        // }

        // if (this.innerValue.length == 1 && (this.innerValue == "-" || this.innerValue == ".")) {
        //     return this.innerValue;
        // }

        // 포맷팅 처리
        // return commonUtils.formatAmt(this.innerValue);
        if(this.innerValue.length > 4){
          return this.innerValue.substring(0,4);
        }
        return this.innerValue;
      },
      set: function (value) {
        // 입력한 값을 그대로 저장 (내부 바인딩된 값)
        this.innerValue = value;
      }
    }
  },
  created : function () {
    this.initInnerValue();
  },
  watch   : {
    // eslint-disable-next-line no-unused-vars
    value: function (newVal, oldVal) {
      this.initInnerValue();
    }
  },
  methods : {
    /**
     * props 의 value 값이 셋팅되거나 변경될 때
     */
    initInnerValue    : function () {
      if (this.value === null || this.value === undefined) {
        this.innerValue = "";
      } else {
        this.innerValue = this.value.toString().replace(/ /g, ""); // 공백 제거
      }
    },
    /**
     * 입력
     */
    inputValue        : function (event) {
      let input = event.data; // 현재 입력한 글자
      let value = event.target.value; // 전체 입력된 글자

      if (input) { // 직접입력
        let valid = true; // 검증 flag

        // if (this.cOptions.decimalPlace > 0 && input === ".") { // 소숫점 입력 허용 && 소숫점 기호 입력인지 확인
        //   if (this.getPrevStr(this.innerValue).indexOf(".") != -1) { // 이전까지 입력했던 글자에 소숫점 기호를 2번 이상 입력하는 경우
        //     valid = false;
        //   }
        //
        // } else if (this.cOptions.allowMinus && input === "-") { // 마이너스 입력 허용 && 마이너스 기호 입력인지 확인
        //   if (this.innerValue.length != 1) { // 마이너스 기호를 2번 이상 입력하는 경우
        //     valid = false;
        //   }
        //
        // } else {
          if (isNaN(input)) { // 숫자가 아닌 경우
            valid = false;
          } else if (this.isOverIntegerPlace(this.innerValue)) { // 정수부 자릿수 확인
            valid = false;
          } else if (this.isOverDecimalPlace(this.innerValue)) { // 소숫점 자릿수 확인
            valid = false;
          }
        // }

        if (!valid) { // 검증 통과 못한 경우 현재 입력한 글자 clear
          this.innerValue = this.innerValue.substr(0, this.innerValue.length - 1);
        }

      } else { // 붙여넣기 / backspace / delete / etc
        // 공백 제거
        value = value.replace(/ /g, ""); // 공백 제거

        // 마이너스 허용 안하는 경우 마이너스 기호 제거
        if (!this.cOptions.allowMinus) {
          value = value.replace(/-/g, "");
        }

        let split = value.split(".");

        // 정수부 자릿수에 맞게 자르기
        value = split[0].replace(/,/g, "");
        if (value.substr(0, 1) === "-") {
          value = value.substr(0, this.cOptions.maxLength + 1);
        } else {
          value = value.substr(0, this.cOptions.maxLength);
        }

        // 소숫점 자리수에 맞게 자르기
        if (this.cOptions.decimalPlace > 0 && split.length >= 2) {
          value += "." + split[1].substr(0, this.cOptions.decimalPlace);
        }

        // 숫자가 맞는지 검증
        if (isNaN(value)) {
          value = "";
        }

        this.innerValue = ""; // binding 을 위해 초기화 후 재생성
        this.innerValue = value;
      }
    },
    /**
     * 변경
     */
    changeValue       : function () {
      if (this.innerValue === "" || this.innerValue === "." || this.innerValue === "-") { // 사용자가 값을 지운 경우이거나 허용범위 오류
        this.innerValue = "";
        this.$emit('change', null);
        return;
      }

      let output = Number(this.innerValue.replace(/,/g, "")); // 숫자로 변환
      this.$emit('change', output);
    },
    /**
     * 이전까지 입력한 글자 (마지막 글자만 제외)
     */
    getPrevStr        : function (value) {
      return value.substr(0, value.length - 1);
    },
    /**
     * 마지막 글자
     */
    getLastStr        : function (value) {
      return value.substr(value.length - 1, 1);
    },
    /**
     * 정수부 자릿수 초과 여부
     *
     * @param value : 입력값 (str)
     */
    isOverIntegerPlace: function (value) {
      let integer = Number(value.split(".")[0].replace(/,/g, ""));
      if (integer > 0) {
        return integer >= Math.pow(10, this.cOptions.maxLength);
      } else {
        return integer * -1 >= Math.pow(10, this.cOptions.maxLength);
      }
    },
    /**
     * 소숫점 자릿수 초과 여부
     *
     * @param value : 입력값 (str)
     */
    isOverDecimalPlace: function (value) {
      let decimal = value.split(".")[1];

      // 소숫점 없음
      if (decimal === null || decimal === undefined) {
        return 0;
      }

      return decimal.length > this.cOptions.decimalPlace;
    }
  }
}
</script>