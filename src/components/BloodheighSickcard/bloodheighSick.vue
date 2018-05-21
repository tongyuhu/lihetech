<template>
  <div ref="sickcard">
    <!-- {{showcard}} -->
    <!-- 头部 -->
    <div class="sick-card-head clear">
      <div class="sick-card-head-left">
        <p class="name">{{name}}</p>
        <div class="sick-card-head-left-msg">
          <span>性别:{{sex}}</span>
          <span>年龄:{{age}}</span>
          <span>电话:{{mobile}}</span>
          <span class="sick">确诊为:{{doctorDiagnos ? doctorDiagnos:'暂时没有确诊'}}</span>
        </div>
      </div>
      <div class="sick-card-head-right">
        <p>{{createTime}}</p>
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="clear">
      <div class="tabs">
        <tabs
        v-model="activeIndex"
        :hassuger="isSugerHeigh"
        @checkSuger="checkSuger"
        @checkd="changeTab">
          <pane
          label="病历" >
            <!-- 病人简历 start  -->
            <div class="sick-history" v-show="showcard">
              <div class="sick-history-top">
                <div>
                  <span>身高：{{height}}</span>
                  <span>体重：{{weight}}</span>
                </div>
                <div>
                  <span>病史：{{sysIllnessHistoryNameDisease}}</span>
                  <span>遗传史：{{sysIllnessHistoryNameGenetic}}</span>
                </div>
                <div>
                  <span>生活习惯：{{habits}}</span>
                  <span class="sick">并发症：{{sysIllnessHistoryNameBpConcurrent}}</span>
                </div>
                <div>
                  <span>检查项目：心电图、肾脏</span>
                </div>
              </div>
              <div class="sick-history-bottom">
                <!-- <router-link :to="{name:healthForm}" tag="a">体检表</router-link> -->
                <button><span><router-link :to="{name:'healthForm'}" tag="span">体检表</router-link></span></button>
                <button><span>检查单</span></button>
              </div>
            </div>
            <!-- 病人简历 end  -->
            <!-- 病历卡 -->
            <card
            @preBtn="changePage"
            :sickData="cardData"
            :totalPage="totalPage"
            v-show="showcard">
            </card>
            <component
            v-show="!showcard"
            @complete="completeDiag"
            @openSickCard="openHistroyCard"
            :sickID="sickID" 
            :hospitalId="hospitalId"
            :name="name"
            :sex="sex"
            :age="age"
            :mobile="mobile"
            :doctorDiagnos="doctorDiagnos"
            :heigh="height"
            :weight="weight"
            :sysIllnessHistoryNameDisease="sysIllnessHistoryNameDisease"
            :sysIllnessHistoryNameGenetic="sysIllnessHistoryNameGenetic"
            :habits="habits"
            :sysIllnessHistoryNameBpConcurrent="sysIllnessHistoryNameBpConcurrent"
            :is="face"></component>
            <!-- 病历卡 end-->
            <!-- 今日笔记 -->
            <note
            :sickID="sickID" 
            :hospitalId="hospitalId"></note>
            <!-- 今日笔记 end-->

          </pane>
          <pane
          label="分析报告">
            <!-- <blood-cover :sickID="sickID" :hospitalId="hospitalId"></blood-cover> -->
            <!-- <bloodCover :sickID="sickID" :hospitalId="hospitalId"></bloodCover> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="bloodCover"></component>
            <component :sickID="sickID" :hospitalId="hospitalId" :is="report"></component>
          </pane>
          <pane
          label="用药">
            <!-- <useDrug :sickID="sickID" :hospitalId="hospitalId"></useDrug> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="useDrug"></component>
          </pane>
          <pane
          label="心血管评估">
            <!-- <assessment :sickID="sickID" :hospitalId="hospitalId"></assessment> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="assessment"></component>
          </pane>
          <pane
          label="24小时动态血压">
            <!-- <alldayheighblood :sickID="sickID" :hospitalId="hospitalId"></alldayheighblood> -->
            <component :sickID="sickID" :hospitalId="hospitalId" :is="alldayheighblood"></component>
          </pane>
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
            <span>身高：{{height}}</span>
            <span>体重：{{weight}}</span>
          </div>
          <div>
            <span>病史：{{sysIllnessHistoryNameDisease}}</span>
            <span>遗传史：{{sysIllnessHistoryNameGenetic}}</span>
          </div>
          <div>
            <span>生活习惯：{{habits}}</span>
            <span class="sick">并发症：{{sysIllnessHistoryNameBpConcurrent}}</span>
          </div>
          <div>
            <span>检查项目：心电图、肾脏</span>
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
  </div>
