import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, removeToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 判断是否有权限
function hasPermission(permissions, routerPermission) {
  // 如果mate中没有定义permissions，直接true
  if (!routerPermission) {
    return true
  }

  const newPermissions = []
  permissions.forEach(permission => {
    // 将返回的permission按照'/'分割 并取第一个作为一级菜单权限
    var permissionArray = permission.split('/')
    var modulePemission = permissionArray.shift()
    if (!newPermissions.includes(modulePemission)) {
      newPermissions.push(modulePemission)
    }
    newPermissions.push(permission)
  })
  return newPermissions.some(item => routerPermission.includes(item))
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist
let firstRequestPermission = true
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  const token = getToken()
  if (token) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else if (!firstRequestPermission) {
      next()
    } else {
      if (store.getters.permissions.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetPermission').then(res => { // 拉取user_info
          const permissions = res.data // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', {
            permissions
          }).then(() => { // 根据roles权限生成可访问的路由表
            firstRequestPermission = false
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          removeToken()
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证失败，请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
