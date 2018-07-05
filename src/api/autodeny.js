import fetch from '@/utils/fetch'

export function getTableData (params) {
  return fetch({
    url: '/autodeny',
    method: 'get',
    params
  })
}
