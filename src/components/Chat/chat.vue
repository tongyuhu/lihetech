<template>
  <div class="chart-window clear" v-drag="'chart'">
  
    <!-- 左侧聊天好友列表 -->
    <!-- <div class="chart-window-left" v-show="false">
      <ul>
        <li v-for="item in chartList" :key="item.id">
          <span class="name">
            <span class="chart-window-left-icon iconfont icon-people_fill"></span>
            <span class="chart-window-left-name">
              {{item.name}}
            </span>
          </span>
          <el-button type="text">
            <span class="chart-window-left-close iconfont icon-guanbi"></span>
          </el-button>
        </li>
      </ul>
    </div> -->


    <div class="chart-window-right chart-wrap" >

      <!-- 头部信息 -->
      <div class="chart-wrap-head" id="chart">
        <div class="chart-wrap-name">
          <!-- <span class="iconfont icon-people_fill"></span> -->
          <span>{{currentChat.userName}}</span>
        </div>
        <div class="chart-wrap-close">
          <button type="text">
            <i class="el-icon-minus" @click="closeChart"></i>
          </button>
          <button type="text" @click="closeChart">
            <!-- <button type="text"><i class="el-icon-close"></i></button> -->
            <i class="el-icon-close"></i>
          </button>
        </div>
      </div>

      <!-- 聊天记录 -->
      <div class="chart-wrap-box" id="chatWidow" ref="chatWidow">
        <div v-if="!currentChat.hasHistroy" class="center">
          <!-- <span>没有更多聊天记录了</span> -->
        </div>
        <div v-else-if="!isTriggerFirstLoad" class="center">
          <el-button type="text" @click="isTriggerFirstLoad = true" >点击查看聊天记录...</el-button>
        </div>
        <infinite-loading v-else  @infinite="infiniteHandler" 
        direction="top"  
        spinner="circles"
        >
          <span slot="no-more">没有更多数据了</span>
        </infinite-loading>
        <chartMessageGroup>
          <chartMessage
          v-for="(item,index) in historyMsg" :key="index"
          :who="item.senderUserId ? item.senderUserId:''"
          :type="item.content.messageName"
          >
            <chatContent :message="item" :key="item.sentTime"></chatContent>
          </chartMessage>
        </chartMessageGroup>
      </div>
      <!-- 工具 -->
      <div class="chart-wrap-tool">
        <el-popover
        ref="emojiRef"
        width="320"
        popper-class="emoji-popper"
        v-model="showEmoji">
          <div>
            <div class="emoji-wrap">
              <span v-for="(emoji,index) in emojiList" :key="index" @click="addEmoji(emoji)">
                <span v-html="emoji.html"></span>
                <!-- {{emoji.emoji}} -->
              </span>
            </div>
          </div>
        </el-popover>
        <button @click="showEmojiHandle" title="发送表情">
          <span class="smile-icon"></span>
        </button>
        <!-- <button > -->
          <a class="a-upload" title="发送图片信息"> 
            <!-- <input type="text"> -->
            <input type="file" accept="image/jpg" @change="sendImgMsg($event)">
            <!-- <input type="file" accept="image/jpg" @change="changeImg($event)" value="a"> -->
            <span class="file-icon"></span>
          </a>
        <!-- </button> -->
        <button @click="callVoice" title="语音聊天">
          <span class="phone-icon" ></span>
        </button>
        <button @click="callVideo(false)" title="视频聊天">
          <span class="video-icon" ></span>
        </button>
      </div>

      <!-- 写信息 -->
      <div class="chart-wrap-msg">
        <textarea class="textarea" v-model="readyMsg" v-on:keyup.enter.ctrl="sendMsg"></textarea>
      </div>

      <!-- 发送按钮 -->
      <div class="chart-wrap-send">
        <div>
          <!-- <button @click="sendMsg">关闭</button> -->
          <button @click.stop.prevent="sendMsg">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartMessage from './chartMessage'
