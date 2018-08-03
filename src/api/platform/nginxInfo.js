import fetch from '@/utils/fetch'

export function getNginxInfo (params) {
  return fetch({
    url: '/platform/nginxinfo',
    method: 'get',
    params: params
  })
}

export function getNginxInfoDetail (id) {
  return fetch({
    url: `/platform/nginxinfo/${id}`,
    method: 'get'
  })
}

export function addNginxInfo (data) {
  return fetch({
    url: '/platform/nginxinfo',
    method: 'post',
    data: data
  })
}

export function updateNginxInfo (id, data) {
  return fetch({
    url: `/platform/nginxinfo/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteNginxInfo (id) {
  return fetch({
    url: `/platform/nginxinfo/${id}`,
    method: 'delete'
  })
}
