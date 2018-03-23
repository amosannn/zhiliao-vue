<template>
  <mu-paper class="appbar-tabs-paper" :zDepth="2">
    <mu-tabs class="appbar-tab" :value="activeTab" @change="handleTabChange">
      <mu-tab v-for="(tab,index) in tabList" :value='tab.tabId' :title="tab.tabName"/>
    </mu-tabs>
  </mu-paper>
</template>

<script>
	export default {
		name: "tabs",
    data () {
		  return{
        activeTab: this.tabList[0].tabId
      }
    },
    props:{
      tabList:{
        type: Array,
        default(){
          return [];
        }
      }
    },
    // watch:{
    //   list(val){
    //     console.log('list 改变了',val);
    //   }
    // }

    methods: {
      // 切换tab，重新获取feed流数据
      handleTabChange(val) {
        this.page = 1; //切换tab，页数重置为第一页
        this.nomore = false; //切换tab，重置

        this.activeTab = val;
        if (val === 'mine') {
          // this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
          this.url = 'http://127.0.0.1:8080/zhiliao/listCreatingCollection'
          // this.getData()
        }
      }
    }

	}
</script>

<style lang="less">
  .appbar-tabs-paper{
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*height: 1.7rem;*/
  /*display: inline-block;*/
    /*position: fixed;*/
    /*width: 100px;*/
  /*margin: 20px;*/
  /*text-align: center;*/
  .appbar-tab{
    margin-top: 1rem;
    height: 0.7rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  }
</style>
