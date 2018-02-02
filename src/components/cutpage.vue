<template>
  <div class="page-template"> 
    <div> 
      <div v-show="show"> 
        <ul class="pagelist"> 
          <!-- <li v-show="current_page>1" @click="current_page--">上一页</li>  -->
          <li class="pre-btn"><button @click="jumpPage(current_page,'front')"  :disabled="prebtn">上一页</button></li> 
          <li v-show="current_page>5" class="page" >
            <button @click="jumpPage(1)">1</button>
          </li> 
          <li class="ellipsis"  v-show="efont">...</li> 

          <li class="page" v-for="num in indexs" :key="num" ><button :class="{active:current_page==num}" @click="jumpPage(num)">{{num}}</button></li> 
          
          <li class="ellipsis"  v-show="after && current_page<(pages-5)">...</li> 
  
          <li class="page" v-show="current_page<(pages-5)" ><button  @click="jumpPage(pages)">{{pages}}</button></li> 

          <li class="pre-btn"><button @click="jumpPage(current_page,'after')" :disabled="afterbtn">下一页</button></li> 
  
          <li class="jumptext">跳转到：</li> 
          <li ><input class="jumpinput" style="width:40px;height:22px" size="1" type="text" v-model.number="changePage"></li> 
          <li class="gobtn" @click="jumpPage(changePage)">GO</li> 
        </ul> 
      </div> 
    </div> 
</div>
</template>

<script>
export default {
  props: {
    // current_page: {
    //   type: Number,
    //   default: 1
    // },
    pages: {
      type: Number,
      default: 1
    }
    // changePage: {
    //   type: Number,
    //   default: 1
    // }
  },
  data () {
    return {
      current_page: 1, // 当前页
      // pages: 50, // 总页数
      changePage: null, // 跳转页
      nowIndex: 1,
      prebtn: true,
      afterbtn: false
    }
  },
  computed: {
    // watchchangePage () {
    //   if (!(this.changePage instanceof Number)) {
    //     this.changePage = ''
    //   } else if (this.changePage < 0) {
    //     this.changePage = ''
    //   }
    // },
    show: function () {
      return this.pages && this.pages !== 1
    },
    efont: function () {
      if (this.current_page > 5) return true
      // if (this.current_page > 44) return false
    },
    after () {
      if (this.pages > 7) return true
    },
    indexs: function () {
      let left = 1,
        right = this.pages,
        ar = []
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3
          right = Number(this.current_page) + 3
        } else {
          if (this.current_page <= 5) {
            left = 1
            right = 7
          } else {
            right = this.pages

            left = this.pages - 6
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    jumpPage: function (page, tofrom) {
      if (tofrom === 'after') {
        this.current_page++
      } else if (tofrom === 'front') {
        if (page === 1) {
          this.current_page = 1
        } else {
          this.current_page--
        }
              // console.log(this.current_page)
      } else if (!(typeof this.changePage === 'number')) {
        this.changePage = 1
      } else {
        this.current_page = page
      }
      // this.current_page = id
      this.$emit('jumpPage', this.current_page)
    }
  },
  watch: {
    current_page: function () {
      if (this.current_page <= 1) {
        this.prebtn = true
      } else if (this.current_page >= this.pages) {
        this.afterbtn = true
      } else {
        this.prebtn = false
        this.afterbtn = false
      }
    }
  }

}
</script>

<style scoped>
.page-template{
  /* background-color: aquamarine; */
  text-align: center;
  user-select: none;
}
button{
  background-color: rgba(220, 226, 243, 0.8);
  border: none;
}
.pre-btn button{
   background-color: rgba(255, 255, 255, 0);
   border: 1px solid #ccc;
   border-radius: 5px;
   outline: none;
   cursor: pointer;
   padding: 5px 8px;
 }

.pre-btn button:active{
   background-color: #337ab7;
 }
 .ellipsis{
   font-size: 18px;
   font-weight: bold;
   cursor:auto;
 }
ul{
  display:inline-block;
  list-style:none;
  margin:0;
  padding:0;

}
li{
  display:inline-block;
  width:30px;
  margin-left:5px;
  /* background-color:rgba(194, 194, 194, 0.4); */
  text-align:center;
  cursor:pointer;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

.pre-btn{
  width: 70px;
  background-color: rgba(255, 255, 255, 0);
}
.jumptext{
  background-color:  rgba(255, 255, 255, 0);
  width: 70px;
  cursor:auto;
}
.page button{
  border: none;
  /* background-color: rgb(136, 75, 75); */
  outline: none;
  cursor: pointer;
  padding: 5px 8px;
}
/* .page button:focus{
  color: aqua;
} */
.active{
  color: rgb(44, 143, 146);
}
/* .active:focus{
  color: aqua;
} */
.jumpinput{
  padding: 0;
  margin: 0;
  border: 1px solid #666;
  border-radius: 5px;
  outline: 0;
  /* width: 25px; */
  /* size: 1; */
}
.gobtn{
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
}
</style>

