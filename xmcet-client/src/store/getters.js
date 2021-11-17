const getters = {
  sidebar: state => state.app.sidebar,
  searchPanelStatus: state => state.app.searchPanelStatus,
  fixedHeader: state => state.settings.fixedHeader,
  size: state => state.app.size,
  device: state => state.app.device,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
export default getters
