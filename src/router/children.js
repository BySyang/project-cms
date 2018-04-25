//用户管理
const userInfo = () =>
  import ( /* webpackChunkName: "body" */ '@/components/userInfo')
//首页
const index = () =>
  import ( /* webpackChunkName: "body" */ '@/components/index')
//评论管理
const comments = () =>
  import ( /* webpackChunkName: "body" */ '@/components/comments.vue')
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
const logs = () =>
  import ( /* webpackChunkName: "body" */ '@/components/logs')

const goodsClass = () =>
  import ( /* webpackChunkName: "body" */ '@/components/goodsClass')

const goodsAdd = () =>
  import ( /* webpackChunkName: "body" */ '@/components/goodsAdd')

const payConfig = () =>
  import ( /* webpackChunkName: "body" */ '@/components/payConfig')

const wuliu = () =>
  import ( /* webpackChunkName: "body" */ '@/components/wuliu')

const afterSales = () =>
  import ( /* webpackChunkName: "body" */ '@/components/afterSales')

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
    path: 'goodsClass',
    name: 'goodsClass',
    component: goodsClass,
    meta: {
      title: '商品分类'
    },
  },
  {
    path: 'goodsAdd',
    name: 'goodsAdd',
    component: goodsAdd,
    meta: {
      title: '商品添加'
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
    path: 'logs',
    name: 'logs',
    component: logs,
    meta: {
      title: '系统日志'
    },
  },
  {
    path: 'payConfig',
    name: 'payConfig',
    component: payConfig,
    meta: {
      title: '支付配置'
    },
  }, {
    path: 'wuliu',
    name: 'wuliu',
    component: wuliu,
    meta: {
      title: '物流管理'
    },
  }, {
    path: 'afterSales',
    name: 'afterSales',
    component: afterSales,
    meta: {
      title: '售后服务'
    },
  }

]
