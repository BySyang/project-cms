//用户管理
const userInfo = () =>
  import ( /* webpackChunkName: "body" */ '@/components/userInfo')
//首页
const index = () =>
  import ( /* webpackChunkName: "body" */ '@/components/index')
//商品管理
const goods = () =>
  import ( /* webpackChunkName: "body" */ '@/components/goods')
//评论管理
const comments = () =>
  import ( /* webpackChunkName: "body" */  '@/components/comments.vue')
//订单管理
const orders = () =>
  import ( /* webpackChunkName: "body" */ '@/components/orders')
//支付管理
const pays = () =>
  import ( /* webpackChunkName: "body" */ '@/components/pays')
//前段管理
const web = () =>
import ( /* webpackChunkName: "body" */ '@/components/web')
//系统日志
const log = () =>
import ( /* webpackChunkName: "body" */ '@/components/log')



export default [{
    path: 'index',
    name: 'index',
    component: index,
    meta: {
      title: '首页'
    }
  },
  {
    path: 'userInfo',
    name: 'userInfo',
    component: userInfo,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: 'goods',
    name: 'goods',
    component: goods,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: 'comments',
    name: 'comments',
    component: comments,
    meta: {
      title: '评论管理'
    }
  },
  {
    path: 'orders',
    name: 'orders',
    component: orders,
    meta: {
      title: '订单管理'
    }
  },
  {
    path: 'pays',
    name: 'pays',
    component: pays,
    meta: {
      title: '支付管理'
    },
  },
  {
    path: 'web',
    name: 'web',
    component: web,
    meta: {
      title: '前端管理'
    },
  },
  {
    path: 'log',
    name: 'log',
    component: log,
    meta: {
      title: '系统日志'
    },
  }
]
