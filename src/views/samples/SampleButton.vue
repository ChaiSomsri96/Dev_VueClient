<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'급여 조회'"/>
        <!-- Body 영역 -->
        <div class="content-body">

          <div class="content-area usage" style="">
            <div class="kit-area title">
              <div class="kit-title">
                <!-- snb -->
                <div class="snb right">
                  <strong class="snb-title">Usage</strong>
                  <ul class="snb-list">
                    <li data-target="#Usage-1" class="snb-li-group"><a href="#Usage-1" data-text="gAt01">Button Types</a></li>
                    <li data-target="#Usage-1_1"> · <a href="#Usage-1_1" data-text="gAt03">1. Basic button</a></li>
                    <li data-target="#Usage-1_2"> · <a href="#Usage-1_2" data-text="gAt05">2. Outlined button</a></li>
                    <li data-target="#Usage-1_3"> · <a href="#Usage-1_3" data-text="gAt07">3. Text button</a></li>
                    <li data-target="#Usage-1_4"> · <a href="#Usage-1_4" data-text="gAt09">4. Group button</a></li>
                    <li data-target="#Usage-2" class="snb-li-group"><a href="#Usage-2" data-text="gBt01">Icon Buttons</a></li>
                    <li data-target="#Usage-3" class="snb-li-group"><a href="#Usage-3" data-text="gCt01">Button Colors</a></li>
                    <li data-target="#Usage-4" class="snb-li-group"><a href="#Usage-4" data-text="gDt01">Button Sizes</a></li>
                  </ul>
                </div>
                <!-- // snb -->
              </div>
            </div>
            <div class="kit-area title">
              <div class="kit-title">
                <div class="kit-row">
                  <h2 class="kit-title-txt" id="Usage-1" data-text="gAt01">Button Types <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-1"><i class="icon-lineIcon-link"></i></span></h2>
                  <p class="desc" data-text="gAt02">버튼은 4가지 타입으로 나누어집니다.</p>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area wrap">
                <div class="kit-wrap">
                  <div class="kit-subtitle type2">
                    <div class="kit-title-box">
                      <h3 id="Usage-1_1" class="kit-subtitle-txt" data-text="gAt03">1. Basic button <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-1_1"><i class="icon-lineIcon-link"></i></span></h3>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-ver-cont" data-ver="1.0">
                    <div class="kit-group" data-text="gAt04">기본 버튼 타입입니다. 컬러에 따라 다양한 상황을 표현할 수 있습니다.</div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 -->
                        <div class="view-box kit-view-box">
                          <!-- 기본 -->
                          <button class="btn btn-md">Button</button>

                          <!-- 비활성화 상태 -->
                          <button class="btn btn-md" disabled="">Button</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area wrap">
                <div class="kit-wrap">
                  <div class="kit-subtitle">
                    <div class="kit-title-box">
                      <h3 id="Usage-1_2" class="kit-subtitle-txt" data-text="gAt05">2. Outlined button <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-1_2"><i class="icon-lineIcon-link"></i></span></h3>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-ver-cont" data-ver="1.0">
                    <div class="kit-group" data-text="gAt06">라인이 있는 버튼입니다. 다른 컴포넌트와 함께 쓰일 때에 버튼을 명확하게 표현하기 위해서 사용합니다.<br>주로 데이터 테이블 오른쪽 상단에 쓰이거나, 폼을 구성할 때 사용됩니다.</div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 -->
                        <div class="view-box kit-view-box">
                          <!-- button 요소에 line-1 클래스 추가 -->
                          <button class="btn btn-md line-1">Button</button>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area wrap">
                <div class="kit-wrap">
                  <div class="kit-subtitle">
                    <div class="kit-title-box">
                      <h3 id="Usage-1_3" class="kit-subtitle-txt" data-text="gAt07">3. Text button <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-1_3"><i class="icon-lineIcon-link"></i></span></h3>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-ver-cont" data-ver="1.0">
                    <div class="kit-group" data-text="gAt08">마우스 오버하였을 때 박스가 나타나는 버튼입니다.<br>주로 데이터 테이블 왼쪽 상단에 쓰이거나, 페이지 하단 취소 버튼과 같이 베이직 버튼보다 덜 중요한 액션에 사용됩니다.</div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 -->
                        <div class="view-box kit-view-box">
                          <!-- button 요소에 flat 클래스 추가 -->
                          <button class="btn btn-md flat">Button</button>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area wrap">
                <div class="kit-wrap">
                  <div class="kit-subtitle">
                    <div class="kit-title-box">
                      <h3 id="Usage-1_4" class="kit-subtitle-txt" data-text="gAt09">4. Group button <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-1_4"><i class="icon-lineIcon-link"></i></span></h3>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-ver-cont" data-ver="1.0">
                    <div class="kit-group" data-text="gAt10">토글 버튼 형태로 사용할 수 있는 그룹 버튼입니다.<br>그룹이 될 수 있는 버튼이 2개 이상일 경우에 사용되며, 한 번에 한 개의 버튼만 선택될 수 있습니다.<br>그룹 버튼에는 small 크기의 버튼을 사용합니다.</div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <div class="view-box kit-view-box">
                          <!-- 그룹이 되는 버튼들은 div 영역(class="box border-box button-area-box")으로 감싸줍니다. -->
                          <div class="box border-box button-area-box">
                            <!-- button 요소 선택 해제 시 black 클래스 삭제, flat 클래스 추가 -->
                            <!-- button 요소 선택 시 flat 클래스 삭제, black 클래스 추가 -->
                            <button class="btn btn-sm flat"><span>Button 1</span></button><button class="btn btn-sm ml-5 black"><span>Button 2</span></button><button class="btn btn-sm ml-5 flat"><span>Button 3</span></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area title">
                <div class="kit-title type2 type3">
                  <div class="kit-row">
                    <div class="kit-title-box">
                      <h2 class="kit-title-txt" id="Usage-2" data-text="gBt01">Icon Buttons <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-2"><i class="icon-lineIcon-link"></i></span></h2>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kit-ver-cont" data-ver="1.0">
                <div class="kit-area title">
                  <div class="kit-title">
                    <div class="kit-row">
                      <p class="desc" data-text="gBt02">아이콘 버튼은 버튼 내에 텍스트와 아이콘을 함께 사용하거나, 텍스트 없이 아이콘 단독으로 사용하는 버튼입니다.<br>아이콘은 텍스트의 왼쪽, 오른쪽 모두에 사용할 수 있지만 텍스트 왼쪽에 위치하는 것을 우선으로 합니다.<br>다음 스텝이나 새로운 창으로 이동 등 상황에 따라 오른쪽에 위치합니다.</p>
                    </div>
                  </div>
                </div>
                <div class="kit-area wrap">
                  <div class="kit-wrap">
                    <div class="kit-group">
                      <ul>
                        <li data-text="gBt03">· <strong>Icon</strong> : 아이콘만으로도 인지가 가능한 경우에 사용됩니다.</li>
                        <li data-text="gBt04">· <strong>Icon + Text</strong> : 테이블 상단 혹은 페이지 하단에 중요한 기능을 가진 버튼에 사용됩니다.</li>
                        <li data-text="gBt05">· <strong>Text + Icon</strong> : 클릭 시 새 창으로 이동하거나, 다음 스텝으로 이동하는 경우에 사용됩니다.</li>
                      </ul>
                    </div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 -->
                        <div class="view-box kit-view-box">
                          <!-- Line icon -->
                          <button class="btn btn-m flat">
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <!-- Solid icon -->
                          <button class="btn btn-m flat solid">
                            <i class="icon-solidIcon-confirm"></i>
                          </button>

                          <!-- Icon + Text -->
                          <button class="btn btn-md">
                            <i class="icon-lineIcon-upload mr-5"></i>Button
                          </button>

                          <!-- Text + Icon -->
                          <button class="btn btn-md">Button
                            <i class="icon-lineIcon-upload ml-5"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area title">
                <div class="kit-title type2 type3">
                  <div class="kit-row">
                    <div class="kit-title-box">
                      <h2 class="kit-title-txt" id="Usage-3" data-text="gCt01">Button Colors <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-3"><i class="icon-lineIcon-link"></i></span></h2>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kit-ver-cont" data-ver="1.0">
                <div class="kit-area title">
                  <div class="kit-title">
                    <div class="kit-row">
                      <p class="desc" data-text="gCt02">버튼이 실행하는 액션의 중요도 및 상황에 따라 적절한 컬러를 사용합니다.</p>
                    </div>
                  </div>
                </div>
                <div class="kit-area wrap">
                  <div class="kit-wrap">
                    <div class="kit-group">
                      <ul>
                        <li data-text="gCt03">· <strong>Light Grey</strong> : 기본 버튼 색상입니다. <span class="color-circle default">#F9F9F9</span></li>
                        <li data-text="gCt04">· <strong>Black</strong> : Green과 Red가 사용되지 않는 상황에서 강조가 필요한 상황에 쓰이는 색상입니다. <span class="color-circle black">#222222</span></li>
                        <li data-text="gCt05">· <strong>Blue</strong> : 기본 버튼 색상(Light Grey)과 구분이 필요할 때 쓰입니다. <span class="color-circle blue">#056EC9</span></li>
                        <li data-text="gCt06">· <strong>Green</strong> : 저장, 완료와 같은 긍정의 상황에 쓰이는 색상입니다. <span class="color-circle success">#1AB348</span></li>
                        <li data-text="gCt07">· <strong>Red</strong> : 삭제, 경고와 같은 부정의 상황에 쓰이는 색상입니다. <span class="color-circle danger">#F84D3A</span></li>
                      </ul>
                    </div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 -->
                        <div class="view-box kit-view-box">
                          <!-- 기본 -->
                          <button class="btn btn-md">Button</button>

                          <!-- Black: button 요소에 black 클래스 추가 -->
                          <button class="btn btn-md black">Button</button>

                          <!-- Blue: button 요소에 blue 클래스 추가 -->
                          <button class="btn btn-md blue">Button</button>

                          <!-- Green: button 요소에 success 클래스 추가 -->
                          <button class="btn btn-md success">Button</button>

                          <!-- Red: button 요소에 danger 클래스 추가 -->
                          <button class="btn btn-md danger">Button</button>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kit-ver-box">
              <div class="kit-area title">
                <div class="kit-title type2 type3">
                  <div class="kit-row">
                    <div class="kit-title-box">
                      <h2 class="kit-title-txt" id="Usage-4" data-text="gDt01">Button Sizes <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-button.html?Usage-4"><i class="icon-lineIcon-link"></i></span></h2>
                      <div class="input-group dropdown scroll kit-ver-dropdown">
                        <button class="form-control sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="v1.0">v1.0
                          <i class="icon-lineIcon-line-arrow-up"></i>
                          <i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-scale">
                          <div class="ndk-scrollbar">
                            <a class="dropdown-item selected" data-ver="1.0">v1.0</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kit-ver-cont" data-ver="1.0">
                <div class="kit-area title">
                  <div class="kit-title">
                    <div class="kit-row">
                      <p class="desc" data-text="gDt02">버튼은 3가지 크기로 제공됩니다. 나란히 사용될 경우, 버튼의 종류가 다르더라도 같은 크기를 사용해야 합니다.</p>
                    </div>
                  </div>
                </div>
                <div class="kit-area wrap">
                  <div class="kit-wrap">
                    <div class="kit-group">
                      <ul>
                        <li data-text="gDt06">· <strong>XLarge</strong> : 버튼 중 가장 볼륨이 크며, 마이크로사이트에서만 사용되는 버튼입니다. 페이지 내 중요 섹션으로 앵커링하는 역할 등 중요도가 높은 과업에 사용됩니다.</li>
                        <li data-text="gDt03">· <strong>Large</strong> : 페이지 하단에 위치하는 버튼으로, 변경사항을 저장하거나 취소하는 등 중요기능을 수행할 때 사용되는 크기입니다.</li>
                        <li data-text="gDt04">· <strong>Medium</strong> : 기본적인 버튼 크기입니다. 대부분 버튼에 사용됩니다.</li>
                        <li data-text="gDt05">· <strong>Small</strong> : 데이터 테이블, 리스트 등 컴포넌트 내부 또는 공간이 협소한 경우에 사용되는 크기입니다. Line-icon은 특수한 경우에 따라 한 단계 더 큰 버튼을 사용할 수 있습니다. Solid-icon은 특수한 경우에 따라 한 단계 더 작은 버튼을 사용할 수 있습니다.</li>
                      </ul>
                    </div>
                    <div class="kit-group">
                      <table class="tbl">
                        <colgroup>
                          <col width="25%">
                          <col width="25%">
                          <col width="25%">
                          <col width="25%">
                        </colgroup>
                        <caption>사용자 정보</caption>
                        <thead class="no-drag">
                        <tr class="">
                          <th>
                            <div class="th-box">
                              <span class="th-text ellipsis" title=""></span>
                            </div>
                          </th>
                          <th>
                            <div class="th-box">
                              <span class="th-text ellipsis" title="Text">Text</span>
                            </div>
                          </th>
                          <th>
                            <div class="th-box">
                              <span class="th-text ellipsis" title="Line-icon">Line-icon</span>
                            </div>
                          </th>
                          <th>
                            <div class="th-box">
                              <span class="th-text ellipsis" title="Solid-icon">Solid-icon</span>
                            </div>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>
                            <div class="td-box">
                              <span class="td-text ellipsis" title="Large">X-Large</span>
                            </div>
                          </td>
                          <td class="border-l" colspan="3">
                            <div class="td-box">
                              <a class="content-link-area" data-link="kit-microsite-components.html?Usage-1_1">
                                <button class="btn btn-sm line-1">Microsite - Components로 이동<i class="icon-lineIcon-link-arrow ml-5"></i></button>
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="td-box">
                              <span class="td-text ellipsis" title="Large">Large</span>
                            </div>
                          </td>
                          <td class="border-l">
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-lg flat">Button</button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-l flat">
                                          <i class="icon-lineIcon-line-arrow-down"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-l flat solid">
                                          <i class="icon-solidIcon-confirm"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="td-box">
                              <span class="td-text ellipsis" title="Medium">Medium</span>
                            </div>
                          </td>
                          <td class="border-l">
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-md flat">Button</button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-m flat">
                                          <i class="icon-lineIcon-line-arrow-down"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-m flat solid">
                                          <i class="icon-solidIcon-confirm"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="td-box">
                              <span class="td-text ellipsis" title="Small">Small</span>
                            </div>
                          </td>
                          <td class="border-l">
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-sm flat">Button</button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-s flat line-m">
                                          <i class="icon-lineIcon-line-arrow-down"></i>
                                        </button>

                                        <button class="btn btn-s flat">
                                          <i class="icon-lineIcon-line-arrow-down"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                          <td>
                            <div class="td-box">
                                      <span class="td-text ellipsis" title="">
                                        <button class="btn btn-s flat solid">
                                          <i class="icon-solidIcon-confirm"></i>
                                        </button>

                                        <button class="btn btn-s flat solid-s">
                                          <i class="icon-solidIcon-confirm"></i>
                                        </button>
                                      </span>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="kit-group">
                      <div class="content-view-area">
                        <!-- 코드 --->
                        <div class="view-box kit-view-box" style="display:none">
                          <!-- Large: button 요소에 btn-lg 클래스, 아이콘 button의 경우 btn-l 클래스 추가 -->
                          <button class="btn btn-lg flat">btn-lg</button>
                          <button class="btn btn-l flat">
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <button class="btn btn-l flat solid">
                            <i class="icon-solidIcon-confirm"></i>
                          </button>

                          <!-- Medium: button 요소에 btn-md 클래스 추가 -->
                          <button class="btn btn-md flat">btn-md</button>
                          <button class="btn btn-md flat">
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <button class="btn btn-md flat solid">
                            <i class="icon-solidIcon-confirm"></i>
                          </button>

                          <!-- Small: button 요소에 btn-sm 클래스 추가, 아이콘 button의 경우 btn-s 클래스 추가 -->
                          <button class="btn btn-sm flat">btn-md</button>
                          <button class="btn btn-s flat">
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <button class="btn btn-s flat solid">
                            <i class="icon-solidIcon-confirm"></i>
                          </button>

                          <!-- small Line-icon button의 특수한 경우 -->
                          <button class="btn btn-s flat line-m">
                            <i class="icon-lineIcon-line-arrow-down"></i>
                          </button>
                          <!-- small Solid-icon button의 특수한 경우 -->
                          <button class="btn btn-s flat solid-s">
                            <i class="icon-solidIcon-confirm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="kit-group mlr-20">
                      <div class="content-code-area">
                        <div class="content-code-btns">
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                          <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                          <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
</template>