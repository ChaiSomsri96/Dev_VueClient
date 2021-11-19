<template>
    <div>
        <ui-header :msg="'Realgrid Samples'"/>

      <h2 style="margin:10px;color:blue;">
        <router-link :to="{name: 'SampleTable'}" active-class="active">워크플레이스 제공 테이블 템플릿 보기</router-link>
      </h2>
      <router-view></router-view>

      <h3 style="margin:10px;color:blue;"> 아래는 워크플레이스 제공 realgrid 가이드입니다.</h3>

      <div class="container-xl clearfix new-discussion-timeline  px-3 px-md-4 px-lg-5">
        <div class="repository-content ">
          <div
              class="d-flex flex-items-start flex-shrink-0 pb-3 flex-wrap flex-md-nowrap flex-justify-between flex-md-justify-start">

            <div id="readme" class="Box-body readme blob js-code-block-container p-5 p-xl-6">
              <article class="markdown-body entry-content container-lg" itemprop="text">

                export declare enum ValueType {<br>
                TEXT = "text",<br>
                NUMBER = "number",<br>
                BOOLEAN = "boolean",<br>
                DATETIME = "datetime",<br>
                DATE = "date"<br>
                }
<br><br>
                <h1>
                  vue에 workplace.realgrid 적용하는 방법
                </h1>
                <ul>
                  <li>아직 npm package 로 제공해주지 않기 때문에 임시적으로 아래와 같은 방법으로 처리합니다.</li>
                  <li>Vue mount 소스</li>
                </ul>
                <div class="highlight highlight-source-js"><pre><span class="pl-k">import</span> <span
                    class="pl-v">Vue</span> <span class="pl-k">from</span> <span class="pl-s">'vue'</span><span
                    class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-s1">init</span><span
                      class="pl-kos">,</span> <span class="pl-s1">userInfoUtils</span> <span
                      class="pl-kos">}</span> <span class="pl-k">from</span> <span class="pl-s">'workplace-vue-common-ui'</span><span
                      class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-v">VueRouter</span> <span class="pl-k">from</span> <span class="pl-s">'vue-router'</span><span
                      class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-s1">router</span> <span class="pl-k">from</span> <span class="pl-s">'./router'</span><span
                      class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-s1">store</span> <span class="pl-k">from</span> <span class="pl-s">'./store'</span><span
                      class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-v">App</span> <span class="pl-k">from</span> <span class="pl-s">'./App.vue'</span><span
                      class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-s1">getMlngInfo</span> <span
                      class="pl-kos">}</span> <span class="pl-k">from</span> <span
                      class="pl-s">'./api/common/mlngInfo'</span><span class="pl-kos">;</span>
<span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-s1">getUserInfo</span> <span
                      class="pl-kos">}</span> <span class="pl-k">from</span> <span
                      class="pl-s">'./api/common/userInfo'</span><span class="pl-kos">;</span>

<span class="pl-v">Vue</span><span class="pl-kos">.</span><span class="pl-en">use</span><span
                      class="pl-kos">(</span><span class="pl-v">VueRouter</span><span class="pl-kos">)</span><span
                      class="pl-kos">;</span>


