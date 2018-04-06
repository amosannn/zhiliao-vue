<template>
  <div style="background-color:#EEEEEE;">
    <mu-appbar class="appbar-title" :title="barTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
    </mu-appbar>

    <section class="topic-dynamic-container">
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
  </div>
</template>

<script>
  export default {
    name: "collection-detail",
    data () {
      return {
        barTitle: '我的收藏',
        collectionList: []
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
            this.collectionList = response.data.data.collectionList?response.data.data.collectionList:[];
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
  .topic-all-question-container{
    /*margin-top: 1rem;*/
    height: calc(100vh - 2.65rem);
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
