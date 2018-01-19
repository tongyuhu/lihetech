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
                <el-button type="plain" size="small">半年未做检查者</el-button>
              </el-col>
              <el-col :span="4">
                <el-select v-model="bloodheighType"  placeholder="糖尿病类型" size="mini">
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
                    placeholder="高血压类型"
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
                    v-model="value9"
                    remote
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
                <el-select
                v-model="value10"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="患者姓名"
                :remote-method="remoteMethod"
                :loading="loading"
                size="mini">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
              style="width: 100%"
              @cell-click="handlePersonMsg">
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
                      <el-button size="mini" type="primary" @click="care(scope.row)">关注</el-button>
                      <el-button size="mini" type="primary" @click="diagnose(scope.row)">诊断</el-button>
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
export default {
  data () {
    return {
      // sicklistData: [
      //   {
      //     name: '看看',
      //     sicktype: '舒张期高血压',
      //     badrate: '23%',
      //     badtimes: 5,
      //     status: '恶化',
      //     addtime: '2017-9-6'
      //               // action:
      //   },
      //   {
      //     name: '看看',
      //     sicktype: '舒张期高血压',
      //     badrate: '23%',
      //     badtimes: 5,
      //     status: '恶化',
      //     addtime: '2017-9-6'
      //   }
      // ],
      sicklistData: [],
      options4: [],
      value10: [],
      value9: '',
      list: [],
      loading: false,
      states: ['sasd', 'wqeee'],
      model1: '',
      sugerheighType: '',
      bloodheighType: ''
    }
  },
  methods: {

    diagnose (row) {
      console.log(row.name)
    },
    care (row) {
      console.log(row.care)
    },
    call (row) {
      console.log(row.id)
    },
    handlePersonMsg (row, column, cell, event) {
      // console.log(row, column, cell, event)
      // console.log(row)
      // console.log(column)
      // console.log(cell)
      // console.log(event)
      console.log(row.name)
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options4 = []
      }
    }
  },
  mounted () {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
    // this.$axios.get('https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sicklistData')
    this.$axios.post('https://easy-mock.com/mock/5a5ffcab4a073a3a0e0e9eed/hospital/sickMsgPost', {
      name: 'wang'
    })
    .then(response => {
      this.sicklistData = response.data.sickList
      console.log(response.data.sickList)
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
