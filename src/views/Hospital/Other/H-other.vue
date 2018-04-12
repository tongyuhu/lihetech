<template>
  <div>
    <Hhospitalmsg></Hhospitalmsg>
    <HOtherTotal></HOtherTotal>
    <HOthertype></HOthertype>
  </div>
</template>

<script>
import Hhospitalmsg from '@/views/Hospital/H-hospitalMsg.vue'
import HOtherTotal from './H-otherTotal.vue'
import HOthertype from './H-othertype.vue'
export default {
  components: {
    Hhospitalmsg,
    HOtherTotal,
    HOthertype
  },
  data () {
    return {

    }
  }
}
</script>


