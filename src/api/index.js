/**
 * API Index
 */
import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

/**
 * Axios Service 생성 (인증 제외)
 *
 * @param url
 * @returns {AxiosInstance}
 */
function createAxiosService() {
    return axios.create();
}

/**
 * Pure Axios Service 생성
 *
 * @returns {AxiosInstance}
 */
function createPureAxiosInstance() {
    const instance = axios.create({
        baseURL: 'http://waltz.tx2.kr',
        withCredentials: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-nhn-empid': "96b02530-82de-41c8-8223-3055c74e705e",
            'x-nhn-companyid': "e721e2da-29ee-4782-9672-3d2b150ac1a6",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    return instance;
    // return axios.create();
}

/**
 * Axios Service 생성 (인증 포함)
 *
 * @param url
 * @returns {*}
 */
function createAxiosServiceWithAuth() {
    const axiosService = axios.create();
    return setInterceptors(axiosService, false);
}

/**
 * Axios Service 생성 (인증 포함 and 로딩바)
 *
 * @param url
 * @returns {*}
 */
function createAxiosServiceWithAuthAndLoading() {
    const axiosService = axios.create();
    return setInterceptors(axiosService, true);
}

export {createAxiosService, createAxiosServiceWithAuth, createAxiosServiceWithAuthAndLoading, createPureAxiosInstance};