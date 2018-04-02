<template>
  <div style="background-color:#EEEEEE;">
    <!--<mu-appbar class="title"  title="知了">-->
      <!--<mu-flat-button color="white" label="搜索" labelClass="appbar-search-block" icon="search" slot="right"/>-->
      <!--<span class="appbar-text" slot="center">知了</span>-->
      <!--<mu-flat-button color="white" label="提问" labelClass="appbar-search-block" icon="control_point" slot="left"/>-->
      <!--&lt;!&ndash;icon-loupe&ndash;&gt;-->
    <!--</mu-appbar>-->
    <zhiliao></zhiliao>
    <!--<mu-paper class="appbar-tabs-paper" :zDepth="2">-->
      <!--<mu-tabs class="appbar-tab" :value="activeTab" @change="handleTabChange">-->
        <!--<mu-tab value="dynamic" title="动态"/>-->
        <!--<mu-tab value="hot" title="热门"/>-->
        <!--<mu-tab value="explore" title="发现"/>-->
      <!--</mu-tabs>-->
    <!--</mu-paper>-->
    <tabs :tabList=tabList></tabs>

    <mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <!-- feed流 -->
    <mu-list class="content-list">
      <template v-for="(item,index) in items">
        <mu-card class="content-card">
          <mu-card-header class="content-card-header" :title="item.user.username+'回答了问题'" @click.native="jumpToUser(item.user.userId)">
            <mu-avatar class="content-card-avatar" :src="item.user.avatarUrl" :size="30" slot="avatar"/>
          </mu-card-header>
          <!--<mu-divider/>-->
          <!--<mu-card-media title="Image Title" subTitle="Image Sub Title">-->
            <!--<img src="http://www.muse-ui.org/images/sun.jpg" />-->
          <!--</mu-card-media>-->
          <mu-card-title titleClass="content-card-title" :title="item.question.questionTitle" @click.native="jumpToQuestion(item.question.questionId)"/>
          <!--<mu-sub-header>{{item.question.questionTitle}}</mu-sub-header>-->
          <!--<mu-divider/>-->
          <mu-card-text class="content-card-text" @click.native="jumpToAnswer(item.answerId)">
            {{item.answerContent}}
            <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
            <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
            <!--似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，-->
            <!--找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！-->
          </mu-card-text>
          <!--<mu-divider/>-->
          <mu-card-actions>
            <mu-flat-button class="content-card-action" icon="thumb_up" :label="item.likedCount"/>
            <mu-flat-button class="content-card-action" icon="thumb_up" label="Action 2"/>
          </mu-card-actions>
        </mu-card>
      </template>
    </mu-list>
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import tabs from '@/components/header/tab.vue'
	export default {
		name: "home",
    components:{
      zhiliao,
      tabs
    },
    data (){
		  return {
        refreshing: false,
        trigger: null,
        items: [],
        tabList: [{
          tabId: 'dynamic',
          tabName: '动态'
        }, {
          tabId: 'hot',
          tabName: '热门'
        }, {
          tabId: 'explore',
          tabName: '发现'
        }],
        // url: 'https://www.vue-js.com/api/v1/topics?tab=all',
      }
    },
    created() {
      this.getData()

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
      jumpToUser(userId) {
        this.$router.push("/user/"+userId);
      },
      jumpToQuestion(questionId) {
        this.$router.push({
          name: 'Question',
          params: {
            questionId: questionId
          }
        });
      },
      jumpToAnswer(answerId) {
        this.$router.push({
          name: 'Answer',
          params: {
            answerId: answerId,
            // answer: item
          }
        });
      },
      // 切换tab，重新获取feed流数据
      handleTabChange(val) {
        this.page = 1 //切换tab，页数重置为第一页
        this.nomore = false //切换tab，重置

        this.activeTab = val
        this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
        this.getData()
      },
      // 获取feed流数据
      getData() {
        this.axios.get('http://127.0.0.1:8080/zhiliao/listMonthHotAnswer',{
          params: {
            // topicId: this.postId
          }
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.items = response.data.data.answerList;
            console.log(this.items)
          }
        })
      }
    },

	}
</script>

<style lang="less">
  .content-list{
    margin-top: 1.5rem;
    margin-bottom:1.5rem;
    .content-card{
      margin-bottom: .3rem;
      .content-card-header{
        height: .5rem;
        /*vertical-align: middle;*/
        .content-card-avatar{
          margin-top: -.15rem;
        }
      }
      .content-card-title{
        /*height: auto;*/
        font-size: .45rem;
        /*display:inline-block*/
      }
      .content-card-text{
        /*height: 3rem;*/
        margin-top: -.5rem;
      }
      .content-card-action{
        /*height: 1rem;*/
        margin-top: -.15rem;
      }
    }
  }

</style>
