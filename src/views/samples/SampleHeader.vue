<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'Header'" />
    <!-- Body 영역 -->
    <div class="content-body">
      * form layout -<a href="http://ndk.navercorp.com/html/kit-components-layout-form.html" target="_blank" style="font-weight: bold;color:blue;">guide 원본</a>
      <div class="kit-body">
        <!-- content::usage -->
        <div class="content-area usage" style="">
          <div class="kit-area title">
            <div class="kit-title">
              <!-- snb -->
              <div class="snb right">
                <strong class="snb-title">Usage</strong>
                <ul class="snb-list">
                  <li data-target="#Usage-1" class="snb-li-group"><a href="#Usage-1" data-text="gCt01">Form layout Types</a></li>
                  <li data-target="#Usage-1_1"> · <a href="#Usage-1_1" data-text="gCt03">Basic form layout</a></li>
                  <li data-target="#Usage-1_2"> · <a href="#Usage-1_2" data-text="gCt05">Divided form layout</a></li>
                  <li data-target="#Usage-1_3"> · <a href="#Usage-1_3" data-text="gCt07">Form with title</a></li>
                  <li data-target="#Usage-1_4"> · <a href="#Usage-1_4" data-text="gCt09">Form with required fields</a></li>
                  <li data-target="#Usage-2" class="snb-li-group"><a href="#Usage-2" data-text="gDt01">Form table Types</a></li>
                  <li data-target="#Usage-2_1"> · <a href="#Usage-2_1" data-text="gDt03">Basic form table</a></li>
                  <li data-target="#Usage-2_2"> · <a href="#Usage-2_2" data-text="gDt05">Divided form table</a></li>
                </ul>
              </div>
              <!-- // snb -->
            </div>
          </div>
          <div class="kit-area title">
            <div class="kit-title">
              <div class="kit-row">
                <p class="desc" data-text="gBt02">폼의 구성을 클래스 단위로 설명합니다.<br>Page Structure의 content-body 영역 내부에서 적용됩니다.</p>
              </div>
            </div>
          </div>
          <div class="kit-area wrap">
            <div class="kit-wrap">
              <div class="kit-group">
                <ul>
                  <li data-text="gBt03"><strong>form-area </strong><br>· 폼의 시작점입니다.<br>· 단일 행(form-group row)이 다른 구조에 포함될 때 생략되는 경우가 있습니다.</li>
                  <li data-text="gBt04"><strong>form-wrap</strong><br>· 폼 영역의 구분 단위이며, 내부에 단일 행(form-group row)들을 포함합니다.<br>· form-wrap과 form-wrap 사이는 상하 20px 간격과 구분선이 발생합니다.</li>
                  <li data-text="gBt05"><strong>form-group row</strong><br>· 한 행을 정의하는 부분이며, 32px의 높이와 13px의 하단 여백을 가집니다.<br>· form-group 내부에서는 12 그리드 시스템에 따라 컴포넌트를 배치합니다.<br>· 좌측 라벨 영역은 col-2, 우측 컴포넌트 영역은 col-6 또는 col-10을 기본으로 규정합니다.</li>
                  <li data-text="gBt06"><strong>form-bottom</strong><br>· 폼 가장 하단에 배치되며, 주로 버튼들이 나열되는 영역입니다.<br>· 상단 20px 하단 60px의 여백을 가집니다.</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="kit-area wrap">
            <div class="kit-wrap">
              <div class="content-img-area">
                <img src="https://ssl.pstatic.net/static/ncp/ndk/s/img/compo-layout-2@2x.png" alt="">
              </div>
            </div>
          </div>
          <div class="kit-area wrap">
            <div class="kit-wrap">
              <div class="kit-group" style="display:none;">
                <div class="content-view-area">
                  <!-- 코드 -->
                  <div class="view-box kit-view-box">
                    <div class="form-area">
                      <!-- form-wrap -->
                      <div class="form-wrap">
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                      </div>
                      <!-- form-wrap -->
                      <div class="form-wrap">
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                        <div class="form-group row">
                          <!-- component -->
                        </div>
                      </div>
                      <!-- form-bottom -->
                      <div class="form-bottom">
                        <!-- component -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kit-group">
                <div class="content-code-area">
                  <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                  <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                    <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                    <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                    <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                    <div class="CodeMirror-scroll" tabindex="-1">
                      <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 616px; min-width: 231px; padding-right: 0px; padding-bottom: 0px;">
                        <div style="position: relative; top: 0px;">
                          <div class="CodeMirror-lines" role="presentation">
                            <div role="presentation" style="position: relative; outline: none;">
                              <div class="CodeMirror-measure"></div>
                              <div class="CodeMirror-measure"></div>
                              <div style="position: relative; z-index: 1;"></div>
                              <div class="CodeMirror-cursors">
                                <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                              </div>
                              <div class="CodeMirror-code" role="presentation" style="">
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-area"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-comment">&lt;!-- form-wrap --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-comment">&lt;!-- form-wrap --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-comment">&lt;!-- form-bottom --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-bottom"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-comment">&lt;!-- component --&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">                              </span></pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 616px;"></div>
                      <div class="CodeMirror-gutters" style="display: none; height: 630px;"></div>
                    </div>
                  </div>
                  <div class="content-code-btns">
                    <button class="btn btn-sm flat"><i class="icon-lineIcon-resize-large mr-10"></i>크게보기</button>
                    <button class="btn btn-sm flat" style="display:none"><i class="icon-lineIcon-resize-small mr-10"></i>작게보기</button>
                    <button class="btn btn-sm flat"><i class="icon-lineIcon-copy mr-5"></i>Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kit-area title">
            <div class="kit-title type2">
              <div class="kit-row">
                <h2 class="kit-title-txt" id="Usage-1" data-text="gCt01">Form layout Types <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-1"><i class="icon-lineIcon-link"></i></span></h2>
                <p class="desc" data-text="gCt02">Form layout은 콘텐츠 영역을 구성하는 기본적인 레이아웃입니다.</p>
              </div>
            </div>
          </div>
          <div class="kit-ver-box">
            <div class="kit-area wrap">
              <div class="kit-wrap">
                <div class="kit-subtitle type2">
                  <div class="kit-title-box">
                    <h3 id="Usage-1_1" class="kit-subtitle-txt" data-text="gCt03">Basic form layout <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-1_1"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gCt04">기본적인 폼 레이아웃 타입입니다.<br>· form-wrap은 폼 영역의 구분 단위이며, 구분 선을 생성합니다.<br>· form-group row는 한 행을 정의하며, 내부 요소를 12 그리드 시스템에 따라 배치합니다.<br>· 한 행은 라벨 영역(form-label)과 컴포넌트 영역(row)으로 구성합니다.<br>· 좌측 라벨 영역은 col-2, 우측 컴포넌트 영역은 col-6 또는 col-10을 기본으로 규정합니다.<br>· 우측 컴포넌트 영역에서 col-6은 행 단위 컴포넌트(input, dropdown...)에 사용하며, col-10은 면 단위 컴포넌트(textarea, table...)에 사용합니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-basic">
                        <div class="form-area">
                          <div class="form-wrap">
                            <div class="form-group row">
                              <label class="form-label type2 col-2">
                                <span>라벨</span>
                              </label>
                              <div class="row col-6">
                                컴포넌트
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
                                <span class="v-m">라벨</span><button class="btn btn-s flat solid ml-5" title="" data-toggle="tooltip" data-placement="bottom_left" data-original-title="부가 설명 텍스트 툴팁"><i class="icon-solidIcon-help"></i></button>
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
                                  컴포넌트 1
                                </div>
                                <div class="form-group row">
                                  컴포넌트 2
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 863px; min-width: 1435px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure"></div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-area"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label type2 col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-6"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label type2 col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-10"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label type2 col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"v-m"</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;&lt;</span><span class="cm-tag">button</span> <span class="cm-attribute">class</span>=<span class="cm-string">"btn btn-s flat solid ml-5"</span> <span class="cm-attribute">title</span>=<span class="cm-string">"부가 설명 텍스트 툴팁"</span> <span class="cm-attribute">data-toggle</span>=<span class="cm-string">"tooltip"</span> <span class="cm-attribute">data-placement</span>=<span class="cm-string">"bottom_left"</span><span class="cm-tag cm-bracket">&gt;&lt;</span><span class="cm-tag">i</span> <span class="cm-attribute">class</span>=<span class="cm-string">"icon-solidIcon-help"</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">i</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">button</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-6"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label type2 col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-6"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">          컴포넌트 1</span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 863px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 877px;"></div>
                        </div>
                      </div>
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
                    <h3 id="Usage-1_2" class="kit-subtitle-txt" data-text="gCt05">Divided form layout <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-1_2"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gCt06">폼 영역을 일정 비율로 분할할 때 사용합니다.<br>· 12 그리드 시스템에 따라 col-6, col-6으로 적용할 경우 동일한 비율로 분할할 수 있습니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-divided">
                        <div class="form-group row">
                          <div class="col-6 pl-0">
                            컴포넌트
                          </div>
                          <div class="col-6 pr-0">
                            컴포넌트
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 34px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 198px; min-width: 217px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure"></div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"col-6 pl-0"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"col-6 pr-0"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">                              </span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 198px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 212px;"></div>
                        </div>
                      </div>
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
                    <h3 id="Usage-1_3" class="kit-subtitle-txt" data-text="gCt07">Form with title <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-1_3"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gCt08">타이틀 영역이 포함된 폼 레이아웃 타입입니다. 하위 요소들로 그룹핑될 때 사용합니다.<br>· 타이틀 영역은 form-wrap 내부에 h3.title-wrap 클래스로 적용합니다. <br>· 타이틀 영역은 32px 높이를 가지며, 구분선을 기준으로 상단 10px 하단 20px의 여백을 가집니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-title">
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
                  </div>
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 34px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 255px; min-width: 259px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure"></div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">h3</span> <span class="cm-attribute">class</span>=<span class="cm-string">"title-wrap"</span><span class="cm-tag cm-bracket">&gt;</span>타이틀<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-6"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      컴포넌트</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">                              </span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 255px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 269px;"></div>
                        </div>
                      </div>
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
                    <h3 id="Usage-1_4" class="kit-subtitle-txt" data-text="gCt09">Form with required fields <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-1_4"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gCt10">필수 입력사항이 포함된 폼 레이아웃 타입입니다.<br>· 라벨의 dot 아이콘은 ess 클래스 추가로 적용합니다.<br>· 상단 타이틀 영역 필수 입력사항은 아래 폼 레이아웃 영역과 동일 구조를 가지기 위해 12 그리드 시스템 구조로 적용합니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-ess">
                        <div class="form-wrap">
                          <h3 class="title-wrap">타이틀
                            <div class="title-division-area">
                              <div class="col-2"></div>
                              <div class="col-6"><span class="pull-right ess front">필수입력사항 입니다.</span></div>
                            </div>
                          </h3>
                          <div class="form-group row">
                            <label class="form-label col-2">
                              <span class="ess">라벨</span>
                            </label>
                            <div class="row col-6">
                              컴포넌트
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 34px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 350px; min-width: 658px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure"></div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">h3</span> <span class="cm-attribute">class</span>=<span class="cm-string">"title-wrap"</span><span class="cm-tag cm-bracket">&gt;</span>타이틀</span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"title-division-area"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"col-2"</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"col-6"</span><span class="cm-tag cm-bracket">&gt;&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"pull-right ess front"</span><span class="cm-tag cm-bracket">&gt;</span>필수입력사항 입니다.<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-group row"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">label</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-label col-2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"ess"</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">label</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"row col-6"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      컴포넌트</span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 350px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 364px;"></div>
                        </div>
                      </div>
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
          <div class="kit-area title">
            <div class="kit-title type2">
              <div class="kit-row">
                <h2 class="kit-title-txt" id="Usage-2" data-text="gDt01">Form table Types <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-2"><i class="icon-lineIcon-link"></i></span></h2>
                <p class="desc" data-text="gDt02">Form layout Types는 컴포넌트를 12 그리드 시스템으로 배치하기 때문에 고정된 가로 너비 영역을 표현하는 데 어려움이 있습니다.<br>Form table은 테이블 구조를 기본적인 폼 형태로 구성하였습니다.<br>열별 고정값 및 유동적으로 변화되는 열에 대한 정의가 가능합니다.</p>
              </div>
            </div>
          </div>
          <div class="kit-ver-box">
            <div class="kit-area wrap">
              <div class="kit-wrap">
                <div class="kit-subtitle type2">
                  <div class="kit-title-box">
                    <h3 id="Usage-2_1" class="kit-subtitle-txt" data-text="gDt03">Basic form table <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-2_1"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gDt04">기본적인 폼 테이블 타입입니다.<br>· 코드 구조는 테이블(tbl tbl-type3) 입니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-table">
                        <div class="form-wrap">
                          <div class="tbl-title">
                            <h3>타이틀</h3>
                            <span class="pull-right ess front">필수입력사항 입니다.</span>
                          </div>
                          <div class="tbl-wrap type2">
                            <table class="tbl tbl-type3">
                              <colgroup>
                                <col width="100px">
                                <col width="auto">
                                <col width="100px">
                                <col width="auto">
                                <col width="100px">
                                <col width="auto">
                              </colgroup>
                              <tbody>
                              <tr>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text" title="라벨"><span class="ess">라벨</span></span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box" title="라벨">
                                    컴포넌트
                                  </div>
                                </td>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text" title="라벨">라벨</span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box" title="라벨">
                                    컴포넌트
                                  </div>
                                </td>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text" title="라벨">라벨</span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box" title="라벨">
                                    컴포넌트
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
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 34px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 1034px; min-width: 602px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure">
                                    <pre class="CodeMirror-line" role="presentation"><span role="presentation" style="padding-right: 0.1px;">              <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"th-text"</span> <span class="cm-attribute">title</span>=<span class="cm-string">"라벨"</span><span class="cm-tag cm-bracket">&gt;&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"ess"</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                  </div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl-title"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span>타이틀<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"pull-right ess front"</span><span class="cm-tag cm-bracket">&gt;</span>필수입력사항 입니다.<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl-wrap type2"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">table</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl tbl-type3"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">colgroup</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">width</span>=<span class="cm-string">"100px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">width</span>=<span class="cm-string">"auto"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">width</span>=<span class="cm-string">"100px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">width</span>=<span class="cm-string">"auto"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">width</span>=<span class="cm-string">"100px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 1034px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 1048px;"></div>
                        </div>
                      </div>
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
                    <h3 id="Usage-2_2" class="kit-subtitle-txt" data-text="gDt05">Divided form table <span class="anchor" data-clipboard-text="http://ndk.navercorp.com/html/kit-components-layout-form.html?Usage-2_2"><i class="icon-lineIcon-link"></i></span></h3>
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
                  <div class="kit-group" data-text="gDt06">폼 테이블을 일정 비율로 분할할 때 사용합니다.<br>· 분할 비율은 좌우 영역을 width-percent-XX 클래스로 지정하여 적용할 수 있습니다.<br>· width-percent-XX의 XX는 5의 배수로 0부터 100까지 지정합니다.<br>· 현재 예시는 좌측 70%(width-percent-70) 우측 30%(width-percent-30)로 적용되어 있습니다.</div>
                  <div class="kit-group">
                    <div class="content-view-area">
                      <!-- 코드 --->
                      <div class="view-box kit-view-box" id="kit-layoutform-dividedtable">
                        <div class="form-wrap">
                          <div class="tbl-title">
                            <h3>타이틀</h3>
                            <span class="pull-right ess front">필수입력사항 입니다.</span>
                          </div>
                          <div class="tbl-wrap type2 divide">
                            <table class="tbl tbl-type3 tbl-divide-left width-percent-70">
                              <colgroup>
                                <col style="width:80px">
                                <col style="width:auto">
                                <col style="width:60px">
                                <col style="width:auto">
                                <col style="width:60px">
                                <col style="width:auto">
                              </colgroup>
                              <tbody>
                              <tr>
                                <th colspan="6" class="tbl-group-title">
                                  <div class="th-box">
                                    <span class="th-text" title="타이틀">타이틀</span>
                                  </div>
                                </th>
                              </tr>
                              <tr>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text text-888 ess" title="라벨">라벨</span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box">
                                    컴포넌트
                                  </div>
                                </td>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text text-888" title="라벨">라벨</span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box">
                                    컴포넌트
                                  </div>
                                </td>
                                <th>
                                  <div class="th-box">
                                    <span class="th-text text-888" title="라벨">라벨</span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box">
                                    컴포넌트
                                  </div>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <table class="tbl tbl-type3 tbl-divide-right width-percent-30">
                              <colgroup>
                                <col style="width:80px">
                                <col style="width:auto">
                              </colgroup>
                              <tbody>
                              <tr>
                                <th colspan="2" class="tbl-group-title divide-line">
                                  <div class="th-box">
                                    <span class="th-text" title="타이틀">타이틀</span>
                                  </div>
                                </th>
                              </tr>
                              <tr>
                                <th class="divide-line">
                                  <div class="th-box">
                                    <span class="th-text text-888" title="라벨"><span>라벨</span></span>
                                  </div>
                                </th>
                                <td>
                                  <div class="td-box">
                                    컴포넌트
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
                  <div class="kit-group">
                    <div class="content-code-area">
                      <textarea rows="10" cols="60" class="kit-view-code" style="display: none;"></textarea>
                      <div class="CodeMirror cm-s-cobalt" style="width: 100%;">
                        <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 34px; left: 34px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="0"></textarea></div>
                        <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                        <div class="CodeMirror-scroll" tabindex="-1">
                          <div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: -16px; border-right-width: 14px; min-height: 1680px; min-width: 581px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                              <div class="CodeMirror-lines" role="presentation">
                                <div role="presentation" style="position: relative; outline: none;">
                                  <div class="CodeMirror-measure"></div>
                                  <div class="CodeMirror-measure">
                                    <pre class="CodeMirror-line" role="presentation"><span role="presentation" style="padding-right: 0.1px;">              <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"th-text text-888"</span> <span class="cm-attribute">title</span>=<span class="cm-string">"라벨"</span><span class="cm-tag cm-bracket">&gt;&lt;</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span>라벨<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                  </div>
                                  <div style="position: relative; z-index: 1;"></div>
                                  <div class="CodeMirror-cursors">
                                    <div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 19px;"> </div>
                                  </div>
                                  <div class="CodeMirror-code" role="presentation" style="">
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span >zwsp</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"form-wrap"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl-title"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span>타이틀<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">h3</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">span</span> <span class="cm-attribute">class</span>=<span class="cm-string">"pull-right ess front"</span><span class="cm-tag cm-bracket">&gt;</span>필수입력사항 입니다.<span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">span</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">div</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">div</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl-wrap type2 divide"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">table</span> <span class="cm-attribute">class</span>=<span class="cm-string">"tbl tbl-type3 tbl-divide-left width-percent-70"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">      <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">colgroup</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">style</span>=<span class="cm-string">"width:80px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">style</span>=<span class="cm-string">"width:auto"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">style</span>=<span class="cm-string">"width:60px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">style</span>=<span class="cm-string">"width:auto"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                    <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">        <span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">col</span> <span class="cm-attribute">style</span>=<span class="cm-string">"width:60px"</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="position: absolute; height: 14px; width: 1px; border-bottom: 0px solid transparent; top: 1680px;"></div>
                          <div class="CodeMirror-gutters" style="display: none; height: 1694px;"></div>
                        </div>
                      </div>
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
        <!-- // content::usage -->

        <!-- 헤더 및 top버튼 노출 시 .on-sticky 추가 -->
        <div class="sticky-box">
          <button type="button" class="btn btn-page-top btn-lg line-1" style="display: inline-block"><i class="icon-lineIcon-moveup-top"><span class="blind">위로 이동</span></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*
