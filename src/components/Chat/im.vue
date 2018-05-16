<template>
  <div class="im" v-drag="'im-bar'">

    <!-- 拖动条 -->
    <div id="im-bar"></div>

    <!-- 头部姓名及关闭按钮 -->
    <div class="im-head clear">
      <div class="im-head-name">王小二</div>
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
            :total="friendList.length">
              <div>
                <ul>
                  <li v-for="(friend,index) in list" :key="index" @click.stop="chartWith(friend.userId)">
                    <el-badge is-dot >

                      <img  class="friend-icon" :src="friend.userImg.length !==0 ? friend.userId :'/static/user.png'" alt="">
                    </el-badge>
                    <span class="im-panes-name">{{friend.userName}}</span>
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

export default {
  name: 'im',
  components: {
    flod,
    chatTabs,
    chatPane
  },
  props: {
    friendList: {
      type: [Array],
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      message: '',
      list: [
        {
          userId: '5277',
          userImg: '',
          userName: '夏良开'
        },
        {
          userId: 3,
          userImg: '',
          userName: '夏良凯'
        },
        {
          userId: 3,
          userImg: '',
          userName: '夏邦为'
        },
        {
          userId: 3,
          userImg: '',
          userName: '夏利坚'
        }
      ],
      names: ['夏良开', '夏良凯', '夏邦为', '夏潮', '夏利坚',
        '夏雨翔', '夏灏文', '夏鑫', '夏维', '夏心刚', '夏浩文',
        '夏浚', '夏雨霖', '夏雨汉', '夏飞', '夏闻', '夏收', '夏宣',
        '夏轩', '夏学', '夏学期' ]
    }
  },
  methods: {
    closeIM () {
      this.$emit('closeIM')
    },
    chartWith (item) {
      // item
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
</style>

