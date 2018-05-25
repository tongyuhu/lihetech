<template>
  <div class="chart-window clear" v-drag="'chart'">
    <div class="chart-window-left" v-if="false">
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
        <!-- <span slot="no-more">没有更多数据了</span> -->
        <!-- <div v-if="!isTriggerFirstLoad" class="center">
          <el-button type="text" @click="isTriggerFirstLoad = true" >点击加载更多...</el-button>
        </div>
        <infinite-loading v-else  @infinite="infiniteHandler" 
        direction="top"  
        spinner="circles"
        :distance="10"
        ></infinite-loading> -->
        <chartMessageGroup>
          <chartMessage
          v-for="(item,index) in historyMsg" :key="index"
          :who="item.senderUserId || ''"
          >
            <chatContent :message="item"></chatContent>
          <!-- {{historyMsg.length !== 0 ? item.content.content :''}} -->
          </chartMessage>
          <!-- <img src=""> -->
            <!-- <img src="" alt=""> -->
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
          <span class="phone-icon"></span>
        </button>
        <button>
          <span class="video-icon"></span>
        </button>
        <!-- <span class="iconfont icon-wenjian"></span>
        <span class="iconfont icon-31yuyinxuanzhong"></span>
        <span class="iconfont icon-shipin"></span> -->
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
  </div>
</template>

