<template>
  <div style="background-color:#EEEEEE;">
    <mu-appbar class="appbar-title" :title="barTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
    </mu-appbar>

    <section class="collection-list-container">
      <!--<mu-refresh-control class="refresh-control" :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

      <mu-list>
        <mu-card class="content-card" v-for="(collection,index) in collectionList" @click.native="jumpToCollection(collection.collectionId)">
          <section class="content-card-title">
            <span class="content-card-title-text">{{collection.collectionName}}</span>
            <!--<span style="font-size: 15px" v-html="item.question.questionContent"></span>-->
          </section>
          <section class="content-card-options">
            <span class="content-bottom">{{collection.answerCount}} 个内容 </span>
          </section>
        </mu-card>
      </mu-list>
    </section>

    <mu-float-button class="add-button" icon="add" @click.native="jumpToAddCollection"/>

  </div>
</template>

<script>
  export default {
		name: "collection",
    data () {
      return {
        barTitle: '我的收藏',
        collectionList: []
      }
    },
    mounted() {
      console.log(this.topicId);
      // this.questionId = this.$route.params.questionId?this.$route.params.questionId:'';
      this.getData();
    },
    methods: {
      getData() {
        this.axios.get('http://127.0.0.1:8080/zhiliao/listCreatingCollection',{
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
      jumpToAddCollection() {
        this.$router.push("/addCollection/");
      },
      jumpToCollection(collectionId) {
        this.$router.push("/collection/"+collectionId);
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
  .appbar-title{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .collection-list-container{
    margin-top: 1.2rem;
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

  .add-button{
    z-index: 10;
    bottom: 2rem;
    margin-right: 1rem;
    float: right;
  }
</style>
