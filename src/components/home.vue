<template>
  <div id="home">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" alt="">
        <div class="search">
        <el-input placeholder="搜索" suffix-icon="el-icon-search" size="mini"></el-input>
        </div>
      </el-header>
      <!-- 页面导航 -->
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-menu router  :default-active="$route.path" unique-opened background-color="#2a3442" text-color="#a3bfb6" active-text-color="#fff" @open="handleOpen">
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
                <span slot="title"><i class="iconfont icon-jiaoyi"></i>交易管理</span>
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
              <el-menu-item index="/home/logs">
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
      <!-- <el-footer>
        <p>Copyright © 2010-2017</p>
        <p>FASHION WEB</p>
      </el-footer> -->
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.$route);
    if (this.$route.name == "home") {
      this.$router.replace("/home/index");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
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
.el-header {
  background: #72d0eb;
  img {
    height: 60px;
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
.el-main {
  overflow: hidden;
  background-color: #f0f0f0;
  padding: 0;
}
.el-menu-item-group {
  ul li {
    padding-left: 64px !important;
  }
}
</style>
