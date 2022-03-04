<template>
  <div>
    <el-card class="box-card">
      <div style="margin-bottom: 15px">
        <el-row>
          <el-col :span="3">
            <h4 style="margin-top: 0px; margin-bottom: 0px">
              轻松上手管理后台
            </h4>
          </el-col>
          <el-col :span="4">
            <span style="font-size: 10px">4步带你快速管理工作室</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="6">
          <el-button class="guideButton" plain>
            <el-row>
              <el-col :span="4">
                <div class="guideButtonIcon">
                  <i class="el-icon-circle-check"></i>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="guideButtonText">
                  <h3 style="margin-top: 0px">完善工作室信息</h3>
                  <span>让大家更了解工作室</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="guideButtonIcon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-col>
            </el-row>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="guideButton" plain>
            <el-row>
              <el-col :span="4">
                <div class="guideButtonIcon">
                  <i class="el-icon-circle-check"></i>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="guideButtonText">
                  <h3 style="margin-top: 0px">完善组织架构</h3>
                  <span>导入或邀请成员</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="guideButtonIcon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-col>
            </el-row>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="guideButton" plain>
            <el-row>
              <el-col :span="4">
                <div class="guideButtonIcon">
                  <i class="el-icon-circle-check"></i>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="guideButtonText">
                  <h3 style="margin-top: 0px">分配管理员权限</h3>
                  <span>与同伴协同管理工作室</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="guideButtonIcon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-col>
            </el-row>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button class="guideButton" plain>
            <el-row>
              <el-col :span="4">
                <div class="guideButtonIcon">
                  <i class="el-icon-circle-check"></i>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="guideButtonText">
                  <h3 style="margin-top: 0px">享受办公时刻</h3>
                  <span>轻量及高效的办公</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="guideButtonIcon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-col>
            </el-row>
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider></el-divider>
    <el-row>
      <!-- 工作室信息及成员信息模块 -->
      <el-col :span="12">
        <el-card class="box-card">
          <div class="text item">
            <el-row>
              <el-col :span="4">
                <div class="block">
                  <el-avatar
                    shape="square"
                    :size="70"
                    :src="this.$root.currentStudioBaseInfo.studioIcon"
                  ></el-avatar>
                </div>
              </el-col>
              <el-col :span="20">
                <h4 style="margin-top: 0px; margin-bottom: 10px">
                  {{
                    this.$root.currentStudioBaseInfo.studioName +
                    "(" +
                    this.$root.currentStudioBaseInfo.studioAbbreviation +
                    ")"
                  }}
                </h4>
                <el-tag effect="dark" style="margin-right: 5px">{{
                  this.$root.currentStudioBaseInfo.role
                }}</el-tag>
                <el-tag type="success" effect="plain">
                  {{ this.$root.currentStudioBaseInfo.departmentName }}
                </el-tag>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <!-- 工作室成员信息 -->
            <el-row>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >组织总人数<br />
                  <h1>{{ studioPeopleInfo.studioMemberNumber }}</h1></el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >未激活人数<br />
                  <h1>{{ studioPeopleInfo.notActivatedNumber }}</h1></el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >部门数<br />
                  <h1>{{ studioPeopleInfo.departmentNumber }}</h1></el-button
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >超级管理员<br />
                  <h1>{{ studioPeopleInfo.superAdminNumber }}</h1></el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >子管理员<br />
                  <h1>{{ studioPeopleInfo.adminNumber }}</h1></el-button
                >
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span="8">
                <el-button class="functionButton"
                  ><i
                    class="el-icon-s-custom"
                    style="color: #1e90ff; margin-right: 5px"
                  ></i
                  >添加成员</el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button class="functionButton"
                  ><i
                    class="el-icon-message"
                    style="color: #1e90ff; margin-right: 5px"
                  ></i
                  >邀请成员</el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button class="functionButton"
                  ><i
                    class="el-icon-unlock"
                    style="color: #90ee90; margin-right: 5px"
                  ></i
                  >管理员权限</el-button
                >
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!-- 横幅和功能使用情况模块 -->
      <el-col :span="12">
        <div>
          <el-carousel
            indicator-position="outside"
            height="150px"
            style="margin-left: 15px"
          >
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-card class="box-card" style="margin-left: 15px">
          <div class="text item">
            <h3 style="margin-top: 0px">使用情况</h3>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >昨日活跃人数<br />
                  <h1>8</h1></el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button plain class="peopleButton"
                  >昨日活跃率<br />
                  <h1>32%</h1></el-button
                >
              </el-col>
            </el-row>
            <div style="margin-left: 15px">
              <el-row>
                <el-col :span="8">
                  <div>
                    <i
                      class="el-icon-data-analysis"
                      style="margin-right: 10px; color: #1e90ff"
                    ></i
                    >总量：237
                  </div>
                </el-col>
                <el-col :span="8">
                  <div>
                    <i
                      class="el-icon-chat-line-round"
                      style="margin-right: 10px; color: #b0c4de"
                    ></i
                    >消息：237
                  </div>
                </el-col>
                <el-col :span="8">
                  <div>
                    <i
                      class="el-icon-takeaway-box"
                      style="margin-right: 10px; color: #ffb6c1"
                    ></i
                    >辅助功能：237
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BackHomeContent",
  data() {
    return {
      studioPeopleInfo: {
        studioMemberNumber: 0,
        notActivatedNumber: 0,
        departmentNumber: 0,
        superAdminNumber: 0,
        adminNumber: 0,
      },
    };
  },
  methods: {
    getPageInfo(){
      var currentStudioId = localStorage.getItem("currentStudioId");
      this.getStudioPeopleInfo(currentStudioId);
    },
    getStudioPeopleInfo(studioId) {
      var url =
        this.constant.baseUrl +
        "/studio/show_people_info/" + studioId;
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
            this.studioPeopleInfo = res.data.data;
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
    this.token = localStorage.getItem("token");
    console.log(this.$root.currentStudioBaseInfo);
    this.getPageInfo();
  },
};
</script>

<style>
.text {
  font-size: 18px;
}
.peopleButton {
  width: 90%;
  text-align: left;
  border-width: 0px;
}
.functionButton {
  width: 80%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item {
  padding: 18px 0;
}
.guideButton {
  width: 95%;
  background-color: #eff0f1;
}
.guideButtonIcon {
  font-size: 25px;
  text-align: center;
  margin: 10px 5px 10px 5px;
  color: #67c23a;
}
.guideButtonText {
  text-align: left;
}
</style>