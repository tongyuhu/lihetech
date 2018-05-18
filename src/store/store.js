import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ADMIN_INFO } from './mutationstypes'
import _ from 'lodash'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    adminInfo: {},
    rongUserId: '',
    chatfriend: [],
    friendsList: [
      {
        userId: '5277',
        userImg: '',
        userName: '夏良开',
        hasMsg: false,
        currentChat: false
      },
      {
        userId: 'member_5',
        userImg: '',
        userName: '测试',
        hasMsg: false,
        currentChat: false
      },
      {
        userId: '4',
        userImg: '',
        userName: '夏邦为',
        hasMsg: false,
        currentChat: false
      },
      {
        userId: '5',
        userImg: '',
        userName: '夏利坚',
        hasMsg: false,
        currentChat: false
      }
    ]
  },
  getters: {
    currentChat: state => {
      return _.find(state.chatfriend, function (item) {
        return item.currentChat === true
      })
    }
  },
  mutations: {
    [SET_ADMIN_INFO] (state, info) {
      state.adminInfo = info
    },
    setRongUserId (state, id) {
      state.rongUserId = id
    },
    addChatFriend (state, friend) {
      let i = 0
      state.chatfriend.forEach(item => {
        if (state.chatfriend[i].userId !== friend.userId) {
          i++
        } else {
          _.merge(state.chatfriend[i], friend)
        }
      })
      if (i < state.chatfriend.length) {
      } else {
        state.chatfriend.push(friend)
      }
    },
    changeChatFriend (state, friend) {
      state.chatfriend.forEach(item => {
        if (item.userId === friend.userId) {
          item.currentChat = true
        } else {
          item.currentChat = false
        }
      })
    }
  },
  actions: {
    reqAdminInfo (context) {
      context.commit('SET_ADMIN_INFO')
    },
    setRongUserIdAction (context) {
      context.commit('setRongUserId')
    },
    setaddChatFriend (context) {
      context.commit('addChatFriend')
    }
  }
})
