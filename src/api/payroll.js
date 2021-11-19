import {createPureAxiosInstance} from '@/api';

const axiosInstance = createPureAxiosInstance();

// pay-code
export function getPayCodeList() {
    return axiosInstance.get('/payroll/code/pay-pay/list');
}