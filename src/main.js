// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
import '@/permission' // permission control
import App from './App'
import router from './router'
import store from './store'

// 按需引入v-charts
import VeLine from 'v-charts/lib/line.common' // 折线图
import Veistogram from 'v-charts/lib/histogram.common' // 柱状图
Vue.component(VeLine.name, VeLine)
Vue.component(Veistogram.name, Veistogram)

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
