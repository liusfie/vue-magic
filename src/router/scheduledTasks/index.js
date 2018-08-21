import utils from '@/utils/utils'
export default [
  {
    path: '/scheduledtasks',
    component: utils.asyncComponent('scheduledTasks/index'),
    redirect: '/scheduledtasks/supervisormanage',
    children: [
      {
        path: 'supervisormanage',
        component: utils.asyncComponent('scheduledTasks/supervisorManage/index')
      }
    ]
  }
]
