<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'PAGE LAYOUT'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <div class="kit-area wrap">
                <div class="kit-wrap">
                    <div class="kit-group">
                        <ul>
                            <li data-text="gAt04"><strong>app</strong><br>· 페이지의 시작점입니다.</li>
                            <li data-text="gAt05"><strong>content-wrap</strong><br>· 본문 전체 영역입니다.<br>· 테블릿 사이즈 대응을 위해 최소 너비 960px로 규정합니다.</li>
                            <li data-text="gAt06"><strong>flexible-lnb</strong><br>· 좌측 LNB 영역입니다.<br>· 기본 너비 250px에서 500px까지 확장 가능하며, LNB 영역이 닫혔을 때 40px의 너비를 가집니다.</li>
                            <li data-text="gAt07"><strong>flexible-content</strong><br>· LNB 영역을 제외한 본문 영역입니다.<br>· GNB, 타이틀, 콘텐츠 영역으로 구성되며, LNB 영역의 너비 변화에 따라 너빗값이 유동적으로 변경됩니다.</li>
                            <li data-text="gAt08"><strong>header-top-wrap</strong><br>· GNB 영역으로 활용되는 공간이며, 우측 정렬을 기본으로 규정합니다.</li>
                            <li data-text="gAt09"><strong>content-header</strong><br>· 페이지의 타이틀 영역입니다. 실제 타이틀이 적용되는 영역은 80px의 높이를 가지며, 하단 여백이 포함되어 있습니다.</li>
                            <li data-text="gAt10"><strong>content-body</strong><br>· 모든 컴포넌트가 실제로 적용되는 공간입니다.<br>· 860px의 최소 너비를 가지며, 좌우 30px 하단 60px의 여백을 가지고 있습니다.<br>· 해당 영역 내부에서 대부분 컴포넌트는 12 그리드 시스템을 따릅니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="font-weight: bold;">
                <br>박유천 comment :
                <br> body, app, content-wrap, flexible-lnb, flexible-content, header-top-wrap 는 프레임웤에서 관장하는 부분이니 일반적으로는 건드릴 일이 없습니다.
                <br> content-header, content-body 영역에 실제 메뉴기능이 구현되면 됩니다.
            </div>
            <div>
                <img src="http://waltz.tx2.kr/assets/compo-layout-1@2x.png" />
            </div>
        </div>

      폼출력 예제 - 워크플레이스 디자인 가이드 제공.

      <div class="content-body">
        <!-- ############ PAGE START-->
        <div class="form-area pb-0">
          <!-- [D] form-snb 열릴시 form-snb-open 추가 -->
          <!-- [D] 서식작성 폼 옆에 버튼이 올 때 클래스 값에 form-flex 추가 -->
          <div class="form-wrap form-divide-wrap form-snb-open response form-flex justify-content-between form-snb-open-display">
            <div class="box border-box form-content output full">
              <!--모바일 모드일때 노출-->
              <div class="input-group mb-10 mo-mode">
                <i class="badge lg blue ellipsis max-w-max" data-original-title="완료된 문서">
                  완료된 문서
                </i>
              </div>
              <!--//모바일 모드일때 노출-->
              <div class="title-wrap type2 row">
                <h1>고객 불만 사항으로 출력문제 문의드립니다.</h1>
                <div class="form-row row">
                  <div class="image-box">
                    <div class="box-profile">
                      <img src="http://waltz.tx2.kr/dist/img/ico-profile.svg" alt="프로필 이미지" width="20px" height="20px">
                    </div>
                  </div>
                  <span class="p1">홍길동</span><i class="icon-lineIcon-point mr-2 ml-2"></i><span class="p1">2019.05.17</span><i class="icon-lineIcon-point mr-2 ml-2"></i><span class="p1">2019_TCS01_000002</span><i class="icon-lineIcon-point mr-2 ml-2"></i><span class="p1"><b>완료된 문서</b></span>
                  <!--모바일 모드일때 노출화면-->
                  <div class="m-image-text fx-item mo-mode">
                    <p class="p3 text-aaa ellipsis"><a href="#">오진영</a></p>
                    <p class="p3 text-aaa ellipsis">2019.01.02 14:40 · 2019_EXP02_0000055</p>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">요구처</span>
                </label>
                <div class="row col-10">
                  <div class="input-group">
                    <span class="input-text">주식회사 가나아</span>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">경로 복사</span>
                </label>
                <div class="row col-10">
                  <div class="input-group">
                                            <span class="input-text block-type">
                                                <span class="ellipsis right-icon-type" data-placement="bottom_center" data-original-title="" title="">주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아주식회사 가나아</span>
                                                <button class="btn btn-s flat solid">
                                                    <i class="icon-lineIcon-copy"><span class="blind">복사</span></i>
                                                </button>
                                            </span>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">제품명</span>
                </label>
                <div class="row col-10">
                  <div class="input-group">
                    <span class="input-text">범프로젝트-A123</span>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">처리 요구일</span>
                </label>
                <div class="row col-10">
                  <div class="input-group">
                    <span class="input-text">2019.01.08</span>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">접수자</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text"><a href="#" class="link-txt">홍길동</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">서비스 요구사항</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">링크레이어</span>
                      <!--리스트 레이어 노출항목-->
                      <div class="item-list-layer-area ml-5">
                        <a href="#" class="theme-color-txt item-list-link">5개</a>
                        <div class="add-list-layer mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar" style="max-height: 170px; overflow: visible;" ui-jp="mCustomScrollbar"><div id="mCSB_1" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 130px;"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                          <ul class="list-section add-list row">
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Desert.jpg" class="link-txt pl-10 pr-10">Desert.jpg</a>
                              </div>
                            </li>
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Chrysanthemum.jpg" class="link-txt pl-10 pr-10">Chrysanthemum.jpg</a>
                              </div>
                            </li>
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Desert.jpg" class="link-txt pl-10 pr-10">Desert.jpg</a>
                              </div>
                            </li>
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Chrysanthemum.jpg" class="link-txt pl-10 pr-10">Chrysanthemum.jpg</a>
                              </div>
                            </li>
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Desert.jpg" class="link-txt pl-10 pr-10">Desert.jpg</a>
                              </div>
                            </li>
                            <li class="list-right-button col-12">
                              <div class="bg-theme-all">
                                <a href="#" data-original-title="Chrysanthemum.jpg" class="link-txt pl-10 pr-10">Chrysanthemum.jpg</a>
                              </div>
                            </li>
                          </ul>
                        </div></div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                      </div>
                      <!--//리스트 레이어 노출항목-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">처리구분</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">기타</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">발생원인</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">소프트웨어 오류</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">조치방안</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">소프트웨어 버전 업데이트 진행</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">고객통보여부</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">유</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">통보내용</span>
                </label>
                <div class="row col-10">
                  <div class="input-group">
                    <div class="input-text">
                      입력한 내용이 출력됩니다.
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">내용(스크롤)</span>
                </label>
                <div class="row col-10">
                  <div class="input-group mCustomScrollbar _mCS_2 mCS-autoHide" ui-jp="mCustomScrollbar" ui-options="{axis:'yx'}" style="overflow: visible;"><div id="mCSB_2" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside" style="max-height: none;"><div id="mCSB_2_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; top: 0px; left: 0px; width: 1000px;" dir="ltr">
                    <div class="input-text" style="width: 1000px;">
                      스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤
                      스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤
                      스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤
                    </div>
                  </div></div><div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; height: 0px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div><div id="mCSB_2_scrollbar_horizontal" class="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_horizontal" style="display: block;"><div class="mCSB_draggerContainer"><div id="mCSB_2_dragger_horizontal" class="mCSB_dragger" style="position: absolute; min-width: 50px; display: block; width: 971px; max-width: 963.484px; left: 0px;"><div class="mCSB_dragger_bar"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">조치자</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">홍길동</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">조치일</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">2019.01.08</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">파일첨부</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text"><a href="#" class="link-txt">ABC_1234_파일.jpeg</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">문서첨부</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text block-type"><a href="#" class="link-txt ellipsis" data-placement="bottom_center" data-original-title="" title="">한줄에 한개의 연관문서만 제목으로 노출하며 제목이 길어지는 경우 말줄임 되게 해주세요. 한줄에 한개의 연관문서만 제목으로 노출하며 제목이 길어지는 경우 말줄임 되게 해주세요.</a></span>
                    </div>
                    <div class="input-group">
                      <span class="input-text"><a href="#" class="link-txt">연관문서 0001</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">조치일</span>
                </label>
                <div class="row col-10">
                  <div class="form-group row">
                    <div class="input-group">
                      <span class="input-text">2019.01.08</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="form-label col-2">
                  <span class="text-222">사유</span>
                </label>
                <div class="row col-10">
                  <div class="scroll-wrapper scrollbar-macosx scroll-border" style="position: relative;"><div class="scrollbar-macosx scroll-border scroll-content scroll-scrollx_visible" style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 712px;">
                    <div class="input-group">
                      <div class="input-text">
                        2 건의 내역을 지정합니다.
                        <img src="http://waltz.tx2.kr/dist/img/img-slide1.png" alt="테스트 이미지">
                      </div>
                    </div>
                  </div><div class="scroll-element scroll-x scroll-scrollx_visible"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar" style="width: 616px; left: 0px;"></div></div></div><div class="scroll-element scroll-y scroll-scrollx_visible"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar" style="height: 89px;"></div></div></div></div>
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
                            <li class="focus">
                              <div class="pl-14 pr-14">
                                <div class="input-group dropdown">
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Report to">Report to<i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i></button>
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
                                  <button class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" disabled="" title="2차 Report to">2차 Report to<i class="icon-lineIcon-line-arrow-up"></i><i class="icon-lineIcon-line-arrow-down"></i></button>
                                  <div class="dropdown-menu dropdown-menu-scale">
                                    <a class="dropdown-item selected">메뉴1</a>
                                    <a class="dropdown-item">메뉴2</a>
                                    <a class="dropdown-item" disabled="">메뉴3</a>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
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
                                                                                <em data-original-title="처리한 상태">처리한 상태</em>
                                                                            </span>
                                    <span data-original-title="위임">위임 / 2019.05.21.</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-gray">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail">
                            <div>
                              <div href="#">
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <i class="badge lg dark-gray aprvState ml-0">동의</i>
                                                                                <a href="#" class="link-txt" data-original-title="링크 있음">링크 있음</a>
                                                                            </span>
                                    <span data-original-title="위임">위임 / 2019.05.21.</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="menu menu-bg-gray">
                        <ul class="menu-section">
                          <li class="menu-multi-line menu-thumbnail">
                            <div>
                              <div href="#">
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <i class="badge lg dark-gray aprvState ml-0">동의</i>
                                                                                <em data-original-title="링크 없음">링크 없음</em>
                                                                            </span>
                                    <span data-original-title="위임">위임 / 2019.05.21.</span>
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
                              <div href="#">
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
                              <div href="#">
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
                              <div href="#">
                                <div class="menu-line-box">
                                  <div class="menu-thumbnail-img-box">
                                    <i class="icon-imageIcon-profile"></i>
                                  </div>
                                  <div class="menu-line-text">
                                                                            <span>
                                                                                <a class="link-txt" href="#" data-original-title="신기선">신기선</a>
                                                                            </span>
                                    <span data-original-title="위임" class="text-c8c8c8">자동동의 / 2019.05.21.</span>
                                    <span class="noellipsis">강인사(관리자)에 의해 강인사에게 위임</span>
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
                                  <p><span class="mr-5">김상태 링크 없음</span><span class="text-888">2019.12.31</span></p>
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
                                  <p><a href="#" class="link-txt mr-5">김상태 링크 있음</a><span class="text-888">2019.12.31</span></p>
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
                                      <span data-original-title="공유 변경"><b>공유 변경</b></span>
                                      <span>
                                                                                    <em data-original-title="최유미">최유미 링크 없음</em>
                                                                                </span>
                                      <span data-original-title="2019.05.21. 12:30" class="text-888">2019.05.21. 12:30</span>
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
                                      <span data-original-title="결재선 변경"><b>결재선 변경</b></span>
                                      <span>
                                                                                    <a href="#" class="link-txt" data-original-title="최유미">최유미  링크 있음</a>
                                                                                </span>
                                      <span data-original-title="2019.05.21. 12:30" class="text-888">2019.05.21. 12:30</span>
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
            <button type="button" class="btn btn-lg black"><i class="icon-lineIcon-print mr-5"></i>프린트</button>
          </div>
        </div>
        <!-- ############ PAGE END-->
      </div>
    </div>
</template>