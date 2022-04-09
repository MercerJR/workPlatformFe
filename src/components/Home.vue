<template>
  <div>
    <div>
      <el-menu
        :default-active="activeIndex2"
        class="topmenu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="isRouter"
      >
        <el-menu-item index="/home">MERCER'S WORK PLATFORM</el-menu-item>
        <el-menu-item index="/home/notice">消息中心</el-menu-item>
        <el-menu-item index="/back_home">管理后台</el-menu-item>
        <el-submenu index="2">
          <template slot="title">{{
            this.$root.currentStudioBaseInfo.studioName == ""
              ? "工作室"
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
        <el-menu-item index="create_studio/"
          ><i class="el-icon-plus"></i
        ></el-menu-item>
        <el-menu-item index="/home/myself" style="float: right">{{
          userBaseInfo.name
        }}</el-menu-item>
        <el-menu-item
          index="cancellation"
          style="float: right"
          @click="cancellation"
          ><i class="el-icon-switch-button"></i
        ></el-menu-item>
      </el-menu>

      <!-- 创建工作室dialog -->
      <el-dialog
        title="新建工作室"
        :visible.sync="createStudioDialogVisible"
        width="30%"
      >
        <div>
          <span>请输入工作室名称</span>
          <el-input v-model="inputStudioName"></el-input>
        </div>
        <div style="margin-top: 20px">
          <span>请输入工作室简称</span>
          <el-input v-model="inputStudioAbbreviation"></el-input>
        </div>
        <div style="margin-top: 20px">
          <span>请输入工作室类型</span>
          <el-input v-model="inputClassify"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createStudioDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="createStudio">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <el-container>
      <el-aside :width="isCollapse ? '70px' : '210px'">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          :collapse="isCollapse"
          :router="isRouter"
        >
          <el-menu-item index="/home/chat">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">消息</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">通讯录</span>
            </template>
            <el-menu-item index="/home/new_friend">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">新的联系人</span>
            </el-menu-item>
            <el-menu-item index="/home/people_structure">
              <i class="el-icon-s-custom"></i>
              <span slot="title">组织架构</span>
            </el-menu-item>
            <el-menu-item index="/home/friend_list">
              <i class="el-icon-milk-tea"></i>
              <span slot="title">好友</span>
            </el-menu-item>
            <el-menu-item index="/home/group_list">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">群组</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">办公小能手</span>
            </template>
            <el-menu-item index="/home/announcement">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">消息推送</span>
            </el-menu-item>
            <el-menu-item index="/home/todo">
              <i class="el-icon-s-custom"></i>
              <span slot="title">待办事项</span>
            </el-menu-item>
            <el-menu-item index="">
              <i class="el-icon-milk-tea"></i>
              <span slot="title">文档中心</span>
            </el-menu-item>
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
  data() {
    return {
      isCollapse: false,
      isRouter: false,
      activeIndex2: "1",
      userBaseInfo: {
        userId: 0,
        name: "",
      },
      studioList: [
        {
          studoId: 0,
          studioName: "暂未加入工作室",
          studioAbbreviation: "",
        },
      ],
      createStudioDialogVisible: false,

      inputStudioName: "",
      inputStudioAbbreviation: "",
      inputClassify: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      var prefix = key == null ? key : key.split("/")[0];
      //如果index前缀是shiftStudio，则表示是选择工作室
      if (prefix == "shiftStudio") {
        var studioId = key.split("/")[1];
        this.shiftStudio(studioId);
        return;
      }
      if (prefix == "create_studio") {
        this.createStudioDialogVisible = true;
        return;
      }
      this.$router.push(key);
      console.log(key, keyPath);
    },
    cancellation() {
      localStorage.removeItem("token");
      this.$router.push("/login");
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
              this.$root.currentStudioBaseInfo =
                res.data.data.currentStudioBaseInfo;
            }
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    createStudio() {
      var url = this.constant.baseUrl + "/studio/create";
      var createReq = {
        studioName: this.inputStudioName,
        studioAbbreviation: this.inputStudioAbbreviation,
        classify: this.inputClassify,
      };
      var jsonParam = JSON.stringify(createReq);
      this.$axios
        .post(url, jsonParam, {
          headers: {
            token: this.$root.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.alertMessage(res);
          this.handleNotLogin(res.data.code);
        });
      this.createStudioDialogVisible = false;
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>