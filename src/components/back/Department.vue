<template>
  <div style="margin-left: 15px">
    <div>
      <el-button
        type="primary"
        size="small"
        @click="newDepartmentDialogVisible = true"
        ><i class="el-icon-plus"></i>新建部门</el-button
      >
      <el-input
        placeholder="请输入部门名称"
        prefix-icon="el-icon-search"
        v-model="searchDepartment"
        style="float:right;width:30%"
        size="medium"
      >
      </el-input>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="departmentList" style="width: 100%">
        <el-table-column prop="departmentName" label="部门名称">
        </el-table-column>
        <el-table-column prop="peopleNumber" label="部门人数">
        </el-table-column>
        <el-table-column prop="leader" label="负责人"> </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">编辑部门</el-button>
          <el-button type="text">添加子部门</el-button>
          <el-button type="text" style="color: #f56c6c">删除部门</el-button>
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
          <el-input v-model="newDepartment.newDepartmentName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门名称">
          <el-input v-model="newDepartment.parentDepartmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDepartmentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepartment">确 定</el-button>
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
      departmentList: [
        {
          departmentId: 0,
          departmentName: "",
          peopleNumber: 0,
          leader: "",
        },
      ],
      searchDepartment:"",
      newDepartmentDialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.newDepartmentDialogVisible = false;
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
    addDepartment() {},
  },
  created(){
    this.getDepartmentList();
  }
};
</script>

<style>
</style>