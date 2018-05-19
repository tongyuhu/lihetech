<template>
    <div class="case-wrap clear" v-if="showface">
      <div class="case-head clear">
        <div class="case-head-btn">
          <el-button type="primary" @click="complete">完成就诊</el-button>
          <el-button type="primary" @click="dayin">打印处方</el-button>
        </div>
      </div>

      <div class="face-case clear">

        <div class="case-left">
          <div class="case-left-img">
            <img src="~icon/admin.jpg" alt="">
          </div>
          <div class="case-left-type">
            <span class="case-left-type-name">{{info.name}}</span>
            <span class="case-left-type-se">治疗中</span>
          </div>
          <div class="case-left-btn">
            <el-button type="primary" @click="histroySickcard">历史病历</el-button>
            <el-button type="primary" @click="completeInfo">完善信息</el-button>
          </div>
          <div class="case-left-msg">
            <div class="case-left-msg-single">
              <span class="label">性别：</span>
              <span v-if="!showEditMsg">{{info.sex === 'man' ? '男' : '女'}}</span>
              <select v-if="showEditMsg" v-model="copyInfo.sex">
                <option value="man">男</option>
                <option value="woman">女</option>
              </select>
              <!-- <input type="text" v-if="showEditMsg" v-model="info.sex"> -->
            </div>
            <div class="case-left-msg-single">
              <span class="label">年龄：</span>
              <span v-if="!showEditMsg">{{info.age ? info.age+'岁':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.age" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">身高：</span>
              <span v-if="!showEditMsg">{{info.heigh ? info.heigh+'cm':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.heigh" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">体重：</span>
              <span v-if="!showEditMsg">{{info.weight ? info.weight+'kg':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.weight" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label"> BMI： </span>
              <span v-if="!showEditMsg">{{info.BMI}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.BMI" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">体温：</span>
              <span v-if="!showEditMsg">{{info.tem ? info.tem+'℃':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.tem" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">血压：</span>
              <span v-if="!showEditMsg">{{info.bloodHeigh}}</span>
              <input type="text" v-if="showEditMsg" v-model.lazy="copyInfo.bloodHeigh" class="padding">
            </div>
            <div class="case-left-msg-single">
              <span class="label">脉搏：</span>
              <span v-if="!showEditMsg">{{info.pulse ? info.pulse+'/min':''}}</span>
              <input type="text" v-if="showEditMsg" v-model.number="copyInfo.pulse" class="padding">
            </div>
            <el-button type="primary" v-if="showEditMsg" size="mini" @click="cancelInfo">取消</el-button>
            <el-button type="primary" v-if="showEditMsg" size="mini" @click="saveInfo">保存</el-button>
          </div>
          <div>
            <el-button type="primary">体检表</el-button>
            <el-button type="primary">体检单</el-button>
          </div>
        </div> 

        <div class="case face">  
            <div  class="case-main">
              <div class="case-main-content">
                <div class="case-main-title">
                  <span>上海立阖泰医疗统一处方笺</span>
                </div>
                <el-row :gutter="10">
                  <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">姓名:</div>
                      <input type="text" v-model="medication.name">
                    </div>
                  </el-col>
                  <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div>患病时长:</div>
                      <input type="text" v-model="medication.sickDuration">
                    </div>
                  </el-col>
                  <el-col :span="7" :lg="7" :md="24" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div>电话号码:</div>
                      <input type="text" v-model="medication.phone">
                    </div>
                  </el-col>
                  <el-col :span="5" :lg="5" :md="24" :sm="24" :sx="24" class="margin-top">
                    <select v-model="medication.sex">
                      <option value="man">男</option>
                      <option value="woman">女</option>
                    </select>
                    <select style="{'width':'40px'}" v-model="medication.isfirst">
                      <option value="first">初诊</option>
                      <option value="nofirst">复诊</option>
                    </select>

                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6" :lg="6" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">病史:</div>
                      <input type="text" v-model="medication.sickHistroy">
                    </div>
                  </el-col>
                  <el-col :span="6" :lg="6" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">遗传史:</div>
                      <input type="text" v-model="medication.inhereHistroy">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">生活习惯:</div>
                      <input type="text" v-model="medication.habit">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">检查项目:</div>
                      <input type="text" v-model="medication.checkItem">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">并发症:</div>
                      <input type="text" v-model="medication.complication">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group">
                      <div for="name">确诊疾病:</div>
                      <input type="text" v-model="medication.sureSick">
                    </div>
                  </el-col>
                  <el-col :span="12" :lg="12" :md="12" :sm="24" :sx="24" class="margin-top">
                    <div class="input-group" >
                      <div for="name">上次就诊时间:</div>
                      <input type="text" v-model="medication.lastTime">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">症状:</div>
                      <input type="text" v-model="medication.symptom">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">诊所信息:</div>
                      <input type="text" v-model="medication.hospitalMsg">
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top">
                  <el-col>
                    <div class="input-group">
                      <div for="name">医嘱:</div>
                      <input type="text" v-model="medication.doctorTip">
                    </div>
                  </el-col>
                </el-row>
                <div class="case-main-rp">
                  <div class="case-main-rp-title">
                    <span>RP</span>
                  </div>
                  <el-table
                  ref="multipleTable"
                  :data="doctorMedicine"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="400">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="singleuse"
                      label="单次用量"
                      width="100">
                      <template slot-scope="scope">
                        <input  type="text" class="table-input use-num single-use">
                        <select class="use-num">
                          <option value="pian">片</option>
                          <option value="li">粒</option>
                          <option value="ke">颗</option>
                          <option value="zhi">支</option>
                        </select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usemethod"
                      label="用法"
                      width="65">
                      <template slot-scope="scope">
                        <select>
                          <option value="mouse">口服</option>
                          <option value="in">注射</option>
                          <option value="out">外涂</option>
                        </select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usetimes"
                      label="频度"
                      width="80">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">次/天
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="uselong"
                      label="天数"
                      width="50">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="usetotal"
                      label="总量"
                      width="65">
                      <template slot-scope="scope">
                        <input type="text" class="table-input use-num single-use">盒
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="tip"
                      label="备注">
                      <template slot-scope="scope">
                        <input type="text" class="table-input">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="delete"
                      label="编辑"
                      width="100">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteMedicine(scope.$index, doctorMedicine)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!-- <table>
                    <tr>
                      <th>序号</th>
                      <th>名称</th>
                      <th>单次用量</th>
                      <th>用法</th>
                      <th>频度</th>
                      <th>天数</th>
                      <th>总量</th>
                      <th>备注</th>
                      <th>编辑</th>
                    </tr>
                    <tr v-for="i in 3" :key="i.id">
                      <td width="45px">12</td>
                      <td>名称</td>
                      <td width="100px">
                        <input  type="text" class="table-input use-num single-use border">
                        <select class="use-num">
                          <option value="rediag">片</option>
                          <option value="diag">粒</option>
                          <option value="diag">颗</option>
                          <option value="diag">支</option>
                        </select>
                      </td>
                      <td width="65px">
                        <select>
                          <option value="rediag">口服</option>
                          <option value="diag">注射</option>
                          <option value="diag">外涂</option>
                        </select>
                      </td>
                      <td width="80px">
                        <input type="text" class="table-input times">次/天
                      </td>
                      <td width="40px">
                        <input type="text" class="table-input">
                      </td>
                      <td width="60px">
                        <input type="text" class="table-input total">盒
                      </td>
                      <td>备注</td>
                      <td>编辑</td>
                    </tr>
                  </table> -->
                </div>
                <div class="case-main-footer clear">
                  <div class="case-main-footer-left">
                    <div>
                      <span>医生</span>
                      <select name="" id="">
                        <option value="">周医生</option>
                        <option value="">王医生</option>
                        <option value="">赵医生</option>
                      </select>
                    </div>
                    <div>
                      <span>科室</span>
                      <select name="" id="">
                        <option value="">内科</option>
                        <option value="">外科</option>
                        <option value="">心脑血管</option>
                      </select>
                    </div>
                  </div>
                  <div class="case-main-footer-right">
                    <span class="case-main-footer-right-total">总计：</span>
                    <span class="case-main-footer-right-money">89元</span>
                  </div>
                </div>
              </div>
            </div>  
        </div>  
        
        <div class="case-right">
          <div class="case-right-main">
            <tabs
            v-model="activeIndex"
            @checkd="changeTab">
              <pane
              label="西药处方">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                  <searchMedicine
                  @medicineList="changeMedicineList"></searchMedicine>
                </div>
                <div class="medicenelist">
                  <el-table
                  ref="multipleTable"
                  :data="medicineList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="550"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="spec"
                      label="规格"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="kucun"
                      label="库存"
                      width="65"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="单价"
                      width="65"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="add-sure">
                  <el-button type="primary" @click="addsure">确认添加</el-button>
                </div>
                <!-- 1aaaaaa -->
              </pane>
              <pane
              label="运动">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                  <div
                  v-for="(sport,index) in addSportData" :key="index">
                    <addSport
                    :title="sport.title"
                    :subtitle="sport.subtitle"
                    :itemlist="sport.itemlist"
                    :initNum="sport.initNum"
                    :step="sport.step"
                    :index="index"
                    @addsport="addsports"
                    ></addSport>
                  </div>
                </div>
              </pane>
              <pane
              label="饮食">
                <div class="pane-bg">
                </div>
                <div class="pane-bgc">
                  <!-- <div v-for="(food,index) in addFoodData" :key="index"> -->
                    <addFood
                    v-for="(food,index) in addFoodData" :key="index"
                    :food="food.food"
                    @addfood="addfoods">
                    </addFood>
                  <!-- </div> -->
                </div>
              </pane>
            </tabs>
          </div>
        </div>  
      </div>


      <div id="print" class="print">
        <div class="title">
          <h1>上海立阖泰科技</h1>
          <h1>门诊病历</h1>
        </div>
        <div class="bottom-boder cardnum">
          <span>医疗证/医保卡号：</span>
        </div>
        <div class="bottom-boder">
          <div class="base-info">
            <span>姓名：{{info.name}}</span>
            <span>性别：{{info.sex === 'man' ? '男':'女'}}</span>
            <span>年龄：{{info.age}}</span>
            <span>科室：{{footerData.type}}</span>
            <span>费别：{{footerData.total}}</span>
          </div>
          <div class="info-card">
            <span>病历号：</span>
            <span>住址/电话：</span>
          </div>
          <div class="info-card">
            <span>诊断：{{medication.sureSick}}</span>
            <span>开具时间：</span>
          </div>
        </div>
        <div class="bottom-boder diagnos">
          <p>
            <span>主诉：{{medication.symptom}}</span>
          </p>
          <p>
            <span>现病史：</span>
          </p>
          <p>
            <span>既往病史：</span>
          </p>
          <p>
            <span>过敏史：</span>
          </p>
          <p>
            <span>体格检查：</span>
          </p>
          <p>
            <span>处理意见：{{medication.doctorTip}}</span>
          </p>
        </div>
        <div class="print-footer">
          <p>签字医生：{{footerData.doctor}}</p>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import tabs from '@/components/tabs.vue'
import pane from '@/components/pane.vue'
import medicine from '@/components/medicine/medicine.vue'
import addMedicine from '@/components/addMedicine.vue'
import addSport from '@/components/addSport.vue'
import addFood from '@/components/addFood.vue'
import searchMedicine from '@/components/searchMedicine.vue'
export default {
  name: 'facediag',
  components: {
    tabs,
    pane,
    medicine,
    addMedicine,
    searchMedicine,
    addSport,
    addFood
  },
  props: {
    sickID: {
      type: [Number, String],
      default: null
    },
    hospitalId: {
      type: [Number, String],
      default: null
    },
    name: {
      type: [Number, String],
      default: null
    },
    sex: {
      type: [Number, String],
      default: null
    },
    age: {
      type: [Number, String],
      default: null
    },
    mobile: {
      type: [Number, String],
      default: null
    },
    doctorDiagnos: {
      type: [Number, String],
      default: null
    },
    heigh: {
      type: [Number, String],
      default: null
    },
    weight: {
      type: [Number, String],
      default: null
    },
    sysIllnessHistoryNameDisease: {
      type: [Number, String],
      default: null
    },
    sysIllnessHistoryNameGenetic: {
      type: [Number, String],
      default: null
    },
    habits: {
      type: [Number, String],
      default: null
    },
    sysIllnessHistoryNameBpConcurrent: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      activeIndex: 1,
      showEditMsg: false,
      showface: true,
      medicineList: [
        // {
        //   name: '王小虎',
        //   spec: '上海市普陀',
        //   kucun: '上海市普陀',
        //   price: '上海市普518 弄'
        // }
      ],
      multipleSelection: [],
      info: {
        name: '',
        sex: 'man',
        age: '',
        heigh: 172,
        weight: '65',
        BMI: 2.5,
        tem: 36,
        bloodHeigh: '',
        pulse: ''
      },
      copyInfo: {},
      medication: {
        name: '',
        sickDuration: '',
        phone: '',
        sex: 'man',
        isfirst: 'first',
        sickHistroy: '',
        inhereHistroy: '',
        habit: '',
        checkItem: '',
        complication: '',
        sureSick: '',
        lastTime: '',
        symptom: '',
        hospitalMsg: '',
        doctorTip: ''
      },
      doctorMedicine: [],
      footerData: {
        doctor: '',
        type: '',
        total: ''
      },
      addSportData: [
        {
          title: '最轻运动',
          subtitle: '80千卡/30min',
          itemlist: ['散步', '购物', '散步', '购物'],
          initNum: 30,
          step: 10,
          num: null
        },
        {
          title: '最轻运动',
          subtitle: '80千卡/20min',
          itemlist: ['散步', '购物', '散步', '购物'],
          initNum: 20,
          step: 5,
          num: null

        },
        {
          title: '最轻运动',
          subtitle: '80千卡/10min',
          itemlist: ['散步', '购物', '购物', '散步', '购物'],
          initNum: 10,
          step: 5,
          num: null
        },
        {
          title: '最轻运动',
          subtitle: '80千卡/5min',
          itemlist: ['散步', '购物', '散步', '购物', '散步', '购物'],
          initNum: 5,
          step: 5,
          num: null
        }
      ],
      addFoodData: [
        {
          food: '减少钠盐',
          isChoose: false
        },
        {
          food: '多食优质蛋白质',
          isChoose: false
        },
        {
          food: '限制饮酒',
          isChoose: false
        },
        {
          food: '低脂饮食',
          isChoose: false
        },
        {
          food: '多吃蔬菜水果',
          isChoose: false
        },
        {
          food: '补充维生素C',
          isChoose: false
        }
      ],
      foodlist: []
    }
  },
  watch: {
    info: {
      handler: function () {

      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeTab () {

    },
    // addMedicineHandle () {},
    // 药物搜索
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val', val)
    },
    /**
    *@description select选择
    *@augments 选择的药物列表
    */
    changeMedicineList (list) {
      let vm = this
      vm.medicineList = []
      this._.forEach(list, (item, index) => {
        let obj = {}
        obj.name = item.medicineName
        obj.spec = item.drugSpec
        obj.kucun = item.id
        obj.price = item.medicineId
        vm.medicineList.push(obj)
      })
      // this.changeMedicineList = list
      console.log('this.changeMedicineList', this.medicineList)
    },
    // 完善信息
    completeInfo () {
      this.copyInfo = this._.cloneDeep(this.info)
      this.showEditMsg = true
    },
    // 取消完善信息
    cancelInfo () {
      this.copyInfo = {}
      this.showEditMsg = false
    },
    // 保存完善信息
    saveInfo () {
      this.info = this.copyInfo
      this.showEditMsg = false
    },
    // 确认添加药物
    addsure () {
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.forEach(item => {
          let medicine = {}
          medicine.name = item.name
          medicine.singleuse = ''
          medicine.singleuseUnit = 'pian'
          medicine.usemethod = 'mouse'
          medicine.usetimes = ''
          medicine.uselong = ''
          medicine.usetotal = ''
          medicine.tip = ''
          this.doctorMedicine.push(medicine)
        })
      }
      this.$refs.multipleTable.clearSelection()
    },
    // 删除药物
    deleteMedicine (index, rows) {
      rows.splice(index, 1)
    },
    // 完成就诊
    complete () {
      this.$emit('complete', '1')
      // this.showface = false
    },
    addsports (obj) {
      console.log(obj.num)
      console.log(obj.index)
      this.addSportData[obj.index].num = obj.num
    },
    addfoods (food) {
      if (food.add) {
        this.foodlist.push(food.food)
      }
      if (!food.add) {
        let index = this._.indexOf(this.foodlist, food.food)
        if (index !== -1) {
          this.foodlist.splice(index, 1)
        }
      }
      console.log('foodlist', this.foodlist)
    },
    histroySickcard () {
      this.$emit('openSickCard')
    },
    // 打印病历
    dayin () {
      var headhtml = '<html><head></head><body>'
      var foothtml = '</body>'
      // 获取div中的html内容
      // var newhtml = document.all.item(printpage).innerHTML;
      var newhtml = document.getElementById('print').innerHTML
      // 获取div中的html内容，jquery写法如下
      // var newhtml= $("#" + printpage).html();

      // 获取原来的窗口界面body的html内容，并保存起来
      var oldhtml = document.body.innerHTML

      // 给窗口界面重新赋值，赋自己拼接起来的html内容
      document.body.innerHTML = headhtml + newhtml + foothtml
      // 调用window.print方法打印新窗口
      window.print()
      window.location.reload()
      // 将原来窗口body的html值回填展示
      document.body.innerHTML = oldhtml
      return false
      // let subOutputRankPrint = document.getElementById('print')
      // console.log(subOutputRankPrint.innerHTML)
      // let newContent = subOutputRankPrint.innerHTML
      // let oldContent = document.body.innerHTML
      // document.body.innerHTML = newContent
      // window.print()
      // window.location.reload()
      // document.body.innerHTML = oldContent
      // return false
    }
  },
  // created () {
  //   this.info.name = this.name
  //   this.info.sex = (this.sex === '男' ? 'man' : 'woman')
  //   this.info.age = this.age
  //   this.info.heigh = this.heigh
  //   console.log('heigh1', this.heigh)
  //   console.log('heigh', this.info.heigh)
  //   this.info.weight = this.weight
  //   this.medication.name = this.name
  //   this.medication.sex = (this.sex === '男' ? 'man' : 'woman')
  //   this.medication.phone = this.mobile
  //   this.medication.sickHistroy = this.sysIllnessHistoryNameDisease
  //   this.medication.inhereHistroy = this.sysIllnessHistoryNameGenetic
  //   this.medication.habit = this.habits
  //   this.medication.complication = this.sysIllnessHistoryNameBpConcurrent
  //   this.medication.sureSick = this.doctorDiagnos
  // },
  mounted () {
    this.info.name = this.name
    this.info.sex = (this.sex === '男' ? 'man' : 'woman')
    this.info.age = parseInt(this.age)
    this.info.heigh = parseInt(this.heigh)
    console.log('name', this.name)
    console.log('heigh1', this.heigh)
    console.log('heigh', this.info.heigh)
    this.info.weight = parseInt(this.weight)
    this.medication.name = this.name
    this.medication.sex = (this.sex === '男' ? 'man' : 'woman')
    this.medication.phone = this.mobile
    this.medication.sickHistroy = this.sysIllnessHistoryNameDisease
    this.medication.inhereHistroy = this.sysIllnessHistoryNameGenetic
    this.medication.habit = this.habits
    this.medication.complication = this.sysIllnessHistoryNameBpConcurrent
    this.medication.sureSick = this.doctorDiagnos
    // this.$set(this.info, 'name', this.name)
    // this.$mount('#app')
    // this.medication.name = this.name
    // this.medication.name = this.name
  }
}
</script>

<style lang="scss" scoped>
  // $border-color-input:#dcdfe6;#ebeef5
  $border-color-input:#eaeaea;
  // $border-color-input:#ebeef5;
  $border-radius:4px;
  input{
    border:1px solid $border-color-input;
    // padding: 5px;
  }
  .padding{padding:5px;}
  .input-group{
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    position: relative;
    font-size: 14px;
    $input-height:30px;
    div{
      color: #041421;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: 1px solid $border-color-input;
      border-radius: $border-radius;
      padding: 0 5px;
      width: 1px;
      white-space: nowrap;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background-color: #fff;
    }
    input{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius:0 $border-radius $border-radius 0;
      border: 1px solid $border-color-input;
      padding-left: 5px;
      box-sizing: border-box;
      color: #041421;
      display: inline-block;
      font-size: inherit;
      height: $input-height;
      line-height: $input-height;
      outline: none;
      // padding: 0 15px;
      // transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      // border-left: none;
    }
  }
  .times{
    width: 20px;
  }
  select{
    // width: 100%;
    height: 30px;
    border:1px solid $border-color-input;
    border-radius: $border-radius;
    outline: none;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url('~icon/hospital-icon-199.png') no-repeat scroll right 3px center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 20px;
    padding-left: 4px;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    // text-align: center;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
  $left-width:216px;
  $right-width:420px;

  .case-head{
    &-btn{
      float: right;
      margin:15px;
    }
  }
  .face-case{
    width: 100%;
    // overflow: hidden;
    display: flex;
    // flex-flow: wrap;
  }
  .case{
    min-width: 600px;
    // width: 100%;height:100%; float: left;
  }
  .pane-bg{
    height: 8px;
    background-color:#f4f6f9;
    width: 100%;
    // margin-top: 20px;
  }
  .pane-bgc{
    background-color: #fff;
    height: 100%;
    // width: 100%;
    padding:10px 15px 20px 15px;
  }
  .searchMedicine-title{
    vertical-align: middle;
  }
  .searchMedicine{
    display: inline-block;
  }
  .medicenelist{
    padding:10px;
  }
  .add-sure{
    padding-left:15px;
  }
  .table-input{
    width: 80%;
    height: 25px;
    border: 1px solid $border-color-input;
    text-align: center;
    // max-width: 60px;
    display: inline-block;
  }
  .use-num{
    display: inline-block;
    width: 40px;
    // height: 20px;
  }
  .single-use{
    width: 25px;
    height: 25px;
  }
  .total{
    width: 25px;
  }
  .border{
    border:1px solid $border-color-input;
    height: 70%;
  }
  // .case-main{ margin:0 $right-width 0 $left-width;  height:100%; }  
  // .case-left {float: left;margin-left: -100%;height: 500px;width: $left-width; background-color: #1991fc}  
  // .case-right{float: left;margin-left: -$right-width;height: 500px;width: $right-width;background-color: #69dada}
  .case-main{height:100%; min-height: 750px;}  
  .case-left {height: 100%;min-height: 750px;min-width: $left-width; background-color: #fff;}  
  .case-right{height: 770px;min-height: 750px;min-width: $right-width;background-color: #fff;}
  .margin-top{
    margin-top:20px;
  }
  .case-wrap{
    margin-bottom: 8px;
  }
  .case-left{
    $font-color:#041421;
    $border-color:#a19696;
    text-align: center;
    padding-bottom: 20px;
    input{
      width: 80px;
    }
    .label{
      display: inline-block;
      width: 50px;
    }
    img{
      width: 120px;
    }
    &-img{
      margin-top:36px;
      text-align: center;
    }
    &-type{
      margin: 10px 0 20px 0;
      &-name{
        font-size: 24px;
        color:$font-color;
        display: inline-block;
      }
      &-se{
        display: inline-block;
        padding:2px 5px 2px 5px;
        border:1px solid $border-color;
        border-radius: $border-radius;
        color:#666;
        margin-left: 5px;
      }
    }
    &-btn{
      margin-bottom: 20px;
    }
    &-msg{
      margin-bottom: 20px;
      text-align: left;
      margin-left: 36px;
      &-single{
        margin-bottom: 20px;
        color: $font-color;
      }
    }
  }
  .case-main{
    &-content{
      margin:0 8px;
      background-color: #fff;
      padding:15px;
      min-height: 740px;
    }
    &-title{
      text-align: center;
      font-size: 24px;
      line-height: 60px;
      height: 60px;
    }
    &-rp{
      &-title{
        font-size: 20px;
        color: #1991fc;
        border-bottom: 1px solid $border-color-input;
        padding:30px 0 15px 0;
        margin-bottom: 20px;
      }
      table{
        border:1px solid $border-color-input;
        width: 100%;
        td,th{
          border:1px solid $border-color-input;
          text-align: center;
          vertical-align: middle;
          height: 42px;
        }
      }
    }
    &-footer{
      margin-top:20px;
      &-left{
        float: left;
        div{
          display: inline-block;
          margin-right: 30px;
        }
      }
      &-right{
        float: right;
        margin-right: 20px;
        &-total{
          font-size: 20px;
          color: #041421;
        }
        &-money{
          font-size: 20px;
          color: #1991fc;
          font-weight: bold;
        }
      }
    }
  }
  .case-right{
    &-main{
      margin: 0 auto;
    }
  }
  .print{
    display: none;
    div:nth-last-child(n+2){
      border-bottom: 1px solid #eaeaea;
    }
    padding-bottom: 30px;
    position: relative;
    span{
      display: inline-block;
      margin-top:10px;
      margin-bottom:10px;
      margin-right: 30px;
    }
    &-footer{
      position: absolute;
      bottom: 5px;
      right: 150px;
    }
  }
  @media print {
    .print{
      div:nth-last-child(n+2){
        border-bottom: 1px solid #eaeaea;
      }
      padding-bottom: 30px;position: relative;
      span{
        display: inline-block;margin-top:10px;margin-bottom:10px;margin-right: 30px;
      }
      &-footer{
        position: absolute;bottom: 5px;right: 150px;
      }
    }
  }
  .face{
    position: relative;
    line-height: 0;
    height: 0;
    font-size: 0;
    box-sizing: border-box; border: 0; margin: 0; padding: 0
  }
  .face::before{
    box-sizing: border-box; border: 0; margin: 0; padding: 0;
    /* z-index: 22222222222222; */
    /* top:0px; */
    left: 10px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    display: block;
    background: url('~icon/hospital-icon-93.png') no-repeat;
  }
  .vip{
    position: relative;
    line-height: 0;
    height: 0;
    font-size: 0;
    box-sizing: border-box; border: 0; margin: 0; padding: 0
  }
  .vip::before{
    box-sizing: border-box; border: 0; margin: 0; padding: 0;
    /* z-index: 22222222222222; */
    /* top:0px; */
    left: 10px;
    position: absolute;
    content: '';
    width: 64px;
    height: 44px;
    display: block;
    background: url('~icon/hospital-icon-93.png') no-repeat;
  }
</style>
<style>
@media print {
    /* .print{ */
  .title{
    font-size: 24px;
    text-align: center;
    padding-top: 66px;
    padding-bottom: 30px;
  }
  .title h1{
    margin-bottom: 5px;
  }
  .print{
    padding-bottom: 30px;position: relative;
  }
  .bottom-boder{
    border-bottom: 1px solid #eaeaea;
  }
  .diagnos{
    margin-top:20px;
    padding-left: 20px;
  }
  .diagnos p{
    margin-bottom: 20px;
  }
  .cardnum{
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .print-footer{
    position: absolute;bottom: 5px;right: 150px;
  }
  .base-info{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .base-info span{
    display: inline-block;
    width: 18%;
  }
  .info-card{
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .info-card span{
    display: inline-block;
    width: 40%;
  }
}
</style>


