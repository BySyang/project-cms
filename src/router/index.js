import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import children from './children'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children,
      meta: {
        title: '后台首页',
        isVerify: true
      }
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})
//路由全局守卫
router.beforeEach(function (to, from, next) {
  const isLog = window.sessionStorage.getItem('isLog')=='true'?true:false;
  if (to.matched.some(r => r.meta.isVerify)) {
    if (!isLog) {
      next({
        name: 'login',
        query:{redirect:to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
  document.title = to.meta.title
})
export default router
