<template>
<div>
  <div class="wrap">
    <div class="text404">
      <p><span>5</span><span>0</span><span>0</span></p>
    </div>
    <div class="text-wrap">
      <p>该页面不存在(´･ω･`)</p>
      <p>
        <a href="https://lhtwell.com/BPWatch/admin/login/page">前往首页</a>
      </p>
      <!-- <p>该页面不存在(´･ω･`),点此→<a href="http://www.klmai.cn" target="_blank">回到首页</a></p> -->
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
.wrap {
  // background-color: #ECECEC;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #3c3c3c;
  margin-top:15%;
}

.text404 p:first-child {
  text-align: center;
  font-family: cursive;
  font-size: 150px;
  font-weight: bold;
  line-height: 100px;
  letter-spacing: 5px;
  color: #fff;
}

.text404 p:first-child span {
  cursor: pointer;
  text-shadow: 0px 0px 2px #686868,
    0px 1px 1px #ddd,
    0px 2px 1px #d6d6d6,
    0px 3px 1px #ccc,
    0px 4px 1px #c5c5c5,
    0px 5px 1px #c1c1c1,
    0px 6px 1px #bbb,
    0px 7px 1px #777,
    0px 8px 3px rgba(100, 100, 100, 0.4),
    0px 9px 5px rgba(100, 100, 100, 0.1),
    0px 10px 7px rgba(100, 100, 100, 0.15),
    0px 11px 9px rgba(100, 100, 100, 0.2),
    0px 12px 11px rgba(100, 100, 100, 0.25),
    0px 13px 15px rgba(100, 100, 100, 0.3);
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.text404 p:first-child span:hover {
  text-shadow: 0px 0px 2px #686868,
    0px 1px 1px #fff,
    0px 2px 1px #fff,
    0px 3px 1px #fff,
    0px 4px 1px #fff,
    0px 5px 1px #fff,
    0px 6px 1px #fff,
    0px 7px 1px #777,
    0px 8px 3px #fff,
    0px 9px 5px #fff,
    0px 10px 7px #fff,
    0px 11px 9px #fff,
    0px 12px 11px #fff,
    0px 13px 15px #fff;
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.text404 p:not(:first-child) {
  text-align: center;
  color: #666;
  font-family: cursive;
  font-size: 20px;
  text-shadow: 0 1px 0 #fff;
  letter-spacing: 1px;
  line-height: 2em;
  margin-top: -50px;
}
.text-wrap{
  text-align: center;
  margin:30px auto;
}
.text-wrap a{
  display: inline-block;
  padding:10px;
  color: #1991fc;
  outline: none;
  text-decoration: none;
}
</style>


