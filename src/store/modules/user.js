import { login, logout, getInfo } from '@/api/login'

const user = {
  state: {
    username: '',
    products: [],
    productid: ''
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products
    },
    SET_PRODUCTID: (state, productid) => {
      state.productid = productid
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(() => {
          // const data = response.data
          // setToken(data.token) // 登录成功后将token存储在cookie之中
          // commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          // 验证返回的products是否是一个非空数组
          if (data.products && data.products.length > 0) {
            commit('SET_PRODUCTID', data.products[0].id)
          }
          commit('SET_USERNAME', data.username)
          commit('SET_PRODUCTS', data.products)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_USERNAME', '')
          commit('SET_PRODUCTS', [])
          commit('SET_PRODUCTID', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
