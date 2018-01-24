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
          <el-col :span="5">姓名：{{sickBasics.name}}</el-col>
          <el-col :span="5">性别：{{sex}}</el-col>
          <el-col :span="5">年龄：56岁</el-col>
          <el-col :span="5">确诊为：心脏病</el-col>
        </el-row>
        <!-- 病人简单信息 end -->
        <!-- 病历卡 -->
        <sickcard></sickcard>
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
          <p>{{ sickBasics.name }}</p>
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
import sickcard from './../sickcard.vue'
import chart from './chart'
import {bloodheighSickDataApi} from './../../api/components/BloodheighSickcard/bloodheighSick'
export default {
  components: {
    sickcard,
    chart
  },
  data () {
    return {
      autoplay: false,
      sickInfo: [],
      sickBasics: {
        method: 1,
        name: '毛健康',
        sex: 1,
        age: 56,
        sick: '原发性高血压'
      }
      // sickID: ''
      // sickInfo: this.$route.params.sickInfo
      // name: this.$route.params.sickInfo.name
    }
  },
  methods: {
    aa () {
      console.log(this.$route.params.sickID)
    }

  },
  computed: {
    sex () {
      if (this.sickBasics.sex === 0) {
        return '女'
      } else {
        return '男'
      }
    },
    sickID () {
      return this.$route.params.sickID
    }
  },
  mounted () {
    this.$axios(bloodheighSickDataApi(this.sickID))
    .then((response) => {
      this.sickInfo = response.data.sickList[0]
    })
    .catch(err => {
      return err
    })
  }
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
