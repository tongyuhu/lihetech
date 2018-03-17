<template>
  <div>
    <!-- 头部 -->
    <div class="sick-card-head clear">
      <div class="sick-card-head-left">
        <p class="name">{{name}}</p>
        <div class="sick-card-head-left-msg">
          <span>性别:{{sex}}</span>
          <span>年龄:{{age}}岁</span>
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
        :hassuger="true"
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
            <!-- <Fcard>
              <Fcard-item v-for="(item,index) in sickCard" :key="item.index">
                <sickcard
                :index="index"
                :totalCard="sickCard.length"
                >
                </sickcard>
              </Fcard-item>
            </Fcard> -->
            <Fcarousel :cardsData="cardData"></Fcarousel>
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
            <useDrug></useDrug>
          </pane>
          <pane
          label="心血管评估" name="4">
          <assessment></assessment>
          </pane>
          <pane
          label="24小时动态血压" name="5">
          <alldayheighblood></alldayheighblood>
          </pane>
          <pane
          label="分析报告" name="6">
          <report></report>
          </pane>
          <pane
          label="原始数据" name="7">
          <original></original>
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
import Fcard from './../Fcard.vue'
import FcardItem from './../FcardItem.vue'
import note from './../note.vue'
import bloodCover from './bloodCover'
import useDrug from './useDrug'
import assessment from './assessment'
import alldayheighblood from './alldayheighblood'
import report from './report'
import original from './original'
import Fcarousel from './../Fcarousel'
export default {
  components: {
    sickcard,
    tabs,
    pane,
    Fcard,
    FcardItem,
    note,
    bloodCover,
    useDrug,
    assessment,
    alldayheighblood,
    report,
    original,
    Fcarousel
  },
  data () {
    return {
      cardData: {},
      autoplay: false,
      sickInfo: [],
      sickBasics: {
        method: 1,
        name: '毛健康',
        sex: 1,
        age: 56,
        sick: '原发性高血压'
      },
      activeKey: '1',
      sickCard: [1, 2, 3, 4, 5],
      currentPage: 1,
      pageSize: 1,
      // sickID: ''
      // sickInfo: this.$route.params.sickInfo
      // name: this.$route.params.sickInfo.name

      // 整理后数据
      name: '',  // 姓名
      age: '', // 年龄
      sex: '', // 性别
      mobile: '', // 电话
      height: '', // 身高
      weight: '', // 体重
      doctorDiagnos: '', // 医生诊断
      illnessHistoryIdDisease: '', // 疾病史id集合
      illnessHistoryIdGenetic: '', // 家族遗传病史 id集合
      smoking: null, // 抽烟情况 1：是、2：否、3：已戒烟
      is23Sleep: null, // 是否23点前睡觉 0-否 1-是
      dietStatus: null, // 饮食是否规律 1：是、2：否
      medicineStatus: null, // 是否长期服用止痛药或镇定催眠药 1：是、2：否
      urineStatus: null, // 大小便是否正常 1：是、2：否
      drinking: null, // 饮酒情况 1：从不、2：偶尔、3：经常、4：每天
      illnessHistoryIdConcurrent: '', // 并发症
      createTime: '' // 创建时间
    }
  },
  methods: {
    checkSuger () {

    },
    getSickCardData () {
      let obj = {
        userId: this.sickID,
        adminHospitalId: this.hospitalId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$axios(bloodheighSickDataApi(obj)).then(res => {
        this.cardData = res
        this.name = res.data.data[this.currentPage - 1].realName
        this.age = res.data.data[this.currentPage - 1].age
        this.sex = res.data.data[this.currentPage - 1].sex
        this.mobile = res.data.data[this.currentPage - 1].mobile
        this.height = res.data.data[this.currentPage - 1].height
        this.weight = res.data.data[this.currentPage - 1].weight
        this.doctorDiagnos = res.data.data[this.currentPage - 1].doctorDiagnos
        this.illnessHistoryIdDisease = res.data.data[this.currentPage - 1].illnessHistoryIdDisease
        this.illnessHistoryIdGenetic = res.data.data[this.currentPage - 1].illnessHistoryIdGenetic
        this.smoking = res.data.data[this.currentPage - 1].smoking
        this.is23Sleep = res.data.data[this.currentPage - 1].is23Sleep
        this.dietStatus = res.data.data[this.currentPage - 1].dietStatus
        this.medicineStatus = res.data.data[this.currentPage - 1].medicineStatus
        this.urineStatus = res.data.data[this.currentPage - 1].urineStatus
        this.drinking = res.data.data[this.currentPage - 1].drinking
        this.illnessHistoryIdConcurrent = res.data.data[this.currentPage - 1].illnessHistoryIdConcurrent
        this.createTime = res.data.data[this.currentPage - 1].createTime

        // console.log(res)
      })
    }

  },
  computed: {
    // sex () {
    //   if (this.sickBasics.sex === 0) {
    //     return '女'
    //   } else {
    //     return '男'
    //   }
    // },
    sickID () {
      return this.$route.params.sickID
    },
    hospitalId () {
      return this.$route.params.hospitalId
    }
  },
  mounted () {
    this.getSickCardData()
    this.$axios(bloodheighSickDataApi(this.sickID))
    .then((response) => {
      this.sickInfo = response.data.sickList[0]
    })
    .catch(err => {
      return err
    })
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
