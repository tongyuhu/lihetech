import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_NUM, REDUCE_NUM, ADD_PRICE, REDUCE_PRICE} from './mutationstypes'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    num: 12,
    price: 20
  },
  getters: {
    // add: state => {
    //   return state.a + 1
    // },
    // add2: (state, getters) => {
    //   let a = getters.add
    //   return a + 1
    // },
    // adds: (state) => (id) => {
    //   return id
    // }
  },
  mutations: {
    [ADD_NUM] (state, n) {
      state.num += n | 1
    },
    [REDUCE_NUM] (state, n) {
      state.num -= n | 1
    },
    [ADD_PRICE] (state, n) {
      state.price += n | 1
    },
    [REDUCE_PRICE] (state, n) {
      state.price -= n | 1
    }
  },
  actions: {
    reduce (context) {
      context.commit('REDUCE_PRICE')
    }
  }
})
