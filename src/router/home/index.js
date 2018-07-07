import utils from '@/utils/utils'
export default [
  {
    path: '/home',
    component: utils.asyncComponent('home/index')
  }
]
