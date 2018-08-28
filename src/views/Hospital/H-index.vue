<template>
  <div class="container">
    <div class="container-head">
      <H-Head></H-Head>
    </div>
    <div class="container-sider">
      <H-Sider></H-Sider>
    </div>
    <div class="container-main">
      <router-view v-cloak></router-view>
    </div>
    <!-- <div class="has-message-animation"> -->

    <div :class="{'container-footer':true ,'has-message-animation':newmsg}">
        <button class="chat-icon-btn" @click="showFriendWindow">
        </button>
      <!-- <div class="chat-icon"></div> -->
    </div>
    <im
    v-show="imStatus"
    @closeIM="closeIMhandle"
    @chat="chatWith"></im>
    <chat
    v-if="chatStatus"
    ></chat>
    <!-- :key="keyTime" -->
    <videoChat
    ref="videochatref"
    v-show="video"
    @close="closeVideoChat"
    @hungcall="hungup"
    @mute="muteChat"
    @unmute="unmuteChat"
    @toAudio="videoToAudio"
    @toVideo="audioToVideo"></videoChat>
    <connectBtn
    v-if="hasVideoMsg"
    @connect="connectCall"
    @reject="rejectCall"
    @cancel="cancelCall"></connectBtn>
  </div>

</template>
<script>
  import HHead from './../Hospital/H-Head.vue'
  import HSider from './../Hospital/H-Sider.vue'
  import chat from '@/components/Chat/chat.vue'
  import im from '@/components/Chat/im.vue'
  import videoChat from '@/components/Chat/video.vue'
  import connectBtn from '@/components/Chat/connectBtn.vue'
  import Bus from '@/bus.js'
  import publicStatic from '@/publicData/const.js'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import position from '@/components/Chat/postion.vue'
  import {findComponentsDownward} from '@/untils/untils'
  export default {
    name: 'H-index',
    components: {
      HHead,
      HSider,
      chat,
      im,
      videoChat,
      connectBtn,
      position
    },
    data () {
      return {
        appKey: 'pwe86ga5pv726',
        token: '',
        selfVideoDomID: null,
        friendVideoDomID: null
      }
    },
    computed: {
      ...mapState({
        adminInfo: 'adminInfo',
        chatStatus: 'chatStatus',
        friendsList: 'friendsList',
        newmsg: 'newmsg',
        video: 'video',
        hasVideoMsg: 'hasVideoMsg',
        currentVideo: 'currentVideo',
        currentIsVideo: 'currentIsVideo',
        imStatus: 'imStatus',
        RongCallLibFunction: 'RongCallLibFunction'
      }),
      ...mapGetters([
        'currentChat'
      ]),
      keyTime () {
        let date = new Date()
        return date.getTime()
      }
    },
    methods: {
      ...mapMutations([
        'setRongUserId',
        'openChatWindow',
        'closeChatWindow',
        'getFriendMsg',
        'getCurrentFriendMsg',
        'closeAnimation',
        'clearCurrentChat',
        'openVideo',
        'closeVideo',
        'closeVideoMsg',
        'getVideoMsg',
        'changeCurrentVideo',
        'getInvite',
        'changeCurrentIsVideo',
        'changeImStatus',
        'changeRongCallLibFunction'
      ]),
      ...mapActions([
        'setRongUserIdAction',
        'setFriendsListActon'
      ]),
      showFriendWindow () {
        this.closeAnimation()
        // this.setFriendsListActon()
        this.changeImStatus(true)
      },
      closeIMhandle () {
        this.changeImStatus(false)
      },
      chatWith (history) {
        Bus.$emit('history', history)
        this.openChatWindow()
        // this.chatStatus = true
      },
      closeVideoChat () {
        // if (this.currentVideo) {
          // this.hungup()
        // }
        this.closeVideo()
      },
      // 接通
      connectCall () {
        let targetId
        if (this.currentVideo) {
          targetId = this.currentVideo.targetId
        }
        let isCallVideo
        var CallType = RongIMLib.VoIPMediaType
        if (this.currentIsVideo) {
          isCallVideo = CallType.MEDIA_VEDIO
        } else {
          isCallVideo = CallType.MEDIA_AUDIO
        }
        let params = {
          // conversationType: 1, // 单聊
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊
          targetId: targetId,
          // 音频类型
          // CallType.MEDIA_VEDIO
          // CallType.MEDIA_AUDIO
          mediaType: isCallVideo
          // mediaType: CallType.MEDIA_VEDIO
        }
        // }
        this.RongCallLibFunction.accept(params)
        this.openVideo() // 打开视频窗口
        this.closeVideoMsg()  // 关闭提醒窗口
      },
      // 拒绝通话
      rejectCall () {
        let targetId
        if (this.currentVideo) {
          targetId = this.currentVideo.targetId
        }
        var params = {
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊,
          'targetId': targetId
        }
        this.RongCallLibFunction.reject(params)
        this.closeVideoMsg()
      },
      // 挂断
      hungup () {
        // this.closeVideoMsg()
        let targetId
        if (this.currentVideo) {
          targetId = this.currentVideo.targetId
        }
        var params = {
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊,
          'targetId': targetId
        }
        this.RongCallLibFunction.hungup(params, function (error, summary) {
          console.log('挂断', summary)
        })
        // this.closeVideoMsg()
      },
      // 取消
      cancelCall () {
        let targetId
        this.closeVideoMsg() // 收到接收命令关闭提醒窗口
        if (this.currentVideo) {
          targetId = this.currentVideo.targetId
        }
        var params = {
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊,
          'targetId': targetId
        }
        this.RongCallLibFunction.hungup(params, function (error, summary) {
          console.log('挂断', summary)
        })
        // RongCallLib.reject(params)
      },
      // 静音
      muteChat () {
        this.RongCallLibFunction.mute()
      },
      // 取消静音
      unmuteChat () {
        this.RongCallLibFunction.unmute()
      },
      videoToAudio () {
        this.changeCurrentIsVideo(false)
        this.RongCallLibFunction.videoToAudio()
      },
      audioToVideo () {
        this.changeCurrentIsVideo(true)
        this.RongCallLibFunction.audioToVideo()
      },
      addMsgToHistroy (message) {
        let vm = this
        let currentId = ''
        if (!(vm._.has(vm.currentChat, 'userId'))) { // 当前是否打开聊天窗口
          currentId = ''
        } else {  // 当前有聊天窗口
          currentId = vm.currentChat.userId
        }
        if (message.senderUserId === currentId) { // 当前聊天用户是否和消息来源一致
          console.log('收到的消息是当前聊天对象', vm.currentChat)
          vm.getCurrentFriendMsg(message)
        } else {  //
          vm.friendsList.forEach(function (item) {
            if (item.userId === message.senderUserId) {
              console.log('收到的消息不是当前聊天对象', message)
              let obj = {
                'friendId': message.senderUserId,
                'message': message
              }
              vm.getFriendMsg(obj)
            }
          })
        }
        if (vm.chatStatus) {
          let chatwindow = findComponentsDownward(this, 'chartwindow')
          chatwindow[0].scrollToButtom()
        }
        // console.log('chart组件', chatwindow)
        // scrollToButtom
      }
    },
    watch: {
      currentIsVideo: {
        handler: function (val) {
          let cssTextVideoSelf = 'opacity: 1;width: 128px;height: 96px;'
          let cssTextAudioSelf = 'opacity: 0;width: 0;height: 0;'
          let cssTextVideo = 'opacity: 1;height: 480px;'
          let cssTextAudio = 'opacity: 0;width: 0;height: 0;'
          let cssText = 'min-height: 480px;'
          if (val) {
            if (this.selfVideoDomID) {
              document.getElementById('video-wrap').style.cssText = cssText
              document.getElementById(this.selfVideoDomID).style.cssText = cssTextVideoSelf
            }
            if (this.friendVideoDomID) {
              document.getElementById('video-wrap').style.cssText = cssText
              document.getElementById(this.friendVideoDomID).style.cssText = cssTextVideo
            }
          } else {
            if (this.selfVideoDomID) {
              document.getElementById('video-wrap').style.cssText = 'min-width:0;min-height: 0;'
              document.getElementById(this.selfVideoDomID).style.cssText = cssTextAudioSelf
            }
            if (this.friendVideoDomID) {
              document.getElementById('video-wrap').style.cssText = 'min-width:0;min-height: 0;'
              document.getElementById(this.friendVideoDomID).style.cssText = cssTextAudio
            }
          }
        },
        immediate: true
      }
    },
    mounted () {
      let vm = this
      vm.setFriendsListActon() // 获取好友列表
      vm.token = vm.adminInfo.rongCloudToken
      // let config = {
      //   protobuf: publicStatic.onlineStatic + '/static/protobuf-2.2.8.min.js'
      // }
      // 初始化
      RongIMLib.RongIMClient.init(vm.appKey)
      // RongIMLib.RongIMClient.init(this.appKey, null, config)
      // 设置连接监听状态 （ status 标识当前连接状态 ）

      // 连接状态监听器
      RongIMLib.RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log('链接成功')
              break
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log('正在链接')
              break
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log('断开连接')
              break
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              vm.$message({
                showClose: true,
                message: '您的账户在其他设备登录，请刷新浏览器恢复聊天系统',
                type: 'error'
              })
              console.log('其他设备登录')
              break
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.log('域名不正确')
              break
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用')
              break
          }
        }})
  
      // 消息监听器
      RongIMLib.RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              vm.addMsgToHistroy(message)
              // message.content.content => 消息内容
              break
            case RongIMClient.MessageType.VoiceMessage:
              console.log('收到语音消息', message)
                    // 对声音进行预加载
                    // message.content.content 格式为 AMR 格式的 base64 码
              vm.addMsgToHistroy(message)
              break
            case RongIMClient.MessageType.ImageMessage:
              console.log('图片消息', message)
              vm.addMsgToHistroy(message)
                  // message.content.content => 图片缩略图 base64。
                  // message.content.imageUri => 原图 URL。
              break
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                  // message.content.extension => 讨论组中的人员。
              break
            case RongIMClient.MessageType.LocationMessage:
              console.log('收到位置信息', message)
              vm.addMsgToHistroy(message)
  
                  // message.content.latiude => 纬度。
                  // message.content.longitude => 经度。
                  // message.content.content => 位置图片 base64。
              break
            case RongIMClient.MessageType.RichContentMessage:
                  // message.content.content => 文本消息内容。
                  // message.content.imageUri => 图片 base64。
                  // message.content.url => 原图 URL。
              break
            case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
              break
            case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
              break
            case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
              break
            case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
              break
            case RongIMClient.MessageType.CommandMessage:
                    // do something...
              break
            case RongIMClient.MessageType.UnknownMessage:
                    // do something...
              break
            default:
                    // do something...
          }
        }
      })
      // 登录
      RongIMLib.RongIMClient.connect(vm.token, {
        onSuccess: function (userId) {
          console.log('融云管理员id是' + userId)
          vm.setRongUserId(userId)
          // 获取消息列表
          RongIMLib.RongIMClient.getInstance().getConversationList({
            onSuccess: function (list) {
              console.log('会话列表', list)
            },
            onError: function (error) {
            // do something...
  
            }
          }, null)

          // 获取未读消息
          RongIMLib.RongIMClient.getInstance().getTotalUnreadCount({
            onSuccess: function (count) {
              console.log('未读消息总数', count)
                // count => 所有会话总未读数。
            },
            onError: function (error) {
                // error => 获取总未读数错误码。
            }
          })
        },
        onTokenIncorrect: function () {
          console.log('token无效')
        },
        onError: function (errorCode) {
          var info = ''
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时'
              break
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误'
              break
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
              info = '不可接受的协议版本'
              break
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = 'appkey不正确'
              break
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = '服务器不可用'
              break
          }
          console.log(errorCode)
        }
      })

      let callconfig = {
        // 发起音视频超时时间, 默认 15000 毫秒
        timeout: 15000,
        // 视频分辨率, 默认 640*480
        width: 640,
        height: 480,
        // 视频码率, 默认 600*450
        maxRate: 600,
        minRate: 50,
        // 视频帧率, 默认 15
        frameRate: 15,
        RongIMLib: RongIMLib
      }
      // RongCallLib = RongCallLib.init(callconfig)
      vm.changeRongCallLibFunction(RongCallLib.init(callconfig))
      let watcher = function (result) {
        console.log('监听语音视频', result)
        if (result.type === 'added') {
          let cssText = 'min-height: 480px;'
          if (result.isLocal) {
            let selfNode = document.getElementById('selfVideo')
            selfNode.innerHTML = ''
            selfNode.appendChild(result.data)
            let cssTextVideoSelf = 'opacity: 1;width: 128px;height: 96px;'
            let cssTextAudioSelf = 'opacity: 0;width: 0;height: 0;'
            // if()
            vm.selfVideoDomID = result.userId
            if (vm.currentIsVideo) {
              document.getElementById('video-wrap').style.cssText = cssText
              document.getElementById(result.userId).style.cssText = cssTextVideoSelf
            }
            if (!vm.currentIsVideo) {
              document.getElementById('video-wrap').style.cssText = 'min-width:0;min-height: 0;'
              document.getElementById(result.userId).style.cssText = cssTextAudioSelf
            }
            // document.getElementById(result.userId).style.cssText = 'width:128px;'
          } else {
            let friendNode = document.getElementById('videoChat')
            friendNode.innerHTML = ''
            friendNode.appendChild(result.data)
            let cssTextVideo = 'opacity: 1;height: 480px;'
            let cssTextAudio = 'opacity: 0;width: 0;height: 0;'
            vm.friendVideoDomID = result.userId
            if (vm.currentIsVideo) {
              document.getElementById('video-wrap').style.cssText = cssText
              document.getElementById(result.userId).style.cssText = cssTextVideo
            }
            if (!vm.currentIsVideo) {
              document.getElementById('video-wrap').style.cssText = 'min-width:0;min-height: 0;'
              document.getElementById(result.userId).style.cssText = cssTextAudio
            }
          }
        }
        if (result.type === 'leave') {
          vm.selfVideoDomID = null
          vm.friendVideoDomID = null
          document.getElementById('selfVideo').innerHTML = ''
          document.getElementById('videoChat').innerHTML = ''
          vm.closeVideoChat()
        }
  
        // result.userId  //大窗口
        // result.type === added 加入
        // result.type === removed 加入
        // result.data 是要添加/移除的dom节点

        // result => {type: 'added', data: ''}
      }
      // console.log('RongCallLib2', RongCallLib)
      vm.RongCallLibFunction.videoWatch(watcher)
      vm.RongCallLibFunction.commandWatch(function (command) {
        console.log('命令监听', command)
        if (command) {
          // 接收到邀请视频信息
          if (command.messageType === 'InviteMessage') {
            // 音频
            if (command.content.mediaType === 1) {
              vm.changeCurrentIsVideo(false)
            }
            // 视频
            if (command.content.mediaType === 2) {
              vm.changeCurrentIsVideo(true)
            }
            vm.getInvite() // 改变状态显示接收消息
            vm.getVideoMsg() // 打开显示接收消息窗口
  
            let index = vm._.findLastIndex(vm.friendsList, function (item) {
              return item.userId === command.senderUserId
            })
            if (index !== -1) {
              command.userImg = vm.friendsList[index].userImg
              command.userName = vm.friendsList[index].userName
            } else {
              command.userImg = null
              command.userName = null
            }
            vm.changeCurrentVideo(command)
          }
          // 对方挂断通话
          if (command.messageType === 'HungupMessage') {
            vm.closeVideo()
            vm.closeVideoMsg() // 收到接收命令关闭提醒窗口
            vm.$message({
              showClose: true,
              message: '对方挂断',
              type: 'warning'
            })
            vm.hungup()
            console.log('对方挂断', command)
          }
          // 对方拒绝通话
          if (command.messageType === 'SummaryMessage') {
            // if (command.content.status === 5 || command.content.status === 15) {
            //   vm.hungup()
            //   vm.closeVideo()
            //   vm.closeVideoMsg() // 收到接收命令关闭提醒窗口
            //   vm.$message({
            //     showClose: true,
            //     message: '未接通',
            //     type: 'warning'
            //   })
            // }
  
            vm.closeVideo()
            vm.closeVideoMsg() // 收到接收命令关闭提醒窗口
            if (command.content.status === 4) {
              vm.$message({
                showClose: true,
                message: '对方忙,请稍后再打',
                type: 'warning'
              })
            }
            if (command.content.status === 1) {
              // vm.$message({
              //   showClose: true,
              //   message: '己方取消已发出的通话请求',
              //   type: 'warning'
              // })
            }
            if (command.content.status === 2) {
              // vm.$message({
              //   showClose: true,
              //   message: '己方拒绝收到的通话请求',
              //   type: 'warning'
              // })
            }
            if (command.content.status === 3) {
              // vm.$message({
              //   showClose: true,
              //   message: '己方挂断',
              //   type: 'warning'
              // })
            }
            if (command.content.status === 4) {
              // vm.$message({
              //   showClose: true,
              //   message: '已方忙碌',
              //   type: 'warning'
              // })
            }
            if (command.content.status === 5) {
              // vm.$message({
              //   showClose: true,
              //   message: '己方未接听',
              //   type: 'warning'
              // })
            }
            if (command.content.status === 6) {
              vm.$message({
                showClose: true,
                message: '己方不支持当前引擎',
                type: 'warning'
              })
            }
            if (command.content.status === 7) {
              vm.$message({
                showClose: true,
                message: '己方网络出错',
                type: 'warning'
              })
            }
            if (command.content.status === 8) {
              vm.$message({
                showClose: true,
                message: '其他设备已处理',
                type: 'warning'
              })
            }
            if (command.content.status === 11) {
              vm.$message({
                showClose: true,
                message: '对方取消已发出的通话请求',
                type: 'warning'
              })
            }
            if (command.content.status === 12) {
              vm.$message({
                showClose: true,
                message: '对方拒绝收到的通话请求',
                type: 'warning'
              })
            }
            if (command.content.status === 13) {
              vm.$message({
                showClose: true,
                message: '对方挂断通话',
                type: 'warning'
              })
            }
            if (command.content.status === 14) {
              vm.$message({
                showClose: true,
                message: '对方忙碌',
                type: 'warning'
              })
            }
            if (command.content.status === 15) {
              vm.$message({
                showClose: true,
                message: '对方未接听',
                type: 'warning'
              })
            }
            if (command.content.status === 16) {
              vm.$message({
                showClose: true,
                message: '对方不支持当前引擎',
                type: 'warning'
              })
            }
            if (command.content.status === 17) {
              vm.$message({
                showClose: true,
                message: '网络错误',
                type: 'warning'
              })
            }
            if (command.content.status === 18) {
              vm.$message({
                showClose: true,
                message: 'CallLib 不可以用',
                type: 'warning'
              })
            }
            vm.hungup()
            // vm.closeVideoMsg() // 收到接收命令关闭提醒窗口
            // vm.$message({
            //   showClose: true,
            //   message: '对方挂断了视频通话',
            //   type: 'warning'
            // })
            // console.log('对方拒绝')
          }
          if (command.messageType === 'AcceptMessage') {
            vm.openVideo()
            vm.closeVideoMsg() // 收到接收命令关闭提醒窗口
          }
        }
      // command => 消息指令;
      })
      // var RongCallCommon.CallVideoProfile = 20 //代表240p
      // var RongCallCommon.CallVideoProfile = 40 //代表480p
      // var RongCallCommon.CallVideoProfile = 50 //代表720p
      // RongCallLib.setVideoProfile(50)
      RongIMLib.RongIMEmoji.init({
        size: 18
      })
      RongIMLib.RongIMVoice.init()
      // console.log('表情库', vm.emojiList)
    }
  }
