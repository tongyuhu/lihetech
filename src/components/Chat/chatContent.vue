<template>
  <div class="meeeage-content">
    <span v-if="isTextMsg">{{textMsg}}</span>
    <img class="img-chat" v-if="isImgMsg" :src="imgsrc" @click="showBig()" alt="图片消息">
    <imgfloat
    :imgsrc="imgsrc"
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
export default {
  name: 'chatcontent',
  components: {
    imgfloat
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
      isTextMsg: false,
      isImgMsg: false,
      imgsrc: '',
      showBigImg: false
      // slide1: [
      //   {
      //     src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
      //     msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
      //     alt: 'picture1',
      //     title: 'Image Caption 1',
      //     w: 600,
      //     h: 400
      //   }
      // ]
      // isTextMsg:true,

    }
  },
  watch: {
    message: {
      handler: function (val) {
        switch (val.content.messageName) {
          case 'TextMessage':
            this.isTextMsg = true
          // if (this.this.message.content.content) {
            this.textMsg = this.message.content.content
          // }
            break
          case 'ImageMessage':
            this.isImgMsg = true
            if (this.message.content.content) {
              this.imgsrc = 'image/jpg;base64,' + this.message.content.content
            }
            if (this.message.content.imageUri) {
              this.imgsrc = this.message.content.imageUri
            }
            break
        }
      },
      deep: true
    }
  },
  computed: {

  },
  methods: {
    showBig () {
      this.$refs.chatimg.showBig()
      // this.showBigImg = true
    },
    // closeBig () {
    //   this.showBigImg = false
    // },
    showmsg () {
      let vm = this
      switch (vm.message.content.messageName) {
        case 'TextMessage':
          vm.isTextMsg = true
          // if (vm.vm.message.content.content) {
          vm.textMsg = vm.message.content.content
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
      }
      // if(message.messageType)
    }
  },
  mounted () {
    let vm = this
    vm.showmsg()
    console.log('message', vm.message)
    console.log('messagename', vm.message.content.messageName)
  }
}
</script>

<style lang="scss" scoped>
.meeeage-content{
  min-width: 15px;
}
.img-chat{
  max-width: 200px;
  cursor: pointer;
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
</style>
