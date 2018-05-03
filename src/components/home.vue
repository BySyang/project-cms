<template>
<div id="home">
    <el-container class="section1">
        <!-- 头部 -->
        <el-header>
            <div class="log"><i class="iconfont icon-lifangtilitiduomiantifangkuai2"></i> <span>内衣管理系统</span></div>
            <!-- 头像 -->
            <div class="log_item">
                <img :src='img'>
                <!-- <el-upload class='ensure ensureButt' :action="importFileUrl" :data="upLoadData" name="importfile" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeAvatarUpload">
                    <el-button size="small" type="primary">确定</el-button>
                </el-upload> -->
                <!-- 密码修改按钮 -->
                <i class="iconfont icon-xiugai" @click="show = !show"></i>
                <!-- 前台链接 -->
                <a class="iconfont icon-liulanqi-IE" href="http://172.16.13.7:8080"></a>
                <!-- 登录退出 -->
                <i class="iconfont icon-swticontuichu1" @click="exit()"></i>
            </div>
        </el-header>
        <!-- 密码修改 -->
        <transition name="slide-fade">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" v-if="show">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="原密码" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="name2">
                    <el-input v-model="ruleForm.name2" placeholder="新密码" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="name3">
                    <el-input v-model="ruleForm.name3" placeholder="重复新密码" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" size="small">修改密码</el-button>
                    <el-button type="info" @click="resetForm('ruleForm')" size="small">取消</el-button>
                </el-form-item>
            </el-form>
        </transition>
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
import qs from "qs";
export default {
  data() {
    return {
      show: true,
      el: "#home",
      show: false,
      img: require("../assets/personal.jpeg"),
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 7,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        name2: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 7,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        name3: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 7,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.name == "home") {
      this.$router.replace("/home/index");
    }
  },
  methods: {
    exit() {
      const h = this.$createElement;
      this.$msgbox({
        center: "true",
        message: h("p", {style:'margin-bottom:20px;font-size:16px;'}, [h("span", null, "您确定要退出登录系统吗")]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '退出中..';
                setTimeout(() => {
                done();
                window.sessionStorage.removeItem("isLog")
                this.$router.push("/login")
                console.log("111")
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1500);
            
            } 
            else{
                done();
            }
        },
      }).then(action => {
           this.$message({
            type: 'success',
            message: "退出成功"
          });
      })
    },
    toggle() {
      this.isshow = !this.isshow;
    },
    handleOpen(key, keyPath) {
      this.$router.push(key);
    },
    handleClose(key, keyPath) {
      this.$router.push(key);
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(
            "adminLog",
            qs.stringify({
              logName: this.username,
              logPwd: this.password
            })
          );
          const h = this.$createElement;
          window.localStorage.getItem("isRemeber") == "true"
          var that = this;
          this.$message({
            type: "success",
            duration: "1500",
            center: "true",
            message: h("p", null, [h("span", null, "密码修改成功,请重新登录")]),
            onClose: function() {
            window.sessionStorage.removeItem("isLog")
            that.$router.push("/login")
            that.isRemeber = false
            console.log(that.isRemeber)
            console.log("2222")
            }
          });
        } else {
          this.$message({
            type: "error",
            color: "#f0f0f0",
            duration: "1500",
            center: "true",
            message: h("p", null, [
              h("span", null, "密码修改失败，请重新修改")
            ]),
            onClose: function() {
            window.sessionStorage.removeItem("isLog")
            this.$router.push("/login")
            },
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log("密码被重置呢");
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.slide-fade-enter {
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.demo-ruleForm {
  position: fixed;
  top: 9.9%;
  right: 0px;
  padding-top: 20px;
  background: white;
  box-shadow: 0px 0px 3px 3px lightgrey;
  width: 200px;
  height: 100%;
  z-index: 999;
  .el-form-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .el-input {
    width: 160px;
  }
  .el-button {
    width: 80px;
  }
}

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
  position: fixed;
  z-index: 10000;
  background: white;
  box-shadow: 3px 0px 3px 3px lightgrey;
  width: 100%;
  z-index: 9;
  .log_item > img {
    position: absolute;
    right: 200px;
    top: 0px;
    bottom: 0px;
    margin: auto 0px;
    z-index: 999;
    width: 40px;
    height: 40px;
    border-radius: 20px 20px;
  }
  .log_item > i:nth-child(2) {
    position: absolute;
    right: 100px;
    top: 17px;
    bottom: 0px;
    z-index: 999;
    color: black;
  }
  .log_item > i:nth-child(2):hover {
    color: #20a0ff;
  }
  .log_item > a:hover {
    color: #20a0ff;
  }
  .log_item > a {
    position: absolute;
    right: 60px;
    top: 17px;
    bottom: 0px;
    z-index: 999;
    color: black;
    text-decoration: none;
  }
  .log_item > i:nth-child(4) {
    position: absolute;
    right: 15px;
    top: 17px;
    bottom: 0px;
    z-index: 999;
    color: black;
  }
  .log_item > i:nth-child(5):hover {
    color: #20a0ff;
  }
  .log {
    position: absolute;
    left: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 199px;
    height: 60px;
    color: white;
    z-index: 99;
    cursor: pointer;
  }
  span {
    font-size: 20px;
    color: #000;
  }
  .log:hover span {
    color: #20a0ff;
  }
  .log i {
    color: #000;
    font-size: 24px; // padding-left: 20px;
  }
  .log:hover i {
    color: #20a0ff;
  }
  .log_item > span {
    position: absolute;
    right: 180px;
    top: 20px;
    bottom: 0px;
    z-index: 999;
    font-size: 14px;
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
  height: 100%;
  .el-aside {
    position: fixed;
    top: 9%;
    z-index: 1;
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
  // border: 1px solid red;
  position: absolute;
  top: 10%;
  left: 14.6%;
  width: 85.4%; // height: 90%;
  background-color: #f0f0f0;
  padding: 0;
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
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
  color: lightgray;
}
</style>
