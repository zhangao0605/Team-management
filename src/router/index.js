import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
export const constantRouterMap = [{
    path: '/',
    redirect: '/index',
    hidden: true,
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index/index'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index'),
    hidden: true,
  },
  {
    path: '/bindingRelationship',
    name: 'bindingRelationship',
    component: () => import('../components/bindingRelationship'),
    hidden: true,
  },
  {
    path: '/rechargeRecord',
    name: 'rechargeRecord',
    component: () => import('../components/rechargeRecord'),
    hidden: true,
  },

  {
    path: '/withdrawalsRecord',
    name: 'withdrawalsRecord',
    component: () => import('../components/withdrawalsRecord'),
    hidden: true,
  },
  {
    path: '/numericalSetting',
    name: 'numericalSetting',
    component: () => import('../components/numericalSetting'),
    hidden: true,
  },
  {
    path: '/accountInformation',
    name: 'accountInformation',
    component: () => import('../components/accountInformation'),
    hidden: true,
  },
  {
    path: '/serviceMonitoring',
    name: 'serviceMonitoring',
    component: () => import('../views/home/home'),
    hidden: true,
  },
  // {
  //   path: '/posMining',
  //   name: 'posMining',
  //   component: () => import('../components/posMining'),
  //   hidden: true,
  // },


]


export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
