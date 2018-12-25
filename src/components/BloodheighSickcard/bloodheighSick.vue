<template>
  <div ref="sickcard">
    <!-- 头部 基本信息 问诊页面不显示-->
    <div class="sick-card-head clear" v-if="showcard">
      <div class="sick-card-head-right">
        <p>{{createTime}}</p>
      </div>
      <div class="sick-card-head-left">
        <p class="name">{{name}}</p>
        <div class="sick-card-head-left-msg">
          <span>性别:{{sex ? sex :faceDATA.sex}}</span>
          <span>年龄:{{age ? age:faceDATA.age}}</span>
          <span>电话:{{mobile?mobile :faceDATA.mobile}}</span>
          <span class="sick">确诊为:{{doctorDiagnos ? doctorDiagnos:'暂时没有确诊'}}</span>
        </div>
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="clear">
      <div class="tabs">
        <tabs
        v-model="activeIndex"
        :hassuger="isSugerHeigh"
        @checkSuger="checkSuger"
        @checkd="changeTab"
        :tabcss="{'margin-right':'35px'}"
        :style="{'min-width':'1250px'}"
        >
          <pane
          label="病历" >
            <!-- 病人简历 start  -->
            <div class="sick-history" v-show="showcard">
              <div class="sick-history-top">
                <div>
                  <span>身高：{{height?height:'无'}}</span>
                  <span>体重：{{weight?weight:'无'}}</span>
                </div>
                <div>
                  <span>病史：{{sysIllnessHistoryNameDisease?sysIllnessHistoryNameDisease:'无'}}</span>
                  <span>遗传史：{{sysIllnessHistoryNameGenetic?sysIllnessHistoryNameGenetic:'无'}}</span>
                </div>
                <div>
                  <span>生活习惯：{{habits?habits:'无'}}</span>
                  <span class="sick">并发症：{{sysIllnessHistoryNameBpConcurrent?sysIllnessHistoryNameBpConcurrent:'无'}}</span>
                </div>
                <div>
                  <span>检查项目：{{checkItem?checkItem:'无'}}</span>
                </div>
              </div>
              <div class="sick-history-bottom">
                <!-- <router-link :to="{name:healthForm}" tag="a">体检表</router-link> -->
                <button @click="flupHistory"><span>随访记录</span></button>
                <!-- <button><span><router-link :to="{name:'healthForm'}" tag="span">体检表</router-link></span></button> -->
                <button @click="openChecklist"><span>检查单</span></button>
                <button @click="openDailyImg"><span>日常照片</span></button>
              </div>
            </div>
            <!-- 病人简历 end  -->
            <!-- 病历卡 -->
            <card
            @preBtn="changePage"
            :sickData="cardData"
            :totalPage="totalPage"
            v-if="showcard">
            </card>
            <!-- 面诊  -->
            <component
            ref="facediagnosis"
            v-if="!showcard"
            @complete="completeDiag"
            @openSickCard="openHistroyCard"
            @openchecklist="openChecklist"
            @faceData="setfaceData"
            :sickID="sickID" 
            :hospitalId="hospitalId"
            :is="face"></component>
            <!-- 病历卡 end-->
            <!-- 今日笔记 暂不显示-->
            <!-- <note
            :sickID="sickID" 
            :hospitalId="hospitalId">
            </note> -->
            <!-- 今日笔记 end-->

          </pane>
          <pane
          label="分析报告">
            <!-- <blood-cover :sickID="sickID" :hospitalId="hospitalId"></blood-cover> -->
            <!-- <bloodCover :sickID="sickID" :hospitalId="hospitalId"></bloodCover> -->
            <!-- 血压趋势 -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="bloodCover"></component>
            <!-- 血压分布 血压平均水平 血压直方图 血压与BMI -->
            <el-row :gutter="2">
              <el-col :span="12">

                <component :sickID="sickID" :hospitalId="hospitalId" :is="coverLine"></component>
              </el-col>
              <el-col :span="12">

                <component :sickID="sickID" :hospitalId="hospitalId" :is="coverBar"></component>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="12">

                <component :sickID="sickID" :hospitalId="hospitalId" :is="BMI"></component>
              </el-col>
              <el-col :span="12">

                <component :sickID="sickID" :hospitalId="hospitalId" :is="pie"></component>
              </el-col>
            </el-row>
            <!-- <component :sickID="sickID" :hospitalId="hospitalId" :is="report"></component> -->
            <!-- <component :sickID="sickID" :hospitalId="hospitalId" :is="report"></component> -->
            <!-- 24小时动态血压 -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="alldayheighblood"></component>
            
          </pane>
          <pane
          label="用药">
            <!-- <useDrug :sickID="sickID" :hospitalId="hospitalId"></useDrug> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="useDrug"></component>
          </pane>
          <!-- <pane
          label="心血管评估">
            <component :sickID="sickID" :hospitalId="hospitalId" :is="assessment"></component>
          </pane> -->
          <!-- <pane
          label="24小时动态血压">
            <component :sickID="sickID" :hospitalId="hospitalId" :is="alldayheighblood"></component>
          </pane> -->
          <!-- <pane -->
          <!-- label="分析报告"> -->
            <!-- <report :sickID="sickID" :hospitalId="hospitalId"></report> -->
            <!-- <component :sickID="sickID" :hospitalId="hospitalId" :is="report"></component> -->
          <!-- </pane> -->
          <pane
          label="原始数据">
            <!-- <original :sickID="sickID" :hospitalId="hospitalId"></original> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="original"></component>
          </pane>
        </tabs>
      </div>
    </div>

    <!-- 历史病历 -->
    <el-dialog
    :visible.sync="histroyCard"
    width="80%"
    :before-close="handleClose">
      <span slot="title" class="dialog-title">
        历史病历
      </span>
      <!-- 病人简历 start  -->
      <div class="open-sick-history">
        <div class="sick-history-top">
          <div>
            <span>身高：{{height?height:'无'}}</span>
            <span>体重：{{weight?weight:'无'}}</span>
          </div>
          <div>
            <span>病史：{{sysIllnessHistoryNameDisease?sysIllnessHistoryNameDisease:'无'}}</span>
            <span>遗传史：{{sysIllnessHistoryNameGenetic?sysIllnessHistoryNameGenetic:'无'}}</span>
          </div>
          <div>
            <span>生活习惯：{{habits?habits:'无'}}</span>
            <span class="sick">并发症：{{sysIllnessHistoryNameBpConcurrent?sysIllnessHistoryNameBpConcurrent:'无'}}</span>
          </div>
          <div>
            <span>检查项目：{{checkItem?checkItem:'无'}}</span>
          </div>
        </div>
        <div class="sick-history-bottom">
          <!-- <router-link :to="{name:healthForm}" tag="a">体检表</router-link> -->
          <!-- <button><span><router-link :to="{name:'healthForm'}" tag="span">体检表</router-link></span></button>
          <button><span>检查单</span></button> -->
        </div>
      </div>
      <!-- 病人简历 end  -->
      <!-- 病历卡 -->
      <card
      @preBtn="changePage"
      :sickData="cardData"
      :totalPage="totalPage"
      >
      </card>
    </el-dialog>
    <!-- 日常照片 -->
    <el-dialog
    :visible.sync="dailyImg"
    width="80%">
      <span slot="title" class="dialog-title">
        日常照片
      </span>
      <!-- 照片start  -->
      <div class="open-sick-history">
        <dailyImg :sickID="sickID"></dailyImg>
      </div>
      <!--  end  -->
      <!-- 病历卡 -->
    </el-dialog>
    <!-- 检查单 -->
    <el-dialog
    width="80%"
    :visible.sync="showchecklist"
    center>

      <span slot="title" class="dialog-title">
          检查单
      </span>
      <span slot="footer" v-if="checklist.length === 0 && faceDATA.userDetectReportList.length===0">
        暂无检查单
      </span>

      <div class="check-list" v-if="faceDATA.userDetectReportList.length !==0">
        <div v-for="(img,index) in faceDATA.userDetectReportList" :key="index">
          <img class="check-img" :src="img.url" alt="" @click="showchecklistimg(img.url)">
        </div>
        <div class="empty-div">
        </div>
        <div class="empty-div">
        </div>
        <div class="empty-div">
        </div>
      </div>
      <div class="check-list" v-else>
        <div v-for="(img,index) in checklist" :key="index">
          <img class="check-img" :src="img.url" alt="" @click="showchecklistimg(img.url)">
        </div>
        <div class="empty-div">
        </div>
        <div class="empty-div">
        </div>
        <div class="empty-div">
        </div>
      </div>
      <!-- v-if="showBigImg" -->
        <!-- <checkList
        :list="checklist" :row="true">

        </checkList> -->
    </el-dialog>
    <!-- 大图 -->
    <imgfloat
    :imgsrc="checklistimgUrl"
    v-if="showBigImg"
    @close="closeImgFloat"
    ref="checklistimg">
    </imgfloat>
  </div>
