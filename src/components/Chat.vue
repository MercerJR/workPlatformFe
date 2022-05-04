<template>
  <div>
    <el-row>
      <el-col :span="6">
        <!-- 消息列表 -->
        <div v-if="chatListShow">
          <el-table :data="chatList" style="width: 100%" @cell-click="select">
            <el-table-column label="消息列表">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="4">
                    <div class="block">
                      <el-avatar :size="45" class="icon">{{getIconText(scope.row.chatName)}}</el-avatar>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div style="font-size: 15px">
                      <span>{{ scope.row.chatName }}</span>
                    </div>
                    <el-tag
                      size="small"
                      :class="
                        scope.row.insideType == 1
                          ? 'insideTypeClass'
                          : 'outsideTypeClass'
                      "
                      >{{ scope.row.insideTag }}</el-tag
                    >
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="messageBox" v-show="isSelected">
          <!-- 消息框顶部名称 -->
          <div>
            <el-row>
              <el-col :span="1">
                <div class="block">
                  <el-avatar :size="40" class="icon">{{getIconText(selectedChat.chatName)}}</el-avatar>
                </div>
              </el-col>
              <el-col :span="23">
                <div style="font-size: 10px">
                  <span>{{ selectedChat.chatName }}</span>
                </div>
                <el-tag size="mini">{{ selectedChat.insideTag }}</el-tag>
              </el-col>
            </el-row>
          </div>
          <!-- 消息框 -->
          <div style="height: 600px; background-color: #f1f3f4">
            <el-scrollbar style="height: 100%" ref="toTheBottom">
              <!-- 消息列表 -->
              <div v-if="messageBoxShow">
                <div
                  v-for="(item, index) in msgRecordList"
                  :key="index"
                  class="message"
                >
                  <el-row>
                    <el-col :span="2">
                      <div>
                        <el-avatar :size="40" class="icon">
                          {{ getIconText(item.senderName) }}
                        </el-avatar>
                      </div>
                    </el-col>
                    <el-col :span="22">
                      <div>
                        <span
                          :class="
                            currentUser.userId == item.senderId
                              ? 'myselfName'
                              : 'otherName'
                          "
                          >{{ item.senderName }}</span
                        >
                        <span>{{ item.time }}</span>
                        <el-card shadow="hover">
                          <span>{{
                            item.targetType == 2
                              ? item.content.split("#")[0]
                              : item.content
                          }}</span>
                          <div
                            v-show="
                              item.targetType == 2 &&
                              item.content.split('#')[1] != null
                            "
                          >
                            <el-button
                              type="text"
                              @click="
                                openAnnouncementDialog(
                                  item.content.split('#')[1]
                                )
                              "
                              >消息推送</el-button
                            >
                          </div>
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-scrollbar>
          </div>

          <!-- 推文dialog -->
          <el-dialog
            title="推文详情"
            :visible.sync="dialogVisible"
            width="30%"
            height="60%"
          >
            <h2>{{ announcement.title }}</h2>
            <br />
            <span>推送者：{{ announcement.publisherName }}</span>
            <br />
            <span>
              {{ announcement.content }}
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false"
                >关闭</el-button
              >
            </span>
          </el-dialog>

          <!-- 消息输入框 -->
          <div style="margin-top: 25px" @keyup.enter="sendMessage">
            <el-input
              v-model="msgInput"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
            ></el-input>
          </div>
          <!-- 底部按钮 -->
          <div style="margin-top: 15px" @keyup.enter="sendMessage">
            <el-button type="success" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      input: "",
      input2: "",
      msgInput: "",
      ws: null,

      currentUser: {
        userId: 1,
      },
      chatList: [],
      selectedChat: {
        chatId: "",
        icon: "",
        chatName: "",
        insideTag: 0,
        insideTag: "",
        targetType: 0,
      },
      isSelected: false,
      msgRecordMap: {},
      msgRecordList: [],
      messageBoxShow: true,
      chatListShow: true,

      currentStudioId: 0,

      announcement: {},
      dialogVisible: false,
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.currentUser.userId = localStorage.getItem("userId");
    this.currentStudioId = this.getCurrentStudioId();
    this.msgRecordMap = new Map();
    this.initWebSocket();
    this.getChatList();
  },
  destroyed() {
    this.ws.close(); //离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsUrl = "ws://localhost:8090/chat";
      this.ws = new WebSocket(wsUrl);
      this.ws.onmessage = this.wsOnMessage;
      this.ws.onopen = this.wsOnOpen;
      this.ws.onerror = this.wsOnError;
      this.ws.onclose = this.wsOn;
    },
    wsOnOpen() {
      console.log("前端ws连接成功");
      this.wsSend(0, this.$root.token, 0, 0, 0);
    },
    wsOnError() {
      //连接建立失败重连
      console.log("链接失败");
      //   this.initWebSocket();
    },
    wsOnMessage(msg) {
      //数据接收
      console.log(msg.data);
      var msgObj = JSON.parse(msg.data);
      if (msgObj.code == 2) {
        this.$router.push("/login");
      }
      if (msgObj.code == 0) {
        //构建新消息对象
        var msgRecord = {
          senderId: msgObj.senderId,
          senderName: msgObj.senderName,
          icon: "",
          content: msgObj.content,
          time: msgObj.time,
        };
        //获取chatId  senderId和targetId中与本人userId不相同的那个id则为chatId
        var chatId =
          msgObj.senderId == this.currentUser.userId
            ? msgObj.targetId
            : msgObj.senderId;
        //将其聊天置顶
        this.chatGoTop(chatId);

        //对map进行操作，将聊天记录存入map中
        //key为 聊天类型+对方Id
        var key = msgObj.targetType + ":" + chatId;
        var msgRecordList = this.msgRecordMap.get(key);
        //如果消息列表本来就为空，就去后端获取消息记录，若不为空，则直接把新消息放入已有的消息记录列表中
        if (msgRecordList == null) {
          this.getMsgRecord(
            this.selectedChat.chatId,
            this.selectedChat.targetType
          ).then((res) => {
            msgRecordList = res;
          });
        } else {
          msgRecordList.push(msgRecord);
        }
        this.msgRecordMap.set(key, msgRecordList);
        this.msgRecordList = msgRecordList;
        //解决v-for不会实时更新的问题，让标签内容重新生成
        this.reloadMsgReocrd();
        this.scrollbarToTheBottom();

        console.log(msgRecord);
      }
    },
    wsSend(type, content, targetId, targetType, studioId) {
      //数据发送
      var msgObj = {
        type: type,
        content: content,
        targetId: targetId,
        targetType: targetType,
        studioId: studioId,
      };
      this.ws.send(JSON.stringify(msgObj));
    },
    wsOnClose(e) {
      //关闭
      console.log("断开连接", e);
    },

    select(row) {
      this.isSelected = true;
      this.selectedChat = row;
      this.getMsgRecord(
        this.selectedChat.chatId,
        this.selectedChat.targetType
      ).then((res) => {
        this.msgRecordList = res;
        this.scrollbarToTheBottom();
      });
      this.reloadMsgReocrd();
    },
    sendMessage() {
      this.wsSend(
        1,
        this.msgInput,
        this.selectedChat.chatId,
        this.selectedChat.targetType,
        this.currentStudioId
      );
      this.msgInput = "";
    },
    upload() {},
    getChatList() {
      var url =
        this.constant.baseUrl +
        "/chat_info/show_chat_list/" +
        this.currentStudioId;
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
            this.chatList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
    },
    getMapKey(targetType, chatId) {
      var key = targetType + ":" + chatId;
      console.log("key:" + key);
      return key;
    },
    updateChatList(chatTargetId, targetType) {
      var url = this.constant.baseUrl + "/chat_info/update_chat_list";
      var updateChatListReq = {
        chatId: chatTargetId,
        targetType: targetType,
      };
      var jsonParam = JSON.stringify(updateChatListReq);
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
          this.getChatList();
        });
    },
    chatGoTop(chatId) {
      for (var i = 0; i < this.chatList.length; i++) {
        //如果该聊天已经存在于消息列表中，则直接放入顶部
        if (this.chatList[i].chatId == chatId) {
          var item = this.chatList[i];
          this.chatList.splice(i, 1);
          this.chatList.unshift(item);

          this.chatListShow = false;
          this.chatListShow = true;

          return;
        }
      }
      //如果该聊天本来不存在，则直接重新获取聊天列表
      this.getChatList();
      this.reloadChatList();
    },
    async getMsgRecord(chatId, targetType) {
      var key = this.getMapKey(
        this.selectedChat.targetType,
        this.selectedChat.chatId
      );
      var msgRecordList = this.msgRecordMap.get(key);
      if (msgRecordList != null && msgRecordList.length != 0) {
        return msgRecordList;
      }
      var url =
        this.constant.baseUrl +
        "/chat_info/show_msg_record?target_id=" +
        chatId +
        "&target_type=" +
        targetType +
        "&studio_id=" +
        this.currentStudioId;
      var that = this;
      await this.$axios
        .get(url, {
          headers: {
            token: this.$root.token,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data);
            msgRecordList = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
      this.msgRecordMap.set(key, msgRecordList);
      return msgRecordList;
    },
    reloadMsgReocrd() {
      this.messageBoxShow = false;
      this.messageBoxShow = true;
    },
    reloadChatList() {
      this.chatListShow = false;
      this.chatListShow = true;
    },
    scrollbarToTheBottom() {
      let div = this.$refs["toTheBottom"].$refs["wrap"];
      this.$nextTick(() => {
        div.scrollTop = div.scrollHeight;
      });
    },
    openAnnouncementDialog(publisUserData) {
      var url =
        this.constant.baseUrl +
        "/announcement/show_one_announcement/" +
        publisUserData;
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
            this.announcement = res.data.data;
          } else {
            this.alertMessage(res);
            console.log(res.data);
            this.handleNotLogin(res.data.code);
          }
        });
      this.dialogVisible = true;
    },
  },
};
</script>


<style>
.messageBox {
  margin-left: 15px;
  margin-right: 10px;
}
.message {
  width: 50%;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.messageRight {
  float: right;
  width: 50%;
  margin-left: 15px;
  margin-top: 15px;
}
.myselfName {
  color: #67c23a;
}
.otherName {
  color: #409eff;
}
.right {
  float: right;
}
.left {
  float: left;
}
.insideTypeClass {
  color: #409eff;
}
.outsideTypeClass {
  color: #e6a23c;
}
.icon{
  background-color: #409EFF;
}
</style>