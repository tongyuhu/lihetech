<template>
  <div class="login">
  <!-- <remoteJs :js-url="'http(s)://cdn.ronghub.com/RongIMLib-2.3.1.min.js'" :js-load-call-back="loadRongJs"></remoteJs> -->
    <div class="g-center login-page" @keyup.enter="login" id="login">
      <el-form class="login-form">
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="userAccount"
            >
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.stop="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <input type="text" v-model="message">
        <el-button size="mini" @click.prevent="send">发送消息</el-button>
      </el-form>
    </div>

    <textarea id='memo' style="height:550px;width: 270px;resize: none;"></textarea>

    <im></im>
    <chart></chart>

  </div>
</template>


<script>
import flod from './fold'
import tabs from './tabs'
import pane from './pane'
import chart from './chart'
import im from './im'
import remoteJs from './remoteJs'
export default {
  components: {
    flod,
    tabs,
    pane,
    chart,
    im,
    remoteJs
  },
  data () {
    return {
      password: '123456',
      userAccount: 'wang',
      isBtnLoading: false,
      message: '',
      names: ['夏良开', '夏良凯', '夏邦为', '夏潮', '夏利坚',
        '夏雨翔', '夏灏文', '夏鑫', '夏维', '夏心刚', '夏浩文',
        '夏浚', '夏雨霖', '夏雨汉', '夏飞', '夏闻', '夏收', '夏宣',
        '夏轩', '夏学', '夏学期' ],
      appkey: 'pwe86ga5pv726',
      token: 'IymH6vpiOmrJexIia1qdp3vOkFYXOSQE+X71uPNDVAhMn07XzqUcWWbrZwyrynlmy5Wo4M3cjo/zpPOc8ChCdw=='

    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {

  },
  mounted () {
    var that = this
    let RongIMLib = RongIMLib
    // let appkey='pwe86ga5pv726'
    let config = {
      // protobuf : "//cdn.ronghub.com/protobuf-2.3.0.min.js"
      protobuf: '/static/protobuf-2.2.8.min.js'
    }
    RongIMLib.RongIMClient.init(this.appkey, null, config)
    // console.log(RongIMLib.RongIMClient.init(appkey,null,config))
    // this.loadRongJs()
    // console.log('RongIMLib',RongIMLib)
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

    RongIMLib.RongIMClient.connect(this.token, {
      onSuccess: function (userId) {
        console.log('Connect successfully.' + userId)
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
  .login{
    /* cursor: move; */
    position: relative;
    background:#f4f6f9;
    /* width: 50%; */
    /* height: 50%; */
  }
  #bar{
    width: 100%;
    height: 5px;
    background-color: blue;
    cursor: move;
  }
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#f4f6f9;}
  .drag{
    cursor: move;
    position: absolute;
  }
  #child{
    cursor: move;
    position: absolute;
  }

.clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
    width: 0;
  }
@mixin initul($float:none){
  ul{
    list-style: none;
    margin:0;
    padding:0;
    margin-left: 20px;
  }
  li{
    display: block;
    height: 30px;
    cursor: pointer;
    float: $float;
  }
}

  .im{
    button{
      // opacity: 0;
      background: rgba(255, 255, 255, 0);
      outline: none;
      border: none;
      cursor: pointer;
      z-index: 998;
    }
    width: 250px;
    height: 510px;
    position: fixed;
    right: 0;
    bottom: 0;
    background: blanchedalmond;
    #im-bar{
      width: 100%;
      height: 5px;
      cursor: move;
      opacity: 0;
    }
    &-head{
      // width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      height: 30px;
      &-name{
        float: left;
        // padding: 10px;
        // clear: both;
      }
      &-close{
        button{
          // opacity: 0;
          background: rgba(255, 255, 255, 0);
          outline: none;
          border: none;
          cursor: pointer;
        }
        float: right;
        right: 10px;
        // padding: 10px;
      }
    }
    &-sign{
      // width: 100%;
      p{
        padding: 0;
        margin:0;
      }
      text-align: left;
      // margin: 1px;
      padding-left: 10px;
    }
    &-panes{
      margin-left:10px;
      height: 350px;
      overflow: hidden;
      &:hover{
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 5px;  /*滚动条宽度*/
        }
        /*定义滚动条轨道 内阴影+圆角*/  
        &::-webkit-scrollbar-track  
        {  
            // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
            border-radius: 10px;  /*滚动条的背景区域的圆角*/
            background-color: rgb(233, 227, 227);/*滚动条的背景颜色*/  
        }  
          
        /*定义滑块 内阴影+圆角*/  
        &::-webkit-scrollbar-thumb  
        {  
            border-radius: 10px;  /*滚动条的圆角*/
            // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
            background-color: #bbb6b6;  /*滚动条的背景颜色*/
        } 
      }
      @include initul
    }
    &-footer{
      @include initul(left);
      li{
        display: inline-block;
        width: 20%;
      }
      padding-top:10px;
      border-top:1px solid #fff;
      span{
        font-size: 18px;
      }
    }
  }
</style>
