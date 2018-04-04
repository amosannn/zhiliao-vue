<template>
  <div style="background-color:#EEEEEE;">
    <zhiliao></zhiliao>

    <section class="question-container">
      <mu-card class="question-head">
        <mu-list-item class="question-topic-box" disableRipple>
          <mu-chip class="question-topic-btn" v-for="(value, key, index) in item.topicMap" @click.native="jumpToTopic(key)">
            <!--<router-link :to="{name: 'topic_detail', params: {id: key}}">精华</router-link>-->
          {{value}}
          </mu-chip>
          <!--<mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">大学生活</mu-chip>-->
          <!--<mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">大学</mu-chip>-->
          <!--<mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">经历</mu-chip>-->
        </mu-list-item>
        <!--<mu-card-title :title="item.question.questionTitle" :subTitle="item.question.questionContent"/>-->
        <section style="padding: .3rem .4rem .3rem .4rem;">
          <span style="font-size: 20px">{{item.question.questionTitle}}</span>
          <span style="font-size: 15px" v-html="item.question.questionContent"></span>
        </section>
        <section class="question-statistical" describeText="125人关注 54条评论">
          <span class="follow-question-count">{{item.question.followedCount}} 人关注</span>
          <mu-raised-button @click.native="followQuestion(questionId)" :label="followBtnLabel" float="right" class="question_follow_btn" :backgroundColor="followBtnColor"/>
          <!--<mu-raised-button label="已关注" class="question_followed-btn" slot="right" backgroundColor="#EEEEEE"/>-->
        </section>
        <mu-card-actions>
          <mu-flat-button label="邀请回答"/>
          <mu-flat-button label="添加回答" @click.native="answerQuestion"/>
        </mu-card-actions>
      </mu-card>

      <section class="question-options" v-show="item.answerList.length !== 0">
        <span class="answer-count">{{item.answerList.length}} 个回答</span>
      </section>

      <section class="question-options no-answer" v-show="item.answerList.length === 0">
        <span class="no-answer-text" >--- 还没有回答 ---</span>
      </section>

      <mu-card class="question-answer" v-for="(answer,index) in item.answerList">
        <mu-card-header titleClass="question-answer-title" :title="answer.user.username">
          <mu-avatar :src="answer.user.avatarUrl" slot="avatar" :size="30"/>
        </mu-card-header>
        <!--<mu-card-text>-->
          <!--分享一个真实经历的事情，想起来十分后怕。<br/>-->
          <!--大学期间和女友冷战，那天晚上我俩像陌生人一样走在街上（间隔两米左右）。<br/>-->
          <!--突然一个女孩儿（同龄人，长相还不错）出现在女友旁边，挽起女友的胳臂神色紧张地说：“求求你，救救我！后面那两个人一直跟着我！”。<br/>-->
          <!--这时女友可能也是被吓到了，也立马靠了过来，抓着我的胳臂问我怎么办。<br/>-->
          <!--我向后看了看，果然有两个中年男人骑着自行车在慢悠悠地跟着她。<br/>-->
          <!--于是我一面故作镇定安抚她，让她别害怕，跟我们走。其实也没想好怎么帮她脱身。<br/>-->
          <!--由于学校附近的街道并不繁华，我只能尽量往学校的方向走，在快到学校的门口的时候，我边走边我告诉她，在你的右前方是学校的保安岗亭，我是这里的学生，你一定会安全，我保证他们一定会帮你。但这时女孩儿声泪俱下：“哥哥，我不能去，后面那两个人握的有我的把柄，我只想摆脱他们跑掉。求求你了！救救我！”这时我才稍稍冷静了一下，问她：“那你要我怎么帮你？”女孩儿：“这地方你熟悉，帮我带到隐蔽的地方逃跑！”这时女友看着我，用近乎恳求的语气对我说：“咱们帮帮她吧~~”-->
        <!--</mu-card-text>-->
        <!--<mu-card-media class="question-answer-media">-->
          <!--<img src="http://www.muse-ui.org/images/sun.jpg" />-->
        <!--</mu-card-media>-->
        <mu-card-text style="padding: 0 .3rem .2rem .3rem;" @click.native="jumpToAnswer(answer.answerId)" v-html="answer.answerContent"></mu-card-text>
        <section style="padding: .2rem;"  @click="jumpToAnswer(answer.answerId)">
          <span class="question-answer-bottom" v-show="answer.likedCount">{{answer.likedCount}} 赞同</span>
          <span class="question-answer-bottom" v-show="answer.commentCount">{{answer.commentCount}} 评论 </span>
          <span class="question-answer-bottom"> 发表于 {{answer.createTime | dateFormat('YYYY-MM-DD')}}</span>
        </section>
      </mu-card>

      <!--<mu-card class="question-answer">-->
        <!--<mu-card-header titleClass="question-answer-title" title="Myron Avatar">-->
          <!--<mu-avatar src="https://avatars3.githubusercontent.com/u/16012509?s=400&u=6fe0dd08943216aeff2d3c9d1b8c3e602f6de8e9&v=4" slot="avatar"/>-->
        <!--</mu-card-header>-->
        <!--<mu-card-text>-->
          <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
          <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
        <!--</mu-card-text>-->
        <!--<mu-card-media class="question-answer-media">-->
          <!--<img src="http://www.muse-ui.org/images/sun.jpg" />-->
        <!--</mu-card-media>-->
        <!--<mu-card-text>-->
          <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
          <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
          <!--似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，-->
          <!--找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！-->
        <!--</mu-card-text>-->

      <!--</mu-card>-->
    </section>

    <zhiliao-foot-guide></zhiliao-foot-guide>
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import zhiliaoFootGuide from '@/components/footer/footGuide.vue'
  import { dateFormat } from 'vux'
  export default {
		name: "question",
    components: {
		  zhiliao,
      zhiliaoFootGuide
    },
    data () {
      return {
        questionId:'', // 当前问题id
        item: '',
        isFollow: false,
        isLikeAnswer: false,
        isReviewAnswer: false,
        followBtnLabel: '',
        followBtnColor:''

      }
    },
    mounted() {
      this.questionId = this.$route.params.questionId;
      this.getData(this.questionId);
      this.judgePeopleFollowQuestion(this.questionId);
    },
    methods: {
      getData(val) {
        this.axios.get('http://127.0.0.1:8080/zhiliao/question/'+val,{})
          .then( (response) => {
            if( response.data.code === '0000'){
              this.item = response.data.data;
              // this.isLikeAnswer = this.item
              console.log(this.item)
            }
          })
      },
      // 判断是否已关注该问题
      judgePeopleFollowQuestion(val) {
        this.axios.post('http://127.0.0.1:8080/zhiliao/judgePeopleFollowQuestion' ,{
          questionId: val
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.isFollow = response.data.data;
            if(this.isFollow){
              this.followBtnLabel = "已关注";
              this.followBtnColor = '#9E9E9E';
            } else {
              this.followBtnLabel = "关注问题";
              this.followBtnColor = '#1E88E5';
            }
          }
        })
      },
      // 关注问题或取消关注
      followQuestion(val) {
        if(!this.isFollow) {
          this.axios.post('http://127.0.0.1:8080/zhiliao/followQuestion' ,{
            questionId: val
          }).then( (response) => {
            if( response.data.code === '0000'){
                this.item.question.followedCount += 1;
                this.followBtnLabel = "已关注";
                this.followBtnColor = '#9E9E9E';
                this.isFollow=true;
            }
          })
        } else {
          this.axios.post('http://127.0.0.1:8080/zhiliao/unfollowQuestion' ,{
            questionId: val
          }).then( (response) => {
            if( response.data.code === '0000'){
              this.item.question.followedCount -= 1;
              this.followBtnLabel = "关注问题";
              this.followBtnColor = '#1E88E5';
              this.isFollow=false;
            }
          })
        }

      },
      // 添加回答
      answerQuestion(){
        this.$router.push({
          name: 'AnswerQuestion',
          params: {
            questionId: this.questionId
          }
        })
      },
      // 跳转至话题页
      jumpToTopic(topicId) {
        this.$router.push({
          name: 'Topic',
          params: {
            topicId: topicId
          }
        });
      },
      // 跳转至回答页
      jumpToAnswer(answerId) {
        this.$router.push('/answer/' + answerId);
      },
    },
    filters: {
      dateFormat
    }
	}
