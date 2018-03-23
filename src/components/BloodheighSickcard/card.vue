<template>
   <div class="clear box">
     <div class="left-arrow">
        <el-button @click="pre()" icon="el-icon-arrow-left" type="text" class="arrow"></el-button>
      </div>
      <div class="right-arrow">
        <el-button @click="next()" icon="el-icon-arrow-right" type="text" class="arrow"></el-button>
      </div>
      <i :class="{'new':isnew}"></i>
      <div class="table-top">
        <span class="table-top-span">病历卡  {{currentpage}}/{{totalPage}}</span>
        <span>{{createTime}}</span>
      </div>
      <div>
        <table cellpadding='0' cellspacing="0" class="table">
              <tr>
                <th class="table-head">用户自述</th>
                <td> 
                  {{readme}}
                  <el-button size="mini" type="text" class="table-btn" @click="play">
                    <i class="play"></i>播放
                  </el-button>
                  <audio :src="readmeUrl" id="audio">
                  Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
              <tr>
                <th class="table-head">系统分析</th>
                <td>
                  <span>
                    {{systemAnalysis}}
                  </span>
                </td>
              </tr>
              <tr>
                <th class="table-head">医生诊断</th>
                <td>
                  {{doctorDiagnos}}
                  <el-button type="text" size="mini" class="table-btn" @click="sendVoice()">
                    <i class="send"></i>发送语音
                  </el-button>
                </td>
              </tr>
              <!-- 医治方案 -->
              <tr>
                <td>
                  <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                    <td class="text-center no-bottom-border no-top-border no-left-border table-head">
                      医治方案
                    </td>
                    <td class="no-border">
                      <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                        <tr>
                          <td class="text-center only-bottom-border table-head">
                            <div class="padding">
                              用药
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-center only-bottom-border table-head">运动</td>
                        </tr>
                        <tr>
                          <td class="text-center no-border table-head">饮食</td>
                        </tr>
                      </table>
                    </td>
                  </table>
                </td>
                <td class="no-bottom-border">
                  <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                    <tr>
                      <td class="only-bottom-border">
                        {{medicine}}
                        <el-button type="text" size="mini" class="table-btn" @click="deleteMedicine()">
                          <i class="delete"></i>删除
                        </el-button>
                        <el-button type="text" size="mini" class="table-btn" @click="addMedicine()">
                          <i class="add"></i>添加
                        </el-button>
                      </td>
                    </tr>
                    <tr>
                      <td class="only-bottom-border">
                        <!-- <span>
                          血压偏高，不宜大幅度运动、请选择每天步行30min
                        </span> -->
                        
                            {{movement}}
                          
                            <el-button type="text" size="mini" class="table-btn" @click="deleteSport()">
                              <i class="delete"></i>删除
                            </el-button>
                            <el-button type="text" size="mini" class="table-btn" @click="addSport()">
                              <i class="add"></i>添加
                            </el-button>
                          
                      </td>
                    </tr>
                    <tr>
                      <td class="no-border">
                        <span>
                          {{diet}}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th class="table-head">
                  医生信息
                </th>
                <td>
                  <span>
                    李那那  上海张江高科诊所  糖尿病慢性病家庭医生
                  </span>
                </td>
              </tr>
            </table>
      </div>
  </div>
</template>

