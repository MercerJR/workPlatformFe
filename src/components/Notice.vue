<template>
  <div>
    <el-table
      :data="noticeList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="">
              <span>{{ props.row.noticeContent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="noticeTitle" label=""> </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <div v-if="scope.row.needDeal">
            <el-button
              size="mini"
              type="primary"
              @click="agree(scope.$index, scope.row)"
              >同意</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="refuse(scope.$index, scope.row)"
              >拒绝</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Notice",

  data() {
    return {
      noticeList: [],
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");

    this.getNoticeList();
  },

  methods: {
    //根据后端属性进行判断
    tableRowClassName({ row, rowIndex }) {
      if (row.noticeType === 0) {
        return "friend-row";
      } else if (row.noticeType === 1) {
        return "group-row";
      } else if (row.noticeType == 2) {
        return "studio-row";
      }
      return "";
    },
    getNoticeList() {
      var url = this.constant.baseUrl + "/notice/show_notice_list";
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
            this.noticeList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    agree(index, row) {},
    refuse(index, row) {},
  },
};
</script>

<style>
.el-table .friend-row {
}
.el-table .group-row {
  background: oldlace;
}
.el-table .studio-row {
  background: #f0f9eb;
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
</style>