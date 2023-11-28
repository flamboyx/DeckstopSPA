import { createStore } from 'vuex'

export default createStore({
  state: {
    access: '',
    refresh: ''
  },
  getters: {
  },
  mutations: {

    initializeStore(state: {access: (string|null), refresh: (string|null)}) {
      if (localStorage.getItem("access")) {
        state.access = localStorage.getItem("access")
      } else {
        state.access = ''
      }
    },

    setAccess(state, access) {
      state.access = access;
    },

    setRefresh(state, refresh: string){
      state.refresh = refresh;
    }

  },
  actions: {
  },
  modules: {
  }
})
