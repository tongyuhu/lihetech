<template>
  <div class="meeeage-content">
    <!-- <span v-if="isTextMsg">{{textMsg}}</span> -->
    <img class="img-chat" v-if="isImgMsg" :src="imgsrc" @click="showBig(imgsrc)" alt="无法获取图片">
    <span v-if="isTextMsg" v-html="textMsg"></span>
    <span>
      <button :class="{'voice-msg':true}" v-if="isVoiceMsg" @click="playVoice">
        <span :class="{'iconfont':true, 'icon-yuyin':true,'voice':playVoiceAnimation}"></span>
        </button>
      <span v-if="isVoiceMsg">{{voiceTime}}"</span>
    </span>
    <div v-if="isLocationMsg" class="location-img-wrap">
      <!-- <img class="location-img" v-if="isLocationMsg" :src="locationMsg" @click="showBig(locationMsg)" alt="无法获取图片">
      <span class="location-name">{{locationName}}</span> -->
      <position
      :position="locationMsg"
      :tip="locationName"
      :mapId='locationid'>
      </position>
    </div>
    <imgfloat
    :imgsrc="bigImgsrc"
    v-if="showBigImg"
    @close="closeBigImg"
    backgroundColor="rgba(65, 61, 61, 0.7)"
    ref="chatimg">
    </imgfloat>
    <!-- <div class="img-message-wrap" v-if="showBigImg" v-on:click.self.stop="closeBig()">
        <img v-if="isImgMsg" :src="imgsrc" alt="图片消息">
    </div> -->
    <!-- <div class="img-chat">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div> -->
  </div>
</template>

<script>
import imgfloat from '@/components/imgFloat'
import position from '@/components/Chat/postion.vue'
// import Bus from '@/bus.js'
export default {
  name: 'chatcontent',
  components: {
    imgfloat,
    position
  },
  props: {
    message: {
      type: Object,
      default: function () {
        return {
          messageType: ''
        }
      }
    }
  },
  data () {
    return {
      textMsg: '',
      isLocationMsg: false,
      isTextMsg: false,
      isImgMsg: false,
      isVoiceMsg: false,
      imgsrc: '',
      showBigImg: false,
      voiceFile: '',
      locationMsg: [],
      locationName: '',
      locationid: '',
      bigImgsrc: '',
      playVoiceAnimation: false,
      voiceTime: ''
    }
  },
  watch: {
    message: {
      handler: function (val) {
        switch (val.content.messageName) {
          case 'TextMessage':
            this.isTextMsg = true
          // if (this.this.message.content.content) {
            this.textMsg = RongIMLib.RongIMEmoji.emojiToHTML(this.message.content.content + '')
          // }
            break
          case 'ImageMessage':
            this.isImgMsg = true
            if (this.message.content.content) {
              this.imgsrc = 'data:image/jpg;base64,' + this.message.content.content
            }
            if (this.message.content.imageUri) {
              this.imgsrc = this.message.content.imageUri
            }
            break
          case 'VoiceMessage':
            this.isVoiceMsg = true
            this.voiceFile = this.message.content.content
            let duration = this.voiceFile.length / 1024
            this.voiceTime = parseInt(duration)
            break
          case 'LocationMessage':
            this.isLocationMsg = true
            this.locationMsg.push(this.message.content.longitude)
            this.locationMsg.push(this.message.content.latitude)
            this.locationName = this.message.content.poi
            this.locationid = this.message.messageId
            break
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {

  },
  methods: {
    showBig (src) {
      // let vm = this
      this.bigImgsrc = src
      this.showBigImg = true
      // this.$nextTick(function () {
      //   vm.$refs.chatimg.showBig()
      // })
      // Bus.$emit('showbigimg')
      // this.showBigImg = true
    },
    closeBigImg () {
      this.showBigImg = false
    },
    // closeBig () {
    //   this.showBigImg = false
    // },
    showmsg () {
      let vm = this
      switch (vm.message.content.messageName) {
        case 'TextMessage':
          vm.isTextMsg = true
          vm.textMsg = RongIMLib.RongIMEmoji.emojiToHTML(vm.message.content.content + '')
          // }
          break
        case 'ImageMessage':
          vm.isImgMsg = true
          if (vm.message.content.content) {
            vm.imgsrc = 'data:image/jpg;base64,' + vm.message.content.content
          }
          if (vm.message.content.imageUri) {
            vm.imgsrc = vm.message.content.imageUri
          }
          break
        case 'VoiceMessage':
          vm.isVoiceMsg = true
          vm.voiceFile = vm.message.content.content
          let duration = vm.voiceFile.length / 1024
          this.voiceTime = parseInt(duration)
          break
        case 'LocationMessage':
          vm.isLocationMsg = true
          vm.locationMsg = [vm.message.content.latitude, vm.message.content.longitude]
          // vm.locationMsg.push(vm.message.content.latitude)
          // vm.locationMsg.push(vm.message.content.longitude)
          vm.locationName = vm.message.content.poi
          this.locationid = this.message.messageId
          break
      }
      // if(message.messageType)
    },
    playVoice () {
      let vm = this
      let duration = vm.voiceFile.length / 1024
      // this.voiceTime = parseInt(duration)
      // 预加载
      vm.playVoiceAnimation = true
      RongIMLib.RongIMVoice.preLoaded(vm.voiceFile, function () {
        // 播放声音
        RongIMLib.RongIMVoice.play(vm.voiceFile, duration)
      })
      console.log('语音时长', duration)
      setTimeout(function () {
        vm.playVoiceAnimation = false
      }, duration * 1000)
    }
  },
  mounted () {
    // let vm = this
    // vm.showmsg()
    // console.log('message', vm.message)
    // console.log('messagename', vm.message.content.messageName)
  }
}
</script>

<style lang="scss" scoped>
.meeeage-content{
  min-width: 15px;
  min-height:20px;
}
.img-chat{
  display: block;
  max-width: 200px;
  cursor: pointer;
  color: #666;
}
.center{
  margin: 0 auto;
  text-align: center;
}
.img-message-wrap{
  
  position: fixed;
  // margin-top: 80px;
  top:0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.315);
  img{
    max-width: 80%;
    // width: 80%;
  }
}
.voice-msg{
  background: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  width: 50px;
}
.voice{
  animation: playvoice 1.5s infinite;
}
@keyframes playvoice {
  0%{
    opacity: 0.5;
    transform:scale(0.5);
    font-size:12px;
  }
  50%{
    opacity: 0.8;
    transform:scale(0.8);
    font-size:13px;
  }
  100%{
    opacity: 1;
    transform:scale(1.1);
    font-size:14px;
  }
}
.location-img-wrap{
  position: relative;
  display: inline-block;
}
.location-img{
  max-width: 200px;
  cursor: pointer;
  color: #666;
}
.location-name{
  position: absolute;
  bottom:0;
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
</style>
