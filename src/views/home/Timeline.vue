<template>
    <div>
        <!-- Header 영역 -->
        <div class="content-header">
            <div class="header-bottom">
                <div class="header-bottom-left">
                    <div class="menu-box">
                        <div class="menu-item title">
                            <h1 class="menu-text" v-mlng-text="'js.bcs.title.home'">급여 홈</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- //Header 영역 -->

        <!-- Body 영역 -->
        <div class="content-body">
            <div class="contents_section pt-0">
                <div class="contents_article">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <router-link :to="{name: 'dashboard'}" active-class="active">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'timeline'}" active-class="active">Timeline</router-link>
                        </li>
                        <li class="nav-item" v-if="init.useGettingStarted">
                            <router-link :to="{name: 'gettingStarted'}" active-class="active">Getting Started</router-link>
                        </li>
                    </ul>

                    <div v-if="init.companyTodayYmd" class="box_set">
                        <div class="set_list">
                            <i class="icon-lineIcon-calendar"></i><span class="p1">{{ gfnFormatDate(init.companyTodayYmd) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Timeline 시작 -->
                <div class="contents_article_start">
                    <template v-for="(dataList, groupName, groupIndex) in group">
                        <p class="box-body text-center" v-if="dataList.length == 0" v-mlng-text="'js.bcs.message.nodata'">나타낼 내용이 없습니다.</p>

                        <div class="timeline-date">{{ groupName }}</div>

                        <div class="timeline-wrap" v-for="(data, dataIndex) in dataList">
                            <div class="timeline-box">
                                <div class="timeline-info">
                                    <i class="icon-lineIcon-time mr-10"><span class="blind" v-mlng-text="'js.bcs.message.time'">시간</span></i>
                                    <span class="timeline-time p1">{{ data.creTimeFmt }}</span>
                                </div>

                                <p class="timeline-text p1">
                                    <span>[<router-link :to="data.menuUrl" class="highlight">{{ data.menuNm }}</router-link>]</span>
                                    <span><a href="javascript: void(0);" class="highlight" v-popup-emp="data.crerId">{{ data.crerNm }}</a></span>

                                    <span v-if="gfnIsEmpty(data.operatorId)" v-mlng-text="'js.bcs.message.timeline.user'">님이</span>
                                    <span v-else v-mlng-text="'js.bcs.message.timeline.cs'">님 계정으로 고객센터에서</span>

                                    <span v-if="!gfnIsEmpty(data.avobe)">{{ data.avobe }}</span>
                                    <span v-if="!gfnIsEmpty(data.label)">{{ data.label }}</span>
                                    <span v-if="!gfnIsEmpty(data.anything)">{{ data.anything }}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- Timeline 종료 -->

                <div class="btn-wrap wide pb-20" v-if="meta.searchMore">
                    <button type="button" class="btn btn-lg" @click="more">
                        <i class="icon-lineIcon-plus add-plus-ico">
                            <span class="blind" v-mlng-text="'js.bcs.message.moreView'">더보기</span>
                        </i>
                        <span v-mlng-text="'js.bcs.message.moreView'">더보기</span>
                    </button>
                </div>

            </div>
        </div>
        <!-- //Body 영역 -->
    </div>
</template>

<script>
    import {getTimelineInit, getTimeline} from '@/api/home/timeline';
    import {mlngInfoUtils} from "workplace-vue-common-ui";

    /**
     * ===========================================================
     * 지출 > 관리자 > 홈 > Timeline
     * ===========================================================
     */
    export default {
        title() {
            return mlngInfoUtils.getOrDefault('js.bcs.title.home', '급여 홈');
        },
        data() {
            return {
                init    : {}, // get from Init API
                param   : {}, // get from Search API
                meta    : {}, // get from Search API
                dataList: []  // get from Search API
            }
        },
        computed: {
            group() {
                // group by
                return g_nwpUtils.groupBy(this.dataList, 'creYmdFmt');
            }
        },
//        async created() {
//            const $this = this;
//
//            // Init API
//            try {
//                const {data} = await getTimelineInit();
//                $this.init = data;
//
//            } catch (e) {
//                console.error(e);
//
//                common_popup.toast({
//                    type   : "error",
//                    message: mlngInfoUtils.getOrDefault("js.bcs.alert.error", "오류가 발생했습니다. 잠시후 다시 시도하십시오.")
//                });
//            }
//        },
        mounted() {
            // search
            // this.search();
        },
        methods : {
            /**
             * 더보기 클릭
             */
            more() {
                // search
                this.search();
            },
            /**
             * 조회
             */
            async search() {
                const $this = this;

                let searchParam = {
                    lastTimelineSeq: $this.meta.searchLastTimelineSeq
                };

                // Search API
                try {
                    const {data} = await getTimeline({params: searchParam});
                    let __param = data.param;
                    let __meta = data.meta;
                    let __dataList = data.dataList;

                    $this.param = __param;
                    $this.meta = __meta;

                    __dataList.forEach(data => {
                        $this.dataList.push(data);
                    });

                } catch (e) {
                    console.error(e);

                    common_popup.toast({
                        type   : "error",
                        message: mlngInfoUtils.getOrDefault("js.bcs.alert.error", "오류가 발생했습니다. 잠시후 다시 시도하십시오.")
                    });
                }
            }
        }
    }
</script>