<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'모달창, 팝업'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <butto type="button" class="btn btn-md mr-10" @click="sync()">
              사원정보 연동.
            </butto>

            <button type="button" class="btn btn-md mr-10" data-toggle="modal" data-target="#myModal-lg" data-backdrop="static">
                <span>클릭하여 확인하기</span>
            </button>
            <!-- 모달창 -->
            <div class="modal" id="myModal-lg" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg scroll-type" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">타이틀</h2>
                            <!-- .btn-resize 클릭 시, .modal-lg에 full클래스 토글 -->
                            <button class="btn btn-md flat btn-modal-size large"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                            <button class="btn btn-md flat btn-modal-size small"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                            <button type="button" class="btn btn-m flat btn-close" data-dismiss="modal" aria-label="Close">
                                <i class="icon-lineIcon-close"></i>
                            </button>
                        </div>
                        <div class="modal-body ndk-scrollbar">

                        </div>
                        <div class="modal-footer">
                            <div class="btn-wrap">
                                <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                                    <i class="icon-lineIcon-close mr-5"></i>취소
                                </button>
                                <button class="btn btn-md black">
                                    <i class="icon-lineIcon-check mr-5"></i>완료
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-md" data-toggle="modal" data-target="#myModal-lg2" data-backdrop="static">
                <span>적용 예시</span>
            </button>
            <!-- 모달창 -->
            <div class="modal" id="myModal-lg2" role="dialog" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg scroll-type" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">타이틀</h2>
                            <!-- [D] .btn-resize 클릭 시, .modal-lg에 full 클래스 토글 -->
                            <button class="btn btn-md flat btn-modal-size large"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                            <button class="btn btn-md flat btn-modal-size small"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                            <button type="button" class="btn btn-m flat btn-close" data-dismiss="modal" aria-label="Close">
                                <i class="icon-lineIcon-close"></i>
                            </button>
                        </div>
                        <div class="modal-body ndk-scrollbar">
                            <ul class="nav nav-tabs md">
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#tab_1" class="active">탭 1</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#tab_2">탭 2</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" data-toggle="tab" data-target="#tab_3">탭 3</a>
                                </li>
                            </ul>
                            <div class="form-area">
                                <div class="form-wrap type-menu">
                                    <div class="menu-container">
                                        <div class="menu">
                                            <div class="form-group row">
                                                <div class="row">
                                                    <h3>타이틀</h3>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="row">
                                                    <div class="input-group pl-0 pr-0" style="width: 213px;">
                                                        <input type="text" class="form-control type-basic" placeholder="텍스트를 입력하세요.">
                                                    </div>
                                                    <button type="button" class="btn btn-m line-1 ml-auto">
                                                        <i class="icon-lineIcon-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="tbl-title">
                                                <div class="form-row row pb-0">
                                                    <div class="row">
                                                        <h3>타이틀</h3>
                                                        <div class="layer">
                                                            <button class="btn btn-s solid flat mt-3">
                                                                <i class="icon-solidIcon-help"></i>
                                                            </button>
                                                            <div class="hover-layer">
                                                                <div class="layer-list">
                                                                    <i class="badge black">
                                                                        <i class="icon-lineIcon-master"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge green">
                                                                        <i class="icon-lineIcon-correct"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge blue">
                                                                        <i class="icon-lineIcon-sight"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- [D] 리스트 추가 -->
                                                        <button class="btn btn-sm black btn-add mt-5">
                                                            <i class="icon-lineIcon-plus"></i>
                                                            <span>버튼</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="tbl">
                                                <colgroup>
                                                    <col width="50%">
                                                    <col width="50%">
                                                    <col width="139px">
                                                    <col width="65px">
                                                </colgroup>
                                                <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                                                <thead class="no-drag">
                                                <tr class="">
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="드롭다운">
                                                            <div class="form-group">
                                                                <div class="input-group dropdown">
                                                                    <button class="form-control btn-lg dropdown-toggle" data-toggle="dropdown" aria-expanded="false">드롭다운<i class="icon-lineIcon-line-arrow-down"></i></button>
                                                                    <div class="dropdown-menu dropdown-menu-scale">
                                                                        <a class="dropdown-item selected">메뉴1</a>
                                                                        <a class="dropdown-item">메뉴2</a>
                                                                        <a class="dropdown-item" disabled="">메뉴3</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="삭제">
                          <span class="td-icon">
                            <button type="button" class="btn btn-s flat solid btn-delete">
                              <i class="icon icon-solidIcon-cancel-red"></i>
                            </button>
                          </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="드롭다운">
                                                            <div class="form-group">
                                                                <div class="input-group dropdown">
                                                                    <button class="form-control btn-lg dropdown-toggle" data-toggle="dropdown" aria-expanded="false">드롭다운<i class="icon-lineIcon-line-arrow-down"></i></button>
                                                                    <div class="dropdown-menu dropdown-menu-scale">
                                                                        <a class="dropdown-item selected">메뉴1</a>
                                                                        <a class="dropdown-item">메뉴2</a>
                                                                        <a class="dropdown-item" disabled="">메뉴3</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="삭제">
                          <span class="td-icon">
                            <button type="button" class="btn btn-s flat solid btn-delete">
                              <i class="icon icon-solidIcon-cancel-red"></i>
                            </button>
                          </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-area" style="display:none;">
                                <div class="form-wrap type-menu">
                                    <div class="menu-container">
                                        <div class="menu tree-menu type-1">
                                            <div class="form-group row">
                                                <div class="row">
                                                    <h3>타이틀</h3>
                                                </div>
                                            </div>
                                            <div id="menu-resizable1" class="menu-resizable horizontal" ui-jp="resizable">
                                                <div class="menu-area">
                                                    <div class="ndk-scrollbar-wrap">
                                                        <div class="ndk-scrollbar">
                                                            <ul class="menu-section">
                                                                <li>
                                                                    <div>
                                                                        <button type="button" class="btn btn-s flat tree-arrow">
                                                                            <i class="icon icon-arrow"></i>
                                                                        </button>
                                                                        <a href="#" onclick="return false">
                                                                            <span title="메뉴 1depth">메뉴 1depth</span>
                                                                        </a>
                                                                    </div>
                                                                    <ul class="menu-depth">
                                                                        <li>
                                                                            <div>
                                                                                <button type="button" class="btn btn-s flat tree-arrow">
                                                                                    <i class="icon icon-arrow"></i>
                                                                                </button>
                                                                                <a href="#" onclick="return false">
                                                                                    <span title="메뉴 2depth">메뉴 2depth</span>
                                                                                </a>
                                                                            </div>
                                                                            <ul class="menu-depth">
                                                                                <li>
                                                                                    <div>
                                                                                        <!-- [D] depth의 마지막 메뉴에는 class="no-depth" 추가 -->
                                                                                        <a href="#" onclick="return false" class="no-depth">
                                                                                            <span title="메뉴 3depth">메뉴 3depth</span>
                                                                                        </a>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <button type="button" class="btn btn-s flat tree-arrow">
                                                                            <i class="icon icon-arrow"></i>
                                                                        </button>
                                                                        <a href="#" onclick="return false">
                                                                            <span title="메뉴 1depth">메뉴 1depth</span>
                                                                        </a>
                                                                    </div>
                                                                    <ul class="menu-depth">
                                                                        <li>
                                                                            <div>
                                                                                <button type="button" class="btn btn-s flat tree-arrow">
                                                                                    <i class="icon icon-arrow"></i>
                                                                                </button>
                                                                                <a href="#" onclick="return false">
                                                                                    <span title="메뉴 2depth">메뉴 2depth</span>
                                                                                </a>
                                                                            </div>
                                                                            <ul class="menu-depth">
                                                                                <li>
                                                                                    <div>
                                                                                        <a href="#" onclick="return false" class="no-depth">
                                                                                            <span title="메뉴 3depth">메뉴 3depth</span>
                                                                                        </a>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="splitter">
                                                    <div class="dot"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="menu-content1">
                                            <div class="tbl-title">
                                                <div class="form-row row pb-0">
                                                    <div class="row">
                                                        <h3>타이틀</h3>
                                                        <div class="layer">
                                                            <button class="btn btn-s solid flat mt-3">
                                                                <i class="icon-solidIcon-help"></i>
                                                            </button>
                                                            <div class="hover-layer">
                                                                <div class="layer-list">
                                                                    <i class="badge black">
                                                                        <i class="icon-lineIcon-master"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge green">
                                                                        <i class="icon-lineIcon-correct"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge blue">
                                                                        <i class="icon-lineIcon-sight"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="tbl">
                                                <colgroup>
                                                    <col width="50%">
                                                    <col width="50%">
                                                    <col width="160px">
                                                    <col width="65px">
                                                </colgroup>
                                                <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                                                <thead class="no-drag">
                                                <tr class="">
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="드롭다운">
                                                            <div class="form-group">
                                                                <div class="input-group dropdown">
                                                                    <button class="form-control btn-lg dropdown-toggle" data-toggle="dropdown" aria-expanded="false">드롭다운<i class="icon-lineIcon-line-arrow-down"></i></button>
                                                                    <div class="dropdown-menu dropdown-menu-scale">
                                                                        <a class="dropdown-item selected">메뉴1</a>
                                                                        <a class="dropdown-item">메뉴2</a>
                                                                        <a class="dropdown-item" disabled="">메뉴3</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="삭제">
                          <span class="td-icon">
                            <button type="button" class="btn btn-s flat solid btn-delete">
                              <i class="icon icon-solidIcon-cancel-red"></i>
                            </button>
                          </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-area" style="display:none;">
                                <div class="form-wrap type-menu">
                                    <div class="menu-container">
                                        <div class="menu tree-menu type-1">
                                            <!-- [D] 버튼 클릭시 display:none 처리해주세요. -->
                                            <div class="form-group row" style="display:block">
                                                <div class="row">
                                                    <h3>우측 검색 아이콘 클릭해 보세요.</h3>
                                                    <button type="button" class="btn btn-m white ml-auto">
                                                        <i class="icon-lineIcon-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- [D] 위 .form-group.row display:none되면 display:block 처리해주세요. -->
                                            <div class="form-group row" style="display:none">
                                                <div class="row">
                                                    <div class="input-group pl-0 pr-0">
                                                        <input type="text" class="form-control type-two-button">
                                                        <button type="button" class="btn btn-s solid" style="display:none">
                                                            <i class="icon-solidIcon-cancel"></i>
                                                        </button>
                                                        <button type="button" class="btn btn-s">
                                                            <i class="icon-lineIcon-search"></i>
                                                        </button>
                                                    </div>
                                                    <button type="button" class="btn btn-m line-1 ml-auto">
                                                        <i class="icon-lineIcon-close"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div id="menu-resizable2" class="menu-resizable horizontal" ui-jp="resizable">
                                                <div class="menu-function-wrap">
                                                    <div class="menu-function-container">
                                                        <div class="pull-left">
                                                            <button type="button" class="btn btn-sm" disabled="">
                                                                <i class="icon-lineIcon-link-arrow mr-5"></i>이동
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="menu-area">
                                                    <div class="ndk-scrollbar-wrap">
                                                        <div class="ndk-scrollbar">
                                                            <ul class="menu-section">
                                                                <!-- [D] a태그 클릭시, 부모 li에 focus 클래스 추가 -->
                                                                <li>
                                                                    <div>
                                                                        <a href="#">
                                                                            <span title="메뉴">메뉴</span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <a href="#">
                                                                            <span title="메뉴">메뉴</span>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="splitter">
                                                    <div class="dot"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="menu-content2">
                                            <div class="tbl-title">
                                                <div class="form-row row pb-0">
                                                    <div class="row">
                                                        <h3>타이틀</h3>
                                                        <div class="layer">
                                                            <button class="btn btn-s solid flat mt-3">
                                                                <i class="icon-solidIcon-help"></i>
                                                            </button>
                                                            <div class="hover-layer">
                                                                <div class="layer-list">
                                                                    <i class="badge black">
                                                                        <i class="icon-lineIcon-master"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge green">
                                                                        <i class="icon-lineIcon-correct"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                                <div class="layer-list">
                                                                    <i class="badge blue">
                                                                        <i class="icon-lineIcon-sight"></i>
                                                                        <span>태그</span>
                                                                    </i>
                                                                    <span class="p1">텍스트</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="tbl">
                                                <colgroup>
                                                    <col width="50%">
                                                    <col width="50%">
                                                    <col width="160px">
                                                    <col width="65px">
                                                </colgroup>
                                                <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                                                <thead class="no-drag">
                                                <tr class="">
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text ellipsis" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="th-box">
                                                            <span class="th-text" title="헤더">헤더</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box">
                                                            <span class="td-text ellipsis" title="텍스트">텍스트</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="드롭다운">
                                                            <div class="form-group">
                                                                <div class="input-group dropdown">
                                                                    <button class="form-control btn-lg dropdown-toggle" data-toggle="dropdown" aria-expanded="false">드롭다운<i class="icon-lineIcon-line-arrow-down"></i></button>
                                                                    <div class="dropdown-menu dropdown-menu-scale">
                                                                        <a class="dropdown-item selected">메뉴1</a>
                                                                        <a class="dropdown-item">메뉴2</a>
                                                                        <a class="dropdown-item" disabled="">메뉴3</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="td-box" title="삭제">
                          <span class="td-icon">
                            <button type="button" class="btn btn-s flat solid btn-delete">
                              <i class="icon icon-solidIcon-cancel-red"></i>
                            </button>
                          </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="btn-wrap">
                                <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                                    <i class="icon-lineIcon-close mr-5"></i>취소
                                </button>
                                <button class="btn btn-md black">
                                    <i class="icon-lineIcon-check mr-5"></i>완료
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>

export default {

  methods: {
    async sync() {
      try {
        let {data} = await this.$httpGet('/system/admin/sync/emp', {
          "companyId": 'e721e2da-29ee-4782-9672-3d2b150ac1a6'
        });
      }
      catch(e) {
        console.error("YeAfterMail loadGridData: ", e)
      }
    }
  }
}
</script>