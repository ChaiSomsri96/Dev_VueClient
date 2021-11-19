import {createAxiosService} from '@/api';

const axiosInstance = createAxiosService()

/**
 * CSRF Token 획득
 *
 * @returns {*}
 */
function getCsrf() {
    return axiosInstance.get('/bcs/api/auth/csrf');
}

export {getCsrf}