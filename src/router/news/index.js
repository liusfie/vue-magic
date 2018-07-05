import utils from '@/utils/utils'
export default [
  {
    path: '/news',
    component: utils.asyncComponent('news/index'),
    redirect: '/news/zhihuribao',
    children: [
      {
        path: 'zhihuribao',
        component: utils.asyncComponent('news/zhihuribao/index')
      }
    ]
  }
]
