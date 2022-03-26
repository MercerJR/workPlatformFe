<template>
  <div @keyup.enter="wsSend(1,input)">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-input v-model="input2" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: "Chat",

  data() {
    return {
      input: "",
      input2: "",
      ws:null,
    };
  },

  created() {
    this.checkToken();
    this.$root.token = localStorage.getItem("token");
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
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
      this.wsSend(0,this.$root.token);
    },
    wsOnError() {
      //连接建立失败重连
      console.log("链接失败")
    //   this.initWebSocket();
    },
    wsOnMessage(msg) {
      //数据接收
      console.log(msg.data);
      var resObj = JSON.parse(msg.data);
      if(resObj.code == 2){
        this.$router.push("/login");
      }
      if(resObj.code == 0){
        this.input2 = resObj.content;
      }
    },
    wsSend(type,content) {
      //数据发送
      var msgObj = {
        type: type,
        content:content,
      }
      this.ws.send(JSON.stringify(msgObj));
    },
    wsOnClose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
};
</script>

<style>
</style>