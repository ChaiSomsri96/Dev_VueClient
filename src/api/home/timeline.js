import {createAxiosServiceWithAuthAndLoading} from '@/api';

const axiosInstance = createAxiosServiceWithAuthAndLoading()

/**
 * Timeline Init
 *
 * @returns {*}
 */
function getTimelineInit() {
    return {
        useGettingStarted: true,
        init: {
            useGettingStarted: true,
        }
    }; // axiosInstance.get('/bcs/manager/api/home/timeline/init');
}

/**
 * Timeline 조회
 *
 * @returns {*}
 */
function getTimeline() {
    return {
        useGettingStarted: true,
        init:{
            useGettingStarted: true,
        }
    }; // axiosInstance.get('/bcs/manager/api/home/timeline');
}

export {getTimelineInit, getTimeline}