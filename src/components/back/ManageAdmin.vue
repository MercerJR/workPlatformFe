<template>
  <div>
    <el-tabs @tab-click="handleClick">
      <el-tab-pane label="超级管理员" name="0"></el-tab-pane>
      <el-tab-pane label="管理员" name="1"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageAdmin",
  data() {
    return {
      routers: [
        "/back_home/manage_admin/super_admin",
        "/back_home/manage_admin/admin",
      ],
      routerIndex: -1,
    };
  },
  methods: {
    handleClick(tab) {
      this.shiftTab(tab.name);
    },
    shiftTab(tabName) {
      var index = parseInt(tabName);
      // 如果重复点击该标签，则不会重复访问该路由（目的是为了防止浏览器弹出冗余路由的错误）
      if (this.routerIndex != index) {
        var routerUrl = this.routers[index];
        this.$router.push(routerUrl);
        this.routerIndex = index;
      }
    },
  },
  created() {
    var defaltTabName = "0";
    this.shiftTab(defaltTabName);
  },
};
</script>

<style>
</style>