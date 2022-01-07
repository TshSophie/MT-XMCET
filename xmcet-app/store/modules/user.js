

const user = {
  state: {
    token: '',
    authorized: false,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AUTHORIZED: (state, authorized) => {
      state.authorized = authorized
    },
  },

  actions: {

  }
}

export default user
