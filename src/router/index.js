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
import Loginpassword from '@/views/user/loginpassword.vue'
import Login from '@/views/user/login.vue'
import Register from '@/views/user/register.vue'
import More from '@/views/more/more.vue'
import Question from '@/views/question/question.vue'
import Answer from '@/views/answer/answer.vue'
import Me from '@/views/me/me.vue'

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
        main: Login,
      }
    },
    {
      path: '/register',
      name: 'Register',
      components: {
        // head: Header,
        main: Register,
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
      path: '/question/:questionId',
      name: 'Question',
      components: {
        main: Question,
        // footer: Footer
      }
    },
    {
      path: '/answer/:answerId',
      name: 'Answer',
      components: {
        main: Answer,
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
        footer: Footer
      }
    },
    {
      path: '/me',
      name: 'Me',
      components: {
        main: Me,
        footer: Footer
      }
    }
  ]
});
