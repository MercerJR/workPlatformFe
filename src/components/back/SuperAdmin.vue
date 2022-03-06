<template>
  <div class="all">
    <div style="margin-top: 10px">
      <span>超级管理员可以使用管理后台的所有功能</span>
    </div>
    <div style="margin-top: 25px">
      <el-row>
        <el-col :span="12">
          <div class="search">
            <el-input
              size="small"
              placeholder="请输入姓名或手机号"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = true"
            style="float: right"
            >添加超级管理员</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="8">
                <div class="block">
                  <el-avatar :size="40" :src="scope.row.icon"></el-avatar>
                </div>
              </el-col>
              <el-col :span="16">
                <span>{{ scope.row.name }}</span>
                <el-tag size="small">{{ scope.row.role }}</el-tag>
                <div>{{ scope.row.phone }}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="添加超级管理员"
      :visible.sync="dialogVisible"
      width="40%"
      top="30vh"
      :before-close="handleClose"
    >
      <span>超级管理员</span>
      <div style="margin-top:10px">
        <el-input
          size="medium"
          placeholder="请输入完整的姓名或手机号"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SuperAdmin",
  data() {
    return {
      tableData: [
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          date: "2016-05-02",
          name: "王小虎",
          role: "创始人",
          phone: "13364054049",
        },
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  created() {
    console.log("ss");
  },
};
</script>

<style>
.all {
  font-size: 14px;
}
.search {
  width: 40%;
}
</style>