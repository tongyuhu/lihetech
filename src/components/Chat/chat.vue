<template>
  <div class="chart-window clear" v-drag="'chart'" v-if="showChart">
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
          <span>夏良开</span>
        </div>
        <div class="chart-wrap-close">
          <button type="text">
            <i class="el-icon-minus"></i>
          </button>
          <button type="text" @click="closeChart">
            <!-- <button type="text"><i class="el-icon-close"></i></button> -->
            <i class="el-icon-close"></i>
          </button>
        </div>
      </div>

      <!-- 聊天记录 -->
      <div class="chart-wrap-box">
        <chartMessageGroup>
          <chartMessage
          v-for="(item) in historyMsg" :key="item.index"
          :who="item.who"
          >
          {{item.msg}}
          </chartMessage>
        </chartMessageGroup>
      </div>

      <!-- 工具 -->
      <div class="chart-wrap-tool">
        <button>
          <span class="smile-icon"></span>
        </button>
        <button>
          <span class="file-icon"></span>
        </button>
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
export default {
  name: 'chart',
  components: {
    chartMessage,
    chartMessageGroup
  },
  data () {
    return {
      historyMsg: [
        {
          who: 'self',
          type: 'text',
          msg: '1容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'other',
          type: 'text',
          msg: '2容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'self',
          type: 'text',
          msg: '3容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'self',
          type: 'text',
          msg: '4容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'other',
          type: 'text',
          msg: '5容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'self',
          type: 'text',
          msg: '3容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'self',
          type: 'text',
          msg: '4容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        },
        {
          who: 'other',
          type: 'text',
          msg: '5容联云通讯国内领先的云通讯平台容联云通讯国内领先的云通讯平台'
        }
      ],
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
      showChart: true
    }
  },
  methods: {
    sendMsg () {
      console.log(this.readyMsg)
    },
    closeChart () {
      this.showChart = false
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
    z-index: 999;
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
</style>

