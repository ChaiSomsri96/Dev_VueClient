const state = {
    SEV_DATE: '',
    SEV_PENSION_SEQ: '',
    SEV_PENSION_MATTER_NAME: '',
    SEV_CONTROL_NO: '',
    SEV_PENSION_START: '',
    SEV_PENSION_END: '',
    FINAL_SAL_FROM: '',
    FINAL_SAL_TL: '',
    FINAL_BONUS_FROM: '',
    FINAL_BONUS_TO: '',
    SEV_MATTER_FLAG_NAME: '',
    SEV_MATTER_FLAG: '',
    PERIOD_SIZE: '',
    PERIOD_BASIS: '',
    CREATE: ''
};

const mutations = {
    SET_ATT_YEAR (state, payload) {
        state.ATT_YEAR = payload.ATT_YEAR;
    },
    SET_DATA (state, payload) {
        state.SEV_DATE = payload.SEV_DATE;
        state.SEV_PENSION_SEQ = payload.SEV_PENSION_SEQ;
        state.SEV_PENSION_MATTER_NAME = payload.SEV_PENSION_MATTER_NAME;
        state.SEV_CONTROL_NO = payload.SEV_CONTROL_NO;
        state.SEV_PENSION_START = payload.SEV_PENSION_START;
        state.SEV_PENSION_END = payload.SEV_PENSION_END;
        state.FINAL_SAL_FROM = payload.FINAL_SAL_FROM;
        state.FINAL_SAL_TL = payload.FINAL_SAL_TL;
        state.FINAL_BONUS_FROM = payload.FINAL_BONUS_FROM;
        state.FINAL_BONUS_TO = payload.FINAL_BONUS_TO;
        state.SEV_MATTER_FLAG_NAME = payload.SEV_MATTER_FLAG_NAME;
        state.PERIOD_SIZE = payload.PERIOD_SIZE;
        state.PERIOD_BASIS = payload.PERIOD_BASIS;
        state.SEV_MATTER_FLAG = payload.SEV_MATTER_FLAG;
        state.LAST_DIGIT_FLAG = payload.LAST_DIGIT_FLAG;
        state.SEV_PENSION_MATTER_NOTE = payload.SEV_PENSION_MATTER_NOTE;
        state.CREATE = payload.CREATE;
    }
}

const getters = {
    getData( state) {
        return state
    },
    getSevDate (state) {
        return state.SEV_DATE;
    },
    getSevPensionSeq (state) {
        return state.SEV_PENSION_SEQ;
    },
    getSevPensionMatterName (state) {
        return state.SEV_PENSION_MATTER_NAME;
    },
    getSevControlNo (state) {
        return state.SEV_CONTROL_NO;
    },
    getSevPensionStart (state) {
        return state.SEV_PENSION_START;
    }
}

const actions = {
    // setAttYear({commit}, year) {
    //     commit('SET_ATT_YEAR', {ATT_YEAR: year})
    // },
    setSevPensionMatter({commit}, data) {
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