import utils from '@/utils/utils'
export default [
  {
    path: '/platform',
    component: utils.asyncComponent('platform/index'),
    redirect: '/home',
    children: [
      {
        path: 'products',
        component: utils.asyncComponent('platform/products/index')
      },
      {
        path: 'nginxinfo',
        component: utils.asyncComponent('platform/nginxInfo/index')
      },
      {
        path: 'ownnetwork',
        component: utils.asyncComponent('platform/ownNetwork/index')
      }
    ]
  }
]
