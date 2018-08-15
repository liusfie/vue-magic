import fetch from '@/utils/fetch'

export function getOwnNetwork (params) {
  return fetch({
    url: '/platform/ownnetwork',
    method: 'get',
    params: params
  })
}

export function addOwnNetwork (data) {
  return fetch({
    url: '/platform/ownnetwork',
    method: 'post',
    data: data
  })
}

export function updateOwnNetwork (id, data) {
  return fetch({
    url: `/platform/ownnetwork/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteOwnNetwork (id) {
  return fetch({
    url: `/platform/ownnetwork/${id}`,
    method: 'delete'
  })
}
