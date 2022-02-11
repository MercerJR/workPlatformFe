<template>
  <el-tabs type="border-card" @tab-click="handleClick">
    <el-tab-pane name="0">
      <span slot="label"><i class="el-icon-user-solid"></i> 我的信息</span>
    </el-tab-pane>
    <el-tab-pane name="1">
      <span slot="label"><i class="el-icon-lock"></i> 用户安全</span>
    </el-tab-pane>
    <router-view></router-view>
  </el-tabs>
</template>

<script>
export default {
  name: "Myself",
  data() {
    return {
      routers: ["/home/myself/user_info", "/home/myself/security"],
      routerIndex: -1,
    };
  },
  methods: {
    handleClick(tab) {
      this.shiftTab(tab.name);
    },
    shiftTab(tabName) {
      var index = parseInt(tabName);
      console.log(index);
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