<template>
  <zhiliao></zhiliao>

  <section class="answer-content">
    <mu-card>
      <mu-card-title title="你在大学期间，遇到过最可怕的瞬间是什么？" subTitle="Content Title"/>
    </mu-card>
    <mu-card>
      <mu-card-header title="Myron Avatar" subTitle="sub title">
        <mu-avatar src="https://avatars3.githubusercontent.com/u/16012509?s=400&u=6fe0dd08943216aeff2d3c9d1b8c3e602f6de8e9&v=4" slot="avatar"/>
      </mu-card-header>
      <mu-card-title title="Content Title" subTitle="Content Title"/>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
      </mu-card-text>
      <mu-card-media>
        <img src="http://www.muse-ui.org/images/sun.jpg" />
      </mu-card-media>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="Action 1"/>
        <mu-flat-button label="Action 2"/>
      </mu-card-actions>
    </mu-card>
  </section>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  export default {
    name: "question",
    components: {
      zhiliao
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

<style scoped>
  .answer-content{
    margin-top: 1rem;
  }
</style>
