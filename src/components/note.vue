<template>
  <div>
    <div class="table-top clear">
      <span class="table-top-span">今日笔记</span>
      <span>{{noteDate}}</span>
      <span class="check-date">
      
      <el-date-picker
        v-model="noteDate"
        type="date"
        placeholder="选择日期"
        size="mini"
        value-format="yyyy-MM-dd"
        :clearable = "false"
        :style="{'width':'150px'}">
      </el-date-picker>
      </span>
    </div>
    <div class="table">
      <table>
        <tr>
          <th>笔记种类</th>
          <th>医生建议</th>
          <th>实际</th>
          <th>评分</th>
        </tr>
        <tr>
          <th>饮食</th>
          <td>
            <!-- <p>早餐：蔬菜 水果 524千卡</p>
            <p>午餐：蔬菜 水果 524千卡</p>
            <p>晚餐：蔬菜 水果 524千卡</p> -->
            <p>暂无数据</p>
          </td>
          <td>
            <!-- <p></p> -->
            <p>
              <span>

              </span>
              {{morning.foodName !=='' ? '早餐：'+morning.foodName:''}}
              {{morning.caloriesTotal !== '' ?' ' +morning.caloriesTotal+'千卡':'暂无数据'}} </p>
            <p>{{noon.foodName!=='' ? '午餐：'+noon.foodName:''}} {{noon.caloriesTotal !== '' ?' '+noon.caloriesTotal+'千卡':'暂无数据'}} </p>
            <p>{{night.foodName!=='' ? '晚餐：'+night.foodName:''}} {{night.caloriesTotal !== '' ?' ' +night.caloriesTotal+'千卡':'暂无数据'}} </p>
            <!-- <p>{{morning !==undefined ? '早餐：'+morning.foodName+' ' +morning.caloriesTotal+'千卡':'暂无数据'}} </p>
            <p>{{noon!==undefined ? '午餐：'+noon.foodName+ ' '+noon.caloriesTotal+'千卡':'暂无数据'}} </p>
            <p>{{night!==undefined ? '晚餐：'+night.foodName+' ' +night.caloriesTotal+'千卡':'暂无数据'}} </p> -->
            <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
            <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
          </td>
          <td>
            <!-- <p>-3</p>
            <p>-8</p>
            <p>-5</p> -->
            <p>{{userScore.foodScore}}</p>
          </td>
        </tr>
        <tr>
          <th>运动</th>
          <td>
            <!-- <p v-show="userMove.length !==0" v-for="sport in userMove" :key="sport.id">
              {{sport.planName +' '+ sport.movementTime +'分钟 '+ sport.caloriesTotal}}
            </p> -->
            <p>暂无数据</p>
            <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
          </td>
          <td>
            <p v-show="userMove.length !==0" v-for="sport in userMove" :key="sport.id">
              {{sport.planName +' '+ sport.movementTime +'分钟 '+ sport.caloriesTotal+'千卡'}}
            </p>
            <p v-show="userMove.length ===0">暂无数据</p>
          </td>
          <td>
            <p>{{userScore.movementScore}}</p>
            <!-- <p>-8</p> -->
            <!-- <p>-5</p> -->
          </td>
        </tr>
        <tr>
          <th>用药</th>
          <td>
            <div>
              <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
              <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
              <!-- <p>早餐：蔬菜 水果 524千卡</p> -->
              <p>暂无数据</p>
            </div>
            <!-- <p></p> -->
          </td>
          <td>
            <p v-show="userMedicine.length !==0" v-for="medicine in userMedicine" :key="medicine.id">
              {{medicine.medicineName +' 共'+ medicine.everyDosageSum + medicine.unit}}
            </p>
            <p v-show="userMedicine.length ===0">暂无数据</p>
          </td>
          <td>
            <p v-show="userMedicine.length !==0" v-for="medicine in userMedicine" :key="medicine.id">
              {{medicine.achieveStatus}}
            </p>
            <p v-show="userMedicine.length ===0">暂无数据</p>
          </td>
        </tr>
        <tr>
          <th>体重</th>
          <td>
            <p>暂无数据</p>
            
          </td>
          <td>
            <p>{{userWeight.weight==='暂无数据'?userWeight.weight:userWeight.weight+'kg'}}</p>
            <p>BMI: {{userWeight.bmi}}</p>
          </td>
          <td>
            <p>
              {{userWeight.bmiType}}
            </p>
            <!-- <p :class="{'red-text':true}">未遵医嘱
              </p> -->
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {dateFormat} from '@/untils/date.js'
import {noteApi} from '@/api/components/note.js'
export default {
  name: 'note',
  props: {
    sickID: '',
    hospitalId: ''
  },
  data () {
    return {
      noteDate: '',
      userFood: [],
      morning: {
        foodName: '',
        caloriesTotal: ''
      },
      noon: {
        foodName: '',
        caloriesTotal: ''
      },
      night: {
        foodName: '',
        caloriesTotal: ''
      },
      userMove: [],
      userWeight: {
        'weight': '暂无数据',
        'bmiType': 0,
        'bmi': '暂无数据'
      },
      userMedicine: [],
      userScore: {
        'medicationScore': '暂无分数',
        'foodScore': '暂无分数',
        'movementScore': '暂无分数',
        'testingNumberScore': '暂无分数',
        'buckBrowseScore': '暂无分数',
        'currentTotalScore': '暂无分数'
      }
    }
  },
  methods: {
    getData (data) {
      let parmas = {
        userId: this.sickID,
        adminHospitalId: this.hospitalId,
        time: data
      }
      this.$axios(noteApi(parmas))
      .then(res => {
        if (res.data.data) {
          this.userScore = {
            'medicationScore': '暂无分数',
            'foodScore': '暂无分数',
            'movementScore': '暂无分数',
            'testingNumberScore': '暂无分数',
            'buckBrowseScore': '暂无分数',
            'currentTotalScore': '暂无分数'
          }
          this.userWeight = {
            'weight': '暂无数据',
            'bmiType': 0,
            'bmi': '暂无数据'
          }
          // this.userFood = res.data.data.
          this.morning = {
            foodName: '',
            caloriesTotal: ''
          }
          this.noon = {
            foodName: '',
            caloriesTotal: ''
          }
          this.night = {
            foodName: '',
            caloriesTotal: ''
          }
          if (res.data.data.foodList.length > 0) {
            res.data.data.foodList.forEach(item => {
              if (item.biteTime === 1) {
                // this.set
                this.morning.foodName = item.foodName
                this.morning.caloriesTotal = item.caloriesTotal
              }
              if (item.biteTime === 2) {
                // this.set
                this.noon.foodName = item.foodName
                this.noon.caloriesTotal = item.caloriesTotal
              }
              if (item.biteTime === 3) {
                // this.set
                this.night.foodName = item.foodName
                this.night.caloriesTotal = item.caloriesTotal
              }
            })
          }
          this.userMove = res.data.data.moveList
          // res.data.data.body.forEach(item => {
          if (this._.has(res.data.data.body, 'bmiType')) {
            let type = this._.toNumber(res.data.data.body.bmiType)
            if (type === 0) {
              res.data.data.body.bmiType = '暂无数据'
            }
            if (type === 1) {
              res.data.data.body.bmiType = '消瘦 '
            }
            if (type === 2) {
              res.data.data.body.bmiType = '消瘦'
            }
            if (type === 3) {
              res.data.data.body.bmiType = '超重'
            }
            if (type === 4) {
              res.data.data.body.bmiType = '肥胖'
            }
          }
          // })
          this.userWeight = res.data.data.body
          res.data.data.medicineList.forEach(item => {
            if (this._.has(item, 'achieveStatus')) {
              let type = this._.toNumber(item.achieveStatus)
              if (type === 0) {
                item.achieveStatus = '未完成'
              }
              if (type === 1) {
                item.achieveStatus = '完成'
              }
              if (type === 2) {
                item.achieveStatus = '未记录'
              }
            }
          })
          this.userMedicine = res.data.data.medicineList
          this._.merge(this.userScore, res.data.data.score)
          // this.userScore = res.data.data.score
        }
      })
    }
  },
  watch: {
    noteDate: {
      handler: function (val) {
        if (this._.gt(val, dateFormat(Date(), 0, true))) {
          this.noteDate = dateFormat(Date(), 0, true)
        }
        this.getData(val)
      },
      immediate: false
    }
  },
  mounted () {
    this.noteDate = dateFormat(Date(), 0, true)
    // console.log(this.noteDate)
  }
}
</script>

<style scoped>
  .table-top{
    height: 46px;
    padding-top:16px;
    padding-left: 200px;
    /* line-height: 62px; */
    text-align: center;
    font-size: 14px;
    color:#666;
    background-color: #fff;
  }
  .table-top-span{
    font-size: 20px;
    color:#041421;
    /* line-height: 28px; */
    vertical-align:baseline;
    /* padding-top:5px; */
  }
  .check-date{
    display: inline-block;
    padding-right: 50px;
    float: right;
  }
  .table{
    padding: 0 50px 24px 50px;
    background-color: #fff;
  }
  table{
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
</style>
