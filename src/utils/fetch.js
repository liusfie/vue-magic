import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000, // 请求超时时间
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
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
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
    if (res.code > 299) {
      Message({
        message: res.detail,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 530 || res.code === 531 || res.code === 532) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error('error'))
      // return response.data
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
