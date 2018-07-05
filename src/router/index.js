import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/index'
import news from '@/router/news/index'
import opsTool from '@/router/opstool/index'

Vue.use(VueRouter)

/* Layout */
// import Layout from '../views/layout/Layout'

const router = new VueRouter({
  routes: [
    { path: '/404', component: () => import('@/views/404') },
    { path: '/homepage', component: () => import('@/views/homepage/index') },

    { path: '/',
      component: Layout,
      name: 'Layout',
      redirect: '/homepage',
      children: [
        ...news,
        ...opsTool
      ]
    }
    // { path: '*', redirect: '/404' }
  ]})

export default router
