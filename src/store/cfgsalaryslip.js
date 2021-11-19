const state = {
    CFG_SALARY_SLIP_FORM: null
};

const mutations = {
    SET_CFG_SALARY_SLIP_FORM(state, payload) {
        state.CFG_SALARY_SLIP_FORM = payload.CFG_SALARY_SLIP_FORM;
    }
}

const getters = {
    getCfgSalarySlipForm(state) {
        return state.CFG_SALARY_SLIP_FORM;
    }
}

const actions = {
    setCfgSalarySlipForm({commit}, data) {
        commit('SET_CFG_SALARY_SLIP_FORM', data)       
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions      
}