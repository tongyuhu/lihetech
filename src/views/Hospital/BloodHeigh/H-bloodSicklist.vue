<template>
  <div class="sick-list" id="bloodcases">
      <div class="sick-list-head">
        <p>高血压患者列表</p>
      </div>
      <el-card :body-style="{ padding: '0px' }">
        <!-- 患者列表标题 start -->
        <!-- 患者列表标题 end -->

        <div>
          <!-- 添加病人 及筛选 start -->
          <div class="sick-list-filter">
            <el-row :gutter="14">
              <!-- <el-col :span="2">
                <el-button type="primary" size="small">添加病人</el-button>
              </el-col> -->
              <el-col :span="4">
                <!-- <el-button type="plain" size="small" @click="halfyearSickList">半年未做检查者</el-button> -->
                <el-select v-model="checkTime"  
                placeholder="未检查时长" 
                size="small" 
                clearable 
                filterable	
                @change="selectTimeHandle">
                  <!-- <el-option v-for="item in cityList" :value="item.value" :key="item.value" :label="item.label">{{ item.label }}</el-option> -->
                  <el-option value="舒张期高血压" label="舒张期高血压">半年未检查</el-option>
                  <el-option value="舒张高血压" label="舒高血压">一年未检查</el-option>
                  <el-option value="高血压" label="舒张期血压">两年未检查</el-option>
                  <el-option value="舒张期" label="舒期血压">三年未检查</el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select v-model="bloodheighType"  
                placeholder="糖尿病类型" 
                size="small" 
                clearable 
                filterable	
                @change="selectsickType">
                    <!-- <el-option v-for="item in cityList" :value="item.value" :key="item.value" :label="item.label">{{ item.label }}</el-option> -->
                    <el-option value="舒张期高血压" label="舒张期高血压">舒期高血压</el-option>
                    <el-option value="舒张高血压" label="舒高血压">舒期压</el-option>
                    <el-option value="高血压" label="舒张期血压">舒张期高血压</el-option>
                    <el-option value="舒张期" label="舒期血压">舒期高压</el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select
                    v-model="sugerheighType"
                    remote
                    clearable 
                    placeholder="高血压类型"
                    @change="selectsickType"
                    size="small">
                    <el-option value="舒张期" label="舒张期"></el-option>
                    <el-option value="舒张期高" label="舒张期高血压"></el-option>
                    <!-- <el-el-option
                    v-for="item in el-options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-el-option> -->
                  </el-select>
              </el-col>
              <el-col :span="4">
                <el-select
                    v-model="sickstatus"
                    remote
                    clearable
                    @change="selectsickType"
                    placeholder="治疗效果"
                    size="small">
                    <!-- <el-el-option
                    v-for="item in el-options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-el-option> -->
                    <el-option value="xiaoguo" label="好转"></el-option>
                    <el-option value="xiaoguo2" label="恶化"></el-option>
                  </el-select>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="请输入患者姓名" v-model="sicknameSelectData" size="small"
                :style="{'padding':'0'}" 
                suffix-icon="el-icon-search"
                @blur="selectName"
                >
                  <!-- <el-button slot="suffix" icon="el-icon-search" type="text" @click="sicknameSelect"></el-button> -->
                </el-input>
              </el-col>
            </el-row>
          </div>
          <!-- 添加病人 及筛选 end -->

          <!-- 患者列表 start -->
          <div>
            <el-row>
              <div class="table">
                <el-table
                :data="sicklistData"
                style="width: 100%">
                  <el-table-column 
                  prop="name"
                  label="姓名"
                  label-class-name="tableTitle">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)"
                      :style="{'color':'#1991fc'}">
                        {{scope.row.name}}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column 
                  prop="sicktype"
                  label="患者类型"
                  label-class-name="tableTitle">
                  </el-table-column>
                  <el-table-column 
                  prop="badrate"
                  label="严重比例"
                  label-class-name="tableTitle">
                  </el-table-column>
                  <el-table-column 
                  prop="badtimes"
                  label="严重次数"
                  label-class-name="tableTitle">
                  </el-table-column>
                  <el-table-column 
                  prop="status"
                  label="病情"
                  label-class-name="tableTitle">
                  </el-table-column>
                  <el-table-column 
                  prop="addtime"
                  label="加入时间"
                  label-class-name="tableTitle">
                  </el-table-column>
                  <el-table-column
                  prop="action"
                  label=""
                  width="275px">
                    <template slot-scope="scope">
                        <el-button 
                        size="mini" 
                        type="primary" 
                        @click.native="isCare(scope.row)" 
                        :key="scope.row.id" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}"
                        >
                          <span v-if="scope.row.isDocusOn">取消关注</span>
                          <span v-if="!scope.row.isDocusOn">关注</span>
                        </el-button>
                        <el-button size="mini" type="primary" @click="diagnose(scope.row)" 
                        :style="{'width':'80px','backgroundColor':'#1991fc','color':'#fff'}">诊断</el-button>
                        <button class="telephone-btn" @click="call(scope.row)"><i class="telephone-btn-icon"></i></button>
                        <!-- <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-row>
          </div>
          <!-- 患者列表 end -->
        </div>
      </el-card>

      
  </div>
