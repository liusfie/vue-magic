# vue-kantai

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
delete -> delete ：dev环境，由于跨域问题，利用request做了个代理，delete方法会识别成“OPTIONS”，所以代理上判断方法为“OPTIONS”的统一转发为delete方法。


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
