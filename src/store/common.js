/**
 * 공통 데이터 저장소
 */
import {getGnbProxy, getLnbProxy} from "@/api/common/proxy";

const common = {
    namespaced: true,
    state     : {
        gnb : {},
        lnb : {},
    },
    getters   : {
        getGnb(state) {
            return state.gnb;
        },
        getLnb(state) {
            return state.lnb;
        },
    },
    mutations : {
        setGnb(state, gnb) {
            state.gnb = gnb;
        },
        setLnb(state, lnb) {
            state.lnb = lnb;
        },
    },
    actions   : {
        async GNB({commit}) {
            const $this = this;
            try {
                const {data} =  $this.getDummyGnb(); // await getGnbProxy(); // api 호출
                commit('setGnb', data);
            } catch (e) {
                console.error(e);
            }
        },
        async LNB({commit}) {
            const $this = this;
            try {
                const {data} = $this.getDummyLnb(); // await getLnbProxy(); // api 호출

                // TODO : router-link 오류로 '/bcs/manager/' 제거 시킴
                data.menus.forEach((menu) => {
                    menu.menuLink = menu.menuLink.replace("/bcs/manager", "");
                });
                data.home.menuLink = data.home.menuLink.replace("/bcs/manager", "/");

                commit('setLnb', data);
            } catch (e) {
                console.error(e);
            }
        },

        getDummyLnb: function(){
            return {
                "theme"   : {
                    "logo"          : "NONE",
                        "bodyTheme"     : "blue",
                        "lnbThemeClass" : "light",
                        "title"         : "CGV default",
                        "companyName"   : null,
                        "imageUrl"      : "/uikit/dist/img/logo_workplace_v2.png",
                        "bodyThemeClass": "theme-blue"
                },
                "home"    : {
                    "menuId"      : 0,
                        "parentMenuId": 0,
                        "sortOrder"   : 0,
                        "menuName"    : "샘플 홈",
                        "menuLink"    : "/mbr/manager",
                        "targetWindow": null,
                        "icon"        : "icon-imageIcon-service-personnel-active service-icon lnb-select-img",
                        "menuKey"     : null,
                        "wholeOrder"  : null
                },
                "menus"   : [
                    {
                        "menuId"      : 496,
                        "parentMenuId": 0,
                        "sortOrder"   : 1,
                        "menuName"    : "급여일 관리",
                        "menuLink"    : "",
                        "targetWindow": "",
                        "icon"        : null,
                        "menuKey"     : "MENU_DEPT",
                        "wholeOrder"  : "0000000001"
                    },
                    {
                        "menuId"      : 497,
                        "parentMenuId": 0,
                        "sortOrder"   : 1,
                        "menuName"    : "급여코드 관리",
                        "menuLink"    : "",
                        "targetWindow": "",
                        "icon"        : null,
                        "menuKey"     : "MENU_DEPT",
                        "wholeOrder"  : "0000000001"
                    },
                    {
                        "menuId"      : 498,
                        "parentMenuId": 497,
                        "sortOrder"   : 1,
                        "menuName"    : "급여코드 생성",
                        "menuLink"    : "",
                        "targetWindow": "",
                        "icon"        : null,
                        "menuKey"     : "MENU_DEPT",
                        "wholeOrder"  : "0000000001"
                    },

                ],
                    "ownMenus": {
                    "header": null,
                        "menus" : [
                        {
                            "menuId"      : 54,
                            "parentMenuId": 0,
                            "sortOrder"   : 0,
                            "menuName"    : "영업",
                            "menuLink"    : "cgv.dev-ncpworkplace.com/sls/manager",
                            "targetWindow": "NEW",
                            "icon"        : "icon-imageIcon-collabo-etc-active",
                            "menuKey"     : null,
                            "wholeOrder"  : null
                        },
                    ]
                },
                "otherMenus": []
            };
        },

        getDummyGnb: function(){
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
                        "menuName": "자주하는 질문",
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
                        "hasNew": false
                    },
                    {
                        "menuId": 0,
                        "parentMenuId": 0,
                        "sortOrder": 6,
                        "menuName": "이용약관",
                        "menuLink": "https://www.ncloud.com/policy/terms/wipl1",
                        "targetWindow": "NEW",
                        "icon": null,
                        "menuKey": null,
                        "wholeOrder": null,
                        "hasNew": false
                    },
                    {
                        "menuId": 0,
                        "parentMenuId": 0,
                        "sortOrder": 7,
                        "menuName": "개인 정보 처리 방침",
                        "menuLink": "https://www.ncloud.com/policy/infou/infou",
                        "targetWindow": "NEW",
                        "icon": null,
                        "menuKey": null,
                        "wholeOrder": null,
                        "hasNew": false
                    }
                ],
                "gnbMenu": {
                    "worksMenus": [],
                    "ownMenus": [
                        {
                            "menuId": 53,
                            "parentMenuId": 0,
                            "sortOrder": 0,
                            "menuName": "지출",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/bcs/manager",
                            "targetWindow": "NEW",
                            "icon": "icon-imageIcon-collabo-etc-active",
                            "menuKey": null,
                            "wholeOrder": null,
                            "hasNew": false
                        },
                        {
                            "menuId": 54,
                            "parentMenuId": 0,
                            "sortOrder": 1,
                            "menuName": "영업",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/sls/manager",
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
                            "menuId": 50,
                            "parentMenuId": 0,
                            "sortOrder": 3,
                            "menuName": "근태",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/tcs/manager",
                            "targetWindow": "NEW",
                            "icon": "icon-imageIcon-service-work-active",
                            "menuKey": null,
                            "wholeOrder": null,
                            "hasNew": false
                        },
                        {
                            "menuId": 36,
                            "parentMenuId": 0,
                            "sortOrder": 5,
                            "menuName": "회계",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/fns/manager",
                            "targetWindow": "NEW",
                            "icon": "icon-imageIcon-service-finance-active",
                            "menuKey": null,
                            "wholeOrder": null,
                            "hasNew": false
                        },
                        {
                            "menuId": 34,
                            "parentMenuId": 0,
                            "sortOrder": 6,
                            "menuName": "워크플로우",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/wfs/manager",
                            "targetWindow": "NEW",
                            "icon": "icon-imageIcon-service-workflow-active",
                            "menuKey": null,
                            "wholeOrder": null,
                            "hasNew": false
                        },
                        {
                            "menuId": 44,
                            "parentMenuId": 0,
                            "sortOrder": 7,
                            "menuName": "Admin",
                            "menuLink": "http://cgv.dev-ncpworkplace.com/admin",
                            "targetWindow": "NEW",
                            "icon": "icon-imageIcon-service-management-active",
                            "menuKey": null,
                            "wholeOrder": null,
                            "hasNew": false
                        }
                    ],
                    "otherMenus": []
                },
                "signOut": {
                    "jsonp": false,
                    "process": null,
                    "logoutUrl": "http://cgv.dev-ncpworkplace.com/authn/logoutProcess"
                }
            };
        }
    }
};

export default common;