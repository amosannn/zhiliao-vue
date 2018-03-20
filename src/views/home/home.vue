<template>
  <div>
    <mu-appbar class="title"  title="知了">
      <mu-flat-button color="white" label="搜索" labelClass="appbar-search-block" icon="search" slot="left"/>
      <span class="appbar-text" slot="center">知了</span>
      <mu-flat-button color="white" label="提问" labelClass="appbar-search-block" icon="add_circle_outline" slot="right"/>
      <!--icon-loupe-->
    </mu-appbar>
    <mu-tabs class="appbar-tab" :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="动态"/>
      <mu-tab value="tab2" title="热门"/>
      <mu-tab value="tab3" title="发现"/>
    </mu-tabs>
  </div>
</template>

<script>
  import headTop from '@/components/header/head'
	export default {
		name: "home",
    data (){
		  return {
		    activeTab: 'tab1'
      }
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val;
      }
    },
    components:{
      headTop
    },
	}
</script>

<style >
  .title{
    text-align: center;
    height: 0.9rem;
  }

  .appbar-search-block{
    font-size: 18px;
    margin-left: -8px;
    margin-bottom: 2px;
  }
  .appbar-tab{
    height: 0.7rem;
  }

</style>
