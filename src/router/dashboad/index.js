import utils from '@/utils/utils'
export default [
  {
    path: '/dashboad',
    component: utils.asyncComponent('dashboad/index'),
    redirect: '/dashboad/general',
    children: [
      {
        path: 'general',
        component: utils.asyncComponent('dashboad/general/index')
      },
      {
        path: 'nginx',
        component: utils.asyncComponent('dashboad/nginx/index')
      }
    ]
  }
]
