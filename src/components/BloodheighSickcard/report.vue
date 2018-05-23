<template>
  <div>
    <div class="margin-bottom">
      <el-row :gutter="8">
        <!-- 血压分布  -->
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压分布</p>
            </div>
            <div class="check-date">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in coverChecked.date" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="iscoverChecked(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div>
            <div
            id='bloodCover'
            :style="{width:'auto',height:'300px'}"
            >
            </div>
          </el-card>
        </el-col>
        <!-- 血压直方图 -->
        <el-col :span="12">
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压直方图</p>
            </div>
            <div class="check-date">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in histogramChecked.date" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="isHistogramChecked(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div>
            <!-- <div id='bloodAverage'  :style="{width:'auto',height:'250px'}"></div> -->
            <div id='bloodHistogram'  :style="{width:'auto',height:'300px'}"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="8">
      <el-col :span="12">
        <!-- 血压与饮食 -->
        <div>
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压与饮食</p>
            </div>
            <!-- <div class="check-date" v-show="false">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in bloodfoodChecked.date" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="isfoodChecked(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div> -->
            <div>
              <el-row type="flex">
                <!-- <el-col >
                  <div id='bloodFood' :style="{width:'auto',height:'700px'}"></div>
                </el-col> -->
                <!-- <el-col :span="3"> -->
                  <!-- <div class="middle-wrap">
                    <div class="middle">
                      <div class="checked-kaluli">
                        <span class="check-all-span">
                          <button class="check-all-btn" @click="isFoodKaluliChecked()">
                            <span :class="{'check-all-btn-icon':!bloodfoodChecked.kaluli,'check-all-btn-icon-active':bloodfoodChecked.kaluli}"></span>
                            <span>卡路里</span>
                          </button>
                        </span>
                      </div>
                      <div class="checked-score">
                        <span class="check-all-span">
                          <button class="check-all-btn" @click="isFoodScoreChecked()">
                            <span :class="{'check-all-btn-icon':!bloodfoodChecked.score,'check-all-btn-icon-active':bloodfoodChecked.score}"></span>
                            <span>分数</span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div> -->
                <!-- </el-col> -->
                <div class="flex">
                  <div class="flex-btn-left" v-show="foodBtnPre">
                    <el-button @click="bloodFoodPer" icon="el-icon-arrow-left"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                  </div>
                  <div class="chart-min-width kaluli-wrap">
                    <div class="kaluli-btn-wrap">
                      <button class="check-all-btn" @click="isFoodKaluliChecked()">
                        <span :class="{'check-all-btn-icon':!bloodfoodChecked.kaluli,'check-all-btn-icon-active':bloodfoodChecked.kaluli}"></span>
                        <span>卡路里</span>
                      </button>
                      <button class="check-all-btn" @click="isFoodScoreChecked()">
                        <span :class="{'check-all-btn-icon':!bloodfoodChecked.score,'check-all-btn-icon-active':bloodfoodChecked.score}"></span>
                        <span>分数</span>
                      </button>
                    </div>
                    <div id='bloodFood' :style="{width:'auto',height:'700px'}"></div>
                  </div>
                  <div class="flex-btn" v-show="foodBtnNext">
                    <el-button @click="bloodFoodNext" icon="el-icon-arrow-right"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                  </div>
                </div>
              </el-row>
            </div>
          </el-card>
        </div>

      </el-col>

      <el-col :span="12">
        <!-- 血压与运动 -->
        <div>
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-header">
                <p class="title">血压与运动</p>
            </div>
            <div class="check-date" v-show="false">
              <el-row type="flex" justify="start">
                <button v-for="(item,index) in bloodsportChecked.date" 
                :key="item.date" 
                class="check-date-btn" 
                :class="{checked:item.isChecked}" 
                @click="issportChecked(item,index)">
                  {{item.date}}
                </button>
              </el-row>
            </div>
            <div>
              <el-row type="flex">
                <!-- <el-col>
                  <div id='bloodSport' :style="{width:'auto',height:'700px'}"></div>
                </el-col>
                <el-col :span="3">
                  <div class="middle-wrap">
                    <div class="middle">
                      <div class="checked-kaluli">
                        <span class="check-all-span">
                          <button class="check-all-btn" @click="issSportKaluliChecked()">
                            <span :class="{'check-all-btn-icon':!bloodsportChecked.kaluli,'check-all-btn-icon-active':bloodsportChecked.kaluli}"></span>
                            <span>卡路里</span>
                          </button>
                        </span>
                      </div>
                      <div class="checked-score">
                        <span class="check-all-span">
                          <button class="check-all-btn" @click="isSportScoreChecked()">
                            <span :class="{'check-all-btn-icon':!bloodsportChecked.score,'check-all-btn-icon-active':bloodsportChecked.score}"></span>
                            <span>分数</span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </el-col> -->
                <div class="flex">
                  <div class="flex-btn-left">
                    <el-button v-show="sportBtnPre" @click="bloodSportPer" icon="el-icon-arrow-left"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                  </div>
                  <div class="chart-min-width kaluli-wrap">
                    <div class="kaluli-btn-wrap">
                      <button class="check-all-btn" @click="issSportKaluliChecked()">
                        <span :class="{'check-all-btn-icon':!bloodsportChecked.kaluli,'check-all-btn-icon-active':bloodsportChecked.kaluli}"></span>
                        <span>卡路里</span>
                      </button>
                      <button class="check-all-btn" @click="isSportScoreChecked()">
                        <span :class="{'check-all-btn-icon':!bloodsportChecked.score,'check-all-btn-icon-active':bloodsportChecked.score}"></span>
                        <span>分数</span>
                      </button>
                    </div>
                    <div id='bloodSport' :style="{width:'auto',height:'700px'}"></div>
                  </div>
                  <div class="flex-btn">
                    <el-button v-show="sportBtnNext" @click="bloodSportNext" icon="el-icon-arrow-right"  type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                  </div>
                </div>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import {bloodCoverApi, histogramApi, bloodfoodApi, bloodsportApi} from './../../api/components/BloodheighSickcard/report'
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
      isChecked: false,
      checkDate: [
        {
          date: '一周',
          value: 'lately',
          isChecked: false
        },
        {
          date: '两周',
          value: 'day',
          isChecked: false
        },
        {
          date: '一个月',
          value: 'week',
          isChecked: false
        },
        {
          date: '三个月',
          value: 'month',
          isChecked: false
        },
        {
          date: '自定义',
          value: 'year',
          isChecked: false
        }
      ],
      Data: [
        {value: 335, name: '正常'},
        {value: 310, name: '偏高'},
        {value: 234, name: '高'},
        {value: 135, name: '危险'}
      ],
      coverChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        dateChecked: ''
      },
      coverData: [],
      histogramChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        dateChecked: ''
      },
      histogramData: [],
      bloodfoodChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        kaluli: false,
        score: false,
        dateChecked: ''
      },
      bloodfoodData: {
        x: [],
        systolic: [],
        diastolic: [],
        foodScore: [],
        calories: [],
        bpType: [],
        pages: 1,
        pageNum: 1,
        currentPage: 1
      },
      foodBtnPre: true,
      foodBtnNext: true,
      bloodsportChecked: {
        date: [
          {
            date: '一周',
            value: 'oneweek',
            isChecked: false
          },
          {
            date: '两周',
            value: 'twoweek',
            isChecked: false
          },
          {
            date: '一个月',
            value: 'onemonth',
            isChecked: false
          },
          {
            date: '三个月',
            value: 'threemonth',
            isChecked: false
          }
        ],
        kaluli: false,
        score: false,
        dateChecked: ''
      },
      bloodsportData: {
        x: [],
        systolic: [],
        diastolic: [],
        bpType: [],
        movementScore: [],
        calories: [],
        pages: 1,
        pageNum: 1,
        currentPage: 1
      },
      sportBtnPre: true,
      sportBtnNext: true
    }
  },
  methods: {
    iscoverChecked (date, index) {
      this.coverChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.coverChecked.date[index].isChecked = true
      this.updateCover(date.value)
    },
    // 如果是选择固定时间 date 为按钮的value
    // 如果是自定义时间段 date 为起始时间 enddate为结束时间
    updateCover (date, enddate) {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId
      }
      let dateParams = {
        label: '',
        value: '',
        endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }
      this.$axios(bloodCoverApi(params, dateParams))
      .then(res => {
        if (res.data.data) {
          this.coverData = []
          for (let data in res.data.data) {
            this.$set(this.coverData, data, res.data.data[data])
          }
          console.log(this.coverData)
          // console.log(1, res.data.data)
        }
        let bloodCover = echarts.init(document.getElementById('bloodCover'))
        bloodCover.setOption(this.bloodCoverOption())
      })
    },
    /**
     * @description 整理图表数据
     * @param obj
     * @returns Array
     * */
    formatCoverData (data) {
      let vm = this
      if (data.length !== 5) {
        let a = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 1)
        })
        let b = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 2)
        })
        let c = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 3)
        })
        let d = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 4)
        })
        let e = this._.findIndex(data, function (item) {
          return vm._.toNumber(item.bpType === 5)
        })
        if (a === -1) {
          data.splice(0, 0, {
            'bpType': 1,
            'countBest': 0
          })
        }
        if (b === -1) {
          data.splice(1, 0, {
            'bpType': 2,
            'countBest': 0
          })
        }
        if (c === -1) {
          data.splice(2, 0, {
            'bpType': 3,
            'countBest': 0
          })
        }
        if (d === -1) {
          data.splice(3, 0, {
            'bpType': 4,
            'countBest': 0
          })
        }
        if (e === -1) {
          data.splice(4, 0, {
            'bpType': 5,
            'countBest': 0
          })
        }
      }
      let arr = []
      data.forEach(item => {
        if (this._.toNumber(item.bpType) === 1) {
          arr.push({value: item.countBest, name: '正常'})
        }
        if (this._.toNumber(item.bpType) === 2) {
          arr.push({value: item.countBest, name: '正常高值'})
        }
        if (this._.toNumber(item.bpType) === 3) {
          arr.push({value: item.countBest, name: '轻度'})
        }
        if (this._.toNumber(item.bpType) === 4) {
          arr.push({value: item.countBest, name: '中度'})
        }
        if (this._.toNumber(item.bpType) === 5) {
          arr.push({value: item.countBest, name: '危险'})
        }
      })
      let namearr = ['正常', '正常高值', '轻度', '中度', '危险']
      if (arr.length !== 5) {
        arr.forEach(item => {
          if (item.name === '正常' || '正常高值' || '轻度' || '中度' || '危险') {
            namearr = this._.filter(namearr, function (val) {
              return val !== item.name
            })
          }
        })
        namearr.forEach(item => {
          arr.push({value: 0, name: item})
        })
      }
      return arr
    },
    isHistogramChecked (date, index) {
      this.histogramChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.histogramChecked.date[index].isChecked = true
      this.updateHistogram(date.value)
    },
    updateHistogram (date, enddate) {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId
      }
      let dateParams = {
        label: '',
        value: '',
        endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }
      this.$axios(histogramApi(params, dateParams))
      .then(res => {
        if (res.data) {
          if (res.data.data) {
            this.histogramData = []
            res.data.data.forEach((item, index) => {
              this.$set(this.histogramData, index, item)
            })
          }
        }
        let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
        bloodHistogram.setOption(this.bloodHistogramOption())
      })
    },
    formatHistogram (data) {
      let arr = []
      if (data.length !== 0) {
        data.forEach(item => {
          let arr1 = []
          arr1.push(item['diastolic'])
          arr1.push(item['systolic'])
          arr1.push(item['measureTime'])
          arr.push(arr1)
        })
      }
      return arr
    },
    isfoodChecked (date, index) {
      this.bloodfoodChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.bloodfoodChecked.date[index].isChecked = true
      this.updateFood(date.value)
    },
    isFoodKaluliChecked () {
      if (this.bloodfoodChecked.kaluli || !this.bloodfoodChecked.kaluli) {
        this.bloodfoodChecked.kaluli = true
        this.bloodfoodChecked.score = false
      }
      if (this.bloodfoodChecked.kaluli && !this.bloodfoodChecked.score) {
        let bloodFood = echarts.init(document.getElementById('bloodFood'))
        let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
        // if (this.bloodfoodChecked.kaluli) {
        bloodFood.setOption(this.bloodFoodOption('kaluli', position.start, position.end))
        // }
        // if (this.bloodfoodChecked.score) {
        //   bloodFood.setOption(this.bloodFoodOption('score', position.start, position.end))
        // }
        // bloodFood.setOption(this.bloodFoodOption('kaluli'))
        // this.bloodFoodOption()
      }
    },
    isFoodScoreChecked () {
      if (!this.bloodfoodChecked.kaluli || this.bloodfoodChecked.kaluli) {
        this.bloodfoodChecked.kaluli = false
        this.bloodfoodChecked.score = true
      }
      if (!this.bloodfoodChecked.kaluli && this.bloodfoodChecked.score) {
        let bloodFood = echarts.init(document.getElementById('bloodFood'))
        // bloodFood.setOption(this.bloodFoodOption('score'))
        let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
          // if (vm.bloodfoodChecked.kaluli) {
            // bloodFood.setOption(vm.bloodFoodOption('kaluli', position.start, position.end))
          // }
          // if (vm.bloodfoodChecked.score) {
        bloodFood.setOption(this.bloodFoodOption('score', position.start, position.end))
          // }
        // this.bloodFoodOption('score')
      }
    },
    updateFood (date, enddate) {
      // if(pageNum){
      //   this.bloodfoodData.pageNum =
      // }
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId,
        'pageNum': this.bloodfoodData.pageNum,
        'pageSize': 10
      }
      let dateParams = {
        label: '',
        value: ''
        // endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }
      this.$axios(bloodfoodApi(params, dateParams))
      .then(res => {
        if (res.data) {
          this.bloodfoodData.pages = res.data.pages
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.calories) {
                  item.calories = 0
                }
                if (!item.foodScore) {
                  item.foodScore = 0
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                this.bloodfoodData.x.push(item.createTime)
                this.bloodfoodData.systolic.push(item.systolic)
                this.bloodfoodData.diastolic.push(item.diastolic)
                this.bloodfoodData.foodScore.push(item.foodScore)
                this.bloodfoodData.calories.push(item.calories)
                this.bloodfoodData.bpType.push(item.bpType)
              })
            }
          }
        }
        let state = ''
        if (this.bloodfoodChecked.kaluli) {
          state = 'kaluli'
        }
        if (this.bloodfoodChecked.score) {
          state = 'score'
        }
        let bloodFood = echarts.init(document.getElementById('bloodFood'))
        let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
        bloodFood.setOption(this.bloodFoodOption(state, position.start, position.end))
      })
    },
    issportChecked (date, index) {
      this.bloodsportChecked.date.forEach(item => {
        item.isChecked = false
      })
      this.bloodsportChecked.date[index].isChecked = true
      this.updateSport(date.value)
    },
    issSportKaluliChecked () {
      if (this.bloodsportChecked.kaluli || !this.bloodsportChecked.kaluli) {
        this.bloodsportChecked.kaluli = true
        this.bloodsportChecked.score = false
      }
      if (this.bloodsportChecked.kaluli && !this.bloodsportChecked.score) {
        let bloodSport = echarts.init(document.getElementById('bloodSport'))
        let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
          // if (vm.bloodsportChecked.kaluli) {
        bloodSport.setOption(this.bloodSportOption('kaluli', position.start, position.end))
          // }
          // if (vm.bloodsportChecked.score) {
            // bloodSport.setOption(vm.bloodSportOption('score', position.start, position.end))
          // }
        // bloodSport.setOption(this.bloodSportOption('kaluli'))
      }
    },
    isSportScoreChecked () {
      if (!this.bloodsportChecked.kaluli || this.bloodsportChecked.kaluli) {
        this.bloodsportChecked.kaluli = false
        this.bloodsportChecked.score = true
      }
      if (!this.bloodsportChecked.kaluli && this.bloodsportChecked.score) {
        let bloodSport = echarts.init(document.getElementById('bloodSport'))
        let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
          // if (vm.bloodsportChecked.kaluli) {
            // bloodSport.setOption(vm.bloodSportOption('kaluli', position.start, position.end))
          // }
          // if (vm.bloodsportChecked.score) {
        bloodSport.setOption(this.bloodSportOption('score', position.start, position.end))
          // }
        // bloodSport.setOption(this.bloodSportOption('score'))
      }
    },
    checkAllHandle () {
      this.isChecked = !this.isChecked
    },
    updateSport (date, enddate) {
      let params = {
        'userId': this.sickID,
        'adminHospitalId': this.hospitalId,
        'pageNum': this.bloodsportData.pageNum,
        'pageSize': 10
      }
      let dateParams = {
        label: '',
        value: ''
        // endtime: null
      }
      let nowtime = new Date()
      // let nowtime = '2018-03-01'
      if (enddate) {
        dateParams = {
          label: '',
          value: date,
          endtime: enddate
        }
      } else {
        dateParams = {
          label: date,
          value: nowtime,
          endtime: null
        }
      }
      this.$axios(bloodsportApi(params, dateParams))
      .then(res => {
        if (res.data) {
          this.$set(this.bloodsportData, 'pages', res.data.pages)
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.calories) {
                  item.calories = 0
                }
                if (!item.movementScore) {
                  item.movementScore = 0
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                // this.$set(this.bloodsportData.x, index, item.createTime)
                // this.$set(this.bloodsportData.systolic, index, item.systolic)
                // this.$set(this.bloodsportData.diastolic, index, item.diastolic)
                // this.$set(this.bloodsportData.movementScore, index, item.movementScore)
                // this.$set(this.bloodsportData.calories, index, item.calories)
                this.bloodsportData.x.push(item.createTime)
                this.bloodsportData.systolic.push(item.systolic)
                this.bloodsportData.diastolic.push(item.diastolic)
                this.bloodsportData.movementScore.push(item.movementScore)
                this.bloodsportData.calories.push(item.calories)
                this.bloodsportData.bpType.push(item.bpType)
              })
            }
          }
        }
        let state = ''
        if (this.bloodsportChecked.kaluli) {
          state = 'kaluli'
        }
        if (this.bloodsportChecked.score) {
          state = 'score'
        }
        let bloodSport = echarts.init(document.getElementById('bloodSport'))
        let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
        bloodSport.setOption(this.bloodSportOption(state, position.start, position.end))
      })
    },
    changeStatus () {

    },
    updateDate (date, index) {
      this.checkDate.forEach(item => {
        item.isChecked = false
      })
      this.checkDate[index].isChecked = true
    },
    bloodCoverOption () {
      let vm = this
      let color = []
      let hascolor = ['#81cefc', '#7cedc4', '#f4e07a', '#ff947b', '#ff5252']
      let nullcolor = ['#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea']
      let count = 0
      this.formatCoverData(this.coverData).forEach((item) => {
        if (item.value === 0) {
          count++
        }
      })
      if (count !== 5) {
        color = hascolor
      } else {
        color = nullcolor
      }
      count = 0
      console.log('coverData', this.formatCoverData(this.coverData))
      return {
        color: color,
        legend: {
          orient: 'vertical',
          left: '50%',
          top: 'center',
          data: ['正常', '正常高值', '轻度', '中度', '危险'],
          selectedMode: false,
          // formatter: (name) => {
          //   let i = 0
          //   let num = ''
          //   if (this.coverData) {
          //     this.formatCoverData(this.coverData).forEach((item, index) => {
          //       if (item.name === name) {
          //         i = index
          //         return i
          //       }
          //     })
          //     num = this.formatCoverData(this.coverData)[i].value
          //   }
          //   return name + '（共' + num + '次）'
          // },
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 20,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        series: [
          {
            name: '高血压',
            type: 'pie',
            radius: '70%',
            center: ['25%', '50%'],
            stillShowZeroSum: true,
            data: this.formatCoverData(this.coverData),
            // data: [
            //     {value: 335, name: '正常'},
            // ],
            label: {
              normal: {
                position: 'inner',
                formatter: function (params) {
                  if (vm._.toNumber(params.value) === 0) {
                    return ''
                  } else {
                    return params.value + '%'
                  }
                },
                fontSize: 14
              }
            },
            labelLine: {
              normal: {
                // show: false
              }
            }
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 1,
            shadowOffsetX: 0,
            shadowColor: ''
          }
        }
      }
    },
    bloodHistogramOption () {
      // let areaColor = ['#33b2f2', '#59D8A1', '#efa13a', '#ff7d43', '#f96767']
      let areaColor = ['#0099FF', '#59D8A1', '#efa13a', '#ff7d43', '#e21b1b']
      return {
        color: ['#81cefc', '#7cedc4', '#f4e07a', '#ff947b', '#ff5252'],
        tooltip: {
          show: false
        },
        legend: {
          orient: 'vertical',
          right: '20',
          top: 'center',
          selectedMode: false,
          itemWidth: 20,
          itemHeight: 20,
          data: [
            {
              name: '正常',
              icon: 'roundRect'
            },
            {
              name: '正常高值',
              icon: 'roundRect'
            },
            {
              name: '轻度',
              icon: 'roundRect'
            },
            {
              name: '中度',
              icon: 'roundRect'
            },
            {
              name: '危险',
              icon: 'roundRect'
            }
          ]
        },
        grid: {
          left: '5%',
          right: '120',
          bottom: '24',
          top: '10',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          name: '低压（舒张压）',
          nameLocation: 'end',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 60,
          max: 120,
          minInterval: 10
        }],
        yAxis: [
          {
            type: 'value',
            name: '高压（收缩压）',
            nameLocation: 'end',
            minInterval: 10,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: 90
          }
        ],
        series: [
          {
            type: 'line',
            name: '正常',
            symbol: 'none',
            // stack: '堆叠',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[0]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[0]
              }
            },
            z: 10,
            connectNulls: true,
            data: [
                [0, 130],
                [85, 130],
                [85, 0]
            ]
          },
          {
            type: 'line',
            name: '正常高值',
            symbol: 'none',
            // stack: '堆叠',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[1]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[1]
              }
            },
            itemStyle: {},
            z: 9,
            connectNulls: true,
            step: true,
            data: [
                [0, 140],
                [90, 140],
                [90, 0]
            ]

          },
          {
            type: 'line',
            name: '轻度',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[2]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[2]
              }
            },
            z: 8,
            data: [
                [0, 160],
                [100, 160],
                [100, 0]
            ]
          },
          {
            type: 'line',
            name: '中度',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[3]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[3]
              }
            },
            z: 7,
            data: [
                [0, 180],
                [110, 180],
                [110, 0]
            ]
          },
          {
            type: 'line',
            name: '危险',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: areaColor[4]
              }
            },
            areaStyle: {
              normal: {
                color: areaColor[4]
              }
            },
            z: 1,
            data: [
                [0, 210],
                [120, 210],
                [120, 0]
            ]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
            z: 20,
            tooltip: {
              show: true,
              backgroundColor: 'rgba(250,250,250,0.7)',
              textStyle: {
                color: '#000'
              },
              triggerOn: 'click',
              formatter: function (a) {
                let low = ''
                let heigh = ''
                let time = ''
                if (a.data) {
                  if (a.data[0]) {
                    low = '低压:' + a.data[0]
                  }
                  if (a.data[1]) {
                    heigh = '高压:' + a.data[1]
                  }
                  if (a.data[2]) {
                    time = '时间:' + a.data[2] + '<br>'
                  }
                }
                return (
                time +
              low + '<br>' +
              heigh
                )
              }
            },
            data: this.formatHistogram(this.histogramData)

          // data: [
            //   [145, 119, '2018-01-08 18:48:16'],
            //   [165, 86, '2018-01-08 19:54:16'],
            //   [138, 67, '2018-01-05 21:54:16'],
            //   [120, 81, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [100, 83, '2018-02-03 16:09:48'],
            //   [185, 81, '2018-02-03 16:09:48']
            // ]

          }
        ]
      }
      // return option
    },
    bloodFoodOption (state, start, end) {
      let vm = this
      let x1 = ''
      let foodSeriesData = []
      let foodSeriesTitle = ''
      if (state === 'kaluli') {
        foodSeriesData = vm.bloodfoodData.calories
        foodSeriesTitle = '卡路里'
      } if (state === 'score') {
        foodSeriesData = vm.bloodfoodData.foodScore
        foodSeriesTitle = '分数'
      }
      let zoomstart = 0
      let zoomend = 100
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let option = {
        color: ['#8ecefc', 'e6f5fe', '8ecefc'],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            // disabled: false,
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 10,
            maxValueSpan: 10,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          // backgroundColor: '#B2DAFE',
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          // triggerOn: 'click',
          triggerOn: 'mousemove|click',
          formatter: function (a) {
            // return (
            //     a[0]['axisValueLabel'] + '<br>' +
            //     a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
            //     a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
            //     a[2]['seriesName'] + ': ' + a[2]['value']
            // )
            return (
                a[0]['axisValueLabel'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[2]['seriesName'] + ': ' + a[2]['value']
            )
          }
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: [
          { // 直角坐标系内绘图网格
            top: '5%',
            left: '90px',
            width: 'auto',
            height: 'auto',
            bottom: '55%',
            // top: '30px',
            // left: '60px',
            right: '80'
            // width: 'auto',
            // height: 'auto',
            // bottom: '90px'
          },
          {
            top: '55%',
            left: '90px',
            width: 'auto',
            height: 'auto',
            bottom: '40px',
            right: '80'
            // top: '30px',
            // left: '50%',
            // width: 'auto',
            // height: 'auto',
            // bottom: '90px'
          }
        ],
        xAxis: [
          { // 直角坐标系grid的x轴
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              show: false,
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              rotate: 0,
              formatter: function (val) {
                let value
                let time
                if (val.length > 11) {
                  time = val.slice(5, 10)
                  value = val.slice(11)
                } else {
                  time = val.slice(0, 4)
                  value = val.slice(5)
                }
                if (vm._.eq(time, x1)) {
                  x1 = time
                  return value
                } else {
                  let arr = []
                  arr.push(value)
                  arr.push(time)
                  x1 = time
                  return arr.join('\n')
                }
              }
              // rotate: 330
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            // min: 0,
            axisTick: {
              show: false
            },
            // 血压横坐标
            data: vm.bloodfoodData.x
          },
          { // 直角坐标系grid的x轴
            type: 'category',
            gridIndex: 1,
            boundaryGap: false,
            axisLabel: {
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              rotate: 0,
              formatter: function (val) {
                let value
                let time
                if (val.length > 11) {
                  time = val.slice(5, 10)
                  value = val.slice(11)
                } else {
                  time = val.slice(0, 4)
                  value = val.slice(5)
                }
                if (vm._.eq(time, x1)) {
                  x1 = time
                  return value
                } else {
                  let arr = []
                  arr.push(value)
                  arr.push(time)
                  x1 = time
                  return arr.join('\n')
                }
              }
              // rotate: 330
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            // 分数横坐标
            data: vm.bloodfoodData.x
          }
        ],
        yAxis: [
          { // 直角坐标系grid的y轴
            name: '血压',
            gridIndex: 0,
            nameLocation: 'end',
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: { // y轴网格显示
              show: true
            },
            nameTextStyle: { // 坐标轴名样式
              color: '#666',
              fontSize: 12,
              align: 'left'
            },
            boundaryGap: true,
            splitNumber: 3, // 坐标轴分割段数
            minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
            data: ['0', '120', '140', '180']
          },
          { // 直角坐标系grid的y轴
            name: foodSeriesTitle,
            gridIndex: 1,
            nameLocation: 'end',
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: { // y轴网格显示
              show: true
            },
            nameTextStyle: { // 坐标轴名样式
              color: '#666',
              fontSize: 12,
              align: 'left'
            },
            boundaryGap: true,
            splitNumber: 3, // 坐标轴分割段数
            minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
            data: ['0', '120', '140', '180']
          }
        ],
        series: [
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '舒张压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#32b77a'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodfoodData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: vm.bloodfoodData.diastolic
          },
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '收缩压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodfoodData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#def3f2',
            //     origin: 'auto',
            //     shadowColor: '#def3f2'
            //   }
            // },
            data: vm.bloodfoodData.systolic
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: foodSeriesTitle,
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodfoodData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: foodSeriesData
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
      return option
    },
    bloodSportOption (state, start, end) {
      let vm = this
      let x1 = ''
      let sportSeriesData = []
      let sportSeriesTitle = ''
      if (state === 'kaluli') {
        sportSeriesData = vm.bloodsportData.calories
        sportSeriesTitle = '卡路里'
      } if (state === 'score') {
        sportSeriesData = vm.bloodsportData.movementScore
        sportSeriesTitle = '分数'
      }
      let zoomstart = 0
      let zoomend = 100
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let option = {
        color: ['#8ecefc', 'e6f5fe', '8ecefc'],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            // disabled: false,
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 10,
            maxValueSpan: 11,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          // triggerOn: 'click',
          triggerOn: 'mousemove|click',
          formatter: function (a) {
            // return (
            //     a[0]['axisValueLabel'] + '<br>' +
            //     a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
            //     a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
            //     a[2]['seriesName'] + ': ' + a[2]['value']
            // )
            return (
                a[0]['axisValueLabel'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[2]['seriesName'] + ': ' + a[2]['value']
            )
          }
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: [
          { // 直角坐标系内绘图网格
            top: '5%',
            left: '90px',
            right: '80px',
            width: 'auto',
            height: 'auto',
            bottom: '55%'
          },
          {
            top: '55%',
            left: '90px',
            right: '80px',
            width: 'auto',
            height: 'auto',
            bottom: '40px'
          }
        ],
        xAxis: [
          { // 直角坐标系grid的x轴
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              show: false,
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              rotate: 0,
              formatter: function (val) {
                let value
                let time
                if (val.length > 11) {
                  time = val.slice(5, 10)
                  value = val.slice(11)
                } else {
                  time = val.slice(0, 4)
                  value = val.slice(5)
                }
                if (vm._.eq(time, x1)) {
                  x1 = time
                  return value
                } else {
                  let arr = []
                  arr.push(value)
                  arr.push(time)
                  x1 = time
                  return arr.join('\n')
                }
              }
              // rotate: 330
            },
            symbol: 'circle',
            symbolSize: 6,
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            // min: 0,
            axisTick: {
              show: false
            },
            // 血压横坐标
            data: vm.bloodsportData.x
          },
          { // 直角坐标系grid的x轴
            type: 'category',
            gridIndex: 1,
            boundaryGap: false,
            symbol: 'circle',
            symbolSize: 6,
            axisLabel: {
              // show: false,
              interval: 0, // 显示x轴数据
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              rotate: 0,
              formatter: function (val) {
                let value
                let time
                if (val.length > 11) {
                  time = val.slice(5, 10)
                  value = val.slice(11)
                } else {
                  time = val.slice(0, 4)
                  value = val.slice(5)
                }
                if (vm._.eq(time, x1)) {
                  x1 = time
                  return value
                } else {
                  let arr = []
                  arr.push(value)
                  arr.push(time)
                  x1 = time
                  return arr.join('\n')
                }
              }
              // rotate: 330
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            // 分数横坐标
            data: vm.bloodsportData.x
          }
        ],
        yAxis: [
          { // 直角坐标系grid的y轴
            name: '血压',
            gridIndex: 0,
            nameLocation: 'end',
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: { // y轴网格显示
              show: true
            },
            nameTextStyle: { // 坐标轴名样式
              color: '#666',
              fontSize: 12,
              align: 'left'
            },
            boundaryGap: true,
            splitNumber: 3, // 坐标轴分割段数
            minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
            data: ['0', '120', '140', '180']
          },
          { // 直角坐标系grid的y轴
            name: sportSeriesTitle,
            gridIndex: 1,
            nameLocation: 'end',
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: { // y轴网格显示
              show: true
            },
            nameTextStyle: { // 坐标轴名样式
              color: '#666',
              fontSize: 12,
              align: 'left'
            },
            boundaryGap: true,
            splitNumber: 3, // 坐标轴分割段数
            minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            // interval: 50, // 强制设置坐标轴分割间隔。
            data: ['0', '120', '140', '180']
          }
        ],
        series: [
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '舒张压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#32b77a'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodsportData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: vm.bloodsportData.diastolic
          },
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: '收缩压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodsportData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#def3f2',
            //     origin: 'auto',
            //     shadowColor: '#def3f2'
            //   }
            // },
            data: vm.bloodsportData.systolic
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: sportSeriesTitle,
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodsportData.bpType[param.dataIndex]
                  return vm.computeDanger(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: sportSeriesData
          }
        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
      return option
    },
    computeStartend (pageNum, pages) {
      let page = {
      }
      if (pageNum === 1 && pages === 1) {
        page.start = 0
        page.end = 100
      } else if (pageNum === 1) {
        page.start = 0
        page.end = parseInt((pageNum / pages) * 100)
      } else if (pageNum < pages || pageNum === pages) {
        page.start = parseInt(((pageNum - 1) / pages) * 100)
        page.end = parseInt((pageNum / pages) * 100)
      }
      return page
    },
    computeDanger (bptype) {
      let type = this._.toNumber(bptype)
      let color = ''
      switch (type) {
        case 1:
          color = '#81cefc'
          break
        case 2:
          color = '#7cedc4'
          break
        case 3:
          color = '#f4e07a'
          break
        case 4:
          color = '#ff947b'
          break
        case 5:
          color = '#ff5252'
          break
        case 0:
          color = '#191918'
          break
        default:
          color = '#191918'
      }
      return color
    },
    bloodFoodNext () {
      let vm = this
      let bloodFood = echarts.init(document.getElementById('bloodFood'))
      if (vm.bloodfoodData.currentPage > vm.bloodfoodData.pageNum) {
        vm.bloodfoodData.currentPage = vm.bloodfoodData.pageNum
      }
      if (vm.bloodfoodData.currentPage < vm.bloodfoodData.pages) {
        vm.bloodfoodData.currentPage ++
      }
      if (vm.bloodfoodData.pageNum >= vm.bloodfoodData.pages) {
        let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
        if (vm.bloodfoodChecked.kaluli) {
          bloodFood.setOption(vm.bloodFoodOption('kaluli', position.start, position.end))
        }
        if (vm.bloodfoodChecked.score) {
          bloodFood.setOption(vm.bloodFoodOption('score', position.start, position.end))
        }
        // bloodFood.setOption(this.bloodFoodOption(state, position.start, position.end))
        return
      }
      vm.bloodfoodData.pageNum ++
      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || '',
        'pageNum': vm.bloodfoodData.pageNum,
        'pageSize': 5
      }
      vm.$axios(bloodfoodApi(params))
        .then(res => {
          // let bloodFood = echarts.init(document.getElementById('bloodFood'))
          bloodFood.showLoading(
            {
              text: '加载中...',
              color: '#1991fc',
              textColor: '#000',
              maskColor: 'rgba(255, 255, 255, 0.8)',
              zlevel: 0
            }
          )
          if (vm.bloodfoodData.pageNum <= res.data.pages) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.calories) {
                  item.calories = 0
                }
                if (!item.foodScore) {
                  item.foodScore = 0
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                vm.bloodfoodData.x.push(item.createTime)
                vm.bloodfoodData.systolic.push(item.systolic)
                vm.bloodfoodData.diastolic.push(item.diastolic)
                vm.bloodfoodData.foodScore.push(item.foodScore)
                vm.bloodfoodData.calories.push(item.calories)
                vm.bloodfoodData.bpType.push(item.bpType)
              })
            }
          }
          let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
          if (vm.bloodfoodChecked.kaluli) {
            bloodFood.setOption(vm.bloodFoodOption('kaluli', position.start, position.end))
          }
          if (vm.bloodfoodChecked.score) {
            bloodFood.setOption(vm.bloodFoodOption('score', position.start, position.end))
          }
          // bloodFood.setOption(vm.bloodFoodOption(50, 80))
          bloodFood.hideLoading()
        })
    },
    bloodFoodPer () {
      let vm = this
      let bloodFood = echarts.init(document.getElementById('bloodFood'))
      this.bloodfoodData.currentPage --
      if (this.bloodfoodData.currentPage < 1) {
        this.bloodfoodData.currentPage = 1
      }
      let position = this.computeStartend(this.bloodfoodData.currentPage, this.bloodfoodData.pageNum)
      if (vm.bloodfoodChecked.kaluli) {
        bloodFood.setOption(vm.bloodFoodOption('kaluli', position.start, position.end))
      }
      if (vm.bloodfoodChecked.score) {
        bloodFood.setOption(vm.bloodFoodOption('score', position.start, position.end))
      }
    },
    bloodSportPer () {
      let vm = this
      let bloodSport = echarts.init(document.getElementById('bloodSport'))
      this.bloodsportData.currentPage --
      if (this.bloodsportData.currentPage < 1) {
        this.bloodsportData.currentPage = 1
      }
      let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
      if (vm.bloodsportChecked.kaluli) {
        bloodSport.setOption(vm.bloodSportOption('kaluli', position.start, position.end))
      }
      if (vm.bloodsportChecked.score) {
        bloodSport.setOption(vm.bloodSportOption('score', position.start, position.end))
      }
    },
    bloodSportNext () {
      console.log('position1', this.bloodsportData.currentPage, this.bloodsportData.pageNum)
      console.log('position2', this.bloodsportData.pages, this.bloodsportData.pageNum)

      let vm = this
      let bloodSport = echarts.init(document.getElementById('bloodSport'))
      if (vm.bloodsportData.currentPage > vm.bloodsportData.pageNum) {
        vm.bloodsportData.currentPage = vm.bloodsportData.pageNum
        // return
      }
      if (vm.bloodsportData.currentPage < vm.bloodsportData.pages) {
        vm.bloodsportData.currentPage ++
      }

      if (!(vm.bloodsportData.pageNum < vm.bloodsportData.pages)) {
        let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
        if (vm.bloodsportChecked.kaluli) {
          bloodSport.setOption(vm.bloodSportOption('kaluli', position.start, position.end))
        }
        if (vm.bloodsportChecked.score) {
          bloodSport.setOption(vm.bloodSportOption('score', position.start, position.end))
        }
        return
      }
      vm.bloodsportData.pageNum ++

      let params = {
        'userId': vm.sickID,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || '',
        'pageNum': vm.bloodsportData.pageNum,
        'pageSize': 9
      }
      vm.$axios(bloodsportApi(params))
        .then(res => {
          // let bloodSport = echarts.init(document.getElementById('bloodSport'))
          bloodSport.showLoading(
            {
              text: '加载中...',
              color: '#1991fc',
              textColor: '#000',
              maskColor: 'rgba(255, 255, 255, 0.8)',
              zlevel: 0
            }
          )
          if (vm.bloodsportData.pageNum <= res.data.pages) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                if (!item.systolic) {
                  item.systolic = 0
                }
                if (!item.diastolic) {
                  item.diastolic = 0
                }
                if (!item.calories) {
                  item.calories = 0
                }
                if (!item.foodScore) {
                  item.foodScore = 0
                }
                if (!item.bpType) {
                  item.bpType = 0
                }
                vm.bloodsportData.x.push(item.createTime)
                vm.bloodsportData.systolic.push(item.systolic)
                vm.bloodsportData.diastolic.push(item.diastolic)
                vm.bloodsportData.movementScore.push(item.movementScore)
                vm.bloodsportData.calories.push(item.calories)
                vm.bloodsportData.bpType.push(item.bpType)
              })
            }
          }
          console.log('position', this.bloodsportData.currentPage, this.bloodsportData.pageNum)

          let position = this.computeStartend(this.bloodsportData.currentPage, this.bloodsportData.pageNum)
          if (vm.bloodsportChecked.kaluli) {
            bloodSport.setOption(vm.bloodSportOption('kaluli', position.start, position.end))
          }
          if (vm.bloodsportChecked.score) {
            bloodSport.setOption(vm.bloodSportOption('score', position.start, position.end))
          }
          console.log('positionX', position.start, position.end)
          bloodSport.hideLoading()
        })
    }
  },
  watch: {
    bloodfoodData: {
      handler: function (val) {
        if (val.pages < 2) {
          this.foodBtnNext = false
          this.foodBtnPre = false
        } else {
          if (val.currentPage === val.pages) {
            this.foodBtnNext = false
          } else {
            this.foodBtnNext = true
          }
          if (val.currentPage !== 1) {
            this.foodBtnPre = true
          } else {
            this.foodBtnPre = false
          }
        }
      },
      deep: true
    },
    bloodsportData: {
      handler: function (val) {
        if (val.pages < 2) {
          this.sportBtnNext = false
          this.sportBtnPre = false
        } else {
          if (val.currentPage === val.pages) {
            this.sportBtnNext = false
          } else {
            this.sportBtnNext = true
          }
          if (val.currentPage !== 1) {
            this.sportBtnPre = true
          } else {
            this.sportBtnPre = false
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    let vm = this
    // 初始化血压分布图
    this.coverChecked.date[0].isChecked = true
    this.updateCover(this.coverChecked.date[0].value)
    let bloodCover = echarts.init(document.getElementById('bloodCover'))
    bloodCover.setOption(this.bloodCoverOption())
    // 初始化血压直方图
    this.histogramChecked.date[0].isChecked = true
    this.updateHistogram(this.histogramChecked.date[0].value)
    let bloodHistogram = echarts.init(document.getElementById('bloodHistogram'))
    bloodHistogram.setOption(this.bloodHistogramOption())

    this.bloodfoodChecked.date[0].isChecked = true
    this.bloodfoodChecked.kaluli = true
    this.updateFood(this.bloodfoodChecked.date[0].date)
    let bloodFood = echarts.init(document.getElementById('bloodFood'))
    bloodFood.setOption(this.bloodFoodOption('kaluli'))

    this.bloodsportChecked.date[0].isChecked = true
    this.bloodsportChecked.kaluli = true
    this.updateSport(this.bloodsportChecked.date[0].date)
    let bloodSport = echarts.init(document.getElementById('bloodSport'))
    bloodSport.setOption(this.bloodSportOption('kaluli'))

    bloodFood.on('datazoom', function (chartsparams) {
      if (chartsparams.end === 100) {
        if (vm.bloodfoodData.pageNum >= vm.bloodfoodData.pages) {
          return
        }
        vm.bloodfoodData.pageNum ++
        let params = {
          'userId': vm.sickID,
          'adminHospitalId': vm.hospitalId,
          'bpMeasureTime': vm.bpMeasureTime || '',
          'pageNum': vm.bloodfoodData.pageNum,
          'pageSize': 5
        }
        vm.$axios(bloodfoodApi(params))
          .then(res => {
            let bloodFood = echarts.init(document.getElementById('bloodFood'))
            bloodFood.showLoading(
              {
                text: '加载中...',
                color: '#1991fc',
                textColor: '#000',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                zlevel: 0
              }
            )
            if (vm.bloodfoodData.pageNum <= res.data.pages) {
              if (res.data.data.length !== 0) {
                res.data.data.forEach((item, index) => {
                  if (!item.systolic) {
                    item.systolic = 0
                  }
                  if (!item.diastolic) {
                    item.diastolic = 0
                  }
                  if (!item.calories) {
                    item.calories = 0
                  }
                  if (!item.foodScore) {
                    item.foodScore = 0
                  }
                  if (!item.bpType) {
                    item.bpType = 0
                  }
                  vm.bloodfoodData.x.push(item.createTime)
                  vm.bloodfoodData.systolic.push(item.systolic)
                  vm.bloodfoodData.diastolic.push(item.diastolic)
                  vm.bloodfoodData.foodScore.push(item.foodScore)
                  vm.bloodfoodData.calories.push(item.calories)
                  vm.bloodfoodData.bpType.push(item.bpType)
                })
              }
            }
            if (vm.bloodfoodChecked.kaluli) {
              bloodFood.setOption(vm.bloodFoodOption('kaluli', 50, 85))
            }
            if (vm.bloodfoodChecked.score) {
              bloodFood.setOption(vm.bloodFoodOption('score', 50, 85))
            }
            // bloodFood.setOption(vm.bloodFoodOption(50, 80))
            bloodFood.hideLoading()
          })
      }
    })
    bloodSport.on('datazoom', function (chartsparams) {
      // let vm = this
      // console.log('num', vm.bloodsportData.pageNum)
      // console.log('num', vm.bloodsportData)
      if (chartsparams.end === 100) {
        // console.log('num', vm.bloodsportData.pageNum)
        if (vm.bloodsportData.pageNum >= vm.bloodsportData.pages) {
          return
        }
        vm.bloodsportData.pageNum ++

        let params = {
          'userId': vm.sickID,
          'adminHospitalId': vm.hospitalId,
          'bpMeasureTime': vm.bpMeasureTime || '',
          'pageNum': vm.bloodsportData.pageNum,
          'pageSize': 5
        }
        vm.$axios(bloodsportApi(params))
          .then(res => {
            let bloodSport = echarts.init(document.getElementById('bloodSport'))
            bloodSport.showLoading(
              {
                text: '加载中...',
                color: '#1991fc',
                textColor: '#000',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                zlevel: 0
              }
            )
            if (vm.bloodsportData.pageNum <= res.data.pages) {
              if (res.data.data.length !== 0) {
                res.data.data.forEach((item, index) => {
                  if (!item.systolic) {
                    item.systolic = 0
                  }
                  if (!item.diastolic) {
                    item.diastolic = 0
                  }
                  if (!item.calories) {
                    item.calories = 0
                  }
                  if (!item.foodScore) {
                    item.foodScore = 0
                  }
                  if (!item.bpType) {
                    item.bpType = 0
                  }
                  vm.bloodsportData.x.push(item.createTime)
                  vm.bloodsportData.systolic.push(item.systolic)
                  vm.bloodsportData.diastolic.push(item.diastolic)
                  vm.bloodsportData.movementScore.push(item.movementScore)
                  vm.bloodsportData.calories.push(item.calories)
                  vm.bloodsportData.bpType.push(item.bpType)
                })
              }
            }
            if (vm.bloodsportChecked.kaluli) {
              bloodSport.setOption(vm.bloodSportOption('kaluli', 50, 85))
            }
            if (vm.bloodsportChecked.score) {
              bloodSport.setOption(vm.bloodSportOption('score', 50, 85))
            }

            bloodSport.hideLoading()
          })
      }
    })
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
  .chart{
    padding: 0px 24px 0px 24px;
  }
  .check-date{
    padding: 20px 0 20px 24px;
  }
  .check-date-btn{
    border:none;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none;
  }
  .check-status{
    padding: 0px 0 20px 24px;
    font-size: 14px;
    color: #666;
  }
  .check-status span{
    display: inline-block;
    /* margin-right: 10px; */
  }
  .checked{
    background-color:#1991fc;
    color:#fff;
    border-radius:2px;
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
    height: 250px;
    padding-top: 40px;
  }
  .blood-cover{
    margin-bottom: 8px;
  }
  .check-all-btn{
    outline: none;
    border: none;
    background-color: #fff;
    color: #666;
    cursor: pointer;
    font-size: 14px;
  }
  .status-span{
    margin-right: 2px;
    margin-bottom: 5px;
  }
  button{
    padding: 0;
    vertical-align: baseline;
  }
  .check-all-span{
    margin-right: 30px;
  }
  .check-all-btn-icon{
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background-color: #fff;
    vertical-align: middle;
    padding: 0;
  }
  .check-all-btn-icon-active{
    display: inline-block;
    position: relative;
    content: "";
    width: 20px; 
    height: 20px;  
    vertical-align: middle;
    background: url('~icon/hospital-icon-44.png')
  }
  .label-right{
    margin-right: 20px;
    width: 60px;
  }
  .blood-trend-item{
    font-size: 14px;
    color: #666;
    background-color: #f4f6f9;
    height: 80px;
    margin:10px 10px 0 0;
    width: 150px;
    padding: 10px;
    float: left;
  }
  .blood-trend-item p{
    padding-top:5px;
    color: #666;
  }
  .blood-trend-item p:nth-child(1){
    font-size: 24px;
    color:#1991fc;
  }
  .danger-text{
    color:#e87070 !important;
  }
  .float-box{
    /* float: left; */
    display: inline-block;
    /* width: 100%; */
  }
  .checked-kaluli{
    /* margin-top: 80px; */
  }
  .checked-score{
    margin-top:10px;
  }
  .middle-wrap{
    position: relative;
    height: 100%;
  }
  .middle{
    position: absolute;
    /* display: table-cell; */
    /* vertical-align: middle; */
    top:50%;
    transform: translateY(-50%)
  }
  .margin-bottom{
    margin-bottom:8px;
    color: #ffffff1a;
  }
  .flex{
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    width: 100%;
  }
  .chart-min-width{
    min-width: 100%;
  }
  .flex-btn{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    right: 0;
    z-index:999;
  }
  .flex-btn-left{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    left: 25px;
    z-index:999;
  }
  .widthone{
    width: 100%;
  }
  .kaluli-wrap{
    position: relative;
  }
  .kaluli-btn-wrap{
    position: absolute;
    width: 200px;
    height: 40px;
    top: 50%;
    left: 150px;
    z-index: 99;
  }
</style>