<script>
import chartMessage from './chartMessage'
import chartMessageGroup from './chartMessageGroup'
import chatContent from './chatContent'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Bus from '@/bus.js'
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
      // historyMsg: [
      //   {
      //     who: 'self',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'other',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'self',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'self',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'other',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'self',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'self',
      //     type: 'text',
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   },
      //   {
      //     who: 'other',
      //
      //     content: {
      //       content: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
      //     }
      //   }
      // ],
      readyMsg: '',
      chartList: [
        {
          name: '夏邦为',
          historyMsg: [],
          userImg: ''
        },
        {
          name: '夏良凯',
          historyMsg: []
        },
        {
          name: '夏良开',
          historyMsg: []
        }
      ],
      showList: false,
      isTriggerFirstLoad: false,
      imgArr: []
      // historyMsg: []
      // showChart: true
    }
  },
  computed: {
    ...mapGetters([
      'currentChat'
    ]),
    ...mapState({
      rongUserId: 'rongUserId',
      historyMsg: 'history'
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
      'sethistory'
    ]),
    sendMsg () {
      let vm = this
      // vm.historyMsg = []
      if (this.readyMsg !== '') {
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
            // vm.historyMsg = vm.currentChat.history
            vm.sethistory(vm.currentChat.history)
            vm.getCurrentFriendMsg(msgObj)
            // vm.historyMsg.push(msgObj)
            // vm.currentChat.history.push(msgObj)
            console.log('urrentChat.history', vm.currentChat.history)
            console.log('msgObj', msgObj)
            console.log('currentChat', vm.currentChat)
            console.log('rongUserId', vm.rongUserId)
            let newChat = vm.currentChat
            newChat.history = vm.historyMsg
            console.log('newChat', newChat)
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
      // vm.$refs.chatWidow.scrollBottom = 0
      // this.$nextTick(() => {
      //   document.getElementById('chatWidow').scrollTop = document.getElementById('chatWidow').scrollHeight
      // })

      this.$nextTick(() => {
        setTimeout(function () {
          let container = vm.$el.querySelector('#chatWidow')
          container.scrollTop = container.scrollHeight
          console.log('container.scrollTop', container.scrollTop)
          console.log('container.scrollHeight', container.scrollHeight)
            // container.scrollIntoView()
        }, 100)
      })

      // console.log('vm.$refs.chatWidow', vm.$refs.chatWidow.scrollTo(0, 0))
      // console.log(this.readyMsg)
    },
    sendImgMsg: function (e) {
      var vm = this
      var imgLimit = 1024
      var files = e.target.files
      var image = new Image()
      console.log(files)
      if (files.length > 0) {
        var dd = 0
            // if(files.item(dd).type !== 'image/jpg'){
        if (files.item(dd).type !== 'image/png' && files.item(dd).type !== 'image/jpeg' && files.item(dd).type !== 'image/gif') {
          vm.$message({
            message: '只能发送jpg格式图片',
            type: 'warning'
          })
        } else if (files.item(dd).size > imgLimit * 100) {
          vm.$message({
            message: '图片过大',
            type: 'warning'
          })
                // to do sth
        } else {
          image.src = window.URL.createObjectURL(files.item(dd))
          image.onload = function () {
                  // 默认按比例压缩
            var w = image.width
            var h = image.height
            var scale = w / h
            w = 200
            h = w / scale
                  // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
            var quality = 0.9
                  // 生成canvas
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d')
                  // 创建属性节点
            var anw = document.createAttribute('width')
            anw.nodeValue = w
            var anh = document.createAttribute('height')
            anh.nodeValue = h
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)
            ctx.drawImage(image, 0, 0, w, h)
            var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()// 图片格式
            // var base64 = canvas.toDataURL('image/' + ext, quality)
            var base64 = canvas.toDataURL('image/' + ext, quality)
            let base = base64.split(',')
            let str = base[1]
            console.log('base64', base[1])
            console.log('base64length', base[1].length)
            // 回调函数返回base64的值

            let targetId = vm.currentChat.userId
            var base64Str = str
            var imageUri = '' // 上传到自己服务器的 URL。
            var msg = new RongIMLib.ImageMessage({content: base64Str, imageUri: imageUri})
            var conversationtype = RongIMLib.ConversationType.PRIVATE // 单聊,其他会话选择相应的消息类型即可。
            // var targetId = 'xxx' // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
              onSuccess: function (message) {
              // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                let msgObj = {
                  content: {
                    messageName: 'ImageMessage',
                    content: base64Str
                  },
                  senderUserId: vm.rongUserId
                }
            // vm.historyMsg = vm.currentChat.history
                vm.sethistory(vm.currentChat.history)
                vm.getCurrentFriendMsg(msgObj)
            // vm.historyMsg.push(msgObj)
            // vm.currentChat.history.push(msgObj)
                // console.log('urrentChat.history', vm.currentChat.history)
                console.log('msgObjimg', msgObj)
                // console.log('currentChat', vm.currentChat)
                // console.log('rongUserId', vm.rongUserId)
                let newChat = vm.currentChat
                newChat.history = vm.historyMsg
                // console.log('newChat', newChat)
                vm.addChatFriend(newChat)
            // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
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
            }
        )
          }
        }
      }
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
      // this.$emit('colseChat')
      // this.showChart = false
      this.closeChatWindow()
    },
    infiniteHandler ($state) {
      let vm = this
      let state = $state

      let arr = [
        {
          who: 'self',
          type: 'text',
          msg: '1111111111111111111'
        },
        {
          who: 'other',
          type: 'text',
          msg: '2222222222222222222222222'
        },
        {
          who: 'self',
          type: 'text',
          msg: '3333333333333333333333333333'
        },
        {
          who: 'self',
          type: 'text',
          msg: '44444444444444444444444444444444'
        }
      ]
      new Promise(function (resolve, reject) {
        setTimeout(function () {
          vm.isTriggerFirstLoad = false
          resolve('success')
          console.log('1')
        }, 1500)
      }).then(function (resolve) {
        if (resolve === 'success') {
          if (!vm.isTriggerFirstLoad) {
            vm.$refs.infiniteLoading.scrollTop = 400
            vm.isTriggerFirstLoad = false
            state.loaded()
            // $state.reset()
            state.complete()
            console.log('2')
          }
        }
      })
      // $state.complete()
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
    let vm = this
    Bus.$on('history', (val) => {
      vm.historyMsg = val
    })
    // Bus.$on('hasMessage', (val) => {
    //   vm.historyMsg.push(val)
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

