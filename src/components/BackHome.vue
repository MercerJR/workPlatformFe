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
        <template slot="title">{{
          this.$root.currentStudioBaseInfo.studioName == ""
            ? "我的工作室"
            : this.$root.currentStudioBaseInfo.studioName
        }}</template>
        <el-menu-item
          v-for="item in studioList"
          :indexPath="item"
          v-bind:key="item.studioId"
          :index="'shiftStudio/' + item.studioId"
        >
          {{ item.studioName }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/myself" style="float: right">{{
        userBaseInfo.name
      }}</el-menu-item>
    </el-menu>

    <el-container>
      <el-aside width="201px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <el-menu-item index="/back_home/home_content">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/back_home/organizational_structure">
            <i class="el-icon-s-management"></i>
            <span slot="title">组织架构</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>工作室设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/back_home/studio_info"
                >工作室信息</el-menu-item
              >
              <el-menu-item index="/back_home/manage_admin"
                >管理员权限</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <router-view></router-view>
        </div>
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
      studioList: [
        {
          studoId: 0,
          studioName: "暂未加入工作室",
          studioAbbreviation: "",
        },
      ],
      userBaseInfo: {
        userId: 0,
        name: "",
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      var prefix = key == null ? key : key.split("/")[0];
      //如果index前缀是shiftStudio，则表示是选择工作室
      if (prefix == "shiftStudio") {
        var studioId = key.split("/")[1];
        this.shiftStudio(studioId);
        return;
      }
      this.$router.push(key);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getStudioList() {
      var url = this.constant.baseUrl + "/studio/list/";
      this.$axios
        .get(url, {
          headers: {
            token: this.$root.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.studioList = res.data.data.studioList;
            if (res.data.data.currentStudioBaseInfo != null) {
              //在localStorage中存储存储studioId
              localStorage.setItem(
                "currentStudioId",
                res.data.data.currentStudioBaseInfo.studioId
              );
              this.$root.currentStudioBaseInfo =
                res.data.data.currentStudioBaseInfo;
              this.$root.currentStudioBaseInfo.studioIcon =
                "https://tse1-mm.cn.bing.net/th/id/OIP-C.fYOke7YIMR5vNvMZfCev8gHaEo?pid=ImgDet&rs=1";
            }
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
  },
  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.userBaseInfo.userId = localStorage.getItem("userId");
    this.userBaseInfo.name = localStorage.getItem("name");
    this.getStudioList();
  },
};
</script>

<style>
</style>