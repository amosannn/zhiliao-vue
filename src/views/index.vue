<template>
<div>

  <mu-appbar title="Title">
    <mu-flat-button label="Search" icon="search" class="appbar-search-field"  slot="left"/>
    <mu-flat-button color="white" label="flat Button" slot="right"/>
  </mu-appbar>

  <mu-card>
    <mu-card-header title="Myron Avatar" subTitle="sub title">
      <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
    </mu-card-header>
    <mu-card-media title="Image Title" subTitle="Image Sub Title">
      <img src="/images/sun.jpg" />
    </mu-card-media>
    <mu-card-title title="Content Title" subTitle="Content Title"/>
    <mu-card-text>
      散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
      调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
      似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
      找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
    </mu-card-text>
    <mu-card-actions>
      <mu-flat-button label="Action 1"/>
      <mu-flat-button label="Action 2"/>
    </mu-card-actions>
  </mu-card>

  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="主页" title="Recents" icon="restore"/>
      <mu-bottom-nav-item value="回答" title="Favorites" icon="favorite"/>
      <mu-bottom-nav-item value="提问" title="Nearby" icon="location_on"/>
      <mu-bottom-nav-item value="通知" title="Nearby" icon="location_on"/>
      <mu-bottom-nav-item value="我的" title="Nearby" icon="location_on"/>
    </mu-bottom-nav>
  </mu-paper>
</div>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recents'
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    }
  }
</script>

<style lang="less">
  .appbar-search-field{
    color: #FFF;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
</style>
