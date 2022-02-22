export default {
    install(Vue, options) {
        Vue.prototype.constant = {
            baseUrl: 'http://localhost:8090',
        };
        Vue.prototype.checkToken = function () {
            if (!localStorage.getItem("token")) {
                this.$message({
                    type: "error",
                    message: res.data.message,
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


        // Vue.prototype.getTitle = {
        //     title: '',
        //     isBack: true,
        //     isAdd: false,
        // };
        // Vue.prototype.showFootTab = {
        //     isShow: false,
        //     active: 0,
        // }
    }
}  