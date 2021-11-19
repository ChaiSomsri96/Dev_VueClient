<template>
<!-- UI-DROPDOWN -->
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'Form input, dropdown ....'"/>
        <!-- //Header 영역 -->

        <!-- Body 영역 -->
        <div class="content-body">

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">1. Normal input</h2>
                <div class="col-3 p-0">
                    <ui-input :value="case2.value"
                              @change="case2.value=$event; case2.return=$event;"
                              :options="{
                                                trim         : true,
                                                maxLength    : 15,
                                                placeHolder  : '이곳에 입력하세요.',
                                                addDivClass  : 'input-group p-0',
                                                addInputClass: 'essential'
                                            }"/>
                </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">2. Number input</h2>
                <div class="col-3 p-0">
                    <ui-input-number :value="case3.value"
                                     @change="case3.value=$event; case3.return=$event;"
                                     :options="{
                                                       allowMinus   : false,
                                                       maxLength    : 5,
                                                       decimalPlace : 4,
                                                       placeHolder  : '소숫점 넷째자리까지 입력하세요.',
                                                       addDivClass  : 'input-group',
                                                       addInputClass: 'essential'
                                                   }"/>
                </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">3. Date input</h2>
                <div class="col-3 p-0">
                    <ui-input-date :date="case1.date" @change="case1.date=$event; case1.return=$event;"/>
                </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">4. Date input 2 </h2>
                <div class="col-3 p-0">
                    <div class="colwrap">
                        <div class="colwrap-item bradius-all">
                            <ui-input-date :date="case2.date1"
                                           :max-date="case2.date2"
                                           @change="case2.date1=$event; case2.return1=$event;"
                                           :options="{addInputClass: 'essential'}"/>
                        </div>
                        <div class="colwrap-item">
                            <span>~</span>
                        </div>
                        <div class="colwrap-item bradius-all">
                            <ui-input-date :date="case2.date2"
                                           :min-date="case2.date1"
                                           @change="case2.date2=$event; case2.return2=$event;"
                                           :options="{addInputClass: 'essential'}"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">5. dropdwon 기본형</h2>

                    <div class="col-3 p-0">
                        <ui-dropdown :items="case1.items"
                                     :value="case1.value"
                                     @change="case1.value=$event.value; case1.return=$event"/>
                    </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">6. dropdwon 기본형 + 전체</h2>

                    <div class="col-3 p-0">
                        <ui-dropdown :items="case2.items"
                                     :value="case2.value"
                                     @change="case2.value=$event.value; case2.return=$event"
                                     :options="{setAll: true}"/>
                    </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">7. dropdwon items 가 단순 배열인 경우</h2>

                    <div class="col-3 p-0">
                        <ui-dropdown :items="case3.items"
                                     :value="case3.value"
                                     @change="case3.value=$event.value; case3.return=$event;"
                                     :options="{setSelect: true}"/>
                    </div>
            </div>

            <div class="form-wrap border-top-0">
                <h2 class="title-wrap">8. dropdwon Full Spec</h2>

                    <div class="col-3 p-0">
                        <ui-dropdown :items="case4.items"
                                     :value="case4.value"
                                     @change="case4.value=$event.value; case4.return=$event;"
                                     :options="{
                                                   setAll      : true,
                                                   valueField  : 'code',
                                                   labelField  : 'message',
                                                   tooltipField: 'message',
                                                   width       : '200px',
                                                   maxHeight   : '200px',
                                                   addDivClass : 'col-4 p-0',
                                                   addBtnClass : 'essential',
                                                   dropup      : true
                                               }"/>
                    </div>
            </div>
        </div>
        <!-- //Body 영역 -->
    </div>

</template>

<script>
    import UiInputDate from "workplace-vue-common-ui";
    import UiInputNumber from "workplace-vue-common-ui";
    import UiInput from "workplace-vue-common-ui";
    import UiDropdown from "workplace-vue-common-ui";
    import DefaultUsage from "workplace-vue-common-ui";
    import DefaultUsageItem from "workplace-vue-common-ui";

    export default {
        components: {
        },
        data() {
            return {
                case1: {
                    options: null,
                    value  : 'A',
                    date   : '20210412',
                    return : null,
                    items  : [
                        {
                            cd  : 'A',
                            cdNm: {
                                message: '선택 A'
                            }
                        },
                        {
                            cd  : 'B',
                            cdNm: {
                                message: '선택 B'
                            }
                        },
                        {
                            cd  : 'C',
                            cdNm: {
                                message: '선택 C'
                            }
                        }
                    ]
                },
                case2: {
                    value  : 'value2',
                    date1  : '20210410',
                    date2  : '20210412',
                    return : null,
                    items  : [
                        {
                            cd  : 'AA',
                            cdNm: {
                                message: '코드 AA'
                            }
                        },
                        {
                            cd  : 'BB',
                            cdNm: {
                                message: '코드 BB'
                            }
                        },
                        {
                            cd  : 'CC',
                            cdNm: {
                                message: '코드 CC'
                            }
                        }
                    ]
                },
                case3: {
                    value  : '2021',
                    return : {},
                    items  : [
                        2020,
                        2021,
                        2022,
                        2023,
                        2024
                    ]
                },
                case4: {
                    value  : 'AAA',
                    return : null,
                    items  : [
                        {
                            code   : 'AAA',
                            message: '코드 AAA'
                        },
                        {
                            code   : 'BBB',
                            message: '코드 BBB'
                        },
                        {
                            code   : 'CCC',
                            message: '코드 CCC'
                        },
                        {
                            code   : 'DDD',
                            message: '코드 DDD'
                        },
                        {
                            code   : 'EEE',
                            message: '코드 EEE'
                        },
                        {
                            code   : 'FFF',
                            message: '코드 FFF'
                        }
                    ]
                }
            }
        }
    }
</script>