</template>

<script>
// import {careApi} from '@/api/views/Hospital/BloodHeigh/H-work'
import {sicklistDataApi, halfyearSickListApi, sicknameSelectApi, sicktypeselect} from './../../../api/views/Hospital/BloodHeigh/H-sicklist'
export default {
  data () {
    return {
      sicklistData: [],
      sicknameSelectData: '',
      // list: [],
      loading: true,
      sugerheighType: '',
      bloodheighType: '',
      sickstatus: '',
      checkTime: ''
    }
  },
  methods: {
    isCare (val) {
      // let sickid = ''
      // let hospitalid = ''
      // let care = ''
      // if (val && val.id) {
      //   sickid = val.id
      // }
      // if (val && val.adminHospitalId) {
      //   hospitalid = val.adminHospitalId
      // }
      // if (val && val.isDocusOn) {
      //   care = !val.isDocusOn + ''
      // } else {
      //   if (val && !val.isDocusOn) {
      //     care = !val.isDocusOn + ''
      //   }
      // }
      // let params = {
      //   'adminHospitalId': hospitalid,
      //   'userId': sickid,
      //   'isDocusOn': care
      // }
      if (val.isDocusOn === 'undefiend') {
        val.isDocusOn = false
      }
      val.isDocusOn = !val.isDocusOn
      // this.$axios(careApi(params))
      // .then(res => {
      //   if (res.data.code === '0000') {
      //     // val.isDocusOn = !val.isDocusOn
      //   }
      //   if (res.data.code === '1001') {
      //   }
      // })
      this.$mount('#app')
    },
    diagnose (row) {
      this.$router.push({name: 'bloodheighSick',
        params: {
          sickID: row.id
          // sickName: row.name,
          // sickId: row.id
        }})
    },
    // 未完善
    call (row) {
      console.log(row.id)
    },
    // 筛选病人类型
    selectsickType (sicktype) {
      // if()
      if (sicktype.length === 0) {

      } else {
        // console.log(this.bloodheighType)
        this.$axios(sicktypeselect(this.sugerheighType))
        .then(response => {
          this.sicklistData = response.data.halfyearSickList
        })
        .catch(err => {
          console.log(err)
        })
      }
      // console.log(111)
      // this.sugerheighType = ''
    },
    // 半年未检查
    selectTimeHandle () {
      this.$axios(halfyearSickListApi)
      .then(response => {
        this.sicklistData = response.data.halfyearSickList
        // console.log(response.data.halfyearSickList)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // halfyearSickList () {
    //   this.$axios(halfyearSickListApi)
    //   .then(response => {
    //     this.sicklistData = response.data.halfyearSickList
    //     // console.log(response.data.halfyearSickList)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    // 搜索病人名字
    sicknameSelect () {
      this.$axios(sicknameSelectApi(this.sicknameSelectData))
      .then(response => {
        this.sicklistData = response.data.sick
      })
      .catch(err => {
        console.log(err)
      })
    },
    selectName () {
      console.log(this.sicknameSelectData)
    }
  },
  mounted () {
    // let self = this
    // this.list = this.states.map(item => {
    //   return { value: item, label: item }
    // })
    this.$axios(sicklistDataApi)
    .then(response => {
      if (response.data.status === 200 && response.data.statusText) {
        this.sicklistData = response.data.sickList
        // console.log(response.data.sickList)
        // console.log(response.data)
        // console.log(response.status)
        // console.log(response.statusText)
        // console.log(response.headers)
        // console.log(response.config)
      } else {
        console.log('未请求成功')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .sick-list {
      margin-top: 30px;
  }
  .ivu-table-title {
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
  }
  .sick-list-filter{
    margin-top:24px;
    /* margin-bottom: 10px; */
    margin-left: 20px;
  }
  .table{
  margin: 0 0 0 20px;
  }
.telephone-btn{
  border: none;
  outline: none;
  background-color: #fff;
  height: 21px;
  width: 21px;
  padding: 0;
  margin:0;
  position: relative;
  cursor: pointer;
  font-size: 0;
  vertical-align: middle;
  /* margin-left: 10px; */
  /* width: 30px; */
  
}
/* .telephone-btn:hover{
  background-color: #f5f7fa;
} */
.telephone-btn-icon::after{
  cursor: pointer;
  position: absolute;
  /* top:3px;  */
  bottom:0;
  content: '';
  width: 21px;
  height: 21px;
  background: url('~icon/诊所-icon-23.png') no-repeat;
}
.sick-list-head p{
  font-size: 24px;
  color: #041421;
  margin: 0;
  margin-bottom: 10px;
  margin-left: 24px;
}
</style>
