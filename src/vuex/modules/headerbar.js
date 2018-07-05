export default {
  namespaced: true,
  state () {
    return {
      // 当前激活的menu
      menuList: []
    }
  },
  mutations: {
    // 设置当前激活menu的值
    setMenuList: (state, data) => {
      state.menuList = data
    }
  },
  actions: {},
  getters: {}
}
