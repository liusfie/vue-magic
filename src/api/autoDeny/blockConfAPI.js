import fetch from '@/utils/fetch'

export function getBlockconf (params) {
  return fetch({
    url: '/autodeny/blockconf',
    method: 'get',
    params: params
  })
}

export function getBlockconfDetail (id) {
  return fetch({
    url: `/autodeny/blockconf/${id}`,
    method: 'get'
  })
}

export function addBlockconf (data) {
  return fetch({
    url: '/autodeny/blockconf',
    method: 'post',
    data: data
  })
}

export function updateBlockconf (id, data) {
  return fetch({
    url: `/autodeny/blockconf/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteBlockconf (id) {
  return fetch({
    url: `/autodeny/blockconf/${id}`,
    method: 'delete'
  })
}
