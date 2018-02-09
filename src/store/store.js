import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ADMIN_INFO } from './mutationstypes'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    adminInfo: {}
  },
  getters: {
    // add: state => {
    //   return state.a + 1
    // }
  },
  mutations: {
    [SET_ADMIN_INFO] (state, info) {
      state.adminInfo = info
    }
  },
  actions: {
    reqAdminInfo (context) {
      context.commit('SET_ADMIN_INFO')
    }
  }
})
