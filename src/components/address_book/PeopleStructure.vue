<template>
  <div class="all">
    <h1 style="color: #f56c6c">组织架构</h1>
    <el-row>
      <el-col :span="5">
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
          <div @keyup.enter="searchMember">
            <span v-show="deaprtmentHeaderShow"
              >{{ selectedDepartment.departmentName }}
              <i class="el-icon-user-solid"></i>
              {{ selectedDepartment.peopleNumber }}</span
            >
            <el-input
              placeholder="请输入要查找的成员"
              prefix-icon="el-icon-search"
              v-model="searchContent"
              size="small"
              style="float: right; width: 40%"
            >
            </el-input>
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
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PeopleStructure",
  data() {
    return {
      departmentList: [],
      selectedDepartment: {},
      memberList: [],
      changeDepartment: {
        departmentName: "",
      },
      searchContent: "",
      deaprtmentHeaderShow:false,
    };
  },
  methods: {
    selectDepartment(row) {
      this.selectedDepartment = this.departmentList[row.index];
      this.getDepartmentMemberList(row.departmentId);
      this.deaprtmentHeaderShow = true;
    },
    handleClose() {
      this.changeDepartmentDialogVisible = false;
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
    searchMember() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/search_member?search_content=" +
        this.searchContent +
        "&studio_id=" +
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
            this.memberList = res.data.data;
            this.deaprtmentHeaderShow = false;
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
  margin-top: 15px;
}
.departmentButton {
  width: 90%;
  font-size: 12px;
  border-width: 0.5px;
  text-align: left;
}
</style>