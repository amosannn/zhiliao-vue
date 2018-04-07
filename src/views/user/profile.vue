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

    <div class="profile-desc" v-if="activeTab==='desc'">
      <mu-card>
        <section class="profile-avatar">
          <mu-avatar :src="user.avatarUrl" :size="120"/>
        </section>
        <span class="profile-username">{{user.username }}</span><br>
        <span class="profile-simpleDesc">{{user.simpleDesc }}</span>
        <mu-card-text ></mu-card-text>
        <mu-divider></mu-divider>
        <!--<mu-card-text>aa </mu-card-text>-->
        <section style="text-align: left; padding: 0 .5rem;">
          <!--<mu-icon-button class="profile-thumb-up" disabled icon="thumb_up"/>-->
          <span style="padding: 10px;display: table-cell;">{{user.likedCount}} 赞同 </span>
          <span style="padding: 10px;display: table-cell;">{{user.collectedCount}} 收藏</span>
        </section>
        <mu-divider></mu-divider>
        <section style="padding: 0 .5rem">
          <span style="padding: 10px;display: table-cell;">{{user.followedCount}} 关注我的人</span>
          <span style="padding: 10px;display: table-cell;">{{user.followCount}} 我关注的人</span>
        </section>
      </mu-card>

      <mu-card class="profile-content">

      </mu-card>
    </div>


    <section class="profile-answer-container" v-if="activeTab==='answer'">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-card>
        <mu-card-text class="collection-answer-count" v-if="answerCount">共 {{answerCount}} 个内容</mu-card-text>
      </mu-card>

      <mu-list>
        <mu-card class="content-card" v-for="(item,index) in answerList">
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


    <section class="profile-question-container" v-if="activeTab==='question'">
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
    name: "profile",
    data () {
		  return{
        barTitle: '我的主页',
        // activeTab: this.tabList[0].tabId,
        tabList: [{
          tabId: 'desc',
          tabName: '用户资料'
        }, {
        //   tabId: 'dynamic',
        //   tabName: '动态'
        // }, {
          tabId: 'answer',
          tabName: '回答'
        }, {
          tabId: 'question',
          tabName: '提问'
        }, {
          tabId: 'collection',
          tabName: '收藏'
        }],
        activeTab: 'desc',
        user: null,
        answerList: [],
        questionList: [],
      }
    },
    mounted() {
      this.userId = this.$route.params.userId;
      this.getData(this.userId);
    },
    methods: {
      getData(userId){
        this.axios.post('http://127.0.0.1:8080/zhiliao/profile/' + userId,{
          page: 1
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.user = response.data.data.user;
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
        if(val==='answer'){
          this.getAnswerList();
        } else if(val==='question'){
          this.getQuestionList();
        } else if(val==='collection'){
          this.$router.push('/collection');
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
      getAnswerList(){
        this.axios.post('http://127.0.0.1:8080/zhiliao/profileAnswer/' + this.userId,{
          page: 1
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.answerList = response.data.data.pageBean.list;
            this.answerCount = response.data.data.pageBean.allCount;
          }
        })
      },
      getQuestionList(){
        this.axios.post('http://127.0.0.1:8080/zhiliao/profileQuestion/' + this.userId,{
          page: 1
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.questionList = response.data.data.pageBean.list;
          }
        })
      }
    },
    filters: {
      dateFormat
    }
	}
</script>

<style lang="less" scoped>
  .profile-desc{
    margin-top: 3rem;
    height: calc(100vh - 3.05rem);
    overflow-y: scroll;

    text-align: center;
    .profile-avatar{
    }
    .profile-username{
      font-weight: bold;
      font-size: .6rem;
    }
    .profile-simpleDesc{
      font-size: .4rem;
    }
  }

  .profile-answer-container{
    margin-top: 2.35rem;
    height: calc(100vh - 3.5rem);
    overflow-y: scroll;
    .content-card{
      margin-bottom: .3rem;
      .content-card-title{
        padding: .5rem .4rem .1rem .4rem;
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

  .profile-question-container{
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
