import store from '@/store';

/**
 * Axios Interceptor 설정
 *
 * @param axiosService
 * @returns {*}
 */
function setInterceptors(axiosService, loading) {
    axiosService.interceptors.request.use(function (config) { // 요청을 보내기 전에 어떤 처리를 할 수 있다.
        // 로딩 다이얼로그
        if (loading) {
            showLoading();
        }

        // csrf token 설정
        const csrf = store.state.auth.csrf;
        config.headers[csrf.headerName] = csrf.token;

        return config;

    }, function (error) { // 요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
        // 로딩 다이얼로그
        if (loading) {
            hideLoading();
        }

        return Promise.reject(error);
    });

    axiosService.interceptors.response.use(function (response) { // 서버에 요청을 보내고 나서 응답을 받기 전에 어떤 처리를 할 수 있다.
        // 로딩 다이얼로그
        if (loading) {
            hideLoading();
        }

        return response;
        
    }, function (error) { // 응답이 에러인 경우에 미리 전처리할 수 있다.
        // 로딩 다이얼로그
        if (loading) {
            hideLoading();
        }

        return Promise.reject(error);
    });

    function showLoading() {
        if (g_nwpVar.sitePreference === "MOBILE") {
            common_popup.callMobileModalLoading(true);
        } else {
            common_popup.callModalLoading(true);
        }
    }

    function hideLoading() {
        if (g_nwpVar.sitePreference === "MOBILE") {
            common_popup.callMobileModalLoading(false);
        } else {
            common_popup.callModalLoading(false);
        }
    }

    return axiosService;
}

export {setInterceptors};