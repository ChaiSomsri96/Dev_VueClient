import request from '@/utils/request'
import qs from 'qs';

export function getPayCodeList() {
    return request({
      url: '/payroll/code/pay-pay/list',
      method: 'get'
    })
}
