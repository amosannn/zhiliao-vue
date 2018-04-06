<template>
  <div style="background-color:#EEEEEE;">
    <mu-appbar class="appbar-title" :title="barTitle">
      <mu-icon-button icon="close" slot="left" @click="goBack"/>
    </mu-appbar>

    <mu-paper class="appbar-tabs-paper" :zDepth="2">
      <mu-tabs class="topic-tab" :value="activeTab" @change="handleTabChange">
        <mu-tab v-for="(tab,index) in tabList" :value='tab.tabId' :title="tab.tabName"/>
      </mu-tabs>
    </mu-paper>

    <section class="topic-desc-container" v-if="activeTab==='desc'">
      <mu-card>
        <section class="topic-desc-head">
          <mu-avatar class="topic-avatar" :src="topic.topicImage"/>
          <mu-raised-button class="topic-follow-btn" @click.native="followTopic(topicId)" :label="followBtnLabel" :backgroundColor="followBtnColor"/>
        </section>
        <mu-card-text v-html="delHtmlTag(topic.topicDesc)"></mu-card-text>
      </mu-card>

      <section class="related-topic-label" v-if="parentTopics.length>0">
        <span>父话题</span>
      </section>
      <mu-card v-if="parentTopics.length>0">
        <section>
          <mu-card-header v-for="(parentTopic, index) in parentTopics" :title="parentTopic.topicName" :subTitle="parentTopic.topicDesc" @click.native="jumpToTopic(parentTopic.topicId)">
            <mu-avatar :src="parentTopic.topicImage" slot="avatar"/>
          </mu-card-header>
        </section>
      </mu-card>

      <section class="related-topic-label" v-if="childTopics.length>0">
        <span>子话题</span>
      </section>
      <mu-card v-if="childTopics.length>0">
        <section>
          <mu-card-header v-for="(childTopic, index) in childTopics" :title="childTopic.topicName" :subTitle="childTopic.topicDesc" @click.native="jumpToTopic(childTopic.topicId)">
            <mu-avatar :src="childTopic.topicImage" slot="avatar"/>
          </mu-card-header>
        </section>
      </mu-card>
    </section>

    <section class="topic-dynamic-container" v-if="activeTab==='dynamic'">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-list>
        <mu-card class="content-card" v-model="answerList" v-for="(item,index) in answerList">
          <mu-card-header class="content-card-header" :title="item.user.username+'回答了问题'" @click.native="jumpToUser(item.user.userId)">
            <mu-avatar class="content-card-avatar" :src="item.user.avatarUrl" :size="30" slot="avatar"/>
          </mu-card-header>
          <section class="content-card-title">
            <span class="content-card-title-text" @click="jumpToQuestion(item.question.questionId)">{{item.question.questionTitle}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <mu-card-text v-html="delHtmlTag(item.answerContent)" class="content-card-answer" @click.native="jumpToAnswer(item.answerId, item.question.questionId)">
          </mu-card-text>
          <section class="content-card-options">
            <span class="content-bottom" v-show="item.likedCount">{{item.likedCount}} 赞同</span>
            <!--<span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>-->
            <span class="content-bottom"> 发表于 {{item.createTime | dateFormat('YYYY-MM-DD')}}</span>
          </section>
        </mu-card>
      </mu-list>
    </section>

    <section class="topic-hot-container" v-if="activeTab==='hot'">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-list>
        <mu-card class="content-card" v-model="answerList" v-for="(item,index) in answerList">
          <mu-card-header class="content-card-header" :title="item.user.username+'回答了问题'" @click.native="jumpToUser(item.user.userId)">
            <mu-avatar class="content-card-avatar" :src="item.user.avatarUrl" :size="30" slot="avatar"/>
          </mu-card-header>
          <section class="content-card-title">
            <span class="content-card-title-text" @click="jumpToQuestion(item.question.questionId)">{{item.question.questionTitle}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <mu-card-text v-html="delHtmlTag(item.answerContent)" class="content-card-answer" @click.native="jumpToAnswer(item.answerId, item.question.questionId)">
          </mu-card-text>
          <section class="content-card-options">
            <span class="content-bottom" v-show="item.likedCount">{{item.likedCount}} 赞同</span>
            <!--<span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>-->
            <span class="content-bottom"> 发表于 {{item.createTime | dateFormat('YYYY-MM-DD')}}</span>
          </section>
        </mu-card>
      </mu-list>
    </section>

    <section class="topic-all-question-container" v-if="activeTab==='allQuestion'">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-list>
        <mu-card class="content-card" v-for="(question,index) in questionList">
          <section class="content-card-title">
            <span class="content-card-title-text" @click="jumpToQuestion(question.questionId)">{{question.questionTitle}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <section class="content-card-options">
            <span class="content-bottom" v-show="question.answerCount">{{question.answerCount}} 回答 · </span>
            <span class="content-bottom" v-show="question.followedCount">{{question.followedCount}} 关注 · </span>
            <!--<span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>-->
            <span class="content-bottom" :id="'question'+question.questionId" @click="followQuestion(question.questionId)">关注问题</span>
          </section>
        </mu-card>
      </mu-list>
    </section>
  </div>
</template>

<script>
  import { dateFormat } from 'vux'
  export default {
    name: "topic",
    data () {
		  return {
        barTitle: '',
        // activeTab: this.tabList[0].tabId,
        tabList: [{
          tabId: 'desc',
          tabName: '话题资料'
        }, {
          tabId: 'dynamic',
          tabName: '动态'
        }, {
          tabId: 'hot',
          tabName: '热门'
        }, {
          tabId: 'allQuestion',
          tabName: '全部问题'
        }],
        activeTab: 'desc',
        followBtnLabel: '',
        followBtnColor: '',
        isFollow: false,
        topic: [],
        parentTopics: [],
        childTopics: [],
        questionList: [],
        answerList: [],
        page: 1,
      }
    },
    mounted() {
      this.topicId = this.$route.params.topicId;
      console.log(this.topicId);
      // this.questionId = this.$route.params.questionId?this.$route.params.questionId:'';
      this.getData(this.topicId, this.page);
      this.judgePeopleFollowTopic(this.topicId);
      this.getParentTopics(this.topicId);
      this.getChildTopics(this.topicId);
    },
    methods: {
      initPage() {
        this.topicId = this.$route.params.topicId;
        this.getData(this.topicId, this.page);
        this.judgePeopleFollowTopic(this.topicId);
        this.getParentTopics(this.topicId);
        this.getChildTopics(this.topicId);
      },
      getData(val, page) {
        this.axios.post('http://127.0.0.1:8080/zhiliao/topic/'+val,{
          page: page,
          tabType: this.activeTab
        }).then( (response) => {
            if( response.data.code === '0000'){
              if(response.data.data.pageBean) {
                if('allQuestion' === this.activeTab) {
                  this.questionList = response.data.data.pageBean.list?response.data.data.pageBean.list:[];
                } else {
                  this.answerList = response.data.data.pageBean.list?response.data.data.pageBean.list:[];
                }
              }
              this.topic = response.data.data.topic;
              this.barTitle = this.topic.topicName;
              console.log(this.answerList)
            }
          })
      },
      goBack(){
        this.$router.go(-1);
      },
      // 切换tab，重新获取feed流数据
      handleTabChange(val) {
        this.page = 1; //切换tab，页数重置为第一页
        // this.nomore = false; //切换tab，重置
        this.activeTab = val;

        this.getData(this.topicId, this.page)
      },
      getParentTopics(val){
        this.axios.post('http://127.0.0.1:8080/zhiliao/listParentTopic' ,{
          topicId: val
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.parentTopics = response.data.data.parentTopics;
          }
        })
      },
      getChildTopics(val){
        this.axios.post('http://127.0.0.1:8080/zhiliao/listTopicByParentId' ,{
          topicId: val
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.childTopics = response.data.data.childTopics;
          }
        })
      },
      jumpToTopic(topicId) {
        this.$router.push('/topic/'+topicId);
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
      // 判断是否已关注该话题
      judgePeopleFollowTopic(val) {
        this.axios.post('http://127.0.0.1:8080/zhiliao/judgePeopleFollowTopic' ,{
          topicId: val
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.isFollow = response.data.data;
            if(this.isFollow){
              this.followBtnLabel = "已关注";
              this.followBtnColor = '#9E9E9E';
            } else {
              this.followBtnLabel = "关注话题";
              this.followBtnColor = '#1E88E5';
            }
          }
        })
      },
      // 关注话题或取消关注
      followTopic(val) {
        if (!this.isFollow) {
          this.axios.post('http://127.0.0.1:8080/zhiliao/followTopic', {
            topicId: val
          }).then((response) => {
            if (response.data.code === '0000') {
              this.topic.followedCount += 1;
              this.followBtnLabel = "已关注";
              this.followBtnColor = '#9E9E9E';
              this.isFollow = true;
            }
          })
        } else {
          this.axios.post('http://127.0.0.1:8080/zhiliao/unfollowTopic', {
            topicId: val
          }).then((response) => {
            if (response.data.code === '0000') {
              this.topic.followedCount -= 1;
              this.followBtnLabel = "关注话题";
              this.followBtnColor = '#1E88E5';
              this.isFollow = false;
            }
          })
        }
      },
      followQuestion(val) {
        if(document.getElementById("question"+val).innerHTML === "关注问题") {
          this.axios.post('http://127.0.0.1:8080/zhiliao/followQuestion' ,{
            questionId: val
          }).then( (response) => {
            if( response.data.code === '0000'){
              document.getElementById("question"+val).innerHTML="已关注";
            }
          })
        } else {
          this.axios.post('http://127.0.0.1:8080/zhiliao/unfollowQuestion' ,{
            questionId: val
          }).then( (response) => {
            if( response.data.code === '0000'){
              document.getElementById("question"+val).innerHTML="关注问题";
            }
          })
        }

      },
    },
    filters: {
      dateFormat
    },
    watch:{
      // 修复topic/1跳转topic/2时路由变化，页面却不会重新渲染
      $route(newVal, oldVal){
        if(newVal.params.topicId!=oldVal.params.topicId){
          this.initPage();
        }
      }
    }
	}
</script>

<style lang="less" scoped>
  .topic-desc-container{
    margin-top: 2.35rem;
    height: calc(100vh - 2.4rem);
    overflow-y: scroll;

    .topic-desc-head{
      padding: .2rem .3rem;
      .topic-avatar{
        margin-left: .3rem;
        margin-top: .1rem;
      }
      .topic-follow-btn{
        margin-top: .25rem;
        margin-right: .2rem;
        height: .7rem;
        float: right;
      }
    }

    .related-topic-label{
      padding: .3rem;
    }
  }

  .topic-dynamic-container{
    margin-top: 2.35rem;
    height: calc(100vh - 2.4rem);
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

  .topic-hot-container{
    .topic-dynamic-container
  }

  .topic-all-question-container{
    margin-top: 2.35rem;
    height: calc(100vh - 2.4rem);
    overflow-y: scroll;
    .content-card{
      margin-bottom: .3rem;
      .content-card-title{
        padding: .4rem .4rem .1rem .4rem;
        .content-card-title-text{
          font-size: 15px;
          font-weight: 500;
          color: black;
        }
      }
      .content-card-options{
        padding: .2rem .4rem .3rem .4rem;
        color: #9E9E9E;
      }
    }
  }
</style>

<style lang="less">
  .appbar-title{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 1.35rem;
  }

  .appbar-tabs-paper{
    .topic-tab{
      margin-top: 1.35rem;
      height: 1rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>
