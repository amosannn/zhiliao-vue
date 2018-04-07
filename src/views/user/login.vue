<template>
  <div class="Login-Body">
    <div class="login-container">
      <div class="login-header">
        <span class="login-logo">登录知了</span><br/>
        <span class="login-slogen">发现更大的世界</span>
      </div>

      <!--<mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">-->
        <!--<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />-->
      <!--</mu-appbar>-->
      <div class="input-class">
        <mu-paper v-bind:class="['demo-paper-two',{'demo-paper-one': UserIcon}]" circle :zDepth="3">
          <mu-avatar v-if="this.$route.path === '/loginpassword'" v-bind:class="[{'Login-Button-Two': UserIcon}]" :src="User_Datas.icon + User_Datas.id" />
          <mu-avatar v-else v-bind:class="[{'Login-Button-Two': UserIcon}]" src="https://pic2.zhimg.com/v2-ce82a5127be6ec8c52fb4baa47f296bf_xl.jpg" />
        </mu-paper>
        <mu-sub-header v-show="Welcome" style="color:#ff5252">{{Welcome}}</mu-sub-header>
        <mu-sub-header style="color:#fff">{{Welcome_Bottom}}</mu-sub-header>
        <mu-text-field v-show="showPhoneLogin" style="text-align: left" hintText="请输入手机号码" iconClass="Phone-Input" v-model="PhoneNumber"  type="number" icon="phone_iphone" fullWidth/>
        <mu-text-field v-show="showEmailLogin" style="text-align: left" hintText="请输入邮箱" iconClass="Phone-Input" v-model="email" icon="email" fullWidth/>
        <mu-text-field v-show="showUsernameLogin" style="text-align: left" hintText="请输入用户名" v-model="username" icon="person" fullWidth/>
        <mu-text-field style="text-align: left" hintText="请输入密码" v-model="password" type="password" icon="lock_outline" fullWidth/>

        <mu-raised-button @click="login()" label="登 录" backgroundColor="#2196F3" fullWidth/>
        <span style="float: left; color: #9E9E9E; padding: .2rem 0 0 .2rem" @click="usernameLogin">用户名登录</span>
        <span style="float: left; color: #9E9E9E; padding: .2rem 0 0 .2rem">|</span>
        <span style="float: left; color: #9E9E9E; padding: .2rem 0 0 .2rem" @click="phoneLogin">手机登录</span>
        <router-link style="float: right; color: #9E9E9E; padding: .2rem .2rem 0 0" to="/register">注册</router-link>
      </div>
      <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
	export default {
		name: "login",
    data () {
      return {
        PhoneNumber: '',
        email: '',
        username: '',
        password: '',
        UserIcon: true,
        showAlert: false,
        showPhoneLogin: false,
        showEmailLogin: true,
        showUsernameLogin: false,
        alertText: '请输入正确手机号(demo输入11位即可)',
        // Title_Data: '',
        Welcome: '',
        Welcome_Bottom: '',
        User_Datas: {},
      }
    },
    created(){
      this.User_Datas = JSON.parse(sessionStorage.getItem("User_Data"));
      this.PhoneNumber = JSON.parse(sessionStorage.getItem("PhoneNumber"));
      this.phoneLaBel = '';
    },
    watch: {
      PhoneNumber(curVal,oldVal){
        console.log(this.PhoneNumber.length)
        if(this.PhoneNumber.length >= '11'){
          this.UserIcon = false;
        }else{
          this.UserIcon = true;
        }
      }
    },
    methods: {
      PhoneLaBel () {
        this.phoneLaBel = ' ';
      },
      login () {
        this.axios.post('http://127.0.0.1:8080/zhiliao/login',{
          email: this.email,
          username: this.username,
          password: this.password
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.openToast(response.data.data.login_success);
            this.item = response.data.data;
            console.log("111"+this.item);
            this.$store.commit(types.LOGIN, this.item.token);
            console.log("21212"+this.$route.query.redirectPath);
            let redirect = decodeURIComponent(this.$route.query.redirectPath ||'/');
            this.$router.push({
              path: redirect
            });
          } else if (response.data.code === '0402') {
            this.openToast(response.data.data.login_error);
          }

        })
        // if(this.PhoneNumber.length >= '11'){
        //   if(this.PhoneNumber.length > '11'){
        //     this.$store.commit('LoginPhone',this.PhoneNumber);
        //     this.$router.push('/');
        //   }else{
        //     this.$store.commit('LoginPhone',this.PhoneNumber)
        //     // this.emailLogin()
        //   }
        // }else{
        //   this.showAlert = true;
        //   if (this.snackTimer) clearTimeout(this.snackTimer);
        //   this.snackTimer = setTimeout(() => { this.showAlert = false }, 2000)
        // }
      },
      openToast (alertText) {
        this.alertText = alertText;
        this.showAlert = true;
        if (this.snackTimer) clearTimeout(this.snackTimer);
        this.snackTimer = setTimeout(() => { this.showAlert = false }, 2000);
      },
      hideToast () {
        this.showAlert = false;
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
      // RouterOne(){
      //   this.UserIcon = true;
      //   this.$router.go(-1);
      // },
      // emailLogin:function () {
      //   this.axios.post('http://127.0.0.1:8080/zhiliao/login',{
      //       email: 'amos@qq.com',
      //       username: 'amosamos',
      //       password: 'amosamos'
      //   }).then( (response) => {
      //     if( response.data.code === '0000'){
      //       this.items = response.data.data;
      //       console.log(this.items)
      //     }
      //   })
      // },
      usernameLogin:function () {
        this.showUsernameLogin = true;
        this.showPhoneLogin = false;
        this.showEmailLogin = false;
      },
      emailLogin:function () {
        this.showUsernameLogin = false;
        this.showPhoneLogin = false;
        this.showEmailLogin = true;
      },
      phoneLogin:function () {
        this.showUsernameLogin = false;
        this.showPhoneLogin = true;
        this.showEmailLogin = false;
      }
    }
	}
</script>

<style lang="less" scoped>
  /*.Login-Body{*/
    /*background-color:#474a4f;*/
    /*height: 100vh;*/
  /*}*/
  .login-container{
    height: 3rem;
    background-color: #2196F3;
    color: white;
    text-align: center;
    .login-header{
      padding: .7rem 0 0 0 ;
      .login-logo{
        font-size: .7rem;
        vertical-align: center;
      }
      .login-slogen{
        font-size: .3rem;
      }
    }

  }
  .input-class{
    text-align:center;
    padding: 1rem 1rem 0 1rem;
    /*background-color:#474a4f;*/
  }
  .Phone-Input{
    color: #ffffff;
  }
  .top-button-icon{
    background-color:#474a4f;
    color: #ffffff;
  }
  .Login-Button-One{
    margin-top: 2em;
    width:96%;
    margin-left:4%;
  }
  .Login-Button-Two{
    display: none;
  }
  .demo-paper-two {
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 20px;
    text-align: center;
    background-color: #474a4f;
  }
  .demo-paper-one{
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 20px;
    text-align: center;
    background-color: #474a4f;
    display: none;
  }
  .demo-paper-two .mu-avatar{
    height: 100px;
    width: 100px;
  }
  .mu-sub-header{
    line-height: 1.5em !important;
    padding: 0em 0 1em 0;
    font-size: 1em;
  }
</style>
