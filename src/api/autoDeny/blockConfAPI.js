import fetch from '@/utils/fetch'

export function getBlockconf (params) {
  return fetch({
    url: '/autodeny/blockconf',
    method: 'get',
    params
  })
}

export function postBlockconf (data) {
  return fetch({
    url: '/autodeny/blockconf',
    method: 'post',
    data: data
  })
}

export function putBlockconf (data) {
  return fetch({
    url: '/autodeny/blockconf',
    method: 'put',
    data: data
  })
}

export function deleteBlockconf (id) {
  return fetch({
    url: `/autodeny/blockconf/${id}`,
    method: 'delete'
  })
}
