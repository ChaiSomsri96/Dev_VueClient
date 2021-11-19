<template>
    <div>
        <!-- Header 영역 -->
        <div class="content-header">
            <div class="header-bottom">
                <div class="header-bottom-left">
                    <div class="menu-box">
                        <div class="menu-item title">
                            <h1 class="menu-text" v-mlng-text="'js.bcs.title.home'">지출 홈</h1>
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

                <!-- Getting Started 시작 -->
                <div class="contents_article_start">
                    이곳에 Getting Started 구현
                </div>
                <!-- Getting Started 종료 -->
            </div>
        </div>
        <!-- //Body 영역 -->
    </div>
</template>

<script>
    import {getTimelineInit} from '@/api/home/timeline';
    import {mlngInfoUtils} from "workplace-vue-common-ui";

    /**
     * ===========================================================
     * 지출 > 관리자 > 홈 > Getting Started
     * ===========================================================
     */
    export default {
        title() {
            return mlngInfoUtils.getOrDefault('js.bcs.title.home', '지출 홈');
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

        },
        methods : {

        }
    }
</script>