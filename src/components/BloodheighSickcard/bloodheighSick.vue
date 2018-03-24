<template>
  <div>
    <!-- 头部 -->
    <div class="sick-card-head clear">
      <div class="sick-card-head-left">
        <p class="name">{{name}}</p>
        <div class="sick-card-head-left-msg">
          <span>性别:{{sex}}</span>
          <span>年龄:{{age}}</span>
          <span>电话:{{mobile}}</span>
          <span class="sick">确诊为:{{doctorDiagnos}}</span>
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
        v-model="activeKey"
        :hassuger="isSugerHeigh"
        @checkSuger="checkSuger">
          <pane
          label="病历(远程)" name="1">
            <!-- 病人简历 start  -->
            <div class="sick-history">
              <div class="sick-history-top">
                <div>
                  <span>身高：{{height}}cm</span>
                  <span>体重：{{weight}}kg</span>
                </div>
                <div>
                  <span>病史：{{illnessHistoryIdDisease}}</span>
                  <span>遗传史：{{illnessHistoryIdGenetic}}</span>
                </div>
                <div>
                  <span>生活习惯：不抽烟 喝酒</span>
                  <span class="sick">并发症：{{illnessHistoryIdConcurrent}}</span>
                </div>
                <div>
                  <span>检查项目：心电图、肾脏</span>
                </div>
              </div>
              <div class="sick-history-bottom">
                <button><span>体检表</span></button>
                <button><span>检查单</span></button>
              </div>
            </div>
            <!-- 病人简历 end  -->
            <!-- 病历卡 -->
            <card
            @preBtn="changePage"
            :sickData="cardData"
            :totalPage="totalPage">
            </card>
            <!-- 病历卡 end-->
            <!-- 今日笔记 -->
            <note></note>
            <!-- 今日笔记 end-->

          </pane>
          <pane
          label="血压分布" name="2">
            <blood-cover :sickID="sickID" :hospitalId="hospitalId"></blood-cover>
          </pane>
          <pane
          label="用药" name="3">
            <useDrug :sickID="sickID" :hospitalId="hospitalId"></useDrug>
          </pane>
          <pane
          label="心血管评估" name="4">
          <assessment :sickID="sickID" :hospitalId="hospitalId"></assessment>
          </pane>
          <pane
          label="24小时动态血压" name="5">
          <alldayheighblood :sickID="sickID" :hospitalId="hospitalId"></alldayheighblood>
          </pane>
          <pane
          label="分析报告" name="6">
          <report :sickID="sickID" :hospitalId="hospitalId"></report>
          </pane>
          <pane
          label="原始数据" name="7">
          <original :sickID="sickID" :hospitalId="hospitalId"></original>
          </pane>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import sickcard from './../sickcard.vue'
import {bloodheighSickDataApi} from './../../api/components/BloodheighSickcard/bloodheighSick'
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
    card
  },
  data () {
    return {
      cardArr: [],
      cardData: {},
      activeKey: '1',
      currentPage: 1,
      totalPage: null,
      pageSize: 1,
      isSugerHeigh: false
    }
  },
  methods: {
    checkSuger () {

    },
    changePage (currentpage) {
      this.currentPage = currentpage
      this.getCardData()
      // console.log(currentpage)
    },
    getCardData () {
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
            if (res.data.data.length !== 0) {
              this.totalPage = res.data.pages
              this.$set(this.cardArr, this.currentPage - 1, res.data.data[0])
              // this.cardArr[this.currentPage - 1] = res.data.data
              this.cardData = this.cardArr[this.currentPage - 1]
              // console.log('arr', this.cardArr)
              // console.log(this.cardData)
            }
          }
        }
      })
    }
  },
  computed: {
    sickID () {
      return this.$route.params.sickID
    },
    hospitalId () {
      return this.$route.params.hospitalId
    },
    name () {
      if (this.cardData) {
        if (this.cardData.realName) {
          return this.cardData.realName
        }
      }
    },
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
    age () {
      if (this.cardData) {
        if (this.cardData.age) {
          return this.cardData.age + '岁'
        }
      }
    },
    mobile () {
      if (this.cardData) {
        if (this.cardData.mobile) {
          return this.cardData.mobile
        }
      }
    },
    doctorDiagnos () {
      if (this.cardData) {
        if (this.cardData.doctorDiagnos) {
          return this.cardData.doctorDiagnos
        }
      }
    },
    height () {
      if (this.cardData) {
        if (this.cardData.height) {
          return this.cardData.height + 'cm'
        }
      }
    },
    weight () {
      if (this.cardData) {
        if (this.cardData.weight) {
          return this.cardData.weight + 'kg'
        }
      }
    },
    illnessHistoryIdDisease () {
      if (this.cardData) {
        if (this.cardData.illnessHistoryIdDisease) {
          return this.cardData.illnessHistoryIdDisease
        }
      }
    },
    illnessHistoryIdGenetic () {
      if (this.cardData) {
        if (this.cardData.illnessHistoryIdGenetic) {
          return this.cardData.illnessHistoryIdGenetic
        }
      }
    },
    habits () {
      let habits = []
      let str = ''
      if (this.cardData) {
        if (this.cardData.highSaltStatus === 1) {
          habits.push('长期膳食高盐')
        }
        if (this.cardData.highSaltStatus === 2) {
          habits.push('不长期膳食高盐')
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
        str = habits.join(',')
      }
      return str
    },
    illnessHistoryIdConcurrent () {
      if (this.cardData) {
        if (this.cardData.illnessHistoryIdConcurrent) {
          return this.cardData.illnessHistoryIdConcurrent
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
  mounted () {
    this.getCardData()
  }
}
</script>

<style scoped>
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
    font-size:14px;
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
    background:url("./../../../诊所-高血压/hospitalIcon/诊所-icon-29.png") no-repeat;
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
    background:url("./../../../诊所-高血压/hospitalIcon/诊所-icon-30.png") no-repeat;
    left:-16px;
    top:1px;
  }

</style>
