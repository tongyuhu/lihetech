<template>
  <div class="im" v-drag="'im-bar'">

    <!-- 拖动条 -->
    <div id="im-bar"></div>

    <!-- 头部姓名及关闭按钮 -->
    <div class="im-head clear">
      <div class="im-head-name">医生</div>
      <div class="im-head-close">
        <button type="text" @click="closeIM"><i class="el-icon-close"></i></button>
      </div>
    </div>

    <!-- 用户个性签名 -->
    <div class="im-sign">
      <p>没有写签名</p>
    </div>
    <!-- tab -->
    <div>
      <chatTabs>
        <chatPane
        title="联系人"
        icon="icon-friend">
          <div class="im-panes">
            <flod
            title="我的好友"
            :total="friendsList.length">
              <div>
                <ul>
                  <li v-for="(friend,index) in friendsList" :key="index" @click.stop="chartWith(friend)">
                    <!-- <el-badge :is-dot="friend.hasMsg" > -->
                    <img  class="friend-icon" 
                    :src="friend.userImg ? friend.userId :publicStatic.onlineStatic+ '/static/user.png'" alt="">
                    <span class="im-panes-name">{{friend.userName}}</span>
                    <el-badge class="mark" :is-dot="friend.hasMsg" />
                    <!-- </el-badge> -->
                  </li>
                </ul>
                <!-- <div v-show="friendList.length === 0">暂无数据</div> -->
              </div>
            </flod>
          </div>
        </chatPane>

        <chatPane
        title="群组"
        icon="icon-group">
          <div class="im-panes">
            暂无群组
          </div>
        </chatPane>

        <chatPane
        title="历史消息"
        icon="icon-msg">
          <div class="im-panes">
            暂无数据
          </div>
        </chatPane>
      </chatTabs>
      
    </div>
    <div class="im-footer">
      <ul>
        <li><span class="iconfont icon-wxbsousuotuiguang" title="搜索"></span></li>
        <!-- <li><span class="iconfont icon-iconfontfuzhuangneiyi" title="换肤"></span></li> -->
        <li><span class="iconfont icon-addition" title="新建群"></span></li>
        <!-- <li><span class="iconfont icon-arrowleft" title="上一页"></span></li> -->
        <!-- <li><span class="iconfont icon-arrowright" title="下一页"></span></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import flod from './fold'
import chatTabs from './chatTabs'
import chatPane from './chatPane'
import {mapState, mapMutations} from 'vuex'
import publicStatic from '@/publicData/const.js'
export default {
  name: 'im',
  components: {
    flod,
    chatTabs,
    chatPane
  },
  props: {
    // friendList: {
    //   type: [Array],
    //   default: function () {
    //     return []
    //   }
    // }
  },
  data () {
    return {
      message: '',
      publicStatic: publicStatic
      // list: [
        // {
        //   userId: '5277',
        //   userImg: '',
        //   userName: '夏良开',
        //   hasMsg: false,
        //   currentChat: false
        // },
        // {
        //   userId: 3,
        //   userImg: '',
        //   userName: '夏良凯',
        //   hasMsg: false,
        //   currentChat: false
        // },
        // {
        //   userId: 3,
        //   userImg: '',
        //   userName: '夏邦为',
        //   hasMsg: false,
        //   currentChat: false
        // },
        // {
        //   userId: 3,
        //   userImg: '',
        //   userName: '夏利坚',
        //   hasMsg: false,
        //   currentChat: false
        // }
      // ]
    }
  },
  computed: {
    ...mapState({
      friendsList: 'friendsList',
      history: 'history'
    })
    // ...mapGetters([
    //   'history'
    // ])
  },
  methods: {
    ...mapMutations([
      'changeChatFriend',
      'addChatFriend',
      'openChatWindow',
      'sethistory'
    ]),
    closeIM () {
      this.$emit('closeIM')
    },
    chartWith (friend) {
      let vm = this
      let history = []
      vm.sethistory(history)
      friend.hasMsg = false
      if (this._.has(friend, 'history')) {
        history = friend.history
        vm.addChatFriend(friend)
        vm.changeChatFriend(friend)
      } else {
        // let historys = []
        friend.history = []
        vm.addChatFriend(friend)
        vm.changeChatFriend(friend)
      }
      vm.sethistory(friend.history)
      console.log('好友xiaoxi ', friend.history)
      // friend.history = []
      // 获取历史消息
      let timestrap = null
      let count = 20
      let userId = friend.userId
      // console.log('RongIMLib.ConversationType.PRIVATE', RongIMLib.ConversationType.PRIVATE)
      // 请确保单群聊消息云存储服务开通，且开通后有过收发消息记录
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, userId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
        // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
        // list 为拉取到的历史消息列表
          // let history = list
          // friend.history = history
          console.log('历史消息', list, hasMsg)
        },
        onError: function (error) {
          console.log('历史消息获取失败', error)
        // APP未开启消息漫游或处理异常
        // throw new ERROR ......
        }
      })

      vm.openChatWindow()
    }
  },
  mounted () {

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
  @mixin initul($float:none){
    ul{
      list-style: none;
      margin:0;
      padding:0;
      margin-left: 20px;
    }
    li{
      display: block;
      // height: 30px;
      cursor: pointer;
      float: $float;
    }
  }
  
  .im{
    z-index: 99999999;
    button{
      // opacity: 0;
      background: rgba(255, 255, 255, 0);
      outline: none;
      border: none;
      cursor: pointer;
    }
    width: 250px;
    height: 510px;
    position: fixed;
    right: 25px;
    bottom: 120px;
    background: #fff;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
    #im-bar{
      width: 100%;
      height: 5px;
      cursor: move;
      opacity: 0;
    }
    &-head{
      // width: 100%;
      padding-top:20px;
      padding-left: 20px;
      padding-right: 10px;
      height: 30px;
      &-name{
        float: left;
        font-size: 20px;
        color: #041421;
        // padding: 10px;
        // clear: both;
      }
      &-close{
        button{
          // opacity: 0;
          font-size: 20px;
          background: rgba(255, 255, 255, 0);
          outline: none;
          border: none;
          cursor: pointer;
          color: #666;
        }
        float: right;
        right: 10px;
        // padding: 10px;
      }
    }
    &-sign{
      // width: 100%;
      padding-left: 20px;
      padding-bottom: 5px;
      p{
        padding: 0;
        margin:0;
        font-size: 14px;
        color: #666;
      }
      text-align: left;
    }
    &-panes{
      margin-left:10px;
      height: 330px;
      overflow: hidden;
      color: #041421;
      li{
        margin-bottom: 10px;
        height: 36px;
      }
      li:nth-child(1){
        margin-top:14px;
      }
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
      button{
        display:inline-block;
      }
        
      &-name{
        display:inline-block;
        font-size: 14px;
        // margin-bottom: 15px;
        line-height: 36px;
        vertical-align: top;
        padding-left: 8px;
      }
      // .friend-icon::before{
      //   display: inline-block;
      //   content: '';
      //   background: url(~icon/hospital-icon2-04.png) no-repeat center;
      //   width: 33px;
      //   height: 33px;
      //   // border-radius: 50%;
      // }
      .friend-icon{
        display: inline-block;
        // background: url(~icon/hospital-icon2-04.png) no-repeat center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
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
  .mark{
    // margin-bottom: 15px;
    display: inline-block;
    margin-bottom: 20px;
    vertical-align: middle;
  }
</style>

