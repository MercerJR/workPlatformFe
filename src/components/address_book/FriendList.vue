<template>
  <el-table
    :data="friends"
    style="width: 100%"
    :default-sort="{ prop: 'name', order: 'ascending' }"
  >
    <el-table-column prop="name" label="昵称" width="180"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "FriendList",
  data() {
    return {
      friends: [],
    };
  },
  methods: {
    // formatter(row, column) {
    //   return row.address;
    // },
    getFriendList() {
      var url = this.constant.baseUrl + "/friend/list";
      this.$axios
        .get(url, {
          headers: {
            token: this.constant.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.friends = res.data.data;
          } else {
            alert(res.data.message);
            console.log(res.data);
            if (res.data.code == 2) {
              this.$router.push("/login");
            }
          }
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
    this.getFriendList();
  },
};
</script>