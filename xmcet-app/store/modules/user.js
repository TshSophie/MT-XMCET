

const user = {
  state: {
    token: '',
    authorized: true,
    userInfo: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AUTHORIZED: (state, authorized) => {
      state.authorized = authorized
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },

  actions: {

  }
}

export default user
