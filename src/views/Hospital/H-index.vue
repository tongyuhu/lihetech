<template>
  <div class="container">
    <div class="container-head">
      <H-Head></H-Head>
    </div>
    <div class="container-sider">
      <H-Sider></H-Sider>
    </div>
    <div class="container-main">
      <router-view></router-view>
    </div>
    <div class="container-footer">
      <button class="chat-icon-btn" @click="showFriendWindow">
      </button>
      <!-- <div class="chat-icon"></div> -->
    </div>
    <chat></chat>
    <im
    v-show="imStatus"
    @closeIM="closeIMhandle"></im>
  </div>

</template>
<script>
  import HHead from './../Hospital/H-Head.vue'
  import HSider from './../Hospital/H-Sider.vue'
  import chat from '@/components/Chat/chat.vue'
  import im from '@/components/Chat/im.vue'
  export default {
    name: 'H-index',
    data () {
      return {
        imStatus: false,
        appKey: 'pwe86ga5pv726',
        token: 'Dxfv/bGrIxWKCDWXcFVbmd3PKX0oYabJU5xpYqan3zBYh+kCuHmij1uKmYhRIABTOcVjODKzGb3wB3WXmhmBIA=='
      }
    },
    components: {
      HHead,
      HSider,
      chat,
      im
    },
    methods: {
      showFriendWindow () {
        this.imStatus = true
      },
      closeIMhandle () {
        this.imStatus = false
      }
    },
    computed: {
    },
    mounted () {
      let vm = this
      // let RongIMLib = RongIMLib
      // console.log('RongIMLib', RongIMLib)
      let config = {
      // protobuf : "//cdn.ronghub.com/protobuf-2.3.0.min.js"
        protobuf: '/static/protobuf-2.2.8.min.js'
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
              console.log(message.content.content)
              console.log(message.content)
              console.log(message)
              // message.content.content => 消息内容
              break
            case RongIMClient.MessageType.VoiceMessage:
                    // 对声音进行预加载
                    // message.content.content 格式为 AMR 格式的 base64 码
              break
            case RongIMClient.MessageType.ImageMessage:
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
          console.log('Connect successfully.' + userId)
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
    margin-bottom: 50px;
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
    z-index: 99;
    // background: url('~icon/hospital-icon2-05.png') no-repeat;
  }
</style>

