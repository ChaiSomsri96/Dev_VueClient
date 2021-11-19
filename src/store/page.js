
/**
 * 현재 페이지 정보 저장소
 */
const page = {
    namespaced: true,
    state     : {
        currentView: 'dashboard',
        menuList   : []
    },
    getters   : {
        getCurrentView(state) {
            return state.currentView;
        },
        getMenuList(state) {
            return state.menuList;
        }
    },
    mutations : {
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setMenuList(state, menuList) {
            state.menuList = menuList;
        }
    },
    actions   : {}
}

export default page;
