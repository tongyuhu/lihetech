<template>
  <div class="clear box" @click.prevent="cancelDelet">
    <div class="left-arrow" v-if="hasCard">
      <el-button @click="pre()" icon="el-icon-arrow-left" type="text" class="arrow"></el-button>
    </div>
    <div class="right-arrow" v-if="hasCard">
      <el-button @click="next()" icon="el-icon-arrow-right" type="text" class="arrow"></el-button>
    </div>
    <i :class="{'new':isnew}" v-if="hasCard"></i>
    <div class="table-top">
      <span class="table-top-span">病历卡 <span v-if="hasCard">{{currentpage}}/{{cardtotalPage}}</span> </span>
      <span v-if="hasCard">{{createTime}}</span>
    </div>
    <div class="no-card" v-if="!hasCard">
      暂无病历卡
    </div>
    <div v-if="hasCard">
      <table>
        <tr>
          <td colspan="2" class="table-head side-left">用户自述</td>
          <td>
            {{readme}}
            <el-button size="mini" type="text" class="table-btn" @click="play(readme)">
              <i class="play"></i>播放
            </el-button>
            <audio :src="readmeUrl" id="audio">
            Your browser does not support the audio element.
            </audio>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table-head side-left">系统分析</td>
          <td>
            <span>
              {{systemAnalysis}}
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table-head side-left">医生诊断</td>
          <td>
            {{doctorDiagnos}}
            <!-- <el-button type="text" size="mini" class="table-btn" @click="sendVoice()" v-if="currentpage === 1">
              <i class="send"></i>发送语音
            </el-button> -->
          </td>
        </tr>

        <tr>
          <td class="table-head">医治方案</td>
          <!-- <td rowspan="3" class="table-head">医治方案</td> -->
          <td class="table-head">用药</td>
          <td>
            <div class="use-medicine">
              <!-- {{medicine}} -->


              <div v-if="medicine.length !==0" class="use-medicine-item" v-for="(item,index) in medicine" :key="index">
                <div>
                  <div>
                    <div>{{item.medicineName}}</div>
                    <div>
                      <span>{{item.everyDosage ?item.everyDosage+ item.unit+'/次':""}}</span>
                      <span>{{ item.usageTimes ? item.usageTimes :''}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="use-medicine-item" v-for="(item,index) in medicineData.data" :key="index">
                <div>
                  <div>
                    <button class="delete-medicine-btn" v-if="item.showDelete" @click.stop="deleteMedicineHandle(item,index)">
                      <i></i>
                    </button>
                  </div>
                  <div>
                    <div>{{item.medicineName}}</div>
                    <div>
                      <span>{{item.useNum ? item.useNum+'粒/次' :''}}</span>
                      <span>{{ item.useTimes ? item.useTimes+'次/日' :''}}</span>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- <div class="use-medicine-item">
                <div>
                  <div>
                    <button class="delete-medicine-btn">
                      <i></i>
                    </button>
                  </div>
                  <div>
                    <div>瑞泰(雷米普利片)</div>
                    <div>
                      <span>12/22</span>
                      <span>1225/55</span>
                    </div>
                  </div>
                </div>
              </div> -->
              
              <!-- <div>
                <el-button type="text" size="mini" class="table-btn" @click.stop="deleteMedicine" v-if="currentpage === 1">
                  <i class="delete"></i>删除
                </el-button>
                <el-button type="text" size="mini" class="table-btn" @click="addMedicine" v-if="currentpage === 1">
                  <i class="add"></i>添加
                </el-button>
              </div> -->
            </div>
          </td>
        </tr>
        <tr v-show="false">
          <!-- <td>3</td> -->
          <td class="table-head">运动</td>
          <td>
            {{movement}}
            <!-- <el-button type="text" size="mini" class="table-btn" @click="deleteSport()" v-if="currentpage === 1">
              <i class="delete"></i>删除
            </el-button>
            <el-button type="text" size="mini" class="table-btn" @click="addSport()" v-if="currentpage === 1">
              <i class="add"></i>添加
            </el-button> -->
          </td>
        </tr>
        <tr v-show="false">
          <!-- <td>4</td> -->
          <td class="table-head">饮食</td>
          <td>
            <span>
              {{diet}}
            </span>
            <!-- <el-button type="text" size="mini" class="table-btn" @click="deleteFood()" v-if="currentpage === 1">
              <i class="delete"></i>删除
            </el-button>
            <el-button type="text" size="mini" class="table-btn" @click="addFood()" v-if="currentpage === 1">
              <i class="add"></i>添加
            </el-button> -->
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table-head side-left">医生信息</td>
          <td>
            <span>
              李那那  上海张江高科诊所  糖尿病慢性病家庭医生
            </span>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      :visible.sync="medicineData.add"
      width="750px"
      center>
      <span slot="title" class="dialog-title">添加用药</span>
      <addMedicine
      @addMedicine="addMedicineHandle"></addMedicine>
      <span slot="footer">
        <el-button @click="cancelAddmedicine">取 消</el-button>
        <el-button type="primary" @click="sedAddmedicine">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
    :visible.sync="sportData.add"
    width="578px"
    center>
      <span slot="title" class="dialog-title">添加运动</span>
      <addSport></addSport>
      <span slot="footer">
        <el-button @click="cancelAddsport">取 消</el-button>
        <el-button type="primary" @click="sedAddsport">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
    :visible.sync="foodData.add"
    width="456px"
    center>
      <span slot="title" class="dialog-title">添加饮食</span>
      <addFood></addFood>
      <span slot="footer">
        <el-button @click="cancelAddfood">取 消</el-button>
        <el-button type="primary" @click="sedAddfood">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <addMedicine></addMedicine> -->
  </div>
</template>

<script>
// import {Bus} from '@/bus'
import medicine from './../medicine/medicine'
import addMedicine from './../addMedicine'
import addSport from './../addSport'
import addFood from './../addFood'
// import index from 'vue'
export default {
  components: {
    medicine,
    addMedicine,
    addSport,
    addFood
  },
  props: {
    totalPage: {
      // type: [Number, String],
      default: 0
    },
    sickData: {}
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
      isnew: true,
      cardtotalPage: this.totalPage,
      medicineData: {
        add: false,
        delete: false,
        data: []
      },
      sportData: {
        add: false,
        delete: false,
        data: []

      },
      foodData: {
        add: false,
        delete: false,
        data: []

      },
      hasCard: true
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
          // this.medicineData.data = []
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
    },
    totalPage (val) {
      this.cardtotalPage = val
      // if (val === 0) {
      //   this.cardtotalPage = 1
      // }
      // return val
    },
    cardtotalPage: {
      handler: function (val) {
        console.log('ddd', val)
        if (val > 0) {
          this.hasCard = true
        } else {
          this.hasCard = false
        }
      },
      immediate: true
    },
    sickData: {
      handler (curVal, oldVal) {
        // 接口完成后 需要做数据处理
        this.medicineData.data = []
        console.log('111', curVal, oldVal)
      },
      deep: true
    }
  },
  methods: {
    next () {
      if (isNaN(this.currentpage)) {
        this.currentpage = parseInt(this.currentpage)
      }
      if (isNaN(this.cardtotalPage)) {
        this.cardtotalPage = parseInt(this.cardtotalPage)
      }
      if (this.currentpage >= this.cardtotalPage) {
        this.currentpage = 0
      }
      console.log(this.cardtotalPage)
      this.currentpage ++
      this.$emit('preBtn', this.currentpage)
    },
    pre () {
      // console.log(this.currentpage)
      if (isNaN(this.currentpage)) {
        this.currentpage = parseInt(this.currentpage)
      }
      if (isNaN(this.cardtotalPage)) {
        this.cardtotalPage = parseInt(this.cardtotalPage)
      }
      if (this.currentpage <= 1) {
        this.currentpage = this.cardtotalPage + 1
      }
      this.currentpage -= 1

      this.$emit('preBtn', this.currentpage)
    },
    play (msg) {
      this.$nextTick(function () {
        // document.getElementById('audio').play()
        var audio = new SpeechSynthesisUtterance(msg)
        // console.log(msg)
        window.speechSynthesis.speak(audio)
      })
      console.log('用户自述')
    },
    sendVoice () {
      console.log('发送语音')
    },
    deleteMedicine () {
      this.medicineData.data.forEach((item, index) => {
        this.$set(item, 'showDelete', true)
      })
      this.medicineData = Object.assign({}, this.medicineData)
      // 需要提交到服务器
      console.log('删除药')
      console.log(this.medicineData.data)
    },
    cancelDelet () {
      this.medicineData.data.forEach((item, index) => {
        this.$set(item, 'showDelete', false)
      })
      this.medicineData = Object.assign({}, this.medicineData)
    },
    deleteMedicineHandle (medicine, index) {
      this.medicineData.data.splice(index, 1)
    },
    addMedicineHandle (val) {
      console.log(val.list)
      this.medicineData.data.push(val.list)
      this.medicineData.data = this.removeSame(this.medicineData.data)
      // this.$mount('#app')
    },
    addMedicine () {
      this.medicineData.add = true
      console.log('添加药')
    },
    cancelAddmedicine () {
      // 取消添加 需要修改
      this.medicineData.add = false
    },
    sedAddmedicine () {
      // 确定添加 需要上传
      this.medicineData.add = false
    },
    deleteSport () {
      console.log('删除运动')
    },
    addSport () {
      this.sportData.add = true
      console.log('添加运动')
    },
    cancelAddsport () {
      this.sportData.add = false
    },
    sedAddsport () {
      this.sportData.add = false
    },
    deleteFood () {
      console.log('删除饮食')
    },
    addFood () {
      this.foodData.add = true
      console.log('添加饮食')
    },
    cancelAddfood () {
      this.foodData.add = false
    },
    sedAddfood () {
      this.foodData.add = false
    },
    removeSame (arr) {
      return Array.from(new Set(arr))
    }
  },
  mounted () {
    // console.log('cardtotalPage', this.cardtotalPage)
    // if (this.cardtotalPage > 0) {
    //   // this.cardtotalPage = 1
    //   this.hasCard = true
    // } else {
    //   this.hasCard = false
    // }
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
  .no-card{
    min-height: 300px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    line-height: 300px;
  }
  .box{
    position: relative;
    background-color: #fff;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 24px;
    margin-bottom: 8px;
  }
  /* .side-left{
    width: 50px;
  } */
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
    padding: 5px;
    cursor: default;
  }
  td{
    border:1px solid #eaeaea;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    /* padding: 5px; */
    line-height: 20px;
    cursor: default;
  }
  .arrow{
    font-size: 24px;
    color:#666;
  }

  .table-head{
    color: #041421;
    font-weight: bold;
    min-width: 40px;
    max-width: 40px;
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
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background: url('~icon/hospital-icon-25.png') no-repeat;
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
    background: url('~icon/hospital-icon-26.png') no-repeat;
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
    background: url('~icon/hospital-icon-27.png') no-repeat;
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
    background: url('~icon/hospital-icon-28.png') no-repeat;
  }
   .new{
    position: relative;
    line-height: 0;
    height: 0;
    font-size: 0;
    box-sizing: border-box; border: 0; margin: 0; padding: 0
  }
  .new::before{
    box-sizing: border-box; border: 0; margin: 0; padding: 0;
    /* z-index: 22222222222222; */
    /* top:0px; */
    left: -50px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    display: block;
    background: url('~icon/hospital-icon-31.png') no-repeat;
  }
  .dialog-title{
    font-size: 16px;
    font-weight: bold;
  }
  .use-medicine{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* min-width: 800px; */
  }
  .use-medicine-item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-right: 15px;
    text-align: center;
    /* min-width: 80px; */
  }
  .use-medicine-item>div{
     display: flex;
    justify-content: center;
    align-items: center;
  }
  .use-medicine-item span{
    display: inline-block;
    padding-right: 10px;
    text-align: center
  }
  .delete-medicine-btn{
    border: none;
    background: #fff;
    cursor: pointer;
    outline: none;
  }
  .delete-medicine-btn:active{
    background: #fff;
    opacity: 0.3;
  }
  .delete-medicine-btn i{
    height:15px; 
    width:15px; 
    display:inline-block; 
    position:relative;
  } 

  .delete-medicine-btn i:before, .delete-medicine-btn i:after{
    content:''; 
    height:4px; 
    width:15px;
    display:inline-block; 
    background:#e87070; 
    border-radius:10px;
    -webkit-border-radius:10px;
    -moz-border-radius:10px; 
    position:absolute; 
    top:7px; 
    left:0px; 
    transform:rotate(-45deg);
    -webkit-transform:rotate(-45deg);
    -moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);-ms-transform:rotate(-45deg);}

  .delete-medicine-btn i:after{
    transform:rotate(45deg);
    -webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);-ms-transform:rotate(45deg);
  }
</style>
