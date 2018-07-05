import utils from '@/utils/utils'
export default [
  {
    path: '/opstool',
    component: utils.asyncComponent('opstool/index'),
    //    redirect: '/opstool/autodeny',
    children: [
      {
        path: 'autodeny',
        component: utils.asyncComponent('opstool/autodenyConfig/index')
      }
    ]
  }
]
