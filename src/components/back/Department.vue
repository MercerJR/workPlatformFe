<template>
  <div style="margin-left: 15px">
    <div>
      <el-button
        type="primary"
        size="small"
        @click="newDepartmentDialogVisible = true"
        ><i class="el-icon-plus"></i>新建部门</el-button
      >
    </div>
    <div style="margin-top: 15px">
      <el-table :data="departmentList" style="width: 100%">
        <el-table-column prop="departmentName" label="部门名称">
        </el-table-column>
        <el-table-column prop="peopleNumber" label="部门人数">
        </el-table-column>
        <el-table-column prop="leader" label="负责人"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="updateDepartmentDialogOpen(scope.row)"
              >编辑部门</el-button
            >
            <el-button
              type="text"
              @click="deleteDepartmentDialogOpen(scope.row)"
              style="color: #f56c6c"
              >删除部门</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <!-- 编辑部门 弹出框 -->
    <el-dialog
      title="编辑部门"
      :visible.sync="updateDepartmentDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        label-position="top"
        label-width="80px"
        :model="updateDepartment"
      >
        <el-form-item label="部门名称">
          <el-input v-model="updateDepartment.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门名称">
          <el-input v-model="updateDepartment.parentDepartmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDepartmentDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="updateDepartmentFunc"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除部门 弹出框 -->
    <el-dialog
      title="删除部门"
      :visible.sync="deleteDepartmentDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span
        >确认删除部门？若删除部门，部门的成员和下级部门都将属于部门的上级部门管理</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDepartmentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDepartmentFunc"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Department",
  data() {
    return {
      newDepartment: {
        departmentName: "",
        parentDepartmentName: "",
      },
      updateDepartment: {
        departmentName: "",
        parentDepartmentName: "",
      },
      selectedDepartment: {},
      departmentList: [
        {
          departmentId: 0,
          departmentName: "",
          peopleNumber: 0,
          leader: "",
        },
      ],
      searchDepartment: "",
      newDepartmentDialogVisible: false,
      updateDepartmentDialogVisible: false,
      deleteDepartmentDialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.newDepartmentDialogVisible = false;
      this.updateDepartmentDialogVisible = false;
      this.deleteDepartmentDialogVisible = false;
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
    createDepartment() {
      var url = this.constant.baseUrl + "/studio/create_department";
      console.log(this.newDepartment.departmentName);
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
    updateDepartmentDialogOpen(row) {
      this.selectedDepartment = row;
      this.updateDepartmentDialogVisible = true;
    },
    updateDepartmentFunc() {
      var url = this.constant.baseUrl + "/studio/update_department";
      var updateDepartmentObject = {
        departmentId: this.selectedDepartment.departmentId,
        departmentName: this.updateDepartment.departmentName,
        studioId: localStorage.getItem("currentStudioId"),
        parentDepartmentName: this.updateDepartment.parentDepartmentName,
      };
      var jsonParam = JSON.stringify(updateDepartmentObject);
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
    deleteDepartmentDialogOpen(row) {
      this.selectedDepartment = row;
      this.deleteDepartmentDialogVisible = true;
    },
    deleteDepartmentFunc() {
      var url = this.constant.baseUrl + "/studio/delete_department";
      var deleteDepartmentObject = {
        departmentId: this.selectedDepartment.departmentId,
        studioId: localStorage.getItem("currentStudioId"),
      };
      var jsonParam = JSON.stringify(deleteDepartmentObject);
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
  },
  created() {
    this.getDepartmentList();
  },
};
</script>

<style>
</style>