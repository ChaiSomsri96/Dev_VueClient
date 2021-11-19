const state = {
    payMonthFrom: '',
    payMonthTo: '',
    settleDay: '',
    yearType: 'NOW',
    selectedEids: []
}

const mutations = {
    SET_DATA (state, payload) {
        state.payMonthFrom          = payload.payMonthFrom;
        state.payMonthTo            = payload.payMonthTo;
        state.settleDay             = payload.settleDay;
        state.yearType              = payload.yearType;
        state.selectedEids          = payload.selectedEids;
    },
    SET_SELECTED_EIDS (state, payload) {
        state.selectedEids          = payload.selectedEids;
    }
}

const getters = {
    getPayMonthFrom (state) {
        return state.payMonthFrom;
    },
    getPayMonthTo (state) {
        return state.payMonthTo;
    },
    getSettleDay (state) {
        return state.settleDay;
    },
    getYearType (state) {
        return state.yearType;
    },
    getSelectedEids (state) {
        return state.selectedEids;
    }
}

const actions = {
    setData ({commit}, _data)   {
        commit('SET_DATA', _data)
    },
    setSelectedEids ({commit}, _data)   {
        commit('SET_SELECTED_EIDS', _data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions    
}