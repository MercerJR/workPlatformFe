<template>
  <div>
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          可上传jpg/png/word等多种文件
        </div>
      </el-upload>

      <el-button type="primary" style="float: right">我的申请</el-button>
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="documentName" label="文件名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="上传成员" width="180">
        </el-table-column>
        <el-table-column prop="time" label="上传时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="deal(scope.$index, scope.row)">{{
              scope.row.opreator
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 申请 -->
    <el-dialog
      title="申请文档权限"
      :visible.sync="applyDialogVisible"
      width="30%"
    >
      <span>请输入申请信息</span>
      <br />
      <el-input v-model="inputApply"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="apply"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 申请进度 -->
    <el-dialog title="申请进度" :visible.sync="resultDialogVisible" width="30%">
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="发起申请"></el-step>
        <el-step title="审核中"></el-step>
        <el-step title="审核结束"></el-step>
      </el-steps>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resultDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resultDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Document",

  data() {
    return {
      fileList: [],
      tableData: [
        {
          documentName: "后勤物资管理",
          name: "胡迪警长",
          time: "2016-05-04",
          opreator: "下载",
        },
        {
          documentName: "成员安排",
          name: "憨憨鳄鱼",
          time: "2022-04-10",
          opreator: "下载",
        },
        {
          documentName: "助理部门工位更换",
          name: "小可爱3049",
          time: "2022-04-08",
          opreator: "下载",
        },
        {
          documentName: "测试",
          name: "胡迪警长",
          time: "2022-04-10",
          opreator: "申请",
        },
      ],
      inputApply: "",
      applyDialogVisible: false,
      resultDialogVisible: false,
      alreadyApply: false,
    };
  },

  created() {},

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    deal(index, row) {
      if (row.opreator == "申请") {
        if (this.alreadyApply) {
          this.resultDialogVisible = true;
        } else {
          this.applyDialogVisible = true;
        }
      } else {
        download(row);
      }
    },
    download(row) {},
    apply(){
        this.applyDialogVisible = false;
        this.alreadyApply = true;
    }
  },
};
</script>

<style>
</style>