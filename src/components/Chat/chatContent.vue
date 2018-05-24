<template>
  <div>
    <span v-if="isTextMsg">{{textMsg}}</span>
    <img v-if="isImgMsg" :src="imgsrc" alt="图片消息">
  </div>
</template>

<script>
export default {
  name: 'chatcontent',
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
      imgsrc: ''
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
            this.textMsg = this.this.message.content.content
          // }
            break
          case 'ImageMessage':
            this.isImgMsg = true
            if (this.this.message.content.content) {
              this.imgsrc = 'image/jpg;base64,' + this.this.message.content.content
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

<style>

</style>
