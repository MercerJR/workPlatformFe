export default {
    install(Vue, options) {
        Vue.prototype.constant =  {
            baseUrl: 'http://localhost:8090',
        };
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