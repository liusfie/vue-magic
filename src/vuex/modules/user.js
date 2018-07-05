export default {
  namespaced: true,
  state () {
    return {
      // user信息
      user: ''
    }
  },
  mutations: {
    // 设置当前激活menu的值
    setUser: (state, data) => {
      state.user = data
    }
  },
  actions: {},
  getters: {}
}
