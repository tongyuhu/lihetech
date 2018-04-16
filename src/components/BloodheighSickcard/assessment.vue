<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div class="card-header">
        <p class="title">心血管评估</p>
      </div>
      <div class="table">
        <table>
          <tr>
            <th width="150px">行为指数</th>
            <th>
              图形
            </th>
            <th>
              实际图形
            </th>
            <th>
              症状
            </th>
          </tr>
          <tr>
            <td class="icon-normal">
              {{sysTypeName}}</td>
            <td>
              <img :src="sysSimpleImage" alt="暂无波形图" width="200px">
            </td>
            <td>
              <img :src="sysBpImage" alt="暂无波形图" width="200px">
            </td>
            
            <td>
              <p>{{sysImageAnalyze}}</p>
            </td>
          </tr>
          <tr>
            <td class="icon-self">{{userTypeName}}</td>
            <td class="img">
              <img :src="userSimpleImage" alt="暂无波形图" width="200px">
            </td>
            <td>
              <img :src="userBpImage" alt="暂无波形图" width="200px">
            </td>
            <td>
              <p>{{userImageAnalyze}}</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="report-box clear">
        <div class="report">
          <p>您当前血压KSG图：<span class="red-text">{{userTypeName}}</span> </p>
          <p>病情预估：<span class="red-text">{{userConditionPredict}}</span></p>
          <p>心血管疾病评估未来十年风险：<span class="red-text a-text blod-text">{{dangerRate}}</span></p>
        </div>
        <div class="report">
          <p class="blod-text">分析信息</p>
          <p>{{sysConditionPredict}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import tiane from 'icon/诊所-icon-48.png'
import truetiane from 'icon/诊所-icon-58.png'
import pingtan from 'icon/诊所-icon-49.png'
import truepingtan from 'icon/诊所-icon-59.png'
import shuangfeng from 'icon/诊所-icon-50.png'
import trueshuangfeng from 'icon/诊所-icon-60.png'
import buzheng from 'icon/诊所-icon-51.png'
import truebuzheng from 'icon/诊所-icon-61.png'
import quexue from 'icon/诊所-icon-52.png'
import truequexue from 'icon/诊所-icon-62.png'
import {assessmentApi} from './../../api/components/BloodheighSickcard/assessment'
export default {
  props: {
    sickID: {
      default: 0
    },
    hospitalId: {
      default: 0
    }
  },
  data () {
    return {
      'tiane': tiane,
      'truetiane': truetiane,
      'pingtan': pingtan,
      'truepingtan': truepingtan,
      'shuangfeng': shuangfeng,
      'trueshuangfeng': trueshuangfeng,
      'buzheng': buzheng,
      'truebuzheng': truebuzheng,
      'quexue': quexue,
      'truequexue': truequexue,
      userTypeName: '',
      userImageAnalyze: '',
      userConditionPredict: '',
      userSimpleImage: '',
      userBpImage: '',
      dangerRate: '',
      sysSimpleImage: '',
      sysBpImage: '',
      sysConditionPredict: '',
      sysImageAnalyze: '',
      sysTypeName: ''
    }
  },
  methods: {
    img (value) {
      let img = ''
      if (value === '天鹅型') {
        img = this.tiane
      }
      if (value === '平坦型') {
        img = this.pingtan
      }
      if (value === '双峰型') {
        img = this.shuangfeng
      }
      if (value === '不整型') {
        img = this.buzheng
      }
      if (value === '缺血型') {
        img = this.quexue
      }
      return img
    },
    trueimg (value) {
      let img = ''
      if (value === '天鹅型') {
        img = this.truetiane
      }
      if (value === '平坦型') {
        img = this.truepingtan
      }
      if (value === '双峰型') {
        img = this.trueshuangfeng
      }
      if (value === '不整型') {
        img = this.truebuzheng
      }
      if (value === '缺血型') {
        img = this.truequexue
      }
      return img
    },
    getAssessmentData () {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId
      }
      this.$axios(assessmentApi(params))
      .then(res => {
        if (res.data.data) {
          if (res.data.data.userDoubleArm) {
            if (res.data.data.userDoubleArm.typeName) {
              this.userTypeName = res.data.data.userDoubleArm.typeName || ''
            }
            if (res.data.data.userDoubleArm.conditionPredict) {
              this.userImageAnalyze = res.data.data.userDoubleArm.conditionPredict || ''
            }
            if (res.data.data.userDoubleArm.imageAnalyze) {
              this.userConditionPredict = res.data.data.userDoubleArm.imageAnalyze || ''
            }
            if (res.data.data.userDoubleArm.simpleImage) {
              this.userSimpleImage = process.env.IMG_URL + res.data.data.userDoubleArm.simpleImage || ''
            }
            if (res.data.data.userDoubleArm.bpImage) {
              this.userBpImage = process.env.IMG_URL + res.data.data.userDoubleArm.bpImage || ''
            }
          }
          if (res.data.data.ICVDRisk) {
            this.dangerRate = res.data.data.ICVDRisk + '%' || ''
          }
          if (res.data.data.sysDoubleArm) {
            if (res.data.data.sysDoubleArm.conditionPredict) {
              this.sysConditionPredict = res.data.data.sysDoubleArm.conditionPredict || ''
            }
            if (res.data.data.sysDoubleArm.imageAnalyze) {
              this.sysImageAnalyze = res.data.data.sysDoubleArm.imageAnalyze || ''
            }
            if (res.data.data.sysDoubleArm.typeName) {
              this.sysTypeName = res.data.data.sysDoubleArm.typeName || ''
            }
            if (res.data.data.sysDoubleArm.simpleImage) {
              this.sysSimpleImage = process.env.IMG_URL + res.data.data.sysDoubleArm.simpleImage || ''
            }
            if (res.data.data.sysDoubleArm.originalImage) {
              this.sysBpImage = process.env.IMG_URL + res.data.data.sysDoubleArm.originalImage || ''
            }
          }
        }
      })
    }
  },
  mounted () {
    this.getAssessmentData()
  }
}
</script>