https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css
*/
/* .CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5);-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta{color:#555}.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-s-default .cm-error{color:red}.cm-invalidchar{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:0;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:0 0!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:0 0;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:0}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-focused div.CodeMirror-cursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:''}span.CodeMirror-selectedtext{background:0 0} */

/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 300px;
  color: black;
  direction: ltr;
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0;
  /* Vertical padding around content */
}

.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px;
  /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  background-color: white;
  /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  white-space: nowrap;
}

.CodeMirror-linenumbers {}

.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}

.CodeMirror-guttermarker {
  color: black;
}

.CodeMirror-guttermarker-subtle {
  color: #999;
}

/* CURSOR */

.CodeMirror-cursor {
  border-left: 1px solid black;
  border-right: none;
  width: 0;
}

/* Shown when moving in bi-directional text */
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver;
}

.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0 !important;
  background: #7e7;
}

.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1;
}

.cm-fat-cursor-mark {
  background-color: rgba(20, 255, 20, 0.5);
  -webkit-animation: blink 1.06s steps(1) infinite;
  -moz-animation: blink 1.06s steps(1) infinite;
  animation: blink 1.06s steps(1) infinite;
}

.cm-animate-fat-cursor {
  width: auto;
  border: 0;
  -webkit-animation: blink 1.06s steps(1) infinite;
  -moz-animation: blink 1.06s steps(1) infinite;
  animation: blink 1.06s steps(1) infinite;
  background-color: #7e7;
}

