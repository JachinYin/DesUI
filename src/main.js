// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './api/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api/icon/iconfont'

import IconSvg from "./components/comm/IconSvg"

// getCookie
import CommTool from "./api/comm/CommJs";

// 全局使用 Element
Vue.use(ElementUI);
// 全局注册图标
Vue.component('icon', IconSvg);


Vue.config.productionTip = false;

// 定义VUE全局变量
Vue.prototype.preUrl = "http://localhost:8088";
Vue.prototype.reg_Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

// 设置全局 ajax 属性
$.ajaxSetup({
  dataType: "json",
  // cache: false,
  headers: {
    "TOKEN": CommTool.getCookie("TOKEN")
  },
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  // complete: function(xhr) {
  //   //token过期，则跳转到登录页面
  //   if(xhr.responseJSON.code == 401){
  //     parent.location.href = baseURL + 'login.html';
  //   }
  // }
});


// router.beforeEach((to, from, next) => {
//   if (!to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//     if (CommTool.getCookie("TOKEN")) {  // 通过vuex state获取当前的token是否存在
//       next();
//     }
//     else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath,   // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         }
//       })
//     }
//   }
//   else {
//     next();
//   }
// });
