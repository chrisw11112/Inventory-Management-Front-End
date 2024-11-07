import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            isAuthorized: false,
            authToken: undefined,
            url: process.env.VUE_APP_INVENTORYAPI,
            titleFilter: '',
            itemsWithoutBin: false
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