<template>
  <div class="wrap">
    <div class="noimg" v-if="total < 1">
      <span>暂无照片</span>
    </div>
    <!-- 日常照片 -->
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item v-for="(item,index) in imgList" :key="index" :title="item.time" :name="index">
        <div class="img-list">
          <div class="inline-block" v-for="img in item.imgs" :key="img.time">
            <img :src="img" alt="加载失败" @click="showchecklistimg(img)">
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 翻页 -->
    <div class="page-wrap">
      <el-pagination
        class="el-pagination"
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </div>
    <!-- 查看大图 -->
    <imgfloat
    :imgsrc="imgUrl"
    v-if="showBigImg"
    @close="closeImgFloat"
    ref="dailyImg">
    </imgfloat>
  </div>
</template>

<script>
import {dailyImgApi} from '@/api/components/BloodheighSickcard/dailyImg'
import imgfloat from '@/components/imgFloat'
import {mapState} from 'vuex'
export default {
  name: 'dailyImg',
  components: {
    imgfloat
  },
  props: {
    sickID: ''
  },
  data () {
    return {
      // 默认打开第一条照片列表
      activeNames: [0],
      // 默认关闭大图
      showBigImg: false,
      imgUrl: '',
      // 图片列表
      imgList: [],
      // 页码
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    // 打开大图
    showchecklistimg (url) {
      this.imgUrl = url
      this.showBigImg = true
      console.log('打开大图？', this.showBigImg)
    },
    // 关闭大图
    closeImgFloat () {
      this.showBigImg = false
    },
    /**
     * 获取图片列表
     * @param page 当前页数
     */
    getData (page) {
      let vm = this
      vm.imgList = []
      let parmas = {
        userId: this.sickID,
        adminHospitalId: this.adminInfo.adminHospitalId,
        pageSize: this.pageSize,
        pageNum: page
      }
      this.$axios(dailyImgApi(parmas))
      .then(res => {
        if (res.data.code === '0000') {
          if (res.data.data instanceof Array) {
            res.data.data.forEach(item => {
              let obj = {}
              if (this._.has(item, 'dailyPhotosUrl') && this._.has(item, 'createTime')) {
                obj.imgs = item.dailyPhotosUrl.split(',').map(url => {
                  return process.env.IMG_URL + url
                })
                obj.time = item.createTime.slice(0, 10)
                vm.imgList.push(obj)
              }
            })
          }
          vm.total = res.data.recordCount
          console.log('照片总数', vm.total)
        }
      })
    },
    /**
     * @description 改变页码更新数据
     */
    pageChange (currentpage) {
      this.getData(currentpage)
    }
  },
  created () {
    // 初始化数据
    this.getData(1)
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  padding: 20px;
  background: #fff;
}
.noimg{
  text-align: center;
  font-size: 16px;
  padding: 20px;
}
.inline-block{
  display: inline-block;
  width: 200px;
  height: 200px;
  img{
    max-width: 190px;
    max-height: 190px;
    min-width: 190px;
    display: inline-block;
    // border:1px solid #eaeaea;
    padding: 10px;
  }
}
// .img-list{
  
// }
.page-wrap{
  padding: 10px 20px 0 0;
  float: right;
}
</style>


