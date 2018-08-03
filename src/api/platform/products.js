import fetch from '@/utils/fetch'

export function getProducts (params) {
  return fetch({
    url: '/platform/products',
    method: 'get',
    params: params
  })
}

export function getProductDetail (id) {
  return fetch({
    url: `/platform/product/${id}`,
    method: 'get'
  })
}

export function addProduct (data) {
  return fetch({
    url: '/platform/products',
    method: 'post',
    data: data
  })
}

export function updateProduct (id, data) {
  return fetch({
    url: `/platform/product/${id}`,
    method: 'post',
    data: data
  })
}

export function deleteProduct (id) {
  return fetch({
    url: `/platform/product/${id}`,
    method: 'delete'
  })
}
