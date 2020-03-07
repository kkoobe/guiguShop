import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_SHOP_COMMENT,
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CARTFOODS,
    RECEIVE_USER_COMMENT
} from './mutations-type'
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopGoods,
    reqUserComment
} from '../api/index'

export default {
    // 异步获取地址
    async getAddress({commit,state}){
        // 发送请求
        const {latitude,longitude}=state;
        const result=await reqAddress({latitude,longitude});
        if(result.code==0)
         commit(RECEIVE_ADDRESS,{address:result.data});
         else{
             console.log('获取数据失败！');
         } 
    },

    async getCategorys({commit}){
        //发送请求异步请求
        const result =await reqCategorys();
        // 调用mutations方法；
        if(result.code==0)
        commit(RECEIVE_CATEGORYS,{categorys:result.data});
        else{
            console.log('获取数据失败！');
        } 
    },
    async getShops({commit,state}){
        const latitude=state.latitude;
        const longitude=state.longitude;
        const result=await reqShops({latitude,longitude});
        if(result.code==0)
        commit(RECEIVE_SHOPS,{shops:result.data});
        else{
            console.log('获取数据失败！');
        }
    },
    setUserInfo({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        
        const userInfo=result.data || {};
        commit(RECEIVE_USER_INFO,{userInfo})
    },
    async clearUserInfo({commit}){
        const result=await reqLogout();
        if(result==0){
            commit(RESET_USER_INFO);
        }

    },
    async getShopGoods({commit}){
        const result =await  reqShopGoods();
        const shopGoods=result.data;
        if(result.code===0){
            commit(RECEIVE_SHOP_GOODS,{shopGoods})
        }
    },
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        // console.log(result);
        const shopInfo=result.data;
        if(result.code===0){
            console.log(1);
            commit(RECEIVE_SHOP_INFO,{shopInfo})
        }
    },
    async getShopComment({commit}){
        const result = await reqShopComment()
        const shopComments=result.data;
        if(result.code===0){
            commit(RECEIVE_SHOP_COMMENT,{shopComments})
        }
    },
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd)
       commit(INCREMENT_FOOD_COUNT,{food})
       else{
        commit(DECREMENT_FOOD_COUNT,{food})
       }
    },
    clearCartFoods({commit}){
        commit(CLEAR_CARTFOODS)
    },
    async getUserComment({commit}){
        const result=await reqUserComment()
        if(result.code===0){
            console.log(result)
            const data=result.data;
        commit(RECEIVE_USER_COMMENT,{userComment:data})
        }
    }

}