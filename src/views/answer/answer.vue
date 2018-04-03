<template>
  <div style="background-color:#EEEEEE;">
    <zhiliao></zhiliao>

    <section class="answer-container">
      <mu-card class="question-title">
        <section>
          <span class="question-title-text">{{item.question.questionTitle}}</span>
          <span class="question-title-desc" v-html="item.question.questionContent"></span>
        </section>
      </mu-card>
      <mu-card class="answer-content">
        <mu-card-header :title="item.user.username" :subTitle="item.user.simpleDesc">
          <mu-avatar :src="item.user.avatarUrl" slot="avatar"/>
        </mu-card-header>

        <mu-card-text class="answer-content-text">
          {{item.answerContent}}
        </mu-card-text>
        <section class="answer-content-others">
          <!--<vue-star animated="animated shake" color="#d32f2f">-->
            <!--&lt;!&ndash;<img slot="icon" src="../../assets/ic_thumb_up_white_24dp_1x.png" />&ndash;&gt;-->
            <!--<mu-icon style="position: relative"  slot="icon" value="thumb_up" />-->
            <!--&lt;!&ndash;<i slot="icon" class="fa fa-heart"></i>&ndash;&gt;-->
          <!--</vue-star>-->
          <span class="answer-content-others-text">
            发布于 {{item.createTime | dateFormat('YYYY-MM-DD HH:mm')}}<br>
            著作权归作者所有
          </span>

        </section>
        <!--<mu-card-media>-->
          <!--<img src="http://www.muse-ui.org/images/sun.jpg" />-->
        <!--</mu-card-media>-->
        <!--<mu-card-text>-->
          <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
          <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
          <!--似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，-->
          <!--找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！-->
        <!--</mu-card-text>-->
        <!--<mu-card-actions style="padding: .3rem .4rem .3rem .4rem">-->
          <!--<mu-radio v-model="value"  uncheckIcon="favorite_border" checkedIcon="favorite"/> <br/>-->
          <!--<mu-flat-button class="content-card-action" icon="thumb_up" :label="item.likedCount"/>-->
          <!--<mu-flat-button label="Action 2"/>-->

        <!--</mu-card-actions>-->
      </mu-card>
    </section>

    <mu-paper class="foot_nav" :zDepth="5">
      <div class="foot-nav-icon-box">
        <vue-star style="margin-left: -.3rem;margin-top: -.45rem;" animated="animated shake" color="#2196F3">
          <!--<img slot="icon" src="../../assets/ic_thumb_up_white_24dp_1x.png" />-->
          <mu-icon slot="icon" value="thumb_up" />
          <!--<i slot="icon" class="fa fa-heart"></i>-->
        </vue-star>
        <mu-icon-button class="foot-nav-icon" icon="chat_bubble_outline"/>
        <mu-icon-button class="foot-nav-icon" icon="star_border"/>
        <mu-icon-button class="foot-nav-icon" icon="favorite_border"/>
      </div>
      <div class="foot-nav-text-box">
        <span class="foot-nav-text">评论</span>
        <span class="foot-nav-text">收藏</span>
        <span class="foot-nav-text">感谢</span>
      </div>
    </mu-paper>
    <!--<zhiliao-foot-guide></zhiliao-foot-guide>-->
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import zhiliaoFootGuide from '@/components/footer/footGuide.vue'
  import { dateFormat } from 'vux'
  import VueStar from 'vue-star'
  import MuIcon from "muse-ui/src/icon/icon";
  export default {
    name: "question",
    components: {
      MuIcon,
      zhiliao,
      zhiliaoFootGuide,
      VueStar
    },
    data () {
      return {
        item: null,
      }
    },
    mounted() {
      this.answerId = this.$route.params.answerId;
      let url = "http://127.0.0.1:8080/zhiliao/answer/" + this.answerId;
      this.getData(url);

    },
    methods: {
      getData(val) {
        this.axios.get(val,{})
          .then( (response) => {
          if( response.data.code === '0000'){
            this.item = response.data.data.answer;
            console.log(this.item)
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
  @import  '../../../node_modules/animate.css/animate.css';
  @import  '../../../node_modules/font-awesome/css/font-awesome.css';
  .answer-container{
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    height: calc(100vh - 2.5rem);
    overflow-y: scroll;
    .question-title{
      margin-bottom: .3rem;
      padding: .3rem .4rem .3rem .4rem;
      .question-title-text{
        font-size: 20px
      }
      .question-title-desc{
        font-size: 15px
      }
    }
    .answer-content{
      /*margin-bottom: .3rem;*/
      min-height: 10rem;
      .answer-content-text{
        padding: .3rem .4rem .3rem .4rem;
      }
      .answer-content-others{
        padding: .3rem .4rem 2.2rem .4rem;
        .answer-content-others-text{
          float: right;
          margin-right: .1rem;
          color: #9E9E9E;
        }
      }
    }
  }

  .foot_nav{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /*display: flex;*/
    .foot-nav-icon-box{
      height: 48px;
      z-index: 10;
      /*.foot-nav-icon-like{*/
        /*margin-left: -.3rem;*/
        /*margin-top: -.45rem;*/
      /*}*/
      .foot-nav-icon{
        float: right;
        position: relative;
      }
    }
    .foot-nav-text-box{
      height: 8px;
      text-align: right;
      font-size: 10px;
      .foot-nav-text{
        float: right;  width: 48px; text-align: center; margin-top: -13px
      }
    }
  }
</style>

<style lang="less">
  .answer-container{
    .answer-content{
      .mu-card-header-title{
        /*margin-top: 4px;*/
      }
    }
  }

</style>
