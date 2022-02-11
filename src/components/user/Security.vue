<template>
  <div>
    <h2 style="color: #f56c6c">更新密码</h2>
    <el-radio-group v-model="labelPosition" size="small"> </el-radio-group>
    <div style="margin: 0px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="changePasswordObject"
      style="width: 40%"
    >
      <el-form-item label="旧密码">
        <el-input v-model="changePasswordObject.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="changePasswordObject.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input v-model="changePasswordObject.newPasswordAgain"></el-input>
      </el-form-item>
    </el-form>
    <br />
    <el-button type="success" @click="changePassword" plain>更改密码</el-button>
  </div>
</template>

<script>
export default {
  name: "Security",
  data() {
    return {
      labelPosition: "left",
      changePasswordObject: {
        oldPassword: "",
        newPassword: "",
        newPasswordAgain: "",
      },
    };
  },
  methods: {
    changePassword: function () {
      var url = this.constant.baseUrl + "/user/change_password";
      var jsonParam = JSON.stringify(this.changePasswordObject);
      this.$axios
        .post(url, jsonParam,{
          headers: {
            "token": this.constant.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          alert(res.data.message);
        });
    },
  },
  created() {
    this.constant.token = localStorage.getItem("token");
    console.log(this.constant.token);
    if (this.constant.token == null || this.constant.token == "") {
      alert("您还没有登陆，请先登陆");
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>