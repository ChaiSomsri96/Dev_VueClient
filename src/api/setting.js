import Vue from "vue";
import {createPureAxiosInstance, createAxiosServiceWithAuth} from '@/api';

const axiosInstance = createPureAxiosInstance();

function getSupercode() {
    return axiosInstance.get('/system/setting/supercode/list');
}
function getMasterCode(superCode) {
    return axiosInstance.get('/system/setting/mastcode/list-all?SUPER_CODE='+ superCode);
}

function getSetting() {
    return axiosInstance.get('/payroll/code/pay-date/list');
}

function getEmpList(){
     return axiosInstance.get('/employee/list');
}

function getPaydates(){
    return axiosInstance.get( '/payroll/code/pay-date/list');
}

/**
 * Timeline Init
 *
 * @returns {*}
 */
function saveEmp(saveParam) {
    return axiosInstance.post( '/nc/payinfo/update', saveParam).then(
        response => {
            return Promise.resolve(response);
        },
        error => {
            if ( error.response.data.msg){
                // 에러핸들링.
                alert( error.response.data.msg);
            }
            return Promise.reject(error.response);
        }
    );
}

function getAxios(paramObj) {
    return axiosInstance.get(paramObj.url, {params: {...paramObj.param}});
}

function postAxios(paramObj) {
    var me = this;
    let formData = new FormData();
    Object.keys( paramObj.param).forEach((key) => {
        formData.append( key, paramObj.param[key])
    });

    return axiosInstance.post( paramObj.url, formData).then(
        response => {
            if( response.data.success && typeof paramObj.callback === 'function') {
                paramObj.callback();
            }
            return Promise.resolve(response);
        },
        error => {
            if ( error.response.data.msg){
                // 에러핸들링.
                Vue.prototype.alert({
                    title: 'Error',
                    message: error.response.data.msg,
                    yesCallback:function(){}
                });
            }
            return Promise.reject(error.response);
        }
    );
}

function saveSetting(saveParam) {
    saveParam = {
        'PAY_MONTH': saveParam.PAY_MONTH || '201009',
        'SEQ': saveParam.SEQ || 1,
        'PAY_DATE': saveParam.PAY_DATE || '20210526',
        'PAYDAY_MEMO1': saveParam.PAYDAY_MEMO1 || 'TEST',
        'CLOSE_FLAG': saveParam.CLOSE_FLAG || '0',
        'START_DATE': saveParam.START_DATE || '20210501',
        'END_DATE': saveParam.END_DATE || '20210531',
        'SPECIALPAY_FLAG': '0',
        'SECONDARY_ONLY': '0'
    };
    let formData = new FormData();
    Object.keys( saveParam).forEach((key) => {
        formData.append( key, saveParam[key])
    });
    return axiosInstance.post( '/payroll/code/pay-date/insert',formData).then(
        response => {
            return Promise.resolve(response);
        },
        error => {
            if ( error.response.data.msg){
                // 에러핸들링.
                alert( error.response.data.msg);
            }
            return Promise.reject(error.response);
        }
    );
}

export {getSetting, saveSetting, getEmpList, saveEmp, getSupercode, getPaydates, getMasterCode, postAxios, getAxios}