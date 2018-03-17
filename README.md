# lihetaech

> webapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


> Fmenu使用 
``` 
<div
    v-for="item in menu"
    :key="item.id"
    >
      <Fmenu 
        :iconName="item.iconName"  
        :title="item.title"
        :pathname="item.pathname"
        :index="item.id"
        :isOpen="item.open">
          <FmenuItem
          v-for="i in item.child"
          :key="i.title"
          :title="i.title"
          :index="i.index"
          :id="i.id"
          @activeitemmenu="goanchor"></FmenuItem>
      </Fmenu>
    </div>
```
> iconName 自定义图标名称

> title 导航栏名称

> pathname 导航链接router name

> index 定义index Number

> isOpen  默认打开 Boolean

> title 子导航栏名称

> index  子导航index 需不同

> id 传入子导航的需要跳转的DOM id

> @activeitemmenu 点击子导航触发的事件
