<template>
  <div>
    <zhiliao></zhiliao>
    <!--<mu-paper class="appbar-tabs-paper" :zDepth="2">-->
      <!--<mu-tabs class="appbar-tab" :value="activeTab" @change="handleTabChange">-->
        <!--&lt;!&ndash;<mu-tab value="dynamic" title="精选"/>&ndash;&gt;-->
        <!--<mu-tab value="followed" title="已关注"/>-->
        <!--<mu-tab value="mine" title="我的收藏夹"/>-->
      <!--</mu-tabs>-->
    <!--</mu-paper>-->
    <tabs :tabList=tabList></tabs>
    <mu-divider/>
    <div class="gridlist-container">
      <mu-grid-list class="gridlist">
        <!--<mu-sub-header>图片展示</mu-sub-header>-->
        <mu-grid-tile v-for="(item, index) in items" >
          <img src="http://www.muse-ui.org/images/sun.jpg"/>
          <span slot="title">{{item.collectionName}}</span>
          <!--<span slot="subTitle">by <b>{{item.user.username}}</b></span>-->
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import tabs from '@/components/header/tab.vue'
  export default {
		name: "collection",
    components:{
      zhiliao,
      tabs
    },
    data () {
      return {
        items: [],
        tabList: [{
          tabId: 'followed',
          tabName: '已关注'
        }, {
          tabId: 'mine',
          tabName: '我的收藏'
        }],
        list: [{
          image: 'http://www.muse-ui.org/images/breakfast.jpg',
          title: 'Breakfast',
          author: 'Myron'
        }, {
          image: 'http://www.muse-ui.org/images/breakfast.jpg',
          title: 'Burger',
          author: 'Linyu'
        }, {
          image: '/images/camera.jpg',
          title: 'Camera',
          author: 'ruolin'
        }, {
          image: '/images/hats.jpg',
          title: 'Hats',
          author: 'kakali'
        }, {
          image: '/images/honey.jpg',
          title: 'Honey',
          author: 'yuyang'
        }, {
          image: '/images/morning.jpg',
          title: 'Morning',
          author: 'mokayi'
        }, {
          image: '/images/vegetables.jpg',
          title: 'Vegetables',
          author: 'NUyyyyyyy'
        }, {
          image: '/images/water-plant.jpg',
          title: 'water',
          author: 'TDDyyyyyyy'
        }]
      }
    },
    created() {
      // this.getData()
    },
    mounted () {
      this.trigger = this.$el
    },
    methods:{
      // tab切换
      handleTabChange (val) {
        this.activeTab = val;
      },
      // 下拉刷新
      refresh () {
        this.refreshing = true
        setTimeout(() => {
          this.getData();
          this.refreshing = false
        }, 2000)
      },
      // 头像跳转到用户页
      jumpToUser() {
        console.log("click");
        // this.$router.push("www.baidu.com");
      },
      // 切换tab，重新获取feed流数据
      handleTabChange(val) {
        this.page = 1 //切换tab，页数重置为第一页
        this.nomore = false //切换tab，重置

        this.activeTab = val
        if(val === 'mine'){
          // this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
          this.url = 'http://127.0.0.1:8080/zhiliao/listCreatingCollection'
          this.getData()
        }
      },
      // 获取feed流数据
      getData() {
        this.$http.get('http://127.0.0.1:8080/zhiliao/listCreatingCollection',{
          headers: {
            "Content-Type":"application/json;charset=utf-8"
          },
          withCredentials : true
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.items = response.data.data.collectionList;
            console.log(this.items)
          }
        })
      }
    }
	}
</script>

<style >
  .gridlist-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 1.7rem;
    padding: .05rem .1rem .1rem .1rem;
  }

  .gridlist{
    /*width: auto;*/
    height: 450px;
    overflow-y: auto;
  }
</style>
