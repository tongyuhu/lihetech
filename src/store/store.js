import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ADMIN_INFO, SET_SICK_CARD, SET_CURRENT_SICK_DATA, SET_FLUP_INFO } from './mutationstypes'
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import axios from '@/api/axios'
// import publicStatic from '@/publicData/const.js'
import {rongFriendApi} from '@/api/views/rong'
import {getAdminInfo} from '@/api/components/login'
Vue.use(Vuex)

// return publicStatic.onlineStatic + '/static/user.png'
export const store = new Vuex.Store({
  state: {
    FlupInfo: {  // 跳转随访页面需要设置
      userHealthDiaryId: null,  // 随访卡id 从随访列表跳转用
      userId: null,  // 病人id
      adminIdMainDoctor: null,  // 医生id
      userFollowUpId: null,  // 医生随访用户表id 从随访列表跳转用
      isFollowUp: null,  // 是否随访
      userName: null,  // 病人姓名
      adminHospitalId: null  // 医院id
    },
    // 当前病历卡病人信息
    currentSickInfo: {

    },
    // 当前登录用户信息
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
    invite: true,
    RongCallLibFunction: null
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
    // 设置当前登录的用户信息
    [SET_ADMIN_INFO] (state, info) {
      state.adminInfo = info
    },
    // 显示病历卡 或者 面诊状态 跳转到病历卡页面需要
    [SET_SICK_CARD] (state, type) {
      state.showSickCard = type
    },
    // 设置当前问诊病人信息 跳转到病历卡页面需要
    [SET_CURRENT_SICK_DATA] (state, obj) {
      state.currentSickData = obj
    },
    /**
     * @description 跳转随访页面需要设置
     */
    [SET_FLUP_INFO] (state, obj) {
      state.FlupInfo = _.merge(state.FlupInfo, obj)
      // state.FlupInfo = obj
      console.log('store.', state.FlupInfo)
    },
    // 设置用户病例卡 id  从患者最新问诊跳转到病历卡需要
    setuserCasesCardId (state, id) {
      state.userCasesCardId = id
    },
    // 设置医生可预约id 从预约列表跳转到病历卡需要
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
            item.history = []
            state.history = []
          }
          let timestrap = null
          let count = 20
          let userId = friend.userId
          // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
          // RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
          //   onSuccess: function (list, hasMsg) {
          //     console.log('历史消息VM', list)
          //     item.history = _.concat(list, item.history)
          //   },
          //   onError: function (error) {
          //     console.log('历史消息获取失败', error)
          //   // APP未开启消息漫游或处理异常
          //   // throw new ERROR ......
          //   }
          // })
          state.history = item.history
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
            // item.history.push(obj.message)
            console.log('添加消息', obj.message)
            // console.log('添加消息', message)
          } else {
            item.history = []
            // item.history.push(obj.message)
            console.log('添加消息', obj.message)
          }
          item.history.push(obj.message)
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
    // 发送消息
    sendcurrentMsg (state, message) {
      state.friendsList.forEach(item => {
        if (item.userId === message.targetId) {
          if (_.has(item, 'history')) {
            item.history.push(message)
            // state.history = item.history
            console.log('添加消息本来有history', message)
            // console.log('添加消息', message)
          } else {
            item.history = []
            item.history.push(message)
            console.log('添加消息本来没有history', message)
          }
          state.history = item.history
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
    // 设置好友列表
    setFriendsList (state, list) {
      state.friendsList = list
    },
    // 清楚当前聊天
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
      // console.log('是否清除当前聊天', state.chatfriend, state.friendsList)
    },
    // 关闭聊天动画
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
    },
    // 设置当前病人病历卡信息
    changeCurrentSickInfo (state, info) {
      state.currentSickInfo = info
    },
    // 设置融云calllib
    changeRongCallLibFunction (state, lib) {
      state.RongCallLibFunction = lib
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
                obj.firstAddMore = true
                if (_.has(item, 'userImage')) {
                  obj.userImg = process.env.IMG_URL + item.userImage
                } else {
                  obj.userImg = null
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
    },
    getHistroyMsg (context, targetuserId) {
      let timestrap = null
      let count = 20
      let userId = targetuserId
      // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          if (_.has(context.getters.currentChat, 'history')) {
            if (context.getters.currentChat.history.length === 0) {
              context.commit('sethistory', list)
            } else {
              context.commit('sethistory', _.concat(list, context.getters.currentChat.history))
            }
          }
          let newChat = context.getters.currentChat
          newChat.history = context.getters.historyMsg
          newChat.hasHistroy = hasMsg
          context.commit('addChatFriend', newChat)
          // console.log('历史消息', list, hasMsg)
          // console.log('历史消息bend', state.historyMsg)
          // state.isTriggerFirstLoad = false
          // if (!hasMsg) {
          //   vm.noMoreHistroy = true
          // }
        },
        onError: function (error) {
          console.log('历史消息获取失败', error)
        // APP未开启消息漫游或处理异常
        // throw new ERROR ......
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
