<template>
  <div class="connect-btn">
  <!-- <div :class="{'has-videomessage-animation':hasVideoMsg,'connect-btn':true}"> -->
    <div v-if="!invite">
      <div class="user-img-wrap">
        <div class="dot"></div>
        <div class="pulse"></div>
        <img class="user-img" :src="imgExist(currentVideo.userImg)" alt="">
      </div>
      <div class="tip">
        {{currentVideo.userName?currentVideo.userName:'患者'}}邀请您进行{{currentIsVideo?'视频':'语音'}}聊天...
      </div>
      <div class="btn-wrap">
        <div>
          <button class="no" @click="reject">拒绝</button>
        </div>
        <div>
          <button class="ok" @click="connect">接通</button>
        </div>
      </div>
    </div>
    <div v-if="invite">
      <div class="user-img-wrap">
        <div :class="['dot',currentIsVideo? 'invite-video':'invite-voice']"></div>
        <!-- invite-voice -->
        <div class="pulse"></div>
        <!-- <img class="user-img" src="/static/user.png" alt=""> -->
      </div>
      <div class="tip">{{currentIsVideo? tip:voicetip}}</div>
      <div class="btn-wrap">
        <div>
          <button class="no" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {imgExists} from '@/untils/untils'
// import publicStatic from '@/publicData/const.js'
export default {
  name: 'connectbtn',
  data () {
    return {
      tip: '视频聊天邀请中...',
      voicetip: '语音聊天邀请中...'
    }
  },
  computed: {
    ...mapState([
      'hasVideoMsg',
      'invite',
      'currentIsVideo',
      'currentVideo'
    ])
  },
  methods: {
    ...mapMutations([
      'closeVideoMsg',
      'getVideoMsg'
    ]),
    imgExist (url) {
      return imgExists(url, process.env.IMG_URL_LOCALHOST + '/static/user.png')
    },
    connect () {
      this.$emit('connect')
    },
    reject () {
      this.$emit('reject')
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  mounted () {
    // this.getVideoMsg()
  }
}
</script>

<style lang="scss" scoped>
.connect-btn{
  z-index: 9999999999;
    width: 336px;
    height: 208px;
    background: #fff;
    position: fixed;
    bottom:50px;
    left: 50%;
    // border-radius: 90px;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
}
.user-img-wrap{
  width: 46px;
  height: 46px;
  margin: 25px auto;
  // margin-top:25px;
  background: #1991fc;
  border-radius: 50%;
  position: relative;
}
.user-img{
  width: 46px;
  height: 46px;
  border-radius: 50%;
}
.tip{
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  color: #041421;
}
.btn-wrap{
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top:20px;
  button{
    border: none;
    outline: none;
    color: #fff;
    width: 100px;
    height: 36px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 18px;
  }
  .ok{
    background: #3ec157;
    margin: 0 10px;
  }
  .no{
    background: #e87070;
    margin: 0 10px;
  }
}

.has-videomessage-animation{
    animation: hasvideomsg 1.2s infinite;
    /* -webkit-animation:hasmsg .5s infinite; */
    /* // padding-bottom:100px; */
  }
  @keyframes hasvideomsg {
    to {transform:none;}50%{transform:scale(1.1)}
  }

  @keyframes warn {
	0% {
		transform: scale(1);
		opacity: .7;
	}
	100% {
		transform: scale(1.5);
		opacity: 0.0;
	}
}

/* 保持大小不变的小圆圈  */
.dot {
	position: absolute;
	width: 44px;
	height: 44px;
	left: 0;
	top: 0;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border: 1px solid #6fbafd;
	border-radius: 50%;
	z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈  */
.pulse {
	position: absolute;
	width: 46px; 
	height: 46px;
	left: -7px;
	top: -7px;
	border: 7px solid #1991fc;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	-webkit-animation: warn 1s ease-out;
	-moz-animation: warn 1s ease-out;
	animation: warn 1s ease-out;
	-webkit-animation-iteration-count: infinite;
	-moz-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
}
.invite-video{
  // background-color: #6fbafd;
  background: url(~icon/hospital-icon2-21.png) no-repeat center;
  background-size:28px 18px;
}
.invite-voice{
  // background-color: #6fbafd;
  background: url(~icon/hospital-icon2-22.png) no-repeat center;
  background-size:18px 18px;
}
</style>

