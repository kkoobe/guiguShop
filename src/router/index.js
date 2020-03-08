import Vue from 'vue';
import vueRouter from 'vue-router';

// import mainComponent from '../pages/mainComponent/mainComponent'
// import orderComponent from '../pages/orderComponent/orderComponent'
// import personComponent from '../pages/personComponent/personComponent'
// import searchComponent from '../pages/searchComponent/searchComponent'
// import loginComponent from '../pages/loginComponent/loginComponent'

// 文件在进行打包时，会将我们写的所有的js代码打包成一个文件，在使用时，我们会将所有
// 的js一起请求过来，导致第一次请求事件过长；

// 路由懒加载：在进行文件打包时，会将以下形式的组件的js单独打包成一个文件；在使用时
// 只有对某个跳转到某个路由时再次向后台发起请求，请求该路由的js代码；

const mainComponent= ()=>import('../pages/mainComponent/mainComponent')
const orderComponent= ()=>import('../pages/orderComponent/orderComponent')
const personComponent= ()=>import('../pages/personComponent/personComponent')
const searchComponent= ()=>import('../pages/searchComponent/searchComponent')
const loginComponent= ()=>import('../pages/loginComponent/loginComponent')

import shopComponent from '../pages/shopComponent/shopComponent'
import shopCommentComponent from '../pages/shopComponent/shopComment/shopCommentComponent'
import shopGoodsComponent from '../pages/shopComponent/shopGoods/shopGoodsComponent'
import shopInfoComponent from '../pages/shopComponent/shopInfo/shopInfoComponent'



Vue.use(vueRouter);

export default new vueRouter({
    routes:[
        {path:'/',redirect:'/main',meta:{loginShow:true}},
        {path:'/main',component:mainComponent,meta:{loginShow:true}},
        {path:'/order',component:orderComponent,meta:{loginShow:true}},
        {path:'/person',component:personComponent,meta:{loginShow:true}},
        {path:'/search',component:searchComponent,meta:{loginShow:true}},
        {path:'/login',component:loginComponent},
        {path:'/shop',component:shopComponent,children:[
            {path:'/shop/goods',component:shopGoodsComponent},
            {path:'/shop/comment',component:shopCommentComponent},
            {path:'/shop/info',component:shopInfoComponent},
            {path:'/shop/',redirect:'/shop/goods'}
        ]}
    ]
})