<span class="pl-c">//스크립트 로드 함수</span>
<span class="pl-k">function</span> <span class="pl-en">loadScript</span><span class="pl-kos">(</span><span
                      class="pl-s1">src</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span
                      class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">done</span><span
                      class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">el</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span
                      class="pl-kos">.</span><span class="pl-en">createElement</span><span class="pl-kos">(</span><span
                      class="pl-s">'script'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-c1">src</span> <span
                      class="pl-c1">=</span> <span class="pl-s1">src</span><span class="pl-kos">;</span>
        <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-c1">async</span> <span
                      class="pl-c1">=</span> <span class="pl-c1">true</span><span class="pl-kos">;</span>
        <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-en">onload</span> <span class="pl-c1">=</span> <span
                      class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span
                      class="pl-kos">{</span>
            <span class="pl-s1">done</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span
                      class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">;</span>
        <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-c1">body</span><span
                      class="pl-kos">.</span><span class="pl-en">append</span><span class="pl-kos">(</span><span
                      class="pl-s1">el</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>

<span class="pl-c">//css 로드 합수</span>
<span class="pl-k">function</span> <span class="pl-en">loadCss</span><span class="pl-kos">(</span><span class="pl-s1">src</span><span
                      class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">const</span> <span class="pl-s1">el</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span
                      class="pl-kos">.</span><span class="pl-en">createElement</span><span class="pl-kos">(</span><span
                      class="pl-s">'link'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-c1">href</span> <span
                      class="pl-c1">=</span> <span class="pl-s1">src</span><span class="pl-kos">;</span>
    <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-c1">rel</span> <span
                      class="pl-c1">=</span> <span class="pl-s">'stylesheet'</span><span class="pl-kos">;</span>
    <span class="pl-s1">el</span><span class="pl-kos">.</span><span class="pl-c1">type</span> <span
                      class="pl-c1">=</span> <span class="pl-s">'text/css'</span><span class="pl-kos">;</span>
    <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-c1">head</span><span
                      class="pl-kos">.</span><span class="pl-en">append</span><span class="pl-kos">(</span><span
                      class="pl-s1">el</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>

<span class="pl-c">//workplace-vue-common-ui 를 사용하는 경우</span>
    <span class="pl-en">init</span><span class="pl-kos">(</span><span class="pl-kos">{</span>
        <span class="pl-c1">sysKey</span>: <span class="pl-s1">process</span><span class="pl-kos">.</span><span
                      class="pl-c1">env</span><span class="pl-kos">.</span><span
                      class="pl-c1">VUE_APP_SYS_KEY</span><span class="pl-kos">,</span>
        <span class="pl-c1">dataProvider</span>: <span class="pl-kos">{</span>
            <span class="pl-c1">getUserInfo</span>: <span class="pl-s1">getUserInfo</span><span class="pl-kos">,</span>
            <span class="pl-c1">getMlngInfo</span>: <span class="pl-s1">getMlngInfo</span><span class="pl-kos">,</span>
        <span class="pl-kos">}</span><span class="pl-kos">,</span>
        <span class="pl-c1">loadExternalCss</span>: <span class="pl-c1">false</span><span class="pl-kos">,</span>
        <span class="pl-c1">loadExternalScript</span>: <span class="pl-c1">false</span><span class="pl-kos">,</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span
                      class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span
                      class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">staticDomain</span> <span class="pl-c1">=</span> <span
                      class="pl-s1">userInfoUtils</span><span class="pl-kos">.</span><span
                      class="pl-en">getStaticDomain</span><span class="pl-kos">(</span><span
                      class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">const</span> <span class="pl-s1">verParam</span> <span class="pl-c1">=</span> <span
                      class="pl-s1">userInfoUtils</span><span class="pl-kos">.</span><span
                      class="pl-en">getVerParam</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span
                      class="pl-kos">;</span>

        <span class="pl-en">loadCss</span><span class="pl-kos">(</span>
            <span class="pl-s">`<span class="pl-s1"><span class="pl-kos">${</span><span
                class="pl-s1">staticDomain</span><span class="pl-kos">}</span></span>/libs/realgrid/realgrid-style.min.css?verParam=<span
                class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">verParam</span><span
                class="pl-kos">}</span></span>`</span>
        <span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-en">loadScript</span><span class="pl-kos">(</span>
            <span class="pl-s">`<span class="pl-s1"><span class="pl-kos">${</span><span
                class="pl-s1">staticDomain</span><span class="pl-kos">}</span></span>/libs/realgrid/workplace.realgrid.js?verParam=<span
                class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">verParam</span><span
                class="pl-kos">}</span></span>`</span>
        <span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span
                      class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span
                      class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-k">new</span> <span class="pl-v">Vue</span><span class="pl-kos">(</span><span
                      class="pl-kos">{</span>
                router<span class="pl-kos">,</span>
                store<span class="pl-kos">,</span>
                <span class="pl-en">render</span>: <span class="pl-kos">(</span><span class="pl-s1">h</span><span
                      class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">h</span><span
                      class="pl-kos">(</span><span class="pl-v">App</span><span class="pl-kos">)</span><span
                      class="pl-kos">,</span>
            <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">$mount</span><span
                      class="pl-kos">(</span><span class="pl-s">'#app'</span><span class="pl-kos">)</span><span
                      class="pl-kos">;</span> <span class="pl-c">//;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">catch</span><span class="pl-kos">(</span><span
                      class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span
                      class="pl-c1">=&gt;</span> <span class="pl-smi">console</span><span class="pl-kos">.</span><span
                      class="pl-en">error</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span
                      class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-c">//workplace-vue-common-ui 를 사용하지 않는 경우</span>

<span class="pl-en">loadCss</span><span class="pl-kos">(</span>
    <span class="pl-s">`http://ss.dev-ncpworkplace.com/libs/realgrid/realgrid-style.min.css`</span>
<span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-en">loadScript</span><span class="pl-kos">(</span>
    <span class="pl-s">`http://ss.dev-ncpworkplace.com/libs/realgrid/workplace.realgrid.js`</span>
<span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span
                      class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span
                      class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">new</span> <span class="pl-v">Vue</span><span class="pl-kos">(</span><span
                      class="pl-kos">{</span>
        router<span class="pl-kos">,</span>
        store<span class="pl-kos">,</span>
        <span class="pl-en">render</span>: <span class="pl-kos">(</span><span class="pl-s1">h</span><span
                      class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">h</span><span
                      class="pl-kos">(</span><span class="pl-v">App</span><span class="pl-kos">)</span><span
                      class="pl-kos">,</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span
                      class="pl-en">$mount</span><span class="pl-kos">(</span><span class="pl-s">'#app'</span><span
                      class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre>
                </div>
                <ul>
                  <li>리얼그리드 구현하는 소스</li>
                </ul>
                <div class="highlight highlight-text-html-vue"><pre>&lt;<span class="pl-ent">template</span>&gt;
    &lt;<span class="pl-ent">div</span>
        <span class="pl-e">id</span>=<span class="pl-s"><span class="pl-pds">"</span>realgrid<span
                      class="pl-pds">"</span></span>
        <span class="pl-e">style</span>=<span class="pl-s"><span class="pl-pds">"</span>width: 100%; height: 400px<span
                      class="pl-pds">"</span></span>
        <span class="pl-e">class</span>=<span class="pl-s"><span class="pl-pds">"</span>realgrid-type-style<span
                      class="pl-pds">"</span></span>
    &gt;&lt;/<span class="pl-ent">div</span>&gt;
&lt;/<span class="pl-ent">template</span>&gt;
<span class="pl-s1">&lt;<span class="pl-ent">script</span>&gt;</span>
<span class="pl-s1"><span class="pl-k">import</span> { <span class="pl-smi">columns</span>, <span
    class="pl-smi">fields</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>../../../grid/custcode/data<span
    class="pl-pds">'</span></span>;</span>
<span class="pl-s1"><span class="pl-k">import</span> { <span class="pl-smi">mapGetters</span> } <span
    class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>vuex<span
    class="pl-pds">'</span></span>;</span>
<span class="pl-s1"><span class="pl-k">import</span> $<span class="pl-smi">router</span> <span class="pl-k">from</span> <span
    class="pl-s"><span class="pl-pds">'</span>../../../router<span class="pl-pds">'</span></span>;</span>
<span class="pl-s1"></span>
<span class="pl-s1"><span class="pl-k">export</span> <span class="pl-c1">default</span> {</span>
<span class="pl-s1">    <span class="pl-k">...</span></span>
<span class="pl-s1">    <span class="pl-en">mounted</span>() {</span>
<span class="pl-s1">        <span class="pl-k">const</span> { <span class="pl-c1">view</span>, <span class="pl-c1">dataProvider</span>, <span
    class="pl-c1">layer</span> } <span class="pl-k">=</span> <span class="pl-c1">window</span>.<span class="pl-smi">workplace</span>.<span
    class="pl-en">realGrid</span>({</span>
<span class="pl-s1">            domId<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>realgrid<span
    class="pl-pds">'</span></span>,</span>
<span class="pl-s1">        });</span>
<span class="pl-s1"></span>
<span class="pl-s1">        <span class="pl-k">const</span> <span class="pl-c1">gridView</span> <span
    class="pl-k">=</span> view;</span>
<span class="pl-s1"></span>
<span class="pl-s1">        <span class="pl-c"><span class="pl-c">//</span>여기서부터는 리얼그리드의 홈페이지에 있는 내용을 참고해주시면 됩니다.</span></span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">setDataSource</span>(dataProvider);                       </span>
<span class="pl-s1">        <span class="pl-smi">dataProvider</span>.<span
    class="pl-en">setFields</span>(fields);</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">setColumns</span>(columns);</span>
<span class="pl-s1"></span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-smi">displayOptions</span>.<span
    class="pl-smi">fitStyle</span> <span class="pl-k">=</span> <span class="pl-s"><span
    class="pl-pds">'</span>evenFill<span class="pl-pds">'</span></span>;</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">setEditOptions</span>({</span>
<span class="pl-s1">            insertable<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">            appendable<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">            editable<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">        });</span>
<span class="pl-s1"></span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-smi">header</span>.<span class="pl-c1">height</span> <span
    class="pl-k">=</span> <span class="pl-c1">37</span>;</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-smi">footer</span>.<span class="pl-c1">height</span> <span
    class="pl-k">=</span> <span class="pl-c1">37</span>;</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-smi">displayOptions</span>.<span
    class="pl-smi">rowHeight</span> <span class="pl-k">=</span> <span class="pl-c1">37</span>;</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">setStateBar</span>({</span>
<span class="pl-s1">            visible<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">        });</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">setCheckBar</span>({</span>
<span class="pl-s1">            visible<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">        });</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-smi">footers</span>.<span
    class="pl-smi">visible</span> <span class="pl-k">=</span> <span class="pl-c1">false</span>;</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">onScrollToBottom</span> <span
    class="pl-k">=</span> () <span class="pl-k">=&gt;</span> {</span>
<span class="pl-s1">            <span class="pl-k">const</span> { <span class="pl-c1">search</span>, <span
    class="pl-c1">hasNext</span> } <span class="pl-k">=</span> <span class="pl-c1">this</span>.<span class="pl-smi">$store</span>.<span
    class="pl-smi">state</span>.<span class="pl-smi">custcode</span> <span class="pl-k">??</span> {</span>
<span class="pl-s1">                search<span class="pl-k">:</span> { page<span class="pl-k">:</span> <span
    class="pl-c1">0</span> },</span>
<span class="pl-s1">                hasNext<span class="pl-k">:</span> <span class="pl-c1">false</span>,</span>
<span class="pl-s1">            };</span>
<span class="pl-s1">            <span class="pl-k">const</span> { <span class="pl-c1">page</span> } <span
    class="pl-k">=</span> search;</span>
<span class="pl-s1"></span>
<span class="pl-s1">            <span class="pl-k">if</span> (hasNext) {</span>
<span class="pl-s1">                <span class="pl-c1">this</span>.<span class="pl-smi">$store</span>.<span
    class="pl-en">commit</span>(<span class="pl-s"><span class="pl-pds">'</span>custcode/setSearch<span
    class="pl-pds">'</span></span>, {</span>
<span class="pl-s1">                    page<span class="pl-k">:</span> page <span class="pl-k">+</span> <span
    class="pl-c1">1</span> <span class="pl-k">??</span> <span class="pl-c1">0</span>,</span>
<span class="pl-s1">                });</span>
<span class="pl-s1">                <span class="pl-c1">this</span>.<span class="pl-smi">$store</span>.<span
    class="pl-en">dispatch</span>(<span class="pl-s"><span class="pl-pds">'</span>custcode/getCustCodes<span
    class="pl-pds">'</span></span>);</span>
<span class="pl-s1">            }</span>
<span class="pl-s1">        };</span>
<span class="pl-s1">        <span class="pl-smi">gridView</span>.<span class="pl-en">registerCustomRenderer</span>(<span
    class="pl-s"><span class="pl-pds">'</span>realgrid_link<span class="pl-pds">'</span></span>, {</span>
<span class="pl-s1">            <span class="pl-en">initContent</span><span class="pl-k">:</span> <span class="pl-k">function</span> (<span
    class="pl-smi">parent</span>) {</span>
<span class="pl-s1">                <span class="pl-k">const</span> <span class="pl-c1">a</span> <span
    class="pl-k">=</span> <span class="pl-c1">document</span>.<span class="pl-c1">createElement</span>(<span
    class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>);</span>
<span class="pl-s1">                <span class="pl-c1">this</span>.<span class="pl-smi">_span</span> <span
    class="pl-k">=</span> <span class="pl-c1">document</span>.<span class="pl-c1">createElement</span>(<span
    class="pl-s"><span class="pl-pds">'</span>span<span class="pl-pds">'</span></span>);</span>
<span class="pl-s1"></span>
<span class="pl-s1">                <span class="pl-c1">this</span>.<span class="pl-smi">_span</span>.<span
    class="pl-c1">className</span> <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">'</span>td-text ellipsis text-left<span
    class="pl-pds">'</span></span>;</span>
<span class="pl-s1">                <span class="pl-smi">a</span>.<span class="pl-c1">appendChild</span>(<span
    class="pl-c1">this</span>.<span class="pl-smi">_span</span>);</span>
<span class="pl-s1">                <span class="pl-smi">parent</span>.<span class="pl-c1">appendChild</span>(a);</span>
<span class="pl-s1">            },</span>
<span class="pl-s1"></span>
<span class="pl-s1">            <span class="pl-en">canClick</span><span class="pl-k">:</span> <span class="pl-k">function</span> () {</span>
<span class="pl-s1">                <span class="pl-k">return</span> <span class="pl-c1">true</span>;</span>
<span class="pl-s1">            },</span>
<span class="pl-s1"></span>
<span class="pl-s1">            <span class="pl-en">clearContent</span><span class="pl-k">:</span> <span class="pl-k">function</span> (<span
    class="pl-smi">parent</span>) {</span>
<span class="pl-s1">                <span class="pl-smi">parent</span>.<span class="pl-smi">innerHTML</span> <span
    class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">'</span><span class="pl-pds">'</span></span>;</span>
<span class="pl-s1">            },</span>
<span class="pl-s1"></span>
<span class="pl-s1">            <span class="pl-en">render</span><span class="pl-k">:</span> <span
    class="pl-k">function</span> (<span class="pl-smi">grid</span>, <span class="pl-smi">model</span>, <span
    class="pl-smi">width</span>, <span class="pl-smi">height</span>, <span class="pl-smi">info</span>) {</span>
<span class="pl-s1">                info <span class="pl-k">=</span> info <span class="pl-k">||</span> {};</span>
<span class="pl-s1">                <span class="pl-k">var</span> span <span class="pl-k">=</span> <span class="pl-c1">this</span>.<span
    class="pl-smi">_span</span>;</span>
<span class="pl-s1">                <span class="pl-c"><span class="pl-c">//</span> text설정.</span></span>
<span class="pl-s1">                <span class="pl-smi">span</span>.<span class="pl-smi">textContent</span> <span
    class="pl-k">=</span> <span class="pl-smi">model</span>.<span class="pl-c1">value</span>;</span>
<span class="pl-s1">            },</span>
<span class="pl-s1"></span>
<span class="pl-s1">            <span class="pl-en">click</span><span class="pl-k">:</span> <span
    class="pl-k">function</span> (<span class="pl-c1">event</span>) {</span>
<span class="pl-s1">                <span class="pl-k">const</span> <span class="pl-c1">currnet</span> <span
    class="pl-k">=</span> <span class="pl-smi">gridView</span>.<span class="pl-en">getCurrent</span>();</span>
<span class="pl-s1">                <span class="pl-k">const</span> <span class="pl-c1">data</span> <span
    class="pl-k">=</span> <span class="pl-smi">dataProvider</span>.<span class="pl-en">getJsonRow</span>(<span
    class="pl-smi">currnet</span>.<span class="pl-smi">dataRow</span>);</span>
<span class="pl-s1">                <span class="pl-smi">$router</span>.<span class="pl-c1">push</span>(<span
    class="pl-s"><span class="pl-pds">`</span>/custcode/manage/<span class="pl-s1"><span class="pl-pse">${</span><span
    class="pl-smi">data</span>.<span class="pl-smi">custId</span><span class="pl-pse">}</span></span><span
    class="pl-pds">`</span></span>);</span>
<span class="pl-s1">            },</span>
<span class="pl-s1">        });</span>
<span class="pl-s1">        <span class="pl-c1">this</span>.<span class="pl-smi">$store</span>.<span class="pl-en">commit</span>(<span
    class="pl-s"><span class="pl-pds">'</span>custcode/setRealgridObj<span class="pl-pds">'</span></span>, {</span>
<span class="pl-s1">            view<span class="pl-k">:</span> gridView,</span>
<span class="pl-s1">            provider<span class="pl-k">:</span> dataProvider,</span>
<span class="pl-s1">        });</span>
<span class="pl-s1">        <span class="pl-c1">this</span>.<span class="pl-smi">$store</span>.<span class="pl-en">dispatch</span>(<span
    class="pl-s"><span class="pl-pds">'</span>custcode/getCustCodes<span class="pl-pds">'</span></span>);</span>
<span class="pl-s1">    },</span>
<span class="pl-s1">};</span>
<span class="pl-s1"><span class="pl-k">&lt;</span><span class="pl-k">/</span>script<span class="pl-k">&gt;</span></span></pre>
                </div>
              </article>
            </div>

          </div>


          <details class="details-reset details-overlay details-overlay-dark" id="jumpto-line-details-dialog">
            <summary data-hotkey="l" aria-label="Jump to line" role="button"></summary>
            <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast linejump"
                            aria-label="Jump to line" role="dialog" aria-modal="true">
              <!-- '"` --><!-- </textarea></xmp> -->
              <form class="js-jump-to-line-form Box-body d-flex" action="" accept-charset="UTF-8" method="get">
                <input class="form-control flex-auto mr-3 linejump-input js-jump-to-line-field" type="text"
                       placeholder="Jump to line…" aria-label="Jump to line" autofocus="">
                <button type="submit" class="btn" data-close-dialog="">Go</button>
              </form>
            </details-dialog>
          </details>


        </div>
      </div>
<br><br>
<div class="row">
      아래는 realgrid2 샘플페이지에서 가져온 코드입니다. 참조용.
      <a href="http://sample.realgrid.com/main/#">
        http://sample.realgrid.com/main/#
      </a>
</div>
<div class="row" style="margin:20px;">

  <pre style="margin:0;">
  var ds, gridContainer, grid, form;
  var rows;

  var fields = [
  { fieldName: "KorName",             dataType: "text"   },
  { fieldName: "SexLabel",            dataType: "text"   },
  { fieldName: "Age",                 dataType: "number" },
  { fieldName: "Phone",               dataType: "text"   },
  { fieldName: "StartDate",           dataType: "datetime", datetimeFormat: "yyyy-MM-dd", amText: "오전", pmText: "오후" },
  { fieldName: "KorCountry",          dataType: "text"   },
  { fieldName: "Rating",              dataType: "number" },
  { fieldName: "BusinessProficiency", dataType: "number" },
  { fieldName: "Address",             dataType: "text"   },
  { fieldName: "SaveCost",            dataType: "number" },
  { fieldName: "Email",               dataType: "text"   },
  { fieldName: "InterestRate",        dataType: "number" },
  { fieldName: "Button",              dataType: "text"   }
  ];

  var columns = [
  {
  name: "KorCountry",
  fieldName: "KorCountry",
  type: "data",
  width: "200",
  editor: "list",
  values: [
  "가이아나",
  "나미비아",
  "나우루",
  "노르웨이",
  "뉴질랜드",
  "대한민국",
  "도미니카",
  "독일",
  "모나코",
  "브라질",
  "사우스조지아 사우스샌드",
  "스리랑카",
  "스위스",
  "아랍에미리트",
  "오만",
  "이스라엘",
  "자메이카",
  "캐나다",
  "콩고 공화국",
  "터키",
  "페루",
  "포르투칼",
  "프랑스령 폴리네시아",
  "헝가리",
  "홍콩"
  ],
  styleName: "left-column",
  header: {
  text: "담당 국가"
  }
  },
  {
  name: "KorName",
  fieldName: "KorName",
  type: "data",
  width: "100",
  header: {
  text: "직원 명"
  },
  renderer: {
  type: "text"
  }
  },
  {
  name: "SexLabel",
  fieldName: "SexLabel",
  type: "data",
  width: "60",
  header: {
  text: "성별"
  },
  renderer: {
  type: "image",
  imageMap: {
  "남": "/assets/plugins/realgrid/images/man.png",
  "여": "/assets/plugins/realgrid/images/woman.png"
  },
  titleField: "SexLabel",
  imageHeight: 24
  }
  },
  {
  name: "Email",
  fieldName: "Email",
  width: "250",
  styleName: "left-column",
  header: {
  text: "이메일"
  },
  renderer: {
  type: "link",
  urlCallback: function (grid, cell) {
  return "mailto:"+cell.value;
  },
  titleField: "Email"
  }
  },
  {
  name: "Phone",
  fieldName: "Phone",
  type: "data",
  width: "150",
  editor: {
  type: "text",
  mask: "(999)9999-9999"
  },
  textFormat:"([0-9]{3})([0-9]{4})([0-9]{4});($1)$2-$3",
  // 1.0 에서는 아래와 같이 지정했으나 2.0 에서는 textFormat으로 처리한다.
  // displayRegExp: "([0-9]{3})([0-9]{4})([0-9]{4})",
  // displayReplace: "($1)$2-$3",
  header: {
  text: "전화번호"
  },
  },
  {
  name: "StartDate",
  fieldName: "StartDate",
  type: "data",
  width: "100",
  editor: {
  type: "date"
  },
  footers: [
  {text: "합계", styleName: "center-column bold-column"},
  {text: "최대 값", styleName: "center-column bold-column"},
  {text: "평균 값", styleName: "center-column bold-column"},
  ],
  header: {
  text: "입사일",
  showTooltip: true,
  tooltip: "회사 입사일"
  }
  },
  { name: "SaveCost",
  fieldName: "SaveCost",
  type: "data",
  width: "100",
  prefix: "$",
  styleName: "right-column",
  editor: {
  type: "number",
  editFormat: "#,##0.##",
  multipleChar: "+"
  },
  footers: [{
  prefix: "$",
  numberFormat: "#,##0",
  styleName: "right-column bold-column",
  expression: "sum"
  }, {
  prefix: "$",
  numberFormat: "#,##0",
  styleName: "right-column bold-column",
  expression: "max"
  }, {
  prefix: "$",
  numberFormat: "#,##0",
  styleName: "right-column bold-column",
  expression: "avg"
  }],
  groupFooters: [
  {
  prefix: "$",
  expression: "sum",
  numberFormat: "#,##0",
  styleName: "right-column bold-column"
  }
  ],
  header: {
  text: "계약 급여"
  }
  },
  {
  name: "InterestRate",
  fieldName: "InterestRate",
  width: "100",
  styleName: "right-column small-font-size",
  renderer:{
  type:"html",
  callback: function(grid, cell, w, h) {
  //console.log(cell);
  var v = grid.getValue(cell.index.itemIndex, "SaveCost");
  v = v / (100+100*cell.value) * 100;

  if(grid.getValue(cell.index.itemIndex, "SexLabel")=="남"){
  return v.toFixed(2)+"(+)"+cell.value+"%";
  } else {
  return v.toFixed(2)+"(-)"+cell.value+"%";
  }
  }
  },
  header: {
  text: "증가 폭"
  }
  },
  {
  name: "Rating",
  fieldName: "Rating",
  type: "data",
  width: "100",
  renderer: {
  type: "signalbar",
  barCount: 5,
  startRate: 50,
  endRate: 50
  },
  header: {
  text: "고객 평가"
  }
  },
  {
  name: "BusinessProficiency",
  fieldName: "BusinessProficiency",
  type: "data",
  width: "120",
  suffix:"%",
  numberFormat: "#,##0",
  renderer: {
  type: "bar",
  origin: "left",
  barWidth: "50%"
  },
  header: {
  text: "업무 숙련도"
  }
  },
  {
  name: "Address",
  fieldName: "Address",
  type: "data",
  width: "300",
  styleName: "left-column",
  renderer: {
  type: "icon",
  iconCallback: function (grid, cell) {
  return "/assets/plugins/realgrid/images/location.png";
  },
  iconHeight: 14
  },
  header: {
  text: "소재지"
  }
  },
  {
  name: "Button",
  fieldName: "Button",
  type: "data",
  width: "100",
  renderer: {
  type: "button"
  },
  header: {
  text: "데이타 관리"
  }
  }
  ];

  function loadData(filename) {
  var reqUrl = "/assets/plugins/realgrid/data/" + filename; // for S3
  $.ajax({
  type: "GET",
  url: reqUrl,
  success: function(response)
  {
  ds.setRows(response);
  }
  });
  }

  function createGrid(container) {
  //ds = new RealGrid.LocalDataProvider();
  // true 옵션을 주면 undo 할 수 있다.
  ds = new RealGrid.LocalDataProvider(true);
  ds.restoreMode = "explicit";
  ds.setFields(fields);

  // ds 커밋 이후에 undo 할 수 있다.
  ds.setOptions({
  undoable: true
  });

  grid = new RealGrid.GridView(container);
  grid.filteringOptions.selector.showButtons = true;
  grid.displayOptions.refreshMode = "visibleOnly";
  grid.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  grid.header.height = 40;
  grid.displayOptions.rowHeight = 36;
  grid.footer.height = 40;
  grid.stateBar.width = 20;
  grid.sortingOptions.showSortOrder = true;
  grid.sortingOptions.style = "reverse";
  grid.displayOptions.rowHoverType = "row";
  grid.displayOptions.rowResizable = true;
  // 셀 단위로 커밋한다.
  grid.commitByCell = true;
  // 셀 수정 상태를 마커로 표시한다.
  grid.displayOptions.showChangeMarker = true;

  grid.setFooters([{height:30},{height:30},{height:30}]);
  grid.setDataSource(ds);
  grid.setColumns(columns);
  loadData('simple_data.json');

  // ds 커밋 전에 undo 할 수 있다.
  // ds undoable Option을 false로 하더라도 커밋 전까지는 뷰어가 데이터를 관리하므로
  // 커밋 전에 undo를 하려면 그리드 옵션의 undoable을 true로 해야 한다.
  grid.setOptions({
  undoable: true
  });

  grid.setEditOptions({
  insertable: true,
  appendable : false
  });

  grid.setGroupPanel({
  minHeight: 60,
  visible: true,
  toast: {
  visible : true
  }
  });

  grid.onContextMenuPopup = function (grid, x, y, elementName) {
  console.log(arguments);
  // realgrid-utils.js 기본 팝업 메뉴 생성
  setContextMenu(grid);

  };
  // realgrid-utils.js 기본 팝업 메뉴 실행
  grid.onContextMenuItemClicked = onContextMenuClick;

  grid.columnByField("KorCountry").autoFilter = true;
  grid.columnByField("StartDate").autoFilter = true;

  grid.setHeader({
  showTooltip: true
  })
  // grid.header.showTooltip = true;

  grid.columnByName("BusinessProficiency").styleCallback = function (column, cell) {
  if (cell.value  == 60) {
  return "rg-data-cell proficiency-loss";
  }
  };

  grid.columnByName("SaveCost").styleCallback = function (column, cell) {
  if (cell.value >= 100000) {
  //return "right-column red-column bold-column";
  return "right-column .{color : red}";
  }
  };

  grid.onButtonClicked = function (grid, index) {
  if (index.column == "Address") {
  window.open("https://map.kakao.com/link/search/" + grid.getValue(index.itemIndex, index.fieldName));
  }
  }

  grid.onShowTooltip = function(grid, index, value) {
  return value;
  };

  grid.onShowHeaderTooltip = function (grid, column, value) {
  return value;
  };

  //동적으로 footer callBack을 정의 할 때 아래와 같이 사용
  //grid.columnByName("number1").footers.getItem(0).valueCallback = function();

  grid.onSelectionChanged = function (grid) {
  $("#cellSummary").text(getSelectionSummary(grid).toLocaleString());

  grid.columnByName("InterestRate").footers.get(0).text = getSelectionSummary(grid).toLocaleString();
  grid.refresh();
  }

  form = grid._view.container.formView;
  //form.visible = true;
  form.options.modal = true;
  form.options.modalPadding = "10% 8%";
  form.options.autoClose = true;

  form.model.load(getColumnsToFormModel(grid));
  form.focusedIndex = 0;

  grid.setFocus();

  };



  // function footerCallBack(grid, column, footerIndex, model, value) {
  //   if (column.name == "InterestRate") {
  //     value = 1234;
  //   }
  // };

  function setActions(actionContainer) {
  createButton(actionContainer, "수정한 셀 가져오기", function (e) {
  alert(JSON.stringify(ds.getUpdatedCells()));
  });
  };

</pre>
</div>


    </div>
</template>

<script>
    import {getPayCodeList} from '@/api/payroll';
    import {GridView, LocalDataProvider} from 'realgrid';

    let gridView = GridView;
    let dataProvider = LocalDataProvider;
    const columns = [
      { header: "코드", fieldName: "PAY_CODE", width: 100 },
      { header: "코드명(한글)", fieldName: "PAY_NAME", width: 100 },
      { header: "코드명(영어)", fieldName: "PAY_ENAME", width: 100 },
      { header: "중지", fieldName: "INACTIVE", width: 100 },
      { header: "급여/공제", fieldName: "PAYTAX_FLAG", width: 100 },
    ]
    const fields = [
      { header: "코드", fieldName: "PAY_CODE", width: 100 },
      { header: "코드명(한글)", fieldName: "PAY_NAME", width: 100 },
      { header: "코드명(영어)", fieldName: "PAY_ENAME", width: 100 },
      { header: "중지", fieldName: "INACTIVE", width: 100 },
      { header: "급여/공제", fieldName: "PAYTAX_FLAG", width: 100 },
    ]

    export default {
        data: function () {
            return {

            }
        },
        methods: {
            async loadData() {
                const $this = this;
                try {
                    const {data} = await getPayCodeList(); // api 호출
                    $this.gridData = data || [];
                    dataProvider.setRows($this.gridData);
                } catch (e) {
                    console.error(e);
                }
            }
        },
        mounted() {
            dataProvider = new LocalDataProvider(false);
            gridView = new GridView("realgrid");
            gridView.setDataSource(dataProvider);
            dataProvider.setFields(fields);
            gridView.setColumns(columns);
        }
    }
</script>