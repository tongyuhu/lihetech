<template>
    <li>
        <div @click='toggle'>
            <i v-if='isFolder' class="fa" :class="[open?'fa-folder-open':'fa-folder']"></i>
            <!--isFolder判断是否存在子级改变图标-->
            <i v-if='!isFolder' class="fa fa-file-text"></i> 
            <router-link :to="{}" tag="span">{{model.data.menuName}}</router-link>
            <!-- <router-link  tag="span">{{model.data.menuName}}</router-link> -->
            <!-- {{model.data.menuName}} -->
        </div>
        <el-collapse-transition>
          <ul v-show="open" v-if='isFolder'>
              <Fmenu v-for='item in model.childTreeNode' :model='item' :key="item.id" :class="{'menu-content':unactive,'menu-content-active':active}"></Fmenu>
          </ul>
        </el-collapse-transition>
    </li>
</template>
<script type="text/javascript">
    export default {
      name: 'Fmenu',
      // props: ['model', 'itemclass'],
      props: {
        model: {
          default: []
        },
        itemclass: {
          default: ''
        }
      },
      components: {},
      data () {
        return {
          open: false,
          unactive: true,
          active: false
          // isFolder: true
        }
      },
      computed: {
        isFolder: function () {
          if (!this.model) {} else {
            return this.model.childTreeNode && this.model.childTreeNode.length
          }
        }
      },
      methods: {
        toggle: function () {
          if (this.isFolder) {
            this.open = !this.open
            this.unactive = !this.unactive
            this.active = !this.active
          }
        }
      }
    }
</script>
<style scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li{
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 16px;
    padding: 2px;
    
    /* opacity: 0.4; */
  }
  .menu-content{
    background-color: #1991fc;
    /* background-color: #1991fc99; */
    color: #fff;
  }
  .menu-content-active{
    /* background-color: #1991fc; */
    background-color: #1991fc99 !important;
    color: #fff;
  }
  .item-menu{
    /* background-color: #1991fc99; */
  }
</style>
