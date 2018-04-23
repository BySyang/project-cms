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
//销售管理
const sales = () =>
  import ( /* webpackChunkName: "body" */ '@/components/sales')



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
    path: 'sales',
    name: 'sales',
    component: sales,
    meta: {
      title: '销售管理'
    }
  }

]
