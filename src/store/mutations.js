import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_COMMENT,
    RECEIVE_SHOP_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CARTFOODS,
    RECEIVE_USER_COMMENT,
    RECEIVE_SEARCH_SHOPS
} from './mutations-type'

export default {
    [RECEIVE_ADDRESS](state,{address}) {
        state.address=address.name;
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys=categorys;
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops=shops;
    },
    [RECEIVE_USER_INFO](state,{userInfo}){
        state.userInfo=userInfo;
    },
    [RESET_USER_INFO](state){
        state.userInfo={};
    },
    [RECEIVE_SHOP_GOODS](state,{shopGoods}){
        state.shopGoods=shopGoods;
    },
    [RECEIVE_SHOP_COMMENT](state,{shopComments}){
        state.shopComments=shopComments
    },
    [RECEIVE_SHOP_INFO](state,{shopInfo}){
        state.shopInfo=shopInfo
    },
    [INCREMENT_FOOD_COUNT](state,{food}){
       if(!food.count){
        Vue.set(food,'count',1)
        state.cartFoods.push(food)
       }else{
           food.count++
       }
    },
    [DECREMENT_FOOD_COUNT](state,{food}){
        if(food.count>1)
        food.count--
        else{
            const index=state.cartFoods.indexOf(food)
            state.cartFoods.splice(index,1)
            food.count--
        }
    },
    [CLEAR_CARTFOODS](state){
        state.cartFoods.forEach(food => {
            food.count=0
        });
        state.cartFoods=[]
    },
    [RECEIVE_USER_COMMENT](state,{userComment}){
        state.userComment=userComment
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops=searchShops
    }
}