@-moz-keyframes blink {
  0% {}

  50% {
    background-color: transparent;
  }

  100% {}
}

@-webkit-keyframes blink {
  0% {}

  50% {
    background-color: transparent;
  }

  100% {}
}

@keyframes blink {
  0% {}

  50% {
    background-color: transparent;
  }

  100% {}
}

/* Can style cursor different in overwrite (non-insert) mode */
.CodeMirror-overwrite .CodeMirror-cursor {}

.cm-tab {
  display: inline-block;
  text-decoration: inherit;
}

.CodeMirror-rulers {
  position: absolute;
  left: 0;
  right: 0;
  top: -50px;
  bottom: 0;
  overflow: hidden;
}

.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  top: 0;
  bottom: 0;
  position: absolute;
}

/* DEFAULT THEME */

.cm-s-default .cm-header {
  color: blue;
}

.cm-s-default .cm-quote {
  color: #090;
}

.cm-negative {
  color: #d44;
}

.cm-positive {
  color: #292;
}

.cm-header,
.cm-strong {
  font-weight: bold;
}

.cm-em {
  font-style: italic;
}

.cm-link {
  text-decoration: underline;
}

.cm-strikethrough {
  text-decoration: line-through;
}

.cm-s-default .cm-keyword {
  color: #708;
}

