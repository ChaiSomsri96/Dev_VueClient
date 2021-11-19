const state = {
    CFG_CALC_FORM: null,
    CFG_RETIRE_CALC_FORM: null
};

const mutations = {
    SET_CFG_CALC_FORM(state, payload) {
        state.CFG_CALC_FORM = payload.CFG_CALC_FORM;
    },
    SET_CFG_RETIRE_CALC_FORM(state, payload) {
        state.CFG_RETIRE_CALC_FORM = payload.CFG_RETIRE_CALC_FORM;
    }
}

const getters = {
    getCfgCalcForm(state) {
        return state.CFG_CALC_FORM;
    },
    getCfgRetireCalcForm(state) {
        return state.CFG_RETIRE_CALC_FORM;       
    }
}

const actions = {
    setCfgCalcForm({commit}, data) {
        commit('SET_CFG_CALC_FORM', data)       
    },
    setCfgRetireCalcForm({commit}, data) {
        commit('SET_CFG_RETIRE_CALC_FORM', data)       
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions      
}