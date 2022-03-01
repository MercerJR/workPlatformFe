<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1"
        ><i class="el-icon-s-help"></i>MWP管理后台</el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">我的工作室 </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-container>
      <el-aside width="201px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/back_home_content">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>组织架构</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">成员与部门</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>企业设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">企业信息</el-menu-item>
              <el-menu-item index="1-2">管理员权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "BackHome",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      var url = "/content" + key;
      this.$router.push(url);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>