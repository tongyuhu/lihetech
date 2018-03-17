<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">

      <div class="card-header">
        <p class="title">心血管评估</p>
      </div>
      <div class="table">
        <table>
          <tr>
            <th>行为指数</th>
            <th>
              <p>图形</p>
            </th>
            <th>
              <p>实际图形</p>
            </th>
            <th>
              <p>症状</p>
            </th>
          </tr>
          <tr>
            <td class="icon-normal">
              天鹅型</td>
            <td>
              <img :src="pingtan" alt="">
            </td>
            <td>
              <img :src="truepingtan" alt="">
            </td>
            <td>
              <p>正常 非动脉硬化型高血压</p>
            </td>
          </tr>
          <tr>
            <td class="icon-self">天鹅型</td>
            <td>
              <img :src="tiane" alt="">
            </td>
            <td>
              <img :src="truetiane" alt="">
            </td>
            <td>
              <p>正常 非动脉硬化型高血压</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="report-box clear">
        <div class="report">
          <p>您当前血压KSG图：<span class="red-text">双峰型</span> </p>
          <p>病情预估：<span class="red-text"> 心脏疾病、年轻型高血压、肾性高血压、本态性高血压</span></p>
          <p>心血管疾病评估未来十年风险：<span class="red-text a-text blod-text">0.38%</span></p>
        </div>
        <div class="report">
          <p class="blod-text">分析信息</p>
          <p>您当前血压控制较好，可每日适当提升自己的运动量，但不要做高强度运动</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import tiane from './../../../诊所-高血压/hospitalIcon/诊所-icon-48.png'
import truetiane from './../../../诊所-高血压/hospitalIcon/诊所-icon-58.png'
import pingtan from './../../../诊所-高血压/hospitalIcon/诊所-icon-49.png'
import truepingtan from './../../../诊所-高血压/hospitalIcon/诊所-icon-59.png'
import shuangfeng from './../../../诊所-高血压/hospitalIcon/诊所-icon-50.png'
import trueshuangfeng from './../../../诊所-高血压/hospitalIcon/诊所-icon-60.png'
import buzheng from './../../../诊所-高血压/hospitalIcon/诊所-icon-51.png'
import truebuzheng from './../../../诊所-高血压/hospitalIcon/诊所-icon-61.png'
import quexue from './../../../诊所-高血压/hospitalIcon/诊所-icon-52.png'
import truequexue from './../../../诊所-高血压/hospitalIcon/诊所-icon-62.png'
export default {
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
      'truequexue': truequexue
    }
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
</style>
