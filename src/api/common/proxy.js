import {createAxiosService} from '@/api';

const axiosInstance = createAxiosService()

// 시스템 및 사용자 정보 조회
function getUserInfoProxy() {
    return axiosInstance.get("/bcs/proxy/api/common/fe/user");
}

// 다국어 정보 조회
function getMlngInfoProxy() {
    return axiosInstance.get("/bcs/proxy/api/common/fe/mlng/" + process.env.VUE_APP_SYS_KEY);
}

// 다국어 정보 조회
function getAutoEmpDeptProxy(searchParam) {
    return axiosInstance.get("/bcs/proxy/api/common/fe/auto", {params: searchParam});
}

// GNB 정보 조회
function getGnbProxy() {
    return axiosInstance.get('/bcs/proxy/api/framework/menu/gnb');
}

// LNB 정보 조회
function getLnbProxy() {
    return axiosInstance.get('/bcs/proxy/api/framework/menu/lnb');
}

export {getUserInfoProxy, getMlngInfoProxy, getAutoEmpDeptProxy, getGnbProxy, getLnbProxy};