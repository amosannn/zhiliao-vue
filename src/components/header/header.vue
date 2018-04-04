<template>
    <!--<header id='head_top'>-->
      <!--<slot name='logo'></slot>-->
      <!--<slot name='search'></slot>-->
      <!--<section class="head_goback" v-if="goBack" @click="$router.go(-1)">-->
        <!--<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">-->
          <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>-->
        <!--</svg>-->
      <!--</section>-->
      <!--<router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">-->
        <!--<svg class="user_avatar" v-if="userInfo">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#login"></use>-->
        <!--</svg>-->
        <!--<span class="login_span" v-else>登录|注册</span>-->
      <!--</router-link>-->
      <!--<section class="title_head ellipsis" v-if="headTitle">-->
        <!--<span class="title_text">{{headTitle}}</span>-->
      <!--</section>-->
      <!--<slot name="edit"></slot>-->
      <!--<slot name="msite-title"></slot>-->
      <!--<slot name="changecity"></slot>-->
      <!--<slot name="changeLogin"></slot>-->
    <!--</header>-->
  <mu-appbar class="title"  title="知了">
    <mu-flat-button color="white" label="搜索" labelClass="appbar-search-block" icon="search" slot="right"/>
    <span class="appbar-text" slot="center">知了</span>
    <mu-flat-button color="white" label="提问" labelClass="appbar-search-block" icon="control_point" slot="left" @click="jumpToAsk"/>
    <!--icon-loupe-->
  </mu-appbar>

</template>

<script>
	export default {
		name: "zhiliao",
    methods: {
		  jumpToAsk(){
        this.$router.push('/ask');
      }
    }
	}
</script>

<style lang="less">
  .title{
    text-align: center;
    height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .appbar-text{
      font-size: .1rem;
    }
    /*.appbar-search-block{*/
    /*font-size: 18px;*/
    /*margin-left: -8px;*/
    /*margin-bottom: 2px;*/
    /*}*/
  }
</style>
