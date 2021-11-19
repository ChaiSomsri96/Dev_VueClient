import commonUtils from "@/api/wpUtils";

/**
 * 샘플 페이지용 메뉴 데이터
 *
 * @returns {Promise}
 */
function getSampleMenu() {
    return new Promise((resolve) => {
        const response = {
            data: {
                theme: {
                    logo          : "NONE",
                    bodyTheme     : "blue",
                    lnbThemeColor : "light",
                    title         : "WORKPLACE",
                    companyName   : null,
                    imageUrl      : "/uikit/dist/img/logo_workplace_v2.png",
                    bodyThemeClass: "theme-blue"
                },
                home: {
                    "name": "내공간",
                    "menuGroups": [
                        {
                            "name": "",
                            "type": "group",
                            "menus": [
                                {
                                    "menuType": "USER_DEFAULT_MY_BOARD",
                                    "menuNm": "내 공간",
                                    "menuLink": "/user/main/myboard/index"
                                },
                                {
                                    "menuType": "USER_DEFAULT_SHARE_BOARD",
                                    "menuNm": "최신 공유 소식",
                                    "menuLink": "/user/main/shareboard/index"
                                }
                            ]
                        },
                        {
                            "name": "",
                            "type": "group",
                            "menus": [
                                {
                                    "menuType": "USER_WORKFLOW_FILLIN",
                                    "menuNm": "문서 작성",
                                    "menuLink": "/user/main/fillin"
                                },
                                {
                                    "menuType": "USER_WORKFLOW_ALL",
                                    "menuNm": "전체 문서",
                                    "menuLink": "/user/docbox/all"
                                },
                                {
                                    "menuType": "USER_WORKFLOW_ING",
                                    "menuNm": "진행 문서",
                                    "menuLink": "/user/docbox/ongoing"
                                },
                                {
                                    "menuType": "USER_WORKFLOW_CMPLT",
                                    "menuNm": "완료 문서",
                                    "menuLink": "/user/docbox/closed"
                                }
                            ]
                        },
                        {
                            "name": "근태 관리",
                            "type": "sub",
                            "menus": [
                                {
                                    "menuType": "USER_TIMECLOCK_MY_ABSN",
                                    "menuNm": "나의 부재 일정",
                                    "menuLink": "/user/my-absence"
                                },
                                {
                                    "menuType": "USER_TIMECLOCK_ABSN_STATUS",
                                    "menuNm": "부재 현황",
                                    "menuLink": "/user/absence-status"
                                },
                                {
                                    "menuType": "USER_TIMECLOCK_COMMUTE_STATUS",
                                    "menuNm": "출퇴근 현황",
                                    "menuLink": "/user/commute-status"
                                },
                                {
                                    "menuType": "USER_TIMECLOCK_WORK_STATIS",
                                    "menuNm": "근로 시간 현황",
                                    "menuLink": "/user/work-statistics"
                                }
                            ]
                        },
                        {
                            "name": "비용 관리",
                            "type": "sub",
                            "menus": [
                                {
                                    "menuType": "USER_EXPENSE_UAPL",
                                    "menuNm": "비용 계획 현황",
                                    "menuLink": "/user/eup/expUaplSearch"
                                },
                                {
                                    "menuType": "USER_EXPENSE_UAPL",
                                    "menuNm": "비용 정산 현황",
                                    "menuLink": "/user/esp/expSaplSearch"
                                },
                                {
                                    "menuType": "USER_EXPENSE_UAPL",
                                    "menuNm": "예산 현황",
                                    "menuLink": "/user/ebd/expBudList"
                                },
                                {
                                    "menuType": "USER_EXPENSE_UAPL",
                                    "menuNm": "법인 카드 사용 내역",
                                    "menuLink": "/user/exp/cardUse"
                                }
                            ]
                        },
                        {
                            "name": "문서 조회",
                            "type": "sub",
                            "menus": [
                                {
                                    "menuType": "USER_DOC_DATATRANS",
                                    "menuNm": "이관 문서 조회",
                                    "menuLink": "/user/datatransferMgr/list"
                                },
                                {
                                    "menuType": "USER_DOC_DOCMNG",
                                    "menuNm": "업무 문서 조회",
                                    "menuLink": "/user/docmng/bfmain"
                                }
                            ]
                        }
                    ]
                },
                sales: {
                    "name": "영업",
                    "menuGroups": [
                        {
                            "name": "",
                            "type": "group",
                            "menus": [
                                {
                                    "menuType": "HOME_MENU1",
                                    "menuNm": "매출 계획 비교표",
                                    "menuLink": "/sls/manager/m/view/sale-plan/compare"
                                },
                                {
                                    "menuType": "HOME_MENU2",
                                    "menuNm": "현 재고 조회",
                                    "menuLink": "/sls/manager/m/view/goods/current"
                                },
                                {
                                    "menuType": "HOME_MENU3",
                                    "menuNm": "견적서 조회",
                                    "menuLink": "/sls/manager/m/view/estimate/list"
                                },
                                {
                                    "menuType": "HOME_MENU4",
                                    "menuNm": "견적서 작성",
                                    "menuLink": "/sls/manager/m/view/estimate/info"
                                },
                                {
                                    "menuType": "HOME_MENU5",
                                    "menuNm": "견적서 현황",
                                    "menuLink": "/sls/manager/m/view/estimate/status"
                                },
                                {
                                    "menuType": "HOME_MENU6",
                                    "menuNm": "주문서 조회",
                                    "menuLink": "/sls/manager/m/view/order/list"
                                },
                                {
                                    "menuType": "HOME_MENU7",
                                    "menuNm": "주문서 작성",
                                    "menuLink": "/sls/manager/m/view/order/info"
                                },
                                {
                                    "menuType": "HOME_MENU8",
                                    "menuNm": "주문서 현황",
                                    "menuLink": "/sls/manager/m/view/order/status"
                                },
                                {
                                    "menuType": "HOME_MENU9",
                                    "menuNm": "판매 현황",
                                    "menuLink": "/sls/manager/m/view/sale-product/list"
                                }
                            ]
                        }
                    ]
                },
                board: {
                    "name": "게시판",
                    "menuGroups": [
                        {
                            "name": "",
                            "type": "group",
                            "menus": [
                                {
                                    "menuType": "HOME_MAIN",
                                    "menuNm": "게시판 홈",
                                    "menuLink": "/bds/user/home/boardHome"
                                },
                                {
                                    "menuType": "HOME_TOTAL_BOARD",
                                    "menuNm": "전체 게시판",
                                    "menuLink": "/bds/user/board/allPost"
                                },
                                {
                                    "menuType": "HOME_NOTICE_BOARD",
                                    "menuNm": "필톡 게시판",
                                    "menuLink": "/bds/user/board/mustReadPost"
                                }
                            ]
                        },
                        {
                            "name": "",
                            "type": "group",
                            "menus": [
                                {
                                    "menuType": "TIMELINE_MY",
                                    "menuNm": "내 활동내역",
                                    "menuLink": "/bds/user/myActivity/myBoard"
                                }
                            ]
                        }
                    ]
                }
            }
        };

        console.info("getMenuInfo ===>>>");
        console.info(response);

        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}
/**
 * 샘플 페이지용 Dummy 시스템 및 사용자 정보 조회
 *
 * @returns {Promise}
 */
function getDummyUserInfo() {
    return new Promise((resolve) => {
        const response = {
            data: {
                verParam    : "20210426-sample-test",
                staticPath  : "kr",
                //staticDomain: "https://pages.oss.navercorp.com/workplace/workplace-vue-common-ui/sample/static_copy",
                staticDomain  : "http://waltz.tx2.kr/assets",
                commonDomain: "",
                loginId     : "admin@cgv.co.kr",
                empId       : "96b02530-82de-41c8-8223-3055c74e705e",
                empNm       : "관리자",
                empNick     : "관리자 닉네임",
                deptNo      : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                deptNm      : "씨지브이",
                company     : {
                    companyId      : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                    branchCompanyId: "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                    zoneId         : "Pacific/Midway",
                    zoneOffset     : "GMT -11:00",
                    initLocale     : "ko_KR",
                    useMlng        : true,
                    aplyMlng       : "ko_KR,en_US,ja_JP,zh_CN,zh_TW"
                },
                companyEnv  : {
                    useAdminAuthn: false
                },
                product     : {
                    useWorks: false,
                    free    : false,
                    nation  : "KR"
                },
                i18nInfo    : {
                    locale    : "ko_KR",
                    zoneId    : "Asia/Seoul",
                    zoneOffset: "GMT +09:00",
                    dateFormat: "yyyy.MM.dd",
                    lang      : "ko"
                }
            }
        };
        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}

/**
 * 샘플 페이지용 Dummy 다국어 정보 조회
 *
 * @returns {Promise}
 */
function getDummyMlngInfo() {
    return new Promise((resolve) => {
        const response = {
            data: {
                "js.sample.title.home"      : "샘플 홈",
                "js.sample.title.header"    : "헤더 메세지 입니다.",
                "js.sample.title.subHeader" : "보조 메세지 입니다.",
                "js.sample.message.text"    : "다국어 샘플 Message 입니다.",
                "js.sample.message.textArgs": "Args 적용 가능한 다국어 샘플 Message 입니다. {0} / {1}",
                "js.sample.message.html"    : "HTML이 포함된 다국어 샘플 <b>Message</b> 입니다.",
                "js.sample.message.htmlArgs": "HTML이 포함된 <b>Args 적용 가능한</b> 다국어 샘플 Message 입니다. {0} / {1}",
                "js.sample.alert.test"      : "이것은 다국어 샘플 Alert 입니다.",
            }
        };

        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}

/**
 * 샘플 페이지용 Dummy 사원/부서 자동 완성
 *
 * @returns {Promise}
 */
function getDummyAutoEmpDept(searchParam) {
    return new Promise((resolve) => {
        // AjaxResult + Axios Return 구조
        const response = {
            data: {
                "search": {
                    "searchKeyword": "",
                    "searchType"   : "AC-TYPE-SC3",
                    "searchEmp"    : true,
                    "searchDept"   : true,
                    "companyIds"   : [
                        "e721e2da-29ee-4782-9672-3d2b150ac1a6"
                    ],
                    "limit"        : 30
                },
                "list"  : [
                    {
                        "type"            : "EMP",
                        "tenantId"        : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "companyId"       : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "empId"           : "bf9c8484-b5a9-4b72-a807-fbf7f14b4c14",
                        "email"           : "alba001@cgv.co.kr",
                        "loginId"         : "alba001@cgv.co.kr",
                        "deptNo"          : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "grade"           : "",
                        "job"             : "",
                        "empStatCd"       : "IN",
                        "empTypeCd"       : "126eb5ba-dec6-4e53-aae6-0eedee265d80",
                        "acType"          : "EMP",
                        "acTypeStatus"    : "IN",
                        "empNm"           : "알바",
                        "localEmpNm"      : null,
                        "originalEmpNm"   : "알바",
                        "companyNm"       : null,
                        "deptNm"          : "씨지브이",
                        "gradeNm"         : null,
                        "jobNm"           : null,
                        "statusNm"        : "재직",
                        "empTypeNm"       : null,
                        "nickName"        : null,
                        "empNameJson"     : null,
                        "originalDeptNm"  : null,
                        "deptNameJson"    : null,
                        "mobileMsg"       : "씨지브이",
                        "msg"             : "알바 (씨지브이)",
                        "mobileTargetName": "알바"
                    },
                    {
                        "type"            : "EMP",
                        "tenantId"        : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "companyId"       : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "empId"           : "050b795c-e2b7-406f-b9d1-c080987888c5",
                        "email"           : "33@cgv.co.kr",
                        "loginId"         : "33@cgv.co.kr",
                        "deptNo"          : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "grade"           : null,
                        "job"             : null,
                        "empStatCd"       : "IN",
                        "empTypeCd"       : null,
                        "acType"          : "EMP",
                        "acTypeStatus"    : "IN",
                        "empNm"           : "박테스트",
                        "localEmpNm"      : "박테스트",
                        "originalEmpNm"   : "박테스트",
                        "companyNm"       : null,
                        "deptNm"          : "씨지브이",
                        "gradeNm"         : null,
                        "jobNm"           : null,
                        "statusNm"        : "재직",
                        "empTypeNm"       : null,
                        "nickName"        : null,
                        "empNameJson"     : null,
                        "originalDeptNm"  : null,
                        "deptNameJson"    : null,
                        "mobileMsg"       : "씨지브이",
                        "msg"             : "박테스트 (씨지브이)",
                        "mobileTargetName": "박테스트"
                    },
                    {
                        "type"            : "EMP",
                        "tenantId"        : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "companyId"       : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "empId"           : "7e2872e3-cf22-4d53-82ea-fb137c574d09",
                        "email"           : "nana@cgv.co.kr",
                        "loginId"         : "nana@cgv.co.kr",
                        "deptNo"          : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "grade"           : null,
                        "job"             : null,
                        "empStatCd"       : "IN",
                        "empTypeCd"       : null,
                        "acType"          : "EMP",
                        "acTypeStatus"    : "IN",
                        "empNm"           : "김메일",
                        "localEmpNm"      : null,
                        "originalEmpNm"   : "김메일",
                        "companyNm"       : null,
                        "deptNm"          : "씨지브이",
                        "gradeNm"         : null,
                        "jobNm"           : null,
                        "statusNm"        : "재직",
                        "empTypeNm"       : null,
                        "nickName"        : null,
                        "empNameJson"     : null,
                        "originalDeptNm"  : null,
                        "deptNameJson"    : null,
                        "mobileMsg"       : "씨지브이",
                        "msg"             : "김메일 (씨지브이)",
                        "mobileTargetName": "김메일"
                    },
                    {
                        "type"            : "EMP",
                        "tenantId"        : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "companyId"       : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "empId"           : "2a5fe402-92c4-48ad-a9de-bb13f6923b37",
                        "email"           : "sdasdas@cgv.co.kr",
                        "loginId"         : "sdasdas@cgv.co.kr",
                        "deptNo"          : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "grade"           : null,
                        "job"             : null,
                        "empStatCd"       : "IN",
                        "empTypeCd"       : null,
                        "acType"          : "EMP",
                        "acTypeStatus"    : "IN",
                        "empNm"           : "김테스트",
                        "localEmpNm"      : null,
                        "originalEmpNm"   : "김테스트",
                        "companyNm"       : null,
                        "deptNm"          : "씨지브이",
                        "gradeNm"         : null,
                        "jobNm"           : null,
                        "statusNm"        : "재직",
                        "empTypeNm"       : null,
                        "nickName"        : null,
                        "empNameJson"     : null,
                        "originalDeptNm"  : null,
                        "deptNameJson"    : null,
                        "mobileMsg"       : "씨지브이",
                        "msg"             : "김테스트 (씨지브이)",
                        "mobileTargetName": "김테스트"
                    },
                    {
                        "type"            : "EMP",
                        "tenantId"        : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "companyId"       : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "empId"           : "b5b79823-35cd-43b5-b6b7-697c33c37647",
                        "email"           : "asdlfjf@cgv.co.kr",
                        "loginId"         : "asdlfjf@cgv.co.kr",
                        "deptNo"          : "e721e2da-29ee-4782-9672-3d2b150ac1a6",
                        "grade"           : null,
                        "job"             : null,
                        "empStatCd"       : "IN",
                        "empTypeCd"       : "b05a9ce3-ce02-4b92-b5a0-0706881bf7e7",
                        "acType"          : "EMP",
                        "acTypeStatus"    : "IN",
                        "empNm"           : "김신입",
                        "localEmpNm"      : null,
                        "originalEmpNm"   : "김신입",
                        "companyNm"       : null,
                        "deptNm"          : "씨지브이",
                        "gradeNm"         : null,
                        "jobNm"           : null,
                        "statusNm"        : "재직",
                        "empTypeNm"       : "정규직",
                        "nickName"        : null,
                        "empNameJson"     : null,
                        "originalDeptNm"  : null,
                        "deptNameJson"    : null,
                        "mobileMsg"       : "씨지브이",
                        "msg"             : "김신입 (씨지브이)",
                        "mobileTargetName": "김신입"
                    }
                ]
            }
        };

        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}

/**
 * 샘플 페이지용 가상 파일 업로드 API
 *
 * @returns {Promise}
 */
function uploadTempFilesApi(files) {
    return new Promise((resolve) => {

        let attachedFileList = [];
        files.forEach(function (item) {
            attachedFileList.push({
                fileId    : commonUtils.generateUUIDv4(),
                blngSectId: 'blngSectId',
                blngId    : 'temp-file-upload',
                fileStat  : 'tmp',
                fileNm    : item.name,
                filePath  : '/dummy/filePath',
                fileSz    : item.size
            })
        })


        // AjaxResult + Axios Return 구조
        const response = {
            data: attachedFileList
        };
        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}

/**
 * 샘플 페이지용 가상 파일 삭제 API
 *
 * @returns {Promise}
 */
function deleteFileApi(fileId) {
    return new Promise((resolve) => {
        // AjaxResult + Axios Return 구조
        const response = {
            data: {}
        };

        // console.info("upload dummy delete files ===>>>");
        // console.info(fileId);
        // console.info(response);

        window.setTimeout(function () {
            resolve(response);
        }, 100);
    });
}

export {getDummyUserInfo, getDummyMlngInfo, getDummyAutoEmpDept, uploadTempFilesApi, deleteFileApi, getSampleMenu}