</template>

<script>
import sickcard from './../sickcard.vue'
import {bloodheighSickDataApi} from '@/api/components/BloodheighSickcard/bloodheighSick'
import tabs from './../tabs.vue'
import pane from './../pane.vue'
import note from './../note.vue'
import bloodCover from './bloodCover'
import useDrug from './useDrug'
import assessment from './assessment'
import alldayheighblood from './alldayheighblood'
import report from './report'
import original from './original'
import card from './card'
import healthForm from './../healthForm.vue'
import face from '@/components/BloodheighSickcard/facediagnosis'
// import Bus from '@/bus.js'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    sickcard,
    tabs,
    pane,
    note,
    bloodCover,
    useDrug,
    assessment,
    alldayheighblood,
    report,
    original,
    card,
    healthForm,
    face
  },
  data () {
    return {
      cardArr: [],
      cardData: {},
      activeIndex: 1,
      currentPage: 1,
      totalPage: null,
      pageSize: 1,
      // pages: 0,
      isSugerHeigh: false,
      bloodCover: '',
      useDrug: '',
      assessment: '',
      alldayheighblood: '',
      report: '',
      original: '',
      showcard: true,
      histroyCard: false,
      huizhen: null,
      face: null
    }
  },
  methods: {
    ...mapMutations(['SET_SICK_CARD']),
    tabs (index) {
      switch (index) {
        case 0:
          break
        case 1:
          this.bloodCover = 'bloodCover'
          this.report = 'report'
          break
        case 2:
          this.useDrug = 'useDrug'
          break
        case 3:
          this.assessment = 'assessment'
          break
        case 4:
          this.alldayheighblood = 'alldayheighblood'
          break
        case 5:
          this.original = 'original'
          break
        case 6:
          break
      }
    },
    changeTab (index) {
      this.tabs(index)
    },
    checkSuger () {
    },
    changePage (currentpage) {
      this.currentPage = currentpage
      this.getCardData()
      console.log(currentpage)
    },
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
        if (res.data) {
          if (res.data.data) {
            this.totalPage = res.data.pages
            if (this.totalPage < 1) {
              // console.log('page', this.totalPage)
              this.showcard = false
              this.SET_SICK_CARD(true)
            }
              // this.pages =
            this.SET_SICK_CARD(false)
            if (res.data.data.length !== 0) {
              this.cardData = Object.assign({}, {})
              this.cardData = Object.assign({}, res.data.data[0])
              // this.showcard = true
              console.log(this.cardData)
            }
          }
        }
      })
    },
    completeDiag () {
      this.showcard = true
    },
    openHistroyCard () {
      this.histroyCard = true
    },
    handleClose () {
      this.histroyCard = false
    }
  },
  computed: {
    ...mapState(['showSickCard']),
    sickID () {
      return this.$route.params.sickID
    },
    hospitalId () {
      return this.$route.params.hospitalId
    },
    // 姓名
    name () {
      if (this.cardData) {
        if (this.cardData.realName) {
          return this.cardData.realName
        }
      }
    },
    // 性别
    sex () {
      if (this.cardData) {
        if (this.cardData.sex === 1) {
          return '男'
        }
        if (this.cardData.sex === 0) {
          return '女'
        }
      }
    },
    // 年龄
    age () {
      if (this.cardData) {
        if (this.cardData.age) {
          return this.cardData.age + '岁'
        }
      }
    },
    // 电话
    mobile () {
      if (this.cardData) {
        if (this.cardData.mobile) {
          return this.cardData.mobile
        }
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
    createTime () {
      if (this.cardData) {
        if (this.cardData.createTime) {
          return this.cardData.createTime
        }
      }
    }
  },
  watch: {
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
    this.getCardData()
  },
  mounted () {
    let vm = this
    this.face = face
    // this.SET_SICK_CARD(false)
    // Bus.$on('huizhen', function () {
    //   vm.huizhen = true
    //   vm.showcard = false
    //   // vm.getCardData()
    //   console.log('huizhen1', vm.showcard)
    //   console.log('huizhen', vm.huizhen)
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
    background-color:#fff;
    padding:30px 20px 30px 30px;
    box-shadow: 2px 2px 2px 2px #0000000d;
  }
  .sick-card-head p{
    margin:0;
    padding:0;
    /* width: 100%; */
  }
  .sick-card-head-left{
    float: left;
    color:#666;
    font-size:14px;
  }
  .sick-card-head-left-msg{
    margin-top:10px;
  }
  .sick-card-head-left span{
    display:inline-block;
    margin-right:30px;
  }
  .sick-card-head-right{
    float: right;
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

</style>
