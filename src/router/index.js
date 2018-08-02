import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/index'
import Layout2 from '@/views/layout2/index'
import Home from '@/router/home/index'
import dashboad from '@/router/dashboad/index'
import autodeny from '@/router/autoDeny/index'
import platform from '@/router/platform/index'
import yixin from '@/router/yixin/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/error/404', component: () => import('@/views/errorPage/404') },
    { path: '/error/50x', component: () => import('@/views/errorPage/50x') },
    { path: '/login', component: () => import('@/views/login/index') },
    { path: '/logo', redirect: '/home' },
    { path: '/sysview', redirect: '/home' },
    { path: '/opstool', redirect: '/home' },
    { path: '/confManage', redirect: '/home' },
    // 包含asidebar组件的view
    { path: '/',
      component: Layout,
      name: 'Layout',
      redirect: '/home',
      children: [
        ...dashboad,
        ...autodeny,
        ...platform,
        ...yixin
      ]
    },
    // 不包含asidebar组件的view
    { path: '/',
      component: Layout2,
      name: 'Layout2',
      redirect: '/home',
      children: [
        ...Home
      ]
    },
    { path: '*', redirect: '/error/404' }
  ]
})

export default router
