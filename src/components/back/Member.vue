<template>
  <div class="all">
    <el-row>
      <el-col :span="5">
        <div>
          <el-button
            plain
            size="small"
            @click="newDepartmentDialogVisible = true"
            ><i class="el-icon-plus"></i>新建部门</el-button
          >
          <el-button plain size="small" @click="shiftDepartmentPage"
            ><i class="el-icon-s-custom"></i>管理部门</el-button
          >
        </div>
        <div style="margin-top: 15px">
          <el-table
            :data="departmentList"
            @cell-click="selectDepartment"
            highlight-current-row
            size="medium"
            style="width: 100%"
          >
            <el-table-column prop="departmentName" label="部门名称">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="18">
        <div>
          <div>
            <span
              >{{ selectedDepartment.departmentName }}
              <i class="el-icon-user-solid"></i>
              {{ selectedDepartment.peopleNumber }}</span
            >
            <el-button
              type="primary"
              size="medium"
              style="float: right"
              @click="inviteCodeDialogVisible = true"
              >邀请成员加入工作室</el-button
            >
            <el-button
              type="primary"
              size="medium"
              style="float: right; margin-right: 10px"
              >添加成员</el-button
            >
          </div>
          <div style="margin-top: 15px">
            <el-table :data="memberList" size="medium" style="width: 100%">
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="6">
                      <el-avatar :size="35" :src="scope.row.icon"></el-avatar>
                    </el-col>
                    <el-col :span="18">
                      <div style="margin-top: 5px">
                        <span>{{ scope.row.insideAlias }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" label="手机">
              </el-table-column>
              <el-table-column prop="departmentName" label="部门">
              </el-table-column>
              <el-table-column label="操作">
                <el-button
                  type="text"
                  @click="changeDepartmentDialogVisible = true"
                  >变更部门</el-button
                >
                <el-button type="text" style="color: #f56c6c"
                  >离职操作</el-button
                >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 新建部门 弹出框 -->
    <el-dialog
      title="新建部门"
      :visible.sync="newDepartmentDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="top" label-width="80px" :model="newDepartment">
        <el-form-item label="部门名称">
          <el-input v-model="newDepartment.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门名称">
          <el-input v-model="newDepartment.parentDepartmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDepartmentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 邀请码展示 弹出框 -->
    <el-dialog
      title="邀请码"
      :visible.sync="inviteCodeDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>成员可输入企业邀请码加入企业</span>
      <br />
      <h1 style="font-size: 30px">{{ inviteCode }}</h1>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inviteCodeDialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 变更部门 弹出框 -->
    <el-dialog
      title="变更部门"
      :visible.sync="changeDepartmentDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        label-position="top"
        label-width="80px"
        :model="changeDepartment"
      >
        <el-form-item label="部门名称">
          <el-input v-model="changeDepartment.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDepartmentDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="changeDepartment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Member",
  data() {
    return {
      departmentList: [],
      selectedDepartment: {},
      memberList: [],
      newDepartment: {
        departmentName: "",
        parentDepartmentName: "",
      },
      changeDepartment: {
        departmentName: "",
      },
      newDepartmentDialogVisible: false,
      inviteCodeDialogVisible: false,
      changeDepartmentDialogVisible: false,
      inviteCode: "XWLVDLLK",
    };
  },
  methods: {
    selectDepartment(row) {
      this.selectedDepartment = this.departmentList[row.index];
      this.getDepartmentMemberList(row.departmentId);
    },
    handleClose() {
      this.newDepartmentDialogVisible = false;
      this.inviteCodeDialogVisible = false;
      this.changeDepartmentDialogVisible = false;
    },
    createDepartment() {
      var url = this.constant.baseUrl + "/studio/create_department";
      var createDepartmentObject = {
        departmentName: this.newDepartment.departmentName,
        studioId: localStorage.getItem("currentStudioId"),
        parentDepartmentName: this.newDepartment.parentDepartmentName,
      };
      var jsonParam = JSON.stringify(createDepartmentObject);
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
          this.getDepartmentList();
        });
        this.handleClose();
    },
    shiftDepartmentPage() {
      this.$router.push("/back_home/organizational_structure/department");
    },
    getDepartmentList() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/show_department_list/" +
        currentStudioId;
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
            this.departmentList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    getDepartmentMemberList(departmentId) {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/show_department_member_list/" +
        departmentId;
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
            this.memberList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
  },
  created() {
    this.getDepartmentList();
  },
};
</script>

<style>
.all {
  margin-left: 15px;
}
.departmentButton {
  width: 90%;
  font-size: 12px;
  border-width: 0.5px;
  text-align: left;
}
</style>