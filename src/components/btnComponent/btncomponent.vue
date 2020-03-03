<template>
      <button @click="logout">退出登录</button>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions(['clearUserInfo','getUserInfo']),
        logout: async function(){
            await this.clearUserInfo();
            await this.getUserInfo()
        }
    }
}
</script>

<style>
    
    button {
        display: block;
        background-color: red;
        width: 100%;
        height: 40px;
        color: white;
        border: 1px solid gray;

    }
</style>