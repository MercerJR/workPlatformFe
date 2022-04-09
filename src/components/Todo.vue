<template>
  <div>
    <div>
      <el-button type="primary" @click="openDialog">新增待办</el-button>
    </div>
    <el-row>
      <el-col :span="14">
        <h2>我的待办事项</h2>
        <div>
          <el-table :data="todoList" style="width: 100%" max-height="700">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="时间">
                    <span>{{ props.row.timePeriod }}</span>
                  </el-form-item>
                  <el-form-item label="待办事项">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="待办描述">
                    <span>{{ props.row.describe }}</span>
                  </el-form-item>
                  <el-form-item label="发起人">
                    <span>{{ props.row.originator }}</span>
                  </el-form-item>
                  <el-form-item label="参与人">
                    <span>{{ props.row.participants }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="时间" prop="timePeriod"> </el-table-column>
            <el-table-column label="待办事项" prop="title"> </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.originatorId == CurrentUser.userId"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
                <!-- 删除待办dialog -->
                <el-dialog
                  title="删除待办"
                  :visible.sync="deleteDialogVisible"
                  width="30%"
                >
                  <span>请确认是否删除待办？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="danger" @click="deleteTodo"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="margin-left: 20px">
          <h2>当前正在进行的待办事项</h2>
          <div v-show="currentTodoList[0] != null" style="margin-top: 30px">
            <div v-for="item in currentTodoList" :key="item.todoId">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <h3>{{ item.title }}</h3>
                </div>
                <h3>{{ item.timePeriod }}</h3>
                <h4>{{ item.describe }}</h4>
                <span>发起人：{{ item.originator }}</span>
                <br />
                <span>参与人：{{ item.participants }}</span>
              </el-card>
            </div>
          </div>
          <div  v-show="currentTodoList[0] == null" style="margin-top: 30px">
            <el-empty description="暂无待办事项"></el-empty>
          </div>
        </div>
      </el-col>
    </el-row>

    <div>
      <!-- 新建待办dialog -->
      <el-dialog
        title="新增待办事项"
        :visible.sync="dialogVisible"
        width="70%"
        height="80%"
      >
        <div>
          <el-row>
            <el-col :span="12">
              <div>
                <div class="block">
                  <h4>请选择日期</h4>
                  <el-date-picker
                    v-model="inputDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
                <div>
                  <h4>请选择时间</h4>
                  <el-time-select
                    placeholder="起始时间"
                    v-model="inputStartTime"
                    :picker-options="{
                      start: '08:00',
                      step: '00:15',
                      end: '22:00',
                    }"
                  >
                  </el-time-select>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="inputEndTime"
                    :picker-options="{
                      start: '08:00',
                      step: '00:15',
                      end: '22:00',
                      minTime: inputStartTime,
                    }"
                  >
                  </el-time-select>
                </div>
                <div>
                  <h4>请输入待办事项</h4>
                  <el-input v-model="inputTitle"></el-input>
                </div>
                <div>
                  <h4>请输入待办描述</h4>
                  <el-input
                    v-model="inputDescribe"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 3 }"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="margin-left: 20px">
                <h4>选择参与的成员</h4>
                <el-scrollbar style="height: 100%">
                  <div>
                    <el-tree
                      :data="memberTreeList"
                      show-checkbox
                      node-key="id"
                      @check-change="handleMemberCheckChange"
                    >
                    </el-tree>
                  </div>
                </el-scrollbar>
              </div>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="add">发布</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",

  data() {
    return {
      todoList: [
        // {
        //   timePeriod: "ss",
        //   title: "ss",
        //   describe: "ssss",
        //   originator: "sss",
        //   participants: "sss",
        //   originatorId: 1,
        // },
        // {
        //   timePeriod: "ssssss",
        //   title: "s",
        //   describe: "ff",
        //   originator: "ffff",
        //   participants: "fffffff",
        //   originatorId: 2,
        // },
      ],
      currentTodoList: [],
      dialogVisible: false,
      CurrentUser: {
        userId: 1,
      },
      inputTitle: "",
      inputDescribe: "",
      inputDay: "",
      inputStartTime: "",
      inputEndTime: "",

      memberTreeList: [],
      memberSet: [],

      deleteDialogVisible: false,

      selectedTodo: {},

      currentStudioId: 0,
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.currentStudioId = this.getCurrentStudioId();
    this.getTodoList();
  },

  methods: {
    handleDelete(index, row) {
      console.log(index, row);
      this.selectedTodo = row;
      this.deleteDialogVisible = true;
    },
    openDialog() {
      this.dialogVisible = true;
      this.memberSet = new Set();
      this.getMemberTreeList();
    },
    handleMemberCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      if (checked) {
        this.memberSet.add(data.id);
      } else {
        this.memberSet.delete(data.id);
      }
    },
    getMemberTreeList() {
      var url =
        this.constant.baseUrl +
        "/studio/show_department_member_list_in_tree/" +
        this.currentStudioId;
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
            this.memberTreeList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    deleteTodo() {
      var url = this.constant.baseUrl + "/todo/delete";
      var deleteTodoReq = {
        todoId: this.selectedTodo.todoId,
      };
      var jsonParam = JSON.stringify(deleteTodoReq);
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
          this.getTodoList();
        });
      this.deleteDialogVisible = false;
    },
    add() {
      var url = this.constant.baseUrl + "/todo/add";
      var addTodoReq = {
        title: this.inputTitle,
        describe: this.inputDescribe,
        day: this.inputDay,
        startTime: this.inputStartTime,
        endTime: this.inputEndTime,
        studioId: this.currentStudioId,
        memberSet: this.memberSet,
      };
      var jsonParam = JSON.stringify(addTodoReq);
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
          this.getTodoList();
        });
      this.dialogVisible = false;
    },
    getTodoList() {
      var url =
        this.constant.baseUrl +
        "/todo/show_todo_list/" +
        this.currentStudioId;
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
            this.todoList = res.data.data.todoList;
            this.currentTodoList = res.data.data.currentTodoList;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
  },
};
</script>

<style>
</style>