.cm-s-default .cm-atom {
  color: #219;
}

.cm-s-default .cm-number {
  color: #164;
}

.cm-s-default .cm-def {
  color: #00f;
}

.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {}

.cm-s-default .cm-variable-2 {
  color: #05a;
}

.cm-s-default .cm-variable-3,
.cm-s-default .cm-type {
  color: #085;
}

.cm-s-default .cm-comment {
  color: #a50;
}

.cm-s-default .cm-string {
  color: #a11;
}

.cm-s-default .cm-string-2 {
  color: #f50;
}

.cm-s-default .cm-meta {
  color: #555;
}

.cm-s-default .cm-qualifier {
  color: #555;
}

.cm-s-default .cm-builtin {
  color: #30a;
}

.cm-s-default .cm-bracket {
  color: #997;
}

.cm-s-default .cm-tag {
  color: #170;
}

.cm-s-default .cm-attribute {
  color: #00c;
}

.cm-s-default .cm-hr {
  color: #999;
}

.cm-s-default .cm-link {
  color: #00c;
}

.cm-s-default .cm-error {
  color: #f00;
}

.cm-invalidchar {
  color: #f00;
}

.CodeMirror-composing {
  border-bottom: 2px solid;
}

/* Default styles for common addons */

div.CodeMirror span.CodeMirror-matchingbracket {
  color: #0b0;
}

