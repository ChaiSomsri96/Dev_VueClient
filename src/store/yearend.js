const state = {
    EID: 0,
    EMP_NUMBER: '',
    EMP_NAME: '',
    PAYDAY: '',
    ATT_YEAR: 2020
};

const mutations = {
    SET_ATT_YEAR (state, payload) {
        state.ATT_YEAR = payload.ATT_YEAR;
    },
    SET_DATA (state, payload) {
        state.EID = payload.EID;
        state.EMP_NUMBER = payload.EMP_NUMBER;
        state.EMP_NAME = payload.EMP_NAME;
        state.PAYDAY = payload.PAYDAY;
    }
}

const getters = {
    getAttYear (state) {
        return state.ATT_YEAR;
    },
    getEid (state) {
        return state.EID;
    },
    getEmpNumber (state) {
        return state.EMP_NUMBER;
    },
    getEmpName (state) {
        return state.EMP_NAME;
    },
    getPayday (state) {
        return state.PAYDAY;
    }
}

const actions = {
    setAttYear({commit}, year) {
        commit('SET_ATT_YEAR', {ATT_YEAR: year})
    },
    setEmployee({commit}, data) {
        commit('SET_DATA', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions    
}