import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {init} from "workplace-vue-common-ui";
import {getUserInfoProxy, getMlngInfoProxy, getAutoEmpDeptProxy} from "./api/common/proxy";
import {getDummyUserInfo, getDummyMlngInfo, getDummyAutoEmpDept} from "./api/dummy";
import './assets/scss/main.scss';
import CommonUtils from './plugins/common-utils';
import PayrollPlugins from './plugins/payroll-plugins';
import axios from 'axios'
import messages from './utils/message';
//Vue.config.productionTip = false;

const staticUrl = 'http://waltz.tx2.kr/assets'; //
//const staticUrl = 'http://localhost/assets';
const verParam = 'scu';

// 초기화 작업 이후 실행한다.
init({
    sysKey      : process.env.VUE_APP_SYS_KEY,
    dataProvider: {
        /* 로그인 되고, 네이버서버와 각종 세팅이 원활하면 아래 부분을 수정한다.
        getUserInfo   : getUserInfoProxy,
        getMlngInfo   : getMlngInfoProxy,
        getAutoEmpDept: getAutoEmpDeptProxy*/
        getUserInfo   : getDummyUserInfo,
        getMlngInfo   : getDummyMlngInfo,
        getAutoEmpDept: getDummyAutoEmpDept
    }
})
.then( function(){
    // Vue.loadCss(staticUrl, "/libs/app.min.css", verParam);
    Vue.loadCss('http://localhost:8008/salary', "/app.min.css", verParam);
    Vue.loadCss(staticUrl, "/libs/realgrid/realgrid-style.min.css", verParam);
    // 원본
    //Vue.loadCss( 'http://ss.dev-ncpworkplace.com','/uikit/dist/css/app.min.css', verParam);
    // div:  <div id="realgrid" style="width: 100%; height: 440px;" class="realgrid-type-style"></div>
    // 원본
    //Vue.loadCss( 'http://ss.dev-ncpworkplace.com','/libs/realgrid/realgrid-style.min.css', verParam);
    Vue.loadScript(staticUrl, '/libs/jszip.min.js', verParam);
    // Vue.loadCss(staticUrl, "/uikit/dist/css/ui-kit.css", verParam);
    // Vue.loadScript(staticUrl, "/uikit/workplace/ui-kit.min.js", verParam);
    Vue.use(CommonUtils, { someOption: true });
    Vue.use(PayrollPlugins, axios);
    //messages
    Vue.prototype.messages = messages; 
})
.then(() => {
    Vue.loadScript(staticUrl, '/libs/realgrid/workplace.realgrid.js', verParam)
        .then(()=>{
            /**
             * Vue Main
             */
            new Vue({
                router,
                store,
                render: (h) => h(App),
            }).$mount("#app");
        });
}).catch((e) => {console.error(e)});