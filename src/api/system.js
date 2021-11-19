import {createPureAxiosInstance} from '@/api';

const axiosInstance = createPureAxiosInstance();

export function getSupercode() {
    return axiosInstance.get('/system/setting/supercode/list');
}
export function getMasterCode(superCode) {
    return axiosInstance.get('/system/setting/mastcode/list-all?SUPER_CODE='+ superCode);
}

export function getCountryCode() {
    return axiosInstance.get('/system/setting/country/list');
}

export function getBankCode() {
    return axiosInstance.get('/system/setting/krbank/list');
}

// 간이세액표 조회
export function getTaxRateTable() {
    return axiosInstance.get('/system/setting/nts_tax_table-mgt/list');
}

