import utils from '@/utils/utils'
export default [
  {
    path: '/autodeny',
    component: utils.asyncComponent('autoDeny/index'),
    redirect: '/autodeny/blockconf',
    children: [
      {
        path: 'blockconf',
        component: utils.asyncComponent('autoDeny/blockConf/index')
      },
      {
        path: 'blocklist',
        component: utils.asyncComponent('autoDeny/blockList/index')
      }
    ]
  }
]