import chartMessageGroup from './chartMessageGroup'
import chatContent from './chatContent'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import Bus from '@/bus.js'
import {uploadFileApi} from '@/api/components/editAdmin.js'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'chartwindow',
  props: {
  },
  components: {
    chartMessage,
    chartMessageGroup,
    InfiniteLoading,
    chatContent
  },
  data () {
    return {
      readyMsg: null, // 待发送消息
      // readySendMsg:null,
      // chartList: [
      // ],
      // showList: false,
      isTriggerFirstLoad: false,  // 是否第一次打开聊天窗口
      // imgArr: [],
      // noMoreHistroy: false,
      showEmoji: false, // 显示表情列表
      emojiList: []  // 表情列表数据
      // currentChartMsgList: []
    }
  },
  computed: {
    ...mapGetters([
      'currentChat'
    ]),
    ...mapState({
      rongUserId: 'rongUserId',
      historyMsg: 'history',
      adminInfo: 'adminInfo',
      chatfriend: 'chatfriend',
      friendsList: 'friendsList',
      RongCallLibFunction: 'RongCallLibFunction'
    })
    // historyMsg () {
    //   return this.currentChat.history
    // }
  },
  watch: {
    // friendsList: {
    //   handler: function (val) {
    //     let current = this._.find(this.friendsList, function (item) {
    //       return item.currentChat === true
    //     })
    //     this.sethistory(current.history)
    //   },
    //   deep: true
    // },
    // chartList: {
    //   handler: function (val, oldVal) {
    //     if (val.length < 2) {
    //       this.showList = false
    //     } else {
    //       this.showList = true
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    ...mapActions([
      'setaddChatFriend'
    ]),
    ...mapMutations([
      'addChatFriend',
      'closeChatWindow',
      'getCurrentFriendMsg',
      'sethistory',
      'clearCurrentChat',
      'openVideo',
      'getInvite',
      'closeVideoMsg',
      'changeCurrentVideo',
      'getVideoMsg',
      'changeCurrentIsVideo',
      'sendcurrentMsg'
    ]),
    /**
     * @description 打开表情列表
     */
    showEmojiHandle () {
      // this.emojiList = RongIMLib.RongIMEmoji.list
      console.log('打开表情', this.emojiList)
      this.showEmoji = !this.showEmoji
    },
    /**
     * @description 添加表情到待发送消息
     */
    addEmoji (emoji) {
      if (this.readyMsg) {
        this.readyMsg += RongIMLib.RongIMEmoji.emojiToSymbol(emoji.emoji)
        // this.sendMsg += emoji.emoji
      } else {
        this.readyMsg = RongIMLib.RongIMEmoji.emojiToSymbol(emoji.emoji)
        // this.sendMsg = emoji.emoji
      }
    },
    /**
     * @description 发送文本消息
     */
    sendMsg () {
      // console.log('historyMsg', this.historyMsg)
      let vm = this
      this.showEmoji = false
      // vm.historyMsg = []
      let canSend = false
      vm.readyMsg = this._.trim(vm.readyMsg)
      if (vm.readyMsg === '') {
        canSend = false
      } else {
        canSend = true
      }
      if (canSend) {
        console.log('当前聊天', vm.currentChat)
        let targetId = vm.currentChat.userId
        // let targetId = 'member_49'
        let conversationtype = RongIMLib.ConversationType.PRIVATE
        let msg = new RongIMLib.TextMessage({content: RongIMLib.RongIMEmoji.symbolToEmoji(vm.readyMsg), extra: '附加信息'})
        // let msg = new RongIMLib.TextMessage({content: vm.readyMsg, extra: '附加信息'})
        RongIMLib.RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
          onSuccess: function (message) {
            let time = new Date()
            let msgObj = {
              content: {
                messageName: 'TextMessage',
                // messageType: 'TextMessage',
                content: RongIMLib.RongIMEmoji.symbolToEmoji(vm.readyMsg),
                sentTime: time.getTime()
              },
              senderUserId: vm.rongUserId,
              'targetId': targetId
            }
            if (vm._.has(vm.adminInfo, 'headPortraitUrl')) {
              msgObj.userImg = vm.adminInfo.headPortraitUrl
            }
            // vm.historyMsg = vm.currentChat.history
            // vm.sethistory(vm.historyMsg)
            // vm.getCurrentFriendMsg(msgObj)
            vm.sendcurrentMsg(msgObj)
            // let newChat = vm.currentChat
            // newChat.history = vm.historyMsg
            // vm.addChatFriend(newChat)
            // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
            // vm.sethistory(vm.currentChat.history)
            console.log('Send successfully', msgObj)
            console.log('聊天记录', vm.historyMsg)
            // console.log('聊天', newChat)
            vm.readyMsg = ''
          },
          onError: function (errorCode, message) {
            var info = ''
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时'
                break
              case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误'
                break
              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息'
                break
              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中'
                break
              default :
                info = '发送失败'
                break
            }
            console.log('发送失败:' + info)
            vm.$message({
              showClose: true,
              message: '发送失败',
              type: 'error'
            })
          }
        })
      }
      this.$nextTick(() => {
        setTimeout(function () {
          let container = vm.$el.querySelector('#chatWidow')
          container.scrollTop = container.scrollHeight
          // console.log('container.scrollTop', container.scrollTop)
          // console.log('container.scrollHeight', container.scrollHeight)
            // container.scrollIntoView()
        }, 100)
      })
    },
    /**
     * @description 发送图片消息
     */
    sendImgMsg: function (e) {
      // uploadFileApi
      let vm = this
      let file = e.target.files[0]
      let formdata = new FormData()
      formdata.append('files', file)
      let base64Str
      let image = new Image()
      let size = file.size / 1024

      image.src = window.URL.createObjectURL(file)
      // image.src = window.URL.createObjectURL(files.item(dd))
      image.onload = function () {
              // 默认按比例压缩
        let w = image.width
        let h = image.height
        let scale = w / h
        w = 200
        h = w / scale
        // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
        let quality
        if (size < 30) {
          quality = 1
        } else {
          quality = 25 / size
          // if (quality < 0.1) {
          //   quality = 0.1
          // }
        }
        // 生成canvas
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
              // 创建属性节点
        let anw = document.createAttribute('width')
        anw.nodeValue = w
        let anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(image, 0, 0, w, h)
        let ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()// 图片格式
        // let base64 = canvas.toDataURL('image/' + ext, quality)
        let base64 = canvas.toDataURL('image/' + 'jpeg', quality)
        // let base64 = canvas.toDataURL('image/' + ext, quality)
        let base = base64.split(',')
        let str = base[1]
        base64Str = str
        if (base64Str.length / 1024 > 30) {

        }
        console.log('图片大小', file.size / 1024, file)
        console.log('图片大小suolv', base64Str.length / 1024)
        // 回调函数返回base64的值
      }

      this.$axios(uploadFileApi(formdata))
      .then(res => {
        if (res.data.code === '0000') {
          let targetId = vm.currentChat.userId
          var imageUri = res.data.data.seeFile // 上传到自己服务器的 URL。
          // var msg = new RongIMLib.ImageMessage({imageUri: imageUri})
          console.log('base64Str', base64Str)
          var msg = new RongIMLib.ImageMessage({content: base64Str, imageUri: imageUri})
          var conversationtype = RongIMLib.ConversationType.PRIVATE // 单聊,其他会话选择相应的消息类型即可。

          RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            onSuccess: function (message) {
                // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              let msgObj = {
                content: {
                  messageName: 'ImageMessage',
                  // content: imageUri
                  'imageUri': imageUri
                },
                senderUserId: vm.rongUserId,
                'targetId': targetId
              }
              // vm.getCurrentFriendMsg(msgObj)
              console.log('msgObjimg', msgObj)
              vm.sendcurrentMsg(msgObj)
              // let newChat = vm.currentChat
              // newChat.history = vm.historyMsg
              // vm.addChatFriend(newChat)
              console.log('Send successfully image')
              // vm.historyMsg = vm.currentChat.history
              // vm.sethistory(vm.historyMsg)
              vm.readyMsg = ''
              // console.log('Send successfully')
            },
            onError: function (errorCode, message) {
              var info = ''
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时'
                  break
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误'
                  break
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                  info = '在黑名单中，无法向对方发送消息'
                  break
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                  info = '不在讨论组中'
                  break
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                  info = '不在群组中'
                  break
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                  info = '不在聊天室中'
                  break
                default :
                  info = 'x'
                  break
              }
              vm.$message({
                showClose: true,
                message: '发送失败',
                type: 'error'
              })
              console.log('发送失败:' + info)
            }
          })
        }
        return false
      })

      this.$nextTick(() => {
        setTimeout(function () {
          let container = vm.$el.querySelector('#chatWidow')
          container.scrollTop = container.scrollHeight
          console.log('container.scrollTop', container.scrollTop)
          console.log('container.scrollHeight', container.scrollHeight)
            // container.scrollIntoView()
        }, 100)
      })
    },
    /**
     * @description 关闭聊天窗口
     */
    closeChart () {
      this.clearCurrentChat()
      this.closeChatWindow()
    },
    /**
     * @description 加载更多消息
     */
    infiniteHandler ($state) {
      let vm = this
      // var params = {
      //   conversationType: RongIMLib.ConversationType.PRIVATE, // 会话类型
      //   targetId: vm.currentChat.userId, // 目标 Id
      //   timestamp: 1535421956503 // 清除时间点
      // }
      // RongIMLib.RongIMClient.getInstance().clearRemoteHistoryMessages(params, {
      //   onSuccess: function () {
      //     console.log('清除成功')
      //     // 清除成功
      //   },
      //   onError: function (error) {
      //     // 请排查：单群聊消息云存储是否开通
      //     console.log(error)
      //   }
      // })
      // vm.sethistory([])
      new Promise(function (resolve, reject) {
        let timestrap = null
        let count = 20
        let targetuserId = vm.currentChat.userId
        let userId = targetuserId
        // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
          onSuccess: function (list, hasMsg) {
            // vm.sethistory(vm.currentChat.history)
            // vm.getCurrentFriendMsg(msgObj)
            // console.log('历史消息VM', vm.currentChat)
            // if(firstAddMore)
            let historyList = []
            if (vm._.has(vm.currentChat, 'history')) {
              if (vm.currentChat.history.length === 0) {
                // vm.sethistory(list)
                historyList = list
              } else {
                // vm.sethistory(list)
                if (vm._.has(vm.currentChat, 'firstAddMore')) {
                  if (vm.currentChat.firstAddMore) {
                    historyList = list
                  } else {
                    historyList = vm._.concat(list, vm.currentChat.history)
                  }
                }
                // vm.sethistory(vm._.concat(list, vm.currentChat.history))
                // vm.currentChartMsgList = vm._.concat(list, vm.currentChartMsgList)
                // vm.sethistory(vm.currentChartMsgList)
              }
            }
            vm.sethistory(historyList)
            let newChat = vm.currentChat
            newChat.history = historyList
            newChat.hasHistroy = hasMsg
            newChat.firstAddMore = false
            vm.addChatFriend(newChat)
            console.log('历史消息', list, hasMsg)
            console.log('历史消息bend', vm.historyMsg)
            vm.isTriggerFirstLoad = false
          // if (!hasMsg) {
          //   vm.noMoreHistroy = true
          // }
            resolve('success')
          },
          onError: function (error) {
            resolve('error')
            console.log('历史消息获取失败', error)
        // APP未开启消息漫游或处理异常
        // throw new ERROR ......
          }
        })
        // vm.getHistroyMsgRong(vm.currentChat.userId)
      }).then(function (resolve) {
        if (resolve === 'success') {
          if (!vm.isTriggerFirstLoad) {
            vm.isTriggerFirstLoad = false
            if (!vm.currentChat.hasHistroy) {
              $state.complete()
            } else {
              $state.loaded()
            }
          }
        }
        if (resolve === 'error') {
          vm.$message({
            message: '获取历史消息失败',
            type: 'error'
          })
          // $state.complete()
          vm.isTriggerFirstLoad = false
          $state.loaded()
        }
      })
    },
    // 获取历史消息 暂不用
    getHistroyMsgRong (targetuserId) {
      let vm = this
      let timestrap = null
      let count = 20
      let userId = targetuserId
      // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          console.log('历史消息VM', vm.currentChat)
          if (vm._.has(vm.currentChat, 'history')) {
            if (vm.currentChat.history.length === 0) {
              vm.sethistory(list)
              console.log('加载更多add1')
            } else {
              console.log('加载更多add2')
              vm.sethistory(list)
            }
          }
          let newChat = vm.currentChat
          newChat.history = list
          newChat.hasHistroy = hasMsg
          vm.addChatFriend(newChat)
          console.log('历史消息', list, hasMsg)
          vm.isTriggerFirstLoad = false
        },
        onError: function (error) {
          console.log('历史消息获取失败', error)
        // APP未开启消息漫游或处理异常
        // throw new ERROR ......
        }
      })
    },
    /**
     * @description 发送视频消息
     */
    callVideo (isvoice) {
      let vm = this
      let currentCallType
      var CallType = RongIMLib.VoIPMediaType
      if (isvoice) {
        currentCallType = CallType.MEDIA_AUDIO
        vm.changeCurrentIsVideo(false)
      } else {
        currentCallType = CallType.MEDIA_VEDIO
        vm.changeCurrentIsVideo(true)
      }
      console.log('通话id', vm.currentChat.userId)
      var params = {
        // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
        conversationType: RongIMLib.ConversationType.PRIVATE,
        // 会话目标 Id，群 Id 或者 userId。
        // targetId: 'admin_5',
        // inviteUserIds: ['admin_5'],
        targetId: vm.currentChat.userId,
        inviteUserIds: [vm.currentChat.userId],
        // 被邀请人 Id , 多人视频填写多个 userId 最多支持 7 人, 一对一和 targetId 值一致。
        // 音频类型
        // CallType.MEDIA_VEDIO
        // CallType.MEDIA_AUDIO
        mediaType: currentCallType
      }
      vm.getInvite(true) // 改变状态显示接收消息
      vm.getVideoMsg() // 打开显示接收消息窗口
      let targetUser = params
      let index = vm._.findLastIndex(vm.friendsList, function (item) {
        return item.userId === targetUser.targetId
      })
      if (index !== -1) {
        targetUser.userImg = vm.friendsList[index].userImg
        targetUser.userName = vm.friendsList[index].userName
      } else {
        targetUser.userImg = null
        targetUser.userName = null
      }
      vm.changeCurrentVideo(targetUser)

      vm.RongCallLibFunction.call(params, function (error) {
        console.log('发送视频失败', error)
        vm.closeVideoMsg()  // 关闭提醒窗口
        if (error.code === 4) {
          vm.$message({
            showClose: true,
            message: '对方忙,请稍后再打',
            type: 'warning'
          })
        }
        if (error.code === 1 || error.code === 2) {
          vm.$message({
            showClose: true,
            message: '对方取消了通话',
            type: 'warning'
          })
        }
        if (error.code === 3) {
          vm.$message({
            showClose: true,
            message: '对方挂断了通话',
            type: 'warning'
          })
        }
        if (error.code === 5) {
          vm.$message({
            showClose: true,
            message: '对方未接听',
            type: 'warning'
          })
        }
        if (error.code === 6) {
          vm.$message({
            showClose: true,
            message: '己方不支持当前引擎',
            type: 'warning'
          })
        }
        if (error.code === 7) {
          vm.$message({
            showClose: true,
            message: '对方网络出错',
            type: 'warning'
          })
        }
        if (error.code === 8) {
          vm.$message({
            showClose: true,
            message: '其他设备已处理',
            type: 'warning'
          })
        }
        if (error.code === 11) {
          vm.$message({
            showClose: true,
            message: '对方取消已发出的通话请求',
            type: 'warning'
          })
        }
        if (error.code === 12) {
          vm.$message({
            showClose: true,
            message: '对方拒绝收到的通话请求',
            type: 'warning'
          })
        }
        if (error.code === 13) {
          vm.$message({
            showClose: true,
            message: '对方挂断通话',
            type: 'warning'
          })
        }
        if (error.code === 14) {
          vm.$message({
            showClose: true,
            message: '对方忙碌',
            type: 'warning'
          })
        }
        if (error.code === 15) {
          vm.$message({
            showClose: true,
            message: '对方未接听',
            type: 'warning'
          })
        }
        if (error.code === 16) {
          vm.$message({
            showClose: true,
            message: '对方不支持当前引擎',
            type: 'warning'
          })
        }
        if (error.code === 17) {
          vm.$message({
            showClose: true,
            message: '对方网络错误',
            type: 'warning'
          })
        }
        if (error.code === 18) {
          vm.$message({
            showClose: true,
            message: 'CallLib 不可以用',
            type: 'warning'
          })
        }
        // do something...
      })
    },
    /**
     * @description 发送语音消息
     */
    callVoice () {
      this.callVideo(true)
    },
    scrollToButtom () {
      let vm = this
      this.$nextTick(() => {
        setTimeout(function () {
          let container = vm.$el.querySelector('#chatWidow')
          container.scrollTop = container.scrollHeight
          // console.log('container.scrollTop', container.scrollTop)
          // console.log('container.scrollHeight', container.scrollHeight)
            // container.scrollIntoView()
        }, 100)
      })
    }
  },
  created () {
    let vm = this
    vm.emojiList = RongIMLib.RongIMEmoji.list
    this.emojiList.forEach(item => {
      item.html = RongIMLib.RongIMEmoji.symbolToHTML(item.symbol)
    })
    // this.getHistroyMsgRong(vm.currentChat.userId)
  },
  mounted () {
    // let vm = this
    // Bus.$on('history', (val) => {
    //   vm.historyMsg = val
    // })
  }
}
</script>

