<template>
  <div class="img-message-wrap"  v-if="showBigImg" v-on:click.self.stop="closeBig()">
    <img :src="imgsrc" alt="图片消息">
  </div>
</template>

<script>
export default {
  name: 'imgfloat',
  props: {
    imgsrc: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {
      showBigImg: false
    }
  },
  methods: {
    closeBig () {
      this.showBigImg = false
    },
    showBig () {
      this.showBigImg = true
    }
  }
}
</script>

<style lang="scss" scoped>
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
