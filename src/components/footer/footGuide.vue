<template>
  <mu-paper class="guide_item">
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="recents" title="Recents" icon="library_books"/>
      <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>
      <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>
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
