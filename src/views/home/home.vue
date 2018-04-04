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


    <!-- feed流 -->
    <section class="content-list">
      <mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

      <mu-list>
        <mu-card class="content-card" v-for="(item,index) in items">
          <mu-card-header class="content-card-header" :title="item.user.username+'回答了问题'" @click.native="jumpToUser(item.user.userId)">
            <mu-avatar class="content-card-avatar" :src="item.user.avatarUrl" :size="30" slot="avatar"/>
          </mu-card-header>
          <!--<mu-divider/>-->
          <section class="content-card-title">
            <span class="content-card-title-text" @click="jumpToQuestion(item.question.questionId)">{{item.question.questionTitle}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <!--<mu-divider/>-->
          <mu-card-text v-html="delHtmlTag(item.answerContent)" class="content-card-answer" @click.native="jumpToAnswer(item.answerId, item.question.questionId)">
            <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
            <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
            <!--似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，-->
            <!--找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！-->
          </mu-card-text>
          <!--<mu-divider/>-->
          <section class="content-card-options">
            <span class="content-bottom" v-show="item.likedCount">{{item.likedCount}} 赞同</span>
            <!--<span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>-->
            <span class="content-bottom"> 发表于 {{item.createTime | dateFormat('YYYY-MM-DD')}}</span>
          </section>
        </mu-card>
      </mu-list>
    </section>
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import tabs from '@/components/header/tab.vue'
  import { dateFormat } from 'vux'
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
      jumpToAnswer(answerId, questionId) {
        this.$router.push({
          name: 'Answer',
          params: {
            answerId: answerId,
            questionId: questionId
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
      },

    },
    filters: {
      dateFormat
    }
	}
</script>

<style lang="less" scoped>
  .content-list{
    margin-top: 1.6rem;
    margin-bottom:1.5rem;
    height: calc(100vh - 3rem);
    overflow-y: scroll;
    .content-card{
      margin-bottom: .3rem;
      .mu-card-header{
        padding: .3rem .5rem .1rem .5rem;
      }
      .content-card-title{
        padding: .1rem .4rem .1rem .4rem;
        .content-card-title-text{
          font-size: 15px;
          font-weight: 500;
          color: black;
        }
      }
      .content-card-answer{
        padding: .2rem .4rem .1rem .4rem;
        color: #212121;
        /* 多行文本溢出显示省略号 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .content-card-options{
        padding: .2rem .4rem .3rem .4rem;
        color: #9E9E9E;
      }
    }
  }

</style>

<style lang="less">
  /*头像边上的文字*/
  .mu-card-header-title{
    margin-top: 5px;
  }

</style>
