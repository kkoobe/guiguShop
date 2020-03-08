// js入口函数

import Vue from 'vue';
import app from './App';
import router from './router/index'
import store from './store/index'
// 引入过滤器
import './filters/index'
// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: '../dist/img/logo.png',
  })
// 引入mock拦截器：
import './mock/mockServer'
new Vue({
    el:'#app',
    render:function(createElement){
        return createElement(app);
    },
    router:router,
    store:store
})