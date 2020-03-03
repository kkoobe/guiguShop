// js入口函数

import Vue from 'vue';
import app from './App';
import router from './router/index'
import store from './store/index'
new Vue({
    el:'#app',
    render:function(createElement){
        return createElement(app);
    },
    router:router,
    store:store
})