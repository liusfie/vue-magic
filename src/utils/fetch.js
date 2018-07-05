import axios from 'axios';
import Qs from 'qs';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.build ? '' : '/api/',
  timeout: 5000,
  headers: {},
  // url参数形式 数组a=''&a='' 对象形式a.b.c='' 过滤掉字符串为空、null、undefined的字段
  paramsSerializer: function(params) {
    return Qs.stringify(params, {
      arrayFormat: 'repeat',
      allowDots: true,
      filter: (prefix, value) => {
        if (value === '') return;
        return value;
      },
      skipNulls: true
    });
  },
  // body参数形式 数组a[0]=''&a[1]='' 对象形式a.b.c='' 过滤掉字符串为空、null、undefined的字段 默认Content-Type: x-www-form-urlencoded
  transformRequest: [
    function(data) {
      return Qs.stringify(data, {
        allowDots: true,
        filter: (prefix, value) => {
          if (value === '') return;
          return value;
        },
        skipNulls: true
      });
    }
  ]
});
// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// response拦截器
service.interceptors.response.use(
  response => {
    // 未登录的情况 跳转到登录页面
    if (response.data.code === 10402) {
      const baseUrl = process.env.build ? '' : 'api/';
      window.location.href = `${baseUrl}login`;
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    });
    return Promise.reject(error);
  }
);
export default service;
