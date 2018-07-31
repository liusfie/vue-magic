import fetch from '@/utils/fetch'

export function getProducts (params) {
  return fetch({
    url: '/conf/products',
    method: 'get',
    params: params
  })
}

export function getProductDetail (id) {
  return fetch({
    url: `/conf/product/${id}`,
    method: 'get'
  })
}

export function addProduct (data) {
  return fetch({
    url: '/conf/products',
    method: 'post',
    data: data
  })
}

export function updateProduct (id, data) {
  return fetch({
    url: `/conf/product/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteProduct (id) {
  return fetch({
    url: `/conf/product/${id}`,
    method: 'delete'
  })
}
