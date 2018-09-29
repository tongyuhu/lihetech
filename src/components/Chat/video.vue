<template>
  <div class="video-chat-wrap" v-drag="'video-drag'">
    <div id="video-drag"></div>
    <!-- 语音通话 -->
    <div v-if="!currentIsVideo" class="audio-wrap">
      <div>
        <img class="user-img" :src="currentVideo.userImg+''" :onerror="userimgerror">
      </div>
      <div class="audio-tip">
        <span>语音通话中...</span>
      </div>
      <div>
        <button  @click="hungCall" class="audio-hung">挂断</button>
      </div>
      <div class="audio-to-video-wrap">
        <div>
          <button v-if="voice" @click="noVoice" title="静音">
            <span class="iconfont icon-hf_maikefeng 1991fc"></span>
          </button>

          <button v-if="!voice" @click="hasVoice" title="取消静音">
            <span class="iconfont icon-guanbimaikefeng 1991fc"></span>
          </button>
          <!-- <button  class="audio-to-video" @click="toVideo">
            <span class="iconfont icon-shipin1 span"></span>
          </button>  -->
        </div>
        <!-- <div> -->
          <!-- <span class="audio-to-video-text">{{静音}}</span> -->
        <!-- </div> -->
      </div>
    </div>
    <div class="video-wrap" id="video-wrap">
      <!-- 对方视频图像 -->
      <div id="videoChat">

      </div>
      <!-- 自己视频 -->
      <div id="selfVideo">
      </div>
      <!-- 视频通话 -->
      <div class="btn-wrap" v-if="currentIsVideo">
        <div class="voice-btn">

          <button v-if="voice" @click="noVoice" title="静音">
            <span class="iconfont icon-hf_maikefeng tofff"></span>
          </button>

          <button v-if="!voice" @click="hasVoice" title="取消静音">
            <span class="iconfont icon-guanbimaikefeng tofff"></span>
          </button>
          <button  @click="toAudio" title="转换为语音聊天">
            <span class="iconfont icon-shipin1 tofff"></span>
          </button> 
        </div>
        <div class="hung-btn">
          <button  @click="hungCall">挂断</button>
          <!-- <button  @click="toVideo">toVideo</button>  -->
          <!-- <button :disabled="currentIsVideo"  @click="toAudio">toAudio</button> 
          <button :disabled="!currentIsVideo" @click="toVideo">toVideo</button>  -->
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import userimg from 'icon/user.png'
// import publicStatic from '@/publicData/const.js'
export default {
  name: 'videochat',
  props: {

  },
  data () {
    return {
      voice: true, // 是否静音
      userimgerror: 'this.src="' + userimg + '"'  // 默认头像
    }
  },
  computed: {
    ...mapState([
      'currentIsVideo',  // 是否是视频通话
      'currentVideo'
    ])
  },
  methods: {
    ...mapMutations(['closeVideo']),
    /**
     * @description 关闭通话
     */
    close () {
      document.getElementById('videoChat').innerHTML = ''
      document.getElementById('selfVideo').innerHTML = ''
      this.$emit('close')
    },
    hung () {
      this.$nextTick(function () {
        document.getElementById('videoChat').innerHTML = ''
        document.getElementById('selfVideo').innerHTML = ''
      })
    },
    /**
     * @description 挂断通话
     */
    hungCall () {
      // this.close()
      // document.getElementById('videoChat').innerHTML = ''
      this.closeVideo()
      this.$emit('hungcall')
      document.getElementById('videoChat').innerHTML = ''
      document.getElementById('selfVideo').innerHTML = ''
    },
    /**
     * @description 静音
     */
    noVoice () {
      this.$emit('mute')
      this.voice = false
    },
    /**
     * @description 取消静音
     */
    hasVoice () {
      this.$emit('unmute')
      this.voice = true
    },
    /**
     * @description 转换音频
     */
    toAudio () {
      this.$emit('toAudio')
    },
    /**
     * @description 转换视频
     */
    toVideo () {
      this.$emit('toVideo')
    }
  }

}
</script>

<style lang="scss" scoped>
  .video-chat-wrap{
    z-index: 9999999999;
    // width: 900px;
    max-width:1350px;
    // min-width: 340px;
    // min-height: 480px;
    // height: 700px;
    background: #fff;
    position: fixed;
    top:250px;
    left: 250px;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
    // padding:20px;
  }
  .video-wrap{
    position: relative;
    // min-width: 640px;
    // min-height: 480px;
  }
  .video-chat{
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
  }
  #video-drag{
    width: 100%;
    // width: inherit;
    height: 15px;
    background: transparent;
    cursor: move;
    position: absolute;
    top:0;
    left: 0;
    z-index: 99;
  }
  .close{
    text-align: right;
    padding-right: 20px;
  }
  #videoChat{
    // max-width: 1280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // min-height: 480px;
    // min-width: 640px;
  }
  
  #selfVideo{
    // width: 128px;
    // height: 96px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // min-height: 200px;
    border:1px solid #666;
    position: absolute;
    bottom: 0;
    right: 0;
    video{
      width: 128px !important;
    }
  }
  .btn-wrap{
    text-align: center;
    height: 56px;
    position: absolute;
    bottom: 0;
    display: none;
    width: 100%;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0);
    align-items: center;
  }
  .hung-btn{
    margin-right: 30px;
    button{
      width: 100px;
      height: 36px;
      background: #e87070;
      font-size: 18px;
      color: #fff;
      border-radius: 2px;

    }
  }
  .voice-btn{
    margin-left: 30px;
    button{
      background: transparent;
      font-size: 18px;
      cursor: pointer;
      span{
      font-size: 18px;

      }
    }
  }
  .video-wrap:hover .btn-wrap{
    text-align: center;
    height: 56px;
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.6);
    align-items: center;
    animation:showbtn .5s ease 0s;
  }
  @keyframes showbtn {
    from{height: 0;}
    to{height:56px;}
  }
  button{
    border: none;
    outline: none;
    cursor: pointer;
  }
  .video-chat-wrap:hover .hung-btn{
    margin-right: 30px;
    button{
      width: 100px;
      height: 36px;
      background: #e87070;
      font-size: 18px;
      color: #fff;
      border-radius: 2px;
      animation:btn .5s ease 0s;
    }
  }
  .video-chat-wrap:hover .voice-btn{
    margin-left: 30px;
    button{
      background: transparent;
      font-size: 18px;
      span{
      font-size: 18px;
      animation:btn .5s ease 0s;
      }
    }
  }
  @keyframes btn {
    from{opacity: 0;
    height: 0;}
    to{opacity: 100%;
    height: 36px;}
  }
  .audio-wrap{
    width: 336px;
    height: 208px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .user-img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    button{
      span{
        color: #1991fc;
      }
    }
  }
  .tofff{
    color: #fff;
  }
  .audio-hung{
    width: 100px;
    height: 36px;
    color: #fff;
    background-color: #e87070;
    border-radius: 2px;
    margin:10px 0;
  }
  .audio-to-video-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      background: #fff;
    }
  }
  .audio-to-video{
    background: #fff;
    .span{
    color:#1991fc;
      font-size: 28px;
    }
  }
  .audio-to-video-text{
    display: inline-block;
    font-size: 12px;
    color: #041421;
    // line-height: 34px;
    // height: 34px;
  }
  .audio-tip{
    margin-top:10px;
    color: #041421;
  }
  .1991fc{
    color:#1991fc;
  }
</style>

