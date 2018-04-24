<template>
  <div id="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <h1>内衣商城后台管理系统</h1>
        <div class="search">
        <el-input placeholder="搜索" suffix-icon="el-icon-search" size="mini"></el-input>
        </div>
      </el-header>
        <!-- 头部栏目 -->
      <el-breadcrumb separator="|">
          <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'userInfo'}">会员信息</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'goodsClass'}">活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 页面导航 -->
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-menu router  :default-active="$route.path" unique-opened background-color="#324157
" text-color="#fff" active-text-color="#20a0ff" @open="handleOpen" @close="handleClose">
              <el-menu-item index="/home/index">
                <span slot="title"><i class="iconfont icon-fl-jia"></i>首页</span>
              </el-menu-item>
              <el-menu-item index="/home/userInfo">
                <span slot="title"><i class="iconfont icon-erji-yonghuguanli"></i>会员信息</span>
              </el-menu-item>

              <el-submenu index="/home/goodsClass">
                <span slot="title"><i class="iconfont icon-shangpinguanli"></i>商品管理</span>
                <el-menu-item-group>
                     <el-menu-item index="/home/goodsClass">商品分类</el-menu-item>
                    <el-menu-item index="/home/goodsAdd">添加商品</el-menu-item>
                 </el-menu-item-group>
              </el-submenu>

              <el-submenu index="/home/orders">
                <span slot="title"><i class="iconfont icon-jiaoyi1"></i>交易管理</span>
                <el-menu-item-group>
                  <el-menu-item index="/home/orders">订单管理</el-menu-item>
                  <el-menu-item index="/home/afterSales">售后服务</el-menu-item>
                  <el-menu-item index="/home/wuliu">物流管理</el-menu-item>
              </el-menu-item-group>
              </el-submenu>

              <el-submenu index="/home/pays">
                <span slot="title"><i class="iconfont icon-zhifu"></i>支付管理</span>
                <el-menu-item-group>
                  <el-menu-item index="/home/pays">支付管理</el-menu-item>
                  <el-menu-item index="/home/payConfig">支付配置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item index="/home/comments">
                <span slot="title"><i class="iconfont icon-pinglun"></i>评论管理</span>
              </el-menu-item>

              <el-submenu index="/home/web">
                <span slot="title"><i class="iconfont icon-qianduanyingyong"></i>前端管理</span>
                <el-menu-item-group>
                  <el-menu-item index="/home/web">栏目管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/home/log">
                <span slot="title"><i class="iconfont icon-rizhiguanli"></i>系统日志</span>
              </el-menu-item>
            </el-menu>
          </el-row>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
      <!-- 底部 -->

    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route);
    if (this.$route.name == "home") {
      this.$router.replace("/home/index");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push(key);
    },
    handleClose(key, keyPath) {
      this.$router.push(key);
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  padding-right: 25px;
  font-size: 18px;
}
.el-breadcrumb{
  position: absolute;
  line-height: 34px;
  width: 85.3%;
  height: 5%;
  background: white;
  margin-left: 14.8%;
  margin-top: 4.5%;
  color: white;
  // padding-left: 2px;

}
.el-header {
  background: #242f42;
  box-shadow: 0px 0px 8px 3px lightsteelblue;
  h1 {
    margin-top: 13px;
    height: 60px;
    color: white;
  }
}
.el-input--mini {
  position: absolute;
  top: 15px;
  right: 100px;
  outline: none;
  width: 150px;
  color: white;
}
.el-aside {
  background: #f2f2f2;
}
.el-footer {
  padding-top: 10px;
  background: #e1e1e1;
  text-align: center;
}
.el-submenu .el-menu-item {
    min-width: 199px;
}
.el-main{
  padding: 0;
}
</style>
