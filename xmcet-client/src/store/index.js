import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    app,
    user,
    permission,
    tagsView
  },
  state: {
  },
  mutations: {
  },
  getters
})

export default store
