<template>
  <el-row>
    <el-col :span="14">
      <div>
        <div>
          <el-table
            :data="innerGroupList"
            style="width: 100%"
            :default-sort="{ prop: 'groupName', order: 'ascending' }"
            @cell-click="getGroupInfoAndMemberList"
            @cell-dbclick="chat"
          >
            <el-table-column prop="groupName" label="工作室群聊" width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div>
          <el-table
            :data="outsideGroupList"
            style="width: 100%"
            :default-sort="{ prop: 'groupName', order: 'ascending' }"
            @cell-click="getGroupInfoAndMemberList"
            @cell-dbclick="chat"
          >
            <el-table-column prop="groupName" label="外部群聊" width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>

    <el-col :span="10">
      <div v-show="groupInfoShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-page-header
              @back="hideGroupInfo"
              :content="
                groupInfo.groupName + '(' + groupInfo.peopleNumber + ')'
              "
              class="backHeader"
            >
            </el-page-header>

            <el-row>
              <el-col :span="8">
                <div>
                  <img :src="groupInfo.icon" class="image" />
                </div>
              </el-col>
              <el-col :span="16">
                <div class="info">
                  <span>{{ groupInfo.type }}<br /></span>
                  <span v-show="checkEmpty(groupInfo.classify) ? false : true"
                    >分类：{{ groupInfo.classify }}<br
                  /></span>
                  <span>创建时间：{{ groupInfo.createTime }}<br /></span>
                  <el-button
                    type="text"
                    v-show="manageGroupButtonShow"
                    style="color: #67c23a"
                    @click="showUpdateGroupInfo"
                    >管理群聊信息</el-button
                  >
                </div>
              </el-col>
            </el-row>

            <div v-show="updateGroupInfoShow">
              <div style="margin: 0px"></div>
              <el-form
                label-position="top"
                label-width="80px"
                :model="updateGroupInfoObject"
                style="width: 40%"
              >
                <el-form-item label="群聊名称">
                  <el-input
                    v-model="updateGroupInfoObject.groupName"
                    :placeholder="groupInfo.groupName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="群聊分类">
                  <el-input
                    v-model="updateGroupInfoObject.classify"
                    :placeholder="groupInfo.classify"
                  ></el-input>
                </el-form-item>
              </el-form>
              <br />
              <el-button type="success" @click="updateGroupInfo" plain
                >更新</el-button
              >
              <el-button type="text" @click="hideUpdateGroupInfo"
                >收起</el-button
              >
            </div>
          </div>

          <div class="text item">
            <div class="bottom clearfix">
              <!-- <el-button type="primary">发消息</el-button> -->
              <el-table
                :data="groupMemberList"
                style="width: 100%"
                :default-sort="{ prop: 'nickname', order: 'descending' }"
                @cell-click="openDialog"
                @cell-dbclick="chat"
              >
                <el-table-column
                  prop="nickname"
                  label="成员列表"
                  width="180"
                  :sortable="true"
                  :sort-by="sortByArray"
                >
                </el-table-column>
                <el-table-column prop="role" label="" width="100">
                  <template slot-scope="scope">
                    <el-tag
                      effect="light"
                      :type="getTagType(scope.row.role)"
                      disable-transitions
                      >{{ scope.row.role }}</el-tag
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="成员管理"
                :visible.sync="managerMemberDialogShow"
                width="30%"
              >
                <div v-show="groupInfo.currentUserRoleId == 2 ? true : false">
                  <span>设为管理员</span>
                  <el-switch
                    v-model="selectedMemberInfo.roleId"
                    active-color="#13ce66"
                    inactive-color="#DCDFE6"
                    :active-value="1"
                    :inactive-value="0"
                    @change="updateAdmin"
                  >
                  </el-switch>
                </div>
                <el-button type="danger" style="margin-top:25px;" @click="deleteFriend">删除成员</el-button>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    type="primary"
                    @click="managerMemberDialogShow = false"
                    >关闭</el-button
                  >
                </span>
              </el-dialog>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "GroupList",
  data() {
    return {
      innerGroupList: [],
      outsideGroupList: [],
      groupInfo: {
        groupId: 0,
        icon: "",
        groupName: "",
        type: "",
        classify: "",
        peopleNumber: 0,
        currentUserRoleId: 0,
        createTime: "",
      },
      updateGroupInfoObject: {
        groupId: 0,
        groupName: "",
        classify: "",
      },
      groupMemberList: [],
      groupInfoShow: false,
      sortByArray: ["roleId", "nickname"],
      manageGroupButtonShow: false,
      updateGroupInfoShow: false,
      managerMemberDialogShow: false,
      selectedMemberInfo: {
        userId: 0,
        nickname: "",
        name: "",
        roleId: 0,
        role: "",
      },
    };
  },
  methods: {
    getGroupList(type) {
      var url = this.constant.baseUrl + "/group/list/" + type;
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
            if (type == 1) {
              this.innerGroupList = res.data.data;
            } else {
              this.outsideGroupList = res.data.data;
            }
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    getGroupInfoAndMemberList(row) {
      this.getGroupInfo(row.groupId);
      this.getMemberList(row.groupId);
      this.groupInfoShow = true;
    },
    getGroupInfo(groupId) {
      //获取群聊信息
      var url = this.constant.baseUrl + "/group/show_group_info/" + groupId;
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
            this.groupInfo = res.data.data;
            //临时给头像赋默认值
            this.groupInfo.icon =
              "https://tse1-mm.cn.bing.net/th/id/R-C.911e513170c60b435468bdcdd0fe50ee?rik=RQx88HIuKZ2CCg&riu=http%3a%2f%2fup.deskcity.org%2fpic%2f86%2fe3%2fb4%2f86e3b4d4048b6b9289da2b7c41e2e698.jpg&ehk=KR6xnPQsA9xGVmw2iap6KY%2fswRTf8qkjBAPqH0bBSq8%3d&risl=&pid=ImgRaw&r=0-";
            //只有群主能看到更新群聊信息的按钮
            this.manageGroupButtonShow =
              this.groupInfo.currentUserRoleId == 2 ? true : false;
            //保证切换群聊信息的时候不会展示更新信息的列表
            this.updateGroupInfoShow = false;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    getMemberList(groupId) {
      //获取群聊用户列表
      var url = this.constant.baseUrl + "/group/show_member_list/" + groupId;
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
            this.groupMemberList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    chat() {},
    checkEmpty(property) {
      return property == null || property == "";
    },
    hideGroupInfo() {
      this.groupInfoShow = false;
    },
    getTagType(tagProp) {
      if (tagProp == "群主") {
        return "warning";
      }
      return tagProp == "管理员" ? "success" : "info";
    },
    showUpdateGroupInfo() {
      this.updateGroupInfoShow = true;
    },
    hideUpdateGroupInfo() {
      this.updateGroupInfoShow = false;
    },
    updateGroupInfo: function () {
      var url = this.constant.baseUrl + "/group/update_group_info";
      this.updateGroupInfoObject.groupId = this.groupInfo.groupId;
      var jsonParam = JSON.stringify(this.updateGroupInfoObject);
      this.$axios
        .post(url, jsonParam, {
          headers: {
            token: this.$root.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.alertMessage(res);
          console.log(res.data);
          this.handleNotLogin(res.data.code);
          this.hideUpdateGroupInfo();
          this.getGroupInfo(this.groupInfo.groupId);
        });
    },
    updateAdmin() {
      console.log(this.selectedMemberInfo.roleId);
      var url = this.constant.baseUrl + "/group/update_role";
      var updateAdminRequest = {
        memberId: this.selectedMemberInfo.userId,
        groupId: this.groupInfo.groupId,
        roleId: this.selectedMemberInfo.roleId,
      };
      var jsonParam = JSON.stringify(updateAdminRequest);
      this.$axios
        .post(url, jsonParam, {
          headers: {
            token: this.$root.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.alertMessage(res);
          console.log(res.data);
          this.handleNotLogin(res.data.code);
          if(res.data.code == 0){
            this.getMemberList(this.groupInfo.groupId);
          }
        });
    },
    openDialog(row) {
      //如果当前用户的角色是成员，或被点击的用户是群主，或被点击的用户是自己，都将不会打开dialog
      if (this.groupInfo.currentUserRoleId == 0 || row.roleId == 2 || row.userId == localStorage.getItem("userId")) {
        return;
      }
      this.selectedMemberInfo = row;
      console.log(this.selectedMemberInfo);
      this.managerMemberDialogShow = true;
    },
    deleteFriend(){
      console.log("删除成员");
    }
  },
  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.getGroupList(1);
    this.getGroupList(0);
  },
};
</script>

<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 500px;
  margin-left: 25px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 80%;
  display: block;
}
.info {
  font-family: "Microsoft YaHei", "微软雅黑";
}
.backHeader {
  margin-bottom: 15px;
}
</style>