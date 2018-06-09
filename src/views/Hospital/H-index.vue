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
    <videoChat
    v-show="video"
    @close="closeVideoChat"></videoChat>
    <connectBtn
    v-if="hasVideoMsg"
    @connect="connectCall"
    @reject="rejectCall"></connectBtn>
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
  export default {
    name: 'H-index',
    components: {
      HHead,
      HSider,
      chat,
      im,
      videoChat,
      connectBtn
    },
    data () {
      return {
        imStatus: false,
        appKey: 'pwe86ga5pv726',
        token: ''
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
        currentVideo: 'currentVideo'
      }),
      ...mapGetters([
        'currentChat'
      ])
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
        'changeCurrentVideo'
      ]),
      ...mapActions([
        'setRongUserIdAction',
        'setFriendsListActon'
      ]),
      showFriendWindow () {
        this.closeAnimation()
        this.setFriendsListActon()
        this.imStatus = true
      },
      closeIMhandle () {
        this.imStatus = false
      },
      chatWith (history) {
        Bus.$emit('history', history)
        this.openChatWindow()
        this.chatStatus = true
      },
      closeVideoChat () {
        this.closeVideo()
      },
      connectCall () {
        let targetId
        if (this.currentVideo) {
          targetId = this.currentVideo.senderUserId
        }
        var CallType = RongIMLib.VoIPMediaType
        let params = {
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊
          targetId: targetId,
          // 音频类型
          // CallType.MEDIA_VEDIO
          // CallType.MEDIA_AUDIO
          mediaType: CallType.MEDIA_VEDIO
          // mediaType: CallType.MEDIA_VEDIO
        }
        // }
        RongCallLib.accept(params)
        this.openVideo()
        this.closeVideoMsg()
      },
      rejectCall () {
        let targetId
        if (this.currentVideo) {
          targetId = this.currentVideo.senderUserId
        }
        var params = {
          conversationType: RongIMLib.ConversationType.PRIVATE, // 单聊,
          'targetId': targetId
        }
        RongCallLib.hungup(params, function (error, summary) {
          console.log('挂断', summary)
        })
        this.closeVideoMsg()
      }
    },
    mounted () {
      this.setFriendsListActon()
      // console.log('ONLINE_STATIC', this.ONLINE_STATIC)
      let vm = this
      this.token = this.adminInfo.rongCloudToken
      // let RongIMLib = RongIMLib
      // console.log('RongIMLib', RongIMLib)
      let config = {
        protobuf: publicStatic.onlineStatic + '/static/protobuf-2.2.8.min.js'
      }
      // 初始化
      RongIMLib.RongIMClient.init(this.appKey, null, config)
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
              console.log(message)
              let currentId = ''
  
              if (!(vm._.has(vm.currentChat, 'userId'))) { // 当前是否打开聊天窗口
                currentId = ''
              } else {  // 当前有聊天窗口
                currentId = vm.currentChat.userId
              }
              if (message.senderUserId === currentId) { // 当前聊天用户是否和消息来源一致
                console.log('是当前聊天对象？', vm.currentChat)
                vm.getCurrentFriendMsg(message)
              } else {  //
                // console.log('zhixing')
                vm.friendsList.forEach(function (item) {
                  if (item.userId === message.senderUserId) {
                    console.log('收到的消息', message)
                    let obj = {
                      'friendId': message.senderUserId,
                      'message': message
                    }
                    vm.getFriendMsg(obj)
                  }
                })
              }
              if (vm.chatStatus) {
                vm.$nextTick(() => {
                  setTimeout(function () {
                    let container = vm.$el.querySelector('#chatWidow')
                    container.scrollTop = container.scrollHeight
                    // console.log('container.scrollTop', container.scrollTop)
                    // console.log('container.scrollHeight', container.scrollHeight)
                    // container.scrollIntoView()
                  }, 100)
                })
              }
              // message.content.content => 消息内容
              break
            case RongIMClient.MessageType.VoiceMessage:
              console.log('收到语音消息')
                    // 对声音进行预加载
                    // message.content.content 格式为 AMR 格式的 base64 码
              break
            case RongIMClient.MessageType.ImageMessage:
              console.log('图片消息', message)
              let currentIdImg = ''
  
              if (!(vm._.has(vm.currentChat, 'userId'))) { // 当前是否打开聊天窗口
                currentIdImg = ''
              } else {  // 当前有聊天窗口
                currentIdImg = vm.currentChat.userId
              }
              if (message.senderUserId === currentIdImg) { // 当前聊天用户是否和消息来源一致
                vm.getCurrentFriendMsg(message)
              } else {  //
                vm.friendsList.forEach(function (item) {
                  if (item.userId === message.senderUserId) {
                    console.log('收到的消息', message)
                    let obj = {
                      'friendId': message.senderUserId,
                      'message': message
                    }
                    vm.getFriendMsg(obj)
                  }
                })
              }
              vm.$nextTick(() => {
                setTimeout(function () {
                  let container = vm.$el.querySelector('#chatWidow')
                  container.scrollTop = container.scrollHeight
                  console.log('container.scrollTop', container.scrollTop)
                  console.log('container.scrollHeight', container.scrollHeight)
                  // container.scrollIntoView()
                }, 100)
              })
                  // message.content.content => 图片缩略图 base64。
                  // message.content.imageUri => 原图 URL。
              break
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                  // message.content.extension => 讨论组中的人员。
              break
            case RongIMClient.MessageType.LocationMessage:
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
      RongIMLib.RongIMClient.connect(this.token, {
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
  
          // 获取历史消息
          let timestrap = null
          let count = 20
          console.log('RongIMLib.ConversationType.PRIVATE', RongIMLib.ConversationType.PRIVATE)
          // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
          RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, '5277', timestrap, count, {
            onSuccess: function (list, hasMsg) {
            // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
            // list 为拉取到的历史消息列表
              console.log('历史消息', list, hasMsg)
            },
            onError: function (error) {
              console.log('历史消息获取失败', error)
            // APP未开启消息漫游或处理异常
            // throw new ERROR ......
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
        width: 320,
        height: 240,
        // 视频码率, 默认 600*450
        maxRate: 600,
        minRate: 50,
        // 视频帧率, 默认 15
        frameRate: 15,
        RongIMLib: RongIMLib
      }
      RongCallLib = RongCallLib.init(callconfig)
      let watcher = function (result) {
        console.log('监听语音视频', result)
        vm.openVideo()
        if (result.type === 'added') {
          let selfNode = document.getElementById('videoChat')
          selfNode.appendChild(result.data)
        }
        // result.type === added 加入
        // result.type === removed 加入
        // result.data 是要添加/移除的dom节点

      // result => {type: 'added', data: ''}
      }
      // console.log('RongCallLib2', RongCallLib)
      RongCallLib.videoWatch(watcher)
      RongCallLib.commandWatch(function (command) {
        console.log('命令监听', command)
        if (command) {
          if (command.messageType === 'InviteMessage') {
            vm.getVideoMsg()
            vm.changeCurrentVideo(command)
          }
        }
      // command => 消息指令;
      })
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


