<template>
  <!-- <div class="img-message-wrap"  v-if="showBigImg" > -->
  <div class="img-message-wrap"  v-if="show">
    <div class="close-btn-wrap">
      <button @click.prevent="closeBig">
        <i class="el-icon-close"></i>
      </button>
      <!-- <button v-on:click.self.stop="closeBig()">
        <i class="el-icon-close"></i>
      </button> -->
    </div>
    <div class="page-up-wrap" v-show="imgs.length !==0">
      <button class="page-btn" @click.prevent="pageUp">
        <i class="el-icon-arrow-left"></i>
      </button>
    </div>
    <div class="container-wrap">
      <div class="img-wrap" v-for="(img,index) in imgs" :key="index" v-show="img.show">
        <img :src="img.src" alt="无法获取图片">
      </div>
      <div class="add-btn-wrap">
        <!-- <el-button type="primary" size="mini">
          添加检查单
        </el-button> -->
        <a class="a-upload" title="上传"> 
          <input type="file" accept="image/jpg" @change="uploadFile($event)">
          <!-- <span class="iconfont icon-chakanwenjian icon"></span> -->
          <span>添加检查单</span>
        </a>
      </div>
    </div>
    
    <div class="page-down-wrap" v-show="imgs.length !==0">
      <button class="page-btn" @click.prevent="pageDn">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Bus from '@/bus.js'
import {uploadFileApi} from '@/api/components/editAdmin.js'

function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
export default {
  name: 'imgFloatCarousel',
  props: {
    imgsrc: {
      type: [String, Array],
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showBigImg: false,
      imgs: [],
      index: 0

    }
  },
  methods: {
    closeBig () {
      // this.showBigImg = false
      this.$emit('close')
    },
    showBig () {
      // this.showBigImg = true
    },
    imgarr () {
      let arr = []
      let imgArr = []
      if (typeOf(this.imgsrc) === 'string') {
        if (this.imgsrc !== '') {
          imgArr.push(this.imgsrc)
        }
      }
      if (typeOf(this.imgsrc) === 'array') {
        arr = this.imgsrc
      }
      arr.forEach(item => {
        // if (item) {
        let obj = {}
        obj.show = false
        obj.src = process.env.IMG_URL + item
        imgArr.push(obj)
        // }
      })
      return imgArr
    },
    initImg () {
      if (this.imgs.length > 0) {
        this.imgs[0].show = true
      }
      this.index = 0
    },
    showImg (i) {
      this.imgs.forEach((item, index) => {
        item.show = false
        if (index === i) {
          item.show = true
        }
      })
    },
    pageDn () {
      let len = this.imgs.length - 1
      if (this.index < len) {
        this.index ++
        this.showImg(this.index)
      } else {
        this.index = 0
        this.showImg(this.index)
      }
    },
    pageUp () {
      console.log('检查单arr', this.imgs)
      if (this.index > 0) {
        this.index --
        this.showImg(this.index)
      } else {
        this.index = this.imgs.length - 1
        this.showImg(this.index)
      }
    },
    emitimgarr () {
      let arr = []
      this.imgs.forEach(item => {
        // let src = item.src.match(/process.env.IMG_URL(\S*)/)[1]
        let src = this._.replace(item.src, process.env.IMG_URL, '')
        arr.push(src)
      })
      return arr
    },
    uploadFile: function (e) {
      // uploadFileApi
      console.log('检查单arr', this.imgs)
      let vm = this
      let file = e.target.files[0]
      let formdata = new FormData()
      formdata.append('files', file)
      // image.src = window.URL.createObjectURL(files.item(dd))
      vm.$axios(uploadFileApi(formdata))
      .then(res => {
        if (res.data.code === '0000') {
          // vm[val] = res.data.data.saveFile
          vm.imgs.push({
            src: process.env.IMG_URL + res.data.data.saveFile,
            show: false
          })
          vm.index = vm.imgs.length - 1
          vm.showImg(vm.index)
          vm.$emit('addImg', vm.emitimgarr())
          vm.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          vm.$message({
            message: '上传失败',
            type: 'waring'
          })
        }
        return false
      })
    }
  },
  mounted () {
    let vm = this
    // this.showBigImg = this.show

    this.imgs = this.imgarr()
    this.initImg()
    console.log('检查单arr', this.imgs)
    Bus.$on('showbigimg', () => {
      vm.showBig()
    })
  }
}
</script>

<style lang="scss" scoped>
.img-message-wrap{
  position: fixed;
  z-index: 9999999999999;
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
  background: rgba(0, 0, 0, 0.4);
  img{
    max-width: 144*5px;
    max-height: 105*5px;
    // max-width: 80%;
    // max-height: 80%;
    // width: 80%;
  }
  .page-btn{
    border:none;
    background: #fff;
    color: #666;
    font-size: 18px;
    height: 40px;
    width: 20px;
    cursor: pointer;
    outline: none;
    padding: 0;
  }
  .close-btn-wrap{
    position: absolute;
    top:20px;
    right: 20px;
    button{
      border:none;
      background: transparent;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      outline: none;
    }
  }
  .page-up-wrap{
    position: absolute;
    top:50%;
    left: 5%;
  }
  .page-down-wrap{
    position: absolute;
    top:50%;
    right: 5%;
  }
  .add-btn-wrap{
    margin: 0 auto;
    // position: absolute;
    // bottom:5%;
  }
  .container-wrap{
    max-width: 80%;
    max-height: 80%;
    margin: 0 auto;
  }
  .img-wrap{
    // max-width: 90%;
    // max-height: 90%;
    margin: 0 auto;
    display: inline-block;
  }
  .a-upload {
    /* padding: 4px 10px; */
    // height: 25px;
    // line-height: 32px;
    margin-top:25px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    color: #fff;
    vertical-align: middle;
    background: #1991fc;
    padding:8px;
    border-radius: 2px;
    // /* background: #fafafa; */
    /* border: 1px solid #ddd; */
    /* border-radius: 4px; */
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload  input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer
  }

  .a-upload:hover {
      /* color: #444; */
      /* background: #eee; */
      /* border-color: #ccc; */
      text-decoration: none
  }
}
</style>