<script>
// import {Bus} from './../../bus'
export default {
  props: {
    totalPage: {
      type: [Number, String],
      default: 1
    },
    sickData: {

    }
    // sickID: {
    //   default: 0
    // },
    // hospitalId: {
    //   default: 0
    // }
  },
  data () {
    return {
      currentpage: 1,
      isnew: true
      // totalPage: ''
    }
  },
  computed: {
    readme () {
      if (this.sickData) {
        if (this.sickData.readme) {
          return this.sickData.readme
        }
      }
    },
    readmeUrl () {
      if (this.sickData) {
        if (this.sickData.readmeUrl) {
          return this.sickData.readmeUrl
        }
      }
    },
    systemAnalysis () {
      if (this.sickData) {
        if (this.sickData.systemAnalysis) {
          return this.sickData.systemAnalysis
        }
      }
    },
    doctorDiagnos () {
      if (this.sickData) {
        if (this.sickData.doctorDiagnos) {
          return this.sickData.doctorDiagnos
        }
      }
    },
    doctorDiagnosUrl () {
      if (this.sickData) {
        if (this.sickData.doctorDiagnosUrl) {
          return this.sickData.doctorDiagnosUrl
        }
      }
    },
    medicine () {
      if (this.sickData) {
        if (this.sickData.medicine) {
          return this.sickData.medicine
        }
      }
    },
    movement () {
      if (this.sickData) {
        if (this.sickData.movement) {
          return this.sickData.movement
        }
      }
    },
    diet () {
      if (this.sickData) {
        if (this.sickData.diet) {
          return this.sickData.diet
        }
      }
    },
    createTime () {
      if (this.sickData) {
        if (this.sickData.createTime) {
          return this.sickData.createTime
        }
      }
    }
  },
  watch: {
    currentpage (val) {
      if (val === 1) {
        this.isnew = true
      } else {
        this.isnew = false
      }
    }
  },
  methods: {
    next () {
      if (this.currentpage) {
        this.currentpage = parseInt(this.currentpage)
      }
      if (this.totalPage) {
        this.totalPage = parseInt(this.totalPage)
      }
      if (this.currentpage >= this.totalPage) {
        this.currentpage = 0
      }
      this.currentpage += 1
      this.$emit('preBtn', this.currentpage)
    },
    pre () {
      if (this.currentpage) {
        this.currentpage = parseInt(this.currentpage)
      }
      if (this.totalPage) {
        this.totalPage = parseInt(this.totalPage)
      }
      if (this.currentpage <= 1) {
        this.currentpage = this.totalPage + 1
      }
      this.currentpage -= 1
      this.$emit('preBtn', this.currentpage)
    },
    play () {
      this.$nextTick(function () {
        document.getElementById('audio').play()
      })
    },
    sendVoice () {

    },
    deleteMedicine () {},
    addMedicine () {},
    deleteSport () {},
    addSport () {}
  }
}
</script>

<style scoped>
  .clear{
      overflow:hidden;
    }
  .clear::after{
  content:"";
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
  clear:both;
  }
  .box{
    position: relative;
    background-color: #fff;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 24px;
    margin-bottom: 8px;
  }

  table{
    margin:0;
    padding:0;
    border-spacing: 0px;
    border:1px solid #eaeaea;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    color:#666;
  }
  th{
    border:1px solid #eaeaea;
    height: 30px;
    vertical-align: middle;
    /* padding: 5px; */
  }
  td{
    border:1px solid #eaeaea;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    /* padding: 5px; */
    line-height: 20px;
  }
  .border-collapse{
    border-collapse: collapse;
  }
  .no-border{
    border:none;
  }
  .no-bottom-border{
    border-bottom: none;
  }
  .no-top-border{
    border-top: none;
  }
  .no-right-border{
    border-right: none;
  }
  .no-left-border{
    border-left: none;
  }
  .only-bottom-border{
    border-right: none;
    border-left: none;
    border-top: none;
  }
  .text-center{
    text-align:center;  
  }
  .sick-card-center{
    border:1px solid #eaeaea;
    margin-bottom: 5px;
    line-height: 54px;
  }
  .arrow{
    font-size: 24px;
    color:#666;
  }

  .table-head{
    color: #041421;
    font-weight: bold;
  }
  .table-top{
    height: 62px;
    line-height: 62px;
    text-align: center;
    font-size: 14px;
    color:#666;
  }
  .table-top-span{
    font-size: 20px;
    color:#041421;
  }
  .left-arrow{
    position: absolute;
    top:40%;
    left: 10px;
  }
  .right-arrow{
    position: absolute;
    top:40%;
    right: 10px;
  }
  .padding{
    padding:0 10px;
  }
  .table-btn{
    color: #1991fc;
    font-size: 14px;
    margin-left: 35px;
  }
  .play{
    position: relative;
  }
  .play::before{
    top: -2px;
    left: -22px;
    position: absolute;
    content: '';
    width: 20px;;
    height: 20px;
    vertical-align: middle;
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-25.png') no-repeat;
  }
  .send{
    position: relative;
  }
  .send::before{
    top: -2px;
    left: -22px;
    position: absolute;
    content: '';
    width: 20px;;
    height: 20px;
    vertical-align: middle;
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-26.png') no-repeat;
  }
  .delete{
    position: relative;
  }
  .delete::before{
    top: -2px;
    left: -22px;
    position: absolute;
    content: '';
    width: 20px;;
    height: 20px;
    vertical-align: middle;
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-27.png') no-repeat;
  }
  .add{
    position: relative;
  }
  .add::before{
    top: -2px;
    left: -22px;
    position: absolute;
    content: '';
    width: 20px;;
    height: 20px;
    vertical-align: middle;
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-28.png') no-repeat;
  }
   .new{
    position: relative;
  }
  .new::before{
    z-index: 22222222222222;
    top:0;
    left: -50px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    /* display: block; */
    /* vertical-align: middle; */
    background: url('./../../../诊所-高血压/hospitalIcon/诊所-icon-31.png') no-repeat;
  }
</style>
