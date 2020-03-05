// 引入mock，实现对指定请求路径的拦截，并发送对应路由的模板随机数据；
// 只会拦截ajax请求；
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/goods',{code:0,data:data.goods});
Mock.mock('/comment',{code:0,data:data.comment});
Mock.mock('/info',{code:0,data:data.info});