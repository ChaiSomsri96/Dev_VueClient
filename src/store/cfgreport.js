const state = {
    CFG_SALARY_SLIP_FORM: null,
    CFG_REPORT_FORM: null,
};

const mutations = {
    SET_CFG_SALARY_SLIP_FORM(state, payload) {
        state.CFG_SALARY_SLIP_FORM = payload.CFG_SALARY_SLIP_FORM;
    },
    SET_CFG_REPORT_FORM(state, payload) {
        state.CFG_REPORT_FORM = payload.CFG_REPORT_FORM;
    }
}

const getters = {
    getCfgSalarySlipForm(state) {
        return state.CFG_SALARY_SLIP_FORM;
    },
    getCfgReportForm(state) {
        return state.CFG_REPORT_FORM;
    },
}

const actions = {
    setCfgSalarySlipForm({commit}, data) {
        commit('SET_CFG_SALARY_SLIP_FORM', data)       
    },
    setCfgReportForm({commit}, data) {
        commit('SET_CFG_REPORT_FORM', data)       
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions      
}
