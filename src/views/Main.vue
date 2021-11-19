<template>
  <div class="content-wrap"
       ref="contentWrap"
       @mouseup="splitterMouseUp()"
       @mousemove="splitterMouseMove($event)">
    <ui-lnb class="flexible-lnb"
            :lnb="lnb"
            :style="{width : offset + 'px'}"/>
    <div class="flexible-content"
         :style="{marginLeft : offset + 'px'}">
      <ui-gnb :gnb="gnb" :user="user"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
/**
 * 전체 Layout 을 관장하는 컴포넌트
 * Jsp 의 Sitemesh Decorator, Thymeleaf 의 layout:fragment 라고 보면 된다.
 */
import store from '@/store';

export default {
  name: 'Main',
  data() {
    return {
      isResizing: false,
      offset: 250,
      gnb: this.getDummyGnb(), // store.state.common.gnb,
      lnb: this.getDummyLnb(), // store.state.common.lnb,
      user: {}
    }
  },
  created() {
    window.addEventListener("resize", this.windowResize);
  },
  methods: {
    /**
     * LNB 크기 조절 MouseUp
     */
    splitterMouseUp() {
      this.isResizing = false;
    },

    /**
     * LNB 크기 조절 MouseMove
     */
    splitterMouseMove(e) {
      if (!this.isResizing) return;

      const container = this.$refs['contentWrap'];
      this.offset = e.clientX - container.offsetLeft;

      if (this.offset < 250) {
        this.offset = 250;
        return false;
      }
      if (this.offset > 500) {
        this.offset = 500;
        return false;
      }

      document.body.classList.add('lnb-fixed')
    },

    /**
     * 전체 window 사이즈 크기를 줄이거나 늘렸을 때
     */
    windowResize() {
      if (document.body.classList.contains('lnb-fixed')) {
        return false;
      }

      if (window.outerWidth < 1201) {
        document.body.classList.add('lnb-close');
      } else {
        document.body.classList.remove('lnb-close');
      }
    },


    getDummyLnb: function () {
      return {
        "theme": {
          "logo": "NONE",
          "bodyTheme": "blue",
          "lnbThemeClass": "light",
          "title": "CGV default",
          "companyName": null,
          "imageUrl": "/uikit/dist/img/logo_workplace_v2.png",
          "bodyThemeClass": "theme-blue"
        },
        "home": {
          "menuId": 0,
          "parentMenuId": 0,
          "sortOrder": 0,
          "menuName": "급여 홈",
          "menuLink": "",
          "targetWindow": null,
          "icon": "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
          "menuKey": null,
          "wholeOrder": null
        },
        "menus": [
// 상위메뉴그룹
          {
            "menuId": 9999999,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "샘플페이지",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 1,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "급여 관리",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 2,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "아르바이트 급여관리",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 3,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "퇴직금 관리",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 4,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "연말정산",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 5,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "사업소득",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 6,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "환경설정",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 7,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "시스템관리자",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 8,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "ESS",
            "menuLink": "",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 샘플페이지 9999999
          {
            "menuId": 99999991,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "레이아웃",
            "menuLink": "/samples/layout",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999992,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "폼 form",
            "menuLink": "/samples/form",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999993,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "버튼",
            "menuLink": "/samples/button",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999994,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "모달, 팝업",
            "menuLink": "/samples/modal",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999995,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "탭(tab)",
            "menuLink": "/samples/tab",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999996,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "form inputs",
            "menuLink": "/samples/input",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999997,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "폼 레이아웃 설명",
            "menuLink": "/samples/header",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999998,
            "parentMenuId": 9999999,
            "sortOrder": 1,
            "menuName": "Real grid",
            "menuLink": "/samples/grid",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 99999999,
            "parentMenuId": 9999999,
            "sortOrder": 0,
            "menuName": "Grid 가 포함된 sample",
            "menuLink": "/samples/sample-page-1",
            "targetWindow": null,
            "icon": "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
            "menuKey": null,
            "wholeOrder": null
          },
          {
            "menuId": 999999910,
            "parentMenuId": 9999999,
            "sortOrder": 0,
            "menuName": "Form sample 1",
            "menuLink": "/samples/sample-page-2",
            "targetWindow": null,
            "icon": "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
            "menuKey": null,
            "wholeOrder": null
          },
          {
            "menuId": 999999911,
            "parentMenuId": 9999999,
            "sortOrder": 0,
            "menuName": "Form sample 2",
            "menuLink": "/samples/sample-page-3",
            "targetWindow": null,
            "icon": "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
            "menuKey": null,
            "wholeOrder": null
          },
          {
            "menuId": 999999912,
            "parentMenuId": 9999999,
            "sortOrder": 0,
            "menuName": "Form sample 3",
            "menuLink": "/samples/sample-page-4",
            "targetWindow": null,
            "icon": "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
            "menuKey": null,
            "wholeOrder": null
          },
// 급여관리
//                         {
//                             "menuId"      : 10001,
//                             "parentMenuId": 1,
//                             "sortOrder"   : 1,
//                             "menuName"    : "급여일 오픈",
//                             "menuLink"    : "/payroll/payday",
//                             "targetWindow": "",
//                             "icon"        : null,
//                             "menuKey"     : "MENU_DEPT",
//                             "wholeOrder"  : "0000000001"
//                         },
          {
            "menuId": 10001,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "급여일 관리",
            "menuLink": "/payroll/paydayopen",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10002,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "대상자 관리",
            "menuLink": "/payroll/subjectmanagement",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10003,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "기초 자료 마감",
            "menuLink": "/payroll/workresult",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10004,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "급여 입력",
            "menuLink": "/payroll/payentry",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10005,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "급여 조회",
            "menuLink": "/payroll/payroll-ledger",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10006,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "보고서",
            "menuLink": "/payroll/payreview",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10007,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "파일 생성",
            "menuLink": "/payroll/pay-account-verify",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10008,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "세무서식 조회",
            "menuLink": "/payroll/earned-income-source",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10009,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "세무 신고",
            "menuLink": "/payroll/withholding-tax-report",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 10010,
            "parentMenuId": 1,
            "sortOrder": 1,
            "menuName": "사회보험 신고",
            "menuLink": "/payroll/total-remuneration",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 일용직 급여관리
/*
          {
            "menuId": 20001,
            "parentMenuId": 2,
            "sortOrder": 1,
            "menuName": "세액 계산",
            "menuLink": "/dwork/dworktax",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 20003,
            "parentMenuId": 2,
            "sortOrder": 1,
            "menuName": "파일 생성",
            "menuLink": "/dwork/dworkbank",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          */
          {
            "menuId": 20002,
            "parentMenuId": 2,
            "sortOrder": 1,
            "menuName": "급여 조회",
            "menuLink": "/dwork/dworkpayquery",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 20004,
            "parentMenuId": 2,
            "sortOrder": 1,
            "menuName": "세무 신고",
            "menuLink": "/dwork/dworktaxreport",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 퇴직금 관리
          {
            "menuId": 30001,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "퇴직금 입력",
            "menuLink": "/sev/sevpayentry",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30002,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "세액 계산",
            "menuLink": "/sev/sevtax",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30003,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "퇴직연금 계산",
            "menuLink": "/sev/sevpension",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30004,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "계산내역 조회",
            "menuLink": "/sev/sevpayquery",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30005,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "파일 생성",
            "menuLink": "/sev/sevfile",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30006,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "세무서식 조회",
            "menuLink": "/sev/sevtaxfile",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 30007,
            "parentMenuId": 3,
            "sortOrder": 1,
            "menuName": "세무 신고",
            "menuLink": "/sev/sevtaxreport",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 연말정산
          {
            "menuId": 40001,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "일정관리",
            "menuLink": "/yearend/yedate",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 40002,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "연급여 집계",
            "menuLink": "/yearend/yesalary",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 400032,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "연말정산실행",
            "menuLink": "/yearend/settlement",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 40004,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "사후 관리",
            "menuLink": "/yearend/yeaftermail",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 40005,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "정산내역 조회",
            "menuLink": "/yearend/yesettlequery",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 40006,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "세무서식 조회",
            "menuLink": "/yearend/yeextrafile",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 40007,
            "parentMenuId": 4,
            "sortOrder": 1,
            "menuName": "세무 신고",
            "menuLink": "/yearend/yetaxreport",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 사업소득
          {
            "menuId": 50001,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "소득자 관리",
            "menuLink": "/bizinc/bizincearner",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50002,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "사업소득 관리",
            "menuLink": "/bizinc/bizincincome",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50003,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "기타소득 관리",
            "menuLink": "/bizinc/bizincotherinc",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50004,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "이자배당소득 관리",
            "menuLink": "/bizinc/bizincinterest",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50005,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "비거주자소득 관리",
            "menuLink": "/bizinc/bizincnonresid",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50006,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "가상자산소득 관리",
            "menuLink": "/bizinc/bizincvirtualasset",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 50007,
            "parentMenuId": 5,
            "sortOrder": 1,
            "menuName": "세무신고",
            "menuLink": "/bizinc/bizinctaxreport",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 환경설정
          {
            "menuId": 60001,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "코드 관리",
            "menuLink": "/cfg/cfgcode",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 60002,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "마스터 관리",
            "menuLink": "/cfg/cfgmastercode",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 60003,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "계산식 관리",
            "menuLink": "/cfg/cfgcalc",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 60004,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "보고서 디자인",
            "menuLink": "/cfg/cfgreport",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 60005,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "로그 조회",
            "menuLink": "/cfg/cfglogs",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 60006,
            "parentMenuId": 6,
            "sortOrder": 1,
            "menuName": "급여환경 세팅",
            "menuLink": "/cfg/cfgpayconsetting",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
// 시스템 관리자
          {
            "menuId": 70001,
            "parentMenuId": 7,
            "sortOrder": 1,
            "menuName": "기초자료 관리",
            "menuLink": "/system/systembase",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 70002,
            "parentMenuId": 7,
            "sortOrder": 1,
            "menuName": "표준코드 관리",
            "menuLink": "/system/systemcode",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 70003,
            "parentMenuId": 7,
            "sortOrder": 1,
            "menuName": "세무 관리",
            "menuLink": "/system/systemtax",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 70004,
            "parentMenuId": 7,
            "sortOrder": 1,
            "menuName": "연말정산 관리",
            "menuLink": "/system/systemyearend",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
//ESS
          {
            "menuId": 80001,
            "parentMenuId": 8,
            "sortOrder": 1,
            "menuName": "급여 등 조회",
            "menuLink": "/ess/esspayroll",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 80002,
            "parentMenuId": 8,
            "sortOrder": 1,
            "menuName": "소득세 원천징수 확인서",
            "menuLink": "/ess/mystatementincometaxcertirequest",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
          {
            "menuId": 80003,
            "parentMenuId": 8,
            "sortOrder": 1,
            "menuName": "본인정보 수정",
            "menuLink": "/ess/essaccountregistration",
            "targetWindow": "",
            "icon": null,
            "menuKey": "MENU_DEPT",
            "wholeOrder": "0000000001"
          },
        ],
        "ownMenus": {
          "header": null,
          "menus": [
            {
              "menuId": 54,
              "parentMenuId": 0,
              "sortOrder": 0,
              "menuName": "영업",
              "menuLink": "cgv.dev-ncpworkplace.com/sls/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-collabo-etc-active",
              "menuKey": null,
              "wholeOrder": null
            },
          ]
        },
        "otherMenus": []
      };
    },
    getDummyGnb: function () {
      return {
        "searchLink": "/common/v2/org/open",
        "helps": [
          {
            "menuId": 0,
            "parentMenuId": 0,
            "sortOrder": 1,
            "menuName": "앱 설치",
            "menuLink": "/common/gnb/info/installApp",
            "targetWindow": "POPUP_installApp",
            "icon": null,
            "menuKey": "width=880, height=260, scrollbars=auto, location=no",
            "wholeOrder": null,
            "hasNew": false
          },
          {
            "menuId": 0,
            "parentMenuId": 0,
            "sortOrder": 2,
            "menuName": "자주 하는 질문",
            "menuLink": "https://dev-www.ncloud.com/support/faq/product?prodCode=WRPLC",
            "targetWindow": "NEW",
            "icon": null,
            "menuKey": null,
            "wholeOrder": null,
            "hasNew": false
          },
          {
            "menuId": 0,
            "parentMenuId": 0,
            "sortOrder": 3,
            "menuName": "동영상 튜토리얼",
            "menuLink": "https://www.youtube.com/playlist?reload=9&list=PLpywxIpxgxhEOkU8nxe3hqMOPjsVEnDQC",
            "targetWindow": "NEW",
            "icon": null,
            "menuKey": null,
            "wholeOrder": null,
            "hasNew": false
          },
          {
            "menuId": 0,
            "parentMenuId": 0,
            "sortOrder": 4,
            "menuName": "설명서",
            "menuLink": null,
            "targetWindow": "NEW",
            "icon": null,
            "menuKey": null,
            "wholeOrder": null,
            "hasNew": false
          },
          {
            "menuId": 0,
            "parentMenuId": 0,
            "sortOrder": 5,
            "menuName": "WORKPLACE 공지",
            "menuLink": "/common/notice/list",
            "targetWindow": "NEW",
            "icon": null,
            "menuKey": null,
            "wholeOrder": null,
            "hasNew": true
          }
        ],
        "gnbMenu": {
          "worksMenus": [],
          "ownMenus": [
            {
              "menuId": 59,
              "parentMenuId": 0,
              "sortOrder": 1,
              "menuName": "급여",
              "menuLink": "http://cgv.dev-ncpworkplace.com/sly/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-collabo-etc-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 52,
              "parentMenuId": 0,
              "sortOrder": 2,
              "menuName": "구성원",
              "menuLink": "http://cgv.dev-ncpworkplace.com/mbr/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-personnel-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 34,
              "parentMenuId": 0,
              "sortOrder": 3,
              "menuName": "워크플로우",
              "menuLink": "http://cgv.dev-ncpworkplace.com/wfs/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-workflow-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 56,
              "parentMenuId": 0,
              "sortOrder": 4,
              "menuName": "게시판 관리",
              "menuLink": "http://cgv.dev-ncpworkplace.com/bds/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-post-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 50,
              "parentMenuId": 0,
              "sortOrder": 5,
              "menuName": "근태",
              "menuLink": "http://cgv.dev-ncpworkplace.com/tcs/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-work-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 57,
              "parentMenuId": 0,
              "sortOrder": 6,
              "menuName": "서약서",
              "menuLink": "http://cgv.dev-ncpworkplace.com/plgs/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-pledge-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 49,
              "parentMenuId": 0,
              "sortOrder": 7,
              "menuName": "비용",
              "menuLink": "http://cgv.dev-ncpworkplace.com/exp/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-cost-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 53,
              "parentMenuId": 0,
              "sortOrder": 8,
              "menuName": "지출",
              "menuLink": "http://cgv.dev-ncpworkplace.com/bcs/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-expense-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 54,
              "parentMenuId": 0,
              "sortOrder": 9,
              "menuName": "영업 관리",
              "menuLink": "http://cgv.dev-ncpworkplace.com/sls/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-sales-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 36,
              "parentMenuId": 0,
              "sortOrder": 10,
              "menuName": "회계",
              "menuLink": "http://cgv.dev-ncpworkplace.com/fns/manager",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-finance-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 44,
              "parentMenuId": 0,
              "sortOrder": 11,
              "menuName": "Admin",
              "menuLink": "http://cgv.dev-ncpworkplace.com/admin",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-management-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            }
          ],
          "otherMenus": [],
          "userMenus": [
            {
              "menuId": 506,
              "parentMenuId": 0,
              "sortOrder": 0,
              "menuName": "내정보_서약서 (테스트)",
              "menuLink": "http://cgv.dev-ncpworkplace.com/mySetting",
              "targetWindow": "CURRENT",
              "icon": "icon-imageIcon-collabo-etc-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 507,
              "parentMenuId": 0,
              "sortOrder": 1,
              "menuName": "내정보_입퇴사 (테스트)",
              "menuLink": "http://cgv.dev-ncpworkplace.com/mySetting/checkList",
              "targetWindow": "CURRENT",
              "icon": "icon-imageIcon-collabo-etc-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 508,
              "parentMenuId": 0,
              "sortOrder": 2,
              "menuName": "게시판사용자 (테스트)",
              "menuLink": "http://cgv.dev-ncpworkplace.com/bds/user",
              "targetWindow": "CURRENT",
              "icon": "icon-imageIcon-collabo-etc-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            },
            {
              "menuId": 60,
              "parentMenuId": 0,
              "sortOrder": 50,
              "menuName": "게시판",
              "menuLink": "/",
              "targetWindow": "NEW",
              "icon": "icon-imageIcon-service-post-active",
              "menuKey": null,
              "wholeOrder": null,
              "hasNew": false
            }
          ]
        },
        "signOut": {
          "jsonp": false,
          "process": null,
          "logoutUrl": "http://cgv.dev-ncpworkplace.com/authn/logoutProcess"
        },
        "useTerms": {
          "menuId": 0,
          "parentMenuId": 0,
          "sortOrder": 1,
          "menuName": "이용 약관",
          "menuLink": "https://www.ncloud.com/policy/terms/wipl1",
          "targetWindow": "NEW",
          "icon": null,
          "menuKey": null,
          "wholeOrder": null,
          "hasNew": false
        },
        "privacyTerms": {
          "menuId": 0,
          "parentMenuId": 0,
          "sortOrder": 1,
          "menuName": "개인 정보 처리 방침",
          "menuLink": "https://www.ncloud.com/policy/infou/infou",
          "targetWindow": "NEW",
          "icon": null,
          "menuKey": null,
          "wholeOrder": null,
          "hasNew": false
        }
      };
    }
  },

}
</script>
