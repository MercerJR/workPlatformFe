<template>
  <div>
    <h2 style="color: #f56c6c">新的联系人</h2>
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入想要查询的用户或群聊"
        v-model="searchContent"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户" value="user"></el-option>
          <el-option label="群聊" value="group"></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <div>
      <el-table
        :data="userResult"
        class="result"
        v-show="userResultShow"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item
                label="性别"
                v-show="checkEmpty(props.row.gender) ? false : true"
              >
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item
                label="爱好"
                v-show="checkEmpty(props.row.hobby) ? false : true"
              >
                <span>{{ props.row.hobby }}</span>
              </el-form-item>
              <el-form-item
                label="居住地"
                v-show="checkEmpty(props.row.livePlace) ? false : true"
              >
                <span>{{ props.row.livePlace }}</span>
              </el-form-item>
              <el-form-item
                label="家乡"
                v-show="checkEmpty(props.row.hometown) ? false : true"
              >
                <span>{{ props.row.hometown }}</span>
              </el-form-item>
              <el-form-item
                label="个人描述"
                v-show="checkEmpty(props.row.describe) ? false : true"
              >
                <span>{{ props.row.describe }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户" prop="name"> </el-table-column>
        <el-table-column label="性别" prop="gender"> </el-table-column>
        <el-table-column label="居住地" prop="livePlace"> </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openAddFriendDialog(scope.$index, scope.row)"
              >加好友</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 申请好友dialog -->
      <el-dialog
        title="添加好友"
        :visible.sync="addFriendDialogVisible"
        width="30%"
      >
        <span>请输入添加好友验证信息</span>
        <el-input v-model="addFriendApplyMessage" placeholder="请输入好友验证信息"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFriendDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFriend()"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-table
        :data="groupResult"
        class="result"
        v-show="groupResultShow"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="群聊名称">
                <span>{{ props.row.groupName }}</span>
              </el-form-item>
              <el-form-item label="群聊属性">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="人数">
                <span>{{ props.row.peopleNumber }}</span>
              </el-form-item>
              <el-form-item
                label="分类"
                v-show="checkEmpty(props.row.classify) ? false : true"
              >
                <span>{{ props.row.classify }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="群聊名称" prop="groupName"> </el-table-column>
        <el-table-column label="人数" prop="peopleNumber"> </el-table-column>
        <el-table-column label="" prop="type"> </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openJoinGroupDialog(scope.$index, scope.row)"
              >加入群聊</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 申请加入群聊dialog -->
      <el-dialog
        title="添加好友"
        :visible.sync="joinGroupDialogVisible"
        width="30%"
      >
        <span>请输入加入群聊验证信息</span>
        <br>
        <el-input v-model="joinGroupApplyMessage" placeholder="请输入加入群聊验证信息"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="joinGroupDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="joinGroup()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewFriend",
  data() {
    return {
      searchContent: "",
      select: "",
      userResult: [
        {
          name: "托雷斯",
          gender: "男",
          livePlace: "马德里",
        },
        {
          name: "托雷斯",
          gender: "",
          livePlace: "马德里",
        },
      ],
      groupResult: [
        {
          groupName: "马德里竞技",
          classify: "足球",
          createTime: "..",
        },
        {
          groupName: "阿森纳",
          classify: "足球",
          //   createTime:"...",
        },
      ],
      userResultShow: false,
      groupResultShow: false,

      addFriendApplyMessage: "",
      addFriendDialogVisible: false,
      operateUserId: 0,

      joinGroupApplyMessage: "",
      joinGroupDialogVisible: false,
      operateGroupId: 0,
    };
  },
  methods: {
    checkEmpty(property) {
      return property == null || property == "";
    },
    openAddFriendDialog(index,row){
      this.addFriendDialogVisible = true;
      this.operateUserId = row.userId;
    },
    addFriend() {
      var url = this.constant.baseUrl + "/friend/apply";
      var applyAddFriendReq = {
        targetId: this.operateUserId,
        applyMessage: this.addFriendApplyMessage,
      };
      var jsonParam = JSON.stringify(applyAddFriendReq);
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
          this.addFriendDialogVisible = false;
        });
    },
    openJoinGroupDialog(index,row){
      this.joinGroupDialogVisible = true;
      this.operateGroupId = row.groupId;
    },
    joinGroup() {
      var url = this.constant.baseUrl + "/group/apply_join";
      var applyJoinGroupReq = {
        groupId: this.operateGroupId,
        applyMessage: this.joinGroupApplyMessage,
      };
      var jsonParam = JSON.stringify(applyJoinGroupReq);
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
          this.joinGroupDialogVisible = false;
        });
    },
    search() {
      var select = this.checkEmpty(this.select) ? "user" : this.select;
      var url =
        this.constant.baseUrl +
        "/search/" +
        select +
        "?search_content=" +
        this.searchContent;
      console.log(url);
      console.log("search方法" + this.$root.token);
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
            if (select == "user") {
              this.userResult = res.data.data;
              this.userResultShow = true;
              this.groupResultShow = false;
            } else {
              this.groupResult = res.data.data;
              this.groupResultShow = true;
              this.userResultShow = false;
            }
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
  },
  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
  },
};
</script>

<style>
.result {
  margin-top: 15px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-select .el-input {
  width: 130px;
}
</style>