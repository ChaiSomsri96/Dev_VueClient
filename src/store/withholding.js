const state = {
    DECLARATION_FORM: null
};

const mutations = {
    SET_DECLARATION_FORM(state, payload) {
        state.DECLARATION_FORM = payload.DECLARATION_FORM;
    },
}

const getters = {
    getDeclarationForm(state) {
        return state.DECLARATION_FORM;
    }
}

const actions = {
    setDeclarationForm({commit}, data) {
        commit('SET_DECLARATION_FORM', data)       
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions      
}