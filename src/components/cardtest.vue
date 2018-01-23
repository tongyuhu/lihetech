<template>
  <div>
    <transition name="outIn" mode="out-in" class="qqq" ref="ref1">
      <el-row v-for="(item,index) in items" :key="item.index" v-if="item.if">
        <!-- 病人表格信息 表头 -->
        <el-card>
          <el-row>
            <el-col :span='24'>
              <el-row>
                <el-col :span="5">
                  <span>身高：191</span>
                </el-col>
                <el-col :span="5">
                  <span>体重：123</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <span>病史：恶性肿瘤 结核病</span>
                </el-col>
                <el-col :span="10">
                  <span>遗传史：恶性肿瘤 结核病</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <span>生活习惯：不抽烟 喝酒</span>
                </el-col>
                <el-col :span="8">

                  <span>并发症：眼病 足柄</span>
                </el-col>
                <el-col :span="7">
                  <!-- 1212121 -->
                  <el-button size="mini">
                    体检表
                  </el-button>
                  <el-button size="mini">
                    体检单
                  </el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">

                  <span>检查项目：心电图、肾脏</span>
                </el-col>
                <el-col :span="6">
                  <span>电话：18669874498</span>
                </el-col>
              </el-row>
              <el-row class="sick-card-center">
                <el-col :span="1">
                  <el-button @click="pre(index)" icon="el-icon-arrow-left" type="text" class="arrow"></el-button>
                </el-col>
                <el-col :span="5" :offset="6">病历卡1</el-col> 
                <el-col :span="11" >2014-8-9 星期5</el-col> 
                <el-col :span="1">
                  <el-button @click="beh(index)" icon="el-icon-arrow-right" type="text" class="arrow"></el-button>
                </el-col>
              </el-row>
              <!-- 病人表格信息 表头 end -->
              <!-- 病历卡表格 -->
              



              <table cellpadding='0' cellspacing="0">
                  <tr>
                    <th>用户自述</th>
                    <td> 
                      <!-- <span>
                        最近总是恶心、呕吐、浑身无力、四肢无力
                      </span>  -->
                      <el-row>
                        <el-col :span="20">最近总是恶心、呕吐、浑身无力、四肢无力</el-col>
                        <el-col :span="4">
                          <el-button size="mini" icon="el-icon-phone-outline">
                          </el-button>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <th>系统分析</th>
                    <td>
                      <span>
                        高血压用药不能停止，请继续服用
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>医生诊断</th>
                    <td>
                      <!-- <span>

                        您属于二型糖尿病、请按照下面的药品进行服用
                      </span>
                      <button>qq</button> -->
                      <el-row>
                        <el-col :span="18">
                          您属于二型糖尿病、请按照下面的药品进行服用
                        </el-col>
                        <el-col :span="4">
                          <el-button type="primary" size="mini">
                            发送语音
                          </el-button>
                        </el-col>
                        <el-col :span="2">
                          <el-button icon="el-icon-phone-outline" size="mini">
                          </el-button>
                        </el-col>
                      </el-row>
                    </td>
                    <!-- <td>
                    </td> -->
                  </tr>
                  
                  
                  
                  <tr>
                    <td>
                      <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                        <td class="text-center no-bottom-border no-top-border no-left-border">
                          医<br />生<br />方<br />案
                        </td>
                        <td class="no-border">
                          <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                            <tr>
                              <td class="text-center only-bottom-border">用药</td>
                            </tr>
                            <tr>
                              <td class="text-center only-bottom-border">运动</td>
                            </tr>
                            <tr>
                              <td class="text-center no-border">饮食</td>
                            </tr>
                          </table>
                        </td>
                      </table>
                    </td>
                    <td class="no-bottom-border">
                      <table cellpadding='0' cellspacing="0" class="border-collapse no-border">
                        <tr>
                          <td class="only-bottom-border">
                            <!-- <span>
                              药品1   药品2 
                            </span> -->
                            <el-row>
                              <el-col :span="18">
                                药品1   药品2 
                              </el-col>
                              <el-col :span="3">
                                <el-button type="primary" size="mini">
                                  删除
                                </el-button>
                              </el-col>
                              <el-col :span="3">
                                <el-button type="primary" size="mini">
                                  添加
                                </el-button>
                              </el-col>
                            </el-row>
                          </td>
                        </tr>
                        <tr>
                          <td class="only-bottom-border">
                            <!-- <span>
                              血压偏高，不宜大幅度运动、请选择每天步行30min
                            </span> -->
                            <el-row>
                              <el-col :span="18">
                                血压偏高，不宜大幅度运动、请选择每天步行30min
                              </el-col>
                              <el-col :span="3">
                                <el-button type="primary" size="mini">
                                  删除
                                </el-button>
                              </el-col>
                              <el-col :span="3">
                                <el-button size="mini" type="primary">
                                  添加
                                </el-button>
                              </el-col>
                            </el-row>
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
                    <th>
                      医生信息
                    </th>
                    <td>
                      <span>
                        李那那        上海张江高科诊所   糖尿病慢性病家庭医生
                      </span>
                    </td>
                  </tr>
                </table>









              <!-- 病历卡表格 end -->
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </transition>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {if: true,
          index: 0
        },
        {if: false,
          index: 1},
        {if: false,
          index: 2}
      ]
    }
  },
  methods: {
    pre (index) {
      let aaa = document.getElementsByClassName('qqq')[0]
      this.items.forEach(element => {
        element.if = false
      })
      if (index === 0) {
        this.items[this.items.length - 1].if = true
      } else {
        this.items[index - 1].if = true
      }

      console.log(index)
      console.log(this.$refs.ref)
    },
    beh () {

    }
  },
  mounted () {
    console.log(this.$refs.ref1)
  }
}
</script>

<style scoped>
.outIn-enter-active, .outIn-leave-active {
  transition: margin-left .5s ease;
  /* transition: opacity .5s ease; */
  /* transform: translateX(10px); */
}
.outIn-enter, .outIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes outIn-in {
  0% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(1500px);
  }
}
  	table{
			margin:0;
			padding: 0;
			border-spacing: 0px;
			border:1px solid #5555;
			border-collapse: collapse;
			width: 100%;
		}
		th{
			border:1px solid #5555;
      height: 30px;
		}
		td{
			border:1px solid #5555;
      height: 40px;
      text-align: center
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
    table span{
      /* padding-left: 20px; */
    }
    .sick-card-center{
      line-height: 50px;
    }
    .arrow{
      font-size: 24px;
    }
</style>

