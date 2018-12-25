<template>
  <div>
      <div :class="[cls ? 'left' : 'right']">
        <div  :class="['wrap',cls ? 'wrap-left':'wrap-right']">
          <div class="avatar-wrap">
            <img class="avatar" :src="userImgChat+''" :onerror="errorimg">
          </div>
          <div :class="['message-wrap',chatclass,nobg?'no-bg':'']">
            <div :class="[nobg?'no-bg':'']">
              <slot></slot>
            </div>
          <!-- <div :class="['message-wrap',cls ? 'left-angle':'right-angle',nobg?'no-bg':'']"> -->
          </div>
        </div>
      </div>
      <!-- <div v-if="!moreMessage" class="center">
        <el-button type="text">查看更多历史消息</el-button>
      </div> -->
      
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import userimg from 'icon/user.png'
import adminimg from 'icon/admin.jpg'
export default {
  name: 'chartmessage',
  props: {
    who: {
      type: [String],
      default: 'other'
    },
    userImg: {
      type: [String]
      // default: process.env.IMG_URL_LOCALHOST + '/static/user.png'
    },
    moreMessage: {
      type: [Boolean],
      default: false
    },
    type: {
      type: [String],
      default: 'TextMessage'
    }
  },
  data () {
    return {
      cls: false,  // true 左侧聊天classname   false右侧classname
      nobg: false,  // 图片消息没有背景
      chatclass: '', // 左右聊天小三角样式
      userImgChat: this.userImg,  // 图片消息src
      userimgerror: 'this.src="' + userimg + '"',  // 默认患者头像
      adminimgerror: 'this.src="' + adminimg + '"', // 默认医生
      errorimg: ''
    }
  },
  computed: {
    ...mapState([
      'rongUserId',
      'adminInfo'
    ]),
    ...mapGetters(['adminImg', 'currentChatImg'])
  },
  methods: {
  },
  watch: {
    who: {
      handler: function (val) {
        // 如果是自己发出的消息
        if (this.who === this.rongUserId) {
          this.cls = false
          if (this.type === 'ImageMessage') {  // 图片消息去除背景和小三角
            this.nobg = true
            this.chatclass = ''
          } else { // 否则加右侧小三角
            // if (this.cls) {
              // this.chatclass = 'left-angle'
            // } else {
            this.chatclass = 'right-angle'
            // }
          }
          if (this._.has(this.adminInfo, 'headPortraitUrl')) { // 有头像用头像
            if (this.adminInfo.headPortraitUrl.length !== 0) {
              this.userImgChat = process.env.IMG_URL + this.adminInfo.headPortraitUrl

              this.errorimg = this.adminimgerror
            }
          }
          this.errorimg = this.adminimgerror
        }
        if (this.who !== this.rongUserId) {
          this.cls = true
          if (this.type === 'ImageMessage') {
            this.nobg = true
            this.chatclass = ''
          } else {
            this.chatclass = 'left-angle'
          }
          if (this.currentChatImg) {
            this.userImgChat = this.currentChatImg
          }
          this.errorimg = this.userimgerror
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {
  }

}
</script>

<style lang="scss" scoped>
.no-bg{
  background: rgba(255, 255, 255, 0) !important;
}
.no-bg .left-angle::before{
  background: rgba(255, 255, 255, 0) !important;
  content: "";
  width:0;
  height:0;
}
.no-bg .right-angle::before{
  background: rgba(255, 255, 255, 0) !important;
  content: "";
  width:0;
  height:0;
}
  .center{
    text-align: center;
  }
  .flex{
    display:flex;
  }
  .left{
    width: 100%;
    justify-content: flex-start;
    min-width: 10px;
  }
  .right{
    width: 100%;
    min-width: 10px;
  }
  // $bagcolor:#fff;
  // .clear::after{
  //   content: "";
  //   width:0;
  //   height: 0;
  //   visibility: hidden;
  //   display: block;
  //   clear: both;
  // }
  .avatar-wrap{
    align-self: flex-start;
  }
  .avatar{
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  li{
    display: block;
    margin-top:15px;
    max-width: 60%;
    margin-left: 5px;
    margin-right: 5px;
  }
  .left{
    margin-top:15px;
    float: left;
    $bagcolor:#fff;
    max-width: 60%;
    .message-wrap{
      background-color: $bagcolor;
      color: #041421;
    }
    .left-angle{
      position: relative;
      margin-left: 15px;
    }
    .left-angle::before{
      position: absolute;
      content: "";
      width:0;
      height:0;
      top:12px;
      right: 100%;
      border-top:5px solid transparent;
      border-bottom:5px solid transparent;
      border-right:10px solid $bagcolor;
    }
  }
  .message-wrap{
    align-self: flex-start;
    margin-top: 8px;
    border-radius: 2px;
    padding:5px;
    font-size: 14px;
    line-height: 20px;
  }
  .right{
    margin-top:15px;
    float: right;
    max-width: 60%;
    $bagcolor:#1991fc;
    .message-wrap{
      background-color: $bagcolor;
      color: #fff;
    }

    .right-angle{
      position: relative;
      margin-right: 15px;
    }
    .right-angle::before{
      position: absolute;
      content: "";
      width:0;
      height:0;
      top:12px;
      left: 100%;
      border-top:5px solid transparent;
      border-bottom:5px solid transparent;
      border-left:10px solid $bagcolor;
    }
  }
  .wrap{
    display: flex;
    align-items: center;
  }
  .wrap-left{
    justify-content: flex-start;
  }
  .wrap-right{
    justify-content: flex-start;
    flex-direction: row-reverse;
  }
</style>