div.CodeMirror span.CodeMirror-nonmatchingbracket {
  color: #a22;
}

.CodeMirror-matchingtag {
  background: rgba(255, 150, 0, .3);
}

.CodeMirror-activeline-background {
  background: #e8f2ff;
}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
  background: white;
}

.CodeMirror-scroll {
  overflow: scroll !important;
  /* Things will break if this is overridden */
  /* 30px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -30px;
  margin-right: -30px;
  padding-bottom: 30px;
  height: 100%;
  outline: none;
  /* Prevent dragging from highlighting the element */
  position: relative;
}

.CodeMirror-sizer {
  position: relative;
  border-right: 30px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
}

.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}

.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0;
}

.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
}

.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3;
}

.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -30px;
}

.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}

.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
}

.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}

.CodeMirror-gutter-wrapper ::selection {
  background-color: transparent
}

.CodeMirror-gutter-wrapper ::-moz-selection {
  background-color: transparent
}

.CodeMirror-lines {
  cursor: text;
  min-height: 1px;
  /* prevents collapsing before first draw */
}

.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual;
}

.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px;
  /* Force widget margins to stay inside of the container */
}

.CodeMirror-widget {}

.CodeMirror-rtl pre {
  direction: rtl;
}

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}

.CodeMirror-measure pre {
  position: static;
}

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}

div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected {
  background: #d9d9d9;
}

.CodeMirror-focused .CodeMirror-selected {
  background: #d7d4f0;
}

.CodeMirror-crosshair {
  cursor: crosshair;
}

.CodeMirror-line::selection,
.CodeMirror-line>span::selection,
.CodeMirror-line>span>span::selection {
  background: #d7d4f0;
}

.CodeMirror-line::-moz-selection,
.CodeMirror-line>span::-moz-selection,
.CodeMirror-line>span>span::-moz-selection {
  background: #d7d4f0;
}

.cm-searching {
  background-color: #ffa;
  background-color: rgba(255, 255, 0, .4);
}

/* Used to force a border model for a node */
.cm-force-border {
  padding-right: .1px;
}

@media print {

  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after {
  content: '';
}

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext {
  background: none;
}
</style>
