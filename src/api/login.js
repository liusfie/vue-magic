import fetch from '@/utils/fetch'

export function login (username, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo () {
  return fetch({
    url: '/user/info',
    method: 'get'
  })
}

export function getAllInfo () {
  return fetch({
    url: '/user/allinfo',
    method: 'get'
  })
}

export function logout () {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}
