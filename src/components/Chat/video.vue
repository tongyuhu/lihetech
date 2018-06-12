<template>
  <div class="video-chat-wrap" v-drag="'video-drag'">
    <div id="video-drag">
    </div>
    <!-- <div class="close">
      <el-button @click="close" :style="{'color':'#041421','font-size':'24px'}" type="text" icon="el-icon-close"></el-button>
    </div> -->
    <!-- <div class="video-chat"> -->
      <div id="videoChat">

      </div>
      <div id="selfVideo">

      </div>
      <div class="btn-wrap">
        <div class="voice-btn">

          <button v-if="voice" @click="noVoice" type="text" :style="{'color':'#fff','font-size':'20px'}"><span class="iconfont icon-hf_maikefeng"></span></button>
          <button v-if="!voice" @click="hasVoice" type="text" :style="{'color':'#fff','font-size':'20px'}"><span class="iconfont icon-guanbimaikefeng"></span></button>
        </div>
        <div class="hung-btn">

          <button :style="{'width':'100px'}" type="danger" @click="hungCall">挂断</button>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'videochat',
  props: {

  },
  data () {
    return {
      voice: true
    }
  },
  methods: {
    ...mapMutations(['closeVideo']),
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
    hungCall () {
      // this.close()
      // document.getElementById('videoChat').innerHTML = ''
      document.getElementById('videoChat').innerHTML = ''
      document.getElementById('selfVideo').innerHTML = ''
      this.closeVideo()
      this.$emit('hungcall')
    },
    noVoice () {
      this.$emit('mute')
      this.voice = false
    },
    hasVoice () {
      this.$emit('unmute')
      this.voice = true
    }
  }

}
</script>

<style lang="scss" scoped>
  .video-chat-wrap{
    z-index: 9999999999;
    // width: 900px;
    max-width:1350px;
    min-width: 640px;
    min-height: 480px;
    // height: 700px;
    background: #fff;
    position: fixed;
    top:250px;
    left: 250px;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
    // padding:20px;
  }
  .video-chat{
    // width: 800px;
    // height: 600px;
    // background: rgb(102, 60, 60);
    // padding:20px;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
  }
  #video-drag{
    width: 100%;
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
    // min-height: 400px;
    min-height: 480px;
    min-width: 640px;
    // border:1px solid #666;
  }
  
  #selfVideo{
    // max-width: 1280px;
    width: 128px;
    height: 96px;
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
      span{
      font-size: 18px;

      }
    }
  }
  .video-chat-wrap:hover .btn-wrap{
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
</style>

