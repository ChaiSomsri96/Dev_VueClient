/**
 * Vuex Index
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';


import auth from '@/store/auth';
import page from '@/store/page';
import common from '@/store/common';
import paymonth from '@/store/paymonth';
import yearend from '@/store/yearend';
import withholding from '@/store/withholding';
import health_employment from '@/store/health_employment';
import sevpension from '@/store/sevpension';
import sevpayentry from '@/store/sevpayentry';
import cfgcalc from '@/store/cfgcalc';
import cfgreport from '@/store/cfgreport';
import payentry from '@/store/payentry';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth  : auth,
        page  : page,
        common: common,
        paymonth: paymonth,
        yearend: yearend,
        withholding: withholding,
        health_employment: health_employment,
        sevpension: sevpension,
        sevpayentry: sevpayentry,
        cfgcalc: cfgcalc,
        cfgreport: cfgreport,
        payentry: payentry
    },
    plugins: [
        createPersistedState({ 
            paths: ['paymonth', 'yearend', 'withholding', 'sevpension', 'sevpayentry', 'health_employment', 'cfgcalc', 'cfgreport', 'payentry'],
            storage: window.sessionStorage 
        })
    ]
});

export default store;