<template>
<section class="loginContainer">
    <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
    </a>
    <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" :class="{'get_verification':true,'right_Phone':rightPhone}" @click.prevent="sendMassage">
                  {{time?`已发送(${time})`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码"  v-if="!showPwd" v-model="password">
                   <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="password" >
                  <div :class="{'switch_button':true,'on':showPwd,'off':!showPwd}" @click="(showPwd=!showPwd)">
                    <div :class="{'switch_circle':true,'right':showPwd,'showPwd':showPwd}"></div>
                    <span class="switch_text">{{msg}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        
    </div>
<alertComponent :alertText="alertText" v-show="isShowAlert" @closeTip="isShowAlert=false"></alertComponent>
</section>
</template>

<script>
// 引入接口函数
import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api/index'
import alertComponent  from "../../components/alertComponent/alertComponent";
export default {
  data :function() {
    return {
      loginWay:true, //true表示短信登陆，false表示密码登录；
      phone:'',
      time:0,
      intervalId:'',
      phone:'',
      code:'', //短信验证码
      name:'',//用户名
      password:'',
      captcha: '', //图形验证码
      showPwd:false,
      alertText:'', //弹框信息
      isShowAlert:false //是否显示弹框
    }
  },
  methods:{
    sendMassage:function(){
      // 前台验证
      if(!this.intervalId){
      this.time=60;
      this.intervalId=setInterval(() => {
        this.time--
        if(this.time<=0){
          clearInterval(this.id);
        }
      }, 1000);
      }
      // 发送短信
      const result=reqSendCode(this.phone);
      if(result.code===1){
        this.showAlert(result.msg);
      }
    },
    login:function(){
      if(this.loginWay){ //短信登陆
        const {rightPhone,phone,code}=this;
        if(!rightPhone){
          //输出手机号不正确
          this.showAlert('手机号输入错误！')
        }else if(!/^\d{6}$/.test(code)) {
          //短信验证码输入错误！请输入6位短信验证码
          this.showAlert('短信验证码输入错误！请输入6位短信验证码！')
        }

      }else{
        const {name,password,captcha}=this;
        if(!name){
          //请输入用户名
         this.showAlert('请输入用户名!');
        }else if(!password){
          //请输入密码！
          this.showAlert('请输入密码！')
        }else if(!/[0-9a-zA-Z]{4}/.test(captcha)){
          //请输入四位验证码：
         this.showAlert('请输入四位验证码!')
        }
      }
    },
    showAlert:function(alertText){
      this.alertText=alertText
          this.isShowAlert=true
    },
    getCaptcha:function(event){
      event.target.src="http://localhost:4000/captcha?time"+Date.now();
    }
  },
  computed:{
    rightPhone:function(){
      return /^1\d{10}$/.test(this.phone)
    },
    msg:function(){
      
      if(this.showPwd){
      return "abc"
      }else{
      return '...'
      }
    }
  },
  components:{
    alertComponent,
  }
}
</script>

<style lang="stylus">
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_Phone
                    color:black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    &.showPwd
                      transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>