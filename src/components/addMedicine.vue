<template>
  <div class="add-medicine">
    <div class="add-medicine-top">
      <div>
        <!-- <el-select v-model="sickType" 
        placeholder="请选择"
        size='mini'
        @change="sickTypeChange">
          <el-option
            v-for="item in sickTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
        <el-select v-model="medicineType" 
        placeholder="请选择"
        size='mini'>
          <el-option
            v-for="item in medicineTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="medicineType" 
        placeholder="请选择"
        size='mini'>
          <el-option
            v-for="item in medicineTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-cascader
          :options="options"
          :show-all-levels="false"
          @active-item-change="sickTypeChange"
          @change="getMedicine"
          size="mini"
        ></el-cascader>
        <div style="display:inline-block">

          <el-input
            placeholder="搜索药物"
            prefix-icon="el-icon-search"
            v-model="searchMedicine"
            size="mini">
          </el-input>
        </div>
      </div>
      <div>
        <p class="histroy">历史用药</p>
        <div class="medicine-list">
          <div class="medice-msg" v-for="i in 2" :key="i">
            <div class="medice-msg-item">
              <img src="" alt="暂无药物图片" width="100px">
            </div>
            <div class="medice-msg-item">
              <div >
                <div class="medicine-name">
                  <span>降压灵</span>
                  <span>3粒/次</span>
                </div>
                <div class="medicine-address">
                  <span>广州白云山光华制药股份有限公司</span>
                </div>
              </div>
            </div>
            <div class="medice-msg-item">
              <count
              :initNum="1"
              unit="粒/次"></count>
            </div>
            <div class="medice-msg-item">
              <count
              :initNum="3"
              unit="次/日"></count>
            </div>
            <div>
              <button class="add-medicine-btn">添加</button>
            </div>
          </div>
        </div>
        <div class="clear-histroy">
          <button><span>清除历史</span></button>
        </div>
      </div>
    </div>
    <div class="add-medicine-bottom">
      <div class="medicine-list">
          <div class="medice-msg" v-for="item in medicineList" :key="item.id">
            <div class="medice-msg-item">
              <img :src="item.medicineImgUrl" alt="暂无药物图片" width="100px">
            </div>
            <div class="medice-msg-item">
              <div >
                <div class="medicine-name">
                  <span>{{item.medicineName}}</span>
                  <span>{{item.drugSpec}}</span>
                </div>
                <div class="medicine-address">
                  <span>{{item.makeEnterprise}}</span>
                </div>
              </div>
            </div>
            <div class="medice-msg-item">
              <count
              :initNum="1"
              unit="粒/次"></count>
            </div>
            <div class="medice-msg-item">
              <count
              :initNum="3"
              unit="次/日"></count>
            </div>
            <div>
              <button class="add-medicine-btn">添加</button>
            </div>
          </div>
        </div>
    </div>
    <!-- <div >2</div> -->
  </div>
</template>

<script>
import count from './../components/count.vue'
import {sickTypeApi, medicineTypeApi} from './../api/components/addMedicine'
export default {
  components: {
    count
  },
  data () {
    return {
      options: [
        {
          value: 1,
          label: '高血压',
          children: [{
            value: 'loading',
            label: '加载中...',
            disabled: true
          }]
        },
        {
          value: 2,
          label: '糖尿病',
          children: [{
            value: 'loading',
            label: '加载中...',
            disabled: true
          }]
        }
      ],
      sickType: null,
      searchMedicine: '',
      medicineList: []

    }
  },
  methods: {
    sickTypeChange (val) {
      let value = null
      if (isNaN(val[0])) {
        val = parseInt(val[0])
      }
      value = val[0]
      this.sickType = value
      this.getMedicineData(value)
    },
    getMedicineData (value) {
      this.$axios(sickTypeApi(value))
      .then(res => {
        // console.log('data', res.data.data)
        // console.log('value', value)
        let arr = []
        // let children = []
        if (res.data) {
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              arr = []
              res.data.data.forEach((item, index) => {
                let msg = {
                  children: []
                }
                msg.value = item.id
                msg.label = item.medicineName
                arr.push(msg)
                // console.log(item.list)
                if (item.list) {
                  if (item.list.length !== 0) {
                    item.list.forEach((medicine, index) => {
                      let twoEelect = {}
                      twoEelect.value = medicine.id
                      twoEelect.label = medicine.medicineName
                      msg.children.push(twoEelect)
                    })
                  }
                }
              })
            }
          }
        }
        if (value === 1) {
          this.options[0].children = arr
        }
        if (value === 2) {
          this.options[1].children = arr
        }
      })
    },
    getMedicine (val) {
      let value = null
      if (val) {
        if (val.length !== 0) {
          if (val[2]) {
            value = val[2]
          }
        }
      }
      // value = val
      console.log('id', value)
      console.log('type', this.sickType)
      // this.getMedicineList(val[0], val[2])
      this.getMedicineList(value, this.sickType)
    },
    getMedicineList (val, type) {
      this.$axios(medicineTypeApi(val, type))
      .then(res => {
        let arr = []
        if (res.data) {
          // console.log('data', res.data)
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                let obj = {}
                obj.medicineName = item.medicineName
                obj.drugSpec = item.drugSpec
                obj.id = item.id
                obj.medicineId = item.medicineId
                obj.makeEnterprise = item.makeEnterprise
                obj.medicineImgUrl = 'http://10.7.6.131:80/BPWatch' + item.medicineImgUrl
                arr.push(obj)
              })
            }
          }
        }
        this.medicineList = arr
        console.log('list', this.medicineList)
        console.log('arr', arr)
      })
    }
  }
}
</script>

<style scoped>
.add-medicine{
  background: #eaeaea;
  /* width: 100%; */
}
.add-medicine-top{
  background: #fff;
  margin-bottom: 4px;
}
.add-medicine-bottom{
  background: #fff;
}
.medice-msg{
  display: flex;
  align-items: center;
  justify-content:space-between;
   /* flex-wrap: nowrap ; */
  padding-top:14px;
  padding-bottom:16px;
  border-bottom: 1px solid #eaeaea;
}
.medice-msg-item{
  margin-right: 14px;
  display: flex;
  align-items: center;
}
.medice-msg-item span{
  display: inline-block;
}
.medicine-name{
  color: #041421;
  font-size: 16px;
}
.medicine-address{
  color: #666;
  font-size: 14px;
}
button{
  outline: none;
  border: none;
  background: #fff;
  cursor: pointer;
  color:#666;
  font-size: 16px;
  text-align: center;
}
.clear-histroy{
  text-align: center;
  padding-bottom: 16px;
}
.medice-msg:nth-last-child(1){
  border:none
}
.add-medicine-btn{
  background: #1991fc;
  color: #fff;
  width: 72px;
  height: 24px;
}
.add-medicine-btn:active{
  background: #1974c4;
  color: #fff;
  width: 72px;
  height: 24px;
}
.histroy{
  font-size:16px;
  color:#666;
  margin-top:14px;
}
</style>
