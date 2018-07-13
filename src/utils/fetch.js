import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
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
          if (value === '') return
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
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // return Promise.reject(new Error('error'))
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
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
