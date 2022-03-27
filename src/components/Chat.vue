<template>
  <div @keyup.enter="wsSend(1, input, 2, 0, 1)">
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-input v-model="input2" placeholder="请输入内容"></el-input> -->

    <el-row>
      <el-col :span="6">
        <!-- 消息列表 -->
        <el-table :data="chatList" style="width: 100%" @cell-click="select">
          <el-table-column label="消息列表">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="4">
                  <div class="block">
                    <el-avatar :size="45" :src="scope.row.icon"></el-avatar>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div style="font-size: 15px">
                    <span>{{ scope.row.chatName }}</span>
                  </div>
                  <el-tag size="small">{{ scope.row.insideTag }}</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18">
        <div class="messageBox" v-show="isSelected">
          <!-- 消息框顶部名称 -->
          <div>
            <el-row>
              <el-col :span="1">
                <div class="block">
                  <el-avatar :size="40" :src="selectedChat.icon"></el-avatar>
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
            <el-scrollbar style="height: 100%">
              <!-- 消息列表 -->
              <div v-if="messageBoxShow">
                <div
                  v-for="(item, index) in msgRecordMap.get(
                    getMapKey(selectedChat.targetType, selectedChat.chatId)
                  )"
                  :key="index"
                  class="message"
                >
                  <el-row>
                    <el-col :span="2">
                      <div>
                        <el-avatar :size="40" :src="item.icon"></el-avatar>
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
                        <el-card shadow="hover">{{ item.content }}</el-card>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <!-- 消息输入框 -->
          <div style="margin-top: 25px" @keyup.enter="sendMessage">
            <el-input
              v-model="msgInput"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
            ></el-input>
          </div>
          <!-- 底部按钮 -->
          <div style="margin-top: 15px">
            <el-button type="primary" @click="sendMessage">发送</el-button>
            <el-button type="success" @click="upload">上传</el-button>
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
      chatList: [
        // {
        //   chatId: 2,
        //   icon: "",
        //   chatName: "菲利克斯",
        //   insideType: 0,
        //   insideTag: "外部用户",
        //   targetType: 0,
        // },
      ],
      selectedChat: {
        chatId: "",
        icon: "",
        chatName: "",
        insideTag: 0,
        insideTag: "",
        targetType: 0,
      },
      isSelected: false,
      chatRecordList: [
        // {
        //   senderId: 1,
        //   senderName: "托雷斯",
        //   icon: "",
        //   content: "你好小老弟",
        // },
        // {
        //   senderId: 2,
        //   senderName: "菲利克斯",
        //   icon: "",
        //   content:
        //     "你好大哥哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        // },
      ],
      msgRecordMap: {},
      messageBoxShow:true,
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.currentUser.userId = localStorage.getItem("userId");
    this.getChatList();

    this.initWebSocket();
    this.msgRecordMap = new Map();
  },
  destroyed() {
    this.ws.close(); //离开路由之后断开websocket连接
  },

  methods: {
    testMap() {
      var msgRecord1 = {
        senderId: 1,
        senderName: "托雷斯",
        icon: "",
        content: "ahhahahahahaha",
        time: "sssss",
      };
      var msgRecord2 = {
        senderId: 2,
        senderName: "菲利克斯",
        icon: "",
        content: "ahhahahahahaha",
        time: "sssss",
      };
      var msgList = [msgRecord1, msgRecord2];
      this.msgRecordMap.set("0:2", msgList);
      console.log(this.msgRecordMap);
    },
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
        //对map进行操作
        var key = msgObj.targetType + ":" + this.selectedChat.chatId;
        var msgRecordList = this.msgRecordMap.get(key);
        if (msgRecordList == null) {
          msgRecordList = [msgRecord];
        } else {
          msgRecordList.push(msgRecord);
        }
        this.msgRecordMap.set(key, msgRecordList);
        this.messageBoxShow = false;
        this.messageBoxShow = true;
        console.log(this.msgRecordMap.get(key));
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
    },
    sendMessage() {
      var studioId =
        this.selectedChat.insideType == 1
          ? localStorage.getItem("currentStudioId")
          : 0;
      this.wsSend(
        1,
        this.msgInput,
        this.selectedChat.chatId,
        this.selectedChat.targetType,
        studioId
      );
    },
    upload() {},
    getChatList() {
      var studioId = localStorage.getItem("currentStudioId");
      var url = this.constant.baseUrl + "/chat_info/show_chat_list/" + studioId;
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
    getMapKey(targetType, senderId) {
      var key = targetType + ":" + senderId;
      console.log("key:" + key);
      return key;
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
  color: #409eff;
}
.otherName {
}
.right {
  float: right;
}
.left {
  float: left;
}
</style>