<template>
  <div>
    <div>
      <el-button type="primary" @click="openPublishDialog"
        >添加新的消息推送</el-button
      >
    </div>
    <div style="margin-top: 25px">
      <template>
        <el-table
          :data="announcementList"
          stripe
          style="width: 100%"
          @cell-click="openDialog"
        >
          <el-table-column prop="title" label="推文标题"> </el-table-column>
          <el-table-column prop="publishName" label="发布人"> </el-table-column>
          <el-table-column prop="time" label="推送时间"> </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 推文dialog -->
    <el-dialog
      title="推文详情"
      :visible.sync="dialogVisible"
      width="30%"
      height="60%"
    >
      <h2>{{ selectedAnnouncement.title }}</h2>
      <br />
      <span>
        {{ selectedAnnouncement.content }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>

    <!-- 新建推文dialog -->
    <el-dialog
      title="发布推文"
      :visible.sync="publishDialogVisible"
      width="50%"
      height="80%"
    >
      <div>
        <el-row>
          <el-col :span="12">
            <div>
              <div>
                <h4>请输入推文标题</h4>
                <el-input v-model="inputTitle"></el-input>
              </div>
              <div>
                <h4>请输入推文内容</h4>
                <el-input
                  v-model="inputContent"
                  type="textarea"
                  :autosize="{ minRows: 15, maxRows: 20 }"
                ></el-input>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <el-scrollbar style="height: 100%">
              <div>
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  @check-change="handleDepartmentCheckChange"
                >
                </el-tree>
              </div>
            </el-scrollbar>
          </el-col> -->
          <el-col :span="12">
            <div style="margin-left: 20px">
              <h4>选择推送成员</h4>
              <el-scrollbar style="height: 100%">
                <div>
                  <el-tree
                    :data="data"
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
        <el-button @click="publishDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="publish">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      announcementList: [
        {
          announcementId: 1,
          seq: 0,
          title: "biaoti",
          content: "kanab ",
          publishId: 1,
          publishName: "tuoleisi",
          time: "2022-2-2",
        },
      ],
      currentStudioId: 0,

      selectedAnnouncement: {},
      dialogVisible: false,
      publishDialogVisible: false,

      inputTitle: "",
      inputContent: "",

      departmentSet: [],
      memberSet: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.currentStudioId = this.getCurrentStudioId();
  },

  methods: {
    openDialog(row) {
      this.selectedAnnouncement = this.announcementList[row.seq];
      this.dialogVisible = true;
    },
    openPublishDialog() {
      this.publishDialogVisible = true;
    //   this.departmentSet = new Set();
      this.memberSet = new Set();
    },
    // handleDepartmentCheckChange(data, checked, indeterminate) {
    //   console.log(data, checked, indeterminate);
    //   if (checked) {
    //     this.departmentSet.add(data.id);
    //   } else {
    //     this.departmentSet.add(data.id);
    //   }
    // },
    handleMemberCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      if (checked) {
        this.memberSet.add(data.id);
      } else {
        this.memberSet.add(data.id);
      }
    },
    publish() {
      console.log(this.departmentSet);
      this.publishAnnouncement();
      this.publishDialogVisible = false;
    },
    publishAnnouncement() {
      var url = this.constant.baseUrl + "/announcement/publish";
      var publishReq = {
        title: this.inputTitle,
        content: this.inputContent,
        studioId: this.currentStudioId,
        memberSet: this.memberSet,
      };
      var jsonParam = JSON.stringify(publishReq);
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
    },
  },
};
</script>

<style>
</style>