<template>
  <div class="more-lists">
    <mu-appbar class="title"  title="知了">
      <mu-flat-button color="white" label="搜索" labelClass="appbar-search-block" icon="search" slot="right"/>
      <span class="appbar-text" slot="center">知了</span>
      <mu-flat-button color="white" label="提问" labelClass="appbar-search-block" icon="control_point" slot="left"/>
      <!--icon-loupe-->
    </mu-appbar>

    <mu-list-item title="Amosannn" describeText="查看或编辑个人主页">
      <mu-avatar src="https://avatars3.githubusercontent.com/u/16012509?s=400&u=6fe0dd08943216aeff2d3c9d1b8c3e602f6de8e9&v=4" slot="leftAvatar"/>
      <!--<span slot="describe">-->
        <!--查看或编辑个人主页-->
      <!--</span>-->
    </mu-list-item>
    <mu-divider inset/>

    <mu-list class="more-lists-content">
      <mu-list-item title="我的创作">
        <mu-icon slot="left" value="create"/>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="我的关注">
        <mu-icon slot="left" value="remove_red_eye"/>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="我的收藏">
        <mu-icon slot="left" value="star"/>
      </mu-list-item><mu-divider/>
    </mu-list>


    <mu-list class="more-lists-content">
      <mu-sub-header>账号设置</mu-sub-header>
      <mu-list-item title="知了账号" toggleNested :open="false">
        <mu-list-item slot="nested" title="邮箱" describeText="am****@gmail.com" afterText="已验证">
        </mu-list-item>
        <mu-list-item slot="nested" title="手机" describeText="+86 132*****0102" afterText="待验证">
        </mu-list-item>
        <mu-list-item slot="nested" title="账号密码" describeText="修改密码">
        </mu-list-item>
      </mu-list-item>
      <mu-divider/>

      <mu-list-item title="社交账号" toggleNested :open="false">
        <mu-list-item disableRipple slot="nested" @click="handleToggle('weiboBound')" title="新浪微博" describeText="鲨鱼蘸酱油">
          <mu-switch v-model="weiboBound"  slot="right"/>
        </mu-list-item>
        <mu-list-item disableRipple slot="nested" @click="handleToggle('wechatBound')" title="微信" describeText="尚未绑定">
          <mu-switch v-model="wechatBound"  slot="right"/>
        </mu-list-item>
        <mu-list-item disableRipple slot="nested" @click="handleToggle('qqBound')" title="QQ" describeText="尚未绑定">
          <mu-switch v-model="qqBound"  slot="right"/>
        </mu-list-item>
      </mu-list-item>
      <mu-divider/>

      <mu-list-item title="账号安全" toggleNested :open="false">
        <mu-list-item slot="nested" title="最近活动历史" describeText="*次活动会话" afterText="已验证">
        </mu-list-item>
        <mu-list-item slot="nested" title="手机" describeText="+86 132*****0102" afterText="待验证">
        </mu-list-item>
        <mu-list-item slot="nested" title="账号密码" describeText="修改密码">
        </mu-list-item>
      </mu-list-item>
      <mu-divider/>
    </mu-list>


    <mu-list class="more-lists-content">
      <mu-sub-header>关于与帮助</mu-sub-header>
      <mu-list-item title="意见反馈">
        <mu-icon slot="left" value="send"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="开源许可">
        <mu-icon slot="left" value="devices"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="知了协议">
        <mu-icon slot="left" value="dvr"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>


    <mu-list class="more-lists-content">
      <mu-sub-header>联系作者</mu-sub-header>
      <mu-list-item title="amosannn@gmail.com" describeText="电子邮箱">
        <mu-icon value="email" color="indigo" slot="left"/>
        <!--<mu-icon value="chat_bubble" slot="right"/>-->
      </mu-list-item>
    </mu-list>
    <mu-divider/>

    <mu-list class="more-lists-content">
      <mu-list-item title="退出登录" class="more-logout" titleClass="more-logout-title"/>
    </mu-list>
  </div>
</template>

<script>
	export default {
		name: "more",
    data () {
      return {
        events: false,
        calls: false,
        messages: false,
        notifications: false,
        sounds: false,
        videoSounds: false,
        weiboBound: true,
        wechatBound: false,
        qqBound: false,
      }
    },
    methods: {
      handleToggle (key) {
        this[key] = !this[key]
      }
    },
	}
</script>

<style lang="less" scoped>
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

  .more-lists{
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    .more-lists-content{
      margin-bottom: .5rem
    }
    .more-logout{
      text-align: center;
      /*color: #ff3c27;*/
    }
  }
</style>

<style lang="less">
  .more-logout-title{
    color: #ff3c27;
  }
</style>
