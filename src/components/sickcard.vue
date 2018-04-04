<template>
  <div class="clear box" ref="sickCard">
      <div class="table-top">
        <span class="table-top-span">病历卡  {{currentpage}}/{{totalPage}}</span>
        <span>2017年4月12日 星期四</span>
      </div>
      <div>
        <table cellpadding='0' cellspacing="0" class="table">
              <tr>
                <th class="table-head">用户自述</th>
                <td> 
                  最近总是恶心、呕吐、浑身无力、四肢无力最近总是恶心、
           
            
                 
                  <el-button size="mini" type="text" class="table-btn" @click="play">
                    <i class="play"></i>播放
                  </el-button>
                  <audio src="" :id="'index'+index">
                  Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
              <tr>
                <th class="table-head">系统分析</th>
                <td>
                  <span>
                    高血压用药不能停止，请继续服用
                  </span>
                </td>
              </tr>
              <tr>
                <th class="table-head">医生诊断</th>
                <td>
                  您属于二型糖尿病、请按照下面的药品进行服用
                  <el-button type="text" size="mini" class="table-btn" @click="sendVoice(index)">
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
                        药品1   药品2 
                        <el-button type="text" size="mini" class="table-btn" @click="deleteMedicine(index)">
                          <i class="delete"></i>删除
                        </el-button>
                        <el-button type="text" size="mini" class="table-btn" @click="addMedicine(index)">
                          <i class="add"></i>添加
                        </el-button>
                      </td>
                    </tr>
                    <tr>
                      <td class="only-bottom-border">
                        <!-- <span>
                          血压偏高，不宜大幅度运动、请选择每天步行30min
                        </span> -->
                        
                            血压偏高，不宜大幅度运动、请选择每天步行30min
                          
                            <el-button type="text" size="mini" class="table-btn" @click="deleteSport(index)">
                              <i class="delete"></i>删除
                            </el-button>
                            <el-button type="text" size="mini" class="table-btn" @click="addSport(index)">
                              <i class="add"></i>添加
                            </el-button>
                          
                      </td>
                    </tr>
                    <tr>
                      <td class="no-border">
                        <span>
                          饮食清淡为主、不要多吃肉
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
                    李那那        上海张江高科诊所   糖尿病慢性病家庭医生
                  </span>
                </td>
              </tr>
            </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sickcard',
  props: {
    index: {
      type: [Number, String]
    },
    totalCard: {
      type: [Number, String]
    }
  },
  data () {
    return {
      currentpage: Number(this.index) + 1,
      totalPage: this.totalCard,
      items: [
        {
          show: true,
          index: 1
        },
        {
          show: false,
          index: 2
        },
        {
          show: false,
          index: 3
        }
      ],
      sickCardData: [
        {
          height: '181',
          weight: '66',
          historySick: '恶性肿瘤 结核病',
          geneticSick: '恶性肿瘤 结核病',
          liveHabits: '不抽烟 喝酒',
          complication: '眼病 足柄',
          checkItem: '心电图、肾脏',
          phone: '18669874498',
          checkTime: '2014-8-9 星期5',
          sickSay: '最近总是恶心、呕吐、浑身无力、四肢无力',
          sickSayUrl: '',
          systemResults: '高血压用药不能停止，请继续服用',
          doctorResults: '您属于二型糖尿病、请按照下面的药品进行服用',
          doctorResultsUrl: '',
          useMedicine: '药品1 药品2',
          sportSuggest: '血压偏高，不宜大幅度运动、请选择每天步行30min',
          foodSuggest: '饮食清淡为主、不要多吃肉',
          doctorMsg: '李那那 上海张江高科诊所 糖尿病慢性病家庭医生',
          inex: 1,
          new: true,
          show: true
        }

      ]
    }
  },
  methods: {
    left (table) {
      this.list = 'leftarrow'
      this.items.forEach((item, index) => {
        item.show = false
      })

      if (table >= this.items.length - 1) {
        this.items[0].show = true
      } else {
        this.items[table + 1].show = true
      }
    },
    right (table) {
      this.list = 'rightarrow'
      this.items.forEach((item, index) => {
        item.show = false
      })

      if (table <= 0) {
        this.items[this.items.length - 1].show = true
      } else {
        this.items[table - 1].show = true
      }
    },
    sendVoice (index) {
      // 当前病历卡位于 index+1
      // console.log(index)
    },
    play () {
      let id = 'index' + this.index
      this.$nextTick(function () {
        console.log(id)
        document.getElementById(id).play()
      })
    },
    addMedicine () {},
    deleteMedicine () {},
    addSport () {},
    deleteSport () {}
  },
  computed: {
    isnew () {
      if (this.index === 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // console.log('sickCard', this.$refs.sickCard.clientHeight)
    // this.height = this.$refs.card[0].$el.offsetHeight
    // console.log(this.$refs.card[0].$el.offsetHeight)
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
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-25.png') no-repeat;
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
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-26.png') no-repeat;
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
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-27.png') no-repeat;
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
    background: url('./../../hospitalImage/hospitalIcon/诊所-icon-28.png') no-repeat;
  }
</style>

