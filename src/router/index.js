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
    { path: '/404', component: () => import('@/views/404') },
    { path: '/login', component: () => import('@/views/login/index') },
    { path: '/logo', redirect: '/home' },
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
    },
    { path: '*', redirect: '/404' }
  ]
})

export default router
