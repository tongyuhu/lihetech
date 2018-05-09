<template>
  <!-- <div class="case clear"> -->
    <!-- <div class="case-left">
      <div class="case-left-img">
        <img src="~icon/admin.jpg" alt="">
      </div>
      <div class="case-left-name">
        <span>周</span>
        <span>男|30岁</span>
      </div>
      <div>
        治疗中
      </div>
      <div>
        <button>历史病历</button>
        <button>完善信息</button>
      </div>
      <div>
        <div>
          <label for="heigh">身高：</label>
          <input type="text" id="heigh">
        </div>
        <div>
          <label for="weight">体重：</label>
          <input type="text" id="weight">
        </div>
        <div>
          <label for="BMI">BMI：</label>
          <input type="text" id="BMI">
        </div>
        <div>
          <label for="hot">体温：</label>
          <input type="text" id="hot">
        </div>
        <div>
          <label for="bloodheigh">血压：</label>
          <input type="text" id="bloodheigh">
        </div>
        <div>
          <label for="arm">脉搏：</label>
          <input type="text" id="arm">
        </div>

        
      </div>
      <div>
        <button>体检表</button>
        <button>体检单</button>
      </div>
    </div>
    <div class="case-right clear">
        <div class="case-right-content">
          <div>
            <div class="three">
                <div class="input-group">
                  <div for="name">姓名:</div>
                  <input type="text" id="name">
                </div>
            </div>
            
            <select>
              <option value="man">男</option>
              <option value="woman">女</option>
            </select>
            <label for="sicktime">患病时长</label>
            <input type="text" id="sicktime">
            <label for="phone">电话号码</label>
            <input type="text" id="phone">
            <select>
              <option value="diagos">初诊</option>
              <option value="rediagos">复诊</option>
            </select>
          </div>
          <div>
            <label for="name">姓名</label>
            <input type="text" id="name">
            <label for="name">姓名</label>
            <input type="text" id="name">
            <label for="name">姓名</label>
            <input type="text" id="name">
          </div>
        </div>
        <div class="case-right-sider">2</div>
    </div> -->
    <div class="face-case clear">
      

      <div class="case-left">
        <div class="case-left-img">
          <img src="~icon/admin.jpg" alt="">
        </div>
        <div class="case-left-type">
          <span class="case-left-type-name">周</span>
          <span class="case-left-type-se">治疗中</span>
        </div>
        <div class="case-left-btn">
          <el-button plain :style="{'color':'#1991fc'}">历史病历</el-button>
          <el-button plain :style="{'color':'#1991fc'}">完善信息</el-button>
        </div>
        <div class="case-left-msg">
          <div class="case-left-msg-single">
            <span class="label">性别：</span>
            <span>男</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">年龄：</span>
            <span>16</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">身高：</span>
            <span>172cm</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">体重：</span>
            <span>65kg</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label"> BMI： </span>
            <span>2.5</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">体温：</span>
            <span>36℃</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">血压：</span>
            <span>120/99</span>
            <input type="text" v-if="showEditMsg">
          </div>
          <div class="case-left-msg-single">
            <span class="label">脉搏：</span>
            <span>60/min</span>
            <input type="text" v-if="showEditMsg">
          </div>

          
        </div>
        <div>
          <el-button plain :style="{'color':'#1991fc'}">体检表</el-button>
          <el-button plain :style="{'color':'#1991fc'}">体检单</el-button>
        </div>
      </div> 
      <div class="case">  
          <div  class="case-main">
            <div class="case-main-content">
              <div class="case-main-title">
                <span>上海立阖泰医疗统一处方笺</span>
              </div>
              <el-row :gutter="10">
                <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">姓名:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div>患病时长:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="7" :lg="7" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div>电话号码:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="5" :lg="5" :md="24" :sm="24" :sx="24" class="margin-top">
                  <select>
                    <option value="man">男</option>
                    <option value="woman">女</option>
                  </select>
                  <select style="{'width':'40px'}">
                    <option value="diag">初诊</option>
                    <option value="rediag">复诊</option>
                  </select>

                </el-col>
                <!-- <el-col :span="2" :lg="3" :md="24" :sm="24" :sx="24" class="margin-top">

                </el-col> -->
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">病史:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="6" :lg="6" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">遗传史:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="12" :lg="12" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">生活习惯:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12" :lg="12" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">检查项目:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="12" :lg="12" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">并发症:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12" :lg="12" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group">
                    <div for="name">确诊疾病:</div>
                    <input type="text">
                  </div>
                </el-col>
                <el-col :span="12" :lg="12" :md="24" :sm="24" :sx="24" class="margin-top">
                  <div class="input-group" >
                    <div for="name">上次就诊时间:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="margin-top">
                <el-col>
                  <div class="input-group">
                    <div for="name">症状:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="margin-top">
                <el-col>
                  <div class="input-group">
                    <div for="name">诊所信息:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="margin-top">
                <el-col>
                  <div class="input-group">
                    <div for="name">医嘱:</div>
                    <input type="text">
                  </div>
                </el-col>
              </el-row>
              <div class="case-main-rp">
                <div class="case-main-rp-title">
                  <span>RP</span>
                </div>
                <table>
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
                    <td>序号</td>
                    <td>名称</td>
                    <td>单次用量</td>
                    <td>用法</td>
                    <td>频度</td>
                    <td>天数</td>
                    <td>总量</td>
                    <td>备注</td>
                    <td>编辑</td>
                  </tr>
                </table>
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
        <div>
          1
        </div>
      </div>  
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
      showEditMsg: false
    }
  }
}
</script>

<style lang="scss" scoped>
  
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
      border: 1px solid #dcdfe6;
      border-radius: 2px;
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
      border-radius: 2px;
      border: 1px solid #dcdfe6;
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
  select{
    // width: 100%;
    height: 30px;
    border:1px solid #eaeaea;
    border-radius: 2px;
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
    // text-align: center;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
  $left-width:216px;
  $right-width:420px;
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
  // .case-main{ margin:0 $right-width 0 $left-width;  height:100%; }  
  // .case-left {float: left;margin-left: -100%;height: 500px;width: $left-width; background-color: #1991fc}  
  // .case-right{float: left;margin-left: -$right-width;height: 500px;width: $right-width;background-color: #69dada}
  .case-main{height:100%; }  
  .case-left {height: 100%;min-width: $left-width; background-color: #1991fc}  
  .case-right{height: 100px;min-width: $right-width;background-color: #69dada}
  .margin-top{
    margin-top:20px;
  }
  .case-left{
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
        color:#fff;
        display: inline-block;
      }
      &-se{
        display: inline-block;
        padding: 2px;
        border:1px solid #fff;
        border-radius: 5px;
        color:#fff;
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
        color: #fff;
      }
    }
  }
  .case-main{
    &-content{
      margin:0 15px;
      background-color: #fff;
      padding:15px;
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
      border-bottom: 1px solid #eaeaea;
      padding:30px 0 5px 0;
      margin-bottom: 20px;
      }
      table{
        border:1px solid #eaeaea;
        width: 100%;
        td,th{
          border:1px solid #eaeaea;
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

</style>

