<template>
  <div>
    <el-button @click="aa">11111</el-button>
    <el-row>
<!-- 病历标题 -->
      <div>
        <p>
            病历（面诊/远程）
        </p>
      </div>
<!-- 病历标题 end -->
<!-- 病历主体 -->
      <el-col :span='20'>
        <!-- 病人简单信息 -->
        <el-row :gutter='20'>
          <el-col :span="5">姓名：{{sickInfo.name}}</el-col>
          <el-col :span="5">性别：男</el-col>
          <el-col :span="5">年龄：56岁</el-col>
          <el-col :span="5">确诊为：心脏病</el-col>
        </el-row>
        <!-- 病人简单信息 end -->
        <!-- 病历卡 -->
        <el-row>
          <el-carousel arrow="always" height='500px' autoplay >
            <el-carousel-item>
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
                      <el-col :span="6" :offset="6">病历卡1</el-col> 
                      <el-col :span="6" >2014-8-9 星期5</el-col> 
                    </el-row>
                    <!-- 病人表格信息 表头 end -->
                    <!-- 病历卡表格 -->
                    <div>
                      <card></card>
                    </div>
                    <!-- 病历卡表格 end -->
                  </el-col>
                </el-row>
              </el-card>
            </el-carousel-item>
            <el-carousel-item>
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
                      <el-col :span="6" :offset="6">病历卡1</el-col> 
                      <el-col :span="6" >2014-8-9 星期5</el-col> 
                    </el-row>
                    <!-- 病人表格信息 表头 end -->
                    <!-- 病历卡表格 -->
                    <div>
                      <card></card>
                    </div>
                    <!-- 病历卡表格 end -->
                  </el-col>
                </el-row>
              </el-card>
            </el-carousel-item>
            
          </el-carousel>
        </el-row>
        <!-- 病历卡 end-->
        <!-- 血压趋势 -->
        <div>
          <chart></chart>
        </div>
        <!-- 血压趋势 end -->
      </el-col>
      <!-- 侧边导航 -->
      <el-col :span='4'>
        <div class="fixed">
          <p>{{ sickInfo.name }}</p>
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
      <!-- 侧边导航 end -->
    </el-row>
    

    
  </div>
</template>

<script>
import card from './card'
import chart from './chart'
export default {
  components: {
    card,
    chart
  },
  data () {
    return {
      autoplay: false,
      sickInfo: this.$route.params.sickInfo
      // name: this.$route.params.sickInfo.name
    }
  },
  methods: {
    aa () {
      console.log(this.$route.params.sickInfo)
    }

  }
  // computed: {
  //   sickInfo () {
  //     return this.$route.params.sickInfo
  //   }
  // }
}
</script>
<style>
  .el-carousel__arrow{
      /* top:30% !important; */
      top:140px !important;
      /* transform: translateY(60%); */
  }
</style>

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
  /* .el-carousel__arrow{
      top:10% !important;
  } */
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
