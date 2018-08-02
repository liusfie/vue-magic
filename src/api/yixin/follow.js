import fetch from '@/utils/fetch'

export function addFollow (data) {
  return fetch({
    url: '/yixin/addfollow',
    method: 'post',
    data: data
  })
}

export function deleteFollow (data) {
  return fetch({
    url: '/yixin/delfollow',
    method: 'post',
    data: data
  })
}
