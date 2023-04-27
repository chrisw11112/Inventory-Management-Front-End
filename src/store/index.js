import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            isAuthorized: false,
            authToken: undefined,
            url: process.env.VUE_APP_INVENTORYAPI,
            titleFilter: ''
        }
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
  })