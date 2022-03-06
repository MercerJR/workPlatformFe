<template>
  <div class="all">
    <div style="margin-top: 10px">
      <el-row>
        <el-col :span="12">
          <span>管理员只可以使用管理后台的部分功能</span>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = true"
            style="float: right"
            ><i class="el-icon-plus"></i> 添加管理员</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        size="medium"
      >
        <el-select v-model="select" slot="prepend" placeholder="搜索方式">
          <el-option label="按用户搜索" value="user"></el-option>
          <el-option label="按部门搜索" value="department"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <div style="margin-top: 15px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="管理员" width="180">
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
        <el-table-column label="部门" prop="department"></el-table-column>
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
      title="添加管理员"
      :visible.sync="dialogVisible"
      width="40%"
      top="20vh"
      :before-close="handleClose"
    >
      <div>
        <span>管理员</span>
        <div style="margin-top: 10px">
          <el-input
            size="medium"
            placeholder="请输入完整的姓名或手机号"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
      </div>
      <div style="margin-top:15px">
        <span>部门</span>
        <div style="margin-top: 10px">
          <el-input
            size="medium"
            placeholder="请输入完整的部门名称"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
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
  name: "Admin",
  data() {
    return {
      tableData: [
        {
          icon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          date: "2016-05-02",
          name: "王小虎",
          role: "创始人",
          department: "兵工厂/哈哈部",
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
      select: "",
      dialogVisible: false,
    };
  },
};
</script>

<style>
.all {
  font-size: 14px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>