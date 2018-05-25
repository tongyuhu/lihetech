import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ADMIN_INFO, SET_SICK_CARD } from './mutationstypes'
import _ from 'lodash'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    adminInfo: {},
    showSickCard: false,
    // 聊天窗口状态
    chatStatus: false,
    // 用户融云id
    rongUserId: '',
    // 聊天列表
    chatfriend: [],
    // 好友列表
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
        userId: 'member_12',
        userImg: '',
        userName: '向日葵',
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
    ],
    // 当前聊天记录
    history: [],
    newmsg: false
  },
  getters: {
    // 当前聊天好友  currentChat为true
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
    [SET_SICK_CARD] (state, type) {
      state.showSickCard = type
    },
    // 打开聊天窗口
    openChatWindow (state) {
      state.chatStatus = true
    },
    // 关闭聊天窗口
    closeChatWindow (state) {
      state.chatStatus = false
    },
    // 设置用户融云id
    setRongUserId (state, id) {
      state.rongUserId = id
    },
    // 添加聊天好友到列表
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
    // 改变聊天对象
    changeChatFriend (state, friend) {
      state.chatfriend.forEach(item => {
        if (item.userId === friend.userId) {
          item.currentChat = true
        } else {
          item.currentChat = false
        }
      })
    },
    // 收到非当前聊天好友消息
    getFriendMsg (state, obj) {
      state.friendsList.forEach(item => {
        if (item.userId === obj.friendId) {
          item.hasMsg = true
          state.newmsg = true
          if (_.has(item, 'history')) {
            item.history.push(obj.message)
            console.log('添加消息', obj.message)
            // console.log('添加消息', message)
          } else {
            item.history = []
            item.history.push(obj.message)
            console.log('添加消息', obj.message)
          }
        }
      })
    },
    // 收到当前聊天好友消息
    getCurrentFriendMsg (state, message) {
      state.history.push(message)
    },
    // 当前聊天列表
    sethistory (state, content) {
      state.history = content
    },
    // 关闭聊天动画
    closeAnimation (state) {
      state.newmsg = false
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
