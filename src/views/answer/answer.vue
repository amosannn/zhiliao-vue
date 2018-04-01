<template>
  <div>
    <zhiliao></zhiliao>

    <section class="answer-content">
      <mu-card>
        <mu-card-title :title="item.question.questionTitle" :subTitle="item.question.questionContent"/>
        <mu-card-header :title="item.user.username" :subTitle="item.user.simpleDesc">
          <mu-avatar :src="item.user.avatarUrl" slot="avatar"/>
        </mu-card-header>

        <mu-card-text>
          {{item.answerContent}}
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
          <mu-flat-button class="content-card-action" icon="thumb_up" :label="item.likedCount"/>
          <mu-flat-button label="Action 2"/>
        </mu-card-actions>
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
        item: this.item
      }
    },
    mounted() {
      this.answerId = this.$route.params.answerId;
      let url = "http://127.0.0.1:8080/zhiliao/answer/" + this.answerId;
      this.getData(url);

    },
    methods: {
      getData(val) {
        this.$http.get(val,{})
          .then( (response) => {
          if( response.data.code === '0000'){
            this.item = response.data.data.answer;
            console.log(this.item)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .answer-content{
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
</style>
