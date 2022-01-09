const getters = {
  token: state => state.user.token,
  authorized: state => state.user.authorized,
  userInfo: state => state.user.userInfo,
}
export default getters
