<template>
<div id="home">
    <el-container class="section1">
        <!-- 头部 -->
        <el-header>
            <div class="log"><i class="iconfont icon-lifangtilitiduomiantifangkuai2"></i> <span>后台管理系统</span></div>
            <!-- 头像 -->
            <img :src='img'>
            <!-- <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                <el-dropdown-item command="b">狮子头</el-dropdown-item>
                <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
              <el-badge :value="200" :max="99" class="item iconfont icon-tongzhi4">
              </el-badge>
        </el-header>
        <!-- 头部栏目 -->
        <!-- 页面导航 -->
        <el-container class="section2">
            <el-aside width="200px">
                <el-row class="tac">
                    <el-menu router :default-active="$route.path" unique-opened background-color="#001529 " text-color="#fff" active-text-color="#20a0ff" @open="handleOpen" @close="handleClose">
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
    </el-container>
</div>
</template>

<script>
export default {
    data() {
        return {
          img:require('../assets/personal.jpeg'),
        };
    },
    created() {
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
        },
        handleCommand(command) {
        this.$message('click on item ' + command);
      }
       
        
    }
};
</script>

<style lang="scss" scoped>

.iconfont {
    padding-right: 25px;
    font-size: 18px;
}

.el-breadcrumb {
    position: absolute;
    line-height: 34px;
    width: 85.3%;
    height: 5%;
    background: white;
    margin-left: 14.8%;
    margin-top: 4.5%;
    color: white;
}

.el-header {
    position: relative;
    background: white;
    box-shadow: 1px 0px 1px 0px lightgrey;
    z-index: 9;
    img{
      position: absolute;
      right: 100px;
      top: 0px;
      bottom: 0px;
      margin: auto 0px;
      z-index: 999;
      width: 40px;
      height: 40px;
      border-radius: 20px 20px;
    }
    .log {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -20px;
        text-align: center;
        line-height: 60px;
        width: 199px;
        background: #002140;
        height: 60px;
        color: white;
        z-index: 99;
    }
    .log span {
        font-size: 20px;
    }
    .log i {
        color: #1890ff;
        font-size: 24px;
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

.section2 {
    // border: 1px solid red;
    height: 700px;
    .el-aside {
        height: 100%;
        background: #f2f2f2;
        .tac {
            height: 100%;
        }
        .el-menu {
            height: 100%;
        }
    }
}

.el-submenu .el-menu-item {
    min-width: 199px;
}

.el-main {
    height: 100%;
    overflow: hidden;
    background-color: #f0f0f0;
    padding: 0;
}

.el-menu-item-group {
    ul li {
        padding-left: 64px !important;
    }
}
.el-badge {
  position: absolute;
  top: 15px;
  bottom: 0px;
  right: 5px;
  font-size: 26px;
  color: lightgray
}
</style>
