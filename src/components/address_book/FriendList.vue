<template>
  <el-row>
    <el-col :span="14">
      <div>
        <el-table
          :data="friends"
          style="width: 100%"
          :default-sort="{ prop: 'name', order: 'ascending' }"
          @cell-click="showFriendInfo"
          @cell-dbclick="chat"
        >
          <el-table-column prop="name" label="好友列表" width="180">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="10">
      <div v-show="friendInfoShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-page-header
              @back="hideFriendInfo"
              :content="friendInfo.name"
              class="backHeader"
            >
            </el-page-header>
            <el-row>
              <el-col :span="8">
                <div>
                  <img :src="friendInfo.icon" class="image" />
                </div>
              </el-col>
              <el-col :span="16">
                <div class="info">
                  <span v-show="checkEmpty(friendInfo.gender) ? false : true"
                    >性别：{{ friendInfo.gender }}<br
                  /></span>
                  <span v-show="checkEmpty(friendInfo.hobby) ? false : true"
                    >爱好：{{ friendInfo.hobby }}<br
                  /></span>
                  <span v-show="checkEmpty(friendInfo.livePlace) ? false : true"
                    >居住地：{{ friendInfo.livePlace }}<br
                  /></span>
                  <span v-show="checkEmpty(friendInfo.hometown) ? false : true"
                    >家乡：{{ friendInfo.hometown }}<br
                  /></span>
                  <span v-show="checkEmpty(friendInfo.describe) ? false : true"
                    >个人描述：{{ friendInfo.describe }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <div class="bottom clearfix">
              <el-button type="primary">发消息</el-button>
              <el-button type="text" style="color:#F56C6C;" @click="centerDialogVisible = true"
                >删除好友</el-button
              >
              <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center
              >
                <span>将"{{ friendInfo.name }}"联系人删除并同时将你从对方的好友列表中移除?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="deleteFriend(friendInfo.friendId)"
                    >确 定</el-button
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
  name: "FriendList",
  data() {
    return {
      friends: [],
      friendInfo: {
        friendId: "",
        name: "",
        icon: "",
        describe: "",
        gender: "",
        hobby: "",
        livePlace: "",
        hometown: "",
      },
      token: "",
      friendInfoShow: false,
      centerDialogVisible: false,
    };
  },
  methods: {
    // formatter(row, column) {
    //   return row.address;
    // },
    getFriendList() {
      var url = this.constant.baseUrl + "/friend/list";
      this.$axios
        .get(url, {
          headers: {
            token: this.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.friends = res.data.data;
          } else {
            alert(res.data.message);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    showFriendInfo(row) {
      var url =
        this.constant.baseUrl + "/friend/show_friend_info/" + row.friendId;
      this.$axios
        .get(url, {
          headers: {
            token: this.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            this.friendInfo = res.data.data;
            //临时给头像赋默认值
            this.friendInfo.icon =
              "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png";
          } else {
            alert(res.data.message);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });

      this.friendInfoShow = true;
    },
    hideFriendInfo() {
      this.friendInfoShow = false;
    },
    chat() {},
    checkEmpty(property) {
      return property == null || property == "";
    },
    deleteFriend(friendId) {
      //隐藏弹窗
      this.centerDialogVisible = false;

      var url = this.constant.baseUrl + "/friend/delete";
      var jsonParam = JSON.stringify(friendId);
      this.$axios
        .post(url, jsonParam, {
          headers: {
            token: this.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          alert(res.data.message);
          this.handleNotLogin(res.data.code);
          //隐藏已删除的好友信息，并刷新好友列表
          this.friendInfoShow = false;
          this.getFriendList();
        });
    },
  },
  created() {
    this.checkToken();
    this.token = localStorage.getItem("token");
    console.log(this.token);
    this.getFriendList();
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