<template>
  <div>
    <h1>
      添加病人
    </h1>
    <div>
      <img src="http://www.lhtwell.com/img/imgOther/downloadIos.png" alt="">
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
