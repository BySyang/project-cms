<template>
  <div id="home">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" alt="">
        <div class="search">
        <el-input placeholder="搜索" suffix-icon="el-icon-search" size="mini"></el-input>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-menu :default-active="active"  background-color="#2a3442" text-color="#a3bfb6" active-text-color="#fff">
              <el-menu-item index="1" @click="lingTo('index')">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="2" @click="lingTo('userInfo')">
                <i class="el-icon-document"></i>
                <span slot="title">用户信息</span>
              </el-menu-item>
              <el-menu-item index="3" @click="lingTo('goods')">
                <i class="el-icon-setting"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
              <el-menu-item index="4" @click="lingTo('orders')">
                <i class="el-icon-setting"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
              <el-menu-item index="5" @click="lingTo('sales')">
                <i class="el-icon-setting"></i>
                <span slot="title">销售管理</span>
              </el-menu-item>
              <el-menu-item index="6" @click="lingTo('comments')">
                <i class="el-icon-setting"></i>
                <span slot="title">评论管理</span>
              </el-menu-item>
            </el-menu>
          </el-row>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
      <el-footer>
        <p>Copyright © 2010-2017</p>
        <p>FASHION WEB</p>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ["index", "userInfo", "goods", "orders", "sales", "comments"],
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  computed: {
    active() {
      let i;
      let path = this.$route.path;
      this.list.forEach((val, index) => {
        if (path.indexOf(val) > -1) {
          i = (index + 1).toString();
        }
      });
      return i ? i : "1";
    }
  },
  created() {
    if (this.$route.path.endsWith("index")) {
      this.lingTo("index");
    }
  },
  methods: {
    lingTo(link) {
      this.$router.push({ name: link });
    }
  }
};
</script>
<style lang="scss" scoped>
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
.el-main {
  height: 500px;
}
.el-footer {
  padding-top: 10px;
  background: #e1e1e1;
  text-align: center;
}
</style>
