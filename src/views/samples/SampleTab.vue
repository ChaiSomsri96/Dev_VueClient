<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'급여 조회'"/>
        <!-- Body 영역 -->
      <div class="content-body">
        <!-- ############ PAGE START-->
        <div class="form-area pb-0">
          <!-- [D] form-snb 열릴시 form-snb-open 추가 -->
          <div class="form-wrap form-divide-wrap response form-snb-open-display form-snb-open">
            <div class="box border-box form-content input full">
              <div class="title-wrap type2">
                <h2>고객 불만 처리서</h2>
                <div class="ml-auto">
                  <!--PC 노출 항목 -->
                  <span class="ess front mr-17">필수입력 사항입니다.</span>
                  <!--모바일 노출 항목-->
                  <span class="ess text-blue mo-mode">필수입력</span>
                  <div class="ps-re pull-right">
                    <button type="button" id="menu-layer-button" class="btn btn-md white mb-3"><i class="icon-lineIcon-document mr-5"></i>임시저장 <span class="theme-color-txt roboto">(10)</span></button>
                    <div class="menu-list-layer">
                      <div class="mb-10">
                        <p><b>임시저장 목록</b></p>
                        <p class="text-888">임시 저장된 문서를 불러와서 작성할 수 있습니다. (최대 10개)</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <!-- [D] 콤포넌트 사이즈에 따라 sortable-nested-col영역에 50%: col-6 / 100%: col-12 클래스 적용 -->
                <!-- [D] 최소 사이즈 col-6 / 최대 사이즈 col-12 -->
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2 menu-thumb1">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span>부서검색</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="row">
                        <div class="col-8 pl-0">
                          <div class="input-group dropdown resizable">
                            <input type="text" class="form-control" id="search-highlight-input4" value="전체" data-toggle="dropdown" aria-expanded="false">
                            <!-- [D] #search-highlight-btn 클릭시, .resizable.type-input에 active클래스 추가  -->
                            <button id="search-highlight-btn4" class="btn btn-s white">
                              <i class="icon-lineIcon-treemenu"></i>
                            </button>
                            <div class="dropdown-menu">
                              <div ui-jp="mCustomScrollbar" class="mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar" style="position: relative; overflow: visible;"><div id="mCSB_1" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 0px;"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                                <a class="dropdown-item">가나다
                                  <span class="txt-blue">검색어</span>
                                </a>
                                <a class="dropdown-item">
                                  <span class="txt-blue">검색어</span> 라마바사
                                </a>
                                <a class="dropdown-item">
                                  <span class="txt-blue">검색어</span> 아자차카타파하
                                </a>
                              </div></div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                            </div>
                            <div class="menu-container">
                              <div class="menu-kit">
                                <h3 class="blind">조직도 트리 메뉴</h3>
                                <div id="menu-resizable4" class="menu-resizable horizontal ui-resizable" ui-jp="resizable">
                                  <div class="menu-scroll mCustomScrollbar _mCS_2 mCS-autoHide mCS_no_scrollbar" ui-jp="mCustomScrollbar" style="overflow: visible;"><div id="mCSB_2" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: none;"><div id="mCSB_2_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                                    <div class="menu-kit-area jstree jstree-1 jstree-default" ui-jp="jstree" role="tree" aria-multiselectable="true" tabindex="0" aria-activedescendant="j1_1" aria-busy="false"><ul class="jstree-container-ul jstree-children" role="group"><li role="treeitem" aria-selected="false" aria-level="1" aria-labelledby="j1_1_anchor" id="j1_1" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="j1_1_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i>
                                      <span data-original-title="메뉴 1depth">메뉴 1depth</span>
                                    </a></li><li role="treeitem" aria-selected="false" aria-level="1" aria-labelledby="j1_2_anchor" aria-expanded="false" id="j1_2" class="jstree-node  jstree-closed jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="j1_2_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i>
                                      <span data-original-title="메뉴 1depth">메뉴 1depth</span>
                                    </a></li></ul></div>
                                  </div></div><div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; height: 0px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                                  <div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <label class="md-check ellipsis fx-item" data-original-title="전체" data-toggle="tooltip" data-placement="bottom_center">
                          <input type="checkbox" checked="">
                          <i class="black"></i>전체
                        </label>
                      </div>
                      <div class="row">
                        <div class="col-12 pl-0 pr-0">
                          <div class="box border-box type3">
                            <div class="box-body mCustomScrollbar _mCS_3 mCS-autoHide" ui-jp="mCustomScrollbar" style="overflow: visible;"><div id="mCSB_3" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: none;"><div id="mCSB_3_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명">부서명</i></a>
                                <button class="btn btn-s flat solid pull-left">
                                  <i class="icon-solidIcon-cancel-red"></i>
                                </button>
                              </div>
                            </div></div><div id="mCSB_3_scrollbar_vertical" class="mCSB_scrollTools mCSB_3_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_3_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; height: 0px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 여섯 글자</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">기획팀
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">회계팀</a>
                          <a class="dropdown-item">기획팀</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                      <!--PC 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 중</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">기획팀
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">회계팀</a>
                          <a class="dropdown-item">기획팀</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 중</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control" maxlength="1000" placeholder="텍스트를 입력하세요.">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">기획팀
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">회계팀</a>
                          <a class="dropdown-item">기획팀</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control" maxlength="1000" placeholder="텍스트를 입력하세요.">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <label class="md-check">
                          <input type="checkbox">
                          <i class="black"></i>입고처리
                        </label>
                        <label class="md-check">
                          <input type="checkbox">
                          <i class="black"></i>현장처리
                        </label>
                        <label class="md-check">
                          <input type="checkbox">
                          <i class="black"></i>기타
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">기획팀
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">회계팀</a>
                          <a class="dropdown-item">기획팀</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 중</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control" maxlength="1000" placeholder="텍스트를 입력하세요.">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span>제목 소 길게 유입되는 경우 어떻게 될까요?</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">기획팀
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">회계팀</a>
                          <a class="dropdown-item">기획팀</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">akskdkflalsdifidlalksdkfhaslskdkfjjflakdsjfkakskdkflalsdifidlalksdkfhaslskdkfjjflakdsjfk</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control" maxlength="1000" placeholder="텍스트를 입력하세요.">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">서비스 요구사항</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <textarea class="form-control" maxlength="1000"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 날짜 선택 input -->
                      <div class="input-group date">
                        <input type="text" class="form-control ellipsis" ui-jp="daterangepicker" ui-options="{opens:'right',drops:'down',showDays:true,parentEl:$(this).parent()}">
                        <button class="input-group-addon calendar btn btn-s white"><i class="icon-lineIcon-calendar"></i></button>
                        <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                      <!--모바일 날짜 선택 input -->
                      <div class="input-group date mo-mode">
                        <input type="date" class="form-control ellipsis">
                        <button class="input-group-addon calendar btn btn-s white"><i class="icon-lineIcon-calendar"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 중</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="form-group row">
                        <div class="form-row row p-0">
                          <div class="row type-right-button p-0">
                            <div class="input-group">
                              <input type="text" class="form-control">
                            </div>
                          </div>
                          <button type="button" class="btn btn-m line-1 ml-5">
                            <i class="icon-lineIcon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group type-divide type-divide-ellipsis">
                        <div class="divide-left">
                          <span class="input-group-addon title ellipsis">KRW</span>
                        </div>
                        <div class="divide-right">
                          <input type="text" class="form-control" placeholder="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <button class="btn btn-md line-1 ellipsis">
                        <i class="icon-lineIcon-upload mr-5"></i>파일첨부
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">제목 소</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <button class="btn btn-md line-1 ellipsis">
                        <i class="icon-lineIcon-document mr-5"></i>연관문서
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">테이블</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <table class="tbl tbl-type2">
                        <colgroup>
                          <col>
                          <col>
                          <col>
                        </colgroup>
                        <thead>
                        <tr>
                          <th>
                            <div class="th-box">
                              <span class="th-text" title="필드명 1">필드명 1</span>
                            </div>
                          </th>
                          <th>
                            <div class="th-box">
                              <span class="th-text" title="필드명 2">필드명 2</span>
                            </div>
                          </th>
                          <th>
                            <div class="th-box">
                              <span class="th-text" title="필드명 3">필드명 3</span>
                            </div>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>
                            <div class="td-box">
                              <div class="input-group">
                                <input type="text" class="form-control">
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                              <div class="input-group">
                                <input type="text" class="form-control">
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                              <div class="input-group">
                                <input type="text" class="form-control">
                              </div>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">안내문구</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <textarea class="form-control" placeholder=""></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-15 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">에디터</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <img src="http://waltz.tx2.kr/dist/img/img-editor-area.png" alt="" width="100%" height="160">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-15 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">금액</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown col-3 p-0">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">KRW
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">메뉴1</a>
                          <a class="dropdown-item">메뉴2</a>
                          <a class="dropdown-item" disabled="">메뉴3</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box col-3 p-0">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                      <div class="input-group col-9 p-0 pl-1">
                        <input type="text" class="form-control pr-15" placeholder="">
                      </div>
                      <div class="row ">
                        <h5 class="mt-5 w-100 ellipsis">보조 텍스트 영역입니다. 보조 텍스트 영역입니다. 보조 텍스트
                          영역입니다.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-15 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">라디오 버튼</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <label class="md-check">
                          <input type="radio" name="radio1" checked="">
                          <i class="black"></i>항목1
                        </label>
                        <label class="md-check">
                          <input type="radio" name="radio1" checked="">
                          <i class="black"></i>항목2
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">시간/단일</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">12:30:00
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">메뉴1</a>
                          <a class="dropdown-item">메뉴2</a>
                          <a class="dropdown-item" disabled="">메뉴3</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">시간/범위</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 노출 드롭다운 input -->
                      <div class="input-group dropdown">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">12:30:00~12:50:00
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <a class="dropdown-item selected">메뉴1</a>
                          <a class="dropdown-item">메뉴2</a>
                          <a class="dropdown-item" disabled="">메뉴3</a>
                        </div>
                      </div>
                      <!--모바일 노출 드롭다운 input -->
                      <div class="select_box">
                        <label for="inputselect" class="blind">유형</label>
                        <!--[D]설텍트 박스를 통해 열때 보더색상 변경을 위해 show class를 추가해 주세요-->
                        <div class="input-group select_wrap">
                          <!--[D]placehoder 일 경우 text-placeholder class를 추가. 항목을 선택한 경우 class를 제거해 주세요-->
                          <button class="form-control select" data-original-title="기획팀">기획팀<i class="icon-lineIcon-line-arrow-down"></i></button>
                          <select id="inputselect">
                            <option>회계팀</option>
                            <option>기획팀</option>
                            <option>항목</option>
                            <option>항목</option>
                            <option>항목</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">날짜/단일</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 날짜 선택 input -->
                      <div class="input-group date pc-mode">
                        <input type="text" class="form-control ellipsis" ui-jp="daterangepicker" ui-options="{opens:'right',drops:'down',showDays:true,parentEl:$(this).parent()}">
                        <button class="input-group-addon calendar btn btn-s white"><i class="icon-lineIcon-calendar"></i></button>
                        <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                      <!--모바일 날짜 선택 input -->
                      <div class="input-group date mo-mode">
                        <input type="date" class="form-control ellipsis">
                        <button class="input-group-addon calendar btn btn-s white"><i class="icon-lineIcon-calendar"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">날짜/기간</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <!--PC 날짜 선택 input -->
                      <div class="input-group date pc-mode">
                        <input type="text" class="form-control" ui-jp="daterangepicker" ui-options="{opens:'right',drops:'down',rangeDatePicker:true,showDays:true,parentEl:$(this).parent(), autoApply: false}">
                        <button class="input-group-addon calendar btn btn-s white"><i class="icon-lineIcon-calendar"></i></button>
                        <div class="daterangepicker dropdown-menu ltr show-calendar opensright"><div class="time-line" style="display: none;"></div><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value=""><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value=""><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                      <!--모바일 날짜 선택 input -->
                      <div class="multi_iptbox mo-mode">
                        <ul class="multi_iptbox_list">
                          <li>
                            <div class="row">
                              <div class="fx-item position-r">
                                <div class="input-group">
                                  <input type="date" class="form-control">
                                </div>
                              </div>
                              <span class="pl-6 pr-6 text-center">-</span>
                              <div class="fx-item position-r">
                                <div class="input-group">
                                  <input type="date" class="form-control">
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">첨부파일</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <button class="btn btn-md line-1 ellipsis" data-toggle="modal" data-target="#myModal-md" data-backdrop="static">
                        <i class="icon-lineIcon-upload mr-5"></i><span>파일첨부</span>
                      </button>
                      <div class="modal" id="myModal-md" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-md scroll-type" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h2 class="modal-title">출퇴근 업로드</h2>
                              <button type="button" class="btn btn-m flat btn-close" data-dismiss="modal" aria-label="Close">
                                <i class="icon-lineIcon-close"></i>
                              </button>
                            </div>
                            <div class="modal-body mCustomScrollbar _mCS_4 mCS-autoHide mCS_no_scrollbar" ui-jp="mCustomScrollbar" style="overflow: visible;"><div id="mCSB_4" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 367px;"><div id="mCSB_4_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                              <div class="modal-body-top">
                                <p class="form-txt">아래 <b>'샘플파일 다운로드'</b> 받아서 작성하신
                                  후에 업로드 하세요.</p>
                                <button class="btn btn-md flat ml-2 mb-10">
                                  <i class="icon-lineIcon-download"></i>
                                  <span>샘플파일 다운로드</span>
                                </button>
                              </div>
                              <form action="" class="dropzone white dz-clickable uploadzone">
                                <div class="dz-message dz-clickable" ui-jp="dropzone" ui-options="{ url: '' }">
                                  <div class="upload-box">
                                    <label class="input-upload">
                                      <input type="file">
                                      <div class="file-txt">
                                        <i class="icon-lineIcon-upload mr-10"></i>클릭하여
                                        파일을 업로드 하세요.
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </form>
                            </div></div><div id="mCSB_4_scrollbar_vertical" class="mCSB_scrollTools mCSB_4_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_4_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                            <div class="modal-footer">
                              <div class="btn-wrap">
                                <button class="btn btn-md black">
                                  <i class="icon-lineIcon-check mr-5"></i>확인</button>
                                <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                                  <i class="icon-lineIcon-close mr-5"></i>취소
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">숫자</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">통화</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group type-divide type-divide-ellipsis">
                        <div class="divide-left">
                          <span class="input-group-addon title ellipsis">KRW</span>
                        </div>
                        <div class="divide-right">
                          <input type="text" class="form-control" placeholder="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">자동번호 발급</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="input-group">
                        <input type="text" class="form-control ellipsis" value="ABC-1234567" readonly="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">사원검색</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="divide-area row">
                        <div class="divide-item">
                          <div class="input-group">
                            <input type="text" class="form-control p-0" placeholder="">
                          </div>
                        </div>
                        <button type="button" class="btn btn-m line-1 ml-5 btn-static">
                          <i class="icon-lineIcon-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-4">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222"><span class="ess">연관문서</span></span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <button class="btn btn-md line-1 ellipsis">
                        <i class="icon-lineIcon-document mr-5"></i><span>연관문서</span>
                      </button>
                      <div class="row">
                        <h5 class="mt-5 w-100 ellipsis">보조 텍스트 영역입니다. 보조 텍스트 영역입니다. 보조 텍스트
                          영역입니다.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-6">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222">공지 등록</span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="row">
                        <label class="ui-switch blue mb-10 mt-3"><input type="checkbox"><i></i></label>
                      </div>
                      <div class="dropdown ph-0 col-12">
                        <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">필독 공지
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale" style="">
                          <a class="dropdown-item selected">필독 공지</a>
                          <a class="dropdown-item">공지</a>
                          <a class="dropdown-item" disabled="">....</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group divide-form-group row">
                <div class="row p-0 col-12">
                  <div class="input-group type-divide ph-5 pv-2">
                    <div class="divide-left">
                      <label class="form-label pl-15 col">
                        <span class="text-222">예약 등록 기간</span>
                      </label>
                    </div>
                    <div class="divide-right row">
                      <div class="row">
                        <label class="ui-switch blue mt-3 mb-5"><input type="checkbox"><i></i></label>
                      </div>
                      <div class="diveded-area row col-6 ph-0">
                        <div class="input-group col-6 date ph-0">
                          <input type="text" class="form-control ellipsis" ui-jp="daterangepicker" ui-options="{opens:'right',drops:'down',showDays:true,parentEl:$(this).parent()}">
                          <button class="input-group-addon calendar btn btn-s flat"><i class="icon-lineIcon-calendar"></i></button>
                          <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div>
                          <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                        <div class="dropdown col-3 pl-5 pr-0">
                          <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">1시
                            <i class="icon-lineIcon-line-arrow-up"></i>
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <div class="dropdown-menu dropdown-menu-scale" style="">
                            <a class="dropdown-item selected">1시</a>
                            <a class="dropdown-item">2시</a>
                            <a class="dropdown-item">3시</a>
                            <a class="dropdown-item">4시</a>
                            <a class="dropdown-item" disabled="">....</a>
                          </div>
                        </div>
                        <div class="dropdown col-3 pl-5 pr-0">
                          <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">00분
                            <i class="icon-lineIcon-line-arrow-up"></i>
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <div class="dropdown-menu dropdown-menu-scale" style="">
                            <a class="dropdown-item selected">00분</a>
                            <a class="dropdown-item">01분</a>
                            <a class="dropdown-item" disabled="">....</a>
                          </div>
                        </div>
                      </div>
                      <div class="diveded-area row col-6 ph-0">
                        <span class="ph-3 mt-5">~</span>
                        <div class="input-group date ph-0 fx-item">
                          <input type="text" class="form-control ellipsis" ui-jp="daterangepicker" ui-options="{opens:'right',drops:'down',showDays:true,parentEl:$(this).parent()}">
                          <button class="input-group-addon calendar btn btn-s flat"><i class="icon-lineIcon-calendar"></i></button>
                          <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div>
                          <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                        <div class="dropdown col-3 pl-5 pr-0">
                          <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">1시<i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i></button>
                          <div class="dropdown-menu dropdown-menu-scale" style="">
                            <a class="dropdown-item selected">1시</a>
                            <a class="dropdown-item">2시</a>
                            <a class="dropdown-item">3시</a>
                            <a class="dropdown-item">4시</a>
                            <a class="dropdown-item" disabled="">....</a>
                          </div>
                        </div>
                        <div class="dropdown col-3 pl-5 pr-0">
                          <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">00분
                            <i class="icon-lineIcon-line-arrow-up"></i>
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <div class="dropdown-menu dropdown-menu-scale" style="">
                            <a class="dropdown-item selected">00분</a>
                            <a class="dropdown-item">01분</a>
                            <a class="dropdown-item" disabled="">....</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- snb right -->
            <div class="snb right form-snb pt-0">
              <div class="accordion-wrap">
                <!-- [D] 비활성화시 class="accor-disabled" 추가 -->
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>처리할 사람</h3>
                      <button class="btn btn-sm black btn-add mt-5 mr-5 pull-right">
                        <span>수정</span>
                      </button>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="menu">
                      <div class="box-form">
                        <p class="text-aaa">처리할 사람이 없습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>처리할 사람</h3>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-wrap">
                      <div class="form-group row">
                        <div class="input-group">
                          <input type="text" class="form-control">
                          <button type="button" class="btn btn-s">
                            <i class="icon-lineIcon-search"></i>
                          </button>
                        </div>
                        <div class="ml-auto">
                          <div class="input-group">
                            <button class="btn btn-sm flat mt-5"><i class="icon-lineIcon-advice mr-5"></i>자동동의안내</button>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="menu">
                          <div class="menu-function-wrap">
                            <div class="menu-function-container">
                              <div class="pull-left">
                                <button type="button" class="btn btn-sm">
                                  <i class="icon-lineIcon-close mr-5"></i>삭제
                                </button>
                              </div>
                              <div class="pull-right">
                                <button class="btn btn-s solid flat">
                                  <i class="icon-solidIcon-down"></i>
                                </button>
                                <button class="btn btn-s solid flat">
                                  <i class="icon-solidIcon-up"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <ul class="menu-section">
                            <!-- [D] li 회색 배경 클래스 item-bg-gray 추가 -->
                            <li class="focus">
                              <div class="pl-14 pr-14">
                                <div class="input-group dropdown">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">Report to
                                    <i class="icon-lineIcon-line-arrow-up"></i>
                                    <i class="icon-lineIcon-line-arrow-down"></i>
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="pl-14 pr-14">
                                <div class="input-group dropdown">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="2차 Report to">2차 Report to
                                    <i class="icon-lineIcon-line-arrow-up"></i>
                                    <i class="icon-lineIcon-line-arrow-down"></i>
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="menu-function-wrap">
                                <div class="menu-function-container">
                                  <div class="pull-left">
                                    <b class="pl-25 pr-25">김성철</b>
                                  </div>
                                  <div class="pull-right">
                                    <div class="input-group">
                                      <label class="md-check mr-5">
                                        <input type="checkbox">
                                        <i class="black"></i>자동동의
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="ph-14">
                                <div class="input-group dropdown col-5 p-0">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">자동동의
                                    <i class="icon-lineIcon-line-arrow-up"></i>
                                    <i class="icon-lineIcon-line-arrow-down"></i>
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                                <div class="input-group dropdown col-7 p-0 pl-5">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">총무팀
                                    <i class="icon-lineIcon-line-arrow-up"></i>
                                    <i class="icon-lineIcon-line-arrow-down"></i>
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li class="item-bg-gray">
                              <div class="ph-14">
                                <div class="input-group dropdown col-5 p-0">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">합의
                                    <i class="icon-lineIcon-line-arrow-up"></i>
                                    <i class="icon-lineIcon-line-arrow-down"></i>
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                                <div class="input-group dropdown col-7 p-0 pl-5">
                                  홍길동
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="form-bottom p-0">
                      <button type="button" class="btn btn-md white"><i class="icon-lineIcon-close mr-10"></i>닫기</button>
                      <button type="button" class="btn btn-md black ml-5"><i class="icon-lineIcon-check mr-10"></i>저장</button>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>처리할 사람</h3>
                      <button class="btn btn-sm black btn-add mt-5 mr-5 pull-right">
                        <span>수정</span>
                      </button>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-group row">
                      <div class="menu">
                        <ul class="menu-section">
                          <li class="menu-thumbnail">
                            <div class="default-form row col-12">
                              <div class="input-group divide-area pr-0">
                                <div class="divide-item mr-5">
                                  <div class="input-group dropdown p-0">
                                    <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">Report to
                                      <i class="icon-lineIcon-line-arrow-up"></i>
                                      <i class="icon-lineIcon-line-arrow-down"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-scale">
                                      <a class="dropdown-item selected">메뉴1</a>
                                      <a class="dropdown-item">메뉴2</a>
                                      <a class="dropdown-item" disabled="">메뉴3</a>
                                    </div>
                                  </div>
                                </div>
                                <button class="btn btn-md line-1 white btn-static">확인</button>
                              </div>

                            </div></li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-gray">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <em data-original-title="처리한 상태">처리한
                                                                                    상태</em>
                                                                            </span>
                                    <span data-original-title="위임">위임 /
                                                                                2019.05.21.</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-theme">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail type-thumenail-top">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <a href="#" class="link-txt" data-original-title="훈경이">훈경이</a>
                                                                            </span>
                                  </div>
                                </div>
                              </div>
                              <div class="text-area-box pl-15 pr-15">
                                <div class="input-group pb-1">
                                  <textarea placeholder="텍스트를 입력해주세요." class="form-control"></textarea>
                                </div>
                              </div>
                              <div class="bottom-btn-box oh pr-14 pt-10 pb-10">
                                <div class="pull-right pt-0 pb-0">
                                  <button class="btn btn-sm mr-2">
                                    <span>위임</span>
                                  </button>
                                  <button class="btn btn-sm mr-2">
                                    <span>거절</span>
                                  </button>
                                  <button class="btn btn-sm black">
                                    <span>동의</span>
                                  </button>
                                </div>
                              </div>
                              <div name="dlgtSector" class="default-form row col-12 pt-6 pb-10">
                                <div class="input-group divide-area pr-0">
                                  <div class="divide-item mr-5">
                                    <div class="input-group dropdown" data-toggle="dropdown" aria-expanded="false">
                                      <input name="inputDelegate" type="text" class="form-control type-two-button" autocomplete="off" data-type="EMP" data-include-rest="true" data-include-retire="false" data-include-ccof="false" data-include-branch-ccof="false" data-organization-type="GROUP">
                                      <button type="button" class="btn btn-s solid">
                                        <i class="icon-solidIcon-cancel-default"></i>
                                      </button>
                                      <button type="button" class="btn btn-s">
                                        <i class="icon-lineIcon-search"></i>
                                      </button>
                                      <div class="dropdown-menu">
                                        <div class="autocompleteScrollbar" style="max-height: 350px; min-width: 160px; position: relative; overflow: visible;">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button class="btn btn-md white btn-static">전달</button>
                                </div>
                              </div>
                              <!--[D] 위임자 추가 전 예시 개발시 삭제 -->
                              <div name="dlgtSector" class="default-form row col-12 pt-6 pb-10">
                                <div class="input-group divide-area pr-0">
                                  <div class="divide-item mr-5">
                                    <div class="input-group dropdown" data-toggle="dropdown" aria-expanded="false">
                                      <input name="inputDelegate" type="text" class="form-control type-two-button" autocomplete="off" data-type="EMP" data-include-rest="true" data-include-retire="false" data-include-ccof="false" data-include-branch-ccof="false" data-organization-type="GROUP">
                                      <button type="button" class="btn btn-s solid" style="display: none">
                                        <i class="icon-solidIcon-cancel-default"></i>
                                      </button>
                                      <button type="button" class="btn btn-s">
                                        <i class="icon-lineIcon-search"></i>
                                      </button>
                                      <div class="dropdown-menu">
                                        <div class="autocompleteScrollbar" style="max-height: 350px; min-width: 160px; position: relative; overflow: visible;">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button class="btn btn-md white btn-static" disabled="">전달</button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-theme">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail type-thumenail-top">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <em data-original-title="훈경이">훈경이 링크
                                                                                    없음</em>
                                                                            </span>
                                  </div>
                                </div>
                              </div>
                              <div class="text-area-box pl-15 pr-15">
                                <div class="input-group pb-1">
                                  <textarea placeholder="텍스트를 입력해주세요." class="form-control"></textarea>
                                </div>
                              </div>
                              <div class="bottom-btn-box oh pr-14 pt-10 pb-10">
                                <div class="pull-right pt-0 pb-0">
                                  <button class="btn btn-sm mr-2">
                                    <span>위임</span>
                                  </button>
                                  <button class="btn btn-sm mr-2">
                                    <span>거절</span>
                                  </button>
                                  <button class="btn btn-sm black">
                                    <span>동의</span>
                                  </button>
                                </div>
                              </div>
                              <div name="dlgtSector" class="default-form row pt-6 pb-10" style="">
                                <div class="col-10 pl-15">
                                  <div class="input-group dropdown" data-toggle="dropdown" aria-expanded="false">
                                    <input name="inputDelegate" type="text" class="form-control" autocomplete="off" data-type="EMP" data-include-rest="true" data-include-retire="false" data-include-ccof="false" data-include-branch-ccof="false" data-organization-type="GROUP">
                                    <button type="button" class="btn btn-s">
                                      <i class="icon-lineIcon-search"></i>
                                    </button>
                                    <div class="dropdown-menu" style="width: 248px;">
                                      <div class="autocompleteScrollbar" style="max-height: 350px; min-width: 160px; position: relative; overflow: visible;">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div name="btnSector" class="col-2 p-0">
                                  <button type="button" class="btn btn-l flat btn-static mr-10" style="">
                                    <i name="btn_delegateOk" class="icon-lineIcon-check"></i>
                                  </button>
                                  <button type="button" class="btn btn-l flat btn-static mr-10" style="display: none;">
                                    <i name="btn_delegateCancel" class="icon-lineIcon-close"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-theme">
                        <ul class="menu-section">
                          <li class="menu-thumbnail">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <a class="link-txt" href="#" data-original-title="신기선">신기선</a>
                                                                            </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu">
                        <ul class="menu-section">
                          <li class="menu-thumbnail">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <a class="link-txt" href="#" data-original-title="신기선">신기선</a>
                                                                            </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail">
                            <div>
                              <div>
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <a class="link-txt" href="#" data-original-title="신기선">신기선</a>
                                                                            </span>
                                    <span data-original-title="위임" class="text-c8c8c8">자동동의 /
                                                                                2019.05.21.</span>
                                    <span class="noellipsis">강인사(관리자)에 의해 강인사에게
                                                                                위임</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>일부 공유</h3>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-wrap p-0">
                      <div class="form-group row">
                        <div class="input-group">
                          <input type="text" class="form-control">
                          <button type="button" class="btn btn-s">
                            <i class="icon-lineIcon-search"></i>
                          </button>
                        </div>
                      </div>
                      <div class="tbl-title">
                        <div class="form-row row pb-0">
                          <b>공유대상 <span class="text-blue">13</span></b>
                          <button class="btn btn-sm black btn-add ml-auto">
                            <span>더보기</span>
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-12 pl-0 pr-0">
                          <div class="box border-box type3">
                            <!-- [D] open 클래스 입력시 펼침 -->
                            <div class="box-body accordion-inner-item">
                              <div class="inner-item-dot"><i class="icon-lineIcon-dot"></i></div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명">부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <span class="h-color"><i class="badge lg gray ellipsis" data-original-title="비활성화시">비활성화시</i></span>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명사원명사원명사원명사원명">사원명사원명사원명사원명사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <span class="h-color"><i class="badge lg gray ellipsis" data-original-title="비활성화시">비활성화시</i></span>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <!--[D]form-group > input-group 바로 아래 textarea가 오는 경우 line-height-0 class를 추가해 주세요-->
                        <div class="input-group line-height-0 pb-5">
                          <textarea placeholder="텍스트를 입력해주세요." class="form-control"></textarea>
                        </div>
                        <div class="form-row row pb-0">
                          <button class="btn btn-sm black btn-add pull-right ml-auto">
                            <span>확인</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>일부 공유</h3>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-wrap p-0">
                      <div class="form-group row">
                        <div class="input-group">
                          <input type="text" class="form-control">
                          <button type="button" class="btn btn-s">
                            <i class="icon-lineIcon-search"></i>
                          </button>
                        </div>
                      </div>
                      <div class="tbl-title">
                        <div class="form-row row pb-0">
                          <b>공유대상 <span class="text-blue">13</span></b>
                          <button class="btn btn-sm black btn-add ml-auto">
                            <span>접기</span>
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-12 pl-0 pr-0">
                          <div class="box border-box type3">
                            <!-- [D] open 클래스 입력시 펼침 -->
                            <div class="box-body accordion-inner-item open">
                              <div class="inner-item-dot"><i class="icon-lineIcon-dot"></i></div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명">부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <span class="h-color"><i class="badge lg gray ellipsis" data-original-title="비활성화시">비활성화시</i></span>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명사원명사원명사원명사원명">사원명사원명사원명사원명사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                              <div class="inner-item">
                                <span class="h-color"><i class="badge lg gray ellipsis" data-original-title="비활성화시">비활성화시</i></span>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명">부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명부서명</i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <!--[D]form-group > input-group 바로 아래 textarea가 오는 경우 line-height-0 class를 추가해 주세요-->
                        <div class="input-group line-height-0 pb-5">
                          <textarea placeholder="텍스트를 입력해주세요." class="form-control"></textarea>
                        </div>
                        <button class="btn btn-sm black btn-add pull-right ml-auto">
                          <span>확인</span>
                        </button>
                      </div>
                      <div class="form-group row">
                        <div class="col-12 pl-0 pr-0">
                          <div class="box border-box text-card-view">
                            <div class="text-card-box type1">
                              <div class="text-card-content">
                                <div class="text-card-line-box">
                                  <p>승인 요청 드립니다! 빠르게 확인 부탁드려요~</p>
                                  <p><a href="#" class="link-txt mr-5">김상태</a><span class="text-888">2019.12.31</span></p>
                                </div>
                                <div class="text-card-button-box">
                                  <div>
                                    <button class="btn btn-s flat solid">
                                      <i class="icon-solidIcon-cancel-red"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="text-card-box type2">
                              <div class="text-card-content">
                                <div class="text-card-line-box">
                                  <p>승인 완료 하였습니다~</p>
                                  <p><span class="mr-5">김상태</span><span class="text-888">2019.12.31</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>공유 받는 사람</h3>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-wrap p-0">
                      <div class="form-group row">
                        <div class="input-group">
                          <div class="box border-box button-area-box">
                            <!-- [D] 선택시 black -->
                            <button class="btn btn-sm white">
                              <span>전체 공유</span>
                            </button>
                            <button class="btn btn-sm mr-3 ml-3 black">
                              <span>일부 공유</span>
                            </button>
                            <button class="btn btn-sm white">
                              <span>공유 안 함</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="input-group">
                          <input type="text" class="form-control">
                          <button type="button" class="btn btn-s">
                            <i class="icon-lineIcon-search"></i>
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-12 pl-0 pr-0">
                          <div class="box border-box type3">
                            <!-- [D] open 클래스 입력시 펼침 -->
                            <div class="box-body accordion-inner-item open">
                              <div class="inner-item-dot"><i class="icon-lineIcon-dot"></i></div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg blue ellipsis" data-original-title="부서명">부서명</i></a>
                                <button class="btn btn-s flat solid pull-left">
                                  <i class="icon-solidIcon-cancel-red"></i>
                                </button>
                              </div>
                              <div class="inner-item">
                                <a href="#" class="h-color"><i class="badge lg dark-gray ellipsis" data-original-title="사원명">사원명</i></a>
                                <button class="btn btn-s flat solid pull-left">
                                  <i class="icon-solidIcon-cancel-red"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-container on">
                  <div class="accordion-head">
                    <div class="tbl-title">
                      <h3>정보 변경 내역</h3>
                    </div>
                    <button type="button" class="btn btn-s flat btn-accordion">
                      <i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i>
                    </button>
                  </div>
                  <div class="accordion-body">
                    <div class="form-wrap p-0">
                      <div class="form-group row">
                        <div class="input-group">
                          <input type="text" class="form-control">
                          <button type="button" class="btn btn-s">
                            <i class="icon-lineIcon-search"></i>
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="menu">
                          <ul class="menu-section">
                            <li class="menu-multi-line menu-right-button">
                              <div>
                                <div>
                                  <div class="menu-line-box">
                                    <div class="menu-line-text">
                                                                                <span data-original-title="공유 변경"><b>공유
                                                                                        변경</b></span>
                                      <span>
                                                                                    <em data-original-title="최유미">최유미 링크
                                                                                        없음</em>
                                                                                </span>
                                      <span data-original-title="2019.05.21. 12:30" class="text-888">2019.05.21.
                                                                                    12:30</span>
                                    </div>
                                    <div class="menu-button-box">
                                      <div>
                                        <button class="btn btn-s solid flat">
                                          <i class="icon-solidIcon-tip"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="menu">
                          <ul class="menu-section">
                            <li class="menu-multi-line menu-right-button">
                              <div>
                                <div>
                                  <div class="menu-line-box">
                                    <div class="menu-line-text">
                                                                                <span data-original-title="결재선 변경"><b>결재선
                                                                                        변경</b></span>
                                      <span>
                                                                                    <a href="#" class="link-txt" data-original-title="최유미">최유미 링크
                                                                                        있음</a>
                                                                                </span>
                                      <span data-original-title="2019.05.21. 12:30" class="text-888">2019.05.21.
                                                                                    12:30</span>
                                    </div>
                                    <div class="menu-button-box">
                                      <div>
                                        <button class="btn btn-s solid flat">
                                          <i class="icon-solidIcon-tip"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //snb right -->
          </div>
          <div class="form-bottom">
            <button type="button" class="btn btn-lg white"><i class="icon-lineIcon-close mr-5"></i>취소</button>
            <button type="button" class="btn btn-lg black ml-5"><i class="icon-lineIcon-check mr-5"></i>저장</button>
          </div>
        </div>
        <!-- ############ PAGE END-->
      </div>
    </div>
</template>