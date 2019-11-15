import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
import {getToken} from './utils/js/token'
NProgress.configure({showSpinner: false})
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  }else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      let path = '%2Fhome'
      next(`/login?redirect=${path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
