<template>
  <div class="sick-list">
      <el-card>
        <!-- 患者列表标题 start -->
        <div slot="header">
            <span>高血压患者列表</span>
        </div>
        <!-- 患者列表标题 end -->

        <div>
          <!-- 添加病人 及筛选 start -->
          <div class="sick-list-filter">
            <el-row :gutter="10">
              <el-col :span="2">
                <el-button type="primary" size="small">添加病人</el-button>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-button type="plain" size="small" @click="halfyearSickList">半年未做检查者</el-button>
              </el-col>
              <el-col :span="4">
                <el-select v-model="bloodheighType"  
                placeholder="糖尿病类型" 
                size="mini" 
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
                    size="mini">
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
                    size="mini">
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
                <el-input placeholder="请输入姓名" v-model="sicknameSelectData" size="mini">
                  <el-button slot="append" icon="el-icon-search" @click="sicknameSelect"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <!-- 添加病人 及筛选 end -->

          <!-- 患者列表 start -->
          <div>
            <el-row>
              <el-table
              :data="sicklistData"
              border
              style="width: 100%">
                  <el-table-column 
                  prop="name"
                  label="姓名"
                  class-name="table-col"
                  label-class-name="table-col-label">
                    <template slot-scope="scope">
                      <el-button type="text" @click="diagnose(scope.row)">
                        {{scope.row.name}}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column 
                  prop="sicktype"
                  label="患者类型">
                  </el-table-column>
                  <el-table-column 
                  prop="badrate"
                  label="严重比例">
                  </el-table-column>
                  <el-table-column 
                  prop="badtimes"
                  label="严重次数">
                  </el-table-column>
                  <el-table-column 
                  prop="status"
                  label="病情">
                  </el-table-column>
                  <el-table-column 
                  prop="addtime"
                  label="加入时间">
                  </el-table-column>
                  <el-table-column
                  prop="action"
                  label=""
                  width="275px">
                  <template slot-scope="scope">
                      <el-button 
                      size="mini" 
                      type="primary" 
                      @click.native="care(scope.$index,sicklistData)" 
                      :key="scope.row.id" 
                      :style="{'width':'80px'}"
                      v-if="scope.row.care">
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button 
                      v-else
                      size="mini" 
                      type="plain" 
                      @click.native="care(scope.$index,sicklistData)" 
                      :key="scope.row.id" :style="{'width':'80px'}"
                      >
                        {{careText(scope.row.care)}}
                      </el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)" >诊断</el-button>
                      <el-button size="mini" icon="el-icon-phone-outline" @click="call(scope.row)">电话</el-button>
                  </template>
              </el-table-column>
              </el-table>
            </el-row>
          </div>
          <!-- 患者列表 end -->
        </div>
      </el-card>
  </div>
</template>

<script>
import {sicklistDataApi, halfyearSickListApi, sicknameSelectApi, sicktypeselect} from './../../../api/views/Hospital/BloodHeigh/H-sicklist'
import {careText, care} from './../../../untils/untils'
export default {
  data () {
    return {
      sicklistData: [],
      sicknameSelectData: '',
      // list: [],
      loading: true,
      sugerheighType: '',
      bloodheighType: '',
      sickstatus: ''
    }
  },
  methods: {
    careText,
    care,
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
    halfyearSickList () {
      this.$axios(halfyearSickListApi)
      .then(response => {
        this.sicklistData = response.data.halfyearSickList
        // console.log(response.data.halfyearSickList)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 搜索病人名字
    sicknameSelect () {
      this.$axios(sicknameSelectApi(this.sicknameSelectData))
      .then(response => {
        this.sicklistData = response.data.sick
      })
      .catch(err => {
        console.log(err)
      })
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
      margin-top: 40px;
  }
  .ivu-table-title {
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
  }
  .sick-list-filter{
    margin-bottom: 10px;
  }
</style>
