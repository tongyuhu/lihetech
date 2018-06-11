<template>
  <div class="video-chat-wrap" v-drag="'video-drag'">
    <div id="video-drag">
    </div>
    <div class="close">
      <el-button @click="close" :style="{'color':'#041421','font-size':'24px'}" type="text" icon="el-icon-close"></el-button>
    </div>
    <div class="video-chat">
      <div id="videoChat">

      </div>
      <div class="btn-wrap">
        <el-button @click="hungCall">挂断</el-button>
        <el-button v-if="voice" @click="noVoice">静音</el-button>
        <el-button v-if="!voice" @click="hasVoice">取消静音</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
    close () {
      document.getElementById('videoChat').innerHTML = ''
      this.$emit('close')
    },
    hung () {
      this.$nextTick(function () {
        document.getElementById('videoChat').innerHTML = ''
      })
    },
    hungCall () {
      document.getElementById('videoChat').innerHTML = ''
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
    min-width: 400px;
    // height: 700px;
    background: #fff;
    position: fixed;
    top:50px;
    left: 50px;
    box-shadow: 0 0 18px 0px rgba(0, 0, 0, 0.3);
    // padding:20px;
  }
  .video-chat{
    width: 800px;
    height: 600px;
    // background: rgb(102, 60, 60);
    padding:20px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  #video-drag{
    width: 100%;
    height: 15px;
    // background: #000;
    cursor: move;
  }
  .close{
    text-align: right;
    padding-right: 20px;
  }
  #videoChat{
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    border:1px solid #666;
  }
  .btn-wrap{
    text-align: center;
    padding-top: 20px;
  }
</style>

