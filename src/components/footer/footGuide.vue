<template>
  <mu-paper class="guide_item">
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item to="/" value="home" title="首页" icon="library_books"/>
      <mu-bottom-nav-item to="collection" value="collection" title="收藏夹" icon="archive"/>
      <mu-bottom-nav-item value="notification" title="通知" icon="notifications"/>
      <mu-bottom-nav-item value="more" title="更多" icon="menu"/>
      <mu-bottom-nav-item value="me" title="我的" icon="face"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
	export default {
		name: "foot-guide"
	}
</script>

<style scoped>
  .guide_item{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
  }
</style>