</script>

<style lang="less" scoped>
  .question-container{
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: calc(100vh - 2.5rem);
    overflow-y: scroll;
    /*padding: .3rem .3rem .3rem .3rem;*/
    .question-head{
      margin-bottom: .3rem;

      .question-topic-box{
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        margin-bottom: -.5rem;
        .question-topic-btn{
          margin-right: .3rem;
        }
      }

      .question-statistical{
        /*margin-top: -.4rem;*/
        padding: .1rem .5rem .1rem .5rem;
        .follow-question-count{

        }
        .question_follow_btn{
          margin-right: .2rem;
          height: .7rem;
          float: right;
          /*background-color: #1E88E5;*/
          /*width: .2rem;*/
          /*font-size: 12px*/
        }
        .question_unfollow_btn{

        }
        .question_followed-btn{
          margin-right: 2.5rem;
          height: .7rem;
        }
      }
    }

    .question-options{
      padding: 0 .3rem 0 .3rem;
      .answer-count{
        color: #757575;
      }

    }
    .no-answer{
      text-align: center;
      .no-answer-text{
        color: #757575;
      }
    }

    .question-answer{
      margin-top: .3rem;
      margin-bottom: .3rem;
      .question-answer-bottom{
        padding: .2rem
      }
    }

    .question-answer-media{
      padding: 0rem 0.5rem 0 .5rem
    }

  }

</style>
<style lang="less">
  .question-container{
    .question-answer-title{
      /*padding: .35rem 0 0 0;*/
    }
    .mu-card-header-title{
      margin-top: 5px;
    }
  }

  img {
    width: 100%;
    vertical-align: middle;
  }

</style>
