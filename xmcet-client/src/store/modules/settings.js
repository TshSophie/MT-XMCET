import defaultSettings from '@/config/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export default {
  namespaced: true,
  state: {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