</script>

<style lang="scss" scoped>
  .chat{
    &-icon-btn{
      border: none;
      outline: none;
      cursor: pointer;
      width: 90px;
      height: 90px;
      background: url('~icon/hospital-icon2-05.png') no-repeat center;
      border-radius: 50%;
      // background-color: #1991fc;
      // z-index: 199;
    }
    &-icon-btn:hover{
      opacity: 0.95;
      // border: none;
      // outline: none;
      // cursor: pointer;
      // width: 90px;
      // height: 90px;
      // background: url('~icon/hospital-icon2-05.png') no-repeat center;
      // border-radius: 50%;
      // z-index: 199;
    }
    &-icon{
      // z-index: 199;
      // display: inline-block;
      // background: url('~icon/hospital-icon2-05.png') no-repeat;
    }
  }
</style>




<style lang="scss" scoped>
  .el-header {
    background-color: #fff;
    /* border-bottom: 1px solid #95b4cf; */
    box-shadow: 0px 4px 4px 0 rgba(66, 53, 53, 0.103);
    padding: 0px;
  }
  .footer{
    text-align: center;
    margin-right: 180px;
  }
  .sider{
    background-color: #1991fc;
    font-size: 16px;
    color: #fff;
    
  }
  main{
    padding: 24px;
    background-color: #f4f6f9;
    /* position: fixed;
    top:80px;
    left: 250px; */
  }
  .container{
    margin: 0;
    padding: 0;
    position: relative;
    height: 100%;
  }
  .container-head{
    height: 80px;
    width: 100%;
    box-shadow: 0px 4px 4px 0 rgba(66, 53, 53, 0.103);
    /* background-color: cadetblue; */
    /* position: fixed; */
    /* top:0; */
  }
  .container-sider{
    overflow: auto;
    height: 100%;
    background-color: #1991fc;
    width: 250px;
    position: fixed;
    top:0px;
    z-index: 999;
  }
  .container-sider::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  .container-main{
    /* height: 2800px; */
    /* width: 100%; */
    /* background-color: rgb(157, 170, 230); */
    /* margin-top: 80px; */
    /* padding-left: 250px; */
    /* margin-right: 500px; */
    margin-left: 250px;
    padding: 24px;
    background-color: #f4f6f9;
    height:100% ;
    margin-bottom: 80px;
    /* position: relative; */
    /* left: 250px; */
    /* top:80px; */
    /* right: 0px; */
    /* margin-right: -250px; */
  }
  .container-footer{
    position: fixed;
    // width: 200px;
    // height: 150px;
    // background:#999;
    bottom: 10px;
    right: 25px;
    z-index: 999999;
    // background: url('~icon/hospital-icon2-05.png') no-repeat;
  }
</style>
<style scoped>
  .has-message-animation{
    z-index: 999;
    animation: hasmsg 1.5s infinite;
    /* -webkit-animation:hasmsg .5s infinite; */
    /* // padding-bottom:100px; */
  }
  @keyframes hasmsg {
    to {transform:none;}50%{transform:scale(1.2)}
  }

</style>


