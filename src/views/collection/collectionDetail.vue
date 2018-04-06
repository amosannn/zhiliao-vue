<template>
  <div style="background-color:#EEEEEE;">
    <mu-appbar class="appbar-title" :title="barTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
    </mu-appbar>

    <section class="collection-detail-container">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-card>
        <!--<section class="topic-desc-head">-->
          <!--<mu-raised-button class="topic-follow-btn" @click.native="followTopic(topicId)" :label="followBtnLabel" :backgroundColor="followBtnColor"/>-->
        <!--</section>-->
        <mu-card-text v-if="collection.collectionDesc" v-html="delHtmlTag(collection.collectionDesc)"></mu-card-text>
        <mu-card-text class="collection-answer-count" v-if="collection.answerCount">共 {{collection.answerCount}} 个内容</mu-card-text>
      </mu-card>

      <mu-list>
        <mu-card class="content-card" v-model="answerList" v-for="(answer,index) in answerList">
          <mu-card-header class="content-card-header" :title="answer.user.username" @click.native="jumpToUser(answer.user.userId)">
            <mu-avatar class="content-card-avatar" :src="answer.user.avatarUrl" :size="30" slot="avatar"/>
          </mu-card-header>
          <section class="content-card-title">
            <span class="content-card-title-text" @click="jumpToQuestion(answer.question.questionId)">{{answer.question.questionTitle}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <mu-card-text v-html="delHtmlTag(answer.answerContent)" class="content-card-answer" @click.native="jumpToAnswer(answer.answerId, answer.question.questionId)">
          </mu-card-text>
          <section class="content-card-options">
            <span class="content-bottom" v-show="answer.question.answerCount">{{answer.question.answerCount}} 回答 · </span>
            <span class="content-bottom" v-show="answer.question.followedCount">{{answer.question.followedCount}} 关注 · </span>
            <!--<span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>-->
            <span class="content-bottom" :id="'question'+answer.question.questionId" @click="followQuestion(answer.question.questionId)">关注问题</span>
          </section>
        </mu-card>
      </mu-list>
    </section>
  </div>
</template>

<script>
  export default {
    name: "collection-detail",
    data () {
      return {
        barTitle: '我的收藏',
        collection:  null,
        answerList: []
      }
    },
    mounted() {
      this.collectionId = this.$route.params.collectionId;
      console.log(this.topicId);
      // this.questionId = this.$route.params.questionId?this.$route.params.questionId:'';
      this.getData(this.collectionId);
    },
    methods: {
      getData(collectionId) {
        this.axios.get('http://127.0.0.1:8080/zhiliao/collection/'+collectionId,{
          // page: page,
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.barTitle = response.data.data.collection.collectionName;
            this.collection = response.data.data.collection;
            this.answerList = response.data.data.answerList;
          }
        })
      },
      goBack(){
        this.$router.go(-1);
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
      // 判断是否已关注该问题
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
  }
</script>

<style lang="less" scoped>
  .collection-detail-container{
    /*margin-top: 2.35rem;*/
    height: calc(100vh - 2.4rem);
    overflow-y: scroll;
    .collection-answer-count{
      padding: 0 16px .3rem;
    }
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
