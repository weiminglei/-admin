import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.permissions判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    const routePermissions = route.meta.permissions
    return permissions.some(item => routePermissions.includes(item))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter(routes, permissions) {
  const res = []
  const newPermissions = []
  permissions.forEach(permission => {
    newPermissions.push(permission)
    var permissionArray = permission.split('/')
    var modulePermission = permissionArray.shift()
    if (!newPermissions.includes(modulePermission)) {
      newPermissions.push(modulePermission)
    }
  })
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(newPermissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, newPermissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, permissions)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
