<template>
  <div>
    <zhiliao></zhiliao>

    <section class="question-container">
      <mu-card class="question-head">
        <mu-list-item class="question-topic-box" disableRipple>
          <mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">生活</mu-chip>
          <mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">大学生活</mu-chip>
          <mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">大学</mu-chip>
          <mu-chip class="question-topic-btn" backgroundColor="#EEEEEE">经历</mu-chip>
        </mu-list-item>
        <mu-card-title title="你在大学期间，遇到过最可怕的瞬间是什么？" subTitle="来说说你大学最可怕对一个瞬间吧。"/>
        <!--<mu-card-header title="Myron Avatar" subTitle="sub title">-->
        <!--</mu-card-header>-->
        <mu-list-item class="question-statistical" describeText="125人关注 54条评论" disableRipple>
          <mu-raised-button label="关注问题" slot="right" class="question_follow_btn" backgroundColor="#1E88E5"/>
          <!--<mu-raised-button label="已关注" class="question_followed-btn" slot="right" backgroundColor="#EEEEEE"/>-->
        </mu-list-item>
        <mu-card-actions>
          <mu-flat-button label="邀请回答"/>
          <mu-flat-button label="添加回答"/>
        </mu-card-actions>
      </mu-card>

      <mu-card class="question-answer">
        <mu-card-header titleClass="question-answer-title" title="Myron Avatar">
          <mu-avatar src="https://avatars3.githubusercontent.com/u/16012509?s=400&u=6fe0dd08943216aeff2d3c9d1b8c3e602f6de8e9&v=4" slot="avatar"/>
        </mu-card-header>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        </mu-card-text>
        <mu-card-media class="question-answer-media">
          <img src="http://www.muse-ui.org/images/sun.jpg" />
        </mu-card-media>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>

      </mu-card>

      <mu-card class="question-answer">
        <mu-card-header titleClass="question-answer-title" title="Myron Avatar">
          <mu-avatar src="https://avatars3.githubusercontent.com/u/16012509?s=400&u=6fe0dd08943216aeff2d3c9d1b8c3e602f6de8e9&v=4" slot="avatar"/>
        </mu-card-header>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        </mu-card-text>
        <mu-card-media class="question-answer-media">
          <img src="http://www.muse-ui.org/images/sun.jpg" />
        </mu-card-media>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>

      </mu-card>
    </section>

    <zhiliao-foot-guide></zhiliao-foot-guide>
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import zhiliaoFootGuide from '@/components/footer/footGuide.vue'
  export default {
		name: "question",
    components: {
		  zhiliao,
      zhiliaoFootGuide
    },
    data () {
      return {
        questionId:'', // 当前问题id
      }
    },
    mounted() {
      this.questionId = this.$route.params.questionId;
      console.log(this.questionId)
    }
	}
</script>

<style lang="less" scoped>
  .question-container{
    margin-top: 1rem;
    margin-bottom: 1rem;
    /*padding: .3rem .3rem .3rem .3rem;*/
    .question-head{
      margin-bottom: .5rem;

      .question-topic-box{
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        margin-bottom: -.5rem;
        .question-topic-btn{
          margin-right: .3rem;
        }
      }

      .question-statistical{
        margin-top: -.4rem;
        .question_follow_btn{
          margin-right: 2.5rem;
          height: .7rem;
          /*width: .2rem;*/
          /*font-size: 12px*/
        }
        .question_followed-btn{
          margin-right: 2.5rem;
          height: .7rem;
        }
      }
    }


    .question-answer-media{
      padding: 0rem 0.5rem 0 .5rem
    }

  }

  .question-answer{
    margin-bottom: .3rem;
  }
</style>
<style lang="less">
  .question-container{
    .question-answer-title{
      padding: .35rem 0 0 0;
    }
  }

</style>
