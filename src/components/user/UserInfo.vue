<template>
  <div>
    <h2 style="color: #f56c6c">我的信息</h2>
    <el-radio-group v-model="labelPosition" size="small"> </el-radio-group>
    <div style="margin: 0px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="userInfo"
      style="width: 40%"
    >
      <el-form-item label="昵称">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="个人描述">
        <el-input v-model="userInfo.describe"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="userInfo.gender"></el-input>
      </el-form-item>
      <el-form-item label="爱好">
        <el-input v-model="userInfo.hobby"></el-input>
      </el-form-item>
      <el-form-item label="居住地">
        <el-input v-model="userInfo.livePlace"></el-input>
      </el-form-item>
      <el-form-item label="家乡">
        <el-input v-model="userInfo.hometown"></el-input>
      </el-form-item>
    </el-form>
    <br />
    <el-button type="success" @click="updateInfo" plain>更新</el-button>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      labelPosition: "top",
      userInfo: {
        id: "",
        name: "",
        describe: "",
        gender: "",
        hobby: "",
        livePlace: "",
        hometown: "",
      },
      token: "",
    };
  },
  methods: {
    getUserInfo: function () {
      var url = this.constant.baseUrl + "/user/show_info";
      this.$axios
        .get(url, {
          headers: {
            token: this.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.userInfo = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    updateInfo: function () {
      var url = this.constant.baseUrl + "/user/update_info";
      var jsonParam = JSON.stringify(this.userInfo);
      this.$axios
        .post(url, jsonParam, {
          headers: {
            token: this.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.alertMessage(res);
          this.handleNotLogin(res.data.code);
        });
    },
  },
  created() {
    this.checkToken();
    this.token = localStorage.getItem("token");
    console.log(this.token);
    this.getUserInfo();
  },
};
</script>

<style>
</style>