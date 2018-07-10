# vue-admin-fe

> A Vue.js project

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
```
## About API
get -> query
post -> add
put -> update
delete -> delete

## 关于proxy.js：
dev环境，由于跨域问题，利用request做了个代理，delete方法会识别成“OPTIONS”，所以代理上判断方法为“OPTIONS”的统一转发为delete方法。
后来从django上解决了跨域问题，就不在使用这个代理了。

### 关于views/components
 这是一个样式展示上的统一

 希望达到的效果是每次新增页面可以以传字段名称，类型等来控制所有

 以下是具体数据的含义解释

> className: 最外层父节点的类名

> pageTitle: 标题

> tableList: 列表中的信息
    > prop: 字段名
    > label: 文案
    > type:
        > 默认:    直接根据 prop 字段，字符串展示数据
        > time:   时间类型, 会格式化为字符串进行展示
        > switch: 切换/选择类型的字段, 即需要根据后端接口返回字段再判断展示对应文案的情况
    > ApiUrls: API接口
        > getData: 获取列表数据的接口
        > putData: 修改数据的接口
    > operateList: 操作们的LIST
        > type: modify: 修改, delete 删除
        > classType: 类名
        > text: 展示的文案
        > fn: 默认给出了 修改和删除的处理形式， 如需其他情况请自行定义执行函数


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
