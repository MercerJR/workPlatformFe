<template>
  <div id="register">
    <div>
      <h2>注册账户</h2>
    </div>
    <div id="form">
      <el-form
        :label-position="labelPosition"
        label-width="200px"
        :model="registerRequest"
        style="width: 40%"
      >
        <el-form-item label="请输入11位手机号:">
          <el-input v-model="registerRequest.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="请输入长度大于8位的密码:">
          <el-input v-model="registerRequest.password" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="button">
      <el-button type="primary" @click="register" round>注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
        labelPosition: "left",
        registerRequest:{
            phoneNumber:"",
            password:""
        }
    };
  },
  methods: {
    register: function () {
      var jsonParam = JSON.stringify(this.registerRequest);
      console.log(jsonParam);
      var url = this.constant.baseUrl + "/user/register";
      console.log(url);
      this.$axios
        .post(url, jsonParam,{
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            //切换路由
            this.$router.push("/login");
          } else {
            alert(res.data.message);
          }
        });
    },
  }
};
</script>

<style>
#register {
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