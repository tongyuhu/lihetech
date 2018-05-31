<template>
  <div>
      <div :class="[cls ? 'left' : 'right']">
        <div  :class="['wrap',cls ? 'wrap-left':'wrap-right']">
          <div>
            <img class="avatar" :src="userImg" alt="头像">
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

    <!-- <div class="flex">
      <div>

      </div>
    </div> -->
</template>

<script>
// import img from '~icon/hospital-icon2-04.png'
import publicStatic from '@/publicData/const.js'
import {mapState} from 'vuex'
export default {
  name: 'chartmessage',
  props: {
    who: {
      type: [String],
      default: 'other'
    },
    userImg: {
      type: [String],
      default: publicStatic.onlineStatic + '/static/user.png'
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
      cls: false,
      nobg: false,
      chatclass: ''
    }
  },
  computed: {
    ...mapState([
      'rongUserId'
    ])
  },
  methods: {
  },
  watch: {
    who: {
      handler: function (val) {
        if (this.who === this.rongUserId) {
          this.cls = false
        }
        if (this.who !== this.rongUserId) {
          this.cls = true
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.type === 'ImageMessage') {
      this.nobg = true
      this.chatclass = ''
      // this.cls = '0000'
    } else {
      if (this.cls) {
        this.chatclass = 'left-angle'
      } else {
        this.chatclass = 'right-angle'
      }
    }
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
  .avatar{
    width: 46px;
    height: 46px;
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
      border-radius: 5px;
      padding:5px;
      font-size: 14px;
      color: #041421;
      line-height: 20px;
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
      top:45%;
      right: 100%;
      border-top:5px solid transparent;
      border-bottom:5px solid transparent;
      border-right:10px solid $bagcolor;
    }
  }
  .right{
    margin-top:15px;
    float: right;
    max-width: 60%;
    $bagcolor:#1991fc;
    .message-wrap{
      background-color: $bagcolor;
      border-radius: 5px;
      padding:5px;
      color: #fff;
      font-size: 14px;
      line-height: 20px;
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
      top:45%;
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

