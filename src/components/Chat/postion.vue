<template>
    <div class="amap-page-container">
      <div :id="id" class="amap-demo">
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
      width:300px;
    }
    #gaode{
      height: 300px;
      width:300px;
    }
  </style>

<script>
export default {
  name: 'amap-page',
  props: {
    position: Array,
    tip: '',
    mapId: ''
  },
  data () {
    return {
      zoom: 14,
      center: this.position,
      id: this.mapId
    }
  },
  mounted () {
    // window.onLoad = function () {
    //   var map = new AMap.Map('container')
    //   }
    //   var url = 'http://webapi.amap.com/maps?v=1.4.6&key=2cfe1d4f0a4041df6e7e3635c9b25f52&callback=onLoad'
    //   var jsapi = doc.createElement('script')
    //   jsapi.charset = 'utf-8'
    //   jsapi.src = url
    //   document.head.appendChild(jsapi)
    let vm = this
    console.log('map', vm.id, vm.center)
    var map = new AMap.Map(vm.id)
    var map = new AMap.Map(vm.id, {
      zoom: 14, // 级别
      center: vm.center, // 中心点坐标
      viewMode: '3D'// 使用3D视图
    })
    var info = vm.tip
    var infoWindow = new AMap.InfoWindow({ // 创建信息窗体
      isCustom: true,  // 使用自定义窗体
      content: '<div style="background:rgba(0, 0, 0, 0.4);color:#fff;padding:5px;">' + info + '</div>', // 信息窗体的内容可以是任意html片段
      offset: new AMap.Pixel(0, -40)
    })
    var onMarkerClick = function (e) {
      infoWindow.open(map, e.target.getPosition())// 打开信息窗体
        // e.target就是被点击的Marker
    }
    var marker = new AMap.Marker({
      position: vm.center
    })
    map.add(marker)
    marker.on('click', onMarkerClick)// 绑定click事件
  }
}
</script>