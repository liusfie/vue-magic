import fetch from '@/utils/fetch'

export function getBlocklist (params) {
  return fetch({
    url: '/autodeny/blocklist',
    method: 'get',
    params: params
  })
}

export function addBlocklist (data) {
  return fetch({
    url: '/autodeny/blocklist',
    method: 'post',
    data: data
  })
}

export function updateBlocklist (id, data) {
  return fetch({
    url: `/autodeny/blocklist/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteBlocklist (id) {
  return fetch({
    url: `/autodeny/blocklist/${id}`,
    method: 'delete'
  })
}
