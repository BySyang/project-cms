<template>
  <div id="login">
    <h2>管理员登录系统</h2>
    <div class="wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
      <div class="input">
        <p>用户名</p>
        <input type="text" onfocus="if (value =='请输入账号'){value =''}" onblur="if (value ==''){value='请输入账号'}">
      </div>
      <div class="input">
        <p>密码</p>
        <input type="password" onfocus="if (value =='请输入密码'){value =''}" onblur="if (value ==''){value='请输入密码'}">
      </div>
    <div class="remeber">
      <el-form-item class="rem" label="记住密码">
         <el-switch v-model="ruleForm.isRemeber" width="35"></el-switch>
      </el-form-item>
    </div>
    <div class="login_btn">
       <el-form-item class="login_btn_a">
        <el-button type="primary" @click="submitForm" size="small">登录</el-button>
        <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
      </el-form-item>
    </div>
    </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        isRemeber: false
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect.replace(/%2F/g, "/"));
      } else {
        this.$router.push("/home");
      }
      // console.log(this.$route.query.redirect.replace(/%2F/g,'/'))
      // this.$router.push({path:this.$route.query.redirect.replace(/%2F/g,'/')})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
#login{
  width: 100%;
  height: 100%;
  background: url("../assets/bk.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.wrap {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: 350px;
  height: 350px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 3px lightsteelblue;
  background: rgba(255, 255, 255, 0.5)
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
    color:lightblue;
    font-family:'Courier New', Courier, monospace;
  }
  .input{
    margin: 0 auto;
    width: 260px;
    margin-top: 20px;
    color: #4f5d80;
  }
  .input>input{
    width: 250px;
    height: 35px;
    border-radius: 5px;
    padding-left: 5px;
    margin-bottom: 15px;
    color: #4f5d80;
     margin: 0 auto;
    border: 1px solid #cad2db;
  }
  .input>p{
    font-size: 16px;
    margin-bottom: 15px;
  }
  .remeber{
    height: 40px;
    padding-left: 40px;
    margin-top: 10px;
    margin-bottom: 35px;
  }
  .login_btn{
    padding-left: 45px;

  }

</style>
