import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Archive from '@/components/Archive'
import Post from '@/components/Post'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'archive',
      component: Archive
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post,
      props: (route) => ({ id: route.params.id })
    }
  ]
})
