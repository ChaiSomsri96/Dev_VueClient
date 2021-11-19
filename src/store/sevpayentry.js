const state = {
    AVG: [],
    BONUS: [],
    CAL: [],
    SET: [],
    TEN: [],
    EXE: [],
    PER: [],
    BFP: [],
    PEN: [],
    RATE: []
};

const mutations = {
    SET_ATT_YEAR (state, payload) {
        state.ATT_YEAR = payload.ATT_YEAR;
    },
    SET_DATA (state, payload) {
        state.AVG = payload.AVG;
        state.BONUS = payload.BONUS;
        state.CAL = payload.CAL;
        state.SET = payload.SET;
        state.TEN = payload.TEN;
        state.EXE = payload.EXE;
        state.PER = payload.PER;
        state.BFP = payload.BFP;
        state.PEN = payload.PEN;
        state.RATE = payload.RATE;
    },

    RESET_DATA(state, payload){
        state.AVG= [];
        state.BONUS= [];
        state.CAL= [];
        state.SET= [];
        state.TEN= [];
        state.EXE= [];
        state.PER= [];
        state.BFP= [];
        state.PEN= [];
        state.RATE= [];
    },

    RESET_CAL( state) {
        state.CAL = [];
    },

    SET_CAL_DATA( state, payload) {
        state.CAL = payload;
    },

    RESET_AVG( state) {
        state.AVG = [];
    },

    SET_AVG_DATA( state, payload) {
        state.AVG = payload;
    },

    RESET_TEN( state) {
        state.TEN = [];
    },

    SET_TEN_DATA( state, payload) {
        state.TEN = payload;
    },

    RESET_PEN( state) {
        state.PEN = [];
    },

    SET_PEN_DATA( state, payload) {
        state.PEN = payload;
    },
}

const getters = {
    getData( state) {
        return state
    },
    getAvgData (state) {
        return state.AVG;
    },
    getBonusData (state) {
        return state.BONUS;
    },
    getCalData (state) {
        return state.CAL;
    },
    getSetData (state) {
        return state.SET;
    },
    getTenData (state) {
        return state.TEN;
    },
    getExeData ( state){
        return state.EXE;
    },
    getPerData ( state){
        return state.PER;
    },
    getBfpData  ( state){
        return state.BFP;
    },
    getPenData ( state){
        return state.PEN;
    },
    getRateData( state){
        return state.RATE;
    }
}

const actions = {
    setSevPayCalcData({commit}, data) {
        commit('SET_DATA', data)
    },
    
    resetPayCalcData({commit}, data) {
        commit('RESET_DATA', data)
    },

    resetCalData({commit}) {
        commit( 'RESET_CAL')
    },

    setCalData({commit},data) {
        commit( 'SET_CAL_DATA', data)
    },

    resetAvgData({commit}) {
        commit( 'RESET_AVG')
    },

    setAvgData({commit},data) {
        commit( 'SET_AVG_DATA', data)
    },

    resetTenData({commit}) {
        commit( 'RESET_TEN')
    },

    setTenData({commit},data) {
        commit( 'SET_TEN_DATA', data)
    },

    resetPenData({commit}) {
        commit( 'RESET_PEN')
    },

    setPenData({commit},data) {
        commit( 'SET_PEN_DATA', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}