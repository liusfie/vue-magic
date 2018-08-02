import utils from '@/utils/utils'
export default [
  {
    path: '/yixin',
    component: utils.asyncComponent('yixin/index'),
    redirect: '/home',
    children: [
      {
        path: 'addfollow',
        component: utils.asyncComponent('yixin/addFollow/index')
      },
      {
        path: 'delfollow',
        component: utils.asyncComponent('yixin/delFollow/index')
      }
    ]
  }
]
