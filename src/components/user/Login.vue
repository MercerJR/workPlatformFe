<template>
  <div id="login">
    <div>
      <h2>登陆账户</h2>
    </div>
    <div id="form" @keyup.enter="login">
      <el-form
        :label-position="labelPosition"
        label-width="60px"
        :model="loginRequest"
        style="width: 40%"
      >
        <el-form-item label="手机号">
          <el-input v-model="loginRequest.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginRequest.password" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="button">
      <el-button type="primary" @click="login" round>登陆</el-button>
    </div>
    <br>
    <div id="href">
      <el-link type="primary" :href="'#/register'">还没有账户？点击这里注册</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "left",
      loginRequest: {
        phoneNumber: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      var jsonParam = JSON.stringify(this.loginRequest);
      console.log(jsonParam);
      var url = this.constant.baseUrl + "/user/login";
      console.log(url);
      this.$axios
        .post(url, jsonParam,{
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data);
            //存储用户token
            var token = res.data.data;
            localStorage.setItem("token", token);
            //切换路由
            this.$router.push("/home");
          } else {
            alert(res.data.message);
          }
        });
    },
  },
};
</script>

<style>
#login{
  text-align: center;
  margin-top: 100px;
}
#form {
  display: flex;
  justify-content: center;
}
#button {
  display: flex;
  justify-content: center;
}
</style>