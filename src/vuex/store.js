import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'

import headerBar from './modules/headerbar'
import user from './modules/user'

Vue.use(Vuex)

const baseUrl = process.env.build ? '' : 'api/'
const defaultState = {
  URL: {
    baseUrl: baseUrl,
    uploadImg: `${baseUrl}uploadimg/`,
    login: `${baseUrl}login`
  }
}
const state = defaultState
const mutations = {}

export default new Vuex.Store({
  state () {
    return state
  },
  actions,
  mutations,
  getters,
  modules: {
    // menu模块
    headerBar: headerBar,
    user: user
  }
})
