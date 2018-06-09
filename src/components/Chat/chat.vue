<template>
  <div class="chart-window clear" v-drag="'chart'">
    <div class="chart-window-left" v-show="false">
      <!-- 左侧聊天好友列表 -->
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
    </div>


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
            <chatContent :message="item"></chatContent>
          </chartMessage>
        </chartMessageGroup>
      </div>
      <!-- 工具 -->
      <div class="chart-wrap-tool">
        <button>
          <span class="smile-icon"></span>
        </button>
        <!-- <button > -->
          <a class="a-upload">
            <!-- <input type="text"> -->
            <input type="file" accept="image/jpg" @change="sendImgMsg($event)">
            <!-- <input type="file" accept="image/jpg" @change="changeImg($event)" value="a"> -->
            <span class="file-icon"></span>
          </a>
        <!-- </button> -->
        <button>
          <span class="phone-icon" ></span>
        </button>
        <button @click="callVideo">
          <span class="video-icon" ></span>
        </button>
      </div>

      <!-- 写信息 -->
      <div class="chart-wrap-msg">
        <textarea class="textarea" v-model="readyMsg"></textarea>
      </div>

      <!-- 发送按钮 -->
      <div class="chart-wrap-send">
        <div>
          <!-- <button @click="sendMsg">关闭</button> -->
          <button @click="sendMsg">发送</button>
        </div>
      </div>
    </div>




    <!-- <div>
      <video src=""></video>
    </div> -->
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
  name: 'chart',
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
      readyMsg: null,
      chartList: [
      ],
      showList: false,
      isTriggerFirstLoad: false,
      imgArr: [],
      noMoreHistroy: false
    }
  },
  computed: {
    ...mapGetters([
      'currentChat'
    ]),
    ...mapState({
      rongUserId: 'rongUserId',
      historyMsg: 'history',
      adminInfo: 'adminInfo'
    })
    // historyMsg () {
    //   return this.currentChat.history
    // }
  },
  // watch: {
  //   historyMsg: {
  //     handler: function (val, oldVal) {
  //       let vm = this
  //       // if (val !== oldVal) {
  //       this.$nextTick(() => {
  //         setTimeout(function () {
  //           let container = vm.$el.querySelector('#chatWidow')
  //           container.scrollTop = container.scrollHeight
  //           console.log('container.scrollTop', container.scrollTop)
  //           console.log('container.scrollHeight', container.scrollHeight)
  //           // container.scrollIntoView()
  //         }, 1500)
  //           // document.getElementById('chatMessage').scrollIntoView()
  //           // document.getElementById('chatMessage').scrollTop = document.getElementById('chatMessage').scrollHeight
  //       })
  //       // }
  //     },
  //     deep: true
  //   }
  // },
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
      'openVideo'
    ]),
    sendMsg () {
      // console.log('historyMsg', this.historyMsg)
      let vm = this
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
        let conversationtype = RongIMLib.ConversationType.PRIVATE
        let msg = new RongIMLib.TextMessage({content: vm.readyMsg, extra: '附加信息'})
        RongIMLib.RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
          onSuccess: function (message) {
            let msgObj = {
              content: {
                messageName: 'TextMessage',
                // messageType: 'TextMessage',
                content: vm.readyMsg
              },
              senderUserId: vm.rongUserId
            }
            if (vm._.has(vm.adminInfo, 'headPortraitUrl')) {
              msgObj.userImg = vm.adminInfo.headPortraitUrl
            }
            // vm.historyMsg = vm.currentChat.history
            vm.sethistory(vm.historyMsg)
            // vm.sethistory(vm.currentChat.history)
            vm.getCurrentFriendMsg(msgObj)
            let newChat = vm.currentChat
            newChat.history = vm.historyMsg
            vm.addChatFriend(newChat)
            // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
            console.log('Send successfully')
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
              message: '发送失败，请刷新浏览器恢复聊天系统',
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
    sendImgMsg: function (e) {
      // uploadFileApi
      let vm = this
      let file = e.target.files[0]
      let formdata = new FormData()
      formdata.append('files', file)
      let base64Str
      let image = new Image()
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
        let quality = 0.7
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
        let base64 = canvas.toDataURL('image/' + ext, quality)
        let base = base64.split(',')
        let str = base[1]
        base64Str = str
        // 回调函数返回base64的值
      }

      this.$axios(uploadFileApi(formdata))
      .then(res => {
        if (res.data.code === '0000') {
          let targetId = vm.currentChat.userId
          var imageUri = res.data.data.seeFile // 上传到自己服务器的 URL。
          // var msg = new RongIMLib.ImageMessage({imageUri: imageUri})
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
                senderUserId: vm.rongUserId
              }
                // vm.historyMsg = vm.currentChat.history
              vm.sethistory(vm.historyMsg)
              vm.getCurrentFriendMsg(msgObj)
              console.log('msgObjimg', msgObj)
              let newChat = vm.currentChat
              newChat.history = vm.historyMsg
              vm.addChatFriend(newChat)
              console.log('Send successfully')
              vm.readyMsg = ''
              console.log('Send successfully')
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
                  info = x
                  break
              }
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
    closeChart () {
      this.clearCurrentChat()
      this.closeChatWindow()
    },
    // 加载更多
    infiniteHandler ($state) {
      let vm = this
      new Promise(function (resolve, reject) {
        vm.getHistroyMsgRong(vm.currentChat.userId)
        resolve('success')
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
      })
    },
    // 获取历史消息
    getHistroyMsgRong (targetuserId) {
      let vm = this
      let timestrap = null
      let count = 20
      let userId = targetuserId
      // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          vm.sethistory(vm.currentChat.history)
            // vm.getCurrentFriendMsg(msgObj)
          console.log('历史消息VM', vm.currentChat)
          if (vm._.has(vm.currentChat, 'history')) {
            if (vm.currentChat.history.length === 0) {
              vm.sethistory(list)
            } else {
              vm.sethistory(vm._.concat(list, vm.currentChat.history))
            }
          }
          let newChat = vm.currentChat
          newChat.history = vm.historyMsg
          newChat.hasHistroy = hasMsg
          vm.addChatFriend(newChat)
          console.log('历史消息', list, hasMsg)
          console.log('历史消息bend', vm.historyMsg)
          vm.isTriggerFirstLoad = false
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
    },
    callVideo () {
      this.openVideo()
      let vm = this
      var CallType = RongIMLib.VoIPMediaType
      var params = {
      // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
        conversationType: RongIMLib.ConversationType.PRIVATE,
      // 会话目标 Id，群 Id 或者 userId。
        // targetId: vm.currentChat.userId,
        targetId: 'admin_12',
      // 被邀请人 Id , 多人视频填写多个 userId 最多支持 7 人, 一对一和 targetId 值一致。
        // inviteUserIds: inviteUserIds,
      // 音频类型
      // CallType.MEDIA_VEDIO
      // CallType.MEDIA_AUDIO
        // mediaType: CallType.MEDIA_AUDIO
        mediaType: CallType.MEDIA_VEDIO
      }
      RongCallLib.call(params, function (error) {
        console.log('发送视频失败', error)
        // do something...
      })
    }
  },
  watch: {
    chartList: {
      handler: function (val, oldVal) {
        if (val.length < 2) {
          this.showList = false
        } else {
          this.showList = true
        }
      },
      deep: true,
      immediate: true
    }
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
        background-color: #1991fc;
        // box-shadow:2px 2px 2px rgb(146, 187, 146);
        border:none;
        outline: none;
        border-radius: 2px;
        color: #fff;
        width: 84px;
        height: 30px;
        // border:
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
</style>

