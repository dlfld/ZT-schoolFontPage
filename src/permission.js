import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const accessRoutes = await store.dispatch('permission/generateRoutes', "admin")
  router.addRoutes(accessRoutes)
  next()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page

  //     NProgress.done()
  //   } else {

  //     next()
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       // next()
  //       try {
  //         // const {
  //         //   roles
  //         // } = await store.dispatch('user/getInfo')

  //         const accessRoutes = await store.dispatch('permission/generateRoutes', "admin")
  //         router.addRoutes(accessRoutes)
  //         // next({
  //         //   ...to,
  //         //   replace: true
  //         // })
  //         next()
  //       } catch (error) {
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         // next()
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //  next()
  //   // if (whiteList.indexOf(to.path) !== -1) {
  //   //   // in the free login whitelist, go directly
  //   //   next()
  //   // } else {
  //   //   // other pages that do not have permission to access are redirected to the login page.
  //   //   next(`/login?redirect=${to.path}`)
  //   //   // next('/')
  //   //   NProgress.done()
  //   // }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
