import utils from '@/utils/utils'
export default [
  {
    path: '/platfrom',
    component: utils.asyncComponent('platform/index'),
    redirect: '/home',
    children: [
      {
        path: 'products',
        component: utils.asyncComponent('platform/products/index')
      }
    ]
  }
]
