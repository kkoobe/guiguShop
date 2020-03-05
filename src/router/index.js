import Vue from 'vue';
import vueRouter from 'vue-router';
import mainComponent from '../pages/mainComponent/mainComponent'
import orderComponent from '../pages/orderComponent/orderComponent'
import personComponent from '../pages/personComponent/personComponent'
import searchComponent from '../pages/searchComponent/searchComponent'
import loginComponent from '../pages/loginComponent/loginComponent'
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