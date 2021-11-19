const state = {
    EID_LIST: []
};

const mutations = {
    SET_EID_LIST (state, payload) {
        state.EID_LIST = payload.EID_LIST;
    },
}

const getters = {
    getEidList (state) {
        return state.EID_LIST;
    }
}

const actions = {
    setEidList ({commit}, data) {
        commit('SET_EID_LIST', data);        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}