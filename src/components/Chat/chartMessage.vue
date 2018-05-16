<template>
    <li :class="['clear',cls ? 'left' : 'right']">
      <div  :class="['wrap',cls ? 'wrap-left':'wrap-right']">
        <div>
          <img class="avatar" :src="userImg" alt="头像">
        </div>
        <div :class="['message-wrap',cls ? 'left-angle':'right-angle']">
            <slot></slot>
        </div>
      </div>
    </li>
</template>

<script>
// import img from '~icon/hospital-icon2-04.png'
export default {
  name: 'chartmessage',
  props: {
    who: {
      type: [String],
      default: 'other'
    },
    userImg: {
      type: [String],
      default: '/static/user.png'
    }
  },
  data () {
    return {
      cls: false
    }
  },
  methods: {
  },
  watch: {
    who: {
      handler: function (val) {
        if (this.who === 'self') {
          this.cls = false
        }
        if (this.who === 'other') {
          this.cls = true
        }
      },
      immediate: true
    }
  }

}
</script>

<style lang="scss" scoped>
  // $bagcolor:#fff;
  .clear::after{
    content: "";
    width:0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
  }
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
    float: left;
    $bagcolor:#fff;
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
      top:30%;
      right: 100%;
      border-top:5px solid transparent;
      border-bottom:5px solid transparent;
      border-right:10px solid $bagcolor;
    }
  }
  .right{
    float: right;
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
      top:30%;
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

