<template>
<div>
  <div class="register-container">
    <div class="register-header">
      <span class="register-logo">注册知了</span><br/>
      <span class="register-slogen">发现更大的世界</span>
    </div>
  </div>

  <div class="input-class">
    <mu-text-field hintText="输入用户名" v-model="username"/>
    <mu-text-field hintText="输入邮箱" v-model="email"/>
    <mu-text-field hintText="输入密码" v-model="password"/><br/>
    <mu-raised-button @click="register()" :label="RegisterBtn" backgroundColor="#2196F3" fullWidth/>
    <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>
  </div>

</div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        RegisterBtn: '注 册',
        username: null,
        email: null,
        password: null,
        showAlert: false,
        alertText: null,

      };
    },
    methods:{
      register:function () {
        this.$http.post('http://127.0.0.1:8080/zhiliao/register',{
          username: this.username,
          email: this.email,
          password: this.password
        }).then( (response) => {
          if( response.data.code === '0000'){
            let item = response.data.data;
            console.log(item);
            if(item.register_error){
              this.alertText = item.register_error;
              this.showAlert = true;
              if (this.snackTimer) clearTimeout(this.snackTimer);
              this.snackTimer = setTimeout(() => { this.showAlert = false }, 2000);
            }
          }
        })
      },
      hideToast () {
        this.showAlert = false;
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
    }


  };
</script>

<style lang="less" scoped>
  .register-container{
    height: 3rem;
    background-color: #2196F3;
    color: white;
    text-align: center;
    .register-header{
      padding: .7rem 0 0 0 ;
      .register-logo{
        font-size: .7rem;
        vertical-align: center;
      }
      .register-slogen{
        font-size: .3rem;
      }
    }

  }
  .input-class{
    text-align:center;
    padding: 1rem 1rem 0 1rem;
    /*background-color:#474a4f;*/
  }
</style>
