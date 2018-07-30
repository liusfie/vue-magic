import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/index'
import Layout2 from '@/views/layout2/index'
import Home from '@/router/home/index'
import dashboad from '@/router/dashboad/index'
import autodeny from '@/router/autoDeny/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/error/404', component: () => import('@/views/errorPage/404') },
    { path: '/error/500', component: () => import('@/views/errorPage/500') },
    { path: '/error/502', component: () => import('@/views/errorPage/502') },
    { path: '/error/504', component: () => import('@/views/errorPage/504') },
    { path: '/login', component: () => import('@/views/login/index') },
    { path: '/logo', redirect: '/home' },
    { path: '/sysview', redirect: '/home' },
    { path: '/opstool', redirect: '/home' },
    { path: '/other', redirect: '/home' },
    // 包含asidebar组件的view
    { path: '/',
      component: Layout,
      name: 'Layout',
      redirect: '/home',
      children: [
        ...dashboad,
        ...autodeny
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
    }
    // { path: '*', redirect: '/404' }
  ]
})

export default router
