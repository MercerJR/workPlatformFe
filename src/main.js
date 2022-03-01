// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import constant from './lib/config/constant.js';

Vue.use(ElementUI);
Vue.prototype.$http = axios //修改内部的$http为axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(constant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      currentStudioBaseInfo: {
        studioIcon: "https://tse1-mm.cn.bing.net/th/id/OIP-C.fYOke7YIMR5vNvMZfCev8gHaEo?pid=ImgDet&rs=1",
        studioId: 0,
        studioName: "",
        studioAbbreviation: "",
        role: "",
        departmentName: "",
      },
      token:"",
    }
  }
})
