<template> 
  <div>
    <div class="goods"> 
      <div class="menu-wrapper" ref="menuWrapper"> 
        <ul>
          <li class="menu-item" v-for="(good,index) in shopGoods" :key="index" :class="{'current':(index==currentIndex)}" @click="clickMenuItem(index)"> 
            <span class="text bottom-border-1px"> 
              <img class="icon" :src="good.icon" v-if="good.icon">{{good.name}}
            </span>
          </li> 
        </ul> 
      </div> 
      <div class="foods-wrapper" ref="foodsWrapper" v-if="shopGoods.length!=0"> 
        <ul ref="ulObj">
          <li class="food-list-hook" v-for="(good,index) in shopGoods" :key="index" > 
            <h1 class="title">{{good.name}}</h1> 
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"> 
                <div class="icon"> <img width="57" height="57" :src="food.icon" @click="showFood(food)"> 
                </div> 
                <div class="content"> 
                  <h2 class="name">{{food.name}}</h2> 
                  <p class="desc">{{food.description}}</p> 
                  <div class="extra"> 
                    <span class="count">月售{{food.sellCount}}份</span> 
                    <span>好评率{{food.rating}}</span>
                  </div> 
                  <div class="price">
                    <span class="now">￥{{food.price}}</span> 
                    <span class="old" v-if="food.oldPrice!=''">￥{{food.oldPrice}}</span> 
                  </div> 
                  <div class="cartcontrol-wrapper"><cartControl :food="food"></cartControl></div> 
                  </div> 
              </li>
            </ul> 
          </li> 
        </ul> 
      </div> 
    </div>
    <food :food="copyFood" v-show="showFoodImg" @func="hiddenFoodImg"></food>
    <shopCart></shopCart>
  </div> 
</template>

<script>
import {mapState,mapActions} from 'vuex' 
import cartControl from '../../../components/cartControlComponent/cartControlComponent'
import food from '../../../components/foodComponent/foodComponent'
import shopCart from '../../../components/shopCartComponent/shopCartComponent'
import BScroll from 'better-scroll'
export default {
  data:function(){
    return {
      scrollY:0, //记录右侧滑动页面与顶点的距离
      tops:[], //记录每个分类的高度
      copyFood:{},
      showFoodImg:false
    }
  },
  methods:{
    ...mapActions(['getShopGoods']),
    // 初始化所有滚动组件
    _initScroll:function(){
      let menuScroll=new BScroll('.menu-wrapper',{
        //配置滑动组件，为组件中的预算派发click事件；
        click:true
      });
      this.foodScroll=new BScroll('.foods-wrapper',{
        probeType:2,
        click:true
      });
      // 为右侧滑动注册滑动事件；
      this.foodScroll.on('scroll',(event)=>{
        // console.log(event.x,event.y)
        // 得到当前滑动的位置；
        this.scrollY=Math.abs(event.y);
        // console.log(this.scrollY)
      })
      // 为右侧滑动组件注册滑动停止事件；
      this.foodScroll.on('scrollEnd',({x,y})=>{
        // console.log(event.x,event.y)
        // 得到当前滑动的位置；
        // console.log(y);
        this.scrollY=Math.abs(y);
      })
    },
    // 初始化tops的值；
    _initTops:function(){
      let top=0;
      let tops=[];
      tops.push(top);
      const liList=this.$refs.ulObj.getElementsByClassName('food-list-hook');
      Array.from(liList).forEach((value)=>{
        top+=value.clientHeight;
        tops.push(top);
      })
      this.tops=tops;
      // console.log(this.tops);
    },
    // 为左侧分类注册点击事件，出发右侧滚动；
    clickMenuItem:function(index){
      let scrollY=this.tops[index];
      // this.scrollY=scrollY;
      this.foodScroll.scrollTo(0,-scrollY,300);
    },
    showFood:function(food){
      this.copyFood=food
      this.showFoodImg=true
    },
    hiddenFoodImg:function(){
      this.showFoodImg=false
    }
  },
  computed:{
    ...mapState(['shopGoods']),
    currentIndex(){
      let {tops,scrollY}=this
      return tops.findIndex((top,index)=>{
        return scrollY>=top&&scrollY<tops[index+1]
      })
      // console.log(this.scrollY); 
    }
  },
  mounted(){
    // console.log(this.shopGoods)
    if(this.shopGoods.length!=0){
      this.$nextTick(()=>{
          this._initTops();
          this._initScroll();
          
        })
    }
    if(this.shopGoods.length==0){
    this.getShopGoods()
      }
  },
  watch:{
    shopGoods(){
      this.$nextTick(()=>{
        this._initTops();
        this._initScroll();
        
      })
    }
  },
  components:{
    cartControl,food,shopCart
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
@import "../../../common/stylus/mixins.styl" 
  .goods 
    display: flex 
    position: absolute 
    top: 195px 
    bottom: 46px 
    width: 100% 
    background: #fff; 
    overflow: hidden 
    .menu-wrapper 
      flex: 0 0 80px 
      width: 80px 
      background: #f3f5f7 
      .menu-item 
        display: table 
        height: 54px 
        width: 56px 
        padding: 0 12px 
        line-height: 14px 
        &.current 
          position: relative 
          z-index: 10 
          margin-top: -1px 
          background: #fff 
          color: $green
          font-weight: 700 
          .text 
            border-none() 
        .icon 
          display: inline-block 
          vertical-align: top 
          width: 12px 
          height: 12px 
          margin-right: 2px 
          background-size: 12px 12px 
          background-repeat: no-repeat 
        .text 
          display: table-cell 
          width: 56px 
          vertical-align: middle 
          bottom-border-1px(rgba(7, 17, 27, 0.1)) 
          font-size: 12px 
    .foods-wrapper 
      flex: 1 
      .title 
        padding-left: 14px 
        height: 26px 
        line-height: 26px 
        border-left: 2px 
        solid #d9dde1 
        font-size: 12px 
        color: rgb(147, 153, 159) 
        background: #f3f5f7 
      .food-item 
        display: flex 
        margin: 18px 
        padding-bottom: 18px 
        bottom-border-1px(rgba(7, 17, 27, 0.1)) 
        &:last-child 
          border-none() 
          margin-bottom: 0 
        .icon 
          flex: 0 0 57px 
          margin-right: 10px 
        .content 
          flex: 1 
          .name 
            margin: 2px 0 8px 0
            height: 14px 
            line-height: 14px 
            font-size: 14px 
            color: rgb(7, 17, 27) 
          .desc, .extra 
            line-height: 10px 
            font-size: 10px 
            color: rgb(147, 153, 159) 
          .desc 
            line-height: 12px 
            margin-bottom: 8px 
          .extra 
            .count 
              margin-right: 12px 
          .price 
            font-weight: 700 
            line-height: 24px 
            .now
              margin-right: 8px 
              font-size: 14px 
              color: rgb(240, 20, 20) 
            .old
              text-decoration: line-through 
              font-size: 10px 
              color: rgb(147, 153, 159) 
          .cartcontrol-wrapper 
            position: absolute 
            right: 0 
            bottom: 12px 
</style>