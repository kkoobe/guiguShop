import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS
} from './mutations-type'
import {
    reqAddress,
    reqCategorys,
    reqShops
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

    }

}