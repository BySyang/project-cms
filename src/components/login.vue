<template>
  <div id="login">
    <h2>登录</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.number="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item class="rem" label="记住密码">
        <el-switch v-model="ruleForm.isRemeber"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="small">登录</el-button>
        <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
      </el-form-item>
    </el-form>
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


<style lang="scss" scoped>
#login {
  width: 300px;
  padding: 10px 5px;
  margin: 0 auto;
  margin-top: 10%;
  background: #fff;

  h2 {
    text-align: center;
  }
}
</style>
