<template>
  <div class="all">
    <div style="margin-top: 10px">
      <el-row>
        <el-col :span="12">
          <span>管理员只可以使用管理后台的部分功能</span>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = true"
            style="float: right"
            ><i class="el-icon-plus"></i> 添加管理员</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 15px" @keyup.enter="getAdminList">
      <el-input
        placeholder="请输入内容"
        v-model="searchContent"
        class="input-with-select"
        size="medium"
      >
        <el-select v-model="select" slot="prepend" placeholder="搜索方式">
          <el-option label="按用户搜索" value="user"></el-option>
          <el-option label="按部门搜索" value="department"></el-option>
        </el-select>
        <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
      </el-input>
    </div>

    <div style="margin-top: 15px">
      <el-table :data="adminList" style="width: 100%">
        <el-table-column label="管理员" width="600">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="2">
                <div class="block">
                  <el-avatar :size="40" class="icon">{{getIconText(scope.row.insideAlias)}}</el-avatar>
                </div>
              </el-col>
              <el-col :span="22">
                <div>
                  <span>{{ scope.row.insideAlias }}</span>
                  <el-tag size="small">{{ scope.row.role }}</el-tag>
                </div>
                <div>{{ scope.row.phoneNumber }}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label="部门" prop="departmentName"></el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDialog2(scope.row)">移除</el-button>
            <!-- 弹出框2 -->
            <el-dialog
              title="移除管理员"
              :visible.sync="dialogVisible2"
              width="30%"
              :before-close="handleClose2"
            >
              <span>确定移除该用户的管理员角色？</span>
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
      title="添加管理员"
      :visible.sync="dialogVisible"
      width="40%"
      top="20vh"
      :before-close="handleClose"
    >
      <div>
        <span>管理员</span>
        <div style="margin-top: 10px">
          <el-input
            size="medium"
            placeholder="请输入完整的姓名或手机号"
            prefix-icon="el-icon-search"
            v-model="dialogSearchContent"
          >
          </el-input>
        </div>
      </div>
      <div style="margin-top: 15px">
        <span>部门</span>
        <div style="margin-top: 10px">
          <el-input
            size="medium"
            placeholder="请输入完整的部门名称"
            prefix-icon="el-icon-search"
            v-model="dialogSearchContent2"
          >
          </el-input>
        </div>
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
  name: "Admin",
  data() {
    return {
      adminList: [
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          userId: 0,
          studioId: 0,
          insideAlias: "",
          role: "",
          phoneNumber: "",
          departmentName: "",
        },
      ],
      select: "",
      dialogVisible: false,
      dialogVisible2: false,
      searchContent: "",
      dialogSearchContent: "",
      dialogSearchContent2: "",
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose2() {
      this.dialogVisible2 = false;
    },
    getAdminList() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/show_admin_list?studio_id=" +
        currentStudioId +
        "&type=admin&search_content=" +
        this.searchContent +
        "&select=" +
        this.select;
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
            this.adminList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    dealAndHideDialog() {
      this.updateAdmin();
      this.handleClose();
    },
    updateAdmin() {
      var url = this.constant.baseUrl + "/studio/update_admin";
      var updateStudioRoleObject = {
        insideAlias: this.dialogSearchContent,
        studioId: localStorage.getItem("currentStudioId"),
        roleId: 1,
        departmentName: this.dialogSearchContent2,
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
          this.getAdminList();
        });
    },
    showDialog2(row) {
      if (row.userId == localStorage.getItem("userId")) {
        this.$message({
          type: "error",
          message: "不能将自己移除超级管理员",
        });
        return;
      }
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
          this.getAdminList();
        });
    },
  },
  created() {
    this.getAdminList();
  },
};
</script>

<style>
.all {
  font-size: 14px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.icon{
  background-color: #409EFF;
}
</style>