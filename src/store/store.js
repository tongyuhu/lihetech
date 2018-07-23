import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ADMIN_INFO, SET_SICK_CARD, SET_CURRENT_SICK_DATA, SET_FLUP_INFO } from './mutationstypes'
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import axios from '@/api/axios'
// import publicStatic from '@/publicData/const.js'
import {rongFriendApi} from '@/api/views/rong'
import {getAdminInfo} from '@/api/components/login'
// import {imgExists} from '@/untils/untils'
Vue.use(Vuex)

// return publicStatic.onlineStatic + '/static/user.png'
export const store = new Vuex.Store({
  state: {
    FlupInfo: {
      userHealthDiaryId: null,
      userId: null,
      adminIdMainDoctor: null,
      userFollowUpId: null,
      isFollowUp: null,
      userName: null,
      adminHospitalId: null
    },
    adminInfo: {},
    // 病历卡id
    userCasesCardId: null,
    // 预约医生id
    userMakeOrderDoctorId: null,
    // 是否显示面诊
    showSickCard: false,
    currentSickData: {},
    // 聊天窗口状态
    chatStatus: false,
    imStatus: false,
    // 用户融云id
    rongUserId: '',
    // 聊天列表
    chatfriend: [],
    // 好友列表
    friendsList: [
      // {
      //   userId: '5277',
      //   userImg: '',
      //   userName: '夏良开',
      //   hasMsg: false,
      //   currentChat: false
      // },
    ],
    // 当前聊天记录
    history: [],
    newmsg: false,
    // 视频通话窗口
    video: false,
    // 有视频请求
    hasVideoMsg: false,
    // 当前视频对象信息
    currentVideo: {},
    // 当前是视频聊天
    currentIsVideo: true,
    // 邀请音视频
    invite: true
  },
  getters: {
    adminImg: state => {
      if (_.has(state.adminInfo, 'headPortraitUrl')) {
        return process.env.IMG_URL + state.adminInfo.headPortraitUrl
        // })
        // .catch(error => {
        //   if (error.response === 404) {
        //     return null
        //   }
        //   console.log('获取医生头像失败')
        //   return null
        // })
      } else {
        return null
      }
    },
    // 当前聊天好友  currentChat为true
    currentChat: state => {
      return _.find(state.friendsList, function (item) {
        return item.currentChat === true
      })
    },
    currentChatImg: state => {
      let current = _.find(state.friendsList, function (item) {
        return item.currentChat === true
      })
      if (_.has(current, 'userImg')) {
        return current.userImg
      } else {
        return null
      }
      // })
      // .catch(error => {
      //   if (error.response === 404) {
      //     return null
      //   }
      //   return null
      // })
    }
  },
  mutations: {
    [SET_ADMIN_INFO] (state, info) {
      state.adminInfo = info
    },
    [SET_SICK_CARD] (state, type) {
      state.showSickCard = type
    },
    [SET_CURRENT_SICK_DATA] (state, obj) {
      state.currentSickData = obj
    },
    [SET_FLUP_INFO] (state, obj) {
      state.FlupInfo = _.merge(state.FlupInfo, obj)
      // state.FlupInfo = obj
      console.log('store.', state.FlupInfo)
    },

    setuserCasesCardId (state, id) {
      state.userCasesCardId = id
    },
    setuserMakeOrderDoctorId (state, id) {
      state.userMakeOrderDoctorId = id
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
      state.friendsList.forEach(item => {
        if (item.userId !== friend.userId) {
          i++
        } else {
          _.merge(item, friend)
        }
      })
      if (i < state.friendsList.length) {
      } else {
        state.friendsList.push(friend)
      }
    },
    // 改变聊天对象
    changeChatFriend (state, friend) {
      state.friendsList.forEach(item => {
        if (item.userId === friend.userId) {
          if (_.has(item, 'history')) {
            state.history = item.history
          } else {
            state.history = []
          }
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
      // Object.assign({}, obj)
    },
    // 收到当前聊天好友消息
    getCurrentFriendMsg (state, message) {
      state.friendsList.forEach(item => {
        if (item.userId === message.senderUserId) {
          if (_.has(item, 'history')) {
            item.history.push(message)
            console.log('添加消息', message)
            // console.log('添加消息', message)
          } else {
            item.history = []
            item.history.push(message)
            console.log('添加消息', message)
          }
        }
      })

      // if (!(_.isArray(state.history))) {
      //   state.history = []
      // }
      // console.log('message', message, state.history)
      // state.history.push(message)
    },
    sendcurrentMsg (state, message) {
      state.friendsList.forEach(item => {
        if (item.userId === message.targetId) {
          if (_.has(item, 'history')) {
            item.history.push(message)
            console.log('添加消息', message)
            // console.log('添加消息', message)
          } else {
            item.history = []
            item.history.push(message)
            console.log('添加消息', message)
          }
        }
      })
    },
    // 当前聊天列表
    sethistory (state, content) {
      state.history = content
    },
    // 关闭聊天动画
    closeAnimation (state) {
      state.newmsg = false
    },
    setFriendsList (state, list) {
      state.friendsList = list
    },
    clearCurrentChat (state) {
      if (state.friendsList.length > 0) {
        state.friendsList.forEach(item => {
          item.currentChat = false
        })
      }
      if (state.chatfriend.length > 0) {
        state.chatfriend.forEach(item => {
          item.currentChat = false
        })
      }
      console.log('是否清除当前聊天', state.chatfriend, state.friendsList)
    },
    clearNewmsg (state) {
      state.newmsg = false
    },
    // 打开视频窗口
    openVideo (state) {
      state.video = true
    },
    // 关闭视频窗口
    closeVideo (state) {
      state.video = false
    },
    // 收到音视频消息  打开提醒
    getVideoMsg (state) {
      state.hasVideoMsg = true
    },
    // 关闭音视频提醒 关闭提醒
    closeVideoMsg (state) {
      state.hasVideoMsg = false
    },
    // 改变通话对象
    changeCurrentVideo (state, val) {
      state.currentVideo = val
    },
    // 发出邀请or接收邀请
    getInvite (state, val) {
      if (val) {
        state.invite = true
      } else {
        state.invite = false
      }
    },
    // 正在通话
    changeCurrentIsVideo (state, val) {
      if (val) {
        state.currentIsVideo = true
      } else {
        state.currentIsVideo = false
      }
    },
    // 打开、关闭im窗口
    changeImStatus (state, val) {
      state.imStatus = val
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
    },
    setFriendsListActon (content) {
      axios(rongFriendApi())
      .then(res => {
        let list = []
        console.log('rongyun', res.data)
        if (_.isArray(res.data.data)) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              let hasFriendIndex = _.findIndex(content.state.friendsList, function (o) {
                return o.userId === 'member_' + item.userId
              })
              if (hasFriendIndex !== -1) {
                list.push(content.state.friendsList[hasFriendIndex])
              } else {
                let obj = {}
                obj.userId = 'member_' + item.userId
                obj.userName = item.userRealName || item.userMobile || '用户'
                obj.hasMsg = false
                obj.currentChat = false
                obj.history = []
                obj.hasHistroy = true
                if (_.has(item, 'userImage')) {
                  obj.userImg = process.env.IMG_URL + item.userImage
                  // obj.userImg = imgExists(process.env.IMG_URL + item.userImage, publicStatic.onlineStatic + '/static/user.png')
                } else {
                  obj.userImg = null
                  // obj.userImg = imgExists(null, publicStatic.onlineStatic + '/static/user.png')
                }
                list.push(obj)
              }
            })
          }
        }
        // _.merge(list, content.state.friendsList)
        console.log('整理后的融云好友', list)
        content.commit('setFriendsList', list)
        // content.commit('setFriendsList')
      })
    },
    updateAdminInfo (content) {
      axios(getAdminInfo())
      .then(res => {
        if (res.data.data) {
          content.commit('SET_ADMIN_INFO', res.data.data)
        }
      })
    }
  },
  plugins: [createPersistedState({
    paths: [
      'adminInfo',
      'userCasesCardId',
      'userMakeOrderDoctorId',
      'showSickCard',
      'currentSickData',
      'rongUserId',
      'FlupInfo'
    ]
  })]
})
