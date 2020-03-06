// 时state仓库的计算属性；
export default {
    countTotal(state){
        return state.cartFoods.reduce((countTotal,food,index)  =>{
            return countTotal+food.count
        },0)
    },
    priceTotal(state){
        return state.cartFoods.reduce((priceTotal,food,index)=>{
            return priceTotal+food.count*food.price
        },0)
    }   
}