</template>

<script>
import sickcard from './../sickcard.vue'
import {bloodheighSickDataApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
import tabs from './../tabs.vue'
import pane from './../pane.vue'
import note from './../note.vue'
import bloodCover from './bloodCover'
import bloodTrendChart from './bloodTrendChart.vue'
import bloodPie from './bloodPie.vue'
import BMI from './BMI.vue'
import bloodAverageLine from './bloodAverageLine.vue'
import bloodAverageBar from './bloodAverageBar.vue'
import useDrug from './useDrug'
import assessment from './assessment'
import alldayheighblood from './alldayheighblood'
import report from './report'
import original from './original'
import card from './card'
import dailyImg from './dailyImg'
import healthForm from './../healthForm.vue'
import face from '@/components/BloodheighSickcard/facediagnosis'
// import checkList from '@/components/checklist'
import imgfloat from '@/components/imgFloat'
import session from '@/untils/session'
// import Bus from '@/bus.js'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    sickcard,
    tabs,
    pane,
    note,
    bloodCover,
    bloodTrendChart,
    bloodPie,
    BMI,
    bloodAverageLine,
    bloodAverageBar,
    useDrug,
    assessment,
    alldayheighblood,
    report,
    original,
    card,
    healthForm,
    face,
    // checkList,
    imgfloat,
    dailyImg
  },
  data () {
    return {
      faceDATA: {
        sex: null,
        age: null,
        mobile: null,
        // 面诊检查单图片列表
        userDetectReportList: []
      },
      // 大图url
      checklistimgUrl: '',
      // 体检单弹窗
      showchecklist: false,
      // 打开大图开关
      showBigImg: false,
      // 检查单图片列表
      checklist: [],
      cardArr: [],
      // 病历卡数据
      cardData: {},
      // 默认激活的tab
      activeIndex: 1,
      currentPage: 1,
      // 病历卡总页数
      totalPage: null,
      pageSize: 1,
      // pages: 0,
      // 显示糖尿病按钮
      isSugerHeigh: false,
      // 血压趋势组件
      bloodCover: '',
      // 用药组件
      useDrug: '',
      // 评估组件
      assessment: '',
      // 24小时动态血压组件
      alldayheighblood: '',
      // 血压图表组件
      report: '',
      // 原始数据组件
      original: '',
      // 病历卡 面诊时显示面诊
      showcard: true,
      // 历史病历弹窗开关
      histroyCard: false,
      huizhen: null,
      // 面诊组件
      face: null,
      // BMI组件
      BMI: '',
      // 血压平均line组件
      coverLine: '',
      // 血压平均bar组件
      coverBar: '',
      // 饼图与直方图组件
      pie: '',
      // sickID: null,
      // name: null,
      // adminHospitalId: null,
      adminIdMainDoctor: null,
      // 日常照片弹窗开关
      dailyImg: false
    }
  },
  methods: {
    ...mapMutations(['SET_SICK_CARD', 'SET_FLUP_INFO', 'changeCurrentSickInfo']),
    /**
     * @description 切换tab卡
     */
    tabs (index) {
      switch (index) {
        case 0:
          break
        case 1:
          // this.bloodCover = 'bloodCover'
          this.bloodCover = 'bloodTrendChart'
          // this.report = 'report'
          this.pie = 'bloodPie'
          this.BMI = 'BMI'
          this.coverLine = 'bloodAverageLine'
          this.coverBar = 'bloodAverageBar'
          this.alldayheighblood = 'alldayheighblood'
          break
        case 2:
          this.useDrug = 'useDrug'
          break
        case 3:
          this.original = 'original'
          break
        // case 3:
        //   this.assessment = 'assessment'
        //   break
        // case 4:
        //   this.alldayheighblood = 'alldayheighblood'
        //   break
        // case 4:
        //   this.original = 'original'
        //   break
        // case 6:
        //   break
      }
    },
    /**
     * @param {number} 选择的索引
     * @description 选择tab
     */
    changeTab (index) {
      this.tabs(index)
      session('sickcardTabIndex', index)
      // console.log('sessionsickcardTabIndex', session('sickcardTabIndex'))
    },
    // 选择糖尿病
    checkSuger () {
    },
    /**
     * @param {number} currentpage 当前页数
     * @description 病历卡翻页
     */
    changePage (currentpage) {
      this.currentPage = currentpage
      this.getCardData()
    },
    /**
     * @description 获取病历卡信息
     */
    getCardData () {
      // let vm = this

      let params = {
        userId: this.sickID,
        adminHospitalId: this.hospitalId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$axios(bloodheighSickDataApi(params))
      .then(res => {
        this.checklist = []
        if (res.data) {
          if (res.data.data) {
            if (this._.has(res.data.data, 'adminIdDoctor')) {
              this.adminIdDoctor = res.data.data.adminIdDoctor
            } else {
              this.adminIdDoctor = ''
            }

            this.totalPage = res.data.pages
            console.log('病历卡总页数', this.totalPage)
            if (res.data.data.length !== 0) {
              this.cardData = Object.assign({}, {})
              this.cardData = Object.assign({}, res.data.data[0])
              // this.showcard = true
              console.log('病历卡信息', this.cardData)
            }
            if (this._.has(res.data.data[0], 'userDetectReportList')) {
              if (res.data.data[0].userDetectReportList.length > 0) {
                // let list = []
                res.data.data[0].userDetectReportList.forEach(item => {
                  let obj = {}
                  obj.url = process.env.IMG_URL + item.reportUrl
                  obj.id = item.id
                  this.checklist.push(obj)
                })
              }
            }
            this.changeCurrentSickInfo(res.data.data[0])
            // console.log('病历卡体检单', res.data.data[0])
            console.log('病历卡体检单', this.checklist)
          }
        }
      })
    },
    /**
     * @description 设置面诊数据
     */
    setfaceData (val) {
      // this.sex = val.sex
      // this.age = val.age
      // this.mobile = val.mobile
      this.faceDATA = val
    },
    /**
     * @description 完成问诊
     */
    completeDiag () {
      this.getCardData()
      this.showcard = true
    },
    /**
     * @description 打开历史病历弹窗
     */
    openHistroyCard () {
      this.histroyCard = true
    },
    /**
     * @description 关闭历史病历弹窗
     */
    handleClose () {
      this.histroyCard = false
    },
    /**
     * @description 关闭大图
     */
    closeImgFloat () {
      this.showBigImg = false
    },
    /**
     * @description 打开检查按列表
     */
    openChecklist () {
      this.showchecklist = true
    },
    /**
     * @param {string} 打开图片url
     * @description 打开检查单大图
     */
    showchecklistimg (url) {
      this.checklistimgUrl = url
      // Bus.$emit('showbigimg')
      // let vm = this
      this.showBigImg = true
      console.log('打开大图？', this.showBigImg)
      // this.$nextTick(function () {
      //   vm.$refs.checklistimg.showBig()
      // })
      // this.$refs.checklistimg.showBig()
    },
    /**
     * @description 跳转随访页面
     */
    flupHistory () {
      let obj = {}
      obj.isFollowUp = true
      obj.adminIdMainDoctor = this.adminIdMainDoctor
      obj.userId = this.sickID
      obj.userName = this.name
      obj.adminHospitalId = this.hospitalId
      obj.userFollowUpId = null
      obj.userHealthDiaryId = null
      this.SET_FLUP_INFO(obj)
      console.log('随访', obj)
      this.$router.push({
        name: 'FlupCard'
      })
    },
    /**
     * @description 打开日常照片弹窗
     */
    openDailyImg () {
      this.dailyImg = true
    }
  },
  computed: {
    ...mapState(['showSickCard', 'currentSickData']),
    sickID () {
      return this.currentSickData.sickID
      // return this.$route.params.sickID
    },
    hospitalId () {
      return this.currentSickData.hospitalId
      // return this.$route.params.hospitalId
    },
    // 姓名
    name () {
      if (this.cardData) {
        if (this.cardData.realName) {
          return this.cardData.realName
        } else {
          return this.$route.params.name
        }
      }
    },
    // 性别
    sex: {
      get: function () {
        if (this.cardData) {
          if (this.cardData.sex === 1) {
            return '男'
          }
          if (this.cardData.sex === 0) {
            return '女'
          }
        }
      },
      set: function (newval) {
        return newval
      }
    },
    // 年龄
    age: {

      get: function () {
        if (this.cardData) {
          if (this.cardData.age) {
            return this.cardData.age + '岁'
          }
        }
      },
      set: function (newval) {
        return newval
      }
    },
    // 电话
    mobile: {
      get: function () {
        if (this.cardData) {
          if (this.cardData.mobile) {
            return this.cardData.mobile
          }
        }
      },
      set: function (newval) {
        console.log('newvalmobile', newval)
        // this.mobile = newval
        return newval
      }
    },
    // 医生诊断
    doctorDiagnos () {
      if (this.cardData) {
        if (this.cardData.doctorDiagnos) {
          return this.cardData.doctorDiagnos
        }
      }
    },
    // 身高
    height () {
      if (this.cardData) {
        if (this.cardData.height) {
          return this.cardData.height + 'cm'
        }
      }
    },
    // 体重
    weight () {
      if (this.cardData) {
        if (this.cardData.weight) {
          return this.cardData.weight + 'kg'
        }
      }
    },
    // 疾病史
    sysIllnessHistoryNameDisease () {
      if (this.cardData) {
        if (this.cardData.sysIllnessHistoryNameDisease) {
          return this.cardData.sysIllnessHistoryNameDisease
        }
      }
    },
    // 家族遗传史
    sysIllnessHistoryNameGenetic () {
      if (this.cardData) {
        if (this.cardData.sysIllnessHistoryNameGenetic) {
          return this.cardData.sysIllnessHistoryNameGenetic
        }
      }
    },
    // 生活喜好
    habits () {
      let habits = []
      let str = ''
      if (this.cardData) {
        if (this.cardData.highSaltStatus === 1) {
          habits.push('长期膳食高盐')
        }
        if (this.cardData.highSaltStatus === 2) {
          habits.push('无长期膳食高盐')
        }
        if (this.cardData.sleepStatus === 1) {
          habits.push('睡眠规律')
        }
        if (this.cardData.sleepStatus === 2) {
          habits.push('睡眠不规律')
        }
        if (this.cardData.smoking === 1) {
          habits.push('抽烟')
        }
        if (this.cardData.smoking === 2) {
          habits.push('不抽烟')
        }
        if (this.cardData.smoking === 3) {
          habits.push('已戒烟')
        }
        if (this.cardData.is23Sleep === 0) {
          habits.push('23点前睡觉')
        }
        if (this.cardData.is23Sleep === 1) {
          habits.push('没有23点前睡觉')
        }
        if (this.cardData.dietStatus === 1) {
          habits.push('饮食规律')
        }
        if (this.cardData.dietStatus === 2) {
          habits.push('饮食不规律')
        }
        if (this.cardData.medicineStatus === 1) {
          habits.push('长期服用止痛药或镇定催眠药')
        }
        if (this.cardData.medicineStatus === 2) {
          habits.push('没有长期服用止痛药或镇定催眠药')
        }
        if (this.cardData.urineStatus === 1) {
          habits.push('大小便正常')
        }
        if (this.cardData.urineStatus === 2) {
          habits.push('大小便不正常')
        }
        if (this.cardData.drinking === 1) {
          habits.push('从不饮酒')
        }
        if (this.cardData.drinking === 2) {
          habits.push('偶尔饮酒')
        }
        if (this.cardData.drinking === 3) {
          habits.push('经常饮酒')
        }
        if (this.cardData.drinking === 4) {
          habits.push('每天饮酒')
        }
      }
      if (habits.length !== 0) {
        str = habits.join('、')
      }
      return str
    },
    // 血压并发症
    sysIllnessHistoryNameBpConcurrent () {
      if (this.cardData) {
        if (this.cardData.sysIllnessHistoryNameBpConcurrent) {
          return this.cardData.sysIllnessHistoryNameBpConcurrent
        }
      }
    },
    checkItem () {
      if (this.cardData) {
        if (this.cardData.checkItem) {
          return this.cardData.checkItem
        }
      } else {
        return ''
      }
    },
    createTime () {
      if (this.cardData) {
        if (this.cardData.createTime) {
          return this.cardData.createTime
        }
      }
    }
  },
  watch: {
    // 监控病历卡显示
    showSickCard: {
      handler: function (newval, oldval) {
        if (newval) {
          console.log('this.showcard', this.showcard, 'val', newval)
          this.showcard = false
        } else {
          console.log('newval', newval)
          // this.showcard = true
          console.log('this.showcard1', this.showcard, 'val1', newval)
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    if (session('sickcardTabIndex')) {
      this.activeIndex = parseInt(session('sickcardTabIndex')) + 1
    }
    this.getCardData()
  },
  mounted () {
    let vm = this
    vm.face = face
    // this.SET_SICK_CARD(false)
    // Bus.$on('huizhen', function () {
    //   vm.huizhen = true
    //   vm.showcard = false
    //   // vm.getCardData()
    //   console.log('huizhen1', vm.showcard)
    // console.log('name', vm.name, this.$route.params.name)
    // })
  }
}
</script>

<style scoped>
.dialog-title{
  display: inline-block;
  text-align: center;
  width: 100%;
  font-size: 24px;
}
.fixed {
  width: 16.66667%;
  position: fixed;
  right: -28px;
  top: 280px;
  text-align: center;
  }
  .fixed p{
    margin: 5px;
    width: 110px;
  }
  /* .el-carousel__arrow{
      top:10% !important;
  } */
  .right-nav{
    display: flex;
    /* justify-content: flex-start; */
    align-items: flex-start;
    flex-direction: column;
    width: 110px;
  }
  .sick-card-center{
    border: 1px solid #5555;
    border-radius: 5px;
    padding:10px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .table{
    border: 1px solid #5555;
    width: 100%;
    border-collapse:collapse;
    margin-bottom: 10px;
  }
  .table th{
    border: 1px solid #5555;
    padding: 5px;
    /* width: 100%; */
  }
  .table td{
    border: 1px solid #5555;
    padding: 5px;
    /* border: none; */
    /* padding: 0; */
    /* width: 100%; */
  }
  /* .textv{
    writing-mode: tb-rl;
    -webkit-writing-mode: vertical-rl;      
    writing-mode: vertical-rl;
    *writing-mode: tb-rl;
  } */
  .sick-card-head{
    /* min-width: 1250px; */
    /* width: 100%; */
    background-color:#fff;
    padding:30px 20px 30px 30px;
    /* box-shadow: 2px 2px 2px 2px #0000000d; */
  }
  .sick-card-head p{
    margin:0;
    padding:0;
    /* width: 100%; */
  }
  .sick-card-head-left{
    /* float: left; */
    /* width: 70%; */
    color:#666;
    font-size:14px;
  }
  .sick-card-head-left-msg{
    margin-top:10px;
  }
  .sick-card-head-left-msg span{
    margin-top:5px;
  }
  .sick-card-head-left span{
    /* display:inline-block; */
    margin-right:20px;
    width: 100%;
    word-wrap: break-word;
    line-height: 1.5;
  }
  .sick-card-head-right{
    text-align: right;
  }
  .name{
    font-size:32px;
    color:#041421;
  }
  .clear::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .sick{
    color:#e87070;
  }
  .sick-history{
    background-color:#fff;
    padding-left:38px;
    padding-top:24px;
    padding-bottom:24px;
    font-size:14px;
    line-height:28px;
    color:#666;
    margin-bottom: 8px;
  }
  .open-sick-history{
    background-color:#fff;
    padding-left:38px;
    margin-top:-24px;
    padding-bottom:24px;
    font-size:14px;
    line-height:28px;
    color:#666;
    margin-bottom: 8px;
  }
  .sick-history-top span{
    display: inline-block;
    margin-right:20px;
    position: relative;
  }
  .sick-history-top span:after{
    position: absolute;
    content:"";
    display: block;
    width:8px;
    height: 8px;
    border-radius:50%;
    background-color:#1991fc;
    left:-12px;
    top:10px;
  }
  .sick-history-bottom{
    color:#1991fc;
  }
  .sick-history-bottom button{
    margin:0;
    padding:0;
    border:none;
    background-color:#fff;
    cursor: pointer;
    font-size:16px;
    color:#1991fc;
    margin-right:30px;
    outline:none;
  }
  .sick-history-bottom button:nth-child(1) span{
    position: relative;
  }
  .sick-history-bottom button:nth-child(1) span:before{
    position: absolute;
    content:"";
    display: block;
    width:14px;
    height: 16px;
    background:url("~icon/hospital-icon-29.png") no-repeat;
    left:-16px;
    top:1px;
  }
  .sick-history-bottom button:nth-child(2) span{
    position: relative;
  }
  .sick-history-bottom button:nth-child(2) span:before{
    position: absolute;
    content:"";
    display: block;
    width:14px;
    height: 16px;
    background:url("~icon/hospital-icon-30.png") no-repeat;
    left:-16px;
    top:1px;
  }
  .sick-history-bottom button:nth-child(3) span{
    position: relative;
  }
  .sick-history-bottom button:nth-child(3) span:before{
    position: absolute;
    content:"";
    display: block;
    width:14px;
    height: 16px;
    background:url("~icon/hospital-icon-29.png") no-repeat;
    left:-16px;
    top:1px;
  }
  .check-list{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  .check-list div{
    padding: 15px;
    width: 25%;
  }
  .check-img{
    width: 100%;
    cursor: pointer;
  }
  .empty-div{
    width: 25%;
    height: 0;
  }
</style>
