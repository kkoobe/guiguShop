import Vue from 'vue';
import vueRouter from 'vue-router';
import mainComponent from '../pages/mainComponent/mainComponent'
import orderComponent from '../pages/orderComponent/orderComponent'
import personComponent from '../pages/personComponent/personComponent'
import searchComponent from '../pages/searchComponent/searchComponent'
import loginComponent from '../pages/loginComponent/loginComponent'
Vue.use(vueRouter);

export default new vueRouter({
    routes:[
        {path:'/',redirect:'/main',meta:{loginShow:true}},
        {path:'/main',component:mainComponent,meta:{loginShow:true}},
        {path:'/order',component:orderComponent,meta:{loginShow:true}},
        {path:'/person',component:personComponent,meta:{loginShow:true}},
        {path:'/search',component:searchComponent,meta:{loginShow:true}},
        {path:'/login',component:loginComponent}
    ]
})