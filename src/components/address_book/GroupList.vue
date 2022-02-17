<template>
  <el-row>
    <el-col :span="14">
      <div>
        <div>
          <el-table
            :data="innerGroupList"
            style="width: 100%"
            :default-sort="{ prop: 'groupName', order: 'ascending' }"
            @cell-click="showGroupInfo"
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
            @cell-click="showGroupInfo"
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
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="text item">
            <div class="bottom clearfix">
              <!-- <el-button type="primary">发消息</el-button> -->
              <el-table
                :data="groupMemberList"
                style="width: 100%"
                :default-sort="{ prop: 'nickname', order: 'descending' }"
                @cell-dbclick="chat"
              >
                <el-table-column prop="nickname" label="成员列表" width="180" :sortable="true" :sort-by="sortByArray">
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
        icon: "https://tse1-mm.cn.bing.net/th/id/R-C.911e513170c60b435468bdcdd0fe50ee?rik=RQx88HIuKZ2CCg&riu=http%3a%2f%2fup.deskcity.org%2fpic%2f86%2fe3%2fb4%2f86e3b4d4048b6b9289da2b7c41e2e698.jpg&ehk=KR6xnPQsA9xGVmw2iap6KY%2fswRTf8qkjBAPqH0bBSq8%3d&risl=&pid=ImgRaw&r=0-",
        name: "北伦敦酋长",
        type: "外部群聊",
        classify: "足球",
        peopleNumber: 0,
        createTime: "2022-01-06",
      },
      groupMemberList: [],
      groupInfoShow: false,
      sortByArray:["roleId","nickname"],
      token: "",
    };
  },
  methods: {
    getGroupList(type) {
      var url = this.constant.baseUrl + "/group/list/" + type;
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
            if (type == 1) {
              this.innerGroupList = res.data.data;
            } else {
              this.outsideGroupList = res.data.data;
            }
          } else {
            alert(res.data.message);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    showGroupInfo(row) {
      var url = this.constant.baseUrl + "/group/show_group_info/" + row.groupId;
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
            this.groupInfo = res.data.data;
            //临时给头像赋默认值
            this.groupInfo.icon =
              "https://tse1-mm.cn.bing.net/th/id/R-C.911e513170c60b435468bdcdd0fe50ee?rik=RQx88HIuKZ2CCg&riu=http%3a%2f%2fup.deskcity.org%2fpic%2f86%2fe3%2fb4%2f86e3b4d4048b6b9289da2b7c41e2e698.jpg&ehk=KR6xnPQsA9xGVmw2iap6KY%2fswRTf8qkjBAPqH0bBSq8%3d&risl=&pid=ImgRaw&r=0-";
          } else {
            alert(res.data.message);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });

      var url =
        this.constant.baseUrl + "/group/show_member_list/" + row.groupId;
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
            this.groupMemberList = res.data.data;
          } else {
            alert(res.data.message);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });

      this.groupInfoShow = true;
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
  },
  created() {
    this.checkToken();
    this.token = localStorage.getItem("token");
    console.log(this.token);
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