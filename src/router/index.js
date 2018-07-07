import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/index'
import Home from '@/router/home/index'
import news from '@/router/news/index'
import autodeny from '@/router/autodeny/index'

Vue.use(VueRouter)

/* Layout */
// import Layout from '../views/layout/Layout'

const router = new VueRouter({
  routes: [
    { path: '/404', component: () => import('@/views/404') },
    // { path: '/homepage', component: () => import('@/views/homepage/index') },

    { path: '/',
      component: Layout,
      name: 'Layout',
      redirect: '/home',
      children: [
        ...Home,
        ...news,
        ...autodeny
      ]
    }
    // { path: '*', redirect: '/404' }
  ]})

export default router
