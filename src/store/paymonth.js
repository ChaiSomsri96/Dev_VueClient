const state = {
    payMonth: '',
    payMonthSeq: 0,
    payDate: '',      
}

const mutations = {
    SET_DATA (state, payload) {
        state.payMonth = payload.payMonth;
        state.payMonthSeq = payload.payMonthSeq;
        state.payDate = payload.payDate;   
    }
}

const getters = {
    getPayMonth (state) {
        return state.payMonth;
    },
    getPayMonthSeq (state) {
        return state.payMonthSeq
    },
    getPayDate (state) {
        return state.payDate
    }
}

const actions = {
    getPayMonth({commit}) {
        return new Promise((resolve, reject) => {
            this._vm.$httpGet('/payroll/code/open-pay-date/list')
            .then((response) => {
                const { data } = response;
                commit('SET_DATA', {payMonth: data.PAY_MONTH, payMonthSeq: data.SEQ, payDate: data.PAY_DATE});
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

