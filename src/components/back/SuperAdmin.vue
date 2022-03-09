<template>
  <div class="all">
    <div style="margin-top: 10px">
      <span>超级管理员可以使用管理后台的所有功能</span>
    </div>
    <div style="margin-top: 25px">
      <el-row>
        <el-col :span="12">
          <div class="search" @keyup.enter="getSuperAdminList()">
            <el-input
              size="small"
              placeholder="请输入姓名或手机号"
              prefix-icon="el-icon-search"
              v-model="searchContent"
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = true"
            style="float: right"
            >添加超级管理员</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="superAdminList" style="width: 100%">
        <el-table-column label="姓名" width="600">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="2">
                <div class="block">
                  <el-avatar :size="40" :src="scope.row.icon"></el-avatar>
                </div>
              </el-col>
              <el-col :span="22">
                <div style="white-space: nowrap">
                  <span>{{ scope.row.insideAlias }}</span>
                  <el-tag size="small">{{ scope.row.role }}</el-tag>
                </div>
                <div>{{ scope.row.phoneNumber }}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDialog2">移除</el-button>
            <!-- 弹出框2 -->
            <el-dialog
              title="移除超级管理员"
              :visible.sync="dialogVisible2"
              width="30%"
              :before-close="handleClose2"
            >
              <span>确定移除该用户的超级管理员角色？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dealAndHideDialog2(scope.row)"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="添加超级管理员"
      :visible.sync="dialogVisible"
      width="40%"
      top="30vh"
      :before-close="handleClose"
    >
      <span>超级管理员</span>
      <div style="margin-top: 10px">
        <el-input
          size="medium"
          placeholder="请输入完整的姓名或手机号"
          prefix-icon="el-icon-search"
          v-model="searchContent2"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dealAndHideDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SuperAdmin",
  data() {
    return {
      superAdminList: [
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          userId: 0,
          studioId: 0,
          insideAlias: "",
          role: "",
          phoneNumber: "",
        },
      ],
      dialogVisible: false,
      dialogVisible2: false,
      searchContent: "",
      searchContent2: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose2() {
      this.dialogVisible2 = false;
    },
    getSuperAdminList() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/show_admin_list?studio_id=" +
        currentStudioId +
        "&type=super&search_content=" +
        this.searchContent;
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
            this.superAdminList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    dealAndHideDialog() {
      this.updateSuperAdmin();
      this.handleClose();
    },
    updateSuperAdmin() {
      var url = this.constant.baseUrl + "/studio/update_admin";
      var updateStudioRoleObject = {
        insideAlias: this.searchContent2,
        studioId: localStorage.getItem("currentStudioId"),
        roleId: 2,
      };
      var jsonParam = JSON.stringify(updateStudioRoleObject);
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
          this.getSuperAdminList();
        });
    },
    showDialog2() {
      this.dialogVisible2 = true;
    },
    dealAndHideDialog2(row) {
      this.cancelSuperAdmin(row.userId);
      this.handleClose2();
    },
    cancelSuperAdmin(user_id) {
      var url = this.constant.baseUrl + "/studio/update_admin";
      console.log(user_id);
      var updateStudioRoleObject = {
        userId: user_id,
        studioId: localStorage.getItem("currentStudioId"),
        roleId: 0,
      };
      var jsonParam = JSON.stringify(updateStudioRoleObject);
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
          this.getSuperAdminList();
        });
    },
  },
  created() {
    this.getSuperAdminList();
  },
};
</script>

<style>
.all {
  font-size: 14px;
}
.search {
  width: 40%;
}
</style>