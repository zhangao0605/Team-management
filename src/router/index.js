import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
export const constantRouterMap = [
  {
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
  /*绑定关系*/
  {
    path: '/bindingRelationship',
    name: 'bindingRelationship',
    component: () => import('../components/bindingRelationship'),
    hidden: true,
  },
  /*充值记录*/
  {
    path: '/rechargeRecord',
    name: 'rechargeRecord',
    component: () => import('../components/rechargeRecord'),
    hidden: true,
  },

  /*提现记录*/
  {
    path: '/withdrawalsRecord',
    name: 'withdrawalsRecord',
    component: () => import('../components/withdrawalsRecord'),
    hidden: true,
  },
  /*数值设置*/
  {
    path: '/numericalSetting',
    name: 'numericalSetting',
    component: () => import('../components/numericalSetting'),
    hidden: true,
  },
  /*账户信息*/
  {
    path: '/accountInformation',
    name: 'accountInformation',
    component: () => import('../components/accountInformation'),
    hidden: true,
  },
  /*参考*/
  {
    path: '/serviceMonitoring',
    name: 'serviceMonitoring',
    component: () => import('../views/home/home'),
    hidden: true,
  },


]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
