import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index.vue'
import Footer from '@/views/Footer.vue'
import Topic from '@/views/topic/Topic.vue'
import Topics from '@/views/topic/Topics.vue'
import TopicDetail from '@/views/topic/TopicDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      components: {
        main:index,
        // footer: Footer
      }
    },
    {
      path: '/topic',
      name: 'Topic',
      components: {
        main: Topic,
        footer: Footer
      }
    },
    {
      path: '/topic/:id',
      name: 'topic_detail',
      components: {
        main: TopicDetail,
        footer: Footer
      }
    },
    {
      path: '/topics',
      name: 'Topics',
      components: {
        main: Topics,
        footer:Footer
      }
    }
  ]
})
