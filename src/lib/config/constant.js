export default {
    install(Vue, options) {
        Vue.prototype.constant = {
            baseUrl: 'http://localhost:8090',
        };
        Vue.prototype.checkToken = function () {
            if (!localStorage.getItem("token")) {
                this.$message({
                    type: "error",
                    message: "请先登陆",
                });
                this.$router.push("/login");
            }
        };
        Vue.prototype.handleNotLogin = function (code) {
            if (code == 2) {
                this.$router.push("/login");
            }
        };
        Vue.prototype.alertMessage = function (res) {
            this.$message({
                type: res.data.code == 0 ? "success" : "error",
                message: res.data.message,
            });
        }

        Vue.prototype.shiftStudio = function (studioId) {
            this.getStudioBaseInfo(studioId);
            console.log(this.$root.currentStudioBaseInfo);
            //在后台记录正在使用的工作室
            this.recordCurrentStudio();
            //在localStorage中存储存储studioId
            localStorage.setItem("currentStudioId", studioId);
            //切换后刷新页面
            location.reload();
        }
        Vue.prototype.getStudioBaseInfo = function (studioId) {
            var url = this.constant.baseUrl + "/studio/show_studio_base_info/" + studioId;
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
                        this.$root.currentStudioBaseInfo = res.data.data;
                        //给头像赋默认值
                        this.$root.currentStudioBaseInfo.studioIcon =
                            "https://tse1-mm.cn.bing.net/th/id/OIP-C.fYOke7YIMR5vNvMZfCev8gHaEo?pid=ImgDet&rs=1";
                        console.log(this.$root.currentStudioBaseInfo);
                    } else {
                        this.alertMessage(res);
                        console.log(res.data);
                        this.handleNotLogin(res.data.code);
                    }
                });
        }
        Vue.prototype.recordCurrentStudio = function () {
            var url = this.constant.baseUrl + "/studio/record_current";
            var jsonParam = JSON.stringify(this.$root.currentStudioBaseInfo.studioId);
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
        }
        Vue.prototype.doChat = function (chatId,targetType) {
            console.log("come on" + chatId + "," + targetType);
            var url = this.constant.baseUrl + "/chat_info/update_chat_list";
            var updateChatListObject = {
                chatId: chatId,
                targetType: targetType,
            };
            var jsonParam = JSON.stringify(updateChatListObject);
            this.$axios
                .post(url, jsonParam, {
                    headers: {
                        token: this.$root.token,
                        "content-type": "application/json",
                    },
                })
                .then((res) => {
                    this.handleNotLogin(res.data.code);
                });
            this.$router.push("/home/chat");
        }
    }
}  