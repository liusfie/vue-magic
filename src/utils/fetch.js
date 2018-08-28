import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000, // 请求超时时间
  headers: {},
  // url参数形式 数组a=''&a='' 对象形式a.b.c='' 过滤掉字符串为空、null、undefined的字段
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'repeat',
      allowDots: true,
      filter: (prefix, value) => {
        if (value === '') return
        return value
      },
      skipNulls: true
    })
  },
  // body参数形式 数组a[0]=''&a[1]='' 对象形式a.b.c='' 过滤掉字符串为空、null、undefined的字段 默认Content-Type: x-www-form-urlencoded
  transformRequest: [
    function (data) {
      return Qs.stringify(data, {
        allowDots: true,
        filter: (prefix, value) => {
          // if (value === '') return
          return value
        },
        skipNulls: true
      })
    }
  ]
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(response.status)
    if (res.code > 299) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 490 || res.code === 491 || res.code === 492) {
        Message({
          message: res.detail,
          type: 'warning',
          duration: 5 * 1000
        })
        store.dispatch('LogOut').then(() => {
          router.push({path: '/login'})
        })
        return false
      }
      Message({
        message: res.detail,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    // console.log('err:' + error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 跳转到登录页面
          router.push({
            path: '/login'
          })
          break
        case 404:
          router.push({
            path: '/error/404'
          })
          break
        case 500:case 502:case 504:
          router.push({
            path: '/error/50x'
          })
          break
      }
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
