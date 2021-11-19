<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'Form - layout'"/>
        <!-- Body 영역 -->
        <div class="content-body">



          <!-- 필수 입력 사항 has-important 클래스 추가 -->
          <div class="has-important">
            <div class="input-group">
              <input type="text" class="form-control type-basic form-control-danger" placeholder="텍스트를 입력하세요." value="텍스트">
            </div>
            <h5 class="mt-5">필수 입력 사항의 도움말 텍스트 / 강조하는 도움말 텍스트</h5>
          </div>

          <!-- 필수 입력 값이 입력되지 않았을 때 has-danger 클래스 추가 -->
          <div class="has-danger">
            <div class="input-group">
              <input type="text" class="form-control type-basic form-control-danger" value="">
            </div>
            <h5 class="mt-5">필수 입력값이 입력되지 않았을 때의 도움말 텍스트</h5>
          </div>

          <!-- 에러 상황일 때 has-danger 클래스 추가 --->
          <div class="has-danger">
            <div class="input-group">
              <input type="text" class="form-control type-basic form-control-danger" value="ㅏㅏㅏ">
            </div>
            <h5 class="mt-5">올바른 입력이 아닙니다.</h5>
          </div>

          <!-- 입력값이 유효할 때 has-success 클래스 추가 --->
          <div class="has-success">
            <div class="input-group">
              <input type="text" class="form-control form-control-success" value="텍스트">
              <button type="button" class="btn btn-sm" disabled="">
                <i class="icon-lineIcon-success"></i>
              </button>
            </div>
            <h5 class="mt-5">입력이 완료되었습니다.</h5>
          </div>


          <div class="form-area">
                <div class="form-wrap">
                    <div class="form-group row">
                        <label class="form-label type2 col-2">
                            <span>라벨</span>
                        </label>
                        <div class="row col-6">
                            <ui-input :value="case1.value" @change="case1.value=$event; case1.return=$event;"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="form-label type2 col-2">
                            <span>라벨</span>
                        </label>
                        <div class="row col-10">
                            컴포넌트
                        </div>
                    </div>
                </div>
                <div class="form-wrap">
                    <div class="form-group row">
                        <label class="form-label type2 col-2">
                            <span class="v-m">라벨</span><button class="btn btn-s flat solid ml-5" title="부가 설명 텍스트 툴팁" data-toggle="tooltip" data-placement="bottom_left"><i class="icon-solidIcon-help"></i></button>
                        </label>
                        <div class="row col-6">
                            컴포넌트
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="form-label type2 col-2">
                            <span>라벨</span>
                        </label>
                        <div class="row col-6">
                            <div class="form-group row">
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
                            <div class="form-group row">
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
                    </div>
                </div>
            </div>


            <br><br>
            <!-- form with title -->
            <div class="form-wrap">
                <h3 class="title-wrap">타이틀</h3>
                <div class="form-group row">
                    <label class="form-label col-2">
                        <span>라벨</span>
                    </label>
                    <div class="row col-6">
                        컴포넌트
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import UiInputDate from "workplace-vue-common-ui";
    import UiInputNumber from "workplace-vue-common-ui";
    import UiInput from "workplace-vue-common-ui";
    import UiDropdown from "workplace-vue-common-ui";

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
                    value  : '',
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