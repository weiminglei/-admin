const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  permissions: state => state.account.permissions,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers
}
export default getters
