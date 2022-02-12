export default {
    install(Vue, options) {
        Vue.prototype.constant = {
            baseUrl: 'http://localhost:8090',
        };
        Vue.prototype.checkToken = function () {
            if (!localStorage.getItem("token")) {
                alert("请先登陆");
                this.$router.push("/login");
            }
        };
        Vue.prototype.handleNotLogin = function (code) {
            if (code == 2) {
                this.$router.push("/login");
            }
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