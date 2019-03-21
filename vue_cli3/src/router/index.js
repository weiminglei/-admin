import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  children: [{
    path: 'dashboard',
    meta: {
      title: '控制台',
      icon: 'dashboard'
    },
    component: () => import('@/views/dashboard/index')
  }]
}]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/organization',
  component: Layout,
  name: 'Organization',
  redirect: 'noredirect',
  meta: {
    title: '组织架构管理',
    icon: 'fl-zuzhi',
    permissions: ['organization']
  },
  children: [{
    path: 'index',
    name: 'Team',
    meta: {
      title: '成员管理',
      icon: 'fl-zuzhi',
      permissions: ['organization/manager']
    }
  },
  {
    path: 'members',
    name: 'Members',
    component: () => import('@/views/organization/members'),
    meta: {
      title: '成员对外展示信息管理',
      icon: 'duiwairenzhi',
      permissions: ['organization/query']
    }
  },
  {
    path: 'operation',
    name: 'Operation',
    component: () => import('@/views/organization/operation'),
    meta: {
      title: '团队经营维护模式',
      icon: 'tuandui',
      permissions: ['organization/team_model_manager']
    }
  },
  {
    path: 'departed',
    name: 'Departed',
    component: () => import('@/views/organization/departed'),
    meta: {
      title: '离职成员管理',
      icon: 'lizhi',
      permissions: ['user_info_manager/agent_dimission_manager']
    }
  }]
},
// 微信客户管理
{
  path: '/customer',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    permissions: ['user_resouces_manager']
  },
  children: [{
    path: 'index',
    name: 'Customer',
    component: () => import('@/views/customer/index'),
    meta: {
      title: '微信客户资源管理',
      icon: 'point-map',
      permissions: ['user_resouces_manager/user_resource_view']
    }
  }]
},
// 用户权限管理
{
  path: '/permission',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    permissions: ['user_permission_manager']
  },
  children: [{
    path: 'index',
    name: 'Permission',
    component: () => import('@/views/roles/permission'),
    meta: {
      title: '权限管理',
      icon: 'san',
      permissions: ['user_permission_manager/agent_permission_manager']
    }
  }]
},
// 安全
{
  path: '/security',
  component: Layout,
  name: 'Security',
  redirect: 'noredirect',
  meta: {
    title: '安全',
    icon: 'anquan',
    permissions: ['security']
  },
  children: [{
    path: 'check-login',
    name: 'Security-Login',
    component: () => import('@/views/security/checkLogin'),
    meta: {
      title: '登录安全校验',
      icon: 'denglu',
      permissions: ['security/login']
    }
  },
  {
    path: 'mobile-function',
    name: 'Security-MFunction',
    component: () => import('@/views/security/mobileFunctions'),
    meta: {
      title: '移动端功能访问限制',
      icon: 'yidongduan',
      permissions: ['security/mobile-functions']
    }
  },
  {
    path: 'log',
    name: 'Security-Log',
    component: () => import('@/views/security/logs'),
    meta: {
      title: '操作日志',
      icon: 'icon-test',
      permissions: ['security/logger_view']
    }
  }]
},
// 报表
{
  path: '/report',
  component: Layout,
  name: 'Report',
  redirect: 'noredirect',
  alwaysShow: true,
  meta: {
    title: '报表',
    icon: 'report',
    permissions: ['report']
  },
  children: [{
    path: 'Report-Index',
    name: 'index',
    component: () => import('@/views/report/counts'),
    meta: {
      title: '微信客户数量统计',
      icon: 'weixintongji',
      permissions: ['report/export']
    }
  }]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}]
