import ajax from './ajax';
const pathHeader='/api';
// const pathHeader="http://localhost:4000"
// 封装从后台获取数据的函数接口；
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = ({latitude,longitude})=>ajax(pathHeader+'/position/'+latitude+','+longitude)
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys= ()=> ajax(pathHeader+'/index_category');
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops= ({latitude,longitude})=>ajax(pathHeader+'/shops','get',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqShopsWithKey= ({geohash,keyword}) => ajax(pathHeader+'/search_shops','get',{geohash,keyword})
// [5、获取一次性验证码](#5获取一次性验证码)<br/>
export const reqCaptcha = ()=>ajax(pathHeader+'/captcha')
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin =({name,pwd,captcha}) => ajax(pathHeader+'/login_pwd','post',{name,pwd,captcha})
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode=(phone) => ajax(pathHeader+'/sendcode','get',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = ({phone,code}) => ajax(pathHeader+'/login_sms','post',{phone,code})
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(pathHeader+'/userinfo')
// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => ajax(pathHeader+'/logout')

