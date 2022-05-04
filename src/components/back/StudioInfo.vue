<template>
  <div>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>

      <!-- 主体内容区 -->
      <el-col :span="16">
        <!-- 顶部标题和按钮 -->
        <div>
          <span>基本信息</span>
          <el-button
            type="primary"
            size="small"
            style="float: right"
            @click="changeDisabled"
            v-show="buttonShow"
            >修改信息</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="float: right"
            v-show="!buttonShow"
            @click="save"
            >保存</el-button
          >
          <el-button
            size="small"
            style="float: right"
            v-show="!buttonShow"
            @click="changeDisabled"
            >取消</el-button
          >
        </div>
        <!-- 工作室图标和名称区域 -->
        <div class="iconAndName">
          <el-row>
            <el-col :span="3">
              <el-avatar
                shape="square"
                :size="90"
                class="icon"
              >
              {{getStudioIconText(studioInfo.studioName)}}
              </el-avatar>
            </el-col>
            <el-col :span="21">
              <div>
                <span>工作室名称</span>
                <el-input
                  v-model="studioInfo.studioName"
                  :disabled="isDisabled"
                  style="margin-top: 20px"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 工作室基本信息 -->
        <div style="margin-top: 20px">
          <el-row>
            <el-col :span="12">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                size="small"
                class="inputForm"
              >
                <el-form-item label="工作室简称">
                  <el-input
                    v-model="studioInfo.studioAbbreviation"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="行业">
                  <el-input
                    v-model="studioInfo.classify"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                size="small"
                class="inputForm"
              >
                <el-form-item label="工作室描述">
                  <el-input
                    v-model="studioInfo.describe"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>

        <!-- 工作室联系人信息 -->
        <div style="margin-top: 40px; margin-bottom: 30px">
          <p>联系信息</p>
          <el-row>
            <el-col :span="12">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                size="small"
                class="inputForm"
              >
                <el-form-item label="联系人姓名">
                  <el-input
                    v-model="studioContactInfo.contactName"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系人手机">
                  <el-input
                    v-model="studioContactInfo.contactPhone"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                size="small"
                class="inputForm"
              >
                <el-form-item label="联系人邮箱">
                  <el-input
                    v-model="studioContactInfo.contactMail"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="工作室位置">
                  <el-input
                    v-model="studioContactInfo.studioPlace"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>

        <!-- 分割线 -->
        <el-divider></el-divider>

        <!-- 解散工作室模块 -->
        <div>
          <el-row>
            <el-col :span="4">
              <el-button type="danger" size="medium" plain
                >解散工作室</el-button
              >
            </el-col>
            <el-col :span="20">
              <span style="font-size: 10px"
                >解散后将删除所有后台管理帐号和通讯录中用户，且数据无法找回，请谨慎操作</span
              >
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="4"><div class="grid-content bg-purple"></div> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StudioInfo",
  data() {
    return {
      isDisabled: true,
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      input: "工作室名称",
      labelPosition: "top",
      buttonShow: true,
      studioInfo: {
        studioId: 0,
        studioIcon: "",
        studioName: "",
        studioAbbreviation: "",
        classify: "",
        describe: "",
      },
      studioContactInfo: {
        studioId: 0,
        contactName: "",
        contactMail: "",
        contactPhone: "",
        studioPlace: "",
      },
      temp: {
        studioInfo: {},
        studioContactInfo: {},
      },
    };
  },
  methods: {
    changeDisabled() {
      //如果在点击之前是不可修改的，那么存储副本
      if (this.isDisabled == true) {
        Object.assign(this.temp.studioInfo, this.studioInfo);
        Object.assign(this.temp.studioContactInfo, this.studioContactInfo);
      }
      //如果是正在修改的状态并且点击了取消，那么用副本赋值
      else {
        Object.assign(this.studioInfo, this.temp.studioInfo);
        Object.assign(this.studioContactInfo, this.temp.studioContactInfo);
        console.log(this.temp.studioInfo);
      }
      this.reverseDisabled();
    },
    reverseDisabled() {
      this.isDisabled = !this.isDisabled;
      this.buttonShow = !this.buttonShow;
    },
    getStudioInfo() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl + "/studio/show_studio_info/" + currentStudioId;
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
            this.studioInfo = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    getStudioContactInfo() {
      var currentStudioId = localStorage.getItem("currentStudioId");
      var url =
        this.constant.baseUrl +
        "/studio/show_studio_contact_info/" +
        currentStudioId;
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
            this.studioContactInfo = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    save() {
      this.updateStudioInfo();
      this.updateStudioContactInfo();
      this.reverseDisabled();
    },
    updateStudioInfo() {
      var url = this.constant.baseUrl + "/studio/update_studio_info";
      var jsonParam = JSON.stringify(this.studioInfo);
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
    updateStudioContactInfo() {
      var url = this.constant.baseUrl + "/studio/update_studio_contact_info";
      var jsonParam = JSON.stringify(this.studioContactInfo);
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
    getStudioIconText(studioName) {
      return studioName.substr(0,1);
    },
  },
  created() {
    this.getStudioInfo();
    this.getStudioContactInfo();
  },
};
</script>

<style>
.bg-purple {
  background: #ffffff;
}
.grid-content {
  min-height: 36px;
}
.iconAndName {
  margin-top: 30px;
}
.inputForm {
  width: 95%;
}
.icon{
  background-color: #409EFF;
}
</style>