<style lang="scss" scoped>
  .clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
    width: 0;
  }
  $box-height:520px;
  @mixin initul($float:none){
    ul{
      list-style: none;
      margin:0;
      padding:0;
    }
    li{
      display: block;
      height: 30px;
      cursor: pointer;
      float: $float;
    }
  }
  .chart-window{
    position: fixed;
    display: flex;
    top:20%;
    left:30%;
    z-index: 999999999;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
    &-left{
      // float: left;
      background-color: #D9D9D9;
      height: $box-height;
      width: 150px;
      @include initul;
      li{
        $height:50px;
        line-height: $height;
        height: $height;
        vertical-align: middle;
        display: flex;
        justify-content:space-between; 
        align-items: center;
        span{
          display: inline-block;
        }
        .name{
          display: flex;
          align-items: center;
        }
      }
      li:hover{
        background-color: #eaeaea;
      }
      &-icon{
        font-size: 30px;
        // padding-top:5px;
      }
      &-name{
        display: inline-block;
        font-size: 20px;
        // margin-bottom: 15px;
        // line-height: 50px;
      }
      &-close{  
        font-size: 20px;
        // float: right;
        opacity: 0;
        // align-self:flex-end;
      }
      li:hover &-close{
        font-size: 20px;
        // float: right;
        opacity: 1;
        &:hover{
          color: firebrick;
        }
      }
    }
    &-right{
      // float: left;
      background-color: #f4f6f9;
      height: $box-height;
      width: 600px;
    }
  }
  .chart-wrap{
    position: relative;
    &-head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 62px;
      background-color:#fff;
    }
    &-name{
      display: flex;
      align-items: center;
      cursor: move;
      width: 70%;
      color: #041421;
      font-size: 20px;
      padding-left: 20px;
    }
    &-close{
      margin-top: 5px;
      margin-right: 15px;
      button{
        border: none;
        outline: none;
        background: #fff;
        cursor: pointer;
        font-size: 20px;
      }
    }
    &-box{
      height: 300px;
      border-bottom:1px solid #e0e0e0;
      background-color: #f4f6f9;
      overflow: auto;
      padding-top:10px;
      padding-left: 10px;
      padding-right: 10px;
      &::-webkit-scrollbar {
        width: 5px;  /*滚动条宽度*/
      }
        &::-webkit-scrollbar-track  
      {  
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
        border-radius: 5px;  /*滚动条的背景区域的圆角*/
        background-color: #fff;/*滚动条的背景颜色*/  
      }  
        
      /*定义滑块 内阴影+圆角*/  
      &::-webkit-scrollbar-thumb  
      {  
        border-radius: 10px;  /*滚动条的圆角*/
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
        background-color: #e6e8eb;  /*滚动条的背景颜色*/
      } 
    }
    &-tool{
      position: relative;
      padding-top:10px;
      height: 25px;
      // border-top:1px solid #fff;
      background-color: #f4f6f9;
      display: flex;
      align-items: center;
      padding-left: 5px;
      button{
        border: none;
        outline: none;
        background: #f4f6f9;
        cursor: pointer;
      }
      span{
        display: inline-block;
        // width: 25px;
        height: 20px;
      }
      .smile-icon{
        background: url(~icon/hospital-icon-94.png) no-repeat center;
        width: 20px;
      }
      .file-icon{
        background: url(~icon/hospital-icon-95.png) no-repeat center;
        width: 20px;
      }
      .phone-icon{
        background: url(~icon/hospital-icon-96.png) no-repeat center;
        width: 20px;
      }
      .video-icon{
        background: url(~icon/hospital-icon-97.png) no-repeat center;
        width: 25px;
      }
    }
    &-msg{
      // border-top:1px solid #fff;
      // height: 50px;
      textarea{
        border:none;
        padding:10px;
        margin:0;
        width: 100%;
        height: 65px;
        resize: none;
        box-sizing: border-box;
        outline: none;
        font-size: 14px;
        color: #041421;
        background-color: #f4f6f9;
        &::-webkit-scrollbar {
          width: 5px;  /*滚动条宽度*/
        }
          &::-webkit-scrollbar-track  
        {  
          // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
          border-radius: 5px;  /*滚动条的背景区域的圆角*/
          background-color: #fff;/*滚动条的背景颜色*/  
        }  
          
        /*定义滑块 内阴影+圆角*/  
        &::-webkit-scrollbar-thumb  
        {  
          border-radius: 10px;  /*滚动条的圆角*/
          // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
          background-color: #e6e8eb;  /*滚动条的背景颜色*/
        } 
        // &:focus{
        //   background-color: #fff;
        // }
      }
    }
    &-send{
      position: absolute;
      bottom: 15px;
      right: 30px;
      // border-top:1px solid #000;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      // height: 35px;
      // padding-right: 30px;
      button{
        cursor: pointer;
        // margin-left: 10px;
        // background-color: #1991fc;
        // box-shadow:2px 2px 2px rgb(146, 187, 146);
        background: #1991fc;
        border:1px solid #1991fc;
        box-sizing: border-box;
        line-height: 1;
        white-space: nowrap;
        outline: none;
        border-radius: 2px;
        color: #fff;
        width: 84px;
        height: 30px;
        // border:
      }
      button:hover{
        opacity: 0.9;
      }
    }
  }
  .center{
    text-align:center;
    font-size: 14px;
    color: #666;
  }


  .a-upload {
    /* padding: 4px 10px; */
    height: 25px;
    line-height: 32px;
    position: relative;
    cursor: pointer;
    color: #888;
    /* background: #fafafa; */
    /* border: 1px solid #ddd; */
    /* border-radius: 4px; */
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}

  .a-upload  input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer
  }

  .a-upload:hover {
      /* color: #444; */
      /* background: #eee; */
      /* border-color: #ccc; */
      text-decoration: none
  }
  .emoji-wrap{
    span{
      cursor: pointer;
      padding:1px;
      // font-size: 18px;
    }
  }
</style>
<style>
.emoji-popper{
    position: absolute;
    bottom:35px;
  }
</style>


