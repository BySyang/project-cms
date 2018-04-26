<template>
  <div id="login">
    <h2>管理员登录系统</h2>
    <div class="wrap">
    <el-form ref="ruleForm" label-width="70px">
      <div class="input">
        <p>用户名</p>
        <input type="text"  v-model="username" placeholder="请输入用户名">
      </div>
      <div class="input">
        <p>密码</p>
        <input type="password"  v-model="password" placeholder="请输入密码">
      </div>
    <div class="remeber">
      <el-form-item class="rem" label="记住密码">
         <el-switch v-model="isRemeber"></el-switch>
      </el-form-item>
    </div>
    <div class="login_btn">
       <el-form-item class="login_btn_a">
        <el-button type="primary" @click="submitForm" size="small">登录</el-button>
        <el-button @click="resetForm" size="small">重置</el-button>
      </el-form-item>
    </div>
    </el-form>
    </div>
  </div>

</template>

 <script>
import qs from "qs";
export default {
  name: "login",
  data() {
    return {
      isRemeber: "",
      username: "",
      password: ""
    };
  },
  computed: {
  },
  created() {
    if (window.localStorage.getItem("isRemeber") == "true") {
      this.isRemeber = true;
    } else {
      this.isRemeber = false;
    }
    if (this.isRemeber) {
      this.username = window.localStorage.getItem("logName");
      this.password = window.localStorage.getItem("logPwd");
    }
  },
  methods: {
    submitForm() {
      this.$http
        .post(
          "adminLog",
          qs.stringify({
            logName: this.username,
            logPwd: this.password
          })
        )
        .then(res => {
          if (res.data == "ok") {
            window.sessionStorage.setItem('isLog','true');
            this.remeberAdmin();
            if (this.$route.query.redirect) {
              this.$router.push(
                this.$route.query.redirect.replace(/%2F/g, "/")
              );
            } else {
              this.$router.push("/home");
            }
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.username = "";
      this.password = "";
    },
    remeberAdmin() {
      if (this.isRemeber) {
        window.localStorage.setItem("isRemeber", true);
        window.localStorage.setItem("logName", this.username);
        window.localStorage.setItem("logPwd", this.password);
      } else {
        window.localStorage.setItem("isRemeber", false);
        window.localStorage.removeItem("logName");
        window.localStorage.removeItem("logPwd");
      }
    }
  }
};
</script>
<style scoped>
#login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/bk.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 350px;
  height: 350px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 3px lightsteelblue;
  background: rgba(255, 255, 255, 0.5);
}
h2 {
  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  margin: auto;
  text-align: center;
  margin-bottom: 15px;
  font-size: 26px;
  color: lightblue;
  font-family: "Courier New", Courier, monospace;
}
.input {
  margin: 0 auto;
  width: 260px;
  margin-top: 20px;
  color: #4f5d80;
}
.input > input {
  width: 250px;
  height: 35px;
  border-radius: 5px;
  padding-left: 5px;
  margin-bottom: 15px;
  color: #4f5d80;
  margin: 0 auto;
  border: 1px solid #cad2db;
}
.input > p {
  font-size: 16px;
  margin-bottom: 15px;
}
.remeber {
  height: 40px;
  padding-left: 40px;
  margin-top: 10px;
  margin-bottom: 35px;
}
.login_btn {
  padding-left: 45px;
}
</style>
