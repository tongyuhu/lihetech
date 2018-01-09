<template>
  <div>
    <el-row>
      <div>
        <p>
            病历（面诊/远程）
        </p>
      </div>
      <el-col :span='20'>
        <el-row :gutter='20'>
          <el-col :span="5">姓名：毛健康</el-col>
          <el-col :span="5">性别：男</el-col>
          <el-col :span="5">年龄：56岁</el-col>
          <el-col :span="5">确诊为：心脏病</el-col>
        </el-row>
        <el-row>
          <el-carousel arrow="always" height='500px'>
            <el-carousel-item>
              <el-card>
                <el-row>
                  <el-col :span='24'>
                    <el-row>
                      <el-col :span="5">
                        <span>身高：176</span>
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
                      <el-col :span="10">

                        <span>生活习惯：不抽烟 喝酒</span>
                      </el-col>
                      <el-col :span="10">

                        <span>并发症：眼病 足柄</span>
                      </el-col>
                      <el-col :span="4">
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
                      <el-col :span="20">

                        <span>检查项目：心电图、肾脏</span>
                      </el-col>
                      <el-col :span="4">
                        <span>电话：18669874498</span>
                      </el-col>
                    </el-row>
                    <el-row class="sick-card-center">
                      <span>病历卡1</span>  
                      <span>2014-8-9 星期5</span>
                    </el-row>
                    <!-- table -->
                    <!-- <el-row>
                      <el-row>
                        <el-col :span="2">
                          用户自述
                        </el-col>
                        <el-col :span="22">
                          最近总是恶心、呕吐、浑身无力、四肢无力
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="2">
                          系统分析
                        </el-col>
                        <el-col :span="22">
                          高血压用药不能停止，请继续服用
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="2">
                          医生诊断
                        </el-col>
                        <el-col :span="22">
                          您属于二型糖尿病、请按照下面的药品进行服用
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="1" class="textv">
                          医治方案
                        </el-col>
                        <el-col :span="1">
                          <el-row>
                              用药
                          </el-row>
                          <el-row>
                              运动
                          </el-row>
                          <el-row>
                              饮食
                          </el-row>
                        </el-col>
                        <el-col :span="22">
                          <el-row>
                            药品1   药品2
                          </el-row>
                          <el-row>
                            血压偏高，不宜大幅度运动、请选择每天步行30min
                          </el-row>
                          <el-row>
                            饮食清淡为主、不要多吃肉
                          </el-row>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="2">
                          医生信息
                        </el-col>
                        <el-col :span="22">
                          李那那        上海张江高科诊所   糖尿病慢性病家庭医生
                        </el-col>
                      </el-row>
                      
                    </el-row> -->
<div>
  <table class="table">
    <tr>
      <th>用户自述</th>
      <td colspan="2">最近总是恶心、呕吐、浑身无力、四肢无力</td>
    </tr>
    <tr>
      <th>系统分析</th>
      <td colspan="2">高血压用药不能停止，请继续服用</td>
    </tr>
    <tr>
      <th>医生诊断</th>
      <td colspan="2">
        您属于二型糖尿病、请按照下面的药品进行服用
        <button>qq</button>
      </td>
      <!-- <td>
      </td> -->
    </tr>
    <tr>
      <th rowspan='4' width="" class="textv">
      医<br>生<br>方<br>案
      </th>
    </tr>
    <tr>
      <th>
        用药
      </th>
      <td>
        药品1   药品2 
      </td>
    </tr>
    <tr>
      <th>
      运动
      </th>
      <td>
          血压偏高，不宜大幅度运动、请选择每天步行30min
      </td>
    </tr>
    <tr>
      <th>
        饮食
      </th>
      <td>
          饮食清淡为主、不要多吃肉
      </td>
    </tr>
    <tr>
      <th>
        饮食
      </th>
      <td colspan="2">
          饮食清淡为主、不要多吃肉
      </td>
    </tr>
  </table>
</div>


                  </el-col>
                  <!-- <el-col :span='4'></el-col> -->
                </el-row>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </el-col>
      <el-col :span='4'>
        <div class="fixed">
          <p>{{ name }}</p>
          <el-card :body-style="{ padding: '10px' }" class="right-nav">
            <div class="right-nav">
              <div>
                <el-button style="width:90px">病历</el-button>
              </div>
              <div>
                <el-button style="width:90px">图表信息</el-button>
              </div>
              <div>
                <el-button style="width:90px">用药</el-button>
              </div>
              <div>
                <el-button style="width:90px">原始数据</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '芬芳'
    }
  }
}
</script>

<style scoped>
.fixed {
  width: 16.66667%;
  position: fixed;
  right: -28px;
  top: 280px;
  text-align: center;
  }
  .fixed p{
    margin: 5px;
    width: 110px;
  }
  .el-carousel__arrow{
      top:20% !important;
  }
  .right-nav{
    display: flex;
    /* justify-content: flex-start; */
    align-items: flex-start;
    flex-direction: column;
    width: 110px;
  }
  .sick-card-center{
    border: 1px solid #5555;
    border-radius: 5px;
    padding:10px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .table{
    border: 1px solid #5555;
    width: 100%;
    border-collapse:collapse;
    margin-bottom: 10px;
  }
  .table th{
    border: 1px solid #5555;
    padding: 5px;
    /* width: 100%; */
  }
  .table td{
    border: 1px solid #5555;
    padding: 5px;
    /* width: 100%; */
  }
  /* .textv{
    writing-mode: tb-rl;
    -webkit-writing-mode: vertical-rl;      
    writing-mode: vertical-rl;
    *writing-mode: tb-rl;
  } */
</style>
