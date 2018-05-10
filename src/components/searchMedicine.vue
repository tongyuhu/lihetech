<template>
  <div class="searchMedicine">
    <div class="title">
    药品分类:
    </div>
    <div class="search">
      <!-- 药品分类 -->
      <el-cascader
        :options="options"
        :show-all-levels="false"
        @active-item-change="sickTypeChange"
        @change="getMedicine"
        placeholder="请选择"
        size="mini"
      ></el-cascader>
    </div>
    <div class="search-se">
      <!-- prefix-icon="el-icon-search" -->
      <el-input
        placeholder="搜索药物"
        v-model="searchMedicine"
        size="mini">
          <el-button slot="append" 
          icon="el-icon-search" 
          :style="{'background':'#fff','width': '44px','padding-left': '0px','padding-right': '0px'}"
          @click="search">
          </el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import {sickTypeApi, medicineTypeApi} from '@/api/components/addMedicine'
export default {
  name: 'searchMedicine',
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
      medicineList: [],
      searchMedicine: ''
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
      // console.log('type', val)
    },
    getMedicine (val) {
      let vm = this
      // console.log('get', val)
      let value = null
      if (val) {
        if (val.length !== 0) {
          if (val[2]) {
            value = val[2]
          }
        }
      }
      // new Promise(function (resolve) {
      vm.getMedicineList(value, vm.sickType)
      // }).then(function (val) {
        // console.log('list', vm.medicineList)
        // console.log('val', val)
      // })

      // this.getMedicineList(value, this.sickType)
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
    getMedicineList (val, type) {
      this.$axios(medicineTypeApi(val, type))
      .then(res => {
        let arr = []
        if (res.data) {
          // console.log('data', res.data)
          this.medicineList = []
          if (res.data.data) {
            if (res.data.data.length !== 0) {
              res.data.data.forEach((item, index) => {
                let obj = {}
                obj.medicineName = item.medicineName
                obj.drugSpec = item.drugSpec
                obj.id = item.id
                obj.medicineId = item.medicineId
                // obj.makeEnterprise = item.makeEnterprise
                // obj.medicineImgUrl = process.env.IMG_URL + item.medicineImgUrl
                arr.push(obj)
                this.medicineList.push(obj)
              })
            }
          }
        }
        // this.medicineList = arr
        // this.formetterMedicineList(this.medicineList)
        console.log('list1', this.medicineList)
        this.$emit('medicineList', this.medicineList)
        // console.log('arr', arr)
      })
    },
    search () {
      console.log(this.searchMedicine)
    }
  }
}
</script>

<style lang="scss" scoped>
  .searchMedicine{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    // width: 200px;
  }
  .search{
    display: inline-block;
    width: 150px;
  }
  .search-se{
    display: inline-block;
    width: 150px;
    margin-left:10px;
  }
  .title{
    display: inline-block;
    vertical-align: middle;
    width: 90px;
  }
</style>

