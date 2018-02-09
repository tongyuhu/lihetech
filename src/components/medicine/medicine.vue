<template>
  <div>
    <div>
      <el-select 
        v-model="medicineType" 
        clearable 
        placeholder="高血压"
        @change="medicineTypeHandle"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <el-select v-model="medicineType2" clearable placeholder="请选择" @change="medicineclassHandle">
        <el-option
          v-for="item in medicineclass"
          :key="item.id"
          :label="item.medicineName" 
          :value="item.id">
        </el-option>
      </el-select>
      <!-- <el-select v-model="medicineType3" clearable placeholder="请选择">
        <el-option
          v-for="item in medicineclass"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
    </div>
    <!-- <div>
      <div v-for="item in medicines" :key="item.createTime">
        药物类名：{{item.medicineName}}

        <div v-for="i in item.list" :key="i.createTime">
            二级药物：{{i.medicineName}}
            
            <p v-for="me in meds" :key="me.createTime">
              药物:{{me.medicineName}}
            </p>
        </div>
      </div>
    </div> -->
    <div>
      {{medicineclass}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          value: 'heightBlood',
          label: '高血压'
        }, {
          value: 'heightSuger',
          label: '糖尿病'
        }],
      // medicineclass: [
      //   {
      //     value: 'heightBlood',
      //     label: '高血压'
      //   }, {
      //     value: 'heightSuger',
      //     label: '糖尿病'
      //   }],
      medicine: [
        {
          value: 'heightBlood',
          label: '高血压'
        }, {
          value: 'heightSuger',
          label: '糖尿病'
        }],
      medicineType: 'heightBlood',
      medicineType2: '',
      medicineType3: '',
      medicines: [],
      // medicinelists: [],
      meds: [],
      qesarr: []
    }
  },
  methods: {
    medicineTypeHandle (val) {
      let med = ''
      if (this.medicineType === 'heightBlood') {
        med = 1
      } else {
        med = 2
      }
      this.$axios({
        method: 'post',
        url: '/medicine/directory/list',
        data: {
          medicineType: med
        }
      })
      .then(res => {
        // let ree = []
        this.medicines = res.data.data
        // this.medicineclass = this.medicines
        // let ree = res.data.data
        // ree.forEach(item => {

        // })
      })
      .catch()
    },
    medicineclassHandle (val) {
      if (!val) return
      console.log(val)
      let arr = this.medicines[val].list
      let arrid = []
      arr.forEach(item => {
        arrid.push(item.id)
        console.log(arrid)
      })
      // this.qesarr = arrid
    }
  },
  computed: {
    medicineclass () {
      let arr = []
      this.medicines.forEach(item => {
        let obj = {}
        obj.id = item.id
        obj.medicineName = item.medicineName
        arr.push(obj)
      })
    },
    medicinelists () {

    }
    // medicineType2 () {

    // }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/medicine/directory/list',
      data: {
        medicineType: 1
      }
    })
      .then(res => {
        // let ree = []
        this.medicines = res.data.data
        // this.medicineclass = this.medicines
        // let ree = res.data.data
        // ree.forEach(item => {

        // })
      })
      .catch()
    this.$axios({
      method: 'post',
      url: '/medicine/blood/list',
      data: {
        medicineId: 8
      }
    })
      .then(res => {
        // let ree = []
        this.meds = res.data.data
        // let ree = res.data.data
        // ree.forEach(item => {

        // })
      })
      .catch()
  }
}
</script>

<style>

</style>
