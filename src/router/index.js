import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index.vue'
import Footer from '@/components/footer/footGuide.vue'
import Topic from '@/views/topic/Topic.vue'
import Topics from '@/views/topic/Topics.vue'
import TopicDetail from '@/views/topic/TopicDetail.vue'
import Home from '@/views/home/home.vue'
import Collection from '@/views/collection/collection.vue'
import Login from '@/views/login/login.vue'
import More from '@/views/more/more.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        // header: Header,
        main: Home,
        footer: Footer
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        // head: Header,
        main: Login
      }
    },
    {
      path: '/collection',
      name: 'Collection',
      components: {
        // head: Header,
        main: Collection,
        footer: Footer
      }
    },
    {
      path: '/more',
      name: 'More',
      components: {
        // head: Header,
        main: More,
        footer: Footer
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
