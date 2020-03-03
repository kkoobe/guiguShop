<template>
  <div>
    <router-view></router-view>
    <footerComponent v-show="$route.meta.loginShow"></footerComponent>
  </div>
</template>

<script>
import footerComponent from './components/footerComponent/footerComponent'
// import {reqCategorys} from './api/index'
import {mapActions} from 'vuex'
export default {
    components:{
        footerComponent,
    },
     mounted:function(){
      //  console.log(await reqCategorys())
      //  this.$store.dispatch('getAddress');
      // 执行拷贝过来的方法，相当于执行了mutations中的方法；
      this.getAddress();
      this.getCategorys();
      // this.$store.dispatch('getCategorys');
      this.getShops();
    },
    methods:{
      // 拷贝方法；
      ...mapActions(['getAddress','getCategorys','getShops'])
    }
} 
</script>

<style lang="stylus">

</style>