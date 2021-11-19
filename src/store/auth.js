/**
 * 인증 관련 저장소
 */
import { getCsrf } from '@/api/auth/csrf';

const auth = {
    namespaced: true,
    state     : {
        csrf: {}
    },
    getters   : {
        getCsrf(state) {
            return state.csrf;
        }
    },
    mutations : {
        setCsrf(state, csrf) {
            state.csrf = csrf;
        }
    },
    actions   : {
        async CSRF({commit}) {
            try {
                const {data} = await getCsrf(); // api 호출
                commit('setCsrf', data);
            } catch (e) {
                console.error(e);
            }
        }
    }
};

export default auth;