import fetch from '@/utils/fetch'

export function getList (params) {
  return fetch({
    url: '/menulist',
    method: 'get',
    params
  })
}