<style scoped>
  .title{
    /* margin-left:20px; */
    margin-top:24px;
    margin-bottom:2px;
    font-size:20px;
    color:#666
  }
  .card-header{
    margin: 0 20px 0 20px;
    border-bottom:1px solid #ebeef5;
    height: 28px;
  }
   table{
    /* height: 200px; */
    border:1px solid #eaeaea;
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    width: 100%;
  }
  table th{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    color: #041421;
  }
  table td{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
  }
  .red-text{
    color:#e87070;
  }
  table p{
    font-size: 14px;
    color: #666;
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
  }
  .table{
    margin-top:20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .icon-normal{
    position: relative;
  }
  .icon-normal::after{
    top: 0;
    left: 0;
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 25px solid transparent;
    border-left: 25px solid #1991fc;
    border-top: 25px solid #1991fc;
    z-index: 1;
  }
  .icon-normal::before{
    position: absolute;
    display: inline-block;
    content: "标准";
    width: 20px; 
    height: 20px; 
    top:0;
    left:0;
    z-index: 99;
    font-size: 14px;
    color: #fff;
    padding:3px;
  }
  .icon-self{
    position: relative;
  }
  .icon-self::after{
    top: 0;
    left: 0;
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 25px solid transparent;
    border-left: 25px solid #1991fc;
    border-top: 25px solid #1991fc;
    z-index: 1;
  }
  .icon-self::before{
    position: absolute;
    display: inline-block;
    content: "您";
    width: 20px; 
    height: 20px; 
    top:0;
    left:0;
    z-index: 99;
    font-size: 14px;
    color: #fff;
    padding:5px;
  }
  .report-box{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
  }
  .report-box p{
    color: #666;
    font-size: 14px;
    line-height: 24px;
  }
  .report-box div:nth-child(2){
    margin-bottom: 24px;
  }
  .report{
    /* float: left; */
    border: 1px #eaeaea solid;
    border-radius: 5px;
    margin-top:12px;
    padding: 10px;
  }
  .red-text{
    color: #e87070;
  }
  .blod-text{
    font-weight: bold;
  }
  .a-text{
    font-size: 24px;
  }
  .img{
    min-width: 80px;
  }
  .img img{
    min-width: 50px;
  }
</style>
