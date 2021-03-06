import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import Footer from '@/components/footer/footGuide.vue'
import Topic from '@/views/topic/Topic.vue'
import Topics from '@/views/topic/Topics.vue'
import Home from '@/views/home/home.vue'
import AddCollection from '@/views/collection/addCollection.vue'
import Collection from '@/views/collection/collection.vue'
import CollectionDetail from '@/views/collection/collectionDetail.vue'
import Login from '@/views/user/login.vue'
import Register from '@/views/user/register.vue'
import More from '@/views/more/more.vue'
import Ask from '@/views/question/ask.vue'
import Question from '@/views/question/question.vue'
import AnswerQuestion from '@/views/answer/answerQuestion.vue'
import Answer from '@/views/answer/answer.vue'
import Profile from '@/views/user/profile.vue'

Vue.use(Router)

  const routes = [
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
      path: '/addCollection',
      name: 'AddCollection',
      components: {
        // head: Header,
        main: AddCollection,
        footer: Footer
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
      path: '/collection/:collectionId',
      name: 'CollectionDetail',
      components: {
        // head: Header,
        main: CollectionDetail,
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
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/ask',
      name: 'Ask',
      components: {
        main: Ask,
        // footer: Footer
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
      path: '/answer',
      name: 'AnswerQuestion',
      components: {
        main: AnswerQuestion,
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
      path: '/topic/:topicId',
      name: 'Topic',
      components: {
        main: Topic,
        // footer: Footer
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
      path: '/profile/:userId',
      name: 'Profile',
      components: {
        main: Profile,
        footer: Footer
      }
    }
  ]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirectPath: to.fullPath}
      })
    }
  }
  else {
    next();
  }
});